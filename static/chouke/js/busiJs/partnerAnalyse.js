$(function () {

    var loginId = getCookie("loginId");
    if (marketJs.loginUserIsAdmin(loginId)) {
        $(".p176-table-wrap").show();
        $(".p176-btn-new").hide();
        showList();
    } else {
        $(".p176-table-wrap").hide();
        $(".p176-btn-new").show();
    }
});

var totalCounts = 0;
var firstIn = true;
var page = 1;
var pageSize = 10;

function exportExcel() {
    if (totalCounts <= 0) {
        layer.msg('暂无统计内容可导出', {icon: 5});
        return;
    }

    var d = constructionParams("", "46ac22502f5f4e7f81a174eb658c96ba");
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


function showList() {
    var request = {
        page: page,
        pageSize: pageSize
    }

    var d = constructionParams(rsaEncryptedString(request), "e599072ad9194794bb514fc16e3622e1");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://localhost:8080/market/partner/analysePartner.do",
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                totalCounts = json.totalCounts;
                if (firstIn) {
                    initPage(totalCounts, page);
                    firstIn = false;
                }

                var partnerList = json.dataList;
                var str = "";
                for (var i = 0; i < partnerList.length; i++) {
                    var partner = partnerList[i];
                    var classCode = partner.classCode;
                    var member1 = partner.member1;
                    var mobile1 = partner.mobile1;
                    var member2 = partner.member2;
                    var mobile2 = partner.mobile2;
                    var member3 = partner.member3;
                    var mobile3 = partner.mobile3;
                    var type = partner.type;
                    var typeText = type == 2 ? "2人团" : "3人团";
                    var memberText1 = member1 + "(" + mobile1 + ")";
                    var memberText2 = (member2 == null || member2.length == 0 ) ? "-" : member2 + "(" + mobile2 + ")";
                    var memberText3 = (member3 == null || member3.length == 0 ) ? "-" : member3 + "(" + mobile3 + ")";
                    if (i % 2 == 1) {
                        str += '<tr class="table-tr-odd">';
                    } else {
                        str += '<tr class="table-tr-even">';
                    }
                    str += "<td>" + typeText + "</td>";
                    str += "<td>" + memberText1 + "</td>";
                    str += "<td>" + memberText2 + "</td>";
                    str += "<td>" + memberText3 + "</td>";
                    str += "<td>" + classCode + "</td>";
                }
                $("#partner_tbody").html(str);
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
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
                    showList();
                }
            }
        });
    } else {
        $("#publicPage").html("");
    }
}