var ycactivityId = '';
$(function () {
    var loginId = getCookie("loginId");
    var schoolId = getCookie("schoolId");
    var request = getRequest();
    var name = request["name"];
     ycactivityId = request["activityId"];
    if (marketJs.loginUserIsAdmin(loginId)) {
        $(".p176-table-wrap").show();
        $(".p176-btn-new").hide();
        $("#activityName").text(decodeURI(name));
        showList(ycactivityId);
    } else if(schoolId == 2){
        $(".p176-table-wrap").show();
        $(".p176-btn-new").hide();
        $("#activityName").text(decodeURI(name));
        showList(ycactivityId);
    } else{
        $(".p176-table-wrap").hide();
        $(".p176-btn-new").show();
    }
});
var totalCounts = 0;
var firstIn = true;
var page = 1;
var pageSize = 15;

//显示优能购课详情列表
function showList(ycactivityId) {
    var request = {
        activityId:ycactivityId,
        page: page,
        pageSize: pageSize
    };
    var d = constructionParams(rsaEncryptedString(request), "f384e946e4cd4d289f2eba331e6b7939");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            showYouCanDetailsResult(json);
        }
    });
}
function showYouCanDetailsResult(json){
    if (json.result == true) {
        totalCounts = json.totalCounts;
        if (firstIn) {
            initPage(totalCounts, page);
            firstIn = false;
        }
        var youcanDetailsList = json.dataList;
        var str = "";
        if (youcanDetailsList.length > 0) {
            for (var i = 0; i < youcanDetailsList.length; i++) {
                var youcan = youcanDetailsList[i];
                str += "<tr>";
                if(youcan.userName != undefined && youcan.userName != '' && youcan.userName != null && youcan.userName != 'undefined') {
                    str += "<td>" + youcan.userName + "</td>";
                }else{
                    str += "<td>" + "--" + "</td>";
                }
                if(youcan.mobile != undefined && youcan.mobile != '' && youcan.mobile != null) {
                    str += "<td>" + youcan.mobile + "</td>";
                }else{
                    str += "<td>" + "--" + "</td>";
                }
                str += "<td>" + youcan.payState + "</td>";
                if(youcan.payTime != undefined && youcan.payTime != '' && youcan.payTime != null) {
                    var payTimes = youcan.payTime.substring(0,19);
                    str += "<td>" + payTimes + "</td>";
                }else{
                    str += "<td>" + "--" + "</td>";
                }
                str += "<td>" + youcan.classCode + "</td>";
                str += "<td>" + youcan.classPrice + "</td>";
                str += "<td>" + youcan.recommendMobile + "</td>";
                if(youcan.orderNumber != undefined && youcan.orderNumber != '' && youcan.orderNumber != null) {
                    str += "<td>" + youcan.orderNumber + "</td>";
                }else{
                    str += "<td>" + "--" + "</td>";
                }
                str += "</tr>";
            }
            $("#youcanDetails_tbody").html(str);
        }
    } else {
        layer.msg("查询失败!", {icon: 5});
    }
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
                // console.log("type --> " + type + "\tnum --> " + num + "\ttotalCounts --> " + totalCounts + "\tpageSize --> " + pageSize );
                if (type != "init") {
                    page = num;
                    showList(ycactivityId);
                }
            }
        });
    } else {
        $("#publicPage").html("");
    }
}

// 导出优能购课详情列表
function exportExcel() {
    var youcanDetails_tbody = $("#youcanDetails_tbody").children();
    if (youcanDetails_tbody.length <= 0) {
        layer.msg('暂无统计内容可导出', {icon: 5});
        return;
    }
    var request = {
        activityId:ycactivityId
    };
    var d = constructionParams(rsaEncryptedString(request), "33827e9b36dd4beca2343a1807a9c405");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var downloadUrl = json.downloadUrl;
                saveIframe.document.location = downloadUrl;
                downloadFile();
            }
        }
    });
}

function downloadFile() {
    if (saveIframe.document.readyState == "complete") {
        saveIframe.document.execCommand("saveas");
    } else {
        window.setTimeout("downloadFile()", 10);
    }
}
