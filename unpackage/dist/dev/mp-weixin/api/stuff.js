"use strict";
const request_index = require("../request/index.js");
const GetStuffPagination = (pageNum, pageSize) => {
  return request_index.request({
    url: `/posts?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: "get"
  });
};
const GetCommentList = (postId, token) => {
  return request_index.request({
    url: `/comments?postId=${postId}`,
    method: "get",
    token
  });
};
const CreateComment = (data, token) => {
  return request_index.request({
    url: "/comment",
    method: "post",
    data,
    token
  });
};
exports.CreateComment = CreateComment;
exports.GetCommentList = GetCommentList;
exports.GetStuffPagination = GetStuffPagination;
