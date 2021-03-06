'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		type
	} = event
	let matchObj= {}
	if(type!='all'){
		matchObj = {
			current:true
		}
	}
	
	const userInfo = await db.collection('user').doc(user_id).get()
	const labelIds = userInfo.data[0].label_ids
	let label = await db.collection('label').aggregate().addFields({
		current:$.in(['$_id',$.ifNull([labelIds,[]])])
	})
	.match(matchObj)
	.end()
	//返回数据给客户端
	return {
		code:200,
		msg:'获取便签列表',
		data:label.data
	}
};
