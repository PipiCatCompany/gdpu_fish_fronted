import request from "@/request/index.js";


export const GetStuffPagination = (pageNum,pageSize) => {
	return request({
		url: `/posts?pageNum=${pageNum}&pageSize=${pageSize}`,
		method: 'get',
	})
}

