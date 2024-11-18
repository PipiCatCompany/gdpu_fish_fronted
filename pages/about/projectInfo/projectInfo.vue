<template>
	<goback/>
	<view> 
		<uni-card title="关于项目" extra="2024-11-10" style="margin-top 55rpx;">
			<text space="nbsp" class="uni-body">
				&nbsp&nbsp&nbsp&nbsp该小程序是一个二手/兼职信息的聚合检索平台。
				主要为广东药科大学-云浮校区提供一个信息交换的平台。平台收集买卖双方信息只用于维护用户
				身份，并加密处理，不涉及隐私问题。发布方必须是认证的学生，非学生用户只能浏览信息。\n\n
				
				&nbsp&nbsp&nbsp&nbsp项目同时也是我的毕业设计，使用微服务架构，前端采用Uniapp，后端主要使用Go，
				部分服务使用C++完成。\n\n 
				
				&nbsp&nbsp&nbsp&nbsp代码脱敏开源，我代码写得不好，欢迎大佬提Pr👏
			</text>
		</uni-card>
	</view>
</template>

<script setup>
import goback from '@/components/goback.vue'
	
</script>

<style lang="less" scoped>
.goback-header {
	height: 50rpx;
	width: 50rpx;
	padding: 55rpx;
}

</style>
