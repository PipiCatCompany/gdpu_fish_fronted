<template>
  <view>
   <view class="header" style="padding-top: 70rpx; border-bottom: 1px solid gray; height: 120rpx; background-color: white; width: 750rpx; display: flex; position: fixed; z-index: 999;">
    <view class="goback-header" @click="goback()" 
    style="display: flex;  height: 100rpx; width: 100%; padding: 10rpx 34rpx; 0rpx 34rpx;">
     <uni-icons type="arrow-left" size="30"></uni-icons> 
     
     <view class="stuff-info" style="display: flex; margin-left: 40rpx;">
<!--      <img style="height: 100rpx; width: 100rpx;" :src="globalObj.stuff.img" alt="" /> -->
      <view class="info">
<!--       <view style="margin-left: 40rpx; font-weight: 700; margin-top: auto;">{{ globalObj.user.Nickname}}</view>
       <view style="margin-left: 40rpx; font-weight: 700; margin-top: auto;">{{ globalObj.stuff.price }}</view> -->
      </view>
     </view>
  
    </view>
   </view>
  </view>	
	
  <view class="chat-container">
	<!-- 聊天和顶部的margin -->
	<view class="margin-bar"  style="margin-top: 190rpx;"></view> 
	  
	<view v-for="(msg, index) in messages" :key="index" class="message">
		<view class="avatar" v-if="globalObj.MyUserId !== msg.msg_sender">
			<img v-if="msg.msg_sender === globalObj.buyerId" :src="globalObj.buyerImg" class="avatar" />
			<img v-else :src="globalObj.sellerImg" class="avatar" />
		</view>
		<view v-else class="margin-bar"></view>
		
	  
		<view class="bubble">
			<view class="content">{{ msg.content }}</view>
		</view>
		
		<view class="avatar" v-if="globalObj.MyUserId === msg.msg_sender">
			<img v-if="msg.msg_sender === globalObj.buyerId" :src="globalObj.buyerImg" class="avatar" />
			<img v-else :src="globalObj.sellerImg" class="avatar" />
		</view>
		<view v-else class="margin-bar"></view>
	</view>
	
    <view class="timestamp" v-if="showTimestamp">
      {{ formatTimestamp(lastMessage.timestamp) }}
    </view>
  </view>
  
  <!-- footer -->
  <view class="input-container" style="display: flex; padding: 10rpx; width: 750rpx;">
  	<uni-easyinput v-model="myComment" :autoHeight="true" class="form-input" placeholder="看对眼就留言..."/>
  	<button @click="sendMessage" style="margin-left: 40rpx; margin-right: 20rpx;">发送</button>
  </view>
</template>

<script setup>
import {onLoad,onReady} from "@dcloudio/uni-app"
import {ref, computed, reactive,onMounted} from 'vue';
import { GetMessageByPagination,GetMessageChanelInfo } from '@/api/message.js'
import { GetToken,GetUser } from "@/api/user";

const globalObj = reactive({
	MyUserId: "",
	IsBuyer: "",	// 心智负担爆炸
	token: "",
	sellerImg: "",
	sellerId: "",
	buyerImg: "",
	buyerId: "",
})

const chartRoomId = "33-DPpeAHgUF7-DJhYpqApGk"
const messages = ref([]);
const UserId2Img = new Map()

onLoad((routeData) => {
	let token = GetToken()
	globalObj.token = token 
	globalObj.MyUserId = GetUser().UserId
	GetMessageByPagination(token,10,1,chartRoomId).then(res => {
		console.log(res)
		let dataList = res.data 
		dataList.forEach((item) => { messages.value.push(item) })
	})
	
	GetMessageChanelInfo(token,chartRoomId).then(res => {
		// 构造 userId -> userAvatar 的Map
		let userInfo = res.data.user_info
		globalObj.buyerImg = userInfo.buyer.avatar
		globalObj.sellerImg = userInfo.seller.avatar
		
		globalObj.sellerId = userInfo.seller.userId
		globalObj.buyerId = userInfo.buyer.userId
	})
	
	console.log("onLoad")
})

const UserImg = computed((userId) => {
	console.log(userId)
	if(userId === globalObj.buyerId) { return globalObj.buyerImg}
	else if (userId === globalObj.sellerId) { return globalObj.sellerImg}
}) 

onReady(() => {
	console.log("onReady")
	console.log(globalObj)
})

  
const newMessage = ref('');
const sendMessage = () => {
  if (newMessage.value.trim()) {
    messages.value.push({
      text: newMessage.value,
       isUser: true,
       timestamp: Date.now(),
     });
     newMessage.value = '';
   }
 };
 
const GetAvatarByUserId = (userId) => {
	console.log(UserId2Img)
	console.log(userId)
	console.log(UserId2Img.get(userId))
	console.log(UserId2Img.has(userId))
	return UserId2Img.get(userId)
}

const lastMessage = computed(() => messages.value[messages.value.length - 1]);
	const showTimestamp = computed(() => {
	if (messages.value.length < 2) return false;
	const interval = lastMessage.value.timestamp - messages.value[messages.value.length - 2].timestamp;
	
	return interval > 30000; // 30秒
});

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}`;
};

const goback = () => {
	uni.navigateBack()
}
</script>

<style>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10px;
  flex: 1;
}


.message {
  display: flex;                  /* 使用 flex 布局 */
  align-items: center;           /* 垂直居中对齐 */
  margin: 10px 0;                /* 消息之间的垂直间距 */
}

.avatar {
  width: 40px;                   /* 头像宽度 */
  height: 40px;                  /* 头像高度 */
  border-radius: 50%;            /* 圆形头像 */
  flex-shrink: 0;                /* 防止头像缩小 */
}

.bubble {
  flex: 1;                          /* 消息气泡占据剩余空间 */
  background-color: #f1f1f1;        /* 消息气泡背景色 */
  border-radius: 10px;              /* 圆角 */
  padding: 10px;                    /* 内边距 */
  margin: 0 10px;                   /* 水平间距 */
  max-width: calc(100% - 120px);    /* 最大宽度，减去头像的宽度和间距 */
  overflow-wrap: break-word;        /* 允许单词换行 */
}

.content {
  word-wrap: break-word;         /* 允许单词换行 */
}

.margin-bar {
	width: 10%;
}


.avatar-right {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
}

.input-container  {
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
	

.input-box {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.send-button {
  margin-left: 10px;
  padding: 10px 15px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>