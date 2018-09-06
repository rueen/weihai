<template>
<div class="app" id="app">
    <router-view/>
</div>
</template>

<script>


export default {
    name: 'App',
    created() {
        this.renderRem(1920)
        
    },
    methods:{
        resize(){
            // var height = document.documentElement.clientHeight;
            // var h = 1920;
            // var s = height / 1080;
            // var w = 1920 * s;

            this.renderRem(1920)
        },
        
        renderRem(width){
            var value = document.documentElement.clientWidth
            var ua = navigator.userAgent

            if (ua.match(/MI 5/) && ua.match(/QQBrowser/) && ! ua.match(/MicroMessenger/)) {
                value = (3 * value) / 2.6 // 小米虽然 dpr 是3 但表现的依然是 2.6
            }

            var  deviceWidth = Math.min(width, value)

            document.documentElement.style.fontSize = deviceWidth / 19.2 + 'px';
        }
    }
}
</script>

<style>
@import url('./fonts/iconfont.css');
html, body{
    display: block;
    /*overflow: hidden;*/
}
html, body,.layout, .topBg{
    width: 100%;
    height: 100%;
}
html,body,div,h1,h2,h3,p,img,input,form,button,ul,li{
    padding: 0; margin: 0;
    box-sizing:border-box;
}
ul,li{
    list-style: none;
}
button,
input
{
    font: inherit;
    margin: 0;
    color: inherit;
    outline: none;
    border: none;
    vertical-align: middle;
}

img{
    vertical-align: middle;
}
h1,h2,h3{
    font-weight: normal;
}
body{
    background: #010b2b;
    font-family: 'Microsoft YaHei';
    color: #fff;
}
.topBg{
    width: 100%; height: 9.6%;
    background: url(./assets/top-center.gif) no-repeat center 43%;
    background-size: 50%;
    z-index: 1;
}
h1{
    font-size: .3rem;
    color: #61ebe7;
    text-align: center;
    position: absolute;
    width: 100%; height: 7.4%;
    left: 0; top: 0;
}
.table{
    display: table;
}
.table-cell{
    display: table-cell;
}
h1 .table-cell{
    vertical-align: middle;
}

.clearfix:before,
.clearfix:after {
    content: " ";
    display: block;
    height: 0;
    line-height: 0;
    clear: both;
}
.fl{
    float: left;
}
.fr{
    float: right;
}
.yellow{
    color: #edbe00;
}
.red{
    color: #ff4967;
}
.f30{
    font-size: .3rem;
}
.f26{
    font-size: .26rem;
}
.f24{
    font-size: .24rem;
}
.f20{
    font-size: .2rem;
}
.f16{
    font-size: .16rem;
}
.f14{
    font-size: .14rem;
}
.goBck{
    position: absolute;
    right: .46rem; top: .3rem;
    font-size: .16rem;
    color: #5b89b2;
    line-height: .24rem;
    cursor: pointer;
    z-index: 9;
}
.goBck .iconfont{
    border: 1px solid #5b89b2;
    border-radius: 50%;
    display: inline-block;
    width: .24rem; height: .24rem;
    font-size: .12rem;
    text-align: center;
    margin-right: .06rem;
}
/*.venntooltip {
    position: absolute;
    text-align: center;
    padding: .2rem;
    background: #011747;
    color: #fff;
    border-radius: .16rem;
    opacity: 0;
    font-size: .14rem;
}*/
</style>
