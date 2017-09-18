const { getDate, getYesterdayDate} = require('./utils/util')
const weixin = require('./utils/weixin')
const { getCityName } = require('./utils/baidu')
const in_theaters_url = 'https://api.douban.com/v2/movie/in_theaters'
const { requsetForGet } = require('./utils/request')
//app.js
App({
  onLaunch: function() {
    let vm = this
    //查看缓存中的数据 失效时间为一天
    weixin.getStorage('index').then((res)=>{
      console.info(res.data.time)
      if (getDate() === res.data.time) {
        vm.globalData.img = res.data.img
      } else {
        vm.initData()
      }
    }).catch(()=>{
      vm.initData()
    })
    let date = getDate()
  },
  //初始化数据
  initData () {
    let vm = this
    console.info('初始化数据')
    weixin.getLocation().then((res)=>{
      return getCityName(res.latitude, res.longitude)
    }).then((res)=>{
      const params = { city: res.substring(0, res.length - 1), count: 5 }
      vm.getImage(params)
      }).catch(()=>{
      console.info('shibai')
      const params = { city: '北京', count: 5 }
      vm.getImage(params)
    })
  },
  //获取五张图片 如果没有默认一张
  getImage(params) {
    let vm = this
    let obj = {}
    requsetForGet(in_theaters_url, params).then((res)=>{
      vm.globalData.img = []
      res.data.subjects.forEach((value) => {
        vm.globalData.img.push(value.images.large)
      })
      return vm.globalData.img
    }).then((res)=>{
      console.info('获取图片成功')
      obj.time = getDate()
      obj.img = res
      console.info(obj)
      weixin.setStorage('index',obj)
    }).catch(()=>{
      console.info('获取图片失败')
      obj.time = getYesterdayDate()
      obj.img = ['https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2494093630.webp']
      weixin.setStorage('index', obj)
    })
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
    userInfo: null,
    img: []
  }
})
