<template>
<div class="map" id="map"></div>
</template>

<script>
import echarts from 'echarts'
import getElement from '../js/getElement.js'
import whMapJson from '../json/whMapJson.json'

echarts.registerMap('weihai', whMapJson);

export default {
    data() {
        return {
            
        }
    },
    created() {
        // this.renderEchart();
        this.render();
    },
    methods:{
        render(){
            var mapData = {
                num: [1, 3], // 每次出现球的个数范围： 最小6 最大10
                symbolSize: [8, 20], // 球大小控制：最小20 最大30
                title: '地图标题',
                mapColor: '#259cf0', //地图填充颜色
                borderColor: '#16427b', //地图边框颜色
                shadowColor: '#01174d', //阴影颜色
                shadowBlur: 0, //地图阴影
                setIntervalTime: 5000, //默认刷新时间3秒
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
                            areaColor: mapData.mapColor,
                            borderColor: mapData.borderColor,
                            shadowColor: mapData.shadowColor,
                            shadowBlur: mapData.shadowBlur
                        },
                        emphasis: {
                            areaColor: mapData.mapColor,
                        }
                    }
                },
                series: [{
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
.map{
    width: 100%; height: 6rem;
}
</style>
