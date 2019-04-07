// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const users = db.collection("user")
  const result = await users.add({
    data:{
      openid:wxContext.OPENID,
      favourites:[{}]
    },
    success(res){
      console.log(res)
    }
  })
  
  return {
    result,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}