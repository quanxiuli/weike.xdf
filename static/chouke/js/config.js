Global.headImgurl='./images/raiseClass/photo_default.png';//取app的头像
Global.domain_uh='http://my.xdf.cn/API_Avatar/img';//
//Global.wechatUrl = 'http://apphome.xdf.cn/xdfhome/';//正式
Global.wechatUrl = 'http://apphome.staff.xdf.cn/xdfhome/';//测试
//Global.wechatUrl = 'http://xytest.staff.xdf.cn/wechat_v1.5/';//测试
//Global.appid='wx4430a619527b0667';//微信公众平台正式号 新东方app
//Global.appid='wx065bbd0232df78cb';//微信公众平台正式号 新东方AIO
Global.appid='wxead625824f66bd78';//微信公众平台测试号 大橙子
//Global.secret='3165d868b8fda7626d629003ab9f1ff0';//微信公众平台正式号 新东方app
Global.secret='c3cee89b0622fe0fcdcc8d75543769f7';//微信公众平台测试号 大橙子
//Global.redirect_uri='apphome.xdf.cn';//正式
Global.redirect_uri='apphome.staff.xdf.cn';//测试
Global.openappid='wx8a15cbb7c58a948d';//微信开放平台正式号 新东方app

Global.openid = sessionStorage.openid;
Global.nickname = sessionStorage.nickname;
Global.headimgurl = sessionStorage.headimgurl;

//获取拼出url后json数组
function getRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


//判断是否在app中 反回true在 false不在
function inApp() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('zsxdf') > -1) {//在app内
        return true
    } else {
        return false
    }
}

//判断微信 or app
if(inApp()){
	
}else{
	//微信分享数据
	function weChatData(){
		var urlVal = window.location.href;
		var businessP = {
			"appid":Global.appid,
			"secret":Global.secret,
			"url":urlVal
		}
		var d = constructionParams(rsaEncryptedString(businessP),"6bd249db7c52440ab7462b6d298077d9");
		jQuery.ajax({
			type: "POST",
			url: Global.actionURL,
			async: true,
			dataType: 'json',
			data: JSON.stringify(d),
			success: function (json) {
				if (json.result == true) {//获取成功
					var appId = Global.appid;
					var timestamp=json.timestamp;
					var nonceStr=json.nonceStr;
					var signature=json.signature;
					wx.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId:appId, // 必填，公众号的唯一标识
						timestamp: timestamp, // 必填，生成签名的时间戳
						nonceStr: nonceStr, // 必填，生成签名的随机串
						signature: signature,// 必填，签名，见附录1
						jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','hideMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
					wx.ready(function(){
						wx.onMenuShareTimeline({
							title: weChatMsg.titleVal, // 分享标题
							link: weChatMsg.linkVal, // 分享链接
							imgUrl:weChatMsg.imgUrlVal, // 分享图标
							success: function () {
								// 用户确认分享后执行的回调函数
								$('.tan-box,.tan3,.mask,.popup,.mask-fq').hide();
								shareCmsFn();
							},
							cancel: function () {
								// 用户取消分享后执行的回调函数
								$('.tan-box,.tan3,.mask,.popup,.mask-fq').hide();
							}
						});
						wx.onMenuShareAppMessage({
							title:weChatMsg.titleVal, // 分享标题
							desc: weChatMsg.descVal, // 分享描述
							link:weChatMsg.linkVal, // 分享链接
							imgUrl:weChatMsg.imgUrlVal, // 分享图标
							type: '', // 分享类型,music、video或link，不填默认为link
							dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
							success: function () {
								// 用户确认分享后执行的回调函数
								$('.tan-box,.tan3,.mask,.popup,.mask-fq').hide();
								shareCmsFn();
							},
							cancel: function () {
								// 用户取消分享后执行的回调函数
								$('.tan-box,.tan3,.mask,.popup,.mask-fq').hide();
							}

						});
						//禁用部分分享按钮
						wx.hideMenuItems({
							menuList: ['menuItem:share:qq',         //分享到QQ
									'menuItem:share:weiboApp',   //分享到微博
									'menuItem:share:facebook',   //分享到Facebook
									'menuItem:share:QZone',      //分享到QQ空间
									//'menuItem:openWithQQBrowser',//在QQ浏览器中打开
									//'menuItem:openWithSafari',   //在Safari中打开
									'menuItem:share:email',
									'menuItem:copyUrl',          //复制链接
									'menuItem:readMode'          //阅读模式
							],
							success: function () {
								//alert("testing:ok");
							},
							error: function () {
								//alert("testing:error");
							}
						});
					});
				}
			}
		});

	}
}

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
//后台统计
function askCmsFn(title) {
    var activityId = getRequest()["activityId"];
    var url = location.href;
    var businessP = {
        "activityId":activityId,
        "type":2,//阅读
        "url":url,
        "title":title,
        "userId":Global.openid
    };
    var d = constructionParams(rsaEncryptedString(businessP), "bcac7aacdebe4033b989aec7dc6c68d0");//app51
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if(json.result==true){
                
            }
        }
    })
}
function shareCmsFn() {
    var activityId = getRequest()["activityId"];
	var title=$('.big-name').html();
    var url = location.href;
    var businessP = {
        "activityId":activityId,
        "type":1,//分享
        "url":url,
        "title":title,
        "userId":Global.openid
    };
    var d = constructionParams(rsaEncryptedString(businessP), "bcac7aacdebe4033b989aec7dc6c68d0");//app51
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if(json.result==true){
                
            }
        }
    })
}
