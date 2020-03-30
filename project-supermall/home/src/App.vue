<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <tab-bar v-show="path" />
  </div>
</template>

<script>
  import TabBar from "components/content/tabbar/"

  export default {
    name: 'App',
    data () {
      return {
        path: true
      }
    },
    components: {
      TabBar
    },
    updated() {
      const productId = this.$route.params.id;
      if (this.$route.path == "/detail/" + productId) {
        this.path = false
      } else {
        this.path = true
      }
    }
  }
</script>

<style>
  @import "assets/css/base.css";

</style>
