<template>
<div class="layout">
    <div class="topBg">
        <h1>威海市信用大数据分析平台</h1>
        <div class="wrap">
            <div class="left fl">
                <h2>跨行业黑名单交叉对比</h2>
                <div class="venn" id="venn"></div>
                <div class="legend clearfix">
                    <ul class="fl">
                        <li>
                            <span class="icon blue fl"></span>
                            <p class="fl">经营异常名录<span class="f16 yellow num">18,623</span></p>
                        </li>
                        <li>
                            <span class="icon yellow fl"></span>
                            <p class="fl">法院失信被执行人<span class="f16 yellow num">18,623</span></p>
                        </li>
                        <li>
                            <span class="icon green fl"></span>
                            <p class="fl">税务D级<span class="f16 yellow num">18,623</span></p>
                        </li>
                    </ul>
                    <ul class="fl">
                        <li>
                            <span class="icon color1 fl"></span>
                            <p class="fl">经营异常名录&法院失信被执行人<span class="f16 yellow num">18,623</span></p>
                        </li>
                        <li>
                            <span class="icon color2 fl"></span>
                            <p class="fl">法院失信被执行人&税务D级<span class="f16 yellow num">18,623</span></p>
                        </li>
                        <li>
                            <span class="icon color3 fl"></span>
                            <p class="fl">税务D级&经营异常名录<span class="f16 yellow num">18,623</span></p>
                        </li>
                        <li>
                            <span class="icon color4 fl"></span>
                            <p class="fl">经营异常名录&法院失信被执行人&税务D级<span class="f16 yellow num">18,623</span></p>
                        </li>
                    </ul>
                </div>
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
</div>
</template>

<script>
import roll from '../components/roll.vue';
import getElement from '../js/getElement.js'

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
        this.venn()
    },
    methods:{
        venn(){
            getElement('venn', $elem => {
                var width = parseInt($elem.offsetWidth);
                var height = parseInt($elem.offsetHeight);

                this.render(width, height)
            })
        },
        render(width, height){
            var sets = [
                {"sets": [0], "label": "经营异常名录", "size": 300, "fill": "#2694fd", "color": "#fff"},
                {"sets": [1], "label": "税务D级", "size": 50, "fill": "#1dc674", "color": "#fff"},
                {"sets": [2], "label": "法院失信被执行人", "size": 100, "fill": "#f4c93b", "color": "#fff"},
                {"sets": [0, 1], "size": 20},
                {"sets": [0, 2], "size": 10},
                {"sets": [1, 2], "size": 20},
                {"sets": [0, 1, 2], "size": 5}
            ]

            var chart = venn.VennDiagram({
                width: width,
                height: height
            });

            var div = d3.select("#venn")
            div.datum(sets).call(chart);

            // div.select('g[data-venn-sets="0"]')
            //     .style("color", "#fff");

            // var tooltip = d3.select("body").append("div")
            //     .attr("class", "venntooltip");

            // div.selectAll("path")
            //     .style("stroke-opacity", 0)
            //     .style("stroke", "#fff")
            //     .style("stroke-width", 1)

            // div.selectAll("g")
            //     .on("mouseover", function(d, i) {
            //         // sort all the areas relative to the current item
            //         venn.sortAreas(div, d);

            //         // Display a tooltip with the current size
            //         tooltip.transition().duration(400).style("opacity", .9);
            //         tooltip.text(d.size + " users");

            //         // highlight the current path
            //         var selection = d3.select(this).transition("tooltip").duration(400);
            //         selection.select("path")
            //             .style("fill-opacity", d.sets.length == 1 ? .4 : .1)
            //             .style("stroke-opacity", 1);
            //     })

            //     .on("mousemove", function() {
            //         tooltip.style("left", (d3.event.pageX) + "px")
            //                .style("top", (d3.event.pageY - 28) + "px");
            //     })

            //     .on("mouseout", function(d, i) {
            //         tooltip.transition().duration(400).style("opacity", 0);
            //         var selection = d3.select(this).transition("tooltip").duration(400);
            //         selection.select("path")
            //             .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
            //             .style("stroke-opacity", 0);
            //     });
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
