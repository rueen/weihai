<template>
<div class="echart">
    <div class="venn" id="venn"></div>
    <ul class="legend">
        <li class="table">
            <div class="iconBox table-cell">
                <span class="icon blue"></span>A
            </div>
            <div class="table-cell">
                <p>经营异常名录</p>
                <p class="yellow f14">{{num0}}个</p>
            </div>
        </li>
        <li class="table">
            <div class="iconBox table-cell">
                <span class="icon blue"></span>B
            </div>
            <div class="table-cell">
                <p>法院失信被执行人</p>
                <p class="yellow f14">{{num1}}个</p>
            </div>
        </li>
        <li class="table">
            <div class="iconBox table-cell">
                <span class="icon blue"></span>C
            </div>
            <div class="table-cell">
                <p>税务D 集</p>
                <p class="yellow f14">{{num2}}个</p>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import getElement from '../js/getElement.js'
import getD3 from '../js/getD3.js'

export default {
    data() {
        return {
            num0: 18884,
            num1: 1240,
            num2: 672,
            num0_1: 160,
            num0_2: 215,
            num1_2: 81,
            num0_1_2: 8
        }
    },
    created() {
        this.venn()
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
                {"sets": [0], "label": "经营异常名录", "size": this.num0, "fill": "#2694fd", "color": "#fff"},
                {"sets": [1], "label": "税务D级", "size": this.num1, "fill": "#1dc674", "color": "#fff"},
                {"sets": [2], "label": "法院失信被执行人", "size": this.num2, "fill": "#f4c93b", "color": "#fff"},
                {"sets": [0, 1], "size": this.num0_1},
                {"sets": [0, 2], "size": this.num0_2},
                {"sets": [1, 2], "size": this.num1_2},
                {"sets": [0, 1, 2], "size": this.num0_1_2}
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
.table{
    display: table;
}
.table-cell{
    display: table-cell;
}
.iconBox{
    padding: 0 .15rem 0 0;
}
.icon{
    display: inline-block;
    width: .12rem; height: .12rem;
    border-radius: 50%;
    margin-right: .05rem;
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
.legend{
    width: 35%;
    float: right;
    font-size: .14rem;
    color: #fff;
    padding: .2rem 0 0 0;
}
.legend li{
    padding: .08rem 0;
}
.venn{
    font-size: .14rem;
    color: #fff;
    width: 60%; height: 100%;
    float: left;
}
.echart{
    width: 100%;
    height: 2.26rem;
}
</style>
