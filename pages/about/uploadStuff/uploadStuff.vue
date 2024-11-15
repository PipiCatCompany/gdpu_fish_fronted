<template>
	<view class="layout">
		<view class="goback-header" @click="goback()">
			<uni-icons type="arrow-left" size="30"></uni-icons>	
		</view>
		
		<view class="input-bar" style="margin-top: 45rpx;">
				<view style="display: flex;">
					<view class="input-title-name">
						发布！
					</view>
				</view>
				<uni-section title="输入标题" type="line">
					<uni-easyinput v-model="PostObj.title" class="form-input" placeholder=""/>
				</uni-section>
				
				<uni-section title="详细说明" type="line">
					<uni-easyinput  v-model="PostObj.info" type="textarea"  :autoHeight="true" class="form-input" placeholder="如果是闲置物品,可以带上磨损度,自提点等补充信息..."/>
				</uni-section>
				
				<view class="uni-px-5 uni-pb-5" style="margin-top: 40rpx;">
					<uni-data-checkbox v-model="PostObj.postType" :localdata="PostObj.postTypeLocal"></uni-data-checkbox>
				</view>
				
				<view style="display: flex; margin-top: 40rpx;">
					<view style="font-weight: 500; margin: auto;">价格： </view>
					<uni-easyinput v-model="PostObj.price"  class="form-input" placeholder="最多精确到小数点后两位"/>
				</view>

				<view class="example-body" style="margin-top: 40rpx;">
					<uni-file-picker v-model="imageTmp" 
					@select='selectUpload'
					@delete="deleteUpload"
					:auto-upload='false' 
					@success='uploadSuccess'
					@fail='uploadFail' 
					file-mediatype="image" limit="3" title="最多选择3张图片(可为空)">
					</uni-file-picker>
				</view>
		</view>
		
		<button class="student-code-btn" @click="UploadBtn">发布商品</button>
	</view>
</template>

<script setup>
import { reactive, ref } from 'vue';
import {onLoad} from "@dcloudio/uni-app"
import { GetQiNiuToken } from '@/api/qiniu.js'
import { GetToken,GetUser } from '@/api/user.js';
import { ToastWrapper } from '@/utils.js'
import { CreatePost } from '@/api/stuff.js'



let imageList = ref([])
let imageTmp = ref()
let QiNiuToken = ref("")

let PostObj = reactive({
	userToken: "",
	userId: "",
	postType: "",
	postTypeLocal: [{text: '二手闲置',value:0},{text: '兼职',value:1}],
	title: "",
	info: "",
	price: "",
	img: "",
})

function generateUniqueKey(filename) {
    // 获取当前时间戳
    const timestamp = Date.now(); // 以毫秒为单位的时间戳
    // 生成一个 3 位随机数
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    // 返回组合后的 key
    return `${timestamp}${randomNum}${filename}`;
}


onLoad(() => {
	let userToken = GetToken()
	PostObj.userToken = userToken 
	PostObj.userId = GetUser().UserId
	GetQiNiuToken(userToken).then(res => { 
		console.log(res.data)
		QiNiuToken.value = res.data})
})

function isValidPrice(price) {
    // 使用正则表达式检查价格格式
    const regex = /^\d+(\.\d{1,2})?$/;
    return regex.test(price);
}

const UploadBtn = () => {
	console.log(imageList.value)
	console.log(PostObj)
	
	// 校验价格
	if(isValidPrice(PostObj.price) === false) { 
		ToastWrapper("价格不合法","error")
	}
	
	if(PostObj.postType === "") {
		ToastWrapper("请选择发布类型","error")
	}
	
	// return 
	
	
	const uploadPromises = imageList.value.map((item) => {
	    return new Promise((resolve, reject) => {
	        const filename = item.split("/")[3] || "unknownKey";
	        
	        uni.uploadFile({
	            url: "https://up-z2.qiniup.com", // 你的七牛云上传地址
	            filePath: item, // 图片地址
	            name: 'file',
	            formData: {
	                'token': QiNiuToken.value, // 你的上传凭证
	                'key': generateUniqueKey(filename)  // 你的图片key
	            },
	            success: (upFileRes) => {
	                if (upFileRes.statusCode === 200) {
	                    let resData = JSON.parse(upFileRes.data);
	                    // 默认解析的地址
	                    let imgUrl = "http://smu4inwe6.hn-bkt.clouddn.com/" + resData.key;
	                    console.log(imgUrl);
	                    
	                    PostObj.img += imgUrl + ";";
	                    resolve(); // 上传成功，解决Promise
	                } else {
	                    reject("上传失败"); // 上传失败，拒绝Promise
	                }
	            },
	            fail: (upFileRes) => {
	                uni.showToast({
	                    title: "图片上传失败,请重新上传",
	                    duration: 2000,
	                    icon: "none",
	                });
	                reject("上传失败"); // 拒绝Promise
	            }
	        });
	    });
	});
	
	
	// 等待所有的上传完成
	Promise.all(uploadPromises)
	    .then(() => {
			// 把屁股的；弃掉
	        let n = PostObj.img.length
	        if(n > 0) {
	        	PostObj.img = PostObj.img.slice(0,n-1)
	        	console.log(PostObj.img)
	        }
			
			
			// 上传图片到OSS完毕
	        return CreatePost(
	            { 
	                "category": PostObj.postTypeLocal[PostObj.postType].text,
	                "img": PostObj.img,
	                "info": PostObj.info,
	                "price": parseFloat(PostObj.price),
	                "title": PostObj.title,
	                "userId": PostObj.userId
	            }, PostObj.userToken
	        );
	    })
	    .then(res => {
			ToastWrapper("创建成功!","success")
			// goback()
		})
	    .catch(err => console.error(err));

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

const deleteUpload = (e) => {
	console.log('删除(暂存)：', e)
	let index = e.index 
	// console.log("index: "+ index) 
	
	imageList.value.splice(index,1)
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
	// margin-top: 564rpx;
	position: absolute;
    bottom: 54rpx;
    left: 54rpx
	;right: 54rpx;
    margin: 0;
	
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