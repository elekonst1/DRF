import graphene
from graphene_django import DjangoObjectType
from users.models import User
from todoapp.models import Todo, Project


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(UserType)
    all_todos = graphene.List(TodoType)
    users_by_id = graphene.Field(UserType, id=graphene.Int(required=True))
    project_by_user_name = graphene.List(ProjectType, name=graphene.String(required=False))

    def resolve_all_projects(root, info):
        return Project.objects.all()
    
    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_todos(root, info):
        return Todo.objects.all() 

    def resolve_user_by_id(root, info, id):
        try:
            return User.objects.get(id=id) 
        except User.DoesNotExist:
            return None 

    def resolve_project_by_user_name(root, info, name=None):
        projects = Project.objects.all()
        if name:
            projects = projects.filter(username=name)
        return projects


class UserMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        user_name = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
    
    user = graphene.Field(UserType)


    @classmethod
    def mutate(cls, root, info, id, user_name, first_name, last_name):
        user = User.objects.get(pk=id)
        user.id = id
        user.user_name = user_name
        user.first_name = first_name
        user.last_name = last_name
        user.save()
        return UserMutation(user=user)


class Mutation(graphene.ObjectType):
    update_user = UserMutation.Field()
    
    
schema = graphene.Schema(query=Query, mutation=Mutation)