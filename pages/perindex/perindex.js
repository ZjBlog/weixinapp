const { getDate, getYesterdayDate, isExpire } = require('../../utils/util')
const weixin = require('../../utils/weixin')
const { getCityName } = require('../../utils/baidu')
const in_theaters_url = 'https://api.douban.com/v2/movie/in_theaters'
const { requsetForGet } = require('../../utils/request')
//获取应用实例
var app = getApp()
Page({
  data: {
    img: []
  },
  onLoad: function () {
    console.log('onLoad')
    let vm = this
    //查看缓存中的数据 失效时间为一天
    weixin.getStorage('index').then((res) => {
      if (isExpire(res.data.time)) {
        vm.setData({
          img: res.data.img
        })
      } else {
        vm.initData()
      }
    }).catch(() => {
      vm.initData()
    })
  },
  start () {
    wx.navigateTo({
      url: '/pages/index/index'
    })
    // 有tab的时候有这个代码
    // wx.switchTab({
    //   url: '/pages/index/index'
    // })
  },
  //初始化数据
  initData() {
    wx.showLoading({
      title: '加载中',
    })
    let vm = this
    console.info('初始化数据')
    weixin.getLocation().then((res) => {
      return getCityName(res.latitude, res.longitude)
    }).then((res) => {
      const params = { city: res.substring(0, res.length - 1), count: 3 }
      vm.getImage(params)
    }).catch(() => {
      console.info('shibai')
      const params = { city: '北京', count: 3 }
      vm.getImage(params)
    })
  },
  //获取五张图片 如果没有默认一张
  getImage(params) {
    let vm = this
    let obj = {}
    let tem = []
    requsetForGet(in_theaters_url, params).then((res) => {
      res.data.subjects.forEach((value) => {
        tem.push(value.images.large)
      })
      return tem
    }).then((res) => {
      wx.hideLoading()
      vm.setData({
        img: res
      })
      console.info('获取图片成功')
      obj.time = getDate()
      obj.img = res
      console.info(obj)
      weixin.setStorage('index', obj)
    }).catch(() => {
      wx.hideLoading()
      console.info('获取图片失败')
      obj.time = getYesterdayDate()
      obj.img = ['https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2494093630.webp']
      weixin.setStorage('index', obj)
    })
  }
})
