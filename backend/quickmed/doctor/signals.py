from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import DoctorProfile

@receiver(post_save, sender=User)
def create_or_update_doctor_profile(sender, instance, created, **kwargs):
    # ensure a profile exists and stays in sync with user email/name
    profile, _ = DoctorProfile.objects.get_or_create(user=instance)
    if instance.email and not profile.email:
        profile.email = instance.email
    if instance.get_full_name() and not profile.full_name:
        profile.full_name = instance.get_full_name()
    profile.save()
