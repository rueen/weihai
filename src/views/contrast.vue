<template>
<div class="layout">
    <h1>威海市信用大数据分析平台</h1>
    <div class="wrap">
        <div class="left fl">
            <h2>跨行业黑名单交叉对比</h2>
            <div id="venn"></div>
        </div>
        <div class="right fr">
            <div class="rollBox">
                <h3 class="title title1"></h3>
                <div class="inner inner1">
                    <roll :height=".3" :contentArr="rollList" v-if="rollList.length > 0"></roll>
                </div>
            </div>
            <div class="rollBox">
                <h3 class="title title2"></h3>
                <div class="inner inner2">
                    <roll :height=".3" :contentArr="rollList" v-if="rollList.length > 0"></roll>
                </div>
            </div>
            <div class="rollBox">
                <h3 class="title title3"></h3>
                <div class="inner inner3">
                    <roll :height=".3" :contentArr="rollList" v-if="rollList.length > 0"></roll>
                </div>
            </div>
            <div class="rollBox">
                <h3 class="title title4"></h3>
                <div class="inner inner4">
                    <roll :height=".3" :contentArr="rollList" v-if="rollList.length > 0"></roll>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import roll from '../components/roll.vue';

export default {
    data() {
        return {
            rollList: [{
                title: '0静雅食品集团有限公司'
            },{
                title: '1静雅食品集团有限公司'
            },{
                title: '2静雅食品集团有限公司'
            },{
                title: '3静雅食品集团有限公司'
            },{
                title: '4静雅食品集团有限公司'
            },{
                title: '5静雅食品集团有限公司'
            },{
                title: '6静雅食品集团有限公司'
            },{
                title: '7静雅食品集团有限公司'
            },{
                title: '8静雅食品集团有限公司'
            },{
                title: '9静雅食品集团有限公司'
            },{
                title: '10静雅食品集团有限公司'
            },{
                title: '11静雅食品集团有限公司'
            },{
                title: '12静雅食品集团有限公司'
            },{
                title: '13静雅食品集团有限公司'
            }]
        }
    },
    components:{ roll },
    created() {
        // this.venn()
    },
    methods:{
        venn(){
            var sets = [ {sets: ['A'], size: 12},
            {sets: ['B'], size: 12},
            {sets: ['A','B'], size: 2}];

            var chart = venn.VennDiagram();
            d3.select("#venn").datum(sets).call(chart);
        }
    }
}
</script>

<style scoped>
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
    margin: 0 .5rem .42rem 0;
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
