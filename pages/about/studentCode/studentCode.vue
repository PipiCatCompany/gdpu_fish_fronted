<template>
	<view class="layout">
		<view class="goback-header" @click="goback()">
			<uni-icons type="arrow-left" size="30"></uni-icons>	
		</view>
		
		<view class="input-bar" style="margin-top: 45rpx;">
				<view style="display: flex;">
					<view class="input-title-name">
						学号绑定
					</view>
					<view class="input-title-clear">
						清空
					</view>
				</view>
				
				<view class="student-code" style="margin-top: 56rpx;">
					<view class="form-name">
						学号
					</view>
					<uni-easyinput v-model="pkg.code" class="form-input" placeholder="请输入你的学号..."/>
				</view>
				
				<view class="student-code" style="margin-top: 56rpx;">
					<view class="form-name">
						确认学号
					</view>
					<uni-easyinput v-model="pkg.codeConfirm" class="form-input" placeholder="请再输入你的学号..."/>
				</view>
				
				<view v-if="pkg.showErr" class="err-msg" style="color: #ef508a">
					{{ pkg.ErrMsg }}
				</view>
				<button class="student-code-btn" @click="updateStudentCode">确认绑定</button>
		</view>
		
	</view>
</template>

<script setup>
import { reactive } from 'vue';
import { updateUserStudentCode , GetUser , GetToken} from '@/api/user.js'
let pkg = reactive({
	code: "", 
	codeConfirm: "",
	showErr: false,
	ErrMsg: ""
})

const updateStudentCode = () => {
	// 校验
	if(pkg.code != pkg.codeConfirm) {
		pkg.showErr = true
		pkg.ErrMsg = "两次输入学号不匹配！"
	}else if (pkg.code === "" && pkg.codeConfirm === "") {
		pkg.showErr = true
		pkg.ErrMsg = "输入为空！"
	}
	//TODO 还需要正则校验...
	 
	let user = GetUser();
	let token = GetToken();
	updateUserStudentCode({
	  "studentCode": pkg.code,
	  "userId": user.UserId,
	  "token": token
	}).then(res => {
		uni.showToast({
			title: '绑定成功',
			icon: 'success',
			duration: 1000,
			success: () => {
				  setTimeout(() => {
					goback()
				  }, 1000); // 与duration一致，确保提示后再跳转
				}
		})  
		
	})
}

const goback = () => {
	uni.navigateBack()
}
</script>

<style lang="less" scoped>
.layout {
	padding: 64rpx ;
} 

.goback-header {
	height: 50rpx;
	width: 50rpx;
}

.student-code-btn {
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

.input-bar {
	.input-title-name {
		left: 32px;
		top: 108px;
		width: 89px;
		height: 24px;
		opacity: 1;
		/** 文本1 */
		font-size: 20px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 23.44px;
		color: rgba(0, 0, 0, 1);
		text-align: left;
		vertical-align: top;
	}
	
	.input-title-clear {
		margin-left: 380rpx;
		left: 311px;
		top: 112px;
		width: 32px;
		height: 15px;
		opacity: 1;
		/** 文本1 */
		font-size: 13px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 15.23px;
		color: rgba(74, 99, 255, 1);
		text-align: right;
		vertical-align: top;
	}
	
	.student-code {
		width: 622rpx;
		height: 156rpx;
		.form-name {
			left: 10755px;
			top: 356px;
			width: 72px;
			height: 20px;
			opacity: 1;
			/** 文本1 */
			font-size: 13px;
			font-weight: 400;
			letter-spacing: 0px;
			line-height: 20px;
			color: rgba(155, 158, 169, 1);
			text-align: left;
			vertical-align: top;

		}
		.form-input {
			height: 64rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 8px 16px 2px rgba(119, 154, 241, 0.2);
		}
	}
}
</style>
