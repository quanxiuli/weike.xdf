var totalCounts = 0;
var currentPage = 1;
var pageSize = 15;
var currentCityId = '1';
var currentCityName = '北京'
var currentDeviceType = '';
var currentAppVersion = '';
var currentTimeType = '';
var currentType = 1;
var firstIn = true;
var switchFlag = false;

$(function () {
   /* initNavigationBar();
    initTopContent();
    initSwitch();*/
    var head = "";
    $("#ckcj").show();
    head += '<th width="20%">事件版块</th>';
    head += '<th width="20%">事件类型</th>';
    head += '<th width="20%">事件分类</th>';
    head += '<th width="10%">累计用户</th>';
    head += '<th width="10%">累计点;击</th>';
    head += '<th width="20%">事件平均时长(ms)</th>';
    $("#ckTotalListHead").html(head);
    // initPage(totalCounts, currentPage)
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    $("#startTime").attr('placeholder',currentdate);
    $("#endTime").attr('placeholder',currentdate);
});
function initCkTotal() {
    initNavigationBar();
    initTopContent();
    changeTotalCenter(currentType);
    initSwitch();
}

function changeTotalCenter(type){
    currentType = type;
        $(".xdf_border").removeClass("xdf_border");
        $("#xdf_recommend").children()[currentType - 1].className = "xdf_border";
        if (currentType == 1) {
            $(".behaviour").show();
            $(".channel").hide();
            show(1,currentCityId);
        } else if(currentType == 2){
            $(".behaviour").hide();
            $(".channel").show();
            showChannelList();
            findChannelCountList();
        }
}

function initTopContent() {
    var loginId = getCookie("loginId");
    var cityParam = {
        loginId: loginId
    };
    var cityEncrypt = constructionParams(rsaEncryptedString(cityParam), "3577775ef8e849d9ab63dad2202584e0");

    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://10.200.80.196:8088/market/sschool/getSschoolListByUser.do",
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(cityEncrypt),
        success: function (json) {
            if (json.result == true) {
                var schoolList = json.dataList;
                var cityContent = "<a href='#' onclick='filterByCityId(this, \"\", \"\")' >全部</a>";
                //var cityContent = "";
                for (var i = 0; i < schoolList.length; i++) {
                    var schoolId = schoolList[i].sCode;
                    if (schoolId == "1") {
                        cityContent += "<a href='# 'class='cur' onclick='filterByCityId(this, \"" + schoolId + "\",\"" + schoolList[i].sCity + "\")'" +
                            " >" + schoolList[i].sCity + "</a>";
                    } else {
                        cityContent += "<a href='#' onclick='filterByCityId(this, \"" + schoolId + "\",\"" + schoolList[i].sCity + "\")'" +
                            " >" + schoolList[i].sCity + "</a>";
                    }
                }
                $(".xian-wid").html(cityContent);
                initOpenAndShou1();
            } else {
                layer.msg("查询失败!", {icon: 5})
            }
        }
    });
    findTypeListTypeId();
    findVersionListVersionId();
    findTimeListTimeId();
}
function filterByCityId(_this, cityId,cityName) {
    $(".xian-wid .cur").removeClass("cur");
    $(_this).addClass("cur");
    if (cityId != '') {
        $(".list1 li").eq(1).show();
        $(".list1 li").eq(2).show();
        $(".list1 li").eq(3).show();
        findTypeListTypeId();
        findVersionListVersionId();
        findTimeListTimeId();
        currentCityId = cityId
        currentCityName = cityName;
        firstIn = true;
        show(1,currentCityId,currentDeviceType,currentAppVersion,currentTimeType);
    } else {
        currentCityId = '';
        currentCityName = '';
        currentDeviceType  = '';
        currentAppVersion  = '';
        currentTimeType  = '';
       /* $(".list1 li").eq(1).hide();
        $(".list1 li").eq(2).hide();
        $(".list1 li").eq(3).hide();*/
        $("#userTbody").html("");
        firstIn = true;
        show(1,currentCityId,currentDeviceType,currentAppVersion,currentTimeType);
    }
}
function findTypeListTypeId(){
    var typeContent = "<a href='#' class='cur' onclick='filterByTypeId(this, \"\")' >全部</a>";
    typeContent += "<a href='#' onclick='filterByTypeId(this, \"android\")' >android</a>";
    typeContent += "<a href='#' onclick='filterByTypeId(this, \"ios\")' >ios</a>";
    $(".xian-wid2").html(typeContent);
}
function filterByTypeId(_this,deviceType) {
    $(".xian-wid2 .cur").removeClass("cur");
    $(_this).addClass("cur");
    currentDeviceType = deviceType;
    firstIn = true;
    setCookie("deviceType");
    show(1,currentCityId,currentDeviceType,currentAppVersion,currentTimeType);
}
function findVersionListVersionId(){
    var businessP = {"versions": ''};
    var d = constructionParams(rsaEncryptedString(businessP), "f5e6f511f6e345f4ae492c1ea50a32a6");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var versions = json.data;
                var versionContent = "<a href='#' class='cur' onclick='filterByVersionId(this, \"\")' >全部</a>";
                for (var i = 0; i < versions.length; i++) {
                    versionContent += "<a href='#' onclick='filterByVersionId(this, \""+versions[i].version+"\")' >"+versions[i].version+"</a>";
                }
                $(".xian-wid3").html(versionContent);
                currentAppVersion = "";
            } else {
                layer.msg("查询失败!", {icon: 5})
            }
        }
    });
}
function filterByVersionId(_this,appVersion) {
    $(".xian-wid3 .cur").removeClass("cur");
    $(_this).addClass("cur");
    currentAppVersion = appVersion;
    firstIn = true;
    show(1,currentCityId,currentDeviceType,currentAppVersion,currentTimeType);
}
function findTimeListTimeId(){
    var timeContent = "<a href='#' class='cur' onclick='filterByTimeId(this, \"\")' >全部</a>";
    timeContent += "<a href='#' onclick='filterByTimeId(this, \"" + 0 + "\")' >今天</a>";
    timeContent += "<a href='#' onclick='filterByTimeId(this, \"" + -1 + "\")' >昨天</a>";
    timeContent += "<a href='#' onclick='filterByTimeId(this, \"" + 7 + "\")' >最近7天</a>";
    timeContent += "<a href='#' onclick='filterByTimeId(this, \"" + 30 + "\")' >最近30天</a>";
    timeContent += "<a href='#' onclick='filterByTimeId(this, \"" + 60 + "\")' >最近60天</a>";
    $(".xian-wid4").html(timeContent);
}
function filterByTimeId(_this,timeType) {
    $(".xian-wid4 .cur").removeClass("cur");
    $(_this).addClass("cur");
    currentTimeType = timeType;
    firstIn = true;
    show(1,currentCityId,currentDeviceType,currentAppVersion,currentTimeType);
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
    $(".open, .open2, .open3, .open4").unbind('click').click(function () {
        $(this).parent().parent().css("height", "auto");
        $(this).hide();
        $(this).next().show();
        if (switchFlag) {
            $("#m1").prev().css("height", $('.hot-classes .list1 li').eq(0).height());
        }
    });
    $(".shou, .shou2, .shou3, .shou4").unbind('click').click(function () {
        $(this).parent().parent().css("height", "30px");
        $(this).hide();
        $(this).prev().show();
        if (switchFlag) {
            $("#m1").prev().css("height", $('.hot-classes .list1 li').eq(0).height());
        }
    });
}

function initOpenAndShou1() {
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

    initSwitch();
}
//搜索
function search() {
    firstIn = true;
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    if (startTime.length <= 0 && endTime.length <= 0) {
        layer.msg('开始时间和结束时间不能都为空', {icon: 5});
        return false;
    }
    if(endTime != '') {
        if (endTime < startTime) {
            layer.msg('结束时间不能小于开始时间', {icon: 5});
            return false;
        }
    }
    /*initTopContent();
    findTypeListTypeId();
    findVersionListVersionId();
    findTimeListTimeId();*/
    show(1,currentCityId,currentDeviceType,currentAppVersion,currentTimeType);
}
function show(page,currentCityId,currentDeviceType,currentAppVersion,currentTimeType) {
    if (currentCityId == null) {
        currentCityId = "";
    }
    if (currentDeviceType == null) {
        currentDeviceType = "";
    }
    if (currentAppVersion == null) {
        currentAppVersion = "";
    }
    if (currentTimeType == null) {
        currentTimeType = "";
    }
    var startTime = $("#startTime").val();
    if (startTime == null) {
        startTime = "";
    }
    var endTime = $("#endTime").val();
    if (endTime == null) {
        endTime = "";
    }
    var requestJson = {
        cityId: currentCityId,
        deviceType: currentDeviceType,
        appVersion: currentAppVersion,
        timeType: currentTimeType,
        startTime: startTime,
        endTime: endTime,
        page: page,
        pageSize: pageSize
    };
    var d = constructionParams(rsaEncryptedString(requestJson),"99fe493b32f24fd98b5f649d603adbff");
    // $("#param").html(JSON.stringify(d));
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        //data:JSON.stringify(requestJson),
        success: function (json) {
            if (json.result == true) {
                totalCounts = json.data.totalCounts;
                if (firstIn) {
                    initPage(totalCounts, page);
                    firstIn = false;
                }
                var totalStatistics = json.data.totalStatistic;
                var listStatistics = json.data.listStatistic;

                    var classClickCount = totalStatistics.classClickCount;
                    var classClickCount_today = totalStatistics.classClickCount_today;
                    var courseClickCount = totalStatistics.courseClickCount;
                    var courseClickCount_today = totalStatistics.courseClickCount_today;
                    var hotClickCount = totalStatistics.hotClickCount;
                    var hotClickCount_today = totalStatistics.hotClickCount_today;
                        $("#classClickCount").text(classClickCount);
                        $("#classClickCount_today").text("+" + classClickCount_today);
                        $("#courseClickCount").text(courseClickCount);
                        $("#courseClickCount_today").text("+" + courseClickCount_today);
                        $("#hotClickCount").text(hotClickCount);
                        $("#hotClickCount_today").text("+" + hotClickCount_today);

                var str = "";
                for (var i = 0; i < listStatistics.length; i++) {
                    var listi = listStatistics[i];
                    var usercount = listi["usercount"];
                    var behaviour_type_name = listi["behaviour_type_name"];
                    var clickcount = listi["clickcount"];
                    var average_duration = listi["average_duration"];
                    var behaviour_categary_name = listi["behaviour_categary_name"];
                    var behaviour_module_name = listi["behaviour_module_name"];
                    if (i % 2 == 1) {
                        str += "<tr class='table-tr-odd'>";
                    } else {
                        str += "<tr class='table-tr-even'>";
                    }
                    str += "<td>" + behaviour_module_name + "</td>";
                    str += "<td>" + behaviour_type_name + "</td>";
                    str += "<td>" + behaviour_categary_name + "</td>";
                    str += "<td>" + usercount + "</td>";
                    str += "<td>" + clickcount + "</td>;";
                    str += "<td>" + average_duration + "</td>";
                    str += "</tr>";
                }
                $("#activity_tbody").html(str);
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}


function initPage(totalCounts, currentPage) {
    // console.log("initPage: totalCounts --> " + totalCounts + "\tcurrentPage --> " + currentPage);
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
                    show(num,currentCityId,currentDeviceType,currentAppVersion,currentTimeType);
                }
            }
        });
    } else {
        $("#publicPage").html("");
    }
}



function exportExcel() {
    var activity_tbody = $("#activity_tbody").children();
    if (activity_tbody.length <= 0) {
        layer.msg('暂无统计内容可导出', {icon: 5});
        return;
    }
    if (currentCityId == null) {
        currentCityId = "";
    }
    if (currentCityName == null) {
        currentCityName = "";
    }else{
        currentCityName = pinyin.getFullChars(currentCityName);
    }
    if (currentDeviceType == null) {
        currentDeviceType = "";
    }
    if (currentAppVersion == null) {
        currentAppVersion = "";
    }
    if (currentTimeType == null) {
        currentTimeType = "";
    }
    var startTime = $("#startTime").val();
    if (startTime == null) {
        startTime = "";
    }
    var endTime = $("#endTime").val();
    if (endTime == null) {
        endTime = "";
    }
    var requestJson = {
        cityId: currentCityId,
        cityName: currentCityName,
        deviceType: currentDeviceType,
        appVersion: currentAppVersion,
        timeType: currentTimeType,
        startTime: startTime,
        endTime: endTime
    };
    var d = constructionParams(rsaEncryptedString(requestJson),"f560dce05d6d4a8b84c424f9cb74ff78");
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
