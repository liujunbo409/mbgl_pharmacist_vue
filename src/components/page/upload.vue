<template>
    <div class="upload">
        <div class="" v-for="n in uploadurl.length" v-bind:key="n">
            <div class="">
                <img :src="uploadurl[n]">
            </div>
            <a @click="del($index)">删除</a>
        </div>
        <div :id="container" class="">
            <div class="" :id="pickfiles" v-if="uploadurl.length < max">
            </div>
        </div>
    </div>
</template>
<script>
import '../../assets/js/qiniu.min'
module.exports = {
        props:{
            // 最大上传数量
            max:{
                type:Number,
                twoWay:true
            }, 
            // 返回的上传地址
            uploadurl:{
                type: Array,
                twoWay:true,
            },
            // 拖拽区域
            container:{
                type: String,
                twoWay:false
            },
            // inputID
            pickfiles:{
                type: String,
                twoWay:false
            },
            // 多选上传
            multiple:{
                type:Boolean,
                twoWay: false
            }
        },
        ready(){
            this.qiniu();
        },
        methods:{

            qiniu(){
                const self = this;
                var token = "";
                this.api.getUploadtoken().then((res) =>{
                  token = JSON.stringify(res.data.ret);
                }).catch((err)=>{

                });
                const uploader = Qiniu.uploader({
                     runtimes: 'html5,flash,html4',    //上传模式,依次退化
                            browse_button: self.pickfiles,       //上传选择的点选按钮，**必需**
                            //uptoken_url: '/token',            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                            uptoken : token, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
                            // unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
                            // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
                            domain: 'http://twst.isart.me/',   //bucket 域名，下载资源时用到，**必需**
                            get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
                            container: self.container,           //上传区域DOM ID，默认是browser_button的父元素，
                            max_file_size: '100mb',           //最大文件体积限制
                            //flash_swf_url: '../assets/js/plupload/Moxie.swf',  //引入flash,相对路径
                            max_retries: 3,                   //上传失败最大重试次数
                            dragdrop: true,                   //开启可拖曳上传
                            drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                            chunk_size: '4mb',                //分块上传时，每片的体积
                            auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                            multi_selection:self.multiple,   //多选上传
                    filters : {
                        max_file_size : '100mb',
                        prevent_duplicates: true,
                        mime_types: [
                            { title : 'Image files', extensions : 'JPEG,jpg,png' }, // 限定jpg,gif,png后缀上传
                            ]
                        },
                        init: {
                        // 'FilesAdded': function (up, files) {
                        //     $('table').show();
                        //     $('#success').hide();
                        //     plupload.each(files, function (file) {
                        //     });
                        // },
                        // BeforeUpload(up, file) {
                        // },
                        // 'UploadProgress': function (up, file) {

                        // },
                        // 'UploadComplete': function () {

                        // },
                        FileUploaded(up, file, info) {
                            const domain = up.getOption('domain');
                            const res = JSON.parse(info);
                            const sourceLink = domain + res.key;
                            self.uploadurl.push(sourceLink);
                            console.info(self.uploadurl);
                        },
                        Error(up, err, errTip) {
                            // $('table').show();
                            // const progress = new FileProgress(err.file, 'fsUploadProgress');
                            // progress.setError();
                            // progress.setStatus(errTip);
                        }
                    }
                });
            },
            del(index){
                this.uploadurl.splice(index, 1);
            }
        }
    };
</script>
<style>
.upload-pickfiles-lists{
width: auto;
}
</style>
