var toolbar = (function ($) {
    var animationStart = function () {

        //配置动画
        if(Global.animation.length>0){
            animationConfig.init(JSON.parse(Global.animation));
        }
        $("#homebjimg").css({
            display:"none"
        })
        $(".anistage").css({
            display:"block"
        });
        $('.warp').removeClass('a').css('background','');

        animationConfig.first.animationProject.init(headPortraitList);
    };


    return {
        init: function () {
            $("#shakeShake").css({
                display:"none"
            })
            //活动主页选项卡
            $("#activeHomePageOption").on('click', animationConfig.temporary);
            $("#activeHomePageOption").on('click', logoAnimations.leave);
            $("#activeHomePageOption").on('click', messageWallAni.leave);
            $("#activeHomePageOption").on('click', function () {
                $("#homebjimg").css({
                    display:"block"
                })
                $("#leavelotterys").trigger('click');
            });
        /*    //临时将
            $("#temporary").on('click', animationConfig.temporary);
            $("#temporary").on('click', logoAnimations.leave);
*/
            //3D动画
            $("#signForAnimation").on('click', animationConfig.temporary);
            $("#signForAnimation").on('click', animationStart);
            $("#signForAnimation").on('click', logoAnimations.leave);
            $("#signForAnimation").on('click', messageWallAni.leave);
            $("#signForAnimation").on('click', function () {
                $("#leavelotterys").trigger('click');
            });

            //抽奖
            $("#luckDraw").on('click', animationConfig.temporary);
            $("#luckDraw").on('click', logoAnimations.leave);
            $("#luckDraw").on('click', messageWallAni.leave);

            //摇一摇
            $("#shakeShake").on('click', animationConfig.temporary);
            $("#shakeShake").on('click', logoAnimations.leave);
            $("#shakeShake").on('click', messageWallAni.leave);
            $("#shakeShake").on('click', function () {

                $("#leavelotterys").trigger('click');
                $('.warp').removeClass('a').css('background','');
            });
            //logoanimition
            $("#logoanimition").on('click',animationConfig.temporary);
            $("#logoanimition").on('click',logoAnimations.init);
            $("#logoanimition").on('click',messageWallAni.leave);
            $("#logoanimition").on('click', function () {
                $("#leavelotterys").trigger('click');
            });

            //消息上墙
            $("#messageWallTsk").on('click',animationConfig.temporary);
            $("#messageWallTsk").on('click',logoAnimations.leave);
            $("#messageWallTsk").on('click',messageWallAni.init);
            $("#messageWallTsk").on('click', function () {
                $("#leavelotterys").trigger('click');
            });

            //全屏
            $('#fullScreen').attr('isfullscreen', 'false');
            function requestFullScreen(element) {
                var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
                if (requestMethod) {
                    requestMethod.call(element);
                } else if (typeof window.ActiveXObject !== "undefined") {
                    var wscript = new ActiveXObject("WScript.Shell");
                    if (wscript !== null) {
                        wscript.SendKeys("{F11}");
                    }
                }
            }


            $('#fullScreen').on('click', function () {
                var isfull = $(this).attr('isfullscreen');
                requestFullScreen(document.getElementsByTagName('html')[0]);
            });

            //静音操作
            $(document).ready(function (w) {
                $(".kai").click(function () {
                    var bgm = document.getElementById('bgMusic');
                    $(this).hide();
                    $(".guan").show();
                    bgm.pause();
                });
            });
            $(document).ready(function (a) {
                $(".guan").click(function () {
                    var bgm = document.getElementById('bgMusic');

                    bgm.play();
                    $(this).hide();
                    $(".kai").show();
                });
            });

            //底部工具栏，浮出和隐藏
            $(".footer").mouseout ( function(e) {
                e = window.event || e;
                var s = e.toElement || e.relatedTarget;
                if(document.all) {
                    if (!this.contains(s)) {
                        console.log('IE will out');
                    }
                } else {
                    var reg = this.compareDocumentPosition(s);
                    if (!(reg == 20 || reg == 0)) {
                        $(".footer").css({
                            bottom:"-117px"
                        });
                    }
                }
            })
            $(".footer").mouseover ( function(e) {
                e = window.event || e;
                var s = e.toElement || e.relatedTarget;
                if(document.all) {
                    if (!this.contains(s)) {
                        console.log('IE will out');
                    }
                } else {
                    var reg = this.compareDocumentPosition(s);
                    $(".footer").css({
                        bottom:"0"
                    });
                    /*if (!(reg == 20 || reg == 0)) {
                        $(".footer").css({
                            bottom:"0"
                        });
                    }*/
                }
            })
        }
    }
})(jQuery);