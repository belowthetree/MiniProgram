// pages/list/list.js
const app = getApp();
const time=new Date();
var util = require('../../utils/util.js')
const innerAudioContext = wx.createInnerAudioContext()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['歌曲', '详情'],
    currentTab: 0,
    dataNow:'',
    onplay: true,
    songlist : [],
    url_ye:'',
    year: time.getMonth,
    month:time.getDate,
  },
  
    SetSize(e) {
    this.setData({
      size: e.detail.value
    })
  },
  
  collect: function (e) {
    var data = e.currentTarget.dataset
    wx.cloud.callFunction({
      name: "uploadCollection",
      data: {
        src:data.src,
        coverImgUrl:data.coverImgUrl,
        singer:data.singer,
        title:data.title
      },
      success:function(res){
        console.log(res)
      }
    })
  },

  clickmusic: function (event) {
    app.data.songIndex =event.currentTarget.dataset.index;
    console.log(event.currentTarget.dataset.index)
    innerAudioContext.destroy()
    wx.navigateTo({
      url: '/pages/play/play',

    })
  },  //点击歌曲名字跳转页面


  playmusic:function(event){
    var that=this;
    innerAudioContext.autoplay = true;
    innerAudioContext.src = this.data.songlist[0].url;
    if(that.data.onplay){
    innerAudioContext.play()
      that.setData({ onplay: false })
    
    }
    else{
      innerAudioContext.pause();
      that.setData({onplay : true})
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      var that = this;
      var TIME = new Date();
      // util.formatTime(new Data());
      that.setData({time:TIME,});
    console.log(app.data.listIndex)
      if(app.data.listIndex == 1){
        that.setData({
          url_ye: 'https://api.itooi.cn/music/netease/songList?key=579621905&id=3778678&limit=10&offset=0'})
      }
      else{
            if(app.data.listIndex == 2){
              that.setData({ url_ye: 'https://api.itooi.cn/music/kuwo/songList?key=579621905&id=1082685106'})
            }
            else{
              that.setData({ url_ye: 'https://api.itooi.cn/music/tencent/songList?key=579621905&id=6944236671'}) 
            }
      }
  
      wx.request({
        url: that.data.url_ye,
        header: {},
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          app.data.songlist= res.data.data.songs
          console.log(res)
          that.setData({
            songlist: res.data.data.songs
          })
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