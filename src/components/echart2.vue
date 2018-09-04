<template>
<div class="clearfix">
    <div class="echart fl" id="echart2-1"></div>
    <div class="echart fr" id="echart2-2"></div>
</div>
</template>

<script>
import echarts from 'echarts'
import getElement from '../js/getElement.js'
import { getData } from '@/js/getData'

export default {
    data() {
        return {
            result1: {
                names: [],
                values: []
            },
            result2: {
                names: [],
                values: []
            }
        }
    },
    mounted() {
        // this.render()
        getData('getScreen', '失信信息统计', '行政处罚行业分布TOP5').then((response) => {
            let result = response.rows.sort(function(a, b) {
                return (~~a.VALUE_) - (~~b.VALUE_)
            })

            let _length = Math.min(5, result.length);
            for (let i = 0; i < _length; i++) {
                this.result1.names.push(result[i]['KEY_'])
                this.result1.values.push(result[i]['VALUE_'])
            }
            this.renderEchart1();
        })

        getData('getScreen', '失信信息统计', '法院老赖行业分布TOP5').then((response) => {
            let result = response.rows.sort(function(a, b) {
                return (~~a.VALUE_) - (~~b.VALUE_)
            })

            let _length = Math.min(5, result.length);
            for (let i = 0; i < _length; i++) {
                this.result2.names.push(result[i]['KEY_'])
                this.result2.values.push(result[i]['VALUE_'])
            }
            this.renderEchart2();
        })
    },
    methods: {
        //渲染echart
        renderEchart1() {
            var option = {
                legend: {
                    orient: 'horizontal',
                    top: 10,
                    right: 0,
                    itemWidth: 14,
                    itemHeight: 14,
                    icon:'path://M512 512m-192 0a192 192 0 1 0 384 0 192 192 0 1 0-384 0Z',
                    textStyle: { color: '#ccc' },
                    data: [{
                        name: '行政处罚行业分布TOP5',
                        textStyle: {
                            color: '#fff',
                            fontSize: '.14rem'
                        }
                    }]
                },
                color: ['#22af6a'],
                tooltip: {
                    trigger: 'item',
                    padding: [5,10,5,10],
                    showDelay: 0,
                    transitionDuration: 0.2,
                    formatter: function (params) {
                        // console.log(params)
                        return `<p style="font-size: .12rem;">${params.name} : ${params.value}</p>`
                    }
                },
                // tooltip: {
                //     trigger: 'axis',
                //     formatter: function(params) {
                //         return params[0].name + ':' + params[0].value + '人';
                //     },
                //     axisPointer: { // 坐标轴指示器，坐标轴触发有效
                //         type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                //     }
                // },
                grid: {
                    top: 40,
                    right: 3,
                    bottom: 0,
                    left: 30,
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
                    position: 'right',
                    data: this.result1.names,
                    axisTick: { show: false },
                    axisLine: { show: false },
                    splitLine: { show: false },
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontSize: '.12rem'
                        }
                    },
                },
                series: [{
                    name: '行政处罚行业分布TOP5',
                    type: 'bar',
                    data: this.result1.values,
                    barWidth: 14, //柱图宽度
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'right',
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            barBorderRadius: [8, 8, 8, 8],
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

            let chart = echarts.init(document.getElementById("echart2-1"));
            chart.setOption(option);

            // window.onresize = chart.resize;
        },
        renderEchart2() {
            var option = {
                legend: {
                    orient: 'horizontal',
                    top: 10,
                    left: 0,
                    itemWidth: 14,
                    itemHeight: 14,
                    icon:'path://M512 512m-192 0a192 192 0 1 0 384 0 192 192 0 1 0-384 0Z',
                    textStyle: { color: '#ccc' },
                    data: [{
                        name: '行政处罚行业分布TOP5',
                        textStyle: {
                            color: '#fff',
                            fontSize: '.14rem'
                        }
                    }]
                },
                color: ['#dca226'],
                tooltip: {
                    trigger: 'item',
                    padding: [5,10,5,10],
                    showDelay: 0,
                    transitionDuration: 0.2,
                    formatter: function (params) {
                        console.log(params)
                        return `<p style="font-size: .12rem;">${params.name} : ${params.value}</p>`
                    }
                },
                grid: {
                    top: 40,
                    right: 30,
                    bottom: 5,
                    left: 0,
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
                    data: this.result2.names,
                    axisTick: { show: false },
                    axisLine: { show: false },
                    splitLine: { show: false },
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontSize: '.12rem'
                        }
                    }
                },
                series: [{
                    name: '行政处罚行业分布TOP5',
                    type: 'bar',
                    data: this.result2.values,
                    barWidth: 14, //柱图宽度
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'right',
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            barBorderRadius: [8, 8, 8, 8],
                        }
                    }
                }]
            };

            let chart = echarts.init(document.getElementById("echart2-2"));
            chart.setOption(option);

            // window.onresize = chart.resize;
        }
    }
}
</script>

<style scoped>
.echart {
    width: 50%;
    height: 2.38rem;
}
</style>
