// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const shares = db.collection("shares")
  return await shares.add({
    data:{
      name:event.name,
      title:event.title,
      epname:event.title,
      singer:event.singer,
      src:event.src,
      coverImgUrl:event.coverImgUrl,
      date:db.serverDate(),
      openid:wxContext.OPENID,
      text:event.text,
      index:""
    },
    success(res){
      console.log(res)
    }
  })
}