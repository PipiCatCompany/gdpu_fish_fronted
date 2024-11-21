<template> 
	<goback title="编辑个人信息"/>

    <view class="container">
        <view class="avatar-container">
            <image class="avatar" src="@/static/logo.png" mode="aspectFill" />
        </view>

		<uni-section class="mb-10" title="昵称" type="line"></uni-section>
		<uni-easyinput class="form-input"/>
		
		<uni-section class="mb-10" title="邮箱" type="line"></uni-section>
		<uni-easyinput class="form-input"/>

		<button class="btn">更新</button>
    </view>
</template>

<script setup>
import { ref } from 'vue';
import goback from '@/components/goback.vue'


const updatePhone = () => {
    // 逻辑以更新电话号码
    console.log('更新手机号');
};

const save = () => {
    // 保存逻辑
    console.log('保存个人资料');
};
</script>

<style scoped>
.btn {
	margin-top: 764rpx;
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
	
.container {
	margin-top: 80rpx;
    padding: 20rpx;	
    border-radius: 10rpx;
}
.avatar-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20rpx;
}
.avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%; /* 圆形头像 */
}
.header {
    text-align: center;
    margin-bottom: 20rpx;
}
.title {
    font-size: 28rpx;
    font-weight: bold;
}
.form-item {
    margin: 15rpx 0;
}
.label {
    font-weight: bold;
}
.value {
    margin-left: 10rpx;
}
.save-button {
    width: 100%;
    padding: 15rpx;
    background-color: #007AFF;
    color: white;
    border: none;
    border-radius: 5rpx;
    text-align: center;
}
</style>