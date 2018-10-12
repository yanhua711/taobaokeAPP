<template>
  <div id="tab-bar">
    <mt-tabbar v-model="selected" v-show="isShow" fixed class="border-1px-top">
      <mt-tab-item id="main" style="left: 0;">
        <img src="../img/index.png" slot="icon">首页
      </mt-tab-item>
      <mt-tab-item id="feastMain" style="left: 130px;">
        <img src="../img/demo.png" slot="icon"><span id="feastTitle">宴会管理</span>
      </mt-tab-item>
      <mt-tab-item id="statisticalInfo" style="left: 50px;">
        <img src="../img/statistics.png" slot="icon">统计信息
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<style>
  /*.mint-tab-item{*/
    /*position: absolute;*/
  /*}*/
  /*.mint-tab-item-icon{*/
    /*text-align: center;*/
  /*}*/
</style>
<script>
export default {
  mounted: function () {
    let vm = this
    if (vm.$route.fullPath) {
      vm.selected = vm.$route.fullPath.substring(1)
    }
  },
  data () {
    return {
      selected: 'main'
    }
  },
  computed: {
    isShow: function () {
      return true
    }
  },
  watch: {
    'selected': {
      handler () {
        if (this.selected === 'main') {
          this.$router.push('/main')
          return
        }
        let vm = this
        if (this.selected === 'statisticalInfo') {
          vm.$router.push({
            path: 'statisticalInfo'
          })
          return
        }
        if (this.selected === 'feastMain') {
          vm.$router.push({
            path: 'feastMain' // 宴会登记
          })
        }
        if (this.selected === 'tool') {
          vm.$router.push({
            path: 'tool'
          })
        }
      }
    }
  }
}
</script>
