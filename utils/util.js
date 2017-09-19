function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getDate(){
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return `${year}-${month}-${day}`
}
function getYesterdayDate() {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate() - 1
  return `${year}-${month}-${day}`
}
// 大于7天超时 返回false 不超时返回true
function isExpire(str) {
  let date = new Date(str).getTime()
  let now = new Date().getTime()
  if (now - date > 1000 * 60 *60 * 24 * 7) {
      return false
  }else {
    return true
  }
}
module.exports = {
  formatTime: formatTime,
  getDate: getDate,
  getYesterdayDate,
  isExpire
}
