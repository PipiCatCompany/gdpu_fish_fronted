"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "stuffDetail",
  setup(__props) {
    common_vendor.onLoad((options) => {
      let stuffInfo = JSON.parse(decodeURIComponent(options.stuff));
      console.log(stuffInfo);
    });
    const goback = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "arrow-left",
          size: "30"
        }),
        b: common_vendor.o(($event) => goback()),
        c: common_assets._imports_0,
        d: common_assets._imports_0,
        e: common_assets._imports_1,
        f: common_assets._imports_2,
        g: common_vendor.f(4, (i, k0, i0) => {
          return {};
        }),
        h: common_assets._imports_0,
        i: common_vendor.p({
          type: "chat",
          size: "30"
        }),
        j: common_vendor.p({
          type: "star",
          size: "30"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7b66c6e5"]]);
wx.createPage(MiniProgramPage);
