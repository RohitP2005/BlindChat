from django.urls import path
from .views import signup, verify_otp, login, test_token,delete_user

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('verify-otp/', verify_otp, name='verify_otp'),
    path('login/', login, name='login'),
    path('test-token/', test_token, name='test_token'),
    path("delete-user/", delete_user, name="delete_user"),

]
