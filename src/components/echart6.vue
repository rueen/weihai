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
        this.renderEchart();
    },
    methods:{
        //渲染echart
        renderEchart(){
            var option = {
                legend: {
                    x: '72%',
                    y: '10%',
                    orient: 'vertical',
                    itemWidth: 10,
                    itemHeight: 10,
                    data:[{
                        name: '餐饮',
                        textStyle: {
                            color: '#fff',
                            fontSize:12
                        }
                    },{
                        name: '旅游',
                        textStyle: {
                            color: '#fff',
                            fontSize:12
                        }
                    },{
                        name: '计算机服务',
                        textStyle: {
                            color: '#fff',
                            fontSize:12
                        }
                    },{
                        name: '电商',
                        textStyle: {
                            color: '#fff',
                            fontSize:12
                        }
                    },{
                        name: '渔具',
                        textStyle: {
                            color: '#fff',
                            fontSize:12
                        }
                    }]
                },
                color: ['#ceb800', '#22af6a', '#00befc', '#155ae4', '#7640e4'],
                grid: {
                    left: '3%',
                    right: '24%',
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
                    data: ['乳山市','文登区','荣成市','环翠区','高区','经区','南海新区'],
                    axisLabel:{
                        textStyle:{
                            fontSize:12
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
                        name: '餐饮',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [12, 11, 14, 15, 22, 24, 30]
                    },
                    {
                        name: '旅游',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [10, 13, 11, 13, 9, 20, 21]
                    },
                    {
                        name: '计算机服务',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [20, 18, 31, 24, 29, 33, 30]
                    },
                    {
                        name: '电商',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [15, 21, 21, 14, 19, 30, 40]
                    },
                    {
                        name: '渔具',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [80, 32, 19, 34, 12, 10, 12]
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
    height: 2.68rem;
}
</style>
