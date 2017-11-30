window.addEventListener('load', function() {

	//获取元素
	var oDot = document.getElementById('dot');
	var oWord = document.getElementById('word');
	var oSpan = document.getElementById('size');
	//绑定事件
	oDot.addEventListener('mousedown', function(event) {	//鼠标按下事件
		var _this = this;
		var diffX = event.clientX - getElementLeft(_this);	//取得鼠标按下时鼠标相对元素的左侧距离

		var handler = function(event) {
			var thisWidth = _this.offsetWidth;		//滑块宽度
			var parentLeft = getElementLeft(_this.parentNode)	//获取父元素相对页面的左偏移
			var parentWidth = _this.parentNode.clientWidth		//父元素内容宽度

			_this.style.left = event.clientX - parentLeft - diffX + 'px';

			if (_this.offsetLeft > (parentWidth - thisWidth / 2)) {
				//滑块中线的左偏移的最大值为父元素的宽度
				_this.style.left  =  parentWidth - (thisWidth / 2) + 'px';
			} else if (_this.offsetLeft < - (thisWidth / 2)) { 
				// 块中线的左偏移的最小值为父元素的左侧滑块宽度一半的距离
				_this.style.left = - (thisWidth / 2)  + 'px';
			}

			//文字字体大小为滑块中线的左偏移量相对父元素宽度的比值*100
			oWord.style.fontSize = (_this.offsetLeft + thisWidth / 2) / parentWidth * 100 + 'px';
			//滑块上方标签内容
			oSpan.innerHTML = parseInt(oWord.style.fontSize) + 'px';
		};

		document.addEventListener('mousemove', handler, false);	//鼠标移动事件
		document.addEventListener('mouseup', function() {		//鼠标放开事件
			this.removeEventListener('mousemove', handler, false);
		}, false);
	}, false);
	

}, false);	

function getElementLeft(elm) {		//获取元素相对页面的左偏移值
	var actualLeft = elm.offsetLeft;
	var cur = elm.offsetParent;

	while (cur !== null) {
		actualLeft += cur.offsetLeft;
		cur = cur.offsetParent;
	}
	return actualLeft;
}