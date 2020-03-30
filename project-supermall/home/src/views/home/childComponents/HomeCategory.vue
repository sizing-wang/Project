<template>
  <div id="home-category">
      <h2 class="category-title">商品分类</h2>
    <div class="category-box">
      <div class="category-item"
         v-for="(item, index) in categories"
         :key="index"
         :id="item._id"
    >
      <a href="">
        <img :src="item.icon" :alt="item.name">
      </a>
      <div class="category-name">{{item.name}}</div>
    </div>
    </div>
  </div>
</template>

<script>
  import * as type from "../store/actionsType"
  import { mapGetters } from "vuex"

  export default {
    name: "HomeCategory",
    mounted() { // 组件挂在完毕, 派发action 获取数据
      this.$store.dispatch(type.GET_CATEGORY)
      .then(() => {

      })
    },
    computed: { // 计算属性, 获取store中数据
       ...mapGetters([
          "categories"
       ])
    }
  }
</script>

<style scoped>
  #home-category {
    width: 100%;
    margin-top: 5px;
  }
  .category-title {
    width: 100%;
    line-height: 40px;
    text-align: center;
    color: #333;
    font-size: 20px;
    font-weight: normal;
  }
  .category-box {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    padding: 0px 10px 0px 10px;
  }
  .category-item {
    flex: 1;
    margin-top: 8px;
  }
  .category-item img {
    width: 73px;
    height: 73px;
    border-radius: 50%;
  }
  .category-name {
    margin-top: 5px;
    font-size: 14px;
  }
</style>
