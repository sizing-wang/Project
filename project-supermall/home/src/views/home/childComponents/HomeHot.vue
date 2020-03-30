<template>
  <div id="home-hot">
    <ul class="product-wrap">
      <li class="product-floor">
        <h3 class="floor-title">热卖推荐</h3>
        <ul class="product-list" >
          <li class="product-item"
              v-for="(item, index) in homeHot"
              ref="productItem"
              :key="index"
          >
            <img class="product-image" :src="item.mainImage"
                 :id="item._id"
                 @click="detail($event)"/>
            <div class="product-content">
              <h4 class="product-name">{{item.name}}</h4>
              <span class="product-price">{{item.price | priceFormt}}</span>
              <div class="product-payCount">
                <div class="product-payNums">
                  <i>{{item.payNums}}</i> 人已购买
                </div>
                <div class="shopping-icon"
                     @click="showSku($event)"
                     :id="item._id"
                >
                  <van-icon name="shopping-cart-o" color="#ff8198" />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import * as type from "../store/actionsType"
  import { mapGetters } from "vuex"

  export default {
    name: "HomeHot",
    data() {
      return {

      }
    },
    mounted() { // 组件挂载完毕
      // 派发action 获取首页热卖商品数据
      this.$store.dispatch(type.GET_HOT)
    },
    computed: {
      ...mapGetters([
        "homeHot"
      ])
    },
    methods: {
      showSku (e) {
        if (localStorage.token) {
          const productId = e.currentTarget.id;
          this.$emit("showSku", productId)
        } else { // 用户没有登录, 去登录
          this.$router.push("/login")
        }
      },
      detail(e) {
        const productId = e.currentTarget.id;
        this.$router.push("/detail/" + productId);
      }
    }
  }
</script>

<style scoped>
  #home-hot {
    width: 100%;
  }
  #home-hot .floor-title {
    width: 100%;
    margin-top: 5px;
    color: #333;
    line-height: 30px;
    text-align: center;
    font-weight: normal;
  }
  #home-hot .product-image {
    width: 100%;
    height: 180px;
  }
  .product-wrap .product-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  #home-hot .product-list .product-item {
    width: 180px;
    box-sizing: border-box;
    padding: 10px;
    margin-top: 10px;
    text-align: center;
    background-color: #fff;
    border-radius: 5px;
  }
  .product-list .product-item .product-content {
    width: 100%;
  }
  .product-content .product-name {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: normal;
  }
  .product-content .product-price {
    display: inline-block;
    width: 100%;
    text-align: left;
    font-size: 22px;
    color: var(--color-tint);
  }
  .product-content .product-payCount {
    width: 100%;
    color: rgba(0,0,0,0.45);
    font-size: 14px;
  }
  .product-content .product-payNums {
    float: left;
    margin-top: 8px;
  }
  .product-content .shopping-icon {
    float: right;
    margin-right: 5px;
    font-size: 30px;
  }
</style>
