// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const db = cloud.database()
  const comm = db.collection("shareText")
  return await comm.add({
    data:{
      text:event.text,
      ownerid:event.ownerid,
      date:db.serverDate,
      username:event.username,
      avatar:event.avatar,
      starcount:0
    }
  })
}