// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const data = event
  const db = cloud.database()
  const colls = db.collection("collections")
  const src = decodeURIComponent(event.src)
  const singer = decodeURIComponent(event.singer)
  const coverImgUrl = decodeURIComponent(event.coverImgUrl)
  const title = decodeURIComponent(event.title)
  /*return await colls.add({
    data:{
    openid:wxContext.OPENID,
    src:src,
    coverImgUrl:coverImgUrl,
    singer:singer,
    title:title
    }
  })*/
  if(event.type=='add')
    return await colls.add({
      data: {
        openid: wxContext.OPENID,
        songid: event.songid,
        src: event.url,
        coverImgUrl: event.pic,
        title: event.name,
        singer: event.singer,
        epname: event.title
      }
    })
  else{
    return await colls.where({
      songid:event.songid
    }).remove()
  }
}