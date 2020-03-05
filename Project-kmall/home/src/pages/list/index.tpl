<ul class="clearfix">
    {{#list}}
        <li class="product-list-item">
             <a href="./detail.html?productId={{_id}}" target="_blank">
                 <img class="product-img" src="{{mainImage}}" alt="{{name}}">
                 <p class="product-name">{{name}}</p>
                 <p class="product-price">
                     ￥{{price}}
                     <span class="paynums"><i>{{payNums}}</i>人 已购买</span>
                 </p>
             </a>
         </li>
     {{/list}}
</ul>
