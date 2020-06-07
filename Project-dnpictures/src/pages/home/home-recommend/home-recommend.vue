<template>
    <scroll-view @scrolltolower="handleTolower" class="scroll_view" scroll-y>
        <!-- 推荐 开始 -->
        <view class="home_reCommend_wrap">
            <navigator class="home_reCommend_item"
                  v-for="item in commend"
                  :key="item.id"
                  :url="`/pages/album/index?id=${item.target}`"
            >
                <image mode="widthFix" :src="item.thumb"></image>
            </navigator>
        </view>
        <!-- 推荐 结束 -->
        <!-- 月份 开始 -->
        <view class="months_wrap">
            <view class="months_title">
                <view class="months_info">
                    <view class="months_dateText">
                        <text> {{months.dd}} </text> / {{months.mm}} 月
                    </view>
                    <view class="months_text">{{months.title}}</view>
                </view>
                <view class="months_more">更多 > </view>
            </view>
            <view class="months_content">
                <view class="months_item"
                      v-for="(item, index) in months.items"
                      :key="item.id"
                >
                    <go-detail :list="months.items" :index="index">
                        <image mode="aspectFill" :src="item.thumb + item.rule.replace('$<Height>', 360)"></image>
                    </go-detail>
                </view>
            </view>
        </view>
        <!-- 月份 结束 -->
        <!-- 热门 开始 -->
        <view class="hots_wrap">
            <view class="hots_title">
                <text>热门</text>
            </view>
            <view class="hots_content">
                <view class="hots_item"
                      v-for="(item, index) in hots"
                      :key="item.id"
                >
                    <go-detail :list="hots" :index="index">
                        <image mode="widthFix" :src="item.thumb"></image>
                    </go-detail>
                </view>
            </view>
        </view>
        <!-- 热门 结束 -->
    </scroll-view>
</template>

<script>
    import moment from "moment"
    import goDetail from "../../components/goDetail";
    export default {
        components: { // 注册组件
            goDetail
        },
        data() {
          return {
              // 推荐
              commend: [],
              // 月份
              months: {
                  mm: '',
                  dd: ''
              },
              // 热门
              hots: [],
              params: {
                  // 指定每次请求获取多少条数据
                  limit: 30,
                  // 指定每次请求获取数据的关键字
                  order: "hot",
                  // 指定每次请求跳过多少条数据
                  skip: 0
              },
              hasMore: true
          }
        },
        mounted() {
            wx.setNavigationBarTitle({
                title: '推荐'
            })
            this.getList()
        },
        methods: {
            getList: function () {
                this.request({
                    url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
                    data: this.params
                })
                    .then(result => {
                        // 判断还有没有下一页数据
                        if (result.res.vertical.length == 0) {
                            this.hasMore = false
                            uni.showToast({
                                title: "没有更多了",
                                icon: "none"
                            })
                            return
                        }
                        if (this.commend.length == 0) { // 第一次请求
                            this.commend = result.res.homepage[1].items
                            this.months = result.res.homepage[2]
                            this.months.mm = moment(this.months.stime).format("MM")
                            this.months.dd = moment(this.months.stime).format("DD")
                        }
                        // 数据的叠加, es6的数据拼接
                        this.hots = [...this.hots, ...result.res.vertical]
                    })
                    .catch(err => {
                        wx.showToast({title: err})
                    })
            },
            handleTolower: function () {
                if (this.hasMore) {
                    // 修改请求参数 skip
                    this.params.skip += this.params.limit
                    // 开始请求, 获取数据
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
    .scroll_view {
        height: calc(100vh - 36px);
    }
    .home_reCommend_wrap {
        display: flex;
        flex-wrap: wrap;
        .home_reCommend_item {
            width: 50%;
            border: 5rpx solid #fff;
        }
    }
    .months_wrap {
        .months_title {
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            padding: 20rpx;
            .months_info {
                display: flex;
                font-weight: bold;
                .months_dateText {
                    color: $color;
                    text {
                        font-size: 36rpx;
                    }
                }
                .months_text {
                    font-size: 30rpx;
                    margin-top: 6rpx;
                    margin-left: 20rpx;
                    color: #666666;
                }
            }
            .months_more {
                font-size: 24rpx;
                color: $color;
                margin-top: 12rpx;
            }
        }
        .months_content {
            display: flex;
            flex-wrap: wrap;
            .months_item {
                width: 33.33%;
                border: 5rpx solid #fff;
            }
        }
    }
    .hots_wrap {
        .hots_title {
            padding: 20rpx;
            text {
                font-size: 34rpx;
                font-weight: bold;
                padding-left: 20rpx;
                border-left: 20rpx solid $color;
            }
        }
        .hots_content {
            display: flex;
            flex-wrap: wrap;
            .hots_item {
                width: 33.33%;
                border: 5rpx solid #fff;
            }
        }
    }
</style>