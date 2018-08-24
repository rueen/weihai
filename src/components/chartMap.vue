<template>
<div class="map" id="map"></div>
</template>

<script>
import echarts from 'echarts'
import getElement from '../js/getElement.js'
import hzmapdata from '../json/hangzhou.json'
import data from '../json/data.json'

echarts.registerMap('hangzhou', hzmapdata);

export default {
    data() {
        return {
            
        }
    },
    created() {
        this.renderEchart();
    },
    methods:{
        renderEchart(){
            var option = {
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(3,72,123,1)',
                    borderColor: '#03487b',
                    borderRadius: 8,
                    borderWidth: 2,
                    padding: 10,    // [5, 10, 15, 20]
                    position: function (p) {
                        // 位置回调
                        // console.log && console.log(p);
                        return [p[0] + 10, p[1] - 10];
                    },
                    formatter: function (params, ticket, callback) {
                        // console.log(params)
                        // var res = 'Function formatter : <br/>' + params.name;
                        // for (var i = 0, l = params.length; i < l; i++) {
                        //     res += '<br/>' + params[i].seriesName + ' : ' + params[i].value;
                        // }
                        var obj = data[params.name];
                        var res = '<div>' + params.name + '</div><div>企业：' + obj.enterprise + '</div><div>自然人：' + obj.people + '</div>'
                        setTimeout(function () {
                            // 仅为了模拟异步回调
                            callback(ticket, res);
                        }, 50);
                        return res;
                    }
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    tooltip: {
                        show: true
                    }
                },
                visualMap: {
                    min: 0,
                    max: 2500,
                    show: false,
                    inRange: {
                        color: ['#ff7980', '#ffb59a', '#ffd6b8']
                    },
                    formater: 'aaaa{1000-2000}'
                },
                series: [{
                    type: 'map',
                    map: 'hangzhou',
                    roam: false,
                    scaleLimit:{
                        min:1,
                        max:3
                    },
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#0e2b43',
                            borderColor: '#296bac'
                        },
                        emphasis:{
                            label:{
                                show:false
                            },
                            // areaColor:"#0186e1",
                            color:'red',
                            borderColor:'#48b'
                        }
                    }
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
