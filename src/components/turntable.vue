<template>
<div class="turntable">
    <img src="../assets/zhuan.gif" alt="" class="zhuan">
    <div class="tips">
        <div class="p-1 f16">归集数量<div class="fr yellow"><span class="f24">{{total | NumFormat}}</span><span class="f24">条</span></div></div>
        <div class="p-2 f16">法人归集数量<div class="fr yellow"><span class="f24">{{num1 | NumFormat}}</span><span class="f24">条</span></div></div>
        <div class="p-3 f16">自然人归集数量<div class="fr red"><span class="f24">{{num2 | NumFormat}}</span><span class="f24">条</span></div></div>
        <div class="p-4 f16">行政许可数量<div class="fr yellow"><span class="f24">{{num3 | NumFormat}}</span><span class="f24">条</span></div></div>
        <div class="p-5 f16">行政处罚数量<div class="fr yellow"><span class="f24">{{num4 | NumFormat}}</span><span class="f24">条</span></div></div>
        <div class="top-left"></div>
        <div class="bottom-left"></div>
    </div>
</div>
</template>

<script>
import { getData, delay } from '@/js/getData'

export default {
    data() {
        return {
            num1: 0,//法人归集数量
            num2: 0,//自然人归集数量
            num3: 0,//行政许可数量
            num4: 0//行政处罚数量
        }
    },
    computed: {
        total(){
            return Number(this.num1) + Number(this.num2) + Number(this.num3) + Number(this.num4);
        }
    },
    created() {
        var timer = null;
        var fun = () => {
            getData('getScreen', '平台概况').then((response) => {
                response.rows.forEach((val) => {
                    switch(val['KEY_']){
                        case '法人归集数量':
                            this.num1 = val['VALUE_']
                            break;
                        case '自然人归集数量':
                            this.num2 = val['VALUE_']
                            break;
                        case '行政许可数量':
                            this.num3 = val['VALUE_']
                            break;
                        case '行政处罚数量':
                            this.num4 = val['VALUE_']
                            break;
                    }
                })
            })
        };

        fun()
        clearInterval(timer)
        timer = setInterval(fun, delay)
    },
    methods:{
        
    }
}
</script>

<style scoped>
.top-left{
    top: 0;
    background: url(../assets/top-left.gif) no-repeat -.33rem -.06rem;
    background-size: 100% auto;
}
.bottom-left{
    bottom: 0;
    background: url(../assets/bottom-left.gif) no-repeat -.33rem .06rem;
    background-size: 100% auto;
}
.top-left,
.bottom-left{
    position: absolute;
    left: 0;
    width: 1rem; height: .56rem;
}
.p-4{
    padding: .15rem 0 0 0;
}
.p-3, .p-5{
    padding: .05rem 0 0 0;
}
.p-2{
    padding: .12rem 0 0 0;
}
.p-2, .p-3,.p-4, .p-5{
    height: .24rem line-height.24rem;
}
.p-1{
    overflow: hidden;
    height: .5rem;
    line-height: .5rem;
}
.p-1,.p-2,.p-3,.p-4,.p-5{
    overflow: hidden;
}
.tips{
    /*max-width: 24.53%;*/
    max-height: 26.48%;
    /*max-width: 64.5%;*/
    /*max-height: 31.5%;*/
    /*max-width: 64.5%; max-height: 100%;*/
    width: 24.53%;
    background: url(../assets/zhuan-tips-bg.png) no-repeat 0 0;
    background-size: 100% 100%;
    position: absolute;
    /*left: 10.68%; top: 0;*/
    left: 34.375%; top: 14.26%;
    padding: 0.9% 8.85% 5.37% 1.3%;
}
/*.turntable{
    width: 36.5%; max-height: 31.5%;
    position: absolute;
    left: 31%; top: 14.26%;
}*/
.zhuan{
    width: auto;
    height: auto;
    /*max-width: 37.6%;*/
    /*max-height: 31.5%;*/
    max-width: 14.58%;
    max-height: 26%;
    position: absolute;
    top: 14.26%;
    left: 51.56%
    /*top: 0; left: 56.8%*/
}
</style>
