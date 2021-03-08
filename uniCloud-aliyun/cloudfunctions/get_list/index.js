'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		name,
		page=1,
		pageSize=10
	} = event
	let matchObj = {}
	if(name!=='全部'){
		matchObj = {
			classify:name
		}
	}
	const userInfo = await db.collection("user").doc(user_id).get()
	const article_likes_ids = userInfo.data[0].article_likes_ids
	//  聚合 更精细化处理数据 求和分组指定哪些字段
	const list = await db.collection('article').aggregate()
	.addFields({
		is_like:$.in(['$_id',article_likes_ids])
	}).match(matchObj).project({
		content:0
	}).skip(pageSize*(page-1))
	.limit(pageSize)
	.end()
	// const list = await db.collection('article').field({
	// 	content:false
	// }).get()
	//返回数据给客户端

	return {
		code:200,
		msg:'获取数据成功',
		data:list.data
	}
};
