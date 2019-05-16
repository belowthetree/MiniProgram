// pages/list/list.js
const app = getApp();
const time = new Date();
var util = require('../../utils/util.js')
const innerAudioContext = wx.createInnerAudioContext()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['歌曲', '详情'],
    currentTab: 0,
    dataNow: '',
    onplay: true,
    songlist: [],
    url_ye: '',
    year: time.getMonth,
    month: time.getDate,
    chooseSize: false,
    animationData: {}
  },

  SetSize(e) {
    this.setData({
      size: e.detail.value
    })
  },


  clickmusic: function (event) {
    app.data.songIndex = event.currentTarget.dataset.index;
    console.log(event.currentTarget.dataset.index)
    innerAudioContext.destroy()
    wx.navigateTo({
      url: '/pages/play/play',
    })
  },  //点击歌曲名字跳转页面


  playmusic: function (event) {
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
  },

  // 导航切换监听
  navbarTap: function (e) {
    this.setData({
      currentTab: idx
    })
  },
  bindButtonTap() {
    this.setData({
      focus: true
    })
  },
  bindTextAreaBlur(e) {
    console.log(e.detail.value)
  },
  bindFormSubmit(e) {
    console.log(e.detail.value.textarea)
  },

// 底部弹窗
  chooseSezi: function (e) {
    // 用that取代this，防止不必要的情况发生
    console.log("tap")
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },
  hideModal:function(e)
  {
    var that=this;
    that.setData({
      chooseSize:false
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload")
    var that = this
    wx.cloud.callFunction({
      name:"downloadMyShare",
      data:{
        index:0
      },
      success:function(res){
        console.log(res)
        that.setData({
          songlist:res.result.data
        })
      },
      fail:function(res){
        console.log(res)
      }
    })

    /*var that = this;
    var TIME = new Date();
    // util.formatTime(new Data());
    that.setData({ time: TIME, });
    console.log(app.data.listIndex)
    if (app.data.listIndex == 1) {
      that.setData({
        url_ye: 'https://api.itooi.cn/music/netease/songList?key=579621905&id=3778678&limit=10&offset=0'
      })
    }
    else {
      if (app.data.listIndex == 2) {
        that.setData({ url_ye: 'https://api.itooi.cn/music/kuwo/songList?key=579621905&id=1082685106' })
      }
      else {
        that.setData({ url_ye: 'https://api.itooi.cn/music/tencent/songList?key=579621905&id=6944236671' })
      }
    }

    wx.request({
      url: that.data.url_ye,
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        app.data.songlist = res.data.data.songs
        console.log(res)
        that.setData({
          songlist: res.data.data.songs
        })

      },
      fail: function (res) { },
      complete: function (res) { },
    })*/
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