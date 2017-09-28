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
    height: 0
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    console.info('onLoad')
    let type = options.type
    let url = `https://api.douban.com/v2/movie/${type}`
    this.data.url = url
    let vm = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        vm.setData({
          height: res.windowHeight
        })
      }
    })
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