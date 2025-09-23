from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from .models import Proof, Notification, Badge, UserBadge

@receiver(pre_save, sender=Proof)
def store_old_proof_status(sender, instance, **kwargs):
    """
    Avant de sauvegarder, on stocke l'ancien statut sur l'instance
    pour pouvoir le comparer dans le post_save.
    """
    if instance.pk:
        try:
            instance._old_status = Proof.objects.get(pk=instance.pk).status
        except Proof.DoesNotExist:
            instance._old_status = None
    else:
        instance._old_status = None

@receiver(post_save, sender=Proof)
def proof_change_notification(sender, instance, created, **kwargs):
    """
    Envoie des notifications lors de la création ou de la mise à jour d'une preuve.
    """
    user = instance.session.user
    mission_title = instance.session.mission.title

    if created:
        message = f"Votre preuve pour la mission '{mission_title}' a été soumise et est en attente de validation."
        Notification.objects.create(user=user, message=message)
        return

    old_status = getattr(instance, '_old_status', None)
    if old_status is not None and old_status != instance.status:
        if instance.status == 'validated':
            message = f"Bonne nouvelle ! Votre preuve pour la mission '{mission_title}' a été validée. Vos gains ont été ajoutés à votre solde."
            Notification.objects.create(user=user, message=message)
            # On vérifie si on peut attribuer des badges
            check_and_award_badges(user)
        elif instance.status == 'rejected':
            reason = instance.rejection_reason
            message = f"Votre preuve pour la mission '{mission_title}' a été rejetée."
            if reason:
                message += f" Raison : {reason}"
            Notification.objects.create(user=user, message=message)

def check_and_award_badges(user):
    """
    Vérifie et attribue des badges à un utilisateur en fonction de ses accomplissements.
    """
    # --- Badge 1: Première Preuve Validée ---
    try:
        badge = Badge.objects.get(name="Première Preuve Validée")
        if Proof.objects.filter(session__user=user, status='validated').count() == 1:
            awarded, created = UserBadge.objects.get_or_create(user=user.profile, badge=badge)
            if created:
                user.profile.score += badge.reward_value
                user.profile.save()
                Notification.objects.create(user=user, message=f"Félicitations ! Vous avez débloqué le badge : '{badge.name}'.")
    except Badge.DoesNotExist:
        pass  # Le badge n'a pas été créé dans l'admin, on ne fait rien.

    # --- Badge 2: Explorateur (3 catégories de missions différentes) ---
    try:
        badge = Badge.objects.get(name="Explorateur")
        distinct_categories = Proof.objects.filter(session__user=user, status='validated').values('session__mission__category').distinct().count()
        if distinct_categories >= 3:
            awarded, created = UserBadge.objects.get_or_create(user=user.profile, badge=badge)
            if created:
                user.profile.score += badge.reward_value
                user.profile.save()
                Notification.objects.create(user=user, message=f"Félicitations ! Vous avez débloqué le badge : '{badge.name}'.")
    except Badge.DoesNotExist:
        pass


@receiver(post_delete, sender=Proof)
def notify_proof_deleted(sender, instance, **kwargs):
    """
    Envoie une notification lors de la suppression d'une preuve.
    """
    message = f"Votre preuve pour la mission '{instance.session.mission.title}' a été supprimée."
    Notification.objects.create(user=instance.session.user, message=message)