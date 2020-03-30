<template>
  <div class="category">
      <div class="class">
      <!-- 顶部导航栏 -->
      <nav-bar :title="title" />
      <!-- 滚动组件 -->
      <scroll class="scroll" ref="scroll" @scrollPosition="isShowBackScroll" >
        <div class="main">
        <div class="wrapper" ref="wrapper">
          <ul class="content">
            <!-- 分类列表 -->
            <li v-for="(item,index) in floors"
                :key="index"
                @click="listClick(index)"
                :class="index===active?'active':''">
                {{item.title}}
            </li>
          </ul>
        </div>
        <div class="detialList_box">
          <!-- 分类详情列表 -->
          <ul class="detialList clearfix"
              v-for="(item,index) in floors"
              v-show="index===active"
              :key="index">
            <li v-for="(product,index) in item.products"
                :key="index"
                :id="product._id"
                @click="goDetail($event)"
            >
              <img :src="product.mainImage" alt="">
              <div class="product-detail-box">
                <p class="product-name">{{product.name}}</p>
                <p class="product-price">{{product.price | priceFormt}}</p>
                <p class="product-payNums">{{product.payNums}} 人已购买</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      </scroll>
      </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import Scroll from "../../components/common/scroll/Scroll";
  import * as type from "./store/actionsType"
  import { mapGetters } from "vuex"

  export default {
    name: "Category",
    components: { // 注册组件
      NavBar,
      Scroll
    },
    data() {
      return {
        title: "商品分类",
        active:0,
        detialtext:'图书文娱'
      };
    },
    methods: {
      listClick(index){ // 显示隐藏分类详情
        this.active= index;
        this.detialtext= index;
      },
      isShowBackScroll() {
        return
      },
      goDetail(e) {
        const productId = e.currentTarget.id;
        this.$router.push("/detail/" + productId)
      }
    },
    created() {
      // 派发action, 获取商品分类数据
      this.$store.dispatch(type.GET_FLOORS);
    },
    mounted() {

    },
    computed: {
      ...mapGetters([
        "floors"
      ])
    }
  };
</script>

<style lang="scss" scoped>

  .class {
    .scroll {
      position: absolute;
      top: 54px;
      bottom: 50px;
      left: 0;
      right: 0;
      overflow: hidden;
    }
    height: 100%;
    .main {
      display: flex;
      height: 100%;
      .wrapper {
        overflow: hidden;
        width: 100px;
        height: 100%;
        background-color: #efeff4;
        .content {
          li {
            height: 60px;
            width: 100px;
            line-height: 60px;
            padding-left: 10px;
            font-size: 18px;
            text-align: center;
            background-color: #efeff4;
          }
          .active {
            background-color: #fff;
            border-left: 2px solid #ff0000;
          }
        }
      }
      .detialList_box {
        flex: 1;
        overflow: hidden;
        margin: 0 8px;
        background-color: #fff;
        .detialList {
          padding-bottom: 20px;
          li {
            float: left;
            position: relative;
            width: 100%;
            height: 100px;
            margin-bottom: 10px;
            img {
              position: absolute;
              top: 50%;
              margin-top: -50px;
              width: 100px;
              height: auto;
            }
            .product-detail-box {
              padding-left: 5px;
              position: absolute;
              right: 0;
              top: 50%;
              margin-top: -50px;
              width: 160px;
              height: 100px;
              .product-name {
                width: 100%;
                height: 30px;
                line-height: 30px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
              .product-price {
                display: flex;
                width: 100%;
                height: 40px;
                line-height: 40px;
                color: var(--color-tint);
                font-size: 22px;
              }
              .product-payNums {
                width: 100%;
                height: 30px;
                text-align: left;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
</style>
