const { getDate, isExpire } = require('../../utils/util')
const { setStorage, getStorage} = require('../../utils/weixin')
const { requsetForGet} = require('../../utils/request')

Page({
  data: {
    item: {},
    flag:false,
    id: ''
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let id = options.id
    this.data.id = id
    this.init(id)
  },
  init (id) {
    let vm = this
    requsetForGet('https://api.douban.com/v2/movie/celebrity/'+id).then(res => {
      wx.hideLoading()
      wx.setNavigationBarTitle({
        title: res.data.name
      })
      vm.setData({
        item: res.data,
        flag: true
      })
    })
  },
  detail(event) {
    let id = event.currentTarget.dataset.id
    wx.redirectTo({
      url: '/pages/detail/detail?id=' + id
    })
  },
  onShareAppMessage: function () {
    return {
      title: '影之讯',
      path: '/pages/person/person?id='  + this.data.id
    }
  }
})
