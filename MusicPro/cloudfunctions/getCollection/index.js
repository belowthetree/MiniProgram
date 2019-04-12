// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const db = cloud.database()
  const users = db.collection("user")
  const user = await users.where({
    openid:wxContext.OPENID
  }).get()
  return user.data[0].favourites
}