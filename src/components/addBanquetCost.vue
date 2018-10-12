<template>
  <div id="addBanquetCost">
    <mt-header class="main_head" fixed :title="headTitle">
      <router-link :to="banquetCostListUrl" slot="left">
        <mt-button>
          <img height="35" width="35" src="../img/back.png">
        </mt-button>
      </router-link>
    </mt-header>
    <div class="banquetCostMessage" id="banquetCost_name">
      <mt-field  label="费用名称"  placeholder="请输入费用名称(必填)" :readonly="groupReadonly"  v-model="banquetCost.name" :attr="{maxlength:250}"></mt-field>
    </div>
    <div class="banquetCostMessage">
      <input type="hidden" v-model="banquetCost.costTypeId"/>
      <mt-field label="费用类型" placeholder="请选择费用类型(必填)"  readonly="readonly" v-model="banquetCost.costTypeName" @click.native.capture="showBanquetCostTypes()">
        <img style="width: 14px; height: 14px;" src="../img/drop_down.png" class="selectImg">
        <mt-popup v-model="showCostTypeList" position="bottom" class="mt-popup">
          <mt-picker ref="banquetCostType" style="width: calc(100vw);" :showToolbar="readonly" value-key="label" :slots="costTypes" @change="onBanquetCostTypeChange">
            <mt-button class="pickerCancel" @click="closeCostType">取消</mt-button>
            <mt-button class="pickerSure" type="primary" @click="confirmCostType">确定</mt-button>
          </mt-picker>
        </mt-popup>
      </mt-field>
    </div>
    <div class="banquetCostMessage">
      <mt-field  label="计算金额"  placeholder="复核时自动计算"  readonly="readonly" v-model="banquetCost.amount"></mt-field>
    </div>
    <div class="banquetCostMessage">
      <mt-field  label="实际金额"  placeholder="请输入实际金额(必填)" :readonly="groupReadonly"  v-model="banquetCost.realAmount" :attr="{maxlength:10}"></mt-field>
    </div>
    <div class="textareaCss">
      <mt-field  label="备注" placeholder="请输入备注" type="textarea" :readonly="groupReadonly"  v-model="banquetCost.remarks" :attr="{maxlength:250}"></mt-field>
    </div>
    <mt-button class="banquetCost_save" style="width: calc(100vw); background-color: #26a2ff; color: #ffffff; font-size: 20px;" type="default" @click="saveBanquetCost"> 确认</mt-button>
  </div>
</template>

<style>
  #addBanquetCost .textareaCss .mint-field-core {
    font-family: Arial;
  }
  #addBanquetCost #banquetCost_name {
    padding-top: 50px;
  }
  #addBanquetCost .mint-field .mint-cell-title {
    width: 50px;
  }
  #addBanquetCost .banquetCost_save {
    box-shadow: unset;
  }
  #addBanquetCost .mt-popup {
    width: calc(100vw);
  }
  #addBanquetCost .mint-cell {
    min-height: 56px;
  }
  #addBanquetCost .pickerSure {
    /*color: #26a2ff;*/
    /*position: absolute;*/
    /*right: 0;*/
    float: right;
  }
  #addBanquetCost .pickerCancel {
    /*position: absolute;*/
  }
  #addBanquetCost .mint-cell-wrapper {
    font-size: 16px;
    font-weight: bold;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#fff), color-stop(50%, #fff), color-stop(50%, transparent));
  }
  #addBanquetCost .mint-field .mint-cell-title {
    width: 80px;
  }
  #addBanquetCost .mint-cell:last-child {
    background-image: linear-gradient(0deg, #fff, #fff 50%, transparent 50%);
  }
  #addBanquetCost .mint-tab-item-label {
    font-size: 20px;
    line-height: inherit;
  }
  #addBanquetCost .pickerSure {
    color: #26a2ff;
    background-color: #ffffff;
    /*position: absolute;*/
    /*right: 0;*/
    float: right;
    width: calc(50vw);
  }
  #addBanquetCost .pickerCancel {
    /*position: absolute;*/
    width: calc(50vw);
    box-shadow: unset;
    -webkit-box-shadow: unset;
    background-color: #ffffff;
    color: #26a2ff;
  }
  #banquetCost .mint-button:not(.is-disabled):active::after{
    opacity: 0;
  }
  /* 隐藏clear icon图标 */
  #addBanquetCost .mint-field-clear {
    display: none !important;
  }
  #addBanquetCost #choosebanquetCost {
    padding-top: 50px;
  }
  #addBanquetCost #choosebanquetCost .mint-field .mint-cell-value {
    position:fixed;
    left: 89px;
  }
  #addBanquetCost .selectImg {
    position: absolute;
    right: 4px;
  }
  #addBanquetCost .banquetCostMessage{
    border-bottom: 1px #d9d9d9 solid;
  }
</style>
<script>
import MintUI from 'mint-ui'
export default {
  name: 'banquetCost',
  mounted: function () {
    let vm = this
    let banquetId = sessionStorage.getItem('bizBanquetId')
    if (banquetId) {
      vm.banquetCost.bizBanquetId = banquetId
      vm.banquetCostListUrl = '/banquetCostList?id=' + banquetId
    }
    let id = vm.$route.query.id
    if (id) {
      vm.banquetCost.id = id
      vm.getBanquetCostById()
      vm.headTitle = '修改费用'
    } else {
      vm.headTitle = '新增费用'
      vm.banquetCost.costTypeId = '3'
      vm.banquetCost.costTypeName = '车费'
    }
    // let roleId = localStorage.getItem('roleId')
    // // 角色为批发商不能修改奖励
    // if (roleId === vm.$global.ROLE.PFS) {
    //   vm.groupReadonly = true
    //   vm.showBanquetCostTypes = function () {}
    //   $('.banquetCost_save').css('display', 'none')
    // }
    // let banquetState = sessionStorage.getItem('banquetState')
    // // 宴会状态为奖励 不能操作宴会费用
    // if (banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_JL) {
    //   vm.showBanquetCostTypes = function () {}
    // }
    vm.showBanquetCostTypes = function () {}
    // 调用宴会按钮权限控制
    let banquetButton = sessionStorage.getItem('banquetButton')
    banquetButton = JSON.parse(banquetButton)
    if (banquetButton) {
      if (banquetButton.update_reward === 'true') {
      } else {
        vm.groupReadonly = true
        $('.banquetCost_save').css('display', 'none')
      }
    }
    vm.getCostTypes()
  },
  methods: {
    closeCostType () {
      let vm = this
      vm.showCostTypeList = false
    },
    confirmCostType () {
      let vm = this
      vm.banquetCost.costTypeId = vm.costTypeId
      vm.banquetCost.costTypeName = vm.costTypeName
      vm.showCostTypeList = false
    },
    showBanquetCostTypes () {
      let vm = this
      vm.showCostTypeList = true
      if (vm.banquetCost.costTypeName) {
        for (let i = 0; i < vm.costTypes[0].values.length; i++) {
          if (vm.banquetCost.costTypeName === vm.costTypes[0].values[i].label) {
            if (vm.$refs.banquetCostType) {
              vm.$refs.banquetCostType.setValues([vm.costTypes[0].values[i]])
            }
          }
        }
      } else {
        if (vm.$refs.banquetCostType) {
          vm.$refs.banquetCostType.setValues([vm.costTypes[0].values[0]])
        }
      }
      $('#addPerson .main_content').css('overflow-y', 'scroll')
    },
    getCostTypes () {
      let vm = this
      vm.getPostData(vm.$global.SERVER_BANQUET_COST.GET_BANQUET_COST_TYPE_LIST, '', function (response) {
        if (response.data && response.data.state === 1) {
          let result = response.data.result.costTypes
          vm.costTypes[0].values = result
        }
      })
    },
    onBanquetCostTypeChange (picker, values) {
      let vm = this
      let value = values[0]
      if (value) {
        vm.costTypeId = value.value
        vm.costTypeName = value.label
      }
    },
    getBanquetCostById () {
      let vm = this
      vm.getPostData(vm.$global.SERVER_BANQUET_COST.GET_BANQUET_COST_BY_ID, {id: vm.banquetCost.id}, function (response) {
        if (response.data && response.data.state === 1) {
          let result = response.data.result.banquetCost
          vm.banquetCost = result
          vm.beforeRealAmount = vm.banquetCost.realAmount
          vm.beforeName = vm.banquetCost.name
          if (result.costTypeId) {
            for (let i = 0; i < vm.costTypes[0].values.length; i++) {
              if (result.costTypeId === vm.costTypes[0].values[i].value) {
                vm.$refs.banquetCostType.setValues([vm.costTypes[0].values[i]])
                vm.costTypes[0].defaultIndex = i
              }
            }
          }
        }
      })
    },
    saveBanquetCost () {
      let vm = this
      if (!vm.banquetCost.name) {
        MintUI.Toast('费用名称不能为空')
        return
      }
      if (!vm.banquetCost.costTypeId) {
        MintUI.Toast('费用类型不能为空')
        return
      }
      if (!vm.banquetCost.realAmount) {
        MintUI.Toast('实际金额不能为空')
        return
      } else {
        if (vm.banquetCost.realAmount != 0) {
          if (!vm.$global.REGEX.IS_NUMBER.test(vm.banquetCost.realAmount)) {
            MintUI.Toast('实际金额只能为正数')
            return
          }
        }
      }
      if (vm.beforeRealAmount) {
        if (vm.banquetCost.realAmount != vm.beforeRealAmount) {
          if (!vm.banquetCost.remarks) {
            MintUI.Toast('修改了实际金额，请填写备注')
            return
          }
        }
      }
      if (vm.beforeName) {
        if (vm.banquetCost.name != vm.beforeName) {
          if (!vm.banquetCost.remarks) {
            MintUI.Toast('修改了费用名称，请填写备注')
            return
          }
        }
      }
      vm.getPostData(vm.$global.SERVER_BANQUET_COST.SAVE_BANQUET_COST, vm.banquetCost, function (response) {
        if (response.data && response.data.state === 1) {
          MintUI.Toast(response.data.msg)
          vm.$router.push({
            path: vm.banquetCostListUrl
          })
        }
      })
    }
  },
  data () {
    return {
      headTitle: '',
      readonly: true,
      showCostTypeList: false,
      banquetCost: {
        id: '',
        bizBanquetId: '',
        name: '',
        costTypeId: '',
        costTypeName: '',
        amount: '',
        realAmount: '',
        remarks: ''
      },
      beforeRealAmount: '',
      beforeName: '',
      costTypeId: '',
      costTypeName: '',
      costTypes: [
        {
          flex: -1,
          values: [],
          className: 'slot2',
          textAlign: 'center'
        }
      ],
      groupReadonly: false,
      banquetCostListUrl: ''
    }
  }
}
</script>
