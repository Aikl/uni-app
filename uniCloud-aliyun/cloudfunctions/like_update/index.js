'use strict';
const db =uniCloud.database()
const dbCom = db.command
exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event
	
	// doc根据id获取
	const userInfo = await db.collection("user").doc(user_id).get()
	const article_likes_ids = userInfo.data[0].article_likes_ids
	let dbComFun = null
	if((article_likes_ids||[]).includes(article_id)){
		dbComFun = dbCom.pull(article_id)
	}else{
		dbComFun = dbCom.addToSet(article_id)
	}
	await db.collection("user").doc(user_id).update({
		article_likes_ids :dbComFun
	})
	//返回数据给客户端
	return {
		code:200,
		msg:'请求数据成功！',
		data:userInfo
	}
};
