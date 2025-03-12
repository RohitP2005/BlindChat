from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from . serializer import UserSerailizer
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from rest_framework.authentication import TokenAuthentication


@api_view(['POST'])
def login(request):
    user = get_object_or_404(User , username = request.data['username'])
    if not user.check_password(request.data.get('password')):
        return Response({"details" : "not found"} , status.HTTP_404_NOT_FOUND)
    token , created = Token.objects.get_or_create(user = user)
    seriailizer = UserSerailizer(user)
    return Response({"token" : token.key , "user":seriailizer.data})

@api_view(['POST'])
def signup(request):
    seriailizer = UserSerailizer(data=request.data)
    if seriailizer.is_valid():
        seriailizer.save()
        user = User.objects.get(username = request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user = user)
        return Response({"token" : token.key , "user":seriailizer.data})
    return Response(seriailizer.errors , status=status.HTTP_400_BAD_REQUEST)



from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])  
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response({"message": "Passed for {}".format(request.user.email)})
