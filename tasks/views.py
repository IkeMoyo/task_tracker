from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import TaskSerializer
from .models import Task


# Create your views here.
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field = "pk"
