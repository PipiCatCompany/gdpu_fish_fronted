import request from "@/request/index.js";

// wx.login获取临时code获取openid
export const GetOpenId = (code) => {
	return request({
		url: `/openid?code=${code}`,
		method: 'get',
	})
}

export const LoginByOpenId = (openid) => {
	return request({
		url: `/login_openid?openid=${openid}`,
		method: 'get',
	})
}