<template>
<div class="echart" id="echart5"></div>
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
            var option = {};
            
            getElement('echart5', $elem => {
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
    height: 2.26rem;
}
</style>
