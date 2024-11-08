"use strict";
const request_index = require("../request/index.js");
const GetStuffPagination = (pageNum, pageSize) => {
  return request_index.request({
    url: `/posts?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: "get"
  });
};
exports.GetStuffPagination = GetStuffPagination;
