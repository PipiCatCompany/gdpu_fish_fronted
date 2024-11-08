"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_user = require("../../api/user.js");
const _sfc_main = {
  __name: "about",
  setup(__props) {
    let user = common_vendor.reactive({
      nickname: "default",
      isStudentCode: false
    });
    {
      let user_storage = api_user.GetUser();
      user.nickname = user_storage.Nickname;
      console.log(user);
    }
    const gotoStudentCode = () => {
      common_vendor.index.navigateTo({
        url: "/pages/about/studentCode/studentCode"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.t(common_vendor.unref(user).nickname),
        c: common_vendor.o(gotoStudentCode)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-13a78ac6"]]);
wx.createPage(MiniProgramPage);
