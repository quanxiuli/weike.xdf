var totalCounts = 0;
var currentPage = 1;
var pageSize = 15;
var firstIn = true;
var currentCityId = '';
var nameText = '';
$(function () {
    findCity();
    var functionIds = getCookie("functionIds");
    if (functionIds.length > 0) {
        functionIds = functionIds.split(",");
    }
    if (functionIds.length > 0) {
        if ($.inArray('20106', functionIds) >= 0) {
            showList(1, currentCityId);
        }
    }
    $(".p176-btn-copylink").trigger("click");
});

function initPage(totalCounts, currentPage) {
    if (totalCounts != null && totalCounts != 0) {
        $.jqPaginator("#publicPage", {
            totalCounts: totalCounts,
            pageSize: pageSize,
            visiblePages: 15,
            currentPage: currentPage,
            prev: '<a class="pPrev" href="javascript:;">上一页</a>',
            next: '<a class="pNext" href="javascript:;">下一页</a>',
            page: '<a href="javascript:;">{{page}}</a>',
            activeClass: 'pCurrent',
            onPageChange: function (num, type) {
                if (type != "init") {
                    showList(num, currentCityId, '');
                }
            }
        });
    } else {
        $("#publicPage").html("");
    }
}

//搜索
function search() {
    nameText = $('#nameParamInput').val();
    if (nameText == '搜索活动名称' || nameText == null) {
        nameText = "";
    }
    firstIn = true;
    showList(1, currentCityId, nameText);
}

//状态 0:待发布，1：未开始，2：进行中，3：已结束，4：提前结束'
function showList(page, cityId, nameText) {
    if (cityId == null) {
        cityId = "";
    }
    if (nameText == null) {
        nameText = "";
    }
    var requestJson = {
        currentPage: page,
        pageSize: pageSize,
        nameText: nameText,
        cityId: cityId,
        loginId:getCookie("loginId")
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "e0a9c5c3b40f415aa7fede9ffa420af3");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                totalCounts = json.totalCount;
                //initPage(totalCounts, page);
                if (firstIn) {
                    initPage(totalCounts, page);
                    firstIn = false;
                }
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
                        var creatorId = ckList[i]["creatorId"];
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
                            str += "<tr class='table-tr-odd'>"
                        } else {
                            str += "<tr class='table-tr-even'>"
                        }

                        str += "<td style='display:none'>" + id + "</td>"
                        str += "<td id='name'>" + name + "</td>"
                        str += "<td id='time'>" + time.split('.')[0] + "</td>"
                        str += "<td id='targetNumber'><a href='#' onclick='showEventUser(\"" + id + "\",\"" + countUser + "\")' class='xdf_green'>" + countUser + "</a>/" + targetNumber + "</td>"
                        str += "<td id='publishName'>" + publishName + "</td>"
                        str += "<td id='status'>" + statusText + "</td>"
                        str += "<td>"
                        str += "<div class='p176-table-btnGroup'>"
                        str += "<a href='#' id='cp-btn" + id + "' onclick='copyTemplate(\"" + id + "\")' class='p176-btn-copylink'><i></i>复制链接</a>"
                        str += "<a href='#' onclick='toPreview(\"" + id + "\")' class='p176-btn-seesee'><i></i>预览</a>"
                        if (status == 2) {
                            str += "<a href='#' onclick='over(\"" + id + "\")' class='p176-btn-copy03 p176-btn-copy05'><i></i>下线</a>"
                        }
                        if (status == 1 || status == 3) {
                            str += "<a href='#' onclick='ckEdit(\"" + id + "\")' class='p176-btn-edit'><i></i>编辑</a>"
                            str += "<a href='#' onclick='ckPublish(\"" + id + "\")' class='p176-btn-release'><i></i>发布</a>"
                            str += "<a href='#' onclick='deleteData(\"" + id + "\")' class='p176-btn-delete'><i></i>删除</a>";
                        }
                        str += "</div>"
                        str += "</td>"
                        str += "</tr>"
                    }
                    $("#ckListTbody").html(str);
                } else {
                    $("#ckListTbody").html(str);
                }
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}

//发布
function ckPublish(id) {
    var businessP = {"id": id, "publisherId": getCookie("loginId"), "publisherName": getCookie("userName")};
    var d = constructionParams(rsaEncryptedString(businessP), "9152b0abac0943d7bc3e2aa384024367");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url:'http://localhost:8080/market/hotspotEvent/publishHotspotEvent.do',
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                layer.msg("发布成功", {icon: 6});
                firstIn = true;
                showList(parseInt($(".pCurrent").html()), currentCityId, nameText);
            } else {
                layer.msg("发布失败", {icon: 5});
            }
        }
    });
}

//复制模板
function copyTemplate(id) {
    $('#cp-btn' + id).zclip({
        path: '../../js/zclip/ZeroClipboard.swf',
        copy: function () {//复制内容
            return getRootPath() + '/view/page/activity.html?id=' + id;
        },
        afterCopy: function () {//复制成功
            layer.msg("复制成功!", {icon: 6});
        }
    });
}


//添加
function addHotspotEvent() {
    window.location.href = 'hotspotEventEdit.html?flag=new';
}

//编辑
function ckEdit(id) {
    window.location.href = 'hotspotEventEdit.html?flag=edit&id=' + id;
}

//下线
function over(id) {
    layer.confirm('确认下线该活动吗？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        var businessP = {"id": id};
        var d = constructionParams(rsaEncryptedString(businessP), "5ca015e868b54cdd89d0ef5069aacef3");
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            //url:'http://localhost:8080/market/hotspotEvent/hotspotEventOver.do',
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

//下线
function deleteData(id) {
    layer.confirm('确认删除该活动吗？', {
        btn: ['删除', '取消'] //按钮
    }, function () {
        var businessP = {"id": id};
        var d = constructionParams(rsaEncryptedString(businessP), "cec6ee4be7c54a6baca9a5a501b6ac1e");
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

//查询地区
function findArea() {
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
                var str = "<a href='#' class='cur' onclick='getHotsConstants(this,\"\")'>全部</a>";
                if (schoolList.length > 0) {
                    for (var i = 0; i < schoolList.length; i++) {
                        str += "<a href='#' onclick='getHotsConstants(this,\"" + schoolList[i].sCode + "\")'" + " >" + schoolList[i].sCity + "</a>";
                    }
                    $(".xian-wid").html(str);
                    initOpenAndShou();
                } else {
                    $(".xian-wid").html(str);
                }
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}

//查询地区查询内容
function getHotsConstants(_this, cityId) {
    $(".xian-wid .cur").removeClass("cur");
    $(_this).addClass("cur");
    currentCityId = cityId;
    firstIn = true;
    showList(1, cityId, nameText);
}


//展开收起
function initOpenAndShou() {
    //展开收起
    var wid = $(".hot-classes .list1").find(".xian-wid").width();
    $(".open").click(function () {
        $(this).parent().parent().css("height", "auto");
        $(this).hide();
        $(this).next().show();
    });
    $(".shou").click(function () {
        $(this).parent().parent().css("height", "30px");
        $(this).hide();
        $(this).prev().show();
    });
    if (wid > 1000) {
        $(".xian-wid").css("width", "93%");
        $(".open").show();
    } else {
        $(".open").hide();
        $(".shou").hide();
    }
    ;
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
        $("#publicPage").html("");
    }
}

//预览
function toPreview(id) {
    window.open('../../view/page/activity.html?id=' + id);
}

//弹出框高度适应
var layerSize=function (){
    var wheight = $(window).height();
    $(".xdf_alert").height(wheight*0.8);
    var boxheight = $(".xdf_alert").height(),boxInheight=$('.xdf_alert_top').height();
    $(".xdf_alert").css("margin-top",-(boxheight/2));
    $(".p176-table-wrap").height(boxheight-boxInheight);
}
layerSize();
$(window).resize(layerSize);