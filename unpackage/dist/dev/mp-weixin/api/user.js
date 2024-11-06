"use strict";
const request_index = require("../request/index.js");
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
exports.GetOpenId = GetOpenId;
exports.LoginByOpenId = LoginByOpenId;
