// store 的计算属性
export default {
    keywordData (state) {
      if (state.keywordData.length > 0) {
         return state.keywordData
      }
    },
    homeAds (state) {
      if (state.ads.length > 0) {
         return state.ads
      }
    },
    categories (state) {
      if (state.categories.length > 0) {
        return state.categories
      }
    },
    homeHot (state) {
      if (state.hot.length > 0) {
        return state.hot
      }
    },
    floors (state) {
      if (state.floors.length > 0) {
         return state.floors
      }
    },
    productSku (state) {
        return state.productSku
    }
}
