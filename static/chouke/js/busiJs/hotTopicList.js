$(function () {
    var businessP = {
        loginId: getCookie("loginId")
    };
    var d = constructionParams(rsaEncryptedString(businessP), "94b2b4e1eac54343902e756354526966");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://10.200.80.196:8088/market/user/getPrivilegeData.do",
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var isSuperAdmin = json.isSuperAdmin;
                var cityId = json.cityId;
                var categoryId = json.categoryId;

                if (!isSuperAdmin && cityId != null && categoryId != null) {
                    $(".set-new").css("display", "block");
                    currentCityId = cityId;
                    currentCategoryId = categoryId;
                    sessionStorage.cityId = currentCityId;
                    sessionStorage.categoryId = currentCategoryId;
                    //$(".hot-classes").hide();
                } else {
                   // $(".set-new").css("display", "none");
                    $(".hot-classes").show();
                    //地区，分类（展开收起）
                    //initOpenAndShou();
                    //findArea();
                    //课程-热报专题没有分类
                    //findCategory();
                }
                showList(1);
            } else {
                layer.msg(json.msg, {icon: 5});
            }
        }
    });
    //地区，分类（展开收起）
    findCategory();
    findArea();
    initOpenAndShou();
    initSwitch();

});

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
}

var switchFlag = false;
var totalCounts = 0;
var currentPage = 1;
var pageSize = 15;
var firstIn = true;
var currentCityId = '';
var nameText = '';
var currentCategoryId = "";

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

//状态 0:待发布，1：未开始，2：进行中，3：已结束，4：提前结束'
function showList(page) {
    var requestJson = {
        currentPage: page,
        pageSize: pageSize,
        queryName: nameText,
        cityId: currentCityId,
        categoryId: currentCategoryId,
        loginId: getCookie("loginId")
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "f701582bf2234d369c159443d79965fb");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url:'http://localhost:8080/market/courseTopic/getTopicList.do',
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                totalCounts = json.totalCount;
                if (firstIn) {
                    initPage(totalCounts, page);
                    firstIn = false;
                }
                var list = json.dataList;
                var str = "";
                if (list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var id = list[i]["id"];
                        var name = list[i]["name"];
                        var time = list[i]["publishTime"];
                        var endTime = list[i]["endTime"];
                        var targetNumber = list[i]["targetNumber"];
                        var publishName = list[i]["publishName"];
                        var type = list[i]["type"];
                        var typeText = "";
                        if (type == 1) {
                            typeText = "课程"
                        }
                        if (type == 2) {
                            typeText = "班级"
                        }
                        var status = list[i]["status"];
                        var statusText = "";
                        if (status == 1) {
                            statusText = "待发布"
                        }
                        if (status == 2) {
                            statusText = "已发布"
                        }
                        if (status == 3) {
                            statusText = "下线"
                        }
                        if (i % 2 == 1) {
                            str += "<tr class='table-tr-odd'>"
                        } else {
                            str += "<tr class='table-tr-even'>"
                        }
                        str += "<td style='display:none'>" + id + "</td>";
                        str += "<td id='name'>" + name + "</td>";
                        str += "<td id='type'>" + typeText + "</td>";//专题类型
                        str += "<td id='time'>" + time + "</td>";
                        str += "<td id=overTime'>" + endTime + "</td>";//结束时间
                        str += "<td id='status'>" + statusText + "</td>";
                        str += "<td>";
                        str += "<div class='p176-table-btnGroup'>";

                        str += "<a href='#' onclick='toPreview(\"" + id + "\",\""+name+"\")' class='p176-btn-seesee'><i></i>预览</a>";
                        if (status == 2) {
                            str += "<a href='javascript:;' id='cp-btn" + id + "' onclick='copyTemplate(\"" + id + "\",\""+name+"\")' class='p176-btn-copylink' ><i></i>复制链接</a>";
                            str += "<a href='#' class='p176-btn-downline'><i></i>下线</a>";
                        }
                        if (status == 1 || status == 3) {
                            str += "<a href='#' onclick='topicEdit(\"" + id + "\")' class='p176-btn-edit'><i></i>编辑</a>";
                            str += "<a href='#' class='p176-btn-release'><i></i>发布</a>";
                            str += "<a href='#' class='p176-btn-delete'><i></i>删除</a>";
                        }
                        str += "</div>"
                        str += "</td>"
                        str += "</tr>"
                    }
                    $("#hotTopicListId").html(str);
                } else {
                    $("#hotTopicListId").html(str);
                }
                $(".p176-btn-copylink").trigger("click");
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}

//搜索
function search() {
    nameText = $.trim($('#nameText').val());
    if (nameText == '请输入专题名称搜索' || nameText == null) {
        nameText = '';
    }
    firstIn = true;
    showList(1);
}

//发布
function topicPublish(id) {
    var publisherId = getCookie("loginId");
    var businessP = {id: id, publisherId: publisherId};
    var d = constructionParams(rsaEncryptedString(businessP), "27c766495b5940d1bf4299bfca2c5738");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url:'http://localhost:8080/market/courseTopic/publishTopic.do',
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                layer.msg("发布成功！", {icon: 6});
                firstIn = true;
                showList(parseInt($(".pCurrent").html()));
            } else {
                layer.msg("发布失败！", {icon: 5});
            }
        }
    });
}

//复制模板
function copyTemplate(id,name) {
    $('#cp-btn' + id).zclip({
        path: '../../js/zclip/ZeroClipboard.swf',
        copy: function () {//复制内容
            return getRootPath() + '/view/page/topicLessonList.html?id=' + id;
        },
        afterCopy: function () {//复制成功
            layer.msg("复制成功!", {icon: 6});
            $("#cp-btn"+id).html("<i></i>已复制");
            setTimeout(function(){
                $("#cp-btn"+id).html("<i></i>复制链接");
            },2000)
        }
    });
}

//预览
function toPreview(id,name) {
    window.open('../../view/page/topicLessonListPr.html?id=' + id);
}
function addTopic() {
    window.location.href = 'hotTopicEdit.html?flag=new';
}

//编辑
function topicEdit(id) {
    window.location.href = 'hotTopicEdit.html?id=' + id + "&flag=edit";
}

//下线
function over(id) {
    var businessP = {"id": id, "publisherId": getCookie("loginId")};
    var d = constructionParams(rsaEncryptedString(businessP), "26b831a280fe458d8bfb30399b87eaf6");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url:'http://localhost:8080/market/courseTopic/offTopic.do',
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
                var tempCityId = sessionStorage.getItem("cityId");
                var str = "";
                if(tempCityId == null || tempCityId == undefined || tempCityId == ""){
                    str = "<a href='#' class='cur' onclick='getTopicByCityId(this,\"\")'>全部</a>";
                }else{
                    str = "<a href='#' onclick='getTopicByCityId(this,\"\")'>全部</a>";
                }
                if (schoolList.length > 0) {
                    for (var i = 0; i < schoolList.length; i++) {
                        var schoolId = schoolList[i].sCode;
                        if(tempCityId != null && tempCityId != undefined && tempCityId == schoolId){
                            str += "<a href='#' class='cur' onclick='getTopicByCityId(this, \"" + schoolId + "\")'" + " >" + schoolList[i].sCity + "</a>";
                        }else {
                            str += "<a href='#' onclick='getTopicByCityId(this, \"" + schoolId + "\")'" + " >" + schoolList[i].sCity + "</a>";
                        }
                    }
                    $(".xian-wid").eq(0).html(str);
                    initOpenAndShou();
                } else {
                    $(".xian-wid").eq(0).html(str);
                }
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}

//查询分类
function findCategory() {
    var loginId = getCookie("loginId");
    var businessP = {
        loginId: loginId
    };
    var d = constructionParams(rsaEncryptedString(businessP), "5773169bc6324b9fa1fcbf173a775ec8");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var categoryList = json.dataList;
                var tempCategoryId = sessionStorage.getItem("categoryId");
                var str = "";
                if (tempCategoryId == null || tempCategoryId == undefined || tempCategoryId == "") {
                    str = "<a href='#' class='cur' onclick='getTopicByCategoryId(this,\"\")'>全部</a>";
                }else{
                    str = "<a href='#' onclick='getTopicByCategoryId(this,\"\")'>全部</a>";
                }
                if (categoryList.length > 0) {
                    for (var i = 0; i < categoryList.length; i++) {
                        var id = categoryList[i].id;
                        var name = categoryList[i].name;
                        var checked = categoryList[i].checked;
                        if(checked == true){
                            if (tempCategoryId != null && tempCategoryId != undefined && tempCategoryId == id) {
                                str += "<a href='#' class='cur' onclick='getTopicByCategoryId(this, \"" + id + "\")'" + " >" + name + "</a>";
                            } else {
                                str += "<a href='#' onclick='getTopicByCategoryId(this, \"" + id + "\")'" + " >" + name + "</a>";
                            }
                        }
                    }
                    $(".xian-wid2").eq(0).html(str);
                    initOpenAndShou();
                } else {
                    $(".xian-wid2").eq(0).html(str);
                }
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}

//查询地区查询内容
function getTopicByCityId(_this, areaId) {
    $(".xian-wid .cur").removeClass("cur");
    $(_this).addClass("cur");
    firstIn = true;
    currentCityId = areaId;
    sessionStorage.cityId = currentCityId;
    showList(1);
}

//查询地区查询内容
function getTopicByCategoryId(_this, categoryId) {
    $(".xian-wid2 .cur").removeClass("cur");
    $(_this).addClass("cur");
    firstIn = true;
    currentCategoryId = categoryId;
    sessionStorage.categoryId = currentCategoryId;
    showList(1);
}

function toDelete(id) {
    var businessP = {"id": id};
    var d = constructionParams(rsaEncryptedString(businessP), "a2ec9380d4064bd19f052218ebcea9f6");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: 'http://localhost:8080/market/courseTopic/deleteTopic.do',
        async: true,
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
}

function createTopic() {
    if (!currentCategoryId || !currentCityId) {
        layer.msg("只能选择一个城市、一个分类", {icon: 6});
    } else {
        window.location.href = 'hotTopicEdit.html?flag=new';
    }
}

$(function () {
    //删除，取消，确认
    $(document).on('click', '.p176-btn-delete', function () {
        $(".delete-bomb").fadeIn();
        $(this).parent().parent().parent().addClass("tr-del");
    });
    $(".delete-bomb .close, .delete-bomb .btn-gray").on('click', function () {
        $(".delete-bomb").fadeOut();
    });
    $(".delete-bomb .del-must").on('click', function () {
        $(".delete-bomb").fadeOut();
        toDelete($($(".tr-del").find("td")[0]).html());
        $(".tr-del").remove(".tr-del");
    });
    //下线，取消，确认//
    $(document).on('click', '.p176-btn-downline', function () {
        $(".offline-bomb").fadeIn();
        $(this).parent().parent().parent().addClass("tr-del");
    });
    $(".offline-bomb .close, .offline-bomb .btn-gray").on('click', function () {
        $(".offline-bomb").fadeOut();
        //$(".tr-del").remove(".tr-del");
    });
    $(".offline-bomb .del-must").on('click', function () {
        $(".offline-bomb").fadeOut();
        over($($(".tr-del").find("td")[0]).html());
        $(".tr-del").remove(".tr-del");
    });
    //发布，取消，确认
    $(document).on('click', '.p176-btn-release', function () {
        $(".releasee-bomb").fadeIn();
        $(this).parent().parent().parent().addClass("tr-del");
    });
    $(".releasee-bomb .close, .releasee-bomb .btn-gray").on('click', function () {
        $(".releasee-bomb").fadeOut();
        //$(".tr-del").remove(".tr-del");
    });
    $(".releasee-bomb .del-must").on('click', function () {
        $(".releasee-bomb").fadeOut();
        topicPublish($($(".tr-del").find("td")[0]).html());
        $(".tr-del").remove(".tr-del");
    });

});








