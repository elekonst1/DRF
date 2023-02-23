from .models import User
from .serializers import UserModelSerializer, UserSerializerBase
from rest_framework import mixins
from rest_framework import viewsets, generics 



class UserCustomViewSet(mixins.UpdateModelMixin, mixins.ListModelMixin,
                        mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


class MyAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '1':
            return UserModelSerializer
        return UserSerializerBase
    
    
