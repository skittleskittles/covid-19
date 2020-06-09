from django.shortcuts import render
from Hello_app.models import Confirmed


def get_list(request):
    confirmed_data = Confirmed.objects.all()
    return render(request, 'index.html', {'Confirmed': confirmed_data})