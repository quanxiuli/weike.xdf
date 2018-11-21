$(function () {
    $("form[enctype]").attr("action", Global.baseUploadPath + $("form[enctype]").attr("action"));

    $("input[type=file]").change(function () {
        $(this).parents(".uploader").find(".filename").val($(this).val());
    });

    function checkFileType(file) {
        if (!/\.(txt|Txt|TXT)$/.test(file)) {
            return false;
        }
        return true;
    }
    function saveFileInfo(data){
        var userId = getCookie("loginId");
        var requestJson = {
            userId: userId,
            fileName: data.fileName,
            diskName:data.diskName,
            fileSize: data.fileSize,
            uploadTime: data.time,
            url: data.fileUrl
        };
        var d = constructionParams(rsaEncryptedString(requestJson), "0ae6d4aee76941859ba31e39261b1060");
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
    }

    $('.uplodeFiles').change(function () {
        var $this = $(this);
        var value = $this.val();
        if (value != null && value != "") {
            if (!checkFileType(value)) {
                layer.msg("上传的文件必须是txt格式", {icon: 5});
                return false;
            }
            var parentId = $this.parent("form").attr("id");
            var suffix = parentId.split("-")[1];
            $("#" + parentId).ajaxSubmit(function (data) {
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
                    saveFileInfo(data);
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