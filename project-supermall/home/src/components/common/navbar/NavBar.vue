<template>
  <div class="nav-bar">
    <van-nav-bar
      :title=header
      :left-text=textLeft
      :right-text=textRight
      :left-arrow=leftArrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>

  export default {
    name: "NavBar",
    props: ["title", "left", "right", "arrow"],
    data() {
      return {
        leftArrow: "",
        header: "",
        textLeft: "",
        textRight: ""
      }
    },
    mounted() {
      this.leftArrow = this.arrow;
      this.header = this.title;
      this.textLeft = this.left;
      this.textRight = this.right
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1) // 返回上一页
      },
      onClickRight() {
        this.$emit("clickRight")
      }
    }
  }
</script>

<style scoped>

</style>
