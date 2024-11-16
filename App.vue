<script>
	import { GetOpenId,LoginByOpenId,Logout,GetToken,GetUser } from '@/api/user.js' ;
	
	export default {
		onLaunch: function() {
			console.log('App Launch')	
		},
		onShow: function() {
			console.log('App Show')
			
			// 启动了之后自动登陆
			uni.login({
			  provider: 'weixin',
			  success: function (loginRes) {
				let code = loginRes.code ; 

				GetOpenId(code)
					.then(res => {
						let openid = res.data.Openid 
						LoginByOpenId(openid).then(res => {
							try {
								// 用户信息持久化本地
								uni.setStorageSync('user', res.data.user);
								// 持久化令牌
								uni.setStorageSync('token', res.data.accessToken);
								
							} catch (e) {
								console.log(e)
							}
							
							console.log("登陆成功")
							let userId = res.data.user.UserId 
							// 用身份信息建立长连接
							// 连接长连接服务
							var socketTask = uni.connectSocket({
								url: 'ws://192.168.1.110:10087/web?userId=' + userId,
								success() {
									console.log("长连接服务-连接成功");
								},
								fail() {
									console.log("长连接服务-连接失败");
								}
							});
							
							// 监听连接打开事件
							socketTask.onOpen(() => {
								console.log("WebSocket 连接已打开");
								let data = {
									"username": "lj",
									"message": "发消息测试"
								}
								socketTask.send(JSON.stringify(data))
								console.log("消息已发送");
							
							});
							
							// 监听连接错误事件
							socketTask.onError((error) => {
								console.error("WebSocket 连接错误", error);
							});
							
							// 监听接收到的消息
							socketTask.onMessage((message) => {
								console.log("接收到消息:", message.data);
							});
							
							// 监听连接关闭事件
							socketTask.onClose(() => {
								console.log("WebSocket 连接已关闭");
							});
						})
					})
			  }
			});
			
			



		},
		onHide: function() {
			console.log('App Hide')
		},
		onExit: function() {
			let token = GetToken()
			let user = GetUser()
			Logout(user.UserId,token).then(res => { console.log(res)})
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
