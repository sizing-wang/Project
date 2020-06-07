<template>
    <view class="videoPlay_wrap">
        <!-- 虚幻背景 开始 -->
        <image class="filter_image_bg" :src="video.img"></image>
        <!-- 虚幻背景 结束 -->
        <!-- 顶部工具栏 开始 -->
        <view class="video_top_tool">
            <view @click="handleMuted" :class="['iconfont', muted ? 'iconjingyin' : 'iconshengyin']"></view>
            <view class="iconfont iconzhuanfa">
                <button open-type="share" class="shareBtn"></button>
            </view>

        </view>
        <!-- 顶部工具栏 结束 -->
        <!-- 视频播放 开始 -->
        <view class="video_play_wrap">
            <video :muted="muted" :src="video.video" object-fit="fill"></video>
        </view>
        <!-- 视频播放 结束 -->
        <!-- 下载按钮 开始" -->
        <view class="downLoad_wrap">
            <view class="download_btn" @click="handleDownLoad">
                下载高清
            </view>
        </view>
        <!-- 下载按钮 结束 -->
    </view>
</template>

<script>
    export default {
        data () {
            return {
                video: {},
                muted: false
            }
        },
        onLoad () {
            this.video = getApp().globalData.videoPlay;
            console.log(this.video);
        },
        methods: {
            handleMuted: function () {
                this.muted = !this.muted
            },
            handleDownLoad: async function () {
                /*
                * 下载视频, 分为两步
                * 1. 先将远程文件存储到小程序的内部虚拟内存中,
                * 2. 再将虚拟内存中的视频下载到手机本地
                * */
                await uni.showLoading({title: "下载中"})
                const {tempFilePath} = (await uni.downloadFile({url: this.video.video}))[1]
                await uni.saveVideoToPhotosAlbum({
                    filePath: tempFilePath
                })
                uni.showToast({title: "下载成功"})


            }
        }
    }
</script>

<style lang="scss" scoped>
    .videoPlay_wrap {
        position: relative;
        .filter_image_bg {
            width: 100%;
            height: 100vh;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            z-index: -1;
            filter: blur(15px); // 滤镜, 模糊
        }
        .video_top_tool {
            height: 80rpx;
            display: flex;
            justify-content: flex-end;
            .iconfont {
                position: relative;
                width: 80rpx;
                border-radius: 50%;
                background-color: rgba(0,0,0,0.2);
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                font-size: 38rpx;
                margin-right: 20rpx;
                .shareBtn {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    opacity: 0;
                }
            }
        }
        .video_play_wrap {
            display: flex;
            justify-content: center;
            video {
                width: 360rpx;
                height: 600rpx;

            }
        }
        .downLoad_wrap {
            display: flex;
            justify-content: center;
            margin-top: 40rpx;
            .download_btn {
                width: 360rpx;
                height: 80rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 36rpx;
                color: #fff;
                background-color: rgba(0,0,0,0.5);
                border-radius: 40rpx;
                border: 2rpx solid #fff;
            }
        }
    }


</style>