var totalCounts = 0;
var currentPage = 1;
var pageSize = 15;
var currentCityId = '1';
var currentAreaId = '';
var currentDeptId = '';
var currentType = 1;
var switchFlag = false;

$(function () {

    // initPage(totalCounts, currentPage)
});
function initCkTotal() {
    initNavigationBar();
    initTopContent();
    changeCkTotalCenter(currentType);
    initSwitch();
}
var firstIn = true;

function changeCkTotalCenter(type){
    currentType = type;
    changeTag();//切换tab，改变表格head
    firstIn = true;
    filterByCityId($('#allSchools'), "");
    //查询数据
//    if (currentType == 1) {//筹课抽奖
//        show(true, 1);
//    } else if (currentType == 2) {//筹课
//        show(true, 1);
//    } else if (currentType == 3) {//点赞
//
//    }
}

function changeTag() {
    $(".xdf_border").removeClass("xdf_border");
    $("#xdf_recommend").children()[currentType - 1].className = "xdf_border";
    var head = "";
    if (currentType == 1) {
        $("#ckcj").show();
        $("#cknew").hide();
        $("#dianzan").hide();
        $(".set-new").html("<i></i>筹课抽奖");
        //$(".li1").removeClass("li1");
        //$(".list1").children()[1].style.display = "none";
        //$("#m1").hide();
        head += '<th width="20%">已发筹课</th>';
        head += '<th width="20%">发布时间</th>';
        head += '<th width="20%">所属校区</th>';
        head += '<th width="20%">阅读</th>';
        head += '<th width="10%">参与用户</th>';
        head += '<th width="10%">发起总数</th>';
        head += '<th width="10%">帮筹总数</th>';
        head += '<th width="10%">转发</th>';
    } else if(currentType == 2){
        $("#ckcj").hide();
        $("#dianzan").hide();
        $("#cknew").show();
        $(".set-new").html("<i></i>筹课");
        head += '<th width="20%">活动标题</th>';
        head += '<th width="20%">发布时间</th>';
        head += '<th width="20%">所属校区</th>';
        head += '<th width="20%">阅读</th>';
        head += '<th width="10%">参与用户</th>';
        head += '<th width="10%">发起总数</th>';
        head += '<th width="10%">帮筹总数</th>';
        head += '<th width="10%">转发</th>';
    } else {
        $("#ckcj").hide();
        $("#cknew").hide();
        $("#dianzan").show();
        $(".set-new").html("<i></i>点赞");
        //$(".list1").children()[0].className = "li1";
        //$(".list1").children()[1].style.display = "block";
        //$("#m1").show();
    }
    $("#ckTotalListHead").html(head);
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
                var cityContent = "<a href='#' id='allSchols' onclick='filterByCityId(this, \"\")' >全部</a>";
                //var cityContent = "";
                for (var i = 0; i < schoolList.length; i++) {
                    var schoolId = schoolList[i].sCode;
                    if (schoolId == "1") {
                        cityContent += "<a href='# 'class='cur' onclick='filterByCityId(this, \"" + schoolId + "\")'" +
                            " >" + schoolList[i].sCity + "</a>";
                    } else {
                        cityContent += "<a href='#' onclick='filterByCityId(this, \"" + schoolId + "\")'" +
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
    // 默认显示北京校区和部门
    //findAreaListByCityId(currentCityId);
    //findDeptListByCityId(currentCityId);
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

function findAreaListByCityId(cityId) {
    var loginId = getCookie("loginId");
    currentCityId = cityId;
    var areaParam = {
        loginId: loginId,
        nSchoolId: cityId
    };
    var areaEncrypt = constructionParams(rsaEncryptedString(areaParam), "8ec2ce035be84cde916f6c0772fab0e1");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://10.200.80.196:8088/market/bsArea/getBsAreaListByUser.do",
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(areaEncrypt),
        success: function (json) {
            if (json.result == true) {
                var areaList = json.dataList;
                var areaContent = "<a href='#' class='cur' onclick='filterByAreaId(this, \"\")' >全部</a>";

                for (var i = 0; i < areaList.length; i++) {
                    areaContent += "<a href='#' onclick='filterByAreaId(this, \"" + areaList[i].sCode + "\")' >" + areaList[i].sName + "</a>";
                }
                $(".xian-wid2").html(areaContent);
                currentAreaId = "";
                initOpenAndShou2();
            } else {
                layer.msg("查询失败!", {icon: 5})
            }
        }
    });
}

function findDeptListByCityId(cityId) {
    var loginId = getCookie("loginId");
    var deptParam = {
        loginId: loginId,
        nSchoolId: cityId
    };
    var deptEncrypt = constructionParams(rsaEncryptedString(deptParam), "53fb691dae024332bad735c419efda19");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://10.200.80.196:8088/market/sdept/getSdeptListByUser.do",
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(deptEncrypt),
        success: function (json) {
            if (json.result == true) {
                var deptList = json.dataList;
                var deptContent = "<a href='#' class='cur' onclick='filterByDeptId(this, \"\")' >全部</a>";

                for (var i = 0; i < deptList.length; i++) {
                    deptContent += "<a href='#' onclick='filterByDeptId(this, \"" + deptList[i].sCode + "\")' >" + deptList[i].sName + "</a>";
                }
                $(".xian-wid3").html(deptContent);
                currentDeptId = "";
                initOpenAndShou3();
            } else {
                layer.msg("查询失败!", {icon: 5})
            }
        }
    });
}

function filterByCityId(_this, cityId) {
    $(".xian-wid .cur").removeClass("cur");
    $(_this).addClass("cur");
    if (cityId != '') {
        $(".list1 li").eq(1).show();
        $(".list1 li").eq(2).show();
        findAreaListByCityId(cityId);
        findDeptListByCityId(cityId);
        firstIn = true;
        show(true, 1);
    } else {
        currentCityId = '';
        currentAreaId = '';
        currentDeptId = '';
        $(".list1 li").eq(1).hide();
        $(".list1 li").eq(2).hide();
        $("#userTbody").html("");
        //$("#publicPage").html("");
        firstIn = true;
        show(true, 1);
    }
}

function filterByAreaId(_this, areaId) {
    $(".xian-wid2 .cur").removeClass("cur");
    $(_this).addClass("cur");
    currentAreaId = areaId;
    findDeptListByCityId(currentCityId);
    firstIn = true;
    setCookie("areaId");
    show(true, 1);
}

function filterByDeptId(_this, deptId) {
    $(".xian-wid3 .cur").removeClass("cur");
    $(_this).addClass("cur");
    currentDeptId = deptId;
    firstIn = true;
    show(true, 1);
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
function initOpenAndShou2() {
    //2
    var baseht = 30;
    var ht = $(".hot-classes .list1").find(".xian-wid2").height();

    //分类1
    if (ht > baseht) {
        $(".open2").show();
        $(".shou2").hide();
    } else {
        $(".open2").hide();
        $(".shou2").hide();
    }
    initSwitch();
}
function initOpenAndShou3() {
    //3
    var baseht = 30;
    var ht = $(".hot-classes .list1").find(".xian-wid3").height();
    //分类1
    if (ht > baseht) {
        $(".open3").show();
        $(".shou3").hide();
    } else {
        $(".open3").hide();
        $(".shou3").hide()
    }

    initSwitch();
}
//搜索
function search() {
    firstIn = true;
    show(true, 1);
}
function show(isQueryFinal, page) {
    var nameText = $("#nameText").val();
    if (nameText == null) {
        nameText = "";
    }
    var requestJson = {
        schoolId: currentCityId,
        deptId: currentDeptId,
        areaId: currentAreaId,
        isQueryFinal: isQueryFinal,
        nameText: nameText,
        page: page,
        pageSize: pageSize
    };
    var serverId = "";
    if (currentType == 1) { //筹课抽奖
        serverId = "3731d573f6084146b746c826489e76b3";
    } else if(currentType == 2) {  //筹课
        serverId = "47124a98bd114659ba63b0901fd7299e";
    }
    var d = constructionParams(rsaEncryptedString(requestJson),serverId);
    // $("#param").html(JSON.stringify(d));
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://localhost:8080/xdfmanager/analyse/show.do",
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        //data:JSON.stringify(requestJson),
        success: function (json) {
            if (json.result == true) {
                // console.log("ajax ------- ");
                totalCounts = json.totalCounts;
                if (firstIn) {
                    initPage(totalCounts, page);
                    firstIn = false;
                }
                var finalAnalyse = json.finalAnalyse;
                var activityAnalyseList = json.activityAnalyseList;

                if (isQueryFinal) {
                    var launchCount = finalAnalyse.launchCount;
                    var todayLaunchCount = finalAnalyse.todayLaunchCount;
                    var helpCount = finalAnalyse.helpCount;
                    var todayHelpCount = finalAnalyse.todayHelpCount;
                    var forwardCount = finalAnalyse.forwardCount;
                    var todayForwardCount = finalAnalyse.todayForwardCount;

                    if (currentType == 1) { //筹课抽奖
                        var newLaunchCount = finalAnalyse.newLaunchCount;
                        var oldLaunchCount = finalAnalyse.oldLaunchCount;
                        var todayNewLaunchCount = finalAnalyse.todayNewLaunchCount;
                        var todayOldLaunchCount = finalAnalyse.todayOldLaunchCount;
                        var newHelpCount = finalAnalyse.newHelpCount;
                        var oldHelpCount = finalAnalyse.oldHelpCount;
                        var todayNewHelpCount = finalAnalyse.todayNewHelpCount;
                        var todayOldHelpCount = finalAnalyse.todayOldHelpCount;
                        var newForwardCount = finalAnalyse.newForwardCount;
                        var oldForwardCount = finalAnalyse.oldForwardCount;
                        var todayNewForwardCount = finalAnalyse.todayNewForwardCount;
                        var todayOldForwardCount = finalAnalyse.todayOldForwardCount;
                        var forwardPercent = finalAnalyse.forwardPercent;
                        $("#launchCount").text(launchCount);
                        $("#todayLaunchCount").text("+" + todayLaunchCount);
                        $("#todayNewAdnOldLaunchCount").html("新&nbsp;" + newLaunchCount + "/老&nbsp;" + oldLaunchCount + "<p>今日&nbsp;新+" + todayNewLaunchCount + "/老+" + todayOldLaunchCount);
                        $("#helpCount").text(helpCount);
                        $("#todayHelpCount").text("+" + todayHelpCount);
                        $("#todayNewAndOldHelpCount").html("新&nbsp;" + newHelpCount + "/老&nbsp;" + oldHelpCount + "<p>今日&nbsp;新+" + todayNewHelpCount + "/老+" + todayOldHelpCount);
                        $("#forwardCount").text(forwardCount);
                        $("#todayForwardCount").text("+" + todayForwardCount);
                        $("#todayNewAndForwardCount").html("新&nbsp;" + newForwardCount + "/老&nbsp;" + oldForwardCount + "<p>今日&nbsp;新+" + todayNewForwardCount + "/老+" + todayOldForwardCount);

                    } else if(currentType == 2) {  //筹课
                        $("#launchCount2").text(launchCount);
                        $("#todayLaunchCount2").text("+" + todayLaunchCount);
                        $("#helpCount2").text(helpCount);
                        $("#todayHelpCount2").text("+" + todayHelpCount);
                        $("#forwardCount2").text(forwardCount);
                        $("#todayForwardCount2").text("+" + todayForwardCount);
                    }

                    //$("#newAndOldLaunchCount").text(newLaunchCount + "/" + oldLaunchCount);
                    //$("#todayNewAdnOldLaunchCount").text("+" + todayNewLaunchCount + "/+" +  todayOldLaunchCount);


                    //$("#newAndOldHelpCount").text(newHelpCount + "/" + oldHelpCount);
                    //$("#todayNewAndOldHelpCount").text("+" + todayNewHelpCount + "/+" +  todayOldHelpCount);

                    //$("#newAndOldForwardCount").text(newForwardCount + "/" + oldForwardCount);
                    //$("#todayNewAndForwardCount").text("+" + todayNewForwardCount + "/+" +  todayOldForwardCount);
                    if (forwardPercent == null) {
                        forwardPercent = 0;
                    }
                    //$("#forwardPercent").text(forwardPercent + "%");
                }
                // console.log("size --> " + activityAnalyseList.length);
                var str = "";
                for (var i = 0; i < activityAnalyseList.length; i++) {
                    var listi = activityAnalyseList[i];
                    var activityId = listi["activityId"];
                    var activityName = listi["activityName"];
                    var schoolId = listi["schoolId"];
                    var areaCode = listi["areaCode"];
                    var classArea = listi["classArea"];
                    var createTime = listi["createTime"];
                    if (createTime == null) {
                        createTime = "";
                    }
                    var readCount = listi["readCount"];
                    var personCount = listi["personCount"];
                    var launchCount = listi["launchCount"];
                    var helpCount = listi["helpCount"];
                    var forwardCount = listi["forwardCount"];
                    if (i % 2 == 1) {
                        str += "<tr class='table-tr-odd'>";
                    } else {
                        str += "<tr class='table-tr-even'>";
                    }
                    str += "<td style='display:none'>" + activityId + "</td>";
                    str += "<td><a href='javascript:showInfo(\"" + activityId + "\")'  style='color:blue;'>" + activityName + "</a></td>";
                    str += "<td>" + createTime + "</td>";
                    if(currentType == 1){
                        str += "<td>" + classArea + "</td>";
                    }else if(currentType == 2){
                        str += "<td>" + areaCode + "</td>";
                    }
                    str += "<td>" + readCount + "</td>";
                    str += "<td>" + personCount + "</td>";
                    str += "<td>" + launchCount + "</td>";
                    str += "<td>" + helpCount + "</td>";
                    str += "<td>" + forwardCount + "</td>";
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
                    show(false, num);
                }
            }
        });
    } else {
        $("#publicPage").html("");
    }
}


function showInfo(activityId) {
    if (currentType == 1) { //筹课抽奖详情页
        window.location.href = "/chouke/attotal?activityId=" + activityId;
    } else if(currentType == 2) {  //筹课详情页
        window.location.href = "/chouke/rctotal?activityId=" + activityId;
    }

}

//Excel导出
function exportExcel() {
    if (totalCounts <= 0) {
        layer.msg('暂无统计内容可导出', {icon: 5});
        return;
    }
    var nameText = $("#nameText").val();
    if (nameText == null) {
        nameText = "";
    }
    var requestJson = {
        exportType: 1,
        schoolId: currentCityId,
        deptId: currentDeptId,
        areaId: currentAreaId,
        nameText:nameText
    };
    var serverId = "";
    if (currentType == 1) { //筹课抽奖
        serverId = "34e9a567055744ada20398c161ff4046";
        window.location.href = '/chouke/exportexcel?exportType=1&schoolId='+currentCityId+'&deptId='+currentDeptId+'&areaId='+currentAreaId+'&nameText='+encodeURIComponent(nameText);
    } else if(currentType == 2) {  //筹课
    	window.location.href = '/chouke/exportnewexcel?exportType=1&schoolId='+currentCityId+'&deptId='+currentDeptId+'&areaId='+currentAreaId+'&nameText='+encodeURIComponent(nameText);
        serverId = "94aa5d58e798493982090c678fec2358";
    }
    return true;
    console.log(requestJson);
    var d = constructionParams(requestJson,serverId,1);
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
