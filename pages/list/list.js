const { requsetForGet } = require('../../utils/request')
const { getAna } = require('../../utils/ana')
const { getDate, isExpire } = require('../../utils/util')
const { setStorage, getStorage } = require('../../utils/weixin')
Page({
  data: {
    ana: getAna(),
    pageNum: 0,
    subjects: [],
    loading: false,
    down: false,
    total: 0,
    url: '',
    height: 0,
    item:{},
    flag: true
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    console.info('onLoad')
    wx.showLoading({
      title: '加载中',
    })
    let vm = this
    let type = options.type
    if ('in_theaters'==type){
      wx.setNavigationBarTitle({
        title: '正在上映电影'
      })
    } else if ('coming_soon'==type){
      wx.setNavigationBarTitle({
        title: '即将上映电影'
      })
    } else if ('top250'==type){
      wx.setNavigationBarTitle({
        title: 'Top250电影'
      })
    }
    if ('us_box' == type){
      wx.setNavigationBarTitle({
        title: '北美票房榜'
      })
      this.setData({
        flag: false
      })
      getStorage('us').then(res => {
        console.info('cache us')
          vm.setData({
            item: res.data.us
          })
      }).catch(() => {
        console.info('失败')
      })
      wx.hideLoading()
      return
    }
    console.info('不是us')
    let url = `https://api.douban.com/v2/movie/${type}`
    this.data.url = url
    this.init()
  },
  init() {
    console.info('==============当前页:' + this.data.pageNum + '总页数:' + this.data.total)
    let vm = this
    let params = { start: this.data.pageNum * 20, count: 20 }
    requsetForGet(this.data.url, params).then(res => {
      if (vm.data.total == 0) {
        vm.data.total = Math.ceil(res.data.total / 20)
      }
      vm.data.pageNum += 1
      let temp = vm.data.subjects
      Array.prototype.push.apply(temp, res.data.subjects)
      vm.setData({
        subjects: temp
      })
      console.info(vm.data.subjects)
      vm.setData({
        loading: false
      })
      wx.hideLoading()
    })

  },
  onReachBottom() {
    console.info('一共' + this.data.total + '页,第' + (this.data.pageNum) + '页')
    if (this.data.pageNum < this.data.total) {
      console.info('mmmmmmmmmmmm')
      this.init()
      this.setData({
        loading: true
      })
    } else {
      this.setData({
        down: true
      })
    }
  }
})