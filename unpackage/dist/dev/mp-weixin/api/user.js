"use strict";
const common_vendor = require("../common/vendor.js");
const request_index = require("../request/index.js");
const GetToken = () => {
  try {
    return common_vendor.index.getStorageSync("token");
  } catch (error) {
    console.log(error);
  }
};
const GetUser = () => {
  try {
    return common_vendor.index.getStorageSync("user");
  } catch (error) {
    console.log(error);
  }
};
const GetOpenId = (code) => {
  return request_index.request({
    url: `/openid?code=${code}`,
    method: "get"
  });
};
const LoginByOpenId = (openid) => {
  return request_index.request({
    url: `/login_openid?openid=${openid}`,
    method: "get"
  });
};
const updateUserStudentCode = (data, token) => {
  return request_index.request({
    url: "/user/studentcode",
    method: "put",
    data,
    token
  });
};
exports.GetOpenId = GetOpenId;
exports.GetToken = GetToken;
exports.GetUser = GetUser;
exports.LoginByOpenId = LoginByOpenId;
exports.updateUserStudentCode = updateUserStudentCode;
