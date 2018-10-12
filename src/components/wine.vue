<template>
  <div id="wine">
    <mt-header class="main_head" fixed title="宴会用酒">
      <router-link :to="feastInfoUrl" slot="left">
        <mt-button>           <img height="35" width="35" src="../img/back.png">         </mt-button>
      </router-link>
    </mt-header>
    <div class="wine_content">
      <!--<mt-search v-model="searchValue" :show="showList" :result.sync="searchWineList">-->
        <mt-cell-swipe v-for="item in searchResult" :key="item.id" :title="item.bizWineIdValue"  is-link="" :to="item.addWineUrl"
           :right="[
          {
            content: '删除',
            style: { background: 'red', color: '#fff' },
            handler: () => deleteWine(item.id)
          }
        ]">
          <div style="color: #888; font-size: 10px;">
            <span style="padding-right: 5px">预 {{item.bottleNumber}}瓶</span>
            <div v-if="(roleId == $global.ROLE.PFS && banquetState == $global.BANQUET_STATE.BANQUET_STATE_JL) || (roleId == $global.ROLE.GROUP_LEADER && (banquetState == $global.BANQUET_STATE.BANQUET_STATE_YBJ || banquetState == $global.BANQUET_STATE.BANQUET_STATE_JL))">
              <span style="padding-right: 5px; position: relative; top:5px;" v-if="item.realBottleNumber && item.realBottleNumber != 0">实 {{item.realBottleNumber}}瓶</span>
              <span style="padding-right: 5px; position: relative; top:5px; color: red" v-else>实 0瓶</span>
            </div>
          </div>
          <span></span>
        </mt-cell-swipe>
        <!--<mt-cell v-for="item in searchResult" :key="item.bizWineId" :title="item.bizWineIdValue"  is-link="" :to="item.addWineUrl"> </mt-cell>-->
      <!--</mt-search>-->
      <mt-tabbar class="wine_option" style="display: none">
        <mt-tab-item id="addWine" class="wine_addWine" @click.native.capture="addWine()">
          新增用酒
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>
<style>
  #wine .wine_content {
    padding-top: 50px;
  }
  #wine .wine_content .mint-search-list {
    padding-top: 90px;
  }
  #wine .wine_content .condition {
    margin-left: 20px;
  }
  #wine .mt_picker {
    width: calc(100vw);
  }
  #wine .condition_list{
    display: block !important;
    z-index: 100;
  }
  #wine .mint-search {
    height: 100%;
  }
  #wine .mint-cell {
    margin-left: -10px;
  }
  #wine .mint-cell-title {
    margin-left: 10px;
  }
  #wine .wine_addWine {
    background-color: #26a2ff;
    color: white;
  }
  #wine .wine_option {
    color: white;
    position: fixed;
  }
  #wine .mint-tab-item-label {
    font-size: 20px;
    line-height: inherit;
  }
  #wine .mint-cell-value.is-link {
    margin-right: 30px;
  }
</style>
<script>
import MintUI from 'mint-ui'
export default {
  name: 'wine',
  mounted: function () {
    let vm = this
    if (vm.$route.fullPath) {
      let banquetId = vm.$route.query.banquetId
      if (banquetId && banquetId !== 'null' && banquetId !== 'undefined') {
        vm.banquetId = banquetId
        vm.feastInfoUrl = '/feastInfo?id=' + banquetId
      } else {
        vm.feastInfoUrl = '/feastInfo'
      }
    }
    let banquetState = sessionStorage.getItem('banquetState')
    vm.banquetState = banquetState
    let roleId = localStorage.getItem('roleId')
    vm.roleId = roleId
    // if (banquetState && roleId) {
    //   // 角色为批发商并且宴会状态为待备酒 不能新增酒
    //   if (roleId === vm.$global.ROLE.PFS && banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_DBJ) {
    //     $('.wine_option').css('display', 'none')
    //   }
    //   if (roleId === vm.$global.ROLE.PFS && banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_YBJ) {
    //     // 角色为批发商并且宴会状态为已备酒 不能新增酒
    //     $('.wine_option').css('display', 'none')
    //   }
    //   if (banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_JL) {
    //     // 宴会状态为奖励 不能新增酒
    //     $('.wine_option').css('display', 'none')
    //   }
    // }
    let banquetButton = sessionStorage.getItem('banquetButton')
    banquetButton = JSON.parse(banquetButton)
    if (banquetButton) {
      if (banquetButton.add_wine == 'true') {
        $('.wine_option').css('display', 'block')
      } else {
        $('.wine_option').css('display', 'none')
      }
    }
    sessionStorage.removeItem('bizWineId')
    sessionStorage.removeItem('bizWineIdValue')
    vm.getBanquetWineList()
  },
  methods: {
    getBanquetWineList () {
      let vm = this
      vm.result = []
      vm.searchResult = []
      if (vm.banquetId && vm.banquetId !== 'null' && vm.banquetId !== 'undefined') {
        let parm = {}
        parm.banquetId = vm.banquetId
        vm.getPostData(vm.$global.SERVER_BANQUET_WINE.GET_BANQUET_WINE_LIST, parm, function (response) {
          if (response.data && response.data.state === 1) {
            vm.$wineList = JSON.parse(localStorage.getItem('wineList')) || []
            if (!vm.banquetId) {
              if (!vm.$wineList.length) {
                vm.$wineList = response.data.result.wineList
                localStorage.setItem('wineList', JSON.stringify(vm.$wineList))
              }
              vm.result = vm.$wineList
              vm.searchResult = vm.$wineList
            } else {
              vm.result = response.data.result.wineList
              vm.searchResult = response.data.result.wineList
            }
          }
        })
      } else {
        vm.$wineList = JSON.parse(localStorage.getItem('wineList')) || []
        let wineList = vm.$wineList
        if (wineList.length) {
          for (let i = 0; i < wineList.length; i++) {
            let wine = wineList[i]
            wine.addWineUrl = '/addWine?banquetWineId=' + wine.id + '&bizBanquetId=&virtualWine=true&editState=true'
          }
        }
        vm.result = wineList
        vm.searchResult = wineList
      }
    },
    addWine () {
      let vm = this
      if (vm.banquetId) {
        vm.$router.push({
          path: 'addWine?banquetId=' + vm.banquetId
        })
      } else {
        vm.$router.push({
          path: 'addWine?virtualWine=true'
        })
      }
    },
    deleteWine (wineId) {
      /*eslint-disable*/
      let vm = this
        MintUI.MessageBox.confirm('确定要删除吗').then(action => {
          let roleId = localStorage.getItem('roleId')
          let banquetState = sessionStorage.getItem('banquetState')
          if((roleId === vm.$global.ROLE.GROUP_LEADER && banquetState !== vm.$global.BANQUET_STATE.BANQUET_STATE_JL) || (roleId === vm.$global.ROLE.PFS && (!banquetState || banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_ZC || banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_DQR))){
            vm.getPostData(vm.$global.SERVER_BANQUET_WINE.DELETE_BANQUET_WINE, {id: wineId}, function (result) {
              if (result.data.state === 1) {
                for (let i = 0; i < vm.result.length; i++) {
                  if (vm.result[i].id == wineId) {
                    vm.result.splice(i, 1)
                    vm.searchResult = vm.result
                    vm.$wineList = vm.result
                    localStorage.setItem('wineList', JSON.stringify(vm.$wineList))
                    break
                  }
                }
                MintUI.Toast('删除成功')
              } else {
                for (let i = 0; i < vm.result.length; i++) {
                  if (vm.result[i].id == wineId) {
                    if (vm.result[i].virtualWine) {
                      vm.result.splice(i, 1)
                      vm.searchResult = vm.result
                      vm.$wineList = vm.result
                      localStorage.setItem('wineList', JSON.stringify(vm.$wineList))
                      break
                    }
                  }
                }
                MintUI.Toast('删除成功')
              }
            })
          } else {
            MintUI.Toast('权限不足，无法执行删除宴会用酒操作')
          }
        })

    }
  },
  data () {
    let vm = this
    return {
      prcValue: '',
      showList: true,
      searchValue: '',
      banquetId: '',
      result: [],
      searchResult: [],
      feastInfoUrl: '',
      roleId: '',
      banquetState: '',
      cellSwipeRight: [
        {
          content: '删除',
          style: { background: 'red', color: '#fff' },
          handler: vm.deleteWine
        }
      ]
    }
  },
  computed: {
    searchWineList () {
      let vm = this
      let myArray = []
      vm.result.filter(function (value) {
        let reg = new RegExp(vm.searchValue, 'i').test(value.bizWineIdValue)
        if (reg) {
          myArray.push(value)
        }
      })
      vm.searchResult = myArray
      return []
    }
  }
}
</script>

<style scoped>

</style>
