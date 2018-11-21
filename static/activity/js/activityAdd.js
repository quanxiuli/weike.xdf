var organizer_words_layeredit = layedit.build('organizer_words',{
	tool: [
			  'strong' //加粗
			  ,'italic' //斜体
			  ,'underline' //下划线
			  ,'del' //删除线
			],
	height:200
}); //建立编辑器
$(function () {
	window.optionchanged = false;
	$('#myTab a').click(function (e) {
		e.preventDefault();//阻止a链接的跳转行为
		$(this).tab('show');//显示当前选中的链接及关联的content
	});
	//执行一个laydate实例
	laydate.render({
	  elem: '#begin_end_time',
	  type: 'datetime',
	  theme: 'molv',
	  format: 'yyyy/MM/dd HH:mm:ss',
	  range: true
	}); 
	laydate.render({
	  elem: '#qdBeginEmdTime',
	  type: 'datetime',
	  theme: 'molv',
	  format: 'yyyy/MM/dd HH:mm:ss',
	  range: true
	});
	$('#background_picture').change(function(){
		var currentValue = $(this).val();
		var customValue = $(this).find('option:last').val();
		if(currentValue == 0){
			$('#backgroundPictureUpload').hide();
			$('#currentBackgroundPicture').attr('src','');
			$('#currentBackgroundPicture').hide();
			return false;
		}
		if(currentValue == customValue){
			$('#backgroundPictureUpload').show();
			var customPictureUrl = $(this).find('option:last').attr('data-url');
			if(customPictureUrl != ''){
				$('#currentBackgroundPicture').attr('src',customPictureUrl);
				$('#currentBackgroundPicture').show();
			}else{
				$('#currentBackgroundPicture').hide();
			}
		}else{
			$('#backgroundPictureUpload').hide();
			var pictureUrl = $(this).find('option:selected').attr('data-url');
			$('#currentBackgroundPicture').attr('src',pictureUrl);
			$('#currentBackgroundPicture').show();
		}
	});
	$('#background_music').change(function(){
		var currentValue = $(this).val();
		var customValue = $(this).find('option:last').val();
		if(currentValue == 0){
			$('#backgroundMusicUpload').hide();
			$('#backgroundMusicControlDiv').hide();
			$('#backgroundMusicName').empty();
			$('#backgroundMusicControl').attr('src','');
			return false;
		}
		if(currentValue == customValue){
			$('#backgroundMusicUpload').show();
			var customMusicUrl = $(this).find('option:last').attr('data-url');
			if(customMusicUrl != ''){
				$('#backgroundMusicName').empty().append('自定义');
			    $('#backgroundMusicControl').attr('src',customMusicUrl);
			    $('#backgroundMusicControlDiv').show();
			}else{
				$('#backgroundMusicControlDiv').hide();
			}
		}else{
			$('#backgroundMusicUpload').hide();
			var musicName= $(this).find('option:selected').text()+'.mp3';
			var musicUrl = $(this).find('option:selected').attr('data-url');
			$('#backgroundMusicName').empty().append(musicName);
			$('#backgroundMusicControl').attr('src',musicUrl);
			$('#backgroundMusicControlDiv').show();
		}
	});
		
	$('#backgroundPictureUploadForm').ajaxForm({dataType:'json',
			beforeSubmit:function(formData, jqForm, options){
				var file = $('#backgroundPictureUploadInput').val();
				if(file == '')layer.alert('请选择上传文件',{icon:5});
				var fileArr = file.split('.');
				var fileSuffix = fileArr[fileArr.length-1];
				if(!GLOBAL.reg_image_suffix.test(fileSuffix)){
					layer.alert('请上传正确格式的图片文件',{icon:5},function(index){
						$('#backgroundPictureUploadInput').val('');
						layer.close(index);
					});
					return false;
				}
				$('#progressBarValue').css('width','0%');
				$('#progressBar').show();
		},
		uploadProgress:function(event,position,total,percentComplete){
	            $('#progressBarValue').css('width',percentComplete + '%');
		},
		success:function(data){
			$('#progressBarValue').css('width','100%');
			layer.alert(data.message,{icon:(data.code==1?6:5)},function(index){
				$('#progressBarValue').css('width','0%');
				$('#progressBar').hide();
				layer.close(index);
			});
			if(data.code == 1){
				$('#background_picture').find('option:last').attr('data-url',data.fileUrl);
				$('#currentBackgroundPicture').attr('src',data.fileUrl).show();
				$('#customBackgroundPicture').val(data.fileUrl);
			}
		}
	});
	$('#backgroundMusicUploadForm').ajaxForm({dataType:'json',
		beforeSubmit:function(formData,jqForm,options){
				var file = $('#backgroundMusicUploadInput').val();
				if(file == '')layer.alert('请选择上传文件',{icon:5});
				var fileArr = file.split('.');
				var fileSuffix = fileArr[fileArr.length-1];
				if(!GLOBAL.reg_music_suffix.test(fileSuffix)){
					layer.alert('请上传正确格式的mp3文件',{icon:5},function(index){
						$('#backgroundMusicUploadInput').val('');
						layer.close(index);
					});
					return false;
				}
				$('#musicProgressBarValue').css('width','0%');
				$('#musicProgressBar').show();
		},
		uploadProgress:function(event,position,total,percentComplete){
	            $('#musicProgressBarValue').css('width',percentComplete + '%');
		},
		success:function(data){
			$('#musicProgressBarValue').css('width','100%');
			layer.alert(data.message,{icon:(data.code==1?6:5)},function(index){
				$('#musicProgressBarValue').css('width','0%');
				$('#musicProgressBar').hide();
				layer.close(index);
			});
			if(data.code == 1){
				$('#background_music').find('option:last').attr('data-url',data.fileUrl);
				$('#customBackgroundMusic').val(data.fileUrl);
				$('#backgroundMusicName').empty().append(data.fileName);
				$('#backgroundMusicControl').attr('src',data.fileUrl);
				$('#backgroundMusicControlDiv').show();
			}
		}
		
	});
	$('#tDBPictureUploadForm').ajaxForm({dataType:'json',
			beforeSubmit:function(formData, jqForm, options){
				var file = $('#tDBPictureUploadInput').val();
				if(file == '')layer.alert('请选择上传文件',{icon:5});
				var fileArr = file.split('.');
				var fileSuffix = fileArr[fileArr.length-1];
				if(!GLOBAL.reg_image_suffix.test(fileSuffix)){
					layer.alert('请上传正确格式的图片文件',{icon:5},function(index){
						$('#tDBPictureUploadInput').val('');
						layer.close(index);
					});
					return false;
				}
				$('#threeDProgressBarValue').css('width','0%');
				$('#threeDProgressBar').show();
		},
		uploadProgress:function(event,position,total,percentComplete){
	            $('#threeDProgressBarValue').css('width',percentComplete + '%');
		},
		success:function(data){
			$('#threeDProgressBarValue').css('width','100%');
			layer.alert(data.message,{icon:(data.code==1?6:5)},function(index){
				$('#threeDProgressBarValue').css('width','0%');
				$('#threeDProgressBar').hide();
				layer.close(index);
			});
			if(data.code == 1){
				$('#tDBackgroundPicture').find('option:last').attr('data-url',data.fileUrl);
				$('#tDBpictureImg').attr('src',data.fileUrl).show();
				$('#tDBPicture').val(data.fileUrl);
			}
		}
	});
	$('#weChatCodePictureUploadForm').ajaxForm({dataType:'json',
		beforeSubmit:function(formData, jqForm, options){
			var file = $('#weChatCodeUploadInput').val();
			if(file == '')layer.alert('请选择上传文件',{icon:5});
			var fileArr = file.split('.');
			var fileSuffix = fileArr[fileArr.length-1];
			if(!GLOBAL.reg_image_suffix.test(fileSuffix)){
				layer.alert('请上传正确格式的图片文件',{icon:5},function(index){
					$('#weChatCodeUploadInput').val('');
					layer.close(index);
				});
				return false;
			}
			$('#weChatCodeProgressBarValue').css('width','0%');
			$('#weChatCodePogressBar').show();
		},
		uploadProgress:function(event,position,total,percentComplete){
	            $('#weChatCodeProgressBarValue').css('width',percentComplete + '%');
		},
		success:function(data){
			$('#weChatCodeProgressBarValue').css('width','100%');
			layer.alert(data.message,{icon:(data.code==1?6:5)},function(index){
				$('#weChatCodeProgressBarValue').css('width','0%');
				$('#weChatCodePogressBar').hide();
				layer.close(index);
			});
			if(data.code == 1){
				$('#currentWeChatCodePicture').attr('src',data.fileUrl).show();
				$('#weChatCodePicture').val(data.fileUrl);
			}
		}
	});
	$('#cjBg_select').find('option').each(function(index){
		var option = $(this);
		if(option.attr('data-default') == 1){
			option.prop('selected',true);
			var currentValue = option.attr('value');
			var customValue = $('#cjBg_select').find('option:last').val();
			set_cjBg($('#cjBg_select'),currentValue,customValue);
			return false;
		}
	});
	$('#cjBg_select').change(function(){
		var currentValue = $(this).val();
		var customValue = $(this).find('option:last').val();
		 set_cjBg($(this),currentValue,customValue);
	});
	$('#cjBgPictureUploadForm').ajaxForm({dataType:'json',
			beforeSubmit:function(formData, jqForm, options){
				var file = $('#cjBgPictureUploadInput').val();
				if(file == '')layer.alert('请选择上传文件',{icon:5});
				var fileArr = file.split('.');
				var fileSuffix = fileArr[fileArr.length-1];
				if(!GLOBAL.reg_image_suffix.test(fileSuffix)){
					layer.alert('请上传正确格式的图片文件',{icon:5},function(index){
						$('#cjBgPictureUploadInput').val('');
						layer.close(index);
					});
					return false;
				}
				$('#cjBgprogressBarValue').css('width','0%');
				$('#cjBgProgressBar').show();
		},
		uploadProgress:function(event,position,total,percentComplete){
	            $('#cjBgprogressBarValue').css('width',percentComplete + '%');
		},
		success:function(data){
			$('#cjBgprogressBarValue').css('width','100%');
			layer.alert(data.message,{icon:(data.code==1?6:5)},function(index){
				$('#cjBgprogressBarValue').css('width','0%');
				$('#cjBgProgressBar').hide();
				layer.close(index);
			});
			if(data.code == 1){
				$('#cjBg_select').find('option:last').attr('data-url',data.fileUrl);
				$('#cjBgPicture').attr('src',data.fileUrl).show();
				$('#cjBg').val(data.fileUrl);
			}
		}
	});
	$('#bigwall').click(function(data){
		var global_set = check_global_set();
		if(!global_set){
			change_tab(0);
			return false;
		}
		var qd_set = check_qd_set();
		if(!qd_set){
			change_tab(1);
			return false;
		}
		var award_set = check_award();
		if(!award_set){
			change_tab(2);
			return false;
		}
		var yyy_award_set = check_yyy_award();
		if(!yyy_award_set){
			change_tab(3);
			return false;
		}
		var msg_set = check_msg();
		if(!msg_set){
			change_tab(4);
			return false;
		}
		//上传活动信息
		//全局设置-------------------------------------------------------------------------------------------------------------
		var title = $('#title').val();//活动主题
		var user_pwd = $('#user_pwd').val();//主持人登录密码
		var begin_end_time = $('#begin_end_time').val();//活动起止时间
		var background_picture = $('#background_picture').find('option:selected').attr('data-url');//活动背景墙
		var background_music = $('#background_music').find('option:selected').attr('data-url');//背景音乐
		var switch_b_m = $('input[name=switch_b_m]:checked').val();//是否开启背景音乐
		var weChatCodePicture = $('#weChatCodePicture').val();//关注公众号
		//3D签到设置-----------------------------------------------------------------------------------------------------------
		var tdsign = $('input[name=3dsign]:checked').val();//是否开启3D签到
		var qdBeginEndTime = $('#qdBeginEmdTime').val();//签到截止时间
		//var tdsignNum = $('input[name=3dsignNum]:checked').val();//是否显示签到人数
		//var tDBackgroundPicture = $('#tDBackgroundPicture').find('option:selected').attr('data-url');//3D签到背景设置
		//var qdMusic = $('#qdMusic').find('option:selected').attr('data-url');//签到北京音乐设置
		var animationArr = [];//3D动画效果设置
		$('#tDAnimationSet').find('.btn-primary').each(function(index){
			var button = $(this);
			var key = button.attr('data-key');
			var second = button.parent().next().find('input').val();
			var sort = button.parent().next().next().find('input').val();
			animationArr.push([key,second,sort]);
		});
		var qdPagePicture = $('#qdPage').find('option:selected').attr('data-url');//签到页背景
		var isxdf = $('input[name=isxdf]:checked').val();//是否为内部活动
		var qdFields = [];//签到显示字段
		var customButtonLabel = '';
		$('#qdParams').find('.btn-primary').each(function(index){
			var button = $(this);
			var dataKey = button.attr('data-key');
			qdFields.push(dataKey);
			if(dataKey == 8)customButtonLabel = button.text();
		});
		var qdFontColor = $('#qdFontColor').val();
		var qdSuccessTip = $('input[name=qdSuccess]:checked').val();//签到成功页面提示类型
		var qdSuccessTipText = $('textarea[name=qdSuccess_text]').val();//签到成功页面提示文字
		var repeatQDText = $('textarea[name=qdrepeat_text]').val();//重复签到提示文字
		//抽奖设置-------------------------------------------------------------------------------------------------------------
		var cjShow = $('input[name=cjshow]:checked').val();//是否开启抽奖
		var cjBg = $('#cjBg_select').find('option:selected').attr('data-url');//抽奖自定义背景
		var awardList = [];//奖品信息
		$('#award_list tbody tr').each(function(){
			var award = $(this);
			var sort = award.find('td:first').text();
			var jxName = award.find('td').eq(1).text();
			var awardPicture = award.find('img').attr('src');
			var jpName = award.find('td').eq(3).text();
			var awardCount = award.find('td').eq(4).text();
			awardList.push([sort,jxName,awardPicture,jpName,awardCount]);
		});
		//摇一摇抽奖设置----------------------------------------------------------------------------------------------------------
		var yyyShow = $('input[name=yyyshow]:checked').val();//是否开启摇一摇抽奖
		var yyyNorepeat = $('input[name=yyynorepeat]:checked').val();//摇一摇中奖是否去重
		var yyySecond = $('input[name=yyySecond]').val();//摇一摇秒数
		var yyyAwardList = [];//摇一摇奖品信息
		$('#yyy_award_list tbody tr').each(function(){
			var award = $(this);
			var sort = award.find('td:first').text();
			var jxName = award.find('td').eq(1).text();
			var awardPicture = award.find('img').attr('src');
			var jpName = award.find('td').eq(3).text();
			var awardCount = award.find('td').eq(4).text();
			yyyAwardList.push([sort,jxName,awardPicture,jpName,awardCount]);
		});
		//消息上墙设置
		var msg_open = $('input[name=msg_open]:checked').val();
		var msg_sort = $('input[name=msg_sort]:checked').val();
		var msg_roll_interval = $('input[name=msg_roll_interval]').val();
		var msg_send_interval = $('input[name=msg_send_interval]').val();
		var organizer_open = $('input[name=organizer_open]').val();
		var organizer_name = $('input[name=organizer_name]').val();
		var organizerFacePicture = $('input[name=organizerFacePicture]').val();
		var organizer_words = layedit.getContent(organizer_words_layeredit);
		var params = {
			title:title,//活动主题
		    userPwd:user_pwd,//主持人登录密码
		    beginAndEndTime:begin_end_time,//活动起止时间
		    backgroundPicture:background_picture,//活动背景墙
			backgroundMusic:background_music,//背景音乐
			backgroundMusicSwitch:switch_b_m,//是否开启背景音乐
			weChatCodePicture:weChatCodePicture,//关注公众号
			//3D签到设置-----------------------------------------------------------------------------------------------------------
			tdsign:tdsign,//是否开启3D签到
			qdEndTime:qdBeginEndTime,//签到截止时间
			//tdsignNum:tdsignNum,//是否显示签到人数
			//tDBackgroundPicture:tDBackgroundPicture,//3D签到背景设置
			//qdMusic:qdMusic,//签到北京音乐设置
			animations:animationArr,//3D动画效果设置
			qdPagePicture:qdPagePicture,//签到页背景
			isxdf:isxdf,//是否为内部活动
			qdFields:qdFields,//签到显示字段
			customButtonLabel:customButtonLabel,//自定义字段名称
			qdFontColor:qdFontColor,//签到页字体颜色设置
			qdSuccessType:qdSuccessTip,//签到成功页面提示类型
			qdSuccessTipText:qdSuccessTipText,//签到成功页面提示文字
			repeatQDText:repeatQDText,//重复签到提示文字
			//抽奖设置-------------------------------------------------------------------------------------------------------------
			cjShow:cjShow,//是否开启抽奖
			cjBg:cjBg,//抽奖自定义背景
			awardList:awardList,//奖品信息
			//摇一摇抽奖设置----------------------------------------------------------------------------------------------------------
			yyyShow:yyyShow,//是否开启摇一摇抽奖
			yyyNorepeat:yyyNorepeat,
			yyySecond:yyySecond,//摇一摇秒数
			yyyAwardList:yyyAwardList,//摇一摇奖品信息
			msg_open:msg_open,//开启消息上墙
			msg_sort:msg_sort,//消息显示模式
			msg_roll_interval:msg_roll_interval,//消息滚动间隔
			msg_send_interval:msg_send_interval,//消息发送间隔
			organizer_open:organizer_open,//开启主办方消息
			organizer_name:organizer_name,//主办方昵称
			organizerFacePicture:organizerFacePicture,//主办方头像
			organizer_words:organizer_words//预存消息
		};
		//console.log(params);
		$.ajax({
			url:'/activity/ajax_addactivity',
			type:'POST',
			dataType:'json',
			data:params,
			beforeSend:function(){
				$('#bigwall').prop('disabled',true);
			},
			success:function(data){
				if(data.code==1){
					layer.alert(data.message,{icon:6},function(){
						window.location.href='/activity/bigwall';
					});
				}else{
					layer.msg(data.message,{icon:5});
					if(typeof data.tab != 'undefined')change_tab(data.tab);
					$('#bigwall').prop('disabled',false);
				}
			}
		});
	});
	$('#tDBackgroundPicture').change(function(){
			var currentValue = $(this).val();
			var customValue = $(this).find('option:last').val();
			if(currentValue == 0){
				$('#tDBPictureUpload').hide();
				$('#threeDProgressBar').hide();
				$('#tDBpictureImg').attr('src','');
				$('#tDBpictureImg').hide();
				return false;
			}
			if(currentValue == customValue){
				$('#tDBPictureUpload').show();
				var customPictureUrl = $(this).find('option:last').attr('data-url');
				if(customPictureUrl != ''){
					$('#tDBpictureImg').attr('src',customPictureUrl);
					$('#tDBpictureImg').show();
				}else{
					$('#tDBpictureImg').hide();
				}
			}else{
				$('#tDBPictureUpload').hide();
				var pictureUrl = $(this).find('option:selected').attr('data-url');
				$('#tDBpictureImg').attr('src',pictureUrl);
				$('#tDBpictureImg').show();
			}
		});
		$('#qdMusic').change(function(){
			var currentValue = $(this).val();
			var customValue = $(this).find('option:last').val();
			if(currentValue == 0){
				$('#qdmProgressBar').hide();
				$('#qdMusicUpload').hide();
				$('#qdMusicDiv').hide();
				$('#qdMusicName').empty();
				$('#qdMusicControl').attr('src','');
				return false;
			}
			if(currentValue == customValue){
				$('#qdMusicUpload').show();
				var customMusicUrl = $(this).find('option:last').attr('data-url');
				if(customMusicUrl != ''){
					$('#qdMusicName').empty().append('自定义');
				    $('#qdMusicControl').attr('src',customMusicUrl);
				    $('#qdMusicDiv').show();
				}else{
					$('#qdMusicDiv').hide();
				}
			}else{
				$('#qdMusicUpload').hide();
				var musicName= $(this).find('option:selected').text()+'.mp3';
				var musicUrl = $(this).find('option:selected').attr('data-url');
				$('#qdMusicName').empty().append(musicName);
				$('#qdMusicControl').attr('src',musicUrl);
				$('#qdMusicDiv').show();
			}
		});
	$('#qdMusicUploadForm').ajaxForm({dataType:'json',
		beforeSubmit:function(formData,jqForm,options){
				var file = $('#qdMusicUploadInput').val();
				if(file == '')layer.alert('请选择上传文件',{icon:5});
				var fileArr = file.split('.');
				var fileSuffix = fileArr[fileArr.length-1];
				if(!GLOBAL.reg_music_suffix.test(fileSuffix)){
					layer.alert('请上传正确格式的mp3文件',{icon:5},function(index){
						$('#qdMusicUploadInput').val('');
						layer.close(index);
					});
					return false;
				}
				$('#qdmProgressBarValue').css('width','0%');
				$('#qdmProgressBar').show();
		},
		uploadProgress:function(event,position,total,percentComplete){
	            $('#qdmProgressBarValue').css('width',percentComplete + '%');
		},
		success:function(data){
			$('#qdmProgressBarValue').css('width','100%');
			layer.alert(data.message,{icon:(data.code==1?6:5)},function(index){
				$('#qdmProgressBarValue').css('width','0%');
				$('#qdmProgressBar').hide();
				layer.close(index);
			});
			if(data.code == 1){
				$('#qdMusic').find('option:last').attr('data-url',data.fileUrl);
				$('#qdBackgroundMusic').val(data.fileUrl);
				$('#qdMusicName').empty().append(data.fileName);
				$('#qdMusicControl').attr('src',data.fileUrl);
				$('#qdMusicDiv').show();
			}
		}
	});
	$('#qdPage').change(function(){
		var currentValue = $(this).val();
		var customValue = $(this).find('option:last').val();
		if(currentValue == 0){
			$('#qdPageProgressBar').hide();
			$('#qdPagePictureUpload').hide();
			$('#qdPageImg').attr('src','');
			$('#qdPageImg').hide();
			return false;
		}
		if(currentValue == customValue){
			$('#qdPagePictureUpload').show();
			var customPictureUrl = $(this).find('option:last').attr('data-url');
			if(customPictureUrl != ''){
				$('#qdPageImg').attr('src',customPictureUrl);
				$('#qdPageImg').show();
			}else{
				$('#qdPageImg').hide();
			}
		}else{
			$('#qdPagePictureUpload').hide();
			var pictureUrl = $(this).find('option:selected').attr('data-url');
			$('#qdPageImg').attr('src',pictureUrl);
			$('#qdPageImg').show();
		}
	});
	$('#qdPagePictureUploadForm').ajaxForm({dataType:'json',
			beforeSubmit:function(formData, jqForm, options){
				var file = $('#qdPagePictureUploadInput').val();
				if(file == '')layer.alert('请选择上传文件',{icon:5});
				var fileArr = file.split('.');
				var fileSuffix = fileArr[fileArr.length-1];
				if(!GLOBAL.reg_image_suffix.test(fileSuffix)){
					layer.alert('请上传正确格式的图片文件',{icon:5},function(index){
						$('#qdPagePictureUploadInput').val('');
						layer.close(index);
					});
					return false;
				}
				$('#qdPageProgressBarValue').css('width','0%');
				$('#qdPageProgressBar').show();
		},
		uploadProgress:function(event,position,total,percentComplete){
	            $('#qdPageProgressBarValue').css('width',percentComplete + '%');
		},
		success:function(data){
			$('#qdPageProgressBarValue').css('width','100%');
			layer.alert(data.message,{icon:(data.code==1?6:5)},function(index){
				$('#qdPageProgressBarValue').css('width','0%');
				$('#qdPageProgressBar').hide();
				layer.close(index);
			});
			if(data.code == 1){
				$('#qdPage').find('option:last').attr('data-url',data.fileUrl);
				$('#qdPagePicture').val(data.fileUrl);
				$('#qdPageImg').attr('src',data.fileUrl).show();
				$('#qdPageImg').val(data.fileUrl);
			}
		}
	});
	$('#organizerFaceUploadForm').ajaxForm({dataType:'json',
		beforeSubmit:function(formData, jqForm, options){
			var file = $('#organizerFaceUploadInput').val();
			if(file == '')layer.alert('请选择上传文件',{icon:5});
			var fileArr = file.split('.');
			var fileSuffix = fileArr[fileArr.length-1];
			if(!GLOBAL.reg_image_suffix.test(fileSuffix)){
				layer.alert('请上传正确格式的图片文件',{icon:5},function(index){
					$('#organizerFaceUploadInput').val('');
					layer.close(index);
				});
				return false;
			}
			$('#organizerFaceProgressBarValue').css('width','0%');
			$('#organizerFacePogressBar').show();
		},
		uploadProgress:function(event,position,total,percentComplete){
	            $('#organizerFaceProgressBarValue').css('width',percentComplete + '%');
		},
		success:function(data){
			$('#organizerFaceProgressBarValue').css('width','100%');
			layer.alert(data.message,{icon:(data.code==1?6:5)},function(index){
				$('#organizerFaceProgressBarValue').css('width','0%');
				$('#organizerFacePogressBar').hide();
				layer.close(index);
			});
			if(data.code == 1){
				$('#organizerFacePicture').val(data.fileUrl);
				$('#organizerFacePictureImg').attr('src',data.fileUrl).show();
			}
		}
	});
	$('#tDAnimationSet').find('button').click(function(){
		var button = $(this);
		if(button.hasClass('btn-default')){
			button.removeClass('btn-default').addClass('btn-primary').empty().append('开启');
		}else{
			button.removeClass('btn-primary').addClass('btn-default').empty().append('关闭');
			button.parent().next().find('input').val('');
			button.parent().next().next().find('input').val('');
		}
	});
	$('#tDAnimationSet').find('a').click(function(){
		var name = $(this).attr('data-name');
		var url = $(this).attr('data-url');
		var str = "<img src='"+url+"' width='636' height='390' />";
		layer.open({
			title:name,
			area:['680px'],
			content: str
		});
	});
	$('#qdParams').find('button').not(':last').click(function(){
		var button = $(this);
		if(button.hasClass('btn-default')){
				button.removeClass('btn-default').addClass('btn-primary');
			}else{
				button.removeClass('btn-primary').addClass('btn-default');
			}
	});
	$('input[name=cjshow]').click(function(){
		var cjshowValue = $(this).val();
		if(cjshowValue == 1){
			$('#add_award_button').prop('disabled',false);
		}else{
			$('#add_award_button').prop('disabled',true);
		}
	});
	$('input[name=yyyshow]').click(function(){
		var yyyshowValue = $(this).val();
		if(yyyshowValue == 1){
			$('#add_yyy_award_button').prop('disabled',false);
		}else{
			$('#add_yyy_award_button').prop('disabled',true);
			$('input[name=yyySecond]').val('');
		}
	});
	$('input[name=isxdf]').click(function(){
		var isxdf = $(this).val();
		var nameButton = $('#qdParams').find('button').eq(0);
		var mobileButton = $('#qdParams').find('button').eq(1);
		var emailButton = $('#qdParams').find('button').eq(3);
		$('#qdParams').find('button').each(function(index){
			var button = $(this);
			if(button.hasClass('btn-primary'))
				button.removeClass('btn-primary').addClass('btn-default');
		});
		if(isxdf == 1){
			nameButton.removeClass('btn-default').addClass('btn-primary');
			emailButton.removeClass('btn-default').addClass('btn-primary');
			nameButton.prop('disabled',true);
			emailButton.prop('disabled',true);
		}else{
			nameButton.removeClass('btn-default').addClass('btn-primary');
			mobileButton.removeClass('btn-default').addClass('btn-primary');
			nameButton.prop('disabled',false);
			emailButton.prop('disabled',false);
		}
	});
	$('input[name=qdSuccess]').click(function(){
		var qdSuccess = $(this).val();
		var str = '';
		if(qdSuccess==1){
			str = '您好！欢迎参加[活动名称]';
		}else{
			str = '您好！您是第[位次]位来宾。';
		}
		$('textarea[name=qdSuccess_text]').val(str);
		$('textarea[name=qdrepeat_text]').val(str);
	});
	init_qd_fields();
});
function init_qd_fields(){
	var isxdf = $('input[name=isxdf]:checked').val();
	var nameButton = $('#qdParams').find('button').eq(0);
	var mobileButton = $('#qdParams').find('button').eq(1);
	var emailButton = $('#qdParams').find('button').eq(3);
	if(isxdf == 1){
		nameButton.removeClass('btn-default').addClass('btn-primary');
		emailButton.removeClass('btn-default').addClass('btn-primary');
		nameButton.prop('disabled',true);
		emailButton.prop('disabled',true);
	}else{
		nameButton.removeClass('btn-default').addClass('btn-primary');
		mobileButton.removeClass('btn-default').addClass('btn-primary');
		emailButton.prop('disabled',false);
	}
}
function change_tab(index){
	var a_arr = ['#a_style','#a_3dqd','#a_cj','#a_yyy','#a_dm'];
	var tab_arr = ['#tab_style','#tab_3dqd','#tab_cj','#tab_yyy','#tab_dm'];
	for(var i in a_arr){
		if($(a_arr[i]).parent().hasClass('active')){
			$(a_arr[i]).parent().removeClass('active');
			$(tab_arr[i]).removeClass('active');;
		}
	}
	$(a_arr[index]).parent().addClass('active');
	$(tab_arr[index]).addClass('active');
}
function check_global_set(){
	var title = $('#title').val();
	var userPwd = $('#user_pwd').val();
	var beginEndTime = $('#begin_end_time').val();
	var backgroundPicture = $('#background_picture').val();
	var customBackgroundPicture = $('#customBackgroundPicture').val();
	var backgroundMusic = $('#background_music').val();
	var customBackgroundMusic = $('#customBackgroundMusic').val();
	if(title == ''){
		layer.msg('请输入活动主题',{icon:5});
		$('#title').focus();
		return false;
	}
	if(userPwd == ''){
		layer.msg('请输入主持人登录密码',{icon:5});
		$('#user_pwd').focus();
		return false;
	}
	if(beginEndTime == ''){
		layer.msg('请输入活动起止时间',{icon:5});
		return false;
	}
	var customBackgroundPictureValue = $('#background_picture').find('option:last').val();
	if(backgroundPicture == 0){
		layer.msg('请设置背景墙',{icon:5});
		return false;
	}
	var switch_b_m = 0; 
	$('input[name=switch_b_m]').each(function(index){
		if($(this).prop('checked')){
			switch_b_m =  $(this).val();
			return false;
		}
	});
	if(switch_b_m == 1){
		if(backgroundPicture == customBackgroundPictureValue){
			if(customBackgroundPicture == ''){
				layer.msg('请上传自定义背景墙',{icon:5});
				return false;
			}
		}
		var customBackgroundMusicValue = $('#background_music').find('option:last').val();
		if(backgroundMusic == 0){
			layer.msg('请设置背景音乐',{icon:5});
			return false;
		}
		if(backgroundMusic == customBackgroundMusicValue){
			if(customBackgroundMusic == ''){
				layer.msg('请设置自定义背景音乐',{icon:5});
				return false;
			}
		}
	}
	return true;
}
function check_qd_set(){
	var qdSign = $("input[name=3dsign]:checked").val();
	if(qdSign == 1){//开启了签到时间
		//签到背景墙设置
//		var qdBackgroundPictureValue = $('#tDBackgroundPicture').val();
//		if(qdBackgroundPictureValue == 0){
//			layer.msg('选择3D签到背景图片',{icon:5});
//			return false;
//		}
//		var customQdBPVaule = $('#tDBackgroundPicture').find('option:last').val();
//		//自定义背景墙
//		if(qdBackgroundPictureValue == customQdBPVaule){
//			var tDBPicture = $('#tDBPicture').val();
//			if(tDBPicture == ''){
//				layer.msg('请上传自定义3D签到背景图片');
//				return false;
//			}
//		}
//		//签到背景音乐设置
//		var qdMusicVaule = $('#qdMusic').val();
//		if(qdMusicVaule == 0){
//			layer.msg('请选择签到背景音乐',{icon:5});
//			return false;
//		}
//		var customqdMusicVaule = $('#qdMusic').find('option:last').val();
//		if(qdMusicVaule == customqdMusicVaule){
//			var qdBackgroundMusic = $('#qdBackgroundMusic').val();
//			if(qdBackgroundMusic == ''){
//				layer.msg('请上传自定义签到背景音乐');
//				return false;
//			}
//		}
		//3d动画效果设置
		var animationValue = 0;
		var animationMessage = [];
		   $('#tDAnimationSet').find('button').each(function(index){
				var button = $(this);
				if(button.hasClass('btn-primary')){
					animationValue++;
					var animationName = button.parent().prev().text();
					var animationSecond = button.parent().next().find('input').val();
					var animationSort = button.parent().next().next().find('input').val();
				
					if(animationSecond == ''){
						animationMessage = [{'name':animationName,'message':'请输入秒数'}];
						return false;
					}else if(!GLOBAL.reg_int.test(animationSecond)){
						animationMessage = [{'name':animationName,'message':'秒数只支持正整数'}];
						return false;
					}
					if(animationSort == ''){
						animationMessage = [{'name':animationName,'message':'请输入动画权重'}];
						return false;
					}else if(!GLOBAL.reg_int.test(animationSort)){
						animationMessage = [{'name':animationName,'message':'权重只支持正整数'}];
						return false;
					}
				}
			});
		if(animationValue == 0){
			layer.msg('请选择3D动画效果',{icon:5});
			return false;
		}
		if(animationMessage.length > 0){
			layer.msg(animationMessage[0].name+"："+animationMessage[0].message,{icon:5});
			return false;
		}
	}
	//签到截止时间
	var qdEndTime = $('#qdBeginEmdTime').val();
	if(qdEndTime == ''){
		layer.msg('请输入签到起止时间',{icon:5});
		return false;
	}
	//签到页背景设置
	var qdPageValue = $('#qdPage').val();
	if(qdPageValue == 0){
		layer.msg('请设置签到页背景',{icon:5});
		return false;
	}
	var qdFontColor = $.trim($('#qdFontColor').val());
	if(qdFontColor != ''){
		if(!/^#[a-zA-Z0-9]{3,6}$/.test(qdFontColor)){
			layer.msg('请输入正确格式的背景页字体颜色');
			return false;
		}
	}
	var customQdPageValue = $('#qdPage').find('option:last').val();
	if(qdPageValue == customQdPageValue){
		var qdPagePicture = $('#qdPagePicture').val();
		if(qdPagePicture == ''){
			layer.msg('请上传自定义签到背景页');
			return false;
		}
	}
	//显示字段设置
	var qdParamsCount = 0;
	$('#qdParams').find('button').each(function(index){
		var button = $(this);
		if(button.hasClass('btn-primary')){
			qdParamsCount++;
		}
	});
	if(qdParamsCount==0){
		layer.msg('请选择显示字段',{icon:5});
		return false;
	}
	//签到成功页面文字设置
	var qdSuccessValue = $('input[name=qdSuccess]:checked').val();
	var qdSuccessText = $('textarea[name=qdSuccess_text]').val();
	if(qdSuccessText == ''){
		if(qdSuccessValue == 1){
			layer.msg('请输入显示活动文字',{icon:5});
		}else{
			layer.msg('请输入显示签到位次文字',{icon:5});
		}
		return false;
	}
	//重复签到提示文字
	var qdrepeat_text = $('textarea[name=qdrepeat_text]').val();
	if(qdrepeat_text == ''){
		layer.msg('请输入重复签到提示文字',{icon:5});
		return false;
	}
	return true;
}
function check_award(){
	var cjShow = $('input[name=cjshow]:checked').val();
	if(cjShow == 1){
		var cjBg = $('#cjBg_select').find('option:selected').attr('data-url');
		if(cjBg == ''){
			layer.msg('请选择抽奖背景',{icon:5});
			return false;
		}
		var award_list_length = $('#award_list tbody').find('tr').length;
		if(award_list_length == 0){
			layer.msg('请添加奖项',{icon:5});
			return false;
		}
	}
	return true;
}
function check_yyy_award(){
	var yyyShow = $('input[name=yyyshow]:checked').val();
	if(yyyShow==1){
		var yyySecond = $('input[name=yyySecond]').val();
		console.log(yyySecond);
		if(!GLOBAL.reg_int.test(yyySecond)){
			layer.msg('请输入正确的摇一摇秒数，仅支持正整数');
			$('#yyySecond').focus();
			return false;
		}
		var yyy_award_list_length = $('#yyy_award_list tbody').find('tr').length;
		if(yyy_award_list_length == 0){
			layer.msg('请添加摇一摇奖项',{icon:5});
			return false;
		}
	}
	return true;
}
function check_msg(){
	var msg_open = $('input[name=msg_open]:checked').val();
	if(msg_open == 1){
		var msg_roll_interval = $('input[name=msg_roll_interval]').val();
		if(!GLOBAL.reg_int.test(msg_roll_interval)){
			layer.msg('请输入正确的消息滚动间隔，仅支持正整数');
			return false;
		}
		if(msg_roll_interval<3){
			layer.msg('消息滚动间隔最小为3秒');
			return false;
		}
		var msg_send_interval = $('input[name=msg_send_interval]').val();
		if(msg_send_interval != 0 && !GLOBAL.reg_int.test(msg_send_interval)){
			layer.msg('请输入正确的发送频率，仅支持数字');
			return false;
		}
		var organizer_open = $('input[name=organizer_open]:checked').val();
		if(organizer_open == 1){
			var organizer_name = $('input[name=organizer_name]').val();
			if(!GLOBAL.reg_organizer_name.test(organizer_name)){
				layer.msg('请输入正确的主办方昵称');
				return false;
			}
			var organizerFacePicture = $('input[name=organizerFacePicture]').val();
			if(organizerFacePicture == ''){
				layer.msg('请上传主办方头像');
				return false;
			}
		}
	}
	return true;
}
function add_award(type){
	//获取奖项名称的值
	var jxNames = [];
	var table = type == 1?$('#award_list'):$('#yyy_award_list');
	table.find('tbody tr').each(function(index){
		tr = $(this);
		jxNames.push($.trim(tr.find('td').eq(1).text()));
	});
	var input = $('#award_form').find('input');
	input.eq(0).val('');
	input.eq(1).val('');
	input.eq(2).val('');
	input.eq(3).val('');
	input.eq(4).val('');
	var index = layer.open({
					type:1,
					title:'奖项设置',
					area:['500px'],
					content:$('#award_form'),
					cancel: function(index, layero){ 
					 	$('#award_form').hide();
					    layer.close(index)
					 	return false;
					},
					btn:['确定'],
					yes:function(index,layero){
						var tip = layero.find('#add_award_tip');
						var awardSortName = $.trim(layero.find('#awardSortName').val());
						var awardName = layero.find('#awardName').val();
						var awardCount = layero.find('#awardCount').val();
						var awardFile = layero.find('#awardFile').val();
						var awardSortNum = layero.find('#awardSortNum').val();
						if(awardSortName == '' && awardFile== ''){
							layero.find('#awardSortName').focus();
							tip.children(':first').empty().append('奖项名称和奖品图片不能同时为空');
							tip.show();
							setTimeout(function(){tip.hide();},3000);
							return false;
						}
						if(awardSortName != ''){
							var indexNum = $.inArray(awardSortName,jxNames);
							if(indexNum >= 0){
								layero.find('#awardSortName').focus();
								tip.children(':first').empty().append('奖项名称：'+jxNames[indexNum]+' 不能重复');
								tip.show();
								setTimeout(function(){tip.hide();},3000);
								return false;
							}
						}
						if(!GLOBAL.reg_int.test(awardCount)){
							layero.find('#awardCount').focus();
							tip.children(':first').empty().append('请输入中奖数量，仅支持正整数');
							tip.show();
							setTimeout(function(){tip.hide();},3000);
							return false;
						}
						if(!GLOBAL.reg_int.test(awardSortNum)){
							layero.find('#awardSortNum').focus();
							tip.children(':first').empty().append('请输入奖品的正确的顺序权重，仅支持正整数');
							tip.show();
							setTimeout(function(){tip.hide();},3000);
							return false;
						}
						var tr_obj = {
								'awardSortName':awardSortName,
								'awardName':awardName,
								'awardCount':awardCount,
								'awardSortNum':awardSortNum,
								'imageUrl':''
						};
						var imageUrl = '';
						if(awardFile != ''){
							//判定图片格式是否正确
							var fileArr = awardFile.split('.');
							var fileSuffix = fileArr[fileArr.length-1];
							if(!GLOBAL.reg_image_suffix.test(fileSuffix)){
								tip.children(':first').empty().append('请上传正确格式的图片文件');
								tip.show();
								setTimeout(function(){tip.hide();},3000);
								return false;
							}else{
								$('#award_form').find('form').ajaxForm({dataType:'json',
									beforeSubmit:function(formData, jqForm, options){
										layero.find('#awardProgressBarValue').css('width','0%');
										layero.find('#awardProgressBar').show();
									},
									uploadProgress:function(event,position,total,percentComplete){
							            layero.find('#awardProgressBarValue').css('width',percentComplete + '%');
									},
									success:function(data){
										layero.find('#awardProgressBarValue').css('width','100%');
										if(data.code == 1){
											$('#award_form').hide();
											tr_obj.imageUrl = data.fileUrl;
											layer.close(index);
											add_award_tr(tr_obj,type);
										}else{
											tip.children(':first').empty().append(data.message);
											tip.show();
											setTimeout(function(){tip.hide();},3000);
										}
									}
								}).submit();
							}
						}else{
							layer.close(index);
							add_award_tr(tr_obj,type);
						}
					}
				});
}
function add_award_tr(tr_obj,type){
	var str = "<tr class='new'>\
					<td class='text-center'>"+tr_obj.awardSortNum+"</td>\
					<td class='text-center'>"+tr_obj.awardSortName+"</td>\
					<td class='text-center'><img src='"+tr_obj.imageUrl+"' width='50' height='25' /></td>\
					<td class='text-center'>"+tr_obj.awardName+"</td>\
					<td class='text-center'>"+tr_obj.awardCount+"</td>\
					<td class='text-center' >\
						<a href='javascript:void(0);' onclick='remove_award($(this));'>删除</a>\
					</td>\
				</tr>";
	if(type == 1)
		$('#award_list tbody').append(str);
	else $('#yyy_award_list tbody').append(str);
}
function remove_award(obj){
	obj.parent().parent().remove();
}

function set_cjBg(obj,currentValue,customValue){
	if(currentValue == 0){
		$('#cjBgPictureUpload').hide();
		$('#cjBgPicture').attr('src','');
		$('#cjBgPicture').hide();
		return false;
	}
	if(currentValue == customValue){
		$('#cjBgPictureUpload').show();
		var customPictureUrl = obj.find('option:last').attr('data-url');
		if(customPictureUrl != ''){
			$('#cjBgPicture').attr('src',customPictureUrl);
			$('#cjBgPicture').show();
		}else{
			$('#cjBgPicture').hide();
		}
	}else{
		$('#cjBgPictureUpload').hide();
		var pictureUrl = obj.find('option:selected').attr('data-url');
		$('#cjBgPicture').attr('src',pictureUrl);
		$('#cjBgPicture').show();
	}
	return true;
}