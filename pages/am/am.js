//am.js
const {getStorage } = require('../../utils/weixin')
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.contact'),
    subjects:[]
  },
  onLoad: function () {
    wx.getUserInfo({
      success: res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
    this.init()
  },
  init(){
    let vm = this
    getStorage('history').then(res=>{
      vm.setData({
        subjects:res.data.list
      })
    }).catch(()=>{
      console.info('shibai')
    })
  },
  go () {
    wx.switchTab({
      url: '/pages/index/index'
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
      path: 'pages/index/index'
    }
  }
})
