const { requsetForGet, requsetForGetUs } = require('../../utils/request')
const { getAna } = require('../../utils/ana')
const { setStorage, getStorage, getLocation} = require('../../utils/weixin')
const { getDate, isExpire} = require('../../utils/util')
const { getCityName } = require('../../utils/baidu') 
Page({
  data: {
    title: 'urlDemo',
    city: '北京',
    movieList: [
      { url: 'https://api.douban.com/v2/movie/in_theaters' },
      { url: 'https://api.douban.com/v2/movie/coming_soon' },
      { url: 'https://api.douban.com/v2/movie/top250' }
    ],
    item: {
      url: 'https://api.douban.com/v2/movie/us_box'
    },
    ana: getAna()
  },
  //生命周期函数--监听页面加载
  onLoad: function () {
    getLocation().then(res=>{
      getCityName(res.latitude, res.longitude).then(res=>{
        console.info(res)
        this.setData({
          city: res
        })
        this.initAll()
      })
    }).catch(res=>{
      getCityName(res.latitude, res.longitude).then(res => {
        console.info(res)
        this.setData({
          city: res
        })
        this.initAll()
      })
    })
  },
  initAll () {
    this.initus()
    let vm = this
    getStorage('mlist').then(res => {
      if (isExpire(res.data.time)) {
        console.info('cache mlist')
        vm.setData({
          movieList: res.data.mlist
        })
      } else {
        vm.initMovies()
      }
    }).catch(() => {
      vm.initMovies()
    })
  },
  initMovies () {
    let allPromises = this.data.movieList.map(m => {
      return requsetForGet(m.url, { count: 10,city:this.data.city }).then((res) => {
        m.title = res.data.title
        m.subjects = res.data.subjects
        return m
      })
    })
    Promise.all(allPromises).then((res) => {
      this.setData({
        movieList: res
      })
      setStorage('mlist', { time: getDate(), mlist: res})
      console.info('add cache mlist')
    })
  },
  initus () {
    console.log('init us')
    let vm = this
    getStorage('us').then(res=>{
      if (isExpire(res.data.time)) {
        console.info('cache us')
        vm.setData({
          item: res.data.us
        })
      }else {
        vm.initUsCache()
      }
    }).catch(()=>{
      vm.initUsCache()
    })
  },
  initUsCache(){
    let vm = this
    requsetForGetUs('https://api.douban.com/v2/movie/us_box').then((res) => {
      console.log(res)
      let us = {}
      us.url = 'https://api.douban.com/v2/movie/us_box'
      us.title = res.data.title
      us.subjects = res.data.subjects
      us.date = res.data.date
      vm.setData({
        item: us
      })
      setStorage('us', { time: getDate(), us: us})
      console.info('add cache us')
    })
  },
  more(event) {
    console.info(event)
    let url = event.currentTarget.dataset.more
    let index = url.lastIndexOf('\/')
    url = url.substring(index + 1, url.length)
    console.info(url)
    wx.navigateTo({
      url: '/pages/list/list?type=' + url
    })
  },
  detail(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
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