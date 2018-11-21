
/**
 * rsa加密封装
 * @param {} parseJsonObj 密文json对象
 * @retun base64编码
 */
function rsaEncryptedString (parseJsonObj){
	// n的十六进制位数/2+3
	/*
    setMaxDigits(262);
    // 第一个参数为加密指数、第二个参数为解密参数、第三个参数为加密系数（公钥）,10001 => e的十六进制
    var key = new RSAKeyPair(Global.encryption, Global.decryption, Global.rsa_key, 2048);
    var parse_str = '{"result":true,"dataList":[{"id":"22","sCode":"1","sName":"北京","bValid":"1","sPhone":"010-82611818","sCity":"北京","sourceId":"1","updateTime":"2016-09-06 17:58:53"},{"id":"23","sCode":"2","sName":"上海","bValid":"1","sPhone":"4007-021-021","sCity":"上海","sourceId":"2","updateTime":"2016-09-06 17:58:53"}],"message":"成功"}';
    //var parse_str = encodeURIComponent(JSON.stringify(parseJsonObj));
    var rsa_rs = '';
    var len = 64;
    alert(parse_str.length);
    if(parse_str.length > len){//字符串超过256,分段加密
        var arr = createStrArr(parse_str,len);
        for(var i = 0; i < arr.length; i ++){
            // 返回加密后的字符串
        	console.log("original:",arr[i]);
        	var tmp =encryptedString(key,arr[i],RSAAPP.PKCS1Padding);
        	console.log("encrypted:",tmp);
            rsa_rs +=tmp;
        }
    }else{
        // 返回加密后的字符串
        rsa_rs = encryptedString(key,parse_str,RSAAPP.PKCS1Padding);
    }
    return base64encode(rsa_rs);//hex2b64
    */
	
	var rsa = new RSAKey();
	var rsa_rs = '';
    var len = 32;
    var parse_str = JSON.stringify(parseJsonObj);
    //var parse_str = '{"result":true,"dataList":[{"id":"22","sCode":"1","sName":"北京","bValid":"1","sPhone":"010-82611818","sCity":"北京","sourceId":"1","updateTime":"2016-09-06 17:58:53"},{"id":"23","sCode":"2","sName":"上海","bValid":"1","sPhone":"4007-021-021","sCity":"上海","sourceId":"2","updateTime":"2016-09-06 17:58:53"}],"message":"成功"}';
    
    rsa.setPublic(Global.rsa_key, Global.encryption);
    if(parse_str.length > len){//字符串超过256,分段加密
        var arr = createStrArr(parse_str,len);
        for(var i = 0; i < arr.length; i ++){
            // 返回加密后的字符串
        	//console.info("original:",arr[i]);
        	var tmp = rsa.encrypt(arr[i]);
        	//console.info("encrypted:",tmp);
        	rsa_rs += tmp;
        }
    }else{
        // 返回加密后的字符串 
        rsa_rs = rsa.encrypt(parse_str);
    }
    return hex2b64(rsa_rs);
    
    
}

function hex2b64(h) {
    var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var b64padchar="=";
    var i;
    var c;
    var ret = "";
    for(i = 0; i+3 <= h.length; i+=3) {
        c = parseInt(h.substring(i,i+3),16);
        ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
    }
    if(i+1 == h.length) {
        c = parseInt(h.substring(i,i+1),16);
        ret += b64map.charAt(c << 2);
    }
    else if(i+2 == h.length) {
        c = parseInt(h.substring(i,i+2),16);
        ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
    }
    while((ret.length & 3) > 0) ret += b64padchar;
    return ret;
}



// public method for encoding  
function base64encode(input) { 
	var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  
    var output = "";  
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
    var i = 0;  
    input = _utf8_encode(input);  
    while (i < input.length) {  
        chr1 = input.charCodeAt(i++);  
        chr2 = input.charCodeAt(i++);  
        chr3 = input.charCodeAt(i++);  
        enc1 = chr1 >> 2;  
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
        enc4 = chr3 & 63;  
        if (isNaN(chr2)) {  
            enc3 = enc4 = 64;  
        } else if (isNaN(chr3)) {  
            enc4 = 64;  
        }  
        output = output +  
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
    }  
    return output;  
}  

function _utf8_encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }
    return utftext;
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
