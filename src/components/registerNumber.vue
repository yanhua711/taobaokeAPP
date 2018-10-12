<template>
  <div id="registerNumber">
    <mt-header class="main_head" fixed title="数量登记">
      <router-link to="/wine" slot="left">
        <mt-button>           <img height="35" width="35" src="../img/back.png">         </mt-button>
      </router-link>
    </mt-header>
    <div class="wine_info">
      <div>
        <mt-cell :title="title" value="价格" is-link="" :to="winePricesUrl"></mt-cell>
      </div>
      <div>
        <mt-field label="瓶数" placeholder="" type="number" v-model="number">瓶</mt-field>
      </div>
      <div>
        <mt-field label="成交单价" placeholder="" type="number" v-model="unitPrice">元</mt-field>
      </div>
      <div>
        <mt-field label="成交总价" placeholder="" type="number" v-model="totalPrice">元</mt-field>
      </div>
    </div>
    <mt-tabbar class="feast_save" v-model="confirm">
      <mt-tab-item id="confirm" class="feast_confirm">
        确认
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<style>
#registerNumber .wine_info {
  padding-top: 50px;
}
#registerNumber .feast_confirm {
  background-color: #26a2ff;
  color: white;
}
#registerNumber .mint-cell-wrapper {
  background-image: -webkit-gradient(linear, left top, left bottom, from(#d9d9d9), color-stop(50%, #fff), color-stop(50%, transparent)) !important;
}
#registerNumber .mint-tab-item-label {
  font-size: 20px;
  line-height: inherit;
}
</style>
<script>
export default {
  name: 'registerNumber',
  watch: {
    confirm: function (val, oldVal) {
      let vm = this
      if (val === 'confirm') {
        let bo = vm.$global.REGEX.IS_INTEGER.test(vm.number)
        if (!bo) {
          alert('瓶数只能为正整数')
        } else {
          alert(vm.number + ',' + vm.unitPrice + ',' + vm.totalPrice)
        }
      }
    }
  },
  mounted: function () {
    let vm = this
    if (vm.$route.fullPath) {
      let id = vm.$route.query.id
      if (id === '1') {
        vm.title = '马爹利蓝带 35cl'
      } else if (id === '2') {
        vm.title = '马爹利蓝带 70cl'
      }
      vm.winePricesUrl = '/winePrices?id=' + id
    }
  },
  data () {
    return {
      id: '',
      title: '',
      winePricesUrl: '',
      number: '',
      unitPrice: '',
      totalPrice: '',
      confirm: ''
    }
  }
}
</script>

<style scoped>

</style>
