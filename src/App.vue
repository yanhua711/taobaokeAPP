<template>
  <div id="app">
    <div class="content-div">
      <!--<transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">-->
      <router-view/>
      <!--</transition>-->
    </div>
  </div>
</template>

<script>
// import Footer from './components/FooterBar.vue'
export default {
  name: 'App',
  mounted () {
    let vm = this
    vm.clearBadge()
    vm.saveRegistrationId()
  },
  methods: {
    saveRegistrationId () {
      /* eslint-disable */
      let vm = this
      let timeTask = setInterval(function () {
        let token = localStorage.getItem('token')
        if (token) {
          let registrationId = localStorage.getItem('registrationId')
          if (registrationId) {
            let params = {}
            params.key = 'registrationId'
            params.value = registrationId.replace(/"/g, '')
            vm.getPostData(vm.$global.SERVER_USER.SAVE_REGISTRATION_ID, params, function (response) {
              if (response.data && response.data.state === 1) {
                console.log(response)
                console.log(response.data.msg)
                clearInterval(timeTask)
              }
            })
          }
        }
      }, 1000)
    },
    clearBadge () {
      setInterval(function () {
        if (window.JPush) {
          window.JPush.resetBadge()
          window.JPush.setApplicationIconBadgeNumber(0)
          window.JPush.clearAllNotification()
        }
      }, 1000)
    },
    getGid () {
      window.JPush.getRegistrationID(this.onGetRegistrationID)
    },
    onGetRegistrationID (data) {
      try {
        alert('JPushPlugin:registrationID is ' + data)

        if (data.length === 0) {
          window.setTimeout(this.getGid, 1000)
        }
      } catch (exception) {
        alert('nGetRegistrationID error: ' + exception)
      }
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /*font-size: 14px !important;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
  height: calc(100vh);
}
.content-div {
  /*margin-bottom: 55px;*/
}
</style>
