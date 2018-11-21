/**
 * Created by zhaotengfei
 * date: 2015/12/23.
 * version: 0.0.1
 * intro: ajax pull date (拉取文章列表及内容 - )
 * base on: jQuery, jQuery.tmpl
 */

var jQuery = jQuery || null;

// 依赖 jQuery
(function(w, d, $){
    // jQuery 不存在
    if(!$){
        return false;
    }
    // 默认配置信息
    var options = {
        currentPage: 1, // 查询页
        total: 3, // 查询条数
        typeId: "1349", // typeId
        onlyPic: false, // 是否只显示图片
        ajaxUrl: "http://cmsdt.xdf.cn/get_main_article_for_js.php?typeids=", // 默认查询url
        styleClass: "" // 等待时的 class
    };

    /* 获取文章列表
     * artObj --- 拉取信息(修改默认配置信息)
     *
     **/
    function getArticleList(artObj, tempId, eleId){

        // 载入中class
        if(artObj.hasOwnProperty("styleClass") && artObj.styleClass !== ""){
            $(eleId).addClass(artObj.styleClass);
        }

        ajaxPullData(artObj, tempId, eleId);
    }

    /* ajax 获取文章数据
     * artObj - 配置信息
    **/
    function ajaxPullData(artObj, tempId, eleId){
        var settings = $.extend({}, options, artObj);
        // 拼接url
        var url = settings.ajaxUrl + settings.typeId + "&pageid=" + settings.currentPage +
            (settings.onlyPic ? "&pic=1" : "") +"&row=" + settings.total;
        $.ajax({
            url: url,
            dataType: "jsonp",
            timeout: 8000,
            jsnop: "callback",
            success: function(data){
                w.console.log(data);
                appendTo(data, tempId, eleId);
            },
            error: function(xhr, type){
                w.alert("网络链接错误");
            }
        });
    }

    /* 页面数据填充
     * data - 文章列表数据
     * tempId - 模板id
     * eleId - 插入节点id
    **/
    function appendTo(data, tempId, eleId){
        if(options.styleClass !== ""){
            $(eleId).removeClass(options.styleClass);
        }
        // 页面添加
        $(tempId).tmpl(data).appendTo(eleId);
    }

    w.getArticleList = getArticleList;

})(window, document, jQuery);
