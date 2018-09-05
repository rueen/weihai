<template>
<div class="bg">
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
                            <li class="item" :class="{'cur': echart3TabIndex == '餐饮行业'}" @click="echart3Tab('餐饮行业')">餐饮行业</li>
                            <li class="item" :class="{'cur': echart3TabIndex == '渔船行业'}" @click="echart3Tab('渔船行业')">渔船行业</li>
                            <li class="item" :class="{'cur': echart3TabIndex == '电商行业'}" @click="echart3Tab('电商行业')">电商行业</li>
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
            echart3TabIndex: '渔船行业'
        }
    },
    components:{ echart1, echart2, echart3, echart4, echart5, echart6, turntable, chartMap },
    created() {

    },
    methods:{
        echart3Tab(temp){
            this.echart3TabIndex = temp;
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
    z-index: 99;
    height: .28rem;
}
.echartBox3 .tab .item{
    color: #fff;
    font-size: .12rem;
    height: 100%;
    text-align: center;
    float: left;
    padding: 0 .08rem;
    cursor: pointer;
    vertical-align: middle;
    border-top: 1px solid #1680c7;
    border-bottom: 1px solid #1680c7;
    border-right: 1px solid #1680c7;
    line-height: .22rem;
}
.echartBox3 .tab .item:nth-child(1){
    border-left: 1px solid #1680c7;
    border-radius: 2px 0 0 2px;
}
.echartBox3 .tab .item:nth-child(3){
    border-radius: 0 2px 2px 0;
}
.echartBox3 .tab .item.cur{
    background: #1680c7;
}
.bg{
    width: 100%; height: 100%;
    background: url(../assets/bg1.jpg) no-repeat center bottom;
    background-size: 100% auto;
}
.layout{
    /*width: 100%;*/
    width: 19.2rem;
    margin: 0 auto;
    /*background: url(../assets/bg1_2.png) no-repeat center bottom;*/
    /*background-size: 100% auto;*/
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
    height: .41rem;
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
