"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  __name: "waterfallCard",
  props: {
    data: Object
  },
  setup(__props) {
    let item = __props;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(item).data.img,
        b: common_vendor.t(common_vendor.unref(item).data.info),
        c: common_vendor.t(common_vendor.unref(item).data.price),
        d: common_assets._imports_0
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4d2310b4"]]);
wx.createComponent(Component);
