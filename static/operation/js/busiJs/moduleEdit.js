var id='';
var flag;
$(function () {
    $("form[enctype]").attr("action",Global.baseUploadPath+$("form[enctype]").attr("action"));
    var request = getRequest();
    flag = request["flag"];
    if (flag == "new") {
        $("#titleId").html("新建模块");
    } else if (flag == "edit") {
        $("#titleId").html("修改模块");
        id = request["id"];
        showInfo(id);
    }


    $("input[type=file]").change(function () {
        $(this).parents(".uploader").find(".filename").val($(this).val());

    });

    $('#first1').change(function () {
        if ($("#first1").val() != null & $("#first1").val() != "") {

            if (!checkFileType($("#first1").val())) {
                layer.msg("模块必须是zip包", {icon: 5});
                return false;
            }

            $("#submit-1").ajaxSubmit(function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    var html = '<span>文件名称:' + data.fileName + '</span><br />' +
                        '<span>上传日期:' + data.time + '</span><br />' +
                        '<span>大小: ' + data.fileSize + '</span><br />';
                    $("#fileNameId").val(data.fileName);
                    $("#fileTimeId").val(data.time);
                    $("#fileSizeId").val(data.fileSize);
                    $("#fileId").html(html);
                    $("#moduleUrl").val(data.fileUrl);
                    $("#m1").html(data.message);
                } else {
                    $("#moduleUrl").val("");
                    $("#fileNameId").val("");
                    $("#fileTimeId").val("");
                    $("#fileSizeId").val("");
                    $("#m1").html(data.message);
                }
            });
            return false;
        } else {
            layer.msg("请选择文件", {icon: 5});
        }
    });
});



/*
 * 判断模块类型
 *
 * @param ths
 *          type="file"的javascript对象
 * @return true-符合要求,false-不符合
 */
function checkFileType(file) {
    if (!/\.(zip|ZIP)$/.test(file)) {
        return false;
    }
    return true;
}
//刷新
function reload() {
    location.reload();
}

function checkName(){
    if(flag == "new"){
        var moduleId = $("#moduleId").val();
        var requestJson = {
            moduleId: moduleId
        };
        var d = constructionParams(rsaEncryptedString(requestJson), "d539bfc1fb9a4b7dbcbb1233bae8ae75");
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: true,//同步
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    if(json.data){
                        layer.msg("模块标识已经存在,请重新输入!", {icon: 5});
                        $("#moduleId").val("");
                        $("#moduleId").focus();
                    } else {
                        save();
                    }
                }
            }
        });
    } else {
        save();
    }
}

//模块保存
function save() {
    var userId = getCookie("loginId");
    var moduleId = $("#moduleId").val();
    var moduleName = $("#moduleName").val();
    var moduleUrl = $("#moduleUrl").val();
    var versionCode = $("#versionCode").val();
    var status = $('input[name="status"]:checked ').val();
    var fitAppVersion=$("#fitAppVersion").val();

    if (moduleName.length <= 0) {
        layer.msg('模块名称不能为空', {icon: 5});
        $("#moduleName").focus();
        return false;
    }
    if (versionCode.length <= 0) {
        layer.msg('版本号不能为空', {icon: 5});
        $("#versionCode").focus();
        return false;
    }
    if (fitAppVersion.length <= 0) {
        layer.msg('对应APP版本号不能为空', {icon: 5});
        $("#fitAppVersion").focus();
        return false;
    }
    if (moduleUrl.length <= 0) {
        layer.msg('请上传模块ZIP包!', {icon: 5});
        return false;
    }


    var businessP = {
        "moduleId": moduleId,
        "moduleName": moduleName,
        "moduleUrl": moduleUrl,
        "versionCode": versionCode,
        "fileName": $("#fileNameId").val(),
        "fileTime": $("#fileTimeId").val(),
        "fileSize": $("#fileSizeId").val(),
        "fitAppVersion":fitAppVersion,
        "status": status,
        "creatorId": userId
    };
    var serviceId = "";
    var successMsg = "";
    var errorMsg = "";
    if (flag == "new") {
        serviceId = "5d17031d75ce41bf91779d79b12ebb23";
        successMsg = "保存成功!";
        errorMsg = "保存失败!";
    } else if (flag == "edit") {
        serviceId = "4c32fae2858443b6b34703279928b848";
        successMsg = "修改成功!";
        errorMsg = "修改失败!";
    }
    d = constructionParams(rsaEncryptedString(businessP), serviceId);

    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                layer.msg(successMsg, {icon: 6});
                window.location.href = 'moduleList.html';
            } else {
                layer.msg(errorMsg, {icon: 5});
            }
        }
    });
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

//展示页
function showInfo(id) {
    var businessP = {"moduleId": id};
    var d = constructionParams(rsaEncryptedString(businessP), "d539bfc1fb9a4b7dbcbb1233bae8ae75");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var module = json.data;
                $("#moduleId").val(module.moduleId);
                $("#moduleId").attr("readonly",true);
                $("#moduleName").val(module.moduleName);
                $("#versionCode").val(module.versionCode);
                $("#fitAppVersion").val(module.fitAppVersion);
                $("input[name='status']").get(module.status).checked=true;
                $("#moduleUrl").val(module.moduleUrl);
                $("#fileNameId").val(module.fileName);
                $("#fileTimeId").val(module.fileTime);
                $("#fileSizeId").val(module.fileSize);
                var html = '<span>文件名称:' + module.fileName + '</span><br />' +
                    '<span>上传日期:' + module.fileTime + '</span><br />' +
                    '<span>大小: ' + module.fileSize + '</span><br />';
                $("#fileId").html(html);
            }
        }
    });
}
