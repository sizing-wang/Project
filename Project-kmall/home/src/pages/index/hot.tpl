<ul class="hot-list clearfix">
    {{#homeHot}}
    <li class="product-list-item col-1 col-gap floor-item">
        <a href="./detail.html?productId={{_id}}">
            <img class="floor-img" src="{{mainImage}}" alt="" />
            <p class="floor-text text-ellipsis">{{name}}</p>
            <p class="floor-price">
                ￥{{price}}
                <span class="paynums"><i>{{payNums}}</i>人 已购买</span>
            </p>
        </a>
    </li>
    {{/homeHot}}
</ul>