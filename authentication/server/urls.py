from django.urls import path
from . import views

urlpatterns = [
    path('api/login/', views.login),  # Updated path
    path('api/signup/', views.signup),
    path('api/test_token/', views.test_token),
]
