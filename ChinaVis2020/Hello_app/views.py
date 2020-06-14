from django.shortcuts import render
from Hello_app.models import Confirmed, CountryMovein,CountryMoveout,HubeiMoveout,Cure,Death,EmotionalTendency,CipinTop300,Cipin1,ConfirmedEmotional

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

def qianyi(request):
    confirmed_data = Confirmed.objects.all()
    return render(request, 'qianyi.html', {'Confirmed': confirmed_data})


def yuqing(request):
    # 首先获取列名
    cols = ['正向','中立','负向','新增确诊']
    # 再来获取行名及数据
    dates = ConfirmedEmotional.objects.values("date")
    # # 对获取到的时间格式整理成by month,只获取月份
    rows = []
    for row in dates:
        month = row['date']
        if month not in rows:
            rows.append(month)
    rows.sort()
    print(rows)
    print('---cipin----')
    cpdate = CipinTop300.objects.all()
    cpjsonlist = []
    for cp in cpdate:
        cpCloud = {}
        cpCloud['name'] = cp.keyword
        cpCloud['value'] = cp.total
        cpjsonlist.append(cpCloud)
    print(cpjsonlist)
    # print(CipinTop300.objects.get(keyword= '新型').total)
    # cpword = CipinTop300.objects.values("keyword")
    # cpid = CipinTop300.objects.values("cpid")
    # cptotal = CipinTop300.objects.values("total")
    # cpm0122 = CipinTop300.objects.values("m0122")
    # cpword = Cipin1.objects.values("keyword")
    # cpid = Cipin1.objects.values("id")
    # cptotal = Cipin1.objects.values("total")
    # cpm0122 = Cipin1.objects.values("m0122")
    # for (cid, kw,m122) in zip(cpid,cpword,cpm0122):
    #     print(cid)
    #     print(kw)
    #     print(m122)

    # by月份 by正向中性负向
    legend_data = cols
    x_data = rows
    positive = EmotionalTendency.objects.values("positive")
    neutral = EmotionalTendency.objects.values("neutral")
    negative = EmotionalTendency.objects.values("negative")
    confrimed = ConfirmedEmotional.objects.values("newconfirmed")
    series = []
    serie1 = []
    serie2 = []
    serie3 = []
    serie4 = []
    print(confrimed)
    for com in cols:
        if com == '正向':
            serie = {"name": com, "type": "bar", "stack": "微博数量", "yAxisIndex": 0,"data": None}
            for row in positive:
                serie1.append(row['positive'])
            serie["data"] = serie1
        if com == '中立':
            serie = {"name": com, "type": "bar", "stack": "微博数量","yAxisIndex": 0, "data": None}
            for row in neutral:
                serie2.append(row['neutral'])
            serie["data"] = serie2
        if com == '负向':
            serie = {"name": com, "type": "bar", "stack": "微博数量", "yAxisIndex": 0, "data": None}
            for row in negative:
                serie3.append(row['negative'])
            serie["data"] = serie3
        if com == '新增确诊':
            serie = {"name": com, "type": "line","yAxisIndex": 1,   "data": None}
            for row in confrimed:
                serie4.append(row['newconfirmed'])
            serie["data"] = serie4
        series.append(serie)
    # 柱子宽度可以在这里设置,注意必须加在最后一个 'bar' 系列上才会生效，并且是对此坐标系中所有 'bar' 系列生效。
    series[-2]['barWidth'] = "40%"
    print(series)

    return render(request,"yuqing.html",{
        "series":series,
        "x_data":x_data,
        "legend_data":legend_data,
        "cpjsonlist":cpjsonlist
    }
    ) 