<template>
	<view class="content">
		<view class="home_tab">
			<view class="home_tab_title">
				<view class="home_tab_inner">
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
		<view class="home_tab_content">
			<view v-if="current === 0">
				<home-recommend></home-recommend>
			</view>
			<view v-if="current === 1">
				<home-category></home-category>
			</view>
			<view v-if="current === 2">
				<home-new></home-new>
			</view>
			<view v-if="current === 3">
				<home-album></home-album>
			</view>
		</view>
	</view>
</template>

<script>
	import homeRecommend from "./home-recommend/home-recommend"
	import homeCategory from "./home-category/home-category"
	import homeNew from "./home-new/home-new"
	import homeAlbum from "./home-album/home-album"
	import { uniSegmentedControl } from '@dcloudio/uni-ui'
	export default {
		components: { // 注册组件
			homeRecommend,
			homeCategory,
			homeNew,
			homeAlbum,
			uniSegmentedControl
		},
		data() {
			return {
				items: [
					{title: "推荐"},
					{title: "分类"},
					{title: "最新"},
					{title: "专辑"}
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
	.home_tab {
		.home_tab_title {
			position: relative;
			.home_tab_inner {
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
