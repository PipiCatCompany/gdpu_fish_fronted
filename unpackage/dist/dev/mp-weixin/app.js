"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const api_user = require("./api/user.js");
if (!Math) {
  "./pages/about/about.js";
  "./pages/message/message.js";
  "./pages/stuff/stuff.js";
  "./pages/about/studentCode/studentCode.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
    common_vendor.index.login({
      provider: "weixin",
      success: function(loginRes) {
        let code = loginRes.code;
        api_user.GetOpenId(code).then((res) => {
          let openid = res.data.Openid;
          api_user.LoginByOpenId(openid).then((res2) => {
            try {
              common_vendor.index.setStorageSync("user", res2.data.user);
            } catch (e) {
              console.log(e);
            }
          });
        });
      }
    });
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
