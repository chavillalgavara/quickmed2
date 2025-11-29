from django.urls import path
from .views import MeDoctorProfileView

urlpatterns = [
    path('profile/', MeDoctorProfileView.as_view(), name='doctor_me_profile'),
]
