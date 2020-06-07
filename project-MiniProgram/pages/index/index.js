//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  onLoad: function () {
    
  },
  // 开启之旅按钮的点击事件处理
  tapMotto() {
    // 跳转路由
    /*
    // 保留当前页面, 跳转之后的页面中, 可以回退到保留的页面中
    wx.navigateTo({
      url: '/pages/article/article',
    })
    */
   /*
   // 不保留当前页面, 跳转之后的页面中, 不可以回退到保留的页面中
   wx.redirectTo({
     url: '/pages/article/article',
   })
   */
  wx.switchTab({
    url: '/pages/article/article',
  })
  }
})
