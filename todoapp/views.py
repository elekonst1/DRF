from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Project, Todo
from .serializers import ProjectModelSerializer, TodoModelSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters


class ProjectPaginator(PageNumberPagination):
    page_size = 10


class TodoPaginator(PageNumberPagination):
    page_size = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPaginator
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    pagination_class = TodoPaginator
    filterset_fields = ['project']
