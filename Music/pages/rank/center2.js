Page({
data:{
  rank_path: [
    { rank_path: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8%C2%ACice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923',
    rank_id=1},
    {
      rank_path:'https://api.itooi.cn/music/netease/songList?key=579621905&id=3778678&limit=10&offset=0',
      rank_id=2,
    },
    {
      rank_path:'https://api.itooi.cn/music/kuwo/songList?key=579621905&id=1082685106',
      rank_id=3,
    }


    ]
},
onLoad: function () {
  var that = this;
  wx.request({
    url: 'https://api.itooi.cn/music/kuwo/songList?key=579621905&id=1082685106',
    data: '',
    header: {},
    method: 'GET',
    dataType: 'json',
    success: function (res) {

      that.setData({
        songlist: res.data.data.songs
      })
        console.log(res)
      },
      fail: function (res) { },
    complete: function (res) { },
    })

}
})