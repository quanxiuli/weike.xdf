/*
    @param：
        @cityId:城市ID，可手动添加，可动态获得
        @categoryCode:课程分类编码，多个用英文逗号隔开
        @size:条数
        @attr:属性筛选，由属性值拼接而成，多个属性值用英文分号隔开。
    @method：
        ClassRecommend.GetTopRegClassByCityCategory  热报课程
        ClassRecommend.GetUpcomingClassByCityCategory 即将开班课程
    @p:
        @cid:城市ID
        @city:城市名
        @obj:元素ID
*/

var xdf;
xdf =(function( xdf ){
    return xdf;
})( xdf || {});
    xdf.data = [
        {id: "1", name: "北京"},
        {id: "2", name: "上海"},
        {id: "3", name: "广州"},
        {id: "4", name: "武汉"},
        {id: "5", name: "天津"},
        {id: "6", name: "西安"},
        {id: "7", name: "南京"},
        {id: "8", name: "深圳"},
        {id: "9", name: "沈阳"},
        {id: "10", name: "重庆"},
        {id: "11", name: "成都"},
        {id: "14", name: "襄阳"},
        {id: "15", name: "哈尔滨"},
        {id: "16", name: "长沙"},
        {id: "18", name: "长春"},
        {id: "19", name: "杭州"},
        {id: "20", name: "郑州"},
        {id: "21", name: "太原"},
        {id: "22", name: "济南"},
        {id: "23", name: "苏州"},
        {id: "24", name: "石家庄"},
        {id: "25", name: "合肥"},
        {id: "26", name: "福州"},
        {id: "27", name: "昆明"},
        {id: "28", name: "鞍山"},
        {id: "29", name: "株洲"},
        {id: "30", name: "佛山"},
        {id: "31", name: "宜昌"},
        {id: "32", name: "无锡"},
        {id: "34", name: "荆州"},
        {id: "35", name: "南昌"},
        {id: "36", name: "大连"},
        {id: "37", name: "黄石"},
        {id: "38", name: "宁波"},
        {id: "40", name: "兰州"},
        {id: "41", name: "厦门"},
        {id: "44", name: "青岛"},
        {id: "45", name: "南宁"},
        {id: "46", name: "徐州"},
        {id: "48", name: "湘潭"},
        {id: "49", name: "镇江"},
        {id: "50", name: "吉林"},
        {id: "51", name: "杭州"},
        {id: "52", name: "南通"},
        {id: "53", name: "洛阳"},
        {id: "54", name: "呼和浩特"},
        {id: "55", name: "乌鲁木齐"},
        {id: "56", name: "唐山"},
        {id: "57", name: "贵阳"},
        {id: "58", name: "十堰"},
        {id: "59", name: "温州"},
        {id: "60", name: "烟台"},
        {id: "61", name: "潍坊"},
        {id: "64", name: "珠海"}
    ];

var id;
var area = "";
var schoolid = "";
xdf.areaToId = function(area){
    for(var i=0;i<xdf.data.length;i++){
        if(xdf.data[i].name == area){
            return xdf.data[i].id;
        }
    }
}
function getClass(categoryCode,attr,size,tableID,mathod){//第五个参数设为"Upcoming"即为即将开课，否则默认调用热报课程
    $.get("http://shujia.xdf.cn/Index/ip", function (json) {
        area = json.area;
        schoolid = json.schoolid;
        //id = xdf.areaToId(area);//地区转化成城市ID
        if(xdf.areaToId(area)){
            id = xdf.areaToId(area);//地区转化成城市ID
        }else{
            id = schoolid;
        }
        callBack(categoryCode,attr,size,tableID,mathod);
    }, 'jsonp');
}
function callBack(categoryCode,attr,size,tableID,mathod){
    var time = getNowFormatDate();//获取格式化时间戳
    var getMathod,getArray;
    if(mathod == "Upcoming"){
        getMathod = "ClassRecommend.GetUpcomingClassByCityCategory";
    } else {
        getMathod = "ClassRecommend.GetTopRegClassByCityCategory";
    }
    var param = {
        "cityId": id,
        "categoryCode": categoryCode,
        "attr": attr,
        "size": size
    }
    var json = JSON.stringify(param);
    $.get(
        "http://cmsdt.xdf.cn/get_souke.php",{
            method: getMathod,
            timestamp: time,
            AppId: "0",
            param:json
        },
        function (data) {
            console.log(data);
            if(data.Status==1){
                if(mathod == "Upcoming"){
                    var array = data.ResponseData.UpcomingClassList;
                } else {
                    var array = data.ResponseData.TopRegClassList;
                }
                console.log(array);
                for(var i=0;i<array.length;i++){
                    array[i]["city"] = area;
                    array[i]["StartDate"] = array[i]["StartDate"].substr(0,10);
                    array[i]["link"] = "http://souke.xdf.cn/Class/" + id + "-" + array[i]["Id"] + ".html";
                }
                $("#Template").tmpl(array).appendTo(tableID);
            } else {
                alert("数据调取失败！");
            }
        },
        'jsonp'
    );
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}