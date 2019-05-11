// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const collections = db.collection("favsongs")

  return await collections.add({
    data:{
      songname:event.songname,
      songurl:event.songurl,
      singer:event.singer,
      songpic:event.songpic
    }
  })
}