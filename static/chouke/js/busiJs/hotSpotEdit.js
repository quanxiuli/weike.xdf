/**
 * Created by diwenchao on 2016/7/7.
 */
var flag;
var type;
var id;
var channelId;
var cmsCityId;
var coverImg;
var coverImgValid = true;
$(function () {
    $("#submit-1").attr("action", Global.baseUploadPath + $("#submit-1").attr("action"));
    $("#submit-2").attr("action", Global.baseUploadPath + $("#submit-2").attr("action"));
    $("input[type=file]").change(function () {
        $(this).parents(".uploader").find(".filename").val($(this).val());

    });

    $("input[type=file]").each(function () {
        if ($(this).val() == "") {
            $(this).parents(".uploader").find(".filename").val("请选择图片...");
        }
    });
    var request = getRequest();
    flag = request["flag"];
    type = request["type"];
    id = request["id"];

    var functionIds = getCookie("functionIds");
    if (functionIds.length > 0) {
        functionIds = functionIds.split(",");
    }
    if (functionIds.length > 0) {
        if ($.inArray('20104', functionIds) >= 0) {
            $(".bottom-botton li").eq(2).css("display", "block");
        }
    }

    if (type == 2) {
        $("#upload-attach").show();
    } else {
        $("#upload-attach").hide();
    }

    if (flag == "new") {
        if (type == 2) {
            $("#title").html("新建资料");
        } else {
            $("#title").html("新建资讯");
            $("#attachId").hide();
        }
    } else if (flag == "edit") {
        if (type == 2) {
            $("#title").html("编辑资料");
        } else {
            $("#title").html("编辑资讯");
            $("#attachId").hide();
        }
    }

    $('#first1').change(function () {
        var first1val = $("#first1").val();
        if (first1val != null && first1val != "") {
            if (!checkImgType($("#first1").val())) {
                layer.msg("图片类型必须是 gif,jpeg,jpg,png中的一种", {icon: 5});
                return false;
            }

            if (coverImg != undefined && (coverImg.width > 0 || coverImg.height > 0)) {
                console.log(coverImg.complete);
                var defaultWidth = $("input[name$='width']").val();
                var defaultHeight = $("input[name$='height']").val();
                if (coverImg.width == defaultWidth && coverImg.height == defaultHeight) {
                    coverImgValid = true;
                } else {
                    coverImgValid = false;
                    layer.msg("封面大图大小不正确！", {icon: 5});
                    return false;
                }
            } else {
                coverImgValid = false;
            }


            $("#submit-1").ajaxSubmit(function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    var fileUrl = data.fileUrl;
                    coverImg = new Image();
                    coverImg.src = fileUrl;
                    var defaultWidth = $("input[name$='width']").val();
                    var defaultHeight = $("input[name$='height']").val();
                    $(coverImg).load(function(){
                        if (coverImg.width == defaultWidth && coverImg.height == defaultHeight) {
                            coverImgValid = true;
                            $("#imageUrlInput").val(fileUrl);
                            $("#infoImage").attr("src", fileUrl);
                            $("#bigImage").attr("src", fileUrl);
                            $("#m1").html(data.message);
                        } else {
                            coverImgValid = false;
                            coverImg = null;
                            layer.msg("封面大图大小不正确！", {icon: 5});
                            $("#imageUrlInput").val("");
                            $("#infoImage").attr("src", "../../images/xdf_load-.png");
                            $("#bigImage").attr("src", "");
                            return false;
                        }
                    })
                } else {
                    $("#imageUrlInput").val("");
                    $("#infoImage").attr("src", "");
                    $("#bigImage").attr("src", "");
                    $("#m1").html(data.message);
                }
            });
            return false;
        } else {
            layer.msg("请选择文件", {icon: 5});
        }
    });
    upBtnCk();
    function upBtnCk(){
        $(document).off('change').on('change','#first2',function () {
            function cl(){
                var fst2=$('#first2');
                var newDom = fst2.clone();
                $('#first2').after(newDom);
                fst2.remove();
            }
            if ($("#fileUrlInput").val()) {
                layer.msg("只能上传一个资料", {icon: 5});
                cl()
                return false;
            }
            if ($("#first2").val() != null & $("#first2").val() != "") {

                if (!checkFileType($("#first2").val())) {
                    layer.msg("文件类型必须是doc,docx,ppt,pptx,xls,xlsx,pdf,txt,jpg,jpeg,png,zip,rar", {icon: 5});
                    cl()
                    return false;
                }

                $("#submit-2").ajaxSubmit(function (data) {
                    // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                    if (data.success == true) {
                        $("#fileUrlInput").val(data.fileUrl);
                        var html = '<a href="javascript:;" id="fileNameId">' + data.fileName + '</a>' +
                            '<span id="fileTimeId">上传日期: ' + data.time + '</span>' +
                            '<span id="fileSizeId">大小: ' + data.fileSize + '<a href="javascript:;" onclick="delFile()" id="click_close">删除</a></span>'
                        $("#fileId").html(html);
                        $("#fileUploadId").css("display", "inline");
                        $("#m2").html(data.message);
                    } else {
                        $("#m2").html(data.message);
                    }
                });
                cl();
                return false;
            } else {
                layer.msg("请选择文件", {icon: 5});
                cl()
            }
        });
    }

    $('#xdf_plus li a').click(function () {
        var list = $('#xdf_plus li a.bg_color');
        var len = list.length;
        if ($(this).hasClass('bg_color')) {
            $(this).removeClass('bg_color');
        } else {
            if (len < 3) {
                $(this).addClass('bg_color');
            } else {
                alert('最多选择三项！')
            }
        }

    })
});

function initData() {
    if (flag == "new") {
        var time = new Date();
        $("#createTime1").val(time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate());
        $("#createTime2").val(time.getHours() + ":" + time.getMinutes());
        findCity();
        findType();

    } else if (flag == "edit") {
        findEditData();
        var request = getRequest();
        var transFileError = request["transFileError"];
        if (transFileError != undefined && transFileError != "success") {
            layer.msg(decodeURIComponent(transFileError), {icon: 5});
        }
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
    if (!/\.(gif|jpg|jpeg|png|GIF|JPG|JPEG|PNG)$/.test(file)) {
        return false;
    }
    return true;
}

/*
 * 判断文件类型
 *
 * @param ths
 *          type="file"的javascript对象
 * @return true-符合要求,false-不符合
 */
function checkFileType(file) {
    if (!/\.(doc|docx|ppt|pptx|xls|xlsx|pdf|txt|jpg|jpeg|png|zip|rar|DOC|DOCX|PPT|PPTX|XLS|XLSX|PDF|TXT|JPG|JPEG|PNG|ZIP|RAR)$/.test(file)) {
        return false;
    }
    return true;
}

//热点编辑显示查询

function findEditData() {
    var businessP = {
        editId: id
    };

    var d = constructionParams(rsaEncryptedString(businessP), "c694ee64bd274abd96f5d4a058dd56bd");

    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url:'http://localhost:8015/market/hotSpot/updateHs.do',
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var cnList = json.dataList;
                if (cnList.length > 0) {
                    var hotspot = cnList[0];
                    $("#typeId").val(hotspot.type);
                    $("#idContent").val(hotspot.id);
                    $("#name").val(hotspot.name);
                    $("#author").val(hotspot.author);
                    if (hotspot.time) {
                        var createTime = hotspot.time.split(" ");
                        $("#createTime1").val(createTime[0]);
                        $("#createTime2").val(createTime[1].substr(0, createTime[1].lastIndexOf(":")));
                    }
                    var coverUrl = hotspot.coverUrl;
                    $("#infoImage").attr("src", coverUrl);
                    $("#imageUrlInput").val(coverUrl);
                    $("#bigImage").attr("src", coverUrl);
                    if (coverUrl != "") {
                        coverImg = new Image();
                        coverImg.src = coverUrl;
                        $(coverImg).load(function(){
                            checkCoverImg()
                        })
                        //setTimeout(checkCoverImg, 50);
                        //images.onerror(function(){
                        //    coverImgValid = false;
                        //});
                    }
                    channelId = hotspot.channelId;

                    if (flag == "edit" && type == 1 && channelId != null) {
                        $("#cmsPublishTime").parent().css("display", "block");
                        var cmsPublishTime = hotspot.cmsPublishTime;
                        if(cmsPublishTime == undefined){
                            cmsPublishTime = "无"
                        }
                        $("#cmsPublishTime").html(cmsPublishTime);
                    }
                    $("#city").val(hotspot.cityId);
                    $("#type").val(hotspot.categoryId);
                    $("#publisherId").val(hotspot.publisherId);
                    $("#publisherNameId").val(hotspot.publisherName);
                    $("#publishTimeId").val(hotspot.publishTime);
                    $("#fileUrlInput").val(hotspot.url);

                    if (hotspot.fileId) {
                        var html = '<input type="hidden" value="' + hotspot.fileId + '" id="fileIdID" /><a href="javascript:;" id="fileNameId">' + hotspot.fileName + '</a>' +
                            '<span id="fileTimeId">上传日期: ' + hotspot.uploadTime + '</span>' +
                            '<span id="fileSizeId">大小: ' + hotspot.fileSize + '<a href="javascript:;"' +
                            ' onclick="delFile()" id="click_close">删除</a></span>';
                        $("#fileId").html(html);
                        $("#fileUploadId").css("display", "inline");
                    }
                    var functionId;
                    if (type == "2") {
                        functionId = '20104';
                    } else {
                        functionId = '20102';
                    }
                    $("#saveAndPublish").attr("data-functionId", functionId);
                    initNavigationBar();
                    findCity(hotspot.cityId);
                    findType(hotspot.categoryId, json.tagList);

                    UE.getEditor('editor').setContent(hotspot.content);
                }

                //专题名称限定字数
                $('#name').keyup(function () {
                    var lv = $(this).val().length;
                    $('#num-huodong').html(lv)
                }).keyup();
                //作者限定字数
                $('#author').keyup(function () {
                    var lv = $(this).val().length;
                    $('#num-zuozhe').html(lv)
                }).keyup();

            } else {
                layer.msg(json.message, {icon: 5});
            }
        }
    });
}

var checkCoverImg = function () {
    if (coverImg != undefined && (coverImg.width > 0 || coverImg.height > 0)) {
        console.log(coverImg.complete);
        var defaultWidth = $("input[name$='width']").val();
        var defaultHeight = $("input[name$='height']").val();
        if (coverImg.width == defaultWidth && coverImg.height == defaultHeight) {
            coverImgValid = true;
        } else {
            coverImgValid = false;
        }
    } else {
        coverImgValid = false;
        //setTimeout(checkCoverImg, 50);
    }
};

//新建查询地区
function findCity(cityId) {
    var businessP = {
        loginId: getCookie("loginId")
    };

    var d = constructionParams(rsaEncryptedString(businessP), "3577775ef8e849d9ab63dad2202584e0");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var schoolList = json.dataList;
                var str = "";
                if (schoolList.length > 0) {
                    if (flag == "edit" && type == 1 && channelId != null) {
                        cmsCityId = cityId;
                        if (cityId != "") {
                            var cityIdArray = cityId.split(",");
                            for (var i = 0; i < schoolList.length; i++) {
                                var id = schoolList[i].sCode;
                                var name = schoolList[i].sCity;
                                if ($.inArray(id, cityIdArray) >= 0) {
                                    str += '<a href="javascript:void(0);" class="bg_color" id="' + id + '">' + name + '</a>';
                                }
                            }
                        } else {
                            str += '<a href="javascript:void(0);" class="bg_color">全国</a>';
                        }

                        $(".addr-libox").css("display", "none");
                        $("#city-tag").html(str);
                    } else {
                        str += "<option value=''>全部</option>";
                        for (var i = 0; i < schoolList.length; i++) {
                            var id = schoolList[i].sCode;
                            var name = schoolList[i].sCity;

                            if (cityId != null) {
                                if (id == cityId) {
                                    str += "<option value='" + id + "' selected='selected'> " + name + "</option>";
                                } else {
                                    str += "<option value='" + id + "'> " + name + "</option>";
                                }
                            } else {
                                var loginId = getCookie("loginId");
                                if (marketJs.loginUserIsAdmin(loginId) && id == 1) {
                                    str += "<option selected='selected' value=\"" + id + "\">" + name + "</option>";
                                } else {
                                    str += "<option value=\"" + id + "\">" + name + "</option>";
                                }
                            }
                        }
                        $("#city-tag").parents(".xdf_label01").css("display", "none");
                        $("#city").html(str);
                    }
                }
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}


//新建查询分类
function findType(categoryId, tagList) {
    var businessP = {
        "type": 2
    };
    var d = constructionParams(rsaEncryptedString(businessP), "1e5d6e88ec1043069658a2c341246ad8");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url:'http://localhost:8015/market/constants/getConstantsInfo.do',
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var cnList = json.dataList;
                var str = "";
                if (cnList.length > 0) {
                    for (var i = 0; i < cnList.length; i++) {
                        var id = cnList[i]["id"];
                        var name = cnList[i]["name"];
                        var type = cnList[i]["type"];
                        if (categoryId != null) {
                            if (id == categoryId) {
                                str += "<option value='" + id + "' selected> " + name + "</option>"
                            } else {
                                str += "<option value='" + id + "'> " + name + "</option>"
                            }
                        } else {
                            str += "<option value=" + id + ">" + name + "</option>"

                        }
                        $("#type").attr("onchange", "findTag()");
                        $("#type").html(str);
                    }
                    findTag(tagList);
                } else {
                    $("#type").html(str);
                }
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });

}

//新建查询课程-标签
function findTag(tagList) {
    var businessP
    var id = $("#type option:selected").val();

    businessP = {
        "type": 4,
        "pid": id
    };
    var d = constructionParams(rsaEncryptedString(businessP), "1e5d6e88ec1043069658a2c341246ad8");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url:'http://localhost:8015/market/constants/getConstantsInfo.do',
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var cnList = json.dataList;
                var str = "";
                var tags = [];
                if (cnList.length > 0) {
                    if (tagList != null && tagList.length > 0) {
                        for (var i = 0; i < tagList.length; i++) {
                            tags.push(tagList[i].tagId);
                        }
                    }
                    for (var i = 0; i < cnList.length; i++) {
                        var id = cnList[i]["id"];
                        var name = cnList[i]["name"];
                        var type = cnList[i]["type"];
                        if (tags != null && tags.length > 0) {
                            if ($.inArray(id, tags) > -1) {
                                str += "<a href='javascript:;' class='bg_color' id='" + id + "' onclick='checkTag(this)'>" + name + "</a>";
                            } else {
                                str += "<a href='javascript:;' id='" + id + "' onclick='checkTag(this)'>" + name + "</a>";
                            }
                        } else {
                            str += "<a href='javascript:;' id='" + id + "' onclick='checkTag(this)'>" + name + "</a>";
                        }
                    }
                    $("#tag").html(str);
                } else {
                    $("#tag").html("");
                }
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });

}

function checkTag(_this) {
    var list = $('#xdf_plus li a.bg_color');
    var len = list.length;
    if ($(_this).hasClass('bg_color')) {
        $(_this).removeClass('bg_color');
    } else {
        if (len < 3) {
            $(_this).addClass('bg_color');
        } else {
            layer.msg("最多添加3个标签!", {icon: 5});
        }
    }
}

function saveHs(isPublish){
    if (isPublish) {
        layer.confirm("确认发布？", {
            btn: ['发布', '取消'] //按钮
        }, function () {
            saveOrPublishHs(isPublish);
        }, function () {

        });
    } else {
        saveOrPublishHs(isPublish);
    }
}

//编辑热点保存数据
function saveOrPublishHs(isPublish) {
    layer.load(2);//遮罩加载
    var list = $('#xdf_plus li a.bg_color');
    var tags = [];
    for (var i = 0; i < list.length; i++) {
        tags.push(list[i].id);
    }
    var name = $("input#name").val();
    var author = $("input#author").val();
    var createTime1 = $("#createTime1").val();
    var createTime2 = $("#createTime2").val();
    var time =  createTime1 + " " + createTime2;
    var categoryId = $("#type option:selected").val();
    var cityId;
    if (flag == "edit" && type == 1 && channelId != null) {
        cityId = cmsCityId;
    } else {
        cityId = $("#city option:selected").val();
    }
    var content = UE.getEditor('editor').getContent();
    var summary = UE.getEditor('editor').getContentTxt();
    if (summary != null) {
        summary = $.trim(summary);
        summary = summary.substring(0, 250);
    }
    var coverUrl = $("#imageUrlInput").val();
    var fileUrl = $("#fileUrlInput").val();
    var publisherId = isPublish == true ? getCookie("loginId") : $("#publisherId").val();
    var publisherName = isPublish == true ? getCookie("userName") : $("#publisherNameId").val();
    var publishTime = $("#publishTimeId").val();
    var lastOpUserId = getCookie("loginId");
    var lastOpUserName = getCookie("userName");
    var fileName = "";
    var fileTime = "";
    var fileSize = "";
    if ($("#fileNameId").html()) {
        fileName = $("#fileNameId").html();
        fileTime = $("#fileTimeId").html().split(": ")[1];
        fileSize = $("#fileSizeId").html().split(": ")[1].substring(0, $("#fileSizeId").html().split(": ")[1].indexOf("<a"));
    }
    if (name == "") {
        layer.msg("标题不能为空！", {icon: 5}, function(){
            layer.closeAll('loading');
        });
        return false;
    }
    var len = $('#name').attr('maxlength');
    if (name.length > len) {
        layer.msg("标题长度不要超过"+len+"!", {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return false;
    }

    if (author == "") {
        layer.msg("作者不能为空！", {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return false;
    }
    if (author.length > 15) {
        layer.msg("作者长度不要超过15！", {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return false;
    }
    if ($("#createTime1").val() == "" && $("#createTime2").val() == "") {
        layer.msg("日期不能为空！", {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return false;
    }
    if(type==2 && fileUrl==""){//type==2 - 资料
        layer.msg("附件不能为空！", {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return false;
    }
    if (content == "") {
        layer.msg("内容不能为空！", {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return false;
    }
    //checkCoverImg();
    if (coverImg != undefined && !coverImgValid) {
        layer.msg("封面大图大小不正确！", {icon: 5}, function () {
            layer.closeAll('loading');
        });
        return false;
    }
    var ff=false;
    $(content).find('img').each(function(){
        if (!checkImgType($(this).attr('src'))) {
            layer.msg("内容图片类型必须是 gif,jpeg,jpg,png中的一种", {icon: 5},function(){
                layer.closeAll('loading');

            });
            ff=true;
            return false;
        }
    })
    if(ff){return false}
    /*
    layer.open({
        type: 3,
        icon: 1,
        shade: 0.2,
        shadeClose: true
    });*/

    //showLoading();
    //$('.disableCss').removeAttr('onclick');
    //var e = window.event;
    //e.target.disabled = true;

    var requestJson = {
        id: id,
        type: type,
        name: name,
        author: author,
        time: time,
        flag: isPublish,
        userId: getCookie("loginId"),
        categoryId: categoryId,
        cityId: cityId,
        status: 2,
        content: content,
        summary: summary,
        coverUrl: coverUrl,
        publisherId: publisherId,
        publisherName: publisherName,
        publishTime: publishTime,
        fileName: fileName,
        fileTime: fileTime,
        fileSize: fileSize,
        fileUrl: fileUrl,
        channelId:channelId,
        tags: tags.join(","),
        lastOpUserId : lastOpUserId,
        lastOpUserName : lastOpUserName
    };
    var serverId = "";
    var successMsg = "";
    var errorMsg = "";
    if (flag == "edit") {
        serverId = "1a55b67a707d4ea0a6b1ccbe7aa0784d";
        successMsg = "更新成功!";
        errorMsg = "更新失败!";
    } else {
        serverId = "d9a6f10c8be04da79f053e68cdc12b4c";
        successMsg = "保存成功!";
        errorMsg = "保存失败!";
    }
    var d = constructionParams(rsaEncryptedString(requestJson), serverId);
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url:'http://localhost:8080/xdfmanager/hotSpot/updateSaveHs.do',
        async: true,
        dataType: 'json',
        //data: JSON.stringify(requestJson),
        data: JSON.stringify(d),
        success: function (json) {
            variety = true;
            if (json.result == true) {
                layer.msg(successMsg, {icon: 6, time: 3000, offset: '300px'}, function () {
                    if (type == 2) {//文件转换
                        var b = {
                            id: json.id
                        };
                        var p = constructionParams(rsaEncryptedString(b), "ef47756d2b2a4cbcbf54bc49ed9e98ad");
                        jQuery.ajax({
                            type: "POST",
                            url: Global.actionURL,
                            async: true,
                            dataType: 'json',
                            data: JSON.stringify(p),
                            success: function (json1) {
                                //layer.closeAll('loading');
                                var transFileError = json1.transFileError;
                                if (transFileError == undefined) {
                                    transFileError = "success";
                                }
                                if (isPublish) {
                                    /*
                                     window.opener = null;
                                     window.open('', '_self');
                                     window.close();
                                     */
                                    window.location.href = '../hotSpot/hotspot.html?type=' + type + "&transFileError=" + transFileError;
                                } else {
                                    if (flag == "new") {
                                        id = json.id;
                                    }
                                    window.location.href = '../hotSpot/hotspotEdit.html?id=' + json.id + '&type='
                                        + type + "&flag=edit" + "&transFileError=" + transFileError;
                                }
                            }
                        });
                    } else {
                        if (isPublish) {
                            window.location.href = '../hotSpot/hotspot.html?type=' + type;
                        } else {
                            window.location.href = '../hotSpot/hotspotEdit.html?id=' + json.id + '&type=' + type + "&flag=edit";
                        }
                    }
                });
            } else {
                layer.closeAll('loading');
                layer.msg(errorMsg, {icon: 5, time: 3000, offset: '300px'});
            }
        }
    });
}

var variety = true;
$(document).ready(function () {
    $("#name").change(function () {
        variety = false;
    });
    $("#author").change(function () {
        variety = false;
    });
    $("#type").change(function () {
        variety = false;
    });
    $("#city").change(function () {
        variety = false;
    });
    setTimeout(function()
    {
        UE.getEditor('editor').addListener("selectionchange", function () {
            variety = false;
        });
    },2000);
});

function toPreview() {
    if (id && variety) {
        window.open('../../view/page/hotspot.html?id=' + id + "&type=" + type);
    } else {
        layer.msg("保存成功后才可预览!", {icon: 5});
    }
}

function delFile() {
    $("#m2").html("");
    $("#fileId").html("");
    $("#fileUrlInput").val("");
    $("#fileUploadId").css("display", "none");
}

$(function(){
    //专题名称限定字数
    $('#name').keyup(function () {
        var lv = $(this).val().length;
        $('#num-huodong').html(lv)
    }).keyup();
    //作者限定字数
    $('#author').keyup(function () {
        var lv = $(this).val().length;
        $('#num-zuozhe').html(lv)
    }).keyup();
});
