from django.shortcuts import render
from Hello_app.models import Confirmed, CountryMovein,CountryMoveout,HubeiMoveout,Cure,Death


def convert_to_dicts(objs):
    '''把对象列表转换为字典列表'''
    obj_arr = []

    for o in objs:
        # 把Object对象转换成Dict
        dict = {}
        dict.update(o.__dict__)
        dict.pop("_state", None)#去除掉多余的字段
        obj_arr.append(dict)
    return obj_arr


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
