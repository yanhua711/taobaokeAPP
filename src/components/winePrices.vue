<template>
  <div id="winePrices">
    <mt-header class="main_head" fixed title="价格登记">
      <router-link :to="registerNumberUrl" slot="left">
        <mt-button>           <img height="35" width="35" src="../img/back.png">         </mt-button>
      </router-link>
    </mt-header>
    <div class="wine_info">
      <div>
        <mt-cell :title="title"></mt-cell>
      </div>
      <div>
        <mt-field label="店面价" type="number" placeholder="" v-model="storePrice">元</mt-field>
      </div>
      <div>
        <mt-field label="折扣价" type="number" placeholder="" v-model="discountPrice">元</mt-field>
      </div>
    </div>
    <mt-tabbar class="feast_option" v-model="confirm">
      <mt-tab-item id="confirm" class="feast_confirm">
        确认
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<style>
  #winePrices .wine_info {
    padding-top: 50px;
  }
  #winePrices .feast_confirm {
    background-color: #26a2ff;
    color: white;
  }
  #winePrices .mint-cell-wrapper {
    background-image: -webkit-gradient(linear, left top, left bottom, from(#d9d9d9), color-stop(50%, #fff), color-stop(50%, transparent)) !important;
  }
  #winePrices .feast_option {
    color: white;
    position: fixed;
  }
  #winePrices .mint-tab-item-label {
    font-size: 20px;
    line-height: inherit;
  }
</style>
<script>
export default {
  name: 'winePrice',
  watch: {
    confirm: function (val, oldVal) {
      if (val === 'confirm') {
        alert(this.storePrice + ',' + this.discountPrice)
      }
    }
  },
  mounted: function () {
    if (this.$route.fullPath) {
      let id = this.$route.query.id
      if (id === '1') {
        this.title = '马爹利蓝带 35cl'
      } else if (id === '2') {
        this.title = '马爹利蓝带 70cl'
      }
      this.registerNumberUrl = 'registerNumber?id=' + id
    }
  },
  data () {
    return {
      title: '',
      storePrice: '',
      discountPrice: '',
      confirm: '',
      registerNumberUrl: ''
    }
  }
}
</script>

<style scoped>

</style>
