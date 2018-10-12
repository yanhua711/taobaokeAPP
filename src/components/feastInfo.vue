<!--宴会信息-->
<template>
  <div id="feastInfo">
    <mt-header class="main_head" fixed title="宴会信息">
      <router-link :to="feastBackUrl" slot="left">
        <mt-button>
          <img height="35" width="35" src="../img/back.png">
        </mt-button>
      </router-link>
    </mt-header>
    <div class="main_content">
      <div class="feast_content">
        <div style="border-bottom: 6px solid #d9d9d9">
          <div class="field_cell">
            <input type="hidden" v-model="banquet.id"/>
            <mt-field label="宴会名称" placeholder="请输入宴会名称(必填)" :readonly="banquetReadonly" v-model="banquet.name" :attr="{maxlength:100}" >
            </mt-field>
          </div>
          <div class="field_cell">
            <mt-field label="宴会类型" placeholder="请选择宴会类型(必填)" v-model="banquet.type" class="select" readonly="readonly" @click.native.capture="showType()">
              <img style="width: 14px; height: 14px;" src="../img/drop_down.png" class="selectImg">
              <mt-popup v-model="banquetType" position="bottom" class="mt-popup">
                <mt-picker ref="banquetTypePicker" style="width: calc(100vw);" :showToolbar="readonly" :slots="types" @change="onTypeChange">
                  <mt-button class="pickerCancel" @click="closeType">取消</mt-button>
                  <mt-button class="pickerSure" type="primary" @click="confirmType">确定</mt-button>
                </mt-picker>
              </mt-popup>
            </mt-field>
          </div>
          <div class="field_cell">
            <mt-field label="宴会桌数" placeholder="请输入宴会桌数(必填)" :readonly="banquetReadonly"  v-model="banquet.tableQty" :attr="{maxlength:10}"></mt-field>
          </div>
          <div class="field_cell" id="realTableQty" style="display: none">
            <mt-field label="实际桌数"  placeholder="请输入实际桌数(必填)"   :readonly="YBJReadonly"  v-model="banquet.realTableQty" :attr="{maxlength:10}"></mt-field>
          </div>
        </div>
        <div  style="border-bottom: 6px solid #d9d9d9">
          <div class="field_cell">
            <mt-field ref="feastTime" class="calendarPiker" label="宴会日期" placeholder="请选择宴会日期(必填)" v-model="banquet.banquetDate" :disableClear="readonly" :readonly="readonly" @focus.native.capture="showCalendar()">
              <mt-popup class="calendar_popup" v-model="datePickerFlag">
                <calendar ref="calendarPiker" v-show="datePickerFlag" class="event-calendar" v-model="banquet.banquetDate" :hasInput="hasInput"
                          :disabled-days-of-week="disabled" :format="format" :clear-button="clear"
                          :placeholder="placeholder" :pane="1" :has-input="false" :on-day-click="onDayClick"
                          :change-pane="changePane">
                  <div class="event" v-for="(evt, index) in lurevents" :key="index" :slot="evt.date">
                    <div style="font-size:12px;" v-html="evt.content"></div>
                  </div>
                </calendar>
              </mt-popup>
            </mt-field>
          </div>
          <mt-checklist class="banquetCheckList"
            align="right"
            title=""
            v-if="banquet.id == '' || banquet.id == undefined"
            v-model="banquetTimeCheckListValue"
            :options="banquetTimeCheckListOptions">
          </mt-checklist>
          <div class="field_cell" v-show="!banquet.showBanquetTime">
            <mt-field label="宴会时间" placeholder="请选择宴会时间(必填)" readonly="readonly" v-model="banquet.banquetTime" @click.native.capture="openPicker()">
              <mt-datetime-picker
                ref="banquetTime"
                v-model="banquet.banquetTime"
                type="time">
              </mt-datetime-picker>
            </mt-field>
          </div>
          <div class="field_cell" v-show="banquet.showBanquetTime">
            <mt-field label="宴会时间1" placeholder="请选择宴会时间1(必填)" readonly="readonly" v-model="banquet.multiBanquetTimeFirst" @click.native.capture="openPicker1()">
              <mt-datetime-picker
                ref="banquetTime1"
                v-if="banquet.id == '' || banquet.id == undefined"
                v-model="banquet.multiBanquetTimeFirst"
                type="time">
              </mt-datetime-picker>
            </mt-field>
          </div>
          <div class="field_cell" v-show="banquet.showBanquetTime">
            <mt-field label="宴会时间2" placeholder="请选择宴会时间2" readonly="readonly" v-model="banquet.multiBanquetTimeSecond" @click.native.capture="openPicker2()">
              <mt-datetime-picker
                ref="banquetTime2"
                v-if="banquet.id == '' || banquet.id == undefined"
                v-model="banquet.multiBanquetTimeSecond"
                type="time">
              </mt-datetime-picker>
            </mt-field>
          </div>
          <div class="field_cell" v-show="banquet.showBanquetTime">
            <mt-field label="宴会时间3" placeholder="请选择宴会时间3" readonly="readonly" v-model="banquet.multiBanquetTimeThird" @click.native.capture="openPicker3()">
              <mt-datetime-picker
                ref="banquetTime3"
                v-if="banquet.id == '' || banquet.id == undefined"
                v-model="banquet.multiBanquetTimeThird"
                type="time">
              </mt-datetime-picker>
            </mt-field>
          </div>
        </div>
        <!--<div class="field_cell">
            <mt-field label="宴会编号" placeholder="" type="" v-model="banquet.banquetNo" readonly="readonly"  ></mt-field>
          </div>-->
        <div style="border-bottom: 6px solid #d9d9d9">
          <div class="field_cell">
            <mt-field label="宴会地址" placeholder="请选择宴会地址(必填)" v-model="banquet.area" readonly="readonly" @click.native.capture="showAddressPiker()">
              <mt-popup v-model="popupVisible" position="bottom">
                <mt-picker ref="addressPiker" style="width: calc(100vw);" :showToolbar="readonly" :slots="myAddressSlots" @change="onMyAddressChange">
                  <!--<div class="pickerCancel">取消</div>
                  <div class="pickerSure">确定</div>-->
                  <mt-button class="pickerCancel" @click="closeAddress">取消</mt-button>
                  <mt-button class="pickerSure" type="primary" @click="confirmAddress">确定</mt-button>
                </mt-picker>
              </mt-popup>
            </mt-field>
          </div>
          <div class="field_cell">
            <mt-field label="详细地址" placeholder="请输入详细地址(必填)" :readonly="banquetReadonly" v-model="banquet.address" :attr="{maxlength:255}">
              <div style="width: 40px; height: 40px;" @click="openMap()">
                <img class="location" style="top: 7px; position: relative" src="../img/location.png">
              </div>
              <mt-popup class="map_popup" v-model="showMap" position="right">
                <div id="container" class="amap-page-container" style="width: calc(100vw); height: calc(100vh - 85px);">
                  <mt-field class="search-box" placeholder="点击搜索" readonly="readonly" v-model="mapSearchOption.searchInput"></mt-field>
                  <el-amap vid="amapDemo" ref="aMap" :center="aMapOption.mapCenter" :zoom="aMapOption.zoom" class="amap-demo" :events="aMapOption.events">
                    <el-amap-marker v-for="(marker, index) in aMapOption.markers" :key="index" :position="marker" ></el-amap-marker>
                  </el-amap>
                  <div class="map_button" style="display: inline-flex;">
                    <mt-button style="width: calc(50vw); background-color: #26a2ff; color: #ffffff;" type="default" @click="mapChooseConfirm">确定</mt-button>
                    <mt-button style="width: calc(50vw); background-color: #9d9d9d; color: #ffffff;" type="default" @click="closeMap">取消</mt-button>
                  </div>
                </div>
              </mt-popup>
              <mt-popup class="map_search_popup" v-model="mapSearchOption.showMapSearch" position="right">
                <mt-field id="pickerInput" placeholder="输入关键字选取地点" v-model="mapSearchOption.searchInput">
                  <mt-button style="margin-left: 10px; background-color: #9d9d9d; color: #ffffff;" type="default" size="small" @click="closeSearchPopup">取消</mt-button>
                </mt-field>
                <div id="poiInfo"></div>
              </mt-popup>
            </mt-field>
          </div>
        </div>
        <div style="border-bottom: 6px solid #d9d9d9">
          <div class="field_cell">
            <mt-field label="小组长" placeholder="请选择小组长(必填)" v-model="banquet.groupName" class="select"  readonly="readonly" @click.native.capture="showGroup()">
              <img style="width: 14px; height: 14px;" src="../img/drop_down.png" class="selectImg">
              <mt-popup v-model="banquetGroup" position="bottom" class="mt-popup">
                <mt-picker ref="banquetGroupPicker" style="width: calc(100vw);" :showToolbar="readonly" value-key="sysUserName" :slots="groups" @change="onGroupChange">
                  <mt-button class="pickerCancel" @click="closeGroup">取消</mt-button>
                  <mt-button class="pickerSure" type="primary" @click="confirmGroup" >确定</mt-button>
                </mt-picker>
              </mt-popup>
            </mt-field>
          </div>
          <div class="field_cell">
            <mt-field label="组长电话" readonly="readonly" v-model="banquet.phoneNumber">
              <div v-if="banquet.phoneNumber !== ''" style="width: 40px; height: 40px;" @click="callPhone(banquet.phoneNumber)">
                <img class="phone" src="../img/phone.png">
              </div>
            </mt-field>
          </div>
          <!--<div class="field_cell">-->
            <!--<mt-field label="调酒人数" placeholder="请输入调酒人数" :readonly="banquetReadonly" v-model="banquet.bartenderQty"   :attr="{maxlength:10}" ></mt-field>-->
          <!--</div>-->
          <!--<div class="field_cell">-->
            <!--<mt-field label="模特人数" placeholder="请输入模特人数" :readonly="banquetReadonly" v-model="banquet.modelQty"   :attr="{maxlength:10}"></mt-field>-->
          <!--</div>-->
        </div>
        <div class="field_cell">
          <mt-field label="联系人" placeholder="请输入联系人(必填)"  :readonly="banquetReadonly" v-model="banquet.contactsName" :attr="{maxlength:100}"></mt-field>
        </div>
        <div class="field_cell">
          <mt-field label="联系电话" placeholder="请输入联系电话(必填)"  :readonly="banquetReadonly"  v-model="banquet.contactsPhone" :attr="{maxlength:11}">
            <div v-if="banquet.contactsPhone !== ''" style="width: 40px; height: 40px;" @click="callPhone(banquet.contactsPhone)">
              <img class="phone" src="../img/phone.png">
            </div>
          </mt-field>
        </div>
        <div class="field_cell" id="customerName">
          <mt-field label="客户姓名" placeholder="请输入客户姓名" :readonly="YBJReadonly"  v-model="banquet.customerName" :attr="{maxlength:100}"></mt-field>
        </div>
        <div class="field_cell" id="customerPhone">
          <mt-field label="客户电话" placeholder="请输入客户电话" :readonly="YBJReadonly"  v-model="banquet.customerPhone" :attr="{maxlength:11}">
            <div v-if="banquet.customerPhone !== ''" style="width: 40px; height: 40px;" @click="callPhone(banquet.customerPhone)">
              <img class="phone" src="../img/phone.png">
            </div>
          </mt-field>
        </div>
        <div class="textarea_cell" style="">
          <mt-field label="备注"  placeholder="请输入备注" type="textarea" :readonly="YBJReadonly"  v-model="banquet.remarks" :attr="{maxlength:250}"></mt-field>
        </div>
        <div class="textarea_cell" id="otherGoods" style="display: none">
          <mt-field label="其他竞品"  placeholder="请输入其他竞品"  type="textarea" :readonly="YBJReadonly"  v-model="banquet.otherGoods" :attr="{maxlength:250}"></mt-field>
        </div>
        <div class="textarea_cell" id="openBottleRemark" style="display: none">
          <mt-field label="开瓶率低原因"  placeholder="请输入开瓶率低原因" type="textarea"  :readonly="YBJReadonly"  v-model="banquet.openBottleRemark" :attr="{maxlength:250}"></mt-field>
        </div>
      </div>
      <div class="single_cell">
        <div class="choose_wine">
          <mt-cell title="选酒"  @click.native.capture="chooseWine()" is-link="">
            <img slot="icon" src="../img/add.png" width="25" height="25">
            <span style="padding-right: 5px">预 {{banquet.countWines}}瓶</span>
            <div v-if="(roleId == $global.ROLE.PFS && banquet.state == $global.BANQUET_STATE.BANQUET_STATE_JL) || (roleId == $global.ROLE.GROUP_LEADER && (banquet.state == $global.BANQUET_STATE.BANQUET_STATE_YBJ || banquet.state == $global.BANQUET_STATE.BANQUET_STATE_JL))">
              <span style="padding-right: 5px">|</span>
              <span style="padding-right: 5px" v-if="banquet.realCountWines && banquet.realCountWines != 0">实 {{banquet.realCountWines}}瓶</span>
              <span style="padding-right: 5px; color: red" v-else>实 0瓶</span>
            </div>
          </mt-cell>
        </div>
      </div>
      <div class="single_cell" id="feastPerson" style="display: none">
        <div class="mixed_wine">
          <mt-cell title="人员" is-link=""  @click.native.capture="toMixedPerson()">
            <img slot="icon" src="../img/addPerson.png" width="25" height="25">
            <span>{{banquet.countPersons}}人</span>
          </mt-cell>
        </div>
      </div>
      <div class="single_cell" id="banquetCost" style="display: none">
        <div class="mixed_wine">
          <mt-cell title="奖励" is-link="" @click.native.capture="toBanquetCostList()">
            <img slot="icon" src="../img/cost.png" width="25" height="25">
            <span>{{banquet.realCountCost ? banquet.realCountCost : 0}}元</span>
            <span></span>
          </mt-cell>
        </div>
      </div>
      <!--<div class="single_cell" id="banquetAward" style="display: none">-->
        <!--<div class="mixed_wine">-->
          <!--<mt-cell title="奖励" is-link="" @click.native.capture="toBanquetCostList()">-->
            <!--<img slot="icon" src="../img/cost.png" width="25" height="25">-->
            <!--<span>{{banquet.realCountCost ? banquet.realCountCost : 0}}元</span>-->
            <!--<span></span>-->
          <!--</mt-cell>-->
        <!--</div>-->
      <!--</div>-->
      <div class="single_cell" id="photoScene" style="display: none">
        <div class="mixed_wine">
          <mt-cell title="现场照片" :to="photoSceneUrl" is-link=""  @click.native.capture="clickSavebanquetInfo()">
            <img slot="icon" src="../img/photo01.png" width="24" height="24">
            <span style="padding-right: 5px;" v-if="isUpload">已上传</span>
            <span style="padding-right: 5px; color: red" v-else>未上传</span>
            <span></span>
          </mt-cell>
        </div>
      </div>
      <div style="border-top: 8px solid #d9d9d9;">
      </div>
      <div id="operatBut" class="map_button" style="display: inline-flex;">
        <mt-button id="saveBanquet" style="width: calc(50vw); background-color: #26a2ff; color: #ffffff; display: none" type="default" @click="saveBanquet">保存</mt-button>
        <mt-button id="forWine" style="width: calc(50vw); background-color: #26a2ff; color: #ffffff; display: none" type="default" @click="forWine">备酒</mt-button>
        <mt-button id="save_temporary" style="width: calc(50vw); background-color: #26a2ff; color: #ffffff; display: none" type="default" @click="save_temporary">暂存</mt-button>
        <mt-button id="commit" style="width: calc(50vw); background-color: #ff800a; color: #ffffff; display: none" type="default" @click="temporaryCommit">提交</mt-button>
        <mt-button id="confirmBanquet" style="width: calc(50vw); background-color: #ff800a; color: #ffffff; display: none" type="default" @click="confirmBanquet">确认</mt-button>
        <mt-button id="review" style="width: calc(50vw); background-color: #ff800a; color: #ffffff; display: none" type="default" @click="review()">复核</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import MintUI from 'mint-ui'
import Calendar from 'vue2-slot-calendar'
import lunar from '../utils/lunar.js'
// import myaddress from '../utils/pca.json'
export default {
  name: 'feastInfo',
  mounted: function () {
    /* eslint-disable */
    let vm = this
    vm.getAddress()
    if (!vm.initFlag) {
      if (vm.myAddressProvince && vm.myAddressCity && vm.myAddressCounty) {
        vm.banquet.area = vm.myAddressProvince + '-' + vm.myAddressCity + '-' + vm.myAddressCounty
      }
      if (vm.myAddressProvince && vm.myAddressCity && !vm.myAddressCounty) {
        vm.banquet.area = vm.myAddressProvince + '-' + vm.myAddressCity
      }
      if (vm.myAddressProvince && !vm.myAddressCity && !vm.myAddressCounty) {
        vm.banquet.area = vm.myAddressProvince
      }
    }
    let roleId = localStorage.getItem('roleId')
    vm.roleId = roleId
    if (vm.$route.fullPath) {
      let id = vm.$route.query.id
      // 从我的消息列表 获取返回跳转url的标志
      if (vm.$route.query.flag){
        sessionStorage.setItem('messageFlag', vm.$route.query.flag)
      }
      if (id) {
        if(roleId === vm.$global.ROLE.ADMIN || roleId === vm.$global.ROLE.GROUP_LEADER){
          $("#feastPerson").css("display", "block")
          sessionStorage.setItem("infoFlag", 'info')
        } else{
          $("#feastPerson").css("display", "none")
        }
      }else{
        vm.getType()
        vm.getGroup()
      }
      vm.feastBackUrl = '/feastMain'
      vm.getBanquetById (id)
    }
    // 如果标志存在就跳转到 我的消息列表
    let messageFlag = sessionStorage.getItem('messageFlag')
    if (messageFlag){
      vm.feastBackUrl = '/messageList'
    }
    // 获取从 我的宴会 跳转到宴会列表的宴会状态
    let state = sessionStorage.getItem('state')
    if(state){
      vm.feastBackUrl = '/feastMain?state=' + state
    }
    vm.$nextTick(function () {
      if (!vm.banquet.id) {
        let banquetInfo = JSON.parse(localStorage.getItem('banquetInfo'))
        if (banquetInfo) {
          vm.banquet = banquetInfo
          if (vm.banquet.showBanquetTime && !vm.banquetTimeCheckListValue.length) {
            vm.banquetTimeCheckListValue = ['1']
          }
        } else {
          vm.banquet.banquetTime = '08:00'
        }
      }
      sessionStorage.removeItem('bizBanquetId')
      let wineList = JSON.parse(localStorage.getItem('wineList')) || []
      if (wineList){
        let countWines = 0
        for (let i = 0; i < wineList.length; i++) {
          countWines += parseInt(wineList[i].bottleNumber)
        }
        vm.banquet.countWines = countWines
      }
      vm.disabledScroll()
    })
  },
  methods: {
    getAddress () {
      let vm= this
      vm.getPostData(vm.$global.SERVER_BANQUET.GET_ADDRESS, '', function (response) {
        if (response.data.result.area) {
          vm.myaddress = response.data.result.area
          let myaddressArray = Object.keys(vm.myaddress)
          if (myaddressArray.length) {
            vm.myAddressSlots[0].values = myaddressArray
          }
        }
      })
    },
    toBanquetCostList () {
      let vm = this
      vm.clickSavebanquetInfo()
      let parm = {}
      parm.banquetId = vm.banquet.id
      vm.getPostData(vm.$global.SERVER_BANQUET_COST.GET_BANQUET_COST_LIST, parm, function (response) {
        if (response.data && response.data.state === 1) {
          if (response.data.result.costList.length === 0) {
            sessionStorage.setItem('bizBanquetId', vm.banquet.id)
            vm.$router.push({
              path: '/addBanquetCost?banquetId=' + vm.banquet.id
            })
          } else {
            vm.$router.push({
              path: vm.banquetCostListUrl
            })
          }
        }
      })
    },
    toMixedPerson () {
      let vm = this
      vm.clickSavebanquetInfo()
      let parm = {}
      parm.banquetId = vm.banquet.id
      vm.getPostData(vm.$global.SERVER_BANQUET_PERSON.GET_BANQUET_PERSON_LIST, parm, function (response) {
        if (response.data && response.data.state === 1) {
          if (response.data.result.personList.length === 0) {
            vm.$router.push({
              path: '/addPerson?banquetId=' + vm.banquet.id
            })
          } else {
            vm.$router.push({
              path: vm.mixedWinePersonUrl
            })
          }
        }
      })
    },
    callPhone (phone) {
      window.location.href = 'tel:' + phone
    },
    review (){ //复核
      let vm = this
      if(vm.banquet.realTableQty){
        if(!vm.$global.REGEX.IS_INTEGER.test(vm.banquet.realTableQty)){
          MintUI.Toast('实际桌数只能为正整数')
          return
        }
      }else{
        MintUI.Toast('实际桌数不能为空')
        return
      }
      let openBottle = vm.banquet.realStandardQty / vm.banquet.realTableQty
      if(openBottle < 0.35){
        if(!vm.banquet.openBottleRemark){
          MintUI.Toast('开瓶率少于35%，请填开瓶率低原因')
          return
        }
      }
      let param = {
        bizBanquetId: vm.banquet.id
      }
      vm.getPostData(vm.$global.SERVER_BANQUET_PHOTO.PHOTO_SCENE, param, function (response) {
        let bp = response.data.result.banquetPhoto
        if (!bp || !bp.display) {
          MintUI.Toast('请先上传现场照片')
          vm.isReview = false
        }
        vm.getPostData(vm.$global.SERVER_BANQUET_WINE.GET_BANQUET_WINE_LIST, {banquetId: vm.banquet.id}, function (response) {
          if (response.data && response.data.state === 1) {
            let result = response.data.result.wineList
            if (result && result.length > 0){
              for (let i = 0; i < result.length; i++) {
                if(!result[i].realBottleNumber){
                  vm.isReview = false
                  MintUI.Toast('请先在选酒页面填写消费瓶数')
                }
              }
            }
            setTimeout(function() {
              if (!vm.isReview) {
                return
              }else{
                MintUI.MessageBox.confirm('确定已复核吗？').then(action => {
                  if (vm.isReview){
                    vm.banquet.stateFlag = vm.$global.BANQUET_STATE.BANQUET_STATE_JL
                    vm.saveBanquet()
                  }else{
                    MintUI.Toast('您还未在选酒页面填写消费瓶数或没上传现场照片')
                  }
                })
              }
            }, 200)
          }
        })
      })
    },
    disabledScroll () {
      $('.main_content').on('click', '.v-modal', function () {
        $('#feastInfo .main_content').css('overflow-y', 'scroll');
      })
    },
    forWine () { //备酒
      let vm = this
      if(!vm.banquet.customerName){
        MintUI.Toast('请填写宴会主人信息用于发送备酒提醒')
        return
      }
      if(!vm.banquet.customerPhone){
        MintUI.Toast('请填写宴会主人信息用于发送备酒提醒')
        return
      }else{
        if(!vm.$global.REGEX.IS_PHONE.test(vm.banquet.customerPhone)){
          MintUI.Toast('客户电话格式为合法的11位手机号码')
          return
        }
      }
      MintUI.MessageBox.confirm('确定已备酒吗？').then(action => {
        vm.getPostData(vm.$global.SERVER_BANQUET.BANQUET_FOR_WINE, vm.banquet, function (response) {
          MintUI.Toast(response.data.msg)
          let state = sessionStorage.getItem('state')
          if(state){
            vm.feastBackUrl = '/feastMain?state=' + state
          }
          vm.$router.push({
            path: vm.feastBackUrl
          })
        })
      });

    },
    clearFunction () {
      let vm = this
      vm.showType = function () {}
      vm.showCalendar = function () {}
      vm.onDayClick = function () {}
      vm.changePane = function () {}
      vm.showAddressPiker = function () {}
      vm.openMap = function () {}
      vm.openPicker = function () {}
      vm.showGroup = function () {}
    },
    closeType () {
      let vm = this
      vm.banquetType = false
      $('#feastInfo .main_content').css('overflow-y', 'scroll');
    },
    confirmType () {
      let vm = this
      vm.banquet.type = vm.chooseType
      vm.banquetType = false
      if (vm.$refs.banquetTypePicker) {
        if(vm.banquet.type){
          for (let i = 0; i < vm.types[0].values.length; i++){
            if(vm.types[0].values[i] === vm.banquet.type){
              vm.types[0].defaultIndex = i
              vm.$refs.banquetTypePicker.setValues([vm.types[0].values[i]])
            }
          }
        } else{
          vm.$refs.banquetTypePicker.setValues([vm.types[0].values[0]])
        }
      }
      $('#feastInfo .main_content').css('overflow-y', 'scroll');
    },
    closeGroup () {
      let vm = this
      vm.banquetGroup = false
      $('#feastInfo .main_content').css('overflow-y', 'scroll');
    },
    confirmGroup () {
      let vm = this
      vm.banquet.groupId = vm.chooseGroupId
      vm.banquet.groupName = vm.chooseGroupName
      vm.banquet.phoneNumber = vm.choosePhoneNumber
      vm.banquetGroup = false
      $('#feastInfo .main_content').css('overflow-y', 'scroll');
    },
    closeAddress () {
      let vm = this
      vm.popupVisible = false
      $('#feastInfo .main_content').css('overflow-y', 'scroll');
    },
    confirmAddress () {
      let vm = this
      vm.myAddressProvince = vm.cacheAddress.province
      vm.myAddressCity = vm.cacheAddress.city
      vm.myAddressCounty = vm.cacheAddress.district
      vm.changeAddressPicker()
      vm.popupVisible = false
      vm.banquet.groupName =''
      vm.banquet.groupId =''
      vm.banquet.address =''
      $('#feastInfo .main_content').css('overflow-y', 'scroll');
      vm.getGroup()
      vm.setMapCenter()
    },
    closeSearchPopup () {
      let vm = this
      vm.mapSearchOption.showMapSearch = false
    },
    setMapCenter () {
      let vm = this
      if (vm.myAddressCity) {
        let geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all"
        })
        geocoder.getLocation(vm.myAddressCity + vm.myAddressCounty, function (status, result) {
          if (status === 'complete') {
            vm.aMapOption.mapCenter = [result.geocodes[0].location.lng, result.geocodes[0].location.lat]
          } else {
            MintUI.Toast('定位失败')
          }
        })
      }
    },
    mapChooseConfirm () {
      let vm = this
      vm.myAddressProvince = vm.cacheAddress.province
      vm.myAddressCity = vm.cacheAddress.city
      vm.myAddressCounty = vm.cacheAddress.district
      vm.banquet.address = vm.cacheAddress.address
      vm.changeAddressPicker()
      vm.closeMap()
      vm.banquet.groupName =''
      vm.banquet.groupId =''
      vm.getGroup()
    },
    aMapClick (e) {
      let vm = this
      let { lng, lat } = e.lnglat
      vm.aMapOption.mapCenter = [lng, lat]
      // 这里通过高德 SDK 完成。
      vm.changeAddressByPoint(lng, lat)
    },
    changeAddressByPoint (lng, lat) {
      let vm = this
      let geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
      })
      geocoder.getAddress([lng ,lat], function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.regeocode) {
            vm.cacheAddress.province = result.regeocode.addressComponent.province
            vm.cacheAddress.city = result.regeocode.addressComponent.city || result.regeocode.addressComponent.province
            vm.cacheAddress.district = result.regeocode.addressComponent.district
            vm.cacheAddress.township = result.regeocode.addressComponent.township
            if(vm.cacheAddress.district == '晋江市') {
              let towns = vm.$global.JING_NAN_SIX_TOWN
              for (let i = 0; i < towns.length; i++) {
                if (vm.cacheAddress.township == towns[i]) {
                  vm.cacheAddress.district = vm.$global.JIN_JIANG.SIX_TOWN
                  break
                } else {
                  vm.cacheAddress.district = vm.$global.JIN_JIANG.OTHER
                }
              }
            }
            if (result.regeocode.formattedAddress) {
              vm.cacheAddress.address = result.regeocode.formattedAddress
                .replace(vm.cacheAddress.province, '').replace(vm.cacheAddress.city, '')
                .replace(vm.cacheAddress.district, '')
            } else {
              vm.cacheAddress.address = ''
            }
          }
        }
      })
    },
    onSearchResult(pois) {
      let vm = this
      let latSum = 0;
      let lngSum = 0;
      if (pois.length > 0) {
        vm.aMapOption.markers = []
        pois.forEach(poi => {
          let {lng, lat} = poi;
          lngSum += lng;
          latSum += lat;
          // vm.aMapOption.markers.push([poi.lng, poi.lat]);
        });
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
        vm.aMapOption.mapCenter = [center.lng, center.lat];
        vm.changeAddressByPoint(center.lng, center.lat)
      }
    },
    init: function () {
      let vm = this
      if (vm.aMapOption.initMap) {
        vm.setMapCenter(vm.myAddressCity)
        vm.aMapOption.initMap = false
      }
      // let geolocation = new AMap.Geolocation()
      // AMap.plugin(['AMap.Geolocation'], function () {
      //   // vm.$refs.aMap.$$getInstance().addControl(new AMap.ToolBar({liteStyle: true}))
      //   // vm.$refs.aMap.$$getInstance().addControl(new AMap.Scale())
      //   vm.$refs.aMap.$$getInstance().addControl(geolocation)
      // })
      // AMap.event.addListener(geolocation, 'complete', function (data) {
      //   vm.cacheAddress.province = data.addressComponent.province
      //   vm.cacheAddress.city = data.addressComponent.city
      //   vm.cacheAddress.district = data.addressComponent.district
      //   if (data.addressComponent.formattedAddress) {
      //     vm.cacheAddress.address = data.addressComponent.formattedAddress
      //       .replace(vm.cacheAddress.province, '').replace(vm.cacheAddress.city, '')
      //       .replace(vm.cacheAddress.district, '')
      //   } else {
      //     vm.cacheAddress.address = ''
      //   }
      // })
      // AMap.event.addListener(geolocation, 'error', function (data) {
      //   MintUI.Toast('定位失败')
      // })
      AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
        let positionPicker = new PositionPicker({
          map: vm.$refs.aMap.$$getInstance()
        });

        positionPicker.on('success', function(positionResult) {
          console.log(positionResult)
          vm.cacheAddress.province = positionResult.regeocode.addressComponent.province
          vm.cacheAddress.city = positionResult.regeocode.addressComponent.city
          vm.cacheAddress.district = positionResult.regeocode.addressComponent.district
          vm.cacheAddress.township = positionResult.regeocode.addressComponent.township
          let towns = vm.$global.JING_NAN_SIX_TOWN
          if(vm.cacheAddress.district == '晋江市'){
            for (let i = 0; i < towns.length; i++) {
              if(vm.cacheAddress.township == towns[i]){
                vm.cacheAddress.district = vm.$global.JIN_JIANG.SIX_TOWN
                break
              }else{
                vm.cacheAddress.district = vm.$global.JIN_JIANG.OTHER
              }
            }
          }
          if (positionResult.address) {
            vm.cacheAddress.address = positionResult.address
              .replace(vm.cacheAddress.province, '').replace(vm.cacheAddress.city, '')
              .replace(vm.cacheAddress.district, '')
          } else {
            vm.cacheAddress.address = ''
          }
        });
        positionPicker.on('fail', function(positionResult) {
          MintUI.Toast('获取位置信息失败')
        });
        positionPicker.start();
        vm.$refs.aMap.$$getInstance().panBy(0, 1);
      })

      AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {
        var poiPicker = new PoiPicker({
          input: $('#pickerInput').find("input").get(0)
        });
        poiPickerReady(poiPicker);
      })

      function poiPickerReady(poiPicker) {
        poiPicker.on('poiPicked', function(poiResult) {
          console.log(poiResult.item)
          vm.mapSearchOption.searchInput = poiResult.item.name
          vm.aMapOption.mapCenter = [poiResult.item.location.lng, poiResult.item.location.lat]
          vm.changeAddressByPoint(poiResult.item.location.lng, poiResult.item.location.lat)
          vm.mapSearchOption.showMapSearch = false
        });
      }

      $('#feastInfo .search-box input').on('click', function() {
        vm.mapSearchOption.showMapSearch = true
      })
    },
    getBanquetById (id) {
      let vm = this
      let parm = {}
      MintUI.Indicator.open()
      if(id){
        parm.id = id
        vm.getPostData(vm.$global.SERVER_BANQUET.GET_BANQUET_BY_ID, parm, function (response) {
          if (response.data && response.data.state === 1) {
            let banquetInfo = sessionStorage.getItem('banquetInfo')
            if (banquetInfo) {
              vm.banquet = JSON.parse(banquetInfo)
              vm.banquet.countWines = response.data.result.banquet.countWines
              vm.banquet.realCountWines = response.data.result.banquet.realCountWines
              vm.banquet.countPersons = response.data.result.banquet.countPersons
              vm.banquet.countCost = response.data.result.banquet.countCost
              vm.banquet.realCountCost = response.data.result.banquet.realCountCost
              vm.banquet.realStandardQty = response.data.result.banquet.realStandardQty
            } else {
              // 处理宴会时间，因为时间空间需要的格式是 ss:mm
              let banquetTime = response.data.result.banquet.banquetTime
              banquetTime = banquetTime.substr(0,banquetTime.lastIndexOf(':'))
              response.data.result.banquet.banquetTime = banquetTime
              vm.banquet = response.data.result.banquet
            }
            vm.wineUrl = '/wine?banquetId=' + vm.banquet.id
            vm.mixedWinePersonUrl = response.data.result.mixedWinePersonUrl
            vm.banquetCostListUrl = '/banquetCostList?id=' + vm.banquet.id
            let area = response.data.result.banquet.area.split('-')
            if (area && area.length === 3) {
              vm.myAddressProvince = area[0]
              vm.myAddressCity = area[1]
              vm.myAddressCounty = area[2]
            }

            vm.getGroup()
            vm.getType()
            let banquetState = vm.banquet.state
            sessionStorage.setItem("banquetState", banquetState)
            let banquetButton = response.data.result.banquetButton
            if(banquetButton){
              // 设置宴会按钮权限
              sessionStorage.setItem("banquetButton", JSON.stringify(banquetButton))
              if(banquetButton.save_temporary != 'true' && banquetButton.save != 'true' && banquetButton.save_bj != 'true'){
                $('#operatBut').css('display', 'none')
              }
              if(banquetButton.save_temporary == 'true'){ // 暂存
                $('#save_temporary').css('display', 'block')
              }
              if(banquetButton.commit == 'true'){ // 提交
                $('#commit').css('display', 'block')
              }
              if(banquetButton.save == 'true'){ // 保存
                $('#saveBanquet').css('display', 'block')
                if(banquetButton.confirm != 'true' && banquetButton.review != 'true'){
                  $('#saveBanquet').css('width', 'calc(100vw)')
                }
              }
              if(banquetButton.confirm == 'true'){ // 确认
                $('#confirmBanquet').css('display', 'block')
              }
              if(banquetButton.save_bj == 'true'){ // 备酒
                vm.banquetReadonly = true
                vm.clearFunction()
                $('#forWine').css('display', 'block')
                $('#forWine').css('width', 'calc(100vw)')
              }
              if(banquetButton.personTab == 'true'){ // 宴会人员
                $('#feastPerson').css('display', 'block')
                sessionStorage.setItem("infoFlag", 'info')
              }
              if(banquetButton.review == 'true'){ // 复核
                $('#personTab').css('display', 'block')
                $('#review').css('display', 'block')
                $('#realTableQty').css('display', 'block')
                $('#otherGoods').css('display', 'block')
                $('#openBottleRemark').css('display', 'block')

              }
              if(banquetButton.banquet_cost == 'true'){ // 奖励
                $('#banquetCost').css('display', 'block')
              }
              if(banquetButton.pfsRewardTab == 'true'){ // 批发商奖励
                $('#banquetAward').css('display', 'block')
              }
              if(banquetButton.photo_scene == 'true'){ // 现场照片
                vm.photoSceneUrl = '/photoScene?banquetId=' + vm.banquet.id
                $('#photoScene').css('display', 'block')
              }
              if(banquetButton.customer_info == 'false'){ // 客户信息
                $('#customerName').css('display', 'none')
                $('#customerPhone').css('display', 'none')
              }
              if(banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_JL){ // 奖励
                vm.banquetReadonly = true
                vm.YBJReadonly = true
                vm.clearFunction()
                vm.photoSceneUrl = '/photoScene?banquetId=' + vm.banquet.id
              }
            }
            let roleId = localStorage.getItem('roleId')

            // 角色为批发商并且宴会状态为已备酒 不能编辑宴会信息
            if(roleId === vm.$global.ROLE.PFS && banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_YBJ){
              vm.banquetReadonly = true
              vm.YBJReadonly = true
              vm.clearFunction()
            }
            // 角色为批发商不能显示其他竞品、开瓶率低原因
            if(roleId === vm.$global.ROLE.PFS){
              $('#otherGoods').css('display', 'none')
              $('#openBottleRemark').css('display', 'none')
            }
            // 宴会状态为奖励 显示实际桌数
            if(banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_JL){
              $('#realTableQty').css('display', 'block')
            }
            // 宴会状态为奖励 并且角色不为批发商 显示其他竞品、开瓶率低原因
            if(banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_JL && roleId !== vm.$global.ROLE.PFS){
              $('#otherGoods').css('display', 'block')
              $('#openBottleRemark').css('display', 'block')
            }
          } else {
            vm.wineUrl = '/wine'
            vm.mixedWinePersonUrl = '/mixedWinePerson'
            vm.banquetCostListUrl = '/banquetCostList'
          }
          vm.getBanquetPhoto()
          MintUI.Indicator.close()
        })
      } else {
        vm.getPostData(vm.$global.SERVER_BANQUET.GET_BANQUET_BY_ID, parm, function (response) {
          if (response.data.result.msg) {
            MintUI.Toast(response.data.result.msg)
          }
          let banquetButton = response.data.result.banquetButton
          if(banquetButton){
            sessionStorage.setItem("banquetButton", JSON.stringify(banquetButton))
            if(banquetButton.save_temporary == 'true'){
              $('#save_temporary').css('display', 'block')
            }
            if(banquetButton.commit == 'true'){
              $('#commit').css('display', 'block')
            }
          }
          MintUI.Indicator.close()
        })
      }
    },
    getBanquetPhoto () {
      let vm = this
      let param = {
        bizBanquetId: vm.banquet.id
      }
      vm.getPostData(vm.$global.SERVER_BANQUET_PHOTO.PHOTO_SCENE, param, function (response) {
        let bp = response.data.result.banquetPhoto
        if (bp) {
          if (bp.display) {
            vm.isUpload = true
          }
        }
      })
    },
    confirmBanquet () {
      let vm = this
      let countWines = vm.banquet.countWines
      if(!countWines){
        MintUI.Toast('您还未选酒，请选酒之后在确认')
        return
      }
      MintUI.MessageBox.confirm('确定要确认宴会信息吗？').then(action => {
        vm.banquet.stateFlag = vm.$global.BANQUET_STATE.BANQUET_STATE_DBJ
        vm.saveBanquet()
      });
    },
    // 关闭地图
    closeMap () {
      let vm = this
      vm.showMap = false
      $('#feastInfo .main_head').show()
      $('#feastInfo .feast_option').show()
    },
    // 打开地图弹窗
    openMap () {
      let vm = this
      vm.showMap = true
      $('#feastInfo .main_head').hide()
      $('#feastInfo .feast_option').hide()
      vm.init()
    },
    // 获取初始化的地址下标（省市区）
    getAddressIndex (type, value) {
      let vm = this
      if (type === 'province' && value) {
        let index = Object.keys(vm.myaddress).indexOf(value)
        if (index > -1) {
          return index
        }
        return 0
      }
      if (type === 'city' && value) {
        let cityArray = Object.keys(vm.myaddress[vm.myAddressProvince])
        if (cityArray) {
          vm.$refs.addressPiker.setSlotValues(1, Object.keys(vm.myaddress[vm.myAddressProvince]))
          vm.$refs.addressPiker.setSlotValues(2, vm.myaddress[vm.myAddressProvince][vm.myAddressCity]) // 区/县数据就是一个数组
          let index = cityArray.indexOf(value)
          if (index > -1) {
            return index
          }
        }
        return 0
      }
      if (type === 'country' && value) {
        let city = vm.myaddress[vm.myAddressProvince]
        let country = city[vm.myAddressCity]
        if (country) {
          vm.$refs.addressPiker.setSlotValues(1, Object.keys(vm.myaddress[vm.myAddressProvince]))
          vm.$refs.addressPiker.setSlotValues(2, vm.myaddress[vm.myAddressProvince][vm.myAddressCity]) // 区/县数据就是一个数组
          let index = country.indexOf(value)
          if (index > -1) {
            return index
          }
        }
        return 0
      }
      return 0
    },
    // 显示省市区的联动下拉框
    showAddressPiker () {
      let vm = this
      vm.popupVisible = true
      vm.myAddressSlots[0].defaultIndex = vm.getAddressIndex('province', vm.myAddressProvince)
      vm.myAddressSlots[2].defaultIndex = vm.getAddressIndex('city', vm.myAddressCity)
      vm.myAddressSlots[4].defaultIndex = vm.getAddressIndex('country', vm.myAddressCounty)
      let positionY = 72 - vm.myAddressSlots[2].defaultIndex * 36;
      $('#feastInfo .slot3 .picker-slot-wrapper').css('transform', 'translate(0px, ' + positionY + 'px) translateZ(0px)')
      if (vm.initFlag) {
        //设置默认地址
        vm.initFlag = false
      } else {
      }
      // 每次打开下拉框，恢复内容焦点至当前省市区
      if(vm.$refs.addressPiker){
        vm.$refs.addressPiker.setValues([vm.myAddressProvince, vm.myAddressCity, vm.myAddressCounty])
      }
      $('#feastInfo .main_content').css('overflow-y', 'hidden');
    },
    // 地图选点修改省市区下拉框
    changeAddressPicker () {
      let vm = this
      vm.myAddressSlots[0].defaultIndex = vm.getAddressIndex('province', vm.myAddressProvince)
      vm.myAddressSlots[2].defaultIndex = vm.getAddressIndex('city', vm.myAddressCity)
      vm.myAddressSlots[4].defaultIndex = vm.getAddressIndex('country', vm.myAddressCounty)
      let positionY = 72 - vm.myAddressSlots[2].defaultIndex * 36;
      $('#feastInfo .slot3 .picker-slot-wrapper').css('transform', 'translate(0px, ' + positionY + 'px) translateZ(0px)')
      if (vm.myAddressProvince && vm.myAddressCity && vm.myAddressCounty) {
        vm.banquet.area = vm.myAddressProvince + '-' + vm.myAddressCity + '-' + vm.myAddressCounty
        return
      }
      if (vm.myAddressProvince && vm.myAddressCity && !vm.myAddressCounty) {
        vm.banquet.area = vm.myAddressProvince + '-' + vm.myAddressCity
        return
      }
      if (vm.myAddressProvince && !vm.myAddressCity && !vm.myAddressCounty) {
        vm.banquet.area = vm.myAddressProvince
        return
      }
      vm.banquet.area = ''
      // vm.onMyAddressChange(vm.$refs.addressPiker, [vm.myAddressProvince, vm.myAddressCity, vm.myAddressCounty])
    },
    onMyAddressChange (picker, values) {
      let vm = this
      if (!values[1]) {
        values[1] = vm.myAddressCity
      }
      if (vm.myaddress[values[0]] && !vm.initFlag) {
        picker.setSlotValues(1, Object.keys(vm.myaddress[values[0]])) // Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(2, vm.myaddress[values[0]][values[1]]) // 区/县数据就是一个数组
        vm.cacheAddress.province = values[0]
        vm.cacheAddress.city = values[1]
        vm.cacheAddress.district = values[2]
        // if (!vm.initFlag) {
        //   if (values[0] && values[1] && values[2]) {
        //     vm.banquet.area = values[0] + '-' + values[1] + '-' + values[2]
        //     vm.getGroup()
        //     return
        //   }
        //   if (values[0] && values[1] && !values[2]) {
        //     vm.banquet.area = values[0] + '-' + values[1]
        //     return
        //   }
        //   if (values[0] && !values[1] && !values[2]) {
        //     vm.banquet.area = values[0]
        //     return
        //   }
        //   vm.banquet.area = ''
        // }
      }
    },
    getBanquetNo () {
      let vm = this
      vm.getPostData(vm.$global.SERVER_BANQUET.GET_BANQUET_NO, '', function (response) {
        if (response.data && response.data.state === 1) {
          vm.banquet.banquetNo = response.data.result.banquetNo
        }
      })
    },
    getType () {
      let vm = this
      vm.getPostData(vm.$global.SERVER_BANQUET.GET_BANQUET_TPYE, '', function (response) {
        if (response.data && response.data.state === -1) {
          MintUI.Toast(response.data.msg)
        }
        if (response.data && response.data.state === 1) {
          vm.types[0].values = response.data.resultList
          if (vm.banquet.type) {
            vm.types[0].defaultIndex = response.data.resultList.indexOf(vm.banquet.type)
          }
        }
      })
    },
    getGroup () {
      let vm = this
      let area = vm.banquet.area
      let param = {}
      param.area = area
      vm.getPostData(vm.$global.SERVER_BANQUET.GET_BANQUET_GROUP, param, function (response) {
        if (!response.data.result.groups){
          vm.groups[0].values = []
          vm.banquet.groupId = ''
          vm.banquet.groupName = ''
          vm.banquet.phoneNumber = ''
        }else {
          vm.groups[0].values = response.data.result.groups
          if (vm.banquet.groupName) {
            for (let i = 0; i < vm.groups[0].values.length; i++) {
              if (vm.banquet.groupName === vm.groups[0].values[i].sysUserName) {
                vm.groups[0].defaultIndex =  i
                if (vm.$refs.banquetGroupPicker) {
                  vm.$refs.banquetGroupPicker.setValues([vm.groups[0].values[i]])
                }
                vm.banquet.phoneNumber = vm.groups[0].values[i].phoneNumber
              }
            }
          }
          if (!vm.banquet.groupName && vm.banquet.area) {
            vm.banquet.groupId = vm.groups[0].values[0].sysUserId
            vm.banquet.groupName = vm.groups[0].values[0].sysUserName
            vm.banquet.phoneNumber = vm.groups[0].values[0].phoneNumber
          }
        }
      })
    },
    showType () {
      let vm = this
      vm.banquetType = true
      $('#feastInfo .main_content').css('overflow-y', 'hidden');
    },
    showGroup () {
      let vm = this
      vm.banquetGroup = true
      if (vm.banquet.groupName) {
        for (let i = 0; i < vm.groups[0].values.length; i++) {
          if (vm.banquet.groupName === vm.groups[0].values[i].sysUserName) {
            if(vm.$refs.banquetGroupPicker){
              vm.$refs.banquetGroupPicker.setValues([vm.groups[0].values[i]])
            }
          }
        }
      }else{
        if(vm.$refs.banquetGroupPicker){
          vm.$refs.banquetGroupPicker.setValues([vm.groups[0].values[0]])
        }
      }
      $('#feastInfo .main_content').css('overflow-y', 'hidden');
    },
    onTypeChange (picker, values) {
      let vm = this
      vm.chooseType = values[0]
    },
    onGroupChange (picker, values) {
      let vm = this
      let value = values[0]
      if (value) {
        vm.chooseGroupId = values[0].sysUserId
        vm.chooseGroupName = values[0].sysUserName
        vm.choosePhoneNumber = values[0].phoneNumber
      }
    },
    onValuesChange (picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0])
      }
    },
    showCalendar () {
      let vm = this
      vm.datePickerFlag = true
      // 除了当前点击的清除icon，其他的隐藏
      let domElement = $(vm.$refs.feastTime.$el).find('.mint-field-clear')
      $('.mint-field-clear').not(domElement).hide()
      $('.calendarPiker .mint-cell-value input').on('click', function (event) {
        vm.datePickerFlag = true
        event.stopPropagation()
      })
      if (vm.banquet.banquetDate) {
        let dateArray = vm.banquet.banquetDate.split('-')
        vm.changePane(parseInt(dateArray[0]), parseInt(dateArray[1])-1, 1)
      }

    },
    openPicker () {
      let vm = this
      vm.$refs.banquetTime.open()
    },
    openPicker1 () {
      let vm = this
      vm.$refs.banquetTime1.open()
    },
    openPicker2 () {
      let vm = this
      vm.$refs.banquetTime2.open()
    },
    openPicker3 () {
      let vm = this
      vm.$refs.banquetTime3.open()
    },
    isDate (v) {
      if (v instanceof Date) {
        return true
      }
      return false
    },
    stringify (v) {
      if (!this.isDate(v)) return null
      return v.getFullYear() + '-' + this.filled(v.getMonth() * 1 + 1) + '-' + this.filled(v.getDate())
    },
    filled (v) {
      return String(v).replace(/^(\d)$/, '0$1')
    },
    onDayClick (date, str) {
      let vm = this
      vm.datePickerFlag = false
      vm.banquet.banquetDate = str
    },
    changePane (year, month, pane) {
      let Today = new Date()
      let ty = parseInt(Today.getFullYear())
      let tm = parseInt(Today.getMonth())
      let td = parseInt(Today.getDate())
      let days = []
      for (let i = 0; i < pane; i++) {
        let date = new Date(year, month + i)
        let r = new lunar.Calendar(date.getFullYear(), date.getMonth(), ty, tm, td)
        days = days.concat([].slice.call(r, 0))
      }
      for (let j = 0; j < days.length; j++) {
        days[j].date = this.stringify(new Date(days[j].sYear, days[j].sMonth - 1, days[j].sDay))
        days[j].content = this.formatDay(days[j])
      }
      this.lurevents = days
    },
    formatDay (el) {
      /* eslint-disable */
      let S = "",
        J, I;
      if (el.lDay == 1) {
        S = "<b>" + (el.isLeap ? "\u95f0" : "") + el.lMonth + "\u6708" + (lunar.monthDays(el.lYear, el.lMonth) == 29 ? "\u5c0f" : "\u5927") + "</b>";
      } else {
        S = lunar.cDay(el.lDay);
      }
      I = el.lunarFestival;
      if (el.lMonth == "4" && I.indexOf("\u7aef\u5348\u8282") != -1) {
        I = "";
        el.lunarFestival = ""
      }
      if (I.length > 0) {
        if (I.length > 7) {
          I = I.split(' ')[0]
        }
        I = I.fontcolor("#909090");
      } else {
      }
      if (I.length > 0) {
        S = I
      }
      return S;
    },
    saveBanquet () {
      let vm = this
      if (!vm.banquet.name) {
        MintUI.Toast('宴会名称不能为空')
        return
      }
      if (!vm.banquet.type) {
        MintUI.Toast('宴会类型不能为空')
        return
      }
      if (!vm.banquet.tableQty) {
        MintUI.Toast('桌数不能为空')
        return
      }else{
        if(!vm.$global.REGEX.IS_INTEGER.test(vm.banquet.tableQty)){
          MintUI.Toast('桌数只能为正整数')
          return
        }
      }
      if (!vm.banquet.banquetDate) {
        MintUI.Toast('宴会日期不能为空')
        return
      }
      if (!vm.banquet.banquetTime) {
        MintUI.Toast('宴会时间不能为空')
        return
      }
      if (!vm.banquet.area) {
        MintUI.Toast('宴会地址不能为空')
        return
      }
      if (!vm.banquet.groupName) {
        MintUI.Toast('小组长不能为空')
        return
      }
      if (!vm.banquet.address) {
        MintUI.Toast('详细地址不能为空')
        return
      }
      // if (vm.banquet.bartenderQty){
      //   if (vm.banquet.bartenderQty != 0){
      //     if(!vm.$global.REGEX.IS_INTEGER.test(vm.banquet.bartenderQty)){
      //       MintUI.Toast('调酒人数只能为正整数')
      //       return
      //     }
      //   }
      // }
      // if(vm.banquet.modelQty){
      //   if(!vm.$global.REGEX.IS_INTEGER.test(vm.banquet.modelQty)){
      //     MintUI.Toast('模特人数只能为正整数')
      //     return
      //   }
      // }
      if (!vm.banquet.contactsName) {
        MintUI.Toast('联系人不能为空')
        return
      }
      if (!vm.banquet.contactsPhone) {
        MintUI.Toast('联系电话不能为空')
        return
      }else{
        if(!vm.$global.REGEX.IS_PHONE.test(vm.banquet.contactsPhone)){
          MintUI.Toast('联系电话格式为合法的11位手机号码')
          return
        }
      }
      if(vm.banquet.customerPhone){
        if(!vm.$global.REGEX.IS_PHONE.test(vm.banquet.customerPhone)){
          MintUI.Toast('客户电话格式为合法的11位手机号码')
          return
        }
      }
      vm.getPostData(vm.$global.SERVER_BANQUET.SAVE_BANQUET, vm.banquet, function (response) {
        MintUI.Toast(response.data.msg)
        if (response.data.state == '0') {
          return
        }
        if (response.data.result.banquet) {
          vm.banquet.id = response.data.result.banquet.id
        }
        let state = sessionStorage.getItem('state')
        if(state){
          vm.feastBackUrl = '/feastMain?state=' + state
        }
        vm.$wineList = JSON.parse(localStorage.getItem('wineList'))
        if (vm.$wineList && vm.$wineList.length) {
          let params = {
            bizBanquetIds: response.data.result.ids,
            wineList: JSON.stringify(vm.$wineList)
          }
          vm.getPostData(vm.$global.SERVER_BANQUET_WINE.SAVE_BANQUET_WINE_LIST, params,
            function (response) {
              MintUI.Toast(response.data.msg)
              vm.$wineList = []
              localStorage.removeItem('wineList')
              localStorage.removeItem('banquetInfo')
          })
        }
        vm.$router.push({
          path: vm.feastBackUrl
        })
      })
    },
    save_temporary () {
      let vm = this
      vm.banquet.stateFlag = vm.$global.BANQUET_STATE.BANQUET_STATE_ZC
      if (vm.banquet.showBanquetTime) {
        if (vm.banquet.multiBanquetTimeFirst == vm.banquet.multiBanquetTimeSecond) {
          MintUI.Toast('宴会时间1不能与宴会时间2相同');
          return
        }
        if (vm.banquet.multiBanquetTimeFirst == vm.banquet.multiBanquetTimeThird) {
          MintUI.Toast('宴会时间1不能与宴会时间3相同');
          return
        }
        if (vm.banquet.multiBanquetTimeSecond && vm.banquet.multiBanquetTimeSecond == vm.banquet.multiBanquetTimeThird) {
          MintUI.Toast('宴会时间2不能与宴会时间3相同');
          return
        }
        vm.handleBanquetTime()
      }
      vm.saveBanquet()
    },
    temporaryCommit () {
      let vm = this
      MintUI.MessageBox.confirm('确定要提交吗？').then(action => {
        vm.banquet.stateFlag = vm.$global.BANQUET_STATE.BANQUET_STATE_DQR
        if (vm.banquet.showBanquetTime) {
          if (vm.banquet.multiBanquetTimeFirst == vm.banquet.multiBanquetTimeSecond) {
            MintUI.Toast('宴会时间1不能与宴会时间2相同');
            return
          }
          if (vm.banquet.multiBanquetTimeFirst == vm.banquet.multiBanquetTimeThird) {
            MintUI.Toast('宴会时间1不能与宴会时间3相同');
            return
          }
          if (vm.banquet.multiBanquetTimeSecond && vm.banquet.multiBanquetTimeSecond == vm.banquet.multiBanquetTimeThird) {
            MintUI.Toast('宴会时间2不能与宴会时间3相同');
            return
          }
          vm.handleBanquetTime()
        }
        vm.saveBanquet()
      })
    },
    clickSavebanquetInfo () {
      let vm = this
      sessionStorage.setItem('banquetInfo', JSON.stringify(vm.banquet))
    },
    chooseWine () {
      let vm = this
      sessionStorage.setItem('banquetInfo', JSON.stringify(vm.banquet))
      if (!vm.banquet.id) {
        localStorage.setItem('banquetInfo', JSON.stringify(vm.banquet))
        let wineList = JSON.parse(localStorage.getItem('wineList'));
        if (!wineList || !wineList.length) {
          vm.$router.push({
            path: 'addWine?virtualWine=true'
          })
        } else {
          vm.$router.push({
            path: '/wine'
          })
        }
      } else {
        let param = {}
        param.banquetId = vm.banquet.id
        vm.getPostData(vm.$global.SERVER_BANQUET_WINE.GET_BANQUET_WINE_LIST, param, function (response) {
          if (response.data && response.data.state === 1) {
            let wineList = response.data.result.wineList
            if (wineList.length == 0) {
              vm.$router.push({
                path: 'addWine?banquetId=' + vm.banquet.id
              })
            } else {
              vm.$router.push({
                path: vm.wineUrl
              })
            }
          }
        })
      }
    },
    handleBanquetTime () {
      let vm = this
      vm.banquet.banquetTime = ''
      if (vm.banquet.multiBanquetTimeFirst) {
        vm.banquet.banquetTime += vm.banquet.multiBanquetTimeFirst + ','
      }
      if (vm.banquet.multiBanquetTimeSecond) {
        vm.banquet.banquetTime += vm.banquet.multiBanquetTimeSecond + ','
      }
      if (vm.banquet.multiBanquetTimeThird) {
        vm.banquet.banquetTime += vm.banquet.multiBanquetTimeThird + ','
      }
      if (vm.banquet.banquetTime) {
        vm.banquet.banquetTime = vm.banquet.banquetTime.substr(0, vm.banquet.banquetTime.length - 1)
      }
    }
  },
  components: {
    'calendar': Calendar
  },
  watch: {
    banquetTimeCheckListValue: function(val, oldVal) {
      let vm = this
      if (val.length) {
        vm.banquet.showBanquetTime = true
      } else {
        vm.banquet.showBanquetTime = false
      }
    }
  },
  data () {
    let vm = this
    return {
      banquetTimeCheckListOptions: [
        {
          label: '是否一天多场',
          value: '1'
        }
      ],
      banquetTimeCheckListValue: [],
      myaddress: {},
      mapSearchOption: {
        showMapSearch: false,
        searchInput: ''
      },
      aMapOption: {
        initMap: true,
        events: {
          click(e) {
            vm.aMapClick(e)
          }
        },
        markers: [],
        mapCenter: [121.59996, 31.197646],
        zoom: 14
      },
      cacheAddress: {
        province: '',
        city: '',
        district: '',
        township: '',
        address: ''
      },
      showMap: false,
      initFlag: true,
      popupVisible: false,
      readonly: true,
      banquetReadonly: false,
      YBJReadonly: false,
      banquetType: false,
      banquetGroup: false,
      roleId: '',
      banquet: {
        id: '',
        banquetNo: '',
        name: '',
        type: '',
        tableQty: '',
        bartenderQty: '',
        modelQty: '',
        banquetDate: '',
        banquetTime: '',
        area: '',
        groupId: '',
        groupName: '',
        address: '',
        customerName: '',
        customerPhone: '',
        contactsName: '',
        contactsPhone: '',
        state: '',
        countWines: 0, // 酒类数量
        realCountWines: 0, // 实际酒类数量
        realStandardQty: 0.0, // 实际标准瓶
        countPersons: 0, // 宴会人员数量
        countCost: 0.0, // 总金额
        realCountCost: 0.0, // 实际总金额
        remarks: '',
        realTableQty: '', // 实际桌数
        phoneNumber: '', // 组长电话
        stateFlag: '', //宴会操作状态
        otherGoods: '', // 其他竞品
        openBottleRemark: '', // 开瓶率低的原因
        showBanquetTime: false,
        multiBanquetTimeFirst: '', //宴会时间1
        multiBanquetTimeSecond: '', //宴会时间2
        multiBanquetTimeThird: '' //宴会时间3
      },
      types: [
        {
          flex: -1,
          values: [],
          defaultIndex: 0,
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      groups: [
        {
          flex: -1,
          values: [],
          className: 'slot2',
          textAlign: 'center'
        }
      ],
      hasInput: false,
      datePickerFlag: false,
      feastTimeFlag: false,
      disabled: [],
      format: 'yyyy-MM-dd',
      clear: true,
      placeholder: 'Start Date',
      value: this.stringify(new Date()),
      lurevents: [],
      isHoliday: true,
      DATENAME: {
        'today': '今天',
        'yuandan': '元旦',
        'chuxi': '除夕',
        'chunjie': '春节',
        'yuanxiao': '元宵',
        'qingming': '清明',
        'wuyi': '劳动',
        'duanwu': '端午',
        'zhongqiu': '中秋',
        'guoqing': '国庆'
      },
      HOLIDAYS: {
        yuandan: ['2012-01-01', '2013-01-01', '2014-01-01', '2015-01-01', '2016-01-01', '2017-01-01', '2018-01-01', '2019-01-01', '2020-01-01'],
        chuxi: ['2012-01-22', '2013-02-09', '2014-01-30', '2015-02-18', '2016-02-07', '2017-01-27', '2018-02-15', '2019-02-04', '2020-01-24'],
        chunjie: ['2012-01-23', '2013-02-10', '2014-01-31', '2015-02-19', '2016-02-08', '2017-01-28', '2018-02-16', '2019-02-05', '2020-01-25'],
        yuanxiao: ['2012-02-06', '2013-02-24', '2014-02-14', '2015-03-05', '2016-02-22', '2017-02-11', '2018-03-02', '2019-02-19', '2020-02-08'],
        qingming: ['2012-04-04', '2013-04-04', '2014-04-05', '2015-04-05', '2016-04-04', '2017-04-04', '2018-04-05', '2019-04-05', '2020-04-04'],
        wuyi: ['2012-05-01', '2013-05-01', '2014-05-01', '2015-05-01', '2016-05-01', '2017-05-01', '2018-05-01', '2019-05-01', '2020-05-01'],
        duanwu: ['2012-06-23', '2013-06-12', '2014-06-02', '2015-06-20', '2016-06-09', '2017-05-30', '2018-06-18', '2019-06-07', '2020-06-25'],
        zhongqiu: ['2012-09-30', '2013-09-19', '2014-09-08', '2015-09-27', '2016-09-15', '2017-10-04', '2018-09-24', '2019-09-13', '2020-10-01'],
        guoqing: ['2012-10-01', '2013-10-01', '2014-10-01', '2015-10-01', '2016-10-01', '2017-10-01', '2018-10-01', '2019-10-01', '2020-10-01']
      },
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: [],  //省份数组
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          defaultIndex: 0,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-',
          className: 'slot4'
        },
        {
          flex: 1,
          defaultIndex: 0,
          values: [],
          className: 'slot5',
          textAlign: 'center'
        }
      ],
      // valueKey: '5',
      myAddressProvince: '福建省',
      myAddressCity: '泉州市',
      myAddressCounty: '鲤城区',
      searchAddress: '',
      chooseType: '',
      chooseGroupId: '',
      chooseGroupName: '',
      choosePhoneNumber: '',
      wineUrl: '',
      mixedWinePersonUrl: '',
      feastBackUrl: '',
      banquetCostListUrl: '',
      photoSceneUrl: '',
      isReview: true,
      isUpload: false
    }
  }
}
</script>
<style>
  #feastInfo .main_content {
    width:100%;
    top: 0;
    bottom: 0;
    position: fixed;
    padding-top: 50px;/*top值为header的高*/
    box-sizing:border-box;/*这里改变盒子模型为怪异盒模型，这样padding值不会增加main的高度*/
    overflow-y:scroll;
    -webkit-overflow-scrolling:touch;
    padding-bottom: 0px;
  }
  #feastInfo .single_cell {
    border-top: 6px solid #d9d9d9;
  }
  #feastInfo .single_cell .choose_wine .mint-cell, #feastInfo .single_cell .mixed_wine .mint-cell {
    min-height: 48px;
    /*border-bottom: 1px solid #d9d9d9;*/
  }
  #feastInfo {
    padding-top: 40px;
    padding-bottom: 30px;
  }
  /*#feastInfo .feast_content {*/
  /*border-bottom: 3px solid #d9d9d9;*/
  /*}*/
  #feastInfo .two_cell {
    font-size: 15px;
    border-bottom: 1px solid #d9d9d9;
  }
  #feastInfo .mint-cell .selectImg {
    position: relative;
    left: -15px;
  }
  #feastInfo .feast_content .two_cell:last-child {
    border-bottom: 0px;
  }
  #feastInfo .two_cell .mint-cell {
    width: calc(49vw);
    display: inline-flex;
    background-size: 0px !important;
  }
  #feastInfo .two_cell .mint-cell:first-child {
    border-right: 1px solid #d9d9d9;
  }
  #feastInfo .two_cell .mint-cell-wrapper {
    background-size: 0px !important;
  }
  /*#feastInfo .field_cell {*/
    /*border-bottom: 1px #d9d9d9 solid;*/
  /*}*/
  #feastInfo .mt_badge {
    padding: 6px 2px !important;
    vertical-align: middle;
  }

  #feastInfo .mint-cell {
    min-height: 56px;
  }

  #feastInfo .mint-cell-wrapper {
  font-size: 16px;
  font-weight: bold;
  }

  #feastInfo .mint-field .mint-cell-title {
    width: 75px;
  }
  #feastInfo .feast_option {
    color: white;
    /*position: fixed;*/
  }
  #feastInfo .map_button .mint-button--normal {
    height: 40px;
    font-size: 20px;
  }
  #feastInfo .feast_save {
    background-color: #26a2ff;
    color: white;
  }
  #feastInfo .feast_confirm {
    background-color: #9d9d9d;
    color: white;
  }
  #feastInfo .map_save {
    background-color: #26a2ff;
    color: white;
  }
  #feastInfo .map_confirm {
    background-color: #9d9d9d;
    color: white;
  }
  #feastInfo .feast_wine {
    border-bottom: 1px #d9d9d9 solid;
  }
  #feastInfo .cell_wine {
    border-bottom: 1px #d9d9d9 solid;
  }
  #feastInfo .cell_wine:last-child {
    border-bottom: 0px;
  }
  #feastInfo .mint-navbar .mint-tab-item.is-selected {
    margin-bottom: 0px;
  }
  #feastInfo .mint-cell:last-child {
    background-image: linear-gradient(0deg, #fff, #fff 50%, transparent 50%);
  }
  #feastInfo .mint-cell-wrapper {
    background-image: -webkit-gradient(linear, left top, left bottom, from(#d9d9d9), color-stop(50%, #fff), color-stop(50%, transparent));
    background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%);
  }
  #feastInfo .mint-tab-item-label {
    font-size: 20px;
    line-height: inherit;
  }
  #feastInfo .mint-tab-item {
  }
  #feastInfo .select .mint-field-clear {
    opacity: 0;
  }
  #feastInfo .mt-popup {
    width: calc(100vw);
  }
  #feastInfo .bm-view {
    width: calc(100vw);
    height: calc(100vh - 29px);
    /*height: calc(100vh - 90px);*/
    /*padding-top: 49px;*/
  }
  #feastInfo .searchAddress{
    top:0;
    position: fixed;
    z-index: 1;
    width: calc(100vw);
  }
  #feastInfo #searchlist ol{
    height: 200px;
    overflow: scroll;
  }
  #feastInfo .map_popup {
    top: 0;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    /*padding-top: 10px;*/
  }
  #feastInfo .calendar_popup {
    top: 0;
    left: 0;
  }
  #feastInfo .map_search_popup {
    width: calc(100vw);
    height: calc(100vh);
  }
  #feastInfo #pickerInput {
    width: calc(100vw);
    padding: 5px 5px;
    z-index: 10;
    min-height: 40px;
  }
  #feastInfo #poiInfo {
    background: #fff;
    z-index: 10;
  }
  #feastInfo .amap-ui-poi-picker-search-results-container, #feastInfo .amap-ui-poi-picker-sugg-container {
    position: fixed;
    top: 45px !important;

  }
  #feastInfo .map_popup .search-box{
    /*height: 30px;*/
    min-height: 45px;
  }
  #feastInfo .map_search_popup #pickerInput {
    min-height: 45px;
  }
  #feastInfo .location {
    padding-left: 7px;
    width: 25px;
    height: 25px;
  }
  #feastInfo .picker-toolbar {
    /*font-weight: normal;*/
    height: 50px;
    /*font-size: 20px;*/
  }
  #feastInfo .pickerSure {
    color: #26a2ff;
    background-color: #ffffff;
    /*position: absolute;*/
    /*right: 0;*/
    float: right;
    width: calc(50vw);

  }
  #feastInfo .pickerCancel {
    /*position: absolute;*/
    width: calc(50vw);
    box-shadow: unset;
    -webkit-box-shadow: unset;
    background-color: #ffffff;
    color: #26a2ff;
  }
  #feastInfo .mint-button:not(.is-disabled):active::after{
    opacity: 0;
  }
  #feastInfo #forWine {
   display: none;
  }
  #feastInfo .phone {
    padding-left: 7px;
    width: 25px;
    height: 25px;
    top: 7px;
    position: relative;
  }
  #feastInfo .banquetCheckList .mint-checklist-title {
    margin: 0px;
  }
  #feastInfo .banquetCheckList .mint-checklist-label {
    padding: 0 10px 0 0;
  }
  #feastInfo .banquetCheckList .mint-checkbox-label {
    margin-left: 0;
  }
</style>
<style lang="scss">
  .event-calendar {
    .datepicker-inner{
      width: calc(100vw - 20px);
      /*width: 300px;*/
    }
    .datepicker-body{
      span{
        width: 45px;
        height: 60px;
        vertical-align: top;
      }
      .event{
        color: #E56700;
      }
      .low{
        color: red;
        font-weight: bold;
      }
      .datepicker-monthRange span{
        width: 50px;
        height: 50px;
        vertical-align: middle;
        line-height: 50px;
        // font-weight: 600;
      }
    }

  }
  #feastInfo .datepicker-wrapper{
    position: fixed !important;
    top: 60px;
    left: 10px;
    /*margin-top: 10px;*/
  }
  @font-face {
    font-family: 'Glyphicons Halflings';
    src: url(../assets/fonts/glyphicons-halflings-regular.eot);
    src: url(../assets/fonts/glyphicons-halflings-regular.eot?#iefix) format('embedded-opentype'), url(../assets/fonts/glyphicons-halflings-regular.woff) format('woff'), url(../assets/fonts/glyphicons-halflings-regular.ttf) format('truetype'), url(../assets/fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular) format('svg')
  }

  #feastInfo .glyphicon {
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
  }
  #feastInfo .glyphicon-chevron-left:before {
    content: "\e079"
  }

  #feastInfo .glyphicon-chevron-right:before {
    content: "\e080"
  }
  #feastInfo .textarea_cell .mint-field-core {
    font-family: Arial;
    height: 60px;
  }
</style>
