var totalCounts = 0;
var currentPage = 1;
var pageSize = 5;
var currentPosition = 1;
var currentNameParam = '';
var firstIn = true;
var currentCityId = "1";

$(function () {
    var request = getRequest();
    if (request["currentCityId"]) {
        currentCityId = request["currentCityId"];
    }
    initArea();
    if (request["position"]) {
        showTab(request["position"]);
    }
    else {
        initAddBtn();
        findPublishedList(currentPosition);
        findList(currentNameParam, currentPosition, 1);
    }

});

function initAddBtn() {
    $("#addAdvertise").hide();
    var functionIds = getCookie("functionIds");
    var functionId = 3010001 + 100 * currentPosition;
    if (functionIds.length > 0) {
        functionIds = functionIds.split(",");
    }
    var isExist = false;
    for (var i = functionId; i < functionId + 4; i++) {
        if (functionIds.length > 0 && $.inArray(i + "", functionIds) >= 0) {
            isExist = true;
            break;
        }
    }
    if (!isExist) {
        $("#addAdvertise").hide();
    } else {
        $("#addAdvertise").show();
    }
}

function showTab(position) {
    firstIn = true;

    $("#tab_1").attr('class', '');
    $("#tab_2").attr('class', '');
    $("#tab_3").attr('class', '');
    $("#tab_" + position).attr('class', 'xdf_border');

    if (position == 3) {
        $(".slideBox").css("height", "169px");
    } else {
        $(".slideBox").css("height", "230px");
    }

    currentPosition = position;
    initAddBtn();
    findPublishedList(currentPosition);
    findList(currentNameParam, currentPosition, 1);
}

function searchAdv() {
    var parma = $.trim($("#nameParamInput").val());
    if (parma == '搜索广告名称' || parma == null) {
        parma = "";
    }
    firstIn = true;
    findList(parma, currentPosition, 1);
}

function findList(nameParam, position, page) {
    currentNameParam = nameParam;
    var requestJson = {
        nameParam: nameParam,
        position: position,
        cityId: currentCityId,
        userId: getCookie("loginId"),
        currentPage: page,
        pageSize: pageSize
    };

    var d = constructionParams(rsaEncryptedString(requestJson), "b28d51bc71a74c91a7c954a78b83ddbf");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                $("#advertiseTbody").html('');

                var advList = json.dataList;
                totalCounts = json.totalCount;
                if (firstIn) {
                    initPage(totalCounts, page);
                    firstIn = false;
                }
                var str = "";
                for (var i = 0; i < advList.length; i++) {
                    var advId = advList[i]["id"];
                    var name = advList[i]["name"];
                    var order = advList[i]["order"];
                    var publishTimeString = advList[i]["publishTimeString"];
                    var redirectUrl = advList[i]["redirectUrl"];
                    var imageUrl = advList[i]["imageUrl"];
                    var positionName = advList[i]["positionName"];
                    var statusName = advList[i]["statusName"];
                    var publisherName = advList[i]["publisherName"];
                    var creatorId = advList[i]["creatorId"];
                    var createTime = advList[i]["createTime"];
                    var updateTime = advList[i]["updateTime"];

                    if (i % 2 == 1) {
                        str += "<tr class='table-tr-odd'>"
                    } else {
                        str += "<tr class='table-tr-even'>"
                    }
                    str += "<td>" + statusName + "</td>"
                    str += "<td>" + order + "</td>"
                    str += "<td><a title=" + name + " class=\"text-over\">" + name + "</a></td>"
                    str += "<td>" + publishTimeString + "</td>"
                    str += '<td><a href="' + (redirectUrl.substr(0, 4) == 'http' ? redirectUrl : "//" + redirectUrl) + '" target="_blank" class=\"xdf_green\">点击查看</a></td>'


                    str += "<td>" + publisherName + "</td>";


                    str += "<td>"
                    str += "<div class=\"p176-table-btnGroup\"><a href='javascript:;' class='p176-btn-edit' onclick='javascript:updateExhibitionAdv(\"" + advId + "\")'><i></i>编辑</a>"
                    //str += "&nbsp;&nbsp;<a href='javascript:;' class='p176-btn-edit' onclick='javascript:putOnline(\""+advId+"\")'><i></i>上线</a></div>"
                    str += "</td>"
                    str += "</tr>"

                    $("#advertiseTbody").html(str);
                }
            } else {
                layer.msg("查询失败!", {icon: 5})
            }
        }
    });
}

function up(advId) {
    var requestJson = {
        id: advId,
        creatorId: getCookie('loginId')
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "c3023adae0ab4fc79c4c1543a03407d2");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                layer.msg("操作成功!", {icon: 6});
                findPublishedList(currentPosition);
            } else {
                layer.msg("操作失败!", {icon: 5});
            }
        }
    });
}

function down(advId) {
    var requestJson = {
        id: advId,
        creatorId: getCookie('loginId')
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "a0fbae72aeb2454bbd348b92df1b2e42");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                layer.msg("操作成功!", {icon: 6});
                findPublishedList(currentPosition);
            } else {
                layer.msg("操作失败!", {icon: 5});
            }
        }
    });
}

function findPublishedList(position) {
    var requestJson = {
        position: position,
        cityId: currentCityId
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "01b1affaa6204da88b45cb7c92a02265");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                $("#publishedTbody").html('');
                $("#scrollingImgsUL").html('');
                $("#scrollingOL").html('');

                var advList = json.data;
                var str = "";
                var scrollingImgs = "";
                var scrolling = "";
                var j = 0;
                var functionIds = getCookie("functionIds");
                if (functionIds.length > 0) {
                    functionIds = functionIds.split(",");
                }
                //var indexFunctionId = "3010" + position + "06";
                //var statusFunctionId = "3010" + position + "05";
                var orderId = 3010001 + position * 100;
                var indexCount = advList.length;
                //for(var i = orderId;i  < orderId + 4; i ++ ){
                //    if(functionIds.length > 0 && $.inArray(i + "", functionIds) > 0){
                //        indexCount += 1;
                //    }
                //}
                if (advList.length > 0) {
                    for (var i = 0; i < advList.length; i++) {
                        var advId = advList[i]["id"];
                        var name = advList[i]["name"];
                        var order = advList[i]["order"];
                        var publishTimeString = advList[i]["publishTimeString"];
                        var redirectUrl = advList[i]["redirectUrl"];
                        var imageUrl = advList[i]["imageUrl"];
                        var positionName = advList[i]["positionName"];
                        var statusName = advList[i]["statusName"];
                        var publisherName = advList[i]["publisherName"];
                        var creatorId = advList[i]["creatorId"];
                        var createTime = advList[i]["createTime"];
                        var updateTime = advList[i]["updateTime"];

                        var viewFunctionId = "3010" + position + "0" + order;

                        if (functionIds.length > 0 && $.inArray(viewFunctionId, functionIds) >= 0) {
                            if (i == 0) {
                                scrollingImgs += "<li class=\"active\" style=\"left:0;z-index:11;\"><img src=\"" + imageUrl + "\" data-functionId='" + viewFunctionId + "'/></li>";
                            } else {
                                scrollingImgs += "<li><img src=\"" + imageUrl + "\" data-functionId='" + viewFunctionId + "'/></li>";
                            }
                            scrolling += "<li></li>";
                        }


                        if (i % 2 == 1) {
                            str += "<tr class='table-tr-odd' data-functionId='" + viewFunctionId + "'>";
                        } else {
                            str += "<tr class='table-tr-even' data-functionId='" + viewFunctionId + "'>";
                        }
                        //str += "<td class=\"xdf_first\">";

                        //if (functionIds.length > 0 && $.inArray(viewFunctionId, functionIds) > 0 && $.inArray(indexFunctionId, functionIds) > 0) {
                        //
                        //    if (j != 0 && indexCount > 1) {
                        //        str += "<span><a href=\"javascript:up('" + advId + "')\"><img" +
                        //            " src=\"../../images/xdf_up.png\" class=\"up\" /></a></span>";
                        //    }
                        //    if (j != indexCount - 1) {
                        //        str += "<span><a href=\"javascript:down('" + advId + "')\"><img" +
                        //            " src=\"../../images/xdf_down.png\" class=\"down\" /></a></span>";
                        //    }
                        //    j += 1;
                        //}

                        //str += "</td>";
                        str += "<td>" + order + "</td>";
                        str += "<td><a title=" + name + " class=\"text-over\">" + name + "</a></td>";
                        str += "<td>" + publishTimeString + "</td>";
                        str += '<td><a href="' + (redirectUrl.substr(0, 4) == 'http' ? redirectUrl : "//" + redirectUrl) + '" target="_blank" class=\"xdf_green\">点击查看</a></td>'
                        str += "<td>" + publisherName + "</td>";
                        str += "<td>";
                        str += "<div class=\"p176-table-btnGroup\">";
                        str += "<a href=\"javascript:;\" class=\"p176-btn-downline\" onclick='javascript:putOffline(\"" + advId + "\")'><i></i>下线</a>";
                        str += "</div>";
                        str += "</td>";
                        str += "</tr>";
                    }

                    $("#scrollingImgsUL").html(scrollingImgs);
                    $("#scrollingOL").html(scrolling);
                    $("#slideBox").show();
                    $("#publishedTbody").html(str);
                } else {
                    $("#slideBox").hide();
                }
                initNavigationBar();
                jQuery(".slideBox").slide({mainCell: ".bd ul", effect: "fold", autoPlay: true});
            } else {
                layer.msg("查询失败!", {icon: 5})
            }
        }
    });
}

//添加预展示功能
function addExhibitionAdv() {
    window.location.href = 'advertiseEdit.html?position=' + currentPosition + '&flag=new' + '&currentCityId=' + currentCityId;
}

//修改展示页面
function updateExhibitionAdv(advId) {
    window.location.href = 'advertiseEdit.html?id=' + advId + '&position=' + currentPosition + '&flag=edit'+'&currentCityId='+ currentCityId;

}

function putOffline(advId) {
    var buttons = ['下线', '取消'];
    layer.confirm("确认下线？", {
        btn: buttons //按钮
    }, function () {
        var requestJson = {
            id: advId
        };
        var d = constructionParams(rsaEncryptedString(requestJson), "5b39fa81ab344c10adba6a48f67a69eb");
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: false,//同步
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    layer.msg("下线操作成功!", {icon: 6});
                    showTab(currentPosition);
                } else {
                    layer.msg("操作失败!", {icon: 5})
                }
            }
        });
    }, function () {

    });
}


function putOnline(advId) {
    var requestJson = {
        id: advId,
        creatorId: getCookie('loginId')
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "1b7402108b734b168022b64275494e0e");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                layer.msg("上线操作成功!", {icon: 6});
                showTab(currentPosition);
            } else {
                layer.msg("操作失败!", {icon: 5})
            }
        }
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
                    findList(currentNameParam, currentPosition, num);
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


function initArea() {
    var loginId = getCookie("loginId");
    var cityParam = {
        loginId: loginId
    };
    var cityEncrypt = constructionParams(rsaEncryptedString(cityParam), "3577775ef8e849d9ab63dad2202584e0");

    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(cityEncrypt),
        success: function (json) {
            if (json.result == true) {
                var schoolList = json.dataList;
                var cityContent = "";
                if(marketJs.loginUserIsAdmin(loginId)){
                    cityContent = "<a href='#' onclick='filterByCityId(this, \"" + -1 + "\")' >全国</a>";
                }
                for (var i = 0; i < schoolList.length; i++) {
                    var schoolId = schoolList[i].sCode;
                    if (schoolId == "1" || schoolList.length == 1) {
                        if(currentCityId == "1"){
                            currentCityId = schoolId;
                            cityContent += "<a href='#' class='cur' onclick='filterByCityId(this, \"" + schoolId + "\")'" +
                                " >" + schoolList[i].sCity + "</a>";
                        }else{
                            cityContent += "<a href='#' onclick='filterByCityId(this, \"" + schoolId + "\")'" +
                                " >" + schoolList[i].sCity + "</a>";
                        }
                    } else {
                        if(schoolId == currentCityId){
                            cityContent += "<a href='#' class='cur' onclick='filterByCityId(this, \"" + schoolId + "\")'" +
                                " >" + schoolList[i].sCity + "</a>";
                        }else{
                            cityContent += "<a href='#' onclick='filterByCityId(this, \"" + schoolId + "\")'" +
                                " >" + schoolList[i].sCity + "</a>";
                        }
                    }
                }
                $(".xian-wid").html(cityContent);
                initOpenAndShou();
            } else {
                layer.msg("查询失败!", {icon: 5})
            }
        }
    });

}

function initOpenAndShou() {
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

    $(".open").unbind('click').click(function () {
        $(this).parent().parent().css("height", "auto");
        $(this).hide();
        $(this).next().show();
        //if(switchFlag){
        //    $("#m1").prev().css("height", $('.hot-classes .list1 li').eq(0).height());
        //}
    });
    $(".shou").unbind('click').click(function () {
        $(this).parent().parent().css("height", "30px");
        $(this).hide();
        $(this).prev().show();
        //if(switchFlag){
        //    $("#m1").prev().css("height", $('.hot-classes .list1 li').eq(0).height());
        //}
    });

}

function filterByCityId(_this, cityId) {
    $(".xian-wid .cur").removeClass("cur");
    $(_this).addClass("cur");
    currentCityId = cityId;
    firstIn = true;
    findPublishedList(currentPosition);
    findList(currentNameParam, currentPosition, 1);
}
