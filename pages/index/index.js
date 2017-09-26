const { requsetForGet } = require('../../utils/request')

Page({
  data: {
    title: 'urlDemo',
    movieList: [
      { url: 'https://api.douban.com/v2/movie/in_theaters' },
      { url: 'https://api.douban.com/v2/movie/coming_soon' },
      { url: 'https://api.douban.com/v2/movie/top250' }
      //有次数限制 先去掉 其它完成之后加上 加缓存
      // { url:'https://api.douban.com/v2/movie/us_box'}
    ],
  },
  //生命周期函数--监听页面加载
  onLoad: function () {
    let allPromises = this.data.movieList.map(m => {
      return requsetForGet(m.url, { count: 10 }).then((res) => {
        m.title = res.data.title
        m.subjects = res.data.subjects
        return m
      })
    })
    Promise.all(allPromises).then((res) => {
      this.setData({
        movieList: res
      })
      console.info(res)
    })
  }
})