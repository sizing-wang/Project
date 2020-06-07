let { getMovieList } = require("../../utils/util")
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let { baseUrl } = app.globalData
    let inTheatersUrl = baseUrl + '/in_theaters?star=0&count=3'
    let comingSoonUrl = baseUrl + '/coming_soon?star=0&count=3'
    let top250Url = baseUrl + '/top250?star=0&count=3'
    /*
    wx.request({
      url: 'http://t.yushu.im/v2/movie/in_theaters?star=0&count=3',
      success: function(res) {
        var data = res.data.subjects.map(item => {
          return {
            coverImg: item.images.large,
            title: item.original_title,
            score: item.rating.average,
            stars: item.rating.stars
          }
        })
        console.log(data);
        data[0].coverImg = 'https://ae01.alicdn.com/kf/Hbe7cf86405f14fa79a3343fa9e934540o.jpg'
        _this.setData({data: data})
      }
    })
    */
    // 获取正在热映电影数据
    getMovieList(inTheatersUrl, function(data) {
      data[0].coverImg = 'https://ae01.alicdn.com/kf/Hbe7cf86405f14fa79a3343fa9e934540o.jpg'
      _this.setData({inTheatersMovie: data})
    })
    // 获取即将上映电影数据
    getMovieList(comingSoonUrl, function(data) {
      data[0].coverImg = 'https://ae01.alicdn.com/kf/Hbe7cf86405f14fa79a3343fa9e934540o.jpg'
      _this.setData({comingSoonMovie: data})
    })
    // 获取豆瓣top250电影数据
    getMovieList(top250Url, function(data) {
      data[1].coverImg = 'https://ae01.alicdn.com/kf/H963c891fb27a4ae3a3f1395be9a0883dc.jpg'
      _this.setData({top250Movie: data})
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 处理点击更多
   */
  tapMore(e) {
    // console.log(e);
    const { type } = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/movie/movie-more/movie-more?type=' + type,
    })
    
  }
})