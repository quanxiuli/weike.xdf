var deptCode;
var areaCode;
var pid;
var userId;

$(function () {
    var request = getRequest();
    pid = request["pid"];
    userId = request["userId"];
    var schoolCode = request["schoolCode"];
    deptCode = request["deptCode"];
    areaCode = request["areaCode"];
    var userName = request["userName"];
    var loginId = request["loginId"];
    var email = request["email"];
    var department = request["department"];
    var position = request["position"];
    var school = request["school"];
    $('#inputLoginId').val(loginId);
    $('#userName').val(decodeURI(userName));
    $('#email').val(email);
    $('#department').val(decodeURI(department));
    $('#position').val(decodeURI(position));
    $('#school').val(decodeURI(school));
    var data = [];
    var categoryParam = {
        loginId : loginId
    }
    var param = constructionParams(rsaEncryptedString(categoryParam), "5773169bc6324b9fa1fcbf173a775ec8");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url : "http://10.200.80.196:8080/market/category/getCategoryByUserId.do",
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(param),
        success: function (json) {
            if (json.result == true) {
                var categoryList = json.dataList;
                var str = "";
                var categoryId = "";
                for(var i = 0; i < categoryList.length; i ++){
                    var category = categoryList[i];
                    var checked = category.checked;
                    if(checked){
                        categoryId = category.id;
                    }
                    str += '<option value="' + category.id + '">' + category.name + '</option>';
                }
                $("#category").append(str);
                if(categoryId.length > 0){
                    $("#category").val(categoryId);
                }
            } else {
                layer.msg("查询失败!", {icon: 5})
            }
        }
    });

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
                        if (schoolCode == sschoolList[i]['sCode']) {
                            var scAdept = {
                                "id": sschoolList[i]['sCode'],
                                "text": sschoolList[i]['sName'],
                                "attributes": 1,
                                "checked": true
                            }
                        } else {
                            var scAdept = {
                                "id": sschoolList[i]['sCode'],
                                "text": sschoolList[i]['sName'],
                                "attributes": 1
                            }
                        }
                        data.push(scAdept);
                    }
                }
            } else {
                layer.msg("查询失败!", {icon: 5})
            }
        }
    });

    var param = {
        "userId": loginId
    };
    var p = constructionParams(rsaEncryptedString(param), "0950b4d52fff4c04a22a38ac4ec4edfc");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://10.200.80.196:8088/market/function/getAllFunction.do",
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(p),
        success: function (result) {
            if (result.result) {
                var data = result.dataList;
                reChecked(data);
                $("#functionTree").tree({
                    data: data,
                    checkbox: true,
                    cascadeCheck: true
                });

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

    var checkedList = $('#treeConstant').tree('getChecked', 'checked');
    for (var i = 0; i < checkedList.length; i++) {
        var type = checkedList[i].attributes;
        if (type == 1) {
            getAreaList(checkedList[i]);
        }
    }

});


//重新加载

function reload() {

    var node = $('#basetree').tree('getSelected');

    if (node) {

        $('#basetree').tree('reload', node.target);

    } else {

        $('#basetree').tree('reload');

    }

}
var nSchoolId;
function getAreaList(node) {
    if (node.attributes == 1) {
        if (!node.children) {
            nSchoolId = node.id
            var businessP = {"nSchoolId": node.id};
            var data = [];
            var d = constructionParams(rsaEncryptedString(businessP), "41d0a5cd3cb74d9eaf14abfe2e4f139d");
            $("#param").html(JSON.stringify(d));
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
                                if (areaCode.indexOf(bsAreaList[i]['sCode']) > -1) {
                                    var scAdept = {
                                        "id": bsAreaList[i]['sCode'],
                                        "text": bsAreaList[i]['sName'],
                                        "attributes": 2,
                                        "checked": true
                                    }
                                }
                                else {
                                    var scAdept = {
                                        "id": bsAreaList[i]['sCode'],
                                        "text": bsAreaList[i]['sName'],
                                        "attributes": 2
                                    }
                                }
                                data.push(scAdept);
                            }
                        }
                        var deptData = [];
                        var param = constructionParams(rsaEncryptedString(businessP), "d6ed8c03c2674c72841472009bd35660");
                        jQuery.ajax({
                            type: "POST",
                            url: Global.actionURL,
                            async: false,//同步
                            dataType: 'json',
                            data: JSON.stringify(param),
                            success: function (json) {
                                if (json.result == true) {
                                    var sdeptList = json.dataList;
                                    for (var i = 0; i < sdeptList.length; i++) {
                                        if (sdeptList[i]['sName'] != null && sdeptList[i]['sName'] != "NULL") {
                                            if (deptCode == sdeptList[i]['sCode']) {
                                                var scDept = {
                                                    "id": sdeptList[i]['sCode'],
                                                    "text": sdeptList[i]['sName'],
                                                    "attributes": 3,
                                                    "checked": true
                                                }
                                            } else {
                                                var scDept = {
                                                    "id": sdeptList[i]['sCode'],
                                                    "text": sdeptList[i]['sName'],
                                                    "attributes": 3
                                                }
                                            }
                                            deptData.push(scDept);
                                        }
                                    }
                                } else {
                                    layer.msg("查询失败!", {icon: 5})
                                }
                            }
                        });
                        $("#treeConstant2").tree({
                            data: deptData,
                            checkbox: true,
                            cascadeCheck: false,
                            onClick: function (node) {//单击事件

                            },
                            onCheck: function (node) {
                                var parentNode2 = $("#treeConstant2").tree('getParent', node.target);
                                if (parentNode2 != null) {
                                    $("#treeConstant2").tree('check', parentNode2.target);
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
//重新加载

function reload() {
    location.reload();
}

function reChecked(data) {
    if (data == null || data.length == 0) {
        return;
    }
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var checked = item.checked;
        var children = item.children;
        if (checked && children != null && children.length > 0) {
            item.checked = false;
            reChecked(children);
        }
    }
}

//保存数据
function updateUser() {
    var arrScoolId = [];
    var arrScoolName = [];
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
            arrScoolId.push(id);
            arrScoolName.push(name);
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

    if (arrScoolId.length <= 0) {
        layer.msg("请选择学校", {icon: 5});
        return false;
    }

    if (arrScoolId.length > 1) {
        layer.msg("每个用户只能选择一个地区", {icon: 5});
        return false;
    }

    if (arrAreaCode.length < arrScoolId.length) {
        layer.msg("请选择" + arrScoolName[arrAreaCode.length] + "的校区", {icon: 5});
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

    var arrScoolIds = arrScoolId.join(',');
    var arrScoolNames = arrScoolName.join(',');
    var arrAreaCodes = arrAreaCode.join(',');
    var arrAreaNames = arrAreaName.join(',');
    var arrDeptCodes = arrDeptCode.join(',');
    var arrDeptNames = arrDeptName.join(',');
    var loginId = $("#inputLoginId").val();
    var userName = $("#userName").val();
    var email = $("#email").val();
    var department = $("#department").val();
    var position = $("#position").val();
    var school = $("#school").val();
    var nSchoolId = arrScoolIds;
    var sShoolName = arrScoolNames;
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
        "pid": pid,
        "userId": userId,
        "loginId": loginId,
        "currentLonginId": getCookie("loginId"),
        "userName": userName,
        "nSchoolId": nSchoolId,
        "sShoolName": sShoolName,
        "nAreaCode": nAreaCode,
        "sAreaName": sAreaName,
        "nDeptCode": nDeptCode,
        "sDeptName": sDeptName,
        "email": email,
        "department": department,
        "position": position,
        "school": school
    };

    var d = constructionParams(rsaEncryptedString(businessP), "e81d393a85df493dbcf4406f460d0d21");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                //layer.msg("修改成功!", {icon: 6});
                //window.location.href='userList.html';
                addCategoryUser(loginId, functionArray);
            } else {
                layer.msg("修改失败!", {icon: 5});
            }
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

