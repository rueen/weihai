<template>
    <div class="echart" id="echart1"></div>
</template>

<script>
import echarts from 'echarts'
import { getData, ZDRQ_COLOR, delay } from '@/js/getData'

export default {
    data() {
        return {
            result: []
        }
    },
    mounted() {
        var timer = null;
        var fun = () => {
            this.result = [];
            getData('getScreen', '重点人群失信占比分析').then((response) => {
                let result = response.rows.sort(function(a, b) {
                    return (~~b.VALUE_) - (~~a.VALUE_)
                })

                let _length = Math.min(5, result.length);
                for (let i = 0; i < _length; i++) {
                    if (result[i].VALUE_ > 0) {
                        let obj = {}
                        obj.name = result[i]['KEY_']
                        obj.value = result[i]['VALUE_']
                        obj.itemStyle = {
                            normal: {
                                color: ZDRQ_COLOR[i]
                            }
                        }
                        this.result.push(obj)
                    }
                }
                this.renderEchart()
            })
        };

        fun();
        clearInterval(timer)
        timer = setInterval(fun, delay)
    },
    methods: {
        //渲染echart
        renderEchart() {
            var option = {
                // tooltip: {
                //     trigger: 'item',
                //     formatter: "{b} : {c}人 ({d}%)"
                // },
                tooltip: {
                    trigger: 'item',
                    padding: [5,10,5,10],
                    showDelay: 0,
                    transitionDuration: 0.2,
                    formatter: function (params) {
                        // console.log(params)
                        return `<p style="font-size: .12rem;">${params.name} : ${params.value}条（${params.percent}%）</p>`
                    }
                },
                series: [{
                    type: 'pie',
                    radius: '80%',
                    center: ['50%', '50%'],
                    data: this.result,
                    label: {
                        normal: {
                            textStyle: {
                                color: '#fff',
                                fontSize: '.12rem'
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
                    animationDelay: function(idx) {
                        return Math.random() * 200;
                    }
                }]
            };

            window.echart1 = echarts.init(document.getElementById("echart1"));
            window.echart1.setOption(option);

            // window.onresize = window.echart1.resize;
        }
    }
}
</script>

<style scoped>
.echart {
    width: 100%;
    height: 2.38rem;
}
</style>
