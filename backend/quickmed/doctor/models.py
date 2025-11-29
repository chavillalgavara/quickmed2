from django.db import models
from users.models import CustomUser

class DoctorProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='doctor_profile')

    full_name = models.CharField(max_length=150, blank=True, default='')
    email = models.EmailField(blank=True, default='')
    phone = models.CharField(max_length=20, blank=True, default='')

    specialization = models.CharField(max_length=120, blank=True, default='General Physician')
    license_number = models.CharField(max_length=60, blank=True, default='')
    experience = models.CharField(max_length=50, blank=True, default='')

    hospital = models.CharField(max_length=150, blank=True, default='')
    address = models.CharField(max_length=255, blank=True, default='')
    city = models.CharField(max_length=100, blank=True, default='')
    state = models.CharField(max_length=100, blank=True, default='')
    pincode = models.CharField(max_length=10, blank=True, default='')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'doctor_doctorprofile'
        verbose_name = 'Doctor Profile'
        verbose_name_plural = 'Doctor Profiles'

    def __str__(self):
        return f"DoctorProfile<{self.user.email}>"
    
    def save(self, *args, **kwargs):
        # Sync email, phone, full_name with user if not set
        if not self.email and self.user:
            self.email = self.user.email
        if not self.phone and self.user:
            self.phone = self.user.phone
        if not self.full_name and self.user:
            self.full_name = self.user.full_name
        super().save(*args, **kwargs)
