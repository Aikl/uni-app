import Vue from 'vue'
import App from './App'
import apis from "@/commons/apis/index.js"
import store from "./store"
Vue.config.productionTip = false
Vue.prototype.$api = apis
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
