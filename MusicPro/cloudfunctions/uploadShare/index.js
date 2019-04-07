// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {shareinfo} = event
  const db = cloud.database()
  const shares = db.collection("shares")
  shares.add({
    data:shareinfo,
    success(res){
      console.log(res)
    }
  })
  
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}