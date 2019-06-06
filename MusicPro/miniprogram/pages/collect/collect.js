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
    console.log(event)
    var index = event.currentTarget.dataset.index
    var that = this;
    innerAudioContext.autoplay = true;
    if(innerAudioContext.src != this.data.songlist[index].src)
      that.data.onplay = false
    innerAudioContext.src = this.data.songlist[index].src;
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

  del:function(e){
    var that = this
    var data = e.currentTarget.dataset
    console.log(e)
    wx.showLoading({
      title: '删除中',
    })
    wx.cloud.callFunction({
      name: 'uploadCollection',
      data: {
        type: 'del',
        songid: data.id
      },
      success: function (res) {
        console.log(res)
        that.setData({
          iscollect: true
        })
        wx.cloud.callFunction({
          name: "getCollection",
          data: {
          },
          success: function (res) {
            console.log(res)
            if(res.result.data)
            that.setData({
              songlist: res.result.data
            })
          },
          fail: function (res) {
            console.log(res)
            wx.hideLoading()
          }
        })
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload")
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.cloud.callFunction({
      name:"getCollection",
      data:{
        
      },
      success:function(res){
        wx.hideLoading()
        console.log(res)
        if (res.result.data)
        that.setData({
          songlist:res.result.data
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