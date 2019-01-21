/**
 * 微信请求
 */
function requsetForGet (url,params={}) {
  // params.apikey = '054022eaeae0b00e0fc068c0c0a2102a'
  params.apikey = '0b2bdeda43b5688921839c8ecb20399b'
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
function requsetForGetUs(url, params={}) {
  params.apikey = '0b2bdeda43b5688921839c8ecb20399b'
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
