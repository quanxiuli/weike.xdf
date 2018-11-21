var merryGoRoundProject = {
    count: 0,
    total: 225,
    animationTime: 10000,
    merryInto: "merryinto",
    merryOut: "merryout",
    isAddKeyframsIn: false,
    isAddKeyframsOut: false,
    imgWidth: 40,
    imgHeight: 40,
    circleNumber:40,
    flyIntoTimeout:null,
    flyOutTimeout:null,
    flyOutTimeoutEnd:null,
    next: null,
    /**
     * 初始化图形
     * @param data
     */
    init: function (data) {
        $(".stage").css({
            perspective:"3000px",
            "-webkit-perspective":"3000px"
        });
        $(".container").css({
            transform: "rotateX(0deg)"
        });
        $('.stage').css({
            width: this.imgWidth / 100 + 'rem',
            height: this.imgHeight / 100 + 'rem'
        });
        $(".ani_Tile").hide();
        $(".stage").show();

        var option = sufa(this.imgWidth, this.circleNumber);

        var count = 0;
        for (var i = 0; i < option.circleNumber; i++) {//translateY(216px) translateZ(200px)
            if (data.startIndex < data.data.length) {
                var imgSrc = data.data[data.startIndex].avatar;
                data.startIndex++;
            } else {
                data.startIndex = 0
            }
            var $sild = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".container"));
            $sild.css('transform', 'rotateY(' + (option.rotateDEG * i) + 'deg) translateY(' + (0) + 'px) translateZ(' + (option.tz - 100) + 'px)');
            var offset = $sild.offset().left;
            var positiontop = $sild.position().top;
            $sild.attr('positiontop', positiontop);
            $sild.css({
                left: -(offset + 100),
                top: positiontop < 0 ? Math.abs(positiontop) : -positiontop
            })
        }
        for (var q = 1; q <= 4; q++) {
            if (q < 5) {
                for (var i = 0; i < option.circleNumber; i++) {//translateY(216px) translateZ(200px)
                    if (data.startIndex < data.data.length) {
                        var imgSrc = data.data[data.startIndex].avatar;
                        data.startIndex++;
                    } else {
                        data.startIndex = 0
                    }
                    var $sild = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".container"));
                    $sild.css('transform', 'rotateY(' + (option.rotateDEG * i) + 'deg) translateY(' + ((option.imgWidth + 20) * q) + 'px) translateZ(' + (option.tz - 100) + 'px)');
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

        for (var m = 1; m <= 4; m++) {

            for (var i = 0; i < option.circleNumber; i++) {
                if (data.startIndex < data.data.length) {
                    var imgSrc = data.data[data.startIndex].avatar;
                    data.startIndex++;
                } else {
                    data.startIndex = 0
                }
                var createEle = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>');
                createEle.css('transform', 'rotateY(' + (option.rotateDEG * i) + 'deg) translateY(' + (-((option.imgWidth + 20) * m)) + 'px) translateZ(' + (option.tz - 100) + 'px)');
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

            if (!that.isAddKeyframsIn) {
                var style = document.styleSheets[0];
                var amt = "@keyframes " + that.merryInto + i + " { 0% {} " +
                    "100% {left:0;top:" + 0 + "} }";

                style.insertRule(amt, 0);

            }

            var animName = (Math.random(0, 1) * ((2) - (1))) + (1);
            var delay = (Math.random(0, 1) * ((1) - (0))) + (0);
            //$(n).on('webkitAnimationEnd', that.animationFlyIntoCallback);
            $(n).css({
                "animation-name": that.merryInto + i,
                "animation-duration": animName + 's',
                "animation-timing-function": "linear	",
                "animation-delay": "0s"

            });
            // $(n).css('animation', 'trans' + i + ' ' + animName + 's'+' linear '+delay+'s');
            $(n).css('animation-fill-mode', 'forwards ');


        });
        if (!that.isAddKeyframsIn) {
            that.isAddKeyframsIn = true;
        }
       that.flyIntoTimeout= window.setTimeout(function () {
            $('.sild').css({
                left: 0,
                top: 0
            });
            $(".container").css({
                animation: "earthAnimation 15s linear infinite"
            });
           that.flyOutTimeoutEnd= window.setTimeout(function () {
                $(".container").css({
                    animation: "none"
                });
                that.flyOut();
            }, that.animationTime);
        }, 2500);

    },
    /**
     * 飞出动画
     */
    flyOut: function () {

        var that = this;
        $(".sild").each(function (i, n) {

            //$(n).off("webkitAnimationEnd", that.animationFlyIntoCallback);
            //$(n).on("webkitAnimationEnd", that.animationFlyOutCallback);

            var offset = $(n).offset();
            var offsettop = $(n)[0].offsetLeft;
            var offsetleft = $(n)[0].offsetTop;

            if (!that.isAddKeyframsOut) {
                var amt = "@keyframes " + that.merryOut + i + " { 0% {" +
                    "left:0px;top:0px;" + "} " +
                    "30%{left:" + (-(0)) + "px;" + "top:" + (-(0)) + "px;" + "}" +
                    "100% {left:" + (-(offset.left + 200)) + "px;" + "top:" + (-(offset.top + 100)) + "px" + "} }";
                styleRule.insertRule(amt);
            }

        });
        if (!that.isAddKeyframsOut) {
            that.isAddKeyframsOut = true
        }

        $(".sild").each(function (i, n) {
            var aniName = ((Math.random(0, 1) * ((2) - (1))) + (1)).toFixed(2);
            var delay = ((Math.random(0, 1) * ((1) - (0))) + (0)).toFixed(2);


            $(n).css({
                "animation-name": that.merryOut + i,
                "animation-duration": aniName + 's',
                "animation-timing-function": "linear	",
                "animation-delay": delay + "s"

            });
            $(n).css({
                "animation-fill-mode": "forwards",
                "-webkit-animation-fill-mode": "forwards"
            });
        });

      that.flyOutTimeout=  window.setTimeout(function () {
            $(".sild").each(function (i, n) {
                $(n).remove();
            });
            that.next.init(headPortraitList);
        }, 2000);
        $('.container').css({
            "animation-duration": "none"
        });


    }/*,
     animationContainerCallback: function () {
     earthProject.flyOut();
     $(".sild").on('webkitAnimationEnd', that.animationFlyOutCallback);
     }*/,
    animationFlyIntoCallbacks: function () {
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
                merryGoRoundProject.flyOut();
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
        merryGoRoundProject.animationFlyIntoCallbacks();

    },
    animationFlyOutCallback: function () {

        var names = $(this).css('animation');
        var cssrule = names.split(' ')[0];
        styleRule.deleteRule(cssrule);
        $(this).remove();
        merryGoRoundProject.count++;
        if (merryGoRoundProject.count == merryGoRoundProject.total) {
            merryGoRoundProject.count = 0;
            $(".container").css({
                animation: "none"
            });
            earthProject.next.init(headPortraitList);

        }
    }
};