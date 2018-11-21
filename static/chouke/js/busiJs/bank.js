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

var totalCounts = 0;
var currentPage = 1;
var pageSize = 15;

function initPage(totalCounts, currentPage) {
    if (totalCounts != null && totalCounts != 0) {
        $.jqPaginator("#publicPage", {
            totalCounts: totalCounts,
            pageSize: pageSize,
            visiblePages: 10,
            currentPage: currentPage,
            prev: '<a class="pPrev" href="javascript:;">上一页</a>',
            next: '<a class="pNext" href="javascript:;">下一页</a>',
            page: '<a href="javascript:;">{{page}}</a>',
            activeClass: 'pCurrent',
            onPageChange: function (num, type) {
                if (type != "init") {
                    showList(num);
                }
            }
        });
    } else {
        $("#publicPage").html("");
    }
}

function showList(page) {
    var requestJson = {
        currentPage: page,
        pageSize: pageSize,
        userId: $("#userPkId").val()
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "5b9513013f6d4e7eace88fcecdec880d");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                totalCounts = json.totalCount;
                initPage(totalCounts, page);
                $("#totalNumId").html("数据总数："+totalCounts);
                var list = json.dataList;
                var html = "";
                if (list && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        html = html + '<tr>'+
                        '   <td>'+list[i].userId+'</td>'+
                        '   <td>'+list[i].firstTime+'</td>'+
                        '   <td>'+list[i].exportTime+'</td>'+
                        '   <td>'+list[i].createTime+'</td>'+
                        '</tr>';
                    }
                    $("#dataListId").html(html);
                } else {
                    $("#dataListId").html("");
                }
                initNavigationBar();
            } else {
                layer.msg(json.message, {icon: 5});
            }
        }
    });
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
    var d = constructionParams(rsaEncryptedString(requestJson), "f284a5e6fa574b1f88847586e7ca04b8");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                layer.msg(json.message, {icon: 6});
                showList(1);
            } else {
                layer.msg(json.message, {icon: 5});
            }
        }
    });
}