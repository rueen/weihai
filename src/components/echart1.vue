<template>
<div class="echart" id="echart1"></div>
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
        // this.render()
        this.renderEchart();
    },
    methods:{
        //渲染echart
        renderEchart(){
            var option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series : [
                    {
                        type:'pie',
                        radius : '80%',
                        center: ['50%', '50%'],
                        data:[{
                                value:14,
                                name:'护士',
                                itemStyle: {
                                    normal: {
                                        color: "#1cc4c2"
                                    }
                                }
                            },
                            {
                                value:2,
                                name:'导游',
                                itemStyle: {
                                    normal: {
                                        color: "#22af6a"
                                    }
                                }
                            },
                            {
                                value:0,
                                name:'公务员',
                                itemStyle: {
                                    normal: {
                                        color: "#dcba1a"
                                    }
                                }
                            },
                            {
                                value:6,
                                name:'医生',
                                itemStyle: {
                                    normal: {
                                        color: "#d57b32"
                                    }
                                }
                            },
                            {
                                value:3,
                                name:'教师',
                                itemStyle: {
                                    normal: {
                                        color: "#4094e4"
                                    }
                                }
                            }
                        ].sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#fff',
                                    fontSize: '.12rem'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.8)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            };
            
            getElement('echart1', $elem => {
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
    height: 2.38rem;
}
</style>
