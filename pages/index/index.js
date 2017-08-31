//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    primarySize: 'default',
    plain: false,
    loading: false,
    lat: 0,
    lng: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onPullDownRefresh: function() {
    console.info('下拉刷新')
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () {
    console.info('上啦')
  },
  onPageScroll: function (num) {
  console.info(num)
  },
  onShareAppMessage: function () {
    return {
      title: 'Json-Demo',
      path: '/page/index'
    }
  },
  getLocation () {
    console.info('地理位置')
    wx.getLocation({
      success: function(res) {
        console.info('成功')
        console.info(res)
        const { latitude, longitude } = res
        // var latitude = res.latitude
        // var longitude = res.longitude
        var url = 'https://api.map.baidu.com/geocoder/v2/?location=' + latitude + ',' + longitude +'&output=json&pois=1&ak=Iv2nkWeGF4U8RSepS4urOMms'
        wx.request({
          url: url,
          dataType: 'json',
          success: function (res) {
            console.info(res.data.result.addressComponent.province)
            console.info(res.data.result.addressComponent.city)
            console.info(res.data.result.addressComponent.district)
            console.info(res.data.result.addressComponent.country)
            console.info('99999999999999999')
          }
        })
      },
      complete: function () {
        console.info('完成66666')
      },
      fail: () => {
        console.info('llllllllllllllllll66666666666666')
      }
    })
  } 
})
