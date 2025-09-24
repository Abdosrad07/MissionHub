# Dans c:\Users\HP\MissionHub\missionhub-backend\missions\admin.py
from django.contrib import admin
from django.db import transaction
from django.utils import timezone
from django.utils.html import format_html
from django.urls import reverse
from django.contrib import messages
from .models import Mission, Proof, UserProfile, UserSession, Badge, UserBadge, Product, Purchase, Notification
from .views import release_funds_to_seller

@admin.register(Badge)
class BadgeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'icon', 'reward_value')

@admin.register(UserBadge)
class UserBadgeAdmin(admin.ModelAdmin):
    list_display = ('user', 'badge', 'acquired_at')
    list_filter = ('badge',)
    raw_id_fields = ('user', 'badge')

@admin.action(description='Résoudre en faveur du vendeur (Payer)')
def resolve_in_favor_of_seller(modeladmin, request, queryset):
    """Résout les litiges en payant le vendeur."""
    resolved_count = 0
    for purchase in queryset.filter(status='disputed'):
        try:
            with transaction.atomic():
                success, message = release_funds_to_seller(purchase)
                if not success:
                    raise Exception(message)
                
                purchase.status = 'completed'
                purchase.save()
                Notification.objects.create(user=purchase.seller, message=f"Le litige pour '{purchase.product.name}' a été résolu en votre faveur. Les fonds ont été transférés.")
                Notification.objects.create(user=purchase.buyer, message=f"Le litige pour '{purchase.product.name}' a été résolu en faveur du vendeur.")
                resolved_count += 1
        except Exception as e:
            modeladmin.message_user(request, f"Erreur lors de la résolution du litige #{purchase.id}: {e}", messages.ERROR)
    
    if resolved_count > 0:
        modeladmin.message_user(request, f"{resolved_count} litige(s) résolu(s) en faveur du vendeur.")

@admin.action(description="Résoudre en faveur de l'acheteur (Rembourser)")
def resolve_in_favor_of_buyer(modeladmin, request, queryset):
    """Résout les litiges en remboursant l'acheteur."""
    from .views import refund_to_buyer  # Local import to avoid circular dependency
    resolved_count = 0
    for purchase in queryset.filter(status='disputed'):
        try:
            with transaction.atomic():
                success, message = refund_to_buyer(purchase)
                if not success:
                    raise Exception(message)
                
                purchase.status = 'cancelled'
                purchase.save()

                Notification.objects.create(user=purchase.buyer, message=f"Le litige pour '{purchase.product.name}' a été résolu en votre faveur. Vous avez été remboursé.")
                Notification.objects.create(user=purchase.seller, message=f"Le litige pour '{purchase.product.name}' a été résolu en faveur de l'acheteur.")
                resolved_count += 1
        except Exception as e:
            modeladmin.message_user(request, f"Erreur lors de la résolution du litige #{purchase.id}: {e}", messages.ERROR)
    
    if resolved_count > 0:
        modeladmin.message_user(request, f"{resolved_count} litige(s) résolu(s) en faveur de l'acheteur.")

@admin.action(description='Confirmer le paiement manuellement (séquestre)')
def confirm_payment_manually(modeladmin, request, queryset):
    """
    Action pour manuellement passer une commande de 'En attente de paiement' à 'Paiement sécurisé'.
    Utile si le webhook de paiement Pi a échoué.
    """
    purchases_updated = 0
    for purchase in queryset.filter(status='awaiting_payment'):
        purchase.status = 'in_escrow'
        purchase.save()
        
        Notification.objects.create(
            user=purchase.seller,
            message=f"Le paiement pour '{purchase.product.name}' a été confirmé. Vous pouvez maintenant expédier le produit."
        )
        purchases_updated += 1
            
    if purchases_updated > 0:
        modeladmin.message_user(request, f"{purchases_updated} achat(s) ont été manuellement confirmés et sont maintenant en séquestre.")
    else:
        modeladmin.message_user(request, "Aucun achat n'était en attente de paiement.", messages.WARNING)

@admin.action(description='Forcer la finalisation de la commande')
def force_complete_purchase(modeladmin, request, queryset):
    """
    Force la finalisation d'une commande expédiée et paie le vendeur.
    À utiliser si l'acheteur ne confirme pas la réception.
    """
    completed_count = 0
    for purchase in queryset.filter(status='shipped'):
        try:
            with transaction.atomic():
                success, message = release_funds_to_seller(purchase)
                if not success:
                    raise Exception(message)
                purchase.status = 'completed'
                purchase.save()
                completed_count += 1
        except Exception as e:
            modeladmin.message_user(request, f"Erreur lors de la finalisation de l'achat #{purchase.id}: {e}", messages.ERROR)
    if completed_count > 0:
        modeladmin.message_user(request, f"{completed_count} achat(s) ont été finalisés avec succès.")


@admin.action(description='Valider les preuves sélectionnées')
def validate_proofs(modeladmin, request, queryset):
    # On ne traite que les preuves en attente pour éviter de donner des points en double
    proofs_to_validate = queryset.filter(status='pending')
    validated_count = 0
    for proof in proofs_to_validate:
            with transaction.atomic():
                profile = proof.session.user.profile
                mission = proof.session.mission
                profile.solde += mission.reward
                profile.score += mission.reward
                profile.save()

                proof.status = 'validated'
                proof.reviewed_at = timezone.now()
                proof.rejection_reason = None  # On s'assure que la raison est nulle
                proof.save()
                validated_count += 1
    modeladmin.message_user(request, f"{validated_count} preuve(s) ont été validées avec succès.")

@admin.action(description='Rejeter les preuves sélectionnées')
def reject_proofs(modeladmin, request, queryset):
    # On ne peut rejeter que les preuves en attente
    proofs_to_reject = queryset.filter(status='pending')
    # Note : Pour ajouter une raison de rejet en masse, une page intermédiaire serait nécessaire.
    # Pour l'instant, le rejet met à jour le statut. La raison peut être ajoutée en modifiant la preuve individuellement.
    rejected_count = proofs_to_reject.update(status='rejected', reviewed_at=timezone.now())
    modeladmin.message_user(request, f"{rejected_count} preuve(s) ont été rejetées.")

class ProofAdmin(admin.ModelAdmin):
    list_display = ('mission_title', 'user_link', 'photo_thumbnail', 'status', 'submitted_at', 'reviewed_at')
    list_filter = ('status', 'session__mission__title')
    search_fields = ('session__user__username', 'session__mission__title', 'location')
    list_select_related = ('session__user', 'session__mission')
    readonly_fields = ('photo_thumbnail', 'submitted_at', 'reviewed_at')
    actions = [validate_proofs, reject_proofs]
    
    fieldsets = (
        ('Information', {'fields': ('session', 'status', 'submitted_at', 'reviewed_at')}),
        ('Contenu de la preuve', {'fields': ('photo_thumbnail', 'photo', 'location')}),
        ('Modération', {'fields': ('rejection_reason',)}),
    )

    @admin.display(description='Mission', ordering='session__mission__title')
    def mission_title(self, obj):
        return obj.session.mission.title

    @admin.display(description='Utilisateur', ordering='session__user__username')
    def user_link(self, obj):
        user = obj.session.user
        url = reverse('admin:auth_user_change', args=[user.pk])
        return format_html('<a href="{}">{}</a>', url, user.username)

    @admin.display(description='Aperçu photo')
    def photo_thumbnail(self, obj):
        if obj.photo:
            return format_html('<a href="{0}" target="_blank"><img src="{0}" width="100" height="100" style="object-fit: cover;"/></a>', obj.photo.url)
        return "Pas de photo"



admin.site.register(Mission)
admin.site.register(Proof, ProofAdmin)
admin.site.register(UserProfile)
admin.site.register(UserSession)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'seller', 'price', 'is_available', 'created_at')
    list_filter = ('is_available', 'seller')
    search_fields = ('name', 'description')

@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'buyer', 'seller', 'status', 'total_price', 'created_at', 'updated_at')
    list_filter = ('status',)   
    actions = [confirm_payment_manually, force_complete_purchase, resolve_in_favor_of_seller, resolve_in_favor_of_buyer]
    search_fields = ('product__name', 'buyer__username', 'seller__username')