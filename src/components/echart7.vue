<template>
  <div id="app1" class="container"></div>
</template>
 
<script type="text/ecmascript-6">
import getElement from '../js/getElement.js'
import getD3 from '../js/getD3.js'
import analysisJson from '../json/analysis.json'
import { getScreenEnterprise } from '@/js/getData'

export default {
    // props: ['id'],
    data() {
        return {
            relation: {},
            cname: '',
            isPc: false
        }
    },
    created() {
        this.$nextTick(() => {
            this.relation = analysisJson;

            getD3(() => {
                getElement('app1', $elem => {
                    var width = parseInt($elem.offsetWidth);
                    var height = parseInt($elem.offsetHeight);

                    this.showd3(width, height)
                })
            })
        })
    },
    methods: {
        render(ENTERPRISE_ID){
            getScreenEnterprise(ENTERPRISE_ID).then((response) => {
                console.log(response)
            })
        },
        showd3(width, height) {
            //        节点大小（圆圈大小）
            // const nodeSize = 30
            //        初始化时连接线的距离长度
            const linkDistance = 180
            //        赋值数据集
            var nodes = this.relation.nodes
            var links = this.relation.links
            //      设置画布，获取id为app的对象，添加svg，这里的图像用了svg，意为可缩放矢量图形，它与其他图片格式相比较，svg更加小，因为是矢量图，放大不会失帧。具体可以自行百度svg相关知识
            var svg = d3.select('#app1').append('svg')
                .attr('xmlns', 'http://www.w3.org/2000/svg')
                .attr('version', '2.0')
                .attr('class', 'svg') //给svg设置了一个class样式，主要作用是长宽设置为100%
            //        设置力布局，使用d3 v4版本的力导向布局
            var force = d3.forceSimulation()
                .force('center', d3.forceCenter(width / 2, height / 2)) //设置力导向布局的中心点，创建一个力中心，设置为画布长宽的一半，所以拓扑图会在画布的中心点
                .force('charce', d3.forceManyBody().strength(-70)) //节点间的作用力，如果不设置.strength(-60）的话，默认是-30
                .force('collide', d3.forceCollide()) //使用默认的半径创建一个碰撞作用力。radius默认所有的节点都为1

            //        设置缩放
            //        svg下嵌套g标签，缩放都在g标签上进行
            var g = svg.append('g')

            //        设置连线
            var edgesLine = g.selectAll('line')
                .data(links)
                .enter()
                .append('path')
                .attr('class', 'edgelabel') //添加class样式
                .attr('class', (d, i) => {
                    switch(links[i].type)
                    {
                        case 0:
                            return 'nodeOrange'
                        break;
                        case 1:
                            return 'nodeGreen'
                        break;
                        case 2:
                            return 'nodeCyan'
                        break;
                        case 3:
                            return 'nodeYellow'
                        break;
                        case 4:
                            return 'nodeAzure'
                        break;
                        case 5:
                            return 'nodeBlue'
                        break;
                        case 6:
                            return 'nodePink'
                        break;
                        case 7:
                            return 'nodeViolet'
                        break;
                    }
                }) //添加颜色
                .attr('id', (d, i) => {
                    return 'edgesLine' + i
                }) //添加颜色
                .style('stroke-width', 1) //连接线粗细度
            //设置线的末尾为刚刚的箭头
            //        设置连接线中间关系文本
            var edgesText = g.selectAll('.linetext')
                .data(links)
                .enter()
                .append('text')
                .attr('class', (d, i) => {
                    return 'linetextStyle'
                })
                // .attr('rotate', 10)
                .text((d) => {
                    //          设置关系文本
                    return d.relation
                })
                // .attr('x', function(d,i){
                //     d3.select(this).append('textPath')
                //         // .attr('startOffset', '50%')
                //         .attr('xlink:href', () => {
                //             return '#edgesLine' + i
                //         })
                //         .text(function() { return d.relation })
                // })

            var childCircle = g.selectAll('.linetext')
                .data(links)
                .enter()
                .append('circle')
                .attr('r', 20)
                // .attr('fill', '#ff7438')
                .attr('class', (d, i) => {
                    switch(links[i].type)
                    {
                        case 0:
                            return 'nodeOrange childCircle'
                        break;
                        case 1:
                            return 'nodeGreen childCircle-none'
                        break;
                        case 2:
                            return 'nodeCyan childCircle'
                        break;
                        case 3:
                            return 'nodeYellow childCircle'
                        break;
                        case 4:
                            return 'nodeAzure childCircle'
                        break;
                        case 5:
                            return 'nodeBlue childCircle'
                        break;
                        case 6:
                            return 'nodePink childCircle'
                        break;
                        case 7:
                            return 'nodeViolet childCircle'
                        break;
                    }
                })
            var childText = g.selectAll('.linetext')
                .data(links)
                .enter()
                .append('text')
                .attr('class', (d, i) => {
                    return 'linetextStyle'
                })
                // .text((d, i) => {
                //     if(links[i].type > 1){
                //         return d.score
                //     }
                // })
                .attr('x', function(d, i) {
                    var reEn = /[a-zA-Z]+/g;
                    var reNum = /[0-9]+/g;

                    if (d.score && d.score.match(reEn)) {
                        //中文小于八个字，则分段进行换行
                        let top = d.score.match(reNum)
                        let bot = d.score.match(reEn)
                        //这里的this指代text dom，不懂的可以自行打印this查看
                        d3.select(this).append('tspan')
                            .text(function() { return top })
                        d3.select(this).append('tspan')
                            // .attr('dy', '1.2em') //设置偏移
                            .text(function() { return bot })
                    }
                })

            // eslint-disable-next-line no-unused-vars
            var nodeGroup = g.selectAll('g').data(nodes)
                .enter()
                .append('g')
                .attr('id', function(d, i) {
                    return 'nodeGroup' + i
                })
                .each(function(d, i) {
                    var self = this;
                    var nodeSize = 20;

                    if(d.type === 0){
                        nodeSize = 50
                    } else if(d.type == 1){
                        nodeSize = 30
                    }

                    d3.select(this)
                        .append('circle')
                        .attr('r', nodeSize)
                        .attr('class', (d, i) => {
                            //为不同的节点设置不同的css样式
                            switch(d.type)
                            {
                                case 0:
                                    return 'circle nodeOrange'
                                break;
                                case 1:
                                    return 'circle nodeGreen'
                                break;
                                case 2:
                                    return 'circle nodeCyan'
                                break;
                                case 3:
                                    return 'circle nodeYellow'
                                break;
                                case 4:
                                    return 'circle nodeAzure'
                                break;
                                case 5:
                                    return 'circle nodeBlue'
                                break;
                                case 6:
                                    return 'circle nodePink'
                                break;
                                case 7:
                                    return 'circle nodeViolet'
                                break;
                            }
                        })
                        .attr('id', (d, i) => {
                            //            为每个节点设置不同的id
                            return 'node' + i
                        })
                        .on('touchmove', (d, i) => {
                            //            设置鼠标监听时间，当移动端手指移动时,设置关系文本透明度
                            edgesText.style('fill-opacity', function(edge) {
                                if (edge.source === d || edge.target === d) {
                                    return 1.0
                                } else {
                                    return 0
                                }
                            })
                            /**
                             * 改本svg的层级，这个主要是因为在svg中z-index是无效的，svg根据绘制的先后顺序，后绘制的排在最上面，就像贴纸，
                             * 后贴的会盖住前面贴的。所以我们希望在被选中时，能够把节点和节点对应的文字提到最上一层，我们就可以通过d3来选择到点击的对象，然后通过raise方法来提到最上一层
                             * 下同
                             */
                            d3.select(self).raise()
                        })
                        .on('touchend', (d, i) => {
                            //            手指移开后，所有关系文本设置透明度为1
                            edgesText.style('fill-opacity', function(edge) {
                                return 1.0
                            })
                        })
                        .on('mousedown', (d, i) => {
                            edgesText.style('fill-opacity', function(edge) {
                                if (edge.source === d || edge.target === d) {
                                    return 1.0
                                } else {
                                    return 0
                                }
                            })
                            d3.select(self).raise()
                        })
                        .on('mouseout', (d, i) => {
                            edgesText.attr('fill-opacity', function(edge) {
                                return 1
                            })
                        })

                    d3.select(this)
                        .append('text')
                        .attr('text-anchor', 'middle')
                        .attr('class', 'nodetext')
                        .attr('id', (d, i) => {
                            return 'nodetext' + i
                        })
                        .attr('x', function(d, i) {
                            /**
                             * 由于svg的text不能进行换行，所以下面文字使用了tspan进行换行操作
                             */
                            //正则表达式
                            var reEn = /[a-zA-Z]+/g
                            //如果全英文则不换行
                            if (d.name.match(reEn)) {
                                d3.select(this).append('tspan')
                                    .attr('class', 'nodetext')
                                    .attr('fill', '#ff7438')
                                    .text(function() { return d.name })
                            } else if (d.name.length <= 4) {
                                //文中小于4个字不换行
                                d3.select(this).append('tspan')
                                    .attr('class', 'nodetext')
                                    .attr('fill', '#ff7438')
                                    .text(function() { return d.name })
                            } else {
                                if (d.name.length <= 8) {
                                    //中文小于八个字，则分段进行换行
                                    let top = d.name.substring(0, 4)
                                    let bot = d.name.substring(4, 8)
                                    //这里的this指代text dom，不懂的可以自行打印this查看
                                    d3.select(this).append('tspan')
                                        .text(function() { return top })
                                    d3.select(this).append('tspan')
                                        .attr('dy', '1.2em') //设置偏移
                                        .text(function() { return bot })
                                } else {
                                    //中文大于8个字，分段并用...代替后面的字符
                                    let top = d.name.substring(0, 4)
                                    let bot = d.name.substring(4, 7) + '...'
                                    d3.select(this).append('tspan')
                                        .text(function() { return top })
                                    d3.select(this).append('tspan')
                                        .attr('dy', '1.2em')
                                        .text(function() { return bot })
                                }
                            }
                        })
                        .attr('cursor', 'default') //设置鼠标样式
                        .on('touchmove', (d, i) => {
                            edgesText.style('fill-opacity', function(edge) {
                                if (edge.source === d || edge.target === d) {
                                    return 1.0
                                } else {
                                    return 0
                                }
                            })
                            //改本svg的层级
                            d3.select(self).raise()
                        })
                        .on('touchend', (d, i) => {
                            edgesText.style('fill-opacity', function(edge) {
                                return 1.0
                            })
                        })
                        .on('mousedown', (d, i) => {
                            edgesText.style('fill-opacity', function(edge) {
                                if (edge.source === d || edge.target === d) {
                                    return 1.0
                                } else {
                                    return 0
                                }
                            })
                            d3.select(self).raise()
                        })
                        .on('mouseout', (d, i) => {
                            edgesText.style('fill-opacity', function(edge) {
                                return 1.0
                            })
                        })
                })

            //        设置node和edge
            force.nodes(nodes)
                .force('link', d3.forceLink(links).distance(linkDistance).strength(0.1))
                .restart()
            //        tick 表示当运动进行中每更新一帧时
            force.on('tick', function() {
                //          //更新连接线的位置
                edgesLine.attr('d', function(d) {
                    var path = 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y
                    return path
                })
                //更新子圆圈位置
                childCircle.attr('cx', function(d) {
                    return (d.source.x + d.target.x) / 2
                })
                childCircle.attr('cy', function(d) { return (d.source.y + d.target.y) / 2 })

                //更新连接线上文字的位置
                edgesText.attr('x', function(d) {
                    return d.target.x + (d.source.x - d.target.x) / 4
                    // return (d.source.x + d.target.x) / 2
                })
                edgesText.attr('y', function(d) {
                    return d.target.y + (d.source.y - d.target.y) / 4
                    // return (d.source.y + d.target.y) / 2
                })
                childText.attr('x', function(d) {
                    return (d.source.x + d.target.x) / 2
                })
                childText.attr('y', function(d) { return (d.source.y + d.target.y) / 2 })
                //更新结点和文字
                d3.selectAll('.circle').attr('cx', function(d) {
                    return d.x
                })
                d3.selectAll('.circle').attr('cy', function(d) { return d.y })
                d3.selectAll('.nodetext').attr('x', function(d) { return d.x })
                d3.selectAll('.nodetext').attr('y', function(d) { return d.y })
                //动态更新sptan 的x的坐标
                d3.selectAll('.nodetext').selectAll('tspan')
                    .attr('x', function(d) {
                        return d.x
                    })
            })
        }
    },

}
</script>
 
<style>
.childCircle-none{
    display: none;
}
.container{
height: 100%;
  }
  .labeltext{
    font-size: 16px;
    font-family: SimSun;
    fill: #ff7438;
  }
    
 
  .nodetext{
    font-size: 12px;
    font-family: SimSun;
    fill: #fff;
    position: relative;
  }
    
 
  .linetextStyle{
    font-size: 12px;
    font-weight: bold;
    font-family: SimSun;
    fill: #fff !important;
    color: #fff;
    fill-opacity: 1.0;
    text-anchor: middle!important;
  }
 
  .svg{
    position: relative;
    width: 100%;
    height: 100%;
  }
 
  .edgepath{
    pointer-events: none;
    stroke-width: 0.5px;
  }
  .nodeOrange{
    position: relative;
    /*fill: url(../assets/listBox-t-4.png)!important;*/
    fill: #e8803a !important;
    stroke: #fff;
  }
  .nodeGreen{
    position: relative;
    fill: #32af6a !important;
    stroke: #32af6a;
  }
  .nodeCyan{
    position: relative;
    fill: #69ba20 !important;
    stroke: #69ba20;
  }
  .nodeYellow{
    position: relative;
    fill: #d3bd01 !important;
    stroke: #d3bd01;
  }
  .nodeAzure{
    position: relative;
    fill: #00b6c6 !important;
    stroke: #00b6c6;
  }
  .nodeBlue{
    position: relative;
    fill: #3565ff!important;
    stroke: #3565ff;
  }
  .nodePink{
    position: relative;
    fill: #d4567f !important;
    stroke: #d4567f;
  }
 
  .nodeViolet{
    position: relative;
    fill: #665bde !important;
    stroke: #665bde;
  }
</style>