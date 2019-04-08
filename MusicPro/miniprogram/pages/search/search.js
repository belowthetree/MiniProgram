
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    scrollLeft: 0,
    navbar: ['网易云音乐', 'QQ音乐', '虾米音乐'],
    
    searchResult:[
      {
        icon: 'moreandroid',
        name:'today',
        singer:'tom'
      }, {
        icon: 'moreandroid',
        name: 'today',
        singer: 'tom'
      }, {
        icon: 'moreandroid',
        name: 'today',
        singer: 'tom'
      }, {
        icon: 'moreandroid',
        name: 'today',
        singer: 'tom'
      }, {
        icon: 'moreandroid',
        name: 'today',
        singer: 'tom'
      }, {
        icon: 'moreandroid',
        name: 'today',
        singer: 'tom'
      }, {
        icon: 'moreandroid',
        name: 'today',
        singer: 'tom'
      },

    ],

    musicBox: [
      {
        isShow: true,
        icon: 'playfill',
        name: '下一首播放'
      },
      {
        isShow: true ,
        icon:'favorfill',
        name: '收藏到歌单'
      }, 
      {
        isShow: true,
        icon: 'pulldown',
        name: '下载'
      },
      {
        isShow: true,
        icon: 'newshot',
        name: '评论'
      }, 
      {
        isShow: true,
        icon: 'my',
        name: '歌手：薛之谦'
      },
    ]
    
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
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
    
  },
   showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  onReachBottom: function () {
    console.log('加载更多');
    setTimeout(() => {
      this.setData({
        isHideLoadMore: true,
        searchResult: [
          {
            icon: 'moreandroid',
            name: '123',
            singer: 'tom'
          }, {
            icon: 'moreandroid',
            name: 'today',
            singer: 'tom'
          }, {
            icon: 'moreandroid',
            name: 'today',
            singer: 'tom'
          }, {
            icon: 'moreandroid',
            name: 'today',
            singer: 'tom'
          }, {
            icon: 'moreandroid',
            name: 'today',
            singer: 'tom'
          }, {
            icon: 'moreandroid',
            name: 'today',
            singer: 'tom'
          }, {
            icon: 'moreandroid',
            name: 'today',
            singer: 'tom'
          },
          {
            icon: 'moreandroid',
            name: 'today',
            singer: 'tom'
          },
          {
            icon: 'moreandroid',
            name: 'today',
            singer: 'tom'
          },
          {
            icon: 'moreandroid',
            name: 'today',
            singer: 'tom'
          },
        ],
      })
    }, 500)
  },



})

