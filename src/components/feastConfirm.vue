<!--宴会信息-->
<template>
  <div id="feastConfirm">
    <mt-header class="main_head" fixed title="宴会信息">
      <router-link :to="feastBackUrl" slot="left">
        <mt-button>
          <img height="35" width="35" src="../img/back.png">
        </mt-button>
      </router-link>
    </mt-header>
    <div class="main_content">
      <div class="feast_content">
        <div style="border-bottom: 6px solid #d9d9d9;">
          <div class="field_cell">
            <input type="hidden" v-model="banquet.id"/>
            <mt-field label="宴会名称" placeholder="请输入宴会名称(必填)" v-model="banquet.name" :attr="{maxlength:100}" >
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
            <mt-field label="宴会桌数" placeholder="请输入宴会桌数(必填)"  v-model="banquet.tableQty" :attr="{maxlength:10}"></mt-field>
          </div>
        </div>
        <div style="border-bottom: 6px solid #d9d9d9;">
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
          <div class="field_cell">
            <mt-field label="宴会时间" placeholder="请选择宴会时间(必填)" readonly="readonly" v-model="banquet.banquetTime" @click.native.capture="openPicker()">
              <mt-datetime-picker
                ref="banquetTime"
                v-model="banquet.banquetTime"
                type="time">
              </mt-datetime-picker>

            </mt-field>
          </div>
        </div>

        <!--<div class="field_cell">
          <mt-field label="宴会编号" placeholder="" type="" v-model="banquet.banquetNo" readonly="readonly"  ></mt-field>
        </div>-->
        <div style="border-bottom: 6px solid #d9d9d9;">
          <div class="field_cell">
            <mt-field label="宴会地址" placeholder="请选择宴会地址(必填)" v-model="banquet.area" readonly="readonly" @click.native.capture="showAddressPiker()">
              <mt-popup v-model="popupVisible" position="bottom">
                <mt-picker ref="addressPiker" style="width: calc(100vw);" :showToolbar="readonly" :slots="myAddressSlots" @change="onMyAddressChange">
                  <mt-button class="pickerCancel" @click="closeAddress">取消</mt-button>
                  <mt-button class="pickerSure" type="primary" @click="confirmAddress">确定</mt-button>
                </mt-picker>
              </mt-popup>
            </mt-field>
          </div>
          <div class="field_cell">
            <mt-field label="详细地址" placeholder="请输入详细地址(必填)" v-model="banquet.address" :attr="{maxlength:255}">
              <div @click="openMap()">
                <img class="location" src="../img/location.png">
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
        <div style="border-bottom: 6px solid #d9d9d9;">
          <div class="field_cell">
            <mt-field label="小组长" placeholder="请选择小组长(必填)" v-model="banquet.groupName" class="select"  readonly="readonly" @click.native.capture="showGroup()">
              <img style="width: 14px; height: 14px;" src="../img/drop_down.png" class="selectImg">
              <mt-popup v-model="banquetGroup" position="bottom" class="mt-popup">
                <mt-picker ref="banquetGroupPicker" style="width: calc(100vw);" :showToolbar="readonly" value-key="sysUserName" :slots="groups" @change="onGroupChange">
                  <mt-button class="pickerCancel" @click="closeGroup">取消</mt-button>
                  <mt-button class="pickerSure" type="primary" @click="confirmGroup">确定</mt-button>
                </mt-picker>
              </mt-popup>
            </mt-field>
          </div>
          <div class="field_cell">
            <mt-field label="调酒人数" placeholder="请输入调酒人数" v-model="banquet.bartenderQty"   :attr="{maxlength:10}" ></mt-field>
          </div>
          <div class="field_cell">
            <mt-field label="模特人数" placeholder="请输入模特人数" v-model="banquet.modelQty"   :attr="{maxlength:10}"></mt-field>
          </div>
        </div>
        <div class="field_cell">
          <mt-field label="联系人" placeholder="请输入联系人(必填)" v-model="banquet.contactsName" :attr="{maxlength:100}"></mt-field>
        </div>
        <div class="field_cell">
          <mt-field label="联系电话" placeholder="请输入联系电话(必填)"  v-model="banquet.contactsPhone" :attr="{maxlength:11}"></mt-field>
        </div>
        <div class="field_cell">
          <mt-field label="客户姓名" placeholder="请输入客户姓名" v-model="banquet.customerName" :attr="{maxlength:100}"></mt-field>
        </div>
        <div class="field_cell">
          <mt-field label="客户电话" placeholder="请输入客户电话"  v-model="banquet.customerPhone" :attr="{maxlength:11}"></mt-field>
        </div>
      </div>
      <div class="single_cell">
        <div class="choose_wine">
          <mt-cell title="选酒"  @click.native.capture="chooseWine()" is-link="">
            <img slot="icon" src="../img/add.png" width="25" height="25">
            <span>{{banquet.countWines}}瓶</span>
          </mt-cell>
        </div>
      </div>
      <div class="single_cell">
        <div class="mixed_wine">
          <mt-cell title="人员" :to="mixedWinePersonUrl" is-link="">
              <img slot="icon" src="../img/addPerson.png" width="25" height="25">
            <span>{{banquet.countPersons}}人</span>
          </mt-cell>
        </div>
      </div>
      <div style="border-top: 8px solid #d9d9d9">
      </div>
      <div class="map_button" style="display: inline-flex;">
        <mt-button id="saveBanquet" style="width: calc(50vw); background-color: #26a2ff; color: #ffffff;" type="default" @click="saveBanquet">保存</mt-button>
        <mt-button id="confirmBanquet" style="width: calc(50vw); background-color: #ff800a; color: #ffffff;" type="default" @click="confirmBanquet">确认</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import MintUI from 'mint-ui'
import Calendar from 'vue2-slot-calendar'
import lunar from '../utils/lunar.js'
import myaddress from '../utils/pca.json'
export default {
  name: 'feastConfirm',
  mounted: function () {
    /* eslint-disable */
    let vm = this
    $('.calendarPiker .mint-cell-value input').on('click', function (event) {
      vm.datePickerFlag = true
      event.stopPropagation()
    })
    vm.getBanquetNo()
    vm.getType()
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
    if (vm.$route.fullPath) {
      let id = vm.$route.query.id
      if (vm.$route.query.flag){
        sessionStorage.setItem('messageFlag', vm.$route.query.flag)
      }
      if (id) {
        vm.getBanquetById (id)
      }
      vm.feastBackUrl = '/feastMain'
    }
    // 如果标志存在酒跳转的 我的消息列表
    let messageFlag = sessionStorage.getItem('messageFlag')
    if (messageFlag){
      vm.feastBackUrl = '/messageList'
    }
    // 获取从 我的宴会 跳转到宴会列表的宴会状态
    let state = sessionStorage.getItem('state')
    if(state){
      if(state != vm.$global.BANQUET_STATE.BANQUET_STATE_DQR){
        $('#saveBanquet').css('width', 'calc(100vw)')
        $('#confirmBanquet').css('display', 'none')
      }
      vm.feastBackUrl = '/feastMain?state=' + state
    }
    let fg = sessionStorage.getItem("flag")
    if (fg) {
      sessionStorage.removeItem("flag")
    }
    sessionStorage.removeItem('bizBanquetId')
    vm.$nextTick(function () {

    })
  },
  methods: {
    closeType () {
      let vm = this
      vm.banquetType = false
    },
    confirmType () {
      let vm = this
      vm.banquet.type = vm.chooseType
      vm.banquetType = false
    },
    closeGroup () {
      let vm = this
      vm.banquetGroup = false
    },
    confirmGroup () {
      let vm = this
      vm.banquet.groupId = vm.chooseGroupId
      vm.banquet.groupName = vm.chooseGroupName
      vm.banquetGroup = false
    },
    closeAddress () {
      let vm = this
      vm.popupVisible = false
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
      vm.getGroup()
    },
    closeSearchPopup () {
      let vm = this
      vm.mapSearchOption.showMapSearch = false
    },
    setMapCenter (city) {
      let vm = this
      let geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
      })
      geocoder.getLocation(city, function (status, result) {
        if (status === 'complete') {
          vm.aMapOption.mapCenter = [result.geocodes[0].location.lng, result.geocodes[0].location.lat]
          // vm.addMarker(result.geocodes[0].location.lng, result.geocodes[0].location.lat)
        } else {
          MintUI.Toast('定位失败')
        }
      })
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
      vm.banquet.address =''
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
            if (result.regeocode.formattedAddress) {
              vm.cacheAddress.address = result.regeocode.formattedAddress
                .replace(vm.cacheAddress.province, '').replace(vm.cacheAddress.city, '')
                .replace(vm.cacheAddress.district, '')
            } else {
              vm.cacheAddress.address = ''
            }
            // vm.$nextTick()
            // vm.addMarker(lng, lat)
          }
        }
      })
    },
    addMarker (lng, lat) {
      let vm = this
      let marker = [Number(lng), Number(lat)]
      vm.aMapOption.markers = []
      vm.aMapOption.markers.push(marker);
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
          if (positionResult.address) {
            vm.cacheAddress.address = positionResult.address
              .replace(vm.cacheAddress.province, '').replace(vm.cacheAddress.city, '')
              .replace(vm.cacheAddress.district, '')
          } else {
            vm.cacheAddress.address = ''
          }
        });
        positionPicker.on('fail', function(positionResult) {
          MintUI.Toast('获取定位信息失败')
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

      $('#feastConfirm .search-box input').on('click', function() {
        vm.mapSearchOption.showMapSearch = true
      })
    },
    getBanquetById (id) {
      let vm = this
      let parm = {}
      parm.id = id
      MintUI.Indicator.open()
      vm.getPostData(vm.$global.SERVER_BANQUET.GET_BANQUET_BY_ID, parm, function (response) {
        if (response.data && response.data.state === 1) {
          vm.banquet = response.data.result.banquet
          vm.wineUrl = '/wine?banquetId=' + vm.banquet.id  + '&flag=' + 'confirm'
          vm.mixedWinePersonUrl = response.data.result.mixedWinePersonUrl
          let area = response.data.result.banquet.area.split('-')
          if (area && area.length === 3) {
            vm.myAddressProvince = area[0]
            vm.myAddressCity = area[1]
            vm.myAddressCounty = area[2]
          }
          if(vm.banquet.state != vm.$global.BANQUET_STATE.BANQUET_STATE_DQR){
            $('#saveBanquet').css('width', 'calc(100vw)')
            $('#confirmBanquet').css('display', 'none')
          }
          vm.getGroup()
          vm.getType()
        }else{
          vm.wineUrl = '/wine'
          vm.mixedWinePersonUrl = '/mixedWinePerson'
        }
        MintUI.Indicator.close()
      })
    },
    closeMap () {
      let vm = this
      vm.showMap = false
      $('#feastConfirm .main_head').show()
      $('#feastConfirm .feast_option').show()
    },
    openMap () {
      let vm = this
      vm.showMap = true
      $('#feastConfirm .main_head').hide()
      $('#feastConfirm .feast_option').hide()
      vm.init()
    },
    // 获取初始化的地址下标
    getAddressIndex (type, value) {
      let vm = this
      if (type === 'province' && value) {
        let index = Object.keys(myaddress).indexOf(value)
        if (index > -1) {
          return index
        }
        return 0
      }
      if (type === 'city' && value) {
        let cityArray = Object.keys(myaddress[vm.myAddressProvince])
        if (cityArray) {
          vm.$refs.addressPiker.setSlotValues(1, Object.keys(myaddress[vm.myAddressProvince]))
          vm.$refs.addressPiker.setSlotValues(2, myaddress[vm.myAddressProvince][vm.myAddressCity]) // 区/县数据就是一个数组
          let index = cityArray.indexOf(value)
          if (index > -1) {
            return index
          }
        }
        return 0
      }
      if (type === 'country' && value) {
        let city = myaddress[vm.myAddressProvince]
        let country = city[vm.myAddressCity]
        if (country) {
          vm.$refs.addressPiker.setSlotValues(1, Object.keys(myaddress[vm.myAddressProvince]))
          vm.$refs.addressPiker.setSlotValues(2, myaddress[vm.myAddressProvince][vm.myAddressCity]) // 区/县数据就是一个数组
          let index = country.indexOf(value)
          if (index > -1) {
            return index
          }
        }
        return 0
      }
      return 0
    },
    showAddressPiker () {
      let vm = this
      vm.popupVisible = true
      vm.myAddressSlots[0].defaultIndex = vm.getAddressIndex('province', vm.myAddressProvince)
      vm.myAddressSlots[2].defaultIndex = vm.getAddressIndex('city', vm.myAddressCity)
      vm.myAddressSlots[4].defaultIndex = vm.getAddressIndex('country', vm.myAddressCounty)
      let positionY = 72 - vm.myAddressSlots[2].defaultIndex * 36;
      $('#feastConfirm .slot3 .picker-slot-wrapper').css('transform', 'translate(0px, ' + positionY + 'px) translateZ(0px)')
      if (vm.initFlag) {
        //设置默认地址
        vm.initFlag = false
      } else {
      }
      if (vm.$refs.addressPiker) {
        vm.$refs.addressPiker.setValues([vm.myAddressProvince, vm.myAddressCity, vm.myAddressCounty])
      }
    },
    // 地图选点修改省市区下拉框
    changeAddressPicker () {
      let vm = this
      vm.myAddressSlots[0].defaultIndex = vm.getAddressIndex('province', vm.myAddressProvince)
      vm.myAddressSlots[2].defaultIndex = vm.getAddressIndex('city', vm.myAddressCity)
      vm.myAddressSlots[4].defaultIndex = vm.getAddressIndex('country', vm.myAddressCounty)
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
      if (myaddress[values[0]] && !vm.initFlag) {
        picker.setSlotValues(1, Object.keys(myaddress[values[0]])) // Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(2, myaddress[values[0]][values[1]]) // 区/县数据就是一个数组
        vm.cacheAddress.province = values[0]
        vm.cacheAddress.city = values[1]
        vm.cacheAddress.district = values[2]
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
        }else {
          vm.groups[0].values = response.data.result.groups
          if (vm.banquet.groupName) {
            for (let i = 0; i < vm.groups[0].values.length; i++) {
              if (vm.banquet.groupName === vm.groups[0].values[i].sysUserName) {
                vm.groups[0].defaultIndex =  i
                if (vm.$refs.banquetGroupPicker) {
                  vm.$refs.banquetGroupPicker.setValues([vm.groups[0].values[i]])
                }
              }
            }
          }
        }
      })
    },
    showType () {
      let vm = this
      vm.banquetType = true
      if (vm.$refs.banquetTypePicker) {
        vm.$refs.banquetTypePicker.setValues([vm.banquet.type])
      }
    },
    showGroup () {
      let vm = this
      vm.banquetGroup = true
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
    },
    openPicker () {
      let vm = this
      vm.$refs.banquetTime.open()
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
        days[j].content = this.foramtDay(days[j])
      }
      this.lurevents = days
    },
    foramtDay (el) {
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
    clickGroup () {
      let vm = this
      let area = vm.banquet.area
      let param = {}
      param.area = area
      vm.getPostData(vm.$global.SERVER_BANQUET.GET_BANQUET_GROUP, param, function (response) {
        if (!response.data.result.groups){
          vm.groups[0].values = []
          vm.banquet.groupId = ''
          vm.banquet.groupName = ''
        }else {
          vm.groups[0].values = response.data.result.groups
        }
      })
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
      if(vm.banquet.bartenderQty){
        if(!vm.$global.REGEX.IS_INTEGER.test(vm.banquet.bartenderQty)){
          MintUI.Toast('调酒人数只能为正整数')
          return
        }
      }
      if(vm.banquet.modelQty){
        if(!vm.$global.REGEX.IS_INTEGER.test(vm.banquet.modelQty)){
          MintUI.Toast('模特人数只能为正整数')
          return
        }
      }
      if (!vm.banquet.contactsName) {
        MintUI.Toast('联系人不能为空')
        return
      }
      if (!vm.banquet.contactsPhone) {
        MintUI.Toast('联系电话不能为空')
        return
      }else{
        if(!vm.$global.REGEX.IS_PHONE.test(vm.banquet.contactsPhone)){
          MintUI.Toast('联系电话格式为11位手机号码')
          return
        }
      }
      if(vm.banquet.customerPhone){
        if(!vm.$global.REGEX.IS_PHONE.test(vm.banquet.customerPhone)){
          MintUI.Toast('客户电话格式为11位手机号码')
          return
        }
      }
      vm.getPostData(vm.$global.SERVER_BANQUET.SAVE_BANQUET, vm.banquet, function (response) {
        vm.banquet.id = response.data.result.banquet.id
        MintUI.Toast(response.data.msg)
        vm.$router.push({
          path: vm.feastBackUrl
        })
      })
    },
    confirmBanquet () {
      let vm = this
      let param = {}
      let banquetId = vm.banquet.id
      if (!banquetId) {
        MintUI.Toast('请先保存宴会信息')
        return
      }
      if(vm.banquet.state != vm.$global.BANQUET_STATE.BANQUET_STATE_DQR) {
        MintUI.Toast('该宴会已确认')
        return
      }
      MintUI.MessageBox.confirm('确定要确认宴会信息吗？').then(action => {
        param.banquetId = banquetId
        vm.getPostData(vm.$global.SERVER_BANQUET.CONFIRM_BANQUET, param, function (response) {
          MintUI.Toast(response.data.msg)
          vm.$router.push({
            path: vm.feastBackUrl
          })
        })
      });
    },
    chooseWine () {
      let vm = this
      if (!vm.banquet.id) {
        MintUI.Toast('请先保存宴会信息')
      }else{
        vm.$router.push({
          path: vm.wineUrl
        })
      }
    }
  },
  components: {
    'calendar': Calendar
  },
  data () {
    let vm = this
    return {
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
        address: ''
      },
      showMap: false,
      initFlag: true,
      popupVisible: false,
      readonly: true,
      banquetType: false,
      banquetGroup: false,
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
        contactsPhone: ''
      },
      types: [
        {
          flex: 1,
          values: [],
          className: 'type',
          textAlign: 'center'
        }
      ],
      groups: [
        {
          flex: 1,
          values: [],
          className: 'group',
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
          values: Object.keys(myaddress),  //省份数组
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
      valueKey: '5',
      myAddressProvince: '福建省',
      myAddressCity: '泉州市',
      myAddressCounty: '鲤城区',
      searchAddress: '',
      chooseType: '',
      chooseGroupId: '',
      chooseGroupName: '',
      wineUrl: '',
      mixedWinePersonUrl: '',
      feastBackUrl: '',
    }
  }
}
</script>
<style>
  #feastConfirm .main_content {
    width:100%;
    top: 0;
    bottom: 0;
    position: fixed;
    padding-top: 50px;/*top值为header的高*/
    box-sizing:border-box;/*这里改变盒子模型为怪异盒模型，这样padding值不会增加main的高度*/
    overflow-y:scroll;
    -webkit-overflow-scrolling:touch;
  }
  #feastConfirm .single_cell {
    border-top: 6px solid #d9d9d9;
  }
  #feastConfirm .single_cell .choose_wine .mint-cell, #feastConfirm .single_cell .mixed_wine .mint-cell {
    min-height: 48px;
    /*border-bottom: 1px solid #d9d9d9;*/
  }
  #feastConfirm {
    padding-top: 40px;
    padding-bottom: 30px;
  }
  /*#feastConfirm .feast_content {*/
  /*border-bottom: 3px solid #d9d9d9;*/
  /*}*/
  #feastConfirm .two_cell {
    font-size: 15px;
    /*border-bottom: 1px solid #d9d9d9;*/
  }
  #feastConfirm .mint-cell .selectImg {
    position: relative;
    left: -15px;
  }
  #feastConfirm .feast_content .two_cell:last-child {
    border-bottom: 0px;
  }
  #feastConfirm .two_cell .mint-cell {
    width: calc(49vw);
    display: inline-flex;
    background-size: 0px !important;
  }
  #feastConfirm .two_cell .mint-cell:first-child {
    border-right: 1px solid #d9d9d9;
  }
  #feastConfirm .two_cell .mint-cell-wrapper {
    background-size: 0px !important;
  }
  /*#feastConfirm .field_cell {*/
  /*border-bottom: 1px #d9d9d9 solid;*/
  /*}*/
  #feastConfirm .mt_badge {
    padding: 6px 2px !important;
    vertical-align: middle;
  }

  #feastConfirm .mint-cell {
    min-height: 56px;
  }

  #feastConfirm .mint-cell-wrapper {
    font-size: 16px;
    font-weight: bold;
  }

  #feastConfirm .mint-field .mint-cell-title {
    width: 80px;
  }
  #feastConfirm .feast_option {
    color: white;
    position: fixed;
  }
  #feastConfirm .map_button .mint-button--normal {
    height: 40px;
    font-size: 20px;
  }
  #feastConfirm .feast_save {
    background-color: #26a2ff;
    color: white;
  }
  #feastConfirm .feast_confirm {
    background-color: #ff800a;
    color: white;
  }
  #feastConfirm .map_save {
    background-color: #26a2ff;
    color: white;
  }
  #feastConfirm .map_confirm {
    background-color: #9d9d9d;
    color: white;
  }
  #feastConfirm .feast_wine {
    border-bottom: 1px #d9d9d9 solid;
  }
  #feastConfirm .cell_wine {
    border-bottom: 1px #d9d9d9 solid;
  }
  #feastConfirm .cell_wine:last-child {
    border-bottom: 0px;
  }
  #feastConfirm .mint-navbar .mint-tab-item.is-selected {
    margin-bottom: 0px;
  }
  #feastConfirm .mint-cell:last-child {
    background-image: linear-gradient(0deg, #fff, #fff 50%, transparent 50%);
  }
  #feastConfirm .mint-cell-wrapper {
    background-image: -webkit-gradient(linear, left top, left bottom, from(#d9d9d9), color-stop(50%, #fff), color-stop(50%, transparent));
    background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%);
  }
  #feastConfirm .mint-tab-item-label {
    font-size: 20px;
    line-height: inherit;
  }
  #feastConfirm .mint-tab-item {
  }
  #feastConfirm .select .mint-field-clear {
    opacity: 0;
  }
  #feastConfirm .mt-popup {
    width: calc(100vw);
  }
  #feastConfirm .bm-view {
    width: calc(100vw);
    height: calc(100vh - 29px);
    /*height: calc(100vh - 90px);*/
    /*padding-top: 49px;*/
  }
  #feastConfirm .searchAddress{
    top:0;
    position: fixed;
    z-index: 1;
    width: calc(100vw);
  }
  #feastConfirm #searchlist ol{
    height: 200px;
    overflow: scroll;
  }
  #feastConfirm .map_popup {
    top: 0;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    /*padding-top: 10px;*/
  }
  #feastConfirm .calendar_popup {
    top: 0;
    left: 0;
  }
  #feastConfirm .map_search_popup {
    width: calc(100vw);
    height: calc(100vh);
  }
  #feastConfirm #pickerInput {
    width: calc(100vw);
    padding: 5px 5px;
    z-index: 10;
    min-height: 40px;
  }
  #feastConfirm #poiInfo {
    background: #fff;
    z-index: 10;
  }
  #feastConfirm .amap-ui-poi-picker-search-results-container, #feastConfirm .amap-ui-poi-picker-sugg-container {
    position: fixed;
    top: 45px !important;

  }
  #feastConfirm .map_popup .search-box{
    /*height: 30px;*/
    min-height: 45px;
  }
  #feastConfirm .map_search_popup #pickerInput {
    min-height: 45px;
  }
  #feastConfirm .location {
    margin-left: 7px;
    width: 22px;
    height: 22px;
  }
  #feastConfirm .map_button .mint-button--normal {
    height: 40px;
    font-size: 20px;
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
  #feastConfirm .datepicker-wrapper{
    position: fixed !important;
    top: 50px;
    left: 10px;
    /*margin-top: 10px;*/
  }
  @font-face {
    font-family: 'Glyphicons Halflings';
    src: url(../assets/fonts/glyphicons-halflings-regular.eot);
    src: url(../assets/fonts/glyphicons-halflings-regular.eot?#iefix) format('embedded-opentype'), url(../assets/fonts/glyphicons-halflings-regular.woff) format('woff'), url(../assets/fonts/glyphicons-halflings-regular.ttf) format('truetype'), url(../assets/fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular) format('svg')
  }

  #feastConfirm .glyphicon {
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
  #feastConfirm .glyphicon-chevron-left:before {
    content: "\e079"
  }

  #feastConfirm .glyphicon-chevron-right:before {
    content: "\e080"
  }
  #feastConfirm .pickerSure {
    /*color: #26a2ff;*/
    /*position: absolute;*/
    /*right: 0;*/
    float: right;
  }
  #feastConfirm .pickerCancel {
    /*position: absolute;*/
  }
</style>
