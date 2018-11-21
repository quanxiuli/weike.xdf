/*
 var earthProject = {
 count: 0,
 total: 225,
 animationTime: 10000,
 init: function (next, data) {
 var option = sufa(60, 25);
 var count = 0;
 this.next = next;

 for (var q = 0; q < 1; q++) {
 if (q < 6) {
 for (var i = 0; i < option.circleNumber; i++) {
 if (data.startIndex < data.data.length) {
 var imgSrc = data.data[data.startIndex].avatar;
 data.startIndex++;
 } else {
 data.startIndex = 0
 }

 var $sild = $('<div class="sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".container"));
 $sild.css('transform', 'rotateY(' + (option.rotateDEG * i) + 'deg) rotateX(' + ((-option.rotateDEG) * q) + 'deg) translateZ(' + (option.tz-80) + 'px)');
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
 for (var q = 1; q <= 4; q++) {
 if (q < 6) {
 for (var i = 0; i < option.circleNumber; i++) {
 if (data.startIndex < data.data.length) {
 var imgSrc = data.data[data.startIndex].avatar;
 data.startIndex++;
 } else {
 data.startIndex = 0
 }
 var $sild = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".container"));
 $sild.css('transform', 'rotateY(' + (option.rotateDEG * i) + 'deg) rotateX(' + ((-option.rotateDEG) * q) + 'deg) translateZ(' + (option.tz-80) + 'px)');
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

 for (var q = 1; q <= 4; q++) {
 for (var i = 0; i < option.circleNumber; i++) {
 if (data.startIndex < data.data.length) {
 var imgSrc = data.data[data.startIndex].avatar;
 data.startIndex++;
 } else {
 data.startIndex = 0
 }

 var createEle = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>');
 // var $sild=  $(' <div class="sild"><img src="zhongxin.png" alt=""></div>').before($(".core"));
 createEle.css('transform', 'rotateY(' + (-option.rotateDEG * i) + 'deg) rotateX(' + ((option.rotateDEG) * q) + 'deg) translateZ(' + (option.tz-80) + 'px)');
 $(".container").children().first().before(createEle);
 var offset = createEle.offset().left;
 var positiontop = createEle.position().top;
 createEle.attr('positiontop', positiontop);
 createEle.css({
 left: -(offset + 100),
 top: positiontop < 0 ? Math.abs(positiontop) : -positiontop
 })
 }

 }
 this.total = $('.sild').length;
 this.flyInto();

 },
 flyInto: function () {
 var that = this;
 $(".sild").each(function (i, n) {
 var style = document.styleSheets[0];
 var positiontop = $(n).attr('positiontop');
 var amt = "@keyframes " + "eathinto" + i + " { 0% {} " +
 "100% {left:0;top:" + 0 + "} }";
 style.insertRule(amt, 0);
 var aniName = (Math.random(0, 1) * ((2) - (1))) + (1);
 //var delay = (Math.random(0, 1) * ((3) - (1))) + (1);
 // $(n).on('webkitAnimationEnd', that.animationFlyIntoCallback);
 $(n).css({
 "animation-name": 'eathinto' + i,
 "animation-duration": aniName + 's',
 "animation-timing-function": "linear	",
 "animation-delay": 0 + "s"

 });
 //$(n).css('animation', 'trans' + i + ' ' + delay + 's');
 $(n).css('animation-fill-mode', 'forwards ');


 });
 //2s之后执行旋转动画
 window.setTimeout(function () {
 $('.sild').css({
 left: 0,
 top: 0
 });
 $(".container").css({
 animation: "earthAnimation 10s linear infinite"
 });
 window.setTimeout(function () {
 $(".container").css({
 animation: "none"
 });
 that.flyOut();
 }, that.animationTime );
 }, 2300);
 },
 flyOut: function () {
 var that = this;
 $(".sild").each(function (i, n) {
 var offset = $(n).offset();
 var amt = "@keyframes " + "eathout" + i + " { 0%  {" +
 "left:0px;top:0px;" + "} " +
 "10%{left:" + (-(parseInt(offset.left / 20))) + "px;" + "top:" + (-(parseInt(offset.top / 20))) + "px;" + "}" +
 "30%{left:" + (-(parseInt(offset.left / 18))) + "px;" + "top:" + (-(parseInt(offset.top / 18))) + "px;" + "}" +
 "60%{left:" + (-(parseInt(offset.left / 10))) + "px;" + "top:" + (-(parseInt(offset.top / 10))) + "px;" + "}" +
 "100% {left:" + (-(parseInt(offset.left) + 200)) + "px;" + "top:" + (-(parseInt(offset.top) + 100)) + "px" + "} }";
 //+ "top:" + (-(top+100))

 styleRule.insertRule(amt);
 });
 $('.container').css({
 "animation-duration": "none"
 });
 window.setTimeout(function () {
 $(".sild").each(function (i, n) {
 $(n).remove();
 });
 earthProject.next.init(headPortraitList);
 }, 3000);
 $(".sild").each(function (i, n) {
 var aniName = ((Math.random(0, 1) * ((3) - (2))) + (1)).toFixed(1);
 $(n).css({
 "animation-name": 'eathout' + i,
 "animation-duration": aniName + 's',
 "animation-timing-function": "linear",
 "animation-delay": 1 + "s",
 "animation-fill-mode": "forwards",
 "-webkit-animation-fill-mode": "forwards"

 });
 //console.log(aniName);
 });

 },
 animationContainerCallback: function () {
 earthProject.flyOut();
 $(".sild").on('webkitAnimationEnd', that.animationFlyOutCallback);
 },
 animationFlyIntoCallback: function () {
 $(this).css({
 left: 0,
 top: 0
 });
 earthProject.count++;
 if (earthProject.count == earthProject.total) {
 earthProject.count = 0;
 $(".container").css({
 animation: "earthAnimation 10s linear infinite"
 });
 window.setTimeout(function () {
 $(".container").css({
 animation: "none"
 });
 earthProject.flyOut();
 }, 15000);

 }
 var names = $(this).css('animation');
 var cssrule = names.split(' ')[0];
 styleRule.deleteRule(cssrule);
 },
 animationFlyOutCallback: function () {

 var names = $(this).css('animation');
 var cssrule = names.split(' ')[0];
 styleRule.deleteRule(cssrule);
 $(this).remove();
 earthProject.count++;
 if (earthProject.count == earthProject.total) {
 earthProject.count = 0;
 $(".container").css({
 animation: "none"
 });
 earthProject.next.init(headPortraitList);

 }
 }
 }
 */
var earthProject = {
    count: 0,
    total: 225,
    animationTime: 10000,
    earthInto: "eatrhinto",
    earthOut: "earthout",
    keyframesInto: false,
    keyframesOut: false,
    tx: -900,
    imgWidth: 30,
    imgHeight: 30,
    flyIntoTimeout:null,
    flyOutTimeout:null,
    flyOutTimeoutEnd:null,
    next: null,
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
        var option = sufa(this.imgWidth, 30);
        var count = 0;


        for (var q = 0; q < 1; q++) {
            if (q < 6) {
                for (var i = 0; i < option.circleNumber; i++) {
                    if (data.startIndex < data.data.length) {
                        var imgSrc = data.data[data.startIndex].avatar;
                        data.startIndex++;
                    } else {
                        data.startIndex = 0
                    }

                    var $sild = $('<div class="sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".container"));
                    $sild.css('transform', 'rotateY(' + (option.rotateDEG * i) + 'deg) rotateX(' + ((-option.rotateDEG) * q) + 'deg) translateZ(' + option.tz / 100 + 'rem)');
                    $sild.attr({
                        ry: option.rotateDEG * i,
                        tx: (-option.rotateDEG) * q,
                        ty: option.tz
                    });

                    $sild.css({
                        transform: 'translateX(' + (this.tx) / 100 + 'rem) rotateY(' + 0 + 'deg) rotateX(' + (0) + 'deg) translateZ(' + 0 + 'px)'

                    })
                }
            }
        }
        for (var q = 1; q <= 8; q++) {
            var circleNumberLen;
            if (q == 20) {
                circleNumberLen = option.circleNumber / 2;
            } else {
                circleNumberLen = option.circleNumber;
            }


            for (var i = 0; i < circleNumberLen; i++) {
                if (data.startIndex < data.data.length) {
                    var imgSrc = data.data[data.startIndex].avatar;
                    data.startIndex++;
                } else {
                    data.startIndex = 0
                }
                if (q == 20) {
                    var ry = (option.rotateDEG * i) * 2;
                    var rx = ((-option.rotateDEG) * q) * 2;
                } else {
                    var ry = option.rotateDEG * i;
                    var rx = (-option.rotateDEG) * q;
                }


                var $sild = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".container"));
                $sild.css('transform', 'rotateY(' + (ry) + 'deg) rotateX(' + (rx) + 'deg) translateZ(' + option.tz / 100 + 'rem)');
                $sild.attr({
                    ry: ry,
                    tx: rx,
                    ty: option.tz
                });

                $sild.css({
                    transform: 'translateX(' + (this.tx) / 100 + 'rem) rotateY(' + 0 + 'deg) rotateX(' + (0) + 'deg) translateZ(' + 0 + 'px)'

                })

            }

        }

        for (var q = 1; q <= 8; q++) {
            var circleNumberLen;
            if (q == 20) {
                circleNumberLen = option.circleNumber / 2;
            } else {
                circleNumberLen = option.circleNumber;
            }
            for (var i = 0; i < circleNumberLen; i++) {
                if (data.startIndex < data.data.length) {
                    var imgSrc = data.data[data.startIndex].avatar;
                    data.startIndex++;
                } else {
                    data.startIndex = 0
                }
                if (q == 20) {
                    var ry = (-option.rotateDEG * i) * 2;
                    var rx = ((option.rotateDEG) * q) * 2;
                } else {
                    var ry = (-option.rotateDEG * i);
                    var rx = ((option.rotateDEG) * q);
                }
                var createEle = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>');
                // var $sild=  $(' <div class="sild"><img src="zhongxin.png" alt=""></div>').before($(".core"));
                createEle.css('transform', 'rotateY(' + (ry) + 'deg) rotateX(' + (rx) + 'deg) translateZ(' + option.tz / 100 + 'rem)');
                $(".container").children().first().before(createEle);
                createEle.attr({
                    ry: ry,
                    tx: rx,
                    ty: option.tz
                });

                createEle.css({
                    transform: 'translateX(' + (this.tx) / 100 + 'rem) rotateY(' + 0 + 'deg) rotateX(' + (0) + 'deg) translateZ(' + 0 + 'px)'

                });

            }

        }
        this.total = $('.sild').length;
        this.flyInto();

    },
    flyInto: function () {
        var that = this;

        $(".sild").each(function (i, n) {
            var style = document.styleSheets[0];
            var positiontop = $(n).attr('positiontop');
            var earthInto = that.earthInto + i;
            var tx = 0;
            var transforms = {
                ry: $(n).attr('ry'),
                tx: $(n).attr('tx'),
                tz: $(n).attr('ty')
            };
            var amt;

            if (!that.keyframesInto) {
                amt = `@keyframes ${earthInto} {
 0% {transform:translateX(${that.tx / 100}rem) rotateY(${0}deg) rotateX(${0}deg) translateZ(${0}rem);} 100% {transform:translateX(0rem) rotateY(${transforms.ry}deg) rotateX(${transforms.tx}deg) translateZ(${transforms.tz / 100}rem);}
 }`;
                style.insertRule(amt, 0);

            }


            var aniName = (Math.random(0, 1) * ((3) - (2))) + (2);
            //var delay = (Math.random(0, 1) * ((3) - (1))) + (1);
            var delay = (Math.random(0, 1) * ((2) - (1))) + (1);
            $(n).css({
                "animation-name": earthInto,
                "animation-duration": aniName + 's',
                "animation-timing-function": "linear	",
                "animation-delay": delay + "s",
                "animation-fill-mode": "forwards"

            });

        });
        if (!that.keyframesInto) {
            that.keyframesInto = true;
        }


       that.flyIntoTimeout=window.setTimeout(function () {
            $(".container").css({
                animation: "earthAnimation 20s linear infinite"
            });

            $(".sild").each(function (i, n) {
                var tx = 0;
                var transforms = {
                    ry: $(n).attr('ry'),
                    tx: $(n).attr('tx'),
                    tz: $(n).attr('ty')
                };
                var ssss = `translateX(0rem) rotateY(${transforms.ry}deg) rotateX(${transforms.tx}deg) translateZ(${transforms.tz / 100 }rem)`;

                $(n).css('transform', ssss);

            });

           that.flyOutTimeoutEnd=  window.setTimeout(function () {
                $(".container").css({
                    animation: "none"
                });
                that.flyOut();
            }, that.animationTime);
        }, 3300);


    },
    flyOut: function () {
        var that = this;
        $(".sild").each(function (i, n) {
            var earthInto = that.earthOut + i;
            var tx = 0;
            var transforms = {
                ry: $(n).attr('ry'),
                tx: $(n).attr('tx'),
                tz: $(n).attr('ty')
            };

            if (!that.keyframesOut) {
                var amt = `@keyframes ${earthInto} {
 0% {transform:rotateY(${transforms.ry}deg) rotateX(${transforms.tx}deg) translateZ(${transforms.tz / 100}rem) translateX(0rem) ;} 100% {transform: rotateY(${0}deg) rotateX(${0}deg) translateZ(${0}px) translateX(${that.tx / 100}rem);}}`;
                styleRule.insertRule(amt);
            }

        });

        if (!that.keyframesOut) {
            that.keyframesOut = true
        }
        $('.container').css({
            "animation-duration": "none"
        });
      that.flyIntoTimeout= window.setTimeout(function () {
            $(".sild").each(function (i, n) {
                $(n).remove();
            });
            earthProject.next.init(headPortraitList);
        }, 3000);
        $(".sild").each(function (i, n) {
            var aniName = ((Math.random(0, 1) * ((3) - (2))) + (1)).toFixed(1);
            $(n).css({
                "animation-name": that.earthOut + i,
                "animation-duration": aniName + 's',
                "animation-timing-function": "linear",
                "animation-delay": 1 + "s",
                "animation-fill-mode": "forwards",
                "-webkit-animation-fill-mode": "forwards"

            });
            //console.log(aniName);
        });

    },
    animationContainerCallback: function () {
        earthProject.flyOut();
        $(".sild").on('webkitAnimationEnd', that.animationFlyOutCallback);
    },
    animationFlyIntoCallback: function () {
        $(this).css({
            left: 0,
            top: 0
        });
        earthProject.count++;
        if (earthProject.count == earthProject.total) {
            earthProject.count = 0;
            $(".container").css({
                animation: "earthAnimation 10s linear infinite"
            });
            window.setTimeout(function () {
                $(".container").css({
                    animation: "none"
                });
                earthProject.flyOut();
            }, 15000);

        }
        var names = $(this).css('animation');
        var cssrule = names.split(' ')[0];
        styleRule.deleteRule(cssrule);
    },
    animationFlyOutCallback: function () {

        var names = $(this).css('animation');
        var cssrule = names.split(' ')[0];
        styleRule.deleteRule(cssrule);
        $(this).remove();
        earthProject.count++;
        if (earthProject.count == earthProject.total) {
            earthProject.count = 0;
            $(".container").css({
                animation: "none"
            });
            earthProject.next.init(headPortraitList);

        }
    }
}
