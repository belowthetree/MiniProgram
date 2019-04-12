// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  const users = db.collection("user")

  return await users.where({
    openid:wxContext.OPENID
  }).update({
    favourites:_.push()
  })
}