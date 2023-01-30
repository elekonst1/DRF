from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project, Todo
from users.serializers import UserModelSerializer

class ProjectModelSerializer(HyperlinkedModelSerializer):
    user = UserModelSerializer()

    class Meta:
        model = Project
        fields = '__all__'




class TodoModelSerializer(HyperlinkedModelSerializer):
    project = ProjectModelSerializer()

    class Meta:
        model = Todo
        fields = '__all__'



