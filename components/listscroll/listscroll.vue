<template>
	<view class="scroll">
		<scroll-view scroll-y class="scroll-box" @scrolltolower="loadmore">
			<slot></slot>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			loadmore(){
				this.$emit("loadmore")
			}
		}
	}
</script>

<style lang="scss">
.scroll{
			flex: 1;
			box-sizing: border-box;
			overflow: hidden;
			.scroll-box{
				height: 100%;
				display: flex;
				flex-direction:column;
			}
		}
</style>
