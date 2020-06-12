from django.shortcuts import render
from Hello_app.models import Confirmed, CountryMovein,CountryMoveout,HubeiMoveout,Cure,Death,EmotionalTendency
from datetime import datetime,date,timedelta

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
    cols = ['正向','中立','负向']
    # 再来获取行名及数据
    dates = EmotionalTendency.objects.values("date")
    # # 对获取到的时间格式整理成by month,只获取月份
    rows = []
    for row in dates:
        month = row['date']
        if month not in rows:
            rows.append(month)
    rows.sort()
    print(rows)
    # by月份 by正向中性负向
    # Echarts官网source参考： 获取legend
    # legend: {
    #     data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度','谷歌','必应','其他']
    # },
    legend_data = cols
    # 获取x轴数据，Echarts官网示例
    # xAxis : [
    #     {
    #         type : 'category',
    #         data : ['周一','周二','周三','周四','周五','周六','周日']
    #     }
    x_data = rows
    # 获取数据内容，Echarts官网示例：
    # series : [
    #     {
    #         name:'直接访问',
    #         type:'bar',
    #         stack: '广告',
    #         data:[320, 332, 301, 334, 390, 330, 320]
    #     },
    #     {
    #         name:'邮件营销',
    #         type:'bar',
    #         stack: '广告',
    #         data:[120, 132, 101, 134, 90, 230, 210]
    #     },
    # rows存的是日期，cols存的是正向中性负向

    positive = EmotionalTendency.objects.values("positive")
    neutral = EmotionalTendency.objects.values("neutral")
    negative = EmotionalTendency.objects.values("negative")
    series = []
    serie1 = []
    serie2 = []
    serie3 = []

    for com in cols:
        serie = {"name": com, "type": "bar", "stack": "微博数量", "data": None}
        if com == '正向':
            for row in positive:
                serie1.append(row['positive'])
            serie["data"] = serie1
        if com == '中立':
            for row in neutral:
                serie2.append(row['neutral'])
            serie["data"] = serie2
        if com == '负向':
            for row in negative:
                serie3.append(row['negative'])
            serie["data"] = serie3
        series.append(serie)
    # 柱子宽度可以在这里设置,注意必须加在最后一个 'bar' 系列上才会生效，并且是对此坐标系中所有 'bar' 系列生效。
    series[-1]['barWidth'] = "40%"
    print(series)

    return render(request,"yuqing.html",{
        "series":series,
        "x_data":x_data,
        "legend_data":legend_data
    })