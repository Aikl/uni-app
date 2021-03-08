'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		user_id,
		label_ids = []
	} = event
	 await db.collection('user').doc(user_id).update({
		label_ids:label_ids
	})
	//返回数据给客户端
	return {
		code:200,
		msg:'更新成功'
	}
};
