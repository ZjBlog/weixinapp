const { requsetForGet, requsetForGetUs } = require('../../utils/request')
const { getAna } = require('../../utils/ana')
const { setStorage, getStorage, getLocation} = require('../../utils/weixin')
const { getDate, isExpire} = require('../../utils/util')
const { getCityName } = require('../../utils/baidu') 
Page({
  data: {
    buttons: [{
      label: '半个橙子',
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAKYUlEQVR4XuVbCdCvYxX//WraS0huUlqIcCUVxSATpQbZuckaNSpaaFrGhMtMlhZGpE2lQqLFVkql26rcG0LTKqksFe0b5Wd+3/e83z3fc593/b/fZeaemW++me973vOc9zznOcvvnJeYY5L0UACbAdgAwDPTzxoAHgdgdQD3ArgTwJ8A3Abgp+nnRgBXk7x7LkXkXDCX9AwA+wDYBsAWAKyEIfQfAD8A8A0A55H8xRAmTc+MpgBJqwA4NL34/LEFTfxuAPBpAB8m+ecx9phYAZKeCuBtAA4A8IgxhOrA498AzgZwIsnfdFhfu2SwAiT52dcBeHeHF/8vgO8BuAbAjwFEoR+VfIH9wuMBzAPwZACbAnhYy8v9E8DbAZxBUkMUMUgBkp4C4JMAtm7Y1MLZXC8GcCVJn1pnkmRrsg/ZBcArAVhRdfQtAPsPsYbeCpBkYT4I4NE10lztOwrgXJL/6vzGDQslPTL5ltckyyit/pstkuQ5ffbsrABJDwZwVrrrpT0uAnAsyWv7CNB3raRnex8AO9c8a99wMMn/d+HdSQGSHgPg8wC2KzD9I4A3kPxMlw3HWiNpbwCnA1itwPNrAHYj+fe2/VoVkO7idwFsUmB2OYB9STqRWe4kycmU/cxLC5v/CMCWbb6niwIuAbBjtoHNy6f+geX+1oUNJR0G4DQA+ftcTLLuqkxxalSApKMBLMz2tGPbmaTNbCKStD6Ae0j+ciJGAJJz/lThnY4heVwd/1oFSNoewJczhg5tW5F0PJ+IJJ0E4K2JyckknUxNRJIOSo46vpfzgx1I+l2WoaICJLlwcQ4eQ53N/iUknZdPRJJWAvCXoFwLuTJJh7KJSNICh+Ds4P4BYHOSTqVn0TIKSBneT1LVFhc7xp45kXTpYUn7p1Q2snMiYxOemCS9PkWIyMvvND/PGEsKeC2A3LldRjJ3hIMFlXQhgN0zBheS3HMw0+xBSV+xxWZ/XuYQZylA0soAfm1zDA86zq83VvWV8AFXcs7uItm5rjJW/S/JdYUxBf+uyPs+naSv3xTlCrC3fGcm2H4kHWtHIUmO2UWH5HhO0ic3CknaL9Uskd/xJB3dZisgnf5vM8e3iKQLktFI0hmpiizxdFXnmD4aSboyFVUVTzvENUj691ILkPQOAO/Kdt6a5LdHk2Y6Xv8ewBNreN5Kcs2R93PFuijjeRTJqXeduQKSfuX7ERYuJumafDSS5HTaKWpFVYkcgZRNxi6oJP0wqyJvIrn2jAIkPc8AZPame5G8YLS3nz79Y1IlV7F1BWmK6Wpj5jZEHkmOLp/Nnt2U5OIpC5D0HgBHhgX2kquTvGfIhnXPSFoC4Dnh/87cLMPHwt+WkPSBjEaSHgLgDkeZwPR9JI+sFHC9k4TwzzNJGu4ajST53vv+V+TsrwpRDrUxIq1J8tbRNp8+ZCdxBm0ruoHkRpRkbN7aibQTyUubBJC0L4CPAHj4QEFnIowkQ1pbDeRj6PyQNiRI0k4JnovbzLMC9gJwfnYyK1VhosGcb08A5kC58WaSp/phSb5+voZD6U6SJWBkqblNgzq+2g8KmyywAlzuziQGRm1JbtwmiSQju2u1rav5v33L2iSdd1gBhtadgQ6lGa/eYrXXAXhWWLPQCjCUZXipIoOZBj4bSdKWAC4D4MquD91iKJvkefGhZAWG2FtBmmwzV5A7dslXJHlPV4sVnW8FOC5HuGshSYOOrSTJsdRKWC9b7NL5LZWJtzJqV/ab0hUxMBvpZ6nWdw7TSgVrv8YKuBmAcf6KDiBpzL8TSTJe7/W7FR6wbzE/N0Z6kyQ3RozyRgut+BikdQltkKYTSXL36hNh8c1WgAHNVcMfdyFZJSidGHuRJCM6Ti+jk/G/fO9sor/rzGya35MAOBLl/sjdZKeyJ/bhl2R0k+UL4bm7rAAzjPdu26Goj6QXAfhcVk57Pyt51y73NAlqPs7cjPpGshfffQL5tgUQscx7rQCbZ2xfD1ZAEt7XyRaUn5z9wh4kv9h0cgnNMcJbsiSDsYOboZJyBdxdugI+qUYh20yv4e5eR9KdnVqS5AGJ3KlO5EuqzSTtmho81Z+mrkAezw8kacczMUn6OIADA6PLSb6sRQE5lHU2ychjsFwFJ3iLFeAqMBYfR5M8fvAu4UFJXwXw4vCnw0gaEGmygMNTk6NacwXJHNsbJF6hz7HECjCE/IrA8RySzvMnogR93wUgxu6ZIkeS77iB1v8ZIqvQ2kLRZN+x6kiQuTvHHt2p6FwrIK/RryVZ6gP2UkjC52O2N3P/JRn1cTiqABcPT9i7u75wCDR+v2HYcAHJWK/0kiX4ADd0og861grIwQKXqa3FUJsEhbRzCoyU5A6zXybmHmbnknhPkosknZAmP6ptPCAVT65t+2X+L8lNHqfNMeTvbQU8IY2nxYecuDjFHURplsDmH+uEFySTP6oh33dOYv9zBYDvhM0tuK9Bp55/SWhJvm5u9EaaVwEiuclNhM5KsuOzA6zIuYZbbU0jNVEwt9+MDxjJqWg7kl8fdCLT1ypHo28kOb9SwHsBHBGYTwSJSfLggttTTWSl2OM7lzck1jYQdRrJNw5RQILE/pBlqKeQPKJSgJ2RkdNIztqc1vYmSYazPPVVRy6JXXNMdZklbZTy/iZ84TaSdXB6o4yS9gCQA7xLQdEkhKcw1wmcBsHikgx6GvysI+fiVu5f4wJJjwXgnmFpDKdaujFJj9n1okKuMxsWTwooNUY8CxCdUevGkowlOLTm5OhiB+dBquJMX8oNjE75pwSM9E7SJNmXGHOMVGyMOEx4WDnOBPRujUn6PgB7/Eg+bZ96p6mSFCptDbaKSFeR3Lz1FMICSd8E8MLwp3JrLFlBqTnaFyDJsX9D7g6rvvedSZL9gfEA+4eKeiVphdzffI4jOWOhpfb4TVkDwWPs63Ztj6eS80spBXYx5Px/EkTI4csNFJ+crcg5Qiul4e2fZ2N0jm5Pq22PJysoDUhcQvLlrbumBZLWdXgjGRshXR8fZZ0kW88OGbPmAYmkAFuFEyPPCUVqreRGkXwEJjUjMsYZNmgdkUlKcJvMeUHs2joN9VDkcp0I7auPVIR5oCNWoe5Cb9ZpSKraUFIOIE7pBsCrSEZkta+Mc7ZekoETZ5V5CK1FudoGJT0ukw8ZWgkem+k1lT1nb73U77iZUxqUbMwdWrswkly32xoiWQkelXXOf79Tw6jsBSTd+6ylLgqwH/CYzHMLXFxeHvQAHpbeoi0EtyogOcWmcXlXWYeTzCcw5tQyUlfb84x578D7OuM0hN76wUYnBSQl2Kt+NEN540s+UD6YsIP2vEAn8KSzAkJ0MGDqaYu6T2YWA/jQHHwyYyf36pZPZpyr9Bq37a2AZA3u57t3sOJ9NBUswcrzUKPH3tu+F/Tnr1elGSGP4/jHvqMazfGYjsEOT3n4szk3Rp/f4YtT33GX8e9frp/NzYqH09Mdnvt3EtKmiLEcY/Xh5Ekk3d4fTIOuQGm3FfbT2RplrHgfT9fZYBqPN+jqTk/1+bx7Eb7vvvvOKo053C+fz98HAdYInL3d2KYAAAAASUVORK5CYII=",
    },],
    position:'bottomRight',
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
        this.setData({
          city: res
        })
        this.initAll()
      }).catch(res=>{
        this.setData({
          city: '北京'
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
  },
  go: function () {
    wx.navigateToMiniProgram({
      appId: 'wx749b024776cd21cb'
    })
  }
})