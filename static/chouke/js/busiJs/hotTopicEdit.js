var flag;
var id;
var name;
var currentCityId = '';
var currentCategoryId = "";
$(function () {
    $("form[enctype]").attr("action",Global.baseUploadPath+$("form[enctype]").attr("action"));
    var request = getRequest();
    flag = request["flag"];
    id = request["id"];

    if (flag == "new") {
        $("#title").html("新建专题");
        $("#cityId").val(sessionStorage.cityId);
        $("#categoryId").val(sessionStorage.categoryId);
    } else if (flag == "edit") {
        $("#title").html("编辑专题");
        showInfo();
    }

    $("input[type=file]").change(function () {
        $(this).parents(".uploader").find(".filename").val($(this).val());

    });

    $("input[type=file]").each(function () {
        if ($(this).val() == "") {
            $(this).parents(".uploader").find(".filename").val("请选择图片...");
        }
    });

    $('#first1').change(function () {
        if ($("#first1").val() != null & $("#first1").val() != "") {

            if (!checkImgType($("#first1").val())) {
                layer.msg("图片类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
                return false;
            }

            $("#submit-1").ajaxSubmit(function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    $("#imageUrlInput").val(data.fileUrl);
                    $("#coverId").attr("src", data.fileUrl);
                    $("#m1").html(data.message);
                } else {
                    $("#imageUrlInput").val(data.fileUrl);
                    $("#coverId").attr("src", data.fileUrl);
                    $("#m1").html(data.message);
                }
            });
            return false;
        } else {
            layer.msg("请选择文件", {icon: 5});
        }
    });
    $('#first2').change(function () {
        if ($("#first2").val() != null & $("#first2").val() != "") {

            if (!checkImgType($("#first2").val())) {
                layer.msg("图片类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
                return false;
            }

            $("#submit-2").ajaxSubmit(function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    $("#imageUrlDetail").val(data.fileUrl);
                    $("#detailId").attr("src", data.fileUrl);
                    $("#m2").html(data.message);
                } else {
                    $("#imageUrlDetail").val(data.fileUrl);
                    $("#detailId").attr("src", data.fileUrl);
                    $("#m2").html(data.message);
                }
            });
            return false;
        } else {
            layer.msg("请选择文件", {icon: 5});
        }
    });

    /*点击文字消失*/
    $('#z-maioshu').focusout(function () {
        tip_a($(this));
    });
    function tip_a(a) {
        var peth_y = a.parent().find('.yes');
        var peth_n = a.parent().find('.error');
        var peth_t = a.parent().find('.note');
        if (a.val().length == 0) {
            peth_y.css('display', 'none');
            peth_n.css('display', 'inline-block');
            peth_t.show();
            //a.css('border', 'solid 1px #ff6e68');
        } else {
            peth_n.css('display', 'none');
            peth_y.css('display', 'inline-block');
            peth_t.hide();
            //a.css('border', 'solid 1px #fff');
        };
    };
    $('textarea').each(function () {
        if ($(this).val().length > 0) {
            $(this).parent().find('.note').hide();
        }
    });
    $('.note').on('click', function () {
        $(this).parent().find('textarea').focus();
    });
    $('.xdf_inputbox-x textarea').on('focusin', function () {
        $(this).parent().find('.note').hide();
    });
    $("#switch").click(function(){
        $('.releasee-bomb').show();
    });
    $(".releasee-bomb .btn-gray, .releasee-bomb .btn-green").click(function(){
        $('.releasee-bomb').hide();
        var selectType = $("#type");
        var selectVal = selectType.val();
        selectVal == 1 ? selectType.val(2) : selectType.val(1);
    });
    $(".btn-green").on('click', function(){
        $(".xdf_content_next").hide();
        $("#nameText").val('');
        $("#btnName").html('');
        $(".xdf_content_next").html('');
        toplag = 0;
        var selectType = $("#type");
        var selectVal = selectType.val();
        selectVal == 1 ? selectType.val(2) : selectType.val(1);
    });
});
function newBtn() {
    $('.new_block').css("display", "none");
    $('.xdf_content_next').css("display", "block");
    toplag = 0;
    var ck = document.getElementsByName("checkbox");
    var list = $("#btnName").find("li");
    if (list.length < 2) {
        var str = "";
        str += "<ul id='btnName'>";
        var count = 0;
        var temp = "";
        for (var i = 0; i < ck.length; i++) {
            if (ck[i].checked == true || ck[i].checked == "checked") {
                count += 1;
                var strlen = ck[i].value;
                var id = strlen.split(',')[0];
                var text = strlen.split(',')[1];
                temp += "<li value=\"" + id  + "\"><a href='#' onclick='delName(this);'>移除</a><span>" + text +"【"+id+"】" + "</span></li>"
            }
        }
        str += "<li>"+"已关联内容</li>";
        str += temp;
        str +="<li id='yglnr'>共"+count+"项结果</li>"
        str += "</ul>";
        $(".xdf_content_next").html(str);
    } else {
        var isExist=[];
        for(var i=1;i<$(list).length-1;i++){
            isExist.push($(list[i]).attr("value"))
        }
        var tempCount = 0;
        for (var i = 0; i < ck.length; i++) {
            if (ck[i].checked == true || ck[i].checked == "checked") {
                var strlen = ck[i].value;
                var id = strlen.split(',')[0];
                var text = strlen.split(',')[1];

                if(isExist.join(",").indexOf(id)<0){
                    tempCount += 1;
                    $("#yglnr").before("<li value=\"" + id + "\"><a href='#' onclick='delName(this);'>移除</a><span>" + text +"【"+id+"】" + "</span></li>");
                }
            }
        }
        var count = tempCount + isExist.length;
        $("#yglnr").text("共"+count+"项结果");
    }
}
function search() {
    var nameText = $("#nameText").val();
    if (nameText == null || nameText == '') {
        layer.msg('搜索名称不能为空', {icon: 5});
        $("#nameText").focus();
        return false;
    }
    var itemIds = [];
    if(document.getElementById("btnName")){
        var obj_lis = document.getElementById("btnName").getElementsByTagName("li");
        for (var i = 1; i < obj_lis.length; i++) {
            itemIds.push($(obj_lis[i]).attr("value"));
        }
    }
    var items=itemIds.join(",")
    var type = $("#type").find("option:selected").val();

    var businessP = {
        sName:nameText,
        topicId:id,
        cityId:$("#cityId").val()
    };
    var serviceId = '';
    if(type==1){
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
                var ckList = json.dataList;
                var str = "";
                $('.new_block').css("display", "block");
                str += "<ul id='newBlockId'>"
                if (type == 1) {
                    str += "<li>课程名称及课程编号</li>"
                } else if (type == 2) {
                    str += "<li>班级名称及班级编号</li>"
                }
                if (ckList.length > 0) {
                    for (var i = 0; i < ckList.length; i++) {
                        var id = type==1?ckList[i]["code"]:ckList[i]["sCode"];
                        var name = type==1?ckList[i]["name"]:ckList[i]["sName"];
                        if(items.indexOf(id)<0){
                            str += "<li><input type='checkbox' name='checkbox' onchange='myfunction(this)' value=\"" + id  + "," + name + "\" class='cheName'/>" + name+"【"+id+"】" + "</li>"
                        }
                        ckList.splice(i, 0);
                    }
                } else {
                    str += '<span style="color:#45AFE1">没有搜索到相关数据!</span>'
                }
                str += "</ul>"
                str += "<p><span style='margin-left: 5px;margin-right: 135px;' id='spanText'' id='spanText'></span><a href='#' onclick='newBtn();' id='new_btn'>添加</a><a href='#' onclick='newClose();' id='new_close'>取消</a></p>"
                $(".new_block").html(str);
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}
function newClose() {
    $('.new_block').css("display", "none");
    $('.xdf_content_next').css("display", "block");
}
function checkImgType(file) {
    if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|JPEG|PNG|BMP)$/.test(file)) {
        return false;
    }
    return true;
}
var toplag = 0;
function myfunction(that) {
    if (that.checked) {
        toplag = toplag + 1;
    } else {
        toplag = toplag - 1;
    }
    $('#spanText').html('已选' + toplag);
}

function save(isPublish){
    if (isPublish) {
        layer.confirm("确认发布？", {
            btn: ['发布', '取消'] //按钮
        }, function () {
            saveOrPublish(isPublish);
        }, function () {

        });
    } else {
        saveOrPublish(isPublish);
    }
}

//编辑热点保存数据
function saveOrPublish(isPublish) {
    layer.load(2);
    var name = $("#z-title").val();
    var description = $("#z-maioshu").val();
    var coverUrl = $("#imageUrlInput").val();
    var detailPicUrl = $("#imageUrlDetail").val();
    var publisherId = isPublish == true ? getCookie("loginId") : $("#publisherId").val();
    var enderId =  $("#enderId").val();
    var creatorId = flag=='new'?getCookie("loginId"):$("#creatorId").val();
    var updateId = flag=='edit'?getCookie("loginId"):$("#updateId").val();
    var publishTime = $("#publishTime").val();
    var endTime = $("#endTime").val();
    var createTime = $("#createTime").val();
    var updateTime = $("#updateTime").val();
    var obj_lis_ll = document.getElementById("btnName");
    if (obj_lis_ll == null) {
        layer.msg('请选择关联内容!', {icon: 5});
        layer.closeAll('loading');
        return false;
    }
    var itemIds = [];
    var obj_lis = document.getElementById("btnName").getElementsByTagName("li");
    for (var i = 1; i < obj_lis.length-1; i++) {
        itemIds.push($(obj_lis[i]).attr("value"));
    }
    if (name == "") {
        layer.msg("专题名称不能为空！", {icon: 5});
        layer.closeAll('loading');
        return false;
    }
    if (name.length > 15) {
        layer.msg("专题名称不要超过15！", {icon: 5});
        layer.closeAll('loading');
        return false;
    }

    if ( description == "") {
        layer.msg("专题描述不能为空！", {icon: 5});
        layer.closeAll('loading');
        return false;
    }
    if ( description.length > 35) {
        layer.msg("专题描述长度不要超过15！", {icon: 5});
        layer.closeAll('loading');
        return false;
    }
    if(coverUrl==""){
        layer.msg("封面图不能为空,请上传！", {icon: 5});
        layer.closeAll('loading');
        return false;
    }

    if(detailPicUrl==""){
        layer.msg("详情图不能为空,请上传！", {icon: 5});
        layer.closeAll('loading');
        return false;
    }

    var requestJson = {
        id: id,
        type: $("#type option:selected").val(),
        name: name,
        description: description,
        cityId: $("#cityId").val(),
        categoryId: $("#categoryId").val(),
        pubFlag: isPublish,
        coverUrl: coverUrl,
        detailPicUrl: detailPicUrl,
        publisherId: publisherId,
        publishTime: publishTime,
        enderId: enderId,
        endTime: endTime,
        creatorId: creatorId,
        createTime: createTime,
        updateId: updateId,
        updateTime: updateTime,
        items: itemIds.join(",")
    };
    var serverId = "";
    var successMsg = "";
    var errorMsg = "";
    if (flag == "edit") {
        serverId = "f5a3d1401a76460d88bdc826ec7d408c";
        successMsg = "更新成功!";
        errorMsg = "更新失败!";
    } else {
        serverId = "3c0f15f5f87748cea40f6b080fde2138";
        successMsg = "保存成功!";
        errorMsg = "保存失败!";
    }
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
                layer.msg(successMsg, {icon: 6, time: 1000}, function () {
                    if (isPublish) {
                        window.location.href = 'hotTopicList.html';
                    } else {
                        window.location.href = 'hotTopicList.html?flag=edit&id=' + json.id;
                    }
                });
            } else {
                layer.closeAll('loading');
                layer.msg(errorMsg, {icon: 5});
            }
        }
    });
}

function toPreview() {
    if(id){
        window.open('../../view/page/topicLessonList.html?id=' + id);
    } else {
        layer.msg("保存成功后才可预览!", {icon: 5});
    }
}
function delName(_this) {
    var obj_lis = document.getElementById("btnName").getElementsByTagName("li");
    $("#yglnr").text("共"+(obj_lis.length-3)+"项结果");
    $(_this).parent().remove();
    toplag = toplag - 1;//移除一个记录后，将已选记录数减1
    layer.msg("移除成功", {icon: 6});
    var text = $(_this).parent().find("span").html().split("【")[0];
    var value = $(_this).parent().attr("value");
    var param = $("#nameText").val();
    if(text.toLowerCase().indexOf(param.toLowerCase())>-1){
        $('#newBlockId').append("<li><input type='checkbox' name='checkbox' onchange='myfunction(this)' value=\"" + value  + "," + text + "\" class='cheName'/>" + text +"【"+value+"】</li>");
    }
}

function showInfo() {
    var businessP = {"id": id};
    var d = constructionParams(rsaEncryptedString(businessP), "6cbfd7d714d648039f6634092c5a48ab");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url:'http://localhost:8080/market/hotspotEvent/getHotspotEvent.do',
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var topic = json.data;
                id=topic.id;
                name=topic.name;
                $("#z-title").val(topic.name);
                $("#z-maioshu").val(topic.description);
                $("#coverId").attr("src", topic.coverUrl);
                $("#imageUrlInput").val(topic.coverUrl);
                $("#detailId").attr("src", topic.detailPicUrl);
                $("#imageUrlDetail").val(topic.detailPicUrl);
                $("#cityId").val(topic.cityId);
                $("#categoryId").val(topic.categoryId);
                var type = topic.type;

                if (type != null) {
                    var slt = document.getElementById("type");
                    for (var i = 0; i < slt.options.length; i++) {
                        if (slt.options[i].value == type) {
                            slt.options[i].selected = true;
                            break;
                        }
                    }
                } else {
                    type = $("#type").find("option:selected").val();
                }

                var ck = json.itemList;
                if (ck.length > 0) {
                    $('.new_block').css("display", "none");
                    $('.xdf_content_next').css("display", "block");
                    var str = "";
                    str += "<ul id='btnName'>";
                    str += "<li>已关联内容</li>"
                    for (var i = 0; i < ck.length; i++) {
                        var id = type==1?ck[i]["code"]:ck[i]["sCode"];
                        var name = type==1?ck[i]["name"]:ck[i]["sName"];
                        str += "<li value=\"" + id + "\"><a href='#' onclick='delName(this);'>移除</a><span>" + name +"【"+id+"】" + "</span></li>"
                    }
                    str +="<li id='yglnr'>共"+ck.length+"项结果</li>"
                    str += "</ul>";
                    $(".xdf_content_next").html(str);
                }
            }
        }
    });
}

function changeE(){
    $(".new_block").hide();
    var children = $(".xdf_content_next ul").children();
    if(children.length > 1){
        $(".releasee-bomb").fadeIn();
    }
}

$(function(){
    //限定字数
    $('#z-title').keyup(function (e) {
        var keycode = e.which;
        if(keycode==13){
            e.preventDefault();
            return false
        }
        var lv = $(this).val().length;
        $('#num-huodong').html(lv)
    }).keyup();
    $('#z-maioshu').keydown(function (e) {
        var keycode = e.which;
        if(keycode==13){
            return false
        }
    });
    $('#z-maioshu').keyup(function (e) {
        var lv = $(this).val().length;
        $('#num-miaosu').html(lv)
    })
})
