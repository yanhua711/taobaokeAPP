<template>
  <div id="mixedWinePerson">
    <mt-header class="main_head" fixed title="宴会人员">
      <router-link :to="feastInfoUrl" slot="left">
        <mt-button>           <img height="35" width="35" src="../img/back.png">         </mt-button>
      </router-link>
    </mt-header>
    <div class="person_content">
      <div class="mixedWinePersons">
        <mt-cell-swipe v-for="item in searchResult" :key="item.id" :title="item.name" :label="item.type" is-link="" :to="item.addPersonUrl"
                       :right="[
          {
            content: '删除',
            style: { background: 'red', color: '#fff' },
            handler: () => deleteBanquetPerson(item.id)
          }
        ]">
        </mt-cell-swipe>
      </div>
    </div>
    <mt-tabbar class="person_option" style="display: none">
      <mt-tab-item id="addPerson" class="person_addPerson" @click.native.capture="addPerson()">
        新增宴会人员
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<style>
  #mixedWinePerson .person_content {
    padding-top: 50px;
  }
  #mixedWinePerson .person_content .mint-search-list {
    padding-top: 140px;
  }
  #mixedWinePerson .mint-search {
    height: 100%;
  }
  #mixedWinePerson .person_content .mt_badge{
    padding: 6px 2px;
    vertical-align: middle;
  }
  #mixedWinePerson .mixedWinePersons .mint-cell-wrapper {
    padding: 0px;
  }
  #mixedWinePerson .mint-cell-wrapper {
    /*font-size: 14px;*/
  }
  #mixedWinePerson .add_person .mint-cell {
    min-height: 29px;
  }
  #mixedWinePerson .add_person {
    /*border-bottom: 1px solid #d9d9d9;*/
  }
  #mixedWinePerson .person_content .mint-search-list {
    padding-top: 113px;
  }
  /*#mixedWinePerson .mint-cell-wrapper {*/
    /*background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);*/
  /*}*/
  #mixedWinePerson .mint-cell:last-child {
    background-image: -webkit-gradient(linear, left top, left bottom, from(#fff), color-stop(50%, #fff), color-stop(50%, transparent));
    background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%);
  }
  #mixedWinePerson .feast_save {
    background-color: #26a2ff;
    color: white;
  }
  /*#mixedWinePerson .feast_confirm {*/
    /*background-color: #26a2ff;*/
    /*color: white;*/
  /*}*/
  /*#mixedWinePerson .mint-checkbox-label {*/
    /*vertical-align: -5px;*/
    /*margin-left: 6px;*/
  /*}*/
  #mixedWinePerson .person_addPerson {
    background-color: #26a2ff;
    color: white;
  }
  #mixedWinePerson .person_option {
    color: white;
    position: fixed;
  }
  #mixedWinePerson .mint-tab-item-label {
    font-size: 20px;
    line-height: inherit;
  }
  #mixedWinePerson .mint-cell-title {
    margin-left: 10px;
  }
</style>
<script>
import MintUI from 'mint-ui'
export default {
  name: 'mixedWinePerson',
  mounted: function () {
    let vm = this
    vm.initMixedWinePerson()
  },
  methods: {
    initMixedWinePerson () {
      let vm = this
      let id = vm.$route.query.id
      if (id) {
        sessionStorage.setItem('bizBanquetId', id)
        vm.banquetId = id
      }
      let flag = sessionStorage.getItem('infoFlag') // 根据infoFlag判读是否返回宴会信息页面
      if (flag && flag === 'info') {
        vm.feastInfoUrl = '/feastInfo?id=' + id
      }
      // let banquetState = sessionStorage.getItem('banquetState')
      // let roleId = localStorage.getItem('roleId')
      // if (banquetState && roleId) {
      //   // 角色为批发商并且宴会状态为待备酒 不能操作宴会人员
      //   if (roleId === vm.$global.ROLE.PFS && banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_DBJ) {
      //     $('.person_option').css('display', 'none')
      //   }
      //   if (roleId === vm.$global.ROLE.PFS && banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_YBJ) {
      //     // 角色为批发商并且宴会状态为已备酒 不能操作宴会人员
      //     $('.person_option').css('display', 'none')
      //   }
      //   if (banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_JL) {
      //     // 宴会状态为奖励 不能操作宴会人员
      //     $('.person_option').css('display', 'none')
      //   }
      // }
      let banquetButton = sessionStorage.getItem('banquetButton')
      banquetButton = JSON.parse(banquetButton)
      if (banquetButton) {
        if (banquetButton.add_person == 'true') {
          $('.person_option').css('display', 'block')
        } else {
          $('.person_option').css('display', 'none')
        }
      }
      sessionStorage.removeItem('banquetPersonId')
      vm.getBanquetPersonList(id)
    },
    addPerson () {
      let vm = this
      let banquetId = vm.banquetId
      if (banquetId) {
        vm.$router.push({
          path: '/addPerson?banquetId=' + banquetId
        })
      } else {
        MintUI.Toast('宴会不存在')
      }
    },
    getBanquetPersonList (id) {
      let vm = this
      if (id) {
        let parm = {}
        parm.banquetId = id
        vm.getPostData(vm.$global.SERVER_BANQUET_PERSON.GET_BANQUET_PERSON_LIST, parm, function (response) {
          if (response.data && response.data.state === 1) {
            vm.searchResult = response.data.result.personList
          }
        })
      } else {
        MintUI.Toast('宴会不存在')
      }
    },
    deleteBanquetPerson (id) {
      let vm = this
      if (id) {
        let parm = {}
        parm.id = id
        MintUI.MessageBox.confirm('确定要删除吗').then(action => {
          let roleId = localStorage.getItem('roleId')
          let banquetState = sessionStorage.getItem('banquetState')
          if (roleId === vm.$global.ROLE.PFS || banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_JL) {
            MintUI.Toast('权限不足，无法执行删除宴会人员操作')
          } else {
            vm.getPostData(vm.$global.SERVER_BANQUET_PERSON.DELETE_BANQUET_PERSON, parm, function (response) {
              if (response.data && response.data.state === 1) {
                MintUI.Toast(response.data.msg)
                vm.getBanquetPersonList(vm.banquetId)
              }
            })
          }
        })
      }
    }
  },
  data () {
    return {
      prcValue: '',
      popupVisible: false,
      showList: true,
      confirm: '',
      searchResult: [],
      banquetId: '',
      addPersonUrl: '',
      feastInfoUrl: '',
    }
  }
}
</script>

<style scoped>

</style>
