const { getDate, isExpire } = require('../../utils/util')
const { setStorage, getStorage} = require('../../utils/weixin')
const { requsetForGet} = require('../../utils/request')

Page({
  data: {
    title: 'urlDemo',
    item: {},
    flag:false
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    wx.showLoading({
      mask: true,
      title: '加载中',
    })
    let id = options.id
    this.init(id)
  },
  init (id) {
    let vm = this
    requsetForGet('https://api.douban.com/v2/movie/subject/' + id).then(res=>{
      wx.hideLoading()
      wx.setNavigationBarTitle({
        title: res.data.title
      })
      vm.setData({
        item: res.data,
        flag: true
      })
    })
  }
})
