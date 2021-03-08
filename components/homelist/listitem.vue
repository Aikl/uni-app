<template>
	<listscroll class="listscroll-box" @loadmore="loadmore">
		
		<listcard  :item="item" v-for="(item,index) in list" :key="index"></listcard>
		<!-- <listcard mode="clumn"></listcard>
		<listcard mode="big"></listcard> -->
		<uni-load-more iconType="snow" v-show="list.length>9||list.length===0" :status="loadType.load"></uni-load-more>
	</listscroll>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default:()=>([])
			},
			loadType:{
				type:Object,
				default(){
					return {
						load:'loading'
					}
				}
			}
		},
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
	.listscroll-box{
		height: 100%;
	}
	
</style>
