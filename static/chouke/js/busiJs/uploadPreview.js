function isExistArea() {
    if ($("#areaIdFinal").val() == "") {
        layer.msg("请选择一个校区", {icon: 5});
    }
    $("#schoolId").val(sessionStorage.getItem("currentCityId"));
    $("#areaCode").val(sessionStorage.getItem("currentAreaId"));
    $("#deptCode").val(sessionStorage.getItem("currentDeptId"));
    $("#currentType").val(sessionStorage.getItem("currentType"))
}

$(function () {
    $("form[enctype]").attr("action",Global.baseUploadPath+$("form[enctype]").attr("action"));
    $("input[type=file]").change(function () {
        $(this).parents(".uploader").find(".filename").val($(this).val());

    });

    $("input[type=file]").each(function () {
        if ($(this).val() == "") {
            $(this).parents(".uploader").find(".filename").val("请选择图片...");
        }
    });

    $('#up1').click(function () {
        if ($("#first1").val() != null & $("#first1").val() != "") {
            if (!checkImgType($("#first1").val())) {
                layer.msg("APP筹课配图类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
                return false;
            }
            $("#submit-1").ajaxSubmit({dataType:'json',success:function (data) {
            	//console.log(data);
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    $("#hidden1").val(data.fileUrl);
                    $("#ckpt").attr("src", data.fileUrl);
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
    })
    $('#up2').click(function () {
        if ($("#first2").val() != null & $("#first2").val() != "") {
            if (!checkImgType($("#first2").val())) {
                layer.msg("微信转发配图类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
                return false;
            }
            $("#submit-2").ajaxSubmit({dataType:'json',success:function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    $("#hidden2").val(data.fileUrl);
                    $("#wechatpt").attr("src", data.fileUrl);
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
    })

    $('#up3').click(function () {
        if ($("#first3").val() != null & $("#first3").val() != "") {
            if (!checkImgType($("#first3").val())) {
                layer.msg("公众号二维码图片类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
                return false;
            }
            $("#submit-3").ajaxSubmit({dataType:'json',success:function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    $("#hidden3").val(data.fileUrl);
                    $("#ercodept").attr("src", data.fileUrl);
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




    //加载类别数据
    //var d = constructionParams("", "c7bc36da6f4e4bd18b06f120246c0f67");
    //jQuery.ajax({
    //    type: "POST",
    //    url: Global.actionURL,
    //    async: false,//同步
    //    dataType: 'json',
    //    data: JSON.stringify(d),
    //    success: function (json) {
    //        if (json.result == true) {
    //            $(".combo-arrow").remove();
    //            $(".textbox").css({width: "240px", height: "30px" });
    //            $(".textbox-text").attr("placeholder","请选择类别");
    //            $(".textbox-text").css({width: "99%", height: "30px","line-height":"30px"});
    //            //$('#careType').combotree('loadData', json.careTypeList);
    //        } else {
    //            alert("获取类别数据失败,请联系管理员");
    //        }
    //    }
    //});
});

var cPage = 1;
$(function () {
    var zzsc = $(".zzsc a");
    zzsc.click(function () {
        if ($(this).text() == 1) {
            if (validate(cPage, true)) {
                cPage = 1;
                $("#first").show();
                $("#second").hide();
                $("#third").hide();
                $("#fourth").hide();
            }
        } else if ($(this).text() == 2) {
            if (validate(cPage, true)) {
                cPage = 2;
                $("#first").hide();
                $("#second").show();
                $("#third").hide();
                $("#fourth").hide();
            }
        } else if ($(this).text() == 3) {
            if (validate(cPage, true)) {
                cPage = 3;
                $("#first").hide();
                $("#second").hide();
                $("#third").show();
                $("#fourth").hide();
            }
        } else if ($(this).text() == 4) {
            if (validate(cPage, true)) {
                cPage = 4;
                $("#first").hide();
                $("#second").hide();
                $("#third").hide();
                $("#fourth").show();
            }
        }
    });
});


var courseAmount = 0;

function upload(_this) {
    if ($(_this.parentNode).prev().find('input[name="first4"]').val() != null && $(_this.parentNode).prev().find('input[name="first4"]').val() != "") {

        if (!checkImgType($(_this.parentNode).prev().find('input[name="first4"]').val())) {
            layer.msg("奖品图片类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
            return false;
        }

        $(_this.parentNode.parentNode).ajaxSubmit({dataType:'json',success:function (data) {
            // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
            if (data.success == true) {
                $(_this.parentNode).prev().find('input[name="hidden4"]').val(data.fileUrl);
                layer.msg("上传成功!", {icon: 6});
            } else {
                layer.msg("上传失败!", {icon: 5});
            }
        }});
        return false;
    } else {
        layer.msg("请选择文件！", {icon: 5})
    }
}

function createCk(){
    if($("#areaIdFinal").val() == "") {
        layer.msg("请选择一个校区", {icon: 5});
    }else {
        changeCenter('/chouke/index');
    }
}

/*
 * 判断图片类型
 *
 * @param ths
 *          type="file"的javascript对象
 * @return true-符合要求,false-不符合
 */
function checkImgType(file) {
    if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|JPEG|PNG|BMP)$/.test(file)) {
        return false;
    }
    return true;
}

function validate(step, isEmpty) {
    var classNum = $("#classNum").val();
    var ckName = $("#ckName").val();//筹课名称
    var className = $("#className").val();//班级名称
    var usefulPerson = $("#usefulPerson").val();//适用人群
    var raiseMoney = $("#raiseMoney").val();//筹课金额
    //var courseAmount = $("#courseAmount").val();//课程金额
    var ckIntroduce = $("#ckIntroduce").val();//筹课说明
    var service = $("#service").val();//官方客服
    //var careType = $("#careType").combotree('getValue');//类别
    var first1 = $("#hidden1").val();//app筹课配图
    var first2 = $("#hidden2").val();//微信转发配图
    var first3 = $("#hidden3").val();//公众号二维码图片
    var gzhname = $("#gzhname").val();//公众号名称

    if (step == 1) {//第一步, 判断字数长度
        var ckNameLength = ckName.length;
        if (ckNameLength > 12) {
            if($("#className") != undefined){
                layer.msg('活动标题不能超过12个字!', {icon: 5});
            }else{
                layer.msg('筹课名称不能超过12个字!', {icon: 5});
            }

            $("#ckName").focus();
            return false;
        }
        if (service.length > 15) {
            layer.msg('官方客服不能超过15个字符! ', {icon: 5});
            $("#service").focus();
            return false;
        }/*else{
            //校验输入为qq或者座机或者手机号
            var qq = "/^[1-9]*[1-9][0-9]*$/";//QQ号码
            var phone = "/^(13|15|18|17|14)[0-9]{9}$/";//手机
            var tel = "/^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$/";//电话号码的函数(包括验证国内区号,国际区号,分机号)
            if(!eval(qq).test(service) || !eval(phone).test(service) || !eval(tel).test(service)){
                layer.msg("官方客服为qq或者座机或者手机",{icon: 5 });
                return false;
            }
        }*/
        if(className != undefined && className.length > 20){
            layer.msg('班级名称不能超过20个字!', {icon: 5});
            $("#className").focus();
            return false;
        }
        if (usefulPerson.length > 15) {
            //alert('适用人群不能超过15个汉字!');
            layer.msg('适用人群不能超过15个字!', {icon: 5});
            $("#usefulPerson").focus();
            return false;
        }
        if(raiseMoney != undefined && raiseMoney != ''){
            var reg = new RegExp("^[0-9]*$");
            if(!reg.test(raiseMoney)){
                layer.msg('筹课请输入正整数', {icon: 5});
                $("#raiseMoney").focus();
                return false;
            }
        }
        if (ckIntroduce.length > 200) {
            //alert('筹课说明不能超过200个汉字！');
            layer.msg('筹课说明不能超过200个字！', {icon: 5});
            $("#ckIntroduce").focus();
            return false;
        }
    }

    if (step == 1 && isEmpty) {//第一步,判断是否为空

        if (classNum.length <= 0) {
            layer.msg('班级编号不能为空', {icon: 5});
            $("#classNum").focus();
            return false;
        }
        if (!isClassNum) {
            layer.msg('您查询的班号不存在，或与您所在地区不匹配，请重新查询！！', {icon: 5});
            $("#classNum").focus();
            return false;
        }
        if (ckName.length <= 0) {
            if ($("#className") != undefined) {
                layer.msg('活动标题不能为空', {icon: 5});
            }else{
                layer.msg('筹课名称不能为空', {icon: 5});
            }
            $("#ckName").focus();
            return false;
        }
        if (usefulPerson.length <= 0) {
            layer.msg('适用人群不能为空', {icon: 5});
            $("#usefulPerson").focus();
            return false;
        }
        if (courseAmount.length <= 0) {
            layer.msg('请先校验班级编号', {icon: 5});
            $("#classNum").focus();
            return false;
        }
        if (ckIntroduce.length <= 0) {
            layer.msg('筹课说明不能为空！', {icon: 5});
            $("#ckIntroduce").focus();
            return false;
        }
        if($("#currentType").val() == 2) { //新筹课
            if (className.length <= 0) {
                layer.msg('班级名称不能为空！', {icon: 5});
                $("#className").focus();
                return false;
            }
            if (raiseMoney.length <= 0){
                layer.msg('筹课金额不能为空！', {icon: 5});
                $("#raiseMoney").focus();
                return false;
            }
        }
        if (service.length <= 0) {
            layer.msg('官方客服不能为空', {icon: 5});
            $("#service").focus();
            return false;
        }

        //if (careType.length <= 0) {
        //    layer.msg('请选择类别', {icon: 5});
        //    $("#careType").focus();
        //    return false;
        //}

        if (first1.length <= 0) {
            layer.msg('请上传APP筹课配图!', {icon: 5});
            return false;
        }

        if (first2.length <= 0) {
            layer.msg('请上传微信转发配图', {icon: 5});
            return false;
        }

        if (first3.length <= 0) {
            layer.msg('请上传公众号二维码图片', {icon: 5});
            return false;
        }

        if (gzhname.length <= 0) {
            layer.msg('公众号名称不能为空', {icon: 5});
            $("#gzhname").focus();
            return false;
        }
    }

    var startDate = $("#startDate").val();//开始日期
    var startTime = $("#startTime").val();//开始时间
    var endDate = $("#endDate").val();//结束日期
    var endTime = $("#endTime").val();//结束时间
    var ruleIntroduce = $("#ruleIntroduce").val();//规则说明
    var address = $("#address").val();//兑课地址
    var phoneNum = $("#phoneNum").val();//兑课电话
    var effect = $("#effect").val();//兑换有效期
    var countList = $('input[name="count"]').map(function () {
        return this.value
    }).get();
    var perNumList = $('input[name="perNum"]').map(function () {
        return this.value
    }).get();
    var wealCheck = $('#helpWealSwitch').prop('checked');
    var wealName = $('#wealName').val();
    var wealRemark = $('#wealRemark').val();
    var wealBootIntro  = $('#wealBootIntro').val();
    var wealIntroduce = $('#wealIntroduce').val();
    if (step == 2) {
        if (ruleIntroduce.length > 300) {
            //alert('规则说明不能超过300个汉字!');
            layer.msg('规则说明不能超过300个字!', {icon: 5});
            $("#ruleIntroduce").focus();
            return false;
        }
        if (address.length > 30) {
            //alert('兑课地址不能超过30个汉字!');
            layer.msg('兑课地址不能超过30个字!', {icon: 5});
            $("#address").focus();
            return false;
        }
        if (startTime.length > 0 && !timeValidate(startTime)) {
            layer.msg('开始时间格式不正确', {icon: 5});
            return false;
        }
        if (endTime.length > 0 && !timeValidate(endTime)) {
            layer.msg('结束时间格式不正确', {icon: 5});
            return false;
        }
        if(wealCheck){
        	if(wealName.length > 12){
    		   layer.msg('福利名称不能超过12个字!', {icon: 5});
            	$("#wealName").focus();
            	return false;
        	}
        	if(wealRemark.length > 20){
    		   layer.msg('福利备注不能超过20个字!', {icon: 5});
            	$("#wealRemark").focus();
            	return false;
        	}
    		if(wealBootIntro.length > 200){
    		   layer.msg('福利引导语不能超过200个字!', {icon: 5});
            	$("#wealBootIntro").focus();
            	return false;
        	}
	       	if(wealIntroduce.length > 200){
    		   layer.msg('福利说明不能超过200个字!', {icon: 5});
            	$("#wealIntroduce").focus();
            	return false;
        	}
        }
    }

    if (step == 2 && isEmpty) {

        if (startDate.length <= 0) {
            layer.msg('开始日期不能为空', {icon: 5});
            $("#startDate").focus();
            return false;
        }
        if (startTime.length <= 0) {
            layer.msg('开始时间不能为空', {icon: 5});
            $("#startTime").focus();
            return false;
        }
        var startdate1 = new Date((startDate + " " + startTime).replace(/-/g, "/"));
        var date = new Date();
        if (startdate1 < date) {
            layer.msg('开始时间不能小于当前时间', {icon: 5});
            return false;
        }
        if (endDate.length <= 0) {
            layer.msg('结束日期不能为空', {icon: 5});
            $("#endDate").focus();
            return false;
        }
        if (endTime.length <= 0) {
            layer.msg('结束时间不能为空', {icon: 5});
            $("#endTime").focus();
            return false;
        }
        var enddate1 = new Date((endDate + " " + endTime).replace(/-/g, "/"));
        if (enddate1 < date) {
            layer.msg('结束时间不能小于当前时间', {icon: 5});
            return false;
        }
        if (enddate1 < startdate1) {
            layer.msg('结束时间不能小于开始时间', {icon: 5});
            return false;
        }
        if (ruleIntroduce.length <= 0) {
            layer.msg('规则说明不能为空', {icon: 5});
            $("#ruleIntroduce").focus();
            return false;
        }
        if (address.length <= 0) {
            layer.msg('兑课地址不能为空', {icon: 5});
            $("#address").focus();
            return false;
        }
        if (phoneNum.length <= 0) {
            layer.msg('兑课电话不能为空', {icon: 5});
            $("#phoneNum").focus();
            return false;
        }
        if (effect.length <= 0) {
            layer.msg('兑课有效期不能为空', {icon: 5});
            $("#effect").focus();
            return false;
        }
        var effect1 = new Date((effect).replace(/-/g, "/"));
        if (effect1 < date) {
            layer.msg('兑课有效期不能小于当前时间', {icon: 5});
            return false;
        }
        if (countList.length <= 0 || perNumList.length <= 0) {
            layer.msg('帮筹名额不能为空', {icon: 5});
            return false;
        }

        for (var i = 0; i < countList.length; i++) {

            var count = countList[i];
            var perNum = perNumList[i];

//            if (count.length <= 0) {
//                layer.msg('第' + (i + 1) + '批名额不能为空!', {icon: 5});
//                return false;
//            }
//
//            if (perNum.length <= 0) {
//                layer.msg('第' + (i + 1) + '批帮筹人数不能为空!', {icon: 5});
//                return false;
//            }
            if (!/^[1-9]\d*$/.test(count)) {
                layer.msg('第' + (i + 1) + '批名额请输入正整数!', {icon: 5});
                return false;
            }

            if (!/^[1-9]\d*$/.test(perNum)) {
                layer.msg('第' + (i + 1) + '批帮筹人数请输入正整数!', {icon: 5});
                return false;
            }

        }
        if(wealCheck){
        	if(wealName.length <= 0){
    		   layer.msg('福利名称不能为空!', {icon: 5});
            	$("#wealName").focus();
            	return false;
        	}
	       	if(wealRemark.length <= 0){
    		   layer.msg('福利备注不能为空!', {icon: 5});
            	$("#wealRemark").focus();
            	return false;
        	}
	       	if(wealBootIntro.length <= 0){
    		   layer.msg('福利引导语不能为空!', {icon: 5});
            	$("#wealBootIntro").focus();
            	return false;
        	}
	       	if(wealIntroduce.length <= 0){
    		   layer.msg('福利说明不能为空!', {icon: 5});
            	$("#wealIntroduce").focus();
            	return false;
        	}
        }
    }

    var courseName = $("#courseName").val();//课程名称
    var courseReady = $("#courseReady").val();//课程备注
    var courseIntroduce = $("#courseIntroduce").val();//课程说明

    if (step == 3) {
        if (courseName.length > 30) {
            //alert('课程名称不能超过30个汉字!');
            layer.msg('课程名称不能超过30个汉字!', {icon: 5});
            $("#courseName").focus();
            return false;
        }

        if (courseReady.length > 20) {
            //alert('课程备注不能超过20个汉字!');
            layer.msg('课程备注不能超过20个汉字!', {icon: 5});
            $("#courseReady").focus();
            return false;
        }

        if (courseIntroduce.length > 100) {
            //alert('课程说明不能超过100个汉字!');
            layer.msg('课程说明不能超过100个汉字!', {icon: 5});
            $("#courseIntroduce").focus();
            return false;
        }
    }

    if (step == 3 && isEmpty) {
        if (courseName <= 0) {
            layer.msg('课程名称不能为空', {icon: 5});
            $("#courseName").focus();
            return false;
        }

        if (courseReady.length <= 0) {
            layer.msg('课程备注不能为空', {icon: 5});
            $("#courseReady").focus();
            return false;
        }

        if (courseIntroduce.length <= 0) {
            layer.msg('课程说明不能为空', {icon: 5});
            $("#courseIntroduce").focus();
            return false;
        }
    }


    var olderRule = $("#olderRule").val();//老生抽奖规则
    var newDefine = $("#newDefine").val();//新生定义
    var oldDefine = $("#oldDefine").val();//老生定义
    var contactNumber = $("#contactNumber").val();//兑奖联系方式
    var workTime = $("#workTime").val();//工作时间
    var getcashAddress = $("#getcashAddress").val();//兑奖地址
    var usefulPersons = $("#usefulPersons").val();//适用人群
    var overTime = $("#overTime").val();//兑奖截止日期
    var helpCount = $("#helpCount").val();//帮忙人数

    if (step == 4) {

        if (olderRule.length > 300) {
            layer.msg('老生抽奖规则不能超过300个汉字!', {icon: 5});
            $("#olderRule").focus();
            return false;
        }

        if (newDefine.length > 20) {
            layer.msg('新生定义不能超过20个汉字!', {icon: 5});
            $("#newDefine").focus();
            return false;
        }

        if (oldDefine.length > 20) {
            layer.msg('老生定义不能超过20个汉字!', {icon: 5});
            $("#oldDefine").focus();
            return false;
        }

        if (contactNumber.length > 15) {
            layer.msg('兑奖联系方式不能超过15个汉字!', {icon: 5});
            $("#contactNumber").focus();
            return false;
        }

        if (workTime.length > 20) {
            layer.msg('工作时间不能超过20个汉字!', {icon: 5});
            $("#workTime").focus();
            return false;
        }

        if (getcashAddress.length > 30) {
            layer.msg('兑奖地址不能超过30个汉字!', {icon: 5});
            $("#getcashAddress").focus();
            return false;
        }

        if (usefulPersons.length > 8) {
            layer.msg('适用人群不能超过8个汉字!', {icon: 5});
            $("#usefulPersons").focus();
            return false;
        }

        if (isNaN(helpCount)) {
            layer.msg('帮忙人数请输入数字!', {icon: 5});
            $("#helpCount").focus();
            return false;
        }

        var eachFlag = true;
        $('input[name="userfulRange"]').each(function () { //批次名额
            if ($(this).val().length > 10) {
                layer.msg('适用范围不能超过10个汉字!', {icon: 5});
                eachFlag = false;
                return false;
            }
        });

        if (!eachFlag) {
            return eachFlag;
        }
    }

    var wardNameList = $('input[name="wardName"]').map(function () {
        return this.value
    }).get();
    var quantityList = $('input[name="quantity"]').map(function () {
        return this.value
    }).get();
    var weightList = $('input[name="weight"]').map(function () {
        return this.value
    }).get();
    var userfulRangeList = $('input[name="userfulRange"]').map(function () {
        return this.value
    }).get();
    var hidden4List = $('input[name="hidden4"]').map(function () {
        return this.value
    }).get();
    var wardSelect = $('select[name="select_id"]').map(function () {
        return this.value
    }).get();

    if (step == 4 && isEmpty) {

        if (olderRule <= 0) {
            layer.msg('老生抽奖规则不能为空', {icon: 5});
            $("#olderRule").focus();
            return false;
        }

        if (newDefine.length <= 0) {
            layer.msg('新生定义不能为空', {icon: 5});
            $("#newDefine").focus();
            return false;
        }

        if (oldDefine.length <= 0) {
            layer.msg('老生定义不能为空', {icon: 5});
            $("#oldDefine").focus();
            return false;
        }

        if (contactNumber.length <= 0) {
            layer.msg('兑奖联系方式不能为空', {icon: 5});
            $("#contactNumber").focus();
            return false;
        }

        if (workTime.length <= 0) {
            layer.msg('工作时间不能为空', {icon: 5});
            $("#workTime").focus();
            return false;
        }

        if (getcashAddress.length <= 0) {
            layer.msg('兑奖地址不能为空', {icon: 5});
            $("#getcashAddress").focus();
            return false;
        }

        if (usefulPersons.length <= 0) {
            layer.msg('适用人群不能为空', {icon: 5});
            $("#usefulPersons").focus();
            return false;
        }

        if (overTime.length <= 0) {
            layer.msg('兑奖截止日期不能为空', {icon: 5});
            $("#overTime").focus();
            return false;
        }

        var overTime1 = new Date((overTime).replace(/-/g, "/"));
        if (overTime1 < date) {
            layer.msg('兑奖截止日期不能小于当前时间', {icon: 5});
            return false;
        }

        if (helpCount.length <= 0) {
            layer.msg('帮忙人数不能为空', {icon: 5});
            $("#helpCount").focus();
            return false;
        }

        if (!/^[1-9]\d*$/.test(helpCount)) {
            layer.msg('帮忙人数请输入正整数', {icon: 5});
            $("#helpCount").focus();
            return false;
        }

        if (wardNameList.length <= 0) {
            layer.msg('奖品不能为空', {icon: 5});
            return false;
        }

        var wardSelectName = wardSelect.join(",") + ",";
        for (var i = 0; i < wardSelect.length; i++) {
            if (wardSelectName.replace(wardSelect[i] + ",", "").indexOf(wardSelect[i] + ",") > -1) {
                layer.msg("奖品等级重复,请重新选择");
                return false;
            }
            var wardName = wardNameList[i];
            var quantity = quantityList[i];
            var weight = weightList[i];
            var userfulRange = userfulRangeList[i];
            var hidden4 = hidden4List[i];

            if (wardName.length <= 0) {
                layer.msg('奖品名称不能为空', {icon: 5});
                return false;
            }

            if (quantity == 0) {
                layer.msg('奖品数量不能为0!');
                return false;
            }

            if (!/^[1-9]\d*$/.test(quantity)) {
                layer.msg('奖品数量请输入正整数', {icon: 5});
                return false;
            }

            if (weight.length <= 0) {
                layer.msg('中奖权重不能为空', {icon: 5});
                return false;
            }

            if (!/^[1-9]\d*$/.test(weight)) {
                layer.msg('中奖权重请输入正整数', {icon: 5});
                return false;
            }

            if (userfulRange.length <= 0) {
                layer.msg('适用范围不能为空', {icon: 5});
                return false;
            }

            if (hidden4.length <= 0) {
                layer.msg('请上传奖品图片', {icon: 5});
                return false;
            }

        }
    }

    return true;
}

var classValidateNumByChange = false;

var isClassNum = true;
//校验班级编号
function classValidateNum(type) {
    if (type == 1) {
        classValidateNumByChange = true;
    } else if (type == 2 && classValidateNumByChange) {
        classValidateNumByChange = false;
        return;
    }
    var classCode = $.trim($("#classNum").val());

    var schoolId = $("#schoolId").val();//sessionStorage.getItem("currentCityId")//
    var access_token = getCookie("access_token");
    var time = getCurrentDate(new Date(), "yyyy-MM-dd hh:mm:ss");
    var businessP = "access_token=" + access_token + "&timestamp=" + encodeURI(time) + "&schoolId=" + schoolId + "&classCode=" + classCode;
    var param = constructionParams(rsaEncryptedString(businessP), "96d35fff0f7c46f8afa90430cb7d4fa9");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(param),
        success: function (json) {
            if (json.Status == 1) {
                var jsonData = json.ResponseData;
                if (!jsonData.Name) {
                    layer.msg('您查询的班号不存在，或与您所在地区不匹配，请重新查询！！', {icon: 5});
                    isClassNum = false;
                    return;
                }
                $("#classInfo-div").css("display", "block");
                $("#ckName").val(jsonData.Name);
                $("#className").val(jsonData.Name);
                updateSpan("ckName", "explainInformCnt1", 12);
                courseAmount = jsonData.Fees;
                $("#courseAmount-div").html("课程金额:¥" + courseAmount);//课程费用
                var learnTime = jsonData.LearnTime;
                var startDate = jsonData.StartDate;
                var endDate = jsonData.EndDate;
                startDate = startDate.substr(0, 10);
                endDate = endDate.substr(0, 10);
                $("#learnTime-div").html("上课时间:" + startDate + "~" + endDate + ", " + learnTime);
                $("#classDate").val(startDate + "~" + endDate);//上课开始时间+上课结束时间
                $("#classTime").val(learnTime);//上课时间
                $("#courseAmount").val(courseAmount);//课程金额
                isClassNum = true;
                queryAreaInfo(jsonData.AreaCode, jsonData.CityId);
            } else {
                layer.msg("获取班级信息失败,请联系管理员,稍后再试!", {icon: 5});
            }
            classValidateNumByChange = false;
        }
    });
}

//查询校区经纬度
function queryAreaInfo(areaCode, cityId) {
    var access_token = getCookie("access_token");
    var time = getCurrentDate(new Date(), "yyyy-MM-dd hh:mm:ss");
    var businessP = "access_token=" + access_token + "&timestamp=" + encodeURI(time) + "&cityId=" + cityId + "&areaCode=" + areaCode;
    var param = constructionParams(rsaEncryptedString(businessP), "b9450fd137984dbcb7b1a2080a50872b");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(param),
        success: function (json) {
            if (json.Status == 1) {
                var areaName = json.ResponseData.Name;
                if (areaName == null) {
                    areaName = "";
                }
                $("#classArea").val(areaName);//校区名称
                $("#latitude").val(json.ResponseData.Latitude);//纬度
                $("#longitude").val(json.ResponseData.Longitude);//经度
                $("#learnPlace-div").html("参与校区:" + areaName);
            } else {
                layer.msg("获取校区信息失败,请联系管理员,稍后再试!", {icon: 5})
            }
        }
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

function updateSpan(inputId, spanId, validLength) {
    inputId = "#" + inputId;
    spanId = "#" + spanId;
    var currentLength = $(inputId).val().length;

    $(spanId).text(currentLength);

    if (currentLength > validLength) {
        $(spanId).css("color", "red");
    } else {
        $(spanId).css("color", "#D7D7D7");
    }
}


$(function () {
	$('#helpWealSwitch').click(function(){
		if($(this).prop('checked'))$('#helpBatchDiv').show();
		else $('#helpBatchDiv').hide();
	});
    lengthValidate("ckName", "explainInformCnt1", 12);
    lengthValidate("className","explainInformCnt03",20);
    lengthValidate("usefulPerson", "explainInformCnt3", 15);
    lengthValidate("raiseMoney", "explainInformCnt5", 15);
    lengthValidate("service", "explainServiceCntMin", 15);
    lengthValidate("ckIntroduce", "explainInformCnt7", 200);
    lengthValidate("ruleIntroduce", "explainInformCnt9", 300);
    lengthValidate("address", "explainaddressMinCnt", 30);
    lengthValidate("courseName", "explainInformCnt6", 30);
    lengthValidate("courseReady", "explainInformCnt2", 20);
    lengthValidate("courseIntroduce", "explainInformCnt4", 100);
    lengthValidate("olderRule", "explainInformCnt29", 300);
    lengthValidate("newDefine", "explainInformCnt34", 20);
    lengthValidate("oldDefine", "explainInformCnt", 20);
    lengthValidate("contactNumber", "explainContactCnt", 15);
    lengthValidate("workTime", "explainWorkCnt", 20);
    lengthValidate("getcashAddress", "explainInformCnt1112", 30);
    lengthValidate("usefulPersons", "explainInformCnt3114", 8);
    lengthValidate("applyRange-0", "explainContactCnt400", 10);
    lengthValidate("wealName", "explainWealNameMinCnt", 12);
    lengthValidate("wealRemark", "explainWealRemarkMinCnt",20);
    lengthValidate("wealBootIntro", "explainWealBootCnt",200);
    lengthValidate("wealIntroduce", "explainWealIntroduceCnt", 200);


});

function next(step, isEmpty) {
    if (validate(step, isEmpty)) {
        cPage = step + 1;
        $("#first").hide();
        //$("#centerIframeId", parent.document).css("height", "900px");
        $("#second").show();
        $("#third").hide();
        $("#fourth").hide();
    }
}

function nextSecond(step, isEmpty) {
    if (validate(step, isEmpty)) {
        cPage = step + 1;
        $("#first").hide();
        $("#second").hide();
        //$("#centerIframeId", parent.document).css("height", "700px");
        $("#third").show();
        $("#fourth").hide();
    }
}

function nextThird(step, isEmpty) {
    if (validate(step, isEmpty)) {
        cPage = step + 1;
        $("#first").hide();
        $("#second").hide();
        $("#third").hide();
        //$("#centerIframeId", parent.document).css("height", "1200px");
        $("#fourth").show();
        initNavigationBar();
    }
}

function previous(step) {
    if (step == 2) {
        $("#first").show();
        $("#second").hide();
        //$("#centerIframeId", parent.document).css("height", "800px");
        $("#third").hide();
        $("#fourth").hide();
    } else if (step == 3) {
        $("#first").hide();
        //$("#centerIframeId", parent.document).css("height", "900px");
        $("#second").show();
        $("#third").hide();
        $("#fourth").hide();
    } else if (step == 4) {
        $("#first").hide();
        $("#second").hide();
        //$("#centerIframeId", parent.document).css("height", "700px");
        $("#third").show();
        $("#fourth").hide();
    }
    cPage = step - 1;
}

function save(step, isEmpty) {
    layer.load(2);
    if ($('#ckId').val()) {
        layer.msg("已经保存,不能重复保存", {icon: 5});
        $('.disableCss').removeAttr('onclick');
        return;
    }
    if (!validate(step, isEmpty)) {
        layer.closeAll('loading');
        return;
    }
    //第一阶段
    var userId = $("#userId", window.parent.document).val();
    var classNum = $("#classNum").val();//班级编号
    var ckName = $("#ckName").val();//筹课名称
    var usefulPerson = $("#usefulPerson").val();//适用人群
    //var courseAmount=$("#courseAmount").val();//课程金额
    var ckIntroduce = $("#ckIntroduce").val();//筹课说明
    var latitude = $("#latitude").val();//纬度
    var longitude = $("#longitude").val();//经度
    var schoolId = $("#schoolId").val();
    var areaCode = $("#areaCode").val();
    var deptCode = $("#deptCode").val();
    var classDate = $("#classDate").val();
    var classTime = $("#classTime").val();
    var classArea = $("#classArea").val();
    var service = $("#service").val();//官方客服
    //var careType= $("#careType").combotree('getValue');//类别
    var file1 = $("#hidden1").val();//筹课配图
    var file2 = $("#hidden2").val();//微信转发小图尺寸
    var file3 = $("#hidden3").val();//公众号二维码
    var gzhname = $("#gzhname").val();//公众号名称

    //第二阶段
    var startTime = $("#startDate").val() + ' ' + $("#startTime").val();//开始时间
    var endTime = $("#endDate").val() + ' ' + $("#endTime").val();//结束时间
    var ruleIntroduce = $("#ruleIntroduce").val();//规则说明
    var address = $("#address").val();//兑课地址
    var phoneNum = $("#phoneNum").val();//兑课电话
    var effect = $("#effect").val();//兑课有效期

    var count = [];//第一批名额
    var perNum = [];//帮筹人数
    $('input[name="count"]').each(function () { //批次名额
        count.push($(this).val())
    });
    $('input[name="perNum"]').each(function () { //批次名额
        perNum.push($(this).val())
    });
    //第三阶段
    var courseName = $("#courseName").val();//课程名称
    var courseReady = $("#courseReady").val();//课程备课
    var courseIntroduce = $("#courseIntroduce").val();//课程说明
    //第四阶段
    var olderRule = $("#olderRule").val();//老生抽奖规则
    var newDefine = $("#newDefine").val();//新生定义
    var oldDefine = $("#oldDefine").val();//老生定义
    var contactNumber = $("#contactNumber").val();//兑奖联系方式
    var workTime = $("#workTime").val();//工作时间
    var getcashAddress = $("#getcashAddress").val();//兑奖地址
    var usefulPersons = $("#usefulPersons").val();//适用人群
    var overTime = $("#overTime").val();//兑奖截止日期
    var helpCount = $("#helpCount").val();//帮忙人数

    var ward = [];//奖项-----------------
    $('select[name="select_id"]').each(function () { //批次名额
        ward.push($(this).val())
    });
    var degreeName = [];//奖项名称
    $('select[name="select_id"]').find("option:selected").each(function () { //奖项名称
        degreeName.push($(this).text())
    });
    var wardName = [];//奖品名称
    $('input[name="wardName"]').each(function () { //批次名额
        wardName.push($(this).val())
    });
    var number = [];//数量-------------
    $('input[name="quantity"]').each(function () { //批次名额
        number.push($(this).val())
    });
    var weight = [];//中奖权重------------------
    $('input[name="weight"]').each(function () { //批次名额
        weight.push($(this).val())
    });
    var userfulRange = [];//适用范围
    $('input[name="userfulRange"]').each(function () { //批次名额
        userfulRange.push($(this).val())
    });
    var file4 = [];//奖品图片
    $('input[name="hidden4"]').each(function () { //批次名额
        file4.push($(this).val())
    });

    var businessP = {
        "areaCode": areaCode,
        "degreeName": degreeName.join('=='),
        "latitude": latitude,
        "longitude": longitude,
        "schoolId": schoolId,
        "deptCode": deptCode,
        "classDate": classDate,
        "classTime": classTime,
        "classArea": classArea, /*"careType":careType,*/
        "userId": userId,
        "classNum": classNum,
        "ckName": ckName,
        "usefulPerson": usefulPerson,
        "courseAmount": courseAmount,
        "ckIntroduce": ckIntroduce,
        "service": service,
        "file1": file1,
        "file2": file2,
        "file3": file3,
        "gzhname": gzhname,
        "startTime": startTime,
        "endTime": endTime,
        "ruleIntroduce": ruleIntroduce,
        "address": address,
        "phoneNum": phoneNum,
        "effect": effect,
        "count": count.join('=='),
        "perNum": perNum.join('=='),
        "courseName": courseName,
        "courseReady": courseReady,
        "courseIntroduce": courseIntroduce,
        "olderRule": olderRule,
        "newDefine": newDefine,
        "oldDefine": oldDefine,
        "contactNumber": contactNumber,
        "workTime": workTime,
        "getcashAddress": getcashAddress,
        "usefulPersons": usefulPersons,
        "overTime": overTime,
        "helpCount": helpCount,
        "ward": ward.join('=='),
        "wardName": wardName.join('=='),
        "number": number.join('=='),
        "weight": weight.join('=='),
        "userfulRange": userfulRange.join('=='),
        "file4": file4.join('==')
    };
    $('.disableCss').removeAttr('onclick');
    var d = constructionParams(businessP, "c4248b1e72c44b4ebb2bf51842292ace",1);
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                layer.msg("保存成功!", {icon: 6});
                changeCenter("/chouke/index?type=1");
                //window.location.href = 'updateCourse.html?ckId=' + json.ckId + '&flag=1';
            } else {
                layer.msg("保存失败!", {icon: 5});
                layer.closeAll('loading');
            }
        }
    });
}


function saveNewCk(step, isEmpty){
    /*if ($('#ckId').val()) {
        layer.msg("已经保存,不能重复保存", {icon: 5});
        $('.disableCss').removeAttr('onclick');
        layer.closeAll('loading');
        return;
    }*/
    if (!validate(step, isEmpty)) {
        layer.closeAll('loading');
        return;
    }
    saveOrUpdate(0,"3b84d5938ce74d16859bb4239924188d");
}

function saveEditNewCk(step, isEmpty, status){
    if (!validate(step, isEmpty)) {
        layer.closeAll('loading');
        return;
    }
    if(status == ''){
        status = $("#statusId").val();
    }
    saveOrUpdate(status,"d8b90e8e110f4ed1926872e89dc8f55a");
}


//保存新筹课
function saveOrUpdate(status,serviceId){
    //第一阶段
    var userId = $("#userId", window.parent.document).val();
    var classNum = $("#classNum").val();//班级编号
    var ckName = $("#ckName").val();//筹课名称
    var className = $("#className").val();//班级名称
    var usefulPerson = $("#usefulPerson").val();//适用人群
    var courseAmount=$("#courseAmount").val();//课程金额
    var raiseMoney = $("#raiseMoney").val();//需筹金额
    var ckIntroduce = $("#ckIntroduce").val();//筹课说明
    var latitude = $("#latitude").val();//纬度
    var longitude = $("#longitude").val();//经度
    var schoolId = $("#schoolId").val();
    var areaCode = $("#areaCode").val();
    var deptCode = $("#deptCode").val();
    var classDate = $("#classDate").val();
    var classTime = $("#classTime").val();
    var classArea = $("#classArea").val();
    var service = $("#service").val();//官方客服
    var file1 = $("#hidden1").val();//筹课配图
    var file2 = $("#hidden2").val();//微信转发小图尺寸
    var file3 = $("#hidden3").val();//公众号二维码
    var gzhname = $("#gzhname").val();//公众号名称

    //第二阶段
    var startTime = $("#startDate").val() + ' ' + $("#startTime").val();//开始时间
    var endTime = $("#endDate").val() + ' ' + $("#endTime").val();//结束时间
    var ruleIntroduce = $("#ruleIntroduce").val();//规则说明
    var address = $("#address").val();//兑课地址
    var phoneNum = $("#phoneNum").val();//兑课电话
    var effect = $("#effect").val();//兑课有效期

    var ckId = $("#ckId").val();//筹课id
    var count = [];//批次名额
    var perNum = [];//帮筹人数
    $('input[name="count"]').each(function () { //批次名额
        count.push($(this).val())
    });
    $('input[name="perNum"]').each(function () { //批次名额
        perNum.push($(this).val())
    });
	var hbs = $('#helpWealSwitch').prop('checked')?1:0;
	var wealName = '';
	var wealRemark = '';
	var wealBootIntro = '';
	var wealIntroduce = '';
	if(hbs){
		wealName = $('#wealName').val();
		wealRemark = $('#wealRemark').val();
		wealBootIntro = $('#wealBootIntro').val();
		wealIntroduce = $('#wealIntroduce').val();
	}
    var businessP = {
        "ckId": ckId,
        "status": status,
        "areaCode": areaCode,
        "latitude": latitude,
        "longitude": longitude,
        "schoolId": schoolId,
        "deptCode": deptCode,
        "className": className,
        "classDate": classDate,
        "classTime": classTime,
        "classArea": classArea,
        "userId": userId,
        "classNum": classNum,
        "ckName": ckName,
        "usefulPerson": usefulPerson,
        "courseAmount": courseAmount,
        "raiseMoney": raiseMoney,
        "ckIntroduce": ckIntroduce,
        "service": service,
        "file1": file1,
        "file2": file2,
        "file3": file3,
        "gzhname": gzhname,
        "startTime": startTime,
        "endTime": endTime,
        "ruleIntroduce": ruleIntroduce,
        "address": address,
        "phoneNum": phoneNum,
        "effect": effect,
        "count": count.join('=='),
        "perNum": perNum.join('=='),
        'hbs':hbs,
        'wealName':wealName,
        'wealRemark':wealRemark,
        'wealBootIntro':wealBootIntro,
        'wealIntroduce':wealIntroduce
    };
    console.log(businessP);
    $('.disableCss').removeAttr('onclick');
    var d = constructionParams(businessP, serviceId,1);
    //console.log(JSON.stringify(d));
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                if(status == 0){
                    layer.msg(json.message, {icon: 6});
                }else if(status == 1){
                    layer.msg(json.message, {icon: 6});
                }
                //window.location.href = 'updateCourse.html?ckId=' + json.ckId + '&flag=1';
                layer.closeAll('loading');
                changeCenter("/chouke/index?type=2");
            } else {
                if (status == 0) {
                    layer.msg(json.message, {icon: 5});
                } else if (status == 1) {
                    layer.msg(json.message, {icon: 5});
                }
            }
        }
    });

}

function numDec(_this) {
    var quantity = $(_this).next().val();
    var num_dec = parseInt(quantity) - 1;
    if (num_dec >= 0) {
        $(_this).next().val(num_dec);
    }
}

function numAdd(_this) {
    var quantity = $(_this).prev().val();
    var num_add = parseInt(quantity) + 1;
    if (quantity == "") {
        num_add = 1;
    }
    $(_this).prev().val(num_add);
}

function addBatch() {
    var batchNum = parseInt($("#batchNum").val());
    if (batchNum > 2) {
        return;
    }
    $("#batchNum").val(parseInt($("#batchNum").val()) + 1);
    $("#batchId").append('<div class="p176-setInfoCon clearfix">' +
        '    <div class="p176-count-wrap clearfix">' +
        '    <div class="p176-countBox">' +
        '    <div class="p176-label-b" style="margin-left:0;">第' + $("#batchNum").val() + '批名额</div>' +
        '    <div class="p176-filed-b">' +
        '    <input name="count" type="text" class="p176-Cinput">' +
        '    </div>' +
        '    <div class="p176-label-b">帮筹人数</div>' +
        '    <div class="p176-filed-b">' +
        '    <input name="perNum" type="text" class="p176-Cinput">' +
        '    </div>' +
        '    </div>' +
        '    <i class="p176-close" onclick="delBacth(this)"></i>' +
        '    </div>' +
        '    </div>');
}

function delBacth(_this) {
    var batchNum = parseInt($("#batchNum").val());
    if (batchNum == 1) {
        return;
    }
    $("#batchNum").val(batchNum - 1);
    $(_this.parentNode.parentNode).remove();
}

function addJackPot() {
    var index = $("#potId").find("tr").length;
    if (index < 4) {
        $("#potId").append('<tr>' +
            '<td>' +
            '<select name="select_id" class="p176-Nselect" style="width:80%">' +
            '   <option value="1">一等奖</option>' +
            '   <option value="2">二等奖</option>' +
            '   <option value="3">三等奖</option>' +
            '   <option value="4">四等奖</option>' +
            '   </select>' +
            '   </td>' +
            '   <td>' +
            '   <input name="wardName" type="text" class="p176-name-input" style="width:80%">' +
            '   </td>' +
            '   <td>' +
            '   <div class="p176-numBox clearfix" style="width:72%">' +
            '   <span class="p176-jian" onclick="numDec(this)"></span>' +
            '   <input name="quantity" type="text" class="p176-num-input"  value="0">' +

            '   <span class="p176-jia" onclick="numAdd(this)"></span>' +
            '   </div>' +
            '   </td>' +
            '   <td>' +
            '   <input name="weight" type="text" class="p176-Spinput" style="width:80%">' +
            '   </td>' +
            '   <td>' +
            '   <div class="p176-Sfiled p176-SfiledWidth" style="margin-left:0;">' +
            '   <input name="userfulRange" type="text" class="p176-Spinput" style="padding-right:40px;width:108px;" id="applyRange-' + index + '">' +
            '   <span class="p176-count01" style="bottom:0;"><span id="explainContactCnt40' + index + '">0</span>/<span>10</span></span>' +
            '   </div>' +
            '   </td>' +
            '   <td>' +
            '   <form action="'+Global.baseUploadPath+'/chouke/uploadfile" method="post" enctype="multipart/form-data"' +
            ' style="width:100%">' +
            '    <div class="uploader white" style="top:8px;">' +
            '    <input type="text" class="filename" value="请选择图片..."/>' +
            '    <input name="first4"  type="file" class="p176-uplodingBtn" style="width:100px;" />' +
            '    <input type="hidden" name="hidden4">' +
            '    </div>' +
            '    <div style="float:right;margin: 14px 0px;"><input type="button" onclick="upload(this)" name="file" class="p176-uplodingBtn" value="上传" name="up4" />' +
            '    </div>' +
            '    </form>' +
            '    </td>' +
            '    <td><i class="p176-close" onclick="delPot(this)"></i></td>' +
            '    </tr>');
        $("input[type=file]").change(function () {
            $(this).parents(".uploader").find(".filename").val($(this).val());
        });

        lengthValidate("applyRange-" + index, "explainContactCnt40" + index, 10);
    } else {
        layer.msg("最多添加4个奖品!", {icon: 5})
    }
}

function delPot(_this) {
    $(_this.parentNode.parentNode).remove();
}


var isEditPublish = false;

//新筹课页面内发布
function newCkEditPublish(type) {
    layer.confirm("确认发布？", {
        btn: ['发布', '取消'] //按钮
    }, function () {
        if (type == 2) {
            publishCk(type, 'new', 'c42d27bb48be4fcba9832338dab2f2c9');
        } else {
            publishCk(type, 'new', 'c42d27bb48be4fcba9832338dab2f2c9');
        }
    }, function () {

    });
}

//老筹课页面内发布
function ckEditPublish(type) {
    layer.confirm("确认发布？", {
        btn: ['发布', '取消'] //按钮
    }, function () {
        if (type == 2) {
            publishCk(type, 'old', '8db31205cb6141219b6d4917729d6b16');
        } else {
            publishCk(type, 'old', '8db31205cb6141219b6d4917729d6b16');
        }
    }, function () {

    });
}

//发布按钮的保存发布逻辑
function publishCk(type,flag,serviceId){
    var status = $("#statusId").val();//筹课状态
    if(status == '1'){
        layer.msg("已经发布了,请不要重复发布!", {icon: 5});
        $('.disableCss').removeAttr('onclick');
        return;
    }
    //type= 1编辑页面   type=2  新建页面
    layer.load(2, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });//遮罩加载
    if (flag == "old") {
        if (!validate(4, true)) {
            layer.closeAll('loading');
            return
        }
    } else {
        if (!validate(2, true)) {
            layer.closeAll('loading');
            return
        }
    }

    if (status == '0' || status == '') {
        status = '1';//未开始（发布的意思）
    }
    if (flag == "old") {
        saveEdit(4, true, status);
    } else {
        saveEditNewCk(2, true, status);
    }
    /*
    if ($('#ckId').val()) {
        if ($('#statusId').val() == 0) {
            var userId = getCookie("loginId");
            var businessP = {"ckId": $('#ckId').val(), "userId": userId};
            var d = constructionParams(rsaEncryptedString(businessP), serviceId);
            jQuery.ajax({
                type: "POST",
                url: Global.actionURL,
                async: false,//同步
                dataType: 'json',
                data: JSON.stringify(d),
                success: function (json) {
                    layer.closeAll('loading');
                    if (json.result == true) {
                        layer.msg(json.message, {icon: 6});
                        $('#statusId').val(1);
                        if(flag == 'old'){
                            flag = 1;
                        }else if(flag == 'new'){
                            flag = 2
                        }
                        setTimeout(function () {
                            changeCenter("./ckMain.html?type="+flag);
                        }, 2000);
                        //$(window.parent.document).find("#centerIframeId").attr("src", './ck/ckMain.html');
                    } else {
                        layer.msg(json.message, {icon: 5});
                    }
                }
            });
        } else {
            layer.msg("已经发布了,请不要重复发布!", {icon: 5});
            $('.disableCss').removeAttr('onclick');
        }
    }*/
}



function viewPage(type) {
    if ($('#ckId').val()) {
        var previewURL = '';
        if(type == 1){//老筹课
            previewURL = Global.previewURL;
        }else if(type == 2) {//新筹课
            previewURL = Global.previewURL_new
        }
        layer.open({
            type: 2,
            title: '预览',
            fix: false,
            shadeClose: true,
            offset: '50px',
            maxmin: true,
            area: ['414px', '736px'],
            content: previewURL + $('#ckId').val()
        });
    } else {
        layer.msg("请先保存信息,再预览!", {icon: 5})
    }
}

function saveEdit(step, isEmpty, statusvalue) {
    layer.load(2,{
        shade: [0.1,'#fff'] //0.1透明度的白色背景
    });//遮罩加载
    if (!validate(step, isEmpty)) {
        layer.closeAll('loading');
        return;
    }
    if(statusvalue == '' || statusvalue == undefined){
        statusvalue = $("#statusId").val();
    }
    //第一阶段
    var ckId = $("#ckId").val();
    var userId = $("#userId", window.parent.document).val();
    var classNum = $("#classNum").val();//班级编号
    var ckName = $("#ckName").val();//筹课名称
    var usefulPerson = $("#usefulPerson").val();//适用人群
    //var courseAmount=$("#courseAmount").val();//课程金额
    var ckIntroduce = $("#ckIntroduce").val();//筹课说明
    var schoolId = $("#schoolId").val();
    var areaCode = $("#areaCode").val();
    var deptCode = $("#deptCode").val();
    var classDate = $("#classDate").val();
    var classTime = $("#classTime").val();
    var classArea = $("#classArea").val();
    var service = $("#service").val();//官方客服
    //var careType= $("#careType").combotree('getValue');//类别
    var file1 = $("#hidden1").val();//筹课配图
    var file2 = $("#hidden2").val();//微信转发小图尺寸
    var file3 = $("#hidden3").val();//公众号二维码
    var gzhname = $("#gzhname").val();//公众号名称

    //第二阶段
    var startTime = $("#startDate").val() + ' ' + $("#startTime").val();//开始时间
    var endTime = $("#endDate").val() + ' ' + $("#endTime").val();//结束时间
    var ruleIntroduce = $("#ruleIntroduce").val();//规则说明
    var address = $("#address").val();//兑课地址
    var phoneNum = $("#phoneNum").val();//兑课电话
    var effect = $("#effect").val();//兑课有效期

    var count = [];//第一批名额
    var perNum = [];//帮筹人数
    $('input[name="count"]').each(function () { //批次名额
        count.push($(this).val())
    });
    $('input[name="perNum"]').each(function () { //批次名额
        perNum.push($(this).val())
    });
    //第三阶段
    var courseName = $("#courseName").val();//课程名称
    var courseReady = $("#courseReady").val();//课程备注
    var courseIntroduce = $("#courseIntroduce").val();//课程说明
    //第四阶段
    var olderRule = $("#olderRule").val();//老生抽奖规则
    var newDefine = $("#newDefine").val();//新生定义
    var oldDefine = $("#oldDefine").val();//老生定义
    var contactNumber = $("#contactNumber").val();//兑奖联系方式
    var workTime = $("#workTime").val();//工作时间
    var getcashAddress = $("#getcashAddress").val();//兑奖地址
    var usefulPersons = $("#usefulPersons").val();//适用人群
    var overTime = $("#overTime").val();//兑奖截止日期
    var helpCount = $("#helpCount").val();//帮忙人数

    var ward = [];//奖项-----------------
    $('select[name="select_id"]').each(function () { //批次名额
        ward.push($(this).val())
    });
    var degreeName = [];//奖项名称
    $('select[name="select_id"]').find("option:selected").each(function () { //奖项名称
        degreeName.push($(this).text())
    });
    var wardName = [];//奖品名称
    $('input[name="wardName"]').each(function () { //批次名额
        wardName.push($(this).val())
    });
    var number = [];//数量-------------
    $('input[name="quantity"]').each(function () { //批次名额
        number.push($(this).val())
    });
    var weight = [];//中奖权重------------------
    $('input[name="weight"]').each(function () { //批次名额
        weight.push($(this).val())
    });
    var userfulRange = [];//适用范围
    $('input[name="userfulRange"]').each(function () { //批次名额
        userfulRange.push($(this).val())
    });
    var file4 = [];//奖品图片
    $('input[name="hidden4"]').each(function () { //批次名额
        file4.push($(this).val())
    });

    var businessP = {
        "areaCode": areaCode,
        "degreeName": degreeName.join('=='),
        "ckId": ckId,
        "status": statusvalue,
        "schoolId": schoolId,
        "deptCode": deptCode,
        "classDate": classDate,
        "classTime": classTime,
        "classArea": classArea, /*"careType":careType,*/
        "userId": userId,
        "classNum": classNum,
        "ckName": ckName,
        "usefulPerson": usefulPerson,
        "courseAmount": courseAmount,
        "ckIntroduce": ckIntroduce,
        "service": service,
        "file1": file1,
        "file2": file2,
        "file3": file3,
        "gzhname": gzhname,
        "startTime": startTime,
        "endTime": endTime,
        "ruleIntroduce": ruleIntroduce,
        "address": address,
        "phoneNum": phoneNum,
        "effect": effect,
        "count": count.join('=='),
        "perNum": perNum.join('=='),
        "courseName": courseName,
        "courseReady": courseReady,
        "courseIntroduce": courseIntroduce,
        "olderRule": olderRule,
        "newDefine": newDefine,
        "oldDefine": oldDefine,
        "contactNumber": contactNumber,
        "workTime": workTime,
        "getcashAddress": getcashAddress,
        "usefulPersons": usefulPersons,
        "overTime": overTime,
        "helpCount": helpCount,
        "ward": ward.join('=='),
        "wardName": wardName.join('=='),
        "number": number.join('=='),
        "weight": weight.join('=='),
        "userfulRange": userfulRange.join('=='),
        "file4": file4.join('==')
    };
    //console.log(businessP);
    var d = constructionParams(businessP, "8bd6b2bb821b41a4b535ea63b5ab7622",1);
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                $('#statusId').val(0);
                if (isEditPublish) {
                    isEditPublish = false;
                    layer.closeAll('loading');
                    return;
                }
                if(statusvalue == 0){
                    layer.msg("保存成功!", {icon: 6});
                }else if(statusvalue == 1){
                    layer.msg("发布成功!", {icon: 6})
                }
                //window.location.href = 'updateCourse.html?ckId=' + json.ckId + '&flag=1';
                setTimeout(function(){
                    changeCenter("/chouke/index?type=1");
                },2000);
                //$(window.parent.document).find("#centerIframeId").attr("src", './ck/ckMain.html');
            } else {
                if(statusvalue == 0) {
                    layer.msg("保存失败!", {icon: 5});
                }else if(statusvalue == 1){
                    layer.msg("发布失败!", {icon: 5});
                }
            }
            layer.closeAll('loading');
        }
    });
}


function getHanZiLength(s) {
    var len = 0;
    for (var i = 0; i < s.length; i++) {
        var c = s.substr(i, 1);
        var ts = escape(c);
        if (ts.substring(0, 2) == "%u") {
            len += 2;
        } else {
            len += 1;
        }
    }
    return len;
}
