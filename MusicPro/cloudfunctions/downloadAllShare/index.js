// 云函数入口文件
const cloud = require('wx-server-sdk')

const MAX_LIMIT = 10
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  // 先取出集合记录总数
  const countResult = await db.collection('shares').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const index = event.index
  if(index >= batchTimes){
    return "none"
  }
  
  const tasks = []
  
  if (index == 0) {
    const task = db.collection('shares').orderBy("index", "desc").limit(MAX_LIMIT).get()
    tasks.push(task)
  }
  else {
    const promise = db.collection('shares').orderBy("index", "desc").skip(index * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }

  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => ({
    data: acc.data.concat(cur.data),
    errMsg: acc.errMsg,
  }))
}