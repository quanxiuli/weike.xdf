var totalCounts = 0;
var currentPage = 1;
var pageSize = 15;
var nameText = '';
$(function () {
    showList(1, nameText);
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

//状态 0:禁用，1：启用
function showList(page, nameText) {
    var requestJson = {
        currentPage: page,
        pageSize: pageSize,
        moduleName: nameText
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "765bf44748f34f328349d70526cdf849");
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
                        var fitAppVersion = moduleList[i]["fitAppVersion"]?moduleList[i]["fitAppVersion"]:"";
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
                        str += "<td>";
                        str += "<div class='p176-table-btnGroup'>";
                        if (status == 1) {
                            str += "<input type='radio' checked readonly /><a href='#' onclick='changeStatus(\"" + id + "\",0)'" +
                                " class='p176-btn-release'>禁用</a>";
                        }
                        if (status == 0) {
                            str += "<input type='radio' readonly /><a href='#' onclick='changeStatus(\"" + id + "\",1)' class='p176-btn-release'>启用</a>";
                        }
                        str += "<a href='#' onclick='moduleEdit(\"" + id + "\")' class='p176-btn-edit'><i></i>编辑</a>";
                        str += "<a href='#' onclick='queryModulesHis(\"" + id + "\")'" +
                            " class='p176-btn-data'><i></i>查看历史版本</a>";
                        str += "</div>"
                        str += "</td>"
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

//搜索
function search() {
    nameText = $.trim($('#nameText').val());
    if (nameText == '搜索模块名称' || nameText == null) {
        nameText = '';
    }
    showList(1, nameText);
}


function addModule() {
    window.location.href = 'moduleEdit.html?flag=new';
}
function queryModulesHis(id){
    window.location.href = 'moduleHisList.html?moduleId=' + id;
}
//编辑
function moduleEdit(id) {
    window.location.href = 'moduleEdit.html?id=' + id+"&flag=edit";
}

//启用禁用
function changeStatus(id,status) {
    var confirm='';
    var succsessMsg='';
    var failMsg ='';
    if(status==0){
        confirm='确定禁用该模块吗?';
        succsessMsg='禁用成功!';
        failMsg='禁用失败!';
    } else {
        confirm='确定启用该模块吗?';
        succsessMsg='启用成功!';
        failMsg='启用失败!';
    }
    layer.confirm(confirm, {
        btn: ['确认', '取消'] //按钮
    }, function () {
        var businessP = {"moduleId": id,"status":status,"creatorId":getCookie("loginId")};
        var d = constructionParams(rsaEncryptedString(businessP), "5e2a0f5cc1f644f88253708007680b96");
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: false,//同步
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    layer.msg(succsessMsg, {icon: 6});
                    showList(parseInt($(".pCurrent").html()), nameText);
                } else {
                    layer.msg(failMsg, {icon: 5});
                }
            }
        });
    }, function () {

    });
}



