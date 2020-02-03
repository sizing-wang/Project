// store 的计算属性
export default {
    homeAds (state) {
        if (state.ads.length > 0) {
            return state.ads
        }
    },
    homeFloors (state) {
        if (state.floors.length > 0) {
            return state.floors
        }
    }
}