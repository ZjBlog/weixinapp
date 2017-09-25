Page({
  data: {
    title: '',
    movieList: [{ category: '1',
      title: '近期上映',
      subjects: [
        {
          imgUrls: 'https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2494093630.webp',
          rating: {
            max: 10,
            average: 7.1,
            stars: "37",
            min: 0
          },
          title: "猩球崛起3:终极之战"
        },
        {
          imgUrls: 'https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2498055621.webp',
          rating: {
            max: 10,
            average: 7.1,
            stars: "40",
            min: 0
          },
          title: "王牌保镖"
        },
        {
          imgUrls: 'https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2497756471.webp',
          rating: {
            max: 10,
            average: 8.0,
            stars: "35",
            min: 0
          },
          title: "蜘蛛侠：英雄归来"
        },
        {
          imgUrls:'https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2498971355.webp',
          rating: {
            max: 10,
            average: 0,
            stars: "35",
            min: 0
          },
          title: "看不见的客人"
        },
        {
          imgUrls: 'https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2498542692.webp',
          rating: {
            max: 10,
            average: 7.1,
            stars: "35",
            min: 0
          },
          title: "捍卫者"
        },
        {
          imgUrls: 'https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2499141363.webp',
          rating: {
            max: 10,
            average: 7.1,
            stars: "35",
            min: 0
          },
          title: "天梯：蔡国强的艺术"
        },
        {
          imgUrls:'https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2498371582.webp',
          rating: {
            max: 10,
            average: 7.1,
            stars: "35",
            min: 0
          },
          title: "刀剑神域：序列之争"
        },
        {
          imgUrls: 'https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2499708853.webp',
          rating: {
            max: 10,
            average: 7.1,
            stars: "35",
            min: 0
          },
          title: "昆塔：反转星球"
        },
        {
          imgUrls: 'https://img1.doubanio.com/view/movie_poster_cover/lpst/public/p2498897918.webp',
          rating: {
            max: 10,
            average: 7.1,
            stars: "35",
            min: 0
          },
          title: "理查大冒险"
        },
        {
          imgUrls: 'https://img1.doubanio.com/view/movie_poster_cover/lpst/public/p2499416137.webp',
          rating: {
            max: 10,
            average: 7.1,
            stars: "35",
            min: 0
          },
          title: "纯洁心灵·逐梦演艺圈"
        }
      ]
    }],

  },
  //生命周期函数--监听页面加载
  onLoad: function () {
    this.setData({
      title: 'Demo'
    })
  }
})
