var id='';
var totalCounts = 0;
var currentPage = 1;
var pageSize = 10;
var flag;
var currentCityId = "";
$(function () {
    $("form[enctype]").attr("action",Global.baseUploadPath+$("form[enctype]").attr("action"));
    var request = getRequest();
    currentCityId = request["currentCityId"];
    flag = request["flag"];
    if (flag == "new") {
        findArea(currentCityId);
        $("#titleId").html("新建专题");
    } else if (flag == "edit") {
        $("#titleId").html("修改专题");
        id = request["id"];
        showInfo(id);
    }


    var functionIds = getCookie("functionIds");
    if (functionIds.length > 0) {
        functionIds = functionIds.split(",");
    }
    if (functionIds.length > 0) {
        if ($.inArray('20203', functionIds) >= 0) {
            $(".yellow").css("display", "block");
        }
    }

    $("input[type=file]").change(function () {
        $(this).parents(".uploader").find(".filename").val($(this).val());

    });

    $('#first1').change(function () {
        if ($("#first1").val() != null & $("#first1").val() != "") {

            if (!checkImgType($("#first1").val())) {
                layer.msg("专题图片类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
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

function upload(_this) {
    if ($(_this.parentNode).prev().find('input[name="first4"]').val() != null && $(_this.parentNode).prev().find('input[name="first4"]').val() != "") {

        if (!checkImgType($(_this.parentNode).prev().find('input[name="first4"]').val())) {
            layer.msg("专题图片类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
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


//专题保存
function save(status) {
    layer.load(2,{
        shade: [0.1,'#fff'] //0.1透明度的白色背景
    });//遮罩加载
    var userId = getCookie("loginId");
    var areaId = $("#area").find("option:selected").val();
    var ckName = $("#ckName").val();//活动名称
    var coverUrl = $("#imageUrlInput").val();//筹课配图
    var status = status;

    if (ckName.length <= 0) {
        layer.msg('专题名称不能为空', {icon: 5});
        $("#ckName").focus();
        layer.closeAll('loading');
        return false;
    }
    if (ckName.length > 15) {
        layer.msg('专题名称不能超过15个汉字!', {icon: 5});
        $("#ckName").focus();
        layer.closeAll('loading');
        return false;
    }
    if (coverUrl.length <= 0) {
        layer.msg('请上传专题配图!', {icon: 5});
        layer.closeAll('loading');
        return false;
    }

    //var e = window.event;
    //e.target.disabled = true;

    var status = status;

    var obj_lis_ll = document.getElementById("btnName");
    if (obj_lis_ll == null) {
        layer.msg('请选择关联内容!', {icon: 5});
        layer.closeAll('loading');
        return false;
    }
    var itemIds = [];
    var obj_lis = document.getElementById("btnName").getElementsByTagName("li");
    for (var i = 1; i < obj_lis.length; i++) {
        itemIds.push($(obj_lis[i]).attr("value"));
    }

    var businessP = {
        "id": id,
        "userId": userId,
        "name": ckName,
        "coverUrl": coverUrl,
        "status": status,
        "cityId": areaId,
        "itemIds": itemIds.join(",")
    };
    var serviceId = "";
    var successMsg = "";
    var errorMsg = "";
    if (flag == "new") {
        serviceId = "c0edec24ac0048499dc8c7aa73932224";
        successMsg = "保存成功!";
        errorMsg = "保存失败!";
    } else if (flag == "edit") {
        serviceId = "d735e56cf9a14e4bb1bda1f307a66664";
        successMsg = "修改成功!";
        errorMsg = "修改失败!";
    }
    var d = constructionParams(rsaEncryptedString(businessP), serviceId);

    //$('.disableCss').removeAttr('onclick');

    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url:'http://localhost:8080/market/topic/updateTopic.do',
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                if (status == "2") {
                    layer.confirm("确认发布？", {
                        btn: ['发布', '取消'] //按钮
                    }, function () {
                        layer.msg(successMsg, {icon: 6});
                        if(currentCityId != undefined ) {
                            window.location.href = 'topicList.html?currentCityId=' + currentCityId;
                        }else{
                            window.location.href = 'topicList.html';
                        }
                    }, function () {

                    });
                } else {
                    layer.msg(successMsg, {icon: 6});
                    if(currentCityId != undefined ) {
                        window.location.href = 'topicList.html?currentCityId=' + currentCityId;
                    }else{
                        window.location.href = 'topicList.html';
                    }
                }
            } else {
                layer.msg(errorMsg, {icon: 5});

                if(('.xdf_footerlist').find('a').hasClass('green')){
                    $('.disableCss').attr('onclick=save("1")');
                }
                if(('.xdf_footerlist').find('a').hasClass('yellow')){
                    $('.disableCss').attr('onclick=save("2")');
                }
            }
            layer.closeAll('loading');
        }
    });
}


//搜索
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
        "type": type,
        "nameText": nameText,
        "topicId":id
    };
    var d = constructionParams(rsaEncryptedString(businessP), "f525c0bbdc8540cfa96b27a01b90ae95");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url:'http://localhost:8080/market/topic/findTypeContent.do',
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
                    str += "<li>资讯名称</li>"
                } else if (type == 2) {
                    str += "<li>资料名称</li>"
                } else if (type == 3) {
                    str += "<li>活动名称</li>"
                }
                if (ckList.length > 0) {
                    for (var i = 0; i < ckList.length; i++) {
                        var id = ckList[i]["id"];
                        var name = ckList[i]["name"];
                        var coverUrl= ckList[i]["coverUrl"];
                        if(items.indexOf(id+"-"+type)<0){
                            if (coverUrl != null && coverUrl != "") {
                                str += "<li><input type='checkbox' name='checkbox' onchange='myfunction(this)' value=\"" + id + "," + type + "," + name + "\" class='cheName'/>【图】" + name + "</li>"
                            }else{
                                str += "<li><input type='checkbox' name='checkbox' onchange='myfunction(this)' value=\"" + id + "," + type + "," + name + "\" class='cheName'/>" + name + "</li>"
                            }
                            }
                        ckList.splice(i, 0);
                    }
                } else {
                    str += '<span style="color:#45AFE1">没有搜索到相关数据!</span>'
                }
                str += "</ul>"
                str += "<p><span style='margin-left: 5px;margin-right: 135px;' id='spanText'></span><a href='#' onclick='newBtn()' id='new_btn'>添加</a><a href='#' onclick='newClose()' id='new_close'>取消</a></p>"
                $(".new_block").html(str);
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}

function newBtn() {
    $('.new_block').css("display", "none");
    $('.xdf_content_next').css("display", "block");

    var ck = document.getElementsByName("checkbox");
    var list = $("#btnName").find("li");
    if (list.length < 2) {
        var str = "";
        str += "<ul id='btnName'>";
        str += "<li>已关联内容</li>"
        for (var i = 0; i < ck.length; i++) {
            if (ck[i].checked == true || ck[i].checked == "checked") {
                var strlen = ck[i].value;
                var id = strlen.split(',')[0];
                var type = strlen.split(',')[1];
                var text = strlen.split(',')[2];
                //str += "<li value=\"" + id + "-" + type + "\"><a href='#' onclick='delName(\""+id+"\");'>移除</a><span>" + text + "</span></li>"
                str += "<li value=\"" + id + "-" + type + "\"><a href='#' onclick='delName(this);'>移除</a><span>" + text + "</span></li>"
            }
        }
        str += "</ul>";
        $(".xdf_content_next").html(str);
    } else {
        var isExist=[];
        for(var i=1;i<$(list).length;i++){
            isExist.push($(list[i]).attr("value"))
        }
        for (var i = 0; i < ck.length; i++) {
            if (ck[i].checked == true || ck[i].checked == "checked") {
                var strlen = ck[i].value;
                var id = strlen.split(',')[0];
                var type = strlen.split(',')[1];
                var text = strlen.split(',')[2];

                if(isExist.join(",").indexOf(id + "-" + type)<0){
                    //$("#btnName").append("<li value=\"" + id + "-" + type + "\"><a href='#' onclick='delName(\""+id+"\");'>移除</a><span>" + text + "</span></li>");
                    $("#btnName").append("<li value=\"" + id + "-" + type + "\"><a href='#' onclick='delName(this);'>移除</a><span>" + text + "</span></li>");
                }
            }
        }

    }
}

function newClose() {
    $('.new_block').css("display", "none");
    $('.xdf_content_next').css("display", "block");
}


function delName(_this) {
    var text = $(_this).parent().find("span").html();
    var value =  $(_this).parent().attr("value");
    var param = $("#nameText").val();
    $(_this).parent().remove();
    if(text.toLowerCase().indexOf(param.toLowerCase())>-1 && $("#type").find("option:selected").val()==value.split("-")[1]){
        $('#newBlockId').append("<li><input type='checkbox' name='checkbox' onchange='myfunction(this)' value=\"" + value + "\" class='cheName'/>" + text + "</li>");
    }
    //var businessP = {
    //    "id": id
    //};
    //var d = constructionParams(rsaEncryptedString(businessP), "5aaa44be0efc4d81b181c0e3effecc23");
    //jQuery.ajax({
    //    type: "POST",
    //    url: Global.actionURL,
    //    //url:'http://localhost:8080/market/topic/delTopicItem.do',
    //    async: true,
    //    dataType: 'json',
    //    data: JSON.stringify(d),
    //    success: function (json) {
    //        if (json.result == true) {
    //            layer.msg("移除成功!", {icon: 6});
    //            location.reload();
    //        } else {
    //            layer.msg("移除失败!", {icon: 5});
    //        }
    //    }
    //});
}

//查询地区
function findArea(areaId) {
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
                    var loginId = getCookie("loginId");
                    for (var i = 0; i < schoolList.length; i++) {
                        if(schoolList[i].sCode==areaId){
                            str += "<option selected='selected' value=\"" + schoolList[i].sCode + "\">" + schoolList[i].sCity + "</option>"
                        } else if (!areaId && marketJs.loginUserIsAdmin(loginId) && schoolList[i].sCode==1){
                            str += "<option selected='selected' value=\"" + schoolList[i].sCode + "\">" + schoolList[i].sCity + "</option>"
                        } else {
                            str += "<option value=\"" + schoolList[i].sCode + "\">" + schoolList[i].sCity + "</option>"
                        }
                    }
                    $("#area").html(str);
                } else {
                    $("#area").html(str);
                }
            } else {
                layer.msg("查询失败!", {icon: 5});
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
    var businessP = {"topicId": id};
    var d = constructionParams(rsaEncryptedString(businessP), "e45a1ff95e4f4dcf84f1cbea46ea5be7");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url:'http://localhost:8080/market/topic/getTopic.do',
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                $("#ckId").val(json.topic.id);
                $("#ckName").val(json.topic.name);
                var areaId = json.topic.areaId;
                findArea(areaId);

                $("#hidden1").val(json.topic.coverUrl);//活动配图
                $("#imageUrlInput").val(json.topic.coverUrl);
                if (json.topic.coverUrl) {
                    $("#ckpt").attr("src", json.topic.coverUrl);
                    $("#filename").val(json.topic.coverUrl);
                }
                var type = json.topic.type;
                // search(type,json.topicItem);

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

                var ck = json.topicItem;
                if (ck.length > 0) {
                    $('.new_block').css("display", "none");
                    $('.xdf_content_next').css("display", "block");
                    var str = "";
                    str += "<ul id='btnName'>";
                    str += "<li>已关联内容</li>"
                    for (var i = 0; i < ck.length; i++) {
                        var id = ck[i]["id"];
                        var type1 = ck[i]["type"];
                        var itemId = ck[i]["itemId"];
                        var name = ck[i]["name"];
                        var coverUrl= ck[i]["coverUrl"];
                        //str += "<li value=\"" + itemId + "-" + type1 + "\"><a href='#' onclick='delName(\"" + id + "\");'>移除</a><span>" + name + "</span></li>"
                        if (coverUrl != null && coverUrl != "") {
                            str += "<li value=\"" + itemId + "-" + type1 + "\"><a href='#' onclick='delName(this);'>移除</a><span>【图】" + name + "</span></li>"
                        }else{
                            str += "<li value=\"" + itemId + "-" + type1 + "\"><a href='#' onclick='delName(this);'>移除</a><span>" + name + "</span></li>"
                        }
                        }
                    str += "</ul>";
                    $(".xdf_content_next").html(str);
                }
            }
        }
    });
}

//刷新
function reload() {
    location.reload();
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

function changeE(){
    $(".new_block").hide();
    $("#nameText").val('');
}