
$(function(){


  init();

});
function init(){



  var myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];

  // 国家地图
  let myChart = echarts.init(document.getElementById('mapChart'),'dark');
    // 指定图表的配置项和数据
    option = {
//        title: {
//            text: '中国疫情确诊人数图',
//            left: 'center',
//            color:"white"
//        },
        tooltip: {  // 配置提示信息
            trigger: 'item'
        },
        backgroundColor: '#081832',
        legend: {  // 图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示
            orient: 'vertical',
            left: 'left',
            data: ['中国疫情图']
        },
        visualMap: {
            type: 'piecewise',
            pieces: [
                { min: 1000, max: 1000000, label: '大于等于1000人', color: '#372a28' },
                { min: 500, max: 999, label: '确诊500-999人', color: '#4e160f' },
                { min: 100, max: 499, label: '确诊100-499人', color: '#974236' },
                { min: 10, max: 99, label: '确诊10-99人', color: '#ee7263' },
                { min: 1, max: 9, label: '确诊1-9人', color: '#f5bba7' },
            ],
            color: ['#E0022B', '#E09107', '#A3E00B']
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        roamController: {
            show: true,
            left: 'right',
            mapTypeControl: {
                'china': true
            }
        },
        series: [  // 每个系列通过 type 决定自己的图表类型
            {
                name: '确诊数',
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                    show: true,
                    color: 'rgb(249, 249, 249)'
                },
                data: []
            }
        ]
    };

    //使用指定的配置项和数据显示图表
    myChart.setOption(option);

    //获取数据
    function getData() {
        $.ajax({
            url: "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5",
            dataType: "jsonp",
            success: function (data) {
                //  console.log(data.data)
                var res = data.data || "";
                res = JSON.parse(res);
                var newArr = [];
                //newArr的数据格式为：
                // [{
                //   name: '北京11',
                //   value: 212
                // }, {
                //   name: '天津',
                //   value: 60
                // }]
                if (res) {
                    //获取到各个省份的数据
                    var province = res.areaTree[0].children;
                    for (var i = 0; i < province.length; i++) {
                        var json = {
                            name: province[i].name,
                            value: province[i].total.confirm
                        };
                        newArr.push(json)
                    }
                    console.log(newArr);
                    console.log(JSON.stringify(newArr));
                    //使用指定的配置项和数据显示图表
                    myChart.setOption({
                        series: [
                            {
                                name: '确诊数',
                                type: 'map',
                                mapType: 'china',
                                roam: false,
                                zoom:1,
                                label: {
                                    show: true,
                                    color: 'rgb(249, 249, 249)'
                                },
                                data: newArr
                            }
                        ]
                    });
                }
            }

        })
    }
    getData();


    function drawProvince(pName) {
        let mapArea = document.getElementById("pieChart1");
        mapArea.removeAttribute('_echarts_instance_');
        let provinceChart = echarts.init(mapArea,'dark');
        let option = {
            title:{
                text:pName+"省"
            },
            backgroundColor: '#081832',
            legend:{
                data:[
                    {
                        name:"确诊人数",
                        icon:"circle",
                        textStyle:{
                            color:"red"
                        },
                    },
                    {
                        name:"死亡人数",
                        icon: "circle",
                        textStyle: {
                            color: "blue"
                        },
                    },
                    {
                        name:"治愈人数",
                        icon:"circle",
                        textStyle:{
                            color:"green"
                        },
                    }
                ],
                selectedMode:'single',
                selected:{
                    "死亡人数":false,
                    '治愈人数': false
                }
            },
            visualMap: {
                type: 'piecewise',
                pieces: [
                    { min: 1000, max: 1000000, label: '大于等于1000人', color: '#372a28' },
                    { min: 500, max: 999, label: '500-999人', color: '#4e160f' },
                    { min: 100, max: 499, label: '100-499人', color: '#974236' },
                    { min: 10, max: 99, label: '10-99人', color: '#ee7263' },
                    { min: 1, max: 9, label: '1-9人', color: '#f5bba7' },
                    { min: 0, max: 0, label: '0', color: 'lightgray'},
                ],
                color: ['#E0022B', '#E09107', '#A3E00B']
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            series:[
                {
                    name:"确诊人数",
                    type:"map",
                    mapType:pName,
                    roam:false,
                    zoom:1,
                    showLegendSymbol: false,
                    itemStyle: {
                        normal: {
                            // areaColor: '#974236',
                            areaColor:"chocolate",
                            borderColor: '#ffffff'
                        },
                        emphasis: { //鼠标移入高亮显颜色
                            // areaColor: "#ee7263"
                            areaColor: "orange"
                        }
                    },
                    label:{
                        color: "white",
                        show: true
                    },
                    data: []
                },
                {
                    name:"治愈人数",
                    type: "map",
                    mapType: pName,
                    roam: false,
                    zoom: 1,
                    showLegendSymbol: false,
                    itemStyle: {
                        normal: {
                            areaColor: '#008b8b',
                            borderColor: '#ffffff'
                        },
                        emphasis: {
                            areaColor: '#e0ffff'
                        }
                    },
                    label:{
                        color: "white",
                        show: true
                    },
                    data: []
                },
                {
                    name:"死亡人数",
                    type: "map",
                    mapType: pName,
                    roam: false,
                    zoom: 1,
                    showLegendSymbol: false,
                    itemStyle: {
                        normal: {
                            areaColor: "green",
                            borderColor: '#ffffff'
                        },
                        emphasis: {
                            areaColor: "lightgreen"
                        }
                    },
                    label:{
                        color: "white",
                        show: true
                    },
                    data: []
                }
            ]
        };
        provinceChart.setOption(option);
        let confirmArr = [];
        let cureArr = [];
        let deathArr = [];
        //三个Arr的数据格式为：
        // [{
        //   name: '北京11',
        //   value: 212
        // }, {
        //   name: '天津',
        //   value: 60
        // }]
        $.ajax({
            type:'GET',
            url:"Epidemic-data.csv",
            dataType:"text",
            success:function (data) {
                console.log(typeof data);
                console.log(data);
                let jsonData = $.csv.toObjects(data);
                console.log("jsonData");
                console.log(jsonData[0]["城市"]);
                for (let i=0;i<jsonData.length;i++){
                    if (jsonData[i]["省份"]!==pName) continue;
                    if (jsonData[i]["城市"]==="境外输入" || jsonData[i]["城市"]==="地区待确认") continue;
                    let tail;
                    if (jsonData[i]["省份"]==="北京" || jsonData[i]["省份"]==="上海" ){
                        tail = "区";
                    }
                    else if (jsonData[i]["省份"]==="天津" || jsonData[i]["省份"]==="重庆"){
                        tail = "";
                    }
                    else{
                        tail = "市";
                    }　
                    if (jsonData[i]["城市"]==="大兴安岭"){ tail = "地区"; }
                    if (jsonData[i]["城市"]==="延边"){ tail = "朝鲜族自治州"; }
                    if (jsonData[i]["城市"]==="锡林郭勒" || jsonData[i]["城市"]==="阿拉善"){ tail = "盟"; }
                    if (jsonData[i]["城市"]==="兴安盟"){ tail = ""; }
                    if (jsonData[i]["城市"]==="阿克苏"){ tail = "地区"; }
                    if (jsonData[i]["城市"]==="凉山"){ tail = "彝族自治州"; }
                    if (jsonData[i]["城市"]==="甘孜"){ tail = "藏族自治州"; }
                    if (jsonData[i]["城市"]==="阿坝"){ tail = "藏族羌族自治州"; }
                    if (jsonData[i]["城市"]==="湘西自治州"){
                        let confirmJson = {
                            name: "湘西土家族苗族自治州",
                            value: jsonData[i]["确诊"]
                        };
                        confirmArr.push(confirmJson);
                        let cureJson = {
                            name: "湘西土家族苗族自治州",
                            value: jsonData[i]["治愈"]
                        };
                        cureArr.push(cureJson);
                        let deathJson = {
                            name: "湘西土家族苗族自治州",
                            value: jsonData[i]["死亡"]
                        };
                        deathArr.push(deathJson);
                    }
                    if (jsonData[i]["城市"]==="黔南州"){
                        let confirmJson = {
                            name: "黔南布依族苗族自治州",
                            value: jsonData[i]["确诊"]
                        };
                        confirmArr.push(confirmJson);
                        let cureJson = {
                            name: "黔南布依族苗族自治州",
                            value: jsonData[i]["治愈"]
                        };
                        cureArr.push(cureJson);
                        let deathJson = {
                            name: "黔南布依族苗族自治州",
                            value: jsonData[i]["死亡"]
                        };
                        deathArr.push(deathJson);
                    }
                    if (jsonData[i]["城市"]==="黔东南州"){
                        let confirmJson = {
                            name: "黔东南苗族侗族自治州",
                            value: jsonData[i]["确诊"]
                        };
                        confirmArr.push(confirmJson);
                        let cureJson = {
                            name: "黔东南苗族侗族自治州",
                            value: jsonData[i]["治愈"]
                        };
                        cureArr.push(cureJson);
                        let deathJson = {
                            name: "黔东南苗族侗族自治州",
                            value: jsonData[i]["死亡"]
                        };
                        deathArr.push(deathJson);
                    }
                    if (jsonData[i]["城市"]==="黔西南州"){
                        let confirmJson = {
                            name: "黔西南布依族苗族自治州",
                            value: jsonData[i]["确诊"]
                        };
                        confirmArr.push(confirmJson);
                        let cureJson = {
                            name: "黔西南布依族苗族自治州",
                            value: jsonData[i]["治愈"]
                        };
                        cureArr.push(cureJson);
                        let deathJson = {
                            name: "黔西南布依族苗族自治州",
                            value: jsonData[i]["死亡"]
                        };
                        deathArr.push(deathJson);
                    }
                    if (jsonData[i]["城市"]==="德宏州"){
                        let confirmJson = {
                            name: "德宏傣族景颇族自治州",
                            value: jsonData[i]["确诊"]
                        };
                        confirmArr.push(confirmJson);
                        let cureJson = {
                            name: "德宏傣族景颇族自治州",
                            value: jsonData[i]["治愈"]
                        };
                        cureArr.push(cureJson);
                        let deathJson = {
                            name: "德宏傣族景颇族自治州",
                            value: jsonData[i]["死亡"]
                        };
                        deathArr.push(deathJson);
                    }
                    if (jsonData[i]["城市"]==="西双版纳州"){
                        let confirmJson = {
                            name: "西双版纳傣族自治州",
                            value: jsonData[i]["确诊"]
                        };
                        confirmArr.push(confirmJson);
                        let cureJson = {
                            name: "西双版纳傣族自治州",
                            value: jsonData[i]["治愈"]
                        };
                        cureArr.push(cureJson);
                        let deathJson = {
                            name: "西双版纳傣族自治州",
                            value: jsonData[i]["死亡"]
                        };
                        deathArr.push(deathJson);
                    }
                    if (jsonData[i]["城市"]==="文山州"){
                        let confirmJson = {
                            name: "文山壮族苗族自治州",
                            value: jsonData[i]["确诊"]
                        };
                        confirmArr.push(confirmJson);
                        let cureJson = {
                            name: "文山壮族苗族自治州",
                            value: jsonData[i]["治愈"]
                        };
                        cureArr.push(cureJson);
                        let deathJson = {
                            name: "文山壮族苗族自治州",
                            value: jsonData[i]["死亡"]
                        };
                        deathArr.push(deathJson);
                    }
                    if (jsonData[i]["城市"]==="楚雄州"){
                        let confirmJson = {
                            name: "楚雄彝族自治州",
                            value: jsonData[i]["确诊"]
                        };
                        confirmArr.push(confirmJson);
                        let cureJson = {
                            name: "楚雄彝族自治州",
                            value: jsonData[i]["治愈"]
                        };
                        cureArr.push(cureJson);
                        let deathJson = {
                            name: "楚雄彝族自治州",
                            value: jsonData[i]["死亡"]
                        };
                        deathArr.push(deathJson);
                    }
                    if (jsonData[i]["城市"]==="恩施洲"){
                        let confirmJson = {
                            name: "恩施土家族苗族自治州",
                            value: jsonData[i]["确诊"]
                        };
                        confirmArr.push(confirmJson);
                        let cureJson = {
                            name: "恩施土家族苗族自治州",
                            value: jsonData[i]["治愈"]
                        };
                        cureArr.push(cureJson);
                        let deathJson = {
                            name: "恩施土家族苗族自治州",
                            value: jsonData[i]["死亡"]
                        };
                        deathArr.push(deathJson);
                    }
                    if (jsonData[i]["城市"]==="大理"){ tail = "白族自治州"; }
                    if (jsonData[i]["城市"]==="保山市"){ tail = ""; }
                    if (jsonData[i]["城市"]==="红河"){ tail = "哈尼族彝族自治州"; }
                    if (jsonData[i]["城市"]==="昭通市"){ tail = ""; }
                    if (jsonData[i]["城市"]==="丽江市"){ tail = ""; }
                    let confirmJson = {
                        name: jsonData[i]["城市"]+tail,
                        value: jsonData[i]["确诊"]
                    };
                    confirmArr.push(confirmJson);
                    let cureJson = {
                        name: jsonData[i]["城市"]+tail,
                        value: jsonData[i]["治愈"]
                    };
                    cureArr.push(cureJson);
                    let deathJson = {
                        name: jsonData[i]["城市"]+tail,
                        value: jsonData[i]["死亡"]
                    };
                    deathArr.push(deathJson);
                }
                provinceChart.setOption({
                    series: [
                        {
                            name:"确诊人数",
                            type:"map",
                            mapType:pName,
                            roam:true,
                            zoom:1,
                            showLegendSymbol: false,
                            itemStyle: {
                                normal: {
                                    // areaColor: '#974236',
                                    areaColor:"chocolate",
                                    borderColor: '#ffffff'
                                },
                                emphasis: { //鼠标移入高亮显颜色
                                    // areaColor: "#ee7263"
                                    areaColor: "orange"
                                }
                            },
                            label:{
                                color: "white",
                                show: true
                            },
                            data: confirmArr
                        },
                        {
                            name:"治愈人数",
                            type: "map",
                            mapType: pName,
                            roam: true,
                            zoom: 1,
                            showLegendSymbol: false,
                            itemStyle: {
                                normal: {
                                    areaColor: '#008b8b',
                                    borderColor: '#ffffff'
                                },
                                emphasis: {
                                    areaColor: '#e0ffff'
                                }
                            },
                            label:{
                                color: "white",
                                show: true
                            },
                            data: cureArr
                        },
                        {
                            name:"死亡人数",
                            type: "map",
                            mapType: pName,
                            roam: true,
                            zoom: 1,
                            showLegendSymbol: false,
                            itemStyle: {
                                normal: {
                                    areaColor: "green",
                                    borderColor: '#ffffff'
                                },
                                emphasis: {
                                    areaColor: "lightgreen"
                                }
                            },
                            label:{
                                color: "white",
                                show: true
                            },
                            data: deathArr
                        }
                    ]
                })
                console.log(confirmArr);
            }
        })
    }
    drawProvince('湖北');

    function drawZoom(pName) {
        let dateIndex = ['1/22/2020','1/23/2020','1/24/2020','1/25/2020','1/26/2020','1/27/2020','1/28/2020','1/29/2020','1/30/2020','1/31/2020','2/1/2020','2/2/2020','2/3/2020','2/4/2020','2/5/2020','2/6/2020','2/7/2020','2/8/2020','2/9/2020','2/10/2020','2/11/2020','2/12/2020','2/13/2020','2/14/2020','2/15/2020','2/16/2020','2/17/2020','2/18/2020','2/19/2020','2/20/2020','2/21/2020','2/22/2020','2/23/2020','2/24/2020','2/25/2020','2/26/2020','2/27/2020','2/28/2020','2/29/2020','3/1/2020','3/2/2020','3/3/2020','3/4/2020','3/5/2020','3/6/2020','3/7/2020','3/8/2020','3/9/2020','3/10/2020','3/11/2020','3/12/2020','3/13/2020','3/14/2020','3/15/2020','3/16/2020','3/17/2020','3/18/2020','3/19/2020','3/20/2020','3/21/2020','3/22/2020','3/23/2020','3/24/2020','3/25/2020','3/26/2020','3/27/2020','3/28/2020','3/29/2020','3/30/2020','3/31/2020','4/1/2020','4/2/2020','4/3/2020','4/4/2020','4/5/2020','4/6/2020','4/7/2020','4/8/2020','4/9/2020','4/10/2020','4/11/2020','4/12/2020','4/13/2020','4/14/2020','4/15/2020','4/16/2020','4/17/2020','4/18/2020','4/19/2020','4/20/2020','4/21/2020','4/22/2020','4/23/2020','4/24/2020','4/25/2020','4/26/2020','4/27/2020','4/28/2020','4/29/2020','4/30/2020','5/1/2020','5/2/2020','5/3/2020','5/4/2020','5/5/2020','5/6/2020','5/7/2020','5/8/2020','5/9/2020','5/10/2020','5/11/2020','5/12/2020','5/13/2020','5/14/2020','5/15/2020','5/16/2020','5/17/2020','5/18/2020','5/19/2020','5/20/2020','5/21/2020','5/22/2020','5/23/2020','5/24/2020','5/25/2020','5/26/2020','5/27/2020','5/28/2020','5/29/2020','5/30/2020','5/31/2020','6/1/2020','6/2/2020'];
        let confirmZoomData = [0];
        let cureZoomData = [0];
        let deathZoomData = [0];
        let dateIndex0 = ['1/22/2020','1/23/2020','1/24/2020','1/25/2020','1/26/2020'];
        let confirmData0 = [2000,3500,5000,6000,7500];
        let cureData0 = [20,120,350,400,600];
        let deathData0 = [2,5,10,35,60];
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pieChart2'),'dark');

        // 指定图表的配置项和数据
        var option = {
            title:{
                text:pName+"省"
            },
            backgroundColor: '#081832',
            xAxis: {
                type: 'category',
                data:dateIndex
            },
            yAxis: {
                type: 'value'
            },
            dataZoom: [
                {   // 这个dataZoom组件，默认控制x轴。
                    type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                    start: 10,      // 左边在 10% 的位置。
                    end: 60         // 右边在 60% 的位置。
                }
            ],
            legend:{
                data:[
                    {
                        name:"确诊人数",
                        icon:"circle",
                        textStyle:{
                            color:"red"
                        }
                    },
                    {
                        name:"死亡人数",
                        icon: "circle",
                        textStyle: {
                            color: "blue"
                        }
                    },
                    {
                        name:"治愈人数",
                        icon:"circle",
                        textStyle:{
                            color:"green"
                        }
                    }
                ],
                // selectedMode:'single',
                // selected:{
                //     "死亡人数":false,
                //     '治愈人数': false
                // }
            },
            series: [
                {
                    name:'确诊人数',
                    type: 'line', // 这是个『散点图』
                    smooth: true,
                    itemStyle: {
                        opacity: 0.8
                    },
                    symbolSize: function (val) {
                        return val[2] * 40;
                    },
                    data:[]
                },
                {
                    name:'治愈人数',
                    type: 'line', // 这是个『散点图』
                    smooth: true,
                    itemStyle: {
                        opacity: 0.8
                    },
                    symbolSize: function (val) {
                        return val[2] * 40;
                    },
                    data:[]
                },
                {
                    name:'死亡人数',
                    type: 'line', // 这是个『散点图』
                    smooth: true,
                    itemStyle: {
                        opacity: 0.8
                    },
                    symbolSize: function (val) {
                        return val[2] * 40;
                    },
                    data:[]
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        function getZoomData(pName){
            confirmZoomData = [0];
            cureZoomData = [0];
            deathZoomData = [0];

            $.ajax({
                type: 'GET',
                url: 'confirmed-data.csv',
                dataType:'text',
                success: function (data) {
                    let jsonData = $.csv.toObjects(data);
                    for (let i=0;i<jsonData.length;++i){
                        if (jsonData[i]['Province/State']!==pName) continue;
                        for (let j=1;j<dateIndex.length;++j){
                            let m = Number(jsonData[i][dateIndex[j]]);
                            let n = Number(jsonData[i][dateIndex[j-1]]);
                            confirmZoomData.push((m-n)/n);
                        }
                    }
                    myChart.setOption({
                        series: [
                            {
                                name:'确诊人数',
                                type: 'line', // 这是个『散点图』
                                smooth: true,
                                itemStyle: {
                                    opacity: 0.8
                                },
                                symbolSize: function (val) {
                                    return val[2] * 40;
                                },
                                data:confirmZoomData
                            }
                        ]
                    });
                }
            });


            $.ajax({
                type: 'GET',
                url: 'cure-data.csv',
                dataType:'text',
                success: function (data) {
                    let jsonData = $.csv.toObjects(data);
                    for (let i=0;i<jsonData.length;++i){
                        if (jsonData[i]['Province/State']!==pName) continue;
                        for (let j=1;j<dateIndex.length;++j){
                            let m = Number(jsonData[i][dateIndex[j]]);
                            let n = Number(jsonData[i][dateIndex[j-1]]);
                            cureZoomData.push((m-n)/n);
                        }
                    }
                    myChart.setOption({
                        series: [
                            {
                                name:'确诊人数',
                                type: 'line', // 这是个『散点图』
                                smooth: true,
                                itemStyle: {
                                    opacity: 0.8
                                },
                                symbolSize: function (val) {
                                    return val[2] * 40;
                                },
                                data:confirmZoomData
                            },
                            {
                                name:'治愈人数',
                                type: 'line', // 这是个『散点图』
                                smooth: true,
                                itemStyle: {
                                    opacity: 0.8
                                },
                                symbolSize: function (val) {
                                    return val[2] * 40;
                                },
                                data:cureZoomData
                            }
                        ]
                    });
                }
            });
            $.ajax({
                type: 'GET',
                url: 'death-data.csv',
                dataType:'text',
                success: function (data) {
                    let jsonData = $.csv.toObjects(data);
                    for (let i=0;i<jsonData.length;++i){
                        if (jsonData[i]['Province/State']!==pName) continue;
                        for (let j=1;j<dateIndex.length;++j){
                            let m = Number(jsonData[i][dateIndex[j]]);
                            let n = Number(jsonData[i][dateIndex[j-1]]);
                            deathZoomData.push((m-n)/n);
                        }
                    }
                    myChart.setOption({
                        series: [
                            {
                                name:'确诊人数',
                                type: 'line', // 这是个『散点图』
                                smooth: true,
                                itemStyle: {
                                    opacity: 0.8
                                },
                                symbolSize: function (val) {
                                    return val[2] * 40;
                                },
                                data:confirmZoomData
                            },
                            {
                                name:'治愈人数',
                                type: 'line', // 这是个『散点图』
                                smooth: true,
                                itemStyle: {
                                    opacity: 0.8
                                },
                                symbolSize: function (val) {
                                    return val[2] * 40;
                                },
                                data:cureZoomData
                            },
                            {
                                name:'死亡人数',
                                type: 'line', // 这是个『散点图』
                                smooth: true,
                                itemStyle: {
                                    opacity: 0.8
                                },
                                symbolSize: function (val) {
                                    return val[2] * 40;
                                },
                                data:deathZoomData
                            }
                        ]
                    });
                }
            });

        }
        getZoomData(pName);
    }
    drawZoom('湖北');

    function drawTimeSeries(pName){
        let dateIndex = ['人数种类','1/22/2020','1/23/2020','1/24/2020','1/25/2020','1/26/2020','1/27/2020','1/28/2020','1/29/2020','1/30/2020','1/31/2020','2/1/2020','2/2/2020','2/3/2020','2/4/2020','2/5/2020','2/6/2020','2/7/2020','2/8/2020','2/9/2020','2/10/2020','2/11/2020','2/12/2020','2/13/2020','2/14/2020','2/15/2020','2/16/2020','2/17/2020','2/18/2020','2/19/2020','2/20/2020','2/21/2020','2/22/2020','2/23/2020','2/24/2020','2/25/2020','2/26/2020','2/27/2020','2/28/2020','2/29/2020','3/1/2020','3/2/2020','3/3/2020','3/4/2020','3/5/2020','3/6/2020','3/7/2020','3/8/2020','3/9/2020','3/10/2020','3/11/2020','3/12/2020','3/13/2020','3/14/2020','3/15/2020','3/16/2020','3/17/2020','3/18/2020','3/19/2020','3/20/2020','3/21/2020','3/22/2020','3/23/2020','3/24/2020','3/25/2020','3/26/2020','3/27/2020','3/28/2020','3/29/2020','3/30/2020','3/31/2020','4/1/2020','4/2/2020','4/3/2020','4/4/2020','4/5/2020','4/6/2020','4/7/2020','4/8/2020','4/9/2020','4/10/2020','4/11/2020','4/12/2020','4/13/2020','4/14/2020','4/15/2020','4/16/2020','4/17/2020','4/18/2020','4/19/2020','4/20/2020','4/21/2020','4/22/2020','4/23/2020','4/24/2020','4/25/2020','4/26/2020','4/27/2020','4/28/2020','4/29/2020','4/30/2020','5/1/2020','5/2/2020','5/3/2020','5/4/2020','5/5/2020','5/6/2020','5/7/2020','5/8/2020','5/9/2020','5/10/2020','5/11/2020','5/12/2020','5/13/2020','5/14/2020','5/15/2020','5/16/2020','5/17/2020','5/18/2020','5/19/2020','5/20/2020','5/21/2020','5/22/2020','5/23/2020','5/24/2020','5/25/2020','5/26/2020','5/27/2020','5/28/2020','5/29/2020','5/30/2020','5/31/2020','6/1/2020','6/2/2020'];
        let confirmData = [];
        confirmData.push("确诊人数");
        let cureData = [];
        cureData.push("治愈人数");
        let deathData = [];
        deathData.push("死亡人数");

        let mapArea = document.getElementById("histogramChart1");
        mapArea.removeAttribute('_echarts_instance_');
        let myInteractChart = echarts.init(mapArea,'dark');

        setTimeout(function () {
            option = {
                title:{
                    text:pName+"省"
                },
                legend:{},
                tooltip: {
                    trigger: "axis",
                    showContent:false
                },
                dataset:{
                    source:[
                        // ["人数种类",'1/22/2020','1/23/2020','1/24/2020','1/25/2020','1/26/2020'],
                        // ["确诊人数",2000,3500,5000,6000,7500],
                        // ["治愈人数",20,120,350,400,600],
                        // ["死亡人数",2,5,10,35,60],
                        dateIndex,
                        // confirmData,
                        // cureData,
                        // deathData,
                    ]
                },
                xAxis:{
                    type:"category"
                },
                yAxis:{
                    gridIndex:0
                },
                grid:{
                    top:"55%"
                },
                series:[
                    {type:"line", smooth: true,seriesLayoutBy: "row"},
                    {type: "line",smooth: true,seriesLayoutBy: "row"},
                    {type: "line",smooth: true,seriesLayoutBy: "row"},
                    // {type: "line",smooth: true,seriesLayoutBy: "row"},
                    {
                        type: "pie",
                        id:"pie",
                        radius:"30%",
                        center:["50%","25%"],
                        label:{
                            formatter: "{b}: {@1/22/2020} ({d}%)"
                        },
                        encode: {
                            itemName: "人数种类",
                            value:"1/22/2020",
                            tooltip:"1/22/2020"
                        }
                    }
                ]
            };
            myInteractChart.on("updateAxisPointer",function (event) {
                let xAxisInfo = event.axesInfo[0];
                if (xAxisInfo){
                    let dimension = xAxisInfo.value+1;

                    console.log(dimension);
                    myInteractChart.setOption({
                        series:{
                            id:"pie",
                            label:{
                                format:"{b}: {@['dimension']} ({d}%)"
                            },
                            encode: {
                                value: dimension,
                                tooltip: dimension
                            }
                        }
                    });
                }
            });
            myInteractChart.setOption(option);
            myInteractChart.setOption({
                backgroundColor: '#081832',
            });
        });

        function getInteractionData(pName){
            console.log("getInterData");
            confirmData = [];
            confirmData.push("确诊人数");
            cureData = [];
            cureData.push("治愈人数");
            deathData = [];
            deathData.push("死亡人数");
            $.ajax({
                type: 'GET',
                url: 'confirmed-data.csv',
                dataType:'text',
                success: function (data) {
                    let jsonData = $.csv.toObjects(data);
                    for (let i=0;i<jsonData.length;++i){
                        if (jsonData[i]['Province/State']!==pName) continue;
                        for (let j=1;j<dateIndex.length;++j){
                            confirmData.push(Number(jsonData[i][dateIndex[j]]));
                        }
                    }
                    myInteractChart.setOption({
                        backgroundColor: '#081832',
                        dataset: {
                            source:[
                                // ["人数种类",'1/22/2020','1/23/2020','1/24/2020','1/25/2020','1/26/2020'],
                                // ["确诊人数",2000,3500,5000,6000,7500],
                                // ["治愈人数",20,120,350,400,600],
                                // ["死亡人数",2,5,10,35,60],
                                dateIndex,
                                confirmData,
                                // cureData,
                                // deathData,
                            ]
                        },
                    })
                }
            });
            $.ajax({
                type: 'GET',
                url: 'cure-data.csv',
                dataType:'text',
                success: function (data) {
                    let jsonData = $.csv.toObjects(data);
                    for (let i=0;i<jsonData.length;++i){
                        if (jsonData[i]['Province/State']!==pName) continue;
                        for (let j=1;j<dateIndex.length;++j){
                            cureData.push(Number(jsonData[i][dateIndex[j]]));
                        }
                    }
                    myInteractChart.setOption({
                        dataset: {
                            source:[
                                // ["人数种类",'1/22/2020','1/23/2020','1/24/2020','1/25/2020','1/26/2020'],
                                // ["确诊人数",2000,3500,5000,6000,7500],
                                // ["治愈人数",20,120,350,400,600],
                                // ["死亡人数",2,5,10,35,60],
                                dateIndex,
                                confirmData,
                                cureData,
                                // deathData,
                            ]
                        },
                    })
                }
            });
            $.ajax({
                type: 'GET',
                url: 'death-data.csv',
                dataType:'text',
                success: function (data) {
                    let jsonData = $.csv.toObjects(data);
                    for (let i=0;i<jsonData.length;++i){
                        if (jsonData[i]['Province/State']!==pName) continue;
                        for (let j=1;j<dateIndex.length;++j){
                            deathData.push(Number(jsonData[i][dateIndex[j]]));
                        }
                    }
                    myInteractChart.setOption({
                        dataset: {
                            source:[
                                // ["人数种类",'1/22/2020','1/23/2020','1/24/2020','1/25/2020','1/26/2020'],
                                // ["确诊人数",2000,3500,5000,6000,7500],
                                // ["治愈人数",20,120,350,400,600],
                                // ["死亡人数",2,5,10,35,60],
                                dateIndex,
                                confirmData,
                                cureData,
                                deathData,
                            ]
                        },
                    })
                }
            });


        }

        getInteractionData(pName);
    }

    drawTimeSeries('湖北');
    myChart.on("click",function (params) {
        console.log("params");
        console.log(params.data.name);
        drawProvince(params.data.name);
        drawZoom(params.data.name);
        drawTimeSeries(params.data.name);
    });




  //各医院住院人次
  var histogramChart2 = echarts.init(document.getElementById('histogramChart2'));
  histogramChart2.setOption({

     grid: {
         top: '20%',
         left: '32%'
     },
     xAxis: {
         show: false
     },
     yAxis: [{
         show: true,
         data:  ['厦门第一医院','厦门中山医院','厦门中医院','厦门第五医院',],
         inverse: true,
         axisLine: {
             show: false
         },
         splitLine: {
             show: false
         },
         axisTick: {
             show: false
         },
         axisLabel: {
             color: '#fff',
             formatter: (value, index) => {
                 return [

                     `{lg|${index+1}}  ` + '{title|' + value + '} '
                 ].join('\n')
             },
             rich: {
                 lg: {
                     backgroundColor: '#339911',
                     color: '#fff',
                     borderRadius: 15,
                     // padding: 5,
                     align: 'center',
                     width: 15,
                     height: 15
                 },
             }
         },


     }, {
         show: true,
         inverse: true,
         data: [2200, 2400, 2600, 2800],
         axisLabel: {
             textStyle: {
                 fontSize: 12,
                 color: '#fff',
             },
         },
         axisLine: {
             show: false
         },
         splitLine: {
             show: false
         },
         axisTick: {
             show: false
         },

     }],
     series: [{
         name: '条',
         type: 'bar',
         yAxisIndex: 0,
         data:  [22, 24, 26, 28],
         barWidth: 10,
         itemStyle: {
             normal: {
                 barBorderRadius: 20,
                 color: function(params) {
                     var num = myColor.length;
                     return myColor[params.dataIndex % num]
                 },
             }
         },
         label: {
             normal: {
                 show: true,
                 position: 'inside',
                 formatter: '{c}%'
             }
         },
     }, {
         name: '框',
         type: 'bar',
         yAxisIndex: 1,
         barGap: '-100%',
         data: [100, 100, 100, 100],
         barWidth: 15,
         itemStyle: {
             normal: {
                 color: 'none',
                 borderColor: '#00c1de',
                 borderWidth: 3,
                 barBorderRadius: 15,
             }
         }
     }, ]
  })


    //医疗费用
    var lineChart1 = echarts.init(document.getElementById('lineChart1'));
    lineChart1.setOption( {
      color:["#87cefa","#ff7f50","#32cd32","#da70d6",],
      tooltip : {
           trigger: 'item',
           formatter: "{a}<br/>{b}<br/>{c}元"
       },
       legend: {
        data:['厦门第一医院','厦门中山医院','厦门中医院','厦门第五医院',],
        y: 'bottom',
        x:'center',
        textStyle:{
            color:'#fff',
            fontSize:12
        }
      },
      grid:{
        left: '5%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      },
      calculable : true,
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              data : ['周一','周二','周三','周四','周五','周六','周日'],
              axisLine:{
                   lineStyle:{
                       color: '#87cefa'
                   },
               },
               axisLabel : {
                 interval:0,
                 rotate:40,

                   textStyle: {
                       color: '#fff',
                       fontSize:13
                   }
               }
          }
      ],
      yAxis : [
          {
              type : 'value',
              axisLine:{
                  lineStyle:{
                      color: '#87cefa'
                  },
              },
              splitLine: {
                  "show": false
              },
              axisLabel: {
                  textStyle: {
                      color: '#fff'
                  },
                  formatter: function (value) {
                      return value + "元"
                  },
              },
          }
      ],
      series : [
          {
              name:'厦门第一医院',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[10, 12, 21, 54, 260, 830, 710]
          },
          {
              name:'厦门中山医院',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[30, 182, 434, 791, 390, 30, 10]
          },
          {
              name:'厦门中医院',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[1320, 1132, 601, 234, 120, 90, 20]
          },
          {
              name:'厦门第五医院',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[320, 132, 61, 34, 20, 9, 2]
          }
      ]

    })

    //体检人次
    var lineChart2 = echarts.init(document.getElementById('lineChart2'));
    lineChart2.setOption( {
      color:["#87cefa","#ff7f50","#32cd32","#da70d6",],
      tooltip : {
           trigger: 'item',
           formatter: "{a}<br/>{b}<br/>{c}人"
       },
       legend: {
        data:['厦门第一医院','厦门中山医院','厦门中医院','厦门第五医院',],
        y: 'bottom',
        x:'center',
        textStyle:{
            color:'#fff',
            fontSize:12
        }
      },
      grid:{
        left: '5%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      },
      calculable : true,
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              data : ['周一','周二','周三','周四','周五','周六','周日'],
              axisLine:{
                   lineStyle:{
                       color: '#87cefa'
                   },
               },
               axisLabel : {
                 interval:0,
                 rotate:40,

                   textStyle: {
                       color: '#fff',
                       fontSize:13
                   }
               }
          }
      ],
      yAxis : [
          {
              type : 'value',
              axisLine:{
                  lineStyle:{
                      color: '#87cefa'
                  },
              },
              splitLine: {
                  "show": false
              },
              axisLabel: {
                  textStyle: {
                      color: '#fff'
                  },
                  formatter: function (value) {
                      return value + "人"
                  },
              },
          }
      ],
      series : [
          {
              name:'厦门第一医院',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[120, 122, 221, 524, 460, 530, 610]
          },
          {
              name:'厦门中山医院',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[130, 682, 534, 691, 490, 130, 110]
          },
          {
              name:'厦门中医院',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[320, 132, 161, 134, 112, 190, 120]
          },
          {
              name:'厦门第五医院',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[320, 132, 461, 34, 202, 93, 222]
          }
      ]

    })


    //药占比
    var histogramChart3 = echarts.init(document.getElementById('histogramChart3'));
    histogramChart3.setOption( {

      color:['#87cefa'],
      grid:{
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
      },
      tooltip : {
         trigger: 'item',
         formatter: "{a}<br/>{b}<br/>{c}%"
     },
      calculable : true,
      xAxis : [
          {
              type : 'category',
              data : ['厦门第一医院','厦门中山医院','厦门中医院','厦门第五医院',],
              axisLine:{
                   lineStyle:{
                       color: '#87cefa'
                   },
               },
               axisLabel : {
                 interval:0,
                 rotate:40,

                   textStyle: {
                       color: '#fff',
                       fontSize:13
                   }
               }
          }
      ],
      yAxis : [
          {
              type : 'value',
              axisLine:{
                  lineStyle:{
                      color: '#87cefa'
                  },
              },
              splitLine: {
                  "show": false
              },
              axisLabel: {
                  textStyle: {
                      color: '#fff'
                  },
                  formatter: function (value) {
                      return value + "%"
                  },
              },
          }
      ],
      series : [
          {
              name:'药占比',
              type:'bar',
              barWidth:30,
              data:[60,80,70,50],
          },
      ]
    });

    //平均住院天数
    var histogramChart4 = echarts.init(document.getElementById('histogramChart4'));
    histogramChart4.setOption( {
      color:['#87cefa'],
      grid:{
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
      },
      tooltip : {
         trigger: 'item',
         formatter: "{a}<br/>{b}<br/>{c}天"
     },
      calculable : true,
      xAxis : [
          {
              type : 'category',
              data : ['厦门第一医院','厦门中山医院','厦门中医院','厦门第五医院',],
              axisLine:{
                   lineStyle:{
                       color: '#87cefa'
                   },
               },
               axisLabel : {
                 interval:0,
                 rotate:40,

                   textStyle: {
                       color: '#fff',
                       fontSize:13
                   }
               }
          }
      ],
      yAxis : [
          {
              type : 'value',
              axisLine:{
                  lineStyle:{
                      color: '#87cefa'
                  },
              },
              splitLine: {
                  "show": false
              },
              axisLabel: {
                  textStyle: {
                      color: '#fff'
                  },
                  formatter: function (value) {
                      return value + "天"
                  },
              },
          }
      ],
      series : [
          {
              name:'平均住院天数',
              type:'bar',
              barWidth:30,
              data:[6,8,7,5],
          },
      ]
    });

}