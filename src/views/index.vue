<template>
<div class="layout">
    <h1>威海市信用大数据分析平台</h1>
    <div class="wrap">
        <div class="left fl">
            <div class="echartBox">
                <h2>重点人群失信占比分析<span class="more">更多</span></h2>
                <div class="inner">
                    <echart1></echart1>
                </div>
            </div>
            <div class="echartBox mt30">
                <h2>失信信息统计</h2>
                <div class="inner">
                    <echart2></echart2>
                </div>
            </div>
            <div class="echartBox mt30">
                <h2>行业信用评价结果分析<span class="more">更多</span></h2>
                <div class="inner">
                    <echart3></echart3>
                </div>
            </div>
        </div>
        <div class="middle fl">
            <turntable></turntable>
            <chart-map></chart-map>
        </div>
        <div class="right fr">
            <div class="echartBox">
                <h2>信用记录查询分布图</h2>
                <div class="inner">
                    <echart4></echart4>
                </div>
            </div>
            <div class="echartBox mt30">
                <h2>跨行业黑名单交叉对比<span class="more link" @click="openContrastPage">更多</span></h2>
                <div class="inner">
                    <echart5></echart5>
                </div>
            </div>
            <div class="echartBox mt30">
                <h2>企业关联分析图<span class="more link" @click="openAnalysisPage">更多</span></h2>
                <div class="inner">
                    <echart6></echart6>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import echarts from 'echarts'
import echart1 from "../components/echart1.vue"
import echart2 from "../components/echart2.vue"
import echart3 from "../components/echart3.vue"
import echart4 from "../components/echart4.vue"
import echart5 from "../components/echart5.vue"
import echart6 from "../components/echart6.vue"
import turntable from "../components/turntable.vue"
import chartMap from "../components/chartMap.vue"

export default {
    data() {
        return {
            
        }
    },
    components:{ echart1, echart2, echart3, echart4, echart5, echart6, turntable, chartMap },
    created() {
        
    },
    methods:{
        //打开对比页面
        openContrastPage(){
            this.$router.push('/contrast');
        },
        //打开分析页面
        openAnalysisPage(){
            this.$router.push('/analysis');
        },
        getElement(id,callback){
            var i = 0,
                fun = () => {
                    var $id = document.getElementById(id);
                    i ++;
                    if($id){
                        clearInterval(timer);
                        callback && callback($id);
                    } else {
                        if(i > 20){
                            clearInterval(timer);
                        } else{
                            fun();
                        }
                    }
                },
                timer = setInterval(fun, 50);
        },
    }
}
</script>

<style scoped>
.layout{
    width: 100%;
    background: url(../assets/bg1.jpg) no-repeat center 0;
    background-size: 100% auto;
}
.middle{
    width: 7rem;
}
.wrap{
    padding: 0 .5rem;
    overflow: hidden;
}
.left,
.right{
    width: 5.45rem;
}
.mt30{
    margin-top: .3rem;
}

.echartBox .inner{
    background: url(../assets/echart-m.png) repeat-y;
    background-size: 100% auto;
}
.echartBox h2 .more.link{
    cursor: pointer;
}
.echartBox h2 .more{
    font-size: .16rem; color: #61ebe7;
    position: absolute;
    right: .08rem; top: .05rem;
}
.echartBox h2{
    font-size: .18rem;
    background: url(../assets/echart-t.png) no-repeat 0 0;
    height: .42rem;
    background-size: 100% auto;
    padding: .12rem 0 0 .16rem;
    position: relative;
}
.echartBox{
    background: url(../assets/echart-b.png) no-repeat 0 bottom;
    background-size: 100% auto;
    padding-bottom: .12rem;
}

</style>
