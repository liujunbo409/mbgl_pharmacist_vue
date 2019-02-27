<template>
	<div style="text-align:center">
    <el-upload style="background-color: #FFFFFF;margin-top:1.5rem" :action="qnLocation()" :before-upload='beforeUpload' :data="uploadData" :on-success='upScuccess' :on-error="uploadError" ref="upload"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="上传中...">
      <img class="aui-margin-l-15" :src="photourl" style="width: 80%;">
    </el-upload>
	</div>
</template>

<script>
var self = null
	export default {
		name: 'editor_index',
		data() {
			return {
        serverUrl: 'http://twst.isart.me/',
        uploadData: {},
        photourl:'',
        uploadType: 'image',
        fullscreenLoading: false,
        $refs: {
          imgInput: HTMLInputElement,
        }
      }
		},
		props: ['src'],
		mounted() {
      this.init();
		},
		methods: {
      init : function(){
        this.photourl = this.src;
        if(this.photourl == "" || this.photourl == null){
          this.photourl = "http://twst.isart.me/image/camera_1543541569909.png";
      }
      },
      qnLocation() {
        return location.protocol === 'http:' ? 'http://upload.qiniu.com' : 'https://up.qbox.me'
      },
      beforeUpload(file) {
        return this.qnUpload(file)
      },
      qnUpload(file) {
        this.fullscreenLoading = true
        const suffix = file.name.split('.')
        const ext = suffix.splice(suffix.length - 1, 1)[0]
        var photoarr = ['png','jpg','gif','jpeg']
        if(photoarr.indexOf(ext) == -1){
          this.$message.error(`图片格式错误`)
          self.fullscreenLoading = false
          return false
        }
        console.log(this.uploadType)
        if (this.uploadType === 'image') {
          return this.api.getUploadtoken({}).then(res => {
            console.log(JSON.stringify(res.data.ret))
            this.uploadData = {
              key: `image/${suffix.join('.')}_${new Date().getTime()}.${ext}`,
              token: res.data.ret
            }
          })
        } 
      },
      upScuccess(e, file, fileList) {
        console.log(e)
        let vm = this
        let url = ''
        if (this.uploadType === 'image') { // 获得文件上传后的URL地址
          url = this.serverUrl + e.key
        } else if (this.uploadType === 'video') {
          url = this.serverUrl + e.key
        }
        if (url != null && url.length > 0) { // 将文件上传后的URL地址插入到编辑器文本中
          let value = url
          // API: https://segmentfault.com/q/1010000008951906
          // this.$refs.myTextEditor.quillEditor.getSelection();
          // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index，即当前光标之前的内容长度，然后再利用 insertEmbed(length, 'image', imageUrl)，插入图片即可。
          // vm.addRange = vm.$refs.myQuillEditor.quill.getSelection()
          value = value.indexOf('http') !== -1 ? value : 'http:' + value
          // vm.$refs.myQuillEditor.quill.insertEmbed(vm.addRange !== null ? vm.addRange.index : 0, vm.uploadType, value, Quill.sources.USER) // 调用编辑器的 insertEmbed 方法，插入URL

          // let quill = this.$refs.myQuillEditor.quill
          // let length = quill.getSelection().index
          // quill.insertEmbed(length, 'image', value)
          // quill.setSelection(length + 1)
          this.photourl = url;
          var data = {
          url : url,
          };
        this.$emit("changeSrc",data);
        this.fullscreenLoading = false
        } else {
          this.$message.error(`插入失败`)
        }
        this.$refs['upload'].clearFiles() // 插入成功后清除input的内容
      },
      uploadError() {
        // loading动画消失
        // this.quillUpdateImg = false
        this.$message.error(`${vm.uploadType}插入失败`)
      },
      imgHandler(state) {
        //this.addRange = this.$refs.myQuillEditor.quill.getSelection()
        if (state) {
          let fileInput = document.getElementById('imgInput')
          fileInput.click() // 加一个触发事件
        }
        this.uploadType = 'image'
      },
		},
    computed: {

    },
    created(){
      self = this;
    }
	};
</script>
<style>
</style>
