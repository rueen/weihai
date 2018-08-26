<template>
<div class="app" id="app">
    <router-view/>
</div>
</template>

<script>
export default {
    name: 'App',
    created() {
        this.renderRem();
        window.onresize = () => {
            this.renderRem()
            // window.location.reload()
        }
    },
    methods:{
        renderRem(){
            var value = document.documentElement.clientWidth
            var ua = navigator.userAgent

            if (ua.match(/MI 5/) && ua.match(/QQBrowser/) && ! ua.match(/MicroMessenger/)) {
                value = (3 * value) / 2.6 // 小米虽然 dpr 是3 但表现的依然是 2.6
            }

            var  deviceWidth = Math.min(1920, value)

            document.documentElement.style.fontSize = deviceWidth / 19.2 + 'px';
        }
    }
}
</script>

<style>
@import url('./fonts/iconfont.css');
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
h1{
    font-size: .3rem;
    color: #61ebe7;
    width: 100%; height: .76rem;
    line-height: .8rem;
    text-align: center;
    /*background: url(./assets/top-center.gif) no-repeat center 42%;*/
    /*background-size: 50%;*/
}
.topBg{
    background: url(./assets/top-center.gif) no-repeat center -35%;
    background-size: 50%;
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
