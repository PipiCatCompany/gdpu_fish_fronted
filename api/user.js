import request from "@/request/index.js";

// utils functions 
// getStorageSync 不加try-catch 小程序会crash storage - 估计强制异步
export const GetToken = () => {
	try {  
	    return uni.getStorageSync("token") 
	} catch (error) {  
	    console.log(error)  
	}
}

export const GetUser = () => {
	try {
	    return  uni.getStorageSync("user")
	} catch (error) {  
	    console.log(error)  
	}
}

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

export const updateUserStudentCode = (data,token) => { 
	return request({
		url: '/user/studentcode',
		method: 'put',
		data: data,
		token: token
	})
}

export const Logout = (userId,token) => {
	return request({
		url: `/user/logout?userId=${userId}`,
		method: 'get',
		token: token
	})
}