# deepcare_server/serializers.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework import serializers

class MyEmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        credentials = {
            'email': attrs.get('email'),
            'password': attrs.get('password')
        }
        user = authenticate(request=self.context.get('request'), **credentials)
        print(user)
        if user is None:
            raise serializers.ValidationError(
                'Không tìm thấy tài khoản nào với thông tin đăng nhập đã cung cấp',
                code='authorization'
            )
        data = super().validate(attrs)
        data['user'] = {'id': user.id, 'email': user.email, 'username': user.username}
        return data
