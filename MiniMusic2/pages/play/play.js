// pages/play/play.js
var util = require('../../utils/util.js')
const Lyric = require('../../utils/lyric.js')
var app = getApp()
const bgMusic = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {

/**歌词 有关部分*/
    currentLyric: null,
    currentLineNum: 0,
    toLineNum: -1,




    count: 0,
    score: 61,
    
    animation: '',
    isplayed: true, //是否播放
    iscollect:true,
    isorder:false,
    name:"此时此刻",
    singer:"—许巍—",
    starttime: '00:00', //正在播放时长
    duration: '06:41',   //总时长
    src: "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46"
    
  },
  listenerButtonPlay: function () {
    var that = this
    //bug ios 播放时必须加title 不然会报错导致音乐不播放
    bgMusic.title = '此时此刻'
    bgMusic.epname = '此时此刻'
    bgMusic.src = that.data.src;
    if (that.data.isplayed) {
      bgMusic.pause()
      that.setData({
          isplayed: false
      })
    } else {
      bgMusic.play()
      this.setData({
        isplayed: true,
      })
    }
    bgMusic.onTimeUpdate(() => {
      //bgMusic.duration总时长  bgMusic.currentTime当前进度
      console.log(bgMusic.currentTime)
      var duration = bgMusic.duration;
      var offset = bgMusic.currentTime;
      var currentTime = parseInt(bgMusic.currentTime);
      var min = "0" + parseInt(currentTime / 60);
      var max = parseInt(bgMusic.duration);
      var sec = currentTime % 60;
      if (sec < 10) {
        sec = "0" + sec;
      };
      var starttime = min + ':' + sec;   /*  00:00  */
      that.setData({
        offset: currentTime,
        starttime: starttime,
        max: max,
        changePlay: true
      })
    })
    //播放结束
    bgMusic.onEnded(() => {
      that.setData({
        starttime: '00:00',
        isplayed: false,
        offset: 0
      })
      console.log("音乐播放结束");
    })
    bgMusic.play();
    that.setData({
      isplayed: true,
    })
  },
  //暂停播放
  listenerButtonPause() {
    var that = this
    bgMusic.pause()
    that.setData({
      isplayed: true,
    })
  },
  listenerButtonStop() {
    var that = this
    bgMusic.stop()
  },
  // 进度条拖拽
  sliderChange(e) {
    var that = this
    var offset = parseInt(e.detail.value);
    bgMusic.play();
    bgMusic.seek(offset);
    that.setData({
      isplayed: true,
    })
  },
  // 页面卸载时停止播放
  onUnload() {
    var that = this
    that.listenerButtonStop()//停止播放
    console.log("离开")
  },

  playmusic () {
    this.audioCtx.play()
  },
  //收藏音乐图标
  collectmusic:function(){
    if(this.data.iscollect){
      this.setData({
        iscollect: false
      })
    }else{
      this.setData({
        iscollect: true
      })
    }
  },
  playaction: function () {
    if(this.data.isplayed){
      
      this.setData({
        isplayed: false
      })
    }else{
    
      this.setData({
        isplayed: true
      })
    }

  },
  //顺序播放按钮
  playorder:function(){
    if (this.data.isorder) {

      this.setData({
        isorder: false
      })
    } else {

      this.setData({
        isorder: true
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    bgMusic.autoplay = true;
  //  bgMusic.src='http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46';
    bgMusic.play();
    bgMusic.onEnded(() => {
      that.setData({
        starttime: '00:00',
        isplayed: false,
        offset: 0
      })
      console.log("音乐播放结束");
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
    console.log('index---------onShow()')
    this.animation = wx.createAnimation({
      duration: 1400,
      timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,
      transformOrigin: '50% 50% 0',
      success: function (res) {
        console.log("res")
      }
    })
  },
  rotateAni: function (n) {
    console.log("rotate==" + n)
    this.animation.rotate(180 * (n)).step()
    this.setData({
      animation: this.animation.export()
    })
  },



  // 获取歌词
  _getLyric: function (currentSong) {
    const _this = this
    this._getBackPlayfileName().then((res) => {
      const nowMid = res.ret.split('.')[0].replace('C400', '')
      if (!(nowMid === currentSong.mid)) {
        if (this.data.currentLyric) {
          //this.data.currentLyric.stop && this.data.currentLyric.stop()
        }
        _this._getLyricAction(currentSong)
      }
    }).catch(() => {
      _this._getLyricAction(currentSong)
    })
  },

  // 获取处理歌词
  _getLyricAction: function (currentSong) {
    song.getLyric(currentSong.mid).then((res) => {
      if (res.data.showapi_res_body.ret_code == 0) {
        const lyric = this._normalizeLyric(res.data.showapi_res_body.lyric)
        const currentLyric = new Lyric(lyric)
        this.setData({
          currentLyric: currentLyric
        })
      } else {
        this.setData({
          currentLyric: null,
          currentText: ''
        })
      }
    })
  },
  // 去掉歌词中的转义字符
  _normalizeLyric: function (lyric) {
    return lyric.replace(/&#58;/g, ':').replace(/&#10;/g, '\n').replace(/&#46;/g, '.').replace(/&#32;/g, ' ').replace(/&#45;/g, '-').replace(/&#40;/g, '(').replace(/&#41;/g, ')')
  },
  // 歌词滚动回调函数
  handleLyric: function (currentTime) {
    let lines = [{ time: 0, txt: '' }], lyric = this.data.currentLyric, lineNum
    lines = lines.concat(lyric.lines)
    for (let i = 0; i < lines.length; i++) {
      if (i < lines.length - 1) {
        let time1 = lines[i].time, time2 = lines[i + 1].time
        if (currentTime > time1 && currentTime < time2) {
          lineNum = i - 1
          break;
        }
      } else {
        lineNum = lines.length - 2
      }
    }
    this.setData({
      currentLineNum: lineNum,
      currentText: lines[lineNum + 1] && lines[lineNum + 1].txt
    })

    let toLineNum = lineNum - 5
    if (lineNum > 5 && toLineNum != this.data.toLineNum) {
      this.setData({
        toLineNum: toLineNum
      })
    }
  },
  _formatTime: function (interval) {
    interval = interval | 0
    const minute = interval / 60 | 0
    const second = this._pad(interval % 60)
    return `${minute}:${second}`
  },
  /*秒前边加0*/
  _pad(num, n = 2) {
    let len = num.toString().length
    while (len < n) {
      num = '0' + num
      len++
    }
    return num
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