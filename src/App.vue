<template>
<div id="app">
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
    background: #000a2a;
    font-family: 'Microsoft YaHei';
    color: #fff;
}
h1{
    font-size: .3rem;
    color: #61ebe7;
    width: 100%; height: 1.2rem;
    line-height: 1rem;
    text-align: center;
    background: url(./assets/top-center.gif) no-repeat center 42%;
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
/*.row:before, .row:after
{
    display: table;

    content: ' ';
}
.row:after
{
    clear: both;
}

.col-lg-1, .col-sm-1, .col-lg-2, .col-sm-2, .col-lg-3, .col-sm-3, .col-lg-4, .col-sm-4, .col-lg-5, .col-sm-5, .col-lg-6, .col-sm-6, .col-lg-7, .col-sm-7, .col-lg-8, .col-sm-8, .col-lg-9, .col-sm-9, .col-lg-10, .col-sm-10, .col-lg-11, .col-sm-11, .col-lg-12, .col-sm-12
{
    position: relative;

    min-height: 1px;
}

.row > [class*='col-']
{
    float: left;
}

.col-lg-12
{
    width: 100%;
}

.col-lg-11
{
    width: 91.66666667%;
}

.col-lg-10
{
    width: 83.33333333%;
}

.col-lg-9
{
    width: 75%;
}

.col-lg-8
{
    width: 66.66666667%;
}

.col-lg-7
{
    width: 58.33333333%;
}

.col-lg-6
{
    width: 50%;
}

.col-lg-5
{
    width: 41.66666667%;
}

.col-lg-4
{
    width: 33.33333333%;
}

.col-lg-3
{
    width: 25%;
}

.col-lg-2
{
    width: 16.66666667%;
}

.col-lg-1
{
    width: 8.33333333%;
}

@media (max-width: 1000px)
{
    .col-sm-12
    {
        width: 100%;
    }

    .col-sm-11
    {
        width: 91.66666667%;
    }

    .col-sm-10
    {
        width: 83.33333333%;
    }

    .col-sm-9
    {
        width: 75%;
    }

    .col-sm-8
    {
        width: 66.66666667%;
    }

    .col-sm-7
    {
        width: 58.33333333%;
    }

    .col-sm-6
    {
        width: 50%;
    }

    .col-sm-5
    {
        width: 41.66666667%;
    }

    .col-sm-4
    {
        width: 33.33333333%;
    }

    .col-sm-3
    {
        width: 25%;
    }

    .col-sm-2
    {
        width: 16.66666667%;
    }

    .col-sm-1
    {
        width: 8.33333333%;
    }
}*/
</style>
