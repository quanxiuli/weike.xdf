/**
 *  Created by huangyongchao  2016/10/13
 */


var checkFlag = false; /*设置检查结果 用于提交验证*/
var selectImg = 1;
var publicityObj = {};
var uploadFlag1 = false;
var uploadFlag2 = false;
function initUploadPic(file,callback){
    /*检查图片类型*/
    if (!checkImgType(file.value)) {
        //$(file.form).next()[0].innerHTML = '图片格式错误';
        layer.msg('图片格式错误', {icon: 5});
        return false;
    }
    /*检查图片大小*/
    var fileData = file.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        var image = new Image();
        image.onload=function(){
            /*获取图片宽高*/
            var width = image.width;
            var height = image.height;
            if(checkImgSize(file,width,height)){
                callback(file);
            }else{
                //$(file.form).next()[0].innerHTML ='图片尺寸不符合要求';
                layer.msg('图片尺寸不符合要求', {icon: 5});
                return false;
            }

        };
        image.src= data;
    };
    reader.readAsDataURL(fileData);
}
function upLoadPicCallback(file){
    if(checkFlag){
        var action =  Global.baseUploadPath+'upload/uploadFile.do';
        file.form.action= action ;
        $(file.form).ajaxSubmit(function (data) {
            // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
            if (data.success == true) {
                //设置图片预览
                if(selectImg == 1 ){

                    $('#preview2')[0].src= data.fileUrl;
                    publicityObj['smallPic']=data.fileUrl;
                    uploadFlag1 = true;
                }else{
                    $('#preview3')[0].src= data.fileUrl;
                    $('#preview1')[0].src= data.fileUrl;
                    publicityObj['bigPic']=data.fileUrl;
                    uploadFlag2 = true;
                }
                $(file.form.filename).val(data.fileName);
                $(file.form.picurl).val(data.fileUrl);

            } else {
                $(file.form).next()[0].innerHTML = '上传失败';
            }
        });
    }

}


function uploadPic(obj){
    if(this.files && this.files[0]){
        selectImg = obj.data;
        initUploadPic(this,upLoadPicCallback);
        return false;
    } else {
        layer.msg("请选择文件", {icon: 5});
    }


}

function checkImgType(file) {
    if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|JPEG|PNG|BMP)$/.test(file)) {
        return false;
    }
    // 设置检查结果
    checkFlag = true;
    return true;
}

function  checkImgSize(file,width,height){
    //return true;
    if(file.form.picWidth.value && file.form.picHeight.value &&  (file.form.picWidth.value == width) &&( file.form.picHeight.value == height) ){
        // 设置检查结果
        checkFlag = true;
        return true;
    }
    return false;
}
/*保存数据*/
function saveUpload(){
    /*封装参数对象*/
    publicityObj['status']=$('input[name="qs"]:checked').val();
    publicityObj['creatorId']=getCookie("loginId");
    publicityObj['updateId']=getCookie("loginId");
    publicityObj['jumpLinkUrl']=$('#jumpLinkUrl').val();

    var url = "http://localhost:8080/xdfmanager/publicityPic/addPublicityPic.do"
    /*设置服务接口地址和参数加密*/
    var serviceId = 'd90d33011d904e6293e732a4782e8751';
    var d = constructionParams(rsaEncryptedString(publicityObj), serviceId);
    /*如果图片已上传标识均为true则能保存 反之*/
    if( uploadFlag1 && uploadFlag2){
        /*发送数据*/
        jQuery.ajax({
            type: "POST",
            url: Global.actionURL,
            //url:url,
            contentType:'application/json',
            async: true,
            dataType: 'json',
            //data: JSON.stringify(publicityObj),
            data: JSON.stringify(d),
            success: function (json) {
                layer.msg("操作成功", {icon: 6});
            },
            error:function(){
                layer.msg("操作失败，请稍后重试", {icon: 5});
            }
        });
    }else{
        layer.msg("请全部上传图片后保存", {icon: 5});
    }


}

function getPic(){

    var url = "http://localhost:8080/xdfmanager/publicityPic/getPublicityPicReal.do"
    var serviceId = '1734a196ef9e4eb5aca9fa721310d7c5';
    var d = constructionParams("", serviceId);
    jQuery.ajax({
        type: "POST",
        url: Global.actionURL,
        //url:url,
        async: true,
        dataType: 'json',
        //data: "",
        data: JSON.stringify(d),
        success: function (json) {
            /*设置上传图标标识为已经上传*/
            if(json.data.status==1){
                $('input[name="qs"]:first')[0].checked=true;

            }else{
                $('input[name="qs"]:last')[0].checked=true;
            }

            /*如果没有图片那么设置为默认图片*/
            if(!json || !json.data || (json.data.smallPic == null)){
                $('#preview1')[0].src="../../images/spreadPage.jpg";
                $('#preview2')[0].src="../../images/upfile-icon.png";
                $('#preview3')[0].src="../../images/upfile-icon.png";
            }else{
                /*初始化保存参数*/
     /*           if(json.data.status==1){
                    $('input[name="qs"]:first').attr('checked', 'checked');
                }else{
                    $('input[name="qs"]:last').attr('checked', 'checked');
                }*/

                $('#preview1')[0].src= json.data.bigPic;
                $('#preview2')[0].src= json.data.smallPic;
                $('#preview3')[0].src= json.data.bigPic;
                $('#jumpLinkUrl').val(json.data.jumpLinkUrl)

                uploadFlag1 = true;
                uploadFlag2 = true;
            }
        },
        error:function(){
            /*如果查询异常设置成默认图片*/
            $('#preview1')[0].src="../../images/spreadPage.jpg";
            $('#preview2')[0].src="../../images/upfile-icon.png";
            $('#preview3')[0].src="../../images/upfile-icon.png";
        }
    });

}

$(document).ready(function(){
    $("#pic1").bind("change",1,uploadPic);
    $("#pic2").bind("change",2,uploadPic);
    $("#saveUpload").bind("click",saveUpload);
    /*$("#cancelUpload").bind("click",getPic);*/
    $("#getPic").bind("click",getPic);
    getPic();
});