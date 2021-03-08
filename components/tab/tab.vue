<template>
	<view class="tab-container">
		<scroll-view class="tab-scroll" scroll-x>
			<view class="scroll-box">
				<view @click="clickTab(item,index)" :class="{'tab-item-active':current===index}" v-for="(item,index) in list" class="tab-item">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="setting-icon" @click="open">
			<uni-icons type="gear" color="#666" size="26px"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default: ()=>([])
			},
			activeIndex:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				current:0
			};
		},
		watch:{
			activeIndex(newVal){
				
				this.current = newVal
			}
		},
		methods:{
			clickTab(item,index){
				this.current = index 
				this.$emit('tab',{
					data:item,
					index:index
				})
			},
			open(){
				uni.navigateTo({
					url:"/pages/label/label"
				})
			}
		}
	}
</script>

<style lang="scss">
	.tab-container{
		display: flex;
		width: 100%;
		// box-sizing: border-box;
		background-color: #fff;
	    border-bottom: 1px solid #f5f5f5;
		.tab-scroll{
			flex:1;
			overflow: hidden;
			box-sizing: border-box;
			.scroll-box{
				height: 45px;
				align-items: center;
				display: flex;
				flex-wrap: nowrap;
				box-sizing: border-box;
				.tab-item{
					flex-shrink: 0;
					padding: 0 10px;
					color: #333;
					font-size: 14px;
					&-active{
						color: $app-base-color;
					}
				}
			}
		}
		.setting-icon{
			display: flex;
			justify-content:center;
			align-items: center;
			height: 45px;
			width: 45px;
		}
	}
</style>
