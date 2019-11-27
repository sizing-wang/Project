handleShop();
handleUser();
handleInput();
handleNavContent();
handleProd();
handleFlash();




//购物车交互功能
function handleShop(){
	var oShopBox = document.querySelector('.header .header-service .shop-box');
	var oShopContent = document.querySelector('.header .header-service .shop-box .shop-content');
	var oLoader = oShopContent.querySelector('.loader');
	var oImg = oShopContent.querySelector('img');
	var oPcontent = oShopContent.querySelector('p');
	var Timer = 0;
	oShopBox.onmouseenter = function(){
		clearTimeout(Timer);
		oLoader.style.display = "block";
		animation(oShopContent,{height:120},true,function(){
			oLoader.style.display = "none";
			// oImg.style.display = "inline-block";
			// oPcontent.style.display = "inline-block";
		})
	}
	oShopBox.onmouseleave = function(){
		Timer = setTimeout(function(){
			animation(oShopContent,{height:0},true,function(){
						oLoader.style.display = "none";
					});
		},500)
		
	}
}
//登陆交互功能
function handleUser(){
	var oUserBox = document.querySelector('.header-service .header-service-users .users');
	var oUserImg = oUserBox.querySelector('img');
	var oUserContent = document.querySelector('.header-service .header-service-users .user-content');
	var timers = 0;
	//console.log(oUserContent)
	// console.log(oUserImg)
	oUserImg.onmouseenter = function(){
		animation(oUserContent,{height:125},true);
	}
	oUserImg.onmouseleave = function(){
		timers = setTimeout(function(){
			animation(oUserContent,{height:0},true)
		},500)
	}
	oUserContent.onmouseenter = function(){
		clearTimeout(timers);
	}
	oUserContent.onmouseleave = function(){
		timers = setTimeout(function(){
			animation(oUserContent,{height:0},true)
		},500)
	}
}
//输入框
function handleInput(){
	var oInput = document.getElementById('txt');
	var oSearch = document.querySelector('.header .header-service .header-service-search');
	oInput.onfocus = function(ev){
		animation(oSearch,{height:290},true);
		oSearch.style.border = "1px solid #000";
		ev.preventDefault();
	}
	oSearch.addEventListener('click',function(ev){
		ev.stopPropagation();
	},false)
	document.onclick = function(ev){
		animation(oSearch,{height:32},true);
		oSearch.style.border = "1px solid #d9d9d9";
	}
}
//下拉菜单交互
function handleNavContent(){
	var aNavItem = document.querySelectorAll('.header .header-nav-item');
	var oNavContent = document.querySelector('.header .header-nav-content');
	var oNavContentBox = oNavContent.querySelector('.container');
	var hideTimer = 0;
	for(var i=0;i<aNavItem.length -5;i++){
		aNavItem[i].index = i;
		aNavItem[i].onmouseenter = function(){
			clearTimeout(hideTimer);
			animation(oNavContent,{height:'180'});
			loadedata(this.index);
		}
		aNavItem[i].onmouseleave = function(){
			handleHide();
			
		}
	}
	oNavContent.onmouseenter = function(){
		clearTimeout(hideTimer);

	}
	oNavContent.onmouseleave = function(){
		handleHide();
	}
	function handleHide(){
		hideTimer = setTimeout(function(){
			animation(oNavContent,{height:'0'},true)
		},500)
	}
	function loadedata(index){
		var data = aNavContentData[index];
		var html = '<ul>';
		for(var i=0;i<data.length;i++){
			html += '<li>';
			html +=		'<a href="'+data[i].url+'" class="mg"></a>';
			html +=		'<img src="'+data[i].img+'" alt="">';
			html +=		'<p class="nav-product-name">'+data[i].name+'</p>';
			html +=		'<p class="nav-product-price">';
			html +=			'<em>￥</em>';
			html +=			'<span>'+data[i].price+'</span>';
			html +=		'</p>';
			html +=	'</li>';
		}
		html += '</ul>';
		oNavContentBox.innerHTML = html;
	}
}
//选项卡部分
function handleProd(){
	var aProdItem = document.querySelectorAll(".main .title .title-filter-item");
	var oProdContent = document.querySelector(".main .product .product-list");
	var oBefore = document.querySelector(".main .title .title-filter .before");
	var oAfter = document.querySelector(".main .title .title-filter .after");
	loadedata(0);
	for(var i=0;i<aProdItem.length;i++){
		aProdItem[i].index = i;
		aProdItem[i].onclick = function(){
			for(var j=0;j<aProdItem.length;j++){
				aProdItem[j].className = "title-filter-item";
			}
			this.className = "title-filter-item active";
			loadedata(this.index);
		}
	}
	oBefore.onclick = function(){
		this.style.borderBottom = "5px solid #00c3f5";
		oAfter.style.borderTop = "5px solid #343434";
		loadedata(1);
	}
	oAfter.onclick = function(){
		this.style.borderTop = "5px solid #00c3f5";
		oBefore.style.borderBottom = "5px solid #343434";
		loadedata(2);
	}
	function loadedata(index){
		var data = aProdContentData[index];
		var html = '';
		for(var i=0;i<data.length;i++){
			html += '<li class="product-item">';
			html +=		'<a href="'+data[i].url+'" target="_blank" title="'+data[i].title+'"></a>';
			html +=		'<img src="'+data[i].img+'" alt="'+data[i].title+'">';
			if(data[i].slide){
				html += '<ul class="item-slide">';
				html +=		'<li class="'+data[i].slide.name+'" title="'+data[i].slide.title+'">';
				html +=			'<img class="lazy" src="'+data[i].slide.img+'" alt="">';
				html +=		'</li>';
				html +=	'</ul>';
			}
			if(data[i].slidetwo){
				html +=		'<ul class="item-slide item-slide-two">';
				html +=			'<li class="'+data[i].slidetwo.name1+'" title="'+data[i].slidetwo.title1+'">';
				html +=				'<img class="lazy" src="'+data[i].slidetwo.img1+'" alt="">';
				html +=			'</li>';
				html +=			'<li class="'+data[i].slidetwo.name2+'" title="'+data[i].slidetwo.title2+'">';
				html +=				'<img class="lazy" src="'+data[i].slidetwo.img2+'" alt="">';
				html +=			'</li>';
				html +=		'</ul>';
			}
			html +=		'<h3 class="item-title">'+data[i].title+'</h3>';
			html +=		'<p class="item-desc">'+data[i].desc+'</p>';
			html +=		'<p class="item-price">';
			if(data[i].tag){
				html +=			'<span class="item-price-tag">'+data[i].tag.name+'</span>';
			}
			html +=			'<em>￥</em>';
			html +=			'<span class="vm-price">'+data[i].price+'</span>';
			html +=		'</p>';
			html +=	'</li>';
		}








		oProdContent.innerHTML = html;
	}
}
//轮选部分
function handleFlash(){
	var oTjList = document.querySelector(".home .tj-hot .tj-list");
	var aBottomLi = document.querySelectorAll(".home .tj-bottom .tj-bottom-item");
	for(var i=0;i<aBottomLi.length;i++){
		aBottomLi[i].index = i;
		aBottomLi[i].onclick = function(){
			for(var j=0;j<aBottomLi.length;j++){
				aBottomLi[j].className = "tj-bottom-item";
			}
			this.className = "tj-bottom-item active";
			oTjList.style.marginLeft = -(930*this.index) +'px';
		}
	}
}