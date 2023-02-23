from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User
from rest_framework import serializers


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserSerializerBase(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('is_superuser', 'is_staff',)
