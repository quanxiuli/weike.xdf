var reg_url = new RegExp("^(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$");
var reg_date = /^20[\d][\d]-[\d]{2}-[\d]{2}$/;
var reg_time = /^[\d]{2}:[\d]{2}$/;
var reg_int = /^[1-9]\d*$/;
var update_test = 0;
$(function(){
	var d = {id:$('#crId').val()};
	$.ajax({
		 type: "POST",
        url: '/chouke/ajax_getclassrecommend',
        async: true,
        dataType:'json',
        data:d,
        success: function (json) {
            if (json.code == 1) {
            	if(json.classRecommend.status==0){
            		$('#hide_div').show();
            	}else{
            		if(json.classRecommend.switchTestStatus > 0){
            			$('#switchTestStatus').prop('disabled',true);
            			update_test = 1;
            		}else{
            			layer.msg('该购课推荐的状态不许与做任何修改',{icon:5});
            			return false;
            		}
            	}
                $('#hidden1').val(json.classRecommend.crTitleImg);
                $('#crTitleImg').attr('src',json.classRecommend.crTitleImg);
                if(json.classRecommend.crSubTitleImg){
	                $('#hidden2').val(json.classRecommend.crSubTitleImg);
                	$('#crSubTitleImg').attr('src',json.classRecommend.crSubTitleImg);
                }
                if(json.classRecommend.teachPrograme){
	                $('#hidden3').val(json.classRecommend.teachPrograme);
                	$('#teachPrograme').attr('src',json.classRecommend.teachPrograme);
                }
                //$('#hidden4').val(json.classRecommend.courseExcel);
                if(json.classRecommend.videoUrl){
                	$('#videoUrl').val(json.classRecommend.videoUrl);
                }
                $('#crName').val(json.classRecommend.crName);
                $('#explainInformCnt1').empty().append(json.classRecommend.crName.length);
                if(json.classRecommend.crLabel.length > 0){
                	$('#crLabel').val(json.classRecommend.crLabel.join(' '));
                	$('#explainInformCnt2').empty().append($('#crLabel').val().length);
                	
                }
                if(json.classRecommend.crLabelIntro){
                	$('#cRLabelIntroduce').val(json.classRecommend.crLabelIntro);
                	$('#explainInformCnt3').empty().append(json.classRecommend.crLabelIntro.length);
                }
                 if(json.classRecommend.buyCourseTip){
                	$('#buyCourseTip').val(json.classRecommend.buyCourseTip);
                	$('#explainInformCnt12').empty().append(json.classRecommend.buyCourseTip.length);
                }
                var startTime = splitDate(json.classRecommend.startTime);
                $('#startDate').val(startTime[0]);
                $('#startTime').val(startTime[1]);
                var endTime = splitDate(json.classRecommend.endTime);
                $('#endDate').val(endTime[0]);
                $('#endTime').val(endTime[1]);
                $('#activityIntroduce').val(json.classRecommend.activityIntro);
                $('#explainInformCnt4').empty().append(json.classRecommend.activityIntro.length);
                $('#courseIntroduce').val(json.classRecommend.courseIntro);
                $('#explainInformCnt5').empty().append(json.classRecommend.courseIntro.length);
                $('#rewardFitPerson').val(json.classRecommend.rewardFitPerson);
                $('#explainInformCnt6').empty().append(json.classRecommend.rewardFitPerson.length);
                $('#honourRewardContact').val(json.classRecommend.honourRewardContact);
                $('#explainInformCnt7').empty().append(json.classRecommend.honourRewardContact.length);
                $('#wechatName').val(json.classRecommend.wechatName);
                $('#explainInformCnt8').empty().append(json.classRecommend.wechatName.length);
                $('#hidden5').val(json.classRecommend.ercode);
                $('#ercodept').attr('src',json.classRecommend.ercode);
                $('#hidden6').val(json.classRecommend.recomImg);
                $('#recomMoney').val(json.classRecommend.recomMoney);
                $('#wxSmallImg').attr('src',json.classRecommend.wxSmallImg);
                $('#hidden8').val(json.classRecommend.wxSmallImg);
                $('#recommendPic').attr('src',json.classRecommend.recomImg);
                $('#recomLimitCount').val(json.classRecommend.recomLimitCount);
                $('#discountsRule').val(json.classRecommend.discountsRule);
                $('#explainInformCnt9').empty().append(json.classRecommend.discountsRule.length);
                $('#rewardWord').val(json.classRecommend.rewardWord);
                $('#explainInformCnt10').empty().append(json.classRecommend.rewardWord.length);
                $('#awardType').val(json.classRecommend.awardType);
                $('#explainInformCnt11').empty().append(json.classRecommend.awardType.length);
                var switchTimeDown = json.classRecommend.switchTimeDown;
                if(switchTimeDown == 1){
                	$('#switchTimeDown').prop('checked',true);
                }
                var switchTestStatus = json.classRecommend.switchTestStatus;
                var areaList = json.areas;
                var areaContent = '';
                for (var i = 0; i < areaList.length; i++) {
                    areaContent += "<div class='checkbox' style='float:left;'><label><input type='checkbox' value='"+areaList[i].sCode+"' class='testArea' ";
                    if(areaList[i].checked){
                    	areaContent += "checked";
                    }
                    areaContent += ">"+areaList[i].sName+"</label></div>";
                }
                $(".xian-wid2").html(areaContent);
                if(switchTestStatus > 0){
                	$('#hidden7').val(json.classRecommend.testImg);
                	$('#testPic').attr('src',json.classRecommend.testImg);
                	$('#testIntroduce').val(json.classRecommend.testIntroduce);
                	$('#explainInformCnt13').empty().append(json.classRecommend.testIntroduce.length);
					$('#attMatters').val(json.classRecommend.attMatters);
					$('#explainInformCnt14').empty().append(json.classRecommend.attMatters.length);
                	$('#switchTestStatus').prop('checked',true);
                	$('#testDiv').show();
                	var times = json.classRecommend.times;
                	var testTimeHtml = '';
                	for(var i in times){
                		testTimeHtml += "<div id='testTime_id_"+i+"' class='p176-setInfoCon clearfix'><div class='p176-Slabel testTimeNum'>考试时间"+(parseInt(i)+1)+"</div>";
                		testTimeHtml += "<div class='p176-filed-b'>";
                			testTimeHtml += "<div class='p176-Input-wrap'>";
								testTimeHtml += "<input type='text' class='p176-Input' placeholder='2016-01-20' onclick='laydate()' value='"+times[i][0]+"' autocomplete='off'>";
								testTimeHtml += "<i class='p176-input-data'></i>";
							testTimeHtml += "</div>";
							testTimeHtml += "<div class='p176-input-wrap'>";
								testTimeHtml += "<input type='text' class='p176-Hinput' placeholder='00:00' onclick='ModuleTimeMenu.init(this);' value='"+times[i][1]+"' autocomplete='off'>";
					            testTimeHtml += "<i class='p176-input-hour'></i>";
					        testTimeHtml += "</div>";
							testTimeHtml += "<div class='p176-input-wrap'>";
					            testTimeHtml += "<input type='text' class='p176-Hinput' placeholder='00:00' onclick='ModuleTimeMenu.init(this);' value='"+times[i][2]+"' autocomplete='off'>";
					            testTimeHtml += "<i class='p176-input-hour'></i>";
					        testTimeHtml += "</div>";
					    testTimeHtml += "</div>";
						testTimeHtml += "<i class='p176-close' onclick='delTestTimeDiv("+i+")'></i></div>";
                	}
					$('#testTime').append(testTimeHtml);
                }
            } else {
                layer.msg(json.message, {icon: 5});
                layer.closeAll('loading');
            }
        }
	});
});
function splitDate(time){
	var dateArr = time.split(' ');
	var date = dateArr[0];
	var timeArr = dateArr[1].split(':');
	return [date,timeArr[0]+':'+timeArr[1]];
}
function findAreaListByCityId() {
    var currentCityId = sessionStorage.getItem("currentCityId");
    var areaParam = {
        nSchoolId: currentCityId
    };
    var areaEncrypt = constructionParams(rsaEncryptedString(areaParam), "8ec2ce035be84cde916f6c0772fab0e1");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://10.200.80.196:8088/market/bsArea/getBsAreaListByUser.do",
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(areaEncrypt),
        success: function (json) {
            if (json.result == true) {
                var areaList = json.dataList;
                var areaContent = "";

                for (var i = 0; i < areaList.length; i++) {
                    areaContent += "<div class='checkbox' style='float:left;'><label><input type='checkbox' value='"+areaList[i].sCode+"' class='testArea'>"+areaList[i].sName+"</label></div>";
                }
                $(".xian-wid2").html(areaContent);
                currentAreaId = "";
            } else {
                layer.msg("查询失败!", {icon: 5})
            }
        }
    });
}
function addTestTime(){
	var size = $('#testTime').find('.p176-filed-b').size();
	var num = size+1;
	var testTimeHtml = "<div id='testTime_id_"+num+"' class='p176-setInfoCon clearfix'><div class='p176-Slabel testTimeNum'>考试时间"+(size+1)+"</div>"+$('#testTimeDiv').html()+"<i class='p176-close' onclick='delTestTimeDiv("+num+")'></i></div>";
	$('#testTime').append(testTimeHtml);
}
function delTestTimeDiv(num){
	if($('#testTime_id_'+num)){
		$('#testTime_id_'+num).remove();
	}
	var size = $('#testTime').find('.p176-filed-b').size();
	if(size > 0){
		$('.testTimeNum').each(function(index){
			$(this).empty().append("考试时间"+(index+1));
		});
	}
}
function switchStatus(obj){
	if(obj.prop("checked")){
		$('#testDiv').show();
	}else{
		$('#testDiv').hide();
		$('#testTime').empty();
	}
}
function checkImgType(file) {
    if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|JPEG|PNG|BMP)$/.test(file)) {
        return false;
    }
    return true;
}
function checkFileType(file){
	 if (!/\.(xls|xlsx|XLS|XLSX)$/.test(file)) {
        return false;
    }
    return true;
}
function getCurrentTime(){
	function p(s) {
	    return s < 10 ? '0' + s: s;
	}
	var myDate = new Date();
	//获取当前年
	var year=myDate.getFullYear();
	//获取当前月
	var month=myDate.getMonth()+1;
	//获取当前日
	var date=myDate.getDate(); 
	var h=myDate.getHours();       //获取当前小时数(0-23)
	var m=myDate.getMinutes();     //获取当前分钟数(0-59)
	var s=myDate.getSeconds();
	var now=year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m);
	return now;
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
function validateCrTitleImg(){
	if(update_test == 1) return true;
	//判断题图是否上传
	var crTitleImg = $('#hidden1').val();
	if(crTitleImg == ''){
		 layer.msg("请上传题图", {icon: 5});
         return false;
	}
	return true;
}
function validateExcel(){
	return true;
}
//视频地址
function validateVideoUrl(){
	if(update_test == 1) return true;
	var videoUrl = $('#videoUrl').val();
	if(videoUrl != ''){
		if(!reg_url.test(videoUrl)){
			layer.msg("请输入正确的视频地址", {icon: 5});
			return false;
		}
	}
	return true;
}
//验证标题
function validateCrName(){
	if(update_test == 1) return true;
	//标题
	var crName = $('#crName').val();
	if(crName == ''){
		layer.msg("请输入标题", {icon: 5});
		return false;
	}
	var crNameLength = crName.length;
	if(crNameLength > 12){
		layer.msg("标题长度大于12个字符", {icon: 5});
		return false;
	}
	return true;
}
//验证标签
function validateCrLabel(){
	if(update_test == 1) return true;
	//标签
	var crLabel = $('#crLabel').val();
	if(crLabel !=''){
		//对label进行分割
		var crLabelArr = crLabel.split(/\s+/);
		var crLabelArrLength = crLabelArr.length;
		if(crLabelArrLength > 6){
			layer.msg("最多6个标签", {icon: 5});
			return false;
		}
		var lengthFlag = false;
		var i = 0;
		while(i<crLabelArrLength){
			var eleLength = crLabelArr[i].length;
			if(eleLength > 8){
				lengthFlag = true;
				break;
			}
			i++;
		}
		if(lengthFlag){
			layer.msg("单个标签长度不能超过8个字符，第"+(i+1)+"个标签超过了限制长度", {icon: 5});
			return false;
		}
	}
	return true;
}
//验证标签说明
function validateCrLabelIntroduce(){
	if(update_test == 1) return true;
	var crLabelIntro = $('#cRLabelIntroduce').val();
	if(crLabelIntro != ''){
		if(crLabelIntro.length > 200){
			layer.msg("标签说明不能大于200个字符", {icon: 5});
			return false;
		}
	}
	return true;
}
//验证购课弹窗提示
function validateBuyCourseTip(){
	if(update_test == 1) return true;
	var buyCourseTip = $('#buyCourseTip').val();
	if(buyCourseTip != ''){
		if(buyCourseTip.length > 20){
			layer.msg("购课弹窗提示不能大于20个字符", {icon: 5});
			return false;
		}
	}
	return true;
}
//验证活动时间
function validateActivityTime(){
	if(update_test == 1) return true;
	var startDate = $("#startDate").val();//开始日期
    var startTime = $("#startTime").val();//开始时间
    var endDate = $("#endDate").val();//结束日期
    var endTime = $("#endTime").val();//结束时间
    if(!reg_date.test(startDate)){
    	layer.msg("请选择正确的开始日期", {icon: 5});
		return false;	
    }
    if(!reg_time.test(startTime)){
    	layer.msg("请选择正确的开始时间", {icon: 5});
		return false;	
    }
    if(!reg_date.test(endDate)){
    	layer.msg("请选择正确的结束日期", {icon: 5});
		return false;	
    }
    if(!reg_time.test(endTime)){
    	layer.msg("请选择正确的结束时间", {icon: 5});
		return false;	
    }
    if(endDate < startDate){
    	layer.msg("结束时间不能小于开始时间", {icon: 5});
		return false;	
    }
    if(endDate == startDate){
    	if(startTime >= endTime){
    		layer.msg("开始时间应小于结束时间", {icon: 5});
			return false;
    	}
    }
    var now = getCurrentTime();
    if(startDate+' '+startTime < now){
    	layer.msg("开始时间不能小于当前时间", {icon: 5});
		return false;
    }
    return true;
}
//验证活动说明
function validateActivityIntroduce(){
	if(update_test == 1) return true;
	var activityIntroduce = $('#activityIntroduce').val();
	if(activityIntroduce == ''){
		layer.msg("活动说明不能为空", {icon: 5});
		return false;
	}
	if(activityIntroduce.length > 200){
		layer.msg("活动说明不能超过200个字符", {icon: 5});
		return false;
	}
	return true;
}
//验证课程说明
function validateCourseIntroduce(){
	if(update_test == 1) return true;
	var courseIntroduce = $('#courseIntroduce').val();
	if(courseIntroduce == ''){
		layer.msg("课程说明不能为空", {icon: 5});
		return false;
	}
	if(courseIntroduce.length > 200){
		layer.msg("课程说明不能超过200个字符", {icon: 5});
		return false;
	}
	return true;
}
//验证适用人群
function validateRewardFitPerson(){
	if(update_test == 1) return true;
	var rewardFitPerson = $('#rewardFitPerson').val();
	if(rewardFitPerson == ''){
		layer.msg("适用人群不能为空", {icon: 5});
		return false;
	}
	if(rewardFitPerson.length > 15){
		layer.msg("适用人群不能超过15个字符", {icon: 5});
		return false;
	}
	return true;
}
//验证官方客服
function validateHonourRewardContact(){
	if(update_test == 1) return true;
	var honourRewardContact = $('#honourRewardContact').val();
	if(honourRewardContact == ''){
		layer.msg("官方客服不能为空", {icon: 5});
		return false;
	}
	if(honourRewardContact.length > 15){
		layer.msg("官方客服不能超过15个字符", {icon: 5});
		return false;
	}
	return true;
}
//验证公众号名称
function validateWechatName(){
	if(update_test == 1) return true;
	var wechatName = $('#wechatName').val();
	if(wechatName == ''){
		layer.msg("公众号名称不能为空", {icon: 5});
		return false;
	}
	if(wechatName.length > 15){
		layer.msg("公众号名称不能超过15个字符", {icon: 5});
		return false;
	}
	return true;
}
function validateErcode(){
	if(update_test == 1) return true;
	//判定公众号二维码是否上传
	var ercode = $('#hidden5').val();
	if(ercode == ''){
		 layer.msg("请上传公众号二维码", {icon: 5});
         return false;
	}
	return true;
}
function validateWxSmallImg(){
	if(update_test == 1) return true;
	var wxSmallImg = $('#hidden8').val();
	if(wxSmallImg == ''){
		 layer.msg("请上传微信转发小图", {icon: 5});
         return false;
	}
	return true;
}
function validateRecommendPic(){
	if(update_test == 1) return true;
	var recommPic = $('#hidden6').val();
	if(recommPic == ''){
		 layer.msg("请上传推荐题图", {icon: 5});
         return false;
	}
	return true;
}
//验证推荐金额
function validateRecomMoney(){
	if(update_test == 1) return true;
	var recomMoney = $('#recomMoney').val();
	if(!reg_int.test(recomMoney)){
		layer.msg("请输入正确的推荐金额，只支持正整数", {icon: 5});
		return false;
	}
	return true;
}
//验证推荐数量上限
function validateRecomLimitCount(){
	if(update_test == 1) return true;
	var recomLimitCount = $('#recomLimitCount').val();
	if(!reg_int.test(recomLimitCount)){
		layer.msg("请输入正确的推荐数量上限，只支持正整数", {icon: 5});
		return false;
	}
	return true;
}
//验证优惠规则
function validateDiscountsRule(){
	if(update_test == 1) return true;
	var discountsRule = $('#discountsRule').val();
	if(discountsRule == ''){
		layer.msg("优惠规则不能为空", {icon: 5});
		return false;
	}
	if(discountsRule.length > 200){
		layer.msg("优惠规则不能超过200个字符", {icon: 5});
		return false;
	}
	return true;
}
//验证推荐宣传语
function validateRewardWord(){
	if(update_test == 1) return true;
	var rewardWord = $('#rewardWord').val();
	if(rewardWord == ''){
		layer.msg('请输入推荐宣传语',{icon:5});
		return false;
	}
	if(rewardWord.length > 20){
		layer.msg('推荐宣传语不能超过20个字符',{icon:5});
		return false;
	}
	return true;
}
//验证奖励类型
function validateAwardType(){
	if(update_test == 1) return true;
	var awardType = $('#awardType').val();
	if(awardType == ''){
		layer.msg('请输入奖励类型',{icon:5});
		return false;
	}
	if(awardType.length > 5){
		layer.msg('奖励类型不能超过5个字符',{icon:5});
		return false;
	}
	return true;
}
//验证线下测试
function validateTest(){
	var checked = false;
	if($('#switchTestStatus').prop('checked')){
		checked = true;
	}
	//判定是否选择了校区
	if(checked){
		var testPic = $('#hidden7').val();
		if(testPic == ''){
			layer.msg("请上传测试题图", {icon: 5});
			return false;
		}
		var testIntroduce = $('#testIntroduce').val();
		if(testIntroduce == ''){
			layer.msg("请输入考试说明", {icon: 5});
			return false;
		}
		var attMatters = $('#attMatters').val();
		if(attMatters == ''){
			layer.msg("请输入线下测试注意事项", {icon: 5});
			return false;
		}
		//判定是否选择了学校
		var testArea = [];
		$('.testArea').each(function(index){
			var area = $(this);
			if(area.prop('checked')){
				testArea.push(area.val());
			}
		});
		if(testArea.length == 0){
			layer.msg("请选择预约线下测试的校区", {icon: 5});
			return false;
		}
		//判定是否添加了预约考试时间
		var testTimeObj = $('#testTime').find('.p176-filed-b');
		if(testTimeObj.size() == 0)return true;
		var flag = true;
		var index = 0;
		//判定是否添加了合适的考试时间
		testTimeObj.each(function(i){
			var singleTestTime = $(this);
			var testDate = singleTestTime.find('input').eq(0).val();
			var testStartTime = singleTestTime.find('input').eq(1).val();
			var testEndTime = singleTestTime.find('input').eq(2).val();
			if(!reg_date.test(testDate)){
				index = i+1;
				layer.msg("第"+index+'组的考试时间日期格式不正确', {icon: 5});
				return flag = false;
			}
			if(!reg_time.test(testStartTime)){
				index = i+1;
				layer.msg("第"+index+'组的考试开始时间格式不正确', {icon: 5});
				return flag = false;
			}
			if(!reg_time.test(testEndTime)){
				index = i+1;
				layer.msg("第"+index+'组的考试结束时间格式不正确', {icon: 5});
				return flag = false;
			}
			if(testStartTime >= testEndTime){
				index = i+1;
				layer.msg("第"+index+'组的考试开始时间大于等于结束时间', {icon: 5});
				return flag = false;
			}
		});
		return flag;
	}else{//未选择测试地点
		return true;
	}
}
$(function () {
		//标题
		lengthValidate("crName", "explainInformCnt1", 12);
		//标签
		lengthValidate("crLabel","explainInformCnt2",55);
		//标签说明
    	lengthValidate("cRLabelIntroduce", "explainInformCnt3", 200);
    	//活动说明
    	lengthValidate("activityIntroduce", "explainInformCnt4", 200);
    	//课程说明
    	lengthValidate("courseIntroduce", "explainInformCnt5", 200);
    	//适用人群
    	lengthValidate("rewardFitPerson", "explainInformCnt6", 15);
    	//官方客服
    	lengthValidate("honourRewardContact", "explainInformCnt7", 15);
    	//公众号名称
    	lengthValidate("wechatName", "explainInformCnt8", 15);
    	//优惠规则
    	lengthValidate("discountsRule", "explainInformCnt9", 200);
		//推荐宣传语
    	lengthValidate("rewardWord", "explainInformCnt10", 20);
    	//奖励类型
    	lengthValidate("awardType", "explainInformCnt11", 5);
    	//购课弹框提示
    	lengthValidate("buyCourseTip", "explainInformCnt12",20);
		//考试说明
    	lengthValidate("testIntroduce", "explainInformCnt13", 20);
    	//考试注意事项
    	lengthValidate("attMatters", "explainInformCnt14",200);
    	//绑定blur事件
    	$('#videoUrl').blur(validateVideoUrl);//视频地址
    	$('#crName').blur(validateCrName);//标题
    	$('#crLabel').blur(validateCrLabel);//标签
    	$('#cRLabelIntroduce').blur(validateCrLabelIntroduce);//标签说明
    	$('#activityIntroduce').blur(validateActivityIntroduce);//活动说明
    	$('#courseIntroduce').blur(validateCourseIntroduce);//课程说明
    	$('#rewardFitPerson').blur(validateRewardFitPerson);//适用人群
    	$('#honourRewardContact').blur(validateHonourRewardContact);//官方客服
    	$('#wechatName').blur(validateWechatName);//公众号名称
    	$('#recomMoney').blur(validateRecomMoney);//推荐金额
    	$('#recomLimitCount').blur(validateRecomLimitCount);//推荐个数上线
    	$('#discountsRule').blur(validateDiscountsRule);//优惠规则
    	$('#rewardWord').blur(validateRewardWord);//推荐宣传语
    	$('#awardType').blur(validateAwardType);//奖励类型
    	$('#buyCourseTip').blur(validateBuyCourseTip);//购课弹窗提示
    $("input[type=file]").change(function () {
        $(this).parents(".uploader").find(".filename").val($(this).val());
    });
	$("#first1").click(function(){$("#m1").html("");});
	$("#first2").click(function(){$("#m2").html("");});
	$("#first3").click(function(){$("#m3").html("");});
	$("#first4").click(function(){$("#m4").html("");});
	$("#first5").click(function(){$("#m5").html("");});
	$("#first6").click(function(){$("#m6").html("");});
	$("#first7").click(function(){$("#m7").html("");});
	$("#first8").click(function(){$("#m8").html("");});
	//题图上传
    $('#up1').click(function () {
        if ($("#first1").val() != null & $("#first1").val() != "") {
            if (!checkImgType($("#first1").val())) {
                layer.msg("题类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
                return false;
            }
            $("#submit-1").ajaxSubmit({dataType:'json',success:function (data) {
            	//console.log(data);
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    $("#hidden1").val(data.fileUrl);
                    $("#crTitleImg").attr("src", data.fileUrl);
                    $("#m1").html(data.message);
                } else {
                    $("#m1").html(data.message);
                    setTimeout(function(){
                        $("#m1").html("");
                        $("#submit-1 .filename").val($("#hidden1").val());
                    },4000);
                }
            }});
            return false;
        } else {
            layer.msg("请选择文件", {icon: 5});
        }
    });
    //副题图上传
        $('#up2').click(function () {
        if ($("#first2").val() != null & $("#first2").val() != "") {
            if (!checkImgType($("#first2").val())) {
                layer.msg("副题图类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
                return false;
            }
            $("#submit-2").ajaxSubmit({dataType:'json',success:function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    $("#hidden2").val(data.fileUrl);
                    $("#crSubTitleImg").attr("src", data.fileUrl);
                    $("#m2").html(data.message);
                } else {
                    $("#m2").html(data.message);
                    setTimeout(function () {
                        $("#m2").html("");
                        $("#submit-2 .filename").val($("#hidden2").val());
                    }, 4000);
                }
            }});
            return false;
        } else {
            layer.msg("请选择文件", {icon: 5});
        }
    });
    //教学大纲上传
    $('#up3').click(function () {
        if ($("#first3").val() != null & $("#first3").val() != "") {
            if (!checkImgType($("#first3").val())) {
                layer.msg("教学大纲图片类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
                return false;
            }
            $("#submit-3").ajaxSubmit({dataType:'json',success:function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    $("#hidden3").val(data.fileUrl);
                    $("#teachPrograme").attr("src", data.fileUrl);
                    $("#m3").html(data.message);
                } else {
                    $("#m3").html(data.message);
                    setTimeout(function () {
                        $("#m3").html("");
                        $("#submit-3 .filename").val($("#hidden3").val());
                    }, 4000);
                }
            }});
            return false;
        } else {
            layer.msg("请选择文件！", {icon: 5});
        }
    });
    //班级列表上传
        $('#up4').click(function () {
        if ($("#first4").val() != null & $("#first4").val() != "") {
            if (!checkFileType($("#first4").val())) {
                layer.msg("班级列表需后缀为xls，xlsx,XLS,XLSX的excel文件", {icon: 5});
                return false;
            }
            $("#submit-4").ajaxSubmit({dataType:'json',success:function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    $("#hidden4").val(data.fileUrl);
                    $("#m4").html(data.message);
                } else {
                    $("#m4").html(data.message);
                    setTimeout(function () {
                        $("#m4").html("");
                        $("#submit-4 .filename").val($("#hidden4").val());
                    }, 4000);
                }
            }});
            return false;
        } else {
            layer.msg("请选择文件！", {icon: 5});
        }
    });
    //公众号二维码上传
    $('#up5').click(function () {
        if ($("#first5").val() != null & $("#first5").val() != "") {
            if (!checkImgType($("#first5").val())) {
                layer.msg("公众号二维码图片类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
                return false;
            }
            $("#submit-5").ajaxSubmit({dataType:'json',success:function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    $("#hidden5").val(data.fileUrl);
                    $("#ercodept").attr("src", data.fileUrl);
                    $("#m5").html(data.message);
                } else {
                    $("#m5").html(data.message);
                    setTimeout(function () {
                        $("#m5").html("");
                        $("#submit-5 .filename").val($("#hidden3").val());
                    }, 4000);
                }
            }});
            return false;
        } else {
            layer.msg("请选择文件！", {icon: 5});
        }
    });
    //推荐题图上床
    $('#up6').click(function () {
        if ($("#first6").val() != null & $("#first6").val() != "") {
            if (!checkImgType($("#first6").val())) {
                layer.msg("推荐题图的图片类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
                return false;
            }
            $("#submit-6").ajaxSubmit({dataType:'json',success:function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    $("#hidden6").val(data.fileUrl);
                    $("#recommendPic").attr("src", data.fileUrl);
                    $("#m6").html(data.message);
                } else {
                    $("#m6").html(data.message);
                    setTimeout(function () {
                        $("#m6").html("");
                        $("#submit-6 .filename").val($("#hidden6").val());
                    }, 4000);
                }
            }});
            return false;
        } else {
            layer.msg("请选择文件！", {icon: 5});
        }
    });
    //测试题图上床
    $('#up7').click(function () {
        if ($("#first7").val() != null & $("#first7").val() != "") {
            if (!checkImgType($("#first7").val())) {
                layer.msg("测试题图的图片类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
                return false;
            }
            $("#submit-7").ajaxSubmit({dataType:'json',success:function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    $("#hidden7").val(data.fileUrl);
                    $("#testPic").attr("src", data.fileUrl);
                    $("#m7").html(data.message);
                } else {
                    $("#m7").html(data.message);
                    setTimeout(function () {
                        $("#m7").html("");
                        $("#submit-7 .filename").val($("#hidden7").val());
                    }, 4000);
                }
            }});
            return false;
        } else {
            layer.msg("请选择文件！", {icon: 5});
        }
    });
    //微信小图上传
    $('#up8').click(function () {
        if ($("#first8").val() != null & $("#first8").val() != "") {
            if (!checkImgType($("#first8").val())) {
                layer.msg("微信转发小图图片类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
                return false;
            }
            $("#submit-8").ajaxSubmit({dataType:'json',success:function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    $("#hidden8").val(data.fileUrl);
                    $("#wxSmallImg").attr("src", data.fileUrl);
                    $("#m8").html(data.message);
                } else {
                    $("#m8").html(data.message);
                    setTimeout(function () {
                        $("#m8").html("");
                        $("#submit-8 .filename").val($("#hidden8").val());
                    }, 4000);
                }
            }});
            return false;
        } else {
            layer.msg("请选择文件！", {icon: 5});
        }
    });
});
function updateCR(publish){
	 	var currentCityId = $("#currentCityId").val();
	 	var areaCode = $("#currentAreaId").val();
    	var deptCode = $("#currentDeptId").val();
	 	if(currentCityId == ''|| areaCode == ''){
			layer.msg("未获取校区信息!", {icon: 5});
			return false;
	 	}
	 	if(publish != 1){
	 		publish = 0;	
	 	}
	    if(validateCrTitleImg() &&//题图
		    validateExcel() &&//课程列表
		    validateVideoUrl() &&//视频地址
	    	validateCrName() &&//标题
	    	validateCrLabel() &&//标签
	    	validateCrLabelIntroduce() &&//标签说明
	    	validateActivityTime() &&//验证活动时间
	    	validateActivityIntroduce() &&//活动说明
	    	validateCourseIntroduce() &&//课程说明
	    	validateRewardFitPerson() &&//适用人群
	    	validateHonourRewardContact() &&//官方客服
	    	validateWechatName() &&//公众号名称
	    	validateErcode() &&//公众号二维码
	    	validateWxSmallImg() &&//微信分享小图
	    	validateRecommendPic() &&//推荐题图
	    	validateRecomMoney() &&//推荐金额
	    	validateRecomLimitCount() &&//推荐个数上线
	    	validateDiscountsRule() &&//优惠规则
    		validateRewardWord() &&//推荐宣传语
    		validateAwardType() &&//奖励类型
    		validateBuyCourseTip() &&//购课弹框提示
	    	validateTest()){
    		var switchStatus = 0;
    		var testAreas = [];
    		var testIntroduce = '';
			var attMatters = '';
    		var testTimes = [];
    		var crLabelArr = [];
    		var crLabelStr = $.trim($('#crLabel').val());
    		var crLabelArr = crLabelStr.split(/\s+/);
    		var updateTest = $('#update_test').val();
    		var switchTimeDown = 1;
    		if(!$('#switchTimeDown').prop('checked'))switchTimeDown = 0;
    		if($('#switchTestStatus').prop('checked')){
    			switchStatus = 1;
    			//获取校区
    			$('.testArea').each(function(index){
					if($(this).prop('checked')){
						testAreas.push($(this).val());
					}
				});
				testIntroduce = $('#testIntroduce').val();
				attMatters = $('#attMatters').val();
    			//获取考试时间
    			if($('#testTime').find('.p176-filed-b').size() > 0){
	    			$('#testTime').find('.p176-filed-b').each(function(index){
	    				var singleTestTime = $(this);
						var testDate = singleTestTime.find('input').eq(0).val();
						var testStartTime = singleTestTime.find('input').eq(1).val();
						var testEndTime = singleTestTime.find('input').eq(2).val();
						testTimes.push([testDate,testStartTime,testEndTime]);
	    			});
    			}else{
    				testTimes = '';	
    			}
    		}
    		d = {
    			id:$('#crId').val(),
    			crTitleImg:$('#hidden1').val(),
    			crSubTitleImg:$('#hidden2').val(),
    			teachPrograme:$('#hidden3').val(),
    			courseExcel:$('#hidden4').val(),
    			videoUrl:$('#videoUrl').val(),
    			crName:$('#crName').val(),
    			crLabel:crLabelArr,
    			crLabelIntro:$('#cRLabelIntroduce').val(),
    			startTime:$('#startDate').val()+' '+$('#startTime').val(),
    			endTime:$('#endDate').val()+' '+$('#endTime').val(),
    			activityIntro:$('#activityIntroduce').val(),
    			courseIntro:$('#courseIntroduce').val(),
    			rewardFitPerson:$('#rewardFitPerson').val(),
    			rewardContact:$('#honourRewardContact').val(),
    			wechatName:$('#wechatName').val(),
    			ercode:$('#hidden5').val(),
    			wxSmallImg:$('#hidden8').val(),
    			recomImg:$('#hidden6').val(),
    			recomMoney:$('#recomMoney').val(),
    			recomLimitCount:$('#recomLimitCount').val(),
    			discountsRule:$('#discountsRule').val(),
				buyCourseTip:$('#buyCourseTip').val(),
    			rewardWord:$('#rewardWord').val(),
    			awardType:$('#awardType').val(),
    			switchTimeDown:switchTimeDown,
    			switchTestStatus:switchStatus,
    			testImg:$('#hidden7').val(),
    			areas:testAreas,
    			testIntroduce:testIntroduce,
				attMatters:attMatters,
    			times:testTimes,
    			status:publish
    		};
    		console.log(d);
		    jQuery.ajax({
		        type: "POST",
		        url: '/chouke/ajax_updateclassrecommend',
		        async: true,
		        dataType: 'json',
		        data:d,
		        success: function (json) {
		            if (json.code == 1) {
		                layer.msg("保存成功!", {icon: 6});
		                changeCenter("/chouke/classrecommendlist");
		            } else {
		                layer.msg(json.message, {icon: 5});
		                layer.closeAll('loading');
		            }
		        }
		    });
    	}
    	
}