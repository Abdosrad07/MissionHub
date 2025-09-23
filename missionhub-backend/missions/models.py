from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django import forms


# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    pseudo = models.CharField(max_length=50, unique=True)
    solde = models.DecimalField(max_digits=19, decimal_places=7, default=0.0)
    score = models.DecimalField(max_digits=19, decimal_places=7, default=0.0)
    pi_uid = models.CharField(max_length=255, null=True, blank=True, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.pseudo} (Solde: {self.solde})"
    
    class Meta:
        ordering = ['-score']

class Badge(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=255, default='badge-default')
    condition = models.CharField(max_length=255, help_text="Description de la condition d'obtention")
    reward_value = models.DecimalField(max_digits=10, decimal_places=7, default=0.0)
    def __str__(self):
        return self.name

class UserBadge(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='badges')
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    acquired_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'badge')
        ordering = ['acquired_at']


class Mission(models.Model):
    DIFFICULTY_CHOICES = [
        ('facile', 'Facile'),
        ('moyen', 'Moyen'),
        ('difficile', 'Difficile'),
    ]

    CATEGORY_CHOICES = [
        ('sport', 'Sport'),
        ('culture', 'Culture'),
        ('social', 'Social'),
        ('apprentissage', 'Apprentissage'),
        ('sante', 'Santé'),
        ('creativite', 'Créativité'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    difficulty = models.CharField(max_length=50, choices=DIFFICULTY_CHOICES)
    reward = models.DecimalField(max_digits=19, decimal_places=7, default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    duration_minutes = models.IntegerField(default=30, help_text="Durée estimée en minutes")

    def __str__(self):
        return f"{self.title} ({self.get_difficulty_display()})"
    
    class Meta:
        ordering = ['-created_at']


class UserMission(models.Model):
    STATUS_CHOICES = [
        ('en_cours', 'En cours'),
        ('termine', 'Terminé'),
        ('abandonne', 'Abandonné'),
    ]

    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='user_missions')
    mission = models.ForeignKey(Mission, on_delete=models.CASCADE, related_name='user_missions')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='en_cours')
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'mission')
        ordering = ['-started_at']

class UserSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mission = models.ForeignKey(Mission, on_delete=models.CASCADE)
    started_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.mission.title}"

class Proof(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('validated', 'Validated'),
        ('rejected', 'Rejected'),
    ]
    session = models.ForeignKey(UserSession, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='proofs/')
    location = models.CharField(max_length=255)
    submitted_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    rejection_reason = models.TextField(blank=True, null=True, verbose_name="Raison du rejet")
    reviewed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Proof by {self.session.user.username} for {self.session.mission.title}"

class Score(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mission = models.ForeignKey(Mission, on_delete=models.CASCADE)
    points = models.IntegerField()
    validated_at = models.DateTimeField(auto_now_add=True)

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.user.username}"

class ProofForm(forms.ModelForm):
    class Meta:
        model = Proof
        fields = ['photo', 'location']
        widgets = {
            'location': forms.TextInput(attrs={'placeholder': 'Enter your location'}),
        }

class ProofEditForm(forms.ModelForm):
    class Meta:
        model = Proof
        fields = ['photo', 'location']



#Signal pour créer automatiquement le profil utilisateur
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance, pseudo=instance.username)

class Product(models.Model):
    """Représente un bien ou un service à vendre sur la marketplace."""
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=19, decimal_places=7)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.price} π)"

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'image']

class Purchase(models.Model):
    """Représente une transaction d'achat sécurisée (escrow)."""
    STATUS_CHOICES = [
        ('awaiting_payment', 'En attente de paiement'),
        ('in_escrow', 'Paiement sécurisé (en attente de livraison)'),
        ('shipped', 'Expédié'),
        ('completed', 'Terminé'),
        ('disputed', 'En litige'),
        ('cancelled', 'Annulé'),
    ]

    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='purchases')
    buyer = models.ForeignKey(User, on_delete=models.PROTECT, related_name='purchases')
    seller = models.ForeignKey(User, on_delete=models.PROTECT, related_name='sales')
    quantity = models.PositiveIntegerField(default=1)
    total_price = models.DecimalField(max_digits=19, decimal_places=7)
    commission_amount = models.DecimalField(max_digits=19, decimal_places=7, default=0.0, help_text="Commission prise par la plateforme")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='awaiting_payment')
    pi_payment_id = models.CharField(max_length=255, null=True, blank=True, help_text="ID du paiement de l'acheteur vers l'app")
    payout_id = models.CharField(max_length=255, null=True, blank=True, help_text="ID du paiement de l'app vers le vendeur")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

