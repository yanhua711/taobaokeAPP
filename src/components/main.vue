<template>
  <div id="index">
    <mt-header class="main_head" fixed :title="mainTitle">
      <!--<mt-button icon="more" slot="right"></mt-button>-->
      <router-link to="/my" slot="right">
        <img class="header_user" src="../img/main_user.png">
      </router-link>
    </mt-header>
      <mt-loadmore @top-status-change="handleTopChange" :top-method="loadTop"  ref="topWrapper">
        <mt-swipe class="banner" :auto="0">
          <mt-swipe-item><img src="../img/banner_1.png"></mt-swipe-item>
          <mt-swipe-item><img src="../img/banner_2.png"></mt-swipe-item>
        </mt-swipe>
        <div class="main_cell myMessage">
          <mt-cell class="mt_cell_sale" title="我的消息">
            <img slot="icon" src="../img/message.png" width="24" height="24">
          </mt-cell>
          <mt-cell class="main_cell_body" is-link  to="/messageList">
            <span class="main_cell_content">
                {{messageContent}}
            </span>
            <!--<span>-->
            <!--<mt-badge class="main_cell_badge" type="error" size="small"></mt-badge>-->
            <!--</span>-->
          </mt-cell>
        </div>
        <div class="feast_trace">
          <mt-cell class="mt_cell_sale" title="我的宴会">
            <img slot="icon" src="../img/banquet.png" width="24" height="24">
          </mt-cell>
          <div class="status_info">
            <div class="confirm">
              <mt-cell title="待确认" :label="waitConfirm" :to="waitConfirmUrl">
                <img slot="icon" src="../img/1.png"/>
              </mt-cell>
            </div>
            <div class="send">
              <mt-cell title="待备酒" :label="waitWine" :to="waitWineUrl">
                <img slot="icon" src="../img/2.png"/>
              </mt-cell>
            </div>
            <div class="forWine">
              <mt-cell title="已备酒" :label="forWine" :to="forWineUrl">
                <img slot="icon" src="../img/3.png"/>
              </mt-cell>
            </div>
            <div class="waitAccount">
              <mt-cell title="奖励" :label="awardWine" :to="awardWineUrl">
                <img slot="icon" src="../img/4.png"/>
              </mt-cell>
            </div>
          </div>
        </div>
        <div class="sale_state">
          <mt-cell class="mt_cell_sale" title="本月营业概况">
            <span>更多</span>
            <img slot="icon" src="../img/report.png" width="24" height="24">
          </mt-cell>
          <div class="feast_info">
            <!--<div class="mt_cell_feast">-->
            <!--<span class="mt_cell_feast_title">宴会场次</span>-->
            <!--<p class="mt_cell_feast_content">20场</p>-->
            <!--</div>-->
            <!--<div class="mt_cell_sales">-->
            <!--<span class="mt_cell_feast_title">销量</span>-->
            <!--<p class="mt_cell_feast_content">5000元</p>-->
            <!--<p class="mt_cell_feast_content">500瓶</p>-->
            <!--</div>-->
            <div class="chart">
              <div class="dayLineChart" style="width: calc(60vw);height: 200px; padding-left: 10px;"></div>
              <div class="dayPieChart" style="width: calc(35vw);height: 200px;"></div>
            </div>
          </div>
        </div>
      </mt-loadmore>
    <!-- <mt-cell class="mt_cell_sale feastInfo" title="宴会登记" to="/feastInfo" is-link>
      <mt-badge slot="icon" class="mt_badge" type="primary" size="small"></mt-badge>
    </mt-cell>-->
    <!--<mt-cell class="mt_cell_sale" title="统计信息" to="/statisticalInfo" is-link>-->
      <!--<mt-badge slot="icon" class="mt_badge" type="primary" size="small"></mt-badge>-->
    <!--</mt-cell>-->
    <footer-bar></footer-bar>
  </div>
</template>
<style>
  .chart .dayLineChart, .chart .dayPieChart {
    /*padding-top: 40px;*/
    display: inline-flex;
  }
  #index{
    height: calc(100vh);
  }
  #index .header_user{
    width: 24px;
    height: 24px;
  }
  #index .sale_state{
    /*border-bottom: 8px solid #d9d9d9;*/
  }
  #index .main_cell {
    border-bottom: 6px solid #d9d9d9;
  }
  #index .banner {
    text-align: center;
    padding-top: 50px;
    height: 100px;
    border-bottom: 6px solid #d9d9d9;
  }
  #index .main_cell .main_cell_badge{
    border-radius: 4px;
    font-size: 12px;
    padding: 4px 4px;
  }
  #index .main_cell .main_cell_content{
    /*padding-top: 5px;*/
    font-size: 14px;
    line-height: 1.5;
  }
  #index .mt_cell_sale{
    min-height: 28px;
    /*border-bottom: 1px solid #d9d9d9;*/
  }
  #index .mt_badge{
    padding: 6px 2px;
    vertical-align: middle;
  }
  #index .feast_info {
    display: inline-flex;
    /*border-bottom: 3px solid #d9d9d9;*/
    /*border-top: 1px solid #d9d9d9;*/
  }
  #index .feast_info p {
    margin: 5px;
  }
  #index .feast_info .mt_cell_feast{
    width: calc(40vw);
  }
  #index .feast_info .mt_cell_sales{
    width: calc(60vw);
  }
  #index .feast_info .mt_cell_feast, .feast_info .mt_cell_sales{
    display: inline;
    text-align: center;
  }
  #index .feast_info .mt_cell_feast {
    /*border-right: 1px solid #d9d9d9;*/
  }
  #index .feast_info .mt_cell_feast{
    width: calc(39vw);
  }
  #index .feast_info .mt_cell_sales{
    width: calc(59vw);
  }
  #index .status_info {
    display: inline-flex;
  }
  #index .status_info img {
    width: 22px;
    height: 22px;
  }
  #index .status_info .confirm{
    width: calc(25vw);
    /*border-right: 1px solid #d9d9d9;*/
  }
  #index .status_info .send{
    width: calc(25vw);
    /*border-right: 1px solid #d9d9d9;*/
  }
  #index .status_info .forWine{
    width: calc(25vw);
  }
  #index .status_info .waitAccount{
    width: calc(25vw);
  }
  /*#index .feastInfo .mint-cell-wrapper {
    background-image: linear-gradient(180deg, #d9d9d9, #fff 50%, transparent 50%);
  }*/
  #index .feast_trace {
    border-bottom: 6px solid #d9d9d9;
  }

  #index .mint-cell-wrapper {
    font-size: 16px !important;
  }
  #index .mt_cell_feast_title {
    font-size: 14px;
  }
  #index .mt_cell_feast_content {
    font-size: 14px;
  }
  #index .myMessage .mint-cell-title {
    flex: unset;
    -webkit-box-flex: unset;
  }
  #index .myMessage .mint-cell-value .main_cell_content {
    padding-left: 28px
  }
  #index .page-loadmore-wrapper {
    overflow: scroll
  }
  #index .mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
  }

  #index .mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
  }

</style>
<script>
// import MintUI from 'mint-ui'
import FooterBar from './FooterBar.vue'
export default {
  mounted: function () {
    let vm = this
    vm.initUserRole()
    vm.drawDay()
    vm.getMessage()
    sessionStorage.removeItem('state')
    vm.saveRegistrationId()
  },
  data () {
    return {
      topStatus: '',
      bottomStatus: '',
      mainTitle: '',
      messageContent: '暂无消息',
      waitConfirm: '0',
      waitConfirmUrl: '',
      waitWine: '0',
      waitWineUrl: '',
      forWine: '0',
      forWineUrl: '',
      awardWine: '0',
      awardWineUrl: '',
      dayLineOptions: {
        // 图标标题
        title: {
          text: '总销量', // 标题
          subtext: '5,555 元     100 瓶', // 副标题
          left: 'center',
          textStyle: {
            fontSize: 14, // 字体大小
            fontWeight: 'normal'
          }
        },
        tooltip: {},
        xAxis: {
          data: ['蓝带', '名士', '香槟', '红酒']
        },
        color: '#4ab9fe',
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            barWidth: '10px',
            data: [5, 20, 36, 10]
          }
        ]
      },
      dayPieOptions: {
        title: {
          text: '新增客户',
          subtext: '2 人',
          left: 'center',
          textStyle: {
            fontSize: 14, // 字体大小
            fontWeight: 'normal'
          }
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
                    offset: 0.7,
                    color: '#f3f3f4' // 0% 处的颜色
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
  computed: {
  },
  components: {
    'footer-bar': FooterBar
  },
  methods: {
    loadTop () {
      let vm = this
      vm.getBanquetsByState()
      vm.getMessage()
      vm.$refs.topWrapper.onTopLoaded()
    },
    handleTopChange (status) {
      this.moveTranslate = 1
      this.topStatus = status
    },
    // 保存极光推送设备id
    saveRegistrationId () {
      /* eslint-disable */
      let vm = this
      let timeTask = setInterval(function () {
        let token = localStorage.getItem('token')
        if (token) {
          let registrationId = localStorage.getItem('registrationId')
          if (registrationId) {
            let params = {}
            params.key = 'registrationId'
            params.value = registrationId.replace(/"/g, '')
            vm.getPostData(vm.$global.SERVER_USER.SAVE_REGISTRATION_ID, params, function (response) {
              if (response.data && response.data.state === 1) {
                console.log(response)
                console.log(response.data.msg)
                clearInterval(timeTask)
              }
            })
          }
        }
      }, 1000)
    },
    getBanquetsByState () {
      let vm = this
      let param = {}
      let roleId = localStorage.getItem('roleId')
      let userCode = localStorage.getItem('userCode')
      let groupId = localStorage.getItem('userId')
      if (roleId === '4') { // 用户角色为 批发商
        param.createBy = userCode
      } else if (roleId === '8') { // 用户角色为 小组长
        param.groupId = groupId
      }
      param.roleId = roleId
      vm.getPostData(vm.$global.SERVER_BANQUET.GET_BANQUETS_BY_STATE, param, function (response) {
        if (response.data.result) {
          vm.waitConfirm = response.data.result.waitConfirm
          vm.waitConfirmUrl = response.data.result.waitConfirmUrl
          vm.waitWine = response.data.result.waitWine
          vm.waitWineUrl = response.data.result.waitWineUrl
          vm.forWine = response.data.result.forWine
          vm.forWineUrl = response.data.result.forWineUrl
          vm.awardWine = response.data.result.awardWine
          vm.awardWineUrl = response.data.result.awardWineUrl
        } else {
          vm.waitConfirm = ''
          vm.waitConfirmUrl = ''
          vm.waitWine = ''
          vm.waitWineUrl = ''
          vm.forWine = ''
          vm.forWineUrl = ''
          vm.awardWine = ''
          vm.awardWineUrl = ''
        }
      })
    },
    getMessage () {
      let vm = this
      let parm = {}
      parm.type = '1' // 消息类型为App
      parm.readFlag = 'false'
      vm.getPostData(vm.$global.SERVER_MESSAGE.GET_MESSAGE_LIST, parm, function (result) {
        if (result.data.state === 1) {
          let bizBanquetMsgList = result.data.result.bizBanquetMsgList
          if (bizBanquetMsgList.length && bizBanquetMsgList[0].content) {
            if (bizBanquetMsgList[0].content.length > 20) {
              vm.messageContent = bizBanquetMsgList[0].content.substring(0, 20) + '...'
            } else {
              vm.messageContent = bizBanquetMsgList[0].content
            }
          }
        }
      })
    },
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
    drawDay () {
      /*eslint-disable*/
      this.drawLine($('.dayLineChart').get(0), this.dayLineOptions)
      this.drawPie($('.dayPieChart').get(0), this.dayPieOptions)
    },
    initUserRole () {
      var vm = this
      vm.getPostData(vm.$global.SERVER_USER.USER_INFO, {}, function (response) {
        if (response.data && response.data.result && response.data.result.user) {
          if(response.data.result.user.companyName){
            vm.mainTitle = response.data.result.user.companyName
          }else{
            vm.mainTitle = '首页'
          }
          let user = response.data.result.user
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('userCode', user.userCode)
          localStorage.setItem('roleId', user.roleId)
          localStorage.setItem('userId', user.id)
          vm.getBanquetsByState()
        }
      })
    }
  }
}
</script>
