<template>
	<view>
<uni-easyinput type="password" v-model="password" placeholder="请输入密码"></uni-easyinput>
	</view>
</template>

<script setup>
import {ref} from 'vue'
let password =  ref("")

</script>

<style lang="less">

</style>
