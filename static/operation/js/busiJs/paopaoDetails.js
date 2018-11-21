var activityId = '';
$(function () {
    var loginId = getCookie("loginId");
    var schoolId = getCookie("schoolId");
    var request = getRequest();
    var name = request["name"];
    activityId = request["activityId"];
    if (marketJs.loginUserIsAdmin(loginId)) {
        $(".p176-table-wrap").show();
        $(".p176-btn-new").hide();
        $("#activityName").text(decodeURI(name));
        showList(activityId);
    } else if(schoolId == 2){
        $(".p176-table-wrap").show();
        $(".p176-btn-new").hide();
        $("#activityName").text(decodeURI(name));
        showList(activityId);
    } else if(schoolId == 4){
        $(".p176-table-wrap").show();
        $(".p176-btn-new").hide();
        $("#activityName").text(decodeURI(name));
        showList(activityId);
    } else {
        $(".p176-table-wrap").hide();
        $(".p176-btn-new").show();
    }
});
var totalCounts = 0;
var firstIn = true;
var page = 1;
var pageSize = 15;

//显示购课详情列表
function showList(activityId) {
    var request = {
        activityId:activityId,
        page: page,
        pageSize: pageSize
    };
    var d = constructionParams(rsaEncryptedString(request), "5530511c1c1a4a56a535c82f2f00f854");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            showDetailsResult(json);
        }
    });
}
function showDetailsResult(json){
    if (json.result == true) {
        totalCounts = json.totalCounts;
        if (firstIn) {
            initPage(totalCounts, page);
            firstIn = false;
        }
        var paopaoDetailsList = json.dataList;
        var str = "";
        if (paopaoDetailsList.length > 0) {
            for (var i = 0; i < paopaoDetailsList.length; i++) {
                var paopao = paopaoDetailsList[i];
                str += "<tr>";
                if(paopao.userName != undefined && paopao.userName != '' && paopao.userName != null && paopao.userName != 'undefined') {
                    str += "<td>" + paopao.userName + "</td>";
                }else{
                    str += "<td>" + "--" + "</td>";
                }
                if(paopao.mobile != undefined && paopao.mobile != '' && paopao.mobile != null) {
                    str += "<td>" + paopao.mobile + "</td>";
                }else{
                    str += "<td>" + "--" + "</td>";
                }
                str += "<td>" + paopao.payState + "</td>";
                if(paopao.payTime != undefined && paopao.payTime != '' && paopao.payTime != null) {
                    var payTimes = paopao.payTime.substring(0,19);
                    str += "<td>" + payTimes + "</td>";
                }else{
                    str += "<td>" + "--" + "</td>";
                }
                str += "<td>" + paopao.classCode + "</td>";
                str += "<td>" + paopao.classPrice + "</td>";
                str += "<td>" + paopao.states + "</td>";
                str += "<td>" + paopao.recommendMobile + "</td>";
                str += "<td id='myRecommendMobiles' >" + paopao.myRecommendMobile + "</td>";
                if(paopao.orderNumber != undefined && paopao.orderNumber != '' && paopao.orderNumber != null) {
                    str += "<td>" + paopao.orderNumber + "</td>";
                }else{
                    str += "<td>" + "--" + "</td>";
                }
                str += "</tr>";
            }
            $("#paopaoDetails_tbody").html(str);
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
                    showList(activityId);
                }
            }
        });
    } else {
        $("#publicPage").html("");
    }
}

// 导出购课详情列表
function exportExcel() {
    var paopaoDetails_tbody = $("#paopaoDetails_tbody").children();
    if (paopaoDetails_tbody.length <= 0) {
        layer.msg('暂无统计内容可导出', {icon: 5});
        return;
    }
    var request = {
        activityId:activityId
    };
    var d = constructionParams(rsaEncryptedString(request), "7cdf4522f49e43638e8717e13e671239");
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
