<template>
  <div id="photoScene">
    <mt-header class="main_head" fixed title="现场照片">
      <router-link :to="feastInfoUrl" slot="left">
        <mt-button>           <img height="35" width="35" src="../img/back.png">         </mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
    <div>
      <div class="twoRow" >
        <div class="upload" style="border-right: 4px #fff solid">
          <mt-actionsheet
            :actions="actions"
            v-model="sheetVisible">
          </mt-actionsheet>
          <div class="banquetImgDiv">
            <img id="banquetStart" class="banquetImg" preview="0" :src="displaySrc" />
          </div>
          <span class="titleSpan">陈列</span>
          <img slot="icon" src="../img/upload.png" class="photoImg" @click="choosePicture('banquetStart')">
        </div>
        <div class="upload">
          <mt-actionsheet
            :actions="actions"
            v-model="sheetVisible">
          </mt-actionsheet>
          <div class="banquetImgDiv">
            <img id="banquetProceed" class="banquetImg" preview="1" :src="mixedPersonSrc"/>
          </div>
          <span class="titleSpan">调酒人员</span>
          <img slot="icon" src="../img/upload.png" class="photoImg" @click="choosePicture('banquetProceed')">
        </div>
      </div>
      <div style="background-color: #fff; height: 4px"></div>
      <div class="oneRow">
        <div class="upload">
          <mt-actionsheet
            :actions="actions"
            v-model="sheetVisible">
          </mt-actionsheet>
          <div class="banquetImgDiv">
            <img id="banquetEnd" class="banquetImg" preview="2" :src="emptyBottleSrc"/>
          </div>
          <span class="titleSpan">空瓶 {{banquetPhoto.emptyBottleNum ? banquetPhoto.emptyBottleNum + '瓶' : ''}}</span>
          <img slot="icon" src="../img/upload.png" class="photoImg" @click="choosePicture('banquetEnd')">
        </div>
      </div>
    </div>
    <mt-tabbar class="photo_save" >
      <mt-tab-item id="photo_confirm" class="photo_confirm" @click.native.capture="saveBanquetPhoto()">
        确认
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script type="application/javascript">
import Vue from 'vue'
import MintUI from 'mint-ui'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
export default {
  mounted: function () {
    let vm = this
    vm.displaySrc = ''
    vm.mixedPersonSrc = ''
    vm.emptyBottleSrc = ''
    if (vm.$route.query.banquetId) {
      let bizBanquetId = vm.$route.query.banquetId
      vm.banquetPhoto.bizBanquetId = bizBanquetId
      vm.feastInfoUrl = 'feastInfo?id=' + bizBanquetId
      vm.getBanquetPhoto()
    }
    // let roleId = localStorage.getItem('roleId')
    // let banquetState = sessionStorage.getItem('banquetState')
    // if (roleId === vm.$global.ROLE.PFS || banquetState === vm.$global.BANQUET_STATE.BANQUET_STATE_JL) {
    //   $('.photo_save').css('display', 'none')
    //   $('.photoImg').css('display', 'none')
    // }
    // 调用宴会按钮权限控制
    let banquetButton = sessionStorage.getItem('banquetButton')
    banquetButton = JSON.parse(banquetButton)
    if (banquetButton) {
      if (banquetButton.save_photo == 'true') {
      } else {
        $('.photo_save').css('display', 'none')
        $('.photoImg').css('display', 'none')
      }
    }
    document.addEventListener('deviceready', vm.onDeviceReady, false)
    vm.destinationType = navigator.camera.DestinationType
    vm.getRegistrationID()
  },
  methods: {
    getBanquetPhoto () {
      let vm = this
      let param = {
        bizBanquetId: vm.banquetPhoto.bizBanquetId
      }
      MintUI.Indicator.open()
      vm.getPostData(vm.$global.SERVER_BANQUET_PHOTO.PHOTO_SCENE, param, function (response) {
        let bp = response.data.result.banquetPhoto
        if (bp) {
          vm.banquetPhoto.bizBanquetId = bp.bizBanquetId
          if (bp.display) {
            vm.displaySrc = bp.display
            $('#banquetStart').css('display', 'block')
          } else {
            $('#banquetStart').css('display', 'none')
          }
          if (bp.mixedPerson) {
            vm.mixedPersonSrc = bp.mixedPerson
            $('#banquetProceed').css('display', 'block')
          } else {
            $('#banquetProceed').css('display', 'none')
          }
          if (bp.emptyBottle) {
            vm.emptyBottleSrc = bp.emptyBottle
            vm.banquetPhoto.emptyBottleNum = bp.emptyBottleNum
            $('#banquetEnd').css('display', 'block')
          } else {
            $('#banquetEnd').css('display', 'none')
          }
        } else {
          $('#banquetStart').css('display', 'none')
          $('#banquetProceed').css('display', 'none')
          $('#banquetEnd').css('display', 'none')
        }
        MintUI.Indicator.close()
      })
    },
    getRegistrationID () {
      window.JPush.getRegistrationID(this.onGetRegistrationID)
    },
    onGetRegistrationID (data) {
      try {
        if (data.length === 0) {
          window.setTimeout(this.getRegistrationID, 1000)
        } else {
          this.registrationID = data
        }
      } catch (exception) {
        MintUI.Toast('获取RegistrationID 失败: ' + exception)
        return ''
      }
    },
    choosePicture (obj) {
      let vm = this
      if (obj === 'banquetStart') {
        vm.banquetState.start = true
        vm.banquetState.proceed = false
        vm.banquetState.end = false
      }
      if (obj === 'banquetProceed') {
        vm.banquetState.start = false
        vm.banquetState.proceed = true
        vm.banquetState.end = false
      }
      if (obj === 'banquetEnd') {
        vm.banquetState.start = false
        vm.banquetState.proceed = false
        vm.banquetState.end = true
      }
      this.sheetVisible = true
    },
    onDeviceReady () {
      let vm = this
      vm.destinationType = navigator.camera.DestinationType
    },
    // 拍照
    capturePhoto () {
      let vm = this
      // 拍照并获取Base64编码的图像（quality : 存储图像的质量，范围是[0,100]）
      navigator.camera.getPicture(vm.onPhotoDataSuccess, vm.onFail, {
        quality: 50,
        destinationType: vm.destinationType.DATA_URL, // 返回影像档的 base64 //FILE_URI
        saveToPhotoAlbum: true
      })
    },
    // 从相册中选择
    getPhoto () {
      /*eslint-disable*/
      let vm = this
      navigator.camera.getPicture(vm.onPhotoDataSuccess, vm.getPhotoError, {
        quality: 50,
        destinationType: vm.destinationType.DATA_URL, // 返回影像档的 base64 // FILE_URI
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
      })
    },
    // 拍照失败
    onFail (message) {
      // MintUI.Toast('拍照失败: ' + message)
    },
    getPhotoError (error) {
      // MintUI.Toast('从相册获取照片失败！' + error)
    },
    // 拍照成功
    onPhotoDataSuccess (imageURL) {
      let vm = this
      let size01 = vm.showSize(imageURL)
      if(size01 > 3){
        vm.dealImage(imageURL, {quality: 0.2}, function(base64){
          let imageURL02 = base64.replace('data:image/jpeg;base64,', '')
          let size02 = vm.showSize(imageURL02)
          if(size02 < 3){
            vm.setImg(imageURL02)
          }else{
            vm.dealImage(imageURL02, {quality: 0.1}, function(base64){
              let imageURL03 = base64.replace('data:image/jpeg;base64,', '')
              let size03 = vm.showSize(imageURL03)
              if(size03 < 3){
                vm.setImg(imageURL03)
              }else{
                MintUI.Toast('您上传的图片太大')
              }
            })
          }
        })
      }else{
        vm.setImg(imageURL)
      }
    },
    setImg (imageURL) {
      let vm = this
      if(vm.banquetState.start){
        $('#banquetStart').css('display', 'block')
        let banquetStart = document.getElementById('banquetStart')
        banquetStart.style.display = 'block'
        vm.displaySrc = 'data:image/jpeg;base64,' + imageURL // 'data:image/jpeg;base64,' +
        vm.banquetPhoto.display = imageURL
      } else if(vm.banquetState.proceed) {
        $('#banquetProceed').css('display', 'block')
        let banquetProceed = document.getElementById('banquetProceed')
        banquetProceed.style.display = 'block'
        vm.mixedPersonSrc = 'data:image/jpeg;base64,' + imageURL
        vm.banquetPhoto.mixedPerson = imageURL
      } else if (vm.banquetState.end) {
        $('#banquetEnd').css('display', 'block')
        let banquetEnd = document.getElementById('banquetEnd')
        banquetEnd.style.display = 'block'
        vm.emptyBottleSrc = 'data:image/jpeg;base64,' + imageURL
        vm.banquetPhoto.emptyBottleNum = ''
        vm.banquetPhoto.emptyBottle = imageURL
      }
    },
    // base64图片大小
    showSize (base64url) {
        //获取base64图片大小，返回MB数字
      let str = base64url.replace('data:image/jpeg;base64,', '');
      let equalIndex = str.indexOf('=');
      if(str.indexOf('=')>0) {
        str=str.substring(0, equalIndex);
      }
      let strLength=str.length;
      let fileLength=parseInt(strLength-(strLength/8)*2);
      // 由字节转换为MB
      let size = "";
      size = (fileLength/(1024 * 1024)).toFixed(2);
      let sizeStr = size + "";                        //转成字符串
      let index = sizeStr.indexOf(".");                    //获取小数点处的索引
      let dou = sizeStr.substr(index + 1 ,2)            //获取小数点后两位的值
      if(dou == "00"){                                //判断后两位是否为00，如果是则删除00
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
      }
      return size
    },
    // 压缩图片
    dealImage (path, obj, callback){
      let img = new Image()
      img.src = 'data:image/jpeg;base64,' + path
      img.onload = function(){
        let that = this;
        // 默认按比例压缩
        let w = that.width,
          h = that.height,
          scale = w / h
        w = obj.width || w
        h = obj.height || (w / scale)
        let quality = 0.2  // 默认图片质量为0.7
        //生成canvas
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        // 创建属性节点
        let anw = document.createAttribute("width")
        anw.nodeValue = w
        let anh = document.createAttribute("height")
        anh.nodeValue = h
        canvas.setAttributeNode(anw)
        canvas.setAttributeNode(anh)
        ctx.drawImage(that, 0, 0, w, h)
        // 图像质量
        if(obj.quality && obj.quality <= 1 && obj.quality > 0){
          quality = obj.quality
        }
        // quality值越小，所绘制出的图像越模糊
        let base64 = canvas.toDataURL('image/jpeg', quality )
        // 回调函数返回base64的值
        callback(base64)
      }
    },
    saveBanquetPhoto (){
      let vm = this
      if(!vm.displaySrc){
        MintUI.Toast('请上传陈列图片')
        return
      }
      if (!vm.mixedPersonSrc) {
        MintUI.Toast('请上传调酒员图片')
        return
      }
      if (!vm.emptyBottleSrc) {
        MintUI.Toast('请上传空瓶图片')
        return
      }
      // 上传
      this.upload()
    },
    // 上传文件
    upload () {
      // 上传成功
      let vm = this
      let success = function (response) {
        MintUI.Indicator.close()
        let result = response.data.result.dataModel
        if(result){
          if(result.emptyBottleNum){
            vm.banquetPhoto.emptyBottleNum = result.emptyBottleNum
          }
        }
        MintUI.Toast(response.data.msg)
      }
      // 上传失败
      let fail = function () {
        MintUI.Indicator.close()
        MintUI.Toast('保存失败')
      }
      vm.banquetPhoto.display = encodeURI(vm.banquetPhoto.display)
      vm.banquetPhoto.mixedPerson = encodeURI(vm.banquetPhoto.mixedPerson)
      vm.banquetPhoto.emptyBottle = encodeURI(vm.banquetPhoto.emptyBottle)
      MintUI.Indicator.open()
      this.getPostData(this.$global.SERVER_BANQUET_PHOTO.SAVE_PHOTO_SCENE, vm.banquetPhoto, success, fail)
      // let params = {
      //   fileName: 'photo' + new Date().getTime() + '.jpg',
      //   file: vm.displaySrc,
      //   size: atob(vm.displaySrc).length
      // }
      // this.getPostData(this.$global.SERVER_USER.UPLOAD_FILE, params, success, fail)

      // let options = new FileUploadOptions()
      // options.fileKey = 'file1'
      // options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1)
      // options.mimeType = 'image/jpeg'
      // // 上传参数
      // let params = {}
      // params.fileName = 'test'
      // params.value2 = 'param'
      // options.params = params
      // // vue没有此插件
      // let ft = new FileTransfer()
      // let headers = {}
      // if (localStorage.getItem('token')) {
      //   headers.token = localStorage.getItem('token')
      // }
      // options.headers = headers
      // // 上传地址
      // let SERVER = this.$global.SERVER_USER.UPLOAD_FILE
      // ft.upload(fileURL, encodeURI(SERVER), success, fail, options)
    },

    Base64 () {
      // private property
      let _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

      // public method for encoding
      this.encode = function (input) {
        let output = ''
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4
        let i = 0
        input = _utf8_encode(input)
        while (i < input.length) {
          chr1 = input.charCodeAt(i++)
          chr2 = input.charCodeAt(i++)
          chr3 = input.charCodeAt(i++)
          enc1 = chr1 >> 2
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
          enc4 = chr3 & 63
          if (isNaN(chr2)) {
            enc3 = enc4 = 64
          } else if (isNaN(chr3)) {
            enc4 = 64
          }
          output = output +
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
        }
        return output
      }

      // public method for decoding
      this.decode = function (input) {
        let output = ''
        let chr1, chr2, chr3
        let enc1, enc2, enc3, enc4
        let i = 0
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')
        while (i < input.length) {
          enc1 = _keyStr.indexOf(input.charAt(i++))
          enc2 = _keyStr.indexOf(input.charAt(i++))
          enc3 = _keyStr.indexOf(input.charAt(i++))
          enc4 = _keyStr.indexOf(input.charAt(i++))
          chr1 = (enc1 << 2) | (enc2 >> 4)
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
          chr3 = ((enc3 & 3) << 6) | enc4
          output = output + String.fromCharCode(chr1)
          if (enc3 !== 64) {
            output = output + String.fromCharCode(chr2)
          }
          if (enc4 !== 64) {
            output = output + String.fromCharCode(chr3)
          }
        }
        output = _utf8_decode(output)
        return output
      }

      // private method for UTF-8 encoding
      let _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, '\n')
        let utftext = ''
        for (let n = 0; n < string.length; n++) {
          let c = string.charCodeAt(n)
          if (c < 128) {
            utftext += String.fromCharCode(c)
          } else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192)
            utftext += String.fromCharCode((c & 63) | 128)
          } else {
            utftext += String.fromCharCode((c >> 12) | 224)
            utftext += String.fromCharCode(((c >> 6) & 63) | 128)
            utftext += String.fromCharCode((c & 63) | 128)
          }
        }
        return utftext
      }

      // private method for UTF-8 decoding
      let _utf8_decode = function (utftext) {
        let string = ''
        let i = 0
        let c = 0
        let c2 = 0
        let c3 = 0
        while (i < utftext.length) {
          c = utftext.charCodeAt(i)
          if (c < 128) {
            string += String.fromCharCode(c)
            i++
          } else if ((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i + 1)
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
            i += 2
          } else {
            c2 = utftext.charCodeAt(i + 1)
            c3 = utftext.charCodeAt(i + 2)
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
            i += 3
          }
        }
        return string
      }
    }
  },
  data: function () {
    let vm = this
    return {
      actions: [
        {
          name: '拍照',
          method: vm.capturePhoto
        },
        {
          name: '从相册中选择',
          method: vm.getPhoto
        }
      ],
      banquetState: {
        start : false,
        proceed : false,
        end : false
      },
      banquetPhoto: {
        bizBanquetId: '',
        display: '',
        mixedPerson: '',
        emptyBottle: '',
        emptyBottleNum: ''
      },
      destinationType: '',
      sheetVisible: false,
      registrationID: '',
      displaySrc: '',
      mixedPersonSrc: '',
      emptyBottleSrc: '',
      feastInfoUrl: ''
    }
  }
}
</script>
<style scoped>
  #photoScene {
    justify-content: center;
  }
  #photoScene .twoRow{
    background-color: #eaeaea;
    display: inline-flex;
  }
  #photoScene .oneRow{
    background-color: #eaeaea;
    width: calc(49.5vw);
    height: calc(50vh - 45px);
  }
  #photoScene .twoRow .upload {
    padding-top: 50px;
    width: calc(49.5vw);
    height: calc(50vh - 45px);
  }
  #photoScene .oneRow .upload {
    width: calc(50vw);
    height: calc(50vh - 45px);
  }
  #photoScene .banquetImgDiv {
    width: 80%;
    height: calc(39vh - 24px);
  }
  #photoScene .banquetImg {
    width: calc(44.5vw);
    height: calc(38vh - 22px);
    text-align: center;
    position: relative;
    top: 4px;
    margin-left: 10px;
  }
  #photoScene .photoImg {
    width: 16px;
    height: 16px;
    position: relative;
    left: 30px;
    top: 12px;
  }
  #photoScene img[src=""],img:not([src]){
    opacity:0;
  }
  #photoScene .mint-tab-item {
    padding: 10px 0px;
  }
  #photoScene .photo_confirm {
    background-color: #26a2ff;
    color: white;
  }
  #photoScene .photo_div {
    color: inherit;
    font-size: 20px;
  }
  #photoScene .mint-tabbar {
    position: fixed;
  }
  #photoScene .mint-cell:last-child {
     background-image: -webkit-gradient(linear, left bottom, left top, from(#fff), color-stop(50%, #fff), color-stop(50%, transparent));
     background-image: linear-gradient(0deg, #fff, #fff 50%, transparent 50%);
  }
  #photoScene .titleSpan {
    position: relative;
    left: 20px;
    top: 8px;
    font-size: 12px;
  }
</style>

