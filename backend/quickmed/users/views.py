from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignupSerializer
from .models import CustomUser

@api_view(["POST"])
def signup(request):
    # Check if email already exists
    if CustomUser.objects.filter(email=request.data.get("email")).exists():
        return Response({"message": "Email already registered"}, status=400)

    # Check if phone already exists
    if CustomUser.objects.filter(phone=request.data.get("phone")).exists():
        return Response({"message": "Phone already registered"}, status=400)

    serializer = SignupSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Account created successfully"}, status=201)

    return Response(serializer.errors, status=400)





from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser, VendorProfile
from .serializers import SignupSerializer, LoginSerializer, VendorProfileSerializer


# @api_view(["POST"])
# def signup(request):
#     data = request.data

#     # Convert frontend → backend
#     mapped = {
#         "full_name": data.get("fullName"),
#         "email": data.get("email"),
#         "phone": data.get("phone"),
#         "password": data.get("password"),
#         "user_type": data.get("userType"),
#     }

#     # Duplicate checks
#     if CustomUser.objects.filter(email=mapped["email"]).exists():
#         return Response({"message": "Email already registered"}, status=400)

#     if CustomUser.objects.filter(phone=mapped["phone"]).exists():
#         return Response({"message": "Phone already registered"}, status=400)

#     serializer = SignupSerializer(data=mapped)

#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "Account created successfully"}, status=201)

#     return Response({"message": serializer.errors}, status=400)


# @api_view(["POST"])
# def login_user(request):
#     print("USER TYPE:", user.user_type)

#     data = request.data

#     email_or_phone = data.get("email")
#     password = data.get("password")
#     user_type = data.get("user_type")

#     if not email_or_phone or not password:
#         return Response({"error": "Email/phone and password required"}, status=400)

#     # Identify login type
#     try:
#         if "@" in email_or_phone:
#             # Login using EMAIL
#             user = CustomUser.objects.get(email=email_or_phone)
#         else:
#             # Login using PHONE
#             user = CustomUser.objects.get(phone=email_or_phone)
#     except CustomUser.DoesNotExist:
#         return Response({"error": "Invalid email/phone or password"}, status=400)

#     # Check user type
#     if user.user_type != user_type:
#         return Response({"error": "User type does not match"}, status=400)

#     # Check password
#     if not user.check_password(password):
#         return Response({"error": "Invalid email/phone or password"}, status=400)

#     # Generate JWT
#     refresh = RefreshToken.for_user(user)

#     return Response({
#         "token": str(refresh.access_token),
#         "refresh": str(refresh),
#         "full_name": user.full_name,
#         "email": user.email,
#         "phone": user.phone,
#         "user_type": user.user_type
#     })


# @api_view(["POST"])
# def login_user(request):
#     data = request.data

#     email_or_phone = data.get("email")
#     password = data.get("password")
#     user_type = data.get("user_type") or data.get("userType")   # FIXED

#     # print("LOGIN RECEIVED:", data)

#     # Missing fields
#     if not email_or_phone or not password or not user_type:
#         return Response({"error": "Missing fields"}, status=400)

#     # Find user by email or phone
#     try:
#         if "@" in str(email_or_phone):
#             user = CustomUser.objects.get(email=email_or_phone)
#         else:
#             user = CustomUser.objects.get(phone=email_or_phone)
#     except CustomUser.DoesNotExist:
#         return Response({"error": "Invalid email/phone or password"}, status=400)

#     # Validate user type
#     if user.user_type != user_type:
#         return Response({"error": "User type does not match"}, status=400)

#     # Validate password
#     if not user.check_password(password):
#         return Response({"error": "Invalid email/phone or password"}, status=400)

#     # # User found + password OK
#     # print("USER TYPE FOUND:", user.user_type)

#     # Generate JWT
#     refresh = RefreshToken.for_user(user)

#     return Response({
#         "token": str(refresh.access_token),
#         "refresh": str(refresh),
#         "full_name": user.full_name,
#         "email": user.email,
#         "phone": user.phone,
#         "user_type": user.user_type,     # VERY IMPORTANT FOR REDIRECT
#     })
@api_view(["POST"])
def login_user(request):
    data = request.data
 
    email_or_phone = data.get("email")
    password = data.get("password")
    user_type = data.get("user_type") or data.get("userType")
 
    if not email_or_phone or not password or not user_type:
        return Response({"error": "Missing fields"}, status=400)
 
    # Find user
    try:
        if "@" in str(email_or_phone):
            user = CustomUser.objects.get(email=email_or_phone)
        else:
            user = CustomUser.objects.get(phone=email_or_phone)
    except CustomUser.DoesNotExist:
        return Response({"error": "Invalid login credentials"}, status=400)
 
    # Check user type
    if user.user_type != user_type:
        return Response({"error": "User type does not match"}, status=400)
 
    # Check password
    if not user.check_password(password):
        return Response({"error": "Invalid login credentials"}, status=400)
 
    # Generate Token
    refresh = RefreshToken.for_user(user)
 
    return Response({
        "token": str(refresh.access_token),
        "refresh": str(refresh),
       
        # 🔥 IMPORTANT → match frontend keys
        "fullName": user.full_name,
        "email": user.email,
        "phone": user.phone,
        "userType": user.user_type,
    }, status=200)


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def vendor_profile(request):
    """
    GET: Retrieve vendor profile
    PUT: Update vendor profile
    """
    # Ensure user is a vendor
    if request.user.user_type != 'vendor':
        return Response({"error": "User is not a vendor"}, status=status.HTTP_403_FORBIDDEN)
    
    # Debug: Print which user is requesting
    print(f"Vendor profile request from user: {request.user.email} (ID: {request.user.id})")
    
    try:
        vendor_profile_obj = VendorProfile.objects.get(user=request.user)
    except VendorProfile.DoesNotExist:
        # Create profile if it doesn't exist
        vendor_profile_obj = VendorProfile.objects.create(user=request.user)
        print(f"Created new vendor profile for user: {request.user.email}")
    
    if request.method == "GET":
        serializer = VendorProfileSerializer(vendor_profile_obj)
        # Debug: Print the data being returned
        print(f"Returning vendor profile data for {request.user.email}: {serializer.data}")
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == "PUT":
        print(f"Received update request with data: {request.data}")
        serializer = VendorProfileSerializer(vendor_profile_obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            # Refresh from database to ensure we have latest data
            vendor_profile_obj.refresh_from_db()
            print(f"Profile saved. Current data: pharmacy_name={vendor_profile_obj.pharmacy_name}, license={vendor_profile_obj.license_number}")
            # Return updated data in frontend format
            updated_serializer = VendorProfileSerializer(vendor_profile_obj)
            print(f"Returning updated data: {updated_serializer.data}")
            return Response(updated_serializer.data, status=status.HTTP_200_OK)
        print(f"Validation failed: {serializer.errors}")
        return Response({"error": "Validation failed", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
 