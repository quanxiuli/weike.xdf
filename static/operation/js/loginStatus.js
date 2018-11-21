window.setInterval("checkStatus()", 1000 * 3);//3秒检查一次

function checkStatus() {
    if (!getCookie("loginId")) {
        layer.msg("登陆状态已过期,请重新登陆!", {icon: 5});
        setTimeout("toLogout('91411a1a05fd4571859044ed18892ac1')", 1000);
    }
}/**
 * Created by zhaolong4 on 2017/3/15.
 */
