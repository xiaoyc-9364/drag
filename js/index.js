window.addEventListener('load', function() {
	var oDrager = document.getElementById('dot');
	var oWord = document.getElementById('word');
	var oRuler = document.getElementById('ruler');
	var len = oRuler.children.length;
	var startScale = parseInt(oRuler.children[0].getAttribute('data-size'));
	var endScale = parseInt(oRuler.children[len-1].getAttribute('data-size'));

	dragChangeFontSize(oDrager, oWord, startScale, endScale);

	function dragChangeFontSize (drager, word, startScale, endScale) {	
				//参数： 滑块、需改变字号的元素、标尺起始值、标出末端值
		var fontSize = getStyle(word, 'fontSize');		//获取文本的初始字号
		var parenWidth = drager.parentNode.offsetWidth;	//滑动条的宽度
		var scale = (endScale - startScale) / parenWidth;	// 比例尺
		var initLeft = Math.abs((parseInt(fontSize) - startScale) / scale);	//滑块的起始左偏移量

		initLeft = Math.max(0, Math.min(initLeft, parenWidth));	//初始左偏的取值范围
		drager.dataset.sub = fontSize;		//设置上标提示栏的初始值
		drager.style.left = initLeft +'px';	//滑块的初始位置

		var active = function(e) {	//滑块的事件函数
			var dX = e.clientX;		//记录点击时的鼠标位置
			var dragerLeft = drager.offsetLeft;

			word.classList.add('noselected');	//文本元素添加类使其不可选中	
			
			var handler = function(e) {		//拖拽时的事件函数
				var diffX = e.clientX - dX;	//鼠标X方向的改变量
				var diffLeft = diffX + dragerLeft;	//滑块的左偏移量
				diffLeft = Math.min(parenWidth, Math.max(diffLeft, 0));//滑块左偏移量的取值范围
				setFontSize(diffLeft);	
			};		

			document.addEventListener('mousemove', handler, false);
			document.addEventListener('mouseup', function() {	
				this.removeEventListener('mousemove', handler, false);
				drager.removeEventListener('mouseenter', active, false);
				word.classList.remove('noselected');		
			}, false);
		};
		
		drager.addEventListener('mousedown', active, false);
		drager.parentNode.addEventListener('mousedown', function(e) {
			if (e.target != drager) {
				setFontSize(e.layerX);
			}
			//添加滑块的鼠标进入事件，事滑动条点击后能拖动滑块
			drager.addEventListener('mouseenter', active, false);	
		}, false);

		function setFontSize(num) {
			drager.style.left = num+ 'px';		//设置滑块左偏移量为参数传入到 值
			var iSize = startScale + drager.offsetLeft * scale;	//计算对应的字体大小
				
			if (iSize < 12) {		//谷歌浏览器字体小于12px时的处理方式
				word.style.transform = "scale("+ iSize / 12 + ")";
			} else {
				word.style.transform = 'none';
			}

			word.style.fontSize = iSize + 'px';
			drager.dataset.sub = parseInt(iSize) + 'px';	//设置上标提示栏
		}
	}
}, false);

function getStyle( obj,attr ){	
	return obj.currentStyle ? obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}