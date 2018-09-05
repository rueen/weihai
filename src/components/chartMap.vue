<template>
<!-- <div class="map" id="map"></div> -->
<div class="map">
    <div class="tips" :class="{'left': !waveList[curIndex].right,'right': !waveList[curIndex].left}" :style="{'top': (waveList[curIndex].top + 'rem') || 'auto', 'left': waveList[curIndex].left + 'rem', 'right': (waveList[curIndex].right + 'rem') || 'auto'}">
        <div class="inner">
            <p class="title">{{list[curIndex].title}}</p>
            <p class="text">{{list[curIndex].text}}</p>
        </div>
    </div>
    <span class="wave" :class="{'left': !item.right,'right': !item.left,'wave-red': item.type == 2, 'cur': index == curIndex}" v-for="(item, index) in waveList" :style="{'top': (item.top + 'rem') || 'auto', 'left': item.left + 'rem', 'right': (item.right + 'rem') || 'auto'}"></span>
</div>
</template>

<script>
import echarts from 'echarts'
import getElement from '../js/getElement.js'

export default {
    data() {
        return {
            top: 0,
            left: 0,
            curIndex: 0,
            waveList: [
                {top: .6, left: 4.3, type: 2},
                {top: 1.78, left: 4.2, type: 2},
                {top: 3.3, left: .62, type: 2},
                {top: 3.67, left: 1.83, type: 1},
                {top: 2.56, left: 3.6, type: 2},
                {top: 2.38, right: .9, type: 2},
                {top: 3.65, left: 3.48, type: 1},
                {top: 3, left: 4.3, type: 2},
                {top: 3.7, right: 1.3, type: 1},
                {top: 3.2, right: 1.45, type: 2},
                {top: 2.88, left: 3.38, type: 1},
                {top: 3.15, left: 4, type: 1},
                {top: 3.6, left: 4, type: 2},
                {top: 3.52, left: 2.87, type: 1},
                {top: 1.6, right: 1.8, type: 2},
                {top: 1.9, right: 1.1, type: 1},
                {top: 1.1, left: 3.96, type: 1},
                {top: 4.1, left: 1.52, type: 2},
                {top: 2.45, left: 4.4, type: 1},
            ],
            list: [
                {
                    title: '信用记录查询',
                    text: '宋**，在服务大厅查询个人信用记录'
                },
                {
                    title: '最多跑一次信息核实',
                    text: '孙**，对渔具从业者进行了信息核实'
                },
                {
                    title: '信易行',
                    text: '曾**，在找车位时，使用了威海共享停车服务'
                },
                {
                    title: '信易贷',
                    text: '李**，在办理企业贷款时进行信息核查'
                },
                {
                    title: '信易游',
                    text: '周**，在刘公岛旅游时，使用了信用租赁服务'
                },
                {
                    title: '联合奖惩',
                    text: '罗**，在办理落户时，享受了守信激励政策'
                }
            ]
        }
    },
    created() {
        var timer = null;

        clearInterval(timer);
        timer = setInterval(() => {
            this.curIndex = this.getIndex(this.list.length - 1);
        }, 3000)
        // this.renderEchart();
        // this.render();
    },
    methods:{
        getIndex(max){
            return Math.floor(Math.random()*(max+1));
        },
        render(){
            var mapData = {
                num: [1, 3], // 每次出现球的个数范围： 最小6 最大10
                symbolSize: [8, 20], // 球大小控制：最小20 最大30
                title: '地图标题',
                mapColor: '#259cf0', //地图填充颜色
                borderColor: '#16427b', //地图边框颜色
                shadowColor: '#01174d', //阴影颜色
                shadowBlur: 0, //地图阴影
                setIntervalTime: 3000, //默认刷新时间3秒
            }

            var data = [{name: '环翠区', value: 2},
                        {name: '荣成市', value: 1},
                        {name: '乳山市', value: 4},
                        {name: '文登市', value: 3}];
            var geoCoordMap = {
                '环翠区': [122.12, 37.5],
                '荣成市': [122.42, 37.17],
                '乳山市': [121.53, 36.92],
                '文登市': [122.05, 37.2]
            };
            var convertData = function(data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };

            function randNum2(min, max, num) {
                if (num > max - min) {
                    console.error('范围太小');
                    return false;
                }
                var range = max - min,
                    minV = min + 1, //实际上可以取的最小值
                    arr = [],
                    tmp = "";

                function GenerateANum(i) {
                    for (i; i < num; i++) {
                        var rand = Math.random(); //  rand >=0  && rand < 1
                        tmp = Math.floor(rand * range + minV);
                        // console.log('i',i,tmp);

                        if (arr.indexOf(tmp) == -1) {
                            arr.push(tmp)
                        } else {
                            GenerateANum(i);
                            break;
                        }

                    }
                }
                GenerateANum(0); //默认从0开始
                return arr;
            }

            function getSeries() {
                var nums = randNum2(mapData.num[0], mapData.num[1], 1)[0]
                var arrIndex = randNum2(0, 3, nums)
                var tempArr = []
                arrIndex.forEach((item) => {
                    tempArr.push(data[item])
                })
                return convertData(tempArr)
            }
            var option = {
                geo: {
                    map: 'weihai',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: false,
                    itemStyle: {
                        normal: {
                            // areaColor: mapData.mapColor,
                            // borderColor: mapData.borderColor,
                            // shadowColor: mapData.shadowColor,
                            // shadowBlur: mapData.shadowBlur
                        },
                        emphasis: {
                            areaColor: mapData.mapColor,
                        }
                    }
                },
                tooltip: {
                    trigger: 'item',
                    padding: 10,
                    showDelay: 0,
                    transitionDuration: 0.2,
                    formatter: function (params) {
                        // console.log(params)
                        return '<span style="font-size: .16rem;">信用记录查询</span><br/><span style="font-size: .14rem;">，在服务大厅查询个人信用记录</span>'
                    }
                },
                visualMap: {
                    show: false,
                    min: 1,
                    max: 4,
                    color: ['rgba(0,0,0,0)'],
                    calculable: true
                },
                series: [{
                    type: 'map',
                    map: 'weihai',
                    geoIndex: 0,
                    aspectScale: 0.75, //长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    data: data
                },{
                    name: 'point',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: getSeries(),
                    symbolSize: function(val) {
                        let num = randNum2(mapData.symbolSize[0], mapData.symbolSize[1], 1)[0]
                        return num
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: false,
                    itemStyle: {
                        normal: {
                            color: 'rgba(51,255,249, .8)',
                            shadowBlur: 18,
                            shadowColor: 'rgba(51,255,249, .3)'
                        }
                    },
                    zlevel: 3
                }],
                animationDelayUpdate: function(idx) {
                    return idx * 100;
                }
            };

            getElement('map', $elem => {
                let barChart = echarts.init($elem);

                setInterval(() => {
                    option.series[0].data = getSeries()
                    barChart.setOption(option, true);
                }, mapData.setIntervalTime);
            })
        },
        renderEchart(){
            var option = {
                tooltip: {
                    trigger: 'item',
                    padding: 10,
                    showDelay: 0,
                    transitionDuration: 0.2,
                    formatter: function (params) {
                        // console.log(params)
                        return '<span style="font-size: 16px;">信用记录查询</span><br/><span style="font-size: 14px;">，在服务大厅查询个人信用记录</span>'
                    }
                },
                visualMap: {
                    show: false,
                    min: 1,
                    max: 4,
                    color: ['#1468d9','#1f7bf8','#259cf0'],
                    text:['High','Low'],// 文本，默认为数值文本
                    calculable: true
                },
                series: [{
                    name: '威海',
                    type: 'map',
                    map: 'weihai',
                    roam: false,
                    itemStyle:{
                        emphasis:{label:{show:true}}
                    },
                    // 文本位置修正
                    textFixed: {
                        Alaska: [20, -20]
                    },
                    data:[
                        {name: '环翠区', value: 2},
                        {name: '荣成市', value: 1},
                        {name: '乳山市', value: 4},
                        {name: '文登市', value: 3}
                    ]
                }]
            };
            
            getElement('map', $elem => {
                let barChart = echarts.init($elem);
                barChart.setOption(option);
            })
        },
    }
}
</script>

<style scoped>
.tips{
    position: absolute;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    z-index: 3;
    padding-left: 10px;
    min-width: 2rem;
    max-width: 3rem;
}
.tips.right{
    padding-left: 0;
    padding-right: 10px;
}
.tips .inner{
    padding: .15rem .15rem;
    border-radius: .1rem;
    background: rgba(0,0,0,.3);
    /*box-shadow: 0 2px 2px rgba(0,0,0.1);
    -moz-box-shadow: 0 2px 2px rgba(0,0,0.1);
    -webkit-box-shadow: 0 2px 2px rgba(0,0,0.1);*/
}
.tips:after{
    content: '';
    position: absolute;
    display: block;
    width: 0; height: 0;
    top: 50%;
    margin-top: -10px;
    opacity: .3;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
}
.tips.left:after{
    border-right: 10px solid #000;
    border-left: none;
    left: 0;
}
.tips.right:after{
    border-left: 10px solid #000;
    border-right: none;
    right: 0;
}
.tips .title{
    font-size: .16rem;
    line-height: .3rem;
    margin-bottom: .1rem;
}
.tips .text{
    font-size: .14rem;
    line-height: .2rem;
}
.wave{
    width: 16px; height: 16px;
    position: absolute;
    background: url(../assets/wave.gif) no-repeat 0 0;
    background-size: 100% auto;
    z-index: 1;
    opacity: .8;
}
.wave.left{
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
}
.wave.right{
    -webkit-transform: translateX(50%) translateY(-50%);
    transform: translateX(50%) translateY(-50%);
}
.wave.cur{
    width: 22px; height: 22px;
    opacity: 1;
}
.wave-red{
    background: url(../assets/wave2.gif) no-repeat 0 0;
    background-size: 100% auto;
}
.map{
    width: 7rem; height: 6rem;
    /*width: auto; height: auto;*/
    /*width: 36.5%; height: 58%;*/
    position: absolute;
    top: 40%;
    left: 50%; margin-left: -3.5rem;
    background: url(../assets/map-bg.png) no-repeat 0 0;
    background-size: 100% auto;
}
</style>
