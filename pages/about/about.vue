<template>
	<view style="margin-top: 80rpx;"></view>
	<view class="layout">
		<view class="user-profile">
			<img class="avatar" src="../../static/logo.png" alt="" />
			
			<view class="user-detail">
				<view class="user-name">
					{{ user.nickname }}
				</view>
				<view class="user-tag">
					已认证
				</view>
			</view>
		</view>
	</view>
	
	<uni-section title="我的" type="line" padding>
		<uni-grid :show-border="false" :square="false" :column="4" :highlight="true" @change="change">
			<uni-grid-item  v-for="(item, index) in MyList" :index="index" :key="index">
				<view class="grid-item-box" style="background-color: #fff;">
					<uni-icons :type="item.icon" :size="30" color="#777" />
					<text class="text">{{ item.title }}</text>
				</view>
			</uni-grid-item>
		</uni-grid>
	</uni-section>
	
	
	<uni-section title="服务中心" type="line" padding>
		<uni-grid :show-border="false" :square="false" :column="4" :highlight="true" @change="changeService">
			<uni-grid-item  v-for="(item, index) in ServiceList" :index="index" :key="index">
				<view class="grid-item-box" style="background-color: #fff;">
					<uni-icons :type="item.icon" :size="30" color="#777" />
					<text class="text">{{ item.title }}</text>
				</view>
			</uni-grid-item>
		</uni-grid>
	</uni-section>

</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { GetUser } from '@/api/user';

let user = reactive({
	nickname: "default",
	isStudentCode: false 
})

const MyList = reactive([
	{
		title: "我的发布",
		icon: "cloud-upload",
		url: "/pages/about/studentCode/studentCode"
	},
	{
		title: "我的收藏",
		icon: "star",
		url: "/pages/about/studentCode/studentCode"
	},
	{
		title: "Bug反馈",
		icon: "paperplane",
		url: "/pages/about/studentCode/studentCode"
	},
])
const ServiceList = reactive([
	{
		title: "个人信息",
		icon: "person",
		url: "/pages/about/personInfo/personInfo"
	},
	{
		title: "学生认证",
		icon: "auth",
		url: "/pages/about/studentCode/studentCode"
	},
	{
		title: "发布商品",
		icon: "plusempty",
		url: "/pages/about/uploadStuff/uploadStuff"
	},
	{
		title: "关于",
		icon: "info",
		url: "/pages/about/projectInfo/projectInfo"
	},
])

onMounted: {	
	let user_storage = GetUser()
	user.nickname = user_storage.Nickname
	console.log(user)
}

const changeService = (e) => {
	console.log(e)
	let i = e.detail.index 
	let target = ServiceList[i].url 
	
	console.log(target)
	
	uni.navigateTo({
		url: target
	})
}
</script>

<style lang="less" scoped >
.layout {
	margin: 20rpx;
}

.user-profile {
	display: flex;
	padding: 10rpx;
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

.image {
	width: 25px;
	height: 25px;
}
.text {
	font-size: 14px;
	margin-top: 5px;
}
.example-body {
	/* #ifndef APP-NVUE */
	// display: block;
	/* #endif */
}
.grid-dynamic-box {
	margin-bottom: 15px;
}
.grid-item-box {
	flex: 1;
	// position: relative;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 15px 0;
}
.grid-item-box-row {
	flex: 1;
	// position: relative;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 15px 0;
}
.grid-dot {
	position: absolute;
	top: 5px;
	right: 15px;
}
.swiper {
	height: 420px;
}
/* #ifdef H5 */
@media screen and (min-width: 768px) and (max-width: 1425px) {
	.swiper {
		height: 630px;
	}
}
@media screen and (min-width: 1425px) {
	.swiper {
		height: 830px;
	}
}
/* #endif */
</style>
