<template>
	<view>
		<view class="layout">
			<view class="header" style="display: flex; margin-top: 40rpx;">
				<view class="goback-header" @click="goback()">
					<uni-icons type="arrow-left" size="30"></uni-icons>	
				</view>
				
				<view class="seller-info" style="margin-left: 300rpx;">
					<view  style="display: flex;">
						<image style="height: 64rpx; width: 64rpx; margin-right: 10rpx; border-radius: 50%;"  src="../../../static/logo.png" mode="aspectFit"></image>
						<view class="seller-name" style="margin-top: 10rpx;">
							肥肥猫
						</view>
					</view>
				</view>
			</view>
		
			<swiper style="width: 100%; margin-top: 100rpx; height: 550rpx;" :indicator-dots="true">
				<swiper-item>
					<image style="width: 100%"  src="../../../static/logo.png" mode="aspectFit"></image>
				</swiper-item>
				<swiper-item>
					<image class="width: 100%" src="../../../static/tabber/chat_cur.png" mode="aspectFit"></image>
				</swiper-item>
				<swiper-item>
					<image class="width: 100%" src="../../../static/tabber/about_cur.png" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			
			<view class="stuff-info-bar" style="width: 100%;">
				<view class="title">
					Nike Air Max 95 Premium
				</view>
				<view class="price">
					USD 180.00
				</view>
				<view class="info">
					通常情况下，第一种是用的最多的也是最常见的情况。浏览器缓存是最直接的一种缓存形式，浏览器会在用户的设备上（通常是硬盘或SSD）保存最近访问过的网页的部分或全部内容，包括HTML、CSS、JavaScript文件以及图片等资源。浏览器使用缓存可以显著提高加载速度，并减轻服务器的负担。
					当浏览器需要确定是否使用缓存时，它会根据HTTP响应头中的缓存控制信息（如Cache-Control和Expires头）来决定缓存的有效期。如果缓存有效，浏览器将直接使用缓存的内容；如果缓存过期或者没有缓存，则会向服务器发送新的请求。这涉及到浏览器的强缓存与弱缓存的机制，我会单独出一篇文章详细给各位读者姥爷讲一讲。
				</view>
			</view>
		</view>


		
		<view class="margin-bar" style="margin-top: 20rpx; width: 100%; height: 12rpx; background-color: #eee;"></view>
		
		<view class="comment-bar" style="padding: 20rpx 54rpx 0rpx 54rpx; margin-top: 20rpx;">
			<view class="comment-sum" style="font-weight: 1200;">
				259条留言
			</view>
			

			<view v-for="i in 4" class="comment-list" style="display: flex; margin-top: 20rpx;">
				<image style="height: 64rpx; width: 64rpx; margin-top: auto; margin-right: 30rpx; border-radius: 50%;"  src="../../../static/logo.png" mode="aspectFit"></image>
				<view class="comment-detail">
					<view class="time" style="font-size: 22rpx; color: #8b8b8b;">
						Hnitro   2024-10-1 4.0.0
					</view>
					<view class="content" style="font-size: ;">
						这是一条评论
					</view>
				</view>
			</view>
		</view>

		<!-- 让他能继续下滑，不被footer遮住 -->
		<view style="height: 200rpx;"></view>
		
		<view class="footer-bar" style="display: flex;">
			<uni-icons type="chat" size="30"></uni-icons>						
			<uni-icons type="star" size="30"></uni-icons>	
		</view>
	</view>
</template>

<script setup>
// import {onMounted,getCurrentInstance} from 'vue'	
import {onLoad} from "@dcloudio/uni-app"

onLoad((options) => {
	let stuffInfo = JSON.parse(decodeURIComponent(options.stuff));
	console.log(stuffInfo)
	console.log("conflict")
}) 

// onMounted((e) => {
// 	// 直接用页面实例拿路由参数
// 	console.log(e)
// 	const instance = getCurrentInstance();
// 	let stuffInfo = JSON.parse(decodeURIComponent(instance.attrs.stuff));
// 	console.log('stuffInfo', stuffInfo);
// })



const goback = () => {
	uni.navigateBack()
}	
	
</script>

<style lang="less" scoped>	
	
.stuff-info-bar {
	.title {		
		margin-left: 54rpx;
		opacity: 1;
		font-size: 20px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 23.44px;
		color: rgba(0, 0, 0, 1);
		text-align: left;
		vertical-align: top;
		font-style: italic;
	}
	
	.price {
		margin-left: 54rpx;
		top: 30rpx;
		height: 22rpx;
		opacity: 1;
		font-size: 18px;
		font-weight: 700;
		letter-spacing: 0px;
		line-height: 21.09px;
		color: rgba(74, 99, 255, 1);
		text-align: left;
		vertical-align: top;
	}
	
	.info {
		margin-top: 20rpx;
		height: 300rpx;
		overflow: hidden;          /* 隐藏溢出内容 */
		text-overflow: ellipsis;   /* 使用省略号 */
	}
}	
	
.footer-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 40px; /* 可以根据需要调整高度 */
	background-color: #eee; /* 导航栏背景颜色 */
	color: white; /* 字体颜色 */
	display: flex;
	justify-content: space-around; /* 项目均匀分布 */
	align-items: center; /* 垂直居中 */
}
	
	
.layout {
	padding: 54rpx ;
}

.goback-header {
	height: 50rpx;
	width: 50rpx;
}

</style>
 