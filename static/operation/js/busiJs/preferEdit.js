$(function () {
    $("form[enctype]").attr("action", Global.baseUploadPath + $("form[enctype]").attr("action"));
    $(".site").html(sessionStorage.priorityCityName);
    $(".course").html(sessionStorage.priorityCategoryName);

    var request = getRequest();
    flag = request["flag"];
    id = request["id"];
    if (flag == "new") {
        $("#title").html("新建优选");
        $("#priorityName").val(sessionStorage.priorityName);
        $(".banner img").attr("src", sessionStorage.priorityImageUrl);
    } else if (flag == "edit") {
        $("#title").html("编辑优选");
        showInfo();
    }

    //限定字数
    $('#priorityName').keyup(function () {
        var lv = $(this).val().length;
        $('#num-priorityName').html(lv)
    }).keyup();
    $('#z-maioshu').keyup(function () {
        var lv = $(this).val().length;
        $('#num-miaoshu').html(lv)
    }).keyup();

    $('#z-title').keyup(function () {
        var lv = $(this).val().length;
        $('#num-huodong').html(lv)
    }).keyup();

    $(".view-con .z1").sortable({
        cancel: ".add",
        placeholder: "ui-state-highlight"
    });
    $(".view-con .z1").disableSelection();
    $(".view-con .z2").sortable({
        placeholder: "ui-state-highlight"
    }).disableSelection();


    $("input[type=file]").change(function () {
        $(".filename").val($(this).val());

    });

    $('.inp_file').change(function () {
        var fileContent = $(".inp_file").val();
        if (fileContent != null && fileContent != "") {

            if (!checkImgType(fileContent)) {
                layer.msg("图片类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
                return false;
            }

            $("#submit-1").ajaxSubmit(function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    $("#imageUrlInput").val(data.fileUrl);
                    $(".banner img").attr("src", data.fileUrl);
                    $("#upSpan").html(data.message);
                } else {
                    $("#imageUrlInput").val("");
                    $(".banner img").attr("src", "");
                    $("#upSpan").html(data.message);
                }
            });
            return false;
        } else {
            layer.msg("请选择文件", {icon: 5});
        }
    });
});


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

var topicList;
var classList;
var topicItemList;

var selectedTopicList = [];
var selectedClassList = [];
var classPicList = [];
var topicSelectedItemList = [];
var flag;
var id;

$(document).ready(function () {
    $('.div1 .xdf_btn2').click(function () {
        var searchKey = $(".div1 .xdf_content_search input").val();
        var requestParam = {
            cityId: sessionStorage.priorityCityId,
            categoryId: sessionStorage.priorityCategoryId,
            status: 2,
            queryName: searchKey
        };
        var d = constructionParams(rsaEncryptedString(requestParam), "f701582bf2234d369c159443d79965fb");
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            //url: "http://10.200.80.196:8080/market/courseTopic/getTopicList.do",
            async: true,
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    topicList = json.dataList;
                    if (topicList.length > 0) {
                        $('.div1 .search-not').css('display', 'none');
                        $('.div1 .new_block').css('display', 'block');
                        var str = "<li>课程名称</li>";
                        var count = 0;
                        for (var i = 0; i < topicList.length; i++) {
                            var topic = topicList[i];
                            var topicId = topic.id;
                            var checked = false;
                            if ($.inArray(topicId, selectedTopicList) >= 0) {
                                checked = true;
                                count++;
                            }
                            str += '<li><a href="javascript:;"><input type="checkbox"' + (checked ? 'checked' : '' ) + ' value="' + topicId + '" onchange="showSelected(1)" data-index="' + i + '"></a><span>' + topic.name + '</span></li>';
                        }
                        $('.div1 .new_block ul').html(str);
                        $(".div1 .new_block .selectText").html("已选" + count);
                    } else {
                        $('.div1 .new_block ul').html('<li>课程名称</li>');
                        $(".div1 .new_block .selectText").html("已选0");
                        $('.div1 .new_block').css('display', 'none');
                        $('.div1 .search-not').css('display', 'block');
                    }

                } else {
                    layer.msg("查询失败!", {icon: 5});
                }
            }
        });

    });


    $('.div3 .xdf_btn2').click(function () {
        var searchKey = $(".div3 .xdf_content_search input").val();
        var requestParam = {
            cityId: sessionStorage.priorityCityId,
            categoryId: sessionStorage.priorityCategoryId,
            status: 2,
            sName: searchKey
        };
        var d = constructionParams(rsaEncryptedString(requestParam), "7b2011eaf0294b94bd5940958806dc5b");
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            //url: "http://10.200.80.196:8080/market/courseTopic/getClassList.do",
            async: true,
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    classList = json.dataList;
                    if (classList.length > 0) {
                        $('.div3 .search-not').css('display', 'none');
                        $('.div3 .new_block').css('display', 'block');
                        var length = classList.length;
                        var str = '<li class="srcres">搜索到包含“' + searchKey + '”的<span>' + length + '</span>个班级</li>';
                        var count = 0;
                        for (var i = 0; i < length; i++) {
                            var item = classList[i];
                            var classId = item.sCode;
                            var checked = false;
                            if ($.inArray(classId, selectedClassList) >= 0) {
                                checked = true;
                                count++;
                            }
                            str += '<li><a href="javascript:;"><input type="checkbox" ' + (checked ? 'checked' : '') + ' value="' + classId + '" onchange="showSelected(3)" data-index="' + i + '"></a><span>' + item.sName + '</span></li>';
                        }
                        $('.div3 .new_block ul').html(str);
                        $(".div3 .new_block .selectText").html("已选" + count);
                    } else {
                        $('.div3 .new_block ul').html('<li class="srcres">搜索到包含“' + searchKey + '”的<span>0</span>个班级</li>');
                        $(".div3 .new_block .selectText").html("已选0");
                        $('.div3 .new_block').css('display', 'none');
                        $('.div3 .search-not').css('display', 'block');
                    }

                } else {
                    layer.msg("查询失败!", {icon: 5});
                }
            }
        });

    });

    $('.new_btn').click(function () {

        $(this).parents('.new_block').css("display", "none")
        $(this).parents(".new_block").next(".xdf_content_next").css("display", "block")
    });

    $('.div1 .new_btn').click(function () {
        var checkBoxList = $(".div1 input");
        //var topicIds = [];
        //var left = "";
        //var right = "";
        for (var i = 0; i < checkBoxList.length; i++) {
            var checkBox = checkBoxList[i];
            if (checkBox.checked) {
                var topicId = checkBox.value;
                if ($.inArray(topicId, selectedTopicList) < 0) {
                    selectedTopicList.push(topicId);

                    //topicIds.push(topicId);
                    var index = checkBox.dataset.index;
                    var topic = topicList[index];
                    //left += '<div class="ztcon" data-topicId="' + topicId + '">';
                    //left += '<div class="zz-tool">';
                    //left += '<a href="" class="t1"></a>';
                    //left += '<a href="" class="t2"></a>';
                    //left += '<a href="" class="t3" onclick="removeTopic(\'' + topicId + '\')"></a>';
                    //left += '</div>';
                    //left += '<img src="' + topic.coverUrl + '" />';
                    //left += '<h5>' + topic.name + '</h5>';
                    //left += '<div class="clearfix">';
                    //left += '<div class="nn"><i>￥</i><span>' + topic.minPrice + '</span>起</div>';
                    //left += '<div class="bb">已有' + topic.signNum + '人报班';
                    //left += '</div>';
                    //left += '</div>';
                    //left += '</div>';
                    //
                    //right += '<li value="' + topicId + '"><a href="#" onclick="removeTopic(\'' + topicId + '\')">移除</a><span>' + topic.name + '</span></li>'
                    addCourseTopic(topic);
                }
            }
        }
        //$('.z1 .add').before(left);
        //$(".div1 .xdf_content_next ul").append(right);
        $('.div1 .new_block ul').html('');


    });


    $('.div2 .new_btn').click(function () {
        var checkBoxList = $(".div2 input");
        var type = $("#type").find("option:selected").val();
        //var topicIds = [];
        //var left = "";
        //var right = "";
        var str = "";
        for (var i = 0; i < checkBoxList.length; i++) {
            var checkBox = checkBoxList[i];
            if (checkBox.checked) {
                var itemId = checkBox.value;
                if ($.inArray(itemId, topicSelectedItemList) < 0) {
                    topicSelectedItemList.push(itemId);

                    //topicIds.push(topicId);
                    var index = checkBox.dataset.index;
                    var item = topicItemList[index];
                    //var id = type == 1 ? item["code"] : item["sCode"];
                    var name = type == 1 ? item["name"] : item["sName"];
                    //addCourseTopic(item);
                    str += '<li value="' + itemId + '"><a href="javascript:void(0)" onclick="removeTopicItem(\'' + itemId + '\')">移除</a><span>' + name + '</span></li>';
                }
            }
        }
        //$('.z1 .add').before(left);
        $(".div2 .xdf_content_next ul").append(str);
        $('.div2 .new_block ul').html('');

        if (topicSelectedItemList.length > 0) {
            $("#type").attr("disabled", "disabled");
        }

    });

    $('.div3 .new_btn').click(function () {
        var checkBoxList = $(".div3 input");
        var classIds = [];
        var left = "";
        var right = "";
        for (var i = 0; i < checkBoxList.length; i++) {
            var checkBox = checkBoxList[i];
            if (checkBox.checked) {
                var classId = checkBox.value;
                if ($.inArray(classId, selectedClassList) < 0) {
                    selectedClassList.push(classId);
                    classPicList.push("../../images/xdf_addpic.png");

                    classIds.push(classId);
                    var index = checkBox.dataset.index;
                    var item = classList[index];
                    var className = item.sName;

                    left += '<div class="add-l" data-classid="' + classId + '">';
                    left += '<div class="ztcon2">';
                    left += '<div class="zz-tool">';
                    left += '<a href="javascript:void(0);" class="t1"></a>';
                    left += '<a href="javascript:void(0);" class="t2"></a>';
                    left += '<a href="javascript:void(0);" class="t3" onclick="removeClass(\'' + classId + '\')"></a>';
                    left += '</div>';
                    left += '<img src="../../images/xdf_addpic.png" />';
                    left += '<h5>' + className + '</h5>';
                    left += '<p>开课时间:2月1日</p>';
                    left += '<div class="nn"><i>￥</i><span>5580</span>起</div>';
                    left += '<div class="xx">查看详情</div>';
                    left += '</div>';
                    left += '</div>';

                    //right += '<li value="' + classId + '"><a href="#" onclick="removeTopic(' + classId + ')">移除</a><span>' + className + '</span></li>'
                    right += '<li value="' + classId + '">';
                    right += '<form action="' + Global.baseUploadPath + 'upload/uploadFile.do" method="post" class="submit"' +
                        ' enctype="multipart/form-data">';
                    right += '<span>' + className + '</span>';
                    right += '<label>上传封面图</label>';
                    right += '<input type="file" class="inp-file" name="file"/>';
                    right += '<input type="hidden" name="width" value="346">';
                    right += '<input type="hidden" name="height" value="230">';
                    right += '<a href="#" onclick="removeClass(\'' + classId + '\')">移除</a>';
                    right += '</form></li>';
                }
            }
        }
        $('.z2 .add-l').last().before(left);
        $(".div3 .xdf_content_next ul").append(right);
        $('.div3 .new_block ul').html('');

        reloadForm();
    });

    $(".xdf_content_next ul li a").click(function () {
        $(this).parent().hide();
    });
    $(".new_close").click(function () {
        $(this).parents('.new_block').css("display", "none");
    });

    //新建优选
    $('.gray-layer').width($(document).width()).height($(document).height());
    //add专题
    $('.view-con .z1 .add,.ztcon .zz-tool .t1').click(function () {
        $('.view-add-layer').show();
        $('.gray-layer').show();
        return false
    });
    //add班级
    $('.view-con .z2 .add-l,.ztcon2 .zz-tool .t1').click(function () {
        $('.view-addcon-layer').show();
        $('.view-addcon-layer .div1').hide();
        $('.view-addcon-layer .div2').hide();
        $('.view-addcon-layer .div3').show();
        return false
    });
    $('.view-add-layer .cls').click(function () {
        $('.view-add-layer').hide();
        $('.gray-layer').hide();
        return false
    });
    $('.view-addcon-layer .cls').click(function () {
        $('.view-addcon-layer').hide();
        $('.view-addcon-layer .div1,.view-addcon-layer .div2,.view-addcon-layer .div3').hide();
        return false
    });
    //出关联弹层
    $('.view-add-layer .go1').click(function () {
        $('.view-add-layer .cls').click();
        $('.view-addcon-layer').show();
        $('.view-addcon-layer .div1').show();
        $('.view-addcon-layer .div2, .view-addcon-layer .div3').hide();

        return false
    });
    $('.view-add-layer .go2').click(function () {
        $('.view-add-layer .cls').click();
        $('.view-addcon-layer').show();
        $('.view-addcon-layer .div2').show();
        $('.view-addcon-layer .div1, .view-addcon-layer .div3').hide();
        return false
    });
    $('.lkbtn').click(function () {
        $(this).toggleClass('lkbtn2');
        $('.lklayer').toggle();
        $('.view-in').toggle()
        return false
    });

    //$('.view-addcon-layer .xdf_content_search input').focus(function () {
    //    $('.view-addcon-layer .new_block').show();
    //}).blur(function () {
    //    //$('.view-addcon-layer .new_block').hide();
    //});

    $('#viewCon').scroll(function () {
        $('.view-bt').css('top', $('#viewCon').scrollTop() + 630)
    });

    //$('.zz-tool .t3').click(function () {
    //    $(this).parents('.ztcon,.ztcon2').remove();
    //    return false
    //})


    $('.topic-img-file').change(function () {
        var fileContent = $(this).val();
        if (fileContent != null && fileContent != "") {

            if (!checkImgType(fileContent)) {
                layer.msg("图片类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
                return false;
            }
            var hiddenInput = $(this).next(".topic-img-url");
            var showImg = $(this).parents(".xdf_upload01").find("img")
            $(this).parents(".submit-topic-img").ajaxSubmit(function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    //$("#imageUrlInput").val(data.fileUrl);
                    var imageUrl = data.fileUrl;
                    $(hiddenInput).attr("value", imageUrl);
                    $(showImg).attr("src", imageUrl);
                    layer.msg(data.message);
                } else {
                    //$("#imageUrlInput").val("");
                    $(hiddenInput).attr("value", "");
                    $(showImg).attr("src", "../../images/xdf_load-.png");
                    layer.msg(data.message);
                }
            });
            return false;
        } else {
            layer.msg("请选择文件", {icon: 5});
        }
    });


});

function showSelected(index) {
    var checkBoxList = $(".div" + index + " input");
    var count = 0;
    for (var i = 0; i < checkBoxList.length; i++) {
        if (checkBoxList[i].checked) {
            count++;
        }
    }
    $(".div" + index + " .new_block .selectText").html("已选" + count);
}

function removeTopic(id) {
    var leftList = $(".ztcon");
    for (var i = 0; i < leftList.length; i++) {
        var topicDiv = leftList[i];
        if (id == topicDiv.dataset.topicid) {
            $(topicDiv).remove();
        }
    }

    var rightList = $(".div1 .xdf_content_next li");
    for (var i = 0; i < rightList.length; i++) {
        var topicDiv = rightList[i];
        if (id == $(topicDiv).attr("value")) {
            $(topicDiv).remove();
        }
    }

    selectedTopicList.splice($.inArray(id, selectedTopicList), 1);

}

function removeClass(id) {
    var leftList = $(".add-l");
    for (var i = 0; i < leftList.length; i++) {
        var classDiv = leftList[i];
        if (id == classDiv.dataset.classid) {
            $(classDiv).remove();
        }
    }

    var rightList = $(".div3 .xdf_content_next li");
    for (var i = 0; i < rightList.length; i++) {
        var classDiv = rightList[i];
        if (id == $(classDiv).attr("value")) {
            $(classDiv).remove();
        }
    }

    var index = $.inArray(id, selectedClassList);
    selectedClassList.splice(index, 1);
    classPicList.splice(index, 1);
}

function reloadForm() {
    $('.submit .inp-file').change(function () {
        var fileContent = $(this).val();
        if (fileContent != null && fileContent != "") {

            if (!checkImgType(fileContent)) {
                layer.msg("图片类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
                return false;
            }
            var classId = $(this).parents("li").attr("value");
            $(this).parents(".submit").ajaxSubmit(function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    //$("#imageUrlInput").val(data.fileUrl);

                    var imageUrl = data.fileUrl;
                    loadClassImage(classId, imageUrl);
                    layer.msg(data.message);
                } else {
                    //$("#imageUrlInput").val("");
                    $(".banner img").attr("src", "");
                    layer.msg(data.message);
                }
            });
            return false;
        } else {
            layer.msg("请选择文件", {icon: 5});
        }
    });
}

function loadClassImage(classId, imageUrl) {
    var leftList = $(".add-l");
    for (var i = 0; i < leftList.length; i++) {
        var classDiv = leftList[i];
        if (classId == classDiv.dataset.classid) {
            //$(classDiv).remove();
            $(classDiv).find("img").attr("src", imageUrl);
            classPicList[i] = imageUrl;
        }
    }
}

function saveCourseTopic() {
    var name = $("#z-title").val();
    var description = $("#z-maioshu").val();
    var coverUrl = $("#topicCoverImgUrl").val();
    var detailPicUrl = $("#topicDetailImgUrl").val();

    if (name == "") {
        layer.msg("专题名称不能为空！", {icon: 5});
        return false;
    }
    if (name.length > 15) {
        layer.msg("专题名称不要超过15！", {icon: 5});
        return false;
    }

    if (description == "") {
        layer.msg("专题描述不能为空！", {icon: 5});
        return false;
    }
    if (description.length > 35) {
        layer.msg("专题描述长度不要超过35！", {icon: 5});
        return false;
    }
    if (coverUrl == "") {
        layer.msg("封面图不能为空,请上传！", {icon: 5});
        return false;
    }

    if (detailPicUrl == "") {
        layer.msg("详情图不能为空,请上传！", {icon: 5});
        return false;
    }

    var loginId = getCookie('loginId');
    var requestJson = {
        type: $("#type option:selected").val(),
        name: name,
        description: description,
        cityId: sessionStorage.priorityCityId,
        categoryId: sessionStorage.priorityCategoryId,
        pubFlag: true,
        coverUrl: coverUrl,
        detailPicUrl: detailPicUrl,
        publisherId: loginId,
        //publishTime:publishTime,
        //enderId: loginId,
        //endTime:endTime,
        creatorId: loginId,
        //createTime:createTime,
        //updateId:updateId,
        //updateTime:updateTime,
        items: ""
    };
    var serverId = "";
    var successMsg = "";
    var errorMsg = "";

    serverId = "3c0f15f5f87748cea40f6b080fde2138";
    successMsg = "保存成功!";
    errorMsg = "保存失败!";

    var d = constructionParams(rsaEncryptedString(requestJson), serverId);
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url:'http://localhost:8080/market/courseTopic/addTopic.do',
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                requestJson.id = json.id;
                clearTopic();
                $('.view-addcon-layer .div1').show();
                $('.view-addcon-layer .div2, .view-addcon-layer .div3').hide();
                selectedTopicList.push(requestJson.id);
                addCourseTopic(requestJson);
                layer.msg(successMsg, {icon: 6});
            } else {
                layer.msg(errorMsg, {icon: 5});
            }
        }
    });
}

function clearTopic() {
    $("#z-title").val('');
    $("#num-huodong").html("0");
    $("#num-miaoshu").html("0");
    $("#z-maioshu").val('');
    $("#topicCoverImgUrl").val('');
    $("#topicDetailImgUrl").val('');
    $(".xdf_upload01 img").attr("src", "../../images/xdf_load-.png");
    $(".topic-img-file").val('');
}

function addCourseTopic(topic) {
    var left = "";
    var right = "";
    var topicId = topic.id;

    //topic.minPrice = 0;
    //topic.signNum = 0;
    left += '<div class="ztcon" data-topicId="' + topicId + '">';
    left += '<div class="zz-tool">';
    left += '<a href="javascript:void(0);" class="t1" onclick="editTopic()"></a>';
    left += '<a href="javascript:void(0);" class="t2" onclick="toPreview(\'" + id + "\')"></a>';
    left += '<a href="javascript:void(0);" class="t3" onclick="removeTopic(\'' + topicId + '\')"></a>';
    left += '</div>';
    left += '<img src="' + topic.coverUrl + '" />';
    left += '<h5>' + topic.name + '</h5>';
    left += '<div class="clearfix">';
    left += '<div class="nn"><i>￥</i><span>' + topic.minPrice + '</span>起</div>';
    left += '<div class="bb">已有' + topic.signNum + '人报班';
    left += '</div>';
    left += '</div>';
    left += '</div>';

    right += '<li value="' + topicId + '"><a href="#" onclick="removeTopic(\'' + topicId + '\')">移除</a><span>' + topic.name + '</span></li>'

    $('.z1 .add').before(left);
    $(".div1 .xdf_content_next ul").append(right);
}

function addClass(classItem) {
    var className = classItem.sName;
    var classId = classItem.sCode;
    var left = "";
    var right = "";
    left += '<div class="add-l" data-classid="' + classId + '">';
    left += '<div class="ztcon2">';
    left += '<div class="zz-tool">';
    left += '<a href="javascript:void(0);" class="t1"></a>';
    left += '<a href="javascript:void(0);" class="t2"></a>';
    left += '<a href="javascript:void(0);" class="t3" onclick="removeClass(\'' + classId + '\')"></a>';
    left += '</div>';
    left += '<img src="../../images/xdf_addpic.png" />';
    left += '<h5>' + className + '</h5>';
    left += '<p>开课时间:2月1日</p>';
    left += '<div class="nn"><i>￥</i><span>5580</span>起</div>';
    left += '<div class="xx">查看详情</div>';
    left += '</div>';
    left += '</div>';

    right += '<li value="' + classId + '">';
    right += '<form action="' + Global.baseUploadPath + 'upload/uploadFile.do" method="post" class="submit" enctype="multipart/form-data">';
    right += '<span>' + className + '</span>';
    right += '<label>上传封面图</label>';
    right += '<input type="file" class="inp-file" name="file"/>';
    right += '<input type="hidden" name="width" value="346">';
    right += '<input type="hidden" name="height" value="230">';
    right += '<a href="#" onclick="removeClass(\'' + classId + '\')">移除</a>';
    right += '</form></li>';

    $('.z2 .add-l').last().before(left);
    $(".div3 .xdf_content_next ul").append(right);
}

function savePriority(isPublish){
    if (isPublish) {
        layer.confirm("确认发布？", {
            btn: ['发布', '取消'] //按钮
        }, function () {
            saveOrPublishPriority(isPublish);
        }, function () {

        });
    } else {
        saveOrPublishPriority(isPublish);
    }
}

function saveOrPublishPriority(isPublish) {
    layer.load(2);
    var loginId = getCookie('loginId');
    var requestParam = {
        id: id,
        name: $("#priorityName").val(),
        cityId: sessionStorage.priorityCityId,
        categoryId: sessionStorage.priorityCategoryId,
        coverUrl: $(".banner img").attr("src"),
        status: 1,
        publisherId: loginId,
        updateId: loginId,
        topics: selectedTopicList.join(","),
        classes: selectedClassList.join(","),
        classPics: classPicList.join(","),
        pubFlag: isPublish
    };
    var d = constructionParams(rsaEncryptedString(requestParam), "cb4f7fe6588c44e5a6bcd790294b6fbb");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://10.200.80.196:8080/market/priority/updatePriority.do",
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                layer.msg(json.message, {icon: 6,time:2000, offset: '300px'},function(){
                    layer.closeAll('loading');
                });
                if (isPublish) {
                    window.location.href = "preferList.html";
                }
            } else {
                layer.closeAll('loading');
                layer.msg("添加失败!", {icon: 5});
            }
        }
    });
}


function showInfo() {
    var requestParam = {
        id: id
    };
    var d = constructionParams(rsaEncryptedString(requestParam), "e82e94188b7f4b2abe87dc433b5b47ef");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://localhost:8080/xdfmanager/priority/getPriority.do",
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        //data: JSON.stringify(requestParam),
        success: function (json) {
            if (json.result == true) {
                var priority = json.data;
                var topicList = json.topicList;
                var classList = json.classList;
                sessionStorage.priorityCityId = priority.cityId;
                sessionStorage.priorityCategoryId = priority.categoryId;
                $(".site").html(priority.cityName);
                $(".course").html(priority.categoryName);
                $("#priorityName").val(priority.name);
                $(".banner img").attr("src", priority.coverUrl);
                for (var i = 0; i < topicList.length; i++) {
                    var topic = topicList[i];
                    selectedTopicList.push(topic.id);
                    addCourseTopic(topic);
                }
                for (var i = 0; i < classList.length; i++) {
                    var c = classList[i];
                    selectedClassList.push(c.sCode);
                    classPicList.push(c.classPic);
                    addClass(c);
                }
            } else {
                layer.msg("添加失败!", {icon: 5});
            }
        }
    });
}


function search() {
    var nameText = $.trim($("#nameText").val());
    if (nameText == null || nameText == '') {
        layer.msg('搜索名称不能为空', {icon: 5});
        $("#nameText").focus();
        return false;
    }
    //var itemIds = [];
    //if (document.getElementById("btnName")) {
    //    var obj_lis = document.getElementById("btnName").getElementsByTagName("li");
    //    for (var i = 1; i < obj_lis.length; i++) {
    //        itemIds.push($(obj_lis[i]).attr("value"));
    //    }
    //}
    //var items = itemIds.join(",")
    var type = $("#type").find("option:selected").val();

    var businessP = {
        sName: nameText,
        cityId: sessionStorage.priorityCityId,
        categoryId: sessionStorage.priorityCategoryId
    };
    var serviceId = '';
    if (type == 1) {
        serviceId = '50fa9d930bd240a48f5e560013922888';
    } else {
        serviceId = '7b2011eaf0294b94bd5940958806dc5b';
    }
    var d = constructionParams(rsaEncryptedString(businessP), serviceId);
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                topicItemList = json.dataList;
                var str = "";

                //str += "<ul id='newBlockId'>"
                var titleLi;
                if (type == 1) {
                    titleLi = "<li>课程名称</li>"
                } else if (type == 2) {
                    titleLi = "<li>班级名称</li>"
                }
                str += titleLi;
                if (topicItemList.length > 0) {
                    $('.div2 .search-not').css('display', 'none');
                    $('.div2 .new_block').css("display", "block");
                    var count = 0;
                    for (var i = 0; i < topicItemList.length; i++) {
                        var id = type == 1 ? topicItemList[i]["code"] : topicItemList[i]["sCode"];
                        var name = type == 1 ? topicItemList[i]["name"] : topicItemList[i]["sName"];
                        //str += "<li><input type='checkbox' name='checkbox' onchange='myfunction(this)' value=\"" + id + "," + name + "\" class='cheName'/>" + name + "</li>";
                        var checked = false;
                        if ($.inArray(id, topicSelectedItemList) >= 0) {
                            checked = true;
                            count++;
                        }
                        str += '<li><a href="javascript:void(0);"><input type="checkbox" ' + (checked ? 'checked="true"' : '') + ' value="' + id + '" data-index="' + i + '" onchange="showSelected(2)"></a><span>' + name + '</span></li>';
                    }
                    $(".div2 .new_block ul").html(str);
                    $(".div2 .new_block .selectText").html("已选" + count);
                } else {
                    $('.div2 .new_block ul').html(titleLi);
                    $(".div2 .new_block .selectText").html("已选0");
                    $('.div2 .new_block').css('display', 'none');
                    $('.div2 .search-not').css('display', 'block');
                }
                //str += "</ul>"
                //str += "<p><span style='margin-left: 5px;margin-right: 135px;' id='spanText'' id='spanText'></span><a href='#' onclick='newBtn()' id='new_btn'>添加</a><a href='#' onclick='newClose()' id='new_close'>取消</a></p>"
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}


function removeTopicItem(itemId) {
    var rightList = $(".div2 .xdf_content_next li");
    for (var i = 0; i < rightList.length; i++) {
        var topicDiv = rightList[i];
        if (itemId == $(topicDiv).attr("value")) {
            $(topicDiv).remove();
        }
    }

    topicSelectedItemList.splice($.inArray(itemId, topicSelectedItemList), 1);

    if (topicSelectedItemList.length == 0) {
        $("#type").removeAttr("disabled");
    }
}

//预览
function toPreview(id) {
    window.open('../../view/page/preferView.html?id=' + id);
}