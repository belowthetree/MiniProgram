var app = getApp()
const innerAudioContext = wx.createInnerAudioContext()
const bgm = wx.getBackgroundAudioManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:"",
    show:false,
    name:'',
    singer:'',
    song: null,
    /**歌词 有关部分*/
    animation: '',
    isplayed: true, //是否播放
    iscollect: true, // 是否收藏
    isorder: false,  // 是否乱序
    
  },

  hide:function(e){
    this.setData({
      show:false,
      text:""
    })
  },

  input:function(e){
    this.setData({
      text:e.detail.value
    })
  },

  openshare:function(e){
    if(!app.globalData.username){
      wx.showToast({
        title: '请先登陆',
        icon:"none"
      })
      return
    }
    this.setData({
      show:true
    })
  },

  share:function(e){
    wx.showLoading({
      title: '分享中',
    })
    var data = this.data.song
    var that = this
    wx.cloud.callFunction({
      name:'uploadShare',
      data:{
        name:app.globalData.username,
        src: data.url,
        title: data.name,
        coverImgUrl: data.pic,
        singer: data.singer,
        text:that.data.text
      },
      success:function(res){
        console.log(res)
      },
      fail:function(res){
        console.log(res)
      },
      complete:function(res){
        that.setData({
          show: false,
          text: ""
        })
        wx.hideLoading()
      }
    })
  },
  //收藏音乐图标
  collectmusic: function () {
    console.log('collect')
    wx.showLoading({
      title: '请稍后',
    })
    var that = this
    var data = this.data.song
    if (this.data.iscollect) {
      wx.cloud.callFunction({
        name: 'uploadCollection',
        data: {
          type: 'add',
          url: data.url,
          name: data.name,
          pic: data.pic,
          singer: data.singer,
          songid: data.songId
        },
        success:function(res){
          console.log(res)
          that.setData({
            iscollect: false
          })
        },
        fail:function(res){
          console.log(res)
        },
        complete: function (res) {
          wx.hideLoading()
        }
      })
    } else {
      wx.cloud.callFunction({
        name: 'uploadCollection',
        data: {
          type: 'del',
          url: data.url,
          name: data.name,
          pic: data.pic,
          singer: data.singer,
          songid: data.songId
        },
        success: function (res) {
          console.log(res)
          that.setData({
            iscollect: true
          })
        },
        fail: function (res) {
          console.log(res)
        },
        complete:function(res){
          wx.hideLoading()
        }
      })
    }
  },

  playAndtime: function () {
    var that = this;
    innerAudioContext.autoplay = true;
    innerAudioContext.stop();
    innerAudioContext.src = app.data.songlist[app.data.songIndex].url;
    innerAudioContext.play(() => {
      that.setData({
        song:app.data.songlist[app.data.songIndex]
      })
    })
    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
  },


  //暂停播放按钮
  listenerButtonPlay: function () {
    console.log(this.data.song)
    if (this.data.isplayed) {
      innerAudioContext.pause();
      this.setData({ isplayed: false})
    }
    else {
      innerAudioContext.play();
      this.setData({ isplayed: true })
    }
  },

  lastSong: function () {

    if (app.data.songIndex) {
      app.data.songIndex--;
      this.playAndtime()
    }
    else {

      this.data.isplayed = false;
      wx.showToast({
        title: '没有更多歌曲了',
        duration: 1000,
        mask: true
      })
    }

  },

  nextSong: function () {
    if (app.data.songIndex == app.data.songlist.length - 1) {
      innerAudioContext.stop();
      this.setData({ isplayed: false })
      wx.showToast({
        title: '没有更多歌曲了',
        duration: 1000,
        mask: true
      })
    }
    else {
      app.data.songIndex++;
      this.playAndtime();
      this.setData({ isplayed: true })
    }
  },


  //顺序播放按钮
  playorder: function () {
    var that = this;
    if (this.data.isorder) {
      innerAudioContext.onEnded(() => {
        that.setData({ isplayed: true })
        if (app.data.songIndex == app.data.songlist.length - 1) {
          innerAudioContext.stop();
          that.setData({ isplayed: false })
          wx.showToast({
            title: '没有更多歌曲了',
            duration: 1000,
            mask: true
          })
        }
        else {
          app.data.songIndex++;
        }
      })
      this.setData({
        isorder: false
      })
    } else {
      app.data.songIndex = parseInt((Math.random() * (app.data.songlist.length)));
      this.setData({
        isorder: true
      })
    }

  },
    // 页面卸载时停止播放
    onUnload() {
    
  },

   
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    var that = this;
    that.setData({
      song:app.data.songlist[app.data.songIndex],
    })
    bgm.stop();
    innerAudioContext.autoplay = true;
    innerAudioContext.src = app.data.songlist[app.data.songIndex].url;
    innerAudioContext.play(() => {
    })
    innerAudioContext.onTimeUpdate(() => {
      var time_now = innerAudioContext.currentTime;
    })
    innerAudioContext.onEnded(() => {
      that.setData({ isplayed: true })
      if (app.data.songIndex == app.data.songlist.length - 1) {
        innerAudioContext.stop();
        that.setData({ isplayed: false })
        wx.showToast({
          title: '没有更多歌曲了',
          duration: 1000,
          mask: true
        })
      }
      else {
        app.data.songIndex++;
        innerAudioContext.stop();
        innerAudioContext.src = app.data.songlist[app.data.songIndex].url;
        innerAudioContext.play(() => {
        })
      }
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
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
      this.animation = wx.createAnimation({
        duration: 1400,
        timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
        delay: 0,
        transformOrigin: '50% 50% 0',
        success: function (res) {
          console.log("res")
        }
      })
    },
    rotateAni: function (n) {
      console.log("rotate==" + n)
      this.animation.rotate(180 * (n)).step()
      this.setData({
        animation: this.animation.export()
      })
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
      var time = innerAudioContext.currentTime;
      innerAudioContext.stop();
      console.log(time);
      bgm.startTime = time;
      bgm.title = app.data.songlist[app.data.songIndex].name;
      bgm.coverImgUrl = app.data.songlist[app.data.songIndex].pic;
      bgm.src = app.data.songlist[app.data.songIndex].url;
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