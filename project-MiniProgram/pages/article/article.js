let { articles } = require("../../data/db")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*
    articles: [
      {
        avatar: '/images/avatar/u1.jpeg',
        date: '2020-02-23',
        title: '最美的西湖',
        img: '/images/article/a1.jpg',
        desc: '一起来踏春吧 !',
        star: '20',
        view: '6788'
      },
      {
        avatar: '/images/avatar/u2.jpeg',
        date: '2020-02-23',
        title: '器宇非凡的飞鸟',
        img: '/images/article/a2.jpg',
        desc: '它想变成凤凰 !',
        star: '50',
        view: '7699'
      }
    ]
    */
    articles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({articles: articles})
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
   * 处理文章item的路由跳转
   */
  handleItemTap(e) {
    const articleId = e.currentTarget.dataset.articleId;
    wx.navigateTo({
      url: '/pages/article/article-detail/article-detail?articleId=' + articleId,
    })
    
  }
})