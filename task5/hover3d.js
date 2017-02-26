//HTML结构如下
//<div class="father">
//	<div class="son"></div>
//</div>
//.father是整个3Dhover效果的容器,鼠标只要进入 .father 就会触发3D-father是整个3Dhover效果的容器
//发生转动的是 .son 而.father并不转动.
//可以让 .father比 .son稍微大一圈.

(function ($) {

	$.fn.hover3d = function (options) {
		var settings = $.extend({
			selector: null, //插件传进来的是父容器,选择器选定 的是具体旋转的
			perspective: 1000, //视差高度
			sensitivity: 20, //转动幅度
			invert: false, //hover 方向与鼠标方向是否 反转
			shine: false, //鼠标是否具有手电筒效果
			hoverInClass: "hover-in",
			hoverOutClass: "hoverh-out",
			hoverClass: "hover-3d"
		}, options); //具体选项由实际参数覆盖

		return this.each(function () { //这里的this 就是指向被绑定的元素

			//传进来的jquery元素

			var $this = $(this),
				$card = $this.find(settings.selector); //向子元素查找 匹配到的选择器
			currentX = 0;
			currentY = 0;


			if (settings.shine) { //没有设置了shine 就添加一个
				$card.append('<div class="shine"></div>');
			}
			var $shine = $(this).find(".shine");

			//设定perspective和偏移的值
			$shine.css({
				position: "absolute",
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				transform: 'translateZ(1px)',
				"z-index": 9
			});

			//鼠标进入父元素后 给$card添加 hover-in 在hover-in 上进行CSS的操作,让其产生效果
			function enter(event) {
				$card.addClass(settings.hoverInClass + " " + settings.hoverClass);
				currentX = currentY = 0
				setTimeout(function () {
					$card.removeClass(settings.hoverInClass);
				}, 1200);
			}

			function move(event) {
				//核心算法
				var w = $card.innerWidth(), //获取$card宽高
					h = $card.innerHeight(),
					currentX = Math.round(event.pageX - $card.offset().left), //鼠标所处位置到页面的左侧减去 $card相对于其父元素的左侧的距离
					currentY = Math.round(event.pageY - $card.offset().top),
					ax = settings.invert ? (w / 2 - currentX) / settings.sensitivity : -(w / 2 - currentX) / settings.sensitivity,
					ay = settings.invert ? -(h / 2 - currentY) / settings.sensitivity : (h / 2 - currentY) / settings.sensitivity,
					dx = currentX - w / 2,
					dy = currentY - h / 2,
					theta = Math.atan2(dy, dx),
					angle = theta * 180 / Math.PI - 90;

				// 事件对象e有四对XY 
				// clientX clientY 浏览器可视范围 
				// offsetX offsetY 距离最近的position 父元素
				// pageX pageY 页面
				// screenX screenY 屏幕坐标
				if (angle < 0) {
					angle = angle + 360;
				}


				$card.css({
					perspective: settings.perspective + "px",
					transformStyle: "preserve-3d",
					transform: "rotateY(" + ax + "deg) rotateX(" + ay + "deg)"
				})

				$shine.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + event.offsetY / h * .5 + ') 0%,rgba(255,255,255,0) 80%)');
			}

			//当鼠标离开时 移除hover 效果,使其恢复到原来的样子
			function leave() {
				$card.addClass(settings.hoverOutClass + " " + settings.hoverClass);
				$card.css({
					perspective: settings.perspective + "px",
					transformStyle: "preserve-3d",
					transform: "rotateX(0) rotateY(0)"
				});
				setTimeout(function () {
					$card.removeClass(settings.hoverOutClass + " " + settings.hoverClass);
					currentX = currentY = 0;
				}, 1000) //设定响应离开的延迟的值
			}

			// 鼠标进入
			$this.on("mouseenter", function () {
				return enter();
			})

			// 鼠标移动
			$this.on("mousemove", function (event) {
				return move(event);
			})

			// 鼠标离开
			$this.on("mouseleave", function () {
				return leave()
			})

		})

	}

}(jQuery))