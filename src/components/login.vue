<template>
  <div id="login">
    <mt-header fixed title="保乐力加宴会系统"></mt-header>
    <div class="logo">
      <img src="../img/logo.png"/>
    </div>
    <div class="login-form">
          <mt-field v-model="username" placeholder="请输入用户名/手机号" label=""></mt-field>
          <mt-field type="password" v-model="password" placeholder="请输入密码" label=""></mt-field>
    </div>
    <div class="single_cell">
        <mt-button id="login_button" size="large" type="primary" @click="login">开始使用</mt-button>
    </div>
    <img class="login_background" src="../img/login_background.png">
  </div>
</template>
<style scoped>
  #login{
    text-align: center;
    height: calc(100vh);
    background-size: cover;
    overflow-y: hidden;
  }

  #login .single_cell {
    border-top: 10px solid #fafafa00;
  }

  #login .login-form{
    padding-top: 80px;
  }
  #login .logo{
    padding-top: 110px;
  }
  #login .login-form{
    padding-top: 70px;
    opacity: 0.5;
  }
  /*#login .login-form .mint-cell{*/
    /*width: calc(60vw);*/
  /*}*/
  #login .login_background{
    position: fixed;
    left: 0;
    bottom: 0;
    width: calc(100vw);
    z-index: -1;
  }
  #login .mint-header {
    position: absolute;
  }
</style>
<script>
import MintUI from 'mint-ui'
export default{
  mounted () {
    let vm = this
    vm.rememberPassword()
    vm.resize()
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
    rememberPassword () {
      let vm = this
      let token = localStorage.getItem('token')
      if (token) {
        vm.$router.push({
          path: 'main'
        })
      }
    },
    resize () {
      /* eslint-disable */
      let clientHeight = document.documentElement.clientHeight
      $(window).on('resize', function () {
        let bodyHeight = document.body.scrollHeight
        if (bodyHeight < clientHeight) {
          $('#login .login_background').css('position', 'relative')
        } else {
          $('#login .login_background').css('position', 'fixed')
        }
      })
      $('#login [type="password"]').on('focus', function() {
        $('#login .login_background').css('position', 'relative')
      })
      $('#login [type="password"]').on('blur', function() {
        $('#login .login_background').css('position', 'fixed')
      })
    },
    login () {
      MintUI.Indicator.open()
      if (!this.username) {
        setTimeout(function () {
          MintUI.Indicator.close()
        }, 500)
        MintUI.Toast('请输入用户名或者手机号')
        return
      }
      if (!this.password) {
        setTimeout(function () {
          MintUI.Indicator.close()
        }, 500)
        MintUI.Toast('请输入密码')
        return
      }
      setTimeout(function () {
        MintUI.Indicator.close()
      }, 500)
      let params = {}
      params.loginName = this.username
      params.password = this.password
      let loginVm = this
      this.getPostData(this.$global.SERVER_USER.LOGIN, params, function (response) {
        if (response.data && response.data.state === -1) {
          MintUI.Toast(response.data.msg)
        }
        if (response.data && response.data.state === 1) {
          localStorage.setItem('token', response.data.result.token)
          loginVm.saveRegistrationId()
          if (loginVm.$route.query.redirect) {
            let redirect = loginVm.$route.query.redirect.substring(1)
            loginVm.$router.push({
              path: redirect
            })
          } else {
            loginVm.$router.push({
              path: 'main'
            })
          }
        }
      })
    }
  },
  data () {
    return {
      username: '',
      password: ''
    }
  }
}

</script>
