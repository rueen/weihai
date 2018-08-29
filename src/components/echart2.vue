<template>
<div class="clearfix">
    <div class="echart fl" id="echart2-1"></div>
    <div class="echart fr" id="echart2-2"></div>
</div>
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
        this.renderEchart1();
        this.renderEchart2();
        // this.render()
    },
    methods:{
        render(){
            // ===================数据================
            let data = new Array(5).fill(1).map((d) => {
                return {
                    name: ~~(Math.random() * 400),
                    value: ~~(Math.random() * 40),
                    value3: ~~(Math.random() * 40),
                    value2: ~~(Math.random() * 40)
                }
            })

            // =================右边要放的字段名及颜色===========
            let items = [{
                key: 'value', color: "#419840"
            }, {
                 key: 'value2', color: "#7db9ae"
            }, {
                 key: 'value3', color: "#74a029"
            }] 
                
            data.forEach((d) => {
                let sum = 0
                items.forEach((i) => {
                    sum += (d[i.key] || 0)
                })
                d.sum = sum
            })

            // =========================排序================
            data.sort((a, b) => a.sum - b.sum)

            // 
            let yData = data.map((d) => d.name)

            var option = {
                grid: {
                    top: 40,
                    right: 10,
                    bottom: 10,
                    left: 20,
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    // inverse: true,
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'category',
                    // data: yData,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                    show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: {
                    type: 'bar',
                    data: [1,2,3,4,5],
                    label: {
                        normal: {
                            show: true,
                            position: 'left',
                            color: '#fff'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#7DB9AE'
                        }
                    }
                }
            }

            getElement('echart2-1', $elem => {
                let barChart = echarts.init($elem);
                barChart.setOption(option);
            })
        },
        //渲染echart
        renderEchart1(){
            var option = {
                legend: {
                    orient: 'horizontal',
                    itemWidth: 26,
                    itemHeight: 17,
                    top: 10,
                    left: 30,
                    textStyle: { color: '#ccc' },
                    data:[{
                        name: '行政处罚行业分布TOP5',
                        icon: 'path://M0 0m475.973821 0l503.972282 0q475.973821 0 475.973821 475.973821l0 0q0 475.973821-475.973821 475.973822l-503.972282 0q-475.973821 0-475.973821-475.973822l0 0q0-475.973821 475.973821-475.973821Z',
                        textStyle: {
                            color: '#fff',
                            fontSize:'.14rem'
                        }
                    }]
                },
                color: ['#22af6a'],
                tooltip: {
                    trigger: 'axis',
                    formatter: function(params) {
                        var relVal = params[0].name;
                        var value = 0;
                        for (var i = 0, l = params.length; i < l; i++) {
                            value += params[i].value;
                        }
                        for (var i = 0, l = params.length; i < l; i++) {
                            relVal += '<br/>' + params[i].seriesName + ' : ' + (100 * parseFloat(params[i].value) / parseFloat(value)).toFixed(2) + "%";
                        }
                        return relVal;
                    },
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效  
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'  
                    }
                },
                grid: {
                    top: 40,
                    right: 10,
                    bottom: 10,
                    left: 20,
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    inverse: true,
                    axisTick: { show: false },
                    axisLine: { show: false },
                    splitLine: { show: false },
                    axisLabel: { show: false }
                },
                yAxis: {
                    type: 'category',
                    position:'right',
                    data: ['公安交通执法','公安治安管理', '小作坊餐饮安全', '食品安全生产', '擅自出海作业'],
                    axisTick: { show: false },
                    axisLine: { show: false },
                    splitLine: { show: false },
                    axisLabel: { 
                        textStyle: {
                            color: '#fff',
                            fontSize:'.12rem'
                        }
                    },
                },
                series : [{
                    name:'行政处罚行业分布TOP5',
                    type:'bar',
                    data:[120, 132, 101, 134, 132],
                    barWidth : 16,//柱图宽度
                    itemStyle : {
                        normal : {
                            label: {
                                show: true,
                                position: 'right',
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            barBorderRadius:[8, 8, 8, 8],
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'left'
                        }
                    }
                }]
            };
            
            getElement('echart2-1', $elem => {
                let barChart = echarts.init($elem);
                barChart.setOption(option);
            })
        },
        renderEchart2(){
            var option = {
                legend: {
                    orient: 'horizontal',
                    itemWidth: 26,
                    itemHeight: 17,
                    top: 10,
                    left: 30,
                    textStyle: { color: '#ccc' },
                    data:[{
                        name: '行政处罚行业分布TOP5',
                        icon: 'path://M0 0m475.973821 0l503.972282 0q475.973821 0 475.973821 475.973821l0 0q0 475.973821-475.973821 475.973822l-503.972282 0q-475.973821 0-475.973821-475.973822l0 0q0-475.973821 475.973821-475.973821Z',
                        textStyle: {
                            color: '#fff',
                            fontSize:'.14rem'
                        }
                    }]
                },
                color: ['#dca226'],
                tooltip: {
                    trigger: 'axis',
                    formatter: function(params) {
                        var relVal = params[0].name;
                        var value = 0;
                        for (var i = 0, l = params.length; i < l; i++) {
                            value += params[i].value;
                        }
                        for (var i = 0, l = params.length; i < l; i++) {
                            relVal += '<br/>' + params[i].seriesName + ' : ' + (100 * parseFloat(params[i].value) / parseFloat(value)).toFixed(2) + "%";
                        }
                        return relVal;
                    },
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效  
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'  
                    }
                },
                grid: {
                    top: 40,
                    right: 20,
                    bottom: 10,
                    left: 10,
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    axisTick: { show: false },
                    axisLine: { show: false },
                    splitLine: { show: false },
                    axisLabel: { show: false }
                },
                yAxis: {
                    type: 'category',
                    data: ['制造业','建筑业', '计算机服务\n和软件业', '批发零售业', '批发零售业'],
                    axisTick: { show: false },
                    axisLine: { show: false },
                    splitLine: { show: false },
                    axisLabel: { 
                        textStyle: {
                            color: '#fff',
                            fontSize:'.12rem'
                        }
                    }
                },
                series : [{
                    name:'行政处罚行业分布TOP5',
                    type:'bar',
                    data:[120, 132, 101, 134, 132],
                    barWidth : 16,//柱图宽度
                    itemStyle : {
                        normal : {
                            label: {
                                show: true,
                                position: 'right',
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            barBorderRadius:[8, 8, 8, 8],
                        }
                    }
                }]
            };
            
            getElement('echart2-2', $elem => {
                let barChart = echarts.init($elem);
                barChart.setOption(option);
            })
        },
    }
}
</script>

<style scoped>
.echart{
    width: 50%;
    height: 2.38rem;
}
</style>
