<template>
    <div class="detail">
      <!-- 导航栏 -->
      <nav-bar class="navBar" :title="detailTitle" :arrow="true" />
      <!-- 滚动组件 -->
      <scroll class="content" ref="scroll"  @scrollPosition="isShowBackScroll" >
        <!-- 轮播图 -->
        <swipe class="swipe" :images="productDetail.images" />
        <!-- 商品信息 -->
        <div class="product-info-panel">
          <p class="product-name">{{productDetail.name}}</p>
          <p class="product-desc">{{productDetail.description}}</p>
          <p class="product-price">
            {{productDetail.price | priceFormt}}
            <span class="payNums">
              {{productDetail.payNums}} 人已购买
            </span>
          </p>
        </div>
        <div class="product-desc-title">宝贝详图</div>
        <div class="product-desc-img" v-html="productDetail.detail" ref="imgTitle">

        </div>
      </scroll>
      <!-- 底部商品导航栏 -->
      <goods-action @showProductsSku="showProductsSku"/>
      <!-- 返回顶部按钮 -->
      <back-top @click.native="backClick" :probe-type="3" v-show="isShowScrollTop" />
      <!-- 商品规格面板 -->
      <sku :show="show" :productSku="productSku"/>
    </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import Scroll from "components/common/scroll/Scroll";
  import Swipe from "components/common/swipe/Swipe"
  import GoodsAction from "./childComponents/GoodsAction";
  import BackTop from "components/content/backTop/BackTop";
  import Sku from "components/common/sku/Sku"
  import * as type from "../home/store/actionsType";
  import $ from "jquery"
  import { mapGetters } from "vuex"

  export default {
    name: "Detail",
    components: { // 注册组件
      NavBar,
      Scroll,
      Swipe,
      GoodsAction,
      BackTop,
      Sku
    },
    data () {
      return {
        isShowScrollTop: false,
        show: false,
        productSku: null,
        detailTitle: "商品详情"
      }
    },
    created() {
      const productId = this.$route.params.id;
      // 派发actions, 获取当前商品详情数据
      this.$store.dispatch(type.GET_PRODUCT_DETAIL, {productId})
    },
    updated() { // 组件更新阶段
      $(".product-desc-img p img").css("width", "100%")
    },
    methods: {
      backClick () {
        this.$refs.scroll.backTop(0, 0, 500)
      },
      isShowBackScroll(position) {
        // 控制返回顶部按钮是否显示
        this.isShowScrollTop = (-position.y) > 1000 ? true : false
      },
      showProductsSku(productId) {
        // 控制sku面板的显示隐藏
        this.show = !this.show;
        // 将商品详情数据,赋值给productsDetail中, 再传递给sku面板
        this.productSku = this.productDetail;
      }
    },
    computed: {
      ...mapGetters([
        "productDetail"
      ])
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #F8F8F8;
  }
  .navBar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .swipe { /* 给轮播图的盒子一个固定的高度,解决图片滚动时,页面字体跳动问题 */
    height: 260px;
  }
  .product-info-panel {
    padding: 10px;
    width: 100%;
    background-color: #fff;
    margin-top: 10px;
  }
  .product-info-panel .product-name {
    width: 100%;
    line-height: 30px;
    color: #333;
    font-weight: bold;
  }
  .product-info-panel .product-desc {
    width: 100%;
    line-height: 30px;
    margin-top: 10px;
  }
  .product-info-panel .product-price {
    width: 100%;
    line-height: 30px;
    margin-top: 10px;
    font-size: 22px;
    color: var(--color-tint);
  }
  .product-info-panel .product-price .payNums {
    display: inline-block;
    line-height: 30px;
    float: right;
    color: #ccc;
    font-size: 14px;
  }
  .product-desc-title {
    width: 100%;
    line-height: 40px;
    text-align: center;
    background: #fff;
    font-size: 22px;
    margin-top: 10px;
  }
  .product-desc-img {
    position: relative;
    width: 100%;
  }
  .product-desc-img >>> p {
    width: 100%;
  }
  .product-desc-img >>> p >>> img {
    width: 100px;
  }

  /* 滚动组件 */
  .content {
    position: absolute;
    top: 46px;
    bottom: 40px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
