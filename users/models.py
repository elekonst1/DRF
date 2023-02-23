from django.db import models
from uuid import uuid4
from django.contrib.auth.models import AbstractUser, AbstractBaseUser


class User(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    user_name = models.CharField(max_length=64)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    email = models.EmailField(unique=True, max_length=64)


#class User(AbstractUser):
    #pass


#class User(AbstractUser):
    #class Meta(AbstractUser.Meta):
        #swappable = 'AUTH_USER_MODEL'
