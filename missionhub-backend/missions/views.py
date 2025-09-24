from django.shortcuts import render, get_object_or_404, redirect
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.db import transaction
from .models import UserProfile, Mission, UserMission, Badge, UserSession, Proof, Notification, ProofForm, ProofEditForm, UserBadge, Product, ProductForm, Purchase
from .serializers import (
    UserProfileSerializer, MissionSerializer, UserMissionSerializer,
    CompleteMissionSerializer, RegisterSerializer, UserBadgeSerializer
)
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse, HttpResponseForbidden
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth import login
from django.views.decorators.cache import never_cache
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
import requests
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from decimal import Decimal



# Create your views here.
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)


class MissionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Mission.objects.filter(is_active=True)
    serializer_class = MissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def by_category(self, request):
        category = request.query_params.get('category')
        if category:
            missions = Mission.objects.filter(category=category, is_active=True)           
            serializer = self.get_serializer(missions, many=True)
            return Response(serializer.data)
        return Response([])

class UserMissionViewSet(viewsets.ModelViewSet):
    serializer_class = UserMissionSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return UserMission.objects.filter(user=self.request.user.profile)
    
    @action(detail=False, methods=['post'])
    def complete_mission(self, request):
        serializer = CompleteMissionSerializer(data=request.data)
        if serializer.is_valid():
            mission_id = serializer.validated_data['mission_id']

            try:
                mission = Mission.objects.get(id=mission_id, is_active=True)
                user_profile = request.user.profile

                with transaction.atomic():
                    #Vérifier si la mission n'est pas déjà complétée
                    user_mission, created = UserMission.objects.get_or_create(
                        user=user_profile,
                        mission=mission,
                        defaults={'status': 'termine'}
                    )

                    if not created and user_mission.status == 'termine':
                        return Response(
                            {'error': 'Mission déjà complétée'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    
                    #Mettre à jour le statut et la date de complétion
                    user_mission.status = 'termine'
                    user_mission.save()

                    #Mettre à jour le solde et le score de l'utilisateur
                    user_profile.solde += mission.reward
                    user_profile.score += mission.reward
                    user_profile.save()

                    #Vérifier les badges (à implémenter plus tard)
                    self.check_badges(user_profile)
                
                return Response({
                    'message': 'Mission complétée avec succès',
                    'reward': mission.reward,
                    'new_balance': user_profile.solde
                })
            
            except Mission.DoesNotExist:
                return Response(
                    {'error': 'Mission non trouvée'},
                    status=status.HTTP_404_NOT_FOUND
                )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def check_badges(self, user_profile):
        #A implémenter: logique de vérification des badges
        pass


class RegisterViewSet(viewsets.GenericViewSet):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'Utilisateur créé avec succès',
                'user_id': user.id
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@login_required
def user_profile(request):
    user_badges = UserBadge.objects.filter(user=request.user.profile).select_related('badge')
    my_purchases = Purchase.objects.filter(buyer=request.user).select_related('product', 'seller__profile').order_by('-created_at')
    my_sales = Purchase.objects.filter(seller=request.user).select_related('product', 'buyer__profile').order_by('-created_at')
    context = {
        'user_badges': user_badges,
        'my_purchases': my_purchases,
        'my_sales': my_sales,
    }
    return render(request, 'profile.html', context)
@login_required
def list_missions(request):
    missions = Mission.objects.all()
    return render(request, 'list_missions.html', {'missions': missions})

@login_required
def product_detail(request, product_id):
    product = get_object_or_404(Product, id=product_id, is_available=True)
    user_purchase = None
    if request.user.is_authenticated:
        user_purchase = Purchase.objects.filter(product=product, buyer=request.user).order_by('-created_at').first()

    context = {
        'product': product,
        'user_purchase': user_purchase,
    }
    return render(request, 'product_detail.html', context)

@login_required
@api_view(['POST']) # This should be an API endpoint called by JS
def start_purchase(request, product_id):
    product = get_object_or_404(Product, id=product_id, is_available=True)

    if product.seller == request.user:
        return Response({'error': 'You cannot buy your own product.'}, status=status.HTTP_400_BAD_REQUEST)

    # Create a purchase record
    purchase = Purchase.objects.create(
        product=product,
        buyer=request.user,
        seller=product.seller,
        quantity=1, # Assuming quantity is 1 for now
        total_price=product.price,
        status='awaiting_payment'
    )

    # Prepare data for the Pi.createPayment call on the frontend
    payment_data = {
        'amount': f'{product.price:.7f}',
        'memo': f"Achat de '{product.name}' sur MissionHub",
        'metadata': {'purchase_id': purchase.id}
    }

    return Response(payment_data)

def product_list(request):
    products = Product.objects.filter(is_available=True).order_by('-created_at')
    return render(request, 'product_list.html', {'products': products})

@login_required
def create_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            product = form.save(commit=False)
            product.seller = request.user
            product.save()
            messages.success(request, "Votre annonce a été créée avec succès !")
            return redirect('product_list')
    else:
        form = ProductForm()
    return render(request, 'create_product.html', {'form': form})



@login_required
def user_proofs(request):
    proofs = Proof.objects.filter(session__user=request.user).select_related('session__mission')
    return render(request, 'user_proofs.html', {'proofs': proofs})

@login_required
def user_notifications(request):
    notifications = Notification.objects.filter(user=request.user, is_read=False)
    return render(request, 'user_notifications.html', {'notifications': notifications})

@login_required
def mark_notification_read(request, notification_id):
    notification = get_object_or_404(Notification, id=notification_id, user=request.user)
    notification.is_read = True
    notification.save()
    return redirect('user_notifications')



@login_required
def choose_mission(request, mission_id):
    mission = get_object_or_404(Mission, id=mission_id)
    # Vérifie si l'utilisateur a déjà une session pour cette mission
    session, created = UserSession.objects.get_or_create(user=request.user, mission=mission)
    if created:
        # Si une nouvelle session est créée, redirige vers une page de confirmation
        return redirect('mission_detail', mission_id=mission.id)
    else:
        # Si la session existe déjà, redirige vers la page de la mission
        return redirect('mission_detail', mission_id=mission.id)

@login_required
def mission_detail(request, mission_id):
    mission = get_object_or_404(Mission, id=mission_id)
    session = get_object_or_404(UserSession, mission=mission, user=request.user)
    proofs = Proof.objects.filter(session=session).order_by('-submitted_at')
    return render(request, 'mission_detail.html', {
        'mission': mission,
        'session': session,
        'proofs': proofs
    })
@login_required
def submit_proof(request, session_id):
    session = get_object_or_404(UserSession, id=session_id, user=request.user)
    if request.method == 'POST':
        form = ProofForm(request.POST, request.FILES)
        if form.is_valid():
            proof = form.save(commit=False)
            proof.session = session
            proof.save()
            return redirect('mission_detail', mission_id=session.mission.id)
    else:
        form = ProofForm()
    return render(request, 'submit_proof.html', {'form': form, 'mission': session.mission})

@login_required
def mark_shipped(request, purchase_id):
    """Marque une commande comme expédiée (action du vendeur)."""
    purchase = get_object_or_404(Purchase, id=purchase_id, seller=request.user)    
    if purchase.status != 'in_escrow':
        messages.error(request, "Cette commande ne peut pas être marquée comme expédiée.")
        return redirect('user_profile')
    if request.method == 'POST':
        purchase.status = 'shipped'
        purchase.save()
        messages.success(request, "La commande a été marquée comme expédiée.")
        Notification.objects.create(user=purchase.buyer, message=f"Bonne nouvelle ! Votre commande pour '{purchase.product.name}' a été expédiée !");
    return redirect('user_profile')
    

@login_required
def confirm_receipt(request, purchase_id):
    """Confirme la réception d'une commande (action de l'acheteur)."""
    purchase = get_object_or_404(Purchase, id=purchase_id, buyer=request.user)

    if purchase.status != 'shipped':
        messages.error(request, "Cette action n'est pas possible à ce stade de la transaction.")
        return redirect('user_profile')
    if request.method == 'POST':
        try:
            with transaction.atomic():
                # Étape 1 : Transférer les fonds au vendeur (App-to-User)
                success, message = release_funds_to_seller(purchase)
                if not success:
                    raise Exception(message)

                # Étape 2 : Mettre à jour le statut de l'achat
                purchase.status = 'completed'
                purchase.save()

                # Étape 3 : Notifier tout le monde
                messages.success(request, "Achat confirmé ! Les fonds ont été transférés au vendeur.")
                Notification.objects.create(user=purchase.seller, message=f"Paiement reçu pour la vente de '{purchase.product.name}'.")
                
                return redirect('user_profile')

        except Exception as e:
            purchase.status = 'disputed'
            purchase.save()
            messages.error(request, f"Une erreur est survenue : {e}. Cette transaction est maintenant en litige, veuillez contacter le support.")
            return redirect('user_profile')
    return redirect('user_profile')



@login_required
def edit_proof(request, proof_id):
    proof = get_object_or_404(Proof, id=proof_id)

    # Ensure the logged-in user is the owner of the proof
    if proof.session.user != request.user:
        return HttpResponseForbidden("You are not allowed to edit this proof.")

    if request.method == 'POST':
        form = ProofEditForm(request.POST, request.FILES, instance=proof)
        if form.is_valid():
            form.save()
            return redirect('mission_detail', mission_id=proof.session.mission.id)
    else:
        form = ProofEditForm(instance=proof)

    return render(request, 'edit_proof.html', {'form': form, 'proof': proof})

@login_required
def delete_proof(request, proof_id):
    proof = get_object_or_404(Proof, id=proof_id)

    # Ensure the logged-in user is the owner of the proof
    if proof.session.user != request.user:
        return HttpResponseForbidden("You are not allowed to delete this proof.")

    if request.method == 'POST':
        mission_id = proof.session.mission.id
        proof.delete()
        return redirect('mission_detail', mission_id=mission_id)

    return render(request, 'delete_proof.html', {'proof': proof})

@never_cache
def custom_login_view(request):
    if request.user.is_authenticated:
        # Si l'utilisateur est déjà connecté, on le redirige
        if request.user.is_staff:
            return redirect('admin:index')
        return redirect('list_missions')

    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            if user.is_staff:
                return redirect('admin:index')
            return redirect('list_missions')
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # Connecte automatiquement l'utilisateur après l'inscription
            messages.success(request, "Votre compte a été créé avec succès !")
            return redirect('list_missions')  # Redirige vers la liste des missions
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})

# ...

@csrf_exempt # Important pour les webhooks externes
@api_view(['POST'])
@permission_classes([AllowAny]) # Le webhook vient des serveurs Pi, pas d'un utilisateur connecté
def pi_payment_webhook(request):
    """
    Gère les callbacks du serveur Pi pour approuver et compléter les paiements.
    """
    payment_data = request.data
    payment_id = payment_data.get('paymentId')

    metadata = payment_data.get('metadata', {})
    purchase_id = metadata.get('purchase_id')

    if not all([payment_id, purchase_id]):
        return Response({'error': 'Missing data'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        purchase = Purchase.objects.get(id=purchase_id, status='awaiting_payment')
    except Purchase.DoesNotExist:
        return Response({'error': 'Purchase not found or already processed'}, status=status.HTTP_404_NOT_FOUND)
    
    headers = {'Authorization': f'Key {settings.PI_API_KEY}'}
    
    approve_url = f'https://api.pi.network/v2/payments/{payment_id}/approve'
    approve_response = requests.post(approve_url, headers=headers)

    if not approve_response.ok:
        purchase.status = 'cancelled'
        purchase.save()
        return Response({'error': 'Failed to approve payment with Pi network'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    complete_url = f'https://api.pi.network/v2/payments/{payment_id}/complete'
    complete_response = requests.post(complete_url, headers=headers)

    if not complete_response.ok:
        purchase.status = 'disputed'
        purchase.save()
        print(f"CRITICAL: Failed to complete payment {payment_id} for purchase {purchase.id}")
        return Response({'error': 'Failed to complete payment with Pi network'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Mettre à jour notre état interne
    purchase.status = 'in_escrow'
    purchase.pi_payment_id = payment_id
    purchase.save()

    Notification.objects.create(
        user=purchase.seller,
        message=f"Vente confirmée pour '{purchase.product.name}'. Vous pouvez maintenant expédier le produit."
    )

    return Response({'status': 'success'})

@api_view(['POST'])
@login_required
def pi_authenticate(request):
    """
    Lie un UID Pi à l'utilisateur Django actuellement connecté.
    """
    pi_uid = request.data.get('uid')
    if not pi_uid:
        messages.error(request, 'UID Pi non fourni.')
        return Response({'error': 'Pi UID not provided'}, status=status.HTTP_400_BAD_REQUEST)

    # Vérifier si cet UID n'est pas déjà pris par un autre utilisateur
    if UserProfile.objects.filter(pi_uid=pi_uid).exclude(user=request.user).exists():
        messages.error(request, 'Ce compte Pi est déjà lié à un autre utilisateur.')
        return Response({'error': 'This Pi account is already linked to another user.'}, status=status.HTTP_400_BAD_REQUEST)

    request.user.profile.pi_uid = pi_uid
    request.user.profile.save()
    messages.success(request, 'Votre compte Pi a été lié avec succès !')
    return Response({'message': 'Pi account linked successfully!'})

@api_view(['POST'])
@login_required
def pi_withdraw(request):
    """
    Crée un paiement de l'application vers l'utilisateur (App-to-User).
    """
    amount_str = request.data.get('amount')
    if not amount_str:
        messages.error(request, 'Montant non fourni.')
        return Response({'error': 'Amount not provided'}, status=400)

    try:
        amount = Decimal(amount_str)
        if amount <= 0:
            messages.error(request, 'Le montant doit être positif.')
            return Response({'error': 'Amount must be positive'}, status=400)
    except:
        messages.error(request, 'Montant invalide')
        return Response({'error': 'Invalid amount'}, status=400)

    profile = request.user.profile

    if not profile.pi_uid:
        messages.error(request, "Aucun compte Pi n'est lié. Veuillez d'abord connecter votre compte.")
        return Response({'error': 'No Pi account is linked. Please authenticate with Pi first.'}, status=400)

    if profile.solde < amount:
        messages.error(request, 'Solde insuffisant.')
        return Response({'error': 'Insufficient balance.'}, status=400)

    headers = {'Authorization': f'Key {settings.PI_API_KEY}'}
    payload = {
        'recipient': profile.pi_uid,
        'amount': f'{amount:.7f}', # Format avec 7 décimales
        'memo': f"Retrait depuis MissionHub pour {profile.pseudo}",
    }

    try:
        pi_response = requests.post('https://api.pi.network/v2/payments', json=payload, headers=headers)
        pi_response.raise_for_status()  # Lève une exception pour les codes 4xx/5xx
        response_data = pi_response.json()

        with transaction.atomic():
            profile.refresh_from_db() # Re-fetch pour éviter les race conditions
            if profile.solde >= amount:
                profile.solde -= amount
                profile.save()
                messages.success(request, f'Retrait de {amount} π réussi !')
                return Response({'message': 'Withdrawal successful!', 'new_balance': profile.solde, 'pi_transaction': response_data})
            else:
                # Ne pas compléter si le solde a changé entre-temps
                messages.error(request, 'Votre solde a été mis à jour, fonds insuffisants.')
                return Response({'error': 'Balance updated, insufficient funds.'}, status=400)

    except requests.exceptions.RequestException as e:
        messages.error(request, f'Echec de la communication avec les serveurs Pi : {e}')
        return Response({'error': f'Failed to communicate with Pi servers: {e}'}, status=500)

def release_funds_to_seller(purchase):
    """
    Fonction helper qui effectue le paiement de l'app vers le vendeur via l'API Pi.
    Retourne un tuple (succès: bool, message: str).
    """
    seller_profile = purchase.seller.profile
    if not seller_profile.pi_uid:
        return (False, "Le vendeur n'a pas lié son compte Pi.")

    # Ici, vous pouvez déduire votre commission
    commission_rate = Decimal('0.05') # 5% de commission
    commission = purchase.total_price * commission_rate
    amount_to_seller = purchase.total_price - commission

    headers = {'Authorization': f'Key {settings.PI_API_KEY}'}
    payload = {
        'recipient': seller_profile.pi_uid,
        'amount': f'{amount_to_seller:.7f}',
        'memo': f"Paiement pour la vente de '{purchase.product.name}' (Achat #{purchase.id})",
    }
    try:
        pi_response = requests.post('https://api.pi.network/v2/payments', json=payload, headers=headers)
        pi_response.raise_for_status()
        response_data = pi_response.json()
        
        # Enregistrer l'ID de la transaction de paiement et la commission
        payout_id = response_data.get('identifier')
        if not payout_id:
             raise Exception("La réponse de l'API Pi ne contient pas d'identifiant de paiement.")
        
        purchase.commission_amount = commission
        purchase.payout_id = payout_id
        purchase.save(update_fields=['commission_amount', 'payout_id'])
        
        return (True, "Paiement au vendeur réussi.")
    except requests.exceptions.RequestException as e:
        # Il est crucial de logger cette erreur pour l'analyse
        error_message = f"ERREUR DE PAIEMENT PI pour l'achat {purchase.id}: {e}"
        print(error_message)
        return (False, "La communication avec les serveurs Pi a échoué.")

def refund_to_buyer(purchase):
    """
    Fonction helper qui rembourse l'acheteur via l'API Pi.
    Retourne un tuple (succès: bool, message: str).
    """
    buyer_profile = purchase.buyer.profile
    if not buyer_profile.pi_uid:
        return (False, "L'acheteur n'a pas lié son compte Pi.")

    headers = {'Authorization': f'Key {settings.PI_API_KEY}'}
    payload = {
        'recipient': buyer_profile.pi_uid,
        'amount': f'{purchase.total_price:.7f}',
        'memo': f"Remboursement pour l'achat de '{purchase.product.name}' (Achat #{purchase.id}) sur MissionHub",
    }
    try:
        pi_response = requests.post('https://api.pi.network/v2/payments', json=payload, headers=headers)
        pi_response.raise_for_status()
        response_data = pi_response.json()
        
        payout_id = response_data.get('identifier')
        purchase.payout_id = payout_id # Reusing payout_id for refund transaction
        purchase.save(update_fields=['payout_id'])
        return (True, "Remboursement à l'acheteur réussi.")
    except requests.exceptions.RequestException as e:
        error_message = f"ERREUR DE REMBOURSEMENT PI pour l'achat {purchase.id}: {e}"
        print(error_message)
        return (False, "La communication avec les serveurs Pi a échoué.")

def privacy_policy(request):
    return render(request, 'privacy_policy.html')

def terms_of_service(request):
    return render(request, 'terms_of_service.html')