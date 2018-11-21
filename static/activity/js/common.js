function init_module(){
	var functionStr = GLOBAL.functionIds;
	if(functionStr != ''){
		var functionArr = functionStr.split(',');
		if(functionArr.length > 0){
			$('[data-functionid]').each(function(index,entry){
				var functionid = entry.dataset.functionid;
				if($.inArray(functionid,functionArr) > -1){
					entry.style.display = 'inline';
				}
			});
		}
	}
}
$(function(){
	$(document).ajaxComplete(function(event,xhr,option){
		if(xhr['status']==200 && xhr['readyState']==4){
			var responseJSON = xhr['responseJSON'];
			if(typeof responseJSON != 'undefined'){
				if(responseJSON.no_login){
					layer.alert(responseJSON.message,{icon:5});
					window.location.href = '/activity/logout';
				}
			}
		}
	});
	//权限显示控制
	init_module();
});