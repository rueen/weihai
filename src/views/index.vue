<template>
<div class="layout">
    <div class="topBg">
        <h1 class="table"><div class="table-cell">威海市信用大数据分析平台</div></h1>
    </div>
    <div class="wrap">
        <div class="echartBox box1">
            <h2>重点人群失信占比分析<span class="more">更多</span></h2>
            <div class="inner">
                <div class="inner-bg">
                    <echart1></echart1>
                </div>
            </div>
        </div>
        <div class="echartBox box2">
            <h2 class="h2-2">失信信息统计</h2>
            <div class="inner">
                <div class="inner-bg">
                    <echart2></echart2>
                </div>
            </div>
        </div>
        <div class="echartBox echartBox3 box3">
            <h2>行业信用评价结果分析<span class="more">更多</span></h2>
            <div class="inner">
                <div class="inner-bg">
                    <ul class="tab">
                        <li class="item" :class="{'cur': echart3TabIndex == '餐饮行业'}" @click="echart3Tab('餐饮行业')">餐饮行业</li>
                        <li class="item" :class="{'cur': echart3TabIndex == '渔船行业'}" @click="echart3Tab('渔船行业')">渔船行业</li>
                        <li class="item" :class="{'cur': echart3TabIndex == '电商行业'}" @click="echart3Tab('电商行业')">电商行业</li>
                    </ul>
                    <echart3 ref="echart3"></echart3>
                </div>
            </div>
        </div>
        <turntable></turntable>
        <div class="map">
            <chart-map></chart-map>
        </div>
        <div class="right fr">
            <div class="echartBox box4">
                <h2 class="h2-2">信用记录查询分布图</h2>
                <div class="inner">
                    <div class="inner-bg">
                        <echart4></echart4>
                    </div>
                </div>
            </div>
            <div class="echartBox box5">
                <h2>跨行业黑名单交叉对比<router-link class="more link" tag="span" to="/contrast">更多</router-link></h2>
                <div class="inner">
                    <div class="inner-bg">
                        <echart5></echart5>
                    </div>
                </div>
            </div>
            <div class="echartBox box6">
                <h2>企业关联分析图<router-link class="more link" tag="span" to="/analysis">更多</router-link></h2>
                <div class="inner">
                    <div class="inner-bg">
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
import getElement from '../js/getElement.js'
import getD3 from '../js/getD3.js'

export default {
    data() {
        return {
            echart3TabIndex: '渔船行业'
        }
    },
    components:{ echart1, echart2, echart3, echart4, echart5, echart6, turntable, chartMap },
    created() {
        this.resize();
        window.onresize = () => {
            window.echart1.resize();
            window.echart2_1.resize();
            window.echart2_2.resize();
            window.echart3.resize();
            window.echart4.resize();
            window.echart6.resize();

            getD3(() => {
                getElement('venn', $elem => {
                    var width = parseInt($elem.offsetWidth);
                    var height = parseInt($elem.offsetHeight);

                    this.renderVenn(width, height)

                })
            })
            this.resize();
        }
    },
    methods:{
        resize(){
            var height = document.documentElement.clientHeight;
            var h = 1920;
            var s = height / 1080;
            var w = 1920 * s;

            this.renderRem(w)
        },
        renderRem(width){
            var value = document.documentElement.clientWidth
            var ua = navigator.userAgent

            if (ua.match(/MI 5/) && ua.match(/QQBrowser/) && ! ua.match(/MicroMessenger/)) {
                value = (3 * value) / 2.6 // 小米虽然 dpr 是3 但表现的依然是 2.6
            }

            var  deviceWidth = Math.min(width, value)

            document.documentElement.style.fontSize = deviceWidth / 19.2 + 'px';
        },
        renderVenn(width, height){
            var sets = [
                {"sets": [0], "label": "A", "size": 400, "fill": "#2694fd", "color": "#fff"},
                {"sets": [1], "label": "C", "size": 100, "fill": "#1dc674", "color": "#fff"},
                {"sets": [2], "label": "B", "size": 200, "fill": "#f4c93b", "color": "#fff"},
                {"sets": [0, 1], "size": 15},
                {"sets": [0, 2], "size": 30},
                {"sets": [1, 2], "size": 20},
                {"sets": [0, 1, 2], "size": 10}
            ]

            var chart = venn.VennDiagram({
                width: width,
                height: height
            });

            var div = d3.select("#venn")
            div.datum(sets).call(chart);
        },
        echart3Tab(temp){
            this.echart3TabIndex = temp;
            this.$refs.echart3.getDataAll(this.echart3TabIndex);
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

.echartBox .inner{
    height: 100%;
    padding-top: .41rem;
}
.inner-bg{
    width: 100%; height: 100%;
    background: url(../assets/echart-m.png) repeat-y;
    background-size: 100% auto;
}
.echartBox{
    width: 28%;
    position: absolute;
    z-index: 2;
}
.box1{
    height: 27%;
    top: 7%; left: 2.6%;
}
.box2{
    height: 27%;
    top: 37%; left: 2.6%;
}
.box3{
    height: 30%;
    top: 66.7%; left: 2.6%;
}
.box4{
    height: 30%;
    top: 7%; right: 2.6%;
}
.box5{
    height: 26%;
    top: 39.5%; right: 2.6%;
}
.box6{
    height: 28%;
    top: 68.5%; right: 2.6%;
}
/*.echartBox3{
    position: relative;
}*/
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
/*.bg{
    background: url(../assets/bg1.jpg) no-repeat center bottom;
    background-size: 100% auto;
}*/
.layout{
    position: absolute;
    width: 100%; height: 100%;
    z-index: 0;
    background: url(../assets/bg1.jpg) no-repeat center bottom;
    background-size: 100% auto;
    /*padding-bottom: .37rem;*/
}
.middle{
    width: 38%;
}
.wrap{
    /*padding: 7% 2.6% 0 2.6%;*/
    overflow: hidden;
    position: absolute;
    width: 100%; height: 100%;
    z-index: 1;
    left: 0; top: 0;
}
.left,
.right{
    width: 28%;
}
.mt30{
    margin-top: .3rem;
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
    position: absolute;
    width: 100%;
    left: 0; top: 0;
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
