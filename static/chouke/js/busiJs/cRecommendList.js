var weOpenFlag = 0;
var totalCounts = 0;
var currentPage = 1;
var pageSize = 15;
var currentCityId = '';
if(sessionStorage.getItem("currentCityId")){
	currentCityId = sessionStorage.getItem("currentCityId");
}
var currentAreaId = '';
if(sessionStorage.getItem("currentAreaId")){
	currentAreaId = sessionStorage.getItem("currentAreaId");
}
var currentDeptId = '';
if(sessionStorage.getItem("currentDeptId")){
	currentDeptId = sessionStorage.getItem("currentDeptId");
}
var currentAreaIdFlag = true;
console.log(sessionStorage.getItem("currentCityId"));
console.log(sessionStorage.getItem("currentAreaId"));
console.log(sessionStorage.getItem("currentDeptId"));
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
                var cityContent = "<a href='#' id='schoolAll' class='cur' onclick='filterByCityId(this, \"\")' >全部</a>";
                var cur = false;
                //var cityContent = "";
                for (var i = 0; i < schoolList.length; i++) {
                    var schoolId = schoolList[i].sCode;
                    if (schoolId == currentCityId) {
                        cityContent += "<a href='# 'class='cur' onclick='filterByCityId(this, \"" + schoolId + "\")'" +
                            " >" + schoolList[i].sCity + "</a>";
                        var cur = true;
                    } else {
                        cityContent += "<a href='#' onclick='filterByCityId(this, \"" + schoolId + "\")'" +
                            " >" + schoolList[i].sCity + "</a>";
                    }
                }
                $(".xian-wid").html(cityContent);
                if(cur){
                	$('#schoolAll').removeClass('cur');
                }
                initOpenAndShou1();
            } else {
                layer.msg("查询失败!", {icon: 5})
            }
        }
    });
     filterByCityId($('#schoolAll'), '');
    // 默认显示北京校区和部门
    //findAreaListByCityId(currentCityId);
    //findDeptListByCityId(currentCityId);

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
                var areaContent = "<a href='#' id='areaAll' class='cur' onclick='filterByAreaId(this, \"\")' >全部</a>";
				var cur = false;
                for (var i = 0; i < areaList.length; i++) {
                	if(areaList[i].sCode == currentAreaId){
                		areaContent += "<a href='#' id='areaAll' class='cur' onclick='filterByAreaId(this, \"" + areaList[i].sCode + "\")' >" + areaList[i].sName + "</a>";
                		cur = true;
                	}else{
                    	areaContent += "<a href='#' onclick='filterByAreaId(this, \"" + areaList[i].sCode + "\")' >" + areaList[i].sName + "</a>";
                	}
                }
                $(".xian-wid2").html(areaContent);
                 if(cur){
                	$('#areaAll').removeClass('cur');
                }
                if(!currentAreaIdFlag){
                	currentAreaId = "";
                	currentDeptId = "";
                }
                currentAreaIdFlag = false;
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
                console.log(currentDeptId);
                var deptContent = "<a href='#' id='deptAll' class='cur' onclick='filterByDeptId(this, \"\")' >全部</a>";
				var cur = false;
                for (var i = 0; i < deptList.length; i++) {
                	if(deptList[i].sCode == currentDeptId){
                		deptContent += "<a href='#' class='cur' onclick='filterByDeptId(this, \"" + deptList[i].sCode + "\")' >" + deptList[i].sName + "</a>";
                		cur = true;
                	}else{
                    	deptContent += "<a href='#' onclick='filterByDeptId(this, \"" + deptList[i].sCode + "\")' >" + deptList[i].sName + "</a>";
                	}
                }
                $(".xian-wid3").html(deptContent);
                if(cur){
                	$('#deptAll').removeClass('cur');
                }
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

function createCR() {
    if (currentCityId == "" || currentAreaId == "") {//$("#areaIdFinal").val() == ""
        layer.msg("请选择一个校区", {icon: 5});
    } else {
        //此处目前有三种活动：1-筹课抽奖，2-筹课，3-点赞
        //原先的筹课抽奖有发布权限的控制，2和3应该也要有
        //新建筹课，需要获取当前人是否有发布的权限，如果没有，要将打开的页面上的发布按钮隐藏掉
        sessionStorage.setItem("currentCityId", currentCityId);
        sessionStorage.setItem("currentAreaId", currentAreaId);
        sessionStorage.setItem("currentDeptId", currentDeptId);
//        sessionStorage.setItem("currentType", currentType);

        var functionList = JSON.parse(localStorage.functionCheckedList);
        var len = functionList.length;
        var publish = false;
        var funcs = null;
        for (var i = 0; i < len; i++) {
            var fun = functionList[i];
            var functionId = fun.id;
            if(functionId == '1'){
                var children = fun.children;
                for(var j=0;j<children.length;j++){
                    var funcid = children[j].id;
                    if(funcid == '107'){
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
                if (functionId == 10701 && checked) {
                    publish = true;
                    break;
                }
            }
        }
        if(publish){
        	changeCenter('/chouke/classrecommend');
        }else{
        	layer.msg("您没有创建课程推荐的权限", {icon: 5});
        }
    }
}

function changeCkCenter(type) {
    currentType = type;
    //filterByCityId($('#schoolAll'), '');
    //showList(1, currentCityId, currentAreaId, currentDeptId, currentStatus);
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
        areaId: areaId,
        deptId: deptId,
        status:status,
        nameText: nameText,
        currentPage: page,
        pageSize: pageSize
    };
    console.log(requestJson);
    jQuery.ajax({
        type: "POST",
        url: '/chouke/ajax_getclassrecommendlist',
        async: false,//同步
        dataType: 'json',
        data:requestJson,
        success: function (json) {
            if (json.result == true) {
                totalCounts = json.totalCount;
                initPage(totalCounts, page);
                var ckList = json.dataList;
                var str = "";
                for (var i = 0; i < ckList.length; i++) {
                    var id = ckList[i]["id"];
                    var name = ckList[i]["crName"];
                    var timeText = "";
                    var time = ckList[i]["startTime"]+'~'+ckList[i]["endTime"];
                    var switchTimeDown = ckList[i].switchTimeDown;
                	var switchTestStatus = ckList[i].switchTestStatus;
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
                    var forceTime = ckList[i]["forceOffDate"];


                    if (forceTime != null && forceTime != "") {
                        if (timeText != "") {
                            timeText += "</br>";
                        }
                        timeText += "手动结束:<br/>" + forceTime + "<br/> 历时:"+ ckList[i]["hours"]+"小时";
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
                        " src='' alt=''></li>";
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
                     str += "<a href='#' onclick='previewCr(\"" + id + "\")' class='p176-btn-edit'" +
                        " data-functionId='10709'><i></i>预览</a>";
                    str += "<a href='#' onclick='copyTemplate(\"" + id + "\")' class='p176-btn-copy'" +
                        " data-functionId='10702'><i></i>复制模版</a>";
                     str += "<a href='/chouke/recommendcourselist?id="+id+"' class='p176-btn-copy'" +
                        "><i></i>课程列表</a>";
                    if (statuss == 1 || statuss == 2) {
                        str += "<a href='#' onclick='ckEditExcel(\"" + id + "\", \"" + areaId + "\")' class='p176-btn-edit'" +
                            " data-functionId='10703'><i></i>调整班级</a>";
                       if(switchTestStatus == 1){
	                    	str += "<a href='#' onclick='ckEdit(\"" + id + "\", \"" + areaId + "\")' class='p176-btn-edit'" +
	                            " data-functionId='10704'><i></i>调整线下测试</a>";
	                    }
	               
	                    str += "<a href='#' onclick='ckEditTimeDown($(this),\"" + id + "\")' class='p176-btn-edit'" +
	                            " data-functionId='10704'><i></i>";
	                            if(switchTimeDown == 1){
	                            str += "关闭倒计时";
	                            }else{
	                            	str += "开启倒计时";
	                            }
	                    str += "</a>";
                    }
                    
                   if (statuss == 0) {
                   	str += "<a href='#' onclick='ckEdit(\"" + id + "\", \"" + areaId + "\")' class='p176-btn-edit'" +
                            " data-functionId='10704'><i></i>编辑</a>";
                        var userId = getCookie("loginId");
                        str += "<a href='#' onclick='ckPublish(\"" + id + "\", \"" + userId + "\")'" +
                            " class='p176-btn-release' data-functionId='10705'><i></i>发布</a>";
                        str += "<a href='#' onclick='ckDelete(\"" + id + "\", \"" + userId + "\")'" +
                            " class='p176-btn-release' data-functionId='10706'><i></i>删除</a>";
                    }
                    if (statuss == 1) {
                        str += "<a href='#' onclick='ckRollback(\"" + id + "\")' class='p176-btn-recall" +
                            " js-recallBtn' data-functionId='10707'><i></i>撤回</a>";
                    }
                    if (statuss == 2) {
                        str += "<a href='#' onclick='over(\"" + id + "\")' class='p176-btn-end'" +
                            " data-functionId='10708'><i></i>结束</a>";
                    }
                    str += "</div>";
                    str += "</td>";
                    str += "</tr>";
                }
                $("#ckListTbody").html(str);
            } else {
                layer.msg(json.message, {icon: 5});
            }
            initNavigationBar();
        }
    });
}
function previewCr(id){
        var previewURL =  Global.previewCrURL;
        layer.open({
            type: 2,
            title: '预览',
            fix: false,
            shadeClose: true,
            offset: '50px',
            maxmin: true,
            area: ['414px', '736px'],
            content: previewURL + id
        });
}
//关闭二维码
function closeWeChat(_this) {
    weOpenFlag = 0;
    $(_this.parentNode.parentNode).css("display", "none");
}
//打开二维码
function openWeChat(_this, id) {
	var src = $(_this).next().find("img").attr("src");
	if(src == ''){
        var businessP = {"id": id};
        jQuery.ajax({
            type: "POST",
            url: '/chouke/ajax_getcrercode',
            async: false,//同步
            dataType: 'json',
            data: businessP,
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
	}else{
		$(_this).next().css("display", "inline");
	}
}
//列表发布
function ckPublish(id) {
    layer.confirm("确认发布？", {
        btn: ['发布', '取消'] //按钮
    }, function () {
        var businessP = {"id": id};
        jQuery.ajax({
            type: "POST",
            url: '/chouke/ajax_crpublish',
            async: false,//同步
            dataType: 'json',
            data: businessP,
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
        var businessP = {"id": id};
        jQuery.ajax({
            type: "POST",
            url: '/chouke/ajax_crdelete',
            async: false,//同步
            dataType: 'json',
            data: businessP,
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
	 if (currentCityId == " " || currentAreaId == "") {//$("#areaIdFinal").val() == ""
        layer.msg("请选择一个校区", {icon: 5});
        return false;
    }
    var businessP = {"id": id,'schoolId':currentCityId,'areaCode':currentAreaId,'deptCode':currentDeptId};
    jQuery.ajax({
        type: "POST",
        url: '/chouke/ajax_getcrcopy',
        async: false,//同步
        dataType: 'json',
        data: businessP,
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
	 changeCenter('/chouke/updatecr?id=' + id);
}
//修改倒计时
function ckEditTimeDown(obj,id){
	    jQuery.ajax({
        type: "POST",
        url: '/chouke/ajax_setcrtimedown',
        async: false,//同步
        dataType: 'json',
        data: {id,id},
        success: function (json) {
            if (json.result == true) {
               layer.msg(json.message, {icon: 6});
               console.log(json.tip);
               obj.empty().append(json.tip);
            } else {
                layer.msg(json.message, {icon: 5});
            }
        }
    });
}
//撤回
function ckRollback(id) {
    layer.confirm('确认撤回？', {
        btn: ['撤回', '取消'] //按钮
    }, function () {
        var businessP = {"id": id};
        var serviceId = '';
        jQuery.ajax({
            type: "POST",
            url: '/chouke/ajax_rollbackcr',
            async: false,//同步
            dataType: 'json',
            data: businessP,
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
        var businessP = {"id": id};
        jQuery.ajax({
            type: "POST",
            url: '/chouke/ajax_crover',
            async: false,//同步
            dataType: 'json',
            data: businessP,
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
function ckEditExcel(id){
	var content = '<div class="p176-Slabel"><font color="red">*</font>班级列表</div>\
				    <div class="p176-Sfiled clearfix">\
				        <dl style="margin-left:12px;">\
				            <dd>\
				                <form action="/chouke/uploadef" method="post" enctype="multipart/form-data">\
				                    <div class="uploader white">\
				                        <input type="text" class="filename" value="请选择excel文件..."/>\
				                        <input type="file" name="file" class="p176-uplodingBtn" onchange="fileChange($(this));"/>\
				                        <input type="hidden" id="hidden1"/>\
				                    </div>\
				                    <div style="float:right;margin: 10px 10px 0px;">\
				                    	<input type="hidden" name="id" value="'+id+'" />\
				                        <input type="button" name="file" class="p176-uplodingBtn" value="上传" onclick="updateExcelFile($(this));"/>\
				                    </div>\
				                </form>\
				            </dd>\
				        </dl>\
				    </div>';
	layIndex = layer.open({
		type:1,
		title:['请上传课程excel文件','color:black'],
		area: ['300px', '120px'],
		content:content
	});
}
function checkFileType(file){
	 if (!/\.(xls|xlsx|XLS|XLSX)$/.test(file)) {
        return false;
    }
    return true;
}
function updateExcelFile(obj){
	var fileName = obj.parent().prev().find('input[type=file]').val();
	if (fileName != null && fileName != "") {
            if (!checkFileType(fileName)) {
                layer.msg("班级列表需后缀为xls，xlsx,XLS,XLSX的excel文件", {icon: 5});
                return false;
            }
            obj.parent().parent().ajaxSubmit({
            		dataType:'json',
            		success:function (data) {
            			 layer.closeAll();
            			  if(data.code == 1){	
			              	layer.msg(data.message, {icon: 5});
            			  }else{
            			  	layer.alert(data.message, {icon: 6});
            			  }
            			}
            });
        }else {
            layer.msg("请选择文件！", {icon: 5});
        }
}
function fileChange(obj){
	 obj.parents(".uploader").find(".filename").val(obj.val());
}









