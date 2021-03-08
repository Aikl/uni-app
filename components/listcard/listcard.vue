<template>
	<view @click="open(item)">
		<!-- 基本卡片 -->
		<view class="list-card" v-if="item.mode=='base'">
			<view class="list-card__images">
				<image :src="item.cover[0]" mode="aspectfill"></image>
			</view>
			<view class="list-card__content">
				<view class="title">
					<text class="title__text">
						{{item.title}}
					</text>
					<likeIcons :data="item"></likeIcons>
				</view>
				<view class="desc">
					<view class="desc__type">
						<view class="type-item">
							{{item.classify}}
						</view>
					</view>
					<view class="desc__num">
						{{item.browse_count}} 浏览
					</view>
				</view>
			</view>
		</view>
		<!-- 多图卡片 -->
		<view class="list-card mode-clumn" v-if="item.mode=='column'">
			<view class="title">
				<text class="title__text">
					{{item.title}}
				</text>
				<likeIcons :data="item"></likeIcons>
			</view>
			<view class="images-list">
				<view v-show="index < 3" class="images-item" v-for="(img,index) in item.cover" :key="index">
					<image :src="img" mode="aspectfill"></image>
				</view>
			</view>
			<view class="desc">
				<view class="desc__type">
					<view class="type-item">
						{{item.classify}}
					</view>
				</view>
				<view class="desc__num">
					{{item.browse_count}} 浏览
				</view>
			</view>
		</view>
		
		<!-- 大图卡片 -->
		<view class="list-card mode-big" v-if="item.mode=='image'">
			<view class="images-list">
				<image :src="item.cover[0]" mode="aspectfill"></image>
			</view>
			<view class="title">
				<text class="title__text">
					{{item.title}}
				</text>
				<likeIcons :data="item"></likeIcons>
			</view>
			<view class="desc">
				<view class="desc__type">
					<view class="type-item">
						{{item.classify}}
					</view>
				</view>
				<view class="desc__num">
					{{item.browse_count}} 浏览
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		props:{
			mode:{
				type:String,
				default: 'base'
			},
			item:{
				type:Object,
				default:()=>({})
			}
		},
		data() {
			return {

			};
		},
		methods:{
			open(item){
				this.$emit('click')
				console.log("item",item);
				const params = {
					author:item.author,
					title:item.title,
					_id:item._id,
					create_time:item.create_time,
					thumbs_up_count:item.thumbs_up_count,
					browse_count:item.browse_count
				}
				uni.navigateTo({
					url:"/pages/home-detail/home-detail?params="+JSON.stringify(params),
				})
			}
		}
	}
</script>

<style lang="scss">
	.list-card {
		display: flex;
		border-radius: 4px;
		padding: 10px;
		margin: 10px;
		box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: .2);
		box-sizing: border-box;
		.title {
			padding-right: 30px;
			position: relative;
			&__text {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			
		}
		.desc {
			margin-top: 5px;
			display: flex;
			justify-content: space-between;
			font-size: 12px;
			.desc__type {
				display: flex;
				.type-item {
					color: $app-base-color;
					border: 1px solid $app-base-color;
					font-size: 10px;
					border-radius: 15px;
					padding: 0px 5px 2px 5px;
				}
			}
		
			.desc__num {
				line-height: 1.5;
				color: #666;
			}
		}
		&__images {
			height: 70px;
			width: 70px;
			flex-shrink: 0;
			overflow: hidden;
			image {
				height: 100%;
				width: 100%;
			}
		}

		&__content {
			width: 100%;
			padding-left: 10px;
			display: flex;
			flex-direction: column;
			.title {
				min-height: 42px;
			}
		}

		&.mode-clumn {
			display: flex;
			flex-direction: column;
			.images-list {
				margin-top: 5px;
				width: 100%;
				display: flex;
				.images-item {
					height: 80px;
					flex: 1;
					padding-left: 10px;
					overflow: hidden;
					&:first-child {
						padding-left: 0px;
					}
					image {
						height: 100%;
						width: 100%;
					}
				}
			}
			
		}

		&.mode-big {
			display: flex;
			flex-direction: column;
			.images-list {
				height: 120px;
				margin-top: 5px;
				width: 100%;
				display: flex;
				overflow: hidden;
				image {
					height: 100%;
					width: 100%;
				}
			}
		}
	}
</style>
