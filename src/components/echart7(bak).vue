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
            var categories = [{
                    name: '股东',
                    itemStyle: {
                        normal: {
                            color: "#fff",
                        }
                    }
                }, {
                    name: '投资',
                    itemStyle: {
                        normal: {
                            color: "#fff",
                        }
                    }
                }, {
                    name: '行政许可',
                    itemStyle: {
                        normal: {
                            color: "#fff",
                        }
                    }
                }, {
                    name: '守信红名单',
                    itemStyle: {
                        normal: {
                            color: "#fff",
                        }
                    }
                }, {
                    name: '信用分',
                    itemStyle: {
                        normal: {
                            color: "#fff",
                        }
                    }
                }, {
                    name: '监事',
                    itemStyle: {
                        normal: {
                            color: "#fff",
                        }
                    }
                }, {
                    name: '董事长',
                    itemStyle: {
                        normal: {
                            color: "#fff",
                        }
                    }
                }]
            var datas = [{
                name: '威海市\n环翠区华威\n渔具公司',
                symbolSize: 100,
                colorType: 'center'
            }, {
                name: 'AAA',
                symbolSize: 50,
                category: 'AAA',
                colorType: 'yellow'
            }, {
                name: '王琳',
                symbolSize: 50,
                category: 'AAA',
                colorType: 'yellow'
            }, {
                name: 'AA',
                symbolSize: 50,
                category: 'AA',
                colorType: 'yellow'
            }, {
                name: '龚颖',
                symbolSize: 50,
                category: 'AA',
                colorType: 'Azure'
            }, {
                name: '彭迎辉',
                symbolSize: 50,
                colorType: 'blue'
            }, {
                name: '刘海萍',
                symbolSize: 50,
                colorType: 'pink'
            }, {
                name: '夏树朴',
                symbolSize: 50,
                colorType: 'violet'
            }, {
                name: '威海\n建元投资\n有限公司',
                symbolSize: 80,
                colorType: 'green'
            }, {
                name: '威海\n华远建设\n有限公司',
                symbolSize: 80,
                colorType: 'green'
            }];
            var links = [{
                    source: '威海市\n环翠区华威\n渔具公司',
                    target: 'AAA',
                    value: '股东'
                },{
                    source: 'AAA',
                    target: '王琳',
                    value: '监事'
                }, {
                    source: '威海市\n环翠区华威\n渔具公司',
                    target: 'AA',
                    value: '股东'
                }, {
                    source: 'AA',
                    target: '龚颖',
                    value: '监事'
                }, {
                    source: '威海市\n环翠区华威\n渔具公司',
                    target: '彭迎辉',
                    value: '股东'
                }, {
                    source: '威海市\n环翠区华威\n渔具公司',
                    target: '刘海萍',
                    value: '股东'
                }, {
                    source: '威海市\n环翠区华威\n渔具公司',
                    target: '夏树朴',
                    value: '股东'
                }, {
                    source: '威海市\n环翠区华威\n渔具公司',
                    target: '威海\n建元投资\n有限公司',
                    value: '股东'
                }, {
                    source: '威海市\n环翠区华威\n渔具公司',
                    target: '威海\n华远建设\n有限公司',
                    value: '股东'
                }]

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
                    // 连接线上的文字
                    focusNodeAdjacency: true, //划过只显示对应关系
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
                    edgeLabel: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 20
                            },
                            formatter: "{c}"
                        }
                    },
                    categories: categories,
                    lineStyle: {
                        normal: {
                            opacity: 1,
                            width: 1,
                            curveness: 0,
                            color: 'target'
                        }
                    },
                    data: datas,
                    links: links
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
