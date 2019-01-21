/**
 * 利用百度地图Api获取城市名字
 */
const url = 'https://api.map.baidu.com/geocoder/v2/'
const {requsetForGet} = require('./request')
/**
 * 根据经纬度获取城市名默认北京市
 */
function getCityName(lat = 39.9, lon = 116.3) {
  const params = { location: `${lat},${lon}`, output: 'json', ak: 'Iv2nkWeGF4U8RSepS4urOMms'}
  return requsetForGet(url, params).then(res => 
    res.data.result.addressComponent.city.replace('市','')).catch(res=>{
      console.info(res)
    })
}
module.exports = { getCityName: getCityName}
