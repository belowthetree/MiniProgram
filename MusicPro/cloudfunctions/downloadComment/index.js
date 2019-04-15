// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const MAX_LIMIT = 20

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const comm = db.collection("shareText")
  const count = comm.count()
  const tasks = []
  for(let i = 0;i < count;i++){
    const task = await comm.where({ownerid:event.id}).skip(i*MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(task)
  }

  return tasks
}