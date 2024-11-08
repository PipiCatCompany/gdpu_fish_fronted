<template>
	<view>
		<view class="header">
			<view class="search-bar-header">
				<uni-easyinput suffixIcon="search" v-model="query" placeholder="搜索闲置物品..." @iconClick="onClick"></uni-easyinput>	
			</view>
		</view>
		
		<view v-for="pair in stuffList" class="waterfall" style="display: flex;">
			<waterfallCard @click="gotoDetail" :data="pair[0]"></waterfallCard>
			<waterfallCard @click="gotoDetail" v-if="pair[1]" :data="pair[1]"></waterfallCard>
		</view> 
	</view>
</template>

<script setup>
	
import {ref,onMounted,reactive} from 'vue'
import {GetStuffPagination} from '@/api/stuff.js'
import waterfallCard from '@/components/waterfallCard.vue'

let query = ref("")
const onClick = () => {
	console.log("qifei")
}

let stuffList = reactive([])


onMounted: {
	console.log("start")
	GetStuffPagination(1,10)	
		.then(res => {
			console.log(res)
			for(let i = 0 ; i < res.data.length; i+=2) {
				let pair = []
				
				pair.push(res.data[i])
				if(i+1 < res.data.length) {
					pair.push(res.data[i+1])
				}
				
				console.log(pair[0])
				stuffList.push(pair)
			}
		})
}

const gotoDetail = () => {
	uni.navigateTo({
		url: "/pages/stuff/stuffDetail/stuffDetail"
	});
}
</script>

<style lang="less" scoped>
.header {
	height: 240rpx;
	padding-top: 98rpx;
	padding-left: 85rpx;
	background-color: aqua;
	box-sizing: border-box;
	background: linear-gradient(90deg, #555bf6, #5f91fc);
}

.search-bar-header {
	border-radius: 30rpx;
	width: 540rpx;
}

.search-bar {
	background-color: wheat;
	height: 108rpx;
	padding: 10rpx; /* 内边距 */	
	border-radius: 4rpx; /* 圆角 */
	font-size: 28rpx; /* 字体大小 */
	box-sizing: border-box;
	background-color: #eee;
	// background: linear-gradient(10deg, #8bacfb, #777df8);
}

.waterfall {
  display: flex;
  justify-content: space-between; /* 使子元素均匀分布 */
  margin-bottom: 16rpx; /* 每一行之间的间距 */
  margin: 0 26rpx 16rpx 26rpx;
  // flex: 0 0 calc(50% - 4rpx); /* 每个卡片占据一半宽度，减去间距 */
  // margin: 0 4rpx; /* 左右间距 */
}
</style>
