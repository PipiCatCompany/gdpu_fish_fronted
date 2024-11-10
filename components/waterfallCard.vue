<template>
	<view class="layout">
		<image  class="stuff-pic" :src="item.data.img" alt="" />
		<view class="stuff-info info">
			<view class="stuff-name">
				{{ item.data.title }}
			</view>
			<view class="stuff-price">
				￥{{ item.data.price }}
			</view>
		</view>
		
		
		<view class="user-info info" style="display: flex;">
			<img class="user-avatar" :src="item.data.user_avatar" alt="" />
			<view class="user-name" style="overflow:hidden; text-overflow: ellipsis;">
				{{ item.data.username }}
			</view>
		</view>
	</view>
</template>

<script setup>
import {defineProps} from 'vue'
let item = defineProps({
	data: Object
})

console.log(item.data.user_avatar)
</script>

<style lang="less" scoped>
.info {
	padding: 10rpx;
}

.layout {
	margin: 10rpx;
	// padding: 10rpx;
	box-sizing: border-box;
	height: 568rpx;
	width: 326rpx;
	background-color: white;
	border-radius: 20rpx;
	// box-shadow: 10rpx 10rpx 10rpx #eee;
	box-shadow: 0px -4px 16px  rgba(119, 154, 241, 0.04), 0px 8px 16px 2px rgba(119, 154, 241, 0.2);
	
	.stuff-pic {
		width: 326rpx;
		height: 370rpx;
		border-radius: 25rpx;
	}
}

.stuff-info {
	.stuff-name {
		opacity: 1;
		/** 文本1 */
		font-size: 13px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 15.23px;
		color: rgba(64, 67, 78, 1);
		text-align: left;
		vertical-align: top;
	}
	
	.stuff-price {
		left: 16px;
		top: 216px;
		width: 75px;
		height: 15px;
		opacity: 1;
		/** 文本1 */
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0px;
		line-height: 15.23px;
		color: rgba(74, 99, 255, 1);
		text-align: left;
		vertical-align: top;
	}
}

.user-info {
	.user-name {
		color: #838383;
		margin-left: 17rpx;
		margin-top: 8rpx;
		font-size: 23rpx;
	}
	.user-avatar {
		width: 50rpx;
		height: 50rpx;
		border-radius: 25rpx;
	}
}


</style>