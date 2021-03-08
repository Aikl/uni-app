
import $http from '../https.js'
export  const get_label = (data) =>{
	return $http({
		url:'get_label',
		data
	})
}
export const get_list = (data)=>{
	return $http({
		url:'get_list',
		data
	})
}
export const like_update = (data)=>{
	return $http({
		url:'like_update',
		data
	})
}
export const search_result = (data)=>{
	return $http({
		url:'search_result',
		data
	})
}
export const update_label = (data)=>{
	return $http({
		url:'update_label',
		data
	})
}

export const get_detail = (data)=>{
	return $http({
		url:'get_detail',
		data
	})
}

export const comment_update = (data) =>{
	return $http({
		url :'update_comment',
		data
	})
}