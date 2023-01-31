from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=64)
    repo_link = models.URLField(max_length=200)
    user = models.ManyToManyField(User)


class Todo(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=False)
