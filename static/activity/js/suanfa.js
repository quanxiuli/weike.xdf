/**
 * Created by v_luhaiping on 2017/11/27.
 */
function sufa(imgWidth,circleNumber){
   // var imgWidth=60;
    //var circleNumber=40;//一圈的数量
    var tz= Math.round( (imgWidth / 2 ) / Math.tan( ( ( Math.PI * 2 ) / circleNumber ) / 2 ) );
    tz+=250;
    var rotateDEG=360/circleNumber;
    return {
        tz:tz,
        rotateDEG:rotateDEG,
        circleNumber:circleNumber,
        imgWidth:imgWidth
    }
}

/**
 *
 * @param sname
 * @param option
 * @returns {string}
 */
function animationStr(sname,option={
    duration:'3s',
    timingfun:'linear',//动画速度曲线
    delay:'0s',//延迟
    count:'0',//动画播放次数
    direction:''//规定是否应该轮流反向播放动画。
}){

    let {duration,timingfun,delay,count,direction}=option;

    let str=`${sname} ${duration} ${timingfun} ${delay} ${count} ${direction}`;
    return str
};


function transformList(ele){
    const regs=/\-?[0-9]+\.?[0-9]*/g;
    ele.style.transform.match(regs);
};

function ts(elewidth,eleheight){
    let dh=document.body.scrollHeight;
    let dw=document.body.scrollWidth;
    var tx=dw-($(n).width()+offtop.left+parofftop.left);
    var ty=(dh/2)-((eleheight+offtop.top+parofftop.top));
    var tyz=parseInt(Math.random(0,1)*((dh/2+30)-(dh/2-30))) + (dh/2-30);
    var txz=parseInt(Math.random(0,1)*((tx+300)-(tx+100))) + (tx+100);
    return {

    }
}
