<template>
  <div id="banquetCostList">
    <mt-header class="main_head" fixed title="宴会费用">
      <router-link :to="feastInfoUrl" slot="left">
        <mt-button>
          <img height="35" width="35" src="../img/back.png">
        </mt-button>
      </router-link>
    </mt-header>
    <div class="banquetCost_content">
      <div class="banquetCostLists">
        <mt-cell-swipe v-for="item in searchResult" :key="item.id" :title="item.name" :label="item.costTypeName" is-link="" :to="item.banquetCostUrl"
                       :right="[
          {
            content: '删除',
            style: { background: 'red', color: '#fff' },
            handler: () => deleteBanquetCost(item.id)
          }
        ]">
          <div style="padding-right: 4px;">{{item.realAmount}}元</div>
        </mt-cell-swipe>
      </div>
    </div>
    <mt-tabbar class="banquetCost_option" style="display:none;">
      <div id="operatBut" class="map_button" style="display: inline-flex;">
        <mt-button id="addBanquetCost" class="cost_addBanquetCost" style="width: calc(100vw); background-color: #26a2ff; color: #ffffff;" type="default" @click="addBanquetCost">新增费用</mt-button>
        <!--<mt-button id="salaryAccount" style="width: calc(33vw); background-color: #ff800a; color: #ffffff; " type="default" @click="salaryAccount">工资结算</mt-button>-->
        <!--<mt-button id="personAward" style="width: calc(33vw); background-color: #ff800a; color: #ffffff;" type="default" @click="personAward">人员奖励</mt-button>-->
      </div>
    </mt-tabbar>
  </div>
</template>
<style>
  #banquetCostList .map_button .mint-button--normal {
    height: 40px;
    font-size: 20px;
  }
  #banquetCostList .banquetCost_content {
    padding-top: 50px;
  }
  #banquetCostList .banquetCost_content .mint-search-list {
    padding-top: 140px;
  }
  #banquetCostList .mint-search {
    height: 100%;
  }
  #banquetCostList .banquetCost_content .mt_badge{
    padding: 6px 2px;
    vertical-align: middle;
  }
  #banquetCostList .banquetCostLists .mint-cell-wrapper {
    padding: 0px;
  }
  #banquetCostList .mint-cell-wrapper {
    /*font-size: 14px;*/
  }
  #banquetCostList .add_person .mint-cell {
    min-height: 29px;
  }
  #banquetCostList .add_person {
    /*border-bottom: 1px solid #d9d9d9;*/
  }
  #banquetCostList .banquetCost_content .mint-search-list {
    padding-top: 113px;
  }
  /*#banquetCostList .mint-cell-wrapper {*/
  /*background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);*/
  /*}*/
  #banquetCostList .mint-cell:last-child {
    background-image: -webkit-gradient(linear, left top, left bottom, from(#fff), color-stop(50%, #fff), color-stop(50%, transparent));
    background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%);
  }
  #banquetCostList .feast_save {
    background-color: #26a2ff;
    color: white;
  }
  /*#banquetCostList .feast_confirm {*/
  /*background-color: #26a2ff;*/
  /*color: white;*/
  /*}*/
  /*#banquetCostList .mint-checkbox-label {*/
  /*vertical-align: -5px;*/
  /*margin-left: 6px;*/
  /*}*/
  #banquetCostList .cost_addBanquetCost {
    background-color: #26a2ff;
    color: white;
  }
  #banquetCostList .banquetCost_option {
    color: white;
    position: fixed;
  }
  #banquetCostList .mint-tab-item-label {
    font-size: 20px;
    line-height: inherit;
  }
  #banquetCostList .mint-cell-title {
    margin-left: 10px;
  }
</style>
<script>
import MintUI from 'mint-ui'
export default {
  name: 'banquetCostList',
  mounted: function () {
    let vm = this
    vm.initBanquetCostList()
  },
  methods: {
    initBanquetCostList () {
      let vm = this
      let id = vm.$route.query.id
      if (id) {
        sessionStorage.setItem('bizBanquetId', id)
        id = vm.$route.query.id
        if (id) {
          vm.banquetId = id
        }
        vm.feastInfoUrl = '/feastInfo?id=' + id
      }
      // let banquetState = sessionStorage.getItem('banquetState')
      // let roleId = localStorage.getItem('roleId')
      // if (banquetState && roleId) {
      //   /* eslint-disable */
      //   // 角色为批发商并且宴会状态为待备酒 不能操作宴会费用
      //   if (roleId === vm.$global.ROLE.PFS && banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_DBJ) {
      //     $('.banquetCost_option').css('display', 'none')
      //   }
      //   if (roleId === vm.$global.ROLE.PFS && banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_YBJ) {
      //     // 角色为批发商并且宴会状态为已备酒 不能操作宴会费用
      //     $('.banquetCost_option').css('display', 'none')
      //   }
      //   if (banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_JL) {
      //     // 宴会状态为奖励 不能操作宴会费用
      //     $('.banquetCost_option').css('display', 'none')
      //   }
      // }d
      let banquetButton = sessionStorage.getItem('banquetButton')
      banquetButton = JSON.parse(banquetButton)
      if (banquetButton) {
        if (banquetButton.add_cost == 'true') {
          $('.banquetCost_option').css('display', 'block')
        } else {
          $('.banquetCost_option').css('display', 'none')
        }
      }
      sessionStorage.removeItem('banquetPersonId')
      vm.getBanquetCostList(id)
    },
    addBanquetCost () {
      let vm = this
      let banquetId = vm.banquetId
      if (banquetId) {
        vm.$router.push({
          path: '/addBanquetCost?banquetId=' + banquetId
        })
      } else {
        MintUI.Toast('宴会不存在')
      }
    },
    salaryAccount () {
      let vm = this
      let banquetId = vm.banquetId
      if (banquetId) {
        let param = {
          banquetId: banquetId
        }
        vm.getPostData(vm.$global.SERVER_BANQUET_COST.SALARY_ACCOUNT, param, function (response) {
          if (response.data && response.data.state === 1) {
            vm.getBanquetCostList(banquetId)
          }
        })
      }
    },
    personAward () {
      let vm = this
      let banquetId = vm.banquetId
      if (banquetId) {
        let param = {
          banquetId: banquetId
        }
        vm.getPostData(vm.$global.SERVER_BANQUET_COST.PERSON_AWARD, param, function (response) {
          if (response.data && response.data.state === 1) {
            vm.getBanquetCostList(banquetId)
          }
        })
      }
    },
    getBanquetCostList (id) {
      let vm = this
      if (id) {
        let parm = {}
        parm.banquetId = id
        vm.getPostData(vm.$global.SERVER_BANQUET_COST.GET_BANQUET_COST_LIST, parm, function (response) {
          if (response.data && response.data.state === 1) {
            let result = response.data.result.costList
            vm.searchResult = result
            if (result) {
              for (let i = 0; i < result.length; i++) {
                result[i].banquetCostUrl = '/addBanquetCost?id=' + result[i].id + '&banquetId=' + result[i].bizBanquetId
              }
            }
          }
        })
      } else {
        MintUI.Toast('宴会不存在')
      }
    },
    deleteBanquetCost (id) {
      let vm = this
      if (id) {
        let parm = {}
        parm.id = id
        MintUI.MessageBox.confirm('确定要删除吗').then(action => {
          let roleId = localStorage.getItem('roleId')
          let banquetState = sessionStorage.getItem('banquetState')
          if (roleId === vm.$global.ROLE.PFS || (banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_JL && roleId != vm.$global.ROLE.PERNOD_RICARD)) {
            MintUI.Toast('权限不足，无法执行删除宴会费用操作')
          } else {
            vm.getPostData(vm.$global.SERVER_BANQUET_COST.DELETE_BANQUET_COST, parm, function (response) {
              if (response.data && response.data.state === 1) {
                MintUI.Toast(response.data.msg)
                vm.getBanquetCostList(vm.banquetId)
              }
            })
          }
        })
      }
    }
  },
  data () {
    return {
      prcValue: '',
      popupVisible: false,
      showList: true,
      confirm: '',
      searchResult: [],
      banquetId: '',
      addBanquetCostUrl: '',
      feastInfoUrl: ''
    }
  }
}
</script>

<style scoped>

</style>
