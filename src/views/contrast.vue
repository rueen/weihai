<template>
<div class="layout">
    <div class="topBg">
        <h1>威海市信用大数据分析平台</h1>
        <div class="goBck">
            <router-link class="more link" tag="span" to="/">
                <span class="iconfont icon-siglypharrowbackward"></span>
                返回
            </router-link>
        </div>
        <div class="wrap">
            <div class="left fl">
                <h2>跨行业黑名单交叉对比</h2>
                <div class="venn" id="venn"></div>
                <div class="legend clearfix">
                    <ul class="fl">
                        <li v-for="(item, index) in numResult">
                            <span class="icon fl" :class="{'blue': index == 0, 'yellow': index == 1, 'green': index == 2}"></span>
                            <p class="fl">{{item['KEY_']}}<span class="f16 yellow num">{{item['VALUE_']}}</span></p>
                        </li>
                    </ul>
                    <ul class="fl">
                        <li>
                            <span class="icon color1 fl"></span>
                            <p class="fl">经营异常名录&法院失信被执行人<span class="f16 yellow num">{{rollList1.length}}</span></p>
                        </li>
                        <li>
                            <span class="icon color2 fl"></span>
                            <p class="fl">法院失信被执行人&税务D级<span class="f16 yellow num">{{rollList2.length}}</span></p>
                        </li>
                        <li>
                            <span class="icon color3 fl"></span>
                            <p class="fl">税务D级&经营异常名录<span class="f16 yellow num">{{rollList3.length}}</span></p>
                        </li>
                        <li>
                            <span class="icon color4 fl"></span>
                            <p class="fl">经营异常名录&法院失信被执行人&税务D级<span class="f16 yellow num">{{rollList4.length}}</span></p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="right fr">
                <div class="rollBox">
                    <h3 class="title title1"></h3>
                    <div class="inner inner1">
                        <roll :height=".3" :contentArr="rollList1" v-if="rollList1.length > 0"></roll>
                    </div>
                </div>
                <div class="rollBox">
                    <h3 class="title title2"></h3>
                    <div class="inner inner2">
                        <roll :height=".3" :contentArr="rollList2" v-if="rollList2.length > 0"></roll>
                    </div>
                </div>
                <div class="rollBox">
                    <h3 class="title title3"></h3>
                    <div class="inner inner3">
                        <roll :height=".3" :contentArr="rollList3" v-if="rollList3.length > 0"></roll>
                    </div>
                </div>
                <div class="rollBox">
                    <h3 class="title title4"></h3>
                    <div class="inner inner4">
                        <roll :height=".3" :contentArr="rollList4" v-if="rollList4.length > 0"></roll>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import roll from '../components/roll.vue';
import getElement from '../js/getElement.js'
import getD3 from '../js/getD3.js'
import contrastData from '../js/contrast.js'
import { getData, ZDRQ_COLOR } from '@/js/getData'

export default {
    data() {
        return {
            numResult: [],
            rollList1: [],//0&2 经营异常名录&法院失信被执行人
            rollList2: [],//2&1 法院失信被执行人&税务D级纳税人
            rollList3: [],//0&1 经营异常名录&税务D级纳税人
            rollList4: []//0&2&1 经营异常名录&法院失信被执行人&税务D级纳税人
        }
    },
    components:{ roll },
    created() {
        this.venn()
        getData('getScreen', '跨行业黑名单交叉比对总数').then((response) => {
            let result = response.rows.sort(function(a, b) {
                return (~~b.VALUE_) - (~~a.VALUE_)
            })

            this.numResult = result;
        })
        getData('getScreen', '跨行业黑名单交叉比对').then((response) => {
            let result = response.rows;

            result.forEach((val) => {
                if(val['KEY_'].indexOf('经营异常名录') > -1 && val['KEY_'].indexOf('法院失信被执行人') > -1){
                    this.rollList1.push(val['VALUE_'])
                } else if(val['KEY_'].indexOf('法院失信被执行人') > -1 && val['KEY_'].indexOf('税务D级纳税人') > -1){
                    this.rollList2.push(val['VALUE_'])
                } else if(val['KEY_'].indexOf('经营异常名录') > -1 && val['KEY_'].indexOf('税务D级纳税人') > -1){
                    this.rollList3.push(val['VALUE_'])
                } else if(val['KEY_'].indexOf('经营异常名录') > -1 && val['KEY_'].indexOf('法院失信被执行人') > -1 && val['KEY_'].indexOf('税务D级纳税人') > -1){
                    this.rollList4.push(val['VALUE_'])
                }
            })
        })
        
    },
    methods:{
        venn(){
            getD3(() => {
                getElement('venn', $elem => {
                    var width = parseInt($elem.offsetWidth);
                    var height = parseInt($elem.offsetHeight);

                    this.render(width, height)
                })
            })
        },
        render(width, height){
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
        }
    }
}
</script>

<style scoped>

h1{
    height: .9rem;
}
.icon{
    display: inline-block;
    width: .16rem; height: .16rem;
    border-radius: 50%;
    margin-right: .1rem;
}
.icon.color4{
    background: #47b765;
}
.icon.color3{
    background: #47b765;
}
.icon.color2{
    background: #47b765;
}
.icon.color1{
    background: #b3af66;
}
.icon.blue{
    background: #2694fd;
}
.icon.yellow{
    background: #f4c93b;
}
.icon.green{
    background: #1dc674;
}
.legend ul{
    padding: 0 0 0 1rem;
}
.legend li{
    height: .44rem;
    line-height: .16rem;
    padding: .14rem 0;
}
.legend .num{
    padding-left: .1rem;
}

.legend{
    font-size: .16rem;
    color: #fff;
}
.yellow{
    color: #fdd102;
}
.venn{
    font-size: .18rem;
    color: #fff;
    width: 9rem; height: 6.5rem;
}

.inner4{
    height: 2.88rem;
}
.inner3{
    height: 3.08rem;
}
.inner1,.inner2{
    height: 3.08rem;
}
.inner{
    padding: .12rem 0 0 .2rem;
    overflow: hidden;
}
.title.title4{
    height: .72rem;
    background: url(../assets/listBox-t-4.png) no-repeat 0 0;
    background-size: 100% auto;
}
.title3{
    background: url(../assets/listBox-t-3.png) no-repeat 0 0;
    background-size: 100% auto;
}
.title2{
    background: url(../assets/listBox-t-2.png) no-repeat 0 0;
    background-size: 100% auto;
}
.title1{
    background: url(../assets/listBox-t-1.png) no-repeat 0 0;
    background-size: 100% auto;
}
.title{
    width: 100%; height: .52rem;
}
.rollBox .inner{
    background: url(../assets/listBox-m.png) repeat-y;
    background-size: 100% auto;
}
.rollBox{
    background: url(../assets/listBox-b.png) no-repeat 0 bottom;
    background-size: 100% auto;
    padding-bottom: .12rem;
    width: 3.71rem;
    float: left;
    margin: .42rem .5rem 0 0;
}
.right{
    padding: .66rem 0 0 .6rem;
}
h2{
    font-size: .36rem;
    text-align: center;
    height: 1.1rem; line-height: 1.1rem;
}
.wrap{
    overflow: hidden;
}
.left{
    padding: 0 0 0 .65rem;
}
.left,.right{
    width: 50%;
    height: 9.8rem;
}
.layout{
    width: 100%;
    background: url(../assets/bg2.png) no-repeat center 0;
    background-size: 100% auto;
}
</style>
