<template>
    <view class="content">
        <view class="category_tab">
            <view class="category_tab_title">
                <view class="category_tab_inner">
                    <uni-segmented-control
                            :current="current"
                            :values="items.map(item => item.title)"
                            @clickItem="onClickItem"
                            style-type="text"
                            active-color="#d4237a"
                    >
                    </uni-segmented-control>
                </view>
            </view>
        </view>
        <!-- 如果想让 scroll-view标签变成伸缩盒子, 必须要在此标签上添加 enable-flex属性, 才能生效 -->
        <scroll-view
                @scrolltolower="handleScrollToLower"
                enable-flex
                scroll-y
                class="category_tab_content">
            <view
                    class="category_img_item"
                    v-for="(item, index) in vertical"
                    :key="item.id">
                <go-detail :list="vertical" :index="index">
                    <image mode="widthFix" :src="item.thumb"></image>
                </go-detail>
            </view>
        </scroll-view>
    </view>
</template>

<script>
    import { uniSegmentedControl } from '@dcloudio/uni-ui'
    import goDetail from "../components/goDetail";
    import GoDetail from "../components/goDetail";
    export default {
        components: {
            GoDetail,
            uniSegmentedControl
        },
        data() {
            return {
                items: [
                    {title: "最新", order: "new"},
                    {title: "热门", order: "hot"}
                ],
                current: 0,
                params: {
                    limit: 30,
                    skip: 0,
                    order: "new"
                },
                id: "",
                vertical: [],
                hasMore: true
            }
        },
        onLoad (options) {
            this.id = options.id
            this.getList()
        },
        methods: {
            onClickItem(e) {
                if (this.current !== e.currentIndex) {
                    this.current = e.currentIndex;
                } else {
                    // 点击的当前的tab的选项, 就不在重新获取数据了
                    return
                }
                this.params.order = this.items[this.current].order
                this.params.skip = 0 // 切换tab选项时, 将skip的值改为0,获取正确数据
                this.vertical = [] // 切换tab选项时, 将vertical的值重置,获取正确数据
                this.getList()
            },
            getList: function () {
                this.request({
                    url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
                    data: this.params
                })
                .then(result => {
                    if (result.res.vertical.length === 0) { // 没有下一页数据了
                        this.hasMore = false
                        return
                    }
                    console.log(result);
                    this.vertical = [...this.vertical, ...result.res.vertical]
                })
                .catch(err => {
                    uni.showToast({title: err, icon: "none"})
                })
            },
            handleScrollToLower: function () {
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
    .category_tab {
        .category_tab_title {
            position: relative;
            .category_tab_inner {
                width: 60%;
                margin: 0 auto; // 块级元素水平居中
            }
        }
    }
    /* 更改组件的默认样式 */
    /deep/ .segmented-control__item--text.data-v-071a40dc {

    }
    .category_tab_content {
        display: flex;
        flex-wrap: wrap;
        height: calc(100vh - 36px);
        .category_img_item {
            width: 33.33%;
            border: 5rpx solid #fff;
            image {

            }
        }
    }
</style>