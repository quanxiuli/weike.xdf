function SlideShow(c) {
    var a = document.getElementById("slideContainer"), 
	Ul = document.getElementById("slidesImgs"), 
	f = document.getElementById("slidesImgs").getElementsByTagName("li"), 
	im = document.getElementById("slidesImgs").getElementsByTagName("img"),
	h = document.getElementById("slideBar"), 
	n = h.getElementsByTagName("li"), 
	d = f.length, 

	c = c || 3000, 
	e = lastI = 0, j, m;
	
	var inum=0;//判断有几张图片(src不为空)
	for(var i=0;i<im.length;i++){
		if(im[i].src.indexOf('jpg')>0){
			inum++;
		}else{
			
		}
	}
	var linum = (d-1);//删除src为空的轮播图
	for(var j=d;j>inum;j--){
		if(j>inum){
			Ul.removeChild(f[linum]);
			linum--;
		}
	}
	//创建按钮
	var cre_ul=document.createElement("ul");//创建ul
	var num=1;
		for(var i=1;i<=inum;i++){
			var v_li=document.createElement("li");//生成li
			v_li.innerHTML=num;
			if(num==1){
				v_li.className='on';
			}else{
				v_li.className='';
			}
			
			cre_ul.appendChild(v_li);
			num++;
		}
		h.appendChild(cre_ul);
	
    function b() {
        m = setInterval(function () {
            e = e + 1 >= inum ? e + 1 - inum : e + 1;
            g()
        }, c)
    }
    function k() {
        clearInterval(m)
    }
    function g() {
        f[lastI].style.display = "none";
        n[lastI].className = "";
        f[e].style.display = "block";
        n[e].className = "on";
        lastI = e
    }
    f[e].style.display = "block";
    a.onmouseover = k;
    a.onmouseout = b;
    h.onmouseover = function (i) {
        j = i ? i.target : window.event.srcElement;
        if (j.nodeName === "LI") {
            e = parseInt(j.innerHTML, 10) - 1;
            g()
        }
    };
    b()
	
		
		
}
;
