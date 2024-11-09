"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "waterfallCard",
  props: {
    data: Object
  },
  setup(__props) {
    let item = __props;
    console.log(item.data.user_avatar);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(item).data.img,
        b: common_vendor.t(common_vendor.unref(item).data.info),
        c: common_vendor.t(common_vendor.unref(item).data.price),
        d: common_vendor.unref(item).data.user_avatar,
        e: common_vendor.t(common_vendor.unref(item).data.username)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4d2310b4"]]);
wx.createComponent(Component);
