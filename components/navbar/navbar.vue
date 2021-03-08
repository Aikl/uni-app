<template>
	<view class="navbar-box">
		<view class="navbar-fixed">
			<view :style="{height:statusBarHeight+'px'}"></view>
			<view class="serch-content" :class="{'search':isSearch}" :style="{height:navBarHeight+'px',width:windowWidth+'px'}">
				<view class="navbar__icon" v-if="isSearch" @click="back">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>
				<view class="navbar-search" v-if="!isSearch"  @click.stop="openLink">
					<view class="navbar__icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="navbar__text">
						vue uni-app
					</view>
				</view>
				
				<view class="navbar-search" v-else>
					<input type="text" @input="changeKey" v-model="val"   placeholder="请输入你要搜索的内容"/>
				</view>
			</view>
		</view>
		<view  :style="{height:statusBarHeight+navBarHeight+'px'}">
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			isSearch:{
				type:Boolean,
				default:false
			},
			valueText:{
				type:[String,Number],
				default:""
			}
		},
		data() {
			return {
				statusBarHeight:20,
				navBarHeight:45,
				windowWidth:375,
				val:null
			}
		},
		watch:{
			valueText(newVal){
				console.log("new",newVal);
				this.val = newVal
			}
		},
		created() {
			// 获取手机基本信息
			const SystemInfo = uni.getSystemInfoSync()
			this.statusBarHeight = SystemInfo.statusBarHeight
			this.windowWidth = SystemInfo.windowWidth
			// #ifndef APP-PLUS||H5||MP-ALIPLAY
			const menuButtonInfo= uni.getMenuButtonBoundingClientRect()
			this.navBarHeight = (menuButtonInfo.bottom-this.statusBarHeight)+(menuButtonInfo.top-this.statusBarHeight)
			// （胶囊底部的高度-状态栏高度）+ （胶囊顶部高度-状态栏高度）
			this.windowWidth = menuButtonInfo.left
			// #endif
		},
		methods:{
			openLink(){
				uni.navigateTo({
					url:"/pages/search-reulst/search-reulst"
				})
			},
			changeKey(val){
				const {value} =val.detail
				this.$emit('change',value)
			},
			back(){
				uni.switchTab({
					url:'/pages/tabbar/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
.navbar-box{
	.navbar-fixed{
		position: fixed;
		top:0;
		left:0;
		z-index: 99;
		background-color: $app-base-color;
		width: 100%;
		.serch-content{
			padding: 0 10px;
			width: 100%;
			// height: 45px;
			display: flex;
			box-sizing: border-box;
			// justify-content: center;
			align-items: center;
			
			.navbar-search{
				height: 30px;
				display: flex;
				align-items: center;
				background-color: #fff;
				padding: 0 10px;
				width: 100%;
				border-radius: 30px;
				.navbar__icon{
					margin-right: 10px;
				}
				.navbar__text{
					font-size: 12px;
					color: #666;
				}
			}
			&.search{
				padding-left: 0px;
				.navbar__icon{
					margin-left: 10px;
					margin-right: 10px;
				}
				.navbar-search{
					font-size:16px;
					border-radius: 6px;
					input{
						width: 100%;
					}
				}
			}
		}
		
	}
	.navbar-constent{
		height: 45px;
	}
}
</style>
