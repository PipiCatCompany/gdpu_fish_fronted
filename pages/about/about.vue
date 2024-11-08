<template>
	<view class="layout">
		<view class="user-profile">
			<img class="avatar" src="../../static/logo.png" alt="" />
			
			<view class="user-detail">
				<view class="user-name">
					xxxx
				</view>
				<view class="user-tag">
					已认证
				</view>
			</view>
		</view>
		
		<view class="student-code" @click="gotoStudentCode">
			<button class="my-btn">学生认证 → </button>
		</view>
	</view>
</template>

<script setup>
const gotoStudentCode = () => {
	// 去绑定学号	
	uni.navigateTo({
		url: '/pages/about/studentCode/studentCode'
	});
}
</script>

<style lang="less" scoped >
.layout {
	margin: 20rpx;
}

.user-profile {
	display: flex;
	padding: 50rpx;
	.avatar {  width: 140rpx ; height: 140rpx; border-radius: 50%;}
	.user-detail { margin: 30rpx;}
}

.student-code {
	button {
		background: linear-gradient(90deg, rgba(92, 116, 255, 1), rgba(45, 230, 175, 1));			
		color: white; /* 设置文字颜色为白色 */
		border: none; /* 去掉边框 */
		padding: 12rpx 24rpx; /* 设置内边距 */
		border-radius: 8rpx; /* 设置圆角 */
		font-size: 16rpx; /* 设置字体大小 */
		cursor: pointer; /* 鼠标悬停时显示为可点击 */
		transition: background 0.3s; /* 添加过渡效果 */
		font-size: 25rpx;
	}
}
</style>
