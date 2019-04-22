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
        {
          id:0,
          pride:2,
          username:"小明",
          userurl:'http://img.9553.com/uploadfile/2018/0122/20180122100558180.jpg',
        intro:"每一次看这歌词，就会让我想起自己的故事",
        },
        {
          id:1,
          pride: 2,
          username: "小hong",
          userurl: 'http://img5.imgtn.bdimg.com/it/u=132472313,1581637746&fm=15&gp=0.jpg',
          intro: "这种淡淡的旋律直击心灵，难以忘怀",
        },
        {
          id:2,
          pride: 2,
          username: "小lan",
          userurl: 'http://imgsrc.baidu.com/forum/w=580/sign=8d65a30af0edab6474724dc8c737af81/02a1462309f79052b1489aff07f3d7ca7acbd5a5.jpg',
          intro: "这首歌是原创吗？",
        },
      
      ],
    comment:"",
    ownerid:"o1rPE5Ii6z3tZ5hNLOMxO6zNZVxk",
      
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
    wx.cloud.callFunction({
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