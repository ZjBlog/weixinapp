/**
 * 利用百度地图Api获取城市名字
 */
const url = 'https://api.map.baidu.com'
const {requsetForGet} = require('./request')

/**
 * 根据经纬度获取城市名默认北京市
 */
function getCityName(lat = 39.9, lon = 116.3) {
  const params = { location: `${latitude},${longitude}`, output: 'json', ak: 'Iv2nkWeGF4U8RSepS4urOMms' }
  return requsetForGet(url, params)
    .then(res => res.data.result.addressComponent.city)
}
module.exports = { getCityName }
