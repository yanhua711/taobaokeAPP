<template>
  <div id="statisticalInfo">
    <mt-header class="main_head" fixed title="统计信息">
      <router-link to="/main" slot="left">
        <mt-button>           <img height="35" width="35" src="../img/back.png">         </mt-button>
      </router-link>
    </mt-header>
    <div class="statistical_navbar">

    </div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="day">日</mt-tab-item>
      <mt-tab-item id="week">周</mt-tab-item>
      <mt-tab-item id="month">月</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <div class="statistical_content">
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="day">
          <div class="chart">
            <div class="dayLineChart" style="width: calc(47vw);height: 200px;"></div>
            <div class="dayPieChart" style="width: calc(40vw);height: 200px;"></div>
          </div>
          <div class="content">
            <mt-cell title="PRC" value="总计"></mt-cell>
            <mt-cell title="马爹利蓝带" value="数量"></mt-cell>
            <mt-cell title="马爹利名士" value="数量"></mt-cell>
            <mt-cell title="马爹利XO" value="数量"></mt-cell>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="week">
          <div class="chart">
            <div class="weekLineChart" style="width: calc(47vw);height: 200px;"></div>
            <div class="weekPieChart" style="width: calc(40vw);height: 200px;"></div>
          </div>
          <div class="content">
            <mt-cell title="PRC" value="总计"></mt-cell>
            <mt-cell title="马爹利蓝带" value="数量"></mt-cell>
            <mt-cell title="马爹利名士" value="数量"></mt-cell>
            <mt-cell title="马爹利XO" value="数量"></mt-cell>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="month">
          <div class="chart">
            <div class="monthLineChart" style="width: calc(47vw);height: 200px;"></div>
            <div class="monthPieChart" style="width: calc(40vw);height: 200px;"></div>
          </div>
          <div class="content">
            <mt-cell title="PRC" value="总计"></mt-cell>
            <mt-cell title="马爹利蓝带" value="数量"></mt-cell>
            <mt-cell title="马爹利名士" value="数量"></mt-cell>
            <mt-cell title="马爹利XO" value="数量"></mt-cell>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>
<style>
  #statisticalInfo .chart {
    border-bottom: 1px solid #9d9d9d;
  }
  #statisticalInfo .statistical_navbar {
    padding-top: 40px;
  }
  #statisticalInfo .statistical_content {
    padding-top: 20px;
  }
  #statisticalInfo .chart .dayLineChart, #statisticalInfo .chart .dayPieChart {
    /*padding-top: 40px;*/
    display: inline-flex;
  }
  #statisticalInfo .chart .weekLineChart, #statisticalInfo .chart .weekPieChart {
    /*padding-top: 40px;*/
    display: inline-flex;
  }
  #statisticalInfo .chart .monthLineChart, #statisticalInfo .chart .monthPieChart {
    /*padding-top: 40px;*/
    display: inline-flex;
  }
</style>
<script>
import Footer from './FooterBar.vue'

export default {
  mounted () {
    this.drawDay()
  },
  watch: {
    selected: function (val, oldVal) {
      if (val === 'week') {
        this.drawWeek()
      }
      if (val === 'month') {
        this.drawMonth()
      }
    }
  },
  methods: {
    drawLine (domElement, options) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(domElement)
      // 绘制图表
      myChart.setOption(options)
    },
    drawPie (domElement, options) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(domElement)
      // 绘制图表
      myChart.setOption(options)
    },
    drawMonth () {
      this.drawLine($('.monthLineChart').get(0), this.dayLineOptions)
      this.drawPie($('.monthPieChart').get(0), this.monthPieOptions)
    },
    drawWeek () {
      this.drawLine($('.weekLineChart').get(0), this.dayLineOptions)
      this.drawPie($('.weekPieChart').get(0), this.weekPieOptions)
    },
    drawDay () {
      this.drawLine($('.dayLineChart').get(0), this.dayLineOptions)
      this.drawPie($('.dayPieChart').get(0), this.dayPieOptions)
    }
  },
  data () {
    return {
      selected: 'day',
      dayLineOptions: {
        // 图标标题
        title: {
          text: '总销量', // 标题
          subtext: '5,555 元     100 瓶' // 副标题
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        // legend: {
        //   backgroundColor: '#ccc'
        // },
        color: '#4ab9fe',
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            barWidth: '10px',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      },
      dayPieOptions: {
        title: {
          text: '新增客户',
          subtext: '2 人'
        },
        tooltip: {},

        series: [{
          name: '客户',
          type: 'pie',
          barWidth: '10px',
          avoidLabelOverlap: false,
          labelLine: {
            normal: {
              show: false
            }
          },
          label: {
            show: false
          },
          // 图饼内容
          data: [
            {
              value: 2,
              name: '新客户',
              itemStyle: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [{
                    offset: 0, color: '#0f86c8' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#026ea6' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            {
              value: 10,
              name: '老客户',
              itemStyle: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [{
                    offset: 0.7, color: '#f3f3f4' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#c9c9ca' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          ]
        }]
      },
      weekPieOptions: {
        title: {
          text: '新增客户',
          subtext: '3 人'
        },
        tooltip: {},

        series: [{
          name: '客户',
          type: 'pie',
          barWidth: '10px',
          avoidLabelOverlap: false,
          labelLine: {
            normal: {
              show: false
            }
          },
          label: {
            show: false
          },
          // 图饼内容
          data: [
            {
              value: 3,
              name: '新客户',
              itemStyle: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [{
                    offset: 0, color: '#0f86c8' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#026ea6' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            {
              value: 10,
              name: '老客户',
              itemStyle: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [{
                    offset: 0.7, color: '#f3f3f4' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#c9c9ca' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          ]
        }]
      },
      monthPieOptions: {
        title: {
          text: '新增客户',
          subtext: '4 人'
        },
        tooltip: {},

        series: [{
          name: '客户',
          type: 'pie',
          barWidth: '10px',
          avoidLabelOverlap: false,
          labelLine: {
            normal: {
              show: false
            }
          },
          label: {
            show: false
          },
          // 图饼内容
          data: [
            {
              value: 4,
              name: '新客户',
              itemStyle: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [{
                    offset: 0, color: '#0f86c8' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#026ea6' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            {
              value: 10,
              name: '老客户',
              itemStyle: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [{
                    offset: 0.7, color: '#f3f3f4' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#c9c9ca' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          ]
        }]
      }
    }
  },
  components: {
    'footer-bar': Footer
  }
}
</script>

<style scoped>

</style>
