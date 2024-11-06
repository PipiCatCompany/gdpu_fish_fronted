"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_easyinput + waterfallCard)();
}
const waterfallCard = () => "../../components/waterfallCard.js";
const _sfc_main = {
  __name: "stuff",
  setup(__props) {
    let query = common_vendor.ref("");
    const onClick = () => {
      console.log("qifei");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onClick),
        b: common_vendor.o(($event) => common_vendor.isRef(query) ? query.value = $event : query = $event),
        c: common_vendor.p({
          suffixIcon: "search",
          placeholder: "搜索闲置物品...",
          modelValue: common_vendor.unref(query)
        }),
        d: common_vendor.f(20, (i, k0, i0) => {
          return {
            a: "a4cab53f-1-" + i0,
            b: "a4cab53f-2-" + i0
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a4cab53f"]]);
wx.createPage(MiniProgramPage);
