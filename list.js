// pages/list/list.js
const app = getApp();
const innerAudioContext = wx.createInnerAudioContext()
const bgm = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onplay: true,
    songlist: null,
    list_pic:''
  },

  clickmusic: function (event) {
    app.data.songIndex = event.currentTarget.dataset.index;
    
    bgm.stop();
   innerAudioContext.destroy();
    wx.navigateTo({
      url: '/pages/play/play',

    })
  },  

  playallmusic:function(){
    var that = this;
    innerAudioContext.autoplay = true;
    innerAudioContext.src = this.data.songlist[0].url;
    if (that.data.onplay) {
      innerAudioContext.play()
      that.setData({ onplay: false })

    }
    else {
      innerAudioContext.pause();
      that.setData({ onplay: true })
    }
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
        innerAudioContext.stop();
        innerAudioContext.src = app.data.songlist[app.data.songIndex].url;
        innerAudioContext.play(() => {
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that=this;
    wx.request({
      url: 'https://v1.itooi.cn/tencent/songList?id=' + options.sheetId + '&pageSize=100&page=0',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({ list_pic: res.data.data["0"].logo})
        for (let i = 0; i < res.data.data["0"].songlist.length; i++) {
          var musicId = res.data.data[0].songlist[i].mid
          that.setData({
            //数组单项赋值，通过 ES6 的 模板字符串 和 属性名表达式，注意在项目配置里面开启ES6 转 ES5
            //注意不是单引号'，是`
            [`songlist[${i}].singer`]: res.data.data["0"].songlist[i].singer["0"].name,
            [`songlist[${i}].name`]: res.data.data["0"].songlist[i].title,
            [`songlist[${i}].songId`]: musicId,
            [`songlist[${i}].url`]: 'https://v1.itooi.cn/tencent/url?id=' + musicId + '&quality=128',
            [`songlist[${i}].pic`]: 'https://v1.itooi.cn/tencent/pic?id=' + musicId,
            [`songlist[${i}].lrc`]: 'https://v1.itooi.cn/tencent/lrc?id=' + musicId,


          })
        }
        app.data.songlist = that.data.songlist;
      },
      fail: function (res) { },
      complete: function (res) { },

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