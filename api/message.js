import request from "@/request/index.js";

export const GetMessageByPagination = (token,pageSize,pageNum,chatroomId) => {
	return request({
		url: `/msgs?pageSize=${pageSize}&pageNum=${pageNum}&chatroomId=${chatroomId}`,
		method: 'get',
		token: token
	})
}

export const GetMessageChanelInfo = (token,chatroomId) => {
	return request({
		url: `/msgChanel?chatroomId=${chatroomId}`,
		method: 'get',
		token: token
	})
}