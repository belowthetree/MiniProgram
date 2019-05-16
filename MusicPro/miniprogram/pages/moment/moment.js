// pages/test2/test2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    moment: [
      {
        id: 0,
        pride: 2,
        username: "小明",
        coverImgUrl: 'https://p1.music.126.net/zF9HHBntAoqM_DJsEJkeDA==/109951164027525982.jpg',
        src: "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",
        singer: "许巍",
        title: "此时此刻",
        intro: "小可分享了《春歌》",
        content: "每一次看这歌词，就会让我想起自己的故事",
      },
      {
        id: 1,
        pride: 2,
        username: "小hong",
        coverImgUrl: 'https://p1.music.126.net/zF9HHBntAoqM_DJsEJkeDA==/109951164027525982.jpg',
        src: "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",
        singer: "许巍",
        title: "此时此刻",
        intro: "小可分享了《春歌》",
        content: "每一次看这歌词，就会让我想起自己的故事",
      },
      {
        id: 2,
        pride: 2,
        username: "小明",
        coverImgUrl: 'https://p1.music.126.net/zF9HHBntAoqM_DJsEJkeDA==/109951164027525982.jpg',
        src: "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",
        singer: "许巍",
        title: "此时此刻",
        intro: "小可分享了《春歌》",
        content: "每一次看这歌词，就会让我想起自己的故事",
      },
      {
        id: 3,
        pride: 2,
        username: "小明",
        coverImgUrl: 'https://p1.music.126.net/zF9HHBntAoqM_DJsEJkeDA==/109951164027525982.jpg',
        src: "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",
        singer: "许巍",
        title: "此时此刻",
        intro: "小可分享了《春歌》",
        content: "每一次看这歌词，就会让我想起自己的故事",
      }, {
        id: 4,
        pride: 2,
        username: "小明",
        coverImgUrl: 'https://p1.music.126.net/zF9HHBntAoqM_DJsEJkeDA==/109951164027525982.jpg',
        src: "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",
        singer: "许巍",
        title: "此时此刻",
        intro: "小可分享了《春歌》",
        content: "每一次看这歌词，就会让我想起自己的故事",
      }, {
        id: 5,
        pride: 2,
        username: "小明",
        coverImgUrl: 'https://p1.music.126.net/zF9HHBntAoqM_DJsEJkeDA==/109951164027525982.jpg',
        src: "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",
        singer: "许巍",
        title: "此时此刻",
        intro: "小可分享了《春歌》",
        content: "每一次看这歌词，就会让我想起自己的故事",
      }, {
        id: 6,
        pride: 2,
        username: "小明",
        coverImgUrl: 'https://p1.music.126.net/zF9HHBntAoqM_DJsEJkeDA==/109951164027525982.jpg',
        src: "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",
        singer: "许巍",
        title: "此时此刻",
        intro: "小可分享了《春歌》",
        content: "每一次看这歌词，就会让我想起自己的故事",
      }, {
        id: 7,
        pride: 2,
        username: "小明",
        coverImgUrl: 'https://p1.music.126.net/zF9HHBntAoqM_DJsEJkeDA==/109951164027525982.jpg',
        src: "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",
        singer: "许巍",
        title: "此时此刻",
        intro: "小可分享了《春歌》",
        content: "每一次看这歌词，就会让我想起自己的故事",
      }, {
        id: 8,
        pride: 2,
        username: "小明",
        coverImgUrl: 'https://p1.music.126.net/zF9HHBntAoqM_DJsEJkeDA==/109951164027525982.jpg',
        src: "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",
        singer: "许巍",
        title: "此时此刻",
        intro: "小可分享了《春歌》",
        content: "每一次看这歌词，就会让我想起自己的故事",
      },
    ]

  },
  navigate: function (e) {//跳转前要先转码，避免一些特殊字符的影响
    console.log(e)
    var title = encodeURIComponent(e.currentTarget.dataset.title)
    var coverImgUrl = encodeURIComponent(e.currentTarget.dataset.coverImgUrl)
    var epname = encodeURIComponent(e.currentTarget.dataset.title)
    var src = encodeURIComponent(e.currentTarget.dataset.src)
    var singer = encodeURIComponent(e.currentTarget.dataset.singer)
    wx.navigateTo({
      url: '/pages/shareDetail/shareDetail?title=' + title + '&coverImgUrl=' + coverImgUrl + '&epname=' + epname + '&src=' + src + '&singer=' + singer + '&id=' + e.currentTarget.dataset.id,
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
      name: 'downloadShare',
      data: {
        index: that.data.index
      },
      success: function (res) {
        that.data.index++
        wx.hideLoading()
        console.log(res)
        that.setData({
          moment:res.result.data
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