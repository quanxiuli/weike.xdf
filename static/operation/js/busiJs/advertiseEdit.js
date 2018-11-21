var currentPosition = 1;
var currentCityId = 1;
var flag = "";
var positionArray = ["课程", "热点", "服务"];
$(function () {
    $("form[enctype]").attr("action",Global.baseUploadPath+$("form[enctype]").attr("action"));
    //findArea();
    var request = getRequest();
    if (request["position"]) {
        currentPosition = request["position"];
    }
    if(request["currentCityId"]){
        currentCityId = request["currentCityId"];
    }
    $("#linkId").append('<a href="javascript:;" onclick="changeCenter(\'./advertiseList.html?position='+currentPosition+'\')">广告位 > </a>');
    flag = request["flag"];
    if (flag == "new") {
        $("#titleId").html("新建广告位");
        findArea(currentCityId);
    } else if (flag == "edit") {
        $("#titleId").html("修改广告位");
        var advId = request["id"];
        showInfo(advId);
    }
    var positionHtml = "";
    for(var i = 1; i < positionArray.length + 1; i ++){
        positionHtml += "<option value='" + i + "' " + (currentPosition == i ? "selected='selected'" : "") + ">" + positionArray[i - 1]+ "</option>";
    }
    $('#positionInput').html(positionHtml);
    $('#positionInput').attr("disabled", "disabled");
    if (currentPosition == 3) {
        $("#Cont_1").html("建议图片尺寸750*310");
        $("#heightId").val(310);
    }

    var orderId = 3010001 + currentPosition * 100;
    var functionIds = getCookie("functionIds");
    if (functionIds.length > 0) {
        functionIds = functionIds.split(",");
    }
    var orderHtml = "";
    //var isExist = false;
    if(flag == "new"){
        for (var i = orderId; i < orderId + 4; i++) {
            if (functionIds.length > 0 && $.inArray(i + "", functionIds) >= 0) {
                var index = i - orderId + 1;
                orderHtml += '<option value="' + index + '">' + index + '</option>';
                /* if (!isExist) {
                    isExist = true;
                }*/
            }
        }
        $('#orderInput').html(orderHtml);
    }

    /*
    if (!isExist) {
        $("#saveAndPublish").hide();
    } else {
        $("#saveAndPublish").show();
    }*/

    $("input[type=file]").change(function () {
        $(this).parents(".uploader").find(".filename").val($(this).val());

    });

    $('#first1').change(function () {
        if ($("#first1").val() != null & $("#first1").val() != "") {

            if (!checkImgType($("#first1").val())) {
                layer.msg("广告图片类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
                return false;
            }
            $("#submit-1").ajaxSubmit(function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    $("#imageUrlInput").val(data.fileUrl);
                    $("#ckpt").attr("src", data.fileUrl);
                    $("#m1").html(data.message);
                } else {
                    $("#imageUrlInput").val("");
                    $("#ckpt").attr("src", "");
                    $("#m1").html(data.message);
                }
            });
            return false;
        } else {
            layer.msg("请选择文件", {icon: 5});
        }
    });
});


function findArea(cityId) {
    var loginId = getCookie("loginId");
    var requestJson2 = {
        loginId: loginId
    };
    var d = constructionParams(rsaEncryptedString(requestJson2), "3577775ef8e849d9ab63dad2202584e0");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var str = "";
                var schoolList = json.dataList;
                if(marketJs.loginUserIsAdmin(loginId)){
                    str += "<option value=\"" + -1 + "\" selected='selected'>" + "全国" + "</option>"
                }
                for (var i = 0; i < schoolList.length; i++) {
                    var id = schoolList[i].sCode;
                    var name = schoolList[i].sCity;
                    if(cityId != null && cityId == id){
                        str += "<option value=\"" + id + "\" selected='selected'>" + name + "</option>"
                    }else{
                        str += "<option value=\"" + id + "\">" + name + "</option>"
                    }
                }
                $("#areaIdInput").html(str);
            } else {
                //layer.msg("查询地区失败!", {icon: 5})
            }
        }
    });
}
function showInfo(id) {
    var requestJson = {
        id: id
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "b52074c93ccf4dafafe9fdcc00e53bd5");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var position = json.data.position;
                var orderId = 3010001 + currentPosition * 100;
                var functionIds = getCookie("functionIds");
                if (functionIds.length > 0) {
                    functionIds = functionIds.split(",");
                }
                var orderHtml = "";
                var order = json.data.order;
                //var isExist = false;
                for (var i = orderId; i < orderId + 4; i++) {
                    if (functionIds.length > 0 && $.inArray(i + "", functionIds) >= 0) {
                        var index = i - orderId + 1;
                        if (index == order) {
                            //isExist = true;
                            orderHtml += '<option value="'+ index +'" selected="selected">' + index + '</option>';
                        }else{
                            orderHtml += '<option value="'+ index +'">' + index + '</option>';
                        }
                    }
                }

                $('#orderInput').html(orderHtml);
                $('#nameInput').val(json.data.name);
                $('#positionInput').val(position);
                $('#positionInput').attr("disabled", "disabled");
                //if (isExist) {
                    //$('#orderInput').val(order);
                    //$("#orderInput option[value='" + order + "']").attr("selected", "selected");
                //}
                $('#redirectUrlInput').val(json.data.redirectUrl);
                $('#ckpt').attr('src', json.data.imageUrl);
                $('#imageUrlInput').val(json.data.imageUrl);
                $('#filenameInput').val(json.data.imageUrl);
                $('#advId').val(json.data.id);
                $('#typeInput').val(json.data.type);
                findArea(json.data.cityId);
            } else {
                layer.msg("查询失败!", {icon: 5})
            }
        }
    });
}

//重新加载
function reload() {
    location.reload();
}

//保存数据
function saveAdv(toPublish) {
    if (toPublish) {
        layer.confirm("确认发布？", {
            btn: ['发布', '取消'] //按钮
        }, function () {
            saveOrPublishAdv(toPublish);
        }, function () {

        });
    }else{
        saveOrPublishAdv(toPublish);
    }
}

function saveOrPublishAdv(toPublish){
    layer.load(2);//遮罩加载
    var id = $("#advId").val();//新建保存或发布时，该id是空的
    var nameInput = $("#nameInput").val();
    var positionInput = $("#positionInput").val();
    var orderInput = $("#orderInput").val();
    var redirectUrlInput = $("#redirectUrlInput").val();
    var imageUrlInput = $("#imageUrlInput").val();
    var areaIdInput = $("#areaIdInput").val();
    var typeInput = currentPosition;
    if (nameInput == "") {
        layer.msg("名称不能为空！", {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return;
    }
    if (nameInput.length > 15) {
        layer.msg("名称长度不要超过15！", {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return;
    }
    if (positionInput == "") {
        layer.msg("名称展示位置不能为空！", {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return;
    }
    if (imageUrlInput == "") {
        layer.msg("图片不能为空！", {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return;
    }
    /*
    if (redirectUrlInput == "") {
        layer.msg("关联网址不能为空！", {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return;
    }*/
    //var e = window.event;
    //e.target.disabled = true;
    var loginId = getCookie('loginId');
    var requestJson = {
        id: id,
        name: nameInput,
        position: positionInput,
        order: orderInput,
        imageUrl: imageUrlInput,
        type: typeInput,
        cityId: areaIdInput,
        toPublish: toPublish,
        publisherId: loginId,
        creatorId: loginId,
        redirectUrl: redirectUrlInput
    };
    var serviceId = "";
    var successMsg = "";
    var errorMsg = "";
    if (flag == "new") {
        serviceId = "9e6648efa6eb4e808634002827588ca3";
        successMsg = "保存成功!";
        errorMsg = "保存失败!";
    } else if (flag == "edit") {
        serviceId = "5e07d30cd8ae4ed58d9064b95a634084";
        successMsg = "修改成功!";
        errorMsg = "修改失败!";
    }
    var d = constructionParams(rsaEncryptedString(requestJson), serviceId);
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: 'http://localhost:8080/market/advertise/publishAdvertisement.do',
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        //data: JSON.stringify(requestJson),
        success: function (json) {
            if (json.result == true) {
                layer.msg(successMsg, {icon: 6});
                window.location.href = 'advertiseList.html?position=' + positionInput + "&currentCityId=" + currentCityId;
            } else {
                layer.closeAll('loading');
                layer.msg(errorMsg, {icon: 5});
            }
        }
    });
}


function checkImgType(file) {
    if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|JPEG|PNG|BMP)$/.test(file)) {
        return false;
    }
    return true;
}

function getRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function cancel() {
    window.location.href = "./advertiseList.html?position=" + currentPosition + "&currentCityId="+ currentCityId;
}