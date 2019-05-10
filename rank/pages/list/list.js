// pages/list/list.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['歌曲', '详情'],
    currentTab: 0,
    songsname:[
      {
        name: "红豆",
        singer:"Faye Wong",
        hot:"120%"
      },
      {
        name: "清平调",
        singer: "Faye Wong",
        hot:"108%"
      },
      {
        name: "你在终点等我",
        singer: "Faye Wong",
        hot:"100%"
      },
      {
        name: "传奇",
        singer: "Faye Wong",
        hot:"96%"
      },
      {
        name: "因为爱情",
        singer: "Faye Wong",
        hot:"89%"
      },
      {
        name: "暧昧",
        singer: "Faye Wong",
        hot:"78%"
      }
    ]
  },

  
    SetSize(e) {
    this.setData({
      size: e.detail.value
    })
  },



  clickmusic: function (event) {
    wx.navigateTo({
      url: '/pages/play/play',
    })
  },  //点击歌曲名字跳转页面
  playmusic:function(event){
    wx.navigateTo({
      url: '/pages/play/play',
    })
  }, //全部播放按钮函数
 


  // 导航切换监听
  navbarTap: function (e) {
    console.debug(e);
    this.setData({
      currentTab: e.currentTarget.dataset.idx
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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