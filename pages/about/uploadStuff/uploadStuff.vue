<template>
	<view class="layout">
		<view class="goback-header" @click="goback()">
			<uni-icons type="arrow-left" size="30"></uni-icons>	
		</view>
		
		<view class="input-bar" style="margin-top: 45rpx;">
				<view style="display: flex;">
					<view class="input-title-name">
						上传商品
					</view>
				</view>
				
				<uni-section title="上传对应图片(可为空)" type="line">
					<view class="example-body">
						<uni-file-picker v-model="imageTmp" 
						@select='selectUpload'
						:auto-upload='false' 
						@success='uploadSuccess'
						@fail='uploadFail' 
						file-mediatype="image" limit="3" title="最多选择3张图片">
						</uni-file-picker>
					</view>
				</uni-section>
		</view>
		
		
		<button class="student-code-btn" @click="UploadBtn">确认绑定</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {onLoad} from "@dcloudio/uni-app"
import { GetQiNiuToken } from '@/api/qiniu.js'
import { GetToken } from '@/api/user.js';

import * as qiniu from 'qiniu-js'


let imageList = ref([])
let imageTmp = ref()
let QiNiuToken = ref("")


function generateUniqueKey(filename) {
    // 获取当前时间戳
    const timestamp = Date.now(); // 以毫秒为单位的时间戳
    // 生成一个 3 位随机数
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    // 返回组合后的 key
    return `${timestamp}${randomNum}${filename}`;
}


onLoad(() => {
	let userToken = GetToken() || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJESmhZcHFBcEdrIiwiZXhwIjoxNzM5MTkxNjc5LCJuYmYiOjE3MzE0MTU2NzksImlhdCI6MTczMTQxNTY3OX0.i0OhZFmu6zCA0FNH8A-p7e2NA7Hz46WZup3nvPaAE1E"
	GetQiNiuToken(userToken).then(res => { 
		console.log(res.data)
		QiNiuToken.value = res.data})
})

const UploadBtn = () => {
	console.log(imageList.value)
	imageList.value.forEach((item)=> {
		const filename = item.split("/")[3] || "unknownKey"
		
		uni.uploadFile({
		       url: "https://up-z2.qiniup.com", // 你的七牛云上传地址
		       filePath: item, //图片地址
		       name: 'file',
		       formData: {
		           'token': QiNiuToken.value, // 你的上传凭证
		           'key': generateUniqueKey(filename)  // 你的图片key
		       },
		       success: (upFileRes) => {
		           if (upFileRes.statusCode === 200) {
		               let resData = JSON.parse(upFileRes.data);
					   // 默认解析的地址
		               let imgUrl = "http://smu4inwe6.hn-bkt.clouddn.com/" + resData.key
		                console.log(imgUrl)
		          
		           }
		       },
		       fail: (upFileRes) => {
		           uni.showToast({
		               title: "图片上传失败,请重新上传",
		               duration: 2000,
		               icon: "none",
		           });
		       }
		   });
	})
	


}

const uploadFinish = (e) => {
	console.log(e)
}

const goback = () => {
	uni.navigateBack()
}

const uploadSuccess = (e) =>{
	console.log('上传成功', e)

}

const uploadFail = (e) =>{
	console.log('上传失败：', e)
}

const selectUpload = (e) => {
	console.log('上传(暂存)：', e)
	// e.tempFilePaths 是多个，一次可以传多张图片
	e.tempFilePaths.forEach((tmp) => {
		imageList.value.push(tmp)
	})

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