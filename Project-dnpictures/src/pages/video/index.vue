<template>
	<view class="content">
		<view class="video_tab">
			<view class="video_tab_title">
				<view class="video_tab_inner">
					<uni-segmented-control
							:current="current"
							:values="items.map(item => item.title)"
							@clickItem="onClickItem"
							style-type="text"
							active-color="#d4237a">
					</uni-segmented-control>
				</view>
				<view class="iconfont iconsearch"></view>
			</view>
		</view>
		<view class="video_tab_content">
			<view v-if="current < 4">
				<video-main
						:url="items[current].url"
						:params="items[current].params">
				</video-main>
			</view>
			<view v-if="current === 4">
				<video-category></video-category>
			</view>
		</view>
	</view>
</template>

<script>
	import { uniSegmentedControl } from '@dcloudio/uni-ui'
	import videoMain from "./video-main/index"
	import videoCategory from "./video-category/index"
	export default {
		components: { // 注册组件
			uniSegmentedControl,
			videoMain,
			videoCategory
		},
		data() {
			return {
				items: [
					{
						title: "推荐",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/featured",
						params: {limit: 30, skip: 0, order: "hot"}
					},
					{
						title: "最新",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
						params: {limit: 30, skip: 0, order: "new"}
					},
					{
						title: "娱乐",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",
						params: {limit: 30, skip: 0, order: "new"}
					},
					{
						title: "热门",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
						params: {limit: 30, skip: 0, order: "hot"}
					},
					{
						title: "分类",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/category",
						params: {}
					}
				],
				current: 0
			}
		},
		onLoad() {

		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video_tab {
		.video_tab_title {
			position: relative;
			.video_tab_inner {
				width: 60%;
				margin: 0 auto; // 块级元素水平居中
			}
			.iconsearch {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 5%;
			}
		}
	}
</style>
