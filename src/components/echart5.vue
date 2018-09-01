<template>
<div class="echart">
    <div class="venn" id="venn"></div>
    <ul class="legend">
        <li class="table" v-for="(item, index) in result">
            <div class="iconBox table-cell">
                <span class="icon" :class="{'blue': index == 0, 'yellow': index == 1, 'green': index == 2}"></span><span v-if="index == 0">A</span><span v-if="index == 1">B</span><span v-if="index == 2">C</span>
            </div>
            <div class="table-cell">
                <p>{{item['KEY_']}}</p>
                <p class="yellow f14">{{item['VALUE_']}}个</p>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import getElement from '../js/getElement.js'
import getD3 from '../js/getD3.js'
import { getData } from '@/js/getData'

export default {
    data() {
        return {
            result: []
        }
    },
    created() {
        getData('getScreen', '跨行业黑名单交叉比对总数').then((response) => {
            let result = response.rows.sort(function(a, b) {
                return (~~b.VALUE_) - (~~a.VALUE_)
            })

            this.result = result;
            this.venn()
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
