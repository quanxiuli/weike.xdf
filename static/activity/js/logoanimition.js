var logoAnimations = {
    index: 0,
    unitSet: [],//图片位置信息集合
    isCache: false,//是否已经收集过图片位置信息
    keyframesInto: false,//是否已经生成css动画
    logoInfo:"logoInfo",
    init: function (data) {
        $('.warp').removeClass('a').css('background','');
        $("#homebjimg").css({
            display:"none"
        })
        $(".logowrapbox").css({
            display: "block"
        });
        var $logoChildrenImg = $('.logowrap').children();
        var that = logoAnimations;
        /*$logoChildrenImg.css({
            "animation-name": "none"
        });*/
        if(headPortraitList.data.length<=0){
            return
        }
        if (!that.isCache) {
            $logoChildrenImg.each(function (i, n) {

                var $n = $(n);
                var $img = $(n).children('img');

                console.time('w');
              /*  var left = $n.css('left');
                var top = $n.css('top');*/

                var amt;
                console.timeEnd('w');
                /*$n.css({
                    left: 0,
                    top: 0
                });
*/
                /*that.unitSet.push({
                    left: left,
                    top: top
                });*/
                //headPortraitList.data[index];
                var TXNUM,TYNUM,TXNUMTS,TYNUMTS;
                if (!this.keyframesInto) {
                    switch(i%4)
                    {
                        case 1:
                            TXNUM = -((Math.random(0, 1) * ((600) - (500))) + (500));
                            TYNUM = -((Math.random(0, 1) * ((400) - (300))) + (300));
                            TXNUMTS = ((Math.random(0, 1) * ((300) - (50))) + (200));
                            TYNUMTS = -((Math.random(0, 1) * ((300) - (100))) + (200));
                            break;
                        case 2:
                            TXNUM = (Math.random(0, 1) * ((600) - (500))) + (500);
                            TYNUM = -((Math.random(0, 1) * ((400) - (300))) + (300));
                            TXNUMTS = -((Math.random(0, 1) * ((300) - (50))) + (200));
                            TYNUMTS = -((Math.random(0, 1) * ((300) - (100))) + (50));
                            break;
                        case 3:
                            TXNUM = -((Math.random(0, 1) * ((600) - (500))) + (500));
                            TYNUM = (Math.random(0, 1) * ((400) - (300))) + (300);
                            TXNUMTS = ((Math.random(0, 1) * ((300) - (50))) + (200));
                            TYNUMTS = ((Math.random(0, 1) * ((300) - (10))) + (50));
                            break;
                        case 0:
                            TXNUM = (Math.random(0, 1) * ((600) - (500))) + (500);
                            TYNUM = (Math.random(0, 1) * ((400) - (300))) + (300);
                            TXNUMTS = -((Math.random(0, 1) * ((300) - (50))) + (200));
                            TYNUMTS = ((Math.random(0, 1) * ((300) - (100))) + (50));
                            break;


                    }
                  /*  var TXNUM = (Math.random(0, 1) * ((600) - (500))) + (500);
                    //var delay = (Math.random(0, 1) * ((3) - (1))) + (1);
                    var TYNUM = (Math.random(0, 1) * ((400) - (300))) + (300);*/
                    amt = `@keyframes ${that.logoInfo+i} {
 0% {transform:translateX(${TXNUM}px) translateY(${TYNUM}px) translateZ(678px)  scale(0);}
 50% {transform:translateX(${TXNUMTS}px) translateY(${TYNUMTS}px) translateZ(300px)  scale(0.5);}
 100% {transform:translateX(0px) translateY(0px) translateZ(0px) scale(1);}
 }`;

                    styleRule.insertRule(amt, 0);


                }
                $img.attr({
                    src:headPortraitList.data[that.index].avatar
                })
                if (that.index == headPortraitList.data.length - 1) {
                    that.index = 0;
                } else {
                    that.index++
                }

            });
            this.keyframesInto=true;
            that.isCache = true;
        }else {
            that.flyInto();
        }

        that.flyInto();

    },
    flyInto: function () {
        var $logoChildrenImg = $('.logowrap').children();
        var that = logoAnimations;
        $logoChildrenImg.each(function (i, n) {
            var $n = $(n);
            var $img = $(n).children('img');
            var logoInfo=that.logoInfo+i;

            var aniName = (Math.random(0, 1) * ((4) - (2))) + (2);
            //var delay = (Math.random(0, 1) * ((3) - (1))) + (1);
            var delay = (Math.random(0, 1) * ((1) - (0))) + (0);

            $n.css({
                "animation-name": logoInfo,
                "animation-duration": aniName + 's',
                "animation-timing-function": "linear	",
                "animation-delay": delay + "s",
                "animation-fill-mode": "forwards"

            });
        });
        window.setTimeout(function () {
            $logoChildrenImg.each(function (i,n) {
                $(n).css({
                   /* "transform":"scale(1);",*/
                    "animation-name": "none"
                }).addClass('itemScale');

            })

        },6000)
    },
    //离开当前logo展示
    leave:function(){
        $('.logowrap').children().removeClass('itemScale');
        $(".logowrapbox").css({
            display: "none"
        });
    }
};