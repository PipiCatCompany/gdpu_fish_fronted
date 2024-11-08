<script>
	import { GetOpenId,LoginByOpenId } from '@/api/user.js' ;
	
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
						})
					})
			  }
			});

		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
