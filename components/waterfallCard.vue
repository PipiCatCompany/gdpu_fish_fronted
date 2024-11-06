<template>
	<view class="layout">
		<image mode="widthFix" class="stuff-pic" src="../static/logo.png" alt="" />
		
		<view class="stuff-info info">
			<view class="stuff-name">
				这是商品简介...
			</view>
			<view class="stuff-price" style="color: #4A63FF;">
				$600
			</view>
			<view class="stuff-seller" style="display: flex;">
				<img src="" alt="" />
				<view class="">
					xxxx
				</view>
			</view>
		</view>
		
		
		<view class="user-info info" style="display: flex;">
			<img class="user-avatar" src="../static/logo.png" alt="" />
			<view class="user-name">
				六朝收藏馆
			</view>
		</view>
	</view>
</template>

<script setup>

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
	box-shadow: 10rpx 10rpx 10rpx #eee;
	
	.stuff-pic {
		width: 326rpx;
		height: 320rpx;
	}
}

.stuff-info {
	.stuff-price {
		font-weight: 700;
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