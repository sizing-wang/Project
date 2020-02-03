<span class="cart-tip">最近添加的宝贝</span>
<ul>
    {{#cartList}}
        <li class="cart-item clearfix">
            <a href="./detail.html?productId={{product._id}}" class="link " target="_blank">
                <img src="{{product.mainImage}}" alt="{{product.name}}" />
                <span class="text-ellipsis">{{product.name}}</span>
            </a>
            <span class="product-count">x{{count}}</span>
            <span class="product-price">￥{{product.price}}</span>
        </li>
    {{/cartList}}
</ul>
<span class="line"></span>
<a href="./cart.html" class="btn cart-btn">查看我的购物车</a>

