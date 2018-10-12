<template>
  <div id="chooseWineType">
    <mt-header class="main_head" fixed title="选择酒类类型">
      <router-link :to="addWineUrl" slot="left">
        <mt-button>
          <img height="35" width="35" src="../img/back.png">
        </mt-button>
      </router-link>
    </mt-header>
    <div class="person_content">
      <mt-search v-model="searchValue" :show="showList" :result.sync="searchWineTypes">
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
          <mt-loadmore  @translate-change="translateChange" @top-status-change="handleTopChange"       :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
            <mt-cell v-for="item in lazyResult" :key="item.bizWineId" :title="item.bizWineIdValue" is-link="" :to="item.addWineUrl"> </mt-cell>
            <div slot="bottom" class="mint-loadmore-bottom">
              <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
              <span v-show="bottomStatus === 'loading'">
                <mt-spinner type="snake"></mt-spinner>
              </span>
            </div>
          </mt-loadmore>
        </div>
      </mt-search>
    </div>
  </div>
</template>
<style>
  #chooseWineType .page-loadmore-wrapper {
    overflow: scroll
  }
  #chooseWineType .mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
  }

  #chooseWineType .mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
  }

  #chooseWineType .person_content {
    padding-top: 50px;
  }
  #chooseWineType .mint-search {
    height: 100%;
  }
  #chooseWineType .person_content .mt_badge{
    padding: 6px 2px;
    vertical-align: middle;
  }
  #chooseWineType .chooseWineTypes .mint-cell-wrapper {
    padding: 0px;
  }
  #chooseWineType .mint-cell-wrapper {
    /*font-size: 14px;*/
  }
  #chooseWineType .add_person .mint-cell {
    min-height: 29px;
  }
  #chooseWineType .add_person {
    /*border-bottom: 1px solid #d9d9d9;*/
  }
  #chooseWineType .person_content .mint-search-list {
    padding-top: 52px;
  }
  /*#chooseWineType .mint-cell-wrapper {*/
    /*background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);*/
  /*}*/
  /*#chooseWineType .mint-cell:last-child {*/
    /*background-image: -webkit-gradient(linear, left top, left bottom, from(#d9d9d9), color-stop(50%, #fff), color-stop(50%, transparent));*/
    /*background-image: linear-gradient(180deg, #d9d9d9, #fff 50%, transparent 50%);*/
  /*}*/
  #chooseWineType .feast_save {
    background-color: #26a2ff;
    color: white;
  }
  /*#chooseWineType .feast_confirm {*/
    /*background-color: #26a2ff;*/
    /*color: white;*/
  /*}*/
  /*#chooseWineType .mint-checkbox-label {*/
    /*vertical-align: -5px;*/
    /*margin-left: 6px;*/
  /*}*/
  #chooseWineType .mint-search-list-warp {
    margin-top: 50px;
  }
  #chooseWineType .mint-cell-wrapper {
    padding: 0;
  }
  #chooseWineType .mint-cell-title {
    margin-left: 10px;
  }
</style>
<script>
import MintUI from 'mint-ui'
export default {
  name: 'chooseWineType',
  mounted: function () {
    let vm = this
    vm.wrapperHeight = document.documentElement.clientHeight - vm.$refs.wrapper.getBoundingClientRect().top
    if (vm.$route.fullPath) {
      let banquetId = vm.$route.query.banquetId || ''
      if (banquetId && banquetId !== 'null' && banquetId !== 'undefined') {
        vm.addWineUrl = '/addWine?banquetId=' + banquetId
        vm.banquetId = banquetId
      } else {
        vm.virtualWine = true
        vm.addWineUrl = '/addWine?banquetWineId=' + vm.$route.query.banquetWineId + '&bizBanquetId=&virtualWine=true&editState=true'
      }
    }
    vm.getWineTypes()
  },
  methods: {
    getWineTypes () {
      MintUI.Indicator.open()
      let vm = this
      let parm = {}
      parm.banquetId = vm.banquetId || ''
      parm.searchValue = vm.searchValue || ''
      vm.getPostData(vm.$global.SERVER_BANQUET_WINE.GET_BANQUET_WINE_TPYE, parm, function (response) {
        if (response.data && response.data.state === 1) {
          if (vm.virtualWine) {
            let wineTypes = response.data.result.wineTypes
            if (wineTypes && wineTypes.length) {
              for (let i = 0; i < wineTypes.length; i++) {
                if (vm.virtualWine && vm.$route.query.editState) {
                  wineTypes[i].addWineUrl += '&virtualWine=true&editState=true&banquetWineId=' + vm.$route.query.banquetWineId || ''
                } else {
                  wineTypes[i].addWineUrl += '&virtualWine=true&banquetWineId=' + vm.$route.query.banquetWineId || ''
                }
              }
            }
            vm.result = wineTypes
            vm.searchResult = wineTypes
          } else {
            vm.result = response.data.result.wineTypes
            vm.searchResult = response.data.result.wineTypes
          }
        }
        MintUI.Indicator.close()
      })
    },
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadBottom () {
      setTimeout(() => {
        let vm = this
        let count = 0
        if (!vm.lazyResult) {
          return
        } else {
          count = vm.lazyResult.length
        }
        let result = vm.searchResult
        if (result && result.length > 0) {
          if (result.length && count <= result.length) {
            for (let i = 0; i < 20; i++) {
              if ((count + i) < result.length) {
                vm.lazyResult.push(result[count + i])
              } else {
                break
              }
            }
          } else {
            this.allLoaded = true
          }
          if (result.length <= 20) {
            vm.allLoaded = true
          } else {
            this.$refs.loadmore.onBottomLoaded()
          }
        }
      }, 200)
    },
    handleTopChange (status) {
      this.moveTranslate = 1
      this.topStatus = status
    },
    translateChange (translate) {
      const translateNum = +translate
      this.translate = translateNum.toFixed(2)
      this.moveTranslate = (1 + translateNum / 70).toFixed(2)
    }
    // loadTop () {
    //   setTimeout(() => {
    //     let vm = this
    //     let firstValue = vm.searchResult[0]
    //     for (let i = 1; i <= 10; i++) {
    //       vm.searchResult.unshift(firstValue - i)
    //     }
    //     this.$refs.loadmore.onTopLoaded()
    //   }, 1500);
    // }
  },
  data () {
    return {
      prcValue: '',
      popupVisible: false,
      showList: true,
      searchContent: '',
      banquetId: '',
      searchValue: '',
      result: [],
      searchResult: [],
      addWineUrl: '',
      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0,
      topStatus: '',
      translate: 0,
      moveTranslate: 0,
      virtualWine: false,
      lazyResult: [],
      firstSearch: true
    }
  },
  computed: {
    searchWineTypes () {
      let vm = this
      let myArray = []
      vm.result.filter(function (value) {
        let reg = new RegExp(vm.searchValue, 'i').test(value.bizWineIdValue)
        let regPy = new RegExp(vm.searchValue, 'i').test(value.bizWineIdValuePy)
        if (reg || regPy) {
          myArray.push(value)
        }
      })
      vm.searchResult = myArray
      if (vm.firstSearch) {
        vm.firstSearch = false
      } else {
        vm.lazyResult = []
        vm.loadBottom()
      }
      return []
    }
  }
}
</script>

<style scoped>

</style>
