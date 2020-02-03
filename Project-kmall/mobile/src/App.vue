
<template>
  <div id="app">
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件, 将渲染在这里 --> 
      <router-view></router-view>
      <TabBar></TabBar>
  </div>
</template>

<script>
// 引入组件
import TabBar from "./components/tab-bar"
export default {
    name: 'App',
    components: {
        TabBar
    }
}
</script>

<style lang="less">

</style>

