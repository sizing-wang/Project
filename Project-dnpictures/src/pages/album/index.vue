<template>
    <view>
        <!-- 专辑背景 开始 -->
        <view class="album_bg_wrap">
            <image mode="widthFix" :src="album.cover"></image>
            <view class="album_bg_info">
                <view class="album_bg_name">{{album.name}}</view>
                <view class="album_bg_btn">关注专辑</view>
            </view>
        </view>
        <!-- 专辑背景 结束 -->
        <!-- 专辑作者 开始 -->
        <view class="album_author_wrap">
            <view class="album_author_info">
                <image mode="widthFix" :src="album.user.avatar"></image>
                <view class="album_author_name">{{album.user.name}}</view>
            </view>
            <view class="album_author_desc">
                <!-- text 可以解析的有 &nbsp; &lt; &gt; &amp; &apos; &ensp; &emsp; -->
                <text>{{album.desc}}</text>
            </view>

        </view>
        <!-- 专辑作者 结束 -->
        <!-- 专辑列表 开始 -->
        <view class="album_list_wrap">
            <view class="album_item"
                  v-for="(item, index) in wallpaper"
                  :key="item.id">
                <go-detail :list="wallpaper" :index="index">
                    <image mode="aspectFill" :src="item.thumb + item.rule.replace('$<Height>', 360)"></image>
                </go-detail>
            </view>
        </view>
        <!-- 专辑列表 结束 -->

    </view>
</template>

<script>
    import goDetail from "../components/goDetail";
    export default {
        components: {
            goDetail
        },
        data () {
            return {
                id: -1,
                params: {
                    limit: 30,
                    order: "new",
                    skip: 0,
                    first: 1 // 1: 表示第一次请求, 包含album的返回值; 0: 表示不是第一次请求, 只有wallpaper的返回值
                },
                album: {},
                wallpaper: [],
                hasMore: true
            }
        },
        onLoad (options) {
            this.id = options.id
            // this.id="5d5f8e45e7bce75ae7fb8278"
            this.getList()
        },
        onReachBottom () { // 用户上拉到页面触底时, 触发
            if (this.hasMore) {
                this.params.skip += this.params.limit
                this.getList()
            } else {
                uni.showToast({
                    title: "没有更多了",
                    icon: "none"
                })
            }
        },
        methods: {
            getList: function () {
                this.request({
                    url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
                    data: this.params
                })
                .then(result => {
                    // Object.keys: 将对象中的属性一个一个的拿出来放进一个数组中, 并返回
                    if (Object.keys(this.album).length === 0) { // 表示第一次请求数据
                        this.album = result.res.album
                    }
                    if (result.res.wallpaper.length === 0) {
                        this.hasMore = false
                        uni.showToast({
                            title: "没有更多了",
                            icon: "none"
                        })
                        return
                    }
                    this.wallpaper = [...this.wallpaper, ...result.res.wallpaper]
                })
                .catch(err => {
                    uni.showToast({title: err, icon: "none"})
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .album_bg_wrap {
        position: relative;
        image {

        }
        .album_bg_info {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 80rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20rpx;
            .album_bg_name {
                font-size: 32rpx;
                color: #ffffff;
            }
            .album_bg_btn {
                border: 2rpx solid $color;
                background-color: $color;
                border-radius: 10rpx;
                padding: 10rpx 20rpx;
                color: #ffffff;
            }
        }
    }
    .album_author_wrap {
        padding: 10rpx;
        .album_author_info {
            display: flex;
            image {
                width: 60rpx;
            }
            .album_author_name {
                margin-left: 10rpx;
                font-weight: bold;
            }
        }
        .album_author_desc {
            padding: 10rpx 0;
        }

    }
    .album_list_wrap {
        display: flex;
        flex-wrap: wrap;
        .album_item {
            width: 33.33%;
            border: 3rpx solid #fff;
            image {
                height: 160rpx;
            }
        }
    }
</style>