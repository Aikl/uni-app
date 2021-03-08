<template>
	<swiper class="home-swiper" @change="change" :current="currentIndex">
		<swiper-item class="swiper-item"  v-for="(item,index) in tab" :key="index">
			<list-item @loadmore="loadmore" :loadType="loadType[index]" :list="listCatchData[index]"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from "./listitem.vue"
	export default {
		components:{
			listItem
		},
		props:{
			tab:{
				type:Array,
				default: ()=>([])
			},
			currentIndex:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				list:[],
				listCatchData:{},
				loadType:{},
				paramsPage:{},
				pageSize:10
			};
		},
		watch:{
			tab(newVal){
				if(newVal.length===0)return 
				this.listCatchData = {}
				this.loadType={}
				this.paramsPage = {}
				this.getList(this.currentIndex)
			}
		},
		
		methods:{
			//加载更多
			loadmore(){
				if(this.loadType[this.currentIndex].load==='noMore')return
				this.getList(this.currentIndex,this.loadType[this.currentIndex].page++)
			},
			change(e){
				const {current} = e.detail
				this.$emit("change",current)
				if(!this.listCatchData[current]||this.listCatchData[current].length===0){
					this.getList(current)
				}
				
			},
			getList(currentIndex){
				if(!this.loadType[currentIndex]){
					this.loadType[currentIndex] = {
						page:1,
						load:"loading"
					}
				}
				const name = this.tab[currentIndex].name
				this.$api.get_list({
					name:name,
					page:this.loadType[currentIndex].page,
					pageSize:this.pageSize,
				}).then(res=>{
					
					const {data} = res
					console.log('data',data)
					if(data.length===0){
						this.loadType[currentIndex].load = "noMore"
					}else{
						this.loadType[currentIndex].load ="loading"
					}
					this.$forceUpdate()
					let oldDate = [...(this.listCatchData[currentIndex]||[]),...data]
					//懒加载
					this.$set(this.listCatchData,currentIndex,oldDate)
				})
			}
		}
	}
</script>

<style lang="scss">
	.home-swiper{
		height: 100%;
		.swiper-item{
			height: 100%;
		}
	}
</style>
