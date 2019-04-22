// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    pic: 'https://p1.music.126.net/_IFf2bFdhZBY8xoY6RKSQw==/109951164000212690.jpg',
    intro:"just like this",
    moment:[
      //这里的数据在OnLoad函数中获取

      ],
    comment:"",
    ownerid:"o1rPE5Ii6z3tZ5hNLOMxO6zNZVxk",
    
  },

  addStar:function(e){
    var id = e.currentTarget.dataset.id
    console.log(this.data.moment[id]._id)
    var cnt = this.data.moment[id].starcount - 1 + 2
    var st = 'moment['+id+'].starcount'
    this.setData({
      [st]:cnt
    })
  },

submit:function(e){
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
      console.log(res)
    },
    fail:function(res){
      console.log(res)
    }
  })
},

comment:function(e){
  this.setData({
    comment:e.detail.value
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
    var that = this
    wx.cloud.callFunction({//这里调用云函数向服务器请求评论信息
      name:"downloadComment",
      data:{
        ownerid:that.data.ownerid
      },
      success:function(res){
        console.log(res)
        that.setData({
          moment:res.result.data
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