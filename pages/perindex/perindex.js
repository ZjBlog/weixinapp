//获取应用实例
var app = getApp()
Page({
  data: {
    img: []
  },
  onLoad: function () {
    console.log('onLoad')
    this.setData({
      img: app.globalData.img
    })
  }
})
