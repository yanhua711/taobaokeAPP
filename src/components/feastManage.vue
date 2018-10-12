<template>
  <div id="feastManage">
    <mt-header class="main_head" fixed title="宴会管理">
      <router-link to="/main" slot="left">
        <mt-button>
          <img height="35" width="35" src="../img/back.png">
        </mt-button>
      </router-link>
      <router-link to="/feastInfo" slot="right">
        <img src="../img/plus01.png" style="width: 18px">
      </router-link>
    </mt-header>
    <mt-search v-model="searchValue" :show="showList" :result.sync="searchBanquet">
      <mt-cell v-for="item in searchResult" :key="item.id" :title="item.title" :label="item.label" is-link="" :to="item.feastInfoUrl"> </mt-cell>
    </mt-search>
  </div>
</template>

<script>
export default {
  name: 'feastManage',
  mounted: function () {
    let vm = this
    vm.getBanquetList()
  },
  methods: {
    getBanquetList () {
      let vm = this
      let userId = localStorage.getItem('userId')
      let param = {}
      param.groupId = userId
      vm.getPostData(vm.$global.SERVER_BANQUET.GET_BANQUET_LIST, param, function (response) {
        if (response.data && response.data.state === 1) {
          vm.result = response.data.resultMapList
          vm.searchResult = response.data.resultMapList
        }
      })
    }
  },
  data () {
    return {
      showList: true,
      searchValue: '',
      result: [],
      searchResult: []
    }
  },
  computed: {
    searchBanquet () {
      let vm = this
      let myArray = []
      vm.result.filter(function (value) {
        let reg = new RegExp(vm.searchValue, 'i').test(value.title)
        if (reg) {
          myArray.push(value)
        }
      })
      vm.searchResult = myArray
      return []
    }
  }
}
</script>

<style>
  #feastManage .mint-searchbar {
    margin-top: 50px;
  }
  #feastManage .mt_badge {
    padding: 6px 2px !important;
    vertical-align: middle;
  }
  #feastManage .mint-cell {
    min-height: 48px;
    margin-left: -10px;
  }
  #feastManage .mint-search-list-warp {
    margin-top: 48px;
  }
  #feastManage .mint-cell-title {
    margin-left: 10px;
  }
</style>
