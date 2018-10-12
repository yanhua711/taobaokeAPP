<template>
  <div id="feastTrace">
    <mt-header class="main_head" fixed title="宴会跟踪">
      <router-link to="/main" slot="left">
        <mt-button>           <img height="35" width="35" src="../img/back.png">         </mt-button>
      </router-link>
    </mt-header>
    <div class="feastTitle">
      <mt-navbar v-model="selected">
        <mt-tab-item id="confirm">待确认</mt-tab-item>
        <mt-tab-item id="send">待送酒</mt-tab-item>
        <mt-tab-item id="end">已结束</mt-tab-item>
      </mt-navbar>
    </div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="confirm">
        <div class="feast_content">
          <div class="first_line">
            <div class="date">
              <mt-cell title="1" value="06-09">
              </mt-cell>
            </div>
            <div class="feastName">
              <mt-cell title="王府家宴">
              </mt-cell>
            </div>
            <div class="count">
              <mt-cell title="80桌">
              </mt-cell>
            </div>
          </div>
          <div class="second_line">
            <div class="customerName">
              <mt-cell title="王先生" class="first_content">
              </mt-cell>
            </div>
            <div class="address">
              <mt-cell title="安海华达酒店四楼">
              </mt-cell>
            </div>
            <div class="phone">
              <mt-cell title="18088888888">
              </mt-cell>
            </div>
          </div>
        </div>
        <div class="feast_content">
          <div class="first_line">
            <div class="date">
              <mt-cell title="2" value="07-19">
              </mt-cell>
            </div>
            <div class="feastName">
              <mt-cell title="张府婚宴">
              </mt-cell>
            </div>
            <div class="count">
              <mt-cell title="60桌">
              </mt-cell>
            </div>
          </div>
          <div class="second_line">
            <div class="customerName">
              <mt-cell title="张先生" class="first_content">
              </mt-cell>
            </div>
            <div class="address">
              <mt-cell title="艾德拉斯酒店三楼">
              </mt-cell>
            </div>
            <div class="phone">
              <mt-cell title="15888888888">
              </mt-cell>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="send">
        <div class="feast_content">
          <div class="first_line">
            <div class="date">
              <mt-cell title="1" value="06-09">
              </mt-cell>
            </div>
            <div class="feastName">
              <mt-cell title="王府家宴">
              </mt-cell>
            </div>
            <div class="count">
              <mt-cell title="80桌">
              </mt-cell>
            </div>
          </div>
          <div class="second_line">
            <div class="customerName">
              <mt-cell title="王先生" class="first_content">
              </mt-cell>
            </div>
            <div class="address">
              <mt-cell title="安海华达酒店四楼">
              </mt-cell>
            </div>
            <div class="phone">
              <mt-cell title="18088888888">
              </mt-cell>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="end">
        <div class="feast_content">
          <div class="first_line">
            <div class="date">
              <mt-cell title="1" value="06-09">
              </mt-cell>
            </div>
            <div class="feastName">
              <mt-cell title="王府家宴">
              </mt-cell>
            </div>
            <div class="count">
              <mt-cell title="80桌" value="开300瓶">
              </mt-cell>
            </div>
          </div>
          <div class="second_line">
            <div class="customerName">
              <mt-cell title="王先生" class="first_content">
              </mt-cell>
            </div>
            <div class="address">
              <mt-cell title="安海华达酒店四楼">
              </mt-cell>
            </div>
            <div class="phone">
              <mt-cell title="18088888888">
              </mt-cell>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<style>
  #feastTrace {
    padding-top: 50px;
  }
  /*.feastTitle {*/
    /*border-bottom: 1px #d9d9d9 solid;*/
  /*}*/
  #feastTrace .feast_content {
    border-bottom: 1px #d9d9d9 solid;
  }
  #feastTrace .first_line {
    display: inline-flex;
  }
  #feastTrace .second_line {
    display: -webkit-inline-box;
  }
  .mint-tab-item-label {
    /*font-size: 15px;*/
  }
  /*.mint-cell-value {*/
    /*font-size: 14px;*/
  /*}*/

  #feastTrace .mint-cell {
    background-color :#fff;
  }

  /*.count .mint-cell-text {*/
    /*font-size: 12px;*/
  /*}*/

  /*.address .mint-cell-text {*/
    /*font-size: 12px;*/
  /*}*/

  /*.phone .mint-cell-text {*/
    /*font-size: 12px;*/
  /*}*/

  #feastTrace .first_line .date {
    width: calc(20vw);
  }

  #feastTrace .first_line .feastName {
    width: calc(43vw);
  }

  #feastTrace .first_line .count {
    width: calc(33vw);
  }

  #feastTrace .second_line .customerName {
    width: calc(20vw);
  }

  #feastTrace .second_line .address {
    width: calc(43vw);
  }

  #feastTrace .second_line .phone {
    width: calc(33vw);
  }
  #feastTrace .mint-navbar .mint-tab-item.is-selected {
    margin-bottom: 1px;
  }
  #feastTrace .feast_content .mint-cell {
    background-image: none;
  }
  #feastTrace .feast_content .mint-cell-wrapper {
    background-image: none;
  }
</style>
<script>
export default {
  name: 'feastTrace',
  mounted: function () {
    if (this.$route.fullPath) {
      this.selected = this.$route.query.selected
    }
  },
  data () {
    return {
      selected: '',
      feastDate: '06-09',
      feastName: '王府家宴',
      counts: '80桌'
    }
  }
}
</script>

<style scoped>

</style>
