//bambooTubesProject
var bambooTubesProject = {
    count: 0,
    total: 225,
    animationTime:10000,
    imgWidth:60,
    imgHeight:60,
    merryInto: "bambootubeinto",
    merryOut: "bambootubeout",
    flyIntoTimeout:null,
    flyOutTimeout:null,
    flyOutTimeoutEnd:null,
    next:null,
    /**
     * 初始化图形
     * @param data
     */
    init: function (data) {
        $(".stage").css({
            perspective:"10rem"

        });
        $(".container").css({
            transform: "rotateX(90deg)"
        });
        $(".ani_Tile").hide();
        $(".stage").show();
        $('.stage').css({
            width: this.imgWidth / 100 + 'rem',
            height: this.imgHeight / 100 + 'rem'
        });
        var option = sufa(this.imgWidth, 20);
        var count = 0;
        for (var i = 0; i < option.circleNumber; i++) {//translateY(216px) translateZ(200px)
            if (data.startIndex < data.data.length) {
                var imgSrc = data.data[data.startIndex].avatar;
                data.startIndex++;
            } else {
                data.startIndex = 0
            }
            var $sild = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".container"));
            $sild.css('transform', 'rotateY(' + (option.rotateDEG * i) + 'deg) translateY(' + (0)/100 + 'rem) translateZ(' + (option.tz - 100)/100 + 'rem)');
            var offset = $sild.offset().left;
            var positiontop = $sild.position().top;
            $sild.attr('positiontop', positiontop);
            $sild.css({
                left: -(offset + 100),
                top: positiontop < 0 ? Math.abs(positiontop) : -positiontop
            })
        }
        for (var q = 1; q <=1; q++) {
            if (q < 5) {
                for (var i = 0; i < option.circleNumber; i++) {//translateY(216px) translateZ(200px)
                    if (data.startIndex < data.data.length) {
                        var imgSrc = data.data[data.startIndex].avatar;
                        data.startIndex++;
                    } else {
                        data.startIndex = 0
                    }
                    var $sild = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".container"));
                    $sild.css('transform', 'rotateY(' + (option.rotateDEG * i) + 'deg) translateY(' + ((option.imgWidth + 20) * q)/100 + 'rem) translateZ(' + (option.tz - 100)/100 + 'rem)');
                    var offset = $sild.offset().left;
                    var positiontop = $sild.position().top;
                    $sild.attr('positiontop', positiontop);
                    $sild.css({
                        left: -(offset + 100),
                        top: positiontop < 0 ? Math.abs(positiontop) : -positiontop
                    })
                }
            }
        }

        for (var m = 1; m <= 12; m++) {

            for (var i = 0; i < option.circleNumber; i++) {
                if (data.startIndex < data.data.length) {
                    var imgSrc = data.data[data.startIndex].avatar;
                    data.startIndex++;
                } else {
                    data.startIndex = 0
                }
                var createEle = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>');
                createEle.css('transform', 'rotateY(' + (option.rotateDEG * i) + 'deg) translateY(' + (-((option.imgWidth + 20) * m))/100 + 'rem) translateZ(' + (option.tz - 100)/100 + 'rem)');
                $(".container").children().first().before(createEle);
                var offset = createEle.offset().left;
                var positiontop = $sild.position().top;
                $sild.attr('positiontop', positiontop);
                createEle.css({
                    left: -(offset + 100),
                    top: positiontop < 0 ? Math.abs(positiontop) : -positiontop
                })
            }
        }
        this.total = $('.sild').length;
        this.flyInto();

    },
    /**
     * 飞入动画
     */
    flyInto: function () {
        var that = this;
        $(".sild").each(function (i, n) {
            /* var trans= $(n)[0].style.transform.match(regs);
             trans[2]=Number(trans[2])+200;*/
            //$(n).css('transform','rotateY('+(trans[0])+'deg) rotateX('+(trans[1])+'deg) translateZ('+trans[2]+'px)');
            var style = document.styleSheets[0];
            var positiontop = $(n).attr('positiontop');
            var amt = "@keyframes " + that.merryInto + i + " { 0% {} " +
                "100% {left:0;top:" + 0 + "} }";

            style.insertRule(amt, 0);
            var animName=(Math.random(0, 1) * ((2) - (1))) + (1);
            var delay = (Math.random(0, 1) * ((1) - (0))) + (0);
            //$(n).on('webkitAnimationEnd', that.animationFlyIntoCallback);
            $(n).css({
                "animation-name": that.merryInto + i ,
                "animation-duration":animName+'s',
                "animation-timing-function":"linear	",
                "animation-delay":"0s"

            });
            // $(n).css('animation', 'trans' + i + ' ' + animName + 's'+' linear '+delay+'s');
            $(n).css('animation-fill-mode', 'forwards ');



        });
        that.flyIntoTimeout=   window.setTimeout(function(){
            $('.sild').css({
                left: 0,
                top: 0
            });

            $(".container").css({
                animation: "BambooTubeAnimation 15s linear infinite"
            });

        },2500);
        that.flyOutTimeoutEnd= window.setTimeout(function(){
            $(".container").css({
                animation: "none"
            });
            that.flyOut();
        },this.animationTime+2500);

    },
    /**
     * 飞出动画
     */
    flyOut: function () {

        var that = this;
        $(".sild").each(function (i, n) {

            var offset = $(n).offset();

            var amt = "@keyframes " + that.merryOut + i + " { 0% {" +
                "left:0px;top:0px;" + "} " +
                "30%{left:" + (-(0)) + "px;" + "top:" + (-(0)) + "px;" + "}" +
                "100% {left:" + (-(offset.left + 1000)) + "px;" +/* "top:" + (-(offset.top + 100)) + "px" +*/ "} }";
            styleRule.insertRule(amt);
        });


        $(".sild").each(function (i, n) {
            var aniName = ((Math.random(0, 1) * ((3) - (2))) + (2)).toFixed(2);
            var delay = ((Math.random(0, 1) * ((1) - (0))) + (0)).toFixed(2);

            /*$(n).css({
             "animation": 'out' + i + ' ' + aniName + 's'+' linear '+delay+'s',
             "-webkit-animation": 'out' + i + ' ' + delay + 's'
             });*/
            $(n).css({
                "animation-name": that.merryOut + i ,
                "animation-duration":aniName+'s',
                "animation-timing-function":"linear	",
                "animation-delay":delay+"s",
                "animation-fill-mode": "forwards",
                "-webkit-animation-fill-mode": "forwards"

            });
        });

        that.flyOutTimeout=  window.setTimeout(function(){
            $(".sild").each(function (i, n) {
                $(n).remove();
            });
            $(".stage").css({
                perspective:"5000px"

            });
            $(".container").css({
                transform: "rotateX(0deg)"
            });
            that.next.init(headPortraitList);
        },3000);
        $('.container').css({
            "animation-duration": "none"
        });


    }/*,
     animationContainerCallback: function () {
     earthProject.flyOut();
     $(".sild").on('webkitAnimationEnd', that.animationFlyOutCallback);
     }*/,
    animationFlyIntoCallbacks:function(){
        this.count++;
        if (this.count == this.total) {
            this.count = 0;
            $(".container").css({
                animation: "earthAnimation 15s linear infinite"
            });
            window.setTimeout(function () {
                $(".container").css({
                    animation: "none"
                });
                bambooTubesProject.flyOut();
            }, 15000);

        }

    },
    animationFlyIntoCallback: function () {
        $(this).css({
            left: 0,
            top: 0
        });
        var names = $(this).css('animation');
        var cssrule = names.split(' ')[0];
        styleRule.deleteRule(cssrule);
        bambooTubesProject.animationFlyIntoCallbacks();

    },
    animationFlyOutCallback: function () {

        var names = $(this).css('animation');
        var cssrule = names.split(' ')[0];
        styleRule.deleteRule(cssrule);
        $(this).remove();
        bambooTubesProject.count++;
        if (bambooTubesProject.count == bambooTubesProject.total) {
            bambooTubesProject.count = 0;
            $(".container").css({
                animation: "none"
            });
            earthProject.next.init(headPortraitList);

        }
    }
};