<template>
  <div class="echart" id="echart3"></div>
</template>

<script>
  import echarts from 'echarts'
  import getElement from '../js/getElement.js'
  import {getData2} from '@/js/getData'

  export default {
    data() {
      return {
        result: {
          names: [],
          values1: [],
          values2: []
        }
      }
    },
    created() {
      this.getDataAll('渔船行业');
    },
    methods: {
      getDataAll(temp) {
        this.result.names = [];
        this.result.values1 = [];
        this.result.values2 = [];
        Promise.all([
          getData2('getScreen', '行业信用评价结果分析', '信用等级', temp),
          getData2('getScreen', '行业信用评价结果分析', '处罚结果', temp)
        ])
          .then(r => {
            let result1 = r[0].rows.sort(function (a, b) {
              return Date.parse(new Date(a.KEY_)) - Date.parse(new Date(b.KEY_))
            });
            let result2 = r[1].rows.sort(function (a, b) {
              return Date.parse(new Date(a.KEY_)) - Date.parse(new Date(b.KEY_))
            });
            result1.forEach((val) => {
              this.result.values1.push(val['VALUE_'])
            })
            result2.forEach((val) => {
              this.result.names.push(val['KEY_'])
              this.result.values2.push(val['VALUE_'])
            })
            this.renderEchart();
          })
      },
      //渲染echart
      renderEchart(){
        var option = {
          tooltip: {
            trigger: 'item',
            padding: [5, 10, 5, 10],
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
              return `<span style="font-size: .12rem;">${params.seriesName}：</span><p style="font-size: .12rem;">${params.name} : ${params.value}条</p>`
            }
          },
          grid: {
            left: 20,
            right: 35,
            bottom: 20,
            top: 35,
            containLabel: true,
            y2: 140
          },
          color: ['#fff001', '#3e2dab'],
          xAxis: {
            boundaryGap: false,
            type: 'category',
            data: this.result.names,
            axisLabel: {
              interval: 0,//横轴信息全部显示
              rotate: -30,//-30度角倾斜显示
              textStyle: {
                fontSize: '.12rem'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
              }
            }
          },
          yAxis: {
            min: 0,
            name: '信息量（条）',
            type: 'value',
            axisLabel: {
              textStyle: {
                fontSize: '.12rem'
              }
            },
            splitLine: {
              lineStyle: {
                // 使用深浅的间隔色
                color: ['#10204d']
              }
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
              }
            }
          },
          series: [
            {
              name: '信用等级',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#ffcd04'
                  }
                }
              },
              smooth: true,
              data: this.result.values1,
            }, {
              name: '处罚结果',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#3e2dab'
                  }
                }
              },
              smooth: true,
              data: this.result.values2,
            }
            // {
            //     name:'信用等级',
            //     type:'line',
            //     stack: '总量',
            //     areaStyle: {normal: {}},
            //     data:[220, 182, 191, 234, 290, 330, 220, 182, 191, 234, 290, 330]
            // }
          ]
        };

        getElement('echart3', $elem => {
          window.echart3 = echarts.init($elem);
          window.echart3.setOption(option);

          // window.onresize = barChart.resize;
        })
      },
    }
  }
</script>

<style scoped>
  .echart {
    width: 100%;
    height: 100%;
    /*height: 2.68rem;*/
  }
</style>
