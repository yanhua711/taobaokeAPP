<template>
  <div id="addWine">
    <mt-header class="main_head" fixed :title="headTitle">
      <router-link :to="wineUrl" slot="left">
        <mt-button>           <img height="35" width="35" src="../img/back.png">         </mt-button>
      </router-link>
    </mt-header>
    <div class="wine_info">
      <div class="chooseType" >
        <input type="hidden" v-model="wine.id"/>
        <input type="hidden" v-model="wine.bizBanquetId"/>
        <mt-cell id="choseWineType"  title="酒类类型" is-link="" v-model="wine.bizWineId"  :readonly="wineReadonly" :to="chooseWineTypeUrl" @click.native.capture="clickChooseWine()">
          <mt-field placeholder="请选择酒类类型(必填)" readonly="readonly" v-model="wine.bizWineIdValue" @change.native.capture="getStandardQty()"></mt-field>
        </mt-cell>
      </div>
      <div>
        <mt-field id="wineType" label="酒类类型" style="display: none" placeholder="请选择酒类类型(必填)" readonly="readonly" v-model="wine.bizWineIdValue"></mt-field>
      </div>
      <div>
        <mt-field  label="自然瓶" placeholder="请输入自然瓶(必填)" :readonly="wineReadonly"  v-model="wine.bottleNumber" @change.native.capture="getStandardQty()" :attr="{maxlength:10}"></mt-field>
      </div>
      <div>
        <mt-field  label="折标准瓶" placeholder="系统自动计算" readonly="readonly"  v-model="wine.standardQty"></mt-field>
      </div>
      <div class="isGroupShow">
        <mt-field  label="单价" placeholder="请输入单价" :readonly="wineReadonly"   v-model="wine.univalence" :attr="{maxlength:10}" @change.native.capture="getAmount()"></mt-field>
      </div>
      <div class="isGroupShow">
        <mt-field  label="总价" placeholder="系统自动计算" readonly="readonly"   v-model="wine.amount" :attr="{maxlength:10}"></mt-field>
      </div>
      <div class="isShow">
        <mt-field  label="消费瓶数" placeholder="请输入消费瓶数(必填)" :readonly="wineReadonly"   v-model="wine.realBottleNumber" :attr="{maxlength:10}" @change.native.capture="getRealStandardQty()"></mt-field>
      </div>
      <div class="isShow">
        <mt-field  label="折标准瓶(实)" placeholder="系统自动计算" readonly="readonly"    v-model="wine.realStandardQty" :attr="{maxlength:10}" ></mt-field>
      </div>
      <div class="isShow">
        <mt-field  label="瓶盖回收数" placeholder="请输入瓶盖回收数" :readonly="wineReadonly"    v-model="wine.bottleCovered" :attr="{maxlength:10}" ></mt-field>
      </div>
      <!--<div class="isShow">-->
        <!--<mt-field  label="实际总价" placeholder="请输入实际总价" :readonly="wineReadonly"   v-model="wine.realAmount" :attr="{maxlength:10}"></mt-field>-->
      <!--</div>-->
      <div class="textareaCss">
        <mt-field  label="备注" placeholder="" type="textarea" :readonly="wineReadonly" v-model="wine.remarks" :attr="{maxlength:250}"></mt-field>
      </div>
    </div>
    <mt-button id="confirm" style="width: calc(100vw); background-color: #26a2ff; color: #ffffff; font-size: 20px" type="default" @click="saveBanquetWine"> 确认</mt-button>
  </div>
</template>
<style>
  #addWine .wine_info {
    padding-top: 50px;
  }
  #addWine #confirm {
    box-shadow: unset;
  }
  #addWine .mint-cell-wrapper {
    background-image: -webkit-gradient(linear, left top, left bottom, from(#d9d9d9), color-stop(50%, #fff), color-stop(50%, transparent)) !important;
  }
  #addWine .mint-tab-item-label {
    font-size: 20px;
    line-height: inherit;
  }
  #addWine .mt-popup {
    width: calc(100vw);
  }
  #addWine .mint-field .mint-cell-title {
    width: 75px;
  }
  #addWine .mint-cell-wrapper{
    font-size: 16px;
    font-weight: bold;
  }
  #addWine .chooseType .mint-field .mint-cell-value {
    position:fixed;
    left: 89px;
  }
  #addWine .mint-field-core {
    width: 250px;
  }
  #addWine .isShow {
    display: none;
  }
  #addWine .textareaCss .mint-field-core {
    font-family: Arial;
  }
</style>
<script>
import MintUI from 'mint-ui'
export default {
  name: 'addWine',
  mounted: function () {
    let vm = this
    vm.wineUrl = '/wine'
    if (vm.$route.query.virtualWine && !vm.$route.query.banquetId) {
      if (vm.$route.query.editState) {
        vm.headTitle = '修改用酒'
        if (vm.$route.query.banquetWineId) {
          vm.chooseWineTypeUrl = 'chooseWineType?banquetWineId=' + vm.$route.query.banquetWineId + '&bizBanquetId=&virtualWine=true&editState=true'
          vm.$wineList = JSON.parse(localStorage.getItem('wineList')) || []
          if (vm.$wineList.length) {
            for (let i = 0; i < vm.$wineList.length; i++) {
              if (vm.$wineList[i].id == vm.$route.query.banquetWineId) {
                vm.wine = vm.$wineList[i]
                if (vm.$route.query.bizWineIdValue) {
                  vm.wine.bizWineIdValue = vm.$route.query.bizWineIdValue
                  vm.wine.bizWineId = vm.$route.query.bizWineId
                }
                vm.getStandardQty()
                vm.getRealStandardQty()
                return
              }
            }
          }
        }
      } else {
        vm.headTitle = '新增用酒'
      }
      if (vm.$route.query.bizWineId) { // 酒类Id
        let banquetId = vm.$route.query.banquetId
        vm.wine.bizBanquetId = banquetId || ''
        vm.wineUrl = '/wine?banquetId=' + banquetId
        let bizWineId = vm.$route.query.bizWineId
        let bizWineIdValue = vm.$route.query.bizWineIdValue
        if (!bizWineId) {
          bizWineId = sessionStorage.getItem('bizWineId')
          sessionStorage.removeItem('bizWineId')
        }
        if (!bizWineIdValue) {
          bizWineIdValue = sessionStorage.getItem('bizWineIdValue')
          sessionStorage.removeItem('bizWineIdValue')
        }
        vm.wine.bizWineId = bizWineId
        vm.wine.bizWineIdValue = bizWineIdValue
        vm.getStandardQty()
        vm.getRealStandardQty()
      }
      let bottleNumber = sessionStorage.getItem('bottleNumber')
      let univalence = sessionStorage.getItem('univalence')
      let amount = sessionStorage.getItem('amount')
      let realBottleNumber = sessionStorage.getItem('realBottleNumber')
      let realStandardQty = sessionStorage.getItem('realStandardQty')
      let realAmount = sessionStorage.getItem('realAmount')
      let remarks = sessionStorage.getItem('remarks')
      if (bottleNumber) {
        vm.wine.bottleNumber = bottleNumber
        sessionStorage.removeItem('bottleNumber')
      }
      if (univalence) {
        vm.wine.univalence = univalence
        sessionStorage.removeItem('univalence')
      }
      if (amount) {
        vm.wine.amount = amount
        sessionStorage.removeItem('amount')
      }
      if (realBottleNumber) {
        vm.wine.realBottleNumber = realBottleNumber
        sessionStorage.removeItem('realBottleNumber')
      }
      if (realStandardQty) {
        vm.wine.realStandardQty = realStandardQty
        sessionStorage.removeItem('realStandardQty')
      }
      if (realAmount) {
        vm.wine.realAmount = realAmount
        sessionStorage.removeItem('realAmount')
      }
      if (remarks) {
        vm.wine.remarks = remarks
        sessionStorage.removeItem('remarks')
      }
    } else {
      vm.initAddWine()
    }
  },
  methods: {
    initAddWine () {
      let vm = this
      vm.wineUrl = '/wine'
      if (vm.$route.fullPath) {
        if (vm.$route.query.banquetId) { // 宴会Id
          let banquetId = vm.$route.query.banquetId
          vm.wine.bizBanquetId = banquetId || ''
          vm.wineUrl = '/wine?banquetId=' + banquetId
          vm.chooseWineTypeUrl = 'chooseWineType?banquetId=' + banquetId
        }
        if (vm.$route.query.bizWineId) { // 酒类Id
          let banquetId = vm.$route.query.banquetId
          vm.wine.bizBanquetId = banquetId || ''
          vm.wineUrl = '/wine?banquetId=' + banquetId
          let bizWineId = vm.$route.query.bizWineId
          let bizWineIdValue = vm.$route.query.bizWineIdValue
          if (!bizWineId) {
            bizWineId = sessionStorage.getItem('bizWineId')
            sessionStorage.removeItem('bizWineId')
          }
          if (!bizWineIdValue) {
            bizWineIdValue = sessionStorage.getItem('bizWineIdValue')
            sessionStorage.removeItem('bizWineIdValue')
          }
          vm.wine.bizWineId = bizWineId
          vm.wine.bizWineIdValue = bizWineIdValue
          vm.getStandardQty()
          vm.getRealStandardQty()
        } else {
          let bizWineId = sessionStorage.getItem('bizWineId')
          if (bizWineId) {
            vm.wine.bizWineId = bizWineId
            sessionStorage.removeItem('bizWineId')
          }
          let bizWineIdValue = sessionStorage.getItem('bizWineIdValue')
          if (bizWineIdValue) {
            vm.wine.bizWineIdValue = bizWineIdValue
            sessionStorage.removeItem('bizWineIdValue')
          }
        }
        if (vm.$route.query.banquetWineId) { // 宴会用酒Id
          let id = vm.$route.query.banquetWineId || ''
          vm.wine.id = id
          vm.getBanuqetWineById(id)
          vm.headTitle = '修改用酒'
        } else {
          vm.headTitle = '新增用酒'
        }
        let id = sessionStorage.getItem('id')
        let bizBanquetId = sessionStorage.getItem('bizBanquetId')
        let bottleNumber = sessionStorage.getItem('bottleNumber')
        let standardQty = sessionStorage.getItem('standardQty')
        let univalence = sessionStorage.getItem('univalence')
        let amount = sessionStorage.getItem('amount')
        let realBottleNumber = sessionStorage.getItem('realBottleNumber')
        let realStandardQty = sessionStorage.getItem('realStandardQty')
        let realAmount = sessionStorage.getItem('realAmount')
        let bottleCovered = sessionStorage.getItem('bottleCovered')
        let remarks = sessionStorage.getItem('remarks')
        if (id) {
          vm.wine.id = id
          vm.headTitle = '修改用酒'
          sessionStorage.removeItem('id')
        }
        if (bizBanquetId) {
          vm.wine.bizBanquetId = bizBanquetId
          sessionStorage.removeItem('bizBanquetId')
        }
        if (bottleNumber) {
          vm.wine.bottleNumber = bottleNumber
          sessionStorage.removeItem('bottleNumber')
        }
        if (standardQty) {
          vm.wine.standardQty = standardQty
          sessionStorage.removeItem('standardQty')
        }
        if (univalence) {
          vm.wine.univalence = univalence
          sessionStorage.removeItem('univalence')
        }
        if (amount) {
          vm.wine.amount = amount
          sessionStorage.removeItem('amount')
        }
        if (realBottleNumber) {
          vm.wine.realBottleNumber = realBottleNumber
          sessionStorage.removeItem('realBottleNumber')
        }
        if (realStandardQty) {
          vm.wine.realStandardQty = realStandardQty
          sessionStorage.removeItem('realStandardQty')
        }
        if (realAmount) {
          vm.wine.realAmount = realAmount
          sessionStorage.removeItem('realAmount')
        }
        if (remarks) {
          vm.wine.remarks = remarks
          sessionStorage.removeItem('remarks')
        }
        if (bottleCovered) {
          vm.wine.bottleCovered = bottleCovered
          sessionStorage.removeItem('bottleCovered')
        }
      }
      // 调用宴会按钮权限控制
      let banquetButton = sessionStorage.getItem('banquetButton')
      banquetButton = JSON.parse(banquetButton)
      if (banquetButton) {
        if (banquetButton.add_wine == 'true') {
        } else {
          vm.clearFunctionAndHide()
        }
      }
      let banquetState = sessionStorage.getItem('banquetState')
      let roleId = localStorage.getItem('roleId')
      if (banquetState && roleId) {
        // // 角色为批发商并且宴会状态为待备酒 不能新增酒
        // if (roleId === vm.$global.ROLE.PFS && banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_DBJ) {
        //   vm.clearFunctionAndHide()
        // }
        // // 角色为批发商并且宴会状态为已备酒 不能新增酒
        // if (roleId === vm.$global.ROLE.PFS && banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_YBJ) {
        //   vm.clearFunctionAndHide()
        // }
        // // 宴会状态为奖励 不能新增酒
        // if (banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_JL) {
        //   vm.clearFunctionAndHide()
        // }
        if ((roleId === vm.$global.ROLE.GROUP_LEADER && banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_YBJ) || banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_JL) {
          $('.isShow').css('display', 'block')
        }
        if (roleId === vm.$global.ROLE.GROUP_LEADER) {
          $('.isGroupShow').css('display', 'none')
        }
      }
    },
    clearFunctionAndHide () {
      let vm = this
      vm.clickChooseWine = function () {}
      vm.wineReadonly = true
      $('#confirm').css('display', 'none')
      $('#choseWineType').css('display', 'none')
      $('#wineType').css('display', 'block')
    },
    getAmount () {
      let vm = this
      let bo = vm.$global.REGEX.IS_NUMBER.test(vm.wine.univalence)
      if (!bo) {
        MintUI.Toast('单价只能为正数')
        return
      }
      vm.wine.amount = vm.wine.bottleNumber * vm.wine.univalence
    },
    clickChooseWine () { // 点击选择酒类
      let vm = this
      let id = vm.wine.id
      let bizWineId = vm.wine.bizWineId
      let bizWineIdValue = vm.wine.bizWineIdValue
      let bizBanquetId = vm.wine.bizBanquetId
      let bottleNumber = vm.wine.bottleNumber
      let standardQty = vm.wine.standardQty
      let univalence = vm.wine.univalence
      let amount = vm.wine.amount
      let realBottleNumber = vm.wine.realBottleNumber
      let realStandardQty = vm.wine.realStandardQty
      let realAmount = vm.wine.realAmount
      let bottleCovered = vm.wine.bottleCovered
      let remarks = vm.wine.remarks
      if (id) {
        sessionStorage.setItem('id', id)
      }
      if (bizWineId) {
        sessionStorage.setItem('bizWineId', bizWineId)
      }
      if (bizWineIdValue) {
        sessionStorage.setItem('bizWineIdValue', bizWineIdValue)
      }
      if (bizBanquetId) {
        sessionStorage.setItem('bizBanquetId', bizBanquetId)
      }
      if (bottleNumber) {
        sessionStorage.setItem('bottleNumber', bottleNumber)
      }
      if (standardQty) {
        sessionStorage.setItem('standardQty', standardQty)
      }
      if (univalence) {
        sessionStorage.setItem('univalence', univalence)
      }
      if (amount) {
        sessionStorage.setItem('amount', amount)
      }
      if (realAmount) {
        sessionStorage.setItem('realAmount', realAmount)
      }
      if (realBottleNumber) {
        sessionStorage.setItem('realBottleNumber', realBottleNumber)
      }
      if (realStandardQty) {
        sessionStorage.setItem('realStandardQty', realStandardQty)
      }
      if (bottleCovered) {
        sessionStorage.setItem('bottleCovered', bottleCovered)
      }
      if (remarks) {
        sessionStorage.setItem('remarks', remarks)
      }
    },
    getStandardQty () { // 获取折标志瓶
      let vm = this
      let param = {}
      if (!vm.wine.bizWineId) {
        MintUI.Toast('请先选择酒类类型')
        vm.wine.standardQty = ''
        return
      }
      let bottleNumber = ''
      if (!vm.wine.bottleNumber) {
        bottleNumber = sessionStorage.getItem('bottleNumber')
        if (!bottleNumber) {
          vm.wine.standardQty = ''
          return
        }
        param.bottleNumber = bottleNumber
      } else {
        bottleNumber = vm.wine.bottleNumber
        let bo = vm.$global.REGEX.IS_INTEGER.test(bottleNumber)
        if (!bo) {
          MintUI.Toast('自然瓶只能为正整数')
          return false
        }
      }
      vm.wine.amount = vm.wine.bottleNumber * vm.wine.univalence
      param.bizWineId = vm.wine.bizWineId
      param.bottleNumber = bottleNumber
      vm.getPostData(vm.$global.SERVER_BANQUET_WINE.GET_STANDARDQTY, param, function (response) {
        if (response.data && response.data.state === 1) {
          vm.wine.standardQty = response.data.result.standardQty
        }
      })
    },
    getRealStandardQty () { // 获取折标准瓶(实)
      let vm = this
      let param = {}
      let realBottleNumber = ''
      if (!vm.wine.realBottleNumber) {
        realBottleNumber = sessionStorage.getItem('realBottleNumber')
        if (!realBottleNumber) {
          vm.wine.realBottleNumber = ''
          return
        }
        param.bottleNumber = realBottleNumber
      } else {
        realBottleNumber = vm.wine.realBottleNumber
        let bo = vm.$global.REGEX.IS_INTEGER.test(realBottleNumber)
        if (!bo) {
          MintUI.Toast('消费瓶数只能为正整数')
          return false
        }
      }
      param.bizWineId = vm.wine.bizWineId
      param.bottleNumber = realBottleNumber
      vm.getPostData(vm.$global.SERVER_BANQUET_WINE.GET_STANDARDQTY, param, function (response) {
        if (response.data && response.data.state === 1) {
          vm.wine.realStandardQty = response.data.result.standardQty
        }
      })
    },
    getBanuqetWineById (id) { // 根据宴会酒类ID获取宴会用酒
      let vm = this
      if (id) {
        vm.getPostData(vm.$global.SERVER_BANQUET_WINE.GET_BANUQETWINE_BY_ID, vm.wine, function (response) {
          if (response.data.result.wine) {
            vm.wine = response.data.result.wine
            vm.wineUrl = '/wine?banquetId=' + vm.wine.bizBanquetId
            vm.chooseWineTypeUrl = 'chooseWineType?banquetId=' + vm.wine.bizBanquetId
          }
        })
      }
    },
    saveBanquetWine () { // 保存酒类
      let vm = this
      setTimeout(function () {
        if (!vm.wine.bizWineId) {
          MintUI.Toast('酒类类型不能为空')
          return
        }
        if (!vm.wine.bottleNumber) {
          MintUI.Toast('自然瓶不能为空')
          return
        }
        // 角色为批发商 单价和总价必填
        let roleId = localStorage.getItem('roleId')
        if (roleId === vm.$global.ROLE.PFS) {
          if (!vm.wine.univalence) {
            MintUI.Toast('单价不能为空')
            return
          } else {
            if (!vm.$global.REGEX.IS_NUMBER.test(vm.wine.univalence)) {
              MintUI.Toast('单价只能为正数')
              return
            }
          }
        }
        if (vm.wine.realBottleNumber) {
          if (!vm.$global.REGEX.IS_INTEGER.test(vm.wine.realBottleNumber)) {
            MintUI.Toast('消费瓶数只能为正整数')
            return
          } else {
            vm.wine.realAmount = vm.wine.realBottleNumber * vm.wine.univalence
          }
        }
        let bo = vm.$global.REGEX.IS_INTEGER.test(vm.wine.bottleNumber)
        if (!bo) {
          MintUI.Toast('自然瓶只能为正整数')
          return
        }
        let banquetState = sessionStorage.getItem('banquetState')
        if (banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_YBJ) {
          if (!vm.wine.realBottleNumber) {
            MintUI.Toast('消费瓶数不能为空')
            return
          }
        }
        if (vm.wine.bottleCovered) {
          if (!vm.$global.REGEX.IS_INTEGER.test(vm.wine.bottleCovered)) {
            MintUI.Toast('瓶盖回收数只能为正整数')
            return
          }
        }
        vm.$wineList = JSON.parse(localStorage.getItem('wineList')) || []
        let wineList = vm.$wineList
        if (vm.$route.query.virtualWine) {
          if (wineList.length) {
            if (vm.$route.query.editState) {
              for (let i = 0; i < wineList.length; i++) {
                if (vm.wine.id == wineList[i].id) {
                  vm.wine.virtualWine = true
                  wineList[i] = vm.wine
                  MintUI.Toast('操作成功')
                  break
                }
              }
            } else {
              // 判断是否修改
              if (vm.wine.id && vm.wine.id != 'undefined' && vm.wine.id != 'null') {
                for (let i = 0; i < wineList.length; i++) {
                  if (vm.wine.id == wineList[i].id) {
                    vm.wine.virtualWine = true
                    if (vm.wine.id == 'undefined' || vm.wine.id == 'null') {
                      vm.wine.id = vm.getVirtualWineId()
                    }
                    wineList[i] = vm.wine
                    MintUI.Toast('操作成功')
                    break
                  }
                }
              } else {
                vm.wine.id = vm.getVirtualWineId()
                vm.wine.virtualWine = true
                wineList.push(vm.wine)
                MintUI.Toast('操作成功')
              }
            }
          } else {
            wineList = []
            vm.wine.id = vm.getVirtualWineId()
            vm.wine.virtualWine = true
            wineList.push(vm.wine)
          }
          localStorage.setItem('wineList', JSON.stringify(wineList))
        }
        if (vm.wine.bizBanquetId && vm.wine.bizBanquetId !== 'null' && vm.wine.bizBanquetId !== 'undefined') {
          vm.getPostData(vm.$global.SERVER_BANQUET_WINE.SAVE_BANQUET_WINE, vm.wine, function (response) {
            MintUI.Toast(response.data.msg)
            if (response.data.result.wine) {
              vm.$router.push({
                path: vm.wineUrl
              })
            }
          })
        } else {
          vm.$wineList = wineList
          vm.wineUrl = '/wine'
          vm.$router.push({
            path: '/wine'
          })
        }
      }, 200)
    },
    deleteBanquetWine () {
      let vm = this
      let id = vm.wine.id
      let param = {}
      if (id) {
        param.id = id
        vm.getPostData(vm.$global.SERVER_BANQUET_WINE.DELETE_BANQUET_WINE, param, function (response) {
          MintUI.Toast(response.data.msg)
          if (response.data.result.wine) {
            vm.$router.push({
              path: vm.wineUrl
            })
          }
        })
      }
    },
    // 获取虚拟的酒ID
    getVirtualWineId () {
      let vm = this
      let wineList = vm.$wineList
      let idArray = []
      if (wineList.length) {
        for (let i = 0; i < wineList.length; i++) {
          idArray.push(wineList[i].id)
        }
        idArray.sort()
        let windId = idArray[idArray.length - 1]
        return windId + 1
      }
      return 100
    }
  },
  data () {
    return {
      id: '',
      headTitle: '',
      wineType: false,
      readonly: 'true',
      wineReadonly: false,
      winePricesUrl: '',
      chooseWineTypeUrl: '/chooseWineType',
      wineUrl: '',
      wineTypes: [
        {
          flex: -1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      wine: {
        id: '',
        bizBanquetId: '',
        bizWineIdValue: '',
        bizWineId: '',
        bottleNumber: '',
        standardQty: '',
        amount: '',
        univalence: '',
        realBottleNumber: '',
        realStandardQty: '',
        realAmount: '',
        remarks: '',
        bottleCovered: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
