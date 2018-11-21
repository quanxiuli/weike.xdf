<template>
  <div class="sectionL scroll">
    <div class="sectionLUp clear">
      <p><span></span>联系人组件<span></span></p>
      <ul class="clear">
        <li class="topBor" v-on:click="contactComponentEmit('input','姓名','basics','name','text')">
          <p><img src="../../../../images/QJSZImg/XMImg.png" alt=""/></p>
          <span>姓名</span>
        </li>
        <li class="topBor" v-on:click="contactComponentEmit('input','手机号','basics','mobile','text')">
          <p><img src="../../../../images/QJSZImg/SJHImg.png" alt=""/></p>
          <span>手机号</span>
        </li>
        <li class="topBor rightBor" v-on:click="contactComponentEmit('input','邮箱','basics','email','text')">
          <p><img src="../../../../images/QJSZImg/YXImg.png" alt=""/></p>
          <span>邮箱</span>
        </li>
        <li v-on:click="contactComponentEmit('sex','性别','basics','gender','radio')">
          <p><img src="../../../../images/QJSZImg/XBImg.png" alt=""/></p>
          <span>性别</span>
        </li>
        <li v-on:click="contactComponentEmit('dateBirth','出生日期','basics','birthday','date')">
          <p><img src="../../../../images/QJSZImg/CSRQImg.png" alt=""/></p>
          <span>出生日期</span>
        </li>
        <li v-on:click="contactComponentEmit('selectoptions','年龄','basics','age','select')" class="rightBor">
          <p><img src="../../../../images/QJSZImg/NLImg.png" alt=""/></p>
          <span>年龄</span>
        </li>
        <li v-on:click="contactComponentEmit('selectPMC','行政区','basics','pmc','select')">
          <p><img src="../../../../images/QJSZImg/XZQImg.png" alt=""/></p>
          <span>行政区</span>
        </li>
        <li v-on:click="contactComponentEmit('selectoptionsXQ','校区','basics','area',schoolid==1?'selectTwo':'select')">
          <p><img src="../../../../images/QJSZImg/XQImg.png" alt=""/></p>
          <span>校区</span>
        </li>
        <li v-on:click="contactComponentEmit('radioandcheckbox','年级','basics','grade','radio')" class="rightBor">
          <p><img src="../../../../images/QJSZImg/NJImg.png" alt=""/></p>
          <span>年级</span>
        </li>
        <li v-on:click="contactComponentEmit('curriculum','课程','basics','coursename','select')">
          <p><img src="../../../../images/QJSZImg/KCImg.png" alt=""/></p>
          <span>课程</span>
        </li>
        <li v-on:click="contactComponentEmit('input','微信','basics','wechat','text')"> 
          <p><img src="../../../../images/QJSZImg/WXImg.png" alt=""/></p>
          <span>微信</span>
        </li>
        <li v-on:click="contactComponentEmit('input','QQ','basics','qq','text')" class="rightBor">
          <p><img src="../../../../images/QJSZImg/QQImg.png" alt=""/></p>
          <span>QQ</span>
        </li>
      </ul>
    </div>
    <div class="sectionLUp clear">
      <p><span></span>基础类组件<span></span></p>
      <ul class="clear">
        <li class="topBor" v-on:click="contactComponentEmit('input','单行文本','dynamic','','text')">
          <p><img src="../../../../images/QJSZImg/DXWBImg.png" alt=""/></p>
          <span>单行文本</span>
        </li>
        <li class="topBor" v-on:click="contactComponentEmit('textarea','多行文本','dynamic','','textarea')">
          <p><img src="../../../../images/QJSZImg/DXWB2Img.png" alt=""/></p>
          <span>多行文本</span>
        </li>
        <li class="topBor rightBor" v-on:click="contactComponentEmit('radio','单选框','dynamic','','radio')">
          <p><img src="../../../../images/QJSZImg/DXKImg.png" alt=""/></p>
          <span>单选框</span>
        </li>
        <li v-on:click="contactComponentEmit('checkbox','多选框','dynamic','','checkbox')">
          <p><img src="../../../../images/QJSZImg/DXK2Img.png" alt=""/></p>
          <span>多选框</span>
        </li>
        <li v-on:click="contactComponentEmit('selectoptionsdynamic','下拉框','dynamic','','select')">
          <p><img src="../../../../images/QJSZImg/XLKImg.png" alt=""/></p>
          <span>下拉框</span>
        </li>
        <li class="rightBor" v-on:click="contactComponentEmit('dateTime','日期','dynamic','','date')">
          <p><img src="../../../../images/QJSZImg/RQImg.png" alt=""/></p>
          <span>日期</span>
        </li>
        <li v-on:click="contactComponentEmit('selectTwo','二级联动','dynamic','','selectTwo')">
          <p><img src="../../../../images/QJSZImg/EJLDImg.png" alt=""/></p>
          <span>二级联动</span>
        </li>
        <li v-on:click="contactComponentEmit('score','评分','dynamic','','score')">
          <p><img src="../../../../images/QJSZImg/PFImg.png" alt=""/></p>
          <span>评分</span>
        </li>
        <li v-on:click="contactComponentEmit('p','','dynamic','','p')">
          <p><img src="../../../../images/QJSZImg/MSImg.png" alt=""/></p>
          <span>描述</span>
        </li>
        <li v-on:click="contactComponentFooterEmit">
          <p><img src="../../../../images/QJSZImg/DBImg.png" alt=""/></p>
          <span>底部</span>
        </li>
        <li class="rightBor" v-bind:style="{ cursor: enable_image!=1?'not-allowed':'pointer' }"
            v-on:click="contactComponentEmit('imgupload','图片上传','dynamic','','file')">
          <p><img src="../../../../images/QJSZImg/TPSCImg.png" alt=""/></p>
          <span>图片上传</span>
        </li>
        <li v-bind:style="{ cursor: enable_attachment!=1?'not-allowed':'pointer' }"
            v-on:click="contactComponentEmit('fileupload','附件上传','dynamic','','file')">
          <p><img src="../../../../images/QJSZImg/FJSCImg.png" alt=""/></p>
          <span>附件上传</span>
        </li>
        <li></li>
        <li class="rightBor"></li>
      </ul>
    </div>
    <div class="sectionLDown">

    </div>
  </div>
</template>
<script>
    export default{
        props: ['enable_image','enable_attachment','schoolid'],
        data: function () {
            return {}
        },
        methods: {
          contactComponentEmit(type, namevalue, group, alt, bindType){
            this.$emit('conitorcontactcomponent',type, namevalue, group, alt, bindType);
          },
          contactComponentFooterEmit(){
            this.$emit('conitorcontactfooter')
          }
        },
    }
</script>
<style>

</style>
