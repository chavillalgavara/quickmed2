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
from .models import CustomUser, UserProfile, VendorProfile, DeliveryProfile


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
            # Import here to avoid circular imports
            from doctor.models import DoctorProfile
            DoctorProfile.objects.create(user=user)

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()
    user_type = serializers.CharField()


class VendorProfileSerializer(serializers.ModelSerializer):
    fullName = serializers.CharField(source='user.full_name', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    phone = serializers.CharField(source='user.phone', read_only=True)
    
    class Meta:
        model = VendorProfile
        fields = [
            'fullName', 'email', 'phone',
            'pharmacy_name', 'license_number', 'gst_number',
            'address', 'city', 'state', 'pincode',
            'opening_time', 'closing_time'
        ]
        
    def to_representation(self, instance):
        # Convert snake_case to camelCase for frontend
        data = super().to_representation(instance)
        # Handle None/null values - convert to empty string for frontend
        def safe_get(key, default=''):
            value = data.get(key, default)
            return value if value is not None else default
        
        return {
            'fullName': safe_get('fullName', ''),
            'email': safe_get('email', ''),
            'phone': safe_get('phone', ''),
            'pharmacyName': safe_get('pharmacy_name', ''),
            'licenseNumber': safe_get('license_number', ''),
            'gstNumber': safe_get('gst_number', ''),
            'address': safe_get('address', ''),
            'city': safe_get('city', ''),
            'state': safe_get('state', ''),
            'pincode': safe_get('pincode', ''),
            'openingTime': safe_get('opening_time', ''),
            'closingTime': safe_get('closing_time', '')
        }
    
    def to_internal_value(self, data):
        # Convert camelCase to snake_case for backend
        if not isinstance(data, dict):
            return super().to_internal_value(data)
        
        # Map camelCase keys to snake_case
        field_mapping = {
            'pharmacyName': 'pharmacy_name',
            'licenseNumber': 'license_number',
            'gstNumber': 'gst_number',
            'openingTime': 'opening_time',
            'closingTime': 'closing_time'
        }
        
        # Convert keys - keep address, city, state, pincode as is
        converted_data = {}
        for key, value in data.items():
            if key in field_mapping:
                converted_data[field_mapping[key]] = value
            elif key in ['address', 'city', 'state', 'pincode']:
                converted_data[key] = value
            # Ignore other keys like fullName, email, phone (read-only)
        
        # Call parent to_internal_value for validation
        return super().to_internal_value(converted_data)