function DialogBox(){}
DialogBox.prototype = {
	constructor:DialogBox,
	alert:function(msg,obj,handler){
		$('#ModalFrame_TTSY').find('p').empty().append(msg);
		if(typeof obj != 'undefined'){
			$('#ModalFrameBox2_TTSY_FB').removeClass();
			if(obj.icon == 5){/*错误提示*/
				$('#ModalFrameBox2_TTSY_FB').addClass('ModalFrameBox2_TTSY_SC');
			}else if(obj.icon == 6){
				$('#ModalFrameBox2_TTSY_FB').addClass('ModalFrameBox2_TTSY_CGTS');
			}else if(obj.icon == 3){
				$('#ModalFrameBox2_TTSY_FB').addClass('ModalFrameBox2_TTSY_FB');
			}else if(obj.icon == 4){
				$('#ModalFrameBox2_TTSY_FB').addClass('ModalFrameBox2_TTSY_CGT');
			}
		}
		$('#ModalFrame_TTSY').show();
		var closeFunction = function(){
			$('#ModalFrame_TTSY').hide();
			if($.isFunction(handler))handler();
		};
		$('#ModalFrame_TTSY').find('.Close').unbind('click');
		$('.ModalFrameBox4_TTSY').unbind('click');
		$('#ModalFrame_TTSY').find('.Close').click(closeFunction);
		$('.ModalFrameBox4_TTSY').click(closeFunction);
	},
	confirm:function(msg,obj,handler){
		var modalFrame = $('#ModalFrame_FB');
		$('#ModalFrame_FB').find('p').empty().append(msg);
		modalFrame.find('h4').empty().append('提示信息');
		if(typeof obj != 'undefined'){
			$('#ModalFrameBox1_FB').removeClass();
			if(obj.icon == 5){/*错误提示*/
				$('#ModalFrameBox1_FB').addClass('ModalFrameBox2_TTSY_SC');
			}else if(obj.icon == 6){
				$('#ModalFrameBox1_FB').addClass('ModalFrameBox2_TTSY_CGTS');
			}else if(obj.icon == 3){
				$('#ModalFrameBox1_FB').addClass('ModalFrameBox2_TTSY_FB');
			}else if(obj.icon == 4){
				$('#ModalFrameBox1_FB').addClass('ModalFrameBox2_TTSY_CGT');
			}
		}
		modalFrame.show();
		var modelHide = function(){
			modalFrame.hide();
		}
		modalFrame.find('.ModalFrameBox4_FB span').unbind('click');
		modalFrame.find('span').unbind('click');
		modalFrame.find('.ModalFrameBox4_span_FB').unbind('click');
		modalFrame.find('span').click(modelHide);
		modalFrame.find('.ModalFrameBox4_span_FB').click(modelHide);
		modalFrame.find('.ModalFrameBox4_FB span').eq(0).click(function(){
			modelHide();
			if($.isFunction(handler))handler();
		});
	},
	msg:function(msg,handler,time){
		$('#ModalFrame_DJS').find('.ModalFrameBox_DJS').empty().append(msg);
		$('#ModalFrame_DJS').show();
		if(typeof time != 'undefined' && parseInt(time) > 0){
			setTimeout(function(){
				$('#ModalFrame_DJS').hide();
				if($.jsFunction(handler))handler();
			},time*1000);
		}
	},
	load:function(type,time,msg){
		if(typeof msg == 'undefined')msg= '处理中。。。';
		$('#ModalFrame_DJS').find('.ModalFrameBox_DJS').empty().append(msg);
		$('#ModalFrame_DJS').show();
		if(typeof time != 'undefined' && parseInt(time) > 0){
			setTimeout(function(){
				$('#ModalFrame_DJS').hide();
			},time*1000);
		}
		return 'ModalFrame_DJS';
	},
	close:function(id){
		$('#'+id).hide();
	}
}
var CollectionDialogBox = new DialogBox();

//function addPageCss(){
//	var pageCssdivLength = $('#pageCss').length;
//	if(pageCssdivLength >0){
//		var link = $('head').find('link').eq(0);
//		var cssLinkStr ='';
//		$('#pageCss').find('div').each(function(){
//			var cssFile = $(this).attr('file-src');
//			cssLinkStr += '<link rel="stylesheet" href="'+cssFile+'">';
//		});
//		$(cssLinkStr).insertAfter(link);
//	};
//	$('#pageCss').remove();
//}
$(function(){
	$(".sectionL_PP_Click").click(function () {
		var dataClick = $(this).attr('data-click');
	    if(dataClick == 1)$(".index_tcc_F").show();
	});
	$(".index_tcc_close").click(function () {
	    $(".index_tcc_F").hide();
	});
	$('.citySelect').click(function(){
		var sid = $(this).attr('sid');
		var index = '';
		$.ajax({
			url:'/collection/ajax_changeSchool',
			type:'POST',
			dataType:'json',
			data:{sid:sid},
			beforeSend:function(){
				$(".index_tcc_F").hide();
				index = CollectionDialogBox.load(1,10,'切换中。。。');
			},
			success:function(data){
				CollectionDialogBox.close(index);
				if(data.result)window.location.href='/collection/collectionlist';
				else CollectionDialogBox.alert(data.message,{icon:5});
			}
		});
	});
	$('#ModalFrame_WXEWM').find('span').click(function(){
		$('#ModalFrame_WXEWM').hide();
	});
	$('#ModalFrame_WXEWM2').find('span').click(function(){
		$('#ModalFrame_WXEWM2').hide();
	});
	$('#ModalFrame_FKSZInput').find('span').click(function(){
		$('#ModalFrame_FKSZInput').hide();
	});
	$('#ModalFrame_QDSZInput').find('span').click(function(){
		$('#ModalFrame_QDSZInput').hide();
	});
});
function show_collection_preview(id){
	var iframe = $('#ModalFrame_FB2').find('iframe');
	iframe.attr('src','/collection/preview?id='+id);
	iframe.unbind('load');
	iframe.load(function(){
		iframe.contents().find('.QRCode').remove();
		iframe.contents().find('.WJYYGJ_16_Box').css({width:'800px'});
		iframe.contents().find('.warp_Box').css({width:'800px'});
		$('#ModalFrame_FB2').show();
		$('#ModalFrame_FB2').find('img').unbind('click');
		$('#ModalFrame_FB2').find('img').click(function(){
			$('#ModalFrame_FB2').hide();
		});
	});
}
function lengthValidate(inputId, spanId, validLength) {
    inputId = "#" + inputId;
    spanId = "#" + spanId;
    $(inputId).bind('input propertychange', function () {
        var currentLength = $(inputId).val().length;
        $(spanId).text(currentLength);
        if (currentLength > validLength) {
            $(spanId).css("color", "red");
            return false;
        } else {
            $(spanId).css("color", "#D7D7D7");
        }
    });
}
function showCollectionQRcode(id,template){
		var index = '';
		$.ajax({
			url:'/collection/ajax_getcollectionercode',
			type:'POST',
			dataType:'json',
			data:{id:id},
			beforeSend:function(){
				index = CollectionDialogBox.load(1,10);
			},
			success:function(data){
				CollectionDialogBox.close(index);
				if(data.result){
					if(template == 1){
						$('#ModalFrame_WXEWM2').find('img').attr('src',data.imageUrl);
						$('#ModalFrame_WXEWM2').find('a').attr('href',data.imageUrl);
						$('#ModalFrame_WXEWM').find('a').attr('download',data.fileName);
						$('#ModalFrame_WXEWM2').show();	
					}else{
						$('#ModalFrame_WXEWM').find('input').val(data.url);
						$('#ModalFrame_WXEWM').find('input').attr('title',data.url);
						$('#ModalFrame_WXEWM').find('img').attr('src',data.imageUrl);
						$('#ModalFrame_WXEWM').find('a').eq(1).attr('href',data.imageUrl);
						$('#ModalFrame_WXEWM').find('a').eq(1).attr('download',data.fileName);
						$('#ModalFrame_WXEWM').show();
					}
				}else{
					CollectionDialogBox.alert(data.message,{icon:5});
				}
			}
		});
}
function getCollectionCode(){
	var id = arguments[0];
	var url = '/collection/collect?id='+id;
    if(typeof arguments[1] == 'number' && arguments[1]  > 0) url += '&sid='+arguments[1];
    url += '&code=1';
	var iframe = $('#ModalFrame_FB2').find('iframe');
	iframe.attr('src',url);
	iframe.load(function(){
		$('#ModalFrame_FB2').show();
		var closeFrame = iframe.contents().find("#closeFrame");
		closeFrame.unbind('click');
		closeFrame.click(function(){
		$('#ModalFrame_FB2').hide();
	});
	});
	$('#ModalFrame_FB2').find('img').unbind('click');
	$('#ModalFrame_FB2').find('img').click(function(){
		$('#ModalFrame_FB2').hide();
		iframe.unbind('load');
		iframe.attr('src','');
	});

	
}
function downloadIamge(obj) {
	if (!!window.ActiveXObject || "ActiveXObject" in window){
		return true;
	}else{
		var selector = obj;
		var name = obj.attr('download');
		var image = new Image();
		// 解决跨域 Canvas 污染问题
		image.setAttribute('crossOrigin', 'anonymous');
		image.onload = function () {
			var canvas = document.createElement('canvas');
			canvas.width = image.width;
			canvas.height = image.height;
	 
			var context = canvas.getContext('2d');
			context.drawImage(image, 0, 0, image.width, image.height);
			var url = canvas.toDataURL('image/png');
			
			// 生成一个a元素
			var a = document.createElement('a');
			// 创建一个单击事件
			var event = document.createEvent("MouseEvents");
			event.initMouseEvent(
				"click", true, false, window, 0, 0, 0, 0, 0
				, false, false, false, false, 0, null
			);
			// 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
			a.download = name || '下载图片名称';
			// 将生成的URL设置为a.href属性
			a.href = url;
			a.dispatchEvent(event);
		}
		image.src = selector.attr('href');
		return false;
	}
}