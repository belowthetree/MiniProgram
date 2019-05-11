Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    searchContent: '搜索内容',
    navbar: ['网易云音乐', 'QQ音乐', '酷狗音乐'],
    searchResult:null,
    tencentResult:null,
    neteaseResult:null,
    kugouResult:null,
    list:null
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    if(this.data.TabCur == 0){
      this.setData({
        searchResult: this.data.neteaseResult
      })
    }
    else if (this.data.TabCur == 1){
      this.setData({
        searchResult: this.data.tencentResult
      })
    }
    else if (this.data.TabCur == 2) {
      this.setData({
        searchResult: this.data.kugouResult
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({  //获取搜索内容，并重显
      searchContent: wx.getStorageSync('searchValue')
    })
    this.search(0)
  }, 
  getInput: function (e) {//获取输入框的内容
    this.setData({
      searchContent: e.detail.value
    })
  },
  //点击搜索
  onTouchSearch: function (e) {
    console.log(this.data.TabCur)
    this.search(this.data.TabCur)
  },
  //点击播放
  play(e){
    var app = getApp();
    app.data.songIndex = e.currentTarget.dataset.index; //下标
    //给全局变量赋值
    if(this.data.TabCur == 0){
      app.data.songlist = this.data.neteaseResult
      console.log(app.data.songlist)
      wx.navigateTo({   //跳转
        url: '../play/play',
      })
    } 
    else if (this.data.TabCur == 1) {
      app.data.songlist = this.data.tencentResult
      console.log(app.data.songlist)
      wx.navigateTo({   //跳转
        url: '../play/play',
      })
    }
    else if (this.data.TabCur == 2) {
      app.data.songlist = this.data.kugouResult
      wx.navigateTo({   //跳转
        url: '../play/play',
      })
    }
  },
  //搜索并返回结果
  search(currentId) {
    var that = this
    var musicId
    var max = 9
    //qq音乐
    wx.request({
      url: 'https://v1.itooi.cn/tencent/search?keyword=' + this.data.searchContent + '&type=song&pageSize=100&page=0',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        for (let i = 0; i < max; i++) {
          musicId = res.data.data.list[i].songmid
          that.setData({
            //数组单项赋值，通过 ES6 的 模板字符串 和 属性名表达式，注意在项目配置里面开启ES6 转 ES5
            //注意不是单引号'，是`
            [`tencentResult[${i}].singer`]: res.data.data.list[i].singer["0"].name,
            [`tencentResult[${i}].name`]: res.data.data.list[i].songname,
            [`tencentResult[${i}].songId`]: musicId,
            [`tencentResult[${i}].url`]: 'https://v1.itooi.cn/tencent/url?id=' + musicId + '&quality=128',
            [`tencentResult[${i}].pic`]: 'https://v1.itooi.cn/tencent/pic?id=' + musicId,
            [`tencentResult[${i}].lrc`]: 'https://v1.itooi.cn/tencent/lrc?id=' + musicId,

          })
        }
        if (currentId == 1) {
          that.setData({
            searchResult: that.data.tencentResult
          })
        }
      }
    })
    //网易云音乐
    wx.request({
      url: 'https://v1.itooi.cn/netease/search?keyword=' + this.data.searchContent + '&type=song&pageSize=20&page=0',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        for (let i = 0; i < max; i++) {
          musicId = res.data.data.songs[i].id
          that.setData({
            [`neteaseResult[${i}].singer`]: res.data.data.songs[i].ar["0"].name,
            [`neteaseResult[${i}].name`]: res.data.data.songs[i].name,
            [`neteaseResult[${i}].songId`]: musicId,
            [`neteaseResult[${i}].url`]: 'https://v1.itooi.cn/netease/url?id=' + musicId + '&quality=flac',
            [`neteaseResult[${i}].pic`]: 'https://v1.itooi.cn/netease/pic?id=' + musicId,
            [`neteaseResult[${i}].lrc`]: 'https://v1.itooi.cn/netease/lrc?id=' + musicId,
          })
        }
        if (currentId == 0) {
          that.setData({
            searchResult: that.data.neteaseResult
          })
        }
      }
    })
    //酷狗音乐
    wx.request({
      url: 'https://v1.itooi.cn/kugou/search?keyword=' + this.data.searchContent + '&type=song&pageSize=100&page=0',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        for (let i = 0; i < max; i++) {
          musicId = res.data.data.info[i].hash   
          that.setData({
            [`kugouResult[${i}].singer`]: res.data.data.info[i].singername,
            [`kugouResult[${i}].name`]: res.data.data.info[i].songname,
            [`kugouResult[${i}].songId`]: musicId,
            [`kugouResult[${i}].url`]: 'https://v1.itooi.cn/kugou/url?id=' + musicId + '&quality=128',
            [`kugouResult[${i}].pic`]: 'https://v1.itooi.cn/kugou/pic?id=' + musicId,
            [`kugouResult[${i}].lrc`]: 'https://v1.itooi.cn/kugou/lrc?id=' + musicId,
          })
        }
        if (currentId == 2) {
          that.setData({
            searchResult: that.data.kugouResult
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})