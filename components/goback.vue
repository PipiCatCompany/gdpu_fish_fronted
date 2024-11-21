<template>
	<view class="line">
		<view class="goback-header" @click="handleClick()" style="background-color: white;">
			<uni-icons type="arrow-left" size="30"></uni-icons>
			<text style="margin-left: 34rpx; font-weight: 800;">{{ props.title }}</text>
		</view>
	</view>
</template>

<script setup>
import {defineProps} from 'vue'

let props = defineProps({
	title: String
})	
	
const handleClick = () => {
	uni.navigateBack()
}	
</script>

<style lang="less">
.line {
	width: 750rpx;
	height: 50rpx;
	margin: 46rpx;
}
</style>