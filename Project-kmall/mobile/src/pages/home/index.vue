<template>
    <div id="home">
        <Search></Search>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div 
                class="swiper-slide"     
                v-for="(ad, index) in homeAds" 
                :key="index"      
                >
                    <img :src="ad.image" alt="ad.name">
                </div>
            </div>

            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>
        <!-- 商品楼层开始 -->
        <ul class="product-wrap">
		    <li class="product-floor" v-for="(floors, index) in homeFloors" :key="index">
		        <h3 class="floor-title">{{floors.title}}</h3>
		        <ul class="product-list" >
		            <li class="product-item" v-for="(product, index) in floors.products" :key="index">
		                <img class="product-image" :src="product.mainImage" :alt="product.name">
		                <div class="product-content">
		                    <h4 class="product-name">{{product.name}}</h4>
		                    <p class="product-price">{{product.price | priceFormt}}</p>
		                    <span class="btn-buy">购买</span>
		                </div>
		            </li>           
		        </ul>
		    </li>       
		</ul>
    </div>
</template>

<script>
import Swiper from "swiper"
import "swiper/css/swiper.min.css"
import * as type from "./store/actionsType"
import { mapGetters } from "vuex"
import Search from "../../components/search/index"

export default {
    name: "Home",
    mounted () { //组件挂载完毕
        // 注意点: 先获取完数据, 并等到dom节点加载完毕之后, 再生成swiper的配置
        // 派发actions, 获取数据, 加载轮播图
        this.$store.dispatch(type.GET_ADS)
        .then(() => {
            new Swiper ('.swiper-container', {
                // 循环模式选项
                loop: true,
                autoplay:true,
                //分页器
                pagination: {
                    el: '.swiper-pagination',
                    clickable:true
                }
            })
        })
        // 派发actions 加载楼层数据
        this.$store.dispatch(type.GET_FLOORS)
    },
    computed: { // 计算属性
        // 使用对象展开运算符, 将getter 混入到 computed对象中
        ...mapGetters([
            "homeAds",
            "homeFloors"
        ])
    },
    components: { // 注册组件
        Search
    }
}


</script>

<style scoped lang="less">
    #home {
        .swiper-slide img{
            width: 100%;
            .rem(height,160px);
        }
        .product-wrap{
            display: flex;
            flex-direction: column;
            .rem(padding,0,10);
            .product-floor{
                margin-bottom: 10px;
                .floor-title{
                    text-align: center;
                    margin-bottom: 5px;
                    .rem(line-height,30);
                    .rem(font-size,18);
                }
                .product-list{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    .product-item{
                        box-sizing: border-box;
                        text-align: center;
                        background-color: #fff;
                        margin-top: 10px;
                        .rem(padding,10);
                        .product-image{
                            .rem(width,100);
                            .rem(height,90);
                        }
                        .product-content{
                            .rem(width,125);
                            .rem(height,100);
                            .product-name{
                                .rem(height,30);
                                .rem(line-height,20);
                                .rem(font-size,14);
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis; // 控制文字超出范围，显示省略号
                                text-align: left;
                                color: #111;
                            }
                            .product-price{
                                .rem(line-height,15);
                                .rem(font-size,18);
                                text-align: left;
                                color: #f21;
                            }
                            .btn-buy{
                                display: block;
                                .rem(line-height,10);
                                .rem(width,50);
                                .rem(font-size,14);
                                .rem(padding,5);
                                background-color: #f21;
                                color: #fff;
                                border-radius: 5px;
                                margin-top: 10px;
                            }
                        }
                    }
                }
            }
        }           
    }

</style>