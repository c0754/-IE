$(document).ready(function () {
	//select
	$(".select select").on('change', function () {
		$this = $(this);
		$this.siblings(".select_info").html($this.find("option:selected").html());
		setTimeout(function () {
			$this.parents().siblings('.select').each(function () {
				$(this).find(".select_info").html($(this).find("option:selected").html());
			})
		}, 100)
	});
});
/*切换*/
function $Tab(el_hd, el_bd, el_box, fun, data) {
	$(el_box).each(function () {
		var $this = $(this);
		$this.find(el_hd).eq(0).addClass('on');
		$this.find(el_bd).eq(0).show().siblings().hide();
		$this.find(el_hd).on('click', function () {
			var i = data == undefined ? $(this).index() : parseInt($(this).attr(data)) - 1;
			$(this).parents(el_box).find(el_bd).eq(i).stop(false, true).fadeIn(300).addClass('on').siblings().removeClass('on').hide();
			$(this).parents().eq(1).find('.on').removeClass('on');
			$(this).addClass('on');
			fun && fun();
		});
	})
}
/*倒计时*/
function Countdown(e, t, that) {
	console.log(that)
	that.innerHTML = e;
	that.setAttribute('style', 'pointer-events: none !important;cursor: default !important; opacity: 0.6 !important;');
	if (t) {
		var codeTime = setInterval(function () {
			if (e === 0) {
				that.innerHTML = '获取验证码'
				that.setAttribute('style', 'pointer-events: auto !important;cursor: pointer !important; opacity: 1 !important;')
				return clearInterval(codeTime);
			}
			e--;
			Countdown(e, false, that);
		}, 1000)
	}
}

//图片上传预览    IE是用了滤镜。
function previewImage(file) {
	var MAXWIDTH = 60;
	var MAXHEIGHT = 60;
	var div = document.querySelector('.push_box');
	div.insertAdjacentHTML('beforeEnd','<em class="pic_src"><img class="pic"/><i class="iconfont">&#xe60e;</i></em>');
	var img = div.lastChild.childNodes[0];
	var ii = div.lastChild.childNodes[1];
	if (file.files && file.files[0]) {
		var reader = new FileReader();
		reader.onload = function (evt) {
			img.src = evt.target.result;
		}
		reader.readAsDataURL(file.files[0]);
	} else {	
		div.focus()
		file.select();
		var src = document.selection.createRange().text;
		img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src=\"" + src + "\")";
	}
	ii.onclick=function(){
		div.removeChild(this.parentNode);
	}
	img.onclick=function(){
		var imgsrc=this.getAttribute("src")
		document.querySelector('body').insertAdjacentHTML('beforeEnd','<div class="push_box_nug" style="position: fixed;top: 0; left: 0; z-index: 999; width: 100%; height: 100%;text-align: center; line-height: 100vh;"><div class="push_box_bg" style="position: absolute; top: 0; left: 0; z-index: 1; width: 100%; height: 100%;background-color: rgba(0, 0, 0,.5);"></div><div class="push_box_img" style="display: inline-block; vertical-align: middle; position:relative; z-index: 2; max-width: 1200px; max-height: 600px;border: 10px solid #fff; line-height:1; border-radius: 10px;box-sizing: border-box; background: #f0f0f0; text-align: center;font-size:0;"><img src="'+ imgsrc +'" style=" display: block;max-width: 1180px; max-height: 580px;"/><i class="push_box_chose iconfont" style="position: absolute; top: -20px;right: -20px; z-index: 3; width: 40px;height: 40px; font-size: 20px; color: #fff; background: #000; border-radius: 50%; cursor: pointer; text-align:center; line-height: 40px; font-weight: bold;">&#xe60e;</i></div></div>');
		document.querySelector('.push_box_chose').onclick=function(){
			document.querySelector('body').removeChild(this.parentNode.parentNode)
		}
	}
}