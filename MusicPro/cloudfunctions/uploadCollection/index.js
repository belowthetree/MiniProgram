// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const data = event
  const db = cloud.database()
  const colls = db.collection("collections")
  return await colls.add({
    data:{
    openid:wxContext.OPENID,
    src:event.src,
    coverImgUrl:event.coverImgUrl,
    singer:event.singer,
    title:event.title
    }
  })
}