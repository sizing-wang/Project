<template>
  <div class="order-list">
    <!-- 顶部导航栏 -->
    <nav-bar title="订单列表" :arrow="true" />
    <!-- 订单商品列表 -->
    <div class="orderList-box"
         v-for="(item, index) in orderList.list"
         :key="index"
         @click="goOrderDetail(item.orderNo)"
    >
        <div class="orderImg">
          <img :src="item.productList[0].mainImage" alt="">
        </div>
        <div class="orderDesc">
          <p class="orderNo">
            订单号: <span>{{item.orderNo}}</span>
          </p>
          <p class="orderStatus">
            订单状态: <span>{{item.statusDesc}}</span>
          </p>
          <p class="orderMoney">
            订单金额: <span>¥ {{item.payment}}</span>
          </p>
          <p class="orderData">
            下单时间: <span>{{item.createdAt}}</span>
          </p>
        </div>
        <div class="orderIcon">
          <span><van-icon name="arrow" /></span>
        </div>
    </div>
  </div>
</template>
<script>
  import Scroll from "../../components/common/scroll/Scroll";
  import NavBar from "../../components/common/navbar/NavBar";
  import * as type from "./store/actionsType"
  import { Dialog } from 'vant';
  import { mapGetters } from "vuex"

  export default {
    name: "OrderList",
    components: {
      Scroll,
      NavBar
    },
    data() {
      return {

      };
    },
    activated() {
      // 派发actions, 获取当前登录用户的订单列表数据
      this.$store.dispatch(type.GET_ORDER_LIST)
    },
    methods: {
      goOrderDetail(orderNo) {
        this.$router.push("/orderDetail/" + orderNo)
      }
    },
    computed: {
      ...mapGetters([
        "orderList"
      ])
    }
  }
</script>

<style scoped>
  .order-list {
    width: 100%;
    height: 100vh;
    background-color: #fafafa;
  }
  .order-list .orderList-box {
    width: 100%;
    height: 105px;
    background: #fff;
    margin-bottom: 2px;
  }
  .orderList-box .orderImg {
    float: left;
    width: 100px;
    height: 100%;
    position: relative;
  }
  .orderList-box .orderImg img {
    width: 90px;
    height: 90px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .orderList-box .orderDesc {
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
  .orderList-box .orderIcon {
    float: right;
    width: 30px;
    height: 105px;
    line-height: 105px;
    text-align: center;
    font-size: 22px;
  }

</style>
