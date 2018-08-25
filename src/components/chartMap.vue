<template>
<div class="map" id="map"></div>
</template>

<script>
import echarts from 'echarts'
import getElement from '../js/getElement.js'
import whmapdata from '../json/371400.json'
import data from '../json/data.json'

echarts.registerMap('weihai', whmapdata);

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
                    formatter: '{b}<br/>{c} (p / km2)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    tooltip: {
                        show: true
                    }
                },
                visualMap: {
                    min: 800,
                    max: 50000,
                    text:['High','Low'],
                    realtime: false,
                    calculable: true,
                    inRange: {
                        color: ['lightskyblue','yellow', 'orangered']
                    }
                },
                // visualMap: {
                //     min: 0,
                //     max: 2500,
                //     show: false,
                //     inRange: {
                //         color: ['#ff7980', '#ffb59a', '#ffd6b8']
                //     },
                //     formater: 'aaaa{1000-2000}'
                // },
                series: [{
                    type: 'map',
                    map: 'weihai',
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
                    itemStyle:{
                        normal:{label:{show:true}},
                        emphasis:{label:{show:true}}
                    },
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
