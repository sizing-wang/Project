<template>
    <scroll-view
            scroll-y
            enable-flex
            class="video_main_wrap"
            @scrolltolower="handleScrollToLower"
    >
        <view class="video_item"
              v-for="item in videowp"
              :key="item.id"
              @click="handleGoVideoPlay(item)"
        >
            <image mode="widthFix" :src="item.img"></image>
        </view>
    </scroll-view>
</template>

<script>
    export default {
        data () {
            return {
                videowp: [],
                hasMore: true
            }
        },
        props: {
            url: String,
            params: Object
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList: function () {
                this.request({
                    url: this.url,
                    params:this.params
                })
                .then(result => {
                    if (result.res.videowp.length === 0) {
                        this.hasMore = false
                        uni.showToast({title: "没有更多了", icon: "none"})
                        return
                    }
                    this.videowp = [...this.videowp, ...result.res.videowp]
                })
                .catch(err => {
                    uni.showToast({
                        title: err,
                        icon: "none"
                    })
                })
            },
            handleScrollToLower: function () {
                if (this.hasMore) {
                    this.params.skip += this.params.limit
                    this.getList()
                } else {
                    uni.showToast({title: "没有更多了", icon: "none"})
                }
            },
            handleGoVideoPlay: function (item) {
                // 将数据存储到全局对象中
                getApp().globalData.videoPlay = item
                // 跳转页面
                uni.navigateTo({
                    url: "/pages/videoPlay/index"
                })
            }
        },
        watch: {
            params: function (newVal, oldVal) {
                this.videowp = [] // 清空上次tab选项组件中的数据
                this.getList()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .video_main_wrap {
        display: flex;
        flex-wrap: wrap;
        height: calc(100vh - 36px);
        .video_item {
            width: 33.33%;
            border: 5rpx solid #fff;
            image {

            }
        }
    }
</style>