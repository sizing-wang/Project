<template>
    <scroll-view class="album_scroll_view" @scrolltolower="handleToLower" scroll-y >
        <!-- 轮播图 开始 -->
        <view class="album_swiper">
            <swiper autoplay indicator-dots circular>
                <swiper-item
                        v-for="item in banner"
                        :key="item.id"
                >
                    <image :src="item.thumb"></image>
                </swiper-item>
            </swiper>
        </view>
        <!-- 轮播图 结束 -->
        <!-- 列表 开始 -->
        <view class="album_list_wrap">
            <view class="album_list">
                <navigator
                      class="album_item"
                      v-for="item in album"
                      :key="item.id"
                      :url="`/pages/album/index?id=${item.id}`"
                >
                    <view class="album_img">
                        <image mode="aspectFill" :src="item.cover"></image>
                    </view>
                    <view class="album_info">
                        <view class="album_name">{{item.name}}</view>
                        <view class="album_desc">{{item.desc}}</view>
                        <view class="album_attention"><text>关注</text></view>
                    </view>
                </navigator>
            </view>
        </view>
        <!-- 列表 结束 -->

    </scroll-view>
</template>

<script>
    export default {
        name: "home-album",
        data () {
            return {
                banner: [],
                album: [],
                params: {
                    limit: 30,
                    order: "new",
                    skip: 0
                },
                hasMore: true
            }
        },
        mounted() {
            wx.setNavigationBarTitle({
                title: '专辑'
            })
            this.getList()
        },
        methods: {
            getList: function () {
                this.request({
                    url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
                    data: this.params
                })
                .then(result => {
                    if (this.banner.length === 0) { // 第一次加载
                        this.banner = result.res.banner
                    }
                    // 判断还有没有下一页数据
                    if (result.res.album.length === 0) {
                        this.hasMore = false
                        uni.showToast({
                            title: "没有更多了",
                            icon: "none"
                        })
                        return
                    }
                    // 数据的叠加
                    this.album = [...this.album, ...result.res.album]

                })
                .catch(err => {
                    wx.showToast({
                        title: err,
                        icon: error
                    })
                })
            },
            // 处理上拉到底部加载更多
            handleToLower: function () {
                if (this.hasMore) {
                    this.params.skip += this.params.limit
                    this.getList()
                } else {
                    uni.showToast({
                        title: "没有更多了",
                        icon: "none"
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .album_scroll_view {
        height: calc(100vh - 36px);
    }
/*
    因为swiper的固定高为150px, 放在swiper-item中的images标签默认高为240px
    所以会导致图片不能完整的展示出来
    因此需要重新设置swiper的高, 再设置image的高
    公式:
    先计算轮播图中的图片的 宽 / 高的值 (比例)
    再将750rpx / 轮播图中的图片的 宽 / 高的值 得出的值就是swiper的高
*/
    .album_swiper {
        swiper {
            height: calc(750rpx / 2.25);
            image {
                height: 100%;
            }
        }
    }
    .album_list_wrap {
        .album_list {
            padding: 10rpx;
            .album_item {
                padding: 10rpx;
                display: flex;
                .album_img {
                    flex: 1;
                    image {
                        width: 200rpx;
                        height: 200rpx;
                    }
                }
                .album_info {
                    padding: 10rpx;
                    flex: 2;
                    overflow: hidden;
                    .album_name {
                        padding: 10rpx 0;
                        font-size: 32rpx;
                        color: #000;
                    }
                    .album_desc {
                        padding: 10rpx 0;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .album_attention {
                        padding-top: 10rpx;
                        display: flex;
                        justify-content: flex-end;
                        text {
                            color: $color;
                            border: 2rpx solid $color;
                            padding: 5rpx 10rpx;
                        }
                    }
                }
            }
        }
    }
</style>