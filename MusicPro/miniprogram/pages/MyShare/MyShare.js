// pages/test2/test2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    moment: []
  },
  navigate: function (e) {//跳转前要先转码，避免一些特殊字符的影响
    console.log(e)
    var title = encodeURIComponent(e.currentTarget.dataset.title)
    var coverImgUrl = encodeURIComponent(e.currentTarget.dataset.coverImgUrl)
    var epname = encodeURIComponent(e.currentTarget.dataset.title)
    var src = encodeURIComponent(e.currentTarget.dataset.src)
    var singer = encodeURIComponent(e.currentTarget.dataset.singer)
    wx.navigateTo({
      url: '/pages/shareDetail/shareDetail?title=' + title + '&coverImgUrl=' + coverImgUrl + '&epname=' + epname + '&src=' + src + '&singer=' + singer + '&id=' + e.currentTarget.dataset.id + "&text=" + e.currentTarget.dataset.text,
    })
  },

  addUpdate: function (e) {
    var that = this
    wx.cloud.callFunction({
      name: 'downloadShare',
      data: {
        index: that.data.index
      },
      success: function (res) {
        that.data.index++
        if (!res.result.data) {
          wx.showToast({
            title: '没有新内容',
            icon: 'none'
          })
          return
        }
        wx.hideLoading()
        var len = res.result.data.length
        for (let i = 0; i < len; i++) {
          res.result.data[i]["intro"] = res.result.data[i].name + "分享了这首歌"
        }
        console.log(res)
        var tmp = that.data.moment.concat(res.result.data)
        console.log(res)
        that.setData({
          moment: tmp
        })
      }
    })
  },

  update: function (e) {
    wx.showLoading({
      title: '正在刷新',
    })
    this.setData({
      index: 0
    })
    var that = this
    wx.cloud.callFunction({
      name: 'downloadShare',
      data: {
        index: that.data.index
      },
      success: function (res) {
        that.data.index++
        console.log(res)
        if (!res.result.data) {
          wx.showToast({
            title: '没有内容',
            icon: 'none'
          })
          return
        }
        var len = res.result.data.length
        for (let i = 0; i < len; i++) {
          res.result.data[i]["intro"] = res.result.data[i].name + "分享了这首歌"
        }
        console.log(res)
        that.setData({
          moment: res.result.data
        })
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
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'downloadMyShare',
      data: {
        index: that.data.index
      },
      success: function (res) {
        console.log(res)
        that.data.index++
        wx.hideLoading()
        var len = res.result.data.length
        for (let i = 0; i < len; i++) {
          res.result.data[i]["intro"] = res.result.data[i].name + "分享了这首歌"
        }
        console.log(res)
        that.setData({
          moment: res.result.data
        })
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