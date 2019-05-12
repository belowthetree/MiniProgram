Page({
  data: {
    cardCur: 0,
    input: null,
    // 
    recsheetItems: [
      /*{
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
      }*/
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
        //将获取到的json数据，存在数组中
        that.setData({
          swiperList: res.data.data.slider,
          //创建并赋值，res代表success函数的事件对，data是固定的
        })
      }
    })
    wx.request({
      url: 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom9453221309398254&g_tk=425033681&loginUin=1182753154&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22category%22%3A%7B%22method%22%3A%22get_hot_category%22%2C%22param%22%3A%7B%22qq%22%3A%22%22%7D%2C%22module%22%3A%22music.web_category_svr%22%7D%2C%22recomPlaylist%22%3A%7B%22method%22%3A%22get_hot_recommend%22%2C%22param%22%3A%7B%22async%22%3A1%2C%22cmd%22%3A2%7D%2C%22module%22%3A%22playlist.HotRecommendServer%22%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A8%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A8%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%2C%22new_song%22%3A%7B%22module%22%3A%22newsong.NewSongServer%22%2C%22method%22%3A%22get_new_song_info%22%2C%22param%22%3A%7B%22type%22%3A5%7D%7D%2C%22new_album%22%3A%7B%22module%22%3A%22newalbum.NewAlbumServer%22%2C%22method%22%3A%22get_new_album_info%22%2C%22param%22%3A%7B%22area%22%3A1%2C%22sin%22%3A0%2C%22num%22%3A10%7D%7D%2C%22new_album_tag%22%3A%7B%22module%22%3A%22newalbum.NewAlbumServer%22%2C%22method%22%3A%22get_new_album_area%22%2C%22param%22%3A%7B%7D%7D%2C%22toplist%22%3A%7B%22module%22%3A%22musicToplist.ToplistInfoServer%22%2C%22method%22%3A%22GetAll%22%2C%22param%22%3A%7B%7D%7D%2C%22focus%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetFocus%22%2C%22param%22%3A%7B%7D%7D%7D',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在数组中
        that.setData({
          recsheetItems: res.data.recomPlaylist.data.v_hot,
          //创建并赋值，res代表success函数的事件对，data是固定的
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
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  catchTapCategory : function(e){   //歌单跳转
    console.log(e.currentTarget.dataset.id);  //获取歌单id
    wx.navigateTo({   //跳转
      url: '../list/list?listId=' + e.currentTarget.dataset.id,
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