<template>
  <div class="tab-ctrl">
    <div class="tab-ctrl-item"
         v-for="(item, index) in titles"
         :class="{active: currentIndex == index}"
         @click="itemClick(index)"
         :key="index"
    >
      <span><a href="javascript:">{{item}}</a></span>
    </div>
  </div>
</template>

<script>
  import * as type from "views/home/store/actionsType"
    export default {
      name: "TabCtrl",
      data() {
        return {
          currentIndex: 0

        }
      },
      props: ["titles"],
      methods: {
        itemClick: function (index) {
          this.currentIndex = index;
          this.$emit("tabClick", index);
          if (index == 0) {
            this.$router.go(0) // 刷新当前页
          } else if (index == 1) {
            // 派发actions, 获取全部商品数据
            this.$store.dispatch(type.GET_FLOORS);
            this.$emit("hideHotFloor", "")
          } else if (index == 2) {
            // 处理可控导航栏中热卖商品数据
            // 派发actions, 获取获取商品数据
            this.$store.dispatch(type.GET_HOT)
            this.$emit("hideFloors", "")
          }
        }
      },
      mounted() { // 组件挂载完毕

      }
    }
</script>

<style scoped>
  .tab-ctrl {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
    background-color: #fff;
    display: flex;
    text-align: center;
    z-index: 99;
  }
  .tab-ctrl-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 2px solid var(--color-tint);
    padding: 5px;
  }
</style>
