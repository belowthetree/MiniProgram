//app.js
App({
  data:{
    songIndex:'0',
    listIndex:'2',
    songlist: [],
  },
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    var that = this
    wx.login({
      success:function(){
        wx.getSetting({
          success:function(res){
            console.log(res)
            wx.getUserInfo({
              success: function (res) {
                console.log("get")
                that.globalData = {
                  username: res.userInfo.nickName,
                  avatar: res.userInfo.avatarUrl
                }
              }
            })
          }
        })
      }
    })

    this.globalData = {
      username:"none",
      avartar:"",
    }
  }
})
