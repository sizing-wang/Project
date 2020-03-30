<template>
  <div class="home-swiper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(ad, index) in homeAds"
          :link="ad.link"
          :key="index"
        >
          <a :href="ad.link">
            <img :src="ad.image" :alt="ad.name" @load="swiperImageLoad">
          </a>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
    import * as type from "../store/actionsType";
    import Swiper from "swiper";
    import {mapGetters} from "vuex";

    export default {
      name: "HomeSwiper",
      mounted() { // 组件挂在完毕
        // 先获取数据, 加载完dom节点, 再配置轮播图
        this.$store.dispatch(type.GET_ADS)
          .then(() => {
            // 创建轮播图
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

      },
      computed: { // 计算属性
        // 使用对象展开运算符, 将getter 混入到 computed对象中
        ...mapGetters([
          "homeAds"
        ])
      },
      methods: {
        swiperImageLoad() {
          this.$emit("swiperImageLoad")
        }
      }
    }
</script>

<style scoped>
  .swiper-slide img {
    width: 100%;
    height: 180px;
  }
</style>
