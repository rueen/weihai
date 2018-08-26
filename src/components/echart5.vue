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
                <p class="yellow f14">1983个</p>
            </div>
        </li>
        <li class="table">
            <div class="iconBox table-cell">
                <span class="icon blue"></span>B
            </div>
            <div class="table-cell">
                <p>法院失信被执行人</p>
                <p class="yellow f14">837个</p>
            </div>
        </li>
        <li class="table">
            <div class="iconBox table-cell">
                <span class="icon blue"></span>C
            </div>
            <div class="table-cell">
                <p>税务D 集</p>
                <p class="yellow f14">624个</p>
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
