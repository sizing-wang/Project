<template>
  <div id="home">
    <!-- 搜索框 -->
    <Search
      @showSearchPanel="showSearchPanel"
      @hideSearchPanel="hideSearchPanel"
    ></Search>
    <!-- 可控选项卡 -->
    <tab-ctrl
      class="tab-ctrl1"
      ref="tabCtrl1"
      v-show="isShowTabCtrl"
      :titles="['首页', '全部', '热卖']"
      @tabClick="tabClick"
      @hideHotFloor="hideHotFloor"
      @hideFloors="hideFloors"
    />
    <!-- 滚动组件 -->
    <scroll class="content" ref="scroll" @scrollPosition="isShowBackScroll">
      <!-- 搜索面板 -->
      <div class="search-panel">
        <ul>
          <li v-for="(item, index) in keywordData" :key="index">
            <a href="javascript:" :id="item._id" @click="goDetail($event)">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <!-- 轮播图 -->
      <home-swiper
        :list="homeAds"
        @swiperImageLoad="getScrollOffsetTop" />
      <!-- 商品分类导航 -->
      <home-category />
      <!-- 可控选项卡 -->
      <tab-ctrl
        class="tab-ctrl2"
        ref="tabCtrl2"
        :titles="['首页', '全部', '热卖']"
        @tabClick="tabClick"
        @hideHotFloor="hideHotFloor"
        @hideFloors="hideFloors"
      />
      <!-- 今日热卖 -->
      <home-hot v-if="hotFlag" @showSku="isShowHotSku"/>
      <!-- 楼层商品 -->
      <floors v-if="floorsFlag" @showSku="isShowFloorSku" />
    </scroll>
    <!-- 返回顶部按钮 -->
    <back-top @click.native="backClick" :probe-type="3" v-show="isShowScrollTop" />
    <!-- 商品规格面板 -->
    <sku :show="show" :productSku="this.productSku" />
  </div>
</template>

<script>
  import Search from "components/common/search/"
  import Scroll from "components/common/scroll/Scroll";
  import HomeSwiper from "./childComponents/HomeSwiper";
  import HomeCategory from "./childComponents/HomeCategory";
  import TabCtrl from "components/content/tabCtrl/TabCtrl";
  import HomeHot from "./childComponents/HomeHot";
  import Floors from "components/content/floors/Floors"
  import BackTop from "components/content/backTop/BackTop";
  import Sku from "components/common/sku/Sku"
  import * as type from "./store/actionsType"
  import $ from "jquery"
  import "swiper/css/swiper.min.css"
  import { mapGetters } from "vuex"

  export default {
    name: "Home",
    components: { // 注册组件
      Search,
      Scroll,
      HomeSwiper,
      HomeCategory,
      TabCtrl,
      HomeHot,
      Floors,
      BackTop,
      Sku
    },
    data() {
      return {
        hotFlag: true,
        floorsFlag: true,
        isShowScrollTop: false,
        show: false,
        offsetTop: 0,
        isOffsetTop: false,
        isShowTabCtrl: false,
        saveY: 0
      }
    },
    created() {
      // 派发actions, 获取首页轮播图数据
      this.$store.dispatch(type.GET_ADS)
    },
    computed: { // 计算属性
      // 使用对象展开运算符, 将getter 混入到 computed对象中
      ...mapGetters([
        "productSku",
        "keywordData",
        "homeAds"
      ])
    },
    destroyed() {
      console.log("home销毁");
    },
    // 保持原来的滚动位置
    // activated() { // 进入组件时执行
    //   this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0);
    //   this.$refs.scroll.scroll.refresh();
    // },
    // deactivated() { // 离开组件时执行
    //   this.saveY = this.$refs.scroll.getScrollY();
    // },
    methods: {
      goDetail(e) {
        const productId = e.currentTarget.id;
        this.$router.push("/detail/" + productId)
      },
      hideHotFloor() {
        this.hotFlag = false;
        this.floorsFlag = true
      },
      hideFloors() {
        this.floorsFlag = false;
        this.hotFlag = true
      },
      backClick() {
        this.$refs.scroll.backTop(0, 0, 500)
      },
      isShowBackScroll(position) {
        // 控制返回顶部按钮是否显示
        this.isShowScrollTop = (-position.y) > 1000 ? true : false

        // 控制tab-ctrl组件吸顶效果(顶层tab-ctrl组件是否显示)
        this.isShowTabCtrl = (-position.y) > this.offsetTop ? true : false
      },
      isShowHotSku(productId) {
        this.show = !this.show;
        // 派发actions, 获取当前商品的详情信息
        this.$store.dispatch(type.GET_PRODUCT_DETAIL, {productId});
      },
      isShowFloorSku(productId) {
        this.show = !this.show;
        // 派发actions, 获取当前商品详情信息数据
        this.$store.dispatch(type.GET_PRODUCT_DETAIL, {productId})
      },
      showSearchPanel(keyword) {
        $(".search-panel").slideToggle();
        // 派发action, 发送搜索请求, 获取搜索关键字商品数据
        this.$store.dispatch(type.GET_SEARCH, {keyword})
      },
      hideSearchPanel() {
        $(".search-panel").slideToggle();
      },
      getScrollOffsetTop() {
        if (!this.isOffsetTop) {
          this.offsetTop = this.$refs.tabCtrl2.$el.offsetTop;
          this.isOffsetTop = true
        }
      },
      tabClick(index) {
        this.$refs.tabCtrl1.currentIndex = index;
        this.$refs.tabCtrl2.currentIndex = index;
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .tab-ctrl1 {
    position: relative;
    margin-top: -1px;
    z-index: 99;
  }
  /*.tab-ctrl2 { !* 设置选项卡的吸顶效果 *!*/
  /*  position: sticky;*/
  /*  top: 0;*/
  /*}*/
  .content {
    position: absolute;
    top: 54px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .search-panel {
    display: none;
    padding: 10px;
    width: 100%;
    float: left;
  }
  .search-panel ul li {
    width: 100%;
    height: 30px;
    color: #666;
    line-height: 30px;
    margin-top: 5px;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .search-panel ul li:nth-child(1) {
    margin-top: 0;
  }

</style>
