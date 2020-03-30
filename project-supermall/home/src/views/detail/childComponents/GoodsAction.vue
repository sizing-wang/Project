<template>
  <div class="goods-action">
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="goCart"/>
      <van-goods-action-button
        color="#be99ff"
        type="warning"
        text="加入购物车"
        @click="showProductSku"
      />
      <van-goods-action-button
        color="#7232dd"
        type="danger"
        text="立即购买"
        @click="onClickBuy"
      />
    </van-goods-action>
  </div>
</template>

<script>
  import { Toast } from 'vant';

  export default {
    name: "GoodsAction",
    methods: {
      onClickIcon() {
        Toast("正在努力开发中 ... ")
      },
      goCart() {
        this.$router.push("/cart")
      },
      showProductSku() { // 加入购物车
        const productId = this.$route.params.id;
        this.$emit("showProductsSku", productId)
      },
      onClickBuy() { // 立即购买
        Toast("正在努力开发中 ... ")
      }
    }
  }
</script>

<style scoped>

</style>
