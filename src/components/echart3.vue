<template>
<div class="echart" id="echart3"></div>
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
        this.renderEchart();
    },
    methods:{
        //渲染echart
        renderEchart(){
            var option = {
                tooltip: {
                    trigger: 'item',
                    padding: 10,
                    showDelay: 0,
                    transitionDuration: 0.2,
                    formatter: function (params) {
                        // console.log(params)
                        return 'tooltip'
                    }
                },
                grid : {
                    left : '5%',
                    right : '5%',
                    bottom : '15%',
                    top: '20%',
                    containLabel : true,
                    y2: 140
                },
                color: ['#b2a244', '#3e2dab'],
                xAxis : {
                    type : 'category',
                    data : ['201708','201709','201710','201711','201712','201801','201802', '201803', '201804', '201805', '201806', '201807'],
                    axisLabel:{
                        interval:0,//横轴信息全部显示
                        rotate:-30,//-30度角倾斜显示
                        textStyle: {
                            fontSize:'.12rem'
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#fff',
                        }
                    }
                },
                yAxis: {
                    name : '信息量（条）',
                    type: 'value',
                    axisLabel:{
                        textStyle: {
                            fontSize:'.12rem'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            // 使用深浅的间隔色
                            color: ['#10204d']
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff',
                        }
                    }
                },
                series : [
                    {
                        name:'处罚结果',
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:[120, 132, 101, 134, 90, 230, 120, 132, 101, 134, 90, 230],
                    },
                    {
                        name:'信用等级',
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:[220, 182, 191, 234, 290, 330, 220, 182, 191, 234, 290, 330]
                    }
                ]
            };
            
            getElement('echart3', $elem => {
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
    height: 2.68rem;
}
</style>
