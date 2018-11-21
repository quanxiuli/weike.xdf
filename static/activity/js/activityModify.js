var organizer_words_layeredit;
function get_select_options(optionObj,currentValue,select,input){
	console.log(optionObj);
		var str = '';
		var flag = false;
		var selectIndex = 0;
		var selectName = '';
		var index = 0;
		for(var i in optionObj){
			str += "<option value='"+i+"' data-url='"+optionObj[i]['url']+"' ";
			if(currentValue == optionObj[i]['url']){
				selectIndex = i;
				selectName = optionObj[i]['name'];
				flag = true;
				str += "selected";
			}
			str += ">"+optionObj[i]['name']+"</option>";
			index++;
		}
		selectIndex = index+1;
		str += "<option value='"+(index+1)+"' ";
		if(!flag){
			str += " data-url='"+currentValue+"' selected";
			var currentNameArr = currentValue.split('/');
			selectName = currentNameArr.pop();
			input.val(currentValue);
		}else{
			str += " data-url='' ";
		}
		str += ">自定义</option>";
		select.append(str);
		return [flag,selectIndex,selectName];
}
$(function () {
	$.ajax({
		url:'/activity/ajax_getactivity',
		type:'POST',
		dataType:'json',
		data:{id:$('input[name=activityId]').val()},
		success:function(data){
			if(data.code == 1){
				//是否为内部活动
				var isxdf = data.activity.isxdf;
				$('input[name=isxdf]').each(function(index){
					if($(this).val() == isxdf){
						$(this).prop('checked',true);
						return false;
					}
				});
				//活动主题
				$('input[name=title]').val(data.activity.title);
				//主持人登录密码
				$('input[name=user_pwd]').val(data.activity.userPwd);
				//活动起止时间
				var beginTime = data.activity.beginTime;
				var endTime = data.activity.endTime;
				beginAndEndTime = beginTime.replace(/-/g,'/')+' - '+endTime.replace(/-/g,'/');
				$('input[name=b_e_t]').val(beginAndEndTime);
				//活动背景墙设置
				var background_pictures = data.background_pictures;
				var currentBackgroundPicture = data.activity.backgroundPicture;
				get_select_options(background_pictures,currentBackgroundPicture,$('#background_picture'),$('#customBackgroundPicture'));
				$('#currentBackgroundPicture').attr('src',currentBackgroundPicture).show();
				//活动背景音乐设置
				var background_musics = data.background_musics;
				var currentBackgroundMusic = data.activity.backgroundMusic;
				var result = get_select_options(background_musics,currentBackgroundMusic,$('#background_music'),$('#customBackgroundMusic'));
				$('#backgroundMusicControl').attr('src',currentBackgroundMusic);
				$('#backgroundMusicName').append(result[2]);
				$('#backgroundMusicControlDiv').show();
				//是否开启背景音乐
				var backgroundMusicSwitch = data.activity.backgroundMusicSwitch;
				$('input[name=switch_b_m]').each(function(index){
					if($(this).val() == backgroundMusicSwitch){
						$(this).prop('checked',true);
						return false;
					}
				});
				if(data.activity.weChatCodePicture != ''){
					$('#weChatCodePicture').val(data.activity.weChatCodePicture);
					$('#currentWeChatCodePicture').attr('src',data.activity.weChatCodePicture).show();
				}
				//是否开启3d签到墙
				var tdswitch = data.activity.tdswitch;
				$('input[name=3dsign]').each(function(index){
					if($(this).val() == tdswitch){
						$(this).prop('checked',true);
						return false;
					}
				});
				var threeDBackgroundPictures = data.threeDBackground_pictures;
				var currentThreeDBackgroundPictures = data.activity.tDBackgroundPicture;
				get_select_options(threeDBackgroundPictures,currentThreeDBackgroundPictures,$('#tDBackgroundPicture'),$('#tDBPicture'));
				var qdBackground_pictures = data.qdBackground_pictures;
				var currentQDPagePicture = data.activity.qdPagePicture;
				get_select_options(qdBackground_pictures,currentQDPagePicture,$('#qdPage'),$('#qdPagePicture'));
				if(tdswitch == 1){
					//是否显示签到人数
					var tdsignNum = data.activity.tdsignNum;
					$('input[name=3dsignNum]').each(function(index){
						if($(this).val() == tdsignNum){
							$(this).prop('checked',true);
							return false;
						}
					});
					$('#tDBpictureImg').attr('src',currentThreeDBackgroundPictures).show();
					//签到背景音乐
					var qdBackgroundMusics = data.qdBackground_musics;
					var currentQDMusic = data.activity.qdMusic;
					var result = get_select_options(qdBackgroundMusics,currentQDMusic,$('#qdMusic'),$('#qdBackgroundMusic'));
					$('#qdMusicControl').attr('src',currentQDMusic);
					$('#qdMusicName').append(result[2]);
					$('#qdMusicDiv').show();
					//签到动画设置
					var animations = JSON.parse(data.activity.animations);
					for(var i in animations){
						var tr = $('#tDAnimationSet').find('tr').eq(animations[i].index-1);
						tr.find('button').removeClass('btn-default').addClass('btn-primary').empty().append('开启');
						tr.find('input').eq(0).val(animations[i].second);
						tr.find('input').eq(1).val(animations[i].sort);
					}
				}
				//签到起止时间
				var qdBeginTime = data.activity.qdBeginTime;
				var qdEndTime = data.activity.qdEndTime;
				var qdBeginAndEndTime = qdBeginTime.replace(/-/g,'/')+' - '+qdEndTime.replace(/-/g,'/');
				$('#qdBeginEmdTime').val(qdBeginAndEndTime);
				//签到页背景设置
				$('#qdPageImg').attr('src',currentQDPagePicture).show();
				var qdFontColor = data.activity.qdFontColor;
				if(qdFontColor != '')$('#qdFontColor').val(qdFontColor);
				//显示字段设置
				var qdFields = data.activity.qdFields;
				for(var i in qdFields){
					var qdButton = $('#qdParams').find('button').eq(qdFields[i]-1);
					qdButton.removeClass('btn-default').addClass('btn-primary');
					if(isxdf == 1){
						if(qdFields[i] == 1 || qdFields[i] == 4){
							qdButton.prop('disabled',true);
						}
					}
					if(qdFields[i] == 8){
						qdButton.empty().append(data.activity.customize_label);
					}
				}
				//签到成功页面提示类型
				var qdSuccessType = data.activity.qdSuccessType;
				$('input[name=qdSuccess]').each(function(index){
					if($(this).val() == qdSuccessType){
						$(this).prop('checked',true);
						return false;
					}
				});
				//签到成功文字
				$('textarea[name=qdSuccess_text]').val(data.activity.qdSuccessTipText);
				//重复签到提示文字
				$('textarea[name=qdrepeat_text]').val(data.activity.repeatQDText);
				//是否开启抽奖
				var cjShow = data.activity.cjShow;
				$('input[name=cjshow]').each(function(index){
					if($(this).val() == cjShow){
						$(this).prop('checked',true);
						return false;
					}
				});
				//抽奖页背景
				var cjBg_pictures = data.cjBg_pictures;
				var cjBg = data.activity.cjBg;
				get_select_options(cjBg_pictures,cjBg,$('#cjBg_select'),$('#cjBg'));
				$('#cjBgPicture').attr('src',cjBg).show();
				if(cjShow != 1){
					$('#add_award_button').prop('disabled',true);	
				}
				//是否开启摇一摇
				var yyyShow = data.activity.yyyShow;
				$('input[name=yyyshow]').each(function(index){
					if($(this).val() == yyyShow){
						$(this).prop('checked',true);
						return false;
					}
				});
				if(yyyShow == 1){
					//是否开启重复中奖
					var yyyNorepeat = data.activity.yyyNorepeat;
					$('input[name=yyynorepeat]').each(function(index){
						if($(this).val() == yyyNorepeat){
							$(this).prop('checked',true);
							return false;
						}
					});
					//摇一摇计时时间设置
					$('input[name=yyySecond]').val(data.activity.yyySecond);
				}else{
					$('#add_yyy_award_button').prop('disabled',true);
				}
				var msg_open = data.activity.msg_open;
				$('input[name=msg_open]').each(function(index){
					if($(this).val() == msg_open){
						$(this).prop('checked',true);
						return false;
					}
				});
				var msg_sort = data.activity.msg_sort;
				$('input[name=msg_sort]').each(function(index){
					if($(this).val() == msg_sort){
						$(this).prop('checked',true);
						return false;
					}
				});
				$('input[name=msg_roll_interval]').val(data.activity.msg_roll_interval);
				$('input[name=msg_send_interval]').val(data.activity.msg_send_interval);
				var organizer_open = data.activity.organizer_open;
				$('input[name=organizer_open]').each(function(index){
					if($(this).val() == organizer_open){
						$(this).prop('checked',true);
						return false;
					}
				});
				$('input[name=organizer_name]').val(data.activity.organizer_name);
				if(data.activity.organizerFacePicture != ''){
				$('input[name=organizerFacePicture]').val(data.activity.organizerFacePicture);
					$('#organizerFacePictureImg').attr('src',data.activity.organizerFacePicture).show();
				}
				
				$('textarea[name=organizer_words]').val(data.activity.organizer_words);
				organizer_words_layeredit = layedit.build('organizer_words',{
					tool: [
							  'strong' //加粗
							  ,'italic' //斜体
							  ,'underline' //下划线
							  ,'del' //删除线
							],
					height:200
				}); //建立编辑器
			}else if(data.code == 1001){
				layer.alert(data.message,{icon:5},function(){
					window.location.href = '/activity/bigwall';
				});
			}else{
				layer.alert(data.message,{icon:5});
			}
			$('#qdFontColor').colorpicker({
				color:(qdFontColor!=''?qdFontColor:null),
				hideButton: true,
				history: false,
				strings: '基本颜色色,标准颜色,Web颜色,基本颜色,Back to Palette,History,No history yet.'
			});
		}
	});
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
	var customButton = $('#qdParams').find('button').last();
	//customButton.attr('title','修改名称需要按钮处于未选中状态');
	customButton.click(function(){
		if(customButton.hasClass('btn-primary')){
			customButton.removeClass('btn-primary').addClass('btn-default');
		}else{
			var qdFieldCustomLabel = $('#qdFieldCustomLabel');
			qdFieldCustomLabel.val(customButton.text());
			var str = "";
			layer.open({
			  title:'编辑字段名称'
			  ,type: 1 
			  ,content: $('#qdFieldCustom')
			  ,btn: ['确定']
			  ,yes: function(index, layero){
			  	var labelValue = qdFieldCustomLabel.val();
			  	if(labelValue == ''){
			  		$('#labelTip').empty().append('请输入字段名称');
			  	}else{
			   		customButton.empty().append($.trim(labelValue)).removeClass('btn-default').addClass('btn-primary');
			   		$('#labelTip').empty();
			   		layer.close(index);
		   			$('#qdFieldCustom').hide();
			  	}
			  }
			   ,cancel:function(index, layero){ 
				layer.close(index);
				$('#qdFieldCustom').hide();
			  }
			});
		}
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
				if(file == '')layer.alert('请选择上床文件',{icon:5});
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
				if(file == '')layer.alert('请选择上床文件',{icon:5});
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
				if(file == '')layer.alert('请选择上床文件',{icon:5});
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
		var id = $('input[name=activityId]').val();
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
		//摇一摇抽奖设置----------------------------------------------------------------------------------------------------------
		var yyyShow = $('input[name=yyyshow]:checked').val();//是否开启摇一摇抽奖
		var yyyNorepeat = $('input[name=yyynorepeat]:checked').val();//摇一摇中奖是否去重
		var yyySecond = $('input[name=yyySecond]').val();//摇一摇秒数
		//消息上墙设置
		var msg_open = $('input[name=msg_open]:checked').val();
		var msg_sort = $('input[name=msg_sort]:checked').val();
		var msg_roll_interval = $('input[name=msg_roll_interval]').val();
		var msg_send_interval = $('input[name=msg_send_interval]').val();
		var organizer_open = $('input[name=organizer_open]:checked').val();
		var organizer_name = $('input[name=organizer_name]').val();
		var organizerFacePicture = $('input[name=organizerFacePicture]').val();
		var organizer_words = layedit.getContent(organizer_words_layeredit);
		var params = {
			id:id,
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
			cjShow:cjShow,
			cjBg:cjBg,//抽奖自定义背景
			//摇一摇抽奖设置----------------------------------------------------------------------------------------------------------
			yyyShow:yyyShow,//是否开启摇一摇抽奖
			yyyNorepeat:yyyNorepeat,
			yyySecond:yyySecond,
			msg_open:msg_open,//开启消息上墙
			msg_sort:msg_sort,//消息显示模式
			msg_roll_interval:msg_roll_interval,//消息滚动间隔
			msg_send_interval:msg_send_interval,//消息发送间隔
			organizer_open:organizer_open,//开启主办方消息
			organizer_name:organizer_name,//主办方昵称
			organizerFacePicture:organizerFacePicture,//主办方头像
			organizer_words:organizer_words//预存消息
		};
		console.log(params);
		$.ajax({
			url:'/activity/ajax_activityupdate',
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
				if(file == '')layer.alert('请选择上床文件',{icon:5});
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
});
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
function add_award_tr(tr_obj,id,aid,type){
	var modify_award = "modify_award($(this),'"+id+"','"+aid+"',1);";
	var delete_award = "delete_award($(this),'"+id+"','"+type+"');";
	var str = "<tr>\
					<td class='text-center'>"+tr_obj.awardSortNum+"</td>\
					<td class='text-center'>"+tr_obj.awardSortName+"</td>\
					<td class='text-center'><img src='"+tr_obj.imageUrl+"' width='50' height='25' /></td>\
					<td class='text-center'>"+tr_obj.awardName+"</td>\
					<td class='text-center'>"+tr_obj.awardCount+"</td>\
					<td class='text-center' >\
						<a href='javascript:void(0);' onclick="+modify_award+">修改</a>\
												<a href='javascript:void(0);' onclick="+delete_award+">删除</a>\
					</td>\
				</tr>";
	if(type == 1)$('#award_list tbody').append(str);
	else $('#yyy_award_list tbody').append(str);
}
function remove_award(obj){
	obj.parent().parent().remove();
}
function delete_award(obj,id,type){
	var trLength = obj.parent().parent().parent().find('tr').length;
	var cjShow = type==1?$('input[name=cjshow]:checked').val():$('input[name=yyyshow]:checked').val();
	if(trLength <= 1 && cjShow == 1){
		layer.alert('至少保留一个奖项',{icon:5});
		return false;
	}
	var index = '';
	layer.confirm('您确定要删除该奖项吗？',{icon:3,title:'删除奖项'},function(){
		$.ajax({
			url:'/activity/ajax_awarddel',
			type:'POST',
			dataType:'json',
			data:{id:id},
			beforeSend:function(){
				index = layer.load(2,{time:10*1000});
			},
			success:function(data){
				layer.close(index);
				layer.msg(data.message);
				if(data.code==1){
					obj.parent().parent().remove();
				}
			}
		});
	});
}
function modify_award(obj,id,aid,type){
	console.log(typeof obj);
	var input = $('#award_form').find('input');
	if(typeof obj != 'string'){
		var td = obj.parent().parent().find('td');
		input.eq(0).val(td.eq(1).text());
		input.eq(1).val(td.eq(3).text());
		input.eq(2).val(td.eq(4).text());
		input.eq(3).val('');
		input.eq(4).val(td.eq(0).text());
	}else{
		input.eq(0).val('');
		input.eq(1).val('');
		input.eq(2).val('');
		input.eq(3).val('');
		input.eq(4).val('');
	}
	$('#awardId').val(id);
	$('#activityId').val(aid);
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
			var awardSortName = layero.find('#awardSortName').val();
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
			if(awardFile != ''){
				//判定图片格式是否正确
				var fileArr = awardFile.split('.');
				var fileSuffix = fileArr[fileArr.length-1];
				if(!GLOBAL.reg_image_suffix.test(fileSuffix)){
					tip.children(':first').empty().append('请上传正确格式的图片文件');
					tip.show();
					setTimeout(function(){tip.hide();},3000);
					return false;
				}
			}
			$('#award_form').find('form').ajaxForm({
				dataType:'json',
				url:'/activity/ajax_awardmodify',
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
						layer.close(index);
						$('#award_form').hide();
						$('#awardProgressBar').hide();
						if(typeof obj != 'string'){
						var td = obj.parent().parent().find('td');
						td.eq(2).find('img').attr('src',data.fileUrl);
						td.eq(0).empty().append(tr_obj.awardSortNum);
						td.eq(1).empty().append(tr_obj.awardSortName);
						td.eq(3).empty().append(tr_obj.awardName);
						td.eq(4).empty().append(tr_obj.awardCount);
						}else{
							tr_obj.imageUrl = data.fileUrl;
							add_award_tr(tr_obj,data.id,aid,type);
						}
						layer.alert(data.message,{icon:6});
					}else{
						tip.children(':first').empty().append(data.message);
						tip.show();
						setTimeout(function(){tip.hide();},3000);
					}
				}
			}).submit();
		}
	});
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