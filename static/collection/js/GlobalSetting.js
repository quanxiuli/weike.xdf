/**
 * Created by v_mengwenli on 2018/6/1.
 */

$(function(){
    /*根据浏览器窗口的变化，动态添加高度*/
    $(window).resize(function(){
        var h=$(window).height()-106;
        var w=$(".section").width()-212;
        var h2=$(window).height()-204;
        $(".sj_jbgd").css("height",h2+"px");
        var h1=$(window).height()-159;/*收集项管理*/
        $(".Collection_Down").css("height",h1+"px");
        $(".Collection_Down_QXSZ").css("height",h1+"px");
        $(".Collection_Down_GJC").css("height",h1+"px");
        var h3=h-70;
        $(".Collection_Down_QXSZ_BD").css("height",h3+"px");
        $(".section").css("height",$(window).height()+"px");
        $(".sectionR").css("width",w+"px");
        $(".yulan_Fixed div").css("height",($(window).height()-60)+"px");


    }).resize();
});
$(document).ready(function () {
    /*模态框关闭*/
        $(".Close").click(function () {
        $("#ModalFrame_FB").hide();
        $("#ModalFrame").hide();
        $("#ModalFrame_SC").hide();
        $("#ModalFrame_BJYSC").hide();
        $("#ModalFrame_DYDM").hide();
        $("#ModalFrame_TSSJ").hide();
        $("#ModalFrame_DRSJ").hide();
    });
});

