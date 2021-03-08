<template>
	<view class="home">
		<!-- 搜索组件 -->
		<navbar></navbar>
		<!-- tab组件 -->
		<tab :list="labelList" @tab="tabChange" :activeIndex="activeIndex"></tab>
		<view class="home-list">
			<homelist :tab="labelList" @change="change" :currentIndex="currentIndex"></homelist>
		</view>
	</view>
</template>

<script>
	export default {
		components:{
			// NavBar: import("@/components/navbar/navbar.vue")
		},
		data() {
			return {
				labelList :[],
				currentIndex:0,
				activeIndex:0
			}
		},
		onLoad() {
			uni.$on('labelChange',res=>{
				this.labelList =[],
				this.currentIndex=0,
				this.activeIndex=0
				this.getLabel()
			})
			this.getLabel()
		},
		methods: {
			getLabel(){
				this.$api.get_label({type:'1'}).then(res=>{
					console.log('res',res)
					this.labelList = res.data
					this.labelList.unshift({name:'全部'})
				})
			},
			tabChange(data){
				this.currentIndex = data.index
			},
			change(current){
				this.activeIndex = current
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
	}
	.home {
		display: flex;
		flex: 1;
		flex-direction: column;
		.home-list{
			flex: 1;
		}
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
