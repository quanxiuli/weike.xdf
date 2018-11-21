$(function(){
	//管理下拉
	var LayoutHeader_tt1;
		$(".js-userName").hover(function(){
			$(this).addClass('on');
			$(".js-userName-menu").show(); 
			clearTimeout(LayoutHeader_tt1);
		},function(){
			LayoutHeader_tt1 = setTimeout(function(){
		    	$(".js-userName-menu").hide(); 
		    	$(".js-userName").removeClass('on');
		  	},200);
		}); 
		$(".js-userName-menu").hover(function(){
			clearTimeout(LayoutHeader_tt1);  
		},function(){
			$(this).hide(); 
			$(".js-userName").removeClass('on');
	});

	//北京下拉
	var LayoutHeader_tt2;
		$(".js-ads-drop a").hover(function(){
			$(this).addClass('on');
			$(".b-sub-menu").show(); 
			clearTimeout(LayoutHeader_tt2);
		},function(){
			LayoutHeader_tt2 = setTimeout(function(){
		    	$(".b-sub-menu").hide(); 
		    	$(".js-ads-drop a").removeClass('on');
		  	},200);
		}); 
		$(".b-sub-menu").hover(function(){
			clearTimeout(LayoutHeader_tt2);  
		},function(){
			$(this).hide(); 
			$(".js-ads-drop a").removeClass('on');
	});

	//校区下拉
	var LayoutHeader_ttarea;
	$(".js-area-drop a").hover(function(){
		$(this).addClass('on');
		$(".a-sub-menu").show();
		clearTimeout(LayoutHeader_ttarea);
	},function(){
		LayoutHeader_ttarea = setTimeout(function(){
			$(".a-sub-menu").hide();
			$(".js-area-drop a").removeClass('on');
		},500);
	});
	$(".a-sub-menu").hover(function(){
		clearTimeout(LayoutHeader_ttarea);
	},function(){
		$(this).hide();
		$(".js-area-drop a").removeClass('on');
	});
	
	//泡泡少儿中心下拉
	var LayoutHeader_tt3;
		$(".js-item-drop a").hover(function(){
			$(this).addClass('on');
			$(".p-sub-menu").show(); 
			clearTimeout(LayoutHeader_tt3);
		},function(){
			LayoutHeader_tt3 = setTimeout(function(){
		    	$(".p-sub-menu").hide(); 
		    	$(".js-item-drop a").removeClass('on');
		  	},500);
		}); 
		$(".p-sub-menu").hover(function(){
			clearTimeout(LayoutHeader_tt3);  
		},function(){
			$(this).hide(); 
			$(".js-item-drop a").removeClass('on');
	});

	var LayoutHeader_tt4;
		$(".js-bjSelect a").hover(function(){
			$(this).addClass('on');
			$(".t-sub-menu").show(); 
			clearTimeout(LayoutHeader_tt2);
		},function(){
			LayoutHeader_tt2 = setTimeout(function(){
		    	$(".t-sub-menu").hide(); 
		    	$(".js-bjSelect a").removeClass('on');
		  	},200);
		}); 
		$(".t-sub-menu").hover(function(){
			clearTimeout(LayoutHeader_tt2);  
		},function(){
			$(this).hide(); 
			$(".js-bjSelect a").removeClass('on');
	});

	var LayoutHeader_tt5;
		$(".js-schSelect a").hover(function(){
			$(this).addClass('on');
			$(".y-sub-menu").show(); 
			clearTimeout(LayoutHeader_tt2);
		},function(){
			LayoutHeader_tt2 = setTimeout(function(){
		    	$(".y-sub-menu").hide(); 
		    	$(".js-schSelect a").removeClass('on');
		  	},200);
		}); 
		$(".y-sub-menu").hover(function(){
			clearTimeout(LayoutHeader_tt2);  
		},function(){
			$(this).hide(); 
			$(".js-schSelect a").removeClass('on');
	});

	//视频优惠券tab切换
	var $parent_li=$('.j-tab-nav');
    $parent_li.click(function(){
        $(this).addClass('on').siblings().removeClass('on');
        var index=$parent_li.index(this);
			$('.J-tab').hide();
        	$('.J-tab').eq(index).show();
        
    })

})


$(function () {
	function lftht(){
		var lefth = ($(window).height()-52)>540?($(window).height()-52):540;
		$(".p176-left").css("height",lefth);
	}
	lftht();
	$(window).resize(lftht);
})