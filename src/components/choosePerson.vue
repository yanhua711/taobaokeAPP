<template>
  <div id="choosePerson">
    <mt-header class="main_head" fixed title="选择宴会人员">
      <router-link :to="addPersonUrl" slot="left">
        <mt-button>
          <img height="35" width="35" src="../img/back.png">
        </mt-button>
      </router-link>
    </mt-header>
    <div class="person_content">
      <mt-search v-model="searchValue" :show="showList" :result.sync="searchPersonTypes">
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
          <mt-loadmore  @translate-change="translateChange" @top-status-change="handleTopChange"       :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
            <mt-cell v-for="item in lazyResult" :key="item.id" :title="item.name" is-link="" :to="item.addPersonUrl"> </mt-cell>
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
  #choosePerson .page-loadmore-wrapper {
    overflow: scroll
  }
  #choosePerson .mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
  }

  #choosePerson .mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
  }

  #choosePerson .person_content {
    padding-top: 50px;
  }
  #choosePerson .mint-search {
    height: 100%;
  }
  #choosePerson .person_content .mt_badge{
    padding: 6px 2px;
    vertical-align: middle;
  }
  #choosePerson .choosePersons .mint-cell-wrapper {
    padding: 0px;
  }
  #choosePerson .mint-cell-wrapper {
    /*font-size: 14px;*/
  }
  #choosePerson .add_person .mint-cell {
    min-height: 29px;
  }
  #choosePerson .add_person {
    /*border-bottom: 1px solid #d9d9d9;*/
  }
  #choosePerson .person_content .mint-search-list {
    padding-top: 52px;
  }
  /*#choosePerson .mint-cell-wrapper {*/
  /*background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);*/
  /*}*/
  /*#choosePerson .mint-cell:last-child {*/
  /*background-image: -webkit-gradient(linear, left top, left bottom, from(#d9d9d9), color-stop(50%, #fff), color-stop(50%, transparent));*/
  /*background-image: linear-gradient(180deg, #d9d9d9, #fff 50%, transparent 50%);*/
  /*}*/
  #choosePerson .feast_save {
    background-color: #26a2ff;
    color: white;
  }
  /*#choosePerson .feast_confirm {*/
  /*background-color: #26a2ff;*/
  /*color: white;*/
  /*}*/
  /*#choosePerson .mint-checkbox-label {*/
  /*vertical-align: -5px;*/
  /*margin-left: 6px;*/
  /*}*/
  #choosePerson .mint-search-list-warp {
    margin-top: 50px;
  }
  #choosePerson .mint-cell-wrapper {
    padding: 0;
  }
  #choosePerson .mint-cell-title {
    margin-left: 10px;
  }
</style>
<script>
import MintUI from 'mint-ui'
export default {
  name: 'choosePerson',
  mounted: function () {
    let vm = this
    vm.wrapperHeight = document.documentElement.clientHeight - vm.$refs.wrapper.getBoundingClientRect().top
    if (vm.$route.query.id) {
      let id = vm.$route.query.id || ''
      vm.id = id
      vm.addPersonUrl = '/addPerson?backAddPersonId=' + id
    } else {
      vm.addPersonUrl = '/addPerson?backAddPersonId=' + '-1'
    }
    vm.getPersonList()
  },
  methods: {
    getPersonList () {
      let vm = this
      let parm = {}
      parm.id = vm.$route.query.id || ''
      parm.searchValue = vm.searchValue || ''
      MintUI.Indicator.open()
      vm.getPostData(vm.$global.SERVER_BANQUET_PERSON.GET_PERSONS, parm, function (response) {
        if (response.data && response.data.state === 1) {
          vm.result = response.data.result.personList
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
            vm.allLoaded = false
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
    },
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
      id: '',
      searchValue: '',
      result: [],
      addPersonUrl: '',
      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0,
      topStatus: '',
      translate: 0,
      moveTranslate: 0,
      lazyResult: [],
      searchResult: [],
      firstSearch: true
    }
  },
  computed: {
    searchPersonTypes () {
      let vm = this
      let myArray = []
      vm.result.filter(function (value) {
        let reg = new RegExp(vm.searchValue, 'i').test(value.name)
        let regPy = new RegExp(vm.searchValue, 'i').test(value.namePy)
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
