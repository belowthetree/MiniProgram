// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const colls = db.collection("collections")
  
  return (await colls.where({
    _id:event.id
  }).remove(),event)
}