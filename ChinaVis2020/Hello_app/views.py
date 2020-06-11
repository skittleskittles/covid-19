from django.shortcuts import render
from Hello_app.models import Confirmed


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
    confirmed_data = convert_to_dicts(confirmed_data)
    return render(request, 'timezone.html', {'Confirmed': confirmed_data})