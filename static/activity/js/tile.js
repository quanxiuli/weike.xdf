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
    flyIntoTimeout:null,
    flyOutTimeout:null,
    flyOutTimeoutEnd:null,
    next: null,
    init: function (data, next) {
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
                    data.startIndex = 0
                }
                var $sild = $(' <div class="ani-tile-sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".ani_Tile_stage"));
                $sild.attr({
                    stop: l * (40 * Math.sqrt(2)),
                    sleft: i * (40 * Math.sqrt(2))
                });
            }

        }
        this.flyInto()
    },
    flyInto: function () {
        var that = this;

        $(".ani-tile-sild").each(function (i, n) {

            var top = $(n).attr('stop');
            var left = $(n).attr('sleft');
            if (!that.isAddKeyframsIn) {
                var style = document.styleSheets[0];
                var amt = "@keyframes " + that.flyIntoKeyframes + i + " { 0% {left:-4rem;top:-4rem;transform:rotate(0deg)} " +
                    "100% {left:" + left / 100 + "rem;top:" + top / 100 + "rem;transform:rotate(45deg);} }";

                style.insertRule(amt, 0);
            }

            var durationTime = (Math.random(0, 1) * ((3) - (1))) + (1);
            var delay = (Math.random(0, 1) * ((1) - (0))) + (0);
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

      that.flyIntoTimeout=  window.setTimeout(function () {
            $(".ani-tile-sild").each(function (i, n) {
                var top = $(n).attr('stop');
                var left = $(n).attr('sleft');
                $(n).css({
                    top: top / 100 + 'rem',
                    left: left / 100 + 'rem',
                    transform: 'rotate(45deg)'
                })
            });
           that.flyOutTimeoutEnd= window.setTimeout(function () {
                that.flyOut();
            }, that.animationTime);
        }, 3000);
    },
    flyOut: function () {
        var that = this;
        console.time('g');
        var leftoffset = $(document).width();
        $(".ani-tile-sild").each(function (i, n) {
            var top = $(n).attr('stop');
            var left = $(n).attr('sleft');
            if (!that.isAddKeyframsOut) {
                var amt = "@keyframes " + that.flyOutKeyframes + i + " { 0% {left:" + left / 100 + "rem;top:" + top / 100 + "rem;transform:rotate(45deg);} " +
                    "100% {left:" + (leftoffset + 500) / 100 + "rem;" + "top:" + (top / 100) + "rem;" + "transform:rotate(45deg);} }";
                styleRule.insertRule(amt);
            }


        });
        if (!that.isAddKeyframsOut) {
            that.isAddKeyframsOut = true;
        }
        console.timeEnd('g');
        $('.ani-tile-sild').each(function (i, n) {
            var duration = (Math.random(0, 1) * ((3) - (2))) + (2);
            var delay = (Math.random(0, 1) * ((1) - (0))) + (0);
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
        that.flyOutTimeout= window.setTimeout(function () {
            $(".ani-tile-sild").each(function (i, n) {
                $(n).remove();
            });
            $(".ani_Tile").hide();
            $(".stage").show();
            that.next.init(headPortraitList);
            //tileProject.init(headPortraitList);
        }, 3000);


    },

    animationFlyIntoCallback: function () {
        $(this).css({
            left: 0,
            top: 0
        });
        tileProject.count++;
        if (tileProject.count == tileProject.total) {
            tileProject.count = 0
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
    animationFlyOutCallback: function () {

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