from django.shortcuts import render
from Hello_app.models import Confirmed, Epidemic, CountryMovein,CountryMoveout,HubeiMoveout,Cure,Death,\
    EmotionalTendency,CipinTop300,Cipin1,ConfirmedEmotional,CipinQianyi

def convert_to_dicts(objs):
    '''把对象列表转换为字典列表'''
    obj_arr = []

    for o in objs:
        # 把Object对象转换成Dict
        dict = {}
        dict.update(o.__dict__)
        dict.pop("_state", None)  # 去除掉多余的字段
        obj_arr.append(dict)
    return obj_arr


def get_list(request):
    confirmed_data = Confirmed.objects.all()
    return render(request, 'test.html', {'Confirmed': confirmed_data})


def home(request):
    # confirmed_data = Confirmed.objects.all()
    # print(confirmed_data)
    date_index = ['人数种类', '1/22/2020', '1/23/2020', '1/24/2020', '1/25/2020', '1/26/2020', '1/27/2020', '1/28/2020',
                  '1/29/2020', '1/30/2020', '1/31/2020', '2/1/2020', '2/2/2020', '2/3/2020', '2/4/2020', '2/5/2020',
                  '2/6/2020', '2/7/2020', '2/8/2020', '2/9/2020', '2/10/2020', '2/11/2020', '2/12/2020', '2/13/2020',
                  '2/14/2020', '2/15/2020', '2/16/2020', '2/17/2020', '2/18/2020', '2/19/2020', '2/20/2020',
                  '2/21/2020',
                  '2/22/2020', '2/23/2020', '2/24/2020', '2/25/2020', '2/26/2020', '2/27/2020', '2/28/2020',
                  '2/29/2020',
                  '3/1/2020', '3/2/2020', '3/3/2020', '3/4/2020', '3/5/2020', '3/6/2020', '3/7/2020', '3/8/2020',
                  '3/9/2020', '3/10/2020', '3/11/2020', '3/12/2020', '3/13/2020', '3/14/2020', '3/15/2020', '3/16/2020',
                  '3/17/2020', '3/18/2020', '3/19/2020', '3/20/2020', '3/21/2020', '3/22/2020', '3/23/2020',
                  '3/24/2020',
                  '3/25/2020', '3/26/2020', '3/27/2020', '3/28/2020', '3/29/2020', '3/30/2020', '3/31/2020', '4/1/2020',
                  '4/2/2020', '4/3/2020', '4/4/2020', '4/5/2020', '4/6/2020', '4/7/2020', '4/8/2020', '4/9/2020',
                  '4/10/2020', '4/11/2020', '4/12/2020', '4/13/2020', '4/14/2020', '4/15/2020', '4/16/2020',
                  '4/17/2020',
                  '4/18/2020', '4/19/2020', '4/20/2020', '4/21/2020', '4/22/2020', '4/23/2020', '4/24/2020',
                  '4/25/2020',
                  '4/26/2020', '4/27/2020', '4/28/2020', '4/29/2020', '4/30/2020', '5/1/2020', '5/2/2020', '5/3/2020',
                  '5/4/2020', '5/5/2020', '5/6/2020', '5/7/2020', '5/8/2020', '5/9/2020', '5/10/2020', '5/11/2020',
                  '5/12/2020', '5/13/2020', '5/14/2020', '5/15/2020', '5/16/2020', '5/17/2020', '5/18/2020',
                  '5/19/2020',
                  '5/20/2020', '5/21/2020', '5/22/2020', '5/23/2020', '5/24/2020', '5/25/2020', '5/26/2020',
                  '5/27/2020',
                  '5/28/2020', '5/29/2020', '5/30/2020', '5/31/2020', '6/1/2020', '6/2/2020']
    provinces = Confirmed.objects.values('province')
    date_attr = ['m1_22', 'm1_23', 'm1_24', 'm1_25', 'm1_26', 'm1_27', 'm1_28', 'm1_29', 'm1_30', 'm1_31', 'm2_01',
                 'm2_02',
                 'm2_03', 'm2_04', 'm2_05', 'm2_06', 'm2_07', 'm2_08', 'm2_09', 'm2_10', 'm2_11', 'm2_12', 'm2_13',
                 'm2_14',
                 'm2_15', 'm2_16', 'm2_17', 'm2_18', 'm2_19', 'm2_20', 'm2_21', 'm2_22', 'm2_23', 'm2_24', 'm2_25',
                 'm2_26',
                 'm2_27', 'm2_28', 'm2_29', 'm3_01', 'm3_02', 'm3_03', 'm3_04', 'm3_05', 'm3_06', 'm3_07', 'm3_08',
                 'm3_09',
                 'm3_10', 'm3_11', 'm3_12', 'm3_13', 'm3_14', 'm3_15', 'm3_16', 'm3_17', 'm3_18', 'm3_19', 'm3_20',
                 'm3_21',
                 'm3_22', 'm3_23', 'm3_24', 'm3_25', 'm3_26', 'm3_27', 'm3_28', 'm3_29', 'm3_30', 'm3_31', 'm4_01',
                 'm4_02',
                 'm4_03', 'm4_04', 'm4_05', 'm4_06', 'm4_07', 'm4_08', 'm4_09', 'm4_10', 'm4_11', 'm4_12', 'm4_13',
                 'm4_14',
                 'm4_15', 'm4_16', 'm4_17', 'm4_18', 'm4_19', 'm4_20', 'm4_21', 'm4_22', 'm4_23', 'm4_24', 'm4_25',
                 'm4_26',
                 'm4_27', 'm4_28', 'm4_29', 'm4_30', 'm5_01', 'm5_02', 'm5_03', 'm5_04', 'm5_05', 'm5_06', 'm5_07',
                 'm5_08',
                 'm5_09', 'm5_10', 'm5_11', 'm5_12', 'm5_13', 'm5_14', 'm5_15', 'm5_16', 'm5_17', 'm5_18', 'm5_19',
                 'm5_20',
                 'm5_21', 'm5_22', 'm5_23', 'm5_24', 'm5_25', 'm5_26', 'm5_27', 'm5_28', 'm5_29', 'm5_30', 'm5_31',
                 'm6_01',
                 'm6_02']
    # print(Confirmed.objects.values(date[0]))

    time_confirmed_data = {}
    time_cured_data = {}
    time_death_data = {}

    # 缓存，根据假定只有34个省级单位，可以认为数据量不大
    tmpConfirmed = Confirmed.objects.all()
    for i, x in enumerate(tmpConfirmed):
        name = x.province
        time_confirmed_data[name] = ['确诊人数'] + [getattr(x, index) for index in date_attr]

    tmpCure = Cure.objects.all()
    for i, x in enumerate(tmpCure):
        name = x.province
        time_cured_data[name] = ['治愈人数'] + [getattr(x, index) for index in date_attr]

    tmpDeath = Death.objects.all()
    for i, x in enumerate(tmpDeath):
        name = x.province
        time_death_data[name] = ['死亡人数'] + [getattr(x, index) for index in date_attr]
    #print(time_confirmed_data['湖北'])

    zoom_date_index = date_index[1:]

    zoom_confirmed_data = {}
    zoom_cured_data = {}
    zoom_death_data = {}
    for i in range(len(provinces)):
        name = provinces[i]['province']
        zoom_confirmed = []
        zoom_cured = []
        zoom_death = []
        zoom_confirmed.append(0)
        zoom_cured.append(0)
        zoom_death.append(0)

        for j in range(len(date_attr) - 1):
            m = getattr(tmpConfirmed[i], date_attr[j])
            n = getattr(tmpConfirmed[i], date_attr[j + 1])
            if m != 0:
                zoom_confirmed.append(1.0 * (n - m) / m)
            else:
                zoom_confirmed.append(0)

            m = getattr(tmpCure[i], date_attr[j])
            n = getattr(tmpCure[i], date_attr[j + 1])
            if m != 0:
                zoom_cured.append(1.0 * (n - m) / m)
            else:
                zoom_cured.append(0)

            m = getattr(tmpDeath[i], date_attr[j])
            n = getattr(tmpDeath[i], date_attr[j + 1])
            if m != 0:
                zoom_death.append(1.0 * (n - m) / m)
            else:
                zoom_death.append(0)
        zoom_confirmed_data[name] = zoom_confirmed
        zoom_cured_data[name] = zoom_cured
        zoom_death_data[name] = zoom_death

    confirmed_province = {}
    cured_province = {}
    death_province = {}
    city_info = {}
    all_provinces = Epidemic.objects.values('province')
    for i in range(len(all_provinces)):
        name = all_provinces[i]['province']
        if name not in confirmed_province:
            confirm_arr = [Epidemic.objects.values('quezhen')[i]['quezhen']]
            confirmed_province[name] = confirm_arr
            cure_arr = [Epidemic.objects.values('cure')[i]['cure']]
            cured_province[name] = cure_arr
            death_arr = [Epidemic.objects.values('death')[i]['death']]
            death_province[name] = death_arr

            city_arr = [Epidemic.objects.values('city')[i]['city']]
            # city_arr中是一个省份中的所有城市
            city_info[name] = city_arr
            # city_info是key为省份名，data为城市名的字典
        else:
            confirm_arr = confirmed_province[name]
            confirm_arr.append(Epidemic.objects.values('quezhen')[i]['quezhen'])
            cure_arr = cured_province[name]
            cure_arr.append(Epidemic.objects.values('cure')[i]['cure'])
            death_arr = death_province[name]
            death_arr.append(Epidemic.objects.values('death')[i]['death'])

            city_arr = city_info[name]
            city_arr.append(Epidemic.objects.values('city')[i]['city'])

    return render(request, 'index.html',
                  {'dateIndex': date_index, 'time_confirmed': time_confirmed_data, 'time_cured': time_cured_data,
                   'time_death': time_death_data, 'zoom_data_index': zoom_date_index,
                   'zoom_confirmed': zoom_confirmed_data, 'zoom_cured': zoom_cured_data, 'zoom_death': zoom_death_data,
                   'confirmProvince': confirmed_province, 'cureProvince': cured_province,
                   'deathProvince': death_province, 'cityInfo': city_info})


def timezone(request):
    date_index = ['人数种类', '1/22/2020', '1/23/2020', '1/24/2020', '1/25/2020', '1/26/2020', '1/27/2020', '1/28/2020',
                  '1/29/2020', '1/30/2020', '1/31/2020', '2/1/2020', '2/2/2020', '2/3/2020', '2/4/2020', '2/5/2020',
                  '2/6/2020', '2/7/2020', '2/8/2020', '2/9/2020', '2/10/2020', '2/11/2020', '2/12/2020', '2/13/2020',
                  '2/14/2020', '2/15/2020', '2/16/2020', '2/17/2020', '2/18/2020', '2/19/2020', '2/20/2020',
                  '2/21/2020',
                  '2/22/2020', '2/23/2020', '2/24/2020', '2/25/2020', '2/26/2020', '2/27/2020', '2/28/2020',
                  '2/29/2020',
                  '3/1/2020', '3/2/2020', '3/3/2020', '3/4/2020', '3/5/2020', '3/6/2020', '3/7/2020', '3/8/2020',
                  '3/9/2020', '3/10/2020', '3/11/2020', '3/12/2020', '3/13/2020', '3/14/2020', '3/15/2020', '3/16/2020',
                  '3/17/2020', '3/18/2020', '3/19/2020', '3/20/2020', '3/21/2020', '3/22/2020', '3/23/2020',
                  '3/24/2020',
                  '3/25/2020', '3/26/2020', '3/27/2020', '3/28/2020', '3/29/2020', '3/30/2020', '3/31/2020', '4/1/2020',
                  '4/2/2020', '4/3/2020', '4/4/2020', '4/5/2020', '4/6/2020', '4/7/2020', '4/8/2020', '4/9/2020',
                  '4/10/2020', '4/11/2020', '4/12/2020', '4/13/2020', '4/14/2020', '4/15/2020', '4/16/2020',
                  '4/17/2020',
                  '4/18/2020', '4/19/2020', '4/20/2020', '4/21/2020', '4/22/2020', '4/23/2020', '4/24/2020',
                  '4/25/2020',
                  '4/26/2020', '4/27/2020', '4/28/2020', '4/29/2020', '4/30/2020', '5/1/2020', '5/2/2020', '5/3/2020',
                  '5/4/2020', '5/5/2020', '5/6/2020', '5/7/2020', '5/8/2020', '5/9/2020', '5/10/2020', '5/11/2020',
                  '5/12/2020', '5/13/2020', '5/14/2020', '5/15/2020', '5/16/2020', '5/17/2020', '5/18/2020',
                  '5/19/2020',
                  '5/20/2020', '5/21/2020', '5/22/2020', '5/23/2020', '5/24/2020', '5/25/2020', '5/26/2020',
                  '5/27/2020',
                  '5/28/2020', '5/29/2020', '5/30/2020', '5/31/2020', '6/1/2020', '6/2/2020']
    provinces = Confirmed.objects.values('province')
    date_attr = ['m1_22', 'm1_23', 'm1_24', 'm1_25', 'm1_26', 'm1_27', 'm1_28', 'm1_29', 'm1_30', 'm1_31', 'm2_01',
                 'm2_02',
                 'm2_03', 'm2_04', 'm2_05', 'm2_06', 'm2_07', 'm2_08', 'm2_09', 'm2_10', 'm2_11', 'm2_12', 'm2_13',
                 'm2_14',
                 'm2_15', 'm2_16', 'm2_17', 'm2_18', 'm2_19', 'm2_20', 'm2_21', 'm2_22', 'm2_23', 'm2_24', 'm2_25',
                 'm2_26',
                 'm2_27', 'm2_28', 'm2_29', 'm3_01', 'm3_02', 'm3_03', 'm3_04', 'm3_05', 'm3_06', 'm3_07', 'm3_08',
                 'm3_09',
                 'm3_10', 'm3_11', 'm3_12', 'm3_13', 'm3_14', 'm3_15', 'm3_16', 'm3_17', 'm3_18', 'm3_19', 'm3_20',
                 'm3_21',
                 'm3_22', 'm3_23', 'm3_24', 'm3_25', 'm3_26', 'm3_27', 'm3_28', 'm3_29', 'm3_30', 'm3_31', 'm4_01',
                 'm4_02',
                 'm4_03', 'm4_04', 'm4_05', 'm4_06', 'm4_07', 'm4_08', 'm4_09', 'm4_10', 'm4_11', 'm4_12', 'm4_13',
                 'm4_14',
                 'm4_15', 'm4_16', 'm4_17', 'm4_18', 'm4_19', 'm4_20', 'm4_21', 'm4_22', 'm4_23', 'm4_24', 'm4_25',
                 'm4_26',
                 'm4_27', 'm4_28', 'm4_29', 'm4_30', 'm5_01', 'm5_02', 'm5_03', 'm5_04', 'm5_05', 'm5_06', 'm5_07',
                 'm5_08',
                 'm5_09', 'm5_10', 'm5_11', 'm5_12', 'm5_13', 'm5_14', 'm5_15', 'm5_16', 'm5_17', 'm5_18', 'm5_19',
                 'm5_20',
                 'm5_21', 'm5_22', 'm5_23', 'm5_24', 'm5_25', 'm5_26', 'm5_27', 'm5_28', 'm5_29', 'm5_30', 'm5_31',
                 'm6_01',
                 'm6_02']

    time_confirmed_data = {}
    time_cured_data = {}
    time_death_data = {}
    # 缓存，根据假定只有34个省级单位，可以认为数据量不大
    tmpConfirmed = Confirmed.objects.all()
    for x in tmpConfirmed:
        name = x.province
        time_confirmed_data[name] = ['确诊人数'] + [getattr(x, index) for index in date_attr]
    tmpCure = Cure.objects.all()
    for x in tmpCure:
        name = x.province
        time_cured_data[name] = ['治愈人数'] + [getattr(x, index) for index in date_attr]
    tmpDeath = Death.objects.all()
    for x in tmpDeath:
        name = x.province
        time_death_data[name] = ['死亡人数'] + [getattr(x, index) for index in date_attr]

    zoom_date_index = date_index[1:]
    zoom_confirmed_data = {}
    zoom_cured_data = {}
    zoom_death_data = {}
    for i in range(len(provinces)):
        name = provinces[i]['province']
        zoom_confirmed = []
        zoom_cured = []
        zoom_death = []
        zoom_confirmed.append(0)
        zoom_cured.append(0)
        zoom_death.append(0)

        for j in range(len(date_attr) - 1):
            m = getattr(tmpConfirmed[i], date_attr[j])
            n = getattr(tmpConfirmed[i], date_attr[j + 1])
            if m != 0:
                zoom_confirmed.append(1.0 * (n - m) / m)
            else:
                zoom_confirmed.append(0)

            m = getattr(tmpCure[i], date_attr[j])
            n = getattr(tmpCure[i], date_attr[j + 1])
            if m != 0:
                zoom_cured.append(1.0 * (n - m) / m)
            else:
                zoom_cured.append(0)

            m = getattr(tmpDeath[i], date_attr[j])
            n = getattr(tmpDeath[i], date_attr[j + 1])
            if m != 0:
                zoom_death.append(1.0 * (n - m) / m)
            else:
                zoom_death.append(0)
        zoom_confirmed_data[name] = zoom_confirmed
        zoom_cured_data[name] = zoom_cured
        zoom_death_data[name] = zoom_death

    confirmed_province = {}
    cured_province = {}
    death_province = {}
    city_info = {}

    # 缓存，根据目前的数据只有457个城市
    tmpEpidemic = Epidemic.objects.all()
    all_provinces = [x.province for x in tmpEpidemic]

    for x in tmpEpidemic:
        name = x.province
        confirmed_province.setdefault(name,[]).append(x.quezhen)
        cured_province.setdefault(name,[]).append(x.cure)
        death_province.setdefault(name,[]).append(x.death)
        city_info.setdefault(name,[]).append(x.city)

    return render(request, 'timezone.html',
                  {'dateIndex': date_index, 'time_confirmed': time_confirmed_data, 'time_cured': time_cured_data,
                   'time_death': time_death_data, 'zoom_data_index': zoom_date_index,
                   'zoom_confirmed': zoom_confirmed_data, 'zoom_cured': zoom_cured_data, 'zoom_death': zoom_death_data,
                   'confirmProvince': confirmed_province, 'cureProvince': cured_province,
                   'deathProvince': death_province, 'cityInfo': city_info})



def qianyi(request):
    confirmed_data = Confirmed.objects.all()
    return render(request, 'qianyi.html', {'Confirmed': confirmed_data})


def yuqing(request):
    # print('---cipin----')
# 总词频
    cpdate = CipinTop300.objects.all()
    cpjsonlist = []
    for cp in cpdate:
        cpCloud = {}
        cpCloud['name'] = cp.keyword
        cpCloud['value'] = cp.total
        cpjsonlist.append(cpCloud)
    # print(cpjsonlist)

    cpkeyword = {}
    cpkey = []
    f = 0
    for cp in cpdate:

        cpkeyword[cp.keyword] = []
        i = 0
        for item in cp.__dict__.items():

            if i>=3 and i!=103:
                cpkeyword[cp.keyword].append(item[1])
                if f == 0:
                    if item[0][3]!='0':
                        date = item[0][2]+'月'+item[0][3]+item[0][4]+'日'
                    else:
                        date = item[0][2]+'月'+item[0][4]+'日'
                    cpkey.append(date)

            i+=1
        if f==0:
            f=1
# 迁徙相关词频
    cpqydate = CipinQianyi.objects.all()
    cpqyjsonlist = []
    for cpqy in cpqydate:
        cpCloud = {}
        cpCloud['name'] = cpqy.keyword
        cpCloud['value'] = cpqy.total
        cpqyjsonlist.append(cpCloud)
    # print(cpqyjsonlist)
    for cpqy in cpqydate:
        cpkeyword[cpqy.keyword] = []
        i = 0
        for item in cpqy.__dict__.items():
            if i>=3 and i!=103:
                cpkeyword[cpqy.keyword].append(item[1])
            i+=1
 

    print(len(cpkeyword))
    # by月份 by正向中性负向
    # 首先获取列名
    cols = ['正向', '中立', '负向', '新增确诊','新增治愈','新增死亡']
    # 再来获取行名及数据
    dates = ConfirmedEmotional.objects.values("date")
    # # 对获取到的时间格式整理成by month,只获取月份
    rows = []
    for row in dates:
        month = row['date']
        if month not in rows:
            rows.append(month)
    rows.sort()
    #print(rows)
    legend_data = cols
    x_data = rows
    positive = EmotionalTendency.objects.values("positive")
    neutral = EmotionalTendency.objects.values("neutral")
    negative = EmotionalTendency.objects.values("negative")
    confrimed = ConfirmedEmotional.objects.values("newconfirmed")
    cure = ConfirmedEmotional.objects.values("newcure")
    death = ConfirmedEmotional.objects.values("newdeath")
    series = []
    serie1 = []
    serie2 = []
    serie3 = []
    serie4 = []
    serie5 = []
    serie6 = []
    #print(cure)
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
        if com == '新增治愈':
            serie = {"name": com, "type": "line","yAxisIndex": 1,"data": None}
            for row in cure:
                serie5.append(row['newcure'])
            serie["data"] = serie5
        if com == '新增死亡':
            serie = {"name": com, "type": "line","yAxisIndex": 1,"data": None}
            for row in death:
                serie6.append(row['newdeath'])
            serie["data"] = serie6
        series.append(serie)
    # 柱子宽度可以在这里设置,注意必须加在最后一个 'bar' 系列上才会生效，并且是对此坐标系中所有 'bar' 系列生效。
    series[-5]['barWidth'] = "40%"
    #print(series)

    return render(request,"yuqing.html",{
        "series":series,
        "x_data":x_data,
        "legend_data":legend_data,
        "cpjsonlist":cpjsonlist,
        "cpkeyword":cpkeyword,
        "cpqyjsonlist":cpqyjsonlist,
        "cpkey":cpkey
    }
    ) 
