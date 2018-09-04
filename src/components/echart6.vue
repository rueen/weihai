<template>
<div class="echart" id="echart6"></div>
</template>

<script>
import echarts from 'echarts'
import getElement from '../js/getElement.js'
import { getData } from '@/js/getData'

export default {
    data() {
        return {
            legend: [],
            names: [],
            series: [],
            legendW: 0
        }
    },
    created() {
        getData('getScreen', '企业关联分析图', '', 1, 1000).then((response) => {
            var result = response.rows, TEMP_arr = [], KEY_arr = {};

            // console.log(result)
            result.forEach((val) => {
                TEMP_arr.push(val['TEMP_']);
                if(!KEY_arr[val['KEY_']]){
                    KEY_arr[val['KEY_']] = {};
                }
                KEY_arr[val['KEY_']][val['TEMP_']] = val['VALUE_']
            })

            for(let index in KEY_arr){
                this.names.push(index)
                let val = KEY_arr[index];
                let sum = 0;

                for(let i in val){
                    sum += val[i] - 0;
                }
                val.sum = sum;
            }
            TEMP_arr = Array.from(new Set(TEMP_arr));

            // console.log(KEY_arr)

            TEMP_arr.forEach((_val) => {
                this.legend.push(_val)
                var series = {
                    type: 'bar',
                    stack: '总量'
                };
                series.name = _val;
                series.data = [];

                for(let index in KEY_arr){
                    let val = KEY_arr[index];
                    if(val[_val]){
                        let number = (val[_val] / val.sum) * 100;
                        series.data.push(Math.round(number * 100) / 100)
                    }
                }

                this.series.push(series)
            })
            
            // console.log(this.names)
            // console.log(this.series)

            getElement('echart6', $elem => {
                var lengthArr = [];
                this.legend.forEach((val) => {
                    lengthArr.push(val.length);
                })
                var maxLength = Math.max.apply(null, lengthArr);

                this.legendW = 12 * maxLength;

                var legendX = parseInt($elem.offsetWidth) - this.legendW;

                this.renderEchart(legendX);
            })
        })
    },
    methods:{
        //渲染echart
        renderEchart(legendX){
            var option = {
                tooltip: {
                    trigger: 'item',
                    padding: [5,10,5,10],
                    showDelay: 0,
                    transitionDuration: 0.2,
                    formatter: function (params) {
                        // console.log(params)
                        return `<span style="font-size: .12rem;">${params.seriesName}：${params.value}%</span>`
                    }
                },
                legend: {
                    width: this.legendW,
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
                    data:this.legend.splice(0,9)
                },
                color: ['#ceb800', '#22af6a', '#00befc', '#155ae4', '#7640e4'],
                grid: {
                    left: 10,
                    right: this.legendW,
                    bottom: 0,
                    top: 10,
                    containLabel: true
                },
                xAxis:  {
                    type: 'value',
                    show: false
                },
                yAxis: {
                    type: 'category',
                    data: this.names,
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
                series: this.series
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
