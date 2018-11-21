var firstIn = true;

$(function(){
    //下载，取消，确认
    $(".offline-bomb .close, .offline-bomb .btn-gray").click(function () {
        $(".offline-bomb").fadeOut();
    });
    $(".offline-bomb .del-must").click(function () {
        $(".offline-bomb").fadeOut();
        downloadLayer();
    });
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    $("#channel_startTime").attr('placeholder',currentdate);
    $("#channel_endTime").attr('placeholder',currentdate);
});
//新建渠道
function addChannel() {
    layer.confirm("确认保存？", {
        btn: ['保存', '取消'] //按钮
    }, function () {
        saveChannel();
    }, function () {

    });
}
//显示渠道列表
function showChannelList(){
    var d = constructionParams("", "27fb7133f5584538a9126053fbcff994");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                $("#channelTbody").html('');
                var channelList = json.data;
                var str = "";
                var state = 1;
                if (channelList.length > 0) {
                    for (var i = 0; i < channelList.length; i++) {
                        var channel_codes = channelList[i]["channelCode"];
                        var channel_names = channelList[i]["channelName"];
                        //var diskpaths = channelList[i]["diskpath"];
                        var channel_url = channelList[i]["url"];
                        str += "<tr>";
                        str += "<td>" + channel_codes + "</td>";
                        str += "<td>" + channel_names + "</td>";
                       /* str += "<td>" + diskpaths + "</td>";
                        str += "<td>" + channel_url + "</td>";*/
                        str += "<td>";
                        str += "<div class='p176-table-btnGroup'>";
                        if (state == 1) {
                            str += "<a href='#' onclick='changeStatus(\"" + channel_codes + "\",0)'" +
                                " class='p176-btn-disable'><i></i>禁用</a>";
                        }
                        if (state == 0) {
                            str += "<a href='#' onclick='changeStatus(\"" + channel_codes + "\",1)' class='p176-btn-disable'><i></i>启用</a>";
                        }
                        str += "<a href='"+ channel_url+"' download='"+ channel_names+"' class='p176-btn-download'><i></i>下载</a>";
                        str += "</div>";
                        str += "</td>";
                        str += "</tr>";
                    }
                    $("#channelTbody").html(str);
                }
                // window.location.href = 'userBehaviour.html';
            }else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}
//显示渠道统计列表
function findChannelCountList(){
    var channel_startTime = $("#channel_startTime").val();
    if (channel_startTime == null) {
        channel_startTime = "";
    }
    var channel_endTime = $("#channel_endTime").val();
    if (channel_endTime == null) {
        channel_endTime = "";
    }
    var requestJson = {
        channel_startTime: channel_startTime,
        channel_endTime: channel_endTime
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "451e8a3103ec477888e85a3811d58bf2");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,//异步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                $("#channelCountTbody").html('');
                var channelCountList = json.data;
                var str = "";
                if (channelCountList.length > 0) {
                    for (var i = 0; i < channelCountList.length; i++) {
                        var channel_Code = channelCountList[i]["channelCode"];
                        var channel_Name = channelCountList[i]["channelName"];
                        var channel_counts = channelCountList[i]["counts"];

                        str += "<tr>";
                        str += "<td>" + channel_Code + "</td>";
                        str += "<td>" + channel_Name + "</td>";
                        str += "<td>" + channel_counts + "</td>";
                        str += "</tr>";
                        $("#channelCountTbody").html(str);
                    }
                }
            } else {
                layer.msg("查询失败!", {icon: 5})
            }
        }
    });
}

//保存数据
function saveChannel() {
    layer.load(2);
    var channel_code = $("#channel_code").val();
    var channel_name = $("#channel_name").val();
    var channel_url = $("#channel_url").val();
    if (channel_code == "") {
        layer.msg("渠道编号不能为空！", {icon: 5});
        layer.closeAll('loading');
        return false;
    }

    if (channel_name == "") {
        layer.msg("渠道名称不能为空！", {icon: 5});
        layer.closeAll('loading');
        return false;
    }
    if(channel_url == ""){
        layer.msg("地址不能为空,请上传！", {icon: 5});
        layer.closeAll('loading');
        return false;
    }
    var userId = getCookie("loginId");
    var userName = getCookie("userName");
    var requestJson = {
        userId: userId,
        userName: userName,
        channel_code: channel_code,
        channel_name: channel_name,
        channel_url: channel_url
    };
    var d = constructionParams(rsaEncryptedString(requestJson), "e958cffabffc4f69a4b408fa9b1e000e");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: true,
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                layer.msg("保存成功", {icon: 6, time: 1000}, function () {
                    showChannelList();
                    findChannelCountList();
                });
            } else {
                layer.closeAll('loading');
                layer.msg("保存失败", {icon: 5});
            }
            layer.closeAll('loading');
        }
    });
}

//启用禁用
function changeStatus(channel_codes,state) {
    var confirm='';
    var succsessMsg='';
    var failMsg ='';
    if(state==0){
        confirm='确定禁用该渠道吗?';
        succsessMsg='禁用成功!';
        failMsg='禁用失败!';
    } else {
        confirm='确定启用该渠道吗?';
        succsessMsg='启用成功!';
        failMsg='启用失败!';
    }
    layer.confirm(confirm, {
        btn: ['确认', '取消'] //按钮
    }, function () {
        var businessP = {"channelCode": channel_codes,"state":state,"userId":getCookie("loginId"),"userName":getCookie("userName")};
        var d = constructionParams(rsaEncryptedString(businessP), "e1dea97eebe640e5bd9deee39f68d966");
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            async: false,//同步
            dataType: 'json',
            data: JSON.stringify(d),
            success: function (json) {
                if (json.result == true) {
                    layer.msg(succsessMsg, {icon: 6});
                      showChannelList();
                } else {
                    layer.msg(failMsg, {icon: 5});
                }
            }
        });
    }, function () {

    });
}

//搜索
function search_channel() {
    firstIn = true;
    var channel_startTime = $("#channel_startTime").val();
    var channel_endTime = $("#channel_endTime").val();
    if (channel_startTime.length <= 0 && channel_endTime.length <= 0) {
        layer.msg('开始时间和结束时间不能都为空', {icon: 5});
        return false;
    }
    if(channel_endTime != '') {
        if (channel_endTime < channel_startTime) {
            layer.msg('结束时间不能小于开始时间', {icon: 5});
            return false;
        }
    }
    findChannelCountList();
}
//导出ChannelCount数据
function exportChannelExcel() {
    var channelCountTbody = $("#channelCountTbody").children();
    if (channelCountTbody.length <= 0) {
        layer.msg('暂无统计内容可导出', {icon: 5});
        return;
    }

    var d = constructionParams("","36709f2362bb45029ffb0570d9eb3dd6");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                var downloadUrl = json.downloadUrl;
                saveIframe.document.location = downloadUrl;
                downloadFile();
            }
        }
    });
}