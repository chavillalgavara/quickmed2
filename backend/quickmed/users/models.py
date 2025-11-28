




from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


USER_TYPES = (
    ("user", "User"),
    ("vendor", "Vendor"),
    ("delivery", "Delivery"),
    ("doctor", "Doctor"),
)


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    full_name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, unique=True)
    user_type = models.CharField(max_length=20, choices=USER_TYPES)

    username = None
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    groups = models.ManyToManyField("auth.Group", related_name="customuser_groups", blank=True)
    user_permissions = models.ManyToManyField("auth.Permission", related_name="customuser_permissions", blank=True)

    def __str__(self):
        return f"{self.full_name} - {self.email} ({self.user_type})"


class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)


class VendorProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    pharmacy_name = models.CharField(max_length=200, blank=True, null=True)
    license_number = models.CharField(max_length=100, blank=True, null=True)
    gst_number = models.CharField(max_length=50, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    pincode = models.CharField(max_length=10, blank=True, null=True)
    opening_time = models.CharField(max_length=20, blank=True, null=True)
    closing_time = models.CharField(max_length=20, blank=True, null=True)
    
    def __str__(self):
        return f"{self.user.full_name} - {self.pharmacy_name or 'No Pharmacy Name'}"


class DeliveryProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)


class DoctorProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
