/**
 * eqShow - v2.0.5.1 - 2016-01-22
 * 
 *
 * Copyright (c) 2016 
 * Licensed MIT <>
 */
function addScratchEffect(b,c,d){
	console.log(b);
	console.log(c);
	console.log(d);
	console.log(c[d-1].properties);
	console.log(c[d-1].properties.effect.image);
	pageInfo=c,audioObj=b,a=20,nums=0;
	var e,f=$(".m-img").width(),
	g=$(".m-img").height(),
	h=document.createElement("canvas");
	$(h).prependTo("#page"+d).attr("class","cas scratch-cas page_effect lock").attr("id","can"+d).attr("style","z-index: 1000");
	var i=h.getContext("2d");
	h.width=f,h.height=g;
	var j=new Image;
	if(c[d-1].properties.effect.image){
		c[d-1].properties.effect.image.path = 'http://weike.staff.xdf.cn/public/xshow/view/images/waterdrop-962bf3.jpg';
		if(num=d,c[d-1].properties.effect.tip){
			var k=document.createElement("div");
			$(k).attr("id","tip"+d).attr("class","tip").prependTo("#page"+d),$(k).html(c[d-1].properties.effect.tip);
		}
		j.src=c[d-1].properties.effect.image.path,e=c[d-1].properties.effect.percentage;
	}else if(c[d-1].properties.scratch){
		if(num=d,c[d-1].properties.scratch.tip){
			var k=document.createElement("div");$(k).attr("id","tip"+d).attr("class","tip").prependTo("#page"+d),$(k).html(c[d-1].properties.scratch.tip);
		}
		j.src=c[d-1].properties.scratch.image.path,e=c[d-1].properties.scratch.percentage.value||c[d-1].properties.scratch.percentage;
	}
	!function(a,b,d,e,f){a.onload=function(){c[e-1].properties.effect.image||!c[e-1].properties.scratch.hasOwnProperty("opacity")?b.globalAlpha=.8:b.globalAlpha=1-parseFloat(c[e-1].properties.scratch.opacity).toFixed(2),b.drawImage(this,0,0,d.width,d.height),renderPage(eqShow,e,pageInfo);for(var g=0;g<pageInfo[e-1].elements.length;g++){var h=eqShow.selectElement(pageInfo[e-1].elements[g].id);eqxCommon.bindTrigger(h,pageInfo[e-1].elements[g])}clipImage(b,d,f,e,a)}}(j,i,h,d,e)
}
function clipImage(b,c,d,e,f){function g(){timeout=setTimeout(function(){nums>=300*d&&(console.log(d),$(c).fadeOut(500,function(){setTimeout(function(){$(c).removeClass("lock").addClass("unlock")},500),$("#audio_btn").css("opacity",1),1==e&&eqShow.playVideo(audioObj)}),nums=0)},totimes)}var h="ontouchstart"in window?!0:!1,i=h?"touchstart":"mousedown",j=h?"touchmove":"mousemove",k=h?"touchend":"mouseup";b.lineCap="round",b.lineJoin="round",b.lineWidth=2*a,b.globalCompositeOperation="destination-out";new RegExp("assets");c.addEventListener(i,function(a){function d(a){g(),nums++,a.preventDefault(),x2=h?a.targetTouches[0].pageX:a.pageX-$("#can"+e).offset().left,y2=h?a.targetTouches[0].pageY:a.pageY-$("#can"+e).offset().top,b.moveTo(x1,y1),b.lineTo(x2,y2),b.stroke(),x1=x2,y1=y2}$("#tip"+e).remove(),a.preventDefault(),a.stopPropagation(),x1=h?a.targetTouches[0].pageX:a.pageX-$("#can"+e).offset().left,y1=h?a.targetTouches[0].pageY:a.pageY-$("#can"+e).offset().top,startX=x1,startY=y1,c.addEventListener(j,d),c.addEventListener(k,function(){c.removeEventListener(j,d)})})}var totimes=200,pageinfo,audioObj;