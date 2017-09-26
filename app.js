//app.js
App({
  onLaunch: function (options) {
    console.info('进入小程序')
    console.info(options)
    // 测试时
    wx.clearStorage()
  },
  onShow: function (options) {
    // Do something when show.
    console.info('App show')
  },
  onHide: function () {
    // Do something when hide.
    console.info('App hide')
  },
  onError: function (msg) {
    console.log(msg)
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})
