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
                        return '<span style="font-size: .12rem;">tooltip</span>'
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
                    data: ['2014-06','2014-07','2014-08','2014-09','2015-07','2015-10','2015-11','2015-12','2016-01','2016-06','2016-07','2016-08','2016-10','2016-11','2016-12','2017-01','2017-08','2017-09','2018-05','2018-07'],
                    // data : ['2014-06','2014-07','2014-08','2014-09','2014-10','2015-05','2015-06','2015-07','2015-08','2015-10','2015-11','2015-12','2016-01','2016-02','2016-03','2016-05','2016-06','2016-07','2016-08','2016-09','2016-10','2016-11','2016-12','2017-01','2017-02','2017-03','2017-04','2017-05','2017-08','2017-09','2017-10','2017-11','2018-05','2018-07'],
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
                        data: [20,28,30,28,12,18,48,20,16,40,14,24,58,10,22,50,84,38,32,16]
                        // data:[20,28,30,28,8,2,8,12,2,18,48,20,16,4,2,4,40,14,24,6,58,10,22,50,2,2,2,8,84,38,6,4,32,16,],
                    },
                    // {
                    //     name:'信用等级',
                    //     type:'line',
                    //     stack: '总量',
                    //     areaStyle: {normal: {}},
                    //     data:[220, 182, 191, 234, 290, 330, 220, 182, 191, 234, 290, 330]
                    // }
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
