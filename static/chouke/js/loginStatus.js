//window.setInterval("checkStatus()", 1000 * 3);//3秒检查一次
$(document).ajaxComplete(function(event,xhr,option){
	//console.log(xhr);
	if(xhr['status']==200 && xhr['readyState']==4){
		var responseJSON = xhr['responseJSON'];
		if(typeof responseJSON == 'undefined'){
			console.log(xhr['responseText'])
		}else{
			if(responseJSON.no_login){
				alert(responseJSON.message);
				window.location.href = '/chouke/logout';
			}
		}
	}
});
function checkStatus() {
    if (!getCookie("loginId")) {
        layer.msg("登陆状态已过期,请重新登陆!", {icon: 5});
        setTimeout("toLogout('91411a1a05fd4571859044ed18892ac1')", 1000);
    }
}/**
 * Created by zhaolong4 on 2017/3/15.
 */
