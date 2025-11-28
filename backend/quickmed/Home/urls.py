from django.urls import path
from .views import save_contact,submit_review,list_reviews

urlpatterns = [
    path("contact/submit/", save_contact),
    path('submit-review/', submit_review),
    path('list-reviews/', list_reviews),
]
