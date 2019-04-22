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
  const task = comm.where({
    ownerid:event.ownerid
  }).limit(MAX_LIMIT).get()
  tasks.push(task)
  for(let i = 1;i < count;i++){
    const task = comm.where({ownerid:event.ownerid}).skip(i*MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(task)
  }
  const t = await comm.where({
    ownerid:event.ownerid
  }).get()

  return (await Promise.all(tasks)).reduce((acc, cur) => ({
      data: acc.data.concat(cur.data)}))
}