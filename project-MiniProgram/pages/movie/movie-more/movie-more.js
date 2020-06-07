let { getMovieList } = require("../../../utils/util")
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestUrl: '',
    type: '',
    totalCount: 0,
    totalData: []
  },
  /**
   * 处理设置movies数据
   */
  setMoviesData: function (data) {
    console.log("------------",data.length);
    
    if (data.length == 0) {
      console.log("123");
      
      wx.showToast({
        title: '没有更多了'
      })
    }
      this.data.totalCount = this.data.totalCount + data.length
    
    if (this.data.type == 'inTheaters') {
      data[0].coverImg = 'https://ae01.alicdn.com/kf/Hbe7cf86405f14fa79a3343fa9e934540o.jpg'
    } else if (this.data.type == 'comingSoon') {
      data[0].coverImg = 'https://ae01.alicdn.com/kf/Hbe7cf86405f14fa79a3343fa9e934540o.jpg'
    } else if (this.data.type == 'top250') {
      data[1].coverImg = 'https://ae01.alicdn.com/kf/H963c891fb27a4ae3a3f1395be9a0883dc.jpg'
    }
    this.data.totalData = this.data.totalData.concat(data)
    this.setData({
      movies: this.data.totalData
    }, function () {
      // 隐藏loading 提示框
      wx.hideLoading({
        complete: (res) => {},
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    const { type } = options
    const { baseUrl } = app.globalData
    let requestUrl = ""
    let navigationBarTitle = ''
    switch (type) {
      case 'inTheaters' :
        requestUrl = baseUrl + "/in_theaters"
        navigationBarTitle = '正在热映'
        _this.data.type = type
        break
      case 'comingSoon' :
        requestUrl = baseUrl + "/coming_soon"
        navigationBarTitle = '即将上映'
        _this.data.type = type
        break
      case 'top250' :
        requestUrl = baseUrl + "/top250"
        navigationBarTitle = '豆瓣top250'
        _this.data.type = type
        break
    }
    // 保存当前的请求地址
    this.data.requestUrl = requestUrl
    wx.setNavigationBarTitle({
      title: navigationBarTitle
    })
    // 显示loading 提示框
    wx.showLoading({
      title: '加载中 ... '
    })
    /*
    getMovieList(requestUrl, function(data) {
      if (type == 'inTheaters') {
        data[0].coverImg = 'https://ae01.alicdn.com/kf/Hbe7cf86405f14fa79a3343fa9e934540o.jpg'
      } else if (type == 'comingSoon') {
        data[0].coverImg = 'https://ae01.alicdn.com/kf/Hbe7cf86405f14fa79a3343fa9e934540o.jpg'
      } else if (type == 'top250') {
        data[1].coverImg = 'https://ae01.alicdn.com/kf/H963c891fb27a4ae3a3f1395be9a0883dc.jpg'
      }
      _this.setData({
        movies: data
      }, function () {
        // 隐藏loading 提示框
        wx.hideLoading({
          complete: (res) => {},
        })
      })
    })
    */
   getMovieList(requestUrl, this.setMoviesData)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 显示loading 提示框
    wx.showLoading({
      title: '加载中 ... '
    })
    // 发送请求, 获取相对应数据 (刷新)
    /*
    getMovieList(this.data.requestUrl, function (data) {
      _this.setData({movies: data}, function(params) {
        // 隐藏loading 提示框
        wx.hideLoading({
          complete: (res) => {},
        })
      })
    })
    */
   getMovieList(this.data.requestUrl, this.setMoviesData)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let nextUrl = this.data.requestUrl + `?star=${this.data.totalCount}&count=20`
    wx.showLoading({
      title: '加载中 ... '
    })
    getMovieList(nextUrl, this.setMoviesData)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})