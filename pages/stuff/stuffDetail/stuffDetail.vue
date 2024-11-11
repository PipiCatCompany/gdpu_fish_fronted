<template>
	<view>
		<view class="layout">
			<view class="header" style="display: flex; position: fixed; z-index: 999;">
				<view class="goback-header" @click="goback()" style="background-color: white;">
					<uni-icons type="arrow-left" size="30"></uni-icons>	
				</view>
				
				<view class="seller-info" style="margin-left: 300rpx;">
					<view  style="display: flex;">
						<img style="height: 64rpx; width: 64rpx; margin-right: 10rpx; border-radius: 50%;"  :src="stuffInfo.user_avatar"></img>
						<view class="seller-name" style="margin-top: 10rpx;">
							{{ stuffInfo.username }}
						</view>
					</view>
				</view>
			</view>
					
			<swiper style="width: 100%; margin-top: 100rpx; height: 550rpx;" :indicator-dots="true">
				<swiper-item>
					<image style="width: 100%"  :src="stuffInfo.img" mode="aspectFit"></image>
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
					{{ stuffInfo.title }}
				</view>
				<view class="price">
					{{ stuffInfo.price }}
				</view>
				<view class="info">
					{{ stuffInfo.info }}
				</view>
			</view>
		</view>


		
		<view class="margin-bar" style="margin-top: 20rpx; width: 100%; height: 12rpx; background-color: #eee;"></view>
		
		<view class="comment-bar" style="padding: 20rpx 54rpx 0rpx 54rpx; margin-top: 20rpx;">
			<view class="comment-sum" style="font-weight: 1200;">
				{{ commentLen }} 条留言
			</view>
			

			<view v-for="comment in comments" class="comment-list" style="display: flex; margin-top: 20rpx;">
				<img style="height: 64rpx; width: 64rpx; margin-top: auto; margin-right: 30rpx; border-radius: 50%;"  :src="comment.avatar"></img>
				<view class="comment-detail">
					<view class="time" style="font-size: 22rpx; color: #8b8b8b;">
						{{ comment.username}}  - {{ comment.create_time}}
					</view>
					<view class="content" style="font-size: ;">
						{{ comment.content }}
					</view>
				</view>
			</view>
		</view>

		<!-- 让他能继续下滑，不被footer遮住 -->
		<view style="height: 200rpx;"></view>
		
		<view>
			<!-- 输入框示例 -->
			<uni-popup ref="inputDialog" type="dialog">
				<uni-popup-dialog ref="inputClose"  mode="input" title="输入内容" value="对话框预置提示内容!"
					placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
			</uni-popup>
		</view>
		
		<view class="footer-bar" style="display: flex;">
			<uni-icons type="chat" size="30"  @click="open"></uni-icons>				
			<uni-icons type="star" size="30"></uni-icons>	
			<view @click="gotoMessageDetail" class="message-btn" style="display: inline-block; clear: both;">
			    <uni-icons type="person" size="30"></uni-icons>
			    <text style="font-size: 12px; color: red;">私聊一下</text>
			</view>
			

			<uni-popup ref="popup" type="bottom" border-radius="10px 10px 0 0">
				<view class="" style="background-color: white; height: 400rpx;">					
					<view class="student-code" style="margin-top: 56rpx; padding: 54rpx;">
						<uni-easyinput v-model="myComment" :autoHeight="true" class="form-input" type="textarea" placeholder="看对眼就留言..."/>
						
						<button class="student-code-btn" 
						style="background: linear-gradient(90deg, rgba(92, 116, 255, 1), rgba(45, 230, 175, 1)); margin-top: 32rpx; color: white;"
						@click="sendComment">
							发送
						</button>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script setup>
import {ref,reactive} from 'vue'	
import {onLoad,onInit} from "@dcloudio/uni-app"
import { GetCommentList,CreateComment } from '@/api/stuff.js'
import { GetToken,GetUser } from '@/api/user'

let stuffInfo = ref()
let comments = ref()
let commentLen = ref(0)
let myComment = ref("")

let GlobalObj = reactive({
	post_id: "",
	token: "",
	user: {},
})

const popup = ref(null);


onLoad((options) => {
	let data = JSON.parse(decodeURIComponent(options.stuff));
	stuffInfo.value = data
	console.log(stuffInfo.value)
	
	let postId = data.post_id
	let token = GetToken()
	// 刷新一下GlobalObj
	GlobalObj.post_id = data.post_id
	GlobalObj.token = token 
	GlobalObj.user = GetUser()
	
	// 请求评论
	GetCommentList(postId,token)
		.then(res => {
			comments.value = res.data 
			commentLen.value = res.data.length
		})
}) 


const goback = () => {
	uni.navigateBack()
}	

const gotoMessageDetail = () => {
	uni.navigateTo({
		url: "/pages/message/messageDetail/messageDetail"
	})
}

const open = () =>{
	// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
	popup.value.open('bottom')
}

const sendComment = () => {
	if(myComment.value === "") 	return 
	
	
	console.log(GlobalObj.user)
	CreateComment({
	  "content": myComment.value,
	  "post_id": GlobalObj.post_id,
	  "user_id": GlobalObj.user.UserId
	},GlobalObj.token)
		.then(_ => {
			popup.value.close('bottom')
			
			// 刷新评论
			GetCommentList(GlobalObj.post_id,GlobalObj.token)
				.then(res => {
					comments.value = res.data 
					commentLen.value = res.data.length
				})
			
			uni.showToast({
				title: '评论成功',
				icon: 'success',
				duration: 1000,
				success: () => {
					  setTimeout(() => {
					  }, 1000); // 与duration一致，确保提示后再跳转
					}
			})  
		})

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
		// height: 300rpx;
		// overflow: hidden;          /* 隐藏溢出内容 */
		// text-overflow: ellipsis;   /* 使用省略号 */
	}
}	
	
.footer-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 40px; /* 可以根据需要调整高度 */
	background-color: white; /* 导航栏背景颜色 */
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
 