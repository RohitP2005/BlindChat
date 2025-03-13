from django.urls import path
from .views import signup, verify_otp, login, test_token

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('verify-otp/', verify_otp, name='verify_otp'),
    path('login/', login, name='login'),
    path('test-token/', test_token, name='test_token'),
]
