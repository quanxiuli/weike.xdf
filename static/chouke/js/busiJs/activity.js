/**
 * Created by 文超 on 2016/4/24 0024.
 */
function initAtTotal() {
    var request = getRequest();
    activityId = request["activityId"];
    initNavigationBar();
    showInfo(true, 1, activityId);
}

var activityId = '';
var totalCounts = 0;
var currentPage = 1;
var pageSize = 15;
var queryType = 1;

var firstIn = true;

var finalLaunchCount = 0;
var finalNewLaunchCount = 0;
var finalOldLaunchCount = 0;
var finalTodayLaunchCount = 0;
var finalTodayNewLaunchCount = 0;
var finalTodayOldLaunchCount = 0;
var finalHelpCount = 0;
var finalNewHelpCount = 0;
var finalOldHelpCount = 0;
var finalTodayHelpCount = 0;
var finalTodayNewHelpCount = 0;
var finalTodayOldHelpCount = 0;
var finalForwardCount = 0;
var finalNewForwardCount = 0;
var finalOldForwardCount = 0;
var finalTodayForwardCount = 0;
var finalTodayNewForwardCount = 0;
var finalTodayOldForwardCount = 0;
var finalForwardPercent = 0;


var openImg = "<i class='p176-sponsorImg'><img src='"+PREFIX_PUBLIC_URL+"images/sponsorIcon.png' alt=''></i>";
var helpImg = "<i class='p176-helpImg'><img src='"+PREFIX_PUBLIC_URL+"images/helpIcon.png' alt=''></i>";
var correctImg = '<div class="p176-correctBtn"></div>';

function showInfo(isQueryFinal, page, activityId) {
    var requestJson = {
        isQueryFinal: isQueryFinal,
        page: page,
        pageSize: pageSize,
        queryType: queryType,
        activityId: activityId
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "b9bc3e74a0a84d68a3e9d2ecbd3a030b");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://localhost:8080/xdfmanager/analyse/showInfo.do",
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        //data: JSON.stringify(requestJson),
        success: function (json) {
            if (json.result == true) {
                totalCounts = json.totalCounts;

                if (firstIn) {
                    initPage(totalCounts, page);
                    firstIn = false;
                }

                var activityAnalyse = json.activityAnalyse;
                //var activityId = activityAnalyse.activityId;
                var activityName = activityAnalyse.activityName;
                var createTime = activityAnalyse.createTime;
                // var favorite = activityAnalyse.favorite;
                var forwardCount = activityAnalyse.forwardCount;
                var helpCount = activityAnalyse.helpCount;
                var launchCount = activityAnalyse.launchCount;
                var personCount = activityAnalyse.personCount;
                var readCount = activityAnalyse.readCount;
                var publishName = activityAnalyse.publishName;
                $("#activityName").text(activityName);
                $("#createTime").text(createTime);
                // $("#readCount").text(readCount);//阅读
                $("#forwardCount").text(forwardCount);
                $("#helpCount").text(helpCount);
                $("#launchCount").text(launchCount);
                // $("#personCount").text(personCount);//参与用户
                $("#launchPerson").text(publishName);//发布人
                if (isQueryFinal) {
                    var finalAnalyse = json.finalAnalyse;
                    // 分隔线
                    finalLaunchCount = finalAnalyse.launchCount;
                    finalNewLaunchCount = finalAnalyse.newLaunchCount;
                    finalOldLaunchCount = finalAnalyse.oldLaunchCount;
                    finalTodayLaunchCount = finalAnalyse.todayLaunchCount;
                    finalTodayNewLaunchCount = finalAnalyse.todayNewLaunchCount;
                    finalTodayOldLaunchCount = finalAnalyse.todayOldLaunchCount;
                    finalHelpCount = finalAnalyse.helpCount;
                    finalNewHelpCount = finalAnalyse.newHelpCount;
                    finalOldHelpCount = finalAnalyse.oldHelpCount;
                    finalTodayHelpCount = finalAnalyse.todayHelpCount;
                    finalTodayNewHelpCount = finalAnalyse.todayNewHelpCount;
                    finalTodayOldHelpCount = finalAnalyse.todayOldHelpCount;
                    finalForwardCount = finalAnalyse.forwardCount;
                    finalNewForwardCount = finalAnalyse.newForwardCount;
                    finalOldForwardCount = finalAnalyse.oldForwardCount;
                    finalTodayForwardCount = finalAnalyse.todayForwardCount;
                    finalTodayNewForwardCount = finalAnalyse.todayNewForwardCount;
                    finalTodayOldForwardCount = finalAnalyse.todayOldForwardCount;
                    finalForwardPercent = finalAnalyse.forwardPercent;
                    // 分隔线

                    if (finalForwardPercent == null) {
                        finalForwardPercent = 0.00;
                    }
                    $("#newAndOldLaunchCount").text("总数" + finalLaunchCount);
                    $("#newAndOldHelpCount").text("总数" + finalHelpCount);
                    $("#newAndOldForwardCount").text("总数" + finalForwardCount);

                }
                showTotalInfo();

                var activityUserList = json.activityUserList;
                var str = "";
                for (var i = 0; i < activityUserList.length; i++) {
                    var listi = activityUserList[i];
                    var openId = listi["openId"];
                    var name = listi["name"];
                    var mobile = listi["mobile"];
                    if (mobile == null) {
                        mobile = '';
                    }
                    var type = listi["type"];
                    var isSuccess = listi["isSuccess"];
                    var isWon = listi["isWon"];
                    var userHelpCount = listi["helpCount"];

                    if (type == 2) {
                        userHelpCount = '-';
                    }
                    var isPay = listi["isPay"];
                    var isBenefit = listi["isBenefit"];
                    var awardname = listi["awardName"];
                    var createTimes = listi["createTime"];

                    var nameImg = '';
                    if (type == 1) {
                        nameImg = openImg;
                    } else if (type == 2) {
                        nameImg = helpImg;
                    }

                    var activityState = '';
                    if (isSuccess == 1) {
                        activityState = '成功';
                    } else {
                        activityState = '未成功';
                    }
                    if (type == 2) {
                        activityState = '-';
                    }
                    //新生
                    var benefitState = '-';
                    if (queryType == 1) {
                        if (isBenefit == 1) {
                            benefitState = '领取福利';
                        }
                    } else {
                        if (isWon == 1) {
                            benefitState = awardname;
                        }
                    }

                    if (i % 2 == 1) {
                        str += '<tr class="table-tr-odd">';
                    } else {
                        str += '<tr class="table-tr-even">';
                    }
                    str += '<td>' + nameImg + name + '</td>';
                    str += '<td>' + mobile + '</td>';
                    str += '<td>' + activityState + '</td>';
                    str += '<td>' + benefitState + '</td>';
                    str += '<td>' + userHelpCount + '</td>';
                    str += '<td>' + createTimes + '</td>';
                    if (queryType == 1) {
                        var payState = '';
                        if (isPay == 1) {
                            payState = correctImg;
                        }
                        var busState = '';
                        if (mobile.length > 0) {
                            busState = correctImg;
                        }
                        //str += '<td>' + payState + '</td>';
                        //str += '<td>' + busState + '</td>';
                    }
                    str += '<tr>';
                }
                $("#activiy_user_tbody").html(str);
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
                    showInfo(false, num, activityId);
                }
            }
        });
    } else {
        $("#publicPage").html("");
    }
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

function exportExcel() {
    if (totalCounts <= 0) {
        layer.msg('暂无统计内容可导出', {icon: 5});
        return;
    }
    var requestJson = {
        exportType: 2,
        activityId: activityId,
        queryType: queryType
    };
    window.location.href = '/chouke/exportexcel?exportType=2&activityId='+activityId+'&queryType='+queryType;
    return true;
    var d = constructionParams(rsaEncryptedString(requestJson), "34e9a567055744ada20398c161ff4046");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://localhost:8080/xdfmanager/analyse/exportExcel.do",
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        //data: JSON.stringify(requestJson),
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


function reloadList(id, type) {
    //var evt = evt || window.event;
    //var e = evt.srcElement || evt.target;
    //if (e.value == "newStudent") {
    //    //console.log("newStudent");
    //    queryType = 1;
    //} else if (e.value == "oldStudent") {
    //    //console.log("oldStudent");
    //    queryType = 2;
    //}
    queryType = type;
    for (var i = 1; i <= 2; i++) {
        var menu = document.getElementById(id + i);
        menu.className = i == queryType ? "hover" : "";
    }
    firstIn = true;
    showInfo(false, 1, activityId);

}

function showTotalInfo() {
    if (queryType == 1) {
        $("#finalLaunchCount").text(finalNewLaunchCount);
        $("#finalTodayLaunchCount").text("+" + finalTodayNewLaunchCount);
        $("#finalHelpCount").text(finalNewHelpCount);
        $("#finalTodayHelpCount").text("+" + finalTodayNewHelpCount);
        $("#finalForwardCount").text(finalNewForwardCount);
        $("#finalTodayForwardCount").text("+" + finalTodayNewForwardCount);
        //$("#finalForwardPercentDiv").show();
        $("#finalForwardPercent").text(finalForwardPercent + "%");
        $("#nameTH").width("20%");
        $("#mobileTH").width("15%");
        $("#isSuccessTH").width("20%");
        $("#isWonTH").width("10%");
        $("#helpCountTH").width("15%");
        //$("#isPayTH").show();
        //$("#isPayTH").width("10%");
        //$("#isBenefitTH").show();
        //$("#isBenefitTH").width("10%");
    } else if (queryType == 2) {
        $("#finalLaunchCount").text(finalOldLaunchCount);
        $("#finalTodayLaunchCount").text("+" + finalTodayOldLaunchCount);
        $("#finalHelpCount").text(finalOldHelpCount);
        $("#finalTodayHelpCount").text("+" + finalTodayOldHelpCount);
        $("#finalForwardCount").text(finalOldForwardCount);
        $("#finalTodayForwardCount").text("+" + finalTodayOldForwardCount);
        //$("#finalForwardPercentDiv").hide();
        $("#nameTH").width("24%");
        $("#mobileTH").width("19%");
        $("#isSuccessTH").width("24%");
        $("#isWonTH").width("14%");
        $("#helpCountTH").width("19%");
        //$("#isPayTH").hide();
        //$("#isBenefitTH").hide();
    }
}

