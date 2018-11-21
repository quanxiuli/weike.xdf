
var userIdLogin = '';
var nameLogin = '';
var mobileLogin = '';
//通用弹窗
function popupFn(canSee, tips, maskShow) {//是否显示 提示语
    var tips = tips ? tips : '';
    $('.pop1 .end').html(tips);
    if (canSee) {
        $('.pop1,.mask').fadeIn();
    } else {
        $('.pop1').hide();
    }
    var maskShow = maskShow ? maskShow : false;
    if (maskShow == true) {//遮罩不关闭
        $('.pop1 .close').off('touchend').on('touchend', function () { $('.pop1').hide(); })
    } else {//遮罩关闭
        $('.pop1 .close').off('touchend').on('touchend', function () { $('.pop1,.mask').hide(); })
    }
    //通用popup关闭
    $('.pop1 .close').off('touchend').on('touchend', function () {
        if ($('.popup:visible').length > 1) {//遮罩不关闭
            $('.pop1').hide();
        } else {//遮罩关闭
            $('.pop1,.mask').hide();
        }
    })
}
function getById(id) {
    return document.getElementById(id);
}

//Tap事件封装
$(document).on("touchstart", function (e) {
    if (!$(e.target).hasClass("disable")) $(e.target).data("isMoved", 0);
});
$(document).on("touchmove", function (e) {
    if (!$(e.target).hasClass("disable")) $(e.target).data("isMoved", 1);
});
$(document).on("touchend", function (e) {
    if (!$(e.target).hasClass("disable") && $(e.target).data("isMoved") == 0) $(e.target).trigger("tap");
});
//通用弹窗
function popupFn(canSee,tips,maskShow){//是否显示 提示语
    var tips=tips?tips:'';
    $('.pop1 .end').html(tips);
    if(canSee){
        $('.pop1,.mask').fadeIn();
    }else{
        $('.pop1').hide();
    }
    var maskShow=maskShow?maskShow:false;
    if(maskShow==true){//遮罩不关闭
        $('.pop1 .close').off('touchend').on('touchend',function(){$('.pop1').hide();})
    }else{//遮罩关闭
        $('.pop1 .close').off('touchend').on('touchend',function(){$('.pop1,.mask').hide();})
    }

    //通用popup关闭
    $('.pop1 .close').off('touchend').on('touchend',function(){
        if($('.popup:visible').length>1){//遮罩不关闭
            $('.pop1').hide();
        }else{//遮罩关闭
            $('.pop1,.mask').hide();
        }
    })
}
//mask禁止滑动
$('.mask').on('touchmove', function () {
    return false
})
//返回按钮判断
function backBtn() {
        Course.goBack();
}
//通用的
$(document).on('touchend','.raiseTitle .back',function(){
    backBtn();
})
//打开新东方app
$('.btn-down-container,.btn-download,#popupSuccessWechat .open,.open-app,.add-down-app .button').on('touchend',function(){
   
    return false;
})
//通用区分app 微信
if(inApp()){
	
    $('.app-download,.add-down-app2Info').hide();
    $('.hint').html('扫描 - 识别图中二维码 - 并关注');
    //判断头部
    if(sessionStorage.raiseTitle==true||sessionStorage.raiseTitle=='true'){
        $('.raiseTitle').show();
        $('.page').css('margin-top','43px');
    }
}else{
	
    if($('.page').hasClass('page-yellow')){
        
    }else{
    	
        //$('.page').css('margin-top','51px');
    }
    $('.app-download').show();
}
//分享
function share(jsonObj) {//var jsonObj = {"sName": $("#nameId").val(), "sDescribe": $("#desId").val(), "sUrl": window.location.href,"sImgUrl":''};
    if (/postmessage/.test(navigator.userAgent.toLowerCase())) {
        window.webkit.messageHandlers.share.postMessage(JSON.stringify(jsonObj));
    } else {
        Course.share(JSON.stringify(jsonObj));
    }
}
//分享通用封装
function shareFn(sName,sDescribe,sUrl,sImgUrl){//活动页
    var appid=Global.appid;
    var sUrlVal =sUrl;
    var jsonObj = {"sName": sName, "sDescribe": sDescribe, "sUrl": sUrlVal,"sImgUrl":sImgUrl};
    share(jsonObj);
}
//调出登录
function getLogin() {
    if (/postmessage/.test(navigator.userAgent.toLowerCase())) {
        window.webkit.messageHandlers.login.postMessage("");
    } else {
        Course.login();
    }
}
//app端传值函数 操作可在此
function setAmount(userId,name,mobile) {
    Global.userId = userId;
    Global.nickname = name;
    Global.mobile = mobile;
    Global.headimgurl=Global.domain_uh+'?u='+Global.userId+'&size=small';
    startAppFn();
}
//活动结束需要处理的操作
function endFn() {
    if(inApp()){
        popupFn(true,'活动已结束');
    }else{
        $('.end-box,.mask').show();
    }
    $('.ck-count-down').html('活动已结束').css('color', '#ec6909');
    $('.fixed-b').hide();
}
//活动名额已满需要处理的操作
function fillFn() {
    $('.ck-count-down').html('名额已抢光').css('color', '#ec6909');
    $('.fixed-b').hide();
}

function notBeginFn() {
    $('.ck-count-down').html('活动未发布').css('color', '#ec6909');
    $('.fixed-b').hide();
}
//活动未开始需要处理的操作
function beforFn() {

}


//列表移动
function autoScroll(obj){
    var $List= $(obj).find("#rollList1"),
            liH = $List.children().css('height'),
            len = $List.children().length,
            $listH = len * parseInt(liH);
    $('.user-list-wrap').css({
        height : $listH
    })
    $List.find("li:first").clone().appendTo($List);
    $(obj).find("#rollList1").animate({
        marginTop : "-39px"
    },400,function(){
        $(this).css({marginTop : "0px"}).find("li:first").remove();
    });
} ;
//时间主逻辑+活动主逻辑
function setCountTime(begintime, endtime, status) {//结束时间 数字id 天时分id 当前时间
    var begintime = begintime;
    var endtime = endtime;
    var status = status;
    //取dom
    var d = constructionParams('', "4c92e298932040978f530c4b90cd2ee7");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            var jsonTime = json.time;
            var leftTime = Date.parse(endtime.replace(/-/g, "/")) * 1 - parseInt(jsonTime);//剩余时间
            var startTime = Date.parse(begintime.replace(/-/g, "/")) * 1 - parseInt(jsonTime);//开始前时间
            if (startTime > 0) {//如果没开始
                //格式化
                var days = Math.ceil(startTime / 1000 / 60 / 60 / 24);//计算剩余的天数
                var hours = Math.ceil(startTime / 1000 / 60 / 60 % 24);//计算剩余的小时数
                var minutes = Math.ceil(startTime / 1000 / 60 % 60);//计算剩余的分钟数
                //var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
                //判断天or时并赋值
                //console.log(minutes);
                if (days > 99) {//如果超过99天
                    $('#timeunit').find('i').eq(0).html('9');//第一个数字
                    $('#timeunit').find('i').eq(1).html('9');//第二个数字
                    $('#timename').html("天开始");
                } else if (days > 1 && days <= 99) {//如果超过24小时
                    $('#timeunit').find('i').eq(0).html(days < 10 ? 0 : days.toString().charAt(0));//第一个数字
                    $('#timeunit').find('i').eq(1).html(days < 10 ? days : days.toString().charAt(1));//第二个数字
                    $('#timename').html("天开始");
                } else if (days <= 1 && hours > 1) {//如果小于24小时 大于1小时

                    hours = Math.floor(startTime / 1000 / 60 / 60 % 24);//计算剩余的小时数
                    minutes = Math.floor(startTime / 1000 / 60 % 60);//计算剩余的分钟数
                    $('#timeunit').find('i').eq(0).html(hours < 10 ? 0 : hours.toString().charAt(0));//第一个数字
                    $('#timeunit').find('i').eq(1).html(hours < 10 ? hours : hours.toString().charAt(1));//第二个数字
                    $('#timeunit').find('span').html('时').show();
                    $('#timeunit').find('i').eq(2).show().html(minutes < 10 ? 0 : minutes.toString().charAt(0));//第三个数字
                    $('#timeunit').find('i').eq(3).show().html(minutes < 10 ? minutes : minutes.toString().charAt(1));//第四个数字
                    $('#timename').html("分开始");
                } else if (hours <= 1 && minutes > 0) {//如果小于1小时
                    $('#timeunit').find('i').eq(0).html(minutes < 10 ? 0 : minutes.toString().charAt(0));//第一个数字
                    $('#timeunit').find('i').eq(1).html(minutes < 10 ? minutes : minutes.toString().charAt(1));//第二个数字
                    $('#timename').html("分开始");
                } else {//活动结束 时间归零
                    $('#timeunit').find('i').eq(0).html('0');//第一个数字
                    $('#timeunit').find('i').eq(1).html('0');//第二个数字
                    $('#timename').html("分");
                    window.location.reload();
                }
                $('.ck-count-down span').eq(0).html('还剩');
                $('.ck-count-down').addClass('on');
            } else {//如果开始了
                if (status == 1) {//如果状态未开始（有延迟）
                    $('.ck-count-down span').eq(0).html('还剩');
                    $('.ck-count-down').addClass('on');
                    $('#timeunit').find('i').eq(0).html('0');//第一个数字
                    $('#timeunit').find('i').eq(1).html('0');//第二个数字
                    $('#timename').html("分");
                    setTimeout(function(){
                        window.location.reload();
                    },30000)
                    return false
                }
                if ($('.ck-count-down').hasClass('on')) {
                    window.location.reload()
                }
                //格式化
                var days = Math.ceil(leftTime / 1000 / 60 / 60 / 24);//计算剩余的天数
                var hours = Math.ceil(leftTime / 1000 / 60 / 60 % 24);//计算剩余的小时数
                var minutes = Math.ceil(leftTime / 1000 / 60 % 60);//计算剩余的分钟数
                //var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
                //判断天or时并赋值
                if (days > 99) {//如果超过99天
                    $('#timeunit').find('i').eq(0).html('9');//第一个数字
                    $('#timeunit').find('i').eq(1).html('9');//第二个数字
                    $('#timename').html("天结束");
                } else if (days > 1 && days <= 99) {//如果超过24小时
                    $('#timeunit').find('i').eq(0).html(days < 10 ? 0 : days.toString().charAt(0));//第一个数字
                    $('#timeunit').find('i').eq(1).html(days < 10 ? days : days.toString().charAt(1));//第二个数字
                    $('#timename').html("天结束");
                } else if (days <= 1 && hours > 1) {//如果小于24小时 大于1小时
                    hours = Math.floor(leftTime / 1000 / 60 / 60 % 24);//计算剩余的小时数
                    minutes = Math.floor(leftTime / 1000 / 60 % 60);//计算剩余的分钟数
                    $('#timeunit').find('i').eq(0).html(hours < 10 ? 0 : hours.toString().charAt(0));//第一个数字
                    $('#timeunit').find('i').eq(1).html(hours < 10 ? hours : hours.toString().charAt(1));//第二个数字
                    $('#timeunit').find('span').html('时').show();
                    $('#timeunit').find('i').eq(2).show().html(minutes < 10 ? 0 : minutes.toString().charAt(0));//第三个数字
                    $('#timeunit').find('i').eq(3).show().html(minutes < 10 ? minutes : minutes.toString().charAt(1));//第四个数字
                    $('#timename').html("分结束");
                } else if (hours <= 1 && minutes > 0) {//如果小于1小时
                    $('#timeunit').find('i').eq(0).html(minutes < 10 ? 0 : minutes.toString().charAt(0));//第一个数字
                    $('#timeunit').find('i').eq(1).html(minutes < 10 ? minutes : minutes.toString().charAt(1));//第二个数字
                    $('#timename').html("分结束");
                } else {//活动结束 时间归零
                    $('#timeunit').find('i').eq(0).html('0');//第一个数字
                    $('#timeunit').find('i').eq(1).html('0');//第二个数字
                    $('#timename').html("分结束");
                }
                $('.ck-count-down span').eq(0).html('还剩');
            }
        }
    })
}
var timerInter;
function changeCountTime(begintime, endtime, status) {//结束时间 数字id 天时分id 当前时间
    setCountTime(begintime, endtime, status);//时间主逻辑
    timerInter = setInterval(function () {//隔60秒执行一次=刷新
        setCountTime(begintime, endtime, status);
    }, 60000);
}
(function () {
    //计算popup居中
    var aPopup = document.querySelectorAll('.popup');
    for (var i = 0; i < aPopup.length; i++) {
        var h = aPopup[i].offsetHeight;
        aPopup[i].style.marginTop = -h / 2 + 'px';
    }
})();

//微信授权
function wechatCode(url){
	return false;
	
    var code=getRequest()['code'];
    var url=url;
    if(code){//如果有code 已经授权过 进行下一步 获取openId 姓名 头像（获取access_token+info微信安全考虑都在后端进行）
        if(Global.openid){

        }else{
            var businessP = {
                "appid":Global.appid,
                "secret":Global.secret,
                "code":code
            }
            var d = constructionParams(rsaEncryptedString(businessP), "249161eae3a94042ba1f0331b510534d");
            jQuery.ajax({
                type: "POST",
                url: Global.actionURL,
                async: false,//同步
                dataType: 'json',
                data: JSON.stringify(d),
                success: function (json) {
                    if(json.result==true){
                        sessionStorage.openid = json.userInfo.openid;
                        sessionStorage.nickname = json.userInfo.nickname;
                        sessionStorage.headimgurl = json.userInfo.headimgurl;
                        Global.openid = json.userInfo.openid;
                        Global.nickname = json.userInfo.nickname;
                        Global.headimgurl = json.userInfo.headimgurl;
                    }else{
                        layer.msg('获取用户信息失败')
                    }
                },
                error:function(json){
                    layer.msg('获取用户信息失败')
                }
            })
        }
    }else{
        //location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+Global.appid+'&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state='+getRequest()['userId']+'#wechat_redirect';
        return false;
    }
}

/************
主函数开始
Author Cheng Xin
Date 2016-10-12
************/

//活动页-内容载入+时间
var indexFn = function (begin) {
    if(inApp()){
    	
    }else{
        var nextUrl=location.href;
        //wechatCode(nextUrl);
    }
    var begin = begin;
    //赋值各种
    function getIndex() {
        var activityId = getRequest()["activityId"];
        var businessP = { "id": activityId }
        //alert(JSON.stringify(businessP));
        var d = constructionParams(rsaEncryptedString(businessP), "b6b78c0d5c0041a6bb5ce5491956a4e0");
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: true,
            cache:false,
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                //alert(JSON.stringify(json));
                if (json.result == true) {
                    //各种状态
                    if (json.data == '') {
                        layer.msg('活动不存在，请返回重试');
                        return false
                    }
                    Global.leftAmount = json.data.raiseMoney;
                    $('.big-name').html(json.data.name);//筹课活动名称
                    $('.xsck-wrap .xsck-content .text1 span').html(json.data.className);//班级名称
                    $('.xsck-wrap .xsck-content .text2').html(json.data.classArea);//校区
                    $('.inPersonNum').html(json.data.inPersonNum +' 人正在参与');//参与人数
                    $('.xsck-wrap .xsck-content p.fitPerson').html('适用人群：' + json.data.fitPerson);
                    $('.xsck-wrap .xsck-content .text3').html('活动时间：' + (json.data.beginDate.toString().slice(0, json.data.beginDate.toString().length - 9)) + ' 至 ' + (json.data.endDate.toString().slice(0, json.data.endDate.toString().length - 9)));
                    $('.text-detail p.new').html(json.data.rule.replace(/\n/g, '<br/>'));//规则
                    $('.text-detail p.old').html(json.data.content.replace(/\n/g, '<br/>'));//筹课说明
                    //说明展开收起判断
                    var theight1 = $("#overheight1").find(".text-detail p").height();
                    if(theight1>75){
                        $("#overheight1").find(".details-btn-zhan").show();
                    }else{
                        $("#overheight1").find(".details-btn-zhan").hide();
                    }
                    var theight2 = $("#overheight2").find(".text-detail p").height();
                    if(theight2>75){
                        $("#overheight2").find(".details-btn-zhan").show();
                    }else{
                        $("#overheight2").find(".details-btn-zhan").hide();
                    }
                    $('.rstxt').html(json.data.classArea);
                    $('.serviceCall').html(json.data.serviceCall);//官方客服文字
                    $('.public-number .hint2').html(json.data.wechatName);//公众号名称
                    $('.public-number .icon-img img:nth-of-type(1),.tan-box .con img').attr('src', json.data.erWeiCode);//底部二维码
                    //课程说明
                    $('.grade-title').html(json.data.name);
                    $('.popup .cont .cont-wrap p.bb1').html('班号：' + json.data.classCode);//班号
                    $('.popup .cont .cont-wrap p.bb2').html('￥' + json.data.classMoney + '元');//价格
                    $('.popup .cont .cont-wrap p.bb3').html('名额总数：' + json.data.number);//名额总数
                    $('.popup .cont .cont-wrap span.dd1').html(json.data.classArea);//上课地点
                    $('.popup .cont .cont-wrap span.dd2').html(json.data.classDate + '<br/>' + json.data.classTime);//上课时间
                    $('.popup .cont .cont-wrap span.dd3').html(json.data.content.replace(/\n/g, '<br/>'));//课程说明
                    //获取当前时间
                    var nowTime = json.data.nowTime,
                        beginDate = json.data.beginDate,
                        endDate = json.data.endDate;
                    if (json.data.status == 1) {//活动未开始
                        $('#startLaunch').hide();//隐藏发起按钮
                        $('#askFriend').width('100%').addClass('red');//隐藏发起按钮
                        beforFn();
                        changeCountTime(beginDate, endDate, 1);
                    }else if (json.data.status == 2) {//活动进行中
                        changeCountTime(beginDate, endDate, 2);
                        if (json.data.fundOffDate) {//新生名额已满
                            fillFn();
                        }
                    } else if (json.data.status == 3 || json.data.status == 4) {//活动已经结束
                        endFn();
                    }else if (json.data.status == 0) {
                    	notBeginFn();
                    }
                    
                    
                    askCmsFn(json.data.name);
                    //告诉朋友
                    $(document).on('touchend','#askFriend',function(){
                        if(inApp()){
                            var sName=json.data.name;
                            var sDescribe=json.data.content;
                            var sUrl=PREFIX_URL+'appindex?activityId='+activityId;
                            var sImgUrl = json.data.wechatImgUrl;
                            shareFn(sName,sDescribe,sUrl,sImgUrl);
                            return false
                        }else{
                            $(".mask").show();
                            $("#tan1").show();
                        }
                    });
                    if(inApp()){

                    }else{
                        //weChat分享数据
                        weChatMsg={
                            titleVal: json.data.name,
                            descVal:json.data.content,
                            linkVal:PREFIX_URL+'appindex?activityId='+getRequest()['activityId']+'&response_type=code&scope=snsapi_userinfo&state='+getRequest()['userId']+'#wechat_redirect',
                            imgUrlVal:json.data.wechatImgUrl
                        }
                        weChatData();
                    }
                } else {//返回出错
                    layer.msg('网络不给力，请再试一次');
                }
                if(typeof(Course)!='undefined'){Course.loadStatus(true)}//隐藏loading图标
                layer.closeAll('loading');
            }, error: function () {
                layer.msg('网络不给力，请再试一次');
                if(typeof(Course)!='undefined'){Course.loadStatus(true)}//隐藏loading图标
                layer.closeAll('loading');
            }
        });
    }
    getIndex();


    //发起筹课
    $(document).on('touchend','#startLaunch',function(){
        if(inApp()){//在app中
            //判断地址是否有userId
            if(getRequest()["userId"]&&getRequest()["userId"]!=''){//有 已登录 进入发起筹课
                Global.nickname=getRequest()["name"];
                Global.mobile=getRequest()["mobile"];
                Global.headimgurl=Global.domain_uh+'?u='+Global.userId+'&size=small';
                Global.userId=getRequest()["userId"];
                startAppFn()
            }else{//没 未登录 调用登录
                getLogin();
            }

        }else{//在微信中
        	var activityId = getRequest()["activityId"];
        	 //Global.userId = '1';//JSON.parse(json.data.Data).UserId;
             //Global.mobile = '139';//JSON.parse(json.data.Data).Mobile;
        	
             if(true){ //Global.mobile==''
            	 
             }else{
            	 startFn();
             }
             
        	//go passport
        	
            $(".mask").show();
            $(".tan-chouke-launch").animate({ 'bottom': '0px' });
            //点击确定
            $('.tan-chouke-launch .button-ok').on('touchend',function(){
                var $this = $(this);
                if($this.hasClass('on')){
                    return false
                }
                $this.addClass('on');
                var mobile = $('.tan-chouke-launch .tel').val();
                var smsCode = $('.tan-chouke-launch .sms').val();
                //判断
                if(mobile==''){
                    $('.error-red').html('手机号不能为空');
                    $this.removeClass('on');
                    return false
                }else if(smsCode==''){
                    $('.error-red').html('验证码不能为空');
                    $this.removeClass('on');
                    return false
                }else if(!/^[1][358][0-9]{9}$/.test(mobile)){
                    $('.error-red').html('手机号格式不正确');
                    $this.removeClass('on');
                    return false
                }

                var businessP = {"mobile":mobile,"smsCode":smsCode};
                var d = constructionParams(rsaEncryptedString(businessP), "8172fa7d2057476480ffb9525ed59b9f");
                jQuery.ajax({
                    type: "POST",
                    url: Global.actionURL,
                    async: true,
                    dataType: 'json',
                    data: JSON.stringify(d),
                    success: function (json) {
                        if(json.result==true){
                            if(json.data.Status==1){//成功 开始发起筹课
                                Global.userId = json.data.UserId;
                                Global.mobile = json.data.Mobile;
                                startFn();
                            }else{
                                $('.error-red').html(json.data.Message);
                            }
                        }else{
                            $('.error-red').html(json.data.Message);
                        }
                        $this.removeClass('on');
                    },error:function(){
                        layer.msg('网络不给力，换个姿势再试一下');
                        $this.removeClass('on');
                    }
                })
            })
            
        }
    });

    //tips提示状态
    $('.tan-chouke-launch .inp').on('focus',function(){
        $('.error-red').html('');
    });
    //获取验证码 微信
    $('.yanzm2').on('touchend',function(){
        var $this = $(this);
        if($this.hasClass('on')){
            return false
        }
        $this.addClass('on');
        var mobile = $('.tan-chouke-launch .tel').val();
        //判断
        if(mobile==''){
            $('.error-red').html('手机号不能为空');
            $this.removeClass('on');
            return false
        }else if(!/^[1][358][0-9]{9}$/.test(mobile)){
            $('.error-red').html('手机号格式不正确');
            $this.removeClass('on');
            return false
        }

        var businessP = {"mobile":mobile};
        var d = constructionParams(rsaEncryptedString(businessP), "d635a10fc14a4a64a8cbfd143eeff79b");
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: true,
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if(json.result==true){
                    if(json.data.Status==1){
                        layer.msg('验证码发送成功！');
                        var countdown=60;
                        function settimeFn() {
                            var cdDom=$('.yanzm2');
                            if (countdown == 0) {
                                cdDom.html("发送验证码");
                                countdown = 60;
                                cdDom.removeClass('on');
                                return;
                            } else {
                                cdDom.addClass('on');
                                cdDom.html('重新发送(' + countdown + ')')
                                countdown--;
                            }
                            setTimeout(function() {
                                settimeFn();
                            },1000)
                        }
                        settimeFn();
                    }else{
                        $('.error-red').html(json.data.Message);
                        $this.removeClass('on');
                    }
                }else{
                    $('.error-red').html(json.data.Message);
                    $this.removeClass('on');
                }
            }
        })
    })
}
//获取验证码（弹层） APP
function vCode(){
    if($('.vCode').hasClass('on')){
        //alert('有on')
        return false
    }
    $('.vCode').addClass('on').html('校验中...');
    var callVal = $('.phonenum').val();
    if(callVal==''){
        $('.vCode').removeClass('on').html('发送验证码');
        layer.msg('请输入手机号');
        return false
    }
    var businessP = {
        "mobile":callVal?callVal:'',
        "memo":"Chouke"
    }
    //alert(JSON.stringify(businessP));
    var d = constructionParams(rsaEncryptedString(businessP),"c929f0b70425417eab2a1d22969f3fe4");//获取验证码
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if(json.Status<1){
                layer.msg(json.Message);
                $('.vCode').removeClass('on').html('发送验证码');
            }else{
                var countdown=60;
                function settimeFn() {
                    var cdDom=$('.vCode');
                    if (countdown == 0) {
                        cdDom.removeClass("on");
                        cdDom.html("获取验证码");
                        countdown = 60;
                        cdDom.removeClass('on');
                        return;
                    } else {
                        cdDom.addClass('on');
                        cdDom.html('重新发送(' + countdown + ')')
                        countdown--;
                    }
                    setTimeout(function() {
                            settimeFn() }
                        ,1000)
                }
                settimeFn();
                //alert(json.content);
            }
        }
    });
}
//活动页-内容载入+时间
var indexFnPre = function (begin) {
    var begin = begin;
    //赋值各种
    function getIndex() {
        var activityId = getRequest()["activityId"];
        var businessP = { "id": activityId }
        //alert(JSON.stringify(businessP));
        var d = constructionParams(rsaEncryptedString(businessP), "b6b78c0d5c0041a6bb5ce5491956a4e0");
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: true,
            cache:false,
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                //alert(JSON.stringify(json));
                if (json.result == true) {
                    //各种状态
                    if (json.data == '') {
                        layer.msg('活动不存在，请返回重试');
                        return false
                    }
                    Global.leftAmount = json.data.raiseMoney;
                    $('.big-name').html(json.data.name);//筹课活动名称
                    $('.xsck-wrap .xsck-content .text1 span').html(json.data.className);//班级名称
                    $('.xsck-wrap .xsck-content .text2').html(json.data.classArea);//校区
                    $('.inPersonNum').html(json.data.inPersonNum +' 人正在参与');//参与人数
                    $('.xsck-wrap .xsck-content p.fitPerson').html('适用人群：' + json.data.fitPerson);
                    $('.xsck-wrap .xsck-content .text3').html('活动时间：' + (json.data.beginDate.toString().slice(0, json.data.beginDate.toString().length - 9)) + ' 至 ' + (json.data.endDate.toString().slice(0, json.data.endDate.toString().length - 9)));
                    $('.text-detail p.new').html(json.data.rule.replace(/\n/g, '<br/>'));//规则
                    $('.text-detail p.old').html(json.data.content.replace(/\n/g, '<br/>'));//筹课说明
                    //说明展开收起判断
                    var theight1 = $("#overheight1").find(".text-detail p").height();
                    if(theight1>75){
                        $("#overheight1").find(".details-btn-zhan").show();
                    }else{
                        $("#overheight1").find(".details-btn-zhan").hide();
                    }
                    var theight2 = $("#overheight2").find(".text-detail p").height();
                    if(theight2>75){
                        $("#overheight2").find(".details-btn-zhan").show();
                    }else{
                        $("#overheight2").find(".details-btn-zhan").hide();
                    }
                    $('.rstxt').html(json.data.classArea);
                    $('.serviceCall').html(json.data.serviceCall);//官方客服文字
                    $('.public-number .hint2').html(json.data.wechatName);//公众号名称
                    $('.public-number .icon-img img:nth-of-type(1),.tan-box .con img').attr('src', json.data.erWeiCode);//底部二维码
                    //课程说明
                    $('.grade-title').html(json.data.name);
                    $('.popup .cont .cont-wrap p.bb1').html('班号：' + json.data.classCode);//班号
                    $('.popup .cont .cont-wrap p.bb2').html('￥' + json.data.classMoney + '元');//价格
                    $('.popup .cont .cont-wrap p.bb3').html('名额总数：' + json.data.number);//名额总数
                    $('.popup .cont .cont-wrap span.dd1').html(json.data.classArea);//上课地点
                    $('.popup .cont .cont-wrap span.dd2').html(json.data.classDate + '<br/>' + json.data.classTime);//上课时间
                    $('.popup .cont .cont-wrap span.dd3').html(json.data.content.replace(/\n/g, '<br/>'));//课程说明
                    //获取当前时间
                    var nowTime = json.data.nowTime,
                        beginDate = json.data.beginDate,
                        endDate = json.data.endDate;
                    if (json.data.status == 1) {//活动未开始
                        $('#startLaunch').hide();//隐藏发起按钮
                        $('#askFriend').width('100%').addClass('red');//隐藏发起按钮
                        beforFn();
                        changeCountTime(beginDate, endDate, 1);
                    }else if (json.data.status == 2) {//活动进行中
                        changeCountTime(beginDate, endDate, 2);
                        if (json.data.fundOffDate) {//新生名额已满
                            fillFn();
                        }
                    } else if (json.data.status == 3 || json.data.status == 4) {//活动已经结束
                        endFn();
                    }else if (json.data.status == 0) {
                    	notBeginFn();
                    }

                } else {//返回出错
                    layer.msg('网络不给力，请再试一次');
                }
                if(typeof(Course)!='undefined'){Course.loadStatus(true)}//隐藏loading图标
            }, error: function () {
                layer.msg('网络不给力，请再试一次');
            }
        });
    }
    getIndex();
}
//活动页-判断能否发起（需要登录信息 获取userId 未登录直接进入页面（老生）or登录（新生））
function startFn() {
    var activityId = getRequest()["activityId"];
    var businessP = {
        "userId":Global.userId,
        "activityId":activityId
    };
    //验证是否发起过同一活动
    var d = constructionParams(rsaEncryptedString(businessP), "b41ff000e98c4fcb89a3e733e0a09a6c");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
        	
        	if(json.result==true&&json.data==true){//发布过 进入页面
                location.href=PREFIX_URL+'appnewraise?activityId='+activityId+'&userId='+Global.userId;
            }else{//未发布过 开始发布
                var businessP = {
                    "channel":"Wechat",
                    "activityId":activityId,
                    "userId":Global.userId,
                    "mobile":Global.mobile,
                    "leftAmount":Global.leftAmount,
                    "userName":encodeURI(Global.nickname),
                    "headImgurl":Global.headimgurl
                };
                var d = constructionParams(rsaEncryptedString(businessP), "14c1c39469ef4b9d912b69251a7c1191");//app-56
                jQuery.ajax({
                    type: "POST",
                    url: Global.actionURL,
                    async: true,
                    dataType: 'json',
                    data: JSON.stringify(d),
                    success: function (json) {
                        if (json.result == true) {//发起成功!  您已经在手机应用发起过该活动了哦  您已经在微信发起过该活动了哦
                            if(json.message=='发起成功!'){
                                location.href=PREFIX_URL+'appnewraise?activityId='+activityId+'&userId='+Global.userId+'&first=1';
                            }else{
                                location.href=PREFIX_URL+'appnewraise?activityId='+activityId+'&userId='+Global.userId;
                            }
                        } else {//发起失败!  活动信息不存在  活动已结束  本次活动筹课成功名额已满
                            $('.error-red').html(json.message);
                        }
                    },error: function () {
                        layer.msg('网络不给力，请再试一次');
                    }
                })
            }
        }
    })
}
//活动页-判断能否发起（需要登录信息 获取userId 未登录直接进入页面（老生）or登录（新生））
function startAppFn() {
    var activityId = getRequest()["activityId"];
    var businessP = {
        "userId":Global.userId,
        "activityId":activityId
    };
    //验证是否发起过同一活动
    var d = constructionParams(rsaEncryptedString(businessP), "b41ff000e98c4fcb89a3e733e0a09a6c");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if(json.result==true&&json.data==true){//发布过 进入页面
                location.href=PREFIX_URL+'appnewraise?activityId='+activityId+'&userId='+Global.userId;
            }else{//未发布过 开始发布
                var ss=true;
                //判断mobile有木有
                if(Global.mobile){//有
                    //弹出已绑定手机层
                    $('#fillinInfo,.mask').show();
                    $('#fillinInfo .fillin').hide();//验证码层
                    $('#fillinInfo .fillin-xiugai').show();//修改层
                    //手机赋值
                    $('#fillinInfo .fillin-xiugai h4').html(Global.mobile);
                    ss=true;
                    //点击修改
                    $('#fillinInfo .fillin-xiugai .modify').on('touchend',function(){
                        $('#fillinInfo .fillin').show();//验证码层
                        $('#fillinInfo .fillin-xiugai').hide();//修改层
                        ss=false;
                    })
                }else{
                    //直接弹出验证码层
                    $('#fillinInfo,.mask').show();
                    $('#fillinInfo .fillin').show();//验证码层
                    $('#fillinInfo .fillin-xiugai').hide();//修改层
                    ss=false;
                }

                $('#startApp').on('touchend',function(){
                    if(ss){//已绑情况
                        goRaise();
                    }else{//未绑情况 包含验证验证码
                        Global.mobile=$('#fillinInfo .fillin .phonenum').val();
                        smsCodeVal=$('#fillinInfo .fillin .codeTxt').val();
                        //验证验证码
                        var businessP0 = {
                            "mobile":Global.mobile,
                            "smsCode":smsCodeVal
                        }
                        var d = constructionParams(rsaEncryptedString(businessP0),"5e3b8fbabe3d43409dd2edabb1abadc9");
                        jQuery.ajax({
                            type: "POST",
                            url: Global.actionURL,
                            async: true,
                            dataType: 'json',
                            data: JSON.stringify(d),
                            success: function (json) {
                                if (json.result == true) {//获取成功
                                    goRaise();
                                }else{
                                    layer.msg(json.message);
                                }
                            }
                        })
                    }
                })
                //发起接口
                function goRaise(){
                    if(Global.nickname&&Global.nickname!=''){
                    }else{
                        Global.nickname=Global.mobile;
                    }
                    
                    var businessP = {
                        "channel":"app",
                        "activityId":activityId,
                        "userId":Global.userId,
                        "mobile":Global.mobile,
                        "leftAmount":Global.leftAmount,
                        "userName":encodeURI(Global.nickname),
                        "headImgurl":Global.headimgurl
                    };
                    var d = constructionParams(rsaEncryptedString(businessP), "14c1c39469ef4b9d912b69251a7c1191");//app-56
                    jQuery.ajax({
                        type: "POST",
                        url: Global.actionURL,
                        async: true,
                        dataType: 'json',
                        data: JSON.stringify(d),
                        success: function (json) {
                        	
                            if (json.result == true) {//发起成功!  您已经在手机应用发起过该活动了哦  您已经在微信发起过该活动了哦
                                if(json.message=='发起成功!'){
                                    location.href=PREFIX_URL+'appnewraise?activityId='+activityId+'&userId='+Global.userId+'&first=1';
                                }else{
                                    location.href=PREFIX_URL+'appnewraise?activityId='+activityId+'&userId='+Global.userId;
                                }
                            } else {//发起失败!  活动信息不存在  活动已结束  本次活动筹课成功名额已满
                                $('.error-red').html(json.message);
                            }
                        },error: function () {
                            layer.msg('网络不给力，请再试一次');
                        }
                    })
                }
            }
        }
    })
}

//跑马灯
function runFn() {
    var activityId = getRequest()["activityId"];
    //嵌套用户信息
    var businessP = {
        "activityId":activityId
    }
    var d = constructionParams(rsaEncryptedString(businessP), "cd88d0da31a64121931edfe0eec478ba");//app-58
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                //跑马灯
                var divHtml='';
                $.each(json.data,function(i,item){
                    if(item.msg=='筹课成功了!'){
                        divHtml+='<span style="color:#ff9900"><img src="'+(item.headImg?item.headImg:'')+'" class="h" />'+item.mobile+item.msg+'</span>'
                    }else{
                        divHtml+='<span><img src="'+(item.headImg?item.headImg:'')+'" class="h" />'+item.mobile+item.msg+'</span>'
                    }
                })
                if(divHtml!=''){
                    $('.chou-already marquee').append(divHtml);
                    $('.chou-already ').show();
                }
            }
        }, error: function () {
            layer.msg('网络不给力，请再试一次');
        }
    })
}

//筹课页
function newRaiseFn() {
    var activityId = getRequest()["activityId"];
    var userId = getRequest()["userId"];
    //嵌套用户信息
    var businessP = {
        "userId": decodeURIComponent(userId),
        "activityId":activityId
    }
    var d = constructionParams(rsaEncryptedString(businessP), "6716a697e5234734a1c1cf97d8c60012");//app-53
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var ppnum;
                ppnum = json.data.userList.length;
                //信息嵌套
                $('.big-name').html(json.data.activity.name);//筹课活动名称
                $('.xsck-wrap .xsck-content .text1 span').html(json.data.activity.className);//班级名称
                $('.xsck-wrap .xsck-content .text2').html(json.data.activity.classArea);//校区
                $('.inPersonNum').html(json.data.activity.inPersonNum +' 人正在参与');//参与人数
                $('.xsck-wrap .xsck-content p.fitPerson').html('适用人群：' + json.data.activity.fitPerson);
                $('.xsck-wrap .xsck-content .text3').html('活动时间：' + (json.data.activity.beginDate.toString().slice(0, json.data.activity.beginDate.toString().length - 9)) + ' 至 ' + (json.data.activity.endDate.toString().slice(0, json.data.activity.endDate.toString().length - 9)));//帮筹人数
                $('.publisNum').html(json.data.activity.publisNum);//发起人数
                $('.helperNum').html(json.data.activity.helperNum);//参与人数
                $('.ck-head .text1 em').html(json.data.activity.classMoney);//头部金钱
                $('.ck-user .info .num').html(ppnum);//帮筹人数
                $('.leftAmount').html(json.data.activity.leftAmount);//需筹
                $('.helpAmount').html((parseInt(json.data.activity.raiseMoney) - parseInt(json.data.activity.leftAmount)) >= 0 ? (parseInt(json.data.activity.raiseMoney) - parseInt(json.data.activity.leftAmount)) : 0);//已筹
                $('.wechatName').html(json.data.activity.wechatName)//公众号名称
                $('.public-number .hint2').html(json.data.activity.wechatName);//公众号名称
                $('.public-number .icon-img img:nth-of-type(1),.tan-box .con img').attr('src', json.data.activity.erWeiCode);//底部二维码
                //进度条计算
                $('.progress-loading').width((parseInt(json.data.activity.raiseMoney) - parseInt(json.data.activity.leftAmount)) / json.data.activity.raiseMoney * 100 + '%');
                //新生筹课规则
                $('.rstxt').html(json.data.activity.newStudentDefinition);
                $('.rstxtNew p').html(json.data.activity.rule.replace(/\n/g, '<br/>'));
                //课程说明
                $('.grade-title').html(json.data.activity.name);
                $('.popup .cont .cont-wrap p.bb1').html('班号：' + json.data.activity.classCode);//班号
                $('.popup .cont .cont-wrap p.bb2').html('课程原价：￥' + json.data.activity.classMoney + '元');//价格
                $('.popup .cont .cont-wrap p.bb3').html('名额总数：' + json.data.activity.number);//名额总数
                $('.popup .cont .cont-wrap span.dd1').html(json.data.activity.classArea);//上课地点
                $('.popup .cont .cont-wrap span.dd2').html(json.data.activity.classDate + '<br/>' + json.data.activity.classTime);//上课时间
                $('.popup .cont .cont-wrap span.dd3').html(json.data.activity.content.replace(/\n/g, '<br/>'));//课程说明

                //获取用户名头像
                $('.ck-user .pic img').attr('src', json.data.activity.headImg);
               
                $('.ck-user .info .name').html(json.data.activity.userName);

                //帮筹的人list
                if (ppnum > 0) {//有人帮筹
                    $('.user-list-wrap h1').hide();
                    $('.user-list-skin').show();
                    var usListHtml = '';
                    $.each(json.data.userList, function (i, item) {
                        usListHtml += '<li>' +
                            '<div class="pic"><img src="' + item.headImgurl + '"></div>' +
                            '<div class="name"><span>' +  decodeURI(item.nickName) + '</span> <em> ' + (item.helpAmount < 0 ? item.helpAmount : ('+' + item.helpAmount)) + '元</em></div>' +
                            '<div class="money">￥' + item.leftAmount + '</div>' +
                            '</li>';
                    });
                    $('#rollList1').html(usListHtml)
                    if(ppnum>4){
                        setInterval('autoScroll(".user-list-wrap")',2000);
                    }
                }

                //weChat分享数据
                weChatMsg={
                    titleVal: json.data.activity.name,
                    descVal:json.data.activity.content,
                    linkVal: PREFIX_URL+'apphelpraise?activityId='+getRequest()['activityId']+'&userId='+userId+'&response_type=code&scope=snsapi_userinfo&state='+userId+'#wechat_redirect',
                    imgUrlVal:json.data.activity.wechatImgUrl
                }
                //获取当前时间
                var nowTime = json.data.activity.nowTime,
                    beginDate = json.data.activity.beginDate,
                    endDate = json.data.activity.endDate;
                if (json.data.activity.status == 1) {//活动未开始
                    $('#startLaunch').hide();//隐藏发起按钮
                    $('#askFriend').width('100%').addClass('red');//隐藏发起按钮
                    beforFn();
                    changeCountTime(beginDate, endDate, 1);
                }else if (json.data.activity.status == 2) {//活动进行中
                    changeCountTime(beginDate, endDate, 2);
                    if (json.data.activity.fundOffDate) {//新生名额已满
                        fillFn();
                        $('.ck-fail').show();
                        if (json.data.activity.isSuccess != 1){
                            $('.ck-fail').show();
                        }
                    }
                    $('.mask-fq').on('touchend', function () {
                        $('.mask-fq,.mask').hide();
                    })
                    $('.askHelp').on('touchend', function () {
                        $('.mask-fq,.mask').hide();
                    })
                } else if (json.data.activity.status == 3 || json.data.activity.status == 4) {//活动已经结束
                        endFn();
                        if (json.data.activity.isSuccess != 1){
                            $('.ck-fail').show();
                        }
                }else if (json.data.activity.status == 0) {
                	notBeginFn();
                }

                //判断是否已成功
                if (json.data.activity.isSuccess == 1) {//成功了
                    $('.ck-success').show();//成功图标
                    $('.end-box').hide();
                    $('.ck-fail').hide();
                    if(inApp()){
                        $('.ck-success').show();//成功图标
                        $('#popupSuccessWechat,.mask').show();
                        $('#popupSuccessWechat .close').on('touchend',function(){
                            $('.popup,.mask').hide();
                            return false
                        });
                        //成功弹层信息嵌套
                        $('.classesInfo-box .yy').html('原价'+json.data.activity.classMoney+'元，折扣后'+(json.data.activity.classMoney-json.data.activity.raiseMoney)+'元');
                        $('.tan-classesInfo h3').html(json.data.activity.className);
                        $('.tan-classesInfo .i0').html('适用校区：'+json.data.activity.classArea);
                        $('.tan-classesInfo .i1').html('兑课地址：'+json.data.activity.honourClassAddress);
                        $('.tan-classesInfo .i2').html('兑课电话：'+json.data.activity.honourClassContact);
                        $('.tan-classesInfo .i3').html('兑课截止日期：'+json.data.activity.honourClassExpires.slice(0,10));
                        //底部按钮
                        $('#askFriend').html('把活动告诉朋友');
                    }else{
                        $('.ck-success').show();//成功图标
                        $('#popupSuccessWechat,.mask').show();
                        $('#popupSuccessWechat .close').on('touchend',function(){
                            $('.popup,.mask').hide();
                            return false
                        });
                        //成功弹层信息嵌套
                        $('#popupSuccessWechat h1').html('恭喜'+decodeURI(decodeURI(json.data.activity.userName))+'筹课成功');
                        $('.classesInfo-box .yy').html('原价'+json.data.activity.classMoney+'元，折扣后'+(json.data.activity.classMoney-json.data.activity.raiseMoney)+'元');
                        $('.tan-classesInfo h3').html(json.data.activity.className);
                        $('.tan-classesInfo .i0').html('适用校区：'+json.data.activity.classArea);
                        $('.tan-classesInfo .i1').html('兑课地址：'+json.data.activity.honourClassAddress);
                        $('.tan-classesInfo .i2').html('兑课电话：'+json.data.activity.honourClassContact);
                        $('.tan-classesInfo .i3').html('兑课截止日期：'+json.data.activity.honourClassExpires.slice(0,10));
                        //底部按钮
                        $('#askFriend').html('把活动告诉朋友');
                        //找朋友来帮忙弹框
                        $(document).on('touchend','#askFriend',function(){
                            $(".mask").show();
                            $(".tan1").show();
                            return false
                        });
                        //weChat分享数据
                        weChatMsg={
                            titleVal: json.data.activity.name,
                            descVal:json.data.activity.content,
                            linkVal: PREFIX_URL+'appindex?activityId='+getRequest()['activityId']+'&response_type=code&scope=snsapi_userinfo&state='+userId+'#wechat_redirect',
                            imgUrlVal:json.data.activity.wechatImgUrl
                        }

                    }
                }

                if(inApp()){
                    //分享绑定
                    if(json.data.activity.isSuccess == 1){
                        $('#askFriend,.askHelp').on('touchend',function(){
                            var sName=json.data.activity.name;
                            var sDescribe=json.data.activity.content;
                            var sUrl=PREFIX_URL+'appindex?activityId='+getRequest()['activityId']+'&response_type=code&scope=snsapi_userinfo&state='+userId+'#wechat_redirect'
                            var sImgUrl = json.data.activity.wechatImgUrl;
                            shareFn(sName,sDescribe,sUrl,sImgUrl);
                            return false
                        })
                    }else{
                        $('#askFriend,.askHelp').on('touchend',function(){
                            var sName=json.data.activity.name;
                            var sDescribe=json.data.activity.content;
                            var sUrl=PREFIX_URL+'apphelpraise?activityId='+getRequest()['activityId']+'&userId='+userId+'&response_type=code&scope=snsapi_userinfo&state='+userId+'#wechat_redirect'
                            var sImgUrl = json.data.activity.wechatImgUrl;
                            shareFn(sName,sDescribe,sUrl,sImgUrl);
                            return false
                        })
                    }
                    if(getRequest()["first"]==1){
                        $('.mask-content,.mask').show();
                    }
                }else{
                    //找朋友来帮忙弹框
                    $(document).on('touchend','#askFriend',function(){
                        $(".mask").show();
                        $(".tan3").show();
                    });
                    if(getRequest()["first"]==1){
                        $('.md-addClass,.mask').show();
                    }
                    weChatData();
                }
            } else {
                layer.msg('网络不给力，请再试一次')
            }
            if(typeof(Course)!='undefined'){Course.loadStatus(true)}//隐藏loading图标
            layer.closeAll('loading');
        },error:function () {
            layer.msg('网络不给力，请再试一次');
            if(typeof(Course)!='undefined'){Course.loadStatus(true)}//隐藏loading图标
            layer.closeAll('loading');
        }
    })
}

//帮筹
function helpRaiseFn() {
    if(inApp()){
    }else{
        var nextUrl=location.href;
        //wechatCode(nextUrl);
    }
    var activityId = getRequest()["activityId"];
    var userId = getRequest()["state"]?getRequest()["state"]:getRequest()["userId"];
    //嵌套用户信息
    var businessP = {
        "userId": decodeURIComponent(userId),
        "activityId":activityId
    }
    var d = constructionParams(rsaEncryptedString(businessP), "6716a697e5234734a1c1cf97d8c60012");//app-53
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var ppnum;
                ppnum = json.data.userList.length;
                //信息嵌套
                $('.big-name').html(json.data.activity.name);//筹课活动名称
                $('.xsck-wrap .xsck-content .text1 span').html(json.data.activity.className);//班级名称
                $('.xsck-wrap .xsck-content .text2').html(json.data.activity.classArea);//校区
                $('.inPersonNum').html(json.data.activity.inPersonNum +' 人正在参与');//参与人数
                $('.xsck-wrap .xsck-content p.fitPerson').html('适用人群：' + json.data.activity.fitPerson);
                $('.xsck-wrap .xsck-content .text3').html('活动时间：' + (json.data.activity.beginDate.toString().slice(0, json.data.activity.beginDate.toString().length - 9)) + ' 至 ' + (json.data.activity.endDate.toString().slice(0, json.data.activity.endDate.toString().length - 9)));//帮筹人数
                $('.publisNum').html(json.data.activity.publisNum);//发起人数
                $('.helperNum').html(json.data.activity.helperNum);//参与人数
                var classMoney=json.data.activity.classMoney;
                $('.ck-head .text1 em').html(json.data.activity.classMoney);//头部金钱
                $('.ck-user .info .num').html(ppnum);//帮筹人数
                $('.leftAmount').html(json.data.activity.leftAmount);//需筹
                $('.helpAmount').html((parseInt(json.data.activity.raiseMoney) - parseInt(json.data.activity.leftAmount)) >= 0 ? (parseInt(json.data.activity.raiseMoney) - parseInt(json.data.activity.leftAmount)) : 0);//已筹

                $('.wechatName').html(json.data.activity.wechatName)//公众号名称
                $('.public-number .hint2').html(json.data.activity.wechatName);//公众号名称
                $('.public-number .icon-img img:nth-of-type(1),.tan-box .con img').attr('src', json.data.activity.erWeiCode);//底部二维码
                //进度条计算
                $('.progress-loading').width((parseInt(json.data.activity.raiseMoney) - parseInt(json.data.activity.leftAmount)) / json.data.activity.raiseMoney * 100 + '%');
                //新生筹课规则
                $('.rstxt').html(json.data.activity.newStudentDefinition);
                $('.rstxtNew p').html(json.data.activity.rule.replace(/\n/g, '<br/>'));
                //课程说明
                $('.grade-title').html(json.data.activity.name);
                $('.popup .cont .cont-wrap p.bb1').html('班号：' + json.data.activity.classCode);//班号
                $('.popup .cont .cont-wrap p.bb2').html('课程原价：￥' + json.data.activity.classMoney + '元');//价格
                $('.popup .cont .cont-wrap p.bb3').html('名额总数：' + json.data.activity.number);//名额总数
                $('.popup .cont .cont-wrap span.dd1').html(json.data.activity.classArea);//上课地点
                $('.popup .cont .cont-wrap span.dd2').html(json.data.activity.classDate + '<br/>' + json.data.activity.classTime);//上课时间
                $('.popup .cont .cont-wrap span.dd3').html(json.data.activity.content.replace(/\n/g, '<br/>'));//课程说明
                //接口姓名头像
                $('.ck-user .pic img').attr('src', json.data.activity.headImg);
                $('.ck-user .info .name').html(json.data.activity.userName);
                
                //帮筹的人list
                if (ppnum > 0) {//有人帮筹
                    $('.user-list-wrap h1').hide();
                    $('.user-list-skin').show();
                    var usListHtml = '';
                    $.each(json.data.userList, function (i, item) {
                        usListHtml += '<li>' +
                            '<div class="pic"><img src="' + item.headImgurl + '"></div>' +
                            '<div class="name"><span>' +  decodeURI(item.nickName) + '</span> <em> ' + (item.helpAmount < 0 ? item.helpAmount : ('+' + item.helpAmount)) + '元</em></div>' +
                            '<div class="money">￥' + item.leftAmount + '</div>' +
                            '</li>';
                        
                        if(item.openId==Global.openid){//筹过
                        	$('#ck-help').hide();
                            $('#askFriend').html('找朋友帮TA');
                            $('#askFriend').off('touchend').on('touchend',function(){
                                $('#tan2,.mask').show();
                                return false
                            })
                        }
                    });
                    $('#rollList1').html(usListHtml)
                    if(ppnum>4){
                        setInterval('autoScroll(".user-list-wrap")',2000);
                    }
                }
                //weChat分享数据
                weChatMsg={
                    titleVal: json.data.activity.name,
                    descVal:json.data.activity.content,
                    linkVal: PREFIX_URL+"apphelpraise?activityId="+getRequest()['activityId']+'&userId='+userId+'&response_type=code&scope=snsapi_userinfo&state='+userId+'#wechat_redirect',
                    imgUrlVal:json.data.activity.wechatImgUrl
                }
                //获取当前时间
                var nowTime = json.data.activity.nowTime,
                    beginDate = json.data.activity.beginDate,
                    endDate = json.data.activity.endDate;
                if (json.data.activity.status == 1) {//活动未开始
                    $('#startLaunch').hide();//隐藏发起按钮
                    //TERRY$('#askFriend').width('100%').addClass('red');//隐藏发起按钮
                    beforFn();
                    $('#ck-help').hide();
                    changeCountTime(beginDate, endDate, 1);
                }else if (json.data.activity.status == 2) {//活动进行中
                    changeCountTime(beginDate, endDate, 2);
                    if (json.data.activity.fundOffDate) {//新生名额已满
                        fillFn();
                        $('#ck-help').hide();
                        if (json.data.activity.isSuccess != 1){
                            $('.ck-fail').show();
                        }
                    }
                    $('.mask-fq').on('touchend', function () {
                        $('.mask-fq,.mask').hide();
                    })
                    $('.askHelp').on('touchend', function () {
                        $('.mask-fq,.mask').hide();
                    })
                } else if (json.data.activity.status == 3 || json.data.activity.status == 4) {//活动已经结束
                    endFn();
                    $('#ck-help').hide();
                    if (json.data.activity.isSuccess != 1){
                        $('.ck-fail').show();
                    }
                }else if (json.data.activity.status == 0) {
                	notBeginFn();
                }
                //判断是否已成功
                if (json.data.activity.isSuccess == 1) {//成功了
                    $('.ck-success').show();//成功图标
                    $('.end-box').hide();
                    $('.ck-fail').hide();
                    if(inApp()){
                        $('.ck-success').show();//成功图标
                        $('.ck-fail').hide();
                        $('#popupSuccessWechat,.mask').show();
                        $('#popupSuccessWechat .close').on('touchend',function(){
                            $('.popup,.mask').hide();
                            return false
                        });
                        //成功弹层信息嵌套
                        $('#popupSuccessWechat h1').html('恭喜'+decodeURI(decodeURI(json.data.activity.userName))+'筹课成功');
                        $('.classesInfo-box .yy').html('原价'+json.data.activity.classMoney+'元，折扣后'+(json.data.activity.classMoney-json.data.activity.raiseMoney)+'元');
                        $('.tan-classesInfo h3').html(json.data.activity.className);
                        $('.tan-classesInfo .i0').html('适用校区：'+json.data.activity.classArea);
                        $('.tan-classesInfo .i1').html('兑课地址：'+json.data.activity.honourClassAddress);
                        $('.tan-classesInfo .i2').html('兑课电话：'+json.data.activity.honourClassContact);
                        $('.tan-classesInfo .i3').html('兑课截止日期：'+json.data.activity.honourClassExpires.slice(0,10));
                    }else{
                        $('.ck-success').show();//成功图标
                        $('.ck-fail').hide();
                        $('#askFriend').hide();//隐藏发起按钮
                        $('#goIndex').width('100%');//我也要发起
                        $('#ck-help').hide();
                        $('#popupSuccessWechat,.mask').show();
                        $('#popupSuccessWechat .close').on('touchend',function(){
                            $('.popup,.mask').hide();
                            return false
                        });
                        //成功弹层信息嵌套
                        $('#popupSuccessWechat h1').html('恭喜'+decodeURI(decodeURI(json.data.activity.userName))+'筹课成功');
                        $('.classesInfo-box .yy').html('原价'+json.data.activity.classMoney+'元，折扣后'+(json.data.activity.classMoney-json.data.activity.raiseMoney)+'元');
                        $('.tan-classesInfo h3').html(json.data.activity.className);
                        $('.tan-classesInfo .i0').html('适用校区：'+json.data.activity.classArea);
                        $('.tan-classesInfo .i1').html('兑课地址：'+json.data.activity.honourClassAddress);
                        $('.tan-classesInfo .i2').html('兑课电话：'+json.data.activity.honourClassContact);
                        $('.tan-classesInfo .i3').html('兑课截止日期：'+json.data.activity.honourClassExpires.slice(0,10));

                        //找朋友来帮忙弹框
                        $(document).on('touchend','#askFriend',function(){
                            $(".mask").show();
                            $(".tan1").show();
                            return false
                        });
                        //weChat分享数据
                        weChatMsg={
                            titleVal: json.data.activity.name,
                            descVal:json.data.activity.content,
                            linkVal:PREFIX_URL+"apphelpraise?activityId="+getRequest()['activityId']+'&userId='+userId+'&response_type=code&scope=snsapi_userinfo&state='+userId+'#wechat_redirect',
                            imgUrlVal:json.data.activity.wechatImgUrl
                        }
                    }
                }
                if(inApp()){

                }else{
                    weChatData();
                }
                askCmsFn(json.data.activity.name);
                var userName=json.data.activity.userName,classMoney=json.data.activity.classMoney;
                //帮筹按钮
                $(document).on('touchend','#askFriend',function(){
                    //嵌套用户信息
                    var businessP = 
                    {
                    "activityId":activityId,
                    "userId":userId,
                    "openId":Global.openid,
                    "nickName":encodeURI(Global.nickname),
                    "headImgurl":Global.headimgurl
                    }
                    var d = constructionParams(rsaEncryptedString(businessP), "93b118aae9cb416c8f72e1dffbe84e3e");//app-57
                    jQuery.ajax({
                        type: "POST",
                        url: Global.actionURL,
                        async: true,
                        dataType: 'json',
                        data: JSON.stringify(d),
                        success: function (json) {
                            if (json.result == true) {
                                window.location.href=PREFIX_URL+'apphelpraisesuccess?name='+userName+'&classMoney='+classMoney+'&data='+json.data+'&activityId='+activityId+'&userId='+userId;
                            }else{//失败提示
                                layer.msg(json.message)
                            }
                        }
                    });
                })
            } else {
                layer.msg('网络不给力，请再试一次')
            }
            if(typeof(Course)!='undefined'){Course.loadStatus(true)}//隐藏loading图标
            layer.closeAll('loading');
        },error:function () {
            layer.msg('网络不给力，请再试一次');
            if(typeof(Course)!='undefined'){Course.loadStatus(true)}//隐藏loading图标
            layer.closeAll('loading');
        }
    })
    //分享绑定
    $('#goIndex').on('touchend', function () {
        window.location.href=PREFIX_URL+'appindex?activityId='+getRequest()['activityId'];
        return false
    })
}

//帮筹成功
function helpRaiseSuccess(){
    var activityId = getRequest()["activityId"];
    var userId = getRequest()["userId"];
    var name = decodeURI(decodeURI(getRequest()["name"]));
    var data = decodeURI(getRequest()["data"]);
    $('.subtitle').html('你为'+name+'成功筹得'+data+'元');
    if(typeof(Course)!='undefined'){Course.loadStatus(true)}//隐藏loading图标
    layer.closeAll('loading');
}

//默认取消滑动
$('.popup,.mask,.mask-fq').on('touchmove', function (e) { e.preventDefault() });
$('.popup .rstxtNew,.popup .cont-wrap').on('touchmove', function (e) {
    e.stopPropagation();
});


//统计代码
window._pt_lt = new Date().getTime();
window._pt_sp_2 = [];
_pt_sp_2.push('setAccount,558701b2');
var _protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
(function() {
    var atag = document.createElement('script'); atag.type = 'text/javascript'; atag.async = true;
    atag.src = _protocol + 'js.ptengine.cn/558701b2.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(atag, s);
})();