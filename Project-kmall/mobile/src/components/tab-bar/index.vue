<template>
    <div id="tab-bar">
        <!-- 自定义主题色 -->
        <van-tabbar v-model="active" active-color="#07c160">
        <van-tabbar-item 
        icon="home-o"
        replace
        to="/home"
        >
        首页
        </van-tabbar-item>
        <van-tabbar-item 
        icon="cart-o"
        replace
        to="/carts"
        >
        购物车
        </van-tabbar-item>
        <van-tabbar-item 
        icon="user-o"
        replace
        to="/me"
        >
        个人中心
        </van-tabbar-item>
</van-tabbar>
    </div>
</template>

<script>
export default {
    name: "TebBar",
    data () {
        return {
            active: 0
        }
    }
}
</script>

<style scoped>

</style>