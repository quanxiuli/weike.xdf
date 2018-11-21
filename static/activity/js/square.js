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
    flyIntoTimeout:null,
    flyOutTimeout:null,
    flyOutTimeoutEnd:null,
    next: null,
    init: function (data) {

      /*  $(".stage").css({
            perspective:"3000px",
            "-webkit-perspective":"3000px"
        });
        $(".container").css({
            transform: "rotateX(0deg)"
        });*/
        $('.stage').css({
            width: this.imgWidth / 100 + 'rem',
            height: this.imgHeight / 100 + 'rem',
         /*   top:'29%',
            left:(($(document).width()-300)/2)/($(document).width()/100)+'%'*/
        });
        $(".ani_Tile").hide();
        $(".stage").show();

        $(".container").append(`<div class="slidSquare">
            <div class="slidplane planerotate0"></div>
            <div class="slidplane planerotate1"></div>
            <div class="slidplane planerotate2"></div>
            <div class="slidplane planerotate3"></div>
            <div class="slidplane planerotate4"></div>
            <div class="slidplane planerotate5"></div>
        </div>`);


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
                    data.startIndex = 0
                }


                var $sild = $('<div class="slidplanep"><img src='+imgSrc+' alt=""></div>').appendTo($(n));

                /*  $sild.css({
                 top:66*row,
                 left:66*lie
                 });*/
                var tx = 66 * row + 'px', ty = 66 * lie + 'px';
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
                } else {

                }

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
    flyInto: function () {
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
                    amt = `@keyframes ${squareInto} {
 0% {transform:translateX(${'-500px'}) translateY(${'-500px'});} 100% {transform:translateX(${transforms.tx})  translateY(${transforms.ty});}
 }`;
                    style.insertRule(amt, 0);

                }


                var aniName = (Math.random(0, 1) * ((3) - (2))) + (2);
                //var delay = (Math.random(0, 1) * ((3) - (1))) + (1);
                var delay = (Math.random(0, 1) * ((2) - (1))) + (1);
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



        that.flyOutTimeoutEnd=  window.setTimeout(function () {

            that.flyOut();
        }, that.animationTime);

    },
    flyOut: function () {
        var that = this;


        if (!that.keyframesOut) {
            that.keyframesOut = true
        }

        $(".container").animate({
            opacity: 0
        }, 3000,function(){
            $(".slidSquare").remove();
            $(".container").css({
                opacity:1
            });
            $('.stage').css({
                top:'50%',
                left:'50%'
            });
            squareProject.next.init(headPortraitList);
        } );
   /*     $(".slidplane").remove();
        squareProject.next.init(headPortraitList);*/
    }
}
