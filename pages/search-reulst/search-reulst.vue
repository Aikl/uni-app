<template>
	<view class="search-result">
		<navbar :isSearch="true" :valueText="valueText" @change="change"></navbar>
		<view class="search-box" v-if="isResult">
			<view class="label-header">
				<text class="label-header__title">搜索历史</text>
				<text class="label-header__clear" @click="clearHistorys">清空</text>
			</view>
			<view class="label-content" v-if="historys.length>0">
				<view class="label-content__item" @click="getSearch(item.name)"  v-for="(item,$index) in historys">{{item.name}}</view>
			</view>
			<view class="empty-box" v-else>
				暂无筛选记录
			</view>
		</view>
		<view class="listscroll-box"  v-else>
			<listscroll >
				<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
				<view class="listscroll-content" v-if="searchList.length>0">
					<listcard @click="clickItem()"  :item="item" v-for="(item,index) in searchList" :key="index"></listcard>
				</view>
				<view class="empty-box" v-if="searchList.length==0&&!loading">
					暂无筛选记录
				</view>
			</listscroll>
		</view>
		
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				isResult:true,
				searchList:[],
				valueText:null,
				loading:false
			}
		},
		computed:{
			...mapState(['historys'])
		},
		onLoad() {
			// this.change('')
		},
		methods:{
			clearHistorys(){
				this.$store.dispatch('clear_historys')
			},
			getSearch(value){
				this.valueText = value
				if(!value){
					this.searchList =[]
					this.isResult = true
					return
				}
				this.isResult = false
				this.loading = true
				this.$api.search_result({
					value
					}).then(res=>{
						this.loading = false
						const {data} = res
						this.searchList = data
						
				}).catch(()=>{
					this.loading = false
				})
			},
			clickItem(){
				console.log("this.valueText",this.valueText);
				this.$store.dispatch("set_history",{
					name:this.valueText
				})
			},
			change(value){
				if(!value){
					this.searchType = false
					clearTimeout(this.timeout)
					this.getSearch()
					return 
				}
				if(!this.searchType){
					this.searchType = true
					this.timeout = setTimeout(()=>{
						this.searchType = false
						this.getSearch(value)
					},1000)
				}
			}
		}
	}
</script>

<style lang="scss">
page{
	width: 100%;
	height:100%;
	background-color: #F5F5F5;
}
.search-result{
	display: flex;
	flex-direction: column;
	.listscroll-box{
		flex:1;
		display: flex;
		flex-direction: column;
		.listscroll-content{
			height: 100%;
		}
	}
	.search-box{
			flex: 1;
			width: 100%;
			background-color: #fff;
			.label-header{
					display: flex;
					line-height:32px;
					padding:2px 10px;
					justify-content:space-between;
					border-bottom: 1px solid #f5f5f5;
				}
				.label-header{
					margin-bottom: 10px;
					&__title{
						color: $app-base-color;
					}
					&__clear{
						color:#03A9F4
					}
				}
				.label-content{
					display: flex;
					flex-wrap: wrap;
					padding: 15px;
					padding-top:0px;
					&__item{
						margin:10px 10px 0px 0px;
						padding: 2px 6px;
						border:1px solid #999;
						border-radius: 4px;
					}
				}
			
		}
}
	.empty-box{
		height: 200px;
		line-height: 200px;
		text-align: center;
		color:#666;
		font-size: 14px;
	}
</style>
