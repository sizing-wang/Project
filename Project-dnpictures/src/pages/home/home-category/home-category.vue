<template>
    <view class="home_category_wrap">
        <view class="home_category_list">
            <navigator class="home_category_item"
                  v-for="item in category"
                  :key="item.id"
                  :url="`/pages/imgCategory/index?id=${item.id}`"
            >
                <image mode="aspectFill" :src="item.cover"></image>
                <view class="category_name">{{item.name}}</view>
            </navigator>
        </view>
    </view>
</template>

<script>
    export default {
        data () {
            return {
                category: []
            }
        },
        mounted() {
            wx.setNavigationBarTitle({
                title: '分类'
            })
            this.getList()
        },
        methods: {
           getList: function () {
                this.request({
                    url: "http://157.122.54.189:9088/image/v1/vertical/category"
                })
               .then(result => {
                   this.category = result.res.category
               })
               .catch(err => {
                   uni.showToast({title: err, icon: "none"})
               })
           }
        }
    }
</script>

<style lang="scss" scoped>
    .home_category_wrap {
        .home_category_list {
            display: flex;
            flex-wrap: wrap;
            .home_category_item {
                position: relative;
                width: 33.33%;
                border: 5rpx solid #fff;
                image {
                    height: 240rpx;
                }
                .category_name {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 50rpx;
                    display: flex;
                    align-items: center;
                    padding-left: 20rpx;
                    font-size: 32rpx;
                    color: #fff;
                    background-image: linear-gradient(to right top, rgba(0,0,0,0.2), rgba(0,0,0,0));
                }
            }
        }
    }

</style>