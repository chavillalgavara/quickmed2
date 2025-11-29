from rest_framework import serializers
from .models import DoctorProfile

class DoctorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorProfile
        fields = [
            'full_name', 'email', 'phone',
            'specialization', 'license_number', 'experience',
            'hospital', 'address', 'city', 'state', 'pincode'
        ]

    # Optional: normalize field names to match your frontend keys exactly
    def to_representation(self, instance):
        data = super().to_representation(instance)
        return {
            "fullName": data["full_name"],
            "email": data["email"],
            "phone": data["phone"],
            "specialization": data["specialization"],
            "licenseNumber": data["license_number"],
            "experience": data["experience"],
            "hospital": data["hospital"],
            "address": data["address"],
            "city": data["city"],
            "state": data["state"],
            "pincode": data["pincode"],
        }

    def to_internal_value(self, data):
        # Accept your frontend’s camelCase payload
        mapped = {
            "full_name": data.get("fullName"),
            "email": data.get("email"),
            "phone": data.get("phone"),
            "specialization": data.get("specialization"),
            "license_number": data.get("licenseNumber"),
            "experience": data.get("experience"),
            "hospital": data.get("hospital"),
            "address": data.get("address"),
            "city": data.get("city"),
            "state": data.get("state"),
            "pincode": data.get("pincode"),
        }
        return super().to_internal_value({k: v for k, v in mapped.items() if v is not None})
