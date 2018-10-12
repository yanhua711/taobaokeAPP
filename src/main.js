// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import axios from 'axios'
import echarts from 'echarts'
import 'mint-ui/lib/style.css'
import 'vue2-slot-calendar/lib/calendar.min.css'
import './css/custom_style.css'
import global from './components/Global.vue'
import VueResource from 'vue-resource'
import Calendar from 'vue2-slot-calendar'
import AMap from 'vue-amap'
import qs from 'qs'

Vue.use(AMap)
AMap.initAMapApiLoader({
  // 申请的高德key
  key: '86602c2708273377cf275a069f700c19',
  // 插件集合
  plugin: ['AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Map', 'Geocoder'],
  uiVersion: '1.0.11' // 版本号
})
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$echarts = echarts
Vue.prototype.$global = global
Vue.prototype.$wineList = []
Vue.prototype.$banquetInfo = {}
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(Calendar)
Vue.use(VueResource)
Vue.component(MintUI.Swipe.name, MintUI.Swipe)
Vue.component(MintUI.SwipeItem.name, MintUI.SwipeItem)

document.addEventListener('deviceready', onDeviceReady, false)
function onDeviceReady () {
  document.addEventListener('jpush.receiveRegistrationId', function (event) {
    console.log('receiveRegistrationId' + JSON.stringify(event))
    if (event && event.registrationId) {
      console.log('event：' + JSON.stringify(event.registrationId))
      localStorage.setItem('registrationId', JSON.stringify(event.registrationId))
    }
  }, false)
  initiateUI()
}

function initiateUI () {
  try {
    window.JPush.init()
    window.JPush.setDebugMode(true)
    window.setTimeout(getRegistrationID, 1000)
    // if (device.platform !== 'Android') {
    //   window.JPush.setApplicationIconBadgeNumber(0)
    // }
  } catch (exception) {
    MintUI.Toast('极光推送初始化失败')
  }
}

function getRegistrationID () {
  window.JPush.getRegistrationID(onGetRegistrationID)
}

function onGetRegistrationID (data) {
  try {
    // alert('JPushPlugin:registrationID is ' + data)
    if (data.length === 0) {
      window.setTimeout(getRegistrationID, 1000)
    }
  } catch (exception) {
    console.log('nGetRegistrationID error: ' + exception)
  }
}
Vue.prototype.getPostData = function (url, params, handle, errorHandle) {
  // let data = new URLSearchParams()
  // // 参数设置
  // if (params) {
  //   for (let key in params) {
  //     if (key && params[key]) {
  //       if (Array.isArray(params[key])) {
  //         data.append(key, JSON.stringify(params[key]))
  //       } else {
  //         data.append(key, params[key])
  //       }
  //     }
  //   }
  // }
  let vm = this
  let data = {}
  // 参数设置
  if (params) {
    for (let key in params) {
      if (key && params[key]) {
        if (Array.isArray(params[key])) {
          data[key] = JSON.stringify(params[key])
        } else {
          data[key] = params[key]
        }
      }
    }
  }
  let headers = {}
  // header 设置token
  if (localStorage.getItem('token')) {
    headers.headers = {}
    headers.headers.token = localStorage.getItem('token')
  }
  this.$axios.post(url, vm.$qs.stringify(data), headers).then(function (response) {
    if (response.data.state === -1) {
      localStorage.setItem('token', '')
      router.push({
        path: 'login'
      })
    }
    if (typeof handle === 'function') {
      handle(response)
    }
  }).catch(typeof errorHandle === 'function' ? errorHandle : function (error) {
    MintUI.Toast('连接失败')
    console.log(error)
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    // 通过vuex state获取当前的token是否存在
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}// 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
