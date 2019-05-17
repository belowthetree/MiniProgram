// pages/test/test.js

const bgManager = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:"",
    username:"",
    id:"",
    pic: 'https://p1.music.126.net/_IFf2bFdhZBY8xoY6RKSQw==/109951164000212690.jpg',
    intro:"just like this",
    moment:[
      //这里的数据在OnLoad函数中获取

      ],
    comment:"",
    ownerid:"o1rPE5Ii6z3tZ5hNLOMxO6zNZVxk",
    isPlayingMusic: false,
    button: "../images/play.jpg",
  },

setMusic:function(title, coverImgUrl, singer, epname, src){
  bgManager.title = title
  bgManager.coverImgUrl = coverImgUrl
  bgManager.singer = singer
  bgManager.src = src
  bgManager.epname = epname
},

  play: function (event) {
    this.data.isPlayingMusic = !this.data.isPlayingMusic
    if (this.data.isPlayingMusic) {
      bgManager.play()
      this.setData({
        button: "../images/pause2.jpg",
      })
      // wx.pauseBackgroundAudio();
      // 设置setData值，前端界面才能读取到isPlayingMusic是值，以下同理
    } else {
      bgManager.pause()
      this.setData({
        button: '../images/play.jpg',
      })
    }
  },


  onMusicTap: function (event) {
    var isPlayingMusic = this.data.isPlayingMusic;
    console.log(isPlayingMusic);
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      // 设置setData值，前端界面才能读取到isPlayingMusic是值，以下同理
      this.setData({
        isPlayingMusic: false
      })

      console.log("pauseBackgroundAudio");
    } else {
      wx.playBackgroundAudio({
        dataUrl: 'http://music.163.com/song/media/outer/url?id=574919767.mp3',
        title: '不要平凡',
        coverImgUrl: '',

      })
      this.setData({
        isPlayingMusic: true
      })
    }
  },
  

  change:function(e){//用于将自己的评论内容加载到数据中
    this.setData({
      comment:e.detail.value
    })
  },

  addStar:function(e){//用于点赞数的增加
    var id = e.currentTarget.dataset.id
    console.log(this.data.moment[id]._id)
    var count = this.data.moment[id].starcount - 1 + 2
    if(count%2==1){
      var cnt = this.data.moment[id].starcount -1 +2
    }
    else{
      var cnt = this.data.moment[id].starcount-1
    }
    var st = 'moment['+id+'].starcount'
    var _like=this.data.like
    this.setData({
        [st]: cnt,
        like:!_like
      })
 
    
  },

submit:function(e){//用于用户提交评论
  if(this.data.comment==""){
    console.log("无评论")
    return
  }
  var that = this
  var app = getApp()
  wx.cloud.callFunction({
    name:"uploadComment",
    data:{
      text: that.data.comment,
      ownerid: that.data.ownerid,
      username: app.globalData.username,
      avatar: app.globalData.avatar,
    },
    success:function(res){
      console.log(that.data.avatar)
      console.log(that.data.username)
      that.data.moment.push({
        avatar: that.data.avatar,
        username: that.data.username,
        starcount: 0,
        text: that.data.comment
      })
      that.setData({
        moment:that.data.moment,
        comment:""
      })
    },
    fail:function(res){
      console.log(res)
    }
  })
},


  mainHandler: function () {
    var that = this;
    console.log(that.audioCtx);
    if (that.audioCtx.paused) {
      that.audioCtx.play();
      that.setData({
        playIcon: '../../images/pause.png'
      })
    } else {
      that.audioCtx.pause();
      that.setData({
        playIcon: '../../images/play.png'
      })
    }
  }, 


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    //这里设置歌曲信息
    console.log(options)
    this.setMusic(decodeURIComponent(options.title), decodeURIComponent(options.coverImgUrl), decodeURIComponent(options.singer), decodeURIComponent(options.epname), decodeURIComponent(options.src))//参数传过来的时候经过了编码，这里需要转码

    this.setData({
      intro:options.text,
      ownerid:id
    })
    //下面获取用户信息

    var that = this
    wx.getUserInfo({
      success:function(res){
        that.setData({
          avatar: res.userInfo.avatarUrl,
          username: res.userInfo.nickName
        })
      }
    })
    wx.cloud.callFunction({//这里调用云函数向服务器请求评论信息
      name:"downloadComment",
      data:{
        ownerid:id
      },
      success:function(res){
        console.log(res)
        that.setData({
          moment:res.result.data,
          comment:""
        })
      },
      fail:function(res){
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    bgManager.pause()
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
    var that = this
    wx.cloud.callFunction({
      name: "updateStarCount",
      data: {
        starcount: that.data.moment[id].starcount,
        id: that.data.moment[id]._id
      },
      success: function (res) {
        console.log(res)
      }
    })
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