function Tab(obj){
	var oBox=document.getElementById(obj);
	var oUl=oBox.getElementsByTagName('ul')[0];
	var aLi=oUl.getElementsByTagName('ul');
	var oLeft=oBox.getElementsByTagName('span')[0];
	var oRight=oBox.getElementsByTagName('span')[1];
	var iNow = 0;
	oRight.style.position='absolute';
	oUl.style.width = aLi[0].offsetWidth*aLi.length + 'px';
	oRight.onclick=function(){
		next();
		//startMove(oUl,-iNow*aLi[0].offsetWidth,700);
	};
	oLeft.onclick = function(){
		iNow--;
		if(iNow < 0){
			iNow = aLi.length-1;
		}
		//oUl.style.left=-iNow*aLi[0].offsetWidth+'px';
		startMove(oUl,-iNow*aLi[0].offsetWidth,700);
	};
	function next(){
		iNow++;
		if(iNow>=aLi.length){
			iNow = 0;
		}
		//oUl.style.left=-iNow*aLi[0].offsetWidth+'px';
		startMove(oUl,-iNow*aLi[0].offsetWidth,700);
	}
	var timer = null;
	var timer1=null;
	timer=setInterval(function(){
		next();
	},8000);
	oUl.onmouseover=function(){
		clearInterval(timer);
	};
	oUl.onmouseout=function(){
		timer=setInterval(function(){
			next();
		},8000);
	};

	function startMove(obj,target,time){
		var count = Math.floor(time/30);
		var start = obj.offsetLeft;
		var dis = target-start;
		var n = 0;
		clearInterval(timer1);
		timer1 = setInterval(function(){
			n++;
			obj.style.left=start+n*dis/count+'px';
			if(n==count){
				clearInterval(timer1);
			}
		},30);
	}
}