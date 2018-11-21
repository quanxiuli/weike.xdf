var totalCounts = 0;
var currentPage = 1;
var pageSize = 15;
var currentCityId = '1';
var currentAreaId = '';
var currentDeptId = '';
var switchFlag = false;
$(function () {
    initTopContent();
    //findList(1, currentCityId, currentAreaId, currentDeptId);
    filterByCityId($('#allSchools'),"");
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
                var cityContent = "<a href='#' id='allSchools' onclick='filterByCityId(this, \"\")' >全部</a>";
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
        findList(1, cityId, currentAreaId, currentDeptId);
    }else{
        currentCityId = '';
        currentAreaId = '';
        currentDeptId = '';
        $(".list1 li").eq(1).hide();
        $(".list1 li").eq(2).hide();
        $("#userTbody").html("");
        $("#publicPage").html("");
        //if($("#searchKey").val() !=''){
        	findList(1, cityId, currentAreaId, currentDeptId);
        //}
    }
}

function filterByAreaId(_this, areaId) {
    $(".xian-wid2 .cur").removeClass("cur");
    $(_this).addClass("cur");
    currentAreaId = areaId;
    findDeptListByCityId(currentCityId);
    firstIn = true;
    findList(1, currentCityId, areaId, currentDeptId);
}

function filterByDeptId(_this, deptId) {
    $(".xian-wid3 .cur").removeClass("cur");
    $(_this).addClass("cur");
    currentDeptId = deptId;
    firstIn = true;
    findList(1, currentCityId, currentAreaId, deptId);
}

function searchByKey() {
    var searchKey = $("#searchKey").val();
    if (searchKey == "") {
        layer.msg("请输入搜索关键字!", {icon: 5});
        return false;
    }
    firstIn = true;
    findList(1, currentCityId, currentAreaId, currentDeptId);
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

var firstIn = true;
function findList(page, cityId, areaId, deptId) {
    if (cityId == null) {
        cityId = "";
    }
    if (areaId == null) {
        areaId = "";
    }
    if (deptId == null) {
        deptId = "";
    }
    var searchKey = $("#searchKey").val();
    if (searchKey == null) {
        searchKey = "";
    }

    var requestJson = {
        cityId: cityId,
        areaId: areaId,
        deptId: deptId,
        searchKey: searchKey,
        currentPage: page,
        pageSize: pageSize
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "c285388af594406a9306138154453f7a");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var userList = json.dataList;
                totalCounts = json.totalCount;
                if (totalCounts > 0) {
                    initPage(totalCounts, page);
                }
                var str = "";
                for (var i = 0; i < userList.length; i++) {
                    var pid = userList[i]["id"];
                    var userId = userList[i]["userId"];
                    var loginId = userList[i]["loginId"];
                    var userName = userList[i]["userName"];
                    var email = userList[i]["email"];
                    var department = userList[i]["department"];
                    var position = userList[i]["position"];
                    var school = userList[i]["school"];
                    var isEnabled = userList[i]["isEnabled"];
                    var schoolCode = userList[i]["schoolCode"];
                    var schoolName = userList[i]["schoolName"];
                    var areaCode = userList[i]["areaCode"];
                    var areaName = userList[i]["areaName"];
                    var deptCode = userList[i]["deptCode"];
                    var deptName = userList[i]["deptName"];

                    if (i % 2 == 1) {
                        str += "<tr class='table-tr-odd'>"
                    } else {
                        str += "<tr class='table-tr-even'>"
                    }
                    str += "<td id='" + userId + "' style='display: none'>" + isEnabled + "</td>"
                    str += "<td style='display: none'>" + pid + "</td>"
                    str += "<td style='display: none'>" + userId + "</td>"
                    str += "<td style='display: none'>" + loginId + "</td>"
                    str += "<td>" + userName + "</td>"
                    str += "<td style='word-wrap:break-word'>" + email + "</td>"
                    str += "<td>" + schoolName + "</td>"
                    str += "<td>" + areaName + "</td>"
                    str += "<td>" + deptName + "</td>"


                    str += "<td>"
                    str += "<div class='p176-table-btnGroup'>";
                    str += "<a href='javascript:;' class='p176-btn-edit' onclick='javascript:updateExhibitionUser(\"" + pid + "\",\"" + userId + "\",\"" + loginId + "\"," +
                        "\"" + userName + "\",\"" + email + "\",\"" + department + "\",\"" + position + "\",\"" + school + "\",\"" + areaCode + "\",\"" + deptCode + "\",\"" + schoolCode + "\");'><i></i>编辑</a>";
                    // str += "<a href='javascript:;' class='p176-btn-delete js-deleteBtn' onclick='javascript:deleteUser(\""+pid+"\",\""+userId+"\",this);'><i></i>删除</a> "
                    if (isEnabled == 1) {
                        str += "<a href='javascript:;' class='p176-btn-able' onclick='enabledUser(this,\"" + userId + "\")'><i></i>禁用</a>";
                    } else {
                        str += "<a href='javascript:;' class='p176-btn-disable' onclick='enabledUser(this,\"" + userId + "\")'><i></i>启用</a>";
                    }

                    str += "</div>";
                    str += "</td>";
                    str += "</tr>";

                }
                $("#userTbody").html(str);
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}


//添加预展示功能
function addExhibitionUser() {
    window.location.href = '/chouke/useradd';
}

function schoolChange() {
    var selectDept = document.getElementById("selectDept").options;
    selectDept.length = 0;
    var nSchoolId = $('#selectSchool').val();
    var businessP = {"nSchoolId": nSchoolId};
    var d = constructionParams(rsaEncryptedString(businessP), "d6ed8c03c2674c72841472009bd35660");
    $("#param").html(JSON.stringify(d));
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var sdeptList = json.dataList;
                for (var i = 0; i < sdeptList.length; i++) {
                    if (sdeptList[i]['sName'] != null) {
                        // str +="<option "+sdeptList[i]['sCode']+">"+sdeptList[i]['sName']+"</option>"
                        selectDept[i + 1] = new Option(sdeptList[i]['sName'], sdeptList[i]['sCode']);
                    }
                }
            } else {
                layer.msg("查询失败!", {icon: 5})
            }
        }
    });

}

//修改展示页面
function updateExhibitionUser(pid, userId, loginId, userName, email, department, position, school, areaCode, deptCode, schoolCode) {
    window.location.href = '/chouke/userupdate?pid=' + pid + "&userId=" + userId + "&loginId=" + loginId + "&email=" + email + "&department=" + department + "&position=" + position + "&school=" + school + "&deptCode=" + deptCode + "&userName=" + encodeURI(userName) + "&areaCode=" + areaCode + "&schoolCode=" + schoolCode;

}
//修改
function updateUser() {
    var id = $("#pid").val();
    var userId = $("#uid").val();
    var loginId = $("#loginid").html();
    var userName = $("#username").val();
    var passWord = $("#password").val();
    var optSchool = $("#selectSchool option:selected");
    var optDept = $("#selectDept option:selected");
    var nSchoolId = optSchool.val();
    var cityName = optSchool.text();
    var sCode = optDept.val();
    var sName = optDept.text();
    if (nSchoolId == "") {
        cityName = "";
    }
    if (sCode == "") {
        sName = "";
    }
    if (passWord == "") {
        layer.msg("登录密码不能为空！", {icon: 5});
        return false;
    }
    if (userName == "") {
        layer.msg("用户名不能为空！", {icon: 5});
        return false;
    }
    if (nSchoolId != "" && sCode == "") {
        layer.msg("选择区域后，请选择部门！", {icon: 5});
        return false;
    }
    var businessP = {
        "id": id,
        "userId": userId,
        "loginId": loginId,
        "userName": userName,
        "passWord": passWord,
        "nSchoolId": nSchoolId,
        "cityName": cityName,
        "sCode": sCode,
        "sName": sName
    };
    var d = constructionParams(rsaEncryptedString(businessP), "e81d393a85df493dbcf4406f460d0d21");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                layer.msg("保存成功!", {icon: 6});
                findList(1, currentCityId, currentAreaId, currentDeptId);
            } else {
                layer.msg("保存失败!", {icon: 5});
            }
        }
    });
}

//禁用
function enabledUser(_this, userId) {
    var isEnable = $("#" + userId).html();
    var text;
    var buttons = [];
    if (isEnable == 1) {
        text = "确定禁用该数据?";
        buttons.push('禁用','取消');
    } else {
        text = "确定启用该数据?";
        buttons.push('启用', '取消')
    }
    layer.confirm(text, {
        btn: buttons //按钮
    }, function () {
        var businessP = {"id": userId, "isEnabled": isEnable};
        var d = constructionParams(rsaEncryptedString(businessP), "e11caaf051ef42bea13d64e96eb63090");
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: false,//同步
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    if (isEnable == 1) {
                        layer.msg("禁用成功!", {icon: 6});
                        $(_this).html("<i></i>启用");
                        $(_this).removeClass();
                        $(_this).addClass('p176-btn-disable');
                        $("#" + userId).html(0)
                    } else {
                        layer.msg("启用成功!", {icon: 6});
                        $(_this).html("<i></i>禁用");
                        $(_this).removeClass();
                        $(_this).addClass('p176-btn-able');
                        $("#" + userId).html(1)
                    }
                    //findList(1, currentCityId, currentAreaId, currentDeptId);
                } else {
                    if (isEnable == 1) {
                        layer.msg("禁用失败!", {icon: 5});
                    } else {
                        layer.msg("启用失败!", {icon: 5});
                    }
                }
            }
        });
    }, function () {

    });
}


//删除
function deleteUser(id, userId) {
    layer.confirm("是否确定删除该数据?", {
        btn: ['确认', '取消'] //按钮
    }, function () {
        var businessP = {"id": id, "userId": userId};
        var d = constructionParams(rsaEncryptedString(businessP), "1e22bfff4f984e8e9271eb333702240d");
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: false,//同步
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    layer.msg("删除成功！", {icon: 6});
                    findList();
                } else {
                    layer.msg(json.message, {icon: 5});
                }
            }
        });
    }, function () {

    });
}


function initPage(totalCounts, currentPage) {
    //console.log("initPage: totalCounts --> " + totalCounts + "\tcurrentPage --> " + currentPage);
    if (totalCounts != null && totalCounts != 0) {
        jQuery.jqPaginator("#publicPage", {
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
                    findList(num, currentCityId, currentAreaId, currentDeptId);
                }
            }
        });
    } else {
        $("#publicPage").html("");
    }
}


