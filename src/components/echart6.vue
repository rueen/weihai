<template>
<div class="echart" id="echart6"></div>
</template>

<script>
import echarts from 'echarts'
import getElement from '../js/getElement.js'

export default {
    data() {
        return {
            
        }
    },
    created() {
        getElement('echart6', $elem => {
            var legendX = parseInt($elem.offsetWidth) - 90;

            this.renderEchart(legendX);
        })
    },
    methods:{
        //渲染echart
        renderEchart(legendX){
            var option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}"
                },
                legend: {
                    width: 90,
                    x: legendX,
                    y: 'center',
                    orient: 'vertical',
                    itemWidth: 10,
                    itemHeight: 10,
                    icon:'path://M512 512m-192 0a192 192 0 1 0 384 0 192 192 0 1 0-384 0Z',
                    textStyle: {
                        color: '#fff',
                        fontSize:'.12rem'
                    },
                    data:[
                    {
                        name: '金融业',
                    },
                    {
                        name: '租赁和商务服务业',
                    },
                    {
                        name: '建筑业',
                    },
                    {
                        name: '制造业',
                    },
                    {
                        name: '批发和零售业',
                    }
                    ]
                },
                color: ['#ceb800', '#22af6a', '#00befc', '#155ae4', '#7640e4'],
                grid: {
                    left: '3%',
                    right: 90,
                    bottom: '0',
                    top: '5%',
                    containLabel: true
                },
                xAxis:  {
                    type: 'value',
                    show: false
                },
                yAxis: {
                    type: 'category',
                    data: ['高区','环翠区','经区','临港区','荣成市','乳山市','市辖区', '文登区'],
                    axisLabel:{
                        textStyle:{
                            fontSize:'.12rem'
                        }
                    },
                    axisLine:{
                        show:false,
                        lineStyle:{
                            color:'#fff',
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [
                    {
                        name: '金融业',
                        type: 'bar',
                        stack: '总量',
                        data: [139,373,170,48,700,420,319,450]
                    },
                    {
                        name: '租赁和商务服务业',
                        type: 'bar',
                        stack: '总量',
                        data: [2134,3481,2128,243,1556,1109,1464,1583]
                    },
                    {
                        name: '建筑业',
                        type: 'bar',
                        stack: '总量',
                        data: [2321,2581,2303,300,2309,1043,624,1558]
                    },
                    {
                        name: '制造业',
                        type: 'bar',
                        stack: '总量',
                        data: [3368,4895,2656,1157,7937,3951,3325,6802]
                    },
                    {
                        name: '批发和零售业',
                        type: 'bar',
                        stack: '总量',
                        data: [6884,13241,7954,1160,10242,6534,4444,8954]
                    }
                ]
            };
            
            getElement('echart6', $elem => {
                let barChart = echarts.init($elem);
                barChart.setOption(option);
            })
        },
    }
}
</script>

<style scoped>
.echart{
    width: 100%;
    height: 2.5rem;
}
</style>
