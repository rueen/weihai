<template>
<div class="echart" id="echart4"></div>
</template>

<script>
import echarts from 'echarts'
import getElement from '../js/getElement.js'
import { getData, delay } from '@/js/getData'

export default {
    data() {
        return {
            names: [],
            values1: [],
            values2: []
        }
    },
    created() {
        var timer = null;
        var fun = () => {
            this.names = [];
            this.values1 = [];
            this.values2 = [];
            getData('getScreen', '信用记录查询分布图').then((response) => {
                var result = response.rows.sort(function(a, b) {
                    return Date.parse(new Date(a.TEMP_)) - Date.parse(new Date(b.TEMP_))
                }), namesArr = [], result1 = {}, result2 = {};

                result.forEach((val) => {
                    namesArr.push(val['TEMP_']);

                    if(val.KEY_ == '法人信用查询'){
                        result1[val['TEMP_']] = val['VALUE_'];
                        !result2[val['TEMP_']] && (result2[val['TEMP_']] = '');
                    } else if(val.KEY_ == '自然人信用查询'){
                        result2[val['TEMP_']] = val['VALUE_'];
                        !result1[val['TEMP_']] && (result1[val['TEMP_']] = '');
                    }
                })

                namesArr = Array.from(new Set(namesArr));//去重

                if(namesArr.length > 8){
                    this.names = namesArr.splice(namesArr.length - 8, namesArr.length);
                }

                this.names.forEach((val) => {
                    this.values1.push(result1[val]);
                    this.values2.push(result2[val])
                })
                
                // let _length = Math.min(8, this.names);

                // for (let i = 0; i < _length; i++) {
                //     this.names.push(result[i]['TEMP_'])

                //     if(result[i].KEY_ == '法人信用查询'){
                //         this.values1.push(result[i]['VALUE_'])
                //         this.values2.push('')
                //     } else if(result[i].KEY_ == '自然人信用查询'){
                //         this.values2.push(result[i]['VALUE_'])
                //         this.values1.push('')
                //     }
                // }
                this.renderEchart();
            })
        };

        fun()
        clearInterval(timer)
        timer = setInterval(fun, delay)
    },
    methods:{
        //渲染echart
        renderEchart(){
            var option = {
                tooltip: {
                    trigger: 'item',
                    padding: [5,10,5,10],
                    showDelay: 0,
                    transitionDuration: 0.2,
                    formatter: function (params) {
                        // console.log(params)
                        return `<span style="font-size: .12rem;">${params.seriesName}：</span><p style="font-size: .12rem;">${params.name} : ${params.value}次</p>`
                    }
                },
                grid : {
                    left : 20,
                    right : 35,
                    bottom : 20,
                    top: 35,
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
                            fontSize: '.12rem'
                        }
                    },{
                        name: '自然人信用记录查询',
                        textStyle: {
                            color: '#fff',
                            fontSize: '.12rem'
                        }
                    }]
                },
                color: ['#41bd64', '#1a9afd'],
                // calculable : true,
                xAxis : {
                    type : 'category',
                    data : this.names,
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
                        data:this.values1
                    },
                    {
                        name:'自然人信用记录查询',
                        type:'bar',
                        data:this.values2
                    }
                ]
            };

            
            getElement('echart4', $elem => {
                window.echart4 = echarts.init($elem);
                window.echart4.setOption(option);
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
