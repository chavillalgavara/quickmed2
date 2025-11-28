from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    service = models.CharField(max_length=100)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


from django.db import models
from django.utils import timezone

class Review(models.Model):
    name = models.CharField(max_length=100)      # REQUIRED
    email = models.EmailField()                  # REQUIRED
    rating = models.PositiveSmallIntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=20, default='approved')

    def __str__(self):
        return f"{self.name} - {self.rating} stars"