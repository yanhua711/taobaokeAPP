<template>
  <div id="feastMain">
    <mt-header class="main_head" fixed title="宴会管理">
      <router-link to="/main" slot="left">
        <mt-button>           <img height="35" width="35" src="../img/back.png">         </mt-button>
      </router-link>
      <router-link to="/feastInfo" slot="right" id="addBanquet" style="display: none">
        <img src="../img/plus01.png" style="width: 18px">
      </router-link>
    </mt-header>
    <mt-search v-model="searchValue" :show="showList" >
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
          <mt-loadmore  @translate-change="translateChange" @top-status-change="handleTopChange" :top-method="loadTop"
                        :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
            <mt-cell-swipe  v-for="item in lazyResult" :key="item.id" :title="item.title" is-link :to="item.feastInfoUrl"
                            :right="[
              {
                content: '取消',
                style: { background: 'red', color: '#fff' },
                handler: () => deleteBanquet(item.id)
              }]">
              <span slot="title">
                <div style="display: inline-flex;">
                  <div style="margin-top: 18px;">
                    <img v-if="item.state == 1" src="../img/1.png" width="40" height="40"/>
                    <img v-else-if="item.state == 2" src="../img/2.png" width="40" height="40">
                    <img v-else-if="item.state == 3" src="../img/3.png" width="40" height="40">
                    <img v-else-if="item.state == 4" src="../img/4.png" width="40" height="40">
                    <img v-else-if="item.state == 5" src="../img/5.png" width="40" height="40">
                    <img v-else src="../img/0.png" width="40" height="40">
                  </div>
                  <!--<img src="../img/party.png" width="50" height="50">-->
                  <div style="padding: 10px 10px 10px 20px;">
                    <div style="padding-bottom: 5px; font-size: 16px; color: #000;">{{item.name}}</div>
                    <div style="padding-bottom: 5px; color: #888; font-size: 10px;">{{item.typeValue}}</div>
                    <div style="color: #888; font-size: 10px;">
                      <span style="padding-right: 15px">桌 {{item.tableQty ? item.tableQty : 0}}</span>
                      <!--<span style="padding-right: 15px">人 {{item.bartenderQty ? item.bartenderQty : 0 }}</span>-->
                      <!--<span style="padding-right: 15px">模 {{item.modelQty}}</span>-->
                    </div>
                  </div>
                </div>
              </span>
              <!-- 右边内容 -->
              <div style="top: 0;">
                <div style="padding-bottom: 10px; text-align: right; color: #000; font-size: 14px;">{{item.stateValue}}</div>
                <div style="font-size: 10px;">{{item.banquetDate}}</div>
              </div>
            </mt-cell-swipe>
            <div slot="bottom" class="mint-loadmore-bottom">
              <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
              <span v-show="bottomStatus === 'loading'">
                  <mt-spinner type="snake"></mt-spinner>
                </span>
            </div>
          </mt-loadmore>
        </div>
    </mt-search>
  </div>
</template>

<script>
import MintUI from 'mint-ui'
export default {
  name: 'feastMain',
  watch: {
    searchValue (val, old) {
      let vm = this
      vm.searchValue = val
      vm.lazyResult = []
      vm.page.pageNo = 1
      vm.getBanquetList()
    }
  },
  mounted: function () {
    /*eslint-disable*/
    let vm = this
    vm.wrapperHeight = document.documentElement.clientHeight - vm.$refs.wrapper.getBoundingClientRect().top
    // 清空虚拟宴会用酒列表和宴会信息
    vm.$wineList = []
    localStorage.removeItem('wineList')
    // 清除宴会信息标志
    localStorage.removeItem('banquetInfo')
    // 清除宴会信息状态
    sessionStorage.removeItem('banquetState')
    // 获取从 我的宴会 跳转到宴会列表的宴会状态
    let state = ''
    if (vm.$route.query.state) {
      state = vm.$route.query.state
      sessionStorage.setItem('state', state)
    } else {
      sessionStorage.removeItem('state')
    }
    let roleId = localStorage.getItem('roleId')
    if (roleId === vm.$global.ROLE.PFS) {
      $('#addBanquet').css('display', 'block')
    }
    sessionStorage.removeItem('infoFlag')
    vm.state = state
    vm.getBanquetList()
    sessionStorage.removeItem('banquetInfo')
    sessionStorage.removeItem("banquetButton")
  },
  methods: {
    getBanquetList () {
      let vm = this
      let param = {}
      let roleId = localStorage.getItem('roleId')
      let userCode = localStorage.getItem('userCode')
      let groupId = localStorage.getItem('userId')
      if (roleId === vm.$global.ROLE.PFS) { // 用户角色为 批发商
        param.createBy = userCode
      } else if (roleId === vm.$global.ROLE.GROUP_LEADER) { // 用户角色为 小组长
        param.groupId = groupId
      }
      if (vm.state) {
        param.state = vm.state
      }
      param.pageNo = vm.page.pageNo
      param.pageSize = vm.page.pageSize
      param.roleId = roleId
      param.searchValue = vm.searchValue
      vm.getPostData(vm.$global.SERVER_BANQUET.GET_BANQUET_LIST, param, function (response) {
        if (response.data && response.data.state === 1) {
          let result = response.data.result.banquetList
          vm.result = result
          if(result.length < 20){
          }else{
            vm.allLoaded = false
            vm.$refs.loadmore.onBottomLoaded()
          }
          if(vm.page.pageNo == 1){
            vm.lazyResult = result
          } else {
            for (let i = 0; i < result.length; i++) {
              vm.lazyResult.push(result[i])
            }
          }
        }
      })
    },
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadTop () {
      let vm = this
      vm.page.pageNo = 1
      vm.getBanquetList()
      vm.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      let vm = this
        setTimeout(() => {
          let pageSize = vm.page.pageSize
          if (vm.lazyResult.length < pageSize) {
            vm.allLoaded = true
          } else if(vm.lazyResult.length >= pageSize) {
            this.$refs.loadmore.onBottomLoaded()
            vm.page.pageNo = vm.page.pageNo + 1
            vm.getBanquetList()
          }
      }, 200)
    },
    handleTopChange (status) {
      this.moveTranslate = 1
      this.topStatus = status
    },
    translateChange (translate) {
      const translateNum = +translate
      this.translate = translateNum.toFixed(2)
      this.moveTranslate = (1 + translateNum / 70).toFixed(2)
    },
    deleteBanquet (id) {
      if (id) {
        MintUI.MessageBox.confirm(' ', '确定要取消该宴会吗？', {inputPlaceholder: '请输入取消备注(必填)'}).then(({ value, action }) => {
          let vm = this
          let param = {}
          param.banquetId = id
          if(value){
            param.delRemarks = value
          }else{
            MintUI.Toast('取消备注不能为空')
            return
          }
          vm.getPostData(vm.$global.SERVER_BANQUET.DELETE_BANQUET, param, function (response) {
            MintUI.Toast(response.data.msg)
            vm.getBanquetList()
          })
        })
      }
    }
  },
  data () {
    return {
      showList: true,
      state: '',
      searchValue: '',
      result: [],
      searchResult: [],
      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0,
      topStatus: '',
      translate: 0,
      moveTranslate: 0,
      virtualWine: false,
      lazyResult: [],
      firstSearch: true,
      page: {
        pageNo: 1,
        pageSize: 20
      }
    }
  }
}
</script>

<style>
  #feastMain .page-loadmore-wrapper {
    overflow: scroll
  }
  #feastMain .mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
  }

  #feastMain .mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
  }
  #feastMain .mint-searchbar {
    margin-top: 50px;
  }
  #feastMain .mt_badge {
    padding: 6px 2px !important;
    vertical-align: middle;
  }
  #feastMain .mint-cell {
    min-height: 48px;
    margin-left: -10px;
  }
  #feastMain .mint-search-list-warp {
    margin-top: 52px;
  }
  #feastMain .mint-search-list {
    padding-top: 50px;
  }
  #feastMain .mint-cell-title {
    margin-left: 10px;
  }
  #feastMain .mint-cell-swipe-button {
    line-height: 70px;
  }
</style>
