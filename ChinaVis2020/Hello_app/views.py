from django.shortcuts import render
from Hello_app.models import Confirmed


def get_list(request):
    confirmed_data = Confirmed.objects.all()
    return render(request, 'test.html', {'Confirmed': confirmed_data})

def home(request):
    confirmed_data = Confirmed.objects.all()
    return render(request, 'index.html', {'Confirmed': confirmed_data})

def timezone(request):
    confirmed_data = Confirmed.objects.all()
    return render(request, 'timezone.html', {'Confirmed': confirmed_data})

def yuqing(request):
    confirmed_data = Confirmed.objects.all()
    return render(request, 'yuqing.html', {'Confirmed': confirmed_data})
