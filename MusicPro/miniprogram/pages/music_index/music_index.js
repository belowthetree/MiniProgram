Page({
  data: {
    cardCur: 0,
    input: null,
    // 
    recsheetItems: [
      {
        id: 0,
        name: 'QQ音乐排行榜',
        url: '../search/search',
        imageurl: '/images/icon/qq.jpg'
      },
      {
        id: 1,
        name: '网易云音乐排行榜',
        url: '2',
        imageurl: '/images/icon/wy.jpg'
      },
      {
        id: 2,
        name: '酷我音乐排行榜',
        url: '3',
        imageurl: '/images/icon/kw.jpg'
      }
    ]
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.setData({
          swiperList: res.data.data.slider,
          //创建并赋值，res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        })
      }
    })
  },
  onTouchSwiper: function(event){   //轮播图跳转外部链接，不支持
    wx.setStorage({
      key: "swiperLinkUrl",
      data: this.data.swiperList[this.data.cardCur].linkUrl
    })
    wx.navigateTo({
      url: '../link/link', //
      success: function () {

      },       //成功后的回调；

      fail: function () { },         //失败后的回调；

      complete: function () { }      //结束后的回调(成功，失败都会执行)

    })
  },
  onTouchSearch: function(e){
    wx.setStorage({   //缓存内容
      key: "searchValue",
      data: this.data.input
    })
    if(this.data.input){
      wx.navigateTo({   //跳转
        url: '../search/search',
      })
    }
  },
  getInput: function (e) {//获取输入框的内容
    this.setData({
      input : e.detail.value
    })
    console.log(this.data.input)
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  catchTapCategory : function(e){   //排行榜跳转
    console.log(e.currentTarget.dataset.url);
    var linkUrl = e.currentTarget.dataset.url;
    wx.navigateTo({   //跳转
      url: linkUrl,
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})