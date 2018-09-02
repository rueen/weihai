<template>
<div class="box" v-if="companyName">
    <div class="item" :class="item.theme" v-for="(item, index) in result" :style="{'transform': 'rotate('+ rotate * index +'deg)', '-webkit-transform': 'rotate('+ rotate * index +'deg)', 'height': lineH + 'rem'}">
        <div class="line line1" :style="{'height': item.lineH + 'rem'}"></div>
        <div class="line line2" :style="{'height': item.lineH + 'rem'}"></div>
        <div class="node">
            <div class="inner">
                <p class="clamp3 text">{{item.name}}</p>
            </div>
        </div>
        <span class="relation">{{item.relation}}</span>
    </div>
    <div class="company">
        <div class="inner">{{companyName}}</div>
    </div>
</div>
</template>
 
<script type="text/ecmascript-6">
import { getScreenEnterprise } from '@/js/getData'

export default {
    data() {
        return {
            lineH: 3.6,
            companyName: '',
            curId: '',
            theme: ['cyan', 'yellow', 'azure', 'blue', 'pink', 'violet'],
            result: [],
            rotate: 0
        }
    },
    created() {
        // this.render('F96B14961BE77ECA9E9A1D99059AC739', '杭州诚淘', () => {

        // })
    },
    methods: {
        clear(){
            this.companyName = '';
        },
        render(ENTERPRISE_ID, companyName, callback){
            this.companyName = companyName;
            if(this.curId == ENTERPRISE_ID){
                return false
            }
            this.curId = ENTERPRISE_ID;
            getScreenEnterprise(ENTERPRISE_ID).then((response) => {
                var result = {};
                response.forEach((val) => {
                    if(val['xzxk']){
                        result['xzxk'] = val['xzxk']
                    } else if(val['xzcf']){
                        result['xzcf'] = val['xzcf']
                    } else if(val['ryxx']){
                        result['ryxx'] = val['ryxx']
                    }
                })
                result['xzxk'].forEach((val) => {
                    //行政许可
                    val.relation = '行政许可';
                    val.name = val['XMMC'];
                    val.theme = 'green';
                    val.lineH = (this.lineH - .22 * val.relation.length) / 2;
                })
                result['xzcf'].forEach((val) => {
                    //行政处罚
                    val.relation = '行政处罚';
                    val.name = val['XMMC'];
                    val.theme = 'green';
                    val.lineH = (this.lineH - .22 * val.relation.length) / 2;
                })
                result['ryxx'].forEach((val, index) => {
                    //行政处罚
                    val.relation = val['ZW'] || '';
                    val.name = val['XDRMC'];
                    val.theme = this.theme[index % this.theme.length];
                    val.lineH = (this.lineH - .22 * val.relation.length) / 2;
                })
                let arr = [];
                this.result = arr.concat(result['xzxk'], result['xzcf'], result['ryxx']);
                this.rotate = 360 / this.result.length;
                callback && callback()
            })
        },
    },

}
</script>
 
<style scoped>
.clamp2 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
}
.clamp3 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    word-break: break-all;
}
.box{
    width: 100%; height: 100%;
    position: relative;
}
.item{
    position: absolute;
    bottom: 50%;
    left: 50%;
    width: .01rem;
    font-size: .14rem;
    color: #fff;
    transform-origin: left bottom;
}
.line{
    width: 100%; height: 100%;
    position: absolute;
    left: 0;
}
.line1,
.line2{
    width: .01rem;
    position: absolute;
    left: 0;
}
.line1{
    top: 0;
}
.line2{
    bottom: 0;
}
.node{
    width: .7rem; height: .7rem;
    border-radius: 50%;
    position: absolute;
    left: 0; top: 0;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    display: table;
}
.green .line{
    background: #32af6a;
}
.green .node{
    width: 1rem; height: 1rem;
    background: #32af6a;
}

.violet .line,
.violet .node{
    background: #665bde;
}

.pink .line,
.pink .node{
    background: #d4567f;
}

.blue .line,
.blue .node{
    background: #3565ff;
}

.azure .line,
.azure .node{
    background: #00b6c6;
}

.yellow .line,
.yellow .node{
    background: #d3bd01;
}

.cyan .line,
.cyan .node{
    background: #69ba20;
}

.node .inner{
    text-align: center;
    vertical-align: middle;
    display: table-cell;
    font-size: .16rem;
}
.node .inner .text{
    padding: 0 .1rem;
}
.relation{
    position: absolute;
    left: 50%; top: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    font-size: .14rem;
    line-height: .18rem;
}
.company{
    position: absolute;
    top: 50%; left: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    font-size: .2rem; line-height: .28rem;
    padding: .13rem;
    background: #724b43;
    border-radius: 50%;
}
.company .inner{
    text-align: center;
    vertical-align: middle;
    display: table-cell;
    width: 1.3rem; height: 1.3rem;
    border-radius: 50%;
    background: #e8803a;
    border: 1px solid #fff;
}

</style>