from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import UserRegistrationSerializer, UserProfileSerializer, PasswordResetSerializer
from django.contrib.auth import authenticate
from django.conf import settings
from random import randint
from django.core.mail import send_mail
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.template.loader import render_to_string
from django.utils.html import strip_tags
# from rest_framework.decorators import api_view
# from ipware import get_client_ip
from datetime import datetime, timedelta
import random
import uuid

OTP_EXPIRATION_TIME = timedelta(minutes=1)


otp_storage = {}

SUPERHERO_NAMES = [
    "IronMan", "SpiderMan", "CaptainAmerica", "Thor", "Hulk", "BlackPanther",
    "DoctorStrange", "Wolverine", "Deadpool", "BlackWidow", "Hawkeye",
    "Superman", "Batman", "WonderWoman", "Flash", "GreenLantern", "Aquaman",
    "Cyborg", "Shazam", "GreenArrow", "AntMan", "StarLord", "Groot"
]

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        email = data.get("email")
        otp = data.get("otp")

        if User.objects.filter(email=email).exists():
            return Response({"message": "Email already registered"}, status=status.HTTP_400_BAD_REQUEST)

        if not otp:
            if email in otp_storage:
                otp_timestamp = otp_storage[email]['timestamp']
                if datetime.now() - otp_timestamp < OTP_EXPIRATION_TIME:
                    return Response({"message": "Please wait before requesting a new OTP."}, status=status.HTTP_429_TOO_MANY_REQUESTS)

            otp = str(randint(100000, 999999))
            otp_storage[email] = {"otp": otp, "timestamp": datetime.now()}

            send_mail(
                subject="BlindChat - OTP Verification",
                message=strip_tags(render_to_string("otp_verification.html", {"otp": otp})),
                html_message=render_to_string("otp_verification.html", {"otp": otp}),
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                fail_silently=False,
            )

            return Response({"message": "OTP sent to your email"}, status=status.HTTP_200_OK)

        if email in otp_storage and otp_storage[email]['otp'] == otp:
            serializer = UserRegistrationSerializer(data=data)
            if serializer.is_valid():
                # Generate a unique superhero name
                name = random.choice(SUPERHERO_NAMES)
                unique_id = uuid.uuid4().hex[:6]
                superhero_name = f"{name}_{unique_id}"
                while User.objects.filter(superhero_name=superhero_name).exists():
                    unique_id = uuid.uuid4().hex[:6]
                    superhero_name = f"{name}_{unique_id}"
                
                serializer.save(superhero_name=superhero_name)
                otp_storage.pop(email, None)
                return Response({"message": "User registered successfully", "superhero_name": superhero_name}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(username=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "email": user.email
            }, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def put(self, request):
        user = request.user
        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PasswordResetRequestView(APIView):
    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Password reset link sent!"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError):
            return Response({"error": "Invalid or expired link."}, status=status.HTTP_400_BAD_REQUEST)

        token_generator = PasswordResetTokenGenerator()

        if not token_generator.check_token(user, token):
            return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)

        new_password = request.data.get("password")
        if not new_password:
            return Response({"error": "Password is required."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        html_message = render_to_string('password_reset_confirmation.html')
        plain_message = strip_tags(html_message)
        send_mail(
            subject="Your Password Has Been Reset",
            message=plain_message,
            html_message=html_message,
            from_email="sharran1594@gmail.com",
            recipient_list=[user.email],
            fail_silently=False,
        )

        return Response({"message": "Password reset successful!"}, status=status.HTTP_200_OK)


class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user

        try:
            user.delete()
            return Response({"message": "Account deleted successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

