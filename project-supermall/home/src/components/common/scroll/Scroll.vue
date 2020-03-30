<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        scroll: null,
        scrollY: 0
      }
    },
    mounted() { // 组件挂载完毕
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: true,
        click: true
      });
      // 2.监听滚动位置事件
      this.scroll.on("scroll", (position) => {
        this.$emit("scrollPosition", position)
        this.scrollY = position.y;
      })

    },
    methods: {
      backTop(x, y, time=300) {
        this.scroll.scrollTo(x, y, time)
      },
      getScrollY() {
        return this.scroll ? this.scrollY : 0
      }
    }
  }
</script>

<style scoped>

</style>
