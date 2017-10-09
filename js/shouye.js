//页面打开时加载所有小说列表
getAll();
//点击目录加载小说列表
touch.on('.all','tap',function () {
    getAll();
});
//用于存储获取的所有数据
var allData;
//获取数据用模板换内容并显示页面
function getAll() {
    $.getJSON('js/data.json',function (data) {
    	//存储所有的数据
    	allData=data;
        $('#list').html(template('temp',{list:data}));
    })
};
//设置cookie
//点击.media a的时候获取href里面的id并设置cookie
var _this;//保存当前点击的对象
$('#list').on('click','a',function(){
	_this=$(this);
	setCook();
});
function setCook() {
    var id=getId(_this);
    if(id){
        var cookBox=[];
        if($.cookie('pagecook')){
        	cookBox=$.cookie('pagecook').split(',');
        }
        if(cookBox.indexOf(id)<=-1){
        	cookBox.push(id);
        }
//      alert(cookBox.toString());
//      alert(cookBox.join())
        $.cookie('pagecook',cookBox.join(),{expires:365});
    }
}
//获取a属性href里面的id
function getId(__this){
	var hrefid=__this.attr('href');
	var reg=new RegExp('[?&]'+'id='+'([^&]*)');
    var match=reg.exec(hrefid);
    return match[1];
}
//点击历史加载看过的小说
touch.on('.history','tap',function(){
	getHistory()
});
//读取浏览过的历史记录
function  getHistory() {
    var cookBox=[];
    if($.cookie('pagecook')){
    	cookBox=$.cookie('pagecook').split(',');
    };
    var historydata=allData.filter(function (item) {
        return cookBox.indexOf(item.id.toString())>-1;
    });
    $('#list').html(template('temp',{list:historydata}));
	//对每一个.media下面的a都添加滑动事件
	var mediaArr=document.querySelectorAll('#list a');
//	alert($('#list a').attr('class'));
	for(var i=0;i<mediaArr.length;i++){
		moveLeft(mediaArr[i].classList);
	}
};
//滑动li里面的a进行移动
function moveLeft(obj){
	var o='.'+obj;
    touch.on(o,'swipe',function (e) {
    	var e=e||event;
		if(e.direction == "left"){
			$(o).animate({'left':'-60px'})
			$(o).addClass('active');
            $(o).next().animate({'right':'0px'})
		}
    })
}
//点击激活状态的a取消删除
$('#list').on('click','a',function (e) {
    if($(this).hasClass('active')){
        $(this).animate({'left':'0px'});
        $(this).next().animate({'right':'-60px'});
        $(this).removeClass('active');
        return false;
    }
});
//删除一条历史
$('#list').on('click','.del',function (e) {
	//获取当前点击的对象的兄元素里面的href
	var cookid= $(this).prev().attr('href');
//	var reg=/\d/ig;
	var reg=new RegExp('[?&]'+'id='+'([^&]*)');
	//正则匹配href里面的id值
	var result=reg.exec(cookid);
	//根据id删除对应的cookie值
	delCookie(result[1]);
    $(this).parents('li').remove();
    return false;
});
//删除cookie记录
function delCookie(id) {
    var cookBox=[];
    if($.cookie('pagecook')){
    	cookBox=$.cookie('pagecook').split(',');
    }
    cookBox.splice(cookBox.indexOf(id+''),1);
    $.cookie('pagecook',cookBox.toString(),{expires:365});
}