// pages/play/play.js
var app=getApp()
const innerAudioContext = wx.createInnerAudioContext()
Page({
  data: {
    onplay: true
  },

  pauseSong: function () {
    if(this.data.onplay){
    innerAudioContext.pause();
    this.data.onplay=false;
    }
    else{
      innerAudioContext.play();
      this.data.onplay=true;
    }
  },


  lastSong: function(){
    if(app.data.songIndex)
    {
      app.data.songIndex--;
      innerAudioContext.stop();
      innerAudioContext.src=app.data.songlist[app.data.songIndex].url;
      innerAudioContext.play();
   }
   else{
     innerAudioContext.stop();
     this.data.onplay=false;
      wx.showToast({
        title: '没有更多歌曲了',
        duration: 1000,
        mask: true
      })
   }

  },

  nextSong: function(){
    if(app.data.songIndex==app.data.songlist.length-1){
      innerAudioContext.stop();
      this.data.onplay = false;
       wx.showToast({
        title: '没有更多歌曲了',
        duration: 1000,
        mask: true
      })
    }
    else{
      app.data.songIndex++;
      innerAudioContext.stop();
      innerAudioContext.src=app.data.songlist[app.data.songIndex].url;
      innerAudioContext.play();
    }
  },

  addLike: function(){
    wx.cloud.callFunction({
      name: "updataLike",
      data: {
        songname:app.data.songlist[app.data.songIndex].name,
        songurl:app.data.songlist[app.data.songIndex].url,
        singer:app.data.songlist[app.data.songIndex].singer,
        songpic:app.data.songlist[app.data.songIndex].pic

      },
      success: function (res) {
        wx.showToast({
          title: '添加成功',
          duration: 1000,
          mask: true
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
      var that = this;
  
      innerAudioContext.autoplay = true;
      innerAudioContext.src = app.data.songlist[app.data.songIndex].url;
        innerAudioContext.play(() => {
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