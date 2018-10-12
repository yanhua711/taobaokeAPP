<template>
  <div id="my">
    <mt-header class="main_head" fixed title="我的主页">
      <router-link to="/main" slot="left">
        <mt-button>
          <img height="35" width="35" src="../img/back.png">
        </mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
    <div class="content">
      <mt-field label="姓名" placeholder="请输入姓名" v-model="name"></mt-field>
      <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
      <p><mt-button style="width: calc(100vw);" type="danger" class="logout" @click="logout">注销登录</mt-button></p>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>
<style scoped>
  #my{
    display: flex;
    justify-content: center;
    /*margin-top: 100px;*/
  }
  #my .content {
    padding-top: 50px;
    width: calc(100vw);
  }
</style>
<script>
import FooterBar from './FooterBar.vue'
export default{
  mounted () {
    this.initUser()
  },
  methods: {
    initUser () {
      var vm = this
      vm.getPostData(vm.$global.SERVER_USER.USER_INFO, {}, function (response) {
        if (response.data && response.data.result && response.data.result.user) {
          let user = response.data.result.user
          vm.name = user.name
          vm.email = user.email
        }
      })
    },
    logout () {
      let vm = this
      localStorage.setItem('token', '')
      vm.$router.push({
        path: 'login'
      })
    }
  },
  data: function () {
    return {
      'name': '',
      'email': ''
    }
  },
  components: {
    'footer-bar': FooterBar
  }
}
</script>
