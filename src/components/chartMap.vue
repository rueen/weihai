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
        this.renderEchart();
    },
    methods:{
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
