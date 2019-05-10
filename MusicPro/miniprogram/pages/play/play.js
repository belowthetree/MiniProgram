// pages/play/play.js
var app=getApp()
const innerAudioContext = wx.createInnerAudioContext()
const bgm = wx.getBackgroundAudioManager();
Page({
  data: {
    onplay: true,
    order:1,
    // time_song:app.data.songlist[app.data.songIndex].time
  },
   addLike: function () {
    wx.cloud.callFunction({
      name: "updataLike",
      data: {
        songname: app.data.songlist[app.data.songIndex].name,
        songurl: app.data.songlist[app.data.songIndex].url,
        singer: app.data.songlist[app.data.songIndex].singer,
        songpic: app.data.songlist[app.data.songIndex].pic

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


  playAndtime: function(){
    var that = this;
    innerAudioContext.autoplay = true;
    innerAudioContext.stop();
    innerAudioContext.src = app.data.songlist[app.data.songIndex].url;
    innerAudioContext.play(() => {
    })
    innerAudioContext.onTimeUpdate(() => {
      var duration = innerAudioContext.duration;
      var offset = innerAudioContext.currentTime;
      var currentTime = parseInt(innerAudioContext.currentTime);
      var min = "0" + parseInt(currentTime / 60);
      var max = parseInt(innerAudioContext.duration);
      var sec = currentTime % 60;
      if (sec < 10) {
        sec = "0" + sec;
      };
      var starttime = min + ':' + sec;   /*  00:00  */
      that.setData({
        offset: currentTime,
        starttime: starttime,
        max: max,
        changePlay: true
      })
    })
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
      this.playAndtime()
   }
   else{
     
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
      this.playAndtime();
    }
  },
 
  

 choseOrder: function(){
   var that=this;
   that.setData({
     order:++that.data.order
   })
   if(that.data.order%3==0){
     innerAudioContext.onEnded(() => {
       that.setData({ onplay: true })
       if (app.data.songIndex == app.data.songlist.length - 1) {
         innerAudioContext.stop();
         this.data.onplay = false;
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
   }
   else{
     if(that.data.order%3 == 1){
       app.data.songIndex = parseInt((Math.random() * (app.data.songlist.length)));
      
     }
     else{
      innerAudioContext.loop=true;
     }
   }
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
    innerAudioContext.onTimeUpdate(() => {
      var time_now=innerAudioContext.currentTime;
    })
       innerAudioContext.onEnded(()=>{
         that.setData({onplay:true})
         if (app.data.songIndex == app.data.songlist.length - 1) {
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
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var time = innerAudioContext.currentTime;
    innerAudioContext.destroy();
   
   
    bgm.start = time;
    bgm.title = app.data.songlist[app.data.songIndex].name;
    bgm.coverImgUrl = app.data.songlist[app.data.songIndex].pic;
    bgm.src = app.data.songlist[app.data.songIndex].url;
    
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var time = innerAudioContext.currentTime;
    innerAudioContext.destroy();
    bgm.startTime = time;
    console.log(time);
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