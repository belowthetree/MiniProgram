// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location:"guangzhou",
  },

  input:function(e){
    this.setData({
      location: e.detail.value
    })
  },

  myevent:function(e){
    console.log("myevent")
  },

  Click:function(e){
    var that = this
    wx.request({
      url: 'https://api.seniverse.com/v3/weather/now.json?key=smtq3n0ixdggurox&location='+that.data.location+'&language=zh-Hans&unit=c',
      header: {
        "content-type": "json"
      },

      success: function (res) {
        console.log(res)
        that.setData({
          weather:res.data.results[0]
        })
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
/*
var map = require('../../bmap-wx.min.js');

Page({
  data:{
    ak:"你的AK",
    // 用于保存当日天气信息
    TayData:'',
    // 用于保存未来天气信息
    futureWeather:[]
  },
  onLoad:function(options){
    var that = this;
    // 新建bmap对象
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });

    var success = function(data) {
      console.log(data);

      var weatherData = data.currentWeather[0];
      var futureWeather = data.originalData.results[0].weather_data;
      console.log(futureWeather);
      weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' +'日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' +'天气：' + weatherData.weatherDesc + '\n' +'风力：' + weatherData.wind + '\n';
      that.setData({
        TayData: weatherData,
        futureWeather: futureWeather
      });
    }

    // 发起weather请求
    BMap.weather({
      fail: fail,
      success: success
    });
  }
})*/