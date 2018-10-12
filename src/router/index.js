import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Main from '../components/main.vue'
import Tool from '../components/tool.vue'
import Login from '../components/login.vue'
import My from '../components/my.vue'
import FeastInfo from '../components/feastInfo.vue'
import Wine from '../components/wine.vue'
import FeastTrace from '../components/feastTrace.vue'
import StatisticalInfo from '../components/statisticalInfo.vue'
import ChooseWineType from '../components/chooseWineType.vue'
import AddPerson from '../components/addPerson.vue'
import RegisterNumber from '../components/registerNumber.vue'
import winePrices from '../components/winePrices.vue'
import FeastMain from '../components/feastMain.vue'
import FeastManage from '../components/feastManage.vue'
import MessageList from '../components/messageList.vue'
import AddWine from '../components/addWine.vue'
import FeastConfirm from '../components/feastConfirm.vue'
import MixedWinePerson from '../components/mixedWinePerson.vue'
import ChoosePerson from '../components/choosePerson.vue'
import PhotoScene from '../components/photoScene.vue'
import BanquetCostList from '../components/banquetCostList.vue'
import AddBanquetCost from '../components/addBanquetCost.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/main',
      meta: {
        requireAuth: true
      },
      component: Main,
      beforeEnter: (to, from, next) => {
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
      }
    },
    {
      path: '/tool',
      meta: {
        requireAuth: true
      },
      component: Tool,
      beforeEnter: (to, from, next) => {
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
      }
    },
    {
      path: '/my',
      meta: {
        requireAuth: true
      },
      component: My
    },
    {
      path: '/feastInfo',
      meta: {
        requireAuth: true
      },
      component: FeastInfo,
      beforeEnter: (to, from, next) => {
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
      }
    },
    {
      path: '/wine',
      meta: {
        requireAuth: true
      },
      component: Wine,
      beforeEnter: (to, from, next) => {
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
      }
    },
    {
      path: '/feastTrace',
      meta: {
        requireAuth: true
      },
      component: FeastTrace,
      beforeEnter: (to, from, next) => {
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
      }
    },
    {
      path: '/statisticalInfo',
      meta: {
        requireAuth: true
      },
      component: StatisticalInfo,
      beforeEnter: (to, from, next) => {
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
      }
    },
    {
      path: '/chooseWineType',
      meta: {
        requireAuth: true
      },
      component: ChooseWineType,
      beforeEnter: (to, from, next) => {
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
      }
    },
    {
      path: '/addPerson',
      meta: {
        requireAuth: true
      },
      component: AddPerson,
      beforeEnter: (to, from, next) => {
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
      }
    },
    {
      path: '/registerNumber',
      meta: {
        requireAuth: true
      },
      component: RegisterNumber,
      beforeEnter: (to, from, next) => {
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
      }
    },
    {
      path: '/winePrices',
      meta: {
        requireAuth: true
      },
      component: winePrices,
      beforeEnter: (to, from, next) => {
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
      }
    },
    {
      path: '/feastMain',
      meta: {
        requireAuth: true
      },
      component: FeastMain,
      beforeEnter: (to, from, next) => {
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
      }
    },
    {
      path: '/feastManage',
      meta: {
        requireAuth: true
      },
      component: FeastManage,
      beforeEnter: (to, from, next) => {
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
      }
    },
    {
      path: '/messageList',
      meta: {
        requireAuth: true
      },
      component: MessageList,
      beforeEnter: (to, from, next) => {
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
      }
    },
    {
      path: '/addWine',
      meta: {
        requireAuth: true
      },
      component: AddWine
    },
    {
      path: '/feastConfirm',
      meta: {
        requireAuth: true
      },
      component: FeastConfirm
    },
    {
      path: '/mixedWinePerson',
      meta: {
        requireAuth: true
      },
      component: MixedWinePerson
    },
    {
      path: '/choosePerson',
      meta: {
        requireAuth: true
      },
      component: ChoosePerson
    },
    {
      path: '/photoScene',
      meta: {
        requireAuth: true
      },
      component: PhotoScene
    },
    {
      path: '/banquetCostList',
      meta: {
        requireAuth: true
      },
      component: BanquetCostList
    },
    {
      path: '/addBanquetCost',
      meta: {
        requireAuth: true
      },
      component: AddBanquetCost
    }
  ]
})
