/**
 * Created by diwenchao on 2016/7/6.
 */
var flag = "";
var ckId = "";
var ue;
$(function () {

    $("form[enctype]").attr("action",Global.baseUploadPath+$("form[enctype]").attr("action"));
    var request = getRequest();
    flag = request["flag"];
    ckId = request["id"];

    if (flag == "new") {
        $("#eventTitle").html("新建活动");
    } else if (flag == "edit") {
        $("#eventTitle").html("编辑活动");
    }
    $("input[type=file]").change(function () {
        $(this).parents(".uploader").find(".filename").val($(this).val());

    });

    $('#first1').change(function () {
        if ($("#first1").val() != null & $("#first1").val() != "") {
            if (!checkImgType($("#first1").val())) {
                layer.msg("活动图片类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
                return false;
            }
            $("#submit-1").ajaxSubmit(function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    $("#imageUrlInput").val(data.fileUrl);
                    $("#ckpt").attr("src", data.fileUrl);
                    $("#m1").html(data.message);
                } else {
                    $("#m1").html(data.message);
                }
            });
            return false;
        } else {
            layer.msg("请选择文件", {icon: 5});
        }
    });
    //活动名称限定字数
    $('#ckName').keyup(function () {
        var lv = $(this).val().length;
        $('#num-huodong').html(lv);
    }).keyup();
    //活动地点限定字数
    $('#place').keyup(function () {
        var lv = $(this).val().length;
        $('#num-addr').html(lv);
    }).keyup();
    //活动地点限定字数
    $('#fee').keyup(function () {
        var lv = $(this).val().length;
        $('#num-fee').html(lv);
    }).keyup();
    //活动地点限定字数
    $('#contact').keyup(function () {
        var lv = $(this).val().length;
        $('#num-contact').html(lv);
    }).keyup();

    var ue = UE.getEditor('editor');

});

function initInputLength() {
    //活动名称限定字数
    $('#ckName').keyup(function () {
        var lv = $(this).val().length;
        $('#num-huodong').html(lv);
    }).keyup();
    //活动地点限定字数
    $('#place').keyup(function () {
        var lv = $(this).val().length;
        $('#num-addr').html(lv);
    }).keyup();
    //活动地点限定字数
    $('#fee').keyup(function () {
        var lv = $(this).val().length;
        $('#num-fee').html(lv);
    }).keyup();

    //活动地点限定字数
    $('#contact').keyup(function () {
        var lv = $(this).val().length;
        $('#num-contact').html(lv);
    }).keyup();
}

function upload(_this) {
    if ($(_this.parentNode).prev().find('input[name="first4"]').val() != null && $(_this.parentNode).prev().find('input[name="first4"]').val() != "") {

        if (!checkImgType($(_this.parentNode).prev().find('input[name="first4"]').val())) {
            layer.msg("奖品图片类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
            return false;
        }

        $(_this.parentNode.parentNode).ajaxSubmit(function (data) {
            // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
            if (data.success == true) {
                $(_this.parentNode).prev().find('input[name="hidden4"]').val(data.fileUrl);
                layer.msg("上传成功!", {icon: 6});
            } else {
                layer.msg("上传失败!", {icon: 5});
            }
        });
        return false;
    } else {
        layer.msg("请选择文件！", {icon: 5})
    }
}

function initData(){
    if (flag == "new") {
        findCity();
    } else if (flag == "edit") {
        showInfo(ckId);
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

//查询地区
function findCity(cityId) {
    var businessP = {
        loginId: getCookie("loginId")
    };
    var d = constructionParams(rsaEncryptedString(businessP), "3577775ef8e849d9ab63dad2202584e0");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url:'http://localhost:8080/market/constants/getConstants.do',
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var schoolList = json.dataList;
                var str = "";
                if (schoolList.length > 0) {
                    for (var i = 0; i < schoolList.length; i++) {
                        if(cityId){
                            if (schoolList[i].sCode == cityId) {
                                str += "<option selected='selected' value=\"" + schoolList[i].sCode + "\">" + schoolList[i].sCity + "</option>"
                            } else {
                                str += "<option value=\"" + schoolList[i].sCode + "\">" + schoolList[i].sCity + "</option>"
                            }
                        } else {
                            var loginId = getCookie("loginId");
                            if (marketJs.loginUserIsAdmin(loginId) && schoolList[i].sCode == 1) {
                                str += "<option selected='selected' value=\"" + schoolList[i].sCode + "\">" + schoolList[i].sCity + "</option>"
                            } else {
                                str += "<option value=\"" + schoolList[i].sCode + "\">" + schoolList[i].sCity + "</option>"
                            }
                        }
                    }
                }
                $("#area").html(str);
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}

//展示页
function showInfo(id) {
    var businessP = {"hotId": id};
    var d = constructionParams(rsaEncryptedString(businessP), "add0c38add714302a04a26673a240158");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url:'http://localhost:8080/market/hotspotEvent/getHotspotEvent.do',
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var hotspotEvent = json.data;
                $("#ckId").val(hotspotEvent.id);
                $("#ckName").val(hotspotEvent.name);
                $("#fee").val(hotspotEvent.fee);
                var start = hotspotEvent.startTime.split(" ");
                $("#startDate").val(start[0]);//开始时间
                $("#startTime").val(start[1].substr(0, start[1].lastIndexOf(":")));//开始时间
                var end = hotspotEvent.endTime.split(" ");
                $("#endDate").val(end[0]);//结束时间
                $("#endTime").val(end[1].substr(0, end[1].lastIndexOf(":")));//开始时间
                $("#contact").val(hotspotEvent.contact);
                $("#place").val(hotspotEvent.place);
                $("#targetNumber").val(hotspotEvent.targetNumber);

                $("#hidden1").val(hotspotEvent.coverUrl);//活动配图
                $("#imageUrlInput").val(hotspotEvent.coverUrl);//活动配图
                if (hotspotEvent.coverUrl) {
                    $("#ckpt").attr("src", hotspotEvent.coverUrl);
                    $("#filename").val(hotspotEvent.coverUrl);
                }
                if (hotspotEvent.flag == 1) {
                    $("#flag").attr("checked", true);
                }
                if (hotspotEvent.type == 2) {
                    $("input[type=radio][value='2']").attr("checked", true);
                } else {
                    $("input[type=radio][value='1']").attr("checked", true);
                }
                //UE.getEditor('editor').setContent(hotspotEvent.introduction);
                var ueditor = UE.getEditor('editor');
                findCity(hotspotEvent.cityId);
                initInputLength();
                ueditor.ready(function () {
                    ueditor.setContent(hotspotEvent.introduction);
                });
            }
        }
    });
}

function saveEvent(status) {
    if (status == '2') {
        layer.confirm("确认发布？", {
            btn: ['发布', '取消'] //按钮
        }, function () {
            saveOrPublishiEvent(status);
        }, function () {

        });
    } else {
        saveOrPublishiEvent(status);
    }
}

//活动保存
function saveOrPublishiEvent(status) {
    layer.load(2);//遮罩加载
    var loginId = getCookie("loginId");
    var userName = getCookie("userName");
    var cityId = $("#area").find("option:selected").val();
    var ckName = $("#ckName").val();//活动名称
    var fee = $("#fee").val();//活动费用
    var startDate = $("#startDate").val();
    var startTime1 = $("#startTime").val();
    var startTime = startDate + ' ' + startTime1;//开始时间
    var endDate = $("#endDate").val();
    var endTime1 = $("#endTime").val();
    var endTime = endDate + ' ' + endTime1;//结束时间
    var contact = $("#contact").val();//联系方式
    var place = $("#place").val();//活动地点
    var targetNumber = $("#targetNumber").val();//活动人数
    var fullFlag = 1;
    if ($("#flag").is(':checked')) {
        fullFlag = 1;
    } else {
        fullFlag = 2;
    }//活动类型
    var type = 2;

    if ($("input[type=radio][value='2']").is(':checked')) {
        $("input[type=radio][value='1']").removeAttr("checked");
        type = 2;
    }
    if ($("input[type=radio][value='1']").is(':checked')) {
        $("input[type=radio][value='2']").removeAttr("checked");
        type = 1;
    }
    var coverUrl = $("#imageUrlInput").val();//筹课配图
    var introduction = ue.getContent();
    var summary = ue.getContentTxt();//活动结束纯文字内容

    var status = status;

    var ckNameLength = ckName.length;
    if (ckName.length <= 0) {
        layer.msg('活动名称不能为空!', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        $("#ckName").focus();
        return;
    }
    if (ckNameLength > 12) {
        layer.msg('活动名称不能超过12个汉字!', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        $("#ckName").focus();
        return;
    }
    if (fee.length <= 0) {
        layer.msg('活动费用不能为空!', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        $("#fee").focus();
        return;
    }
    if (fee.length > 5) {
        layer.msg('活动费用不能5个字!', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        $("#fee").focus();
        return;
    }

    if (startDate.length <= 0) {
        layer.msg('开始日期不能为空!', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        $("#startDate").focus();
        return;
    }

    if (startTime1.length <= 0) {
        layer.msg('开始时间不能为空!', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        $("#startTime").focus();
        return;
    }

    if (startTime1.length > 0 && !timeValidate(startTime1)) {
        layer.msg('开始时间格式不正确!', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return;
    }

    var startdate1 = new Date((startTime).replace(/-/g, "/"));
    var date = new Date();
    if (startdate1 < date) {
        layer.msg('开始时间不能小于当前时间!', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return;
    }

    if (endDate.length <= 0) {
        layer.msg('结束日期不能为空!', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        $("#endDate").focus();
        return;
    }

    if (endTime1.length <= 0) {
        layer.msg('结束时间不能为空!', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        $("#endTime").focus();
        return;
    }

    if (endTime1.length > 0 && !timeValidate(endTime1)) {
        layer.msg('结束时间格式不正确!', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return;
    }


    var enddate1 = new Date((endTime).replace(/-/g, "/"));
    if (enddate1 < date) {
        layer.msg('结束时间不能小于当前时间', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return;
    }

    if (enddate1 < startdate1) {
        layer.msg('结束时间不能小于开始时间', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return;
    }

    if (contact.length <= 0) {
        layer.msg('联系方式不为能空！', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return;
    }

    if (contact.length > 15) {
        layer.msg('联系方式不能超过15个汉字!', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return;
    }

    if (place.length <= 0) {
        layer.msg('活动地点不能为空!', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return;
    }

    if (place.length > 30) {
        layer.msg('活动地点不能超过30个汉字!', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return;
    }

    if (targetNumber.length <= 0) {
        layer.msg('活动人数不能为空!', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return;
    }

    if (isNaN(targetNumber)) {
        layer.msg('活动人数只能输入数字!', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return;
    }

    if (coverUrl.length <= 0) {
        layer.msg('请上传活动配图!', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return;
    }

    if (summary.length <= 0) {
        layer.msg('活动介绍不能为空!', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return;
    }
    if (summary.length > 1000) {
        layer.msg('活动介绍不能超过1000个汉字!', {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return;
    }

    if (summary != null) {
        summary = summary.substring(0, 250);
    }

    /*
    layer.open({
        type: 3,
        icon: 1,
        shade: 0.2,
        shadeClose: true
    });*/

    var businessP = {
        "id": ckId,
        "userId": loginId,
        "userName": userName,
        "cityId": cityId,
        "name": ckName,
        "fee": fee,
        "startTime": startTime,
        "endTime": endTime,
        "contact": contact,
        "place": place,
        "targetNumber": targetNumber,
        "flag": fullFlag,
        "coverUrl": coverUrl,
        "introduction": introduction,
        "summary": summary,
        "status": status,
        "type": type
    };
    var serviceId = "";
    var successMsg = "";
    var errorMsg = "";
    if (flag == "new") {
        serviceId = "8a012ece2a0646b3ba1aa5837f911be9";
        successMsg = "保存成功!";
        errorMsg = "保存失败!";
    } else if (flag == "edit") {
        serviceId = "00d9946561e24dfb93ab9252ab9e5cef";
        successMsg = "更新成功!";
        errorMsg = "更新失败!";
    }
    var d = constructionParams(rsaEncryptedString(businessP), serviceId);
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            //layer.close(iilayer);
            if (json.result == true) {
                layer.msg(successMsg, {icon: 6, time: 3000, offset: '300px'}, function () {
                    if (status == 2) {
                        window.location.href = 'hotspotEventLists.html';
                    } else {
                        window.location.href = 'hotspotEventEdit.html?flag=edit&id=' + json.id;
                    }
                });
            } else {
                layer.closeAll('loading');
                layer.msg(errorMsg, {icon: 5, time: 3000, offset: '300px'});
            }
        }
    });
}

function cancel() {
    window.location.href = 'hotspotEventLists.html';
}

function previewPage(){
    if(ckId){
        window.open('../../view/page/activity.html?id=' + ckId)
    } else {
        layer.msg("保存成功后才可预览!", {icon: 5});
    }
}
