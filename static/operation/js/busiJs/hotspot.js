/**
 * Created by diwenchao on 2016/7/7.
 */
var firstIn = true;
var currentCityId = '';
var currentCategoryId = '';
var sourceType = '';
var nameText = '';
var switchFlag = false;
var totalCounts = 0;
var currentPage = 1;
var pageSize = 15;
var currentType = 1;

$(function () {
    findCity();
    findType();
    var request = getRequest();
    var type = request["type"];
    if (type == null) {
        type = 1;
    }
    currentType = type;
    changeHotSpotCenter(currentType);
    //资料保存发布后，如果Excel转换失败，下面为提示信息
    var transFileError = request["transFileError"];
    if (transFileError != undefined && transFileError != "success") {
        layer.msg(decodeURIComponent(transFileError), {icon: 5});
    }

    $(".p176-btn-copylink").trigger("click");
    initSwitch();
});

function changeHotSpotCenter(type) {
    currentType = type;
    changeTag();

    var functionIds = getCookie("functionIds");
    if (functionIds.length > 0) {
        functionIds = functionIds.split(",");
    }
    var functionId = 20100 + 2 * type + '';
    var newFunctionId = 20100 + 2 * type - 1 + '';
    if (functionIds.length > 0) {
        if ($.inArray(functionId, functionIds) >= 0) {
            //findCourse();
            showList(1);
        }
        if($.inArray(newFunctionId, functionIds) >= 0){
            $("#addHotspot").show();
        }
    }
}

function changeTag() {
    $(".xdf_border").removeClass("xdf_border");
    $("#xdf_recommend").children()[currentType - 1].className = "xdf_border";
    var head = "";
    if (currentType == 3) {
        $(".li1").removeClass("li1");
        $(".list1").children()[1].style.display = "none";
        $("#m1").hide();
        head += '<th width="20%">活动名称</th>';
        head += '<th width="15%">发布时间</th>';
        head += '<th width="10%">已报名人数</th>';
        head += '<th width="9%">发布人</th>';
        head += '<th width="6%">状态</th>';
        head += '<th width="40%">更多</th>';
    } else {
        $(".list1").children()[0].className = "li1";
        $(".list1").children()[1].style.display = "block";
        $("#m1").show();
        if(currentType == 1){
            head += '<th width="20%">名称</th>';
            head += '<th width="5%">来源</th>';
            head += '<th width="10%">作者</th>';
        }else {
            head += '<th width="25%">名称</th>';
            head += '<th width="10%">作者</th>';
        }
        head += '<th width="15%">发布时间</th>';
        head += '<th width="9%">发布人</th>';
        head += '<th width="7%">状态</th>';
        head += '<th width="9%">操作人</th>';
        head += '<th width="36%">操作</th>';
    }
    $("#hsListHead").html(head);
}



function initSwitch() {
    //大开关
    $("#m1").unbind('click').click(function () {
        $(this).prev().css("overflow", "hidden");
        if (switchFlag == false) {
            $(this).prev().css("height", $('.hot-classes .list1 li').eq(0).height());
            $(this).css("background-position", "0 -18px");
            switchFlag = true;
            $('.shou:visible,.shou2:visible,.shou3:visible').click();
        } else {
            $(this).prev().css("height", "auto");
            $(this).css("background-position", "0 0");
            switchFlag = false;
        }
    });
    $(".open, .open2").unbind('click').click(function () {
        $(this).parent().parent().css("height", "auto");
        $(this).hide();
        $(this).next().show();
        if (switchFlag) {
            $("#m1").prev().css("height", $('.hot-classes .list1 li').eq(0).height());
        }
    });
    $(".shou, .shou2").unbind('click').click(function () {
        $(this).parent().parent().css("height", "30px");
        $(this).hide();
        $(this).prev().show();
        if (switchFlag) {
            $("#m1").prev().css("height", $('.hot-classes .list1 li').eq(0).height());
        }
    });
}

//搜索
function search() {
    nameText = $.trim($('#nameParamInput').val());
    if (nameText == '请输入关键字' || nameText == null) {
        nameText = "";
    }
    firstIn = true;
    showList(1);
}

//状态  1-待发布 2-已发布 3-下线'
function showList(page) {

    var requestJson = {
        type: currentType,
        cityId: currentCityId,
        categoryId: currentCategoryId,
        sourceType: sourceType,
        nameText: nameText,
        currentPage: page,
        pageSize: pageSize,
        loginId:getCookie("loginId")
    };
    var serverId = "";
    if (currentType == 3) {
        serverId = "e0a9c5c3b40f415aa7fede9ffa420af3";
    } else {
        serverId = "7fbb6f4293764fe292ac8821859745f8";
    }
    var d = constructionParams(rsaEncryptedString(requestJson), serverId);
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
                if (currentType == 3) {
                    showEvent(json);
                } else {
                    showZixunOrZiliao(json);
                }
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}

function showZixunOrZiliao(json) {
    var hsList = json.dataList;
    var str = "";
    for (var i = 0; i < hsList.length; i++) {
        var id = hsList[i]["id"];
        var name = hsList[i]["name"];
        var author = hsList[i]["author"];
        var publishTime = hsList[i]["publishTime"];
        var publisherName = hsList[i]["publisherName"];
        var status = hsList[i]["status"];
        var lastOpUserName = hsList[i]["lastOpUserName"];
        var type = hsList[i]["type"];
        var coverUrl = hsList[i]["coverUrl"];
        var channelId = hsList[i]["channelId"];
        var statusText = "";
        if (status == 1) {
            statusText = "待发布"
        }
        if (status == 2) {
            statusText = "已发布"
        }
        if (status == 3) {
            statusText = "已下线"
        }

        if (i % 2 == 1) {
            str += "<tr class='table-tr-odd'>";
        } else {
            str += "<tr class='table-tr-even'>";
        }
        str += "<td style='display:none' id='idContent'>" + id + "</td>";
        if (coverUrl != null && coverUrl != "") {
            str += "<td id='name'><a href='javascript:;' onclick='toPreview(\"" + id + "\")'" +
                " class='text-over' id='copy'>【图】"+ name + "</a></td>";
        }else{
            str += "<td id='name'><a href='javascript:;' onclick='toPreview(\"" + id + "\")'" +
                " class='text-over' id='copy'>" + name + "</a></td>";
        }
        if(type == 1 && channelId != undefined ){
            str += "<td id='author'><p class='text-over'>CMS</p></td>";
        }else if(type == 1 && channelId == undefined ){
            str += "<td id='author'><p class='text-over'>自有</p></td>";
        }
        str += "<td id='author'><p class='text-over'>" + author + "</p></td>";
        str += "<td id='publishTime'>" + publishTime + "</td>";
        str += "<td id='publisherName'>" + publisherName + "</td>";

        if (status == 1) {
            str += "<td id='status'>" + statusText + "</td>";
        } else if (status == 2) {
            str += "<td id='status'>" + statusText + "</td>";
        } else {
            str += "<td id='status'>" + statusText + "</td>";
        }
        str += "<td id='lastOpUserName'>"+ lastOpUserName +"</td>";
        str += "<td>";
        str += "<div class='p176-table-btnGroup'>";
        str += "<a href='javascript:void(0);' id='cp-btn" + id + "' onclick='copyTemplate(\"" + id + "\",\"" + type + "\")'" +
            " class='p176-btn-copylink' ><i></i>复制链接</a>";
        str += "<a href='javascript:;' onclick='toPreview(\"" + id + "\")' class='p176-btn-copy02'" +
            " ><i></i>预览</a>";
        if (status == 2) {
            str += "<a href='javascript:void(0);' onclick='offline(\"" + id + "\")'" +
                " class='p176-btn-copy03 p176-btn-copy05' ><i></i>下线</a>";
        } else {
            str += "<a href='javascript:void(0);' onclick='edit(\"" + id + "\")'" +
                " class='p176-btn-copy03' ><i></i>编辑</a>";
            if(channelId == undefined) {
                str += "<a href='javascript:void(0);' onclick='publish(\"" + id + "\")'" +
                    " class='p176-btn-copy04' ><i></i>发布</a>";
            }
            str += "<a href='javascript:;' onclick='deleteData(\"" + id + "\")'" +
                " class='p176-btn-delete' ><i></i>删除</a>";
        }
        str += "</div>";
        str += "</tr>";
    }
    $("#hsListTbody").html(str);
}

function showEvent(json) {
    var ckList = json.dataList;
    var str = "";
    if (ckList.length > 0) {
        for (var i = 0; i < ckList.length; i++) {
            var id = ckList[i]["id"];
            var name = ckList[i]["name"];
            var time = ckList[i]["publishTime"];
            var targetNumber = ckList[i]["targetNumber"];
            var publishName = ckList[i]["publishName"];
            var status = ckList[i]["status"];
            var countUser = ckList[i]["countUser"];
            var coverUrl= ckList[i]["coverUrl"];
            var creatorId = ckList[i]["creatorId"];
            var statusText = "";
            if (status == 1) {
                statusText = "待发布";
            }
            if (status == 2) {
                statusText = "已发布";
            }
            if (status == 3) {
                statusText = "已下线";
            }
            if (i % 2 == 1) {
                str += "<tr class='table-tr-odd'>";
            } else {
                str += "<tr class='table-tr-even'>";
            }

            str += "<td style='display:none'>" + id + "</td>";
            if (coverUrl != null && coverUrl != "") {
                str += "<td id='name'>【图】" + name + "</td>";
            }else{
                str += "<td id='name'>" + name + "</td>";
            }
            str += "<td id='time'>" + time.split('.')[0] + "</td>";
            str += "<td id='targetNumber'><a href='#' onclick='showEventUser(\"" + id + "\",\"" + countUser + "\")'" +
                " class='xdf_green'>" + countUser + "</a>/" + targetNumber + "</td>";
            str += "<td id='publishName'>" + publishName + "</td>";
            str += "<td id='status'>" + statusText + "</td>";
            str += "<td>";
            str += "<div class='p176-table-btnGroup'>";
            str += "<a href='#' id='cp-btn" + id + "' onclick='copyTemplate(\"" + id + "\")'" +
                " class='p176-btn-copylink'><i></i>复制链接</a>";
            str += "<a href='#' onclick='toPreview(\"" + id + "\")' class='p176-btn-seesee'><i></i>预览</a>";
            if (status == 2) {
                str += "<a href='#' onclick='offline(\"" + id + "\")' class='p176-btn-copy03" +
                    " p176-btn-copy05'><i></i>下线</a>";
            }
            if (status == 1 || status == 3) {
                str += "<a href='#' onclick='edit(\"" + id + "\")' class='p176-btn-edit'><i></i>编辑</a>";
                str += "<a href='#' onclick='publish(\"" + id + "\")' class='p176-btn-release'><i></i>发布</a>";
                str += "<a href='#' onclick='deleteData(\"" + id + "\")' class='p176-btn-delete'><i></i>删除</a>";
            }
            str += "</div>";
            str += "</td>";
            str += "</tr>";
        }
    }
    $("#hsListTbody").html(str);
}

//复制链接
function copyTemplate(id) {
    $('#cp-btn' + id).zclip({
        path: '../../js/zclip/ZeroClipboard.swf',
        copy: function () {//复制内容
            var url;
            if (currentType == 3) {
                url = getRootPath() + '/view/page/activity.html?id=' + id;
            } else {
                url = getRootPath() + '/view/page/hotspot.html?id=' + id + "&type=" + currentType;
            }

            return url;
        },
        afterCopy: function () {//复制成功
            layer.msg("复制成功!", {icon: 6});
        }
    });
}


//热点发布
function publish(id) {
    var publisherId = getCookie("loginId");
    var publisherName = getCookie("userName");
    var businessP = {type: currentType, hsId: id, publisherId: publisherId, publisherName: publisherName};
    var serverId = "";
    if (currentType == 3) {
        serverId = "9152b0abac0943d7bc3e2aa384024367";
    } else {
        serverId = "304c93d028ef49eebb46151ceccb858c";
    }
    layer.confirm('确认发布？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        var d = constructionParams(rsaEncryptedString(businessP), serverId);
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: false,//同步
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    layer.msg("发布成功!", {icon: 6});
                    firstIn = true;
                    showList(parseInt($(".pCurrent").html()), currentCityId, nameText);
                } else {
                    layer.msg("发布失败!", {icon: 5});
                }
            }
        });
    }, function () {

    });

}

//下线
function offline(id) {
    var loginId = getCookie("loginId");
    var lastOpUserName = getCookie("userName");
    var title = "";
    var serverId = "";
    if (currentType == 2) {
        title = "资料";
        serverId = "15616e0bfba448b2816cc3bb3e0e2d7a";
    } else if (currentType == 3) {
        title = "活动";
        serverId = "5ca015e868b54cdd89d0ef5069aacef3";
    } else {
        title = "资讯";
        serverId = "15616e0bfba448b2816cc3bb3e0e2d7a";
    }
    layer.confirm('确认下线？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        var businessP = {
            id: id,
            hsId: id,
            type: currentType,
            userId: loginId,
            lastOpUserName: lastOpUserName
        };
        var d = constructionParams(rsaEncryptedString(businessP), serverId);
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: false,//同步
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    layer.msg("下线成功!", {icon: 6});
                    firstIn = true;
                    showList(parseInt($(".pCurrent").html()), currentCityId, nameText);
                } else {
                    layer.msg("下线失败!", {icon: 5});
                }
            }
        });
    }, function () {

    });
}

function deleteData(id){
    var loginId = getCookie("loginId");
    var title = "";
    var serverId = "";
    if (currentType == 2) {
        title = "资料";
        serverId = "8bf04798597b4c9caab7d589e50e49c5";
    } else if (currentType == 3) {
        title = "活动";
        serverId = "cec6ee4be7c54a6baca9a5a501b6ac1e";
    } else {
        title = "资讯";
        serverId = "8bf04798597b4c9caab7d589e50e49c5";
    }
    layer.confirm('确认删除？', {
        btn: ['删除', '取消'] //按钮
    }, function () {
        var businessP = {
            id: id,
            hsId: id,
            type: currentType,
            userId: loginId
        };
        var d = constructionParams(rsaEncryptedString(businessP), serverId);
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: false,//同步
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    layer.msg("删除成功!", {icon: 6});
                    firstIn = true;
                    showList(parseInt($(".pCurrent").html()), currentCityId, nameText);
                } else {
                    layer.msg("删除失败!", {icon: 5});
                }
            }
        });
    }, function () {

    });

}

function edit(id){
    if(currentType==3) {
        window.open('../event/hotspotEventEdit.html?id=' + id + "&type=" + currentType + "&flag=edit");
    } else {
        window.open('hotspotEdit.html?id=' + id + "&type=" + currentType + "&flag=edit");
    }
}

//查询地区
function findCity() {
    var loginId = getCookie("loginId");
    var businessP = {
        loginId: loginId
    };
    var d = constructionParams(rsaEncryptedString(businessP), "3577775ef8e849d9ab63dad2202584e0");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        // url:'http://localhost:8015/market/constants/getConstantsInfo.do',
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var cnList = json.dataList;
                var str = "<a href='#' class='cur' onclick='getHotsConstants(this,1,\"\")'>全部</a>";
                if (cnList.length > 0) {
                    for (var i = 0; i < cnList.length; i++) {
                        var id = cnList[i].sCode;
                        var name = cnList[i].sCity;
                        str += "<a href='#' onclick='getHotsConstants(this,1,\"" + id + "\")'>" + name + "</a>";
                    }
                    str += "<a href='#' onclick='getHotsConstants(this,1,\"other\")'>其他</a>";
                    $(".xian-wid").html(str);
                } else {
                    $(".xian-wid").html(str);
                }
                initOpenAndShou();
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}

//查询分类
function findType() {
    var businessP = {
        type: 2
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
                var str = "<a href='#' class='cur' onclick='getHotsConstants(this,2,\"\")'>不限</a>";
                if (cnList.length > 0) {
                    for (var i = 0; i < cnList.length; i++) {
                        var id = cnList[i]["id"];
                        var name = cnList[i]["name"];
                        str += "<a href='#' onclick='getHotsConstants(this,2,\"" + id + "\")'>" + name + "</a>"
                        $(".xian-wid2").html(str);
                    }
                } else {
                    $(".xian-wid2").html(str);
                }
                initOpenAndShou();
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}

//查询地区查询内容
function getHotsConstants(_this, type, id) {
    if (type == 1) {
        $(".xian-wid .cur").removeClass("cur");
        $(_this).addClass("cur");
        currentCityId = id;
    } else if (type == 2) {
        $(".xian-wid2 .cur").removeClass("cur");
        $(_this).addClass("cur");
        currentCategoryId = id;
    }else if (type == 3) {
        $(".xian-wid3 .cur").removeClass("cur");
        $(_this).addClass("cur");
        sourceType = id;
    }
    changeHotSpotCenter(currentType);
}




function addHotspot(){
    if(currentType == 3){
        window.open('../event/hotspotEventEdit.html?flag=new');
    }else{
        window.open('hotspotEdit.html?flag=new&type=' + currentType);
    }
}

function initOpenAndShou() {
    var baseht = 30;
    var ht = $(".hot-classes .list1").find(".xian-wid").height();
    //分类1
    if (ht > baseht) {
        $(".open").show();
        $(".shou").hide();
    } else {
        $(".open").hide();
        $(".shou").hide();
    }
    //分类2
    var ht2 = $(".hot-classes .list1").find(".xian-wid2").height();
    if (ht2 > baseht) {
        $(".open2").show();
        $(".shou2").hide();
    } else {
        $(".open2").hide();
        $(".shou2").hide();
    }
    initSwitch();
}

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

var typeId = "";
function showEventUser(id, countUser) {
    //弹框效果
    typeId = id;
    $('#countUser').html("已报名人数(" + countUser + "人)");
    showUserList(1, id);
    $(".xdf_Mongolia_wrap").fadeIn();
    //淡出
    $(".xdf_alert_top .close").click(function () {
        $(".xdf_Mongolia_wrap").fadeOut();
    });
}
function showUserList(page, id) {
    var requestJson = {
        currentPage: page,
        pageSize: 10,
        hotspotId: id
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "742241085a594dd888e6d76e0a51a8f8");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        // url:'http://localhost:8080/market/hotspotEvent/getCountUserList.do',
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                totalCounts = json.totalCount;
                initPageUser(totalCounts, page);
                var ckList = json.dataList;
                var str = "";
                if (ckList.length > 0) {
                    for (var i = 0; i < ckList.length; i++) {
                        var id = ckList[i]["id"];
                        var name = ckList[i]["name"];
                        var mobile = ckList[i]["mobile"];
                        var createTime = ckList[i]["createTime"];
                        if (i % 2 == 1) {
                            str += "<tr class='table-tr-odd'>"
                        } else {
                            str += "<tr class='table-tr-even'>"
                        }
                        str += "<td style='display:none'>" + id + "</td>"
                        str += "<td id='name'>" + name + "</td>"
                        str += "<td id='time'>" + mobile + "</td>"
                        str += "<td id='time'>" + createTime.split('.')[0] + "</td>"
                        str += "</tr>"
                    }
                    $("#countUserList").html(str);
                } else {
                    $("#countUserList").html(str);
                }

            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}

function initPageUser(totalCounts, currentPage) {
    if (totalCounts != null && totalCounts != 0) {
        $.jqPaginator("#publicPageUser", {
            totalCounts: totalCounts,
            pageSize: 10,
            visiblePages: 10,
            currentPage: currentPage,
            prev: '<a class="pPrev" href="javascript:;">上一页</a>',
            next: '<a class="pNext" href="javascript:;">下一页</a>',
            page: '<a href="javascript:;">{{page}}</a>',
            activeClass: 'pCurrent',
            onPageChange: function (num, type) {
                if (type != "init") {
                    showUserList(num, typeId);
                }
            }
        });
    } else {
        $("#publicPageUser").html("");
    }
}

//预览
function toPreview(id) {
    if (currentType == 3) {
        window.open('../../view/page/activity.html?id=' + id);
    } else {
        window.open('../../view/page/hotspot.html?id=' + id + "&type=" + currentType);
    }
}
