from .models import User
from .serializers import UserModelSerializer
from rest_framework import mixins
from rest_framework import viewsets


class UserCustomViewSet(mixins.UpdateModelMixin, mixins.ListModelMixin,
                        mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    
    
