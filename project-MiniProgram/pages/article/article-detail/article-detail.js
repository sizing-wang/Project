const {articles} = require("../../../data/db")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlaying: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { articleId } = options;
    let article = articles[articleId]
    // 处理是否收藏的判断
    let isCollection = false
    // 获取Storage中的收藏对象
    let article_collection = wx.getStorageSync('article_collection')
    // 判断storage中手否有存储的收藏对象
    if (article_collection) {
      // 如果storage中有收藏对象中的值, 就赋值给 isCollection
      isCollection = !!article_collection[articleId]
    } else {
      /**
       * 没有收藏对象, 初始化
       * 自定义格式: 
       * {
       *  '0': false,
       *  '1': true
       * }
       */
      let data = {}
      data[articleId] = false
      wx.setStorageSync('article_collection', data)
    }
    // 处理音乐播放状态的同步
    let backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.onPlay(() => {
      this.setData({ isPlaying: true })
    })
    backgroundAudioManager.onPause(() => {
      this.setData({ isPlaying: false })
    })

    this.setData({...article, isCollection})
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
   * 处理收藏按钮的点击事件
  */
 tapCollection() {
   // 设置Storage, 将数据存储在客户端本地中
   // wx.setStorageSync("key1", {name: 'jack'})
  // 获取客户端本地中存储的数据
  // const data = wx.getStorageSync("key1")
  // console.log(data);
  // 获取storage中的收藏对象
  let article_collection = wx.getStorageSync('article_collection')
  let currentCollection = !article_collection[this.data.articleId]
  article_collection[this.data.articleId] = currentCollection
  wx.setStorageSync('article_collection', article_collection)
  this.setData({
    isCollection: currentCollection
  }, () => {
    wx.showToast({
      title: currentCollection ? '收藏成功' : '取消成功',
    })
  })
 },
 /**
  * 处理分享
  */
 tapShare() {
  let itemList = ['分享到QQ', '分享到微信', '分享到微博']
  wx.showActionSheet({
    itemList: itemList,
    success (res) {
      wx.showToast({
        title: itemList[res.tapIndex] + '成功',
      })
    }
  })
 },
 /**
  * 处理背景音乐的播放
  */
 tapMusic() {
   let backgroundAudioManager = wx.getBackgroundAudioManager()
   if (this.data.isPlaying) { // 开始播放
    backgroundAudioManager.pause()
   } else { // 暂停播放
    backgroundAudioManager.src = this.data.music.src
    backgroundAudioManager.title = this.data.music.title
    backgroundAudioManager.coverImgUrl = this.data.music.coverImgUrl
   }
 }
})