// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const MAX_LIMIT = 20

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContent = cloud.getWXContext()
  // 先取出集合记录总数
  const db = cloud.database()
  const countResult = await db.collection('collections').where({
    openid:wxContent.OPENID
  }).count()
  const total = countResult.total
  if(total==0)
    return total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = await db.collection('collections').where({openid:wxContent.OPENID}).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  // 等待所有
  return tasks,db.collection("collections").where({openid:wxContent.OPENID}).get()
}