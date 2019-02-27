<template>
  <div v-if="detailinfo != null">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">{{title}}</div>
      <a class="aui-pull-right" href="#/">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
    <div class="aui-text-center aui-margin-t-15" style="position: relative;text-align: left;font-weight: bold;margin-left: 0.5rem;">
        <span class="font-size-18">{{detailinfo.title}}({{detailinfo.style_str}})
        </span>
    </div>
    <div class="aui-text-center aui-margin-t-10 aui-text-default" style="float:left">
        <span class="" style="font-size:0.55rem;color:#B3B3B3;margin-left:0.5rem">
          {{detailinfo.author}}&nbsp;&nbsp;{{detailinfo.created_at}}
        </span>
        <!-- <span class="" style="font-size:0.55rem;color:#B3B3B3;margin-left:0.5rem">
          {{accepttext}}&nbsp;&nbsp;{{collecttext}}
        </span> -->
    </div>
<br/>

    <div class="aui-padded-15" style="font-weight:light;font-size:0.7rem">
      <div v-html="detailinfo.html"></div>
    </div>

    <div  style="float:left;margin-left:1rem;">文章来源：</div>
        <div class="mt-10" style="margin-left:10px;margin-bottom:4rem;" v-if="sourceflg">
            <h4>
                <span v-if="sourceinfo.source_type == 'J'">
                    <span v-if="sourceinfo.sequence != null">[{{sourceinfo.sequence}}]</span>
                    <span v-if="sourceinfo.source_author != null">[{{sourceinfo.source_author}}]</span>
                    <span v-if="sourceinfo.source_name != null">[{{sourceinfo.source_name}}]</span>
                    <span>[J].</span>
                    <span v-if="sourceinfo.journal_name != null">[{{sourceinfo.journal_name}}]</span>
                    <span v-if="sourceinfo.journal_year != null">[{{sourceinfo.journal_year}}]</span>
                    <span v-if="sourceinfo.journal_date != null">[{{sourceinfo.journal_date}}]</span>
                    <span v-if="sourceinfo.source_page != null">[{{sourceinfo.source_page}}]</span>
                </span>
                <span v-else-if="sourceinfo.source_type == 'A'">
                    <span v-if="sourceinfo.sequence != null">[{{sourceinfo.original_author}}]</span>
                    <span v-if="sourceinfo.source_author != null">[{{sourceinfo.original_author}}]</span>
                    <span v-if="sourceinfo.source_name != null">[{{sourceinfo.original_author}}]</span>
                    <span>[A].</span>
                    <span v-if="sourceinfo.original_author != null">[{{sourceinfo.original_author}}]</span>
                    <span v-if="sourceinfo.original_name != null">[{{sourceinfo.original_name}}]</span>
                    <span>[C].</span>
                    <span v-if="sourceinfo.published_place != null">[{{sourceinfo.published_place}}]</span>
                    <span v-if="sourceinfo.published_press != null">[{{sourceinfo.published_press}}]</span>
                    <span v-if="sourceinfo.published_year != null">[{{sourceinfo.published_year}}]</span>
                    <span v-if="sourceinfo.source_page != null">[{{sourceinfo.source_page}}]</span>
                </span>
                <span v-else-if="sourceinfo.source_type == 'N'">
                    <span v-if="sourceinfo.sequence != null">[{{sourceinfo.sequence}}]</span>
                    <span v-if="sourceinfo.source_author != null">[{{sourceinfo.source_author}}]</span>
                    <span v-if="sourceinfo.source_name != null">[{{sourceinfo.source_name}}]</span>
                    <span>[N].</span>
                    <span v-if="sourceinfo.news_name != null">[{{sourceinfo.news_name}}]</span>
                    <span v-if="sourceinfo.news_date != null">[{{sourceinfo.news_date}}]</span>
                </span>
                <span v-else-if="sourceinfo.source_type == 'S'">
                    <span v-if="sourceinfo.sequence != null">[{{sourceinfo.sequence}}]</span>
                    <span v-if="sourceinfo.standard_number != null">[{{sourceinfo.standard_number}}]</span>
                    <span v-if="sourceinfo.standard_name != null">[{{sourceinfo.standard_name}}]</span>
                    <span>[S].</span>
                </span>
                <span v-else-if="sourceinfo.source_type == 'P'">
                    <span v-if="sourceinfo.sequence != null">[{{sourceinfo.sequence}}]</span>
                    <span v-if="sourceinfo.patent_author != null">[{{sourceinfo.patent_author}}]</span>
                    <span v-if="sourceinfo.patent_name != null">[{{sourceinfo.patent_name}}]</span>
                    <span>[P].</span>
                    <span v-if="sourceinfo.patent_country != null">[{{sourceinfo.patent_country}}]</span>
                    <span v-if="sourceinfo.patent_number != null">[{{sourceinfo.patent_number}}]</span>
                    <span v-if="sourceinfo.patent_date != null">[{{sourceinfo.patent_date}}]</span>
                </span>
                <span v-else-if="sourceinfo.source_type == 'E'">
                    <span v-if="sourceinfo.sequence != null">[{{sourceinfo.sequence}}]</span>
                    <span v-if="sourceinfo.source_author != null">[{{sourceinfo.source_author}}]</span>
                    <span v-if="sourceinfo.source_name != null">[{{sourceinfo.source_name}}]</span>
                    <span v-if="sourceinfo.edocument_type != null">[{{sourceinfo.edocument_type}}]</span>
                    <span v-if="sourceinfo.edocument_address != null">[{{sourceinfo.edocument_address}}]</span>
                    <span v-if="sourceinfo.edocument_date != null">[{{sourceinfo.edocument_date}}]</span>
                </span>
                <span v-else-if="sourceinfo.source_type == 'Z'">
                    <span v-if="sourceinfo.sequence != null">[{{sourceinfo.sequence}}]</span>
                    <span v-if="sourceinfo.source_author != null">[{{sourceinfo.source_author}}]</span>
                    <span v-if="sourceinfo.source_name != null">[{{sourceinfo.source_name}}]</span>
                    <span v-if="sourceinfo.source_type != null">[{{sourceinfo.source_type}}]</span>
                    <span v-if="sourceinfo.published_place != null">[{{sourceinfo.published_place}}]</span>
                    <span v-if="sourceinfo.published_press != null">[{{sourceinfo.published_press}}]</span>
                    <span v-if="sourceinfo.published_year != null">[{{sourceinfo.published_year}}]</span>
                </span>
                <span v-else>
                    <span v-if="sourceinfo.sequence != null">[{{sourceinfo.sequence}}]</span>
                    <span v-if="sourceinfo.source_author != null">[{{sourceinfo.source_author}}]</span>
                    <span v-if="sourceinfo.source_name != null">[{{sourceinfo.source_name}}]</span>
                    <span v-if="sourceinfo.source_type != null">[{{sourceinfo.source_type}}]</span>
                    <span v-if="sourceinfo.published_place != null">[{{sourceinfo.published_place}}]</span>
                    <span v-if="sourceinfo.published_press != null">[{{sourceinfo.published_press}}]</span>
                    <span v-if="sourceinfo.published_year != null">[{{sourceinfo.published_year}}]</span>
                    <span v-if="sourceinfo.source_page != null">[{{sourceinfo.source_page}}]</span>
                </span>
            </h4>
        </div>
        <div v-if="shenhebtnflg" class="aui-tab" id="tab">
          <div class="aui-tab-item" style="font-size: 0.6rem;background: #03a9f4;border-right:1px solid #FFFFFF;
          color:#FFFFFF;position: fixed;top: auto;bottom: 0;width: 50%;" @click="ShenheArticle(2)">
              审核通过
          </div>
          <div class="aui-tab-item" style="font-size: 0.6rem;background: #03a9f4;border-left:1px solid #FFFFFF;;color:#FFFFFF
          ;position: fixed;top: auto;bottom: 0;width: 50%;margin-left:49%" @click="ShenheArticle(3)">
              审核驳回
          </div>
        </div>
  </div>
</template>
<script>
  import { MessageBox  } from 'mint-ui';
  var self = null;    //在create方法中初始化为this
  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    mounted(){
      var articleid = self.$route.query.articleid;
      self.shenheid = self.$route.query.shenheid;
      self.illid = self.$route.query.illid;
      //审核文章功能是否显示
      if(self.$route.query.type !=0){
        self.shenhebtnflg = false;
      }
      //初始化
      self.init(articleid);
    },
    data(){
      return {
        articleid : '',           //文章id
        shenheid : '',            //审核id
        title : '',               //页面title
        illid : '',               //疾病id
        detailinfo : null,        //文章详情信息
        sourceinfo : null,        //文章来源信息   
        sourceflg : false,         //文章来源是否显示
        shenhebtnflg : true,       //审核文章功能是否显示标志
      }
    },
    methods :{
      init : function(articleid){
      self.articleid = articleid;
        //获取文章信息详情
        self.api.doc_getSHArticle({article_id : articleid}).then((res)=>{
          //self.common.consoledebug.log("detailres :"  + JSON.stringify(res.data.ret));
          self.detailinfo = res.data.ret;
          //格式化标题 
          if(self.detailinfo.title.length > 8)
          {
            self.title = self.detailinfo.title.substring(0,7) + "...";
          }else{
            self.title = self.detailinfo.title;
          }
        }).catch((err)=>{

        })
        //获取文章来源详情信息
        self.api.doc_getArticleSource({article_id : articleid}).then((res)=>{
          //self.common.consoledebug.log("sourceres :"  + JSON.stringify(res.data.ret));
          if(res.data.ret.length == 0){
            self.sourceflg = false;
          }else{
            if(res.data.ret[0].source_type == null){
            self.sourceflg = false;
          }
          self.sourceinfo = res.data.ret[0];
          self.sourceflg = true;
          }
          //self.common.consoledebug.log("sourceres :"  + JSON.stringify(self.sourceinfo));
        }).catch((err)=>{
          self.common.consoledebug.log("err :"  + JSON.stringify(err));
        })
      },
      //审核文章
      ShenheArticle : function(status){
        var message = "";
        if(status == 2){
          var title = "审核通过" ;
          var reg = "";
          var message = "(备注可以为空)";
        }else if( status == 3){
          var title = "审核驳回" ;
          var reg = /\S/;
          var message = "(备注不能为空)";
        }
        //弹出输入备注的窗口
        MessageBox({
            $type:'prompt',
            title: title,
            message:'请填写备注' + message,
            closeOnClickModal:false,   //点击model背景层不关闭MessageBox
            showCancelButton:true,   //不显示取消按钮
            inputPattern: reg,    //正则条件就
            inputErrorMessage:'备注不能为空',
            showInput:true
        }).then(({ value, action }) => {
            /* value 为填写的值，进行下一步操作*/
            let params = {
              admin_id : localStorage.getItem("admin_id"),
              //status_id : self.shenheid,
              article_id : self.articleid,
              status : status,
              token : localStorage.getItem("token"),
              //ill_id : self.illid,
              remark : value,
            }
            //进行文章的审核
            self.api.yaoshi_doArticleShenhe(params).then((res)=>{
              //self.common.consoledebug.log("ret :"  + JSON.stringify(res));
              MessageBox('提示', '操作成功！')
              self.clickBack();
            }).catch((err)=>{

            })
        }).catch(({ cancel }) => {
          MessageBox.close(false);
        });
      },
      clickBack : function () {
        self.common.clickBack();
      }
    },
  }
</script>
<style scoped>
.illList{
  text-align: center;
  width:80px;
  min-width: 80px;
  height:1.5rem;
  line-height: 1.5rem;
  border: solid 1px;
  border-radius:0.8rem;
  border-color: #B3B3B3;
  color:#000000;
  font-size: 0.65rem;
  background-color: #FFFFFF;
  box-shadow: none;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  float:left;
}
</style>
