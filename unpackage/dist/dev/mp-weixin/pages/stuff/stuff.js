"use strict";
const common_vendor = require("../../common/vendor.js");
const api_stuff = require("../../api/stuff.js");
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
    let stuffList = common_vendor.reactive([]);
    {
      console.log("start");
      api_stuff.GetStuffPagination(1, 10).then((res) => {
        console.log(res);
        for (let i = 0; i < res.data.length; i += 2) {
          let pair = [];
          pair.push(res.data[i]);
          if (i + 1 < res.data.length) {
            pair.push(res.data[i + 1]);
          }
          console.log(pair[0]);
          stuffList.push(pair);
        }
      });
    }
    const gotoDetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/stuff/stuffDetail/stuffDetail"
      });
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
        d: common_vendor.f(common_vendor.unref(stuffList), (pair, k0, i0) => {
          return common_vendor.e({
            a: "a4cab53f-1-" + i0,
            b: common_vendor.p({
              data: pair[0]
            }),
            c: pair[1]
          }, pair[1] ? {
            d: common_vendor.o(gotoDetail),
            e: "a4cab53f-2-" + i0,
            f: common_vendor.p({
              data: pair[1]
            })
          } : {});
        }),
        e: common_vendor.o(gotoDetail)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a4cab53f"]]);
wx.createPage(MiniProgramPage);
