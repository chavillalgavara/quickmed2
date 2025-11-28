from django.urls import path
from .views import signup, login_user, vendor_profile

urlpatterns = [
    path("signup/", signup),
    path("login/", login_user),
    path("vendor-profile/", vendor_profile),
]
