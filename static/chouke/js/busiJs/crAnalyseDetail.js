var totalCounts = 0;
var currentPage = 1;
var pageSize = 50;
function show(page){
	 jQuery.ajax({
        type: "POST",
        url: '/chouke/ajax_getanalysedetail',
        async: false,//同步
        dataType: 'json',
        data: {id:$('#crId').val(),currentPage:page,pageSize:pageSize},
        success: function (json) {
            if (json.result == true) {
                totalCounts = json.totalCount;
                initPage(totalCounts, page);
                var str = "";
                for (var i = 0; i < json.dataList.length; i++) {
                    var listi = json.dataList[i];
                    var nickName = listi["nickname"];
                    var mobile = listi["mobile"];
                    var payState = listi["payState"];
                    var classCode = listi["classCode"];
                    var classPrice = listi["classPrice"];
                    var recomUser = listi["recomUser"];
                    var orderNumber = listi["orderNumber"];
                    var createTime = listi["createTime"];
                    var myRecomUsers = listi["myRecomUsers"];
                    if (i % 2 == 1) {
                        str += "<tr class='table-tr-odd'>";
                    } else {
                        str += "<tr class='table-tr-even'>";
                    }
                    str += "<td>"+nickName+"</td>";
                    str += "<td>"+mobile+"</td>";
                    str += "<td>"+(payState==1?'成功':'未支付')+"</td>";
                    str += "<td>" + createTime + "</td>";
                    str += "<td>" + classCode + "</td>";
                    str += "<td>" + classPrice + "</td>";
                    str += "<td>" + recomUser + "</td>";
                     str += "<td>" + myRecomUsers + "</td>";
                    str += "<td>" + orderNumber + "</td>";
                    
                    str += "</tr>";
                }
                $("#activiy_user_tbody").html(str);
            } else {
                layer.msg("查询失败!", {icon: 5});
            }
        }
    });
}
$(function(){
	 show(1);
});
function initPage(totalCounts, currentPage) {
    // console.log("initPage: totalCounts --> " + totalCounts + "\tcurrentPage --> " + currentPage);
    if (totalCounts != null && totalCounts != 0) {
        $.jqPaginator("#publicPage", {
            totalCounts: totalCounts,
            pageSize: pageSize,
            visiblePages: 10,
            currentPage: currentPage,
            prev: '<a class="pPrev" href="javascript:;">上一页</a>',
            next: '<a class="pNext" href="javascript:;">下一页</a>',
            page: '<a href="javascript:;">{{page}}</a>',
            activeClass: 'pCurrent',
            onPageChange: function (num, type) {
                // console.log("type --> " + type + "\tnum --> " + num + "\ttotalCounts --> " + totalCounts + "\tpageSize --> " + pageSize );
                if (type != "init") {
                    show(num);
                }
            }
        });
    } else {
        $("#publicPage").html("");
    }
}
function exportExcel(){
	window.location.href = '/chouke/downloadcrexcel?id='+$('#crId').val();
}

