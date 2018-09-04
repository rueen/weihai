<template>
<div class="box" v-if="companyName">
    <div class="item" :class="item.theme" v-for="(item, index) in result" :style="{'transform': 'rotate('+ rotate * index +'deg)', '-webkit-transform': 'rotate('+ rotate * index +'deg)', 'height': lineH + 'rem'}">
        <div class="line line1" :style="{'height': item.lineH + 'rem'}"></div>
        <div class="line line2" :style="{'height': item.lineH + 'rem'}"></div>
        <div class="node" @mouseover.stop="mouseover($event, item)" @mouseout.stop="mouseout($event)">
            <div class="inner">
                <p class="clamp3 text">{{item.name}}</p>
            </div>
        </div>
        <span class="relation">{{item.relation}}</span>
    </div>
    <div class="company">
        <div class="inner">
            <p class="company-clamp3">{{companyName}}</p>
        </div>
    </div>
    <div class="tips" :class="{'hide': !isShowTips}" id="tips" :style="{'left': x + 'px', 'top': y + 'px'}">
        <p class="title"><span class="icon"></span>公司信息</p>
        <p class="tips-company">{{companyName}}</p>
        <ul class="tips-list">
            <li><span class="blue">企  业  法  人：</span>{{companyData.FRDBXM}}</li>
            <li><span class="blue">注  册  资  本：</span>{{companyData.ZCZB}}</li>
            <li><span class="blue">成  立  日  期：</span>{{companyData.CLRQ}}</li>
            <li><span class="blue">组织机构代码：</span>{{companyData.JGDM}}</li>
        </ul>
    </div>
</div>
</template>
 
<script type="text/ecmascript-6">
import { getScreenEnterprise } from '@/js/getData'
import getElement from '../js/getElement.js'

export default {
    data() {
        return {
            lineH: 3.6,
            companyName: '',
            curId: '',
            theme: ['cyan', 'yellow', 'azure', 'blue', 'pink', 'violet'],
            result: [],
            rotate: 0,
            isShowTips: false,
            x: 0,
            y: 0,
            companyData: {}
        }
    },
    created() {
        // this.render('F96B14961BE77ECA9E9A1D99059AC739', {
        //     ENTERPRISE_ID: "B1C232117B20ABEEFC4CA045314BBEF5",
        //     FRDBXM: "姜明",
        //     GSZCH: "371022200017625",
        //     JGDM: "MA3EMNC04",
        //     QYMC: "威海威高置业有限公司威海威高置业有限公司",
        //     RN: 1,
        //     XYDM: "91371000MA3EMNC04W"
        // }, () => {

        // })
    },
    methods: {
        mouseover(e, item){
            if(e.target.classList.contains('tips') || e.target.parentNode.classList.contains('tips')){
                return false
            }
            this.isShowTips = true;

            getElement('tips', $elem => {
                var width = parseInt($elem.offsetWidth);

                this.x = e.clientX - width - 30;
                this.y = e.clientY;
            })
        },
        mouseout(e){
            if(e.target.classList.contains('tips') || e.target.parentNode.classList.contains('tips')){
                return false
            }
            this.isShowTips = false;
        },
        clear(){
            this.companyName = '';
        },
        render(ENTERPRISE_ID, companyData, callback){
            this.companyData = companyData;
            this.companyName = companyData.QYMC;
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
.blue{
    color: #9fc5df;
}
.tips-list{
    font-size: .16rem;
    line-height: .34rem;
}
.tips-company{
    font-size: .2rem;
    line-height: .4rem;
}
.hide{
    display: none;
}
.tips{
    position: absolute;
    background: rgba(0,0,0,.3);
    padding: .25rem;
    width: 3.3rem; height: auto;
    right: 0; top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    border-radius: .15rem;
}
.tips:after{
    content: '';
    width: 0; height: 0;
    border-top: .14rem solid transparent;
    border-bottom: .14rem solid transparent;
    border-right: none;
    border-left: .14rem solid rgba(0,0,0,.3);
    position: absolute;
    right: -.14rem; top: 50%;
    margin-top: -.14rem;
}
.tips .title{
    font-size: .16rem;
    line-height: .16rem;
    color: #9fc5df;
    padding: .1rem 0;
}
.tips .title .icon{
    display: inline-block;
    width: .04rem; height: .16rem;
    background: #32af6a;
    border-radius: .02rem;
    margin-right: .08rem;
}
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
    line-height: .22rem;
    max-height: .66rem;
}
.box{
    width: 100%; height: 100%;
    /*position: relative;*/
}
.item{
    position: absolute;
    bottom: 50%;
    left: 68%;
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
    z-index: 99;
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
    text-align: center;
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
    top: 50%; left: 68%;
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
.company-clamp3{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    line-height: .3rem;
    max-height: .9rem;
}

</style>