<template>
  <div id="messageList">
    <mt-header class="main_head" fixed title="消息列表">
      <router-link to="/main" slot="left">
        <mt-button>
          <img height="35" width="35" src="../img/back.png">
        </mt-button>
      </router-link>
    </mt-header>
    <div class="content">
      <mt-cell v-for="item in searchResult" :key="item.id" is-link="" @click.native.capture="messageClick(item.url, item.id)">
        <img slot="icon" src="../img/message_logo.png" width="25" height="25">
        <span slot="title">
          <span class="title">{{item.title}}</span>
          <div class="message_content">{{item.content}}</div>
        </span>
        <div class="time">
          <div>{{item.time}}</div>
          <div class="read_flag" v-if="item.readFlag == 'false'"></div>
        </div>
      </mt-cell>
    </div>
  </div>
</template>
<style>
  #messageList {
    display: flex;
    justify-content: center;
    /*margin-top: 100px;*/
  }
  #messageList .content {
    padding-top: 50px;
    width: calc(100vw);
  }
  #messageList .content .mint-search-list {
    padding-top: 96px;
  }
  #messageList .content .mint-cell {
    min-height: 65px;
    background-image: linear-gradient(0deg, #ffffff, #ffffff 50%, transparent 50%);
  }
  #messageList .content .mint-cell-wrapper {
    background-image: linear-gradient(0deg, #ffffff, #ffffff 50%, transparent 50%);
  }
  #messageList .content .read_flag {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: red;
    margin: 2px -4px 0 4px
  }
  #messageList .content .time {
    font-size: 0.9rem;
    display: inline-flex;
  }
  #messageList .content .message_content {
    font-size: 0.8rem;
    line-height: 1.2rem;
  }
  #messageList .content .title {
    color: #000000;
  }
</style>
<script>
export default{
  mounted () {
    let vm = this
    vm.getMessageList()
    sessionStorage.removeItem('messageFlag')
  },
  methods: {
    messageClick (url, id) {
      let vm = this
      let param = {}
      param.id = id
      vm.getPostData(vm.$global.SERVER_MESSAGE.UPDATE_READ_FLAG, param, function (result) {
        if (result.data && result.data.state === 1) {
          vm.$router.push({
            path: url
          })
        }
      })
    },
    getMessageList () {
      let vm = this
      let param = {}
      param.type = '1' // 消息类型为App
      vm.getPostData(vm.$global.SERVER_MESSAGE.GET_MESSAGE_LIST, param, function (result) {
        if (result.data.state === 1) {
          let bizBanquetMsgList = result.data.result.bizBanquetMsgList
          for (let i = 0; i < bizBanquetMsgList.length; i++) {
            let createTime = bizBanquetMsgList[i].createTime.slice(bizBanquetMsgList[i].createTime.indexOf('-') + 1)
            createTime = createTime.slice(0, createTime.lastIndexOf(':'))
            let item = bizBanquetMsgList[i]
            vm.searchResult.push(item)
          }
        }
      })
    }
  },
  data: function () {
    return {
      searchResult: []
    }
  },
  components: {
  }
}
</script>
