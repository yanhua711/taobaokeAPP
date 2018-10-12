<template>
  <div id="addPerson">
    <mt-header class="main_head" fixed :title="headTitle">
      <router-link :to="mixedWinePersonUrl" slot="left">
        <mt-button>
          <img height="35" width="35" src="../img/back.png">
        </mt-button>
      </router-link>
    </mt-header>
    <div id="choosePerson" >
      <input type="hidden" v-model="person.id"/>
      <input type="hidden" v-model="person.bizPersonId"/>
      <mt-cell id="chosePersonType"  title="宴会人员" is-link="" v-model="person.bizPersonId"  readonly="readonly" :to="choosePersonUrl" @click.native.capture="clickChoosePerson()">
        <mt-field placeholder="请选择宴会人员(必填)" readonly="readonly" v-model="person.name"></mt-field>
      </mt-cell>
    </div>
    <div class="personMessage">
      <mt-field id="person" label="宴会人员" style="display: none" placeholder="请选择宴会人员(必填)" readonly="readonly" v-model="person.name"></mt-field>
    </div>
    <div class="personMessage">
      <input type="hidden" v-model="person.type"/>
      <mt-field label="人员类型" placeholder="请选择人员类型(必填)"  readonly="readonly" v-model="person.typeLabel" @click.native.capture="showPersonTypes()">
        <img style="width: 14px; height: 14px;" src="../img/drop_down.png" class="selectImg">
        <mt-popup v-model="showPersonTypeList" position="bottom" class="mt-popup">
          <mt-picker ref="personType" style="width: calc(100vw);" :showToolbar="readonly" value-key="label" :slots="personTypes" @change="onPersonTypeChange">
            <mt-button class="pickerCancel" @click="closePersonType">取消</mt-button>
            <mt-button class="pickerSure" type="primary" @click="confirmPersonType">确定</mt-button>
          </mt-picker>
        </mt-popup>
      </mt-field>
    </div>
    <div class="personMessage">
      <mt-field label="人员电话" placeholder="系统自动获取" readonly="readonly" v-model="person.phone">
        <div v-if="person.phone !== ''" style="width: 40px; height: 40px;" @click="callPhone(person.phone)">
          <img class="phone" src="../img/phone.png">
        </div>
      </mt-field>
    </div>
    <div class="personMessage">
      <input type="hidden" v-model="person.costLevel"/>
      <mt-field label="人员级别" placeholder="系统自动获取" readonly="readonly" v-model="person.costLevelLabel"></mt-field>
    </div>
    <div class="personMessage">
      <mt-field label="人员工资" placeholder="系统自动获取" :readonly="powerReadonly" v-model="person.amount"></mt-field>
    </div>
    <div class="textareaMessage">
      <mt-field label="短信内容" type="textarea"  readonly="readonly" v-model="person.noteContent"></mt-field>
    </div>
    <!--<mt-tabbar class="person_save" >-->
    <div id="operatBut" class="map_button" style="display: inline-flex;">
      <mt-button class="person_save" style="width: calc(50vw); background-color: #26a2ff; color: #ffffff; font-size: 20px" type="default" @click="saveBanquetPerson"> 确认</mt-button>
      <mt-button class="send_message" style="width: calc(50vw); background-color: #ff800a; color: #ffffff; font-size: 20px" type="default" @click="sendMessage">发送短信({{sendTimes}})</mt-button>
    </div>
    <!--<mt-tab-item id="confirm" class="feast_confirm" @click.native.capture="saveBanquetPerson()">-->
        <!--确认-->
      <!--</mt-tab-item>-->
    <!--</mt-tabbar>-->
  </div>
</template>

<style>
  #addPerson .person_name {
    padding-top: 50px;
  }
  #addPerson .person_save {
    box-shadow: unset;
  }
  #addPerson .mint-field .mint-cell-title {
    width: 50px;
  }
  #addPerson .feast_confirm {
    background-color: #26a2ff;
    color: white;
  }
  #addPerson .mt-popup {
    width: calc(100vw);
  }
  #addPerson .mint-cell {
    min-height: 56px;
  }

  #addPerson .mint-cell-wrapper {
    font-size: 16px;
    font-weight: bold;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#fff), color-stop(50%, #fff), color-stop(50%, transparent));
  }
  #addPerson .mint-field .mint-cell-title {
   width: 80px;
  }
  #addPerson .mint-cell:last-child {
    background-image: linear-gradient(0deg, #fff, #fff 50%, transparent 50%);
  }
  #addPerson .mint-tab-item-label {
    font-size: 20px;
    line-height: inherit;
  }
  #addPerson .pickerSure {
    color: #26a2ff;
    background-color: #ffffff;
    /*position: absolute;*/
    /*right: 0;*/
    float: right;
    width: calc(50vw);
  }
  #addPerson .pickerCancel {
    /*position: absolute;*/
    width: calc(50vw);
    box-shadow: unset;
    -webkit-box-shadow: unset;
    background-color: #ffffff;
    color: #26a2ff;
  }
  #addPerson .mint-button:not(.is-disabled):active::after{
    opacity: 0;
  }
  /* 隐藏clear icon图标 */
  #addPerson .mint-field-clear {
    display: none !important;
  }
  #addPerson #choosePerson {
    padding-top: 50px;
  }
  #addPerson #choosePerson .mint-field .mint-cell-value {
    position:fixed;
    left: 89px;
  }
  #addPerson .selectImg {
    position: absolute;
    right: 4px;
  }
  #addPerson .personMessage{
    border-bottom: 1px #d9d9d9 solid;
  }
  #addPerson .phone {
    padding-left: 7px;
    width: 25px;
    height: 25px;
    top: 7px;
    position: relative;
  }
  #addPerson .textareaMessage{
    display: none;
    border-bottom: 1px #d9d9d9 solid;
  }
  #addPerson .textareaMessage .mint-field-core {
    font-family: Arial;
    height: 180px;
  }
</style>

<script>
import MintUI from 'mint-ui'
export default{
  name: 'addPerson',
  mounted () {
    let vm = this
    vm.initAddPerson()
  },
  methods: {
    callPhone (phone) {
      window.location.href = 'tel:' + phone
    },
    initAddPerson () {
      let vm = this
      if (vm.$route.query.banquetPersonId) {
        let id = vm.$route.query.banquetPersonId
        if (id !== '-1') {
          vm.person.id = id
          vm.getBanquetPersonById(id)
          $('.textareaMessage').css('display', 'block')
          vm.headTitle = '修改人员'
        } else {
          vm.headTitle = '新增人员'
        }
      } else {
        vm.headTitle = '新增人员'
      }
      if (vm.$route.query.backAddPersonId) {
        let id = vm.$route.query.backAddPersonId
        if (id !== '-1') {
          vm.person.id = id
          vm.headTitle = '修改人员'
          $('.textareaMessage').css('display', 'block')
        } else {
          vm.headTitle = '新增人员'
        }
        let bizPersonId = sessionStorage.getItem('bizPersonId')
        let name = sessionStorage.getItem('name')
        let phone = sessionStorage.getItem('phone')
        let costLevel = sessionStorage.getItem('costLevel')
        let costLevelLabel = sessionStorage.getItem('costLevelLabel')
        let amount = sessionStorage.getItem('amount')
        if (bizPersonId) {
          vm.person.bizPersonId = bizPersonId
          sessionStorage.removeItem('bizPersonId')
        }
        if (name) {
          vm.person.name = name
          sessionStorage.removeItem('name')
        }
        if (phone) {
          vm.person.phone = phone
          sessionStorage.removeItem('phone')
        }
        if (costLevel) {
          vm.person.costLevel = costLevel
          sessionStorage.removeItem('costLevel')
        }
        if (costLevelLabel) {
          vm.person.costLevelLabel = costLevelLabel
          sessionStorage.removeItem('costLevelLabel')
        }
        if (amount) {
          vm.person.amount = amount
          sessionStorage.removeItem('amount')
        }
      }
      if (vm.$route.query.banquetId) {
        vm.person.bizBanquetId = vm.$route.query.banquetId
        sessionStorage.setItem('bizBanquetId', vm.$route.query.banquetId)
      }
      let type = sessionStorage.getItem('type')
      let typeLabel = sessionStorage.getItem('typeLabel')
      let bizBanquetId = sessionStorage.getItem('bizBanquetId')
      let noteContent = sessionStorage.getItem('noteContent')
      if (type) {
        vm.person.type = type
        sessionStorage.removeItem('type')
      }
      if (typeLabel) {
        vm.person.typeLabel = typeLabel
        sessionStorage.removeItem('typeLabel')
      }
      if (bizBanquetId) {
        vm.mixedWinePersonUrl = '/mixedWinePerson?id=' + bizBanquetId
      }
      if (noteContent) {
        vm.person.noteContent = noteContent
        sessionStorage.removeItem('noteContent')
      }
      if (vm.$route.query.person) {
        let person = JSON.parse(vm.$route.query.person)
        if (person) {
          vm.person.bizPersonId = person.id
          vm.person.name = person.name
          vm.person.phone = person.phone
          vm.person.costLevel = person.costLevel
          vm.person.costLevelLabel = person.costLevelLabel
          vm.person.amount = person.amount
        }
        if (vm.$route.query.id) {
          vm.person.id = vm.$route.query.id
          vm.headTitle = '修改人员'
          $('.textareaMessage').css('display', 'block')
        } else {
          vm.headTitle = '新增人员'
        }
      }
      let banquetPersonId = sessionStorage.getItem('banquetPersonId')
      if (banquetPersonId) {
        vm.choosePersonUrl = '/choosePerson?id=' + vm.person.id
        sessionStorage.removeItem('banquetPersonId')
      }
      let roleId = localStorage.getItem('roleId')
      // let banquetState = sessionStorage.getItem('banquetState')
      // if (banquetState && roleId) {
      //   // 角色为批发商并且宴会状态为待备酒 不能操作宴会人员
      //   if (roleId === vm.$global.ROLE.PFS && banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_DBJ) {
      //     vm.clearFunctionAndHide()
      //   }
      //   // 角色为批发商并且宴会状态为已备酒 不能操作宴会人员
      //   if (roleId === vm.$global.ROLE.PFS && banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_YBJ) {
      //     vm.clearFunctionAndHide()
      //   }
      //   // 宴会状态为奖励 不能操作宴会人员
      //   if (banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_JL) {
      //     vm.clearFunctionAndHide()
      //   }
      // }
      // 调用宴会按钮权限控制
      let banquetButton = sessionStorage.getItem('banquetButton')
      banquetButton = JSON.parse(banquetButton)
      if (banquetButton) {
        if (banquetButton.add_person == 'true') {
        } else {
          vm.clearFunctionAndHide()
        }
      }
      vm.getPersonTypes()
    },
    sendMessage () {
      let vm = this
      let id = vm.person.id
      if (id) {
        let param = {
          id: id
        }
        vm.getPostData(vm.$global.SERVER_BANQUET_PERSON.SEND_MESSAGE, param, function (response) {
          if (response.data && response.data.state === 1) {
            MintUI.Toast(response.data.msg)
            vm.sendTimes = response.data.result.banquetPerson.sendTimes
          }
        })
      } else {
        MintUI.Toast('请先保存人员')
      }
    },
    clearFunctionAndHide () {
      /* eslint-disable */
      let vm = this
      vm.powerReadonly = true
      vm.clickChoosePerson = function () {}
      vm.showPersonTypes = function () {}
      $('#chosePersonType').css('display', 'none')
      $('#operatBut').css('display', 'none')
      $('#person').css('display', 'block')
    },
    clickChoosePerson () {
      let vm = this
      if (vm.person.id) {
        sessionStorage.setItem('banquetPersonId', vm.person.id)
      }
      if (vm.person.type) {
        sessionStorage.setItem('type', vm.person.type)
      }
      if (vm.person.typeLabel) {
        sessionStorage.setItem('typeLabel', vm.person.typeLabel)
      }
      if (vm.person.bizPersonId) {
        sessionStorage.setItem('bizPersonId', vm.person.bizPersonId)
      }
      if (vm.person.bizBanquetId) {
        sessionStorage.setItem('bizBanquetId', vm.person.bizBanquetId)
      }
      if (vm.person.name) {
        sessionStorage.setItem('name', vm.person.name)
      }
      if (vm.person.costLevel) {
        sessionStorage.setItem('costLevel', vm.person.costLevel)
      }
      if (vm.person.costLevelLabel) {
        sessionStorage.setItem('costLevelLabel', vm.person.costLevelLabel)
      }
      if (vm.person.phone) {
        sessionStorage.setItem('phone', vm.person.phone)
      }
      if (vm.person.amount) {
        sessionStorage.setItem('amount', vm.person.amount)
      }
      if (vm.person.noteContent) {
        sessionStorage.setItem('noteContent', vm.person.noteContent)
      }
    },
    closePersonType () {
      let vm = this
      vm.showPersonTypeList = false
    },
    confirmPersonType () {
      let vm = this
      vm.person.type = vm.choosePerson.type
      vm.person.typeLabel = vm.choosePerson.typeLabel
      vm.showPersonTypeList = false
    },
    getBanquetPersonById (id) {
      let vm = this
      let param = {}
      param.id = id
      vm.getPostData(vm.$global.SERVER_BANQUET_PERSON.GET_BANQUET_PERSON_BY_ID, param, function (response) {
        if (response.data && response.data.state === 1) {
          vm.person = response.data.result.banquetPerson
          vm.sendTimes = response.data.result.banquetPerson.sendTimes
          if (vm.person.typeLabel) {
            for (let i = 0; i < vm.personTypes[0].values.length; i++) {
              if (vm.person.typeLabel === vm.personTypes[0].values[i].label) {
                vm.personTypes[0].defaultIndex = i
              }
            }
          }
          vm.mixedWinePersonUrl = '/mixedWinePerson?id=' + vm.person.bizBanquetId
          vm.choosePersonUrl = '/choosePerson?id=' + vm.person.id
        }
      })
    },
    showPersonTypes () {
      let vm = this
      vm.showPersonTypeList = true
      if (vm.person.typeLabel) {
        for (let i = 0; i < vm.personTypes[0].values.length; i++) {
          if (vm.person.typeLabel === vm.personTypes[0].values[i].label) {
            if (vm.$refs.personType) {
              vm.$refs.personType.setValues([vm.personTypes[0].values[i]])
            }
          }
        }
      } else {
        if (vm.$refs.personType) {
          vm.$refs.personType.setValues([vm.personTypes[0].values[0]])
        }
      }
      $('#addPerson .main_content').css('overflow-y', 'scroll')
    },
    onPersonTypeChange (picker, values) {
      let vm = this
      let value = values[0]
      if (value) {
        vm.choosePerson.type = value.value
        vm.choosePerson.typeLabel = value.label
      }
    },
    getPersonTypes () {
      let vm = this
      vm.getPostData(vm.$global.SERVER_BANQUET_PERSON.GET_PERSONTYPES, '', function (response) {
        if (response.data && response.data.state === 1) {
          let typeList = response.data.result.typeList
          vm.personTypes[0].values = typeList
          if (typeList.length === 1) {
            vm.person.type = typeList[0].value
            vm.person.typeLabel = typeList[0].label
          }
        }
      })
    },
    saveBanquetPerson () {
      let vm = this
      if (!vm.person.bizPersonId) {
        MintUI.Toast('宴会人员不能为空')
        return
      }
      if (!vm.person.type) {
        MintUI.Toast('人员类型不能为空')
        return
      }
      let bizBanquetId = sessionStorage.getItem('bizBanquetId')
      vm.person.bizBanquetId = bizBanquetId
      vm.getPostData(vm.$global.SERVER_BANQUET_PERSON.SAVE_BANQUET_PERSON, vm.person, function (response) {
        MintUI.Toast(response.data.msg)
        vm.$router.push({
          path: vm.mixedWinePersonUrl
        })
      })
    }
  },
  data () {
    return {
      prcValue: '',
      showPersonList: false,
      showPersonTypeList: false,
      readonly: true,
      powerReadonly: false,
      person: {
        id: '',
        bizBanquetId: '',
        bizPersonId: '',
        name: '',
        type: '',
        typeLabel: '',
        phone: '',
        costLevel: '',
        costLevelLabel: '',
        amount: '',
        noteContent: ''
      },
      choosePerson: {
        bizPersonId: '',
        name: '',
        phone: '',
        costLevel: '',
        costLevelLabel: '',
        amount: '',
        type: '',
        typeLabel: ''
      },
      personTypes: [
        {
          flex: -1,
          values: [],
          className: 'slot2',
          textAlign: 'center'
        }
      ],
      mixedWinePersonUrl: '',
      headTitle: '',
      choosePersonUrl: '/choosePerson',
      sendTimes: 0
    }
  }
}
</script>
<style scoped>
</style>
