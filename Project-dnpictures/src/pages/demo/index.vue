<template>
    <view @touchstart="handleTouchStart" @touchend="handleTouchEnd"></view>
</template>

<script>
    /*
    * 手势滑动:
    * 1. 先给容器添加两个滑动事件: touchstart(手指按下) 和 touchend(手指离开)
    * 2. 在touchstart中做一些事
    *   2.1: 获取当前手指按下的时间
    *   2.2: 获取当前手指按下的坐标系
    * 3. 在touchend中做一些事
    *   3.1: 获取当前手指离开的时间
    *   3.2: 获取当前手指离开的坐标系
    * */
    export default {
        data () {
            return {
                // 开始按下时间
                startTime: 0,
                // 开始按下的X 轴的位置
                startX: 0,
                // 开始按下的Y 轴的位置
                startY: 0
            }
        },
        methods: {
            handleTouchStart: function (event) {
                this.startTime = Date.now()
                this.startX = event.changedTouches[0].clientX
                this.startY = event.changedTouches[0].clientY

            },
            handleTouchEnd: function (event) {
                const endTime = Date.now()
                const endX = event.changedTouches[0].clientX
                const endY = event.changedTouches[0].clientY
                // 判断用户滑动时长的合法性
                if (endTime - this.startTime > 2000) return
                // 滑动的方向
                let direction = ""
                // 判断用户滑动的距离是否合法, 合法则判断滑动的方向; 注意: 判断距离时, 要用绝对值
                if (Math.abs(endX - this.startX) > 10) {
                    // 判断用户滑动的方向
                    direction = endX - this.startX > 0 ? "right" : "left"
                    console.log(direction)
                } else {
                    return;
                }
            }
        }
    }
</script>

<style scoped>
    view {
        width: 100%;
        height: 500rpx;
        background: deepskyblue;
    }
</style>