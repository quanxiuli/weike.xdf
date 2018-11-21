var imgdatas = [];

$(document).ready(function () {
    //绑定背景音乐
    $("#bgMusic").attr({
        src:Global.music
    });

    $("#homebjimg").attr({
        src:Global.background
    });


$(".ChatWindowBoxUp p img,.ChatWindowBoxTC img").attr({
    src:Global.qrcode
});
    $(".messageTitleImg").html(`
   ${Global.title}<span><img  src="${Global.qrcode}" alt=""></span>
`)
    //绑定工具栏事件
    toolbar.init();
    //配置动画
    if(Global.animation.length>0){
        animationConfig.init(JSON.parse(Global.animation));
    }


    //单张轮播动画监听
    function fr() {
        var easeinEle = $('.ease-in');
        var signSlid = $('.signSlid');
        var index = Number(signSlid.children('img').attr('index'));
        if (index == headPortraitList.data.length ) {
            index = 0
        }
        signSlid.children('img').attr({
            src: headPortraitList.data[index].avatar,
            index: ++index
        });
        var currentPosition = easeinEle.attr('currentPosition');
        if (currentPosition == 1) {

            signSlid.css(
                {
                    animation: "rotateEarth3 3s linear 1"
                }
            );

            easeinEle.attr('currentPosition', 2);
        } else if (currentPosition == 2) {

            signSlid.css(
                {
                    animation: "rotateEarth4 3s linear 1"
                }
            );

            easeinEle.attr('currentPosition', 3);
        }
        else if (currentPosition == 3) {

            signSlid.css(
                {
                    animation: "rotateEarth5 3s linear 1"
                }
            );

            easeinEle.attr('currentPosition', 4);
        } else {
            easeinEle.attr('currentPosition', 1);


            signSlid.css(
                {
                    animation: "rotateEarth2 3s linear 1"
                }
            );
        }


    }

    $('.ease-in-ron').on('webkitAnimationEnd', function () {
        fr();

    });

    //回车抽奖事件
    var enterCodeCallback = function (e) {
        var code = e.charCode || e.keyCode;
        if (code == 13) {
            //$(".begin").trigger('click');
            resultlotterys.startlottery();

        }else if(e.ctrlKey&&code == 76){//L快捷键 logo
            $("#logoanimition").trigger('click');
            e.preventDefault();
            window.event.returnValue = false;
        }else if(e.ctrlKey&&code == 68){//D快捷键 3D动画
            $("#signForAnimation").trigger('click');
            e.preventDefault();
            window.event.returnValue = false;
        }else if(e.ctrlKey&&code == 69){//空格停止抽奖中动画，展示中奖结果
           // $("#entlotterys").trigger('click');//entlotterys
            resultlotterys.entlottery()
            e.preventDefault();
            window.event.returnValue = false;
        }else if(e.ctrlKey&&code == 72){//H快捷键 活动主页
            $("#activeHomePageOption").trigger('click');//entlotterys
            e.preventDefault();
            window.event.returnValue = false;
        }else if(e.ctrlKey&&code == 77){//H快捷键 活动主页
            $("#messageWallTsk").trigger('click');//entlotterys
            e.preventDefault();
            window.event.returnValue = false;
        }else if(e.ctrlKey&&code == 81){//Q快捷键 消息上墙二维码显示隐藏
            if(messageWallAni.isload){
                var display= $(".ChatWindowBoxTC").css('display');

                if(display=="none"){
                    $(".ChatWindowBoxTC").css({display:"block"});
                    clearTimeout(messageWallAni.zmdTime);
                    clearTimeout(messageWallAni.loadTime);
                }else {
                    $(".ChatWindowBoxTC").css({display:"none"});
                    var absTop=parseFloat($(".msgItemBox").css("top"));

                    //messageWallAni.animateTop(absTop);
                    messageWallAni.getMessage();
                }
            }

        }

    };
    //回车
    var keyCodeCallbacks = $.Callbacks();
    keyCodeCallbacks.add(enterCodeCallback);
    $(document).on('keydown', function (e) {
        e = e || event;
        keyCodeCallbacks.fire(e);
    });
    //奖项列表
    var ListoFawards = new Vue({
        el: '#Listofawards',
        data: {
            awardList: [],
            lxPrizeName:"临时奖",
            lxPrizeCount:0,
            promptBox:false,
            promptBoxContent:"",
            promptBoxTimeOut:null,
            awardsmoment:{},
            swiperwidth:"0"
        },
        beforeUpdate: function () {
            //初始化奖项列表切换功能

        },
        updated: function () {
            this.swiperwidth=this.awardList.length<5?this.awardList.length*78:78*5;
            this.$nextTick(function () {
                var swiper = new Swiper('.swiper-container', {
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                    slidesPerGroup:5,
                    noSwiping : true,
                    loop: false,
                    loopFillGroupWithBlank: true,

                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });
            })
        },
        methods: {
            Selected: function (a) {
                if(Number(a.awardCount)<=0||Number(a.awardCount)>60){
                    this.promptBoxFn('中奖人数需要大于0,小于60');
                    return
                }
               this.SelectedClickCallback();

                resultlotterys.prizeExhibition = true;
                resultlotterys.awardsmoment = a;
                this.awardsmoment = a;
            },
            especiallySelectedClick: function (lxPrizeName,lxPrizeCount) {
                if(Number(lxPrizeCount)<=0||Number(lxPrizeCount)>60){
                    this.promptBoxFn('中奖人数需要大于0,小于60');
                    return
                }
                this.SelectedClickCallback();

                resultlotterys.especiallyPrizeExhibition = true;
                resultlotterys.awardsmoment = {
                    jpName:"",
                    jxName:lxPrizeName,
                    awardCount:lxPrizeCount,
                    awardPic:Global.lsjimage
                };
                this.awardsmoment = {
                    jpName:"",
                    jxName:lxPrizeName,
                    awardCount:lxPrizeCount,
                    awardPic:Global.lsjimage
                };
            },
            SelectedClickCallback: function () {
                $("#homebjimg").css({
                    display:"none"
                });
                $(".footer").css({
                    display:"none",
                    bottom:"-117px"
                });

                animationConfig.temporary();
                logoAnimations.leave();
                messageWallAni.leave();
                resultlotterys.leaveLottery();
                resultlotterys.dakai = true;
                resultlotterys.whethertherewinningresult=false;//将中奖结果显示为未中奖
                window.setTimeout(function () {
                    $(".footer").css({
                        display:"block"

                    });
                },100)
                Global.cjBg.length>0?$('.warp').css('background','url("'+Global.cjBg+'")  no-repeat center center/100% 100% '):$('.warp').addClass('a')
            },
            promptBoxFn: function (text) {
                clearTimeout(this.promptBoxTimeOut);
                this.promptBox=true;
                this.promptBoxContent=text;
                var that=this;
               this.promptBoxTimeOut= window.setTimeout(function () {
                    that.promptBox=false;
                    that.promptBoxContent="";
                },2000)
            }
        }
    });
    //中奖结果
    var resultlotterys = new Vue({
        el: '#resultlottery',
        data: {
            awardList: ListoFawards.awardList,
            dakai: false,//大盒子
            prizeExhibition: false,//奖品奖项展示
            especiallyPrizeExhibition: false,//特别将奖项展示
            countdown: false,//倒计时盒子
            countdowncount: 0,//倒计时计数
            countdowncountInterval: 0,//倒计时定时器
            awardsmoment: {},//当前是几等奖
            whethertherewinningresult:true,//本轮抽奖是否已经有结果；
            isfireBack: "",//背景的火苗
            numlres: 0,//中奖人数 根据中奖人数展示中奖结果样式
            resultwinningprize: [],//真实中奖结果
            resultwinningprizeInterval: 0,//中奖结果动画定时器
            headPortraitList: headPortraitList.data,//参会人员列表
            resultprizetemporary: [],//中奖结果动画展示，结束动画时替换成真实的中奖结果 this.resultwinningprize,
            isInTheLottery:false,//是否在抽奖中，抽奖中为true，抽奖动画结束变成false.
            winningPrizeError:false,//抽奖接口异常时提示层
            winningPrizeErrorText:""//抽奖接口异常时提示信息
        },
        methods: {
            startlottery: function (ev) {//开始抽奖按钮
                //先清除抽奖中动画
                //clearInterval(this.resultwinningprizeInterval);
                //抽奖中的时候不能再继续抽奖，this.isInTheLottery==true为抽奖中
                if( this.isInTheLottery){
                    return
                }
                //this.isInTheLottery=false;
                if(this.prizeExhibition == false&&this.especiallyPrizeExhibition==false){

                    //未选中奖项的时候不能抽奖
                    return;
                }
                this.resultwinningprize=[];
                this.resultprizetemporary=[];

                this.prizeExhibition = false;
                this.especiallyPrizeExhibition=false;
                //this.countdown = true;
                var that = this;
                clearInterval(this.resultwinningprizeInterval);
                this.resultprizecomputed();

               /* that.countdowncount = 10;
                clearInterval(that.countdowncountInterval);
                this.countdowncountInterval = window.setInterval(function () {
                    that.countdowncount--;
                    if (that.countdowncount == 0) {
                        clearInterval(that.countdowncountInterval);
                        that.countdown = false;
                        $.ajax({
                            url: "/activity/ajax_bigwallawarddraw",
                            method: "GET",
                            dataType: "json",
                            data: {
                                id: Global.id,
                                name: that.awardsmoment.jxName,
                                num: that.awardsmoment.awardCount
                            }
                        }).then(function (data) {
                            console.log(data);
                            that.numlres = that.awardsmoment.awardCount;
                            that.resultwinningprize=data;
                            that.resultprizecomputed();

                        }, function (err) {
                            console.log(err);
                        });

                    }
                }, 1000)*/

            },
            countdowncalculation: function () {//倒计时计算
                console.log(123);
            },
            leaveLottery: function () {
                this.dakai=false;
                this.prizeExhibition=false;
                this.especiallyPrizeExhibition=false;
                this.countdown=false;
                this.countdowncount=0;
                this.awardsmoment={};
                this.numlres=0;
                this.resultwinningprize=[];
                this.resultprizetemporary=[];
                this.isInTheLottery=false;
                clearInterval(this.resultwinningprizeInterval);
             /*   that.winningPrizeError=false;
                that.winningPrizeErrorText=""*/
            },
            resultprizecomputed: function () {
                var ListLegth=this.headPortraitList.length-1;
                var that=this;
                var count=0;
                var djsMS=100;
                //
                this.numlres = that.awardsmoment.awardCount;
                this.prizeExhibition = false;
                this.especiallyPrizeExhibition=false;
                //
                this.isInTheLottery=true;
                this.resultwinningprizeInterval= window.setInterval(function () {
                    var ary=[];
                    for (var i = 0; i < that.numlres; i++) {
                        var round= Math.round(Math.random() * ((ListLegth) - 0) + 0)
                        var obj = that.headPortraitList[round];
                        ary.push(obj);
                    }
                    if(that.isInTheLottery===true){
                        that.resultprizetemporary=ary;
                    }else{
                        clearInterval(that.resultwinningprizeInterval);
                        that.resultprizetemporary=that.resultwinningprize;
                    }

                   /* count+=100;
                    if(count>=10000){
                        that.resultprizetemporary=that.resultwinningprize;
                        clearInterval(that.resultwinningprizeInterval)
                    }*/
                },djsMS)
            },
            entlottery: function () {
                this.isInTheLottery=false;
                clearInterval(this.resultwinningprizeInterval);
                var that=this;
               // this.resultprizetemporary=this.resultwinningprize;
                if(this.whethertherewinningresult){
                    //避免重复抽奖，当为true时候证明已经抽过奖项，不能在重复抽取；
                    return
                }
                $.ajax({
                    url: "/activity/ajax_bigwallawarddraw",
                    method: "GET",
                    dataType: "json",
                    data: {
                        id: Global.id,
                        name: that.awardsmoment.jxName,
                        num: that.awardsmoment.awardCount
                    }
                }).then(function (data) {
                    that.prizeExhibition = false;
                    that.especiallyPrizeExhibition=false;
                    if(data.errno>0){
                        that.numlres=0;
                        that.winningPrizeError=true;
                        that.winningPrizeErrorText=data.msg;
                        window.setTimeout(function () {
                            that.winningPrizeError=false;
                            that.winningPrizeErrorText="";
                        },3000);

                        return
                    }

                   // that.isInTheLottery=true;

                    that.resultprizetemporary=data.data;
                    that.whethertherewinningresult=true;

                }, function (err) {
                    console.log(err);
                    that.numlres=0;
                    that.winningPrizeError=true;
                    that.winningPrizeErrorText="没有人员中奖";
                    window.setTimeout(function () {
                        that.winningPrizeError=false;
                        that.winningPrizeErrorText="";
                    },3000);
                });

            },
            errorHintinFormation: function (text) {//错误 信息提示
                that.winningPrizeError=true;
                that.winningPrizeErrorText=text;
                window.setTimeout(function () {
                    that.winningPrizeError=false;
                    that.winningPrizeErrorText="";
                },3000);
            }
        },
        computed: {

        }
    });
    window.ListoFawards=resultlotterys;
    window.ListoFawards=resultlotterys;
    //调取图片数据
    $.ajax({
        url: "/activity/ajax_bigwalluserlist",
        method: "GET",
        dataType: "json",
        data: {
            id: Global.id
        }

    }).then(function (data) {
        console.log(data);

        if(data.errno==0){
            var datalength=data.data.length;
            for (var i = 0; i < datalength; i++) {
                var obj = data.data[i];
                var imgs = document.createElement('img');
                imgs.src = obj.avatar;
                imgs.onload = (function (i) {
                    headPortraitList.data.push(data.data[i]);
                    if (headPortraitList.data.length == datalength) {
                        function ajaxs(){
                            $.ajax({
                                url: "/activity/ajax_bigwalllastuser",
                                method: "GET",
                                dataType: "json",
                                data: {
                                    id: Global.id,
                                    timestamp:Global.timeStamp,
                                    limit:"30"
                                },
                                success: function (data) {

                                    Global.timeStamp=Math.floor(new Date().getTime()/1000);

                                    if(data.errno==0){
                                        for (var j = 0; j < data.data.length; j++) {
                                            var obj1 = data.data[j];
                                            headPortraitList.data.push(obj1);
                                        }
                                    }


                                    window.setTimeout(function () {
                                        ajaxs();
                                    }, 180000)
                                }

                            })
                        }
                        window.setTimeout(function () {
                            ajaxs();
                        }, 180000);

                    }
                })(i);

            }
            //screwProject.init(earthMath);
            if(headPortraitList.data.length>0){
                var index = Number($('.signSlid').children('img').attr('index'));
                $('.signSlid').children('img').attr({
                    src: headPortraitList.data[index].avatar,
                    index: ++index
                });
                $('.signSlid').css({
                    animation: 'rotateEarth2 4s linear 1'
                });
            }

        }else if(data.errno>0){

        }

        /* animation: rotateEarth2 4s linear 1;*/
        //调取奖项
        return $.ajax({
            url: "/activity/ajax_bigwallawardlist",
            method: "GET",
            dataType: "json",
            data: {
                id: Global.id
            }

        })
    }, function (err) {

    }).then(function (data) {
        console.log(data);
        if (data.errno == 0) {

            prizesAwardsProject.awardList = data.data;
            ListoFawards.awardList = data.data;

        }

    }, function (err) {
        console.log(err);
    });


});

