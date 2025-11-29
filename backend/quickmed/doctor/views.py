from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import DoctorProfile
from .serializers import DoctorProfileSerializer


class MeDoctorProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Get doctor profile for the authenticated user.
        Creates profile if it doesn't exist.
        """
        # Only allow doctors to access this endpoint
        if request.user.user_type != 'doctor':
            return Response(
                {'error': 'Only doctors can access this endpoint'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        profile, created = DoctorProfile.objects.get_or_create(user=request.user)
        
        # If newly created, sync with user data
        if created:
            profile.email = request.user.email
            profile.phone = request.user.phone
            profile.full_name = request.user.full_name
            profile.save()
        
        serializer = DoctorProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        """
        Update doctor profile (full update).
        """
        # Only allow doctors to access this endpoint
        if request.user.user_type != 'doctor':
            return Response(
                {'error': 'Only doctors can access this endpoint'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        profile, created = DoctorProfile.objects.get_or_create(user=request.user)
        
        serializer = DoctorProfileSerializer(instance=profile, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        """
        Update doctor profile (partial update).
        """
        # Only allow doctors to access this endpoint
        if request.user.user_type != 'doctor':
            return Response(
                {'error': 'Only doctors can access this endpoint'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        profile, created = DoctorProfile.objects.get_or_create(user=request.user)
        
        # If newly created, sync with user data first
        if created:
            profile.email = request.user.email
            profile.phone = request.user.phone
            profile.full_name = request.user.full_name
            profile.save()
        
        serializer = DoctorProfileSerializer(instance=profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_200_OK)
