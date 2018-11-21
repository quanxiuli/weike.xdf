var messageWallAni = {
    isload: false,
    isZmd: false,
    zmdTime: null,
    loadTime: null,
    init: function (data) {
        // var aniTime=null;
        messageWallAni.isload = true;
        //var absTop=0;
        $(".ChatWindowBoxTC").css({display: "block"});
        $(".BoxFixed").css({display: "block"});
        function rnd(n, m) {
            var random = Math.floor(Math.random() * (m - n + 1) + n);
            return random;
        }

        function appendHtml(data) {
            $(".msgItemBox").children().remove();
            for (var j = 0; j < data.length; j++) {
                var obj1 = data[j];
                var htmlText = `
                            <div class="mesitem">
                                <div class="ImgL">
                                    <img src="${obj1.headimgurl}" alt=""/>
                                </div>
                                <div class="ImgR">
                                    <p class="ImgRp1">${obj1.name}：</p>
                                    <p class="ImgRp2" style="font-size: ${obj1.content.length <= 15 ? "60px" : "42px"}">${obj1.content}</p>
                                </div>
                            </div>`
                $(".msgItemBox").append(htmlText)
            }
        }

        function getMessage() {
            if (!messageWallAni.isload) {
                return
            }
            $.ajax({
                url: "/activity/ajax_bigwallmsglist",
                method: "GET",
                dataType: "json",
                data: {
                    id: Global.id,
                    lasttime: Global.messageTimeStamp,
                    limit: "30"
                },
                success: function (data) {

                    /*Math.floor(new Date().getTime()/1000)*/
                    clearTimeout(messageWallAni.zmdTime);
                    if (data.errno == 0) {


                        if (data.data.length > 0) {
                            Global.messageTimeStamp = data.data[0].updateTime;
                            Global.newMessageWallList = [];

                            if (data.data.length > Math.floor(30 / Global.rollInterval)) {
                                for (var j = 0; j < data.data.length; j++) {
                                    var obj1 = data.data[j];
                                    Global.messageWallList.push(obj1);
                                    Global.newMessageWallList.push(obj1);


                                }
                                appendHtml(Global.newMessageWallList);
                            } else {
                                Global.newMessageWallList = data.data;
                                if(Global.messageWallList.length>0){
                                    var len = Math.floor(30 / Global.rollInterval) - data.data.length;
                                    for (var i = 0; i < len; i++) {
                                        var obj = Global.messageWallList[i];
                                        Global.newMessageWallList.push(obj)
                                    }
                                }else {
                                    for (var i = 0; i < Global.newMessageWallList.length; i++) {
                                        var obj = Global.newMessageWallList[i];
                                        Global.messageWallList.push(obj)
                                    }
                                }

                                appendHtml(Global.newMessageWallList);
                            }


                        } else {
                            //Global.newMessageWallList=Global.messageWallList.slice(Math.round(Global.messageWallList.length/2))
                            Global.newMessageWallList = [];
                         if(Global.messageWallList.length>0){
                             for (var m = 0; m < Math.floor(30 / Global.rollInterval); m++) {
                                 var obj2 = Global.messageWallList[rnd(0, Global.messageWallList.length - 1)];
                                 Global.newMessageWallList.push(obj2)
                             }
                         }else{
                             for (var i = 0; i < Global.newMessageWallList.length; i++) {
                                 var obj = Global.newMessageWallList[i];
                                 Global.messageWallList.push(obj)
                             }
                         }

                            appendHtml(Global.newMessageWallList);
                        }

                        if (true) {


                            $(".msgItemBox").css("top", 0);
                            //var  absTop=parseFloat($(".msgItemBox").css("top"));
                            animateTop(0);
                            // messageWallAni.isZmd=true
                        }
                        if (messageWallAni.isload) {
                            messageWallAni.loadTime = window.setTimeout(function () {
                                getMessage();
                            }, 30 * 1000)
                        }


                    } else {
                        Global.newMessageWallList = [];
                        if(Global.messageWallList.length>0){
                            for (var m = 0; m < Math.floor(30 / Global.rollInterval); m++) {
                                var obj2 = Global.messageWallList[rnd(0, Global.messageWallList.length - 1)];
                                Global.newMessageWallList.push(obj2)
                            }
                        }
                        appendHtml(Global.newMessageWallList);
                    }


                },
                error: function (data) {
                    Global.newMessageWallList = [];
                    if(Global.messageWallList.length>0){
                        for (var m = 0; m < Math.floor(30 / Global.rollInterval); m++) {
                            var obj2 = Global.messageWallList[rnd(0, Global.messageWallList.length - 1)];
                            Global.newMessageWallList.push(obj2)
                        }
                    }
                    appendHtml(Global.newMessageWallList);
                }

            })
        }

        function animateTop(absTop) {
            clearTimeout(messageWallAni.zmdTime);
            messageWallAni.zmdTime = window.setTimeout(function () {
                var msgNoteHeight = $(".msgItemBox").height();
                var topScoll = Math.abs(absTop);
                var SurplusHeight = msgNoteHeight - topScoll;
                if (SurplusHeight <= 186 * 5) {
                    for (var j = 0; j < Global.newMessageWallList.length; j++) {
                        var obj1 = Global.newMessageWallList[j];
                        var htmlText = `
                            <div class="mesitem">
                                <div class="ImgL">
                                    <img src="${obj1.headimgurl}" alt=""/>
                                </div>
                                <div class="ImgR">
                                    <p class="ImgRp1">${obj1.name}：</p>
                                    <p class="ImgRp2" style="font-size: ${obj1.content.length <= 15 ? "60px" : "42px"}">${obj1.content}</p>
                                </div>
                            </div>`
                        $(".msgItemBox").append(htmlText)
                    }
                }

                if ($(".msgItemBox")) {
                }
                $(".msgItemBox").animate({top: -(Math.abs(absTop) + 186)}, 300, function () {

                    var absTop = parseFloat($(".msgItemBox").css("top"));

                    animateTop(absTop)


                })
            }, Global.rollInterval * 1000)

        }

        messageWallAni.getMessage = getMessage;
        messageWallAni.animateTop = animateTop;

        function qrCodeIsShow() {
            if (messageWallAni.isload) {
                window.setTimeout(function () {
                    $(".ChatWindowBoxTC").css({display: "block"});
                    clearTimeout(messageWallAni.zmdTime);
                    clearTimeout(messageWallAni.loadTime);

                    window.setTimeout(function () {
                        $(".ChatWindowBoxTC").css({display: "none"});
                        var absTop = parseFloat($(".msgItemBox").css("top"));

                        animateTop(absTop);
                        getMessage();
                        qrCodeIsShow();
                    }, 60000)

                }, 300000)
            } else {
                return
            }

        }

        /*window.setTimeout(function () {
         $(".ChatWindowBoxTC").css({display:"none"});


         getMessage();
         //qrCodeIsShow();
         },60000);*/
    },

    //离开当前消息上墙展示
    leave: function () {
        $(".ChatWindowBoxTC").css({display: "none"});
        $(".BoxFixed").css({display: "none"});
        messageWallAni.isload = false;
        messageWallAni.isZmd = false;
        clearTimeout(messageWallAni.zmdTime);
        clearTimeout(messageWallAni.loadTime);

    }
};



