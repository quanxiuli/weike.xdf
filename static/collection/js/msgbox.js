function msgbox(){}
msgbox.prototype = {
	constructor:msgbox,
	alert:function(msg){
		$('#ModalFrame_WZBJ').find('p').empty().append(msg);
		
		$('#ModalFrame_WZBJ').show();
		var closeFunction = function(){
			
			$('#ModalFrame_WZBJ').hide();
		};
		//$('#ModalFrame_WZBJ').find('.Confirm').unbind('click');
		$('#ModalFrame_WZBJ').find('.Cancel').click(closeFunction);
		$('#ModalFrame_WZBJ').find('.Confirm').click(closeFunction);
	},
	confirm:function(msg,url){
		var modalFrame = $('#ModalFrame_TJCG');
		$('#ModalFrame_TJCG').find('p').empty().append(msg);
		modalFrame.find('h4').empty().append('提示信息');
		
		modalFrame.show();
		var num=3;//document.getElementById("mes").innerHTML;
		    
		setTimeout(function() {
				modalFrame.hide();
				if(url!=''){window.location.href=url;}
					
        },num*1000);
		
		
	},
	
}

