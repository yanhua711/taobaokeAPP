<template>
  <div id="tool">
    <mt-header class="main_head" fixed title="应用中心">
      <router-link to="/main" slot="left">
        <mt-button>           <img height="35" width="35" src="../img/back.png">         </mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
    <div class="upload">
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
      </mt-actionsheet>
      <mt-button type="default" @click="choosePicture()">图片</mt-button>
      <mt-button type="default" @click="pushSelf()">推送给自己</mt-button>
      <img id="smallImage" src=""/>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>
<style scoped>
  #tool {
    display: flex;
    justify-content: center;
  }

  #tool .upload {
    margin-top: 50px;
  }

  #tool #smallImage {
    display: none;
    width: 240px;
    height: 320px;
  }
</style>
<script>
import Footer from './FooterBar.vue'
import MintUI from 'mint-ui'

export default {
  mounted: function () {
    let vm = this
    document.addEventListener('deviceready', vm.onDeviceReady, false)
    vm.destinationType = navigator.camera.DestinationType
    vm.getRegistrationID()
  },
  methods: {
    pushSelf () {
      let vm = this
      let data = {
        'platform': 'all',
        'audience': 'all',
        'notification': {
          'alert': 'Hi,JPush !',
          'android': {'extras': {'android-key1': 'android-value1'}},
          'ios': {'sound': 'sound.caf', 'badge': '+1', 'extras': {'ios-key1': 'ios-value1'}}
        }
      }
      let base64 = new this.Base64()
      let baseStr = base64.encode('99ddc34813a39e3dc2763ade:4cc2eac1ca5e07da3b041fc9')
      let headers = {
        headers: {
          Authorization: 'Basic ' + baseStr
        }
      }
      vm.$axios.post(vm.$global.SERVER_USER.JPUSH_PUSH, data, headers).then(function (response) {
      }).catch(function (error) {
        MintUI.Toast('error' + JSON.stringify(error))
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
    choosePicture () {
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
        destinationType: vm.destinationType.DATA_URL,
        saveToPhotoAlbum: true
      })
    },
    // 从相册中选择
    getPhoto () {
      /*eslint-disable*/
      let vm = this
      navigator.camera.getPicture(vm.onPhotoDataSuccess, vm.getPhotoError, {
        quality: 50,
        destinationType: vm.destinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
      })
    },
    // 拍照失败
    onFail (message) {
      MintUI.Toast('拍照失败: ' + message)
    },
    getPhotoError (error) {
      MintUI.Toast('从相册获取照片失败！' + error)
    },
    // 拍照成功
    onPhotoDataSuccess (imageURL) {
      let smallImage = document.getElementById('smallImage')
      smallImage.style.display = 'block'
      smallImage.src = 'data:image/jpeg;base64,' + imageURL
      // 开始上传
      this.upload(imageURL)
    },
    // 上传文件
    upload (fileURL) {
      // 上传成功
      let success = function (response) {
        MintUI.Toast(response.data.msg)
      }
      // 上传失败
      let fail = function () {
        MintUI.Toast('保存失败')
      }
      let params = {
        fileName: 'photo' + new Date().getTime() + '.jpg',
        file: fileURL,
        size: atob(fileURL).length
      }
      this.getPostData(this.$global.SERVER_USER.UPLOAD_FILE, params, success, fail)
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
  components: {
    'footer-bar': Footer
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
      destinationType: '',
      sheetVisible: false,
      registrationID: ''
    }
  }
}
</script>
