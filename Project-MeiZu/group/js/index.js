//购物车交互功能
//1.获取元素
var oTopBoxDiv = document.querySelector('.top .top-table .top-box-div')
var oTopBoxContent = document.querySelector('.top .top-box-div .top-box-content')
var oBoxContent = document.querySelector('.top .top-box-div .box-content')
// console.log(oBoxContent)
//2.绑定事件
oTopBoxDiv.onmouseover = function(){
	oTopBoxContent.style.backgroundColor = '#fff'
	oTopBoxContent.style.color = '#999999';
	oBoxContent.style.height = '100px';
}

//1.处理购物车
handleCart();
function handleCart(){
	var oTopBoxDiv = document.querySelector('.top .top-table .top-box-div');
	var oTopBoxContent = document.querySelector('.top .top-box-div .top-box-content');
	var oBoxContent = document.querySelector('.top .top-box-div .box-content');
	var oLoader = document.querySelector(".top .top-box-div .box-content .loading");
	var oEmptyCart = document.querySelector('.top .top-box-div .box-content .empty-cart');

	//鼠标移入和移出监听事件
	oTopBoxDiv.onmouseenter = function(){
		//模拟加载数据显示loading图标
		oLoader.style.display = "block";
		//动画效果卷入下拉列表完成后显示数据
		animate(oBoxContent,{height:100},true,function(){
			oLoader.style.display = "none";
			oEmptyCart.style.display = "block";
		});
	}
	oTopBoxDiv.onmouseleave = function(){
		//oCartContent.style.height = "0";
		animate(oBoxContent,{height:0},true,function(){
			//鼠标移走购物车恢复初始状态
			oLoader.style.display = "none";
			oEmptyCart.style.display = "none";
		});
	}
}

//处理导航栏
handleNav();
function handleNav(){
	//1.获取元素
	var oTopLi4 = document.querySelectorAll(".top .box1 .top-ul .top-li4");
	var oDivTopBox1 = document.querySelector(".top .div-top-box1");
	var oDivTopBox2 = oDivTopBox1.querySelector('.top .div-top-box1 .div-top-box2');
	var hideTimer = 0;
	for ( var i= 0;i<oTopLi4.length;i++){
		oTopLi4[i].index = i;
		oTopLi4[i].onmouseenter = function(){
			// clearTimeout(hideTimer);
			oDivTopBox1.style.borderTOP = '1px solid #ccc';
			animate(oDivTopBox1,{height:200})
			// loadDate(this.index)
		}
		oTopLi4[i].onmouseleave = function(){
		hideTimer=	setTimeout(handleHide,3000);
		}

	}
	oDivTopBox2.onmouseenter = function(){
		clearTimeout(hideTimer);
		oDivTopBox1.style.borderTOP = '1px solid #ccc';
		animate(oDivTopBox1,{height:200})
	}
	oDivTopBox2.onmouseleave  = function(){
		handleHide();
	}
	function handleHide(){
		animate(oDivTopBox1,{height:0},true,function(){
							oDivTopBox1.style.borderTOP = '';
			},1000) 
	}
	// function loadDate(index){
	// 	var date = oDivTopBox1Date[index];
	// 	var html = '';
	// 	var html += '<ul>';
	// 	for(var i = 0;i<date.length;i++){
	// 		// console.log(date[i])
	// 		html +=
	// 	}

	// 	html +='</ul>'
	// 	oDivTopBox1.innerHTML = index
	// }
}