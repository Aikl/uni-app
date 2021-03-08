<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-header__title">
					我的标签
				</view>
				<view class="label-header__edit" @click="updateLabel(isEdit=!isEdit)">
					{{isEdit?'完成':'编辑'}}
				</view>
			</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view class="label-content"  v-if="!loading">
				<view class="empty-box" v-show="myLabel.length===0&&!loading">
					暂无数据
				</view>
				<view class="label-content__item" v-for="(item,$index) in myLabel" :key="item._id" >
					{{item.name}}
					<uni-icons v-show="isEdit" @click="del($index)" class="close-icons" type="clear" size="16" color="red"></uni-icons>
				</view>
			</view>
		</view>
		<view class="label-recommend">
			<view class="label-recommend__title">
				标签推荐
			</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view class="label-content" v-if="!loading">
				<view v-for="(item,$index) in otherLabel" class="label-content__item" @click="add($index)" :key="item._id" >
					{{item.name}}
				</view>
				<view class="empty-box" v-show="otherLabel.length===0&&!loading">
					暂无数据
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEdit:false,
				myLabel:[],
				otherLabel:[],
				loading:false
			};
		},
		onLoad() {
			this.getLabel()
		},
		methods:{
			// 获取所有标签列表
			getLabel(){
				this.loading = true
				this.$api.get_label({type:'all'}).then(res=>{
					const {data} =res
					this.myLabel = data.filter(item=>item.current)
					this.otherLabel = data.filter(item=>!item.current)
					this.loading = false
				}).catch(()=>{
					this.loading = false
				})
			},
			// 保存标签
			updateLabel(isEdit){
				if(isEdit)return
				uni.showLoading()
				const label_ids = this.myLabel.map(d=>d._id)
				this.$api.update_label({
					label_ids :label_ids
				}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:'编辑成功',
						icon:'none'
					})
					uni.$emit('labelChange')
				})
			},
			// 删除选择标签
			del(index){
				if(!this.isEdit)return
				this.otherLabel.push(this.myLabel[index])
				this.myLabel.splice(index,1)
			},
			// 添加标签
			add(index){
				if(!this.isEdit)return
				this.myLabel.push(this.otherLabel[index])
				this.otherLabel.splice(index,1)
			}
		}
	}
</script>

<style lang="scss">
	page{
		font-size: 14px;
		background-color: #F5F5F5;
		height: 100%;
		width: 100%;
	}
	.label{
		height: 100%;
		width: 100%;
		.label-content{
			display: flex;
			padding:0px 0 10px 10px;
			flex-wrap:wrap;
			&__item{
				padding:2px 5px;
				margin-top:10px;
				margin-right:10px;
				border-radius: 4px;
				border:1px solid #f5f5f5;
				position: relative;
				.close-icons{
					position: absolute;
					right:-8px;
					top:-6px;
					background-color: #fff;
					border-radius: 50%;
				}
			}
		}
		.label-box{
			background-color: #fff;
			display: flex;
			flex-direction: column;
			.label-header{
				border-bottom: 1px solid #f5f5f5;
				display: flex;
				justify-content: space-between;
				padding: 10px;
				&__title{
					color: #666;
				}
				&__edit{
					color:#007AFF;
				}
			}
		}
		.label-recommend{
			margin-top: 10px;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			&__title{
				color: $app-base-color;
				padding: 10px;
				border-bottom: 1px solid #f5f5f5;
			}
		}
	}
	.empty-box{
		height: 50px;
		line-height: 50px;
		width: 100%;
		text-align: center;
		color: #999;
	}
</style>
