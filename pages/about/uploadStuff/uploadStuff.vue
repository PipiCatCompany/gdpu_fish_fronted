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

onLoad(() => {
	let userToken = GetToken() || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJESmhZcHFBcEdrIiwiZXhwIjoxNzM5MTkxNjc5LCJuYmYiOjE3MzE0MTU2NzksImlhdCI6MTczMTQxNTY3OX0.i0OhZFmu6zCA0FNH8A-p7e2NA7Hz46WZup3nvPaAE1E"
	GetQiNiuToken(userToken).then(res => { QiNiuToken.value = res.data})
})

const UploadBtn = () => {
	console.log(imageList.value)
	
	const options = {
	  quality: 0.60,
	  // maxWidth: 1000,
	  // maxHeight: 618
	}
	
	// console.log(qiniu)
	qiniu.compressImage(imageList.value[0], options).then(data => {
		const putExtra = {
			fname: "qiniu.png",		// 需要哈希
			mimeType: "image/png",
		};
		
		const config = {
			useCdnDomain: true,
			region: qiniu.region.z2
		}
		
		const key = undefined // 为 null 或者 undefined 时则自动使用文件的 hash 作为文件名
		
		const observable = qiniu.upload(data.dist, key, QiNiuToken.value, putExtra, config)
	  
	  
		const observer = {
			next(res) {
				console.log('正在上传:', res);
			},
			error(err) {
				console.error('上传出错:', err);
			},
			complete(res) {
				console.log('上传完成:', res);
				// 在这里执行上传完成后的回调
			}
		};
		  
		const subscription = observable.subscribe(observer) // 上传开始
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
	console.log('上传：', e)
	console.log(e.tempFilePaths)
	
	// imageList.value.push(imageTmp.value)
	// uni.uploadFile({
	// 	url: 'url', //仅为示例，非真实的接口地址
	// 	filePath: e.tempFilePaths[0],
	// 	name: 'file',
	// 	// formData: {
	// 	// 	'file': ''
	// 	// },
	// 	success: (uploadFileRes) => {
	// 		console.log(uploadFileRes.data);
	// 	},
	// 	fail: (err) => {
	// 		console.log(err);
	// 	}
	// })
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
