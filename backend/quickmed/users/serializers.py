# from rest_framework import serializers
# from django.contrib.auth.hashers import make_password
# from .models import (
#     CustomUser,
#     UserProfile,
#     VendorProfile,
#     DeliveryProfile,
#     DoctorProfile
# )

# class SignupSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ["full_name", "email", "phone", "password", "user_type"]

#     def create(self, validated_data):
#         validated_data["password"] = make_password(validated_data["password"])
#         user = CustomUser.objects.create(**validated_data)

#         # Create respective dashboard model
#         if user.user_type == "user":
#             UserProfile.objects.create(user=user)
#         elif user.user_type == "vendor":
#             VendorProfile.objects.create(user=user)
#         elif user.user_type == "delivery":
#             DeliveryProfile.objects.create(user=user)
#         elif user.user_type == "doctor":
#             DoctorProfile.objects.create(user=user)

#         return user
# from rest_framework import serializers
# from django.contrib.auth import authenticate
# from .models import CustomUser

# class LoginSerializer(serializers.Serializer):
#     email = serializers.CharField()
#     password = serializers.CharField()
#     user_type = serializers.CharField()

#     def validate(self, data):
#         email = data.get("email")
#         password = data.get("password")
#         user_type = data.get("user_type")

#         try:
#             user = CustomUser.objects.get(email=email)
#         except CustomUser.DoesNotExist:
#             raise serializers.ValidationError("Invalid email or password")

#         if user.user_type != user_type:
#             raise serializers.ValidationError("User type does not match")

#         if not user.check_password(password):
#             raise serializers.ValidationError("Invalid email or password")

#         data["user"] = user
#         return data



from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import CustomUser, UserProfile, VendorProfile, DeliveryProfile, DoctorProfile


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["full_name", "email", "phone", "password", "user_type"]

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        user = CustomUser.objects.create(**validated_data)

        if user.user_type == "user":
            UserProfile.objects.create(user=user)
        elif user.user_type == "vendor":
            VendorProfile.objects.create(user=user)
        elif user.user_type == "delivery":
            DeliveryProfile.objects.create(user=user)
        elif user.user_type == "doctor":
            DoctorProfile.objects.create(user=user)

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()
    user_type = serializers.CharField()
