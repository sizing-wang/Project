

// 轮播图交互
function handleCarousel(){
    var aLi = document.querySelectorAll('.ad .LunBo-img');
    var aBtn = document.querySelectorAll('.ad .ad-btn .ad-ul li');
    var oCarousel = document.querySelector('.ad');
    var now = 0;
    var timer = 0;
    function tab(){
        for (var i = 0; i < aLi.length; i++){
            aLi[i].style.zIndex = '0';
            aBtn[i].className = '';
            aLi[i].style.opacity = '0';
        }
        aLi[now].style.zIndex = '999';
        aBtn[now].className = 'active';
        aLi[now].style.opacity = '1';
    }
    for (var i = 0; i < aBtn.length; i++){
        aBtn[i].index = i;
        aBtn[i].onclick = function () {
            now = this.index;
            tab();
        }
    }
// 自动轮播
    timer = setInterval(function () {
        now++;
        if (now >= aLi.length){
            now = 0;
        }
        tab();
    }, 3000);
    oCarousel.onmouseover = function () {
        clearInterval(timer);
    };
    oCarousel.onmouseout = function () {
        timer = setInterval(function () {
            now++;
            if (now >= aLi.length){
                now = 0;
            }
            tab();
        }, 3000);
    };
}
handleCarousel();




// 下拉菜单交互功能
function handleMenu() {
    // 获取元素
    var aLi = document.querySelectorAll('.header-top .center-ul li .control');
    var oHideBox = document.querySelector('.header-nav .hideBox');
    var oHidePhone = document.querySelector('.header-nav .hideBox .hidePhone');
    var timer = 0;
    for (var i = 0; i < aLi.length; i++){
        aLi[i].index = i;
        aLi[i].onmouseenter = function () {
            // oHideBox.style.opacity = '0.8';
            clearTimeout(timer);
            Animate2(oHideBox, {height: 200}, true, function () {
                oHidePhone.style.display = 'block';
            });
            // 生成数据调用
            creatData(this.index);

        };
        oHideBox.onmouseenter = function () {
            // oHideBox.style.opacity = '0.8';
            clearTimeout(timer);
            Animate2(oHideBox, {height: 200}, true, function () {
                oHidePhone.style.display = 'block';
            });
        };



        oHideBox.onmouseleave = aLi[i].onmouseleave = function () {
            timer = setTimeout(function () {
                oHidePhone.style.display = 'none';
                Animate2(oHideBox, {height: 0}, true);
            }, 500);

        };

    }


// 生成数据
    function creatData(index) {
        var data = phoneData[index];
        var html = '<ul class="hideUl">';
        for (var i = 0; i < data.length; i++){
            html += '<li>';
            html += '<a href="'+data[i].url+'">';
            html += '<img src="'+data[i].img+'" alt="" class="phoneImg">';
            html += '<p class="name">'+data[i].name+'</p>';
            html += '<p class="price">'+data[i].price+'</p>';
            html += '</a>';
            html += '</li>';
        }
        html += '</ul>';
        oHidePhone.innerHTML = html;

    }




}

handleMenu();

