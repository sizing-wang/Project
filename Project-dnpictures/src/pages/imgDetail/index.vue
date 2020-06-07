<template>
    <view>
        <!-- 图片作者 开始 -->
        <view class="img_user_wrap">
            <image mode="widthFix" :src="imgDetailData.user.avatar"></image>
            <view class="img_user_desc">
                <view class="img_user_name">{{imgDetailData.user.name}}</view>
                <view class="img_user_time">{{imgDetailData.cntime}}</view>
            </view>
        </view>
        <!-- 图片作者 结束 -->
        <!-- 高清大图 开始 -->
        <view class="high_img">
            <swiper-action @swiperAction="handleSwiperAction">
                <image mode="widthFix" :src="imgDetailData.thumb"></image>
            </swiper-action>
        </view>
        <!-- 高清大图 结束 -->
        <!-- 图片点赞 开始 -->
        <view class="img_rank_wrap">
            <view class="img_rank">
                <text class="iconfont icondianzan"> {{imgDetailData.rank}}</text>
            </view>
            <view class="img_collection">
                <text class="iconfont iconshoucang"> 收藏</text>
            </view>
        </view>
        <!-- 图片点赞 结束 -->
        <!-- 图片专辑 开始 --> <!-- album.length 返回 false; 当album.length=0时, 转换成布尔值为false -->
        <view class="img_album_wrap" v-if="album.length">
            <view class="img_album_title">
                <text>相关</text>
            </view>
            <view class="img_album_list">
                <view class="img_album_item"
                      v-for="item in album"
                      :key="item.id"
                >
                    <view class="img_album_cover">
                        <image mode="aspectFill" :src="item.cover"></image>
                    </view>
                    <view class="img_album_info">
                        <view class="img_album_flag">
                            <text>专辑</text>
                        </view>
                        <view class="img_album_name">{{item.name}}</view>
                        <text class="iconfont iconiconfontjiantou4"></text>
                    </view>
                </view>

            </view>
        </view>
        <!-- 图片专辑 结束 -->
        <!-- 用户最热评论 开始 -->
        <view class="comment_hot_wrap"  v-if="hot.length">
            <!-- 评论区标题 -->
            <view class="comment_hot_title">
                <text class="iconfont iconhot1"></text>
                <text>最热评论</text>
            </view>
            <!-- 评论区内容 -->
            <view class="comment_hot_list">
                <view class="comment_hot_item"
                      v-for="item in hot"
                      :key="item.id"
                >
                    <!-- 用户信息 -->
                    <view class="comment_user_desc">
                        <view class="comment_user_avatar">
                            <image :src="item.user.avatar"></image>
                        </view>
                        <view class="comment_name_desc">
                            <view class="comment_name_info">
                                <view class="user_name">{{item.user.name}}</view>
                                <view class="user_time">{{item.cntime}}</view>
                            </view>
                        </view>
                        <!-- 用户徽章 -->
                        <view class="comment_user_badge">
                            <image v-for="key in item.user.title" :src="key.icon" :key="key.icon"></image>
                        </view>
                    </view>
                    <!-- 用户评论 -->
                    <view class="comment_hot_content">
                        <view class="hot_content">{{item.content}}</view>
                        <view class="comment_hot_rank">
                            <text class="iconfont icondianzan">{{item.size}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 用户最热评论 结束 -->
        <!-- 用户最新评论 开始 -->
        <view class="comment_hot_wrap"  v-if="comment.length">
            <!-- 评论区标题 -->
            <view class="comment_hot_title">
                <text class="iconfont iconpinglun"></text>
                <text>最新评论</text>
            </view>
            <!-- 评论区内容 -->
            <view class="comment_hot_list">
                <view class="comment_hot_item"
                      v-for="item in comment"
                      :key="item.id"
                >
                    <!-- 用户信息 -->
                    <view class="comment_user_desc">
                        <view class="comment_user_avatar">
                            <image :src="item.user.avatar"></image>
                        </view>
                        <view class="comment_name_desc">
                            <view class="comment_name_info">
                                <view class="user_name">{{item.user.name}}</view>
                                <view class="user_time">{{item.cntime}}</view>
                            </view>
                        </view>
                        <!-- 用户徽章 -->
                        <view class="comment_user_badge">
                            <image v-for="key in item.user.title" :src="key.icon" :key="key.icon"></image>
                        </view>
                    </view>
                    <!-- 用户评论 -->
                    <view class="comment_hot_content">
                        <view class="hot_content">{{item.content}}</view>
                        <view class="comment_hot_rank">
                            <text class="iconfont icondianzan">{{item.size}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 用户最新评论 结束 -->
        <!-- 下载按钮 开始 -->
        <view class="download_img_wrap">
            <view class="download_btn" @click="handleOnLoadImg">下载图片</view>
        </view>
        <!-- 下载按钮 结束 -->
    </view>
</template>

<script>
    import moment from "moment"
    import swiperAction from "../components/swiperAction";
    // 设置为中文
    moment.locale("zh-cn")
    export default {
        components: {
            swiperAction
        },
        data () {
            return {
                imgDetailData: {},
                album: [],
                hot: [],
                comment: [],
                imgIndex: -1
            }
        },
        onLoad () {
            let { index } = getApp().globalData
            this.imgIndex = index
            // 获取数据
            this.getData()
        },
        methods: {
            getData: function () {
                let { list } = getApp().globalData
                this.imgDetailData = list[this.imgIndex]
                this.imgDetailData.cntime = moment(this.imgDetailData.atime * 1000).fromNow()
                // 获取评论数据
                this.getComments(this.imgDetailData.id)
            },
            getComments: function (id) {
                this.request({
                    url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
                })
                .then(result => {
                    this.album = result.res.album
                    this.hot = result.res.hot
                    this.comment = result.res.comment
                    // 给hot中添加新的时间格式的数据 (xxx年前, xxx月前)
                    this.hot.forEach(v =>v.cntime =  moment(v.atime * 1000).fromNow())
                    // 给comment中添加新的时间格式的数据 (xxx年前, xxx月前)
                    this.comment.forEach(v =>v.cntime =  moment(v.atime * 1000).fromNow())
                })
                .catch(err => {
                    uni.showToast({
                        title: err,
                        icon: "none"
                    })
                })
            },
            handleSwiperAction: function (options) {
                const { direction } = options
                const { list } = getApp().globalData
                /*
                * 左滑: imgIndex++
                * 右滑: imgIndex--
                * 数组的边界控制
                * 左滑: direction === "left" && imgIndex <= list.length - 1
                * 右滑: direction === "right" && imgIndex > 0
                * */
                if (direction === "left" && this.imgIndex < list.length - 1) {
                    this.imgIndex++
                    this.getData()

                } else if (direction === "right" && this.imgIndex > 0) {
                    this.imgIndex--
                    this.getData()
                } else {
                    uni.showToast({
                        title: "没有更多了",
                        icon: "none"
                    })
                }
            },
            handleOnLoadImg: async function () {
                /*
                * 1. 先将远程文件下载到小程序的内部虚拟存储空间中
                * 2. 再将虚拟空间中的图片下载到手机本地中
                * */
                // 提示信息
                await uni.showLoading({title: "下载中"})
                // 将远程文件下载到小程序的内部虚拟存储空间中
                const result1 = await uni.downloadFile({url: this.imgDetailData.img})
                const  { tempFilePath } = result1[1]
                // 将虚拟空间中的图片下载到手机本地中
                const imgPath = await uni.saveImageToPhotosAlbum({filePath: tempFilePath})
                // 下载成功, loading提示消失, 成功信息提示
                uni.hideLoading()
                await uni.showToast({title: "下载成功"})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .img_user_wrap {
        display: flex;
        padding: 20rpx;
        image {
            width: 88rpx;
            border-radius: 50%;
        }
        .img_user_desc {
            padding: 0 20rpx;
            .img_user_name {
                font-size: 32rpx;
                font-weight: bold;
                color: #000;
            }
            .img_user_time {
                font-size: 24rpx;
                color: #ccc;
                padding: 10rpx 0;
            }
        }
    }
    .img_rank_wrap {
        display: flex;
        height: 70rpx;
        text-align: center;
        align-items: center;
        border-bottom: 2rpx solid #eee;
        .img_rank {
            flex: 1;
        }
        .img_collection {
            flex: 1;
        }
    }
    .img_album_wrap {
        padding: 20rpx;
        .img_album_title {
            padding: 10rpx 0;
            text {
                color: #000;
            }
        }
        .img_album_list {
            .img_album_item {
                display: flex;
                border-bottom: 2rpx solid #eee;
                margin-bottom: 10rpx;
                .img_album_cover {
                    flex: 1;
                    image {
                        width: 180rpx;
                        height: 180rpx;
                    }
                }
                .img_album_info {
                    position: relative;
                    flex: 3;
                    padding-left: 20rpx;
                    .img_album_flag {
                        display: flex;
                        text-align: center;
                        align-items: center;
                        text {
                            padding: 0 20rpx;
                            background-color: $color;
                            color: #ffffff;
                        }
                    }
                    .img_album_name {
                        padding: 10rpx 0;
                        color: #888;
                    }
                    .iconiconfontjiantou4 {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        right: 10%;
                        font-size: 30rpx;
                    }
                }
            }
        }
    }
    .comment_hot_wrap {
        .comment_hot_title {
            padding: 0 20rpx 20rpx 20rpx;
            display: flex;
            .iconhot1 {
                color: red;
                font-size: 38rpx;
            }
            text {
                padding-left: 10rpx;
            }
        }
        .comment_hot_list {
            .comment_hot_item {
                border-bottom: 2rpx solid #ccc;
                .comment_user_desc {
                    display: flex;
                    padding: 10rpx;
                    .comment_user_avatar {
                        width: 13%;
                        image {
                            width: 80rpx;
                            height: 80rpx;
                        }
                    }
                    .comment_name_desc {
                        flex: 1;
                        .user_name {

                        }
                        .user_time {

                        }
                    }
                    .comment_user_badge {
                        display: flex;
                        image {
                            width: 40rpx;
                            height: 40rpx;
                            margin-right: 5rpx;
                        }
                    }
                }
                .comment_hot_content {
                    display: flex;
                    padding: 15rpx 10rpx 30rpx 13%;
                    .hot_content {
                        flex: 2;
                        padding-left: 10rpx;
                        color: #000;
                    }
                    .comment_hot_rank {
                        flex: 1;
                        text-align: right;
                    }
                }
            }
        }
    }
    /* 用户最新评论 */
    .comment_hot_wrap {
        .iconpinglun {
            font-size: 38rpx;
            color: aqua !important;
        }
    }
    .download_img_wrap {
        height: 120rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        .download_btn {
            width: 80%;
            height: 80%;
            background-color: $color;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 32rpx;
            color: #fff;
            font-weight: 600;
            border-radius: 50rpx;
        }
    }
</style>