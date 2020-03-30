<template>
    <div id="search">
        <van-search
        class="search-ipt"
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @input="onInput"
        @search="onSearch"
        >
        <div slot="action" @click="onSearch">搜索</div>
        </van-search>
<!--        <div class="search-panel">-->
<!--          <ul>-->
<!--            <li v-for="(item, index) in keyword" :key="index">-->
<!--              <a href="javascript:" :id="item.id">{{item.name}}</a>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->
    </div>
</template>

<script>
  import $ from "jquery"
  import * as type from "views/home/store/actionsType"
  import {mapGetters} from "vuex"

  export default {
      name: "Search",
      data () {
          return {
            value: ""
          }
      },
      methods: {
        onInput () {
          const keyword = this.value;
          if (keyword) {
            // $(".search-panel").slideToggle();
            // 派发action, 发送搜索请求, 获取搜索关键字商品数据
            // this.$store.dispatch(type.GET_SEARCH, {keyword})

            this.$emit("showSearchPanel", keyword)
          } else {
            // $(".search-panel").slideToggle();
            this.$emit("hideSearchPanel")
          }
        },
        onSearch () {
            return
        }
      },
      computed: { // 计算属性, 将store中的数据映射过来
        ...mapGetters([
          "keywordData"
        ])
      }
  }
</script>

<style scoped>

</style>
