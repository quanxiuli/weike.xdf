var whactivityId = '';
var shactivityId = '';
var ycactivityId = '';
$(function () {
    var loginId = getCookie("loginId");
    var schoolId = getCookie("schoolId");
    whactivityId = 'wuhanpaopao-01';
    shactivityId = 'sh_paopao_01';
    ycactivityId = 'sh_youcan_01';
    if (marketJs.loginUserIsAdmin(loginId)) {
        $("#whpp").show();
        $("#shyc").show();
        $("#shpp").show();
        $(".p176-btn-new").hide();
        showPaoPaoList(whactivityId);
        showYouCanList(ycactivityId);
        showPaoPaoList(shactivityId);
    } else if(schoolId == 2){
        $("#shyc").show();
        $("#shpp").show();
        $("#whpp").hide();
        $(".p176-btn-new").show();
        showYouCanList(ycactivityId);
        showPaoPaoList(shactivityId);
    } else if(schoolId == 4){
        $("#whpp").show();
        $("#shpp").hide();
        $("#shyc").hide();
        $(".p176-btn-new").show();
        showPaoPaoList(whactivityId);
    }
});

//显示泡泡购课列表
function showPaoPaoList(activityId) {
    var requestJson = {
        activityId: activityId
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "15bf31e6e9124d328e05fdae3638edda");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            showPaoPaoResult(json,activityId);
        }
    });
}

function showPaoPaoResult(json,activityId){
    if (json.result == true) {
        var paopaoList = json.dataList;
        var str = "";
        if (paopaoList.length > 0) {
            for (var i = 0; i < paopaoList.length; i++) {
                var paopao = paopaoList[i];
                str += "<tr>";
                str += "<td><a href='javascript:showPaoPaoInfo(\"" + paopao.name + "\",\"" + activityId + "\")'  style='color:blue;'>" + paopao.name + "</a></td>";
                str += "<td>" + paopao.r_tim + "</td>";
                str += "<td>" + paopao.classCount + "</td>";
                str += "<td>" + paopao.maxNumCount + "</td>";
                str += "<td>" + paopao.buyClassPeopleCount + "</td>";
                str += "<td>" + paopao.buyClassSum + "</td>";
                str += "<td>" + paopao.buyClassPriceSum + "</td>";
                str += "<td>" + paopao.successSum + "</td>";
                str += "<td>" + paopao.oldDrawCount + "</td>";
                if(activityId == 'wuhanpaopao-01'){
                    str += "<td>" + paopao.oldBuyClassSum + "</td>";
                    str += "<td>" + paopao.newBuyClassSum + "</td>";
                }
                str += "<td>" + paopao.readCount + "</td>";
                str += "<td>" + paopao.originateCount + "</td>";
                str += "<td>" + paopao.helpCount + "</td>";
                str += "<td>" + paopao.wonPeopleCount + "</td>";
                str += "<td>" + paopao.shareCount + "</td>";
                str += "</tr>";
            }
            if(activityId == 'wuhanpaopao-01'){
                $("#whpaopao_tbody").html(str);
            }else if(activityId == 'sh_paopao_01'){
                $("#shpaopao_tbody").html(str);
            }
        }
    } else {
        layer.msg("查询失败!", {icon: 5});
    }
}
//导出泡泡购课列表
function exportPaoPaoExcel(id) {
    var paopao_tbody = null;
    var activityId = '';
    if(id == '1'){
        paopao_tbody = $("#whpaopao_tbody").children();
        activityId = whactivityId;
    }else if(id == '2'){
        paopao_tbody = $("#shpaopao_tbody").children();
        activityId = shactivityId;
    }
    if (paopao_tbody.length <= 0) {
        layer.msg('暂无统计内容可导出', {icon: 5});
        return;
    }
    var requestJson = {
        activityId: activityId
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "1bc65caaccf7495abafc68009daa552c");
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

//显示优能购课列表
function showYouCanList(activityId) {
    var requestJson = {
        activityId: activityId
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "837bae9cb24d437ebf40a497817bc46a");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            showYouCanResult(json,activityId);
        }
    });
}

function showYouCanResult(json,activityId){
    if (json.result == true) {
        var youcanList = json.dataList;
        var str = "";
        if (youcanList.length > 0) {
            for (var i = 0; i < youcanList.length; i++) {
                var youcan = youcanList[i];
                str += "<tr>";
                str += "<td><a href='javascript:showYouCanInfo(\"" + youcan.name + "\",\"" + activityId + "\")'  style='color:blue;'>" + youcan.name + "</a></td>";
                str += "<td>" + youcan.r_tim + "</td>";
                str += "<td>" + youcan.classCount + "</td>";
                str += "<td>" + youcan.maxNumCount + "</td>";
                str += "<td>" + youcan.buyClassPeopleCount + "</td>";
                str += "<td>" + youcan.buyClassSum + "</td>";
                str += "<td>" + youcan.buyClassPriceSum + "</td>";
                str += "<td>" + youcan.successSum + "</td>";
                str += "<td>" + youcan.readCount + "</td>";
                str += "<td>" + youcan.shareCount + "</td>";
                str += "</tr>";
            }
            $("#shyoucan_tbody").html(str);
        }
    } else {
        layer.msg("查询失败!", {icon: 5});
    }
}
//导出优能购课列表
function exportShangHaiYouCanExcel() {
    var shyoucan_tbody = $("#shyoucan_tbody").children();
    if (shyoucan_tbody.length <= 0) {
        layer.msg('暂无统计内容可导出', {icon: 5});
        return;
    }
    var requestJson = {
        activityId: ycactivityId
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "df4f7561cbb24145987422a1548eb6d0");
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

//显示泡泡活动名称 跳转路径
function showPaoPaoInfo(name,activityId) {
    if(activityId == 'wuhanpaopao-01'){
        window.location.href = "bcDetailsTotal.html?name="+name+"&activityId="+activityId;
    }else if(activityId == 'sh_paopao_01'){
        window.location.href = "bcDetailsTotal.html?name="+name+"&activityId="+activityId;
    }
}

//显示优能活动名称 跳转路径
function showYouCanInfo(name,activityId) {
    window.location.href = "ycDetailsTotal.html?name="+name+"&activityId="+activityId;
}