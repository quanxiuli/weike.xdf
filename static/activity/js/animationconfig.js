var animationConfig = {
    first: {
        index: 0,
        name: "",
        animationProject: null
    },
    AnimationLibrary: [
        {
            name: 'earthProject',//地球
            index: 1
        },
        {
            name: 'merryGoRoundProject',//旋转木马
            index: 2
        },
        {
            name: 'screwProject',//螺旋
            index: 3
        },
        {
            name: 'bambooTubesProject',//竹筒
            index: 4
        },
        {
            name: 'tileProject',//平铺
            index: 5
        },
        {
            name: 'squareProject',//正方形
            index: 6
        }
    ],
    findAnimationLibrary: function (index) {
        var obj = false;
        for (var i = 0; i < this.AnimationLibrary.length; i++) {
            var obj = this.AnimationLibrary[i];
            if (obj.index == index) {
                return obj;
            }
        }
        return obj;
    },
    temporary: function () {
        for (var i = 0; i < animationConfig.AnimationLibrary.length; i++) {
            var obj = animationConfig.AnimationLibrary[i];
            window[obj.name].next = {
                init: function () {

                }
            }
            //flyIntoTimeout
            window.clearTimeout(window[obj.name].flyIntoTimeout);
            window.clearTimeout(window[obj.name].flyOutTimeout);
            window.clearTimeout(window[obj.name].flyOutTimeoutEnd);

          /*  window[obj.name].flyIntoTimeout=null;
            window[obj.name].flyOutTimeout=null;*/
        }
        $('.container').empty();
        $(".anistage").css({
            display:"none"
        })
    },
    startAnimation: function () {
        this.init(JSON.parse(Global.animation));
        this.first.animationProject.init(headPortraitList);
    },
    init: function (config) {
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
            } else if(config.length==1){
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
    },

};