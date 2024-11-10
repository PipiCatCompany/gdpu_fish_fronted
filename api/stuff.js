import request from "@/request/index.js";


export const GetStuffPagination = (pageNum,pageSize) => {
	return request({
		url: `/posts?pageNum=${pageNum}&pageSize=${pageSize}`,
		method: 'get',
	})
}

export const GetCommentList = (postId,token) => {
	return request({
		url: `/comments?postId=${postId}`,
		method: 'get',
		token: token
	})
}

export const CreateComment = (data,token) => {
	return request({
		url: "/comment",
		method: 'post',
		data: data,
		token: token
	})
}
