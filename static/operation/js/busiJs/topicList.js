var totalCounts = 0;
var currentPage = 1;
var pageSize = 15;
var firstIn = true;
var currentCityId = '';
var nameText = '';
$(function () {
    var request = getRequest();
    var temp_currentCityId = request["currentCityId"];
    if(temp_currentCityId != null && temp_currentCityId != undefined){
        currentCityId = temp_currentCityId;
    }
    findArea();
    showList(1, currentCityId, nameText);

});


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
                    showList(num, currentCityId, nameText);
                }
            }
        });
    } else {
        $("#publicPage").html("");
    }
}

//状态 0:待发布，1：未开始，2：进行中，3：已结束，4：提前结束'
function showList(page, areaId, nameText) {
    var requestJson = {
        currentPage: page,
        pageSize: pageSize,
        nameText: nameText,
        areaId: areaId,
        loginId:getCookie("loginId")
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "5144d89182e04c27bc4e957a0920de1b");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url:'http://localhost:8080/xdfmanager/topic/getTopicList.do',
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        //data: JSON.stringify(requestJson),
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
                        var coverUrl= ckList[i]["coverUrl"];
                        var publishName = ckList[i]["publishName"];
                        var status = ckList[i]["status"];
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
                        //var num=i+1;
                        str += "<td style='display:none'>" + id + "</td>";
                         if (coverUrl != null && coverUrl != "") {
                             str += "<td id='name' >【图】"+ name + "</td>";
                           }else{
                             str += "<td id='name' >" + name + "</td>";
                         }
                        str += "<td id='time'>" + time + "</td>";
                        //str += "<td>" +num+ "</td>";
                        str += "<td id='publishName'>" + publishName + "</td>";
                        str += "<td id='status'>" + statusText + "</td>";
                        str += "<td>";
                        str += "<div class='p176-table-btnGroup'>";
                        str += "<a href='javascript:;' id='cp-btn" + id + "' onclick='copyTemplate(\"" + id + "\")'  class='p176-btn-copylink' data-functionId='20203'><i></i>复制链接</a>";
                        str += "<a href='#' onclick='toPreview(\"" + id + "\")' class='p176-btn-seesee'  data-functionId='20203'><i></i>预览</a>";
                        if (status == 2) {
                            str += "<a href='#' onclick='over(\"" + id + "\")' class='p176-btn-downline'  data-functionId='20203'><i></i>下线</a>";
                        }
                        if (status == 1 || status == 3) {
                            str += "<a href='#' onclick='ckEdit(\"" + id + "\")' class='p176-btn-edit'  data-functionId='20202'><i></i>编辑</a>";
                            str += "<a href='#' onclick='ckPublish(\"" + id + "\")' class='p176-btn-release'  data-functionId='20203'><i></i>发布</a>";
                            str += "<a href='#' onclick='deleteTopic(\"" + id + "\")' class='p176-btn-delete'><i></i>删除</a>";
                        }
                        str += "</div>"
                        str += "</td>"
                        str += "</tr>"
                    }
                    $("#ckListTbody").html(str);
                } else {
                    $("#ckListTbody").html(str);
                }
                initNavigationBar();
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
    if (nameText == '搜索专题名称' || nameText == null) {
        nameText = '';
    }
    firstIn = true;
    showList(1, currentCityId, nameText);
}

//发布
function ckPublish(id) {
    var buttons = ['发布', '取消'];
    layer.confirm("确认发布？", {
        btn: buttons //按钮
    }, function () {
        var publisherId = getCookie("loginId");
        var businessP = {id: id, publisherId: publisherId};
        var d = constructionParams(rsaEncryptedString(businessP), "760f9de34e0044b1b8089206bbb78577");
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            //url:'http://localhost:8080/market/topic/publishTopic.do',
            async: false,//同步
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    layer.msg("发布成功！", {icon: 6});
                    firstIn = true;
                    showList(parseInt($(".pCurrent").html()), currentCityId, nameText);
                } else {
                    layer.msg("发布失败！", {icon: 5});
                }
            }
        });
    }, function () {

    });
}

//复制模板
function copyTemplate(id) {
    $('#cp-btn' + id).zclip({
        path: '../../js/zclip/ZeroClipboard.swf',
        copy: function () {//复制内容
            return getRootPath() + '/view/page/topicView.html?id=' + id;
        },
        afterCopy: function () {//复制成功
            layer.msg("复制成功!", {icon: 6});
        }
    });
}

//预览
function toPreview(id) {
    window.open('../../view/page/topicView.html?id=' + id)
}
function addTopic() {
    window.location.href = 'topicEdit.html?flag=new'+"&currentCityId="+ currentCityId;
}

//编辑
function ckEdit(id) {
    window.location.href = 'topicEdit.html?id=' + id+"&flag=edit";
}

//下线
function over(id) {
    layer.confirm('确定下线该专题吗？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        var businessP = {"id": id};
        var d = constructionParams(rsaEncryptedString(businessP), "4347723ae5d74b66a30f8ee3d5a4c059");
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            //url:'http://localhost:8080/market/topic/topicOver.do',
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

function deleteTopic(id) {
    layer.confirm('确定删除该专题吗？', {
        btn: ['删除', '取消'] //按钮
    }, function () {
        var businessP = {"id": id};
        var d = constructionParams(rsaEncryptedString(businessP), "06cf5239f21442f19a89ce15c787406e");
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: false,//同步
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    layer.msg("删除成功!", {icon: 6});
                    showList(1, currentCityId, nameText);
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
    var loginId = getCookie("loginId");
    var businessP = {
        loginId: loginId
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
                var str = "";
                var schoolList = json.dataList;
                if(currentCityId == ""){
                    str = "<a href='#' class='cur' onclick='getHotsConstants(this,\"\")'>全部</a>";
                }
                if (schoolList.length > 0) {
                    for (var i = 0; i < schoolList.length; i++) {
                        var schoolId = schoolList[i].sCode;
                        if(currentCityId != '' && currentCityId == schoolId){
                            str += "<a href='#' class='cur' onclick='getHotsConstants(this, \"" + schoolId + "\")'" + " >" + schoolList[i].sCity + "</a>";
                        }else{
                            str += "<a href='#' onclick='getHotsConstants(this, \"" + schoolId + "\")'" + " >" + schoolList[i].sCity + "</a>";
                        }
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
function getHotsConstants(_this, areaId) {
    $(".xian-wid .cur").removeClass("cur");
    $(_this).addClass("cur");
    firstIn = true;
    currentCityId = areaId;
    /*$("a").click(function(){
     $("a").removeClass("cur");
     $(this).addClass("cur");
     });*/
    showList(1, areaId, nameText);
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