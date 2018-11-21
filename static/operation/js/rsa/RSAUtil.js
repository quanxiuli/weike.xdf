//modulus //debug publicK得到
var Global = {
    rsa_key : "c0d0af4e25b41b62416c1fa460fa8cb9778cd662fa22a8c7c1dce25903b7b17455b194d394db89f02c38fe546cd62273e0cb54f621156c039e6ccaa5773aa23fe82ef1feaee68a81aa0ab9349940656daa22469ff2d9ac2decef6377bf9a163a6b1639e38f130aeeb4648ee15ced0e0553db07820a8869f0becb477879e14e6d58f54c44819c6742ac57f7b33aa235ed8d970fcd8d6a25486a818a323134e873beb380245a15f38a83b8d7d8edcaa662a44b7e889d89ffa6c94ef56889ef3f7612778f60c5b2c893db4b294e8fffb92b89de981b2c4397a03f63000994eaf9962d477646550953c8a12080253cc5f45435a989435b4d47da119d43bc2a9da55d",
    encryption : "10001",
    decryption : "10001",
    appId : "d2bff756072b40e0ba7951284169ec1f",
    actionURL:"http://mihsf.staff.xdf.cn/mihsf/security/callService.do",
    previewURL: "http://appfree.xdf.cn/Activity/ActivityInfoPreview.aspx?channel=Wechat&activityId=",
    previewURL_new: "http://apphome.staff.xdf.cn/xdfhome/raiseClassNew/indexPre.html?activityId=",
    baseUploadPath:"http://apphome.staff.xdf.cn/xdfmanager/",
    cartID:"iPocketXDFApp",
    //buyDomain:"http://online.bm.staff.xdf.cn"//测试
    buyDomain:"http://bm.xdf.cn"//正式
};

/**
 * rsa加密封装
 * @param {} parseJsonObj 密文json对象
 * @retun base64编码
 */
function rsaEncryptedString (parseJsonObj){
    // n的十六进制位数/2+3
    setMaxDigits(262);
    // 第一个参数为加密指数、第二个参数为解密参数、第三个参数为加密系数（公钥）,10001 => e的十六进制
    var key = new RSAKeyPair(Global.encryption, Global.decryption, Global.rsa_key, 2048);
    var parse_str = encodeURIComponent(JSON.stringify(parseJsonObj));
    var rsa_rs = '';
    var len = 200;

    if(parse_str.length > len){//字符串超过256,分段加密
        var arr = createStrArr(parse_str,len);
        for(var i = 0; i < arr.length; i ++){
            // 返回加密后的字符串
            rsa_rs += encryptedString(key,arr[i],RSAAPP.PKCS1Padding);
        }
    }else{
        // 返回加密后的字符串
        rsa_rs = encryptedString(key,parse_str,RSAAPP.PKCS1Padding);
    }
    return hex2b64(rsa_rs);
}

/*
 * 加密串分段
 */
function createStrArr (str,len){
    var num = parseInt(str.length/len),
        strArr = [];
    for(var i = 0;i < num+1;i++){
        if(str.length > len){
            if(str.charAt(len-1)=="%"){
                strArr.push(str.substring(0,len+2));
                str = str.substring(len+2,str.length);
            } else if (str.charAt(len-2)=="%"){
                strArr.push(str.substring(0,len+1));
                str = str.substring(len+1,str.length);
            } else {
                strArr.push(str.substring(0,len));
                str = str.substring(len,str.length);
            }
        }else{
            strArr.push(str);
            str = str.substring(str.length);
        }
    }
    return strArr;
}

/**
 * 封装基本参数和业务参数
 * @param {} businessParam
 * @param {} serviceId
 */
function constructionParams (businessParam,serviceId){
    var params = {};

    params["MIHSFParam"] = JSON.stringify({
        appId : Global.appId,
        serviceId : serviceId
    });

    params["businessParam"] = businessParam;

    return params;
}
