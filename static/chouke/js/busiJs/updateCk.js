function init() {
    var request = getRequest();
    activityId = request["ckId"];
    showInfo(activityId);
    var flag = request["flag"];
    if (flag == 1) {
        $("#first").hide();
        $("#second").hide();
        $("#third").hide();
        //$("#centerIframeId", parent.document).css("height", "1200px");
        $("#fourth").show();
        cPage = 4;
    }

};

function showInfo(id) {
    var loginId = getCookie("loginId");
    var businessP = {"ckId": id,"loginId":loginId};
    var d = constructionParams(rsaEncryptedString(businessP), "cf73ca5914e04eaaa8e33b4cca56d86e");
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        async: false,//同步
        dataType: 'json',
        data: JSON.stringify(d),
        success: function (json) {
            if (json.result == true) {
                //如果没有设置状态的权限，隐藏第四步的保存和发布按钮
                var haspublish = json.haspublish;
                if(haspublish == undefined || !haspublish){
                    var $a = $(".p176-tit-btnWrap a");
                    var len = $a.length;
                    //隐藏发布按钮
                    $a.eq(len - 1).css("display","none");
                    //$a.eq(len - 2).css("display", "none");
                }
                //第一阶段
                $("#ckId").val(json.activity.ID)
                $("#statusId").val(json.activity.Status)
                $("#classNum").val(json.activity.ClassCode);//班级编号
                $("#ckName").val(json.activity.Name);//筹课名称
                $("#usefulPerson").val(json.activity.FitPerson);//适用人群
                $("#courseAmount").val(json.activity.ClassMoney);//课程金额
                $("#ckIntroduce").val(json.activity.Content);//筹课说明
                $("#schoolId").val(json.activity.SchoolId);
                $("#areaCode").val(json.activity.AreaCode);
                $("#deptCode").val(json.activity.DeptCode);
                $("#classDate").val(json.activity.ClassDate);
                $("#classTime").val(json.activity.ClassTime);
                $("#classArea").val(json.activity.ClassArea);
                $("#service").val(json.activity.ServiceCall);//官方客服
                $('#careType').combotree('setValue', {
                    id: json.activity.CareType,
                    text: ''
                });
                $("#hidden1").val(json.activity.ImgUrl);//筹课配图
                if (json.activity.ImgUrl) {
                    $("#ckpt").attr("src", json.activity.ImgUrl);
                }
                $("#hidden1").parents(".uploader").find(".filename").val(json.activity.ImgUrl);
                $("#hidden2").val(json.activity.WechatImgUrl);//微信转发小图尺寸
                if (json.activity.WechatImgUrl) {
                    $("#wechatpt").attr("src", json.activity.WechatImgUrl);
                }
                $("#hidden2").parents(".uploader").find(".filename").val(json.activity.WechatImgUrl);
                $("#hidden3").val(json.activity.ErWeiCode);//公众号二维码
                if (json.activity.ErWeiCode) {
                    $("#ercodept").attr("src", json.activity.ErWeiCode);
                }
                $("#hidden3").parents(".uploader").find(".filename").val(json.activity.ErWeiCode);
                $("#gzhname").val(json.activity.WechatName);//公众号名称
                classValidateNum();
                $("#ckName").val(json.activity.Name);//筹课名称

                //第二阶段
                $("#startDate").val(json.activity.BeginDate.split(" ")[0]);//开始时间
                $("#startTime").val(json.activity.BeginDate.split(" ")[1].substr(0, json.activity.BeginDate.split(" ")[1].lastIndexOf(":")));//开始时间
                $("#endDate").val(json.activity.EndDate.split(" ")[0]);//结束时间
                $("#endTime").val(json.activity.EndDate.split(" ")[1].substr(0, json.activity.EndDate.split(" ")[1].lastIndexOf(":")));//开始时间
                $("#ruleIntroduce").val(json.activity.Rule);//规则说明
                $("#address").val(json.activity.HonourClassAddress);//兑课地址
                $("#phoneNum").val(json.activity.HonourClassContact);//兑课电话
                $("#effect").val(json.activity.HonourClassExpires.split(" ")[0]);//兑课有效期

                //批次处理
                var batch = json.ruleHelperList;
                if (batch.length > 0) {
                    for (var i = 0; i < batch.length; i++) {
                        var html = '<div class="p176-setInfoCon clearfix">' +
                            '<div class="p176-count-wrap clearfix">' +
                            '<div class="p176-countBox">' +
                            '<div class="p176-label-b" style="margin-left:0;">第' + (i + 1) + '批名额</div>' +
                            '<div class="p176-filed-b">' +
                            '<input name="count" type="text" class="p176-Cinput" value="' + batch[i].PersonNum + '">' +
                            '</div>' +
                            '<div class="p176-label-b">帮筹人数</div>' +
                            '<div class="p176-filed-b">' +
                            '<input name="perNum" type="text" class="p176-Cinput" value="' + batch[i].HelperNum + '">' +
                            '</div>' +
                            '</div>' +
                            '<i class="p176-close" onclick="delBacth(this)"></i>' +
                            '</div>' +
                            '</div>';
                        $("#batchNum").val((i + 1));
                        $("#batchId").append(html);
                    }
                } else {
                    $("#batchNum").val(0);
                }

                //第三阶段
                if (json.benefitList[0]) {
                    $("#courseName").val(json.benefitList[0].Name);//兑课地址
                    $("#courseReady").val(json.benefitList[0].Remark);//兑课电话
                    $("#courseIntroduce").val(json.benefitList[0].CourseExplain);//兑课有效期
                }

                //第四阶段
                $("#olderRule").val(json.activity.RewardRule);//老生抽奖规则
                $("#newDefine").val(json.activity.NewStudentDefinition);//新生定义
                $("#oldDefine").val(json.activity.OldStudentDefinition);//老生定义
                $("#contactNumber").val(json.activity.HonourRewardContact);//兑奖联系方式
                $("#workTime").val(json.activity.WorkTime);//工作时间
                $("#getcashAddress").val(json.activity.HonourRewardAddress);//兑奖地址
                $("#usefulPersons").val(json.activity.RewardFitPerson);//适用人群
                $("#overTime").val(json.activity.HonourRewardExpires.split(" ")[0]);//兑奖截止日期
                $("#helpCount").val(json.activity.RewardHelperNum);//帮忙人数

                //奖品处理
                var jackpot = json.jackpotList;
                for (var i = 0; i < jackpot.length; i++) {
                    var html = '<tr>';
                    html += '    <td>';
                    html += '<select name="select_id" class="p176-Nselect" style="width:80%">';
                    html += '    <option value="1"';
                    if (json.jackpotList[i].AwardDegree == 1) {
                        html += ' selected ';
                    }
                    html += '>一等奖</option>';
                    html += '    <option value="2"';
                    if (json.jackpotList[i].AwardDegree == 2) {
                        html += ' selected ';
                    }
                    html += '>二等奖</option>';
                    html += '    <option value="3"';
                    if (json.jackpotList[i].AwardDegree == 3) {
                        html += ' selected ';
                    }
                    html += '>三等奖</option>';
                    html += '    <option value="4"';
                    if (json.jackpotList[i].AwardDegree == 4) {
                        html += ' selected ';
                    }
                    html += '>四等奖</option>';
                    html += '</select>';
                    html += '    </td>' +
                        '    <td>' +
                        '<input name="wardName" type="text"                         class="p176-name-input" style="width:80%" value="' + json.jackpotList[i].AwardName + '">' +
                        '    </td>' +
                        '    <td>' +
                        '<div class="p176-numBox clearfix" style="width:72%">' +
                        '    <span class="p176-jian" onclick="numDec(this)"></span>' +
                        '    <input name="quantity" type="text" class="p176-num-input" value="' + json.jackpotList[i].Count + '">' +
                        '    <span class="p176-jia" onclick="numAdd(this)"></span>' +
                        '</div>' +
                        '    </td>' +
                        '    <td>' +
                        '<input name="weight" type="text" class="p176-Spinput" style="width:80%" value="' + json.jackpotList[i].AwardPerc + '">' +
                        '    </td>' +
                        '    <td>' +
                        '   <div class="p176-Sfiled p176-SfiledWidth">' +
                        '<input name="userfulRange" type="text" class="p176-Sminput1" id="applyRange-' + i + '" value="' + json.jackpotList[i].Scope + '">' +
                        '   <span class="p176-count01"><span id="explainContactCnt40' + i + '">0</span>/<span>10</span></span>' +
                        '   </div>' +
                        '    </td>' +
                        '    <td>' +
                        '<form action="'+Global.baseUploadPath+'/chouke/uploadfile" method="post" enctype="multipart/form-data"' +
                    ' style="width:100%">' +
                        '    <div class="uploader white" style="top:8px;">' +
                        '<input type="text" class="filename" value="' + json.jackpotList[i].AwardPic + '"/>' +
                        '<input name="first4"  type="file" class="p176-uplodingBtn" style="width:100px;" />' +
                        '<input type="hidden" name="hidden4" value="' + json.jackpotList[i].AwardPic + '">' +
                        '    </div>' +
                        '    <div style="float:right;margin: 14px 0px;"><input type="button" onclick="upload(this)" name="file" class="p176-uplodingBtn" value="上传" name="up4" />' +
                        '    </div>' +
                        '</form>' +
                        '    </td>' +
                        '    <td><i class="p176-close" onclick="delPot(this)"></i>' +
                        '    </td>' +
                        '</tr>';
                    $("#potId").append(html);

                    lengthValidate("applyRange-" + i, "explainContactCnt40" + i, 10);
                    updateSpan("applyRange-" + i, "explainContactCnt40" + i, 10);

                    setTextSize();
                }
            } else {
                layer.msg(json.message, {icon: 5});
            }
        }
    });
}


function setTextSize() {
    //编辑页面使用
    $('#explainInformCnt1').text($('#ckName').val().length);
    $('#explainInformCnt3').text($('#usefulPerson').val().length);
    $('#explainInformCnt7').text($('#ckIntroduce').val().length);
    $('#explainInformCnt9').text($('#ruleIntroduce').val().length);
    $('#explainInformCnt6').text($('#courseName').val().length);
    $('#explainInformCnt2').text($('#courseReady').val().length);
    $('#explainInformCnt4').text($('#courseIntroduce').val().length);
    $('#explainInformCnt29').text($('#olderRule').val().length);
    $('#explainInformCnt34').text($('#newDefine').val().length);
    $('#explainInformCnt').text($('#oldDefine').val().length);
    $('#explainContactCnt').text($('#contactNumber').val().length);
    $('#explainWorkCnt').text($('#workTime').val().length);
    $('#explainInformCnt1112').text($('#getcashAddress').val().length);
    $('#explainInformCnt3114').text($('#usefulPersons').val().length);
    $('#explainServiceCntMin').text($('#service').val().length);
    $('#explainaddressMinCnt').text($('#address').val().length);
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