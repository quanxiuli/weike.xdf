//window.setInterval("checkStatus()", 1000 * 3);//3秒检查一次
$(document).ajaxComplete(function(event,xhr,option){
	//console.log(xhr);
	if(xhr['status']==200 && xhr['readyState']==4){
		var responseText = xhr['responseText'],responseJSON = {};
		if(responseText.indexOf("no_login") != -1)responseJSON = $.parseJSON(responseText);
		if(!$.isEmptyObject(responseJSON) && responseJSON.no_login){
			window.location.href = '/collection/logout';
		}
	}
});
