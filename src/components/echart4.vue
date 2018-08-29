<template>
<div class="echart" id="echart4"></div>
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
                    right : '10%',
                    bottom : '15%',
                    top: '20%',
                    containLabel : true,
                    y2: 140
                },
                legend: {
                    x: 'right',
                    itemWidth: 18,
                    itemHeight: 2,
                    data:[{
                        name: '法人信用记录查询',
                        textStyle: {
                            color: '#fff',
                            fontSize:12
                        }
                    },{
                        name: '自然人信用记录查询',
                        textStyle: {
                            color: '#fff'
                        }
                    }]
                },
                color: ['#41bd64', '#1a9afd'],
                // calculable : true,
                xAxis : {
                    type : 'category',
                    data : ['201801','201802', '201803', '201804', '201805', '201806', '201807', '201807'],
                    axisLabel:{
                        interval:0,//横轴信息全部显示
                        rotate:-30,//-30度角倾斜显示
                        textStyle:{
                            fontSize:'.12rem'
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#fff',
                        }
                    }
                },
                yAxis : {
                    name : '查询量（次）',
                    type: 'value',
                    axisLabel:{
                        textStyle:{
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
                        name:'法人信用记录查询',
                        type:'bar',
                        data:[120, 132, 101, 134, 90, 230, 120, 132]
                    },
                    {
                        name:'自然人信用记录查询',
                        type:'bar',
                        data:[220, 182, 191, 234, 290, 330, 220, 182]
                    }
                ]
            };

            
            getElement('echart4', $elem => {
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
