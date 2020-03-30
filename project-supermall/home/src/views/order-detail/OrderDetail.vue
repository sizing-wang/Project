<template>
  <div class="order-Detail">
    <!-- 顶部导航栏 -->
    <nav-bar title="订单详情" :arrow="true" />
    <!-- 滚动组件 -->
    <scroll class="content">
      <!-- 订单号 -->
      <div class="orderStatus-box">
        <p class="orderStatus">
          <van-icon name="balance-list-o" class="icon" />
          <span>{{orderDetail.statusDesc}}</span>
        </p>
        <p class="orderNo">
          订单号: <span>{{orderDetail.orderNo}}</span>
        </p>
      </div>
      <!-- 收货地址 --> <!-- 容错处理 -->
      <div class="addressPanel" v-if="orderDetail.shipping">
        <div class="addressItem">
          <div class="name-box">
            <van-icon name="location-o" />
            <span class="name">{{orderDetail.shipping.name}}</span>
            <span class="phone">{{orderDetail.shipping.phone}}</span>
          </div>
          <div class="addressDesc">
            <span>{{orderDetail.shipping.province}}, {{orderDetail.shipping.city}}, {{orderDetail.shipping.county}}, {{orderDetail.shipping.address}}</span>
          </div>
        </div>
      </div>
      <!-- 折叠面板 -->
      <van-collapse v-model="activeNames">
        <van-collapse-item title="订单信息" name="1">
          <!-- 订单信息 -->
          <div class="orderDesc-box">
            <div class="orderDesc">
              <p class="orderNo">
                订单号: <span>{{orderDetail.orderNo}}</span>
              </p>
              <p class="orderStatus">
                支付方式: <span>{{orderDetail.paymentTypeDesc}}</span>
              </p>
              <p class="orderMoney">
                订单金额: <span>¥ {{orderDetail.payment}}</span>
              </p>
              <p class="orderData">
                下单时间: <span>{{orderDetail.createdAt}}</span>
              </p>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="物流信息" name="2">
          <!-- 物流信息 -->
          <div>暂无物流信息</div>
        </van-collapse-item>
        <van-collapse-item title="商品信息" name="3">
          <!-- 商品信息 -->
          <div class="product-item"
               v-for="(item, index) in orderDetail.productList"
               :key="index"
          >
            <van-card
              :num= item.count
              :price= item.price
              :title= item.name
              :thumb= item.mainImage
            >
              <!-- 商品属性 -->
              <template #tags>
                <van-tag plain>{{item.attr}}</van-tag>
              </template>
            </van-card>
          </div>
        </van-collapse-item>
      </van-collapse>
    </scroll>
  </div>
</template>
<script>
  import Scroll from "../../components/common/scroll/Scroll";
  import NavBar from "../../components/common/navbar/NavBar";
  import * as type from "./store/actionsType"
  import { mapGetters } from "vuex"

  export default {
    name: "OrderDetail",
    components: {
      Scroll,
      NavBar
    },
    data() {
      return {
        activeNames: ['1']
      };
    },
    // beforeCreate() {
    //   // 派发actions, 发送请求, 获取当前订单详情信息
    //   const orderNo = this.$route.params.orderNo;
    //   this.$store.dispatch(type.GET_ORDER_DETAIL, {orderNo})
    // },
    activated() {
      // 派发actions, 发送请求, 获取当前订单详情信息
      const orderNo = this.$route.params.orderNo;
      this.$store.dispatch(type.GET_ORDER_DETAIL, {orderNo})
    },
    computed: {
      ...mapGetters([
        "orderDetail"
      ])
    }
  }
</script>

<style scoped>
  .order-Detail {
    width: 100%;
    height: 100vh;
    position: relative;
  }
  .orderStatus-box {
    width: 100%;
    height: 80px;
    background: #52c41a;
    overflow: hidden;
  }
  .orderStatus-box .orderStatus {
    margin-top: 10px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: 18px;
    color: #fff;
  }
  .orderStatus-box .orderStatus span {
    margin-left: 10px;
    vertical-align: 2px;
  }
  .orderStatus-box .orderNo {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    color: #fff;
  }


  .addressPanel {
    position: relative;
    width: 100%;
    height: 80px;
    overflow: hidden;
  }
  .addressItem .name-box {
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
    font-size: 18px;
    font-weight: bold;
    margin-top: 15px;
    padding-left: 10px;
  }
  .addressItem .name-box >>> .van-icon {
    vertical-align: -2px;
    margin-right: 3px;
  }
  .addressItem .name-box .name {
    margin-right: 5px;
  }
  .addressItem .addressDesc {
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin-left: 13px;
    font-size: 16px;
    padding-left: 10px;
  }
  .content {
    position: absolute;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow: hidden;
  }





  .order-Detail .orderDesc-box {
    width: 100%;
    height: 105px;
    background: #fff;
    margin-bottom: 2px;
  }
  .orderDesc-box .orderDesc {
    float: left;
    width: 245px;
    height: 100%;
    font-size: 14px;
  }
  .orderDesc .orderNo {
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin-top: 3px;
    font-size: 16px;
    font-weight: bold;
  }
  .orderDesc .orderStatus {
    width: 100%;
    height: 20px;
    line-height: 20px;
    margin-top: 3px;
  }
  .orderDesc .orderMoney {
    width: 100%;
    height: 20px;
    line-height: 20px;
    margin-top: 3px;
  }
  .orderDesc .orderMoney span {
    color: #f32328;
  }
  .orderDesc .orderData {
    width: 100%;
    height: 20px;
    line-height: 20px;
    margin-top: 3px;
  }


  .product-item {
    width: 100%;
    position: relative;
    background-color: #fafafa;
  }
  .product-item >>> .van-card__title {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 16px;
  }
  .product-item >>> .van-checkbox__icon {
    margin-left: 10px;
  }
  .product-item >>> .van-checkbox__label {
    display: inline-block;
    width: 100%;
  }
</style>
