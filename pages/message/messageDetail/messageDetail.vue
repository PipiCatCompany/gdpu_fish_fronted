<template>
  <view>
   <view class="header" style="border-bottom: 1px solid gray; height: 120rpx; background-color: white; width: 750rpx; display: flex; position: fixed; z-index: 999;">
    <view class="goback-header" @click="goback()" 
    style="display: flex;  height: 100rpx; width: 100%; padding: 10rpx 34rpx; 0rpx 34rpx;">
     <uni-icons type="arrow-left" size="30"></uni-icons> 
     
     <view class="stuff-info" style="display: flex; margin-left: 40rpx;">
      <img style="height: 100rpx; width: 100rpx;" src="@/static/logo.png" alt="" />
      <view class="info">
       <view style="margin-left: 40rpx; font-weight: 700; margin-top: auto;">卖家名</view>
       <view style="margin-left: 40rpx; font-weight: 700; margin-top: auto;">99.0</view>
      </view>
     </view>
  
    </view>
   </view>
  </view>	
	
  <view class="chat-container">
	<!-- 聊天和顶部的margin -->
	<view class="margin-bar"  style="margin-top: 130rpx;"></view> 
	  
    <view v-for="(msg, index) in messages" :key="index" class="message">
      <view class="avatar" :class="{ 'right': msg.isUser }">
        <img :src="msg.isUser ? userAvatar : friendAvatar" class="avatar-image" /></img>
      </view>
      <view class="bubble" :class="{ 'right': msg.isUser }">
        <view class="content">{{ msg.text }}</view>
      </view>
    </view>
    <view class="timestamp" v-if="showTimestamp">
      {{ formatTimestamp(lastMessage.timestamp) }}
    </view>
    <view class="input-container">
      <input v-model="newMessage" class="input-box" placeholder="输入消息..." />
      <button @click="sendMessage" class="send-button">发送</button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
    const userAvatar = '@/static/logo.png'; // 用户头像路径
    const friendAvatar = '@/static/logo.png'; // 朋友头像路径
    const messages = ref([
      { text: '你好！xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', isUser: false, timestamp: Date.now() },
      { text: '你好，最近怎么样？', isUser: true, timestamp: Date.now() + 10000 },
	  { text: '你好！', isUser: false, timestamp: Date.now() },
	  { text: '你好，最近怎么样？', isUser: true, timestamp: Date.now() + 10000 },
	  { text: '你好！', isUser: false, timestamp: Date.now() },
	  { text: '你好，最近怎么样？', isUser: true, timestamp: Date.now() + 10000 },
	  { text: '你好！', isUser: false, timestamp: Date.now() },
	  { text: '你好，最近怎么样？', isUser: true, timestamp: Date.now() + 10000 },
	  { text: '你好，最近怎么样？', isUser: true, timestamp: Date.now() + 10000 },
	  { text: '你好！', isUser: false, timestamp: Date.now() },
	  { text: '你好，最近怎么样？', isUser: true, timestamp: Date.now() + 10000 },
	  { text: '你好！', isUser: false, timestamp: Date.now() },
	  { text: '你好，最近怎么样？', isUser: true, timestamp: Date.now() + 10000 },
	  { text: '你好！', isUser: false, timestamp: Date.now() },
	  { text: '你好，最近怎么样？', isUser: true, timestamp: Date.now() + 10000 },
	  { text: '你好，最近怎么样？', isUser: true, timestamp: Date.now() + 10000 },
	  { text: '你好！', isUser: false, timestamp: Date.now() },
	  { text: '你好，最近怎么样？', isUser: true, timestamp: Date.now() + 10000 },
	  { text: '你好！', isUser: false, timestamp: Date.now() },
	  { text: '你好，最近怎么样？', isUser: true, timestamp: Date.now() + 10000 },
	  { text: '你好！', isUser: false, timestamp: Date.now() },
	  { text: '你好，最近怎么样？', isUser: true, timestamp: Date.now() + 10000 },
	  { text: '你好，最近怎么样？', isUser: true, timestamp: Date.now() + 10000 },
	  { text: '你好！', isUser: false, timestamp: Date.now() },
	  { text: '你好，最近怎么样？', isUser: true, timestamp: Date.now() + 10000 },
	  { text: '你好！', isUser: false, timestamp: Date.now() },
	  { text: '你好，最近怎么样？', isUser: true, timestamp: Date.now() + 10000 },
	  { text: '你好！', isUser: false, timestamp: Date.now() },
	  { text: '你好，最近怎么样？', isUser: true, timestamp: Date.now() + 10000 },
      // 其他消息...
    ]);
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
}

.message {
  display: flex;
  margin: 10px 0;
}

.avatar {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.avatar-image {
  width: 100%;
  border-radius: 50%;
}

.bubble {
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  position: relative;
}

.bubble.right {
  margin-left: auto;
  background-color: #d1f0d1; /* 自己的消息背景色 */
}

.timestamp {
  text-align: center;
  margin: 10px 0;
  color: #888;
}

.input-container {
  display: flex;
  align-items: center;
  margin-top: auto;
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