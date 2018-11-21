"use strict";

/**
 * Created by v_luhaiping on 2017/12/11.
 */
var headPortraitList = {
  data: [],
  startIndex: 0
};
'use strict';

/**
 * Created by v_luhaiping on 2017/11/27.
 */
function sufa(imgWidth, circleNumber) {
    // var imgWidth=60;
    //var circleNumber=40;//一圈的数量
    var tz = Math.round(imgWidth / 2 / Math.tan(Math.PI * 2 / circleNumber / 2));
    tz += 250;
    var rotateDEG = 360 / circleNumber;
    return {
        tz: tz,
        rotateDEG: rotateDEG,
        circleNumber: circleNumber,
        imgWidth: imgWidth
    };
}

/**
 *
 * @param sname
 * @param option
 * @returns {string}
 */
function animationStr(sname) {
    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        duration: '3s',
        timingfun: 'linear', //动画速度曲线
        delay: '0s', //延迟
        count: '0', //动画播放次数
        direction: '' //规定是否应该轮流反向播放动画。
    };
    var duration = option.duration,
        timingfun = option.timingfun,
        delay = option.delay,
        count = option.count,
        direction = option.direction;


    var str = sname + ' ' + duration + ' ' + timingfun + ' ' + delay + ' ' + count + ' ' + direction;
    return str;
};

function transformList(ele) {
    var regs = /\-?[0-9]+\.?[0-9]*/g;
    ele.style.transform.match(regs);
};

function ts(elewidth, eleheight) {
    var dh = document.body.scrollHeight;
    var dw = document.body.scrollWidth;
    var tx = dw - ($(n).width() + offtop.left + parofftop.left);
    var ty = dh / 2 - (eleheight + offtop.top + parofftop.top);
    var tyz = parseInt(Math.random(0, 1) * (dh / 2 + 30 - (dh / 2 - 30))) + (dh / 2 - 30);
    var txz = parseInt(Math.random(0, 1) * (tx + 300 - (tx + 100))) + (tx + 100);
    return {};
}
"use strict";

var styleRule = {
    insertRule: function insertRule(amt) {
        var style = document.styleSheets[0];
        style.insertRule(amt, 0);
    },
    deleteRule: function deleteRule(ruleName) {
        var style = document.styleSheets[0];
        var cssRules = document.styleSheets[0].cssRules;
        for (var i = 0; i < cssRules.length; i++) {
            var obj = cssRules[i];
            if (obj.name == ruleName) {
                document.styleSheets[0].deleteRule(i);
            }
        }
    }
};
"use strict";

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
    flyIntoTimeout: null,
    flyOutTimeout: null,
    flyOutTimeoutEnd: null,
    next: null,
    init: function init(data) {

        $(".stage").css({
            perspective: "3000px",
            "-webkit-perspective": "3000px"
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
                        data.startIndex = 0;
                    }

                    var $sild = $('<div class="sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".container"));
                    $sild.css('transform', 'rotateY(' + option.rotateDEG * i + 'deg) rotateX(' + -option.rotateDEG * q + 'deg) translateZ(' + option.tz / 100 + 'rem)');
                    $sild.attr({
                        ry: option.rotateDEG * i,
                        tx: -option.rotateDEG * q,
                        ty: option.tz
                    });

                    $sild.css({
                        transform: 'translateX(' + this.tx / 100 + 'rem) rotateY(' + 0 + 'deg) rotateX(' + 0 + 'deg) translateZ(' + 0 + 'px)'

                    });
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
                    data.startIndex = 0;
                }
                if (q == 20) {
                    var ry = option.rotateDEG * i * 2;
                    var rx = -option.rotateDEG * q * 2;
                } else {
                    var ry = option.rotateDEG * i;
                    var rx = -option.rotateDEG * q;
                }

                var $sild = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".container"));
                $sild.css('transform', 'rotateY(' + ry + 'deg) rotateX(' + rx + 'deg) translateZ(' + option.tz / 100 + 'rem)');
                $sild.attr({
                    ry: ry,
                    tx: rx,
                    ty: option.tz
                });

                $sild.css({
                    transform: 'translateX(' + this.tx / 100 + 'rem) rotateY(' + 0 + 'deg) rotateX(' + 0 + 'deg) translateZ(' + 0 + 'px)'

                });
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
                    data.startIndex = 0;
                }
                if (q == 20) {
                    var ry = -option.rotateDEG * i * 2;
                    var rx = option.rotateDEG * q * 2;
                } else {
                    var ry = -option.rotateDEG * i;
                    var rx = option.rotateDEG * q;
                }
                var createEle = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>');
                // var $sild=  $(' <div class="sild"><img src="zhongxin.png" alt=""></div>').before($(".core"));
                createEle.css('transform', 'rotateY(' + ry + 'deg) rotateX(' + rx + 'deg) translateZ(' + option.tz / 100 + 'rem)');
                $(".container").children().first().before(createEle);
                createEle.attr({
                    ry: ry,
                    tx: rx,
                    ty: option.tz
                });

                createEle.css({
                    transform: 'translateX(' + this.tx / 100 + 'rem) rotateY(' + 0 + 'deg) rotateX(' + 0 + 'deg) translateZ(' + 0 + 'px)'

                });
            }
        }
        this.total = $('.sild').length;
        this.flyInto();
    },
    flyInto: function flyInto() {
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
                amt = "@keyframes " + earthInto + " {\n 0% {transform:translateX(" + that.tx / 100 + "rem) rotateY(" + 0 + "deg) rotateX(" + 0 + "deg) translateZ(" + 0 + "rem);} 100% {transform:translateX(0rem) rotateY(" + transforms.ry + "deg) rotateX(" + transforms.tx + "deg) translateZ(" + transforms.tz / 100 + "rem);}\n }";
                style.insertRule(amt, 0);
            }

            var aniName = Math.random(0, 1) * (3 - 2) + 2;
            //var delay = (Math.random(0, 1) * ((3) - (1))) + (1);
            var delay = Math.random(0, 1) * (2 - 1) + 1;
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

        that.flyIntoTimeout = window.setTimeout(function () {
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
                var ssss = "translateX(0rem) rotateY(" + transforms.ry + "deg) rotateX(" + transforms.tx + "deg) translateZ(" + transforms.tz / 100 + "rem)";

                $(n).css('transform', ssss);
            });

            that.flyOutTimeoutEnd = window.setTimeout(function () {
                $(".container").css({
                    animation: "none"
                });
                that.flyOut();
            }, that.animationTime);
        }, 3300);
    },
    flyOut: function flyOut() {
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
                var amt = "@keyframes " + earthInto + " {\n 0% {transform:rotateY(" + transforms.ry + "deg) rotateX(" + transforms.tx + "deg) translateZ(" + transforms.tz / 100 + "rem) translateX(0rem) ;} 100% {transform: rotateY(" + 0 + "deg) rotateX(" + 0 + "deg) translateZ(" + 0 + "px) translateX(" + that.tx / 100 + "rem);}}";
                styleRule.insertRule(amt);
            }
        });

        if (!that.keyframesOut) {
            that.keyframesOut = true;
        }
        $('.container').css({
            "animation-duration": "none"
        });
        that.flyIntoTimeout = window.setTimeout(function () {
            $(".sild").each(function (i, n) {
                $(n).remove();
            });
            earthProject.next.init(headPortraitList);
        }, 3000);
        $(".sild").each(function (i, n) {
            var aniName = (Math.random(0, 1) * (3 - 2) + 1).toFixed(1);
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
    animationContainerCallback: function animationContainerCallback() {
        earthProject.flyOut();
        $(".sild").on('webkitAnimationEnd', that.animationFlyOutCallback);
    },
    animationFlyIntoCallback: function animationFlyIntoCallback() {
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
    animationFlyOutCallback: function animationFlyOutCallback() {

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
};
"use strict";

var screwProject = {
    count: 0,
    total: 160,
    circleNum: 3, //左右分别加几圈
    animationTime: 10000, //动画时长
    flyIntoKeyframes: "inScrew",
    flyOutKeyframes: "outScrew",
    isAddKeyframsIn: false,
    isAddKeyframsOut: false,
    imgWidth: 40,
    imgHeight: 40,
    flyIntoTimeout: null,
    flyOutTimeout: null,
    flyOutTimeoutEnd: null,
    next: null,
    init: function init(data) {
        //设置图片宽度
        $(".stage").css({
            perspective: "2000px",
            "-webkit-perspective": "2000px"
        });
        $(".container").css({
            transform: "rotateX(0deg)"
        });
        $(".ani_Tile").hide();
        $(".stage").show();
        $('.stage').css({
            width: this.imgWidth / 100 + 'rem',
            height: this.imgHeight / 100 + 'rem'
        });
        //计算圆数据
        var options = sufa(this.imgWidth, 30);
        var count = 0;

        var widths = 60,
            heights = 60,
            oneLength = 20,
            tx = 6;
        for (var i = 0; i < options.circleNumber * this.circleNum; i++) {
            //translateY(216px) translateZ(200px)
            //加载图片数据
            if (data.startIndex < data.data.length) {
                var imgSrc = data.data[data.startIndex].avatar;
                data.startIndex++;
            } else {
                data.startIndex = 0;
            }
            //插入元素
            var $sild = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".container"));
            $sild.css({
                'transform': 'translateX(' + tx * i / 100 + 'rem) rotateX(' + options.rotateDEG * i + 'deg)  translateZ(' + (options.tz - 150) / 100 + 'rem)'
            });
            var offset = $sild.offset();
            $sild.attr({
                top: offset.top,
                left: offset.left
            });
            $sild.css({
                top: -(offset.top + 200)
                /* left: -(offset.left)*/
            });
        }
        for (var i = 0; i < options.circleNumber * this.circleNum; i++) {
            //translateY(216px) translateZ(200px)
            if (data.startIndex < data.data.length) {
                var imgSrc = data.data[data.startIndex].avatar;
                data.startIndex++;
            } else {
                data.startIndex = 0;
            }
            var $sild = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".container"));

            $sild.css({
                'transform': 'translateX(' + -tx * i / 100 + 'rem) rotateX(' + -options.rotateDEG * i + 'deg)  translateZ(' + (options.tz - 150) / 100 + 'rem)'
            });
            var offset = $sild.offset();
            $sild.attr({
                top: offset.top,
                left: offset.left
            });
            $sild.css({
                top: -(offset.top + 200)
                /* left: -(offset.left)*/
            });
        }
        this.total = $(".sild").length;
        this.flyInto();
    },
    flyInto: function flyInto() {
        var that = this;
        $(".sild").each(function (i, n) {
            var positiontop = $(n).attr('positiontop');
            var top = $(n).attr('top');
            if (!that.isAddKeyframsIn) {
                var style = document.styleSheets[0];

                var amt = "@keyframes " + that.flyIntoKeyframes + i + " { 0% {top:" + -(parseInt(top) + 200) / 100 + "rem;} " + "100% {top:" + 0 + "rem;} }";
                style.insertRule(amt, 0);
            }

            var durationTime = Math.random(0, 1) * (3 - 1) + 1;
            var delay = Math.random(0, 1) * (1 - 0) + 0;
            var optionstr = animationStr(that.flyIntoKeyframes + i, {
                duration: durationTime + 's',
                timingfun: '', //动画速度曲线
                delay: delay + 's', //延迟
                count: '', //动画播放次数
                direction: '' //规定是否应该轮流反向播放动画。
            });

            $(n).css('animation', optionstr);
            $(n).css('animation-fill-mode', 'forwards ');
        });
        that.flyIntoTimeout = window.setTimeout(function () {
            $(".sild").css({
                top: 0,
                left: 0
            });
            $(".container").css({
                animation: "screwAnimation 10s linear infinite"
            });
            that.flyOutTimeoutEnd = window.setTimeout(function () {
                that.flyOut();
            }, that.animationTime);
        }, 3000);
        if (!that.isAddKeyframsIn) {
            that.isAddKeyframsIn = true;
        }
    },
    flyOut: function flyOut() {
        $('.container').css({
            animation: "none"
        });
        var that = this;

        $(".sild").each(function (i, n) {
            //$(n).off("webkitAnimationEnd", that.animationFlyIntoCallback);
            //$(n).on("webkitAnimationEnd", that.animationFlyOutCallback);

            var documentWidth = $(window).width();
            var documentHeight = $(window).height();
            /* var offset = $(n).offset();
             var tops=documentHeight-offset.top;*/

            var offsettop = $(n).attr('top');
            var tops = documentHeight - Number(offsettop);
            if (!that.isAddKeyframsOut) {
                var amt = "@keyframes " + that.flyOutKeyframes + i + " { 0% {} " + "100% {left:" + -0 + "rem;" + "top:" + (tops + 300) / 100 + "rem" + "} }";

                styleRule.insertRule(amt);
            }
        });
        if (!that.isAddKeyframsOut) {
            that.isAddKeyframsOut = true;
        }

        $('.sild').each(function (i, n) {
            var delay = Math.random(0, 1) * (3 - 2) + 2;
            var optionstr = animationStr(that.flyOutKeyframes + i, {
                duration: delay + 's',
                timingfun: '', //动画速度曲线
                delay: 1 + 's', //延迟
                count: '', //动画播放次数
                direction: '' //规定是否应该轮流反向播放动画。
            });
            $(n).css('animation', optionstr);

            $(n).css('animation-fill-mode', 'forwards ');
        });
        that.flyOutTimeout = window.setTimeout(function () {
            $('.sild').remove();
            $(".container").css({
                animation: "none"
            });
            that.next.init(headPortraitList);
        }, 3000);
    },

    animationFlyIntoCallback: function animationFlyIntoCallback() {
        $(this).css({
            left: 0,
            top: 0
        });
        screwProject.count++;
        if (screwProject.count == screwProject.total) {
            screwProject.count = 0;
            $(".container").css({
                animation: "screwAnimation 10s linear infinite"
            });
            window.setTimeout(function () {
                $(".container").css({
                    animation: "none"
                });
                screwProject.flyOut();
            }, 15000);
        }
        var names = $(this).css('animation');
        var cssrule = names.split(' ')[0];
        styleRule.deleteRule(cssrule);
    },
    animationFlyOutCallback: function animationFlyOutCallback() {

        var names = $(this).css('animation');
        var cssrule = names.split(' ')[0];
        styleRule.deleteRule(cssrule);
        $(this).remove();
        screwProject.count++;
        if (screwProject.count == screwProject.total) {
            screwProject.count = 0;
            $(".container").css({
                animation: "none"
            });
            merryGoRoundProject.init(headPortraitList);
        }
    }

};
"use strict";

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
    circleNumber: 40,
    flyIntoTimeout: null,
    flyOutTimeout: null,
    flyOutTimeoutEnd: null,
    next: null,
    /**
     * 初始化图形
     * @param data
     */
    init: function init(data) {
        $(".stage").css({
            perspective: "3000px",
            "-webkit-perspective": "3000px"
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
        for (var i = 0; i < option.circleNumber; i++) {
            //translateY(216px) translateZ(200px)
            if (data.startIndex < data.data.length) {
                var imgSrc = data.data[data.startIndex].avatar;
                data.startIndex++;
            } else {
                data.startIndex = 0;
            }
            var $sild = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".container"));
            $sild.css('transform', 'rotateY(' + option.rotateDEG * i + 'deg) translateY(' + 0 + 'px) translateZ(' + (option.tz - 100) + 'px)');
            var offset = $sild.offset().left;
            var positiontop = $sild.position().top;
            $sild.attr('positiontop', positiontop);
            $sild.css({
                left: -(offset + 100),
                top: positiontop < 0 ? Math.abs(positiontop) : -positiontop
            });
        }
        for (var q = 1; q <= 4; q++) {
            if (q < 5) {
                for (var i = 0; i < option.circleNumber; i++) {
                    //translateY(216px) translateZ(200px)
                    if (data.startIndex < data.data.length) {
                        var imgSrc = data.data[data.startIndex].avatar;
                        data.startIndex++;
                    } else {
                        data.startIndex = 0;
                    }
                    var $sild = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".container"));
                    $sild.css('transform', 'rotateY(' + option.rotateDEG * i + 'deg) translateY(' + (option.imgWidth + 20) * q + 'px) translateZ(' + (option.tz - 100) + 'px)');
                    var offset = $sild.offset().left;
                    var positiontop = $sild.position().top;
                    $sild.attr('positiontop', positiontop);
                    $sild.css({
                        left: -(offset + 100),
                        top: positiontop < 0 ? Math.abs(positiontop) : -positiontop
                    });
                }
            }
        }

        for (var m = 1; m <= 4; m++) {

            for (var i = 0; i < option.circleNumber; i++) {
                if (data.startIndex < data.data.length) {
                    var imgSrc = data.data[data.startIndex].avatar;
                    data.startIndex++;
                } else {
                    data.startIndex = 0;
                }
                var createEle = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>');
                createEle.css('transform', 'rotateY(' + option.rotateDEG * i + 'deg) translateY(' + -((option.imgWidth + 20) * m) + 'px) translateZ(' + (option.tz - 100) + 'px)');
                $(".container").children().first().before(createEle);
                var offset = createEle.offset().left;
                var positiontop = $sild.position().top;
                $sild.attr('positiontop', positiontop);
                createEle.css({
                    left: -(offset + 100),
                    top: positiontop < 0 ? Math.abs(positiontop) : -positiontop
                });
            }
        }
        this.total = $('.sild').length;
        this.flyInto();
    },
    /**
     * 飞入动画
     */
    flyInto: function flyInto() {
        var that = this;
        $(".sild").each(function (i, n) {

            if (!that.isAddKeyframsIn) {
                var style = document.styleSheets[0];
                var amt = "@keyframes " + that.merryInto + i + " { 0% {} " + "100% {left:0;top:" + 0 + "} }";

                style.insertRule(amt, 0);
            }

            var animName = Math.random(0, 1) * (2 - 1) + 1;
            var delay = Math.random(0, 1) * (1 - 0) + 0;
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
        that.flyIntoTimeout = window.setTimeout(function () {
            $('.sild').css({
                left: 0,
                top: 0
            });
            $(".container").css({
                animation: "earthAnimation 15s linear infinite"
            });
            that.flyOutTimeoutEnd = window.setTimeout(function () {
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
    flyOut: function flyOut() {

        var that = this;
        $(".sild").each(function (i, n) {

            //$(n).off("webkitAnimationEnd", that.animationFlyIntoCallback);
            //$(n).on("webkitAnimationEnd", that.animationFlyOutCallback);

            var offset = $(n).offset();
            var offsettop = $(n)[0].offsetLeft;
            var offsetleft = $(n)[0].offsetTop;

            if (!that.isAddKeyframsOut) {
                var amt = "@keyframes " + that.merryOut + i + " { 0% {" + "left:0px;top:0px;" + "} " + "30%{left:" + -0 + "px;" + "top:" + -0 + "px;" + "}" + "100% {left:" + -(offset.left + 200) + "px;" + "top:" + -(offset.top + 100) + "px" + "} }";
                styleRule.insertRule(amt);
            }
        });
        if (!that.isAddKeyframsOut) {
            that.isAddKeyframsOut = true;
        }

        $(".sild").each(function (i, n) {
            var aniName = (Math.random(0, 1) * (2 - 1) + 1).toFixed(2);
            var delay = (Math.random(0, 1) * (1 - 0) + 0).toFixed(2);

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

        that.flyOutTimeout = window.setTimeout(function () {
            $(".sild").each(function (i, n) {
                $(n).remove();
            });
            that.next.init(headPortraitList);
        }, 2000);
        $('.container').css({
            "animation-duration": "none"
        });
    } /*,
      animationContainerCallback: function () {
      earthProject.flyOut();
      $(".sild").on('webkitAnimationEnd', that.animationFlyOutCallback);
      }*/
    , animationFlyIntoCallbacks: function animationFlyIntoCallbacks() {
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
    animationFlyIntoCallback: function animationFlyIntoCallback() {
        $(this).css({
            left: 0,
            top: 0
        });
        var names = $(this).css('animation');
        var cssrule = names.split(' ')[0];
        styleRule.deleteRule(cssrule);
        merryGoRoundProject.animationFlyIntoCallbacks();
    },
    animationFlyOutCallback: function animationFlyOutCallback() {

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
"use strict";

//bambooTubesProject
var bambooTubesProject = {
    count: 0,
    total: 225,
    animationTime: 10000,
    imgWidth: 60,
    imgHeight: 60,
    merryInto: "bambootubeinto",
    merryOut: "bambootubeout",
    flyIntoTimeout: null,
    flyOutTimeout: null,
    flyOutTimeoutEnd: null,
    next: null,
    /**
     * 初始化图形
     * @param data
     */
    init: function init(data) {
        $(".stage").css({
            perspective: "10rem"

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
        for (var i = 0; i < option.circleNumber; i++) {
            //translateY(216px) translateZ(200px)
            if (data.startIndex < data.data.length) {
                var imgSrc = data.data[data.startIndex].avatar;
                data.startIndex++;
            } else {
                data.startIndex = 0;
            }
            var $sild = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".container"));
            $sild.css('transform', 'rotateY(' + option.rotateDEG * i + 'deg) translateY(' + 0 / 100 + 'rem) translateZ(' + (option.tz - 100) / 100 + 'rem)');
            var offset = $sild.offset().left;
            var positiontop = $sild.position().top;
            $sild.attr('positiontop', positiontop);
            $sild.css({
                left: -(offset + 100),
                top: positiontop < 0 ? Math.abs(positiontop) : -positiontop
            });
        }
        for (var q = 1; q <= 1; q++) {
            if (q < 5) {
                for (var i = 0; i < option.circleNumber; i++) {
                    //translateY(216px) translateZ(200px)
                    if (data.startIndex < data.data.length) {
                        var imgSrc = data.data[data.startIndex].avatar;
                        data.startIndex++;
                    } else {
                        data.startIndex = 0;
                    }
                    var $sild = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".container"));
                    $sild.css('transform', 'rotateY(' + option.rotateDEG * i + 'deg) translateY(' + (option.imgWidth + 20) * q / 100 + 'rem) translateZ(' + (option.tz - 100) / 100 + 'rem)');
                    var offset = $sild.offset().left;
                    var positiontop = $sild.position().top;
                    $sild.attr('positiontop', positiontop);
                    $sild.css({
                        left: -(offset + 100),
                        top: positiontop < 0 ? Math.abs(positiontop) : -positiontop
                    });
                }
            }
        }

        for (var m = 1; m <= 12; m++) {

            for (var i = 0; i < option.circleNumber; i++) {
                if (data.startIndex < data.data.length) {
                    var imgSrc = data.data[data.startIndex].avatar;
                    data.startIndex++;
                } else {
                    data.startIndex = 0;
                }
                var createEle = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>');
                createEle.css('transform', 'rotateY(' + option.rotateDEG * i + 'deg) translateY(' + -((option.imgWidth + 20) * m) / 100 + 'rem) translateZ(' + (option.tz - 100) / 100 + 'rem)');
                $(".container").children().first().before(createEle);
                var offset = createEle.offset().left;
                var positiontop = $sild.position().top;
                $sild.attr('positiontop', positiontop);
                createEle.css({
                    left: -(offset + 100),
                    top: positiontop < 0 ? Math.abs(positiontop) : -positiontop
                });
            }
        }
        this.total = $('.sild').length;
        this.flyInto();
    },
    /**
     * 飞入动画
     */
    flyInto: function flyInto() {
        var that = this;
        $(".sild").each(function (i, n) {
            /* var trans= $(n)[0].style.transform.match(regs);
             trans[2]=Number(trans[2])+200;*/
            //$(n).css('transform','rotateY('+(trans[0])+'deg) rotateX('+(trans[1])+'deg) translateZ('+trans[2]+'px)');
            var style = document.styleSheets[0];
            var positiontop = $(n).attr('positiontop');
            var amt = "@keyframes " + that.merryInto + i + " { 0% {} " + "100% {left:0;top:" + 0 + "} }";

            style.insertRule(amt, 0);
            var animName = Math.random(0, 1) * (2 - 1) + 1;
            var delay = Math.random(0, 1) * (1 - 0) + 0;
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
        that.flyIntoTimeout = window.setTimeout(function () {
            $('.sild').css({
                left: 0,
                top: 0
            });

            $(".container").css({
                animation: "BambooTubeAnimation 15s linear infinite"
            });
        }, 2500);
        that.flyOutTimeoutEnd = window.setTimeout(function () {
            $(".container").css({
                animation: "none"
            });
            that.flyOut();
        }, this.animationTime + 2500);
    },
    /**
     * 飞出动画
     */
    flyOut: function flyOut() {

        var that = this;
        $(".sild").each(function (i, n) {

            var offset = $(n).offset();

            var amt = "@keyframes " + that.merryOut + i + " { 0% {" + "left:0px;top:0px;" + "} " + "30%{left:" + -0 + "px;" + "top:" + -0 + "px;" + "}" + "100% {left:" + -(offset.left + 1000) + "px;" + /* "top:" + (-(offset.top + 100)) + "px" +*/"} }";
            styleRule.insertRule(amt);
        });

        $(".sild").each(function (i, n) {
            var aniName = (Math.random(0, 1) * (3 - 2) + 2).toFixed(2);
            var delay = (Math.random(0, 1) * (1 - 0) + 0).toFixed(2);

            /*$(n).css({
             "animation": 'out' + i + ' ' + aniName + 's'+' linear '+delay+'s',
             "-webkit-animation": 'out' + i + ' ' + delay + 's'
             });*/
            $(n).css({
                "animation-name": that.merryOut + i,
                "animation-duration": aniName + 's',
                "animation-timing-function": "linear	",
                "animation-delay": delay + "s",
                "animation-fill-mode": "forwards",
                "-webkit-animation-fill-mode": "forwards"

            });
        });

        that.flyOutTimeout = window.setTimeout(function () {
            $(".sild").each(function (i, n) {
                $(n).remove();
            });
            $(".stage").css({
                perspective: "5000px"

            });
            $(".container").css({
                transform: "rotateX(0deg)"
            });
            that.next.init(headPortraitList);
        }, 3000);
        $('.container').css({
            "animation-duration": "none"
        });
    } /*,
      animationContainerCallback: function () {
      earthProject.flyOut();
      $(".sild").on('webkitAnimationEnd', that.animationFlyOutCallback);
      }*/
    , animationFlyIntoCallbacks: function animationFlyIntoCallbacks() {
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
    animationFlyIntoCallback: function animationFlyIntoCallback() {
        $(this).css({
            left: 0,
            top: 0
        });
        var names = $(this).css('animation');
        var cssrule = names.split(' ')[0];
        styleRule.deleteRule(cssrule);
        bambooTubesProject.animationFlyIntoCallbacks();
    },
    animationFlyOutCallback: function animationFlyOutCallback() {

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
"use strict";

var tileProject = {
    count: 0,
    total: 160,
    rows: 13,
    line: 21,
    animationTime: 10000,
    flyIntoKeyframes: "inTile",
    flyOutKeyframes: "outTile",
    isAddKeyframsIn: false,
    isAddKeyframsOut: false,
    flyIntoTimeout: null,
    flyOutTimeout: null,
    flyOutTimeoutEnd: null,
    next: null,
    init: function init(data, next) {
        $(".container").css({
            transform: "rotateX(0deg)"
        });
        $(".ani_Tile").show();
        $(".stage").hide();
        for (var i = 0; i < this.line; i++) {
            for (var l = 0; l < this.rows; l++) {
                if (data.startIndex < data.data.length) {
                    var imgSrc = data.data[data.startIndex].avatar;
                    data.startIndex++;
                } else {
                    data.startIndex = 0;
                }
                var $sild = $(' <div class="ani-tile-sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".ani_Tile_stage"));
                $sild.attr({
                    stop: l * (40 * Math.sqrt(2)),
                    sleft: i * (40 * Math.sqrt(2))
                });
            }
        }
        this.flyInto();
    },
    flyInto: function flyInto() {
        var that = this;

        $(".ani-tile-sild").each(function (i, n) {

            var top = $(n).attr('stop');
            var left = $(n).attr('sleft');
            if (!that.isAddKeyframsIn) {
                var style = document.styleSheets[0];
                var amt = "@keyframes " + that.flyIntoKeyframes + i + " { 0% {left:-4rem;top:-4rem;transform:rotate(0deg)} " + "100% {left:" + left / 100 + "rem;top:" + top / 100 + "rem;transform:rotate(45deg);} }";

                style.insertRule(amt, 0);
            }

            var durationTime = Math.random(0, 1) * (3 - 1) + 1;
            var delay = Math.random(0, 1) * (1 - 0) + 0;
            var optionstr = animationStr(that.flyIntoKeyframes + i, {
                duration: durationTime + 's',
                timingfun: '', //动画速度曲线
                delay: delay + 's', //延迟
                count: '', //动画播放次数
                direction: '' //规定是否应该轮流反向播放动画。
            });
            $(n).css('animation', optionstr);
            $(n).css('animation-fill-mode', 'forwards ');
        });
        if (!that.isAddKeyframsIn) {
            that.isAddKeyframsIn = true;
        }

        that.flyIntoTimeout = window.setTimeout(function () {
            $(".ani-tile-sild").each(function (i, n) {
                var top = $(n).attr('stop');
                var left = $(n).attr('sleft');
                $(n).css({
                    top: top / 100 + 'rem',
                    left: left / 100 + 'rem',
                    transform: 'rotate(45deg)'
                });
            });
            that.flyOutTimeoutEnd = window.setTimeout(function () {
                that.flyOut();
            }, that.animationTime);
        }, 3000);
    },
    flyOut: function flyOut() {
        var that = this;
        console.time('g');
        var leftoffset = $(document).width();
        $(".ani-tile-sild").each(function (i, n) {
            var top = $(n).attr('stop');
            var left = $(n).attr('sleft');
            if (!that.isAddKeyframsOut) {
                var amt = "@keyframes " + that.flyOutKeyframes + i + " { 0% {left:" + left / 100 + "rem;top:" + top / 100 + "rem;transform:rotate(45deg);} " + "100% {left:" + (leftoffset + 500) / 100 + "rem;" + "top:" + top / 100 + "rem;" + "transform:rotate(45deg);} }";
                styleRule.insertRule(amt);
            }
        });
        if (!that.isAddKeyframsOut) {
            that.isAddKeyframsOut = true;
        }
        console.timeEnd('g');
        $('.ani-tile-sild').each(function (i, n) {
            var duration = Math.random(0, 1) * (3 - 2) + 2;
            var delay = Math.random(0, 1) * (1 - 0) + 0;
            var optionstr = animationStr(that.flyOutKeyframes + i, {
                duration: duration + 's',
                timingfun: '', //动画速度曲线
                delay: delay + 's', //延迟
                count: '', //动画播放次数
                direction: '' //规定是否应该轮流反向播放动画。
            });
            $(n).css('animation', optionstr);
            $(n).css('animation-fill-mode', 'forwards ');
        });
        that.flyOutTimeout = window.setTimeout(function () {
            $(".ani-tile-sild").each(function (i, n) {
                $(n).remove();
            });
            $(".ani_Tile").hide();
            $(".stage").show();
            that.next.init(headPortraitList);
            //tileProject.init(headPortraitList);
        }, 3000);
    },

    animationFlyIntoCallback: function animationFlyIntoCallback() {
        $(this).css({
            left: 0,
            top: 0
        });
        tileProject.count++;
        if (tileProject.count == tileProject.total) {
            tileProject.count = 0;
            $(".container").css({
                animation: "screwAnimation 10s linear infinite"
            });
            window.setTimeout(function () {
                $(".container").css({
                    animation: "none"
                });
                tileProject.flyOut();
            }, 15000);
        }
        var names = $(this).css('animation');
        var cssrule = names.split(' ')[0];
        styleRule.deleteRule(cssrule);
    },
    animationFlyOutCallback: function animationFlyOutCallback() {

        var names = $(this).css('animation');
        var cssrule = names.split(' ')[0];
        styleRule.deleteRule(cssrule);
        $(this).remove();
        tileProject.count++;
        if (tileProject.count == tileProject.total) {
            tileProject.count = 0;
            $(".container").css({
                animation: "none"
            });
            merryGoRoundProject.init(headPortraitList);
        }
    }

};
"use strict";

/**
 * 正方形
 */

var squareProject = {
    count: 0,
    total: 225,
    animationTime: 10000,
    squareInto: "squareinto",
    squareOut: "squareout",
    keyframesInto: false,
    keyframesOut: false,
    tx: -900,
    imgWidth: 30,
    imgHeight: 30,
    flyIntoTimeout: null,
    flyOutTimeout: null,
    flyOutTimeoutEnd: null,
    next: null,
    init: function init(data) {

        /*  $(".stage").css({
              perspective:"3000px",
              "-webkit-perspective":"3000px"
          });
          $(".container").css({
              transform: "rotateX(0deg)"
          });*/
        $('.stage').css({
            width: this.imgWidth / 100 + 'rem',
            height: this.imgHeight / 100 + 'rem'
            /*   top:'29%',
               left:(($(document).width()-300)/2)/($(document).width()/100)+'%'*/
        });
        $(".ani_Tile").hide();
        $(".stage").show();

        $(".container").append("<div class=\"slidSquare\">\n            <div class=\"slidplane planerotate0\"></div>\n            <div class=\"slidplane planerotate1\"></div>\n            <div class=\"slidplane planerotate2\"></div>\n            <div class=\"slidplane planerotate3\"></div>\n            <div class=\"slidplane planerotate4\"></div>\n            <div class=\"slidplane planerotate5\"></div>\n        </div>");

        $(".slidplane").each(function (i, n) {

            var top = 0;
            var left = 0;
            var height = $(".slidplane").height();
            var width = $(".slidplane").width();
            var row = 0;
            var lie = 0;
            while ((row + 1) * 66 < height) {
                if (data.startIndex < data.data.length) {
                    var imgSrc = data.data[data.startIndex].avatar;
                    data.startIndex++;
                } else {
                    data.startIndex = 0;
                }

                var $sild = $('<div class="slidplanep"><img src=' + imgSrc + ' alt=""></div>').appendTo($(n));

                /*  $sild.css({
                 top:66*row,
                 left:66*lie
                 });*/
                var tx = 66 * row + 'px',
                    ty = 66 * lie + 'px';
                /* $sild.css({
                 transform:'translateX('+tx+') translateY('+ty+')'
                 });*/
                $sild.attr({
                    tx: tx,
                    ty: ty
                });
                lie++;
                if ((lie + 1) * 66 >= width) {
                    lie = 0;
                    row++;
                } else {}
            }
        });
        $(".slidSquare").css({
            animation: "rotateEarth 20s linear infinite",
            position: 'absolute',
            left: '-150px',
            top: '-150px'
        });
        this.flyInto();
    },
    flyInto: function flyInto() {
        var that = this;
        $(".slidplane").each(function (i, n) {
            $(n).children().each(function (i, n) {
                var style = document.styleSheets[0];
                var squareInto = that.squareInto + i;
                var tx = 0;
                var transforms = {
                    tx: $(n).attr('tx'),
                    ty: $(n).attr('ty')
                };
                var amt;

                if (!that.keyframesInto) {
                    amt = "@keyframes " + squareInto + " {\n 0% {transform:translateX(" + '-500px' + ") translateY(" + '-500px' + ");} 100% {transform:translateX(" + transforms.tx + ")  translateY(" + transforms.ty + ");}\n }";
                    style.insertRule(amt, 0);
                }

                var aniName = Math.random(0, 1) * (3 - 2) + 2;
                //var delay = (Math.random(0, 1) * ((3) - (1))) + (1);
                var delay = Math.random(0, 1) * (2 - 1) + 1;
                $(n).css({
                    "animation-name": squareInto,
                    "animation-duration": aniName + 's',
                    "animation-timing-function": "linear	",
                    "animation-delay": delay + "s",
                    "animation-fill-mode": "forwards"

                });
            });
        });
        if (!that.keyframesInto) {
            that.keyframesInto = true;
        }

        that.flyOutTimeoutEnd = window.setTimeout(function () {

            that.flyOut();
        }, that.animationTime);
    },
    flyOut: function flyOut() {
        var that = this;

        if (!that.keyframesOut) {
            that.keyframesOut = true;
        }

        $(".container").animate({
            opacity: 0
        }, 3000, function () {
            $(".slidSquare").remove();
            $(".container").css({
                opacity: 1
            });
            $('.stage').css({
                top: '50%',
                left: '50%'
            });
            squareProject.next.init(headPortraitList);
        });
        /*     $(".slidplane").remove();
             squareProject.next.init(headPortraitList);*/
    }
};
'use strict';

var logoAnimations = {
    index: 0,
    unitSet: [], //图片位置信息集合
    isCache: false, //是否已经收集过图片位置信息
    keyframesInto: false, //是否已经生成css动画
    logoInfo: "logoInfo",
    init: function init(data) {
        $('.warp').removeClass('a').css('background', '');
        $("#homebjimg").css({
            display: "none"
        });
        $(".logowrapbox").css({
            display: "block"
        });
        var $logoChildrenImg = $('.logowrap').children();
        var that = logoAnimations;
        /*$logoChildrenImg.css({
            "animation-name": "none"
        });*/
        if (headPortraitList.data.length <= 0) {
            return;
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
                var TXNUM, TYNUM, TXNUMTS, TYNUMTS;
                if (!this.keyframesInto) {
                    switch (i % 4) {
                        case 1:
                            TXNUM = -(Math.random(0, 1) * (600 - 500) + 500);
                            TYNUM = -(Math.random(0, 1) * (400 - 300) + 300);
                            TXNUMTS = Math.random(0, 1) * (300 - 50) + 200;
                            TYNUMTS = -(Math.random(0, 1) * (300 - 100) + 200);
                            break;
                        case 2:
                            TXNUM = Math.random(0, 1) * (600 - 500) + 500;
                            TYNUM = -(Math.random(0, 1) * (400 - 300) + 300);
                            TXNUMTS = -(Math.random(0, 1) * (300 - 50) + 200);
                            TYNUMTS = -(Math.random(0, 1) * (300 - 100) + 50);
                            break;
                        case 3:
                            TXNUM = -(Math.random(0, 1) * (600 - 500) + 500);
                            TYNUM = Math.random(0, 1) * (400 - 300) + 300;
                            TXNUMTS = Math.random(0, 1) * (300 - 50) + 200;
                            TYNUMTS = Math.random(0, 1) * (300 - 10) + 50;
                            break;
                        case 0:
                            TXNUM = Math.random(0, 1) * (600 - 500) + 500;
                            TYNUM = Math.random(0, 1) * (400 - 300) + 300;
                            TXNUMTS = -(Math.random(0, 1) * (300 - 50) + 200);
                            TYNUMTS = Math.random(0, 1) * (300 - 100) + 50;
                            break;

                    }
                    /*  var TXNUM = (Math.random(0, 1) * ((600) - (500))) + (500);
                      //var delay = (Math.random(0, 1) * ((3) - (1))) + (1);
                      var TYNUM = (Math.random(0, 1) * ((400) - (300))) + (300);*/
                    amt = '@keyframes ' + (that.logoInfo + i) + ' {\n 0% {transform:translateX(' + TXNUM + 'px) translateY(' + TYNUM + 'px) translateZ(678px)  scale(0);}\n 50% {transform:translateX(' + TXNUMTS + 'px) translateY(' + TYNUMTS + 'px) translateZ(300px)  scale(0.5);}\n 100% {transform:translateX(0px) translateY(0px) translateZ(0px) scale(1);}\n }';

                    styleRule.insertRule(amt, 0);
                }
                $img.attr({
                    src: headPortraitList.data[that.index].avatar
                });
                if (that.index == headPortraitList.data.length - 1) {
                    that.index = 0;
                } else {
                    that.index++;
                }
            });
            this.keyframesInto = true;
            that.isCache = true;
        } else {
            that.flyInto();
        }

        that.flyInto();
    },
    flyInto: function flyInto() {
        var $logoChildrenImg = $('.logowrap').children();
        var that = logoAnimations;
        $logoChildrenImg.each(function (i, n) {
            var $n = $(n);
            var $img = $(n).children('img');
            var logoInfo = that.logoInfo + i;

            var aniName = Math.random(0, 1) * (4 - 2) + 2;
            //var delay = (Math.random(0, 1) * ((3) - (1))) + (1);
            var delay = Math.random(0, 1) * (1 - 0) + 0;

            $n.css({
                "animation-name": logoInfo,
                "animation-duration": aniName + 's',
                "animation-timing-function": "linear	",
                "animation-delay": delay + "s",
                "animation-fill-mode": "forwards"

            });
        });
        window.setTimeout(function () {
            $logoChildrenImg.each(function (i, n) {
                $(n).css({
                    /* "transform":"scale(1);",*/
                    "animation-name": "none"
                }).addClass('itemScale');
            });
        }, 6000);
    },
    //离开当前logo展示
    leave: function leave() {
        $('.logowrap').children().removeClass('itemScale');
        $(".logowrapbox").css({
            display: "none"
        });
    }
};
'use strict';

var animationConfig = {
    first: {
        index: 0,
        name: "",
        animationProject: null
    },
    AnimationLibrary: [{
        name: 'earthProject', //地球
        index: 1
    }, {
        name: 'merryGoRoundProject', //旋转木马
        index: 2
    }, {
        name: 'screwProject', //螺旋
        index: 3
    }, {
        name: 'bambooTubesProject', //竹筒
        index: 4
    }, {
        name: 'tileProject', //平铺
        index: 5
    }, {
        name: 'squareProject', //正方形
        index: 6
    }],
    findAnimationLibrary: function findAnimationLibrary(index) {
        var obj = false;
        for (var i = 0; i < this.AnimationLibrary.length; i++) {
            var obj = this.AnimationLibrary[i];
            if (obj.index == index) {
                return obj;
            }
        }
        return obj;
    },
    temporary: function temporary() {
        for (var i = 0; i < animationConfig.AnimationLibrary.length; i++) {
            var obj = animationConfig.AnimationLibrary[i];
            window[obj.name].next = {
                init: function init() {}
                //flyIntoTimeout
            };window.clearTimeout(window[obj.name].flyIntoTimeout);
            window.clearTimeout(window[obj.name].flyOutTimeout);
            window.clearTimeout(window[obj.name].flyOutTimeoutEnd);

            /*  window[obj.name].flyIntoTimeout=null;
              window[obj.name].flyOutTimeout=null;*/
        }
        $('.container').empty();
        $(".anistage").css({
            display: "none"
        });
    },
    startAnimation: function startAnimation() {
        this.init(JSON.parse(Global.animation));
        this.first.animationProject.init(headPortraitList);
    },
    init: function init(config) {
        config = config.sort(function (a, b) {
            return Number(a.sort) - Number(b.sort);
        });
        for (var i = 0; i < config.length; i++) {
            var obj = config[i];

            //当前动画
            var animationLibraryObj = this.findAnimationLibrary(obj.index);

            //下一个动画
            if (!(i == config.length - 1)) {
                var nextObj = config[i + 1];
                var nextAnimationLibraryObj = this.findAnimationLibrary(nextObj.index);
            } else if (config.length == 1) {
                var nextAnimationLibraryObj = this.findAnimationLibrary(i);
            }

            //第一个动画
            if (i == 0) {
                this.first.index = obj.index;
                this.first.name = animationLibraryObj.name;
                this.first.animationProject = window[animationLibraryObj.name];
            }

            window[animationLibraryObj.name].next = window[nextAnimationLibraryObj.name];
            window[animationLibraryObj.name].animationTime = Number(obj.second) * 1000;

            if (i == config.length - 1) {
                window[animationLibraryObj.name].next = window[this.first.name];
            }
        }
    }

};
"use strict";

var prizesAwardsProject = {
    awardList: [], //奖项列表
    currentAward: {
        name: "",
        num: 0
    },
    resultWinning: []

};
"use strict";

var messageWallAni = {
    isload: false,
    isZmd: false,
    zmdTime: null,
    loadTime: null,
    init: function init(data) {
        // var aniTime=null;
        messageWallAni.isload = true;
        //var absTop=0;
        $(".ChatWindowBoxTC").css({ display: "block" });
        $(".BoxFixed").css({ display: "block" });
        function rnd(n, m) {
            var random = Math.floor(Math.random() * (m - n + 1) + n);
            return random;
        }

        function appendHtml(data) {
            $(".msgItemBox").children().remove();
            for (var j = 0; j < data.length; j++) {
                var obj1 = data[j];
                var htmlText = "\n                            <div class=\"mesitem\">\n                                <div class=\"ImgL\">\n                                    <img src=\"" + obj1.headimgurl + "\" alt=\"\"/>\n                                </div>\n                                <div class=\"ImgR\">\n                                    <p class=\"ImgRp1\">" + obj1.name + "\uFF1A</p>\n                                    <p class=\"ImgRp2\" style=\"font-size: " + (obj1.content.length <= 15 ? "60px" : "42px") + "\">" + obj1.content + "</p>\n                                </div>\n                            </div>";
                $(".msgItemBox").append(htmlText);
            }
        }

        function getMessage() {
            if (!messageWallAni.isload) {
                return;
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
                success: function success(data) {

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
                                if (Global.messageWallList.length > 0) {
                                    var len = Math.floor(30 / Global.rollInterval) - data.data.length;
                                    for (var i = 0; i < len; i++) {
                                        var obj = Global.messageWallList[i];
                                        Global.newMessageWallList.push(obj);
                                    }
                                } else {
                                    for (var i = 0; i < Global.newMessageWallList.length; i++) {
                                        var obj = Global.newMessageWallList[i];
                                        Global.messageWallList.push(obj);
                                    }
                                }

                                appendHtml(Global.newMessageWallList);
                            }
                        } else {
                            //Global.newMessageWallList=Global.messageWallList.slice(Math.round(Global.messageWallList.length/2))
                            Global.newMessageWallList = [];
                            if (Global.messageWallList.length > 0) {
                                for (var m = 0; m < Math.floor(30 / Global.rollInterval); m++) {
                                    var obj2 = Global.messageWallList[rnd(0, Global.messageWallList.length - 1)];
                                    Global.newMessageWallList.push(obj2);
                                }
                            } else {
                                for (var i = 0; i < Global.newMessageWallList.length; i++) {
                                    var obj = Global.newMessageWallList[i];
                                    Global.messageWallList.push(obj);
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
                            }, 30 * 1000);
                        }
                    } else {
                        Global.newMessageWallList = [];
                        if (Global.messageWallList.length > 0) {
                            for (var m = 0; m < Math.floor(30 / Global.rollInterval); m++) {
                                var obj2 = Global.messageWallList[rnd(0, Global.messageWallList.length - 1)];
                                Global.newMessageWallList.push(obj2);
                            }
                        }
                        appendHtml(Global.newMessageWallList);
                    }
                },
                error: function error(data) {
                    Global.newMessageWallList = [];
                    if (Global.messageWallList.length > 0) {
                        for (var m = 0; m < Math.floor(30 / Global.rollInterval); m++) {
                            var obj2 = Global.messageWallList[rnd(0, Global.messageWallList.length - 1)];
                            Global.newMessageWallList.push(obj2);
                        }
                    }
                    appendHtml(Global.newMessageWallList);
                }

            });
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
                        var htmlText = "\n                            <div class=\"mesitem\">\n                                <div class=\"ImgL\">\n                                    <img src=\"" + obj1.headimgurl + "\" alt=\"\"/>\n                                </div>\n                                <div class=\"ImgR\">\n                                    <p class=\"ImgRp1\">" + obj1.name + "\uFF1A</p>\n                                    <p class=\"ImgRp2\" style=\"font-size: " + (obj1.content.length <= 15 ? "60px" : "42px") + "\">" + obj1.content + "</p>\n                                </div>\n                            </div>";
                        $(".msgItemBox").append(htmlText);
                    }
                }

                if ($(".msgItemBox")) {}
                $(".msgItemBox").animate({ top: -(Math.abs(absTop) + 186) }, 300, function () {

                    var absTop = parseFloat($(".msgItemBox").css("top"));

                    animateTop(absTop);
                });
            }, Global.rollInterval * 1000);
        }

        messageWallAni.getMessage = getMessage;
        messageWallAni.animateTop = animateTop;

        function qrCodeIsShow() {
            if (messageWallAni.isload) {
                window.setTimeout(function () {
                    $(".ChatWindowBoxTC").css({ display: "block" });
                    clearTimeout(messageWallAni.zmdTime);
                    clearTimeout(messageWallAni.loadTime);

                    window.setTimeout(function () {
                        $(".ChatWindowBoxTC").css({ display: "none" });
                        var absTop = parseFloat($(".msgItemBox").css("top"));

                        animateTop(absTop);
                        getMessage();
                        qrCodeIsShow();
                    }, 60000);
                }, 300000);
            } else {
                return;
            }
        }

        /*window.setTimeout(function () {
         $(".ChatWindowBoxTC").css({display:"none"});
             getMessage();
         //qrCodeIsShow();
         },60000);*/
    },

    //离开当前消息上墙展示
    leave: function leave() {
        $(".ChatWindowBoxTC").css({ display: "none" });
        $(".BoxFixed").css({ display: "none" });
        messageWallAni.isload = false;
        messageWallAni.isZmd = false;
        clearTimeout(messageWallAni.zmdTime);
        clearTimeout(messageWallAni.loadTime);
    }
};
"use strict";

var toolbar = function ($) {
    var animationStart = function animationStart() {

        //配置动画
        if (Global.animation.length > 0) {
            animationConfig.init(JSON.parse(Global.animation));
        }
        $("#homebjimg").css({
            display: "none"
        });
        $(".anistage").css({
            display: "block"
        });
        $('.warp').removeClass('a').css('background', '');

        animationConfig.first.animationProject.init(headPortraitList);
    };

    return {
        init: function init() {
            $("#shakeShake").css({
                display: "none"
            });
            //活动主页选项卡
            $("#activeHomePageOption").on('click', animationConfig.temporary);
            $("#activeHomePageOption").on('click', logoAnimations.leave);
            $("#activeHomePageOption").on('click', messageWallAni.leave);
            $("#activeHomePageOption").on('click', function () {
                $("#homebjimg").css({
                    display: "block"
                });
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
                $('.warp').removeClass('a').css('background', '');
            });
            //logoanimition
            $("#logoanimition").on('click', animationConfig.temporary);
            $("#logoanimition").on('click', logoAnimations.init);
            $("#logoanimition").on('click', messageWallAni.leave);
            $("#logoanimition").on('click', function () {
                $("#leavelotterys").trigger('click');
            });

            //消息上墙
            $("#messageWallTsk").on('click', animationConfig.temporary);
            $("#messageWallTsk").on('click', logoAnimations.leave);
            $("#messageWallTsk").on('click', messageWallAni.init);
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
            $(".footer").mouseout(function (e) {
                e = window.event || e;
                var s = e.toElement || e.relatedTarget;
                if (document.all) {
                    if (!this.contains(s)) {
                        console.log('IE will out');
                    }
                } else {
                    var reg = this.compareDocumentPosition(s);
                    if (!(reg == 20 || reg == 0)) {
                        $(".footer").css({
                            bottom: "-117px"
                        });
                    }
                }
            });
            $(".footer").mouseover(function (e) {
                e = window.event || e;
                var s = e.toElement || e.relatedTarget;
                if (document.all) {
                    if (!this.contains(s)) {
                        console.log('IE will out');
                    }
                } else {
                    var reg = this.compareDocumentPosition(s);
                    $(".footer").css({
                        bottom: "0"
                    });
                    /*if (!(reg == 20 || reg == 0)) {
                        $(".footer").css({
                            bottom:"0"
                        });
                    }*/
                }
            });
        }
    };
}(jQuery);
"use strict";

var imgdatas = [];

$(document).ready(function () {
    //绑定背景音乐
    $("#bgMusic").attr({
        src: Global.music
    });

    $("#homebjimg").attr({
        src: Global.background
    });

    $(".ChatWindowBoxUp p img,.ChatWindowBoxTC img").attr({
        src: Global.qrcode
    });
    $(".messageTitleImg").html("\n   " + Global.title + "<span><img  src=\"" + Global.qrcode + "\" alt=\"\"></span>\n");
    //绑定工具栏事件
    toolbar.init();
    //配置动画
    if (Global.animation.length > 0) {
        animationConfig.init(JSON.parse(Global.animation));
    }

    //单张轮播动画监听
    function fr() {
        var easeinEle = $('.ease-in');
        var signSlid = $('.signSlid');
        var index = Number(signSlid.children('img').attr('index'));
        if (index == headPortraitList.data.length) {
            index = 0;
        }
        signSlid.children('img').attr({
            src: headPortraitList.data[index].avatar,
            index: ++index
        });
        var currentPosition = easeinEle.attr('currentPosition');
        if (currentPosition == 1) {

            signSlid.css({
                animation: "rotateEarth3 3s linear 1"
            });

            easeinEle.attr('currentPosition', 2);
        } else if (currentPosition == 2) {

            signSlid.css({
                animation: "rotateEarth4 3s linear 1"
            });

            easeinEle.attr('currentPosition', 3);
        } else if (currentPosition == 3) {

            signSlid.css({
                animation: "rotateEarth5 3s linear 1"
            });

            easeinEle.attr('currentPosition', 4);
        } else {
            easeinEle.attr('currentPosition', 1);

            signSlid.css({
                animation: "rotateEarth2 3s linear 1"
            });
        }
    }

    $('.ease-in-ron').on('webkitAnimationEnd', function () {
        fr();
    });

    //回车抽奖事件
    var enterCodeCallback = function enterCodeCallback(e) {
        var code = e.charCode || e.keyCode;
        if (code == 13) {
            //$(".begin").trigger('click');
            resultlotterys.startlottery();
        } else if (e.ctrlKey && code == 76) {
            //L快捷键 logo
            $("#logoanimition").trigger('click');
            e.preventDefault();
            window.event.returnValue = false;
        } else if (e.ctrlKey && code == 68) {
            //D快捷键 3D动画
            $("#signForAnimation").trigger('click');
            e.preventDefault();
            window.event.returnValue = false;
        } else if (e.ctrlKey && code == 69) {
            //空格停止抽奖中动画，展示中奖结果
            // $("#entlotterys").trigger('click');//entlotterys
            resultlotterys.entlottery();
            e.preventDefault();
            window.event.returnValue = false;
        } else if (e.ctrlKey && code == 72) {
            //H快捷键 活动主页
            $("#activeHomePageOption").trigger('click'); //entlotterys
            e.preventDefault();
            window.event.returnValue = false;
        } else if (e.ctrlKey && code == 77) {
            //H快捷键 活动主页
            $("#messageWallTsk").trigger('click'); //entlotterys
            e.preventDefault();
            window.event.returnValue = false;
        } else if (e.ctrlKey && code == 81) {
            //Q快捷键 消息上墙二维码显示隐藏
            if (messageWallAni.isload) {
                var display = $(".ChatWindowBoxTC").css('display');

                if (display == "none") {
                    $(".ChatWindowBoxTC").css({ display: "block" });
                    clearTimeout(messageWallAni.zmdTime);
                    clearTimeout(messageWallAni.loadTime);
                } else {
                    $(".ChatWindowBoxTC").css({ display: "none" });
                    var absTop = parseFloat($(".msgItemBox").css("top"));

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
            lxPrizeName: "临时奖",
            lxPrizeCount: 0,
            promptBox: false,
            promptBoxContent: "",
            promptBoxTimeOut: null,
            awardsmoment: {},
            swiperwidth: "0"
        },
        beforeUpdate: function beforeUpdate() {
            //初始化奖项列表切换功能

        },
        updated: function updated() {
            this.swiperwidth = this.awardList.length < 5 ? this.awardList.length * 78 : 78 * 5;
            this.$nextTick(function () {
                var swiper = new Swiper('.swiper-container', {
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                    slidesPerGroup: 5,
                    noSwiping: true,
                    loop: false,
                    loopFillGroupWithBlank: true,

                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                });
            });
        },
        methods: {
            Selected: function Selected(a) {
                if (Number(a.awardCount) <= 0 || Number(a.awardCount) > 60) {
                    this.promptBoxFn('中奖人数需要大于0,小于60');
                    return;
                }
                this.SelectedClickCallback();

                resultlotterys.prizeExhibition = true;
                resultlotterys.awardsmoment = a;
                this.awardsmoment = a;
            },
            especiallySelectedClick: function especiallySelectedClick(lxPrizeName, lxPrizeCount) {
                if (Number(lxPrizeCount) <= 0 || Number(lxPrizeCount) > 60) {
                    this.promptBoxFn('中奖人数需要大于0,小于60');
                    return;
                }
                this.SelectedClickCallback();

                resultlotterys.especiallyPrizeExhibition = true;
                resultlotterys.awardsmoment = {
                    jpName: "",
                    jxName: lxPrizeName,
                    awardCount: lxPrizeCount,
                    awardPic: Global.lsjimage
                };
                this.awardsmoment = {
                    jpName: "",
                    jxName: lxPrizeName,
                    awardCount: lxPrizeCount,
                    awardPic: Global.lsjimage
                };
            },
            SelectedClickCallback: function SelectedClickCallback() {
                $("#homebjimg").css({
                    display: "none"
                });
                $(".footer").css({
                    display: "none",
                    bottom: "-117px"
                });

                animationConfig.temporary();
                logoAnimations.leave();
                messageWallAni.leave();
                resultlotterys.leaveLottery();
                resultlotterys.dakai = true;
                resultlotterys.whethertherewinningresult = false; //将中奖结果显示为未中奖
                window.setTimeout(function () {
                    $(".footer").css({
                        display: "block"

                    });
                }, 100);
                Global.cjBg.length > 0 ? $('.warp').css('background', 'url("' + Global.cjBg + '")  no-repeat center center/100% 100% ') : $('.warp').addClass('a');
            },
            promptBoxFn: function promptBoxFn(text) {
                clearTimeout(this.promptBoxTimeOut);
                this.promptBox = true;
                this.promptBoxContent = text;
                var that = this;
                this.promptBoxTimeOut = window.setTimeout(function () {
                    that.promptBox = false;
                    that.promptBoxContent = "";
                }, 2000);
            }
        }
    });
    //中奖结果
    var resultlotterys = new Vue({
        el: '#resultlottery',
        data: {
            awardList: ListoFawards.awardList,
            dakai: false, //大盒子
            prizeExhibition: false, //奖品奖项展示
            especiallyPrizeExhibition: false, //特别将奖项展示
            countdown: false, //倒计时盒子
            countdowncount: 0, //倒计时计数
            countdowncountInterval: 0, //倒计时定时器
            awardsmoment: {}, //当前是几等奖
            whethertherewinningresult: true, //本轮抽奖是否已经有结果；
            isfireBack: "", //背景的火苗
            numlres: 0, //中奖人数 根据中奖人数展示中奖结果样式
            resultwinningprize: [], //真实中奖结果
            resultwinningprizeInterval: 0, //中奖结果动画定时器
            headPortraitList: headPortraitList.data, //参会人员列表
            resultprizetemporary: [], //中奖结果动画展示，结束动画时替换成真实的中奖结果 this.resultwinningprize,
            isInTheLottery: false, //是否在抽奖中，抽奖中为true，抽奖动画结束变成false.
            winningPrizeError: false, //抽奖接口异常时提示层
            winningPrizeErrorText: "" //抽奖接口异常时提示信息
        },
        methods: {
            startlottery: function startlottery(ev) {
                //开始抽奖按钮
                //先清除抽奖中动画
                //clearInterval(this.resultwinningprizeInterval);
                //抽奖中的时候不能再继续抽奖，this.isInTheLottery==true为抽奖中
                if (this.isInTheLottery) {
                    return;
                }
                //this.isInTheLottery=false;
                if (this.prizeExhibition == false && this.especiallyPrizeExhibition == false) {

                    //未选中奖项的时候不能抽奖
                    return;
                }
                this.resultwinningprize = [];
                this.resultprizetemporary = [];

                this.prizeExhibition = false;
                this.especiallyPrizeExhibition = false;
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
            countdowncalculation: function countdowncalculation() {
                //倒计时计算
                console.log(123);
            },
            leaveLottery: function leaveLottery() {
                this.dakai = false;
                this.prizeExhibition = false;
                this.especiallyPrizeExhibition = false;
                this.countdown = false;
                this.countdowncount = 0;
                this.awardsmoment = {};
                this.numlres = 0;
                this.resultwinningprize = [];
                this.resultprizetemporary = [];
                this.isInTheLottery = false;
                clearInterval(this.resultwinningprizeInterval);
                /*   that.winningPrizeError=false;
                   that.winningPrizeErrorText=""*/
            },
            resultprizecomputed: function resultprizecomputed() {
                var ListLegth = this.headPortraitList.length - 1;
                var that = this;
                var count = 0;
                var djsMS = 100;
                //
                this.numlres = that.awardsmoment.awardCount;
                this.prizeExhibition = false;
                this.especiallyPrizeExhibition = false;
                //
                this.isInTheLottery = true;
                this.resultwinningprizeInterval = window.setInterval(function () {
                    var ary = [];
                    for (var i = 0; i < that.numlres; i++) {
                        var round = Math.round(Math.random() * (ListLegth - 0) + 0);
                        var obj = that.headPortraitList[round];
                        ary.push(obj);
                    }
                    if (that.isInTheLottery === true) {
                        that.resultprizetemporary = ary;
                    } else {
                        clearInterval(that.resultwinningprizeInterval);
                        that.resultprizetemporary = that.resultwinningprize;
                    }

                    /* count+=100;
                     if(count>=10000){
                         that.resultprizetemporary=that.resultwinningprize;
                         clearInterval(that.resultwinningprizeInterval)
                     }*/
                }, djsMS);
            },
            entlottery: function entlottery() {
                this.isInTheLottery = false;
                clearInterval(this.resultwinningprizeInterval);
                var that = this;
                // this.resultprizetemporary=this.resultwinningprize;
                if (this.whethertherewinningresult) {
                    //避免重复抽奖，当为true时候证明已经抽过奖项，不能在重复抽取；
                    return;
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
                    that.especiallyPrizeExhibition = false;
                    if (data.errno > 0) {
                        that.numlres = 0;
                        that.winningPrizeError = true;
                        that.winningPrizeErrorText = data.msg;
                        window.setTimeout(function () {
                            that.winningPrizeError = false;
                            that.winningPrizeErrorText = "";
                        }, 3000);

                        return;
                    }

                    // that.isInTheLottery=true;

                    that.resultprizetemporary = data.data;
                    that.whethertherewinningresult = true;
                }, function (err) {
                    console.log(err);
                    that.numlres = 0;
                    that.winningPrizeError = true;
                    that.winningPrizeErrorText = "没有人员中奖";
                    window.setTimeout(function () {
                        that.winningPrizeError = false;
                        that.winningPrizeErrorText = "";
                    }, 3000);
                });
            },
            errorHintinFormation: function errorHintinFormation(text) {
                //错误 信息提示
                that.winningPrizeError = true;
                that.winningPrizeErrorText = text;
                window.setTimeout(function () {
                    that.winningPrizeError = false;
                    that.winningPrizeErrorText = "";
                }, 3000);
            }
        },
        computed: {}
    });
    window.ListoFawards = resultlotterys;
    window.ListoFawards = resultlotterys;
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

        if (data.errno == 0) {
            var datalength = data.data.length;
            for (var i = 0; i < datalength; i++) {
                var obj = data.data[i];
                var imgs = document.createElement('img');
                imgs.src = obj.avatar;
                imgs.onload = function (i) {
                    headPortraitList.data.push(data.data[i]);
                    if (headPortraitList.data.length == datalength) {
                        var ajaxs = function ajaxs() {
                            $.ajax({
                                url: "/activity/ajax_bigwalllastuser",
                                method: "GET",
                                dataType: "json",
                                data: {
                                    id: Global.id,
                                    timestamp: Global.timeStamp,
                                    limit: "30"
                                },
                                success: function success(data) {

                                    Global.timeStamp = Math.floor(new Date().getTime() / 1000);

                                    if (data.errno == 0) {
                                        for (var j = 0; j < data.data.length; j++) {
                                            var obj1 = data.data[j];
                                            headPortraitList.data.push(obj1);
                                        }
                                    }

                                    window.setTimeout(function () {
                                        ajaxs();
                                    }, 180000);
                                }

                            });
                        };

                        window.setTimeout(function () {
                            ajaxs();
                        }, 180000);
                    }
                }(i);
            }
            //screwProject.init(earthMath);
            if (headPortraitList.data.length > 0) {
                var index = Number($('.signSlid').children('img').attr('index'));
                $('.signSlid').children('img').attr({
                    src: headPortraitList.data[index].avatar,
                    index: ++index
                });
                $('.signSlid').css({
                    animation: 'rotateEarth2 4s linear 1'
                });
            }
        } else if (data.errno > 0) {}

        /* animation: rotateEarth2 4s linear 1;*/
        //调取奖项
        return $.ajax({
            url: "/activity/ajax_bigwallawardlist",
            method: "GET",
            dataType: "json",
            data: {
                id: Global.id
            }

        });
    }, function (err) {}).then(function (data) {
        console.log(data);
        if (data.errno == 0) {

            prizesAwardsProject.awardList = data.data;
            ListoFawards.awardList = data.data;
        }
    }, function (err) {
        console.log(err);
    });
});