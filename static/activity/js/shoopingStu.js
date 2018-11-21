
/*---------------------------------------------------------
 * 系统名称：网报WebAppPay.V1.0.0 -- 购物车模块
 * 变更履历：
 * 版本，	日期，	       操作人，	描述
 * V1.0.0， 2016.05.16， 路海平    移动端购物车订单填写页
 ----------------------------------------------------------*/


var initFactory = {
    needCart: [],
    CommonStudentInfo: [], //常用学员信息
    StudentClassInfoList: [],
    StuSheetInfoList: [],
    newStudentClassInfoList: [],
    newStuSheetInfoList: [],
    voucherUseList: [], //优惠券优惠
    optimalvoucherUseList: [], //班级优惠
    AddressList: SS.getJson("addressInfoList"),
    wayList: SS.getJson("wayList"),
    sources: $.cookie('Xdf.MarketingSources'), //来源
    laodaixinStudent: [],
    isLaodaxin:{
        schoolID: -1,
        souse: ""
    },
    laodaxinLsuid: $.cookie('lsuid') || -1,
    laodaixinSchoolIDandSouse: [
        {
            schoolID: 5,
            souse: "laodaixin-tj"
        },
        {
            schoolID: 3,
            souse: "laodaixin-wh"
        },
        {
            schoolID: 1,
            souse: "laodaixin-bj"
        },
        {
            schoolID: 2,
            souse: "laodaixin-sh"
        },
        {
            schoolID: 8,
            souse: "laodaixin-sz8"
        },
        {
            schoolID: 6,
            souse: "laodaixin-xa6"
        },
        {
            schoolID: 7,
            souse: "laodaixin-nj7"
        },
        {
            schoolID: 9,
            souse: "laodaixin-sy9"
        },
        {
            schoolID: 10,
            souse: "laodaixin-cq10"
        },
        {
            schoolID: 11,
            souse: "laodaixin-cd11"
        },
        {
            schoolID: 14,
            souse: "laodaixin-xy14"
        },
        {
            schoolID: 15,
            souse: "laodaixin-hrb15"
        },
        {
            schoolID: 16,
            souse: "laodaixin-cs16"
        },
        {
            schoolID: 18,
            souse: "laodaixin-ch18"
        },
        {
            schoolID: 19,
            souse: "laodaixin-hz19"
        },
        {
            schoolID: 20,
            souse: "laodaixin-zz20"
        },
        {
            schoolID: 21,
            souse: "laodaixin-ty21"
        },
        {
            schoolID: 22,
            souse: "laodaixin-jn22"
        },
        {
            schoolID: 23,
            souse: "laodaixin-sz23"
        },
        {
            schoolID: 24,
            souse: "laodaixin-sjz24"
        },
        {
            schoolID: 25,
            souse: "laodaixin-hf25"
        },
        {
            schoolID: 26,
            souse: "laodaixin-fz26"
        },
        {
            schoolID: 27,
            souse: "laodaixin-yn27"
        },
        {
            schoolID: 28,
            souse: "laodaixin-as28"
        },
        {
            schoolID: 29,
            souse: "laodaixin-zz29"
        },
        {
            schoolID: 30,
            souse: "laodaixin-fs30"
        },
        {
            schoolID: 31,
            souse: "laodaixin-yc31"
        },
        {
            schoolID: 32,
            souse: "laodaixin-wx32"
        },
        {
            schoolID: 34,
            souse: "laodaixin-jz34"
        },
        {
            schoolID: 35,
            souse: "laodaixin-nc35"
        },
        {
            schoolID: 36,
            souse: "laodaixin-dl36"
        },
        {
            schoolID: 37,
            souse: "laodaixin-hs37"
        },
        {
            schoolID: 38,
            souse: "laodaixin-nb38"
        },
        {
            schoolID: 40,
            souse: "laodaixin-lz40"
        },
        {
            schoolID: 41,
            souse: "laodaixin-xm41"
        },
        {
            schoolID: 44,
            souse: "laodaixin-qd44"
        },
        {
            schoolID: 45,
            souse: "laodaixin-nn45"
        },
        {
            schoolID: 46,
            souse: "laodaixin-xz46"
        },
        {
            schoolID: 48,
            souse: "laodaixin-xt48"
        },
        {
            schoolID: 49,
            souse: "laodaixin-zj49"
        },
        {
            schoolID: 50,
            souse: "laodaixin-jl50"
        },
        {
            schoolID: 51,
            souse: "laodaixin-fy51"
        },
        {
            schoolID: 52,
            souse: "laodaixin-nt52"
        },
        {
            schoolID: 53,
            souse: "laodaixin-ly53"
        },
        {
            schoolID: 54,
            souse: "laodaixin-hhht54"
        },
        {
            schoolID: 55,
            souse: "laodaixin-wlmq55"
        },
        {
            schoolID: 56,
            souse: "laodaixin-ts56"
        },
        {
            schoolID: 57,
            souse: "laodaixin-gy57"
        },
        {
            schoolID: 58,
            souse: "laodaixin-sy58"
        },
        {
            schoolID: 59,
            souse: "laodaixin-wz59"
        },
        {
            schoolID: 60,
            souse: "laodaixin-yt60"
        },
        {
            schoolID: 61,
            souse: "laodaixin-wf61"
        },
        {
            schoolID: 64,
            souse: "laodaixin-zh64"
        },
        {
            schoolID: 66,
            souse: "laodaixin-yz66"
        },
        {
            schoolID: 68,
            souse: "laodaixin-bd68"
        },
        {
            schoolID: 69,
            souse: "laodaixin-cqyc69"
        },
        {
            schoolID: 70,
            souse: "laodaixin-sz70"
        },
        {
            schoolID: 71,
            souse: "laodaixin-jz71"
        },
        {
            schoolID: 72,
            souse: "laodaixin-ta72"
        },
        {
            schoolID: 73,
            souse: "laodaixin-hd73"
        },
        {
            schoolID: 82,
            souse: "laodaixin-kf82"
        },
        {
            schoolID: 83,
            souse: "laodaixin-ny83"
        },
        {
            schoolID: 84,
            souse: "laodaixin-jh84"
        },
        {
            schoolID: 85,
            souse: "laodaixin-yw85"
        },
        {
            schoolID: 86,
            souse: "laodaixin-yc86"
        },
        {
            schoolID: 87,
            souse: "laodaixin-lyg87"
        },
        {
            schoolID: 501,
            souse: "laodaixin-jz501"
        },
        {
            schoolID: 502,
            souse: "laodaixin-sx502"
        },
        {
            schoolID: 503,
            souse: "laodaixin-hz503"
        },
        {
            schoolID: 504,
            souse: "laodaixin-hk504"
        },
        {
            schoolID: 505,
            souse: "laodaixin-yc505"
        },
        {
            schoolID: 506,
            souse: "laodaixin-dg506"
        },
        {
            schoolID: 507,
            souse: "laodaixin-zh507"
        },
        {
            schoolID: 508,
            souse: "laodaixin-cz508"
        },
        {
            schoolID: 509,
            souse: "laodaixin-qhd509"
        },
        {
            schoolID: 510,
            souse: "laodaixin-ay510"
        },
        {
            schoolID: 511,
            souse: "laodaixin-sx511"
        },
        {
            schoolID: 512,
            souse: "laodaixin-sx512"
        },
        {
            schoolID: 513,
            souse: "laodaixin-sz513"
        },
        {
            schoolID: 514,
            souse: "laodaixin-sz514"
        },
        {
            schoolID: 515,
            souse: "laodaixin-sz515"
        },
        {
            schoolID: 516,
            souse: "laodaixin-dq516"
        },
        {
            schoolID: 517,
            souse: "laodaixin-my517"
        },
        {
            schoolID: 518,
            souse: "laodaixin-xx518"
        },
        {
            schoolID: 601,
            souse: "laodaixin-mtx601"
        },
        {
            schoolID: 602,
            souse: "laodaixin-mtx602"
        },
        {
            schoolID: 603,
            souse: "laodaixin-mtx603"
        },
        {
            schoolID: 701,
            souse: "laodaixin-js701"
        },
        {
            schoolID: 702,
            souse: "laodaixin-hn702"
        }
    ],
    findLdxSchoolAndSurse: function (schoolID) {
        var obj = {
            schoolID: -1,
            souse: ""
        }
        for (var i = 0; i < this.laodaixinSchoolIDandSouse.length; i++) {
            var item = this.laodaixinSchoolIDandSouse[i];
            if (schoolID == item.schoolID) {
                obj = item;
                return obj
            }

        }
        return obj
    },
    classInit: function (xdf) {
        //增加班级信息
        for (var i = 0; i < xdf.length; i++) {

            var classInfo = xdf[i];

            var $order = $("#classInfo").clone();
            //老带新 不能添加学员

            if(SS.get("SchoolId") == initFactory.isLaodaxin.schoolID  && initFactory.sources == initFactory.isLaodaxin.souse && initFactory.laodaxinLsuid >0){//除武汉学校老带新活动
                $order.find('[newstudent]').replaceWith('<div class="head_line" style="border-top:none"></div>');
                $order.find('[class="delete"]').hide();
            } else if (SS.get("SchoolId") == "4" && initFactory.sources == 'laodaixin-wh' && initFactory.laodaxinLsuid > 0) {//武汉老带新流程
                //$order.find('[newstudent]').remove();
                $order.find('[newstudent]').replaceWith('<div class="head_line" style="border-top:none"></div>');
                $order.find('[class="delete"]').hide();
            }

            $order.attr("id", classInfo.Code);

            $order.css("display", "block");

            var spand = $order.find("[Price]").text("¥" + classInfo.Price);

            $order.find("[code]").text(classInfo.Code);

            $order.find("[Name]").text(classInfo.Name);

            $order.find("[LearnPlace]").text(classInfo.LearnPlace);

            $order.find("[LearnTime]").text(classInfo.LearnTime);

            $order.find("[newStudent]").attr("href", "/OPXdf/Cart/CommStu?ClassCode=" + classInfo.Code);

            $order.find("[student]").attr("id", "student" + classInfo.Code);
            //增加学员信息
            initFactory.studentInClass($order.find("[student]"), classInfo.Code, initFactory.StudentClassInfoList, initFactory.StuSheetInfoList);
            $("#order-classInfo").append($order)
        }

        //添加学员信息。并缓存到needcart
        var stuSheetInfoList = SS.getJson("stuSheetInfoList") || [];

        var studentClassInfoList = SS.getJson("studentClassInfoList") || [];

        var newStudentClassInfoList = [];

        var newStuSheetInfoList = [];

        var Cart = initFactory.needCart;

        for (var i = 0; i < Cart.length; i++) {

            Cart[i].stuSheetInfo = [];

            var count = 0;

            for (var j = 0; j < studentClassInfoList.length; j++) {

                for (var k = 0; k < stuSheetInfoList.length; k++) {

                    if (Cart[i].Code == studentClassInfoList[j].ClassCode) {

                        if (studentClassInfoList[j].Guid == stuSheetInfoList[k].Guid) {

                            newStudentClassInfoList.push(studentClassInfoList[j]);

                            newStuSheetInfoList.push(stuSheetInfoList[k]);

                            stuSheetInfoList[k].VoucherName = "未使用优惠";

                            stuSheetInfoList[k].VoucherValue = 0;

                            Cart[i].stuSheetInfo.push(stuSheetInfoList[k]);

                            count++; //计算此班级的学员数量
                        }
                    }
                }
            }
            Cart[i].Count = count; //添加本课程下的学员数量
        }

        SS.setJson("stuSheetInfoList", newStuSheetInfoList);

        SS.setJson("studentClassInfoList", newStudentClassInfoList);

        //添加学员信息。并缓存到needcart

        //添加优惠信息
        var voucherUseList = SS.getJson("voucherUseList");

        if (voucherUseList != null) {

            for (var i in Cart) {

                for (var j in studentClassInfoList) {

                    for (var k in stuSheetInfoList) {

                        for (var m in voucherUseList) {

                            if (Cart[i].Code == studentClassInfoList[j].ClassCode && studentClassInfoList[j].ClassCode == voucherUseList[m].ClassCode && studentClassInfoList[j].Guid == stuSheetInfoList[k].Guid && voucherUseList[m].Tag == studentClassInfoList[j].Tag && voucherUseList[m].TypeId == 2) {

                                stuSheetInfoList[k].VoucherName = "优惠" + voucherUseList[m].Fees + "元";

                                stuSheetInfoList[k].VoucherValue = voucherUseList[m].Fees;
                            }
                        }
                    }
                }
            }
        }
        //添加优惠信息
        LS.setJson("needCart", initFactory.needCart);
    },
    /**
     * 增加学员信息
     * @param ele
     * @param code
     * @param stuclass
     * @param stusheet
     */
    studentInClass: function (ele, code, stuclass, stusheet) {

        ele.find("del");

        if (!stuclass || !stusheet) return;

        for (var i = 0; i < stuclass.length; i++) {

            if (code == stuclass[i].ClassCode) {

                for (var j = 0; j < stusheet.length; j++) {

                    if (stuclass[i].Guid == stusheet[j].Guid) {

                        var id = "student" + stuclass[i].ClassCode;

                        var $stumodel = $("#nweStudentList").clone();

                        var vouche = this.voucherInClassStu(stusheet[j].Name, code);

                        $stumodel.attr("id", "newstu" + code + stusheet[j].Name);

                        $stumodel.find("[name]").text(stusheet[j].Name);

                        $stumodel.find("[mobile]").text(stusheet[j].Mobile);

                        $stumodel.find("[del]").attr("tag", stuclass[i].Tag);

                        $stumodel.find("[del]").attr("classcode", stuclass[i].ClassCode);

                        $stumodel.find("[del]").attr("guid", stuclass[i].Guid);
                        //老带新 不能进行学员的删除
                        if(SS.get("SchoolId") == initFactory.isLaodaxin.schoolID  && initFactory.sources == initFactory.isLaodaxin.souse && initFactory.laodaxinLsuid >0){//除武汉学校老带新活动
                            $stumodel.find("[del]").hide();
                        } else if (SS.get("SchoolId") == "4" && initFactory.sources == 'laodaixin-wh' && initFactory.laodaxinLsuid > 0) {
                            $stumodel.find("[del]").hide();
                        }

                        $stumodel.find("[ticket]").attr("href", "/OPXdf/Cart/UseTicket?ClassCode=" + code + "&SchoolId=" + SS.get("SchoolId") + "&StudentCode=" + stusheet[j].StudentCode + "&guid=" + stuclass[i].Guid);

                        $stumodel.find("[ticketin]").attr({
                            tag: stuclass[i].Tag,
                            code: code,
                            href: "/OPXdf/Cart/UseTicket?ClassCode=" + code + "&SchoolId=" + SS.get("SchoolId") + "&StudentCode=" + stusheet[j].StudentCode + "&guid=" + stuclass[i].Guid
                        });
                        stusheet[j].StudentCode ? $stumodel.find("[isbOldStudent]").css("display", "block") : $stumodel.find("[isbOldStudent]").css("display", "none");

                        $stumodel.find("[fees]").attr("code", code);

                        $stumodel.find("[fees]").attr("tag", stusheet[j].Name);

                        if (vouche) {

                            $stumodel.find("span[code=" + "'" + code + "'" + "][tag=" + "'" + stuclass[i].Tag + "'" + "]").text("已优惠" + vouche.Fees + "元");

                            $stumodel.find("[ticket]").css("display", "none");

                            $stumodel.find("[ticketin]").css("display", "block");
                        }

                        ele.append($stumodel);

                        continue;
                    }
                }
            }

        }

    },
    /**
     * 在本地存储中拿取数据过滤出选中的班级
     * @param cart
     */
    cartInitByCart: function (cart) {

        var filter = [];

        for (var i = 0; i < cart.length; i++) {

            if (cart[i].Check == true) {

                filter.push(cart[i]);
            }
        }

        return filter;
    },

    wayListInit: function () {

        var query = location.href;

        var classInfo = query.myQueryURLParameter();

        if (initFactory.wayList) {//初始化配送方式，如果有缓存，就走缓存

            if (initFactory.wayList && initFactory.wayList.length > 0) {

                for (var i = 0; i < initFactory.wayList.length; i++) {

                    var thisWayList = initFactory.wayList[i];

                    if (thisWayList.Checked == true) {

                        $("#distribution").text(thisWayList.sName);

                        $("#distributionPrice").text(thisWayList.dPrice);

                        if (thisWayList.bIsReceiveOwn == true) {

                            $("#invoice").css("display", "none");
                            if (SS.get("SchoolId") == 1) {
                                $("#invoices").before('<div class="beijing_invoice"><h2 class="invoice">发票开具提示</h2><p>若您需要开具发票，请您在试听期后至班级结课后90天内，关注微信公众号<i>VBJXDF</i>自助开具，为保证您的正常权益，建议您在确保不转退班的情况下开具发票。</p></div>');
                            } else {

                            }
                            $("#invoices").css("display", "none");



                            $("#distributionPriceBox").css("display", "block");

                            $("#invoice").val("");

                            SS.setJson("invoice", null);

                            return

                        } else {

                            if (SS.get("SchoolId") == 1) {
                                $("#invoices").css("display", "none").before('<div class="beijing_invoice"><h2 class="invoice">发票开具提示</h2><p>若您需要开具发票，请您在试听期后至班级结课后90天内，关注微信公众号<i>VBJXDF</i>自助开具，为保证您的正常权益，建议您在确保不转退班的情况下开具发票。</p></div>');

                            } else {
                                $("#invoices").css("display", "block");
                            }


                            $("#distributionPriceBox").css("display", "block");

                            if (SS.getJson("invoice")) {

                                $("label").prev().attr("checked", "checked");

                                $("#invoice").val(SS.getJson("invoice")).css("display", "block");
                            } else {

                                $("#invoice").val("").css("display", "none");

                                SS.setJson("invoice", null);
                            }


                            $("#payRealmoney").text("¥" + (initFactory.price(initFactory.needCart) - initFactory.optimalPrice() - initFactory.voucherPrice() + (initFactory.wayPrice())));

                            for (var j = 0; j < initFactory.AddressList.length; j++) {

                                var thisAddress = initFactory.AddressList[j];

                                if (thisAddress.Checked == true) {

                                    var hideArea = $("#address-list");

                                    hideArea.css("display", "block");


                                    hideArea.find("[deliveryname]").text(thisAddress.sName);

                                    hideArea.find("[deliverymobile]").text(thisAddress.sMobile);

                                    hideArea.find("[deliveryaddress]").text(thisAddress.sDistrictName + thisAddress.sStreet);

                                    return

                                }
                            }
                        }
                    }

                }
            } else {

                $("#distribution").text("请选择");

                $("#distributionPriceBox").css("display", "none");
            }
        } else {//初始化配送方式，调取数据

            $.ajax({
                type: 'post',
                url: "/Areas/XdfB/Handlers/getDeliverWayHandler.ashx",
                dataType: 'json',
                data: {
                    "productList": JSON.stringify(initFactory.needCart)
                },
                success: function (xdf) {

                    if (!xdf) {

                        $("#loading").hide();
                        return
                    }

                    SS.setJson("wayList", xdf);

                    for (var i in xdf) {

                        if (xdf[i].Checked && xdf[i].bIsReceiveOwn) { //

                            $("#distribution").text(xdf[i].sName);

                            $("#distributionPrice").text(xdf[i].dPrice);

                            $("#distributionPriceBox").css("display", "block");

                            var NumberPrice = Number(initFactory.price(initFactory.needCart)) + Number(initFactory.wayPrice())

                            $("#payPrice").text("原价￥" + NumberPrice);

                            $("#payRealmoney").text("¥" + (initFactory.price(initFactory.needCart) - initFactory.optimalPrice() - initFactory.voucherPrice() + (initFactory.selectWay ? initFactory.selectWay[0].dPrice : 0)));

                            $("#invoice").css("display", "none");

                            break;
                        }

                        $("#distribution").text("请选择");

                        $("#distributionPriceBox").css("display", "none");
                    }
                    if (SS.get("SchoolId") == 1) {
                        $("#invoices").css("display", "none").before('<div class="beijing_invoice"><h2 class="invoice">发票开具提示</h2><p>若您需要开具发票，请您在试听期后至班级结课后90天内，关注微信公众号<i>VBJXDF</i>自助开具，为保证您的正常权益，建议您在确保不转退班的情况下开具发票。</p></div>');
                    }

                    $("#loading").hide();
                }
            });
        }
    },
    findaddressInfoListSelect: function () {

        var addressList = initFactory.AddressList;

        var isselect = false;

        if (addressList != null) {

            for (var i = 0; i < addressList.length; i++) {

                if (addressList[i].Checked == true) {

                    isselect = true;

                    break

                }
            }
        }

        return isselect;
    },
    /**
     * 根据guid查找学员对应的班级表
     * @guid guid
     *
     */
    findClassSheetInfoByGuid: function (guid) {
        for (var i = 0; i < this.StudentClassInfoList.length; i++) {
            var item = this.StudentClassInfoList[i];
            if (guid == item.Guid) {
                return item;
            }
        }

    },

    /**
     * 查找学员有没有对应的优惠
     * @param Tag
     * @param ClassCode
     * @returns {boolean}
     */
    findVoucheIsSave: function (Tag, ClassCode) {
        if (!this.voucherUseList || this.voucherUseList.length == 0) {
            return false
        }
        for (var i = 0; i < this.voucherUseList.length; i++) {
            if (Tag == this.voucherUseList[i].Tag && ClassCode == this.voucherUseList[i].ClassCode) {
                return this.voucherUseList[i];
            }
        }
        return false
    },
    optimalVoucher: function () {

        $("#loading").show();
        var studentClassInfoList = SS.getJson("studentClassInfoList"), newStudentClassInfoList = [];
        for (var i = 0; i < studentClassInfoList.length; i++) {
            var item = studentClassInfoList[i];
            var tagVoucher = initFactory.findVoucheIsSave(item.Tag, item.ClassCode);
            if (!tagVoucher.DisallowAutoAndEV) {
                newStudentClassInfoList.push(item);
            }
        }
        $.ajax({ //计算同报优惠 TypeId==3
            type: 'post',
            url: "/Areas/XdfB/Handlers/getVoucherOfAutoHandler.ashx",
            dataType: 'json',
            data: {
                "studentClassInfoList": JSON.stringify(newStudentClassInfoList),
                "SchoolId": SS.get("SchoolId")
            },
            success: function (xdf) {

                var needCart = LS.getJson("needCart");

                if (xdf != "" && xdf != null) {
                    for (var i = 0; i < xdf.VoucherList.length; i++) {
                        var item = xdf.VoucherList[i];
                        var tagVoucher = initFactory.findVoucheIsSave(item.Tag, item.ClassCode);
                        if (tagVoucher.DisallowAutoAndEV) {
                            xdf.VoucherList.splice(i, 1);
                            i--;
                        }
                    }

                    initFactory.optimalvoucherUseList = xdf.VoucherList;

                } else {

                    initFactory.optimalvoucherUseList = [];
                }

                var NumberPrice = Number(initFactory.price(initFactory.needCart)) + Number(initFactory.wayPrice())

                $("#payPrice").text("原价￥" + NumberPrice);

                $("#payRealmoney").text("¥" + (initFactory.price(initFactory.needCart) - initFactory.optimalPrice() - initFactory.voucherPrice() + (initFactory.wayPrice())));

                $("#loading").hide();

                /*
                 $.ajax({ //计算最终总价
                 type: 'post',
                 url: "/Areas/XdfB/Handlers/GetTotalPrice.ashx",
                 dataType: 'json',
                 data: submit,
                 success: function (xdf) {
                 SS.setJson("total", xdf);

                 }
                 });
                 */
            }
        });
    },
    delNeedCartStuSheet: function (guid, classcode) {

        var needCart = initFactory.needCart;

        for (var i = 0; i < needCart.length; i++) {

            if (classcode == needCart[i].Code) {

                for (var j = 0; j < needCart[i].stuSheetInfo.length; j++) {

                    var thisstusheet = needCart[i].stuSheetInfo[j];

                    if (guid == thisstusheet.Guid) {

                        needCart[i].stuSheetInfo.splice(j, 1);

                        needCart[i].Count -= 1;

                        LS.setJson("needCart", needCart);

                        return
                    }
                }
            }
        }
    },
    /**
     * 删除学员和班级对应关系
     * @param Guid
     */
    delClassStu: function (Guid) {

        for (var i = 0; i < this.StudentClassInfoList.length; i++) {

            var thisstuclass = this.StudentClassInfoList[i];

            if (Guid == thisstuclass.Guid) {

                this.StudentClassInfoList.splice(i, 1);

                SS.setJson("studentClassInfoList", this.StudentClassInfoList);
            }
        }
    },
    /**
     * 删除学员表单信息
     * @param Guid
     */
    delStudent: function (Guid) {

        for (var i = 0; i < this.StuSheetInfoList.length; i++) {

            var thisstuclass = this.StuSheetInfoList[i];

            if (Guid == thisstuclass.Guid) {

                this.StuSheetInfoList.splice(i, 1);

                SS.setJson("stuSheetInfoList", this.StuSheetInfoList);
            }
        }
    },
    /**
     * 删除按钮操作
     * @param ele
     */
    delStu: function (ele) {

        var $this = $(ele);

        var guid = $this.attr("guid");

        var classcode = $this.attr("classcode");

        var tag = $this.attr("tag");

        this.delClassStu(guid); //删除表单对应关系

        this.delStudent(guid); //删除学员表单

        this.delNeedCartStuSheet(guid, classcode); //删除班级下的表单和班级所报人数

        //删除优惠
        var voucherUseList = SS.getJson("voucherUseList");

        if (voucherUseList != null) {
            for (var i = 0; i < voucherUseList.length; i++) {
                if (classcode == voucherUseList[i].ClassCode && tag == voucherUseList[i].Tag) {
                    voucherUseList.splice(i, 1);
                    break
                }
            }
        }
        SS.setJson("voucherUseList", voucherUseList);
        //删除优惠

        //删除班级下对应的学员信息
        initFactory.delNeedCartStuSheet(classcode, guid);
        //删除班级下对应的学员信息

        //计算优惠
        initFactory.optimalVoucher();
        //$("#payRealmoney").text("¥" + (initFactory.price(LS.getJson("needCart")) - initFactory.voucherPrice()));

        //$this.parent().parent().parent().remove();

        $this.parent().parent().parent().css("height", "180px");

        $this.parent().parent().parent().animate({ "height": "0" }, function () {

            $this = $(this);

            $this.remove();
        }, 2000)
    },
    /**
     * 删除课程下的学员信息
     * @param classcode
     * @param guid
     */
    delNeedCartStuSheet: function (classcode, guid) {
        var need = initFactory.needCart;
        for (var i = 0; i < need.length; i++) {
            if (classcode == need[i].Code) {
                for (var j = 0; j < need[i].stuSheetInfo.length; j++) {
                    var sheetStu = need[i].stuSheetInfo;
                    if (guid == sheetStu[j].Guid) {
                        sheetStu.splice(j, 1);
                        need[i].Count -= 1;
                        LS.setJson("needCart", need);
                    }
                }
            }
        }
    },
    voucherInClassStu: function (tag, classcode) {
        var vouche = this.voucherUseList;
        if (!vouche) return false
        for (var i = 0; i < vouche.length; i++) {
            var thisVouche = vouche[i];
            if (tag == thisVouche.Tag && classcode == thisVouche.ClassCode && thisVouche.VoucherName == "代金券优惠") {
                return thisVouche;
            }
        }
        return false
    },
    delVouche: function (Tag, ClassCode) {
        var voucheList = SS.getJson("voucherUseList");
        for (var i = 0; i < voucheList.length; i++) {
            if (Tag == voucheList[i].Tag && ClassCode == voucheList[i].ClassCode) {
                voucheList.splice(i, 1);
                SS.setJson("voucherUseList", voucheList);
                return
            }
        }
    },
    onDelNeedCartVouche: function (that) {
        /*
         * onclick="initFactory.onDelNeedCartVouche(this)"
         * */
        //老带新不能使用其他优惠券
        if(SS.get("SchoolId") == initFactory.isLaodaxin.schoolID  && initFactory.sources == initFactory.isLaodaxin.souse && initFactory.laodaxinLsuid >0){
            if (event && event.preventDefault)
            //阻止默认浏览器动作(W3C)
                event.preventDefault();
            else
            //IE中阻止函数器默认动作的方式
                window.event.returnValue = false;
            return false
        }else if (SS.get("SchoolId") == "4" && initFactory.sources == 'laodaixin-wh' && initFactory.laodaxinLsuid > 0) {
            if (event && event.preventDefault)
            //阻止默认浏览器动作(W3C)
                event.preventDefault();
            else
            //IE中阻止函数器默认动作的方式
                window.event.returnValue = false;
            return false
        }

        var $this = $(that);
        var tag = $this.attr("tag");
        var code = $this.attr("code");
        initFactory.delNeedCartVouche(code, tag);
        //initFactory.delVouche(tag,code);
    },
    delNeedCartVouche: function (classCode, studentName) {
        var needCart = initFactory.needCart;
        for (var i = 0; i < needCart.length; i++) {
            if (needCart[i].Code == classCode) {
                var studentList = needCart[i].stuSheetInfo;
                for (var j = 0; j < studentList.length; j++) {
                    if (studentName == studentList[j].Name) {
                        studentList[j].VoucherName = "未使用优惠";
                        studentList[j].VoucherValue = 0;
                        studentList.splice(j, 1);
                        return
                    }
                }
            }
        }
    },
    voucherPrice: function () {
        var vouche = SS.getJson("voucherUseList");
        var total = 0;
        if (!vouche) {
            return 0
        }
        for (var i = 0; i < vouche.length; i++) {
            total += vouche[i].Fees;
        }
        return total;
    },
    wayPrice: function () {
        if (!initFactory.wayList) {
            return 0
        }
        for (var i = 0; i < initFactory.wayList.length; i++) {
            if (initFactory.wayList[i].Checked == true) {
                return initFactory.wayList[i].dPrice
            }
        }
        return 0
    },
    optimalPrice: function () {
        var total = 0;
        for (var i = 0; i < initFactory.optimalvoucherUseList.length; i++) {
            total += initFactory.optimalvoucherUseList[i].Fees;
        }
        return total;
    },
    price: function (data) {
        var total = 0;
        $.each(data, function (i, n) {
            total += n.Price * n.Count;
        })
        return total;
    },
    shoopingSubmit: function (e) {
        $("#loading").show();
        e.preventDefault();

        //验证每个班级是否都已经添加了班级
        var Cart = initFactory.needCart;
        for (var i = 0; i < Cart.length; i++) {
            if (Cart[i].stuSheetInfo.length < 1) {
                message("订单提交失败", Cart[i].Code + "还没有添加学员");
                $("#loading").hide();
                return
            }
        }
        //验证每个班级是否都已经添加了班级

        //验证是否选择了配送方式
        var wayList = SS.getJson("wayList");
        var wayListSelect = false;
        var lengthWay = wayList ? wayList.length : 0;
        for (var i = 0; i < lengthWay; i++) {
            var thisWayList = wayList[i];
            if (thisWayList.Checked == true) {
                if (thisWayList.bIsReceiveOwn == true) {
                    wayListSelect = true;
                    break
                } else if (initFactory.findaddressInfoListSelect()) {
                    wayListSelect = true;
                    break;

                } else {
                    message("订单提交失败", "请添加配送地址");
                    $("#loading").hide();
                    return
                }
            }
        }
        if (wayListSelect == false) {
            message("订单提交失败", "请选择配送方式或地址");
            $("#loading").hide();
            return;
        } else {

        }
        //验证是否选择了配送方式
        //获取表单信息

        //优惠
        var voucherUseList = SS.getJson("voucherUseList");
        if (voucherUseList == null) {
            voucherUseList = [];
        } else {
            voucherUseList = voucherUseList.filter(function (value, i) {
                return value.TypeId == 2; //只传check中的 slj 20150821 只剩余优惠券
            });
        }
        var needCart = initFactory.needCart;
        if (initFactory.optimalvoucherUseList.length > 0) {
            for (var i in initFactory.optimalvoucherUseList) {
                for (var j in needCart) {
                    if (needCart[j].Code == initFactory.optimalvoucherUseList[i].ClassCode) {
                        for (var k in needCart[j].stuSheetInfo) {
                            if (needCart[j].stuSheetInfo[k].Name == initFactory.optimalvoucherUseList[i].Tag) {
                                needCart[j].stuSheetInfo[k].VoucherClassName = initFactory.optimalvoucherUseList[i].VoucherName;
                                needCart[j].stuSheetInfo[k].VoucherClassValue = initFactory.optimalvoucherUseList[i].Fees;
                                var voucherUse = {
                                    "Tag": initFactory.optimalvoucherUseList[i].Tag,
                                    "ClassCode": initFactory.optimalvoucherUseList[i].ClassCode,
                                    "VoucherCode": initFactory.optimalvoucherUseList[i].VoucherCode,
                                    "VoucherName": initFactory.optimalvoucherUseList[i].VoucherName,
                                    "TypeId": initFactory.optimalvoucherUseList[i].TypeId,
                                    "Fees": initFactory.optimalvoucherUseList[i].Fees
                                };
                                voucherUseList.push(voucherUse);
                            }
                        }
                    }
                }
            }
        }
        SS.setJson("voucherUseList", voucherUseList);
        LS.setJson("needCart", needCart);

        //

        var checkedProductList = initFactory.needCart;

        var orderInfo = {};

        orderInfo.invoice = $("#invoice").val();

        orderInfo.agentName = $("#agentName").val();

        orderInfo.agentPhone = $("#agentPhone").val();

        orderInfo.memo = $("#memo").val();

        orderInfo.productList = JSON.stringify(checkedProductList);

        orderInfo.SchoolId = checkedProductList[0].SchoolId;

        //需要提交的详细表单信息
        orderInfo.stuSheetInfoList = SS.get("stuSheetInfoList");

        orderInfo.studentClassInfoList = SS.get("studentClassInfoList");

        orderInfo.voucherUseList = SS.get("voucherUseList");

        orderInfo.addressInfoList = SS.get("addressInfoList");

        orderInfo.appId = $.cookie("appId");

        if (orderInfo.addressInfoList == null) {

            orderInfo.addressInfoList = "[]";
        }

        orderInfo.wayList = SS.get("wayList");
        //orderInfo.appId=SS.getJson("appId");

        orderInfo.commonStudentInfoList = SS.get("CommonStudentInfo") ? SS.get("CommonStudentInfo") : [];


        $.ajax({ //最终提交订单
            type: 'post',
            url: "/Areas/XdfB/Handlers/addOrderHandler.ashx",
            dataType: 'json',
            data: orderInfo,
            success: function (xdf) {

                if (xdf != null && xdf != "" && xdf.state == 1) {

                    if (xdf.toPay == 0) {

                        $("#loading").hide();

                        JSON.parse(orderInfo.productList).forEach(function (data) {

                            window.cart.product.deleteFromCart(data.Code);
                        });

                        window.location.href = "/Pay/Success?Id=" + xdf.payOrderId;
                        //删除cookie数据
                    }
                    else {
                        $("#loading").hide();

                        //删除cookie数据
                        JSON.parse(orderInfo.productList).forEach(function (data) {

                            window.cart.product.deleteFromCart(data.Code);
                        });
                        window.location.href = "/OPXdf/Pay/PayMode?PayOrderId=" + xdf.payOrderId;
                    }

                    return 0;

                } else {

                    message("订单确认失败", xdf.error);

                    $("#loading").hide();
                }
            }
        });
    }
};
//页面初始化
~function () {
    var query = location.href;

    var classInfo = query.myQueryURLParameter();

    var cart = LS.getJson("Cart");

    // var needCart = LS.getJson("needCart");//appId

    var needCart = initFactory.cartInitByCart(cart);

    initFactory.needCart = needCart;

    initFactory.StuSheetInfoList = SS.getJson("stuSheetInfoList") != null ? SS.getJson("stuSheetInfoList") : [];

    initFactory.StudentClassInfoList = SS.getJson("studentClassInfoList") != null ? SS.getJson("studentClassInfoList") : [];

    initFactory.voucherUseList = SS.getJson("voucherUseList");

    var isLaodaxin=initFactory.findLdxSchoolAndSurse(Number($.cookie('ldx_schoolid')));

    initFactory.isLaodaxin.schoolID=isLaodaxin.schoolID;
    initFactory.isLaodaxin.souse=isLaodaxin.souse;
    function initPage() {
        //用缓存数据初始化页面
        initFactory.classInit(needCart);

        //初始化cookie数据。搜客的
        window.cart.product.mobileInit();

        var NumberPrice = Number(initFactory.price(LS.getJson("needCart"))) + Number(initFactory.wayPrice())

        $("#payPrice").text("原价￥" + NumberPrice);

        $("#payRealmoney").text("¥" + (initFactory.price(LS.getJson("needCart")) - initFactory.voucherPrice()));

        initFactory.optimalVoucher(); //调取优惠

        initFactory.wayListInit(); //初始化配送方式
        if(initFactory.needCart[0].SchoolId==1){
            $("#address").css({
                display:"none"
            })
        }

        SS.set("SchoolId", initFactory.needCart[0].SchoolId);
    }
    if (needCart.length > 0) {//如果url没有传参数，那么就走缓存

        //第一次进来没有选择任何学员的时候。每个班级自动带出常用学员的第一个学员。由于购物车链接着校代，有特殊的优惠券处理，所以校代不自动带出学员
        if (initFactory.sources !== "xiaodai" && initFactory.laodaxinLsuid <0 && initFactory.sources !== "laodaixin-wh" && initFactory.StuSheetInfoList.length < 1 && !SS.getJson("Xdf.isMarketingSources")) {

            //$.cookie('Xdf.MarketingSources', "", { path: "/", domain: "xdf.cn" });//这cookie不能清空。。  记录信息来源要用到。。
            SS.setJson("Xdf.isMarketingSources", true);


            //拉取常用学员信息
            $("#loading").show();
            $.ajax({
                type: 'post',
                url: "/Areas/OPXdf/Handlers/GetStuBySchool.ashx", /*"/Areas/XdfB/Handlers/getCommonStudentInfoHandler.ashx",*/
                dataType: 'json',
                data: { schoolId: SS.getJson("SchoolId") },
                success: function (xdf) {
                    $("#loading").hide();
                    //$("#order_loading").hide();
                    xdf = xdf.studentInfo;

                    handleCommonStudent.CommonStudentInfo = xdf;

                    if (xdf == null || xdf == "") {
                        initPage();
                    } else {
                        //给每个班级增加学员
                        for (var i = 0; i < needCart.length; i++) {

                            var studentInfo = xdf[0];

                            var studentClass = handleCommonStudent.newStudentClassInfo(studentInfo);

                            studentClass.ClassCode = needCart[i].Code;

                            var sheet = handleCommonStudent.newStuSheetInfo(studentClass.Guid, studentInfo);

                            handleCommonStudent.newStudentClassInfoList.push(studentClass);

                            handleCommonStudent.newStuSheetInfoList.push(sheet);


                        }

                        //缓存到h5本地缓存
                        SS.setJson("studentClassInfoList", handleCommonStudent.newStudentClassInfoList);

                        SS.setJson("stuSheetInfoList", handleCommonStudent.newStuSheetInfoList);

                        //从新读取数据
                        initFactory.StuSheetInfoList = SS.getJson("stuSheetInfoList");

                        initFactory.StudentClassInfoList = SS.getJson("studentClassInfoList");

                        //渲染页面
                        initPage();

                    }
                }
            });
        }  //除武汉的其他学校新东方老带新活动
        else if (SS.get("SchoolId") == isLaodaxin.schoolID && initFactory.StuSheetInfoList.length < 1 && initFactory.sources == isLaodaxin.souse && initFactory.laodaxinLsuid >0) {
            var ldxStuInfo = $.cookie('ldxStudentInfo');
            if (ldxStuInfo == undefined || ldxStuInfo == null) {

            } else {
                var ldxStuInfo = ldxStuInfo.split('_');
                var ldxStuInfoObj = {
                    Name: ldxStuInfo[1],
                    sStudentCode: '',
                    Mobile: ldxStuInfo[2],
                    Gender: ldxStuInfo[3],
                    Email: "",
                    IdCard: "123456",
                    voucher: ldxStuInfo[4]

                }
                for (var i = 0; i < needCart.length; i++) {

                    var studentInfo = ldxStuInfoObj;

                    var studentClass = handleCommonStudent.newStudentClassInfo(studentInfo);

                    studentClass.ClassCode = needCart[i].Code;

                    var sheet = handleCommonStudent.newStuSheetInfo(studentClass.Guid, studentInfo);

                    handleCommonStudent.newStudentClassInfoList.push(studentClass);

                    handleCommonStudent.newStuSheetInfoList.push(sheet);


                }

                //缓存到h5本地缓存
                SS.setJson("studentClassInfoList", handleCommonStudent.newStudentClassInfoList);

                SS.setJson("stuSheetInfoList", handleCommonStudent.newStuSheetInfoList);

                //从新读取数据
                initFactory.StuSheetInfoList = SS.getJson("stuSheetInfoList");

                initFactory.StudentClassInfoList = SS.getJson("studentClassInfoList");



                //调取优惠

                var voucherUseList = initFactory.voucherUseList;
                if (voucherUseList == null) {
                    voucherUseList = [];
                }


                var tickietInfoList = [];

                for (var i = 0; i < needCart.length; i++) {
                    var ticketInfo = {
                        ClassCode: needCart[i].Code,
                        SchoolId: SS.get("SchoolId"),
                        TicketCode: ldxStuInfoObj.voucher
                    };
                    tickietInfoList.push(ticketInfo)

                }


                var stuSheetInfoList = [];
                stuSheetInfoList[0] = initFactory.StuSheetInfoList[0];


                var tickietInfoListCount = 0;
                function getVoucherOfTicket() {
                    $("#loading").show();
                    $.ajax({
                        type: 'post',
                        url: '/Areas/XdfB/Handlers/getVoucherOfTicketBySomeStudentHandler.ashx',
                        dataType: 'json',
                        data: {
                            "ticketInfo": JSON.stringify(tickietInfoList[tickietInfoListCount]),
                            "stuSheetInfoList": JSON.stringify(stuSheetInfoList),
                            "AgentType": "1"
                        },
                        success: function (xdf) {
                            if (!(xdf != null && xdf != "" && xdf.length > 0)) {
                                ++tickietInfoListCount
                                if (tickietInfoListCount < tickietInfoList.length) {
                                    getVoucherOfTicket();
                                } else {
                                    $("#loading").hide();
                                    //渲染页面
                                    initPage();

                                }
                                return
                            } else {
                                xdf = xdf[0];
                                //循环当前班级的所有学员，添加优惠券优惠，如果已经添加过优惠卷就更新，没有的话就新增优惠券信息。缓存到本次存储上。在上一个页面使用
                                if (xdf != null && xdf != "" && !xdf.HasErrorInfo && xdf.VoucherTicketPrice > 0) {

                                    //var item = initFactory.StuSheetInfoList[i];
                                    //var StudentClassInfo = initFactory.findClassSheetInfoByGuid(item.Guid);
                                    var isSave = initFactory.findVoucheIsSave(initFactory.StuSheetInfoList[0], tickietInfoList[tickietInfoListCount].ClassCode);
                                    if (isSave) {
                                        isSave.Tag = initFactory.StuSheetInfoList[0].Name;
                                        isSave.ClassCode = tickietInfoList[tickietInfoListCount].ClassCode;
                                        isSave.VoucherCode = xdf.VoucherCode; //ticketInfo.TicketCode;
                                        isSave.VoucherName = "代金券优惠";
                                        isSave.TypeId = 2;
                                        isSave.Fees = xdf.VoucherTicketPrice;
                                        isSave = null;
                                    } else {

                                        var VoucherUseInfo = {};
                                        VoucherUseInfo.Tag = initFactory.StuSheetInfoList[0].Name;
                                        VoucherUseInfo.ClassCode = tickietInfoList[tickietInfoListCount].ClassCode;
                                        VoucherUseInfo.VoucherCode = xdf.VoucherCode; //ticketInfo.TicketCode;
                                        VoucherUseInfo.VoucherName = "代金券优惠";
                                        VoucherUseInfo.TypeId = 2;
                                        VoucherUseInfo.Fees = xdf.VoucherTicketPrice;

                                        voucherUseList.push(VoucherUseInfo);
                                    }


                                    SS.setJson("voucherUseList", voucherUseList);
                                    initFactory.voucherUseList = SS.getJson("voucherUseList");

                                } else {



                                }
                                ++tickietInfoListCount
                                if (tickietInfoListCount < tickietInfoList.length) {
                                    getVoucherOfTicket();
                                } else {
                                    $("#loading").hide();
                                    //渲染页面
                                    initPage();

                                }
                            }




                        },
                        error: function (err) {

                            //渲染页面
                            initPage();
                            $("#loading").hide();

                        }
                    });


                }

                getVoucherOfTicket();

                //





            }







        }
        //武汉新东方老带新活动
        else if (SS.get("SchoolId") == "4" && initFactory.StuSheetInfoList.length < 1 && initFactory.sources == 'laodaixin-wh' && initFactory.laodaxinLsuid >0) {
            var ldxStuInfo = $.cookie('ldxStudentInfo');
            if (ldxStuInfo == undefined || ldxStuInfo == null) {

            } else {
                var ldxStuInfo = ldxStuInfo.split('_');
                var ldxStuInfoObj = {
                    Name: ldxStuInfo[1],
                    sStudentCode: '',
                    Mobile: ldxStuInfo[2],
                    Gender: ldxStuInfo[3],
                    Email: "",
                    IdCard: "123456",
                    voucher: ldxStuInfo[4]

                }
                for (var i = 0; i < needCart.length; i++) {

                    var studentInfo = ldxStuInfoObj;

                    var studentClass = handleCommonStudent.newStudentClassInfo(studentInfo);

                    studentClass.ClassCode = needCart[i].Code;

                    var sheet = handleCommonStudent.newStuSheetInfo(studentClass.Guid, studentInfo);

                    handleCommonStudent.newStudentClassInfoList.push(studentClass);

                    handleCommonStudent.newStuSheetInfoList.push(sheet);


                }

                //缓存到h5本地缓存
                SS.setJson("studentClassInfoList", handleCommonStudent.newStudentClassInfoList);

                SS.setJson("stuSheetInfoList", handleCommonStudent.newStuSheetInfoList);

                //从新读取数据
                initFactory.StuSheetInfoList = SS.getJson("stuSheetInfoList");

                initFactory.StudentClassInfoList = SS.getJson("studentClassInfoList");



                //调取优惠

                var voucherUseList = initFactory.voucherUseList;
                if (voucherUseList == null) {
                    voucherUseList = [];
                }


                var tickietInfoList = [];

                for (var i = 0; i < needCart.length; i++) {
                    var ticketInfo = {
                        ClassCode: needCart[i].Code,
                        SchoolId: SS.get("SchoolId"),
                        TicketCode: ldxStuInfoObj.voucher
                    };
                    tickietInfoList.push(ticketInfo)

                }


                var stuSheetInfoList = [];
                stuSheetInfoList[0] = initFactory.StuSheetInfoList[0];


                var tickietInfoListCount = 0;
                function getVoucherOfTicket() {
                    $("#loading").show();
                    $.ajax({
                        type: 'post',
                        url: '/Areas/XdfB/Handlers/getVoucherOfTicketBySomeStudentHandler.ashx',
                        dataType: 'json',
                        data: {
                            "ticketInfo": JSON.stringify(tickietInfoList[tickietInfoListCount]),
                            "stuSheetInfoList": JSON.stringify(stuSheetInfoList),
                            "AgentType": "1"
                        },
                        success: function (xdf) {
                            if (!(xdf != null && xdf != "" && xdf.length > 0)) {
                                ++tickietInfoListCount
                                if (tickietInfoListCount < tickietInfoList.length) {
                                    getVoucherOfTicket();
                                } else {
                                    $("#loading").hide();
                                    //渲染页面
                                    initPage();

                                }
                                return
                            } else {
                                xdf = xdf[0];
                                //循环当前班级的所有学员，添加优惠券优惠，如果已经添加过优惠卷就更新，没有的话就新增优惠券信息。缓存到本次存储上。在上一个页面使用
                                if (xdf != null && xdf != "" && !xdf.HasErrorInfo && xdf.VoucherTicketPrice > 0) {

                                    //var item = initFactory.StuSheetInfoList[i];
                                    //var StudentClassInfo = initFactory.findClassSheetInfoByGuid(item.Guid);
                                    var isSave = initFactory.findVoucheIsSave(initFactory.StuSheetInfoList[0], tickietInfoList[tickietInfoListCount].ClassCode);
                                    if (isSave) {
                                        isSave.Tag = initFactory.StuSheetInfoList[0].Name;
                                        isSave.ClassCode = tickietInfoList[tickietInfoListCount].ClassCode;
                                        isSave.VoucherCode = xdf.VoucherCode; //ticketInfo.TicketCode;
                                        isSave.VoucherName = "代金券优惠";
                                        isSave.TypeId = 2;
                                        isSave.Fees = xdf.VoucherTicketPrice;
                                        isSave = null;
                                    } else {

                                        var VoucherUseInfo = {};
                                        VoucherUseInfo.Tag = initFactory.StuSheetInfoList[0].Name;
                                        VoucherUseInfo.ClassCode = tickietInfoList[tickietInfoListCount].ClassCode;
                                        VoucherUseInfo.VoucherCode = xdf.VoucherCode; //ticketInfo.TicketCode;
                                        VoucherUseInfo.VoucherName = "代金券优惠";
                                        VoucherUseInfo.TypeId = 2;
                                        VoucherUseInfo.Fees = xdf.VoucherTicketPrice;

                                        voucherUseList.push(VoucherUseInfo);
                                    }


                                    SS.setJson("voucherUseList", voucherUseList);
                                    initFactory.voucherUseList = SS.getJson("voucherUseList");

                                } else {



                                }
                                ++tickietInfoListCount
                                if (tickietInfoListCount < tickietInfoList.length) {
                                    getVoucherOfTicket();
                                } else {
                                    $("#loading").hide();
                                    //渲染页面
                                    initPage();

                                }
                            }




                        },
                        error: function (err) {

                            //渲染页面
                            initPage();
                            $("#loading").hide();

                        }
                    });


                }

                getVoucherOfTicket();

                //





            }







        } else {
            //是校代和已经选择学员的时候直接渲染页面
            initPage();
        }


        //        if (SS.get("SchoolId") == "1") {
        //            $(".head_line").css('display', 'none');
        //            $("#address,#invoices").css('display', 'none');
        //            $("#bj_address_mess").css('display', 'block');
        //        }



    } else {
        message("订单提交失败", "还没有添加课程");
    }

    /* if (!classInfo.classcode) {//如果url没有传参数，那么就走缓存
     initFactory.classInit(needCart);//用缓存数据初始化页面
     var NumberPrice=Number(initFactory.price(LS.getJson("needCart")))+Number(initFactory.wayPrice())
     $("#payPrice").text("原价￥" +NumberPrice );
     $("#payRealmoney").text("¥" + (initFactory.price(LS.getJson("needCart")) - initFactory.voucherPrice()));
     initFactory.optimalVoucher(); //调取优惠
     initFactory.wayListInit();//初始化配送方式
     }*/
    /*
     else {//如果有rul参数，调取课程扩展信息，从新初始化页面
     $("#order_loading").show();
     LS.clear();//清除缓存数据
     SS.clear();//
     SS.setJson("appId",classInfo.appId);
     $.ajax({
     type: 'post',
     url: "/Areas/XdfB/Handlers/getCartExtendInfoHandler.ashx",
     dataType: 'json',
     asycn: false,
     data: {
     "productList": '[{"Code":"' + classInfo.classcode + '","SchoolId":' + classInfo.schoolid + ',"SchoolName": "����","Source": "Mվ","Count": 1}]'
     },
     success: function (xdf) {
     $("#order_loading").hide().remove();
     LS.setJson("needCart", xdf);//缓存商品详情数据
     initFactory.classInit(xdf);//初始化页面
     // initFactory.studentInClass(initFactory.StudentClassInfoList,initFactory.StuSheetInfoList)
     //计算价格
     var NumberPrice=Number(initFactory.price(LS.getJson("needCart")))+Number(initFactory.wayPrice())
     var NumberPrice=Number(initFactory.price(LS.getJson("needCart")))+Number(initFactory.wayPrice())
     $("#payPrice").text("原价￥" +NumberPrice );
     $("#payRealmoney").text("¥" + (initFactory.price(LS.getJson("needCart")) - initFactory.voucherPrice() + (initFactory.wayPrice())))
     var objJson = xdf[0];
     SS.set("SchoolId", objJson.SchoolId);
     initFactory.optimalVoucher();//调取优惠
     initFactory.wayListInit();//初始化配送方式
     }
     });
     }
     */
    $("#submit").click(function (e) {
        initFactory.shoopingSubmit(e);
    });

    $("#invoice").change(function (that) {
        var $this = $(this);
        var val = $this.val();
        SS.setJson("invoice", val);
    })
} ();




