// miniprogram/pages/community/community.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  test:function(e){
    /*wx.cloud.init()
    const db = wx.cloud.database()
    const users = db.collection("user")
    users.add({
      data: {
        
      },
      success(res){
        console.log(res)
      }
    })
    wx.cloud.callFunction({
      name:"test",
      data:{},
      success:function(res){
        console.log(res)
      },
      fail:function(res){
        console.log(res)
      }
    })
    console.log("userinfo")
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo)
            }
          })
        }
      }
    })*/
    console.log("login")
    wx.cloud.callFunction({
      name:"login",
      data:{},
      success:function(res){
        console.log(res)
      },
      fail:function(res){
        console.log(res)
      },
    })
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