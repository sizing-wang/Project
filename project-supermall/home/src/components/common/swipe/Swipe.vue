<template>
  <div class="swipe">
    <van-swipe :autoplay="3000" class="my-swiper">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>

  export default {
    name: "Swipe",
    props: ["images"],
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
  .my-swiper {
    width: 100%;
    height: 260px;
  }
  .my-swiper img {
    width: 100%;
    height: 100%;
  }
</style>
