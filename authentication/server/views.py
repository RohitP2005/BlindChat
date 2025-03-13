from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.core.cache import cache
import random
import json
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from server.models import CustomUser  # Import CustomUser instead of default User


def generate_otp():
    """Generates a 6-digit OTP."""
    return str(random.randint(100000, 999999))


@api_view(['POST'])
def signup(request):
    """
    Stores user data temporarily in cache and sends an OTP for verification.
    """
    email = request.data.get("email")
    password = request.data.get("password")
    gender = request.data.get("gender")
    preference = request.data.get("preference")

    if CustomUser.objects.filter(email=email).exists():
        return Response({"message": "Email already registered"}, status=status.HTTP_400_BAD_REQUEST)

    otp = generate_otp()

    # Store user details temporarily in cache
    cache.set(f"temp_user_{email}", json.dumps({
        "email": email,
        "password": password,
        "gender": gender,
        "preference": preference
    }), timeout=300)

    cache.set(f"otp_{email}", otp, timeout=300)  # OTP valid for 5 minutes

    # Send OTP via email
    send_mail(
        "Your OTP for Email Verification",
        f"Your OTP is {otp}. It is valid for 5 minutes.",
        "jitheshwarrior007@gmail.com",
        [email],
        fail_silently=False,
    )

    return Response({"message": "OTP sent successfully. Verify to complete registration."}, status=status.HTTP_200_OK)

import random

# Dictionary of superhero names
SUPERHERO_NAMES = {
    "male": ["Iron Man", "Thor", "Hulk", "Captain America", "Black Panther", "Doctor Strange"],
    "female": ["Wonder Woman", "Black Widow", "Scarlet Witch", "Captain Marvel", "Supergirl", "Storm"],
    "other": ["Mystique", "Rogue", "Jean Grey", "Silver Surfer", "Starfire", "Nebula"]
}

@api_view(['POST'])
def verify_otp(request):
    """
    Verifies OTP and registers user in the database only after successful verification.
    """
    email = request.data.get("email")
    otp = request.data.get("otp")

    # Retrieve stored OTP and user data
    stored_otp = cache.get(f"otp_{email}")
    user_data_json = cache.get(f"temp_user_{email}")

    if not stored_otp or stored_otp != otp:
        return Response({"message": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)

    if not user_data_json:
        return Response({"message": "No registration found for this email"}, status=status.HTTP_400_BAD_REQUEST)

    # Convert JSON string back to dictionary
    user_data = json.loads(user_data_json)
    email = user_data["email"]
    password = user_data["password"]
    gender = user_data["gender"]
    preference = user_data["preference"]
    superhero_name = random.choice(SUPERHERO_NAMES.get(gender.lower(), SUPERHERO_NAMES["other"]))

    # Create user in the database
    user = CustomUser.objects.create_user(email=email, password=password, gender=gender, preference=preference)
    user.superhero_name = superhero_name 
    user.is_active = True
    user.save()

    # Generate authentication token
    token, created = Token.objects.get_or_create(user=user)

    # Clean up cache after successful registration
    cache.delete(f"otp_{email}")
    cache.delete(f"temp_user_{email}")

    return Response({
        "message": "Email verified. Registration complete!",
        "superhero_name": superhero_name,  # Return superhero name
        "token": token.key
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login(request):
    """
    Logs in a user and returns a token.
    """
    user = get_object_or_404(CustomUser, email=request.data.get("email"))
    if not user.check_password(request.data.get('password')):
        return Response({"details": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    token, created = Token.objects.get_or_create(user=user)
    return Response({"token": token.key, "user": {"email": user.email, "gender": user.gender, "preference": user.preference}})


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    """
    Checks if the authentication token is valid.
    """
    return Response({"message": f"Passed for {request.user.email}"})


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_user(request):
    """
    Deletes the authenticated user.
    """
    request.user.delete()
    return Response({"message": "User deleted successfully."}, status=status.HTTP_200_OK)
