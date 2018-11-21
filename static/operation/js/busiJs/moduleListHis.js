var totalCounts = 0;
var currentPage = 1;
var pageSize = 15;
$(function () {
    var request = getRequest();
    var moduleId = request["moduleId"];
    showList(1, moduleId);
});


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
                    showList(num, currentCityId, nameText);
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
//状态 0:禁用，1：启用
function showList(page, moduleId) {
    var requestJson = {
        currentPage: page,
        pageSize: pageSize,
        moduleId: moduleId
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "b3f8a9f136cc440d95d3dc41c37ef909");
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
                var moduleList = json.dataList;
                var str = "";
                if (moduleList.length > 0) {
                    for (var i = 0; i < moduleList.length; i++) {
                        var id = moduleList[i]["moduleId"];
                        var name = moduleList[i]["moduleName"];
                        var versionCode = moduleList[i]["versionCode"];
                        var fitAppVersion = moduleList[i]["fitAppVersion"];
                        var status = moduleList[i]["status"];
                        var statusText = "";
                        if (status == 1) {
                            statusText = "已启用"
                        }
                        if (status == 0) {
                            statusText = "已禁用"
                        }
                        if (i % 2 == 1) {
                            str += "<tr class='table-tr-odd'>"
                        } else {
                            str += "<tr class='table-tr-even'>"
                        }
                        str += "<td>" + id + "</td>";
                        str += "<td>" + name + "</td>";
                        str += "<td>" + versionCode + "</td>";
                        str += "<td>" + fitAppVersion + "</td>";
                        str += "<td>" + statusText + "</td>";
                        str += "</tr>"
                    }
                    $("#moduleListTbody").html(str);
                } else {
                    $("#moduleListTbody").html(str);
                }
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}





