export default (params) => {
    // 显示loading图标
    wx.showLoading({
        title: "加载中"
    })
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            success: function (res) {
                // 成功情况下, 调用resolve
                resolve(res.data)
            },
            fail: function (err) {
                // 失败情况下, 调用reject
                reject(err)
            },
            complete: function () {
                // 无论成功还是失败, 都会执行
                // 隐藏loading图标
                wx.hideLoading()
            }
        })
    })
}