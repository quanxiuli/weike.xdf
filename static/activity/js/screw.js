var screwProject = {
    count: 0,
    total: 160,
    circleNum: 3,//左右分别加几圈
    animationTime: 10000,//动画时长
    flyIntoKeyframes: "inScrew",
    flyOutKeyframes: "outScrew",
    isAddKeyframsIn: false,
    isAddKeyframsOut: false,
    imgWidth: 40,
    imgHeight: 40,
    flyIntoTimeout:null,
    flyOutTimeout:null,
    flyOutTimeoutEnd:null,
    next: null,
    init: function (data) {
        //设置图片宽度
        $(".stage").css({
            perspective:"2000px",
            "-webkit-perspective":"2000px"
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

        var widths = 60, heights = 60, oneLength = 20, tx = 6;
        for (var i = 0; i < options.circleNumber * this.circleNum; i++) {//translateY(216px) translateZ(200px)
            //加载图片数据
            if (data.startIndex < data.data.length) {
                var imgSrc = data.data[data.startIndex].avatar;
                data.startIndex++;
            } else {
                data.startIndex = 0
            }
            //插入元素
            var $sild = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".container"));
            $sild.css({
                'transform': 'translateX(' + (tx * i)/100 + 'rem) rotateX(' + (options.rotateDEG * i) + 'deg)  translateZ(' + (options.tz - 150)/100 + 'rem)'
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
        for (var i = 0; i < options.circleNumber * this.circleNum; i++) {//translateY(216px) translateZ(200px)
            if (data.startIndex < data.data.length) {
                var imgSrc = data.data[data.startIndex].avatar;
                data.startIndex++;
            } else {
                data.startIndex = 0
            }
            var $sild = $(' <div class="sild"><img src="' + imgSrc + '" alt=""></div>').appendTo($(".container"));

            $sild.css({
                'transform': 'translateX(' + (-tx * i)/100 + 'rem) rotateX(' + (-options.rotateDEG * i) + 'deg)  translateZ(' + (options.tz - 150)/100 + 'rem)'
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
    flyInto: function () {
        var that = this;
        $(".sild").each(function (i, n) {
            var positiontop = $(n).attr('positiontop');
            var top=$(n).attr('top');
            if(!that.isAddKeyframsIn){
                var style = document.styleSheets[0];

                var amt = "@keyframes " + that.flyIntoKeyframes + i + " { 0% {top:"+(-(parseInt(top)+200))/100+"rem;} " +
                    "100% {top:" + 0 + "rem;} }";
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

            $(n).css('animation',optionstr);
            $(n).css('animation-fill-mode', 'forwards ');

        });
       that.flyIntoTimeout= window.setTimeout(function(){
            $(".sild").css({
                top:0,
                left:0
            })
            $(".container").css({
                animation: "screwAnimation 10s linear infinite"
            });
           that.flyOutTimeoutEnd= window.setTimeout(function(){
                that.flyOut();
            },that.animationTime);
        },3000);
        if(!that.isAddKeyframsIn){
            that.isAddKeyframsIn=true;
        }

    },
    flyOut: function () {
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
            if(!that.isAddKeyframsOut){
                var amt = "@keyframes " + that.flyOutKeyframes + i + " { 0% {} " +
                    "100% {left:" + (-(0)) + "rem;" + "top:" + (tops + 300)/100 + "rem" + "} }";

                styleRule.insertRule(amt);

            }

        });
        if(!that.isAddKeyframsOut){
          that.isAddKeyframsOut=true;
        }

        $('.sild').each(function (i, n) {
            var delay = (Math.random(0, 1) * ((3) - (2))) + (2);
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
        that.flyOutTimeout= window.setTimeout(function(){
            $('.sild').remove();
            $(".container").css({
                animation: "none"
            });
            that.next.init(headPortraitList);
        },3000)

    },

    animationFlyIntoCallback: function () {
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
    animationFlyOutCallback: function () {

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