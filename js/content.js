function bindEvent(){
	//点击document或显示头和脚
	$('.main').click(function(){
		$('#header,#footer').toggleClass('show');
		if($('#footer').hasClass('show')){
			$('.shezhi').fadeOut(100);
		}else{
			$('.shezhi').fadeOut(100);
		}
		
	})
	//点击返回上一页
	touch.on('.back','tap',function(e){
		history.back();
		e.preventDefault();
	});
	//点击目录返回上一页
	touch.on('.dir','tap',function(e){
		history.back();
		return false;
	});
	//点击字体呼唤出设置列表
	$('.font').click(function(e){
		$('.shezhi').fadeToggle(500);
		return false;
	});
	//调节颜色
    touch.on('.pcolor span','tap',function(e){
    	var newColor=$(this).css('backgroundColor');
    	$('.main').css('color',newColor);
    	//存储字体的颜色
    	setLG('mainColor',newColor);
    });
    //点击调节背景色
    touch.on('.bg','tap',function(e){
    	$('.main').toggleClass('bgc');
    	if($('.bg i').hasClass('fa-sun-o')){
    		$('.bg i').removeClass('fa-sun-o');
        	$('.bg i').addClass('fa-moon-o');
        	$('.bg div').html('夜间');
    	}else{
    		$('.bg i').removeClass('fa-moon-o');
        	$('.bg i').addClass('fa-sun-o');
        	$('.bg div').html('白天');
    	};
    	//存储main的类名字
    	var a=$('.main')[0].classList;
    	setLG('mainbg',a);
    	//存储.bg i的类名字
    	var b=$('.bg i')[0].classList;
    	setLG('mainbgi',b);
    	//存储.bg div里面的内容
    	var c=$('.bg div').html();
    	setLG('mainbgdiv',c);
    });
}
function slider(){
	//调节字体 
	$('.range-slider').val(parseInt(getLG('mainSize')));
	
	$('.range-slider').jRange({
        from:12, //滑动范围的最小值，数字，
        to: 25, //滑动范围的最大值，数字，
        step: 1,//步长值，每次滑动大小 
//		        scale: [0, 25, 50, 75, 100],//滑动条下方的尺度标签，数组类型，如[0,50,100] 
        format: '%s',//数值格式 
        width:'60%', //滑动条宽度 
        showLabels: false,// 是否显示滑动条下方的尺寸标签 
        showScale: false, //是否显示滑块上方的数值标签 
        onstatechange:function (e) {
        	var e=e||event;
            $('.main').css('fontSize',e+'px');
            //存储字体的大小
            setLG('mainSize',e+'px');
            var scoolblock=$('.last-active').css('left');
    		setLG('scoolB',scoolblock);
      	}
  	});
  	//设置那个小滑块的位置
   	$('.pointer.high').css({'left':getLG('scoolB')});
}
function againLoad(){
	//从缓存中获取字体的大小颜色和main的类,.bg i的类名字,.bg div里面的内容
	var mainS=getLG('mainSize');
	var mainC=getLG('mainColor');
	var mainB=getLG('mainbg');
	var mainBi=getLG('mainbgi');
	var mainBdiv=getLG('mainbgdiv');
	//根据缓存设置相应的值
	$('.main').css({'color':mainC,'fontSize':mainS});
	$('.main').addClass(mainB);
	if(mainBi){
		$('.bg i')[0].classList='';
		$('.bg i').addClass(mainBi);
	}
	if(mainBdiv){
		$('.bg div').html(mainBdiv);
		};
}
function setLG(k,value){
	return localStorage.setItem(k,value);
}
function getLG(k){
	return localStorage.getItem(k);
}