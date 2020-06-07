<template>
    <view @click="handleGoDetail">
        <slot></slot>
    </view>

</template>

<script>
    export default {
        props: {
            list: Array,
            index: Number
        },
        methods: {
            handleGoDetail: function () {
                // 在全局存储数据
                getApp().globalData.list = this.list
                getApp().globalData.index = this.index
                uni.navigateTo({
                    url: "/pages/imgDetail/index"
                })
            }
        }
    }
</script>

<style scoped>

</style>