import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import UserCustomViewSet
from .models import User


class TestUserCustomViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserCustomViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/',{
            'user_name': 'newuser4', 
            'first_name': 'Max', 
            'last_name': 'Smith',
            'email': 'ms@gmail.com'
        }, format='json')
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin')
        force_authenticate(request, admin)
        view = UserCustomViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        user = User.objects.create(user_name='newuser4', first_name='Max', last_name='Smith', email='ms@gmail.com')
        client = APIClient()
        print('\n', user.id, '\n')
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        user = User.objects.create(user_name='newuser4', first_name='Max', last_name='Smith', email='ms@gmail.com')
        client = APIClient()
        response = client.put(f'/api/users/{user.id}/', {'user_name': 'newuser5', 'first_name': 'Bob', 'last_name': 'Ross', 'email': 'br@gmail.com'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    #def test_edit_admin(self):
        #user = User.objects.create(user_name='newuser4', first_name='Max', last_name='Smith', email='ms@gmail.com')
        #client = APIClient()
        #admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin')
        #client.login(user_name='admin', password='admin')
        #response = client.put(f'/api/users/{user.id}/', {'user_name': 'newuser5', 'first_name': 'Bob', 'last_name': 'Ross', 'email': 'br@gmail.com'})
        #user = User.objects.get(pk=user.id)
        #self.assertEqual(response.status_code, status.HTTP_200_OK)
        #self.assertEqual(user.user_name, 'newuser5')
        #client.logout()

    def test_get_detail_mixer(self):
        user = mixer.blend(User, user_name='newuser6')
        response = self.client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_user = json.loads(response.content)
        self.assertEqual(response_user['user_name'], 'newuser6')

    
