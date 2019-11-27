;(function($){
	//共通只加载一次html
	function loadHtmlOnce($elem,cb){

		var $layer = $elem.find('.dropdown-layer');
		var dataUrl = $elem .data('url');
		if(!dataUrl) return;
		if($elem.data('isLoaded')) return;
		$.getJSON(dataUrl,function(data){
			$elem.data('isLoaded',true);
			typeof cb == 'function' && cb(data,$layer);
		})
	}
	function getDataOnce($elem,url,cb){
		var data = $elem.data(url);
		if(!data){
			$.getJSON(url,function(resData){
				// console.log(resData)
				$elem.data(url,resData);
				cb(resData);
			})
		}else{
			cb(data);
		}
	}
	//抽取所有懒加载共通函数
	function lazyLoad(options){
		var $elem = options.$elem;
		var eventName = options.eventName;
		var eventPrefix = options.eventPrefix;
		$elem.item = {};//0:loaded,1:loaded
		$elem.loadItemNum = options.loadItemNum;
		$elem.loadedItemNum = 0;//表示已经加载过几张图片
		$elem.fnload = null;
		//开始加载
		$elem.on(eventName,$elem.fnload = function(ev,index,elem){
				$elem.trigger(eventPrefix+'-load',[index,elem,function(){
				$elem.item[index] = 'loaded';
				$elem.loadedItemNum++;
				if($elem.loadedItemNum == $elem.loadItemNum){
					$elem.trigger(eventPrefix+'-loaded');
				}
			}])
		});
		//执行加载
		
		//加载结束
		$elem.on(eventPrefix+'-loaded',function(){
			$elem.off(eventName,$elem.fnload);
		})
	}
	//封装加载图片的函数
	function loadImage(imgUrl,success,error){
		var image = new Image();//得到一个实力
		image.onload = function(){//成功时的回调
			typeof success == 'function' &&	success();
		};
		image.onerror = function(){//失败的回调
			typeof error == 'function' &&	error();
		};
		//模仿网络延迟
		setTimeout(function(){
			image.src = imgUrl;//表明去哪个地址请求图片
		},500)
	}	
	function handleDropDown(){
		var $dropdown = $('.nav-side .dropdown');
		
		$dropdown.on('dropdown-show',function(ev){
			loadHtmlOnce($(this),createMenuHtml);
			function createMenuHtml(data,$layer){
				var html = '';
				for(var i=0;i<data.length;i++){
					html += '<li class="menu-item"><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
				}
				//.模仿数据加载
				setTimeout(function(){
					$layer.html(html);
				},1000)
			}
		});
		$dropdown.dropdown({delay:200});
	}
	handleDropDown();
	function handleSearch(){
		$('.search').search();
		$('.search').on('getData',function(ev,data){
			//1.将数据包装成html代码
			var html = createLayerHtml(data,5);
			//2.将html代码放入到下拉层中
			// this.addHtml(html);
			$('.search').search('addHtml',html);
			//3.将下拉层展示出来
			// this.showLayer()
			$('.search').search('showLayer');

		});
		$('.search').on('getNoData',function(){
			$('.search').search('addHtml','');
			$('.search').search('hideLayer');

		});
		function createLayerHtml(data,itenNum){
			var html = '';
			for(var i=0;i<data.result.length;i++){
				if(i >= itenNum) break;
				html += '<li class="search-item">'+data.result[i][0]+'</li>';
			}
			return html;
		}
	}
	handleSearch();
	function handleCategory(){
		var $dropdown = $('.category .dropdown');
		
		$dropdown.on('dropdown-show',function(ev){
			loadHtmlOnce($(this),createCategoryHtml)
			function createCategoryHtml(data,$layer){
				var html = '';
				for(var i=0;i<data.length;i++){
					html += '<dl class="category-details"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">'
					for(var j=0;j<data[i].items.length;j++){
						html += '<a href="#" class="link">'+data[i].items[j]+'</a>'
					}
					html += '</dd></dl>'
				}
				//.模仿数据加载
				setTimeout(function(){
					$layer.html(html);
				},1000)
			}
		})
		$dropdown.dropdown({delay:200,js:true,mode:"fade"});
	}
	handleCategory();

	function handleCarousel(){
		var $carousel = $('.focus .carousel-wrap');
		
		// carouselLazyLoad($carousel);
		lazyLoad({
			$elem:$carousel,
			loadItemNum:$carousel.find('.carousel-item').length,
			eventName:'carousel-show',
			eventPrefix:'carousel'
		})
		$carousel.on('carousel-load',function(ev,index,elem,cb){
			if($carousel.item[index] != 'loaded'){
				// console.log('load',index)
				//找到图片标签
				var $imgs = $(elem).find('.carousel-img');
				$imgs.each(function(){
					var $img = $(this);
					//拿到真正的图片地址
				
					var imgUrl = $img.data('src');
					//获取图片
					loadImage(imgUrl,function(){
						$img.attr('src',imgUrl)
					},function(){
						$img.attr('src',"images/focus-carousel/placeholder.png")
					});
				})
				cb()				
			}
		})

		$carousel.carousel({});
	}
	handleCarousel();
	function handleTodays(){
		var $carousel = $('.todays .carousel-wrap');
		// carouselLazyLoad($carousel);
		lazyLoad({
			$elem:$carousel,
			loadItemNum:$carousel.find('.carousel-item').length,
			eventName:'carousel-show',
			eventPrefix:'carousel'
		});
		$carousel.on('carousel-load',function(ev,index,elem,cb){
			if($carousel.item[index] != 'loaded'){
				// console.log('load',index)
				//找到图片标签
				var $imgs = $(elem).find('.carousel-img');
				$imgs.each(function(){
					var $img = $(this);
					//拿到真正的图片地址
				
					var imgUrl = $img.data('src');
					//获取图片
					loadImage(imgUrl,function(){
						$img.attr('src',imgUrl)
					},function(){
						$img.attr('src',"images/focus-carousel/placeholder.png")
					});
				});
				cb()				
			}
		});
		$carousel.carousel({});
	}
	handleTodays();
	function handleTab(){
		var $floor = $('.floor');
		var $win = $(window);
		var $doc = $(document);

		function buildFloorHtml(oneFloorData){
			var html = '';
			html += '<div class="container">';
			html += buildFloorHeadHtml(oneFloorData);
			html += buildFloorBodyHtml(oneFloorData);
			html += '</div>';
			return html;
		}
		function buildFloorHeadHtml(oneFloorData){
			var html = '';
			html += '<div class="floor-hd">';
			html += '	<h2 class="floor-title fl">';
			html += '		<span class="floor-title-num">'+oneFloorData.num+'F</span>';
			html += '		<span class="floor-title-text">'+oneFloorData.text+'</span>';
			html += '	</h2>';
			html += '	<ul class="tab-item-wrap fr">';
			for(var i=0;i<oneFloorData.tabs.length;i++){
				html += '		<li class="fl">';
				html += '			<a class="tab-item " href="javascript:;">'+oneFloorData.tabs[i]+'</a>';
				html += '		</li>';
				if(i != oneFloorData.tabs.length-1){
					html += '		<li class="fl tab-divider"></li>';
				}
			}
			html += '	</ul>';
			html += '</div>';
			return html;
		}
		function buildFloorBodyHtml(oneFloorData){
			var html = '';
			html += '<div class="floor-bd">';
			for(var i=0;i<oneFloorData.items.length;i++){
				html += '	<ul class="tab-panel clearfix">';
				for(var j=0;j<oneFloorData.items[i].length;j++){
					html += '		<li class="floor-item fl">';
					html += '			<p class="floor-item-pic">';
					html += '				<a href="#">';
				
					html += '					<img class="floor-img" src="images/floor/loading.gif" data-src="images/floor/'+oneFloorData.num+'/'+(i+1)+'/'+(j+1)+'.png" alt="">';
					html += '				</a>';
					html += '			</p>';
					html += '			<p class="floor-item-name">';
					html += '				<a class="link" href="#">'+oneFloorData.items[i][j].name+'</a>';
					html += '			</p>';
					html += '			<p class="floor-item-price">'+oneFloorData.items[i][j].price+' </p>';
					html += '		</li>';
				}
				html += '	</ul>';
			}
			html += '</div>';

			return html;
		}

		lazyLoad({
			$elem:$doc,
			loadItemNum:$doc.find('.floor').length,
			eventName:'floor-show',
			eventPrefix:'floor'
		});
		$doc.on('floor-load',function(ev,index,item){
			var $item = $(item);
			if($doc.item[index] != 'loaded'){
				// console.log('load',index,elem)
				//加载html
				//获取数据，关于html
				getDataOnce($doc,'data/floor/floorData.json',function(data){
					// console.log(data);
					//生成html代码
					var html = buildFloorHtml(data[index]);

					//将html代码插入到页面
					$item.html(html);
					//实现图片的懒加载
					lazyLoad({
						$elem:$item,
						loadItemNum:$item.find('.tab-item').length,
						eventName:'floor-show',
						eventPrefix:'floor'
					});
					$item.on('floor-load',function(ev,index,elem,cb){
						if($item.item[index] != 'loaded'){
							//找到图片标签
							var $imgs = $(elem).find('.floor-img');
							$imgs.each(function(){
								var $img = $(this);
								//拿到真正的图片地址
							
								var imgUrl = $img.data('src');
								//获取图片
								loadImage(imgUrl,function(){
									$img.attr('src',imgUrl)
								},function(){
									$img.attr('src',"images/floor/placeholder.png")
								});
							});
							cb()				
						}
					});
					//激活选项卡功能
					$item.tab({})
				});
				

				$doc.item[index] = 'loaded';
				$doc.loadedItemNum++;
				if($doc.loadedItemNum == $doc.loadItemNum){
					$doc.trigger('floor-loaded');
				}
				
			}
		});
		$doc.on('floor-loaded',function(){
			$win.off('scroll resize load',timeToShow);
		});

		function timeToShow(){
			$floor.each(function(index,elem){
				if(isVisible($(this))){
					//只有存在于可视区的楼层，才需要加载html代码
					clearTimeout(elem.showTimer);
					elem.showTimer = setTimeout(function(){
						$doc.trigger('floor-show',[index,elem])
					},200)
					
				}
			})
		}
		$win.on('scroll resize load',timeToShow);

		function isVisible($elem){
			return $win.height() + $win.scrollTop() > $elem.offset().top && $elem.offset().top + $elem.height() > $win.scrollTop();
		}
		// $floor.tab({});
	}
	handleTab();
	function handleElevator(){
		var $floor = $('.floor');
		var $win = $(window);
		var $elevator = $('#elevator');
		var $elevatorItems = $elevator.find('.elevator-item')
		//获取楼层号
		function getFloorNum(){
			var num = -1;
			$floor.each(function(){
				var index = $floor.index(this)
				num = index;
				if($floor.eq(index).offset().top > $win.scrollTop() + $win.height()/2){
					num = index -1;
					return false;
				}
			})

			return num;
		}
		console.log(getFloorNum())
		//设置电梯
		function setElevator(){
			var num = getFloorNum();
			if(num == -1){
				$elevator.fadeOut();
			}else{
				$elevator.fadeIn();
				$elevatorItems.removeClass('elevator-active')
				$elevatorItems.eq(num).addClass('elevator-active')
			}
			
		}
		$win.on('scroll resize load',function(){
			clearTimeout($elevator.showTimer);
			$elevator.showTimer = setTimeout(setElevator,200);
		});
		//点击电梯，出现对应楼层
		$elevator.on('click','.elevator-item',function(){
			var index = $elevatorItems.index(this);
			//让window的scrollTop等于对应楼层的offset().top
			$('html').animate({
				scrollTop:$floor.eq(index).offset().top
			})
		})
	}
	handleElevator();
	function handleBackTop(){
		var $back = $('#backToTop');
		$back.on('click',function(){
			$('html').animate({
				scrollTop:0
			})
		})
	}
	handleBackTop();
})(jQuery);