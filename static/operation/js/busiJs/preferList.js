$(function () {
    $("form[enctype]").attr("action",Global.baseUploadPath+$("form[enctype]").attr("action"));
    //弹框效果
    $(".xdf_alert_top .close, .btn-gray").click(function () {
        $(".new-prefer").fadeOut();
    });
    $(".set-new").click(function () {
        $(".new-prefer").fadeIn();
    });
    //限定字数
    $('#youxuan-title').keyup(function () {
        var lv = $(this).val().length;
        $('#num-youxuan').html(lv)
    }).keyup();

    //删除，取消，确认
    //$(".p176-btn-delete").click(function () {
    //    $(".delete-bomb").fadeIn();
    //});
    $(".delete-bomb .close, .delete-bomb .btn-gray").click(function () {
        $(".delete-bomb").fadeOut();
    });
    $(".delete-bomb .del-must").click(function () {
        $(".delete-bomb").fadeOut();
        toDelete();
    });
    //下线，取消，确认
    //$(".p176-btn-downline").click(function () {
    //    $(".offline-bomb").fadeIn();
    //});
    $(".offline-bomb .close, .offline-bomb .btn-gray").click(function () {
        $(".offline-bomb").fadeOut();
    });
    $(".offline-bomb .del-must").click(function () {
        $(".offline-bomb").fadeOut();
        offline();
    });
    //发布，取消，确认
    //$(".p176-btn-release").click(function () {
    //    $(".release-bomb").fadeIn();
    //});
    $(".release-bomb .close, .release-bomb .btn-gray").click(function () {
        $(".release-bomb").fadeOut();
    });
    $(".release-bomb .del-must").click(function () {
        $(".release-bomb").fadeOut();
        priorityPublish();
    });


    loginId = getCookie("loginId");
    var businessP = {
        loginId: loginId
    };
    var d = constructionParams(rsaEncryptedString(businessP), "94b2b4e1eac54343902e756354526966");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://10.200.80.196:8088/market/user/getPrivilegeData.do",
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var isSuperAdmin = json.isSuperAdmin;
                var cityId = json.cityId;
                var categoryId = json.categoryId;
                if (!isSuperAdmin && cityId != null && categoryId != null) {
                    $(".set-new").css("display", "block");
                    currentCityId = cityId;
                    currentCategoryId = categoryId;
                    var cityName = json.cityName;
                    var categoryName = json.categoryName;
                    sessionStorage.priorityCityId = cityId;
                    sessionStorage.priorityCategoryId = categoryId;
                    sessionStorage.priorityCityName = cityName;
                    sessionStorage.priorityCategoryName = categoryName;
                    $(".hot-classes").hide();
                } else {
                   // $(".set-new").css("display", "none");
                    $(".hot-classes").show();
                    //地区，分类（展开收起）
                    initOpenAndShou();
                    findArea();
                    findCategory();
                }
                showList(1);
            } else {
                layer.msg(json.msg, {icon: 5});
            }
        }
    });

    $("input[type=file]").change(function () {
        $(".filename").val($(this).val());

    });

    $('.input-file').change(function () {
        var fileContent = $(".input-file").val();
        if (fileContent != null && fileContent != "") {

            if (!checkImgType($(".input-file").val())) {
                layer.msg("图片类型必须是 gif,jpeg,jpg,png,bmp中的一种", {icon: 5});
                return false;
            }

            $("#submit-1").ajaxSubmit(function (data) {
                // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
                if (data.success == true) {
                    $("#imageUrlInput").val(data.fileUrl);
                    $("#infoImage").attr("src", data.fileUrl);
                    $("#upSpan").html(data.message);
                } else {
                    $("#imageUrlInput").val("");
                    $("#infoImage").attr("src", "");
                    $("#upSpan").html(data.message);
                }
            });
            return false;
        } else {
            layer.msg("请选择文件", {icon: 5});
        }
    });
});

var switchFlag = false;
var pageSize = 15;
var currentCityId = "";
var currentCategoryId = "";
var publishCityId = "";
var publishCategoryId = "";
var firstIn = true;
var deleteId = "";
var offlineId = "";
var publishId = "";
var nameText = "";
var loginId;

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
    //分类2
    var ht2 = $(".hot-classes .list1").find(".xian-wid2").height();
    if (ht2 > baseht) {
        $(".open2").show();
        $(".shou2").hide();
    } else {
        $(".open2").hide();
        $(".shou2").hide();
    }
    initSwitch();
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
    $(".open, .open2").unbind('click').click(function () {
        $(this).parent().parent().css("height", "auto");
        $(this).hide();
        $(this).next().show();
        if (switchFlag) {
            $("#m1").prev().css("height", $('.hot-classes .list1 li').eq(0).height());
        }
    });
    $(".shou, .shou2").unbind('click').click(function () {
        $(this).parent().parent().css("height", "30px");
        $(this).hide();
        $(this).prev().show();
        if (switchFlag) {
            $("#m1").prev().css("height", $('.hot-classes .list1 li').eq(0).height());
        }
    });
}

/*
 * 判断图片类型
 *
 * @param ths
 *          type="file"的javascript对象
 * @return true-符合要求,false-不符合
 */
function checkImgType(file) {
    if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|JPEG|PNG|BMP)$/.test(file)) {
        return false;
    }
    return true;
}
//搜索
function search() {
    nameText = $.trim($('#nameText').val());
    if (nameText == '请输入优选名称搜索' || nameText == null) {
        nameText = '';
    }
    firstIn = true;
    showList(1);
}
//查询地区
function findArea() {
    //var loginId = getCookie("loginId");
    var businessP = {
        loginId: loginId
    };
    var d = constructionParams(rsaEncryptedString(businessP), "3577775ef8e849d9ab63dad2202584e0");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var schoolList = json.dataList;
                var str = "<a href='#' class='cur' onclick='filterByCityId(this,\"\")'>全部</a>";
                if (schoolList.length > 0) {
                    for (var i = 0; i < schoolList.length; i++) {
                        var schoolId = schoolList[i].sCode;
                        str += "<a href='#' onclick='filterByCityId(this, \"" + schoolId + "\")'" + " >" + schoolList[i].sCity + "</a>";
                    }
                    $(".xian-wid").eq(0).html(str);
                    initOpenAndShou();
                } else {
                    $(".xian-wid").eq(0).html(str);
                }
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}

//查询分类
function findCategory() {
    var loginId = getCookie("loginId");
    var businessP = {
        loginId: loginId
    };
    var d = constructionParams(rsaEncryptedString(businessP), "5773169bc6324b9fa1fcbf173a775ec8");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var categoryList = json.dataList;
                var str = "<a href='#' class='cur' onclick='filterByCategoryId(this,\"\")'>全部</a>";
                if (categoryList.length > 0) {
                    for (var i = 0; i < categoryList.length; i++) {
                        var id = categoryList[i].id;
                        var name = categoryList[i].name;
                        str += "<a href='#' onclick='filterByCategoryId(this, \"" + id + "\")'" + " >" + name + "</a>";
                    }
                    $(".xian-wid2").html(str);
                    initOpenAndShou();
                } else {
                    $(".xian-wid2").html(str);
                }
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}

function filterByCityId(_this, id) {
    $(".xian-wid .cur").removeClass("cur");
    $(_this).addClass("cur");
    firstIn = true;
    currentCityId = id;
    showList(1);
}

function filterByCategoryId(_this, id) {
    $(".xian-wid2 .cur").removeClass("cur");
    $(_this).addClass("cur");
    firstIn = true;
    currentCategoryId = id;
    showList(1);
}

function showList(page) {
    //var queryName = $('#nameText').val();
    var requestJson = {
        page: page,
        pageSize: pageSize,
        cityId: currentCityId,
        categoryId: currentCategoryId,
        queryName: nameText
    }
    var d = constructionParams(rsaEncryptedString(requestJson), "4e82a35c8eb840df960e485735266ef7");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: 'http://localhost:8088/market/priority/getPriorityList.do',
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                totalCounts = json.totalCount;
                //initPage(totalCounts, page);
                if (firstIn) {
                    initPage(totalCounts, page);
                    firstIn = false;
                }
                var priorityList = json.dataList;
                var str = "";
                if (priorityList.length > 0) {
                    for (var i = 0; i < priorityList.length; i++) {
                        var priority = priorityList[i];
                        var id = priority.id;
                        var name = priority.name;
                        var status = priority.status;
                        var cityId = priority.cityId;
                        var categoryId = priority.categoryId;
                        // 1-未发布 2-已发布 3-下线
                        var statusTxt = status == 1 ? "待发布" : (status == 2 ? "已发布" : "下线");
                        str += "<tr>";
                        str += "<td><a title='" + name + "' class='text-over'>" + name + "</a></td>";
                        str += "<td>" + priority.publishTime + "</td>";
                        str += "<td>" + priority.endTime + "</td>";
                        str += "<td>" + statusTxt + "</td>";
                        str += "<td>";
                        str += "<div class='p176-table-btnGroup'>";
                        str += "<a href='javascript:;' onclick='toPreview(\"" + id + "\")'" +
                            " class='p176-btn-seesee'><i></i>预览</a>";
                        if (status == 2) {
                            str += "<a href='javascript:;' onclick='offlineLayer(\"" + id + "\")' class='p176-btn-downline'><i></i>下线</a>";
                        } else {
                            str += "<a href='javascript:;' onclick='priorityEdit(\"" + id + "\")' class='p176-btn-edit'><i></i>编辑</a>";
                            str += "<a href='javascript:;' onclick='priorityPublishLayer(\"" + id + "\",\"" + cityId + "\", \"" + categoryId + "\")'" +
                                " class='p176-btn-release'><i></i>发布</a>";
                            str += "<a href='javascript:;' onclick='toDeleteLayer(\"" + id + "\")'" +
                                " class='p176-btn-delete'><i></i>删除</a>";

                        }
                        str += "</div>";
                        str += "</td>";
                        str += "</tr>";
                    }

                    $("#priorityTBody").html(str);
                } else {
                    $("#priorityTBody").html(str);
                }
                initNavigationBar();
                $(".p176-btn-copylink").trigger("click");
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
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
                    showList(num);
                }
            }
        });
    } else {
        $("#publicPage").html("");
    }
}

function toPreview(id) {
    window.open('../../view/page/preferView.html?id=' + id);
}

function offlineLayer(id) {
    offlineId = id;
    $(".offline-bomb").fadeIn();
}

function offline() {
    var requestParam = {
        priorityId: offlineId,
        loginId: loginId
    }
    var d = constructionParams(rsaEncryptedString(requestParam), "3c244b4702e247738144609d939c18cb");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://10.200.80.196:8088/market/priority/offPriority.do",
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                showList(1);
            } else {
                layer.msg(json.msg, {icon: 5});
            }
        }
    });
}

function priorityEdit(id) {
    window.location.href = "preferEdit.html?flag=edit&id=" + id;
}

function priorityPublishLayer(id, cityId, categoryId) {
    publishId = id;
    publishCityId = cityId;
    publishCategoryId = categoryId;
    $(".release-bomb").fadeIn();
}

function priorityPublish() {
    var requestParam = {
        priorityId: publishId,
        cityId: publishCityId,
        categoryId: publishCategoryId,
        loginId: loginId
    };
    var d = constructionParams(rsaEncryptedString(requestParam), "8175f3754b5847c297f22ac4a20e2e49");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://10.200.80.196:8088/market/priority/publishPriority.do",
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                showList(1);
            } else {
                layer.msg(json.msg, {icon: 5});
            }
        }
    });
}

function toDeleteLayer(id) {
    deleteId = id;
    $(".delete-bomb").fadeIn();
}

function toDelete() {
    var requestParam = {
        priorityId: deleteId
    };
    var d = constructionParams(rsaEncryptedString(requestParam), "c0969d95d6ad4dd7b63ab046eeb8e054");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://10.200.80.196:8088/market/priority/deletePriority.do",
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                showList(1);
            } else {
                layer.msg(json.msg, {icon: 5});
            }
        }
    });
}

function createPriority() {

    var name = $("#youxuan-title").val();
    var imageUrl = $("#imageUrlInput").val();
    if (name.length == 0) {
        layer.msg("优选名称不能为空", {icon: 5});
        return;
    }
    if (imageUrl.length == 0) {
        layer.msg("优选头图不能为空", {icon: 5});
        return;
    }

    sessionStorage.priorityName = name;
    sessionStorage.priorityImageUrl = imageUrl;

    var businessP = {
        loginId: loginId,
        name: name,
        imageUrl: imageUrl
    };
    var d = constructionParams(rsaEncryptedString(businessP), "afe874501db54be0a9d08d1f4c975af7");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url: "http://10.200.80.196:8088/market/priority/addPriority.do",
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                window.location.href = "./preferEdit.html?flag=new&id=" + json.id;

            } else {
                layer.msg("创建优选失败!", {icon: 5});
            }
        }
    });

}