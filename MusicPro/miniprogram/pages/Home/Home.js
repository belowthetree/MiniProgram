// miniprogram/pages/Home/Home.js
const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    imgpath:"",
    username: "",
    userinfo:{},
    data:"",
  },

  myshare: function (e) {
    wx.navigateTo({
      url: '/pages/MyShare/MyShare',
    })
  },

  mycollect:function(e){
    wx.navigateTo({
      url: '/pages/collect/collect',
    })
  },

  onGotUserInfo:function(e){
    wx.showLoading({
      title: '登陆中',
    })
    var that = this
    wx.getUserInfo({
      success:function(res){
        wx.hideLoading()
        console.log(res)
        that.setData({
          imgpath:res.userInfo.avatarUrl,
          username:res.userInfo.nickName
        })
        app.globalData = {
          username: res.userInfo.nickName,
          avatar: res.userInfo.avatarUrl
        }
      }
    })
  },
  getshare:function(e){
    wx.cloud.callFunction({
      name:"downloadShare",
      data:{},
      success:function(res){
        console.log(res)
      },
      fail:function(res){
        console.log(res)
      }
    })
  },

  share:function(e){
    wx.cloud.callFunction({
      name:"uploadShare",
      data:{
        url:"newurl",
        name:"newname",
        imgpth:"newimgpth"
      },
      success:function(res){
        console.log(res)
      }
    })
  },

  login:function(e){
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                imgpath: res.userInfo.avatarUrl,
                userinfo: res.userInfo
              })
              console.log(res.userInfo)
            }
          })
        }
      }
    })
    console.log("login")
    wx.cloud.callFunction({
      name: "login",
      data: {},
      success: function (res) {
        console.log(res)
      }
    })
    wx.cloud.callFunction({
      name: "uploadCollection",
      data: {
        imgpath: "www.baidu.com",
        name: "newname",
        url: "newurl"
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    wx.login({
      success: function () {
        wx.getSetting({
          success: function (res) {
            console.log(res)
            wx.getUserInfo({
              success: function (res) {
                console.log("get")
                that.setData({
                  imgpath: res.userInfo.avatarUrl,
                  username: res.userInfo.nickName
                })
                app.globalData = {
                  username: res.userInfo.nickName,
                  imgpath: res.userInfo.avatarUrl
                }
              }
            })
          }
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '用户界面',
    })
    if(!app.globalData.avatar){
      var that = this
      wx.getUserInfo({
        success:function(res){
          that.setData({
            imgpath: res.userInfo.avatarUrl,
            username: res.userInfo.nickName,
          })
        }
      })
    }
    
    //console.log(this.data.imgpath)
    //console.log(this.data.username)
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