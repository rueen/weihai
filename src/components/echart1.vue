<template>
<div class="echart" id="echart1"></div>
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
        // this.render()
        this.renderEchart();
    },
    methods:{
        render(){
            var option = {
                calculable: true,
                "title": {
                    "text": "南丁格尔玫瑰图--PieHalfRose",
                    "left": "center",
                    "top": 20,
                    "textStyle": {
                        "color": "#ccc"
                    }
                },
                "calculable": true,
                
                "series": [{
                    "name": "XX线索",
                    "type": "pie",
                    "radius": [
                        37,
                        155
                    ],
                    "avoidLabelOverlap": false,
                    "startAngle": 0,
                    "center": [
                        "50.1%",
                        "34%"
                    ],
                    "roseType": "area",
                    "selectedMode": "single",
                    "label": {
                        "normal": {
                            "show": true,
                            "formatter": "{c}千万元"
                        },
                        "emphasis": {
                            "show": true
                        }
                    },
                    "labelLine": {
                        "normal": {
                            "show": true,
                            "smooth": false,
                            "length": 20,
                            "length2": 10
                        },
                        "emphasis": {
                            "show": true
                        }
                    },
                    "data": [{
                            "value": 600.58,
                            "name": "义乌市1",
                            "itemStyle": {
                                "normal": {
                                    "color": "#f845f1"
                                }
                            }
                        },
                        {
                            "value": 1100.58,
                            "name": "义乌市2",
                            "itemStyle": {
                                "normal": {
                                    "color": "#ad46f3"
                                }
                            }
                        },
                        {
                            "value": 1200.58,
                            "name": "义乌市3",
                            "itemStyle": {
                                "normal": {
                                    "color": "#5045f6"
                                }
                            }
                        },
                        {
                            "value": 1300.58,
                            "name": "义乌市4",
                            "itemStyle": {
                                "normal": {
                                    "color": "#4777f5"
                                }
                            }
                        },
                        {
                            "value": 1400.58,
                            "name": "义乌市5",
                            "itemStyle": {
                                "normal": {
                                    "color": "#44aff0"
                                }
                            }
                        },
                        {
                            "value": 1500.58,
                            "name": "义乌市6",
                            "itemStyle": {
                                "normal": {
                                    "color": "#45dbf7"
                                }
                            }
                        },
                        {
                            "value": 1500.58,
                            "name": "义乌市7",
                            "itemStyle": {
                                "normal": {
                                    "color": "#f6d54a"
                                }
                            }
                        },
                        {
                            "value": 1600.58,
                            "name": "义乌市8",
                            "itemStyle": {
                                "normal": {
                                    "color": "#f69846"
                                }
                            }
                        },
                        {
                            "value": 1800,
                            "name": "义乌市9",
                            "itemStyle": {
                                "normal": {
                                    "color": "#ff4343"
                                }
                            }
                        },
                        {
                            "value": 0,
                            "name": "",
                            "itemStyle": {
                                "normal": {
                                    "label": {
                                        "show": false
                                    },
                                    "labelLine": {
                                        "show": false
                                    }
                                }
                            }
                        },
                        {
                            "value": 0,
                            "name": "",
                            "itemStyle": {
                                "normal": {
                                    "label": {
                                        "show": false
                                    },
                                    "labelLine": {
                                        "show": false
                                    }
                                }
                            }
                        },
                        {
                            "value": 0,
                            "name": "",
                            "itemStyle": {
                                "normal": {
                                    "label": {
                                        "show": false
                                    },
                                    "labelLine": {
                                        "show": false
                                    }
                                }
                            }
                        },
                        {
                            "value": 0,
                            "name": "",
                            "itemStyle": {
                                "normal": {
                                    "label": {
                                        "show": false
                                    },
                                    "labelLine": {
                                        "show": false
                                    }
                                }
                            }
                        },
                        {
                            "value": 0,
                            "name": "",
                            "itemStyle": {
                                "normal": {
                                    "label": {
                                        "show": false
                                    },
                                    "labelLine": {
                                        "show": false
                                    }
                                }
                            }
                        },
                        {
                            "value": 0,
                            "name": "",
                            "itemStyle": {
                                "normal": {
                                    "label": {
                                        "show": false
                                    },
                                    "labelLine": {
                                        "show": false
                                    }
                                }
                            }
                        },
                        {
                            "value": 0,
                            "name": "",
                            "itemStyle": {
                                "normal": {
                                    "label": {
                                        "show": false
                                    },
                                    "labelLine": {
                                        "show": false
                                    }
                                }
                            }
                        },
                        {
                            "value": 0,
                            "name": "",
                            "itemStyle": {
                                "normal": {
                                    "label": {
                                        "show": false
                                    },
                                    "labelLine": {
                                        "show": false
                                    }
                                }
                            }
                        },
                        {
                            "value": 0,
                            "name": "",
                            "itemStyle": {
                                "normal": {
                                    "label": {
                                        "show": false
                                    },
                                    "labelLine": {
                                        "show": false
                                    }
                                }
                            }
                        }
                    ]
                }]
            };

            getElement('echart1', $elem => {
                let barChart = echarts.init($elem);
                barChart.setOption(option);
            })
        },
        //渲染echart
        renderEchart(){
            var option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series : [
                    {
                        // name:'访问来源',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data:[{
                                value:11,
                                name:'渔具渔业',
                                itemStyle: {
                                    normal: {
                                        color: "#1cc4c2"
                                    }
                                }
                            },
                            {
                                value:22,
                                name:'导游',
                                itemStyle: {
                                    normal: {
                                        color: "#22af6a"
                                    }
                                }
                            },
                            {
                                value:13,
                                name:'公务员',
                                itemStyle: {
                                    normal: {
                                        color: "#dcba1a"
                                    }
                                }
                            },
                            {
                                value:24,
                                name:'医生',
                                itemStyle: {
                                    normal: {
                                        color: "#d57b32"
                                    }
                                }
                            },
                            {
                                value:15,
                                name:'教师',
                                itemStyle: {
                                    normal: {
                                        color: "#4094e4"
                                    }
                                }
                            }
                        ].sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.8)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            };
            
            getElement('echart1', $elem => {
                let barChart = echarts.init($elem);
                barChart.setOption(option);
            })
        },
    }
}
</script>

<style scoped>
.echart{
    width: 100%;
    height: 2.38rem;
}
</style>
