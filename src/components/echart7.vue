<template>
<div class="echart" id="echart7"></div>
</template>

<script>
import echarts from 'echarts'
import getElement from '../js/getElement.js'

export default {
    data() {
        return {
            
        }
    },
    created() {
        this.renderEchart();
    },
    methods:{
        //渲染echart
        renderEchart(){
            var color = {
                'center': '#e8803a',
                'green': '#32af6a',
                'violet': '#665bde',
                'pink': '#d4567f',
                'blue': '#3565ff',
                'Azure': '#00b6c6',
                'yellow': '#d3bd01',
                'cyan': '#69ba20'
            }
            var datas = [{
                name: '威海市\n环翠区华威\n渔具公司',
                colorType: 'center'
            }, {
                name: '王琳',
                colorType: 'yellow'
            }, {
                name: '龚颖',
                colorType: 'Azure'
            }, {
                name: '彭迎辉',
                colorType: 'blue'
            }, {
                name: '刘海萍',
                colorType: 'pink'
            }, {
                name: '夏树朴',
                colorType: 'violet'
            }, {
                name: '威海\n建元投资\n有限公司',
                colorType: 'green'
            }, {
                name: '威海\n华远建设\n有限公司',
                colorType: 'green'
            }, {
                name: '8',
                colorType: 'green'
            }];

            for (var i = 0; i < datas.length; i++) {
                var colorType = datas[i].colorType;
                datas[i].itemStyle = {
                    normal: {
                        color: color[colorType]
                    }
                };
            }
            var option = {
                animationEasingUpdate: 'quinticInOut',
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 12
                        },
                    }
                },
                series: [{
                    type: 'graph',
                    layout: 'force',
                    symbolSize: 80,
                    focusNodeAdjacency: true,
                    roam: false,
                    draggable: false,
                    force: {
                        repulsion: 2000,
                        layoutAnimation: false
                    },
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 12
                            },
                        }
                    },
                    data: datas,
                    links: [{
                        source: 0,
                        target: 1
                    },{
                        source: 1,
                        target: 8
                    }, {
                        source: 0,
                        target: 2,
                    }, {
                        source: 0,
                        target: 3,
                    }, {
                        source: 0,
                        target: 4,
                    }, {
                        source: 0,
                        target: 5,
                    }, {
                        source: 0,
                        target: 6,
                    }, {
                        source: 0,
                        target: 7,
                    }]
                }]
            };

            getElement('echart7', $elem => {
                let barChart = echarts.init($elem);
                barChart.setOption(option);
                // barChart.on("mouseover", function(data) {
                //     // 取消节点连接线触发效果
                //     if (data.dataType == "edge") {
                //         myChart.dispatchAction({
                //             type: 'unfocusNodeAdjacency',
                //             seriesIndex: 0
                //         });
                //     }
                // })
            })
        },
    }
}
</script>

<style scoped>
.echart{
    width: 100%;
    height: 100%;
}
</style>
