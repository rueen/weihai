<template>
<div class="layout">
    <div class="topBg">
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
                    <h2 class="h2-2">失信信息统计</h2>
                    <div class="inner">
                        <echart2></echart2>
                    </div>
                </div>
                <div class="echartBox echartBox3 mt30">
                    <h2>行业信用评价结果分析<span class="more">更多</span></h2>
                    <div class="inner">
                        <ul class="tab">
                            <li class="item" :class="{'cur': echart3TabIndex == 0}" @click="echart3Tab(0)">餐饮行业</li>
                            <li class="item" :class="{'cur': echart3TabIndex == 1}" @click="echart3Tab(1)">渔船行业</li>
                            <li class="item" :class="{'cur': echart3TabIndex == 2}" @click="echart3Tab(2)">电商行业</li>
                        </ul>
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
                    <h2 class="h2-2">信用记录查询分布图</h2>
                    <div class="inner">
                        <echart4></echart4>
                    </div>
                </div>
                <div class="echartBox mt30">
                    <h2>跨行业黑名单交叉对比<router-link class="more link" tag="span" to="/contrast">更多</router-link></h2>
                    <div class="inner">
                        <echart5></echart5>
                    </div>
                </div>
                <div class="echartBox mt30">
                    <h2>企业关联分析图<router-link class="more link" tag="span" to="/analysis">更多</router-link></h2>
                    <div class="inner">
                        <echart6></echart6>
                    </div>
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
            echart3TabIndex: 1
        }
    },
    components:{ echart1, echart2, echart3, echart4, echart5, echart6, turntable, chartMap },
    created() {

    },
    methods:{
        echart3Tab(index){
            this.echart3TabIndex = index;
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
                timer = setInterval(fun, 5000);
        },
    }
}
</script>

<style scoped>
.echartBox3{
    position: relative;
}
.echartBox3 .tab{
    position: absolute;
    top: .4rem; right: .28rem;
    border: 1px solid #1680c7;
    border-radius: .02rem;
    z-index: 99;
}
.echartBox3 .tab .item{
    color: #fff;
    font-size: .12rem;
    height: .26rem;
    line-height: .24rem;
    text-align: center;
    display: inline-block;
    float: left;
    padding: 0 .08rem;
    cursor: pointer;
}
.echartBox3 .tab .item:nth-child(1),
.echartBox3 .tab .item:nth-child(2){
    border-right: 1px solid #1680c7;
}
.echartBox3 .tab .item.cur{
    background: #1680c7;
}
.layout{
    width: 100%;
    background: url(../assets/bg1.jpg) no-repeat center bottom;
    background-size: 100% auto;
    padding-bottom: .37rem;
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
    line-height: .16rem;
    position: absolute;
    right: .08rem; top: .03rem;
}
.echartBox h2{
    font-size: .18rem;
    background: url(../assets/echart-t.png) no-repeat 0 0;
    height: .42rem;
    background-size: 100% auto;
    padding: .12rem 0 0 .16rem;
    position: relative;
}
.echartBox h2.h2-2{
    background: url(../assets/echart-t2.png) no-repeat 0 0;
    background-size: 100% auto;
}
.echartBox{
    background: url(../assets/echart-b.png) no-repeat 0 bottom;
    background-size: 100% auto;
    padding-bottom: .12rem;
}

</style>
