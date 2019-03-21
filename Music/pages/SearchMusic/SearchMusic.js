// pages/SearchMusic/SearchMusic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "MusicName":"艳阳天",
    hide:false,
    music:{

    },
  },

  Input:function(e){
    //每次输入发生变化，就会将变化传递到placename变量里，这里会在控制台输出它的值
    this.setData({
      placename:e.detail.value
    })
    console.log(this.data.placename+"input")
  },
  play:function(event){
    //以下定义一个背景音乐管理器，一般用这个播放音乐，它需要定义标题、专辑名、歌手、图片、歌曲音源，具体可以查看官方文档解释
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    console.log(this.data.music[0].id)
    backgroundAudioManager.title = this.data.music[0].name
    backgroundAudioManager.epname = this.data.music[0].name
    backgroundAudioManager.singer = this.data.music[0].artists[0].name
    backgroundAudioManager.coverImgUrl = this.data.music[0].album.picUrl
    backgroundAudioManager.src = 'http://music.163.com/song/media/outer/url?id=' + this.data.music[0].id+'.mp3'

  },
  Search: function (event) {
    if (this.data.placename != "")
      this.data.MusicName = this.data.placename
    console.log(this.data.MusicName)
    var that = this
    wx.request({
      //这里发送请求，因为包含中文，所以需要编码
      url: 'http://music.163.com/api/search/pc/?type=1&limit=10&s=' + encodeURIComponent(that.data.MusicName),
      header: {
        'content-type': 'application/x-www-form-urlencoded;'
      },
      //这里是网络请求成功后执行的函数
      success:function(res){
        console.log(res.data)
        that.setData({
          music:res.data.result.songs,
          hide:true
        })
        
      }
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