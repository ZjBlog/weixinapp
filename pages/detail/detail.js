const { getDate, isExpire } = require('../../utils/util')
const { setStorage, getStorage} = require('../../utils/weixin')
const { requsetForGet} = require('../../utils/request')

Page({
  data: {
    title: 'urlDemo',
    item: {},
    flag:false,
    id: ''
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    wx.showLoading({
      mask: true,
      title: '加载中',
    })
    let id = options.id
    console.log('...........')
    console.log(id)
    console.log('...........')
    this.data.id = id
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
      vm.history(res.data.images.large,res.data.id)
      console.info(res.data.images.large)
    })
  },
  history(img,id) {
    getStorage('history').then(res => {
      let items = res.data.list
      let itemId = res.data.ids
      if (itemId.indexOf(id) > -1) {
        console.info('已经存在')
      } else {
        if (itemId.length > 10) {
          items.pop()
          itemId.pop()
          items.unshift({img:img,id:id})
          itemId.unshift(id)
        } else {
          itemId.unshift(id)
          items.unshift({ img: img, id: id })
        }
        setStorage('history', { list: items, ids: itemId}).then(res => {
          console.info('保存成功')
        }).catch((res) => {
          console.info('保存失败history')
        })
      }
    }).catch(() => {
      let temp = []
      let itemId=[]
      temp.push({ img: img, id: id })
      itemId.push(id)
      setStorage('history', { list: temp, ids: itemId }).then(res => {
        console.info('保存成功')
      }).catch((res) => {
        console.info('保存失败history')
      })
    })
  },
  person (event) {
    let id = event.currentTarget.dataset.id
    wx.redirectTo({
      url: '/pages/person/person?id=' + id
    })
  },
  onShareAppMessage: function () {
    return {
      title: '影之讯',
      path: '/pages/detail/detail?id=' + this.data.id
    }
  }
})
