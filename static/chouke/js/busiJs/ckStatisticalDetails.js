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
var firstIn = true;

var finalLaunchCount = 0;
var finalTodayLaunchCount = 0;
var finalHelpCount = 0;
var finalTodayHelpCount = 0;
var finalForwardCount = 0;
var finalTodayForwardCount = 0;


var openImg = "<i class='p176-sponsorImg'><img src='"+PREFIX_PUBLIC_URL+"images/sponsorIcon.png' alt=''></i>";
var helpImg = "<i class='p176-helpImg'><img src='"+PREFIX_PUBLIC_URL+"images/helpIcon.png' alt=''></i>";
var correctImg = '<div class="p176-correctBtn"></div>';

function showInfo(isQueryFinal, page, activityId) {
    var requestJson = {
        isQueryFinal: isQueryFinal,
        page: page,
        pageSize: pageSize,
        activityId: activityId
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "224cad36ea6f4423b46798264ccecaf0");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://localhost:8080/xdfmanager/analyse/showNewInfo.do",
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
                var activityName = activityAnalyse.activityName;
                var createTime = activityAnalyse.createTime;
                var forwardCount = activityAnalyse.forwardCount;
                var helpCount = activityAnalyse.helpCount;
                var launchCount = activityAnalyse.launchCount;
                var readCount = activityAnalyse.readCount;
                var publishName = activityAnalyse.publishName;
                $("#activityName").text(activityName);
                $("#createTime").text(createTime);
                $("#forwardCount").text(forwardCount);
                $("#helpCount").text(helpCount);
                $("#launchCount").text(launchCount);
                $("#launchPerson").text(publishName);//发布人
                if (isQueryFinal) {
                    var finalAnalyse = json.finalAnalyse;
                    // 分隔线
                    finalLaunchCount = finalAnalyse.launchCount;
                    finalTodayLaunchCount = finalAnalyse.todayLaunchCount;
                    finalHelpCount = finalAnalyse.helpCount;
                    finalTodayHelpCount = finalAnalyse.todayHelpCount;
                    finalForwardCount = finalAnalyse.forwardCount;
                    finalTodayForwardCount = finalAnalyse.todayForwardCount;
                    // 分隔线
                }
                showTotalInfo();

                var activityUserList = json.activityUserList;
                var str = "";
                for (var i = 0; i < activityUserList.length; i++) {
                    var listi = activityUserList[i];
                    var name = listi["userName"];
                    var channel = listi["channel"];
                    var mobile = listi["mobile"];
                    if (mobile == null) {
                        mobile = '';
                    }
                    var wealCount = listi["wealCount"];
                    var isSuccess = listi["isSuccess"];
                    var userHelpCount = listi["helpCount"];
                    var helpUsers = listi['helpUsers'].length > 0 ?listi['helpUsers']:[];
                    var helperOpenId = listi["helperOpenId"];
                    var createTimes = listi["createTime"];

                    var activityState = '';
                    if (isSuccess == 1) {
                        activityState = '成功';
                    } else {
                        activityState = '未成功';
                    }

                    if (i % 2 == 1) {
                        str += '<tr class="table-tr-odd">';
                    } else {
                        str += '<tr class="table-tr-even">';
                    }
                    if(name == '' || name == 'undefined'){
                        str += '<td>' + '-' + '</td>';
                    } else {
                        str += '<td>' + openImg + name + '</td>';
                    }
                    str += '<td>' + channel + '</td>';
                    if(helperOpenId == ''|| helperOpenId == null){
                        str += '<td>' + '发起者' + '</td>';
                    }/*else{
                        str += '<td>' + '帮筹者' + '</td>';
                    }*/
                    str += '<td>' + mobile + '</td>';
                    str += '<td>' + activityState + '</td>';
                    str += '<td>--</td>';
                    str += '<td>' + userHelpCount + '</td>';
                    str += '<td>' + createTimes + '</td>';
                    str += '</tr>';
	                if(helpUsers.length > 0){
		                for(var index in helpUsers){
		                	 str += "<tr class='info'>";
		            	    if(helpUsers[index]['userName'] == '' || helpUsers[index]['userName'] == 'undefined'){
		                        str += '<td>' + '--' + '</td>';
		                    } else {
		                        str += '<td>' + helpImg + helpUsers[index]['userName'] + '</td>';
		                    }
		                    str += '<td>--</td>';
		                    str += '<td>' + '帮筹者' + '</td>';
		                    str += '<td>' + (helpUsers[index]['mobile'] > 0?helpUsers[index]['mobile']:'--') + '</td>';
		                    str += '<td>--</td>';
		                    if(helpUsers[index]['mobile'] > 0){
		                    	 str += '<td>领取福利</td>';
		                    }else{
		                    	 str += '<td>--</td>';
		                    }
		                    str += '<td>--</td>';
		                    str += '<td>' + helpUsers[index]['createTime'] + '</td>';
		                    str += '</tr>';
		                }
	                }
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
//导出Excel
function exportExcel() {
    if (totalCounts <= 0) {
        layer.msg('暂无统计内容可导出', {icon: 5});
        return;
    }
    var requestJson = {
        exportType: 2,
        activityId: activityId,
    };
    window.location.href = '/chouke/exportnewexcel?exportType=2&activityId='+activityId;
    return true;
    var d = constructionParams(rsaEncryptedString(requestJson), "94aa5d58e798493982090c678fec2358");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://localhost:8080/xdfmanager/analyse/exportNewExcel.do",
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

function showTotalInfo() {
        $("#finalLaunchCount").text(finalLaunchCount);
        $("#finalTodayLaunchCount").text("+" + finalTodayLaunchCount);
        $("#finalHelpCount").text(finalHelpCount);
        $("#finalTodayHelpCount").text("+" + finalTodayHelpCount);
        $("#finalForwardCount").text(finalForwardCount);
        $("#finalTodayForwardCount").text("+" + finalTodayForwardCount);
        $("#nameTH").width("20%");
        $("#channelTH").width("20%");
        $("#userTypeTH").width("20%");
        $("#mobileTH").width("15%");
        $("#isSuccessTH").width("20%");
      //  $("#isWonTH").width("10%");
        $("#helpCountTH").width("15%");

}

