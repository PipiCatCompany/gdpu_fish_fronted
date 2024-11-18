<template>
	<view class="line">
		<view class="goback-header" @click="handleClick()" style="background-color: white;">
			<uni-icons type="arrow-left" size="30"></uni-icons>	
		</view>
	</view>
</template>

<script setup>
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