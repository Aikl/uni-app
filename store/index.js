// 状态管理
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
		historys:uni.getStorageSync("_historys")||[]
	},
	mutations:{
		SET_HISTORYS(state,historys){
			state.historys = historys
			uni.setStorageSync('_historys',state.historys)
		},
		CLEAR_HISTORYS(state){
			state.historys = []
			uni.removeStorage('_historys')
		}
	},
	actions:{
		set_history({commit,state},history){
			const list = state.historys
			list.unshift(history)
			commit('SET_HISTORYS',list)
		},
		clear_historys({commit}){
			commit('CLEAR_HISTORYS')
		}
	}
})
export default store