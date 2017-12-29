from django.shortcuts import render
from django.http import HttpResponse
from .models import Hotel
from django.views import generic

# Create your views here.

class IndexView(generic.ListView):
    template_name = 'spotluck/index.html'
    context_object_name = 'all_hotels'
    def get_queryset(self):
        return Hotel.objects.all()

class DetailView(generic.DetailView):
    model = Hotel
    template_name = 'spotluck/detail.html'
