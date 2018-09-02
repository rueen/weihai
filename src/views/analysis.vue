<template>
<div class="layout">
    <div class="topBg">
        <h1>威海市信用大数据分析平台</h1>
        <div class="goBck">
            <router-link class="more link" tag="span" to="/">
                <span class="iconfont icon-siglypharrowbackward"></span>
                返回
            </router-link>
        </div>
        <div class="wrap">
            <div class="left fl">
                <div class="searchBox">
                    <div class="top"></div>
                    <div class="inner">
                        <form class="clearfix" @submit.prevent="search">
                            <div class="inputBox fl">
                                <input type="text" class="input" placeholder="请输入企业、个人名称" id="keyword" v-model="keyword">
                                <span class="iconfont icon-shanchu" @click="reSearch"></span>
                            </div>
                            <button type="submit" class="searchBtn fr">搜索</button>
                        </form>
                        <!-- <div class="screen screen1 clearfix">
                            <div class="screenLeft fl">投资方式:</div>
                            <div class="fr screenRight">
                                <span class="item">全部</span>
                                <span class="item cur">直接投资</span>
                                <span class="item">股东投资</span>
                                <span class="item">董高监法投资</span>
                            </div>
                        </div>
                        <div class="screen screen2 clearfix">
                            <div class="screenLeft fl">状态:</div>
                            <div class="fr screenRight">
                                <span class="item cur">正常</span>
                                <span class="item">注销</span>
                            </div>
                        </div> -->
                        <p class="loading" v-if="isLoading">加载中……</p>
                        <ul class="resultList">
                            <li class="resultItem" v-for="(item, index) in resultList">
                                <div class="f16 resultTitle clearfix" @click="toggle(item, index)">
                                    <span class="fl">{{index + 1}}.{{item.QYMC}}</span>
                                    <span class="iconfont fl icon-arrow-b-line" :class="{'icon-arrow-t-line': openIndex == index}"></span>
                                </div>
                                <div class="details f16" v-if="(openIndex == index) || (resultList.length == 1)">
                                    <p>企业法人：{{item.FRDBXM}}</p>
                                    <p>注册资本：{{item.ZCZB}}万人民币</p>
                                    <p>成立日期：{{item.CLRQ}}</p>
                                    <p>组织机构代码：{{item.JGDM}}</p>
                                </div>
                            </li>
                        </ul>
                        <p class="tips" v-if="resultList.length > 0">共找到{{total}}家匹配的企业，重新搜索请点击<span class="goBack" @click="reSearch">返回</span>或直接在搜索框中输入企业、个人名称</p>
                    </div>
                    <div class="bottom"></div>
                </div>
                <div class="searchBox searchBox2">
                    <div class="top"></div>
                    <div class="inner">
                        <p class="f16">信用等级：</p>
                        <ul class="legend">
                            <li class="item">
                                <span class="icon color1 fl"></span>AAA级
                            </li>
                            <li class="item">
                                <span class="icon color2 fl"></span>AA级
                            </li>
                            <li class="item">
                                <span class="icon color3 fl"></span>A级
                            </li>
                            <li class="item">
                                <span class="icon color4 fl"></span>B级
                            </li>
                            <li class="item">
                                <span class="icon color5 fl"></span>C级
                            </li>
                            <li class="item">
                                <span class="icon color6 fl"></span>D级
                            </li>
                        </ul>
                    </div>
                    <div class="bottom"></div>
                </div>
            </div>
            <div class="right fr">
                <div class="echartBox">
                    <echart7 ref="echart7"></echart7>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import echart7 from "../components/echart7.vue"
import { search } from '@/js/getData'

export default {
    data() {
        return {
            keyword: '',
            total: 0,
            resultList: [],
            openIndex: null,
            isLoading: false
        }
    },
    components: { echart7 },
    created() {

    },
    methods:{
        //重新搜索
        reSearch(){
            this.keyword = '';
            this.resultList = [];
            this.openIndex = null;
            document.getElementById('keyword').focus();
            this.$refs.echart7.clear();
        },
        search(){
            this.isLoading = true;
            search(this.keyword).then((response) => {
                let result = response.rows;

                this.isLoading = false;
                this.total = response.total;
                this.resultList = result;
            })
        },
        toggle(data, index){
            if(this.openIndex == index){
                this.openIndex = null;
            } else {
                this.openIndex = index;
                //渲染图片
                this.$refs.echart7.render(data.ENTERPRISE_ID, data.QYMC);
            }
        }
    }
}
</script>

<style scoped>
.loading{
    text-align: center;
    font-size: .12rem;
    padding: .2rem 0;
    color: #9fc5df;
}
.legend{
    padding: .1rem 0 .1rem 0;
    overflow: hidden;
}
.legend .item{
    float: left;
    height: .4rem;
    font-size: .16rem;
    line-height: .16rem;
    padding: .2rem 0;
    width: 1.7rem;
}
.legend .item:nth-child(3n){
    width: 1rem;
}
.icon{
    display: inline-block;
    width: .16rem; height: .16rem;
    border-radius: 50%;
    margin-right: .14rem;
}
.icon.color1{
    background: #665bde;
}
.icon.color2{
    background: #e75686;
}
.icon.color3{
    background: #3565ff;
}
.icon.color4{
    background: #00b6c6;
}
.icon.color5{
    background: #d3bd01;
}
.icon.color6{
    background: #69ba20;
}
h1{
    height: .9rem;
}
.right{
    padding-right: 2rem;
}
.echartBox{
    width: 8.5rem; height: 8.5rem;
}
.searchBox2{
    margin-top: .3rem;
}
.resultTitle{
    height: .3rem;
    line-height: .3rem;
    cursor: pointer;
}
.resultItem{
    padding: .1rem;
}
.resultItem .details{
    line-height: .34rem;
    padding: .05rem 0 .05rem .15rem;
}
.tips{
    color: #9fc5df;
    font-size: .16rem;
    line-height: .28rem;
}
.tips .goBack{
    color: #37aefe;
    cursor: pointer;
}
.screen{
    /*padding: .1rem 0;*/
}
.screen1{
    padding-top: .3rem;
}
.screen2{
    padding-top: .06rem;
}
.screenRight{
    width: 3.7rem;
}
.screenRight .item{
    float: left;
    border: .01rem solid #fff;
    border-radius: .02rem;
    height: .26rem; line-height: .26rem;
    padding: 0 .1rem;
    font-size: .14rem;
    margin: 0 .14rem .14rem 0;
    cursor: pointer;
}
.screenRight .item.cur{
    background: #1680c7;
    border-color: #1680c7;
}
.screenLeft{
    width: .87rem;
    text-align: right;
    font-size: .16rem;
}
.inputBox{
    position: relative;
    width: 3.5rem; height: .5rem;
    border: .01rem solid #fff;
    border-radius: .04rem;
}
.inputBox .icon-shanchu{
    position: absolute;
    top: 50%; right: .1rem;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: .16rem;
    cursor: pointer;
    margin-top: .01rem;
}
.searchBtn{
    width: 1rem; height: .5rem;
    text-align: center;
    line-height: .5rem;
    color: #fff;
    font-size: .16rem;
    background: #1680c7;
    border-radius: .04rem;
    cursor: pointer;
}
.searchBox .input{
    width: 100%; height: 100%;
    border: none;
    font-size: .16rem;
    background: transparent;
    padding: 0 .12rem;
    color: #fff;
    float: left;
}
.searchBox .inner{
    /*height: 4.58rem;*/
    padding: .22rem .28rem .2rem .28rem;
}
.searchBox .top{
    background: url(../assets/searchBox-t.png) no-repeat 0 0;
}
.searchBox .bottom{
    background: url(../assets/searchBox-b.png) no-repeat 0 0;
}
.searchBox .top,
.searchBox .bottom{
    width: 100%; height: .12rem;
    background-size: 100% auto;
}
.searchBox{
    background: url(../assets/searchBox-m.png) repeat-y 0 0;
    background-size: 100% auto;
    width: 5.22rem;
}
.left{
    padding: .42rem 0 0 1.5rem;
}
.wrap{
    width: 100%; height: 9.8rem;
}
.layout{
    width: 100%;
    background: url(../assets/bg2.png) no-repeat center 0;
    background-size: 100% auto;
}
</style>
