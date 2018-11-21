$(function () {
    $("form[enctype]").attr("action",Global.baseUploadPath+$("form[enctype]").attr("action"));

    $("input[type=file]").change(function () {
        $(this).parents(".uploader").find(".filename").val($(this).val());
    });

    versionUpdate.showVersions();

    $('.uplodeFiles').change(function () {
        var $this = $(this);
        var value = $this.val();
        if (value != null && value != "") {
            if (!versionUpdate.checkFileType(value)) {
                layer.msg("上传的文件必须是apk包", {icon: 5});
                return false;
            }
            var parentId = $this.parent("form").attr("id");
            var suffix = parentId.split("-")[1];
            $("#"+parentId).ajaxSubmit(function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    var html = '<span>文件名称:' + data.fileName + '</span><br />' +
                        '<span>上传日期:' + data.time + '</span><br />' +
                        '<span>大小: ' + data.fileSize + '</span><br />';
                    $("#fileNameId" + "_" + suffix).val(data.fileName);
                    $("#fileTimeId" + "_" + suffix).val(data.time);
                    $("#fileSizeId" + "_" + suffix).val(data.fileSize);
                    $("#fileId" + "_" + suffix).html(html);
                    $("#fileUrl" + "_" + suffix).val(data.fileUrl);
                    $("#m" + "_" + suffix).html(data.message);
                } else {
                    $("#moduleUrl" + "_" + suffix).val("");
                    $("#fileNameId" + "_" + suffix).val("");
                    $("#fileTimeId" + "_" + suffix).val("");
                    $("#fileSizeId" + "_" + suffix).val("");
                    $("#m" + "_" + suffix).html(data.message);
                }
            });
            return false;
        } else {
            layer.msg("请选择文件", {icon: 5});
        }
    });

});

var versionUpdate = {
    checkFileType : function (file){
        if (!/\.(apk|APK)$/.test(file)) {
            return false;
        }
        return true;
    },

    //刷新
    reload : function () {
        location.reload();
    },

    disableNewVer : function () {
        var newVerFlag = $("#newVerFlag").val();
        var state = 0;
        if(newVerFlag == 2){//已经禁用，点击置为启用
            $("#newVerFlag").val("");
            $("#newVersion").css("color", "#00ba97");
            $("#newButton").text("禁用");
            $("#newVerSpan").html("已启用&nbsp;&nbsp;&nbsp;&nbsp;");
        }else{//已经启用，点击置为禁用
            state = 2;
            $("#newVerFlag").val(2);
            $("#newVersion").css("color", "red");
            $("#newButton").text("启用");
            $("#newVerSpan").html("已禁用&nbsp;&nbsp;&nbsp;&nbsp;");
        }
        var newversion = $("#newVersion").text().trim();
        var businessP = {"version": newversion, "status": state};
        var d = constructionParams(rsaEncryptedString(businessP), "7441fdcb33be4cff815664ee2ea8784d");
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: false,//同步
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if(json.result == true){
                    layer.msg(json.message, {icon: 6});
                }else{
                    layer.msg(json.message, {icon: 5});
                }
            }
        });

    },

    //展示页
    showVersions : function () {
        var businessP = {"versions": ''};
        var d = constructionParams(rsaEncryptedString(businessP), "f5e6f511f6e345f4ae492c1ea50a32a6");
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: false,//同步
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    $("#blanktip").hide();
                    var versions = json.data;
                    var len = versions.length;
                    if (len != undefined && len > 0) {
                        $("#listId").show();
                        if(len == 1){
                            $("#versionBottom").hide();
                        }else{
                            $("#versionBottom").show();
                        }
                    } else {
                        $("#listId").hide();
                        $("#blanktip").show();
                        return false;
                    }
                    $("#listId").find("p").remove();
                    for (var i = 0; i < len; i++) {
                        var id = versions[i].id;
                        var version = versions[i].version;
                        var isNew = versions[i].isnew;
                        var html = "";
                        if(isNew == 1){
                            if(versions[i].status == 2){//新版本被禁用
                                $("#newVerFlag").val(2);
                                html = "App最新版本 ： " + "<span style='width: 366px;color: red' id='newVersion'>" + version + "</span>" +
                                    " &nbsp;&nbsp;&nbsp;&nbsp;<span id='newVerSpan'>已禁用&nbsp;&nbsp;&nbsp;&nbsp;</span>" +
                                    "<button type='button' id='newButton' onclick='versionUpdate.disableNewVer();'" +
                                    " style='background: #00ba97;color: #fff'>启用</button>";
                            }else{
                                html = "App最新版本 ： " + "<span style='width: 366px;color: #00ba97;' id='newVersion'>" + version + "</span>" +
                                    "&nbsp;&nbsp;&nbsp;&nbsp;<span id='newVerSpan'>已启用&nbsp;&nbsp;&nbsp;&nbsp;</span>" +
                                    "<button type='button' id='newButton' onclick='versionUpdate.disableNewVer();'" +
                                    "style='background: #00ba97;color: #fff'>禁用</button>";
                            }
                        }else{
                            html = "App历史版本 ： " + "<span style='width: 366px;'>" + version + "</span>" +
                                "<label>&nbsp;&nbsp;&nbsp;&nbsp;强制更新" +
                                "<input name='versions' id='versions0' type='checkbox' ";
                        }
                        if(isNew == 0 && versions[i].status == 1){
                            html += " checked ";
                        }
                        if(isNew == 0) {
                            html += " value='" + id + "'/></label>";
                        }
                        var $p = $('<p></p>');
                        $p.addClass("xdf_inputbox2").css({"width": "500px"});
                        if (i == 0) {
                            $p.css("padding-top" , "70px");
                        } else {
                            $p.css("padding-top" , "5px");
                        }
                        $p.html(html);
                        $p.insertBefore("#versionBottom");
                    }
                }
            }
        });
    },

    saveVersion : function () {
        var $checkboxs = $('input:checkbox[name=versions]');
        var checktrue = [];
        var checkfalse = [];
        $checkboxs.each(function (i) {
            if($(this).is(':checked')){
                checktrue.push($(this).val());
            }else{
                checkfalse.push($(this).val())
            }
        });
        var userId = getCookie("loginId");
        var requestJson = {
            userId: userId,
            versionIds_checked: checktrue.join(","),
            versionIds_nochecked: checkfalse.join(",")
        };
        var d = constructionParams(rsaEncryptedString(requestJson), "fc1f025afe56403bbe0f7705821d8076");
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: true,//同步
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    layer.msg(json.message, {icon: 6});
                } else {
                    layer.msg(json.message, {icon: 5});
                }
            }
        });
    },

    //渠道保存
    saveChannel : function () {
        var versionId = $("#versionId").val();
        if(versionId == '' || versionId == null){
            layer.msg('App版本号不能为空！', {icon: 5});
            return false;
        }
        var userId = getCookie("loginId");
        var $fileUrl = $(".urlClass");
        var surffix = '';
        var surffix_text = '';
        var flag = false;
        var params = [];
        $fileUrl.each(function (i) {
            var urlVal = $(this).val();
            var id = $(this).attr("id");
            surffix = id.split("_")[1];
            if (surffix == '360') {
                surffix_text = 360;
            } else if (surffix == 'xiaomi') {
                surffix_text = '小米';
            } else if (surffix == 'baidu') {
                surffix_text = '百度';
            } else if (surffix == 'huawei') {
                surffix_text = '华为';
            } else if (surffix == 'yingyongbao') {
                surffix_text = '应用宝';
            } else if (surffix == 'self') {
                surffix_text = '新东方';
            }

            if (urlVal.length <= 0) {
                flag = true;
                return false;
            } else {
                var param = {};
                param["channel"] = surffix;
                param["fileUrl"] = urlVal;
                param["fileNameId"] = $("#fileNameId" + "_" + surffix).val();
                param["fileTimeId"] = $("#fileTimeId" + "_" + surffix).val();
                param["fileSizeId"] = $("#fileSizeId" + "_" + surffix).val();
                params.push(param);
            }
        });

        if (flag) {
            layer.msg('请上传 ' + surffix_text + ' 渠道apk包!', {icon: 5});
            return false;
        }

        var businessP = {
            "versionId": versionId,
            "creatorId": userId,
            "channels": params
        };
        var d = constructionParams(rsaEncryptedString(businessP), "2f2b40bd8ac8411285877c31fb773196");
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: true,
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    //刷新页面
                    versionUpdate.reload();
                    layer.msg(json.message, {icon: 6});
                } else {
                    layer.msg(json.message, {icon: 5});
                }
            }
        });
    }
}
