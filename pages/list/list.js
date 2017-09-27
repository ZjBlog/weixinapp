const { requsetForGet } = require('../../utils/request')
const { getAna } = require('../../utils/ana')

Page({
  data: {
    ana: getAna(),
    pageNum: 0
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    console.info('====================')
    console.info(options.type)
  }
})
