<template>
  <div class="cart">
    <!-- 顶部导航栏 -->
    <nav-bar title="购物车" right="删除选中" @clickRight="delChecked" />
    <!-- 滚动组件 -->
    <scroll class="content">
      <!-- 购物车中商品item -->
        <van-checkbox
          v-for="(item, index) in cartList.cartList"
          v-model="item.checked"
          ref="productItem"
          :name="item.product._id"
          :key="index"
          @change="changeChecked(item.checked, item.product._id)"
        >
        <van-card
          :num=item.count
          :price=item.product.price.toFixed(2)
          :title=item.product.name
          :thumb=item.product.mainImage
        >
          <!-- 商品属性 -->
          <template #tags>
            <van-tag plain>{{item.product.attrs[0].key}}</van-tag>
          </template>
        </van-card>
        </van-checkbox>
    </scroll>
    <!-- 底部结账导航栏 -->
    <div class="paymentBar-box">
      <div class="checkedAllBtn-box">
        <van-checkbox
          v-model="cartList.allChecked"
          class="checkedAllBtn"
          @click="checkAll"
        >全选</van-checkbox>
      </div>
      <div class="totalPrice-box">
        <div class="totalPricePanel">
          <span class="totalText">合计: <span class="unit">¥ <span class="totalPrice">{{totalCartPrice || cartList.totalCartPrice}}</span></span></span>
        </div>
      </div>
      <div class="submit-box">
        <van-button round type="info"
                    color="linear-gradient(to right, #ff6034, #ee0a24)"
                    class="submit"
                    @click="goPayment"
        >
          结算
        </van-button>
      </div>
    </div>
    <!-- 当购物中没有商品时, 提示信息 -->
    <div class="mask" v-show="maskShow">
      <div class="mask-box">
        <img src="./img/cart.jpg" alt="">
        <h2 class="mask-msg">购物车是空的 ~ </h2>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import Scroll from "../../components/common/scroll/Scroll";
  import { Dialog } from 'vant';
  import * as type from "./store/actionsType"
  import { mapGetters } from "vuex"

  export default {
    name: "Cart",
    components: {
      NavBar,
      Scroll
    },
    data() {
      return {
        maskShow: true,
        productId: null,
        productNums: [],
        totalCartPrice: 0
      }
    },
    created() {
      // 派发actions, 获取当前登录用户的购物车中商品数据
      this.$store.dispatch(type.GET_CARTS)
    },
    updated() {
      this.productNums = this.cartList.cartList.map(item => {
        return item
      })
    },
    activated() { // 每到进入组件时, 执行
      // 派发actions, 获取当前登录用户的购物车中商品数据
      this.$store.dispatch(type.GET_CARTS)
    },
    methods: {
      changeChecked(checked, productId) {
        if (!checked) { // 处理单个取消
          let check = false;
          this.$store.dispatch(type.GET_CHOICES, {productId, check})
        } else { // 处理单个选中
          this.productId = productId;
          let check = true;
          this.$store.dispatch(type.GET_CHOICES, {productId, check})
        }
      },
      checkAll() { // 全选 / 反选
        this.cartList.allChecked = !this.cartList.allChecked;
        if (this.cartList.allChecked) {
          let check = true;
          this.$store.dispatch(type.GET_CHOICES, {check})
        } else {
          let check = false;
          this.$store.dispatch(type.GET_CHOICES, {check})
        }
      },
      delChecked () {
        Dialog.confirm({
          message: '确定删除此商品吗?'
        }).then(() => {
          const productId = this.productId;
          const productNums = this.productNums;
          productNums.forEach((item, index) => {
            if (item.product._id == productId) {
              productNums.splice(index, 1)
            }
          })
          // 派发actions, 删除选中的购物车商品
          this.$store.dispatch(type.GET_DELETE_PRODUCT, {productId})
        }).catch(() => {
          // on cancel
        });
      },
      goPayment() {
        this.$router.push("/orderConfirm")
      }
    },
    watch: {
      productNums(newVal) {
        if (newVal.length == 0) {
          this.cartList.allChecked = false;
          this.maskShow = true; // 控制购物车空时的, 显示隐藏提示信息
        } else {
          this.maskShow = false;
        }
      }
    },
    computed: {
      ...mapGetters([
        "cartList"
      ])
    }
  }
</script>

<style scoped>
  .cart {
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: #fafafa;
  }
  .cart >>> .van-card__title {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 16px;
  }
  .cart >>> .van-checkbox__icon {
    margin-left: 10px;
  }
  .cart >>> .van-checkbox__label {
    display: inline-block;
    width: 100%;
  }
  /* 滚动组件 */
  .content {
    position: absolute;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 100px;
    overflow: hidden;
  }
  .paymentBar-box {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 50px;
    width: 100%;
    height: 50px;
  }
  .paymentBar-box .checkedAllBtn-box {
    float: left;
    width: 100px;
    height: 100%;
  }
  .paymentBar-box .checkedAllBtn {
    height: 50px;
    line-height: 50px;
  }
  .paymentBar-box .totalPrice-box {
    float: left;
    position: relative;
    width: 140px;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
  }
  .paymentBar-box .totalPrice-box .totalPricePanel {
    display: inline;
    width: auto;
    /*margin-left: 5px;*/
  }
  .paymentBar-box .totalPrice-box .totalPricePanel .totalPrice {
    font-size: 20px;
    color: #f32328;
  }
  .paymentBar-box .submit-box {
    height: 50px;
    float: right;
  }
  .paymentBar-box .submit-box .submit {
    width: 120px;
    height: 100%;
    font-size: 18px;
    margin-left: 5px;
    margin-right: 10px;
  }
  .mask {
    width: 100%;
    height: 100vh;
  }
  .mask .mask-box {
    width: 100%;
    height: 100%;
    background: #f6f6f6;
    text-align: center;

  }
  .mask .mask-box img {
    width: 200px;
    height: auto;
  }
</style>
