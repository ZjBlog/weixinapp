/**
 * 微信请求
 */
function requsetForGet (url,params={}) {
  return new Promise((resolve,reject) => {
    wx.request({
      url: url,
      data: Object.assign({}, params),
      dataType: 'json',
      success: resolve,
      fail: reject,
      header: { 'Content-Type': 'json' },
      method: 'GET'
    })
  })
}
function requsetForPost(url, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: Object.assign({}, params),
      dataType: 'json',
      success: resolve,
      fail: reject,
      header: { 'Content-Type': 'json' },
      method: 'POST'
    })
  })
}
function requsetForGetUs(url, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: Object.assign({}, params),
      dataType: 'json',
      success: resolve,
      fail: reject,
      header: { 'Content-Type': 'json' },
      method: 'GET'
    })
  })
}
module.exports = {
  requsetForPost: requsetForPost,
  requsetForGet: requsetForGet,
  requsetForGetUs: requsetForGetUs
}
