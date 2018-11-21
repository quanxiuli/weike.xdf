var weOpenFlag = 0;
var totalCounts = 0;
var currentPage = 1;
var pageSize = 15;
var currentCityId = '1';
var currentAreaId = '';
var currentDeptId = '';
var switchFlag = false;
var firstIn = true;
var currentType = 1;
var currentStatus = '';

$(function () {
    initTopContent();
    var request = getRequest();
    var type = request["type"];
    if(type != '' && type != null && type != undefined){
        currentType = type;
    }
    changeCkCenter(currentType);
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
                var cityContent = "<a href='#' onclick='filterByCityId(this, \"\")' >全部</a>";
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
    findAreaListByCityId(currentCityId);
    findDeptListByCityId(currentCityId);

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
    if(cityId != ''){
        $(".list1 li").eq(1).show();
        $(".list1 li").eq(2).show();
        findAreaListByCityId(cityId);
        findDeptListByCityId(cityId);
        firstIn = true;
        showList(1, cityId, currentAreaId, currentDeptId, currentStatus);
    }else{
        currentCityId = '';
        currentAreaId = '';
        currentDeptId = '';
        $(".list1 li").eq(1).hide();
        $(".list1 li").eq(2).hide();
        $("#userTbody").html("");
        $("#publicPage").html("");
        if($("#searchKey").val() !=''){
            showList(1, cityId, currentAreaId, currentDeptId, currentStatus);
        }
    }
}

function filterByAreaId(_this, areaId) {
    $(".xian-wid2 .cur").removeClass("cur");
    $(_this).addClass("cur");
    currentAreaId = areaId;
    findDeptListByCityId(currentCityId);
    firstIn = true;
    setCookie("areaId");
    showList(1, currentCityId, areaId, currentDeptId, currentStatus);
}

function filterByDeptId(_this, deptId) {
    $(".xian-wid3 .cur").removeClass("cur");
    $(_this).addClass("cur");
    currentDeptId = deptId;
    firstIn = true;
    showList(1, currentCityId, currentAreaId, currentDeptId, currentStatus);
}

function filterByStatus(_this, status){
    $(".xian-wid4 .cur").removeClass("cur");
    $(_this).addClass("cur");
    currentStatus = status;
    firstIn = true;
    showList(1, currentCityId, currentAreaId, currentDeptId, currentStatus);
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
                if (type != "init") {
                    showList(num, currentCityId, currentAreaId, currentDeptId, currentStatus);
                }
            }
        });
    } else {
        $("#publicPage").html("");
    }
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
    showList(1, currentCityId, currentAreaId, currentDeptId, currentStatus);
}

function createCk() {
    if (currentAreaId == "") {//$("#areaIdFinal").val() == ""
        layer.msg("请选择一个校区", {icon: 5});
    } else {
        //此处目前有三种活动：1-筹课抽奖，2-筹课，3-点赞
        //原先的筹课抽奖有发布权限的控制，2和3应该也要有
        //新建筹课，需要获取当前人是否有发布的权限，如果没有，要将打开的页面上的发布按钮隐藏掉

        sessionStorage.setItem("currentCityId", currentCityId);
        sessionStorage.setItem("currentAreaId", currentAreaId);
        sessionStorage.setItem("currentDeptId", currentDeptId);
        sessionStorage.setItem("currentType", currentType);

        var functionList = JSON.parse(localStorage.functionCheckedList);
        var len = functionList.length;
        var publish = false;
        if(currentType == 1){//筹课抽奖
            var funcs = null;
            for (var i = 0; i < len; i++) {
                var fun = functionList[i];
                var functionId = fun.id;
                if(functionId == '1'){
                    var children = fun.children;
                    for(var j=0;j<children.length;j++){
                        var funcid = children[j].id;
                        if(funcid == '102'){
                            funcs = children[j].children;
                            break;
                        }
                    }
                }
                if(funcs != null){
                    break;
                }
            }
            if(funcs != null){
                for (var i = 0; i < funcs.length; i++) {
                    var fun = funcs[i];
                    var functionId = fun.id;
                    var checked = fun.checked;
                    if (functionId == 10203 && checked) {
                        publish = true;
                        break;
                    }
                }
            }
            changeCenter('./setCourseInfo.html?publish=' + publish);
        }else if(currentType == 2){//筹课
            //暂时没有权限管理
            publish = true;
            changeCenter('./setRaiseClassInfo.html?publish=' + publish);
        }else if(currentType == 3){//点赞
            publish = true;
            changeCenter('./setCollectPraiseInfo.html?publish=' + publish);
        }
    }
}

function changeCkCenter(type) {
    currentType = type;
    changeTag();//切换tab，改变表格head
    //查询数据
    if(currentType == 1){//筹课抽奖
        showList(1, currentCityId, currentAreaId, currentDeptId, currentStatus);
    }else if(currentType == 2){//筹课
        showList(1, currentCityId, currentAreaId, currentDeptId, currentStatus);
    }else if(currentType == 3){//点赞

    }
}


function changeTag() {
    $(".xdf_border").removeClass("xdf_border");
    $("#xdf_recommend").children()[currentType - 1].className = "xdf_border";
    var head = "";
    if (currentType == 1 || currentType == 2) {
        if (currentType == 1) {
            $(".set-new").html("<i></i>筹课抽奖");
            head += '<th width="20%">筹课名称</th>';
        }
        if(currentType == 2){
            $(".set-new").html("<i></i>筹课");
            head += '<th width="20%">活动标题</th>';
        }
        //$(".li1").removeClass("li1");
        //$(".list1").children()[1].style.display = "none";
        //$("#m1").hide();

        head += '<th width="30%">筹课时间</th>';
        head += '<th width="12%">状态</th>';
        head += '<th width="10%">分享设置</th>';
        head += '<th width="30%">操作</th>';
    } else {
        $(".set-new").html("<i></i>点赞");
        //$(".list1").children()[0].className = "li1";
        //$(".list1").children()[1].style.display = "block";
        //$("#m1").show();
        head += '<th width="20%">名称</th>';
        head += '<th width="30%">活动时间</th>';
        head += '<th width="12%">状态</th>';
        head += '<th width="10%">分享设置</th>';
        head += '<th width="30%">操作</th>';
    }
    $("#ckListHead").html(head);
}


function pops(_this) {
    $(_this).find("div").first().toggle();
}
//状态 0:待发布，1：未开始，2：进行中，3：已结束，4：提前结束'
function showList(page, cityId, areaId, deptId, status) {
    if (cityId == null) {
        cityId = "";
    }
    if (areaId == null) {
        areaId = "";
    }
    if (deptId == null) {
        deptId = "";
    }
    var nameText = $("#nameText").val();
    if (nameText == null) {
        nameText = "";
    }
    var requestJson = {
        schoolId:  cityId,
        loginId: getCookie("loginId"),
        areaId: areaId,
        deptId: deptId,
        status:status,
        nameText: nameText,
        currentPage: page,
        pageSize: pageSize
    };
    var serverId = "";
    if (currentType == 1) { //筹课抽奖
        serverId = "066495bbda9341e5b379043259dd7a23";
    } else if(currentType == 2) {  //筹课
        serverId = "63e8e90eeb984ab38bc81394e2c43d8f";
    }
    var d = constructionParams(rsaEncryptedString(requestJson), serverId);
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                totalCounts = json.totalCount;
                initPage(totalCounts, page);
                var ckList = json.dataList;
                var str = "";
                for (var i = 0; i < ckList.length; i++) {
                    var id = ckList[i]["id"];
                    var name = ckList[i]["name"];
                    if(currentType == 1 ){//筹课抽奖
                        var time = ckList[i]["time"];
                        var rewardTime = ckList[i]["rewardTime"];
                        if (rewardTime != null && rewardTime != "") {
                            if (timeText != "") {
                                timeText += "</br>";
                            }
                            timeText += "奖品已抽完:历时" + rewardTime + "小时";
                        }
                    }else if(currentType == 2) {  //筹课
                        var time = ckList[i]["r_time"];
                    }
                    var statuss = ckList[i]["status"];
                    var statusText = "";
                    if (statuss == 0) {
                        statusText = "待发布"
                    }
                    if (statuss == 1) {
                        statusText = "未开始"
                    }
                    if (statuss == 2) {
                        statusText = "进行中"
                    }
                    if (statuss == 3) {
                        statusText = "已结束"
                    }
                    if (statuss == 4) {
                        statusText = "提前结束"
                    }

                    var fundTime = ckList[i]["fundTime"];
                    var forceTime = ckList[i]["forceTime"];

                    var timeText = "";
                    if (fundTime != null && fundTime != "") {
                        timeText += "名额已满:历时" + fundTime + "小时";
                    }
                    if (forceTime != null && forceTime != "") {
                        if (timeText != "") {
                            timeText += "</br>";
                        }
                        timeText += "手动结束:历时" + forceTime + "小时";
                    }

                    if (i % 2 == 1) {
                        str += "<tr class='table-tr-odd'>"
                    } else {
                        str += "<tr class='table-tr-even'>"
                    }

                    str += "<td style='display:none'>" + id + "</td>";
                    str += "<td id='name'>" + name + "</td>";
                    str += "<td id='time'>" + time + "</td>";

                    if ((statuss == 2 || statuss == 4) && timeText != "") {
                        str += "<td id='status'>" + statusText + "<div id='menus' onmouseover='pops(this)'" +
                            " onmouseout='pops(this)'><div class='aa' style='display:none'>" + timeText + "</div></div></td>";
                    } else {
                        str += "<td id='status'>" + statusText + "</td>";
                    }

                    str += "<td>";
                    str += "<div class='p176-share'>";
                    str += "<a href='javascript:;' onclick='openWeChat(this,\"" + id + "\")' class='p176-share-icon" +
                        " js-share-drop' ></a>";
                    str += "<div class='p176-share-wrap'>";
                    str += "<div class='p176-share-con clearfix'>";
                    str += "<ul class='p176-share-left'>";
                    str += "<li class='p176-wx'><a href='javascript:;'><i></i>微信扫描二维码</a></li>";
                    str += "<li class='mLeft20 mtop10'><img style='width:150px;height:150px'" +
                        " src='../../images/wxcode.png' alt=''></li>";
                    str += "</ul>";
                    str += "</div>";
                    //str += "<div class='p176-share-con clearfix'>";
                    //str += "<a" +
                    //    " href='http://xytest.staff.xdf.cn/wechat_v1.5/activity/activityInfo.aspx?channel=Wechat&activityId=" + id
                    //str += "' >分享链接</a>";
                    //str += "</div>"
                    str += "<div class='p176-share-bottom'>";
                    str += "<a href='javascript:;' onclick='closeWeChat(this)' style='padding:6px" +
                        " 22px;background:red;color:#fff;margin-left:10px;line-height:32px;' >关闭</a>";
                    str += "</div>";
                    str += "</div>";
                    str += "</div>";
                    str += "</td>";
                    str += "<td>";
                    str += "<div class='p176-table-btnGroup'>";
                    str += "<a href='#' onclick='copyTemplate(\"" + id + "\")' class='p176-btn-copy'" +
                        " data-functionId='10201'><i></i>复制模版</a>";
                    if (statuss == 0 || statuss == 1) {
                        str += "<a href='#' onclick='ckEdit(\"" + id + "\", \"" + areaId + "\")' class='p176-btn-edit'" +
                            " data-functionId='10202'><i></i>编辑</a>";
                    }
                    if (statuss == 0) {
                        var userId = getCookie("loginId");
                        str += "<a href='#' onclick='ckPublish(\"" + id + "\", \"" + userId + "\")'" +
                            " class='p176-btn-release' data-functionId='10203'><i></i>发布</a>";
                        str += "<a href='#' onclick='ckDelete(\"" + id + "\", \"" + userId + "\")'" +
                            " class='p176-btn-release'><i></i>删除</a>";
                    }
                    if (statuss == 1) {
                        str += "<a href='#' onclick='ckRollback(\"" + id + "\")' class='p176-btn-recall" +
                            " js-recallBtn' data-functionId='10203'><i></i>撤回</a>";
                    }
                    if (statuss == 2) {
                        str += "<a href='#' onclick='over(\"" + id + "\")' class='p176-btn-end'" +
                            " data-functionId='10203'><i></i>结束</a>";
                    }
                    str += "</div>";
                    str += "</td>";
                    str += "</tr>";
                }
                $("#ckListTbody").html(str);
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
            initNavigationBar();
        }
    });
}
//关闭二维码
function closeWeChat(_this) {
    weOpenFlag = 0;
    $(_this.parentNode.parentNode).css("display", "none");
}
//打开二维码
function openWeChat(_this, id) {
    if (weOpenFlag == 0) {
        var businessP = {"ckId": id};
        var serverId = "";
        if (currentType == 1) { //筹课抽奖
            serverId = "364f6dfe304b49cb8066af354b1be7d8";
        } else if(currentType == 2) {  //筹课
            serverId = "59e82e08ab9745cca3f952e3b7e8603d";
        }
        var d = constructionParams(rsaEncryptedString(businessP), serverId);
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: false,//同步
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    $(_this).next().css("display", "inline");
                    if (json.url !== "") {
                        $(_this).next().find("img").attr("src", json.url);
                    }
                } else {
                    layer.msg(json.message, {icon: 5});
                }
            }
        });
    }
    weOpenFlag = 1;
}
//列表发布
function ckPublish(id, userId) {
    layer.confirm("确认发布？", {
        btn: ['发布', '取消'] //按钮
    }, function () {
        var businessP = {"ckId": id, "userId": userId};
        var serviceId = '';
        if (currentType == 1) {
            serviceId = '8db31205cb6141219b6d4917729d6b16';
        } else if (currentType == 2) {
            serviceId = 'c42d27bb48be4fcba9832338dab2f2c9';
        }
        var d = constructionParams(rsaEncryptedString(businessP), serviceId);
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: false,//同步
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    layer.msg(json.message, {icon: 6});
                    showList(1,currentCityId, currentAreaId, currentDeptId, currentStatus);
                } else {
                    layer.msg(json.message, {icon: 5});
                }
            }
        });
    }, function () {

    });
}

//列表删除
function ckDelete(id, userId) {
    layer.confirm("确认删除？", {
        btn: ['删除', '取消'] //按钮
    }, function () {
        var businessP = {"ckId": id};
        var serverId = "";
        if (currentType == 1) { //筹课抽奖
            serverId = "3316550e94ac4e12941faef314c1cb43";
        } else if(currentType == 2) {  //筹课
            serverId = "86ea1fc73c5242f68623ee4279a3575e";
        }
        var d = constructionParams(rsaEncryptedString(businessP), serverId);
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: false,//同步
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    layer.msg(json.message, {icon: 6});
                    showList(1, currentCityId, currentAreaId, currentDeptId, currentStatus);
                } else {
                    layer.msg(json.message, {icon: 5});
                }
            }
        });
    }, function () {

    });
}


//复制模板
function copyTemplate(id) {
    var businessP = {"ckId": id, "userId": getCookie("loginId")};
    var serverId = "";
    if (currentType == 1) { //筹课抽奖
        serverId = "6e276708fbab42e4bcde289f462ed290";
    } else if(currentType == 2) {  //筹课
        serverId = "f9fc5147c8144366958ee417581306d0";
    }
    var d = constructionParams(rsaEncryptedString(businessP), serverId);
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                layer.msg("复制成功!", {icon: 6});
                showList(1, currentCityId, currentAreaId, currentDeptId, currentStatus);
            } else {
                layer.msg("复制失败!", {icon: 5});
            }
        }
    });
}

//编辑
function ckEdit(id,areaId) {
    if (areaId == "") {
        layer.msg("请选择一个校区", {icon: 5});
    } else {
        if(currentType == 1){
            window.location.href = 'updateCourse.html?ckId=' + id;
        }else if(currentType == 2){
            window.location.href = 'updateRaiseClassInfo.html?ckId=' + id;
        }else if(currentType == 3){

        }

    }
}

//撤回
function ckRollback(id) {
    layer.confirm('确认撤回？', {
        btn: ['撤回', '取消'] //按钮
    }, function () {
        var businessP = {"ckId": id};
        var serviceId = '';
        if(currentType == 1){
            serviceId = 'e5f2fc4bd12b415bb986377e3600cf45';
        }else if(currentType == 2){
            serviceId = 'dd86ca027f6b451abcde21eb15facd48';
        }
        var d = constructionParams(rsaEncryptedString(businessP), serviceId);
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: false,//同步
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    layer.msg("撤回成功!", {icon: 6});
                    showList(1, currentCityId, currentAreaId, currentDeptId, currentStatus);
                } else {
                    layer.msg("撤回失败!", {icon: 5});
                }
            }
        });
    }, function () {

    });
}

//结束
function over(id) {
    layer.confirm('确认结束？', {
        btn: ['结束', '取消'] //按钮
    }, function () {
        var businessP = {"ckId": id};
        var serviceId = '';
        if (currentType == 1) {
            serviceId = '96b23d55936343938f4b643460eb187c';
        } else if (currentType == 2) {
            serviceId = '13c06f51dbac411b9f4013eda322a77e';
        }
        var d = constructionParams(rsaEncryptedString(businessP), serviceId);
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: false,//同步
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    layer.msg("结束成功!", {icon: 6});
                    showList(1, currentCityId, currentAreaId, currentDeptId, currentStatus);
                } else {
                    layer.msg("结束失败!", {icon: 5});
                }
            }
        });
    }, function () {

    });
}









