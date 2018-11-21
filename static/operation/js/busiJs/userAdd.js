$(function () {
    var data = [];
    var d = constructionParams("", "886b657474524a639ea587fc52e48bcf");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var sschoolList = json.dataList;
                for (var i = 0; i < sschoolList.length; i++) {
                    if (sschoolList[i]['sName'] != null && sschoolList[i]['sName'] != "NULL") {
                        var scAdept = {
                            "id": sschoolList[i]['sCode'],
                            "text": sschoolList[i]['sName'],
                            "attributes": 1
                        }
                        data.push(scAdept);
                    }
                }
            } else {
                layer.msg("查询失败!", {icon: 5})
            }
        }
    });

    var param = constructionParams("", "0950b4d52fff4c04a22a38ac4ec4edfc");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://10.200.80.196:8088/market/function/getAllFunction.do",
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(param),
        success: function (result) {
            if (result.result) {
                $("#functionTree").tree({
                    data: result.dataList,
                    checkbox: true,
                    cascadeCheck: true
                });
            }

        }
    });

    var categoryParam = constructionParams("", "5773169bc6324b9fa1fcbf173a775ec8");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://10.200.80.196:8080/market/category/getCategoryByUserId.do",
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(categoryParam),
        success: function (result) {
            if (result.result) {
                //$("#categoryTree").tree({
                //    data: result.dataList,
                //    checkbox: true,
                //    cascadeCheck: true
                //});
                var categoryList = result.dataList;
                var str = "";
                for(var i = 0; i < categoryList.length; i ++){
                    var category = categoryList[i];
                    str += '<option value="' + category.id + '">' + category.name + '</option>';
                }
                $("#category").append(str)
            }

        }
    });

    $("#treeConstant").tree({
        data: data,
        checkbox: true,
        cascadeCheck: false,
        onClick: function (node) {//单击事件
            getAreaList(node);
        },
        onCheck: function (node, checked) {
            if (checked) {
                var parentNode = $("#treeConstant").tree('getParent', node.target);
                if (parentNode != null) {
                    $("#treeConstant").tree('check', parentNode.target);
                }
            } else {
                var childNode = $("#treeConstant").tree('getChildren', node.target);
                if (childNode.length > 0) {
                    for (var i = 0; i < childNode.length; i++) {
                        $("#treeConstant").tree('uncheck', childNode[i].target);
                    }
                }
            }
        }
    });


});


var isRepeatLoginId = false;


var userInfo_clearInput = function () {
    $("#userName").val("");
    $("#email").val("");
    $("#department").val("");
    $("#position").val("");
    $("#school").val("");
}

function getUserInfo() {
    var inputLoginId = $("#inputLoginId").val();
    if(inputLoginId == ''){
        userInfo_clearInput();
        return;
    }
    var businessP = {"keyword": $("#inputLoginId").val()};
    var d = constructionParams(rsaEncryptedString(businessP), "18b868e977054ebcbcb7accc001b2262");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var data = $.parseJSON(json.data);
                $("#userName").val(data.Name);
                $("#email").val(data.AccountID + "@xdf.cn");
                $("#department").val(data.Department);
                $("#position").val(data.Title);
                $("#school").val(data.Company);
                var loginId = $("#inputLoginId").val();
                //校验是否当前登录账号
                verifyRepeat(loginId)
            } else {
                userInfo_clearInput();
                layer.msg("未查询到账户，请重新输入", {icon: 5});
            }
        }
    });
}

function getMoreUserInfo(){
    $("#inputLoginId").autocomplete({
        source: function (request, response) {
            var businessP = {"keyword": $("#inputLoginId").val(), "pageSize": "20", "currentPage": "1"};
            var d = constructionParams(rsaEncryptedString(businessP), "18b868e977054ebcbcb7accc001b2262");
            jQuery.ajax({
                type: "POST",
                url: Global.actionURL,
                async: false,//同步
                dataType: 'json',
                data: JSON.stringify(d),
                success: function (json) {
                    if (json.result == true) {
                        var data = $.parseJSON(json.data);
                        if (data.length <= 0) {
                            userInfo_clearInput();
                            layer.msg("未查询到账户，请重新输入", {icon: 5});
                        } else {
                            response($.map(data, function (item) {
                                return {
                                    label: item.emailAddr,
                                    value: item.emailAddr,
                                    username: item.name,
                                    email: item.emailAddr + "@xdf.cn",
                                    department: item.deptName,
                                    position: item.PositionName,
                                    school: item.companyName
                                }
                            }));
                        }
                    } else {
                        userInfo_clearInput();
                        layer.msg("查询失败!", {icon: 5})
                    }
                }
            });
        },
        select: function (event, ui) {
            $("#userName").val(ui.item.username);
            $("#email").val(ui.item.email);
            $("#department").val(ui.item.department);
            $("#position").val(ui.item.position);
            $("#school").val(ui.item.school);
            var loginId = $("#inputLoginId").val();
            verifyRepeat(loginId);
        }
    });
}



function verifyRepeat(loginId) {
    var businessP = {
        "loginId": loginId
    };
    var d = constructionParams(rsaEncryptedString(businessP), "c28fc69f67104ce7b3c1ca95b4b29ac3");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true && json.data != null) {
                isRepeatLoginId = true;
                layer.msg("用户" + loginId + "已经存在，请确认！", {icon: 5});
            } else {
                // TODO 暂时不操作
            }
        }
    });
}

//重新加载

function reload() {
    location.reload();
}
var nSchoolId;
function getAreaList(node) {
    if (node.attributes == 1) {
        if (!node.children) {
            nSchoolId = node.id
            var businessP = {"nSchoolId": node.id};
            var data = [];
            var d = constructionParams(rsaEncryptedString(businessP), "41d0a5cd3cb74d9eaf14abfe2e4f139d");
            jQuery.ajax({
                type: "POST",
                url: Global.actionURL,
                async: false,//同步
                dataType: 'json',
                data: JSON.stringify(d),
                success: function (json) {
                    if (json.result == true) {
                        var bsAreaList = json.dataList;
                        for (var i = 0; i < bsAreaList.length; i++) {
                            if (bsAreaList[i]['sName'] != null && bsAreaList[i]['sName'] != "NULL") {
                                var scAdept = {
                                    "id": bsAreaList[i]['sCode'],
                                    "text": bsAreaList[i]['sName'],
                                    "attributes": 2
                                }
                                data.push(scAdept);
                            }
                        }
                        var dept = [];
                        var param = constructionParams(rsaEncryptedString(businessP), "d6ed8c03c2674c72841472009bd35660");
                        jQuery.ajax({
                            type: "POST",
                            url: Global.actionURL,
                            async: false,//同步
                            dataType: 'json',
                            data: JSON.stringify(param),
                            success: function (json) {
                                if (json.result == true) {
                                    var sDeptList = json.dataList;
                                    for (var i = 0; i < sDeptList.length; i++) {
                                        if (sDeptList[i]['sName'] != null && sDeptList[i]['sName'] != "NULL") {
                                            var scDept = {
                                                "id": sDeptList[i]['sCode'],
                                                "text": sDeptList[i]['sName'],
                                                "attributes": 3
                                            }
                                            dept.push(scDept);
                                        }
                                    }
                                } else {
                                    layer.msg("查询失败!", {icon: 5})
                                }
                            }
                        });
                        $("#treeConstant2").tree({
                            data: dept,
                            checkbox: true,
                            cascadeCheck: false,
                            onClick: function (node) {

                            },
                            onCheck: function (node) {
                                var pNode = $("#treeConstant2").tree('getParent', node.target);
                                if (pNode != null) {
                                    $("#treeConstant2").tree('check', pNode.target);
                                }
                            }
                        });
                    } else {
                        layer.msg("查询失败!", {icon: 5})
                    }
                }
            });
            $('#treeConstant').tree('append', {
                parent: node.target,
                data: data
            });
        }
    }

}


//保存数据
function saveUser() {
    layer.load(2,{
        shade: [0.1,'#fff'] //0.1透明度的白色背景
    });//遮罩加载
    var loginId = $("#inputLoginId").val();
    if (isRepeatLoginId) {
        layer.msg("用户" + loginId + "已经存在，请确认！", {icon: 5});
        return;
    }
    var arrSchoolId = [];
    var arrSchoolName = [];
    var arrAreaCode = [];
    var arrAreaName = [];
    var arrDeptCode = [];
    var arrDeptName = [];
    var checkeds = $('#treeConstant').tree('getChecked', 'checked');
    var deptCheckeds = [];
    if ($("#treeConstant2 li").length > 0) {
        deptCheckeds = $("#treeConstant2").tree('getChecked', 'checked');
    }
    var functionCheckedList = $("#functionTree").tree('getChecked', ['checked', 'indeterminate']);
    var functionArray = [];

    for (var i = 0; i < functionCheckedList.length; i++) {
        var functionId = functionCheckedList[i].id;
        functionArray.push(functionId);
    }

    for (var i = 0; i < checkeds.length; i++) {
        var id = checkeds[i].id;
        var name = checkeds[i].text;
        var type = checkeds[i].attributes;
        if (type == 1) {
            arrSchoolId.push(id);
            arrSchoolName.push(name);
        }
        if (type == 2) {
            arrAreaCode.push(id);
            arrAreaName.push(name);
        }
    }

    for (var i = 0; i < deptCheckeds.length; i++) {
        var id = deptCheckeds[i].id;
        var name = deptCheckeds[i].text;

        arrDeptCode.push(id);
        arrDeptName.push(name);
    }

    if($("#category").val() == "0"){
        layer.msg("请选择分类", {icon: 5});
        return false;
    }

    if (arrSchoolId.length <= 0) {
        layer.msg("请选择学校", {icon: 5});
        return false;
    }

    if (arrSchoolId.length > 1) {
        layer.msg("每个用户只能选择一个地区", {icon: 5});
        return false;
    }

    if (arrAreaCode.length < arrSchoolId.length) {
        layer.msg("请选择" + arrSchoolName[arrAreaCode.length] + "的校区", {icon: 5});
        return false;
    }

    if (arrDeptCode.length <= 0) {
        layer.msg("请选择部门", {icon: 5});
        return false;
    }

    if (arrDeptCode.length > 1) {
        layer.msg("每个用户只能选择一个部门", {icon: 5});
        return false;
    }

    if (functionArray.length <= 0) {
        layer.msg("请选择功能", {icon: 5});
        return false;
    }

    var arrSchoolIds = arrSchoolId.join(',');
    var arrSchoolNames = arrSchoolName.join(',');
    var arrAreaCodes = arrAreaCode.join(',');
    var arrAreaNames = arrAreaName.join(',');
    var arrDeptCodes = arrDeptCode.join(',');
    var arrDeptNames = arrDeptName.join(',');

    var userId = getCookie("loginId");

    var userName = $("#userName").val();
    var email = $("#email").val();
    var department = $("#department").val();
    var position = $("#position").val();
    var school = $("#school").val();
    var nSchoolId = arrSchoolIds;
    var sSchoolName = arrSchoolNames;
    var nAreaCode = arrAreaCodes;
    var sAreaName = arrAreaNames;
    var nDeptCode = arrDeptCodes;
    var sDeptName = arrDeptNames;
    if (loginId == "") {
        layer.msg("登录账号不能为空！", {icon: 5});
        return false;
    }

    if (userName == "") {
        layer.msg("用户名不能为空！", {icon: 5});
        return false;
    }

    var businessP = {
        "userId": userId,
        "loginId": loginId,
        "userName": userName,
        "email": email,
        "department": department,
        "position": position,
        "school": school,
        "nSchoolId": nSchoolId,
        "sSchoolName": sSchoolName,
        "nAreaCode": nAreaCode,
        "sAreaName": sAreaName,
        "nDeptCode": nDeptCode,
        "sDeptName": sDeptName
    };
    var d = constructionParams(rsaEncryptedString(businessP), "3bb45d62a96e494c8033c3fc9d79409b");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                //layer.msg("保存成功!", {icon: 6});
                //window.location.href = 'userList.html';
                addCategoryUser(loginId, functionArray);
            } else {
                layer.msg("保存失败!", {icon: 5});
            }
            layer.closeAll('loading');
        }
    });


}

function addCategoryUser(loginId, functionArray){
    var param = {
        userId : loginId,
        categoryId : $("#category").val()
    }
    var p = constructionParams(rsaEncryptedString(param), "ea5f45cf47f74a11ba3000351471f990");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://10.200.80.196:8088/market/function/addFunctionUser.do",
        async: true,
        dataType: 'json',
        data: JSON.stringify(p),
        success: function (json) {
            if (json.result == true) {
                addFunctionUser(loginId, functionArray);
            } else {
                layer.msg("保存失败!", {icon: 5});
            }
        }
    });
}

function addFunctionUser(loginId, functionArray) {

    var param = {
        "userId": loginId,
        "functionIds": functionArray.join("-")
    };
    var p = constructionParams(rsaEncryptedString(param), "bf02b7af9c2a4c87a89921f86b61744b");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://10.200.80.196:8088/market/function/addFunctionUser.do",
        async: true,
        dataType: 'json',
        data: JSON.stringify(p),
        success: function (json) {
            if (json.result == true) {
                layer.msg("保存成功!", {icon: 6});
                window.location.href = 'userList.html';
            } else {
                layer.msg("保存失败!", {icon: 5});
            }
        }
    });
}