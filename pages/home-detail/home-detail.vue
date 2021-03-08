
<template>
	<view class="detail">
		<view class="detail-title">
			{{detailData.title}}
		</view>
		<view class="detail-user">
			<view class="user-portrait">
				<image :src="detailData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="user-info">
				<view class="user-info__title">
					{{detailData.author.author_name}}
				</view>
				<view class="user-info__article">
					<text>{{detailData.create_time}}</text>
					<text>{{detailData.browse_count}} 浏览</text>
					<text>{{detailData.thumbs_up_count}} 点赞</text>
				</view>
			</view>
		</view>
		<view class="detail-content">
			<view class="html-content">
				<!-- <u-parse :content="detailData.content" :noData="noData"></u-parse> -->
				内容
			</view>
			<view class="detail-comment">
				<view class="comment-title">
					最新评论
				</view>
				<view class="comment-content">
					<comment-box></comment-box>
				</view>
			</view>
		</view>
		<view class="tool-box">
			<view class="tool-input" @click="openComent">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#F03737"></uni-icons>
			</view>
			<view class="toll-icons">
				<view class="icons-box">
					<uni-icons type="chat" size="18" color="#F03737"></uni-icons>
				</view>
				<view class="icons-box">
					<uni-icons type="heart" size="18" color="#F03737"></uni-icons>
				</view>
				<view class="icons-box">
					<uni-icons type="hand-thumbsup" size="18" color="#F03737"></uni-icons>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="popup-header__item" @click="closeComent">取消</text>
					<text class="popup-header__item" @click="submit">发布</text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="message" maxlength="200" fixed placeholder="请输入评论内容" />
					<view class="popup-count">
						{{message.length}}/200
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from "@/components/gaoyia-parse/parse.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {
				message:'',
				detailData :null,
				noData:"<p style='text-align:center;color:#666'>详情加载中...</p>"
			};
		},
		components:{
			uParse,
			uniPopup
		},
		onLoad(query) {
			console.log("qurey",query);
			this.detailData = JSON.parse(query.params)
			this.getDetail()
			
		},
		onReady() {
			
		},
		methods:{
			openComent(){
				this.$refs.popup.open()
			},
			closeComent(){
				this.$refs.popup.close()
			},
			submit(){
				if(!this.message){
					uni.showToast({
						title:"请输入评论内容",
						icon:"none"
					})
					return
				}
				this.setComment(this.message)
			},
			// 新增评论
			setComment(content){
				uni.showLoading({
					title:"正在新增评论"
				})
				this.$api.comment_update({
					article_id:this.detailData.id,
					content:content
				}).then(res=>{
					uni.showToast({
						title:"评论发布成功！"
					})
					uni.hideLoading()
					this.closeComent()
				}).catch(err=>{
					uni.hideLoading()
					this.closeComent()
				})
			},
			// 获取新闻详情
			getDetail(){
				this.$api.get_detail({
					article_id:this.detailData.id
				}).then(res=>{
					const {data} = res
					this.$refs.popup.close()
					console.log('data',data)
					this.detailData = data
				}).catch(err=>{
					
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/components/gaoyia-parse/parse.css';
	.detail{
		height: 100%;
		width: 100%;
		&-title{
			margin-top:10px;
			padding: 0 10px;
			font-size: 18px;
			color: #333;
			font-weight: bold;
		}
		&-user{
			display: flex;
			padding: 10px;
			.user-portrait{
				height: 40px;
				overflow: hidden;
				align-items: center;
				flex-shrink: 0;
				width: 40px;
				border-radius: 40px;
				image{
					height: 100%;
					width: 100px;
				}
			}
			.user-info{
				display: flex;
				flex-direction: column;
				margin-left: 10px;
				justify-content: space-between;
				&__title{
					font-size: 14px;
					color:#333;
				}
				&__article{
					color: #999;
					text{
						margin-right: 10px;
					}
				}
			}
		}
		.detail-content{
			margin-top: 20px;
			min-height: 500px;
			margin-bottom: 54px;
			.html-content {
				padding:0 15px;
				overflow: hidden;
			}
			.detail-comment{
					margin-top: 30px;
					.comment-title{
						padding: 15px 20px;
						font-size: 14px;
						color: #666;
					}
					.comment-content{
						padding:10px;
					}
				}
		}
		.tool-box{
			height: 44px;
			position: fixed;
			bottom: 0px;
			display: flex;
			align-items:center;
			left: 0px;
			width: 100%;
			border-top: 1px solid #F03737;
			padding: 0 10px;
			background-color: #fff;
			.tool-input{
				border: 1px solid #999;
				height: 30px;
				line-height: 30px;
				display: flex;
				width: 100%;
				border-radius: 5px;
				padding: 0 10px;
				justify-content:space-between;
				align-items: center;
				text{
					font-size: 14px;
					color:#999;
				}
			}
			.toll-icons{
				display: flex;
				flex-shrink: 0;
				padding: 0 10px;
				.icons-box{
					position: relative;
					align-items: center;
					display: flex;
					width: 44px;
				}
			}
		}
	}
	.popup-wrap{
		background-color: #fff;
		.popup-header{
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			color:#666;
			border-bottom: 1px solid #F5F5F5;
			&__item{
				height: 50px;
				line-height: 50px;
				padding: 0 15px;
			}
		}
		.popup-content{
			width: 100%;
			padding: 15px;
			box-sizing: border-box;
			.popup-textarea{
				width: 100%;
				height:200px;
			}
		}
		.popup-count{
			display: flex;
			font-size: 12px;
			color:#999;
			justify-content: flex-end;
		}
	}
</style>
