import request from "@/request/index.js";


export const GetQiNiuToken = (token) => {
	return request({
		url: "/qiniu/token",
		method: 'get',
		token: token
	})
}
