<template>
	<view class="like-icon" @click.stops="selectLike(likeType=!likeType)">
		<uni-icons size="20" type="heart-fu" :type="likeType?'heart-filled':'heart'" color="#f03737"></uni-icons>
	</view>
</template>

<script>
	export default {
		props:{
			data:{
				type:Object,
				default:()=>({})
			}
		},
		data() {
			return {
				likeType:false,
			};
		},
		watch:{
			data(newVal){
				this.likeType = this.data.is_like
			}
		},
		created() {
			this.likeType = this.data.is_like
		},
		methods:{
			// s收藏
			selectLike(){
				uni.showLoading()
				this.$api.like_update({
					user_id:'5fa808d91655ff00015582c6',
					article_id:this.data._id
				}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:this.likeType ? "收藏成功" :"取消成功",
						icon:"none"
					})
					console.log('res',res)
				}).catch(()=>{
					uni.hideLoading()
				})
			
			}
		}
	}
</script>

<style lang="scss">
.like-icon{
		position: absolute;
		right:0px;
		top:0px;
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
