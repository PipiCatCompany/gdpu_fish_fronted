"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_user = require("../../../api/user.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_easycom_uni_icons2 + _easycom_uni_easyinput2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_easyinput)();
}
const _sfc_main = {
  __name: "studentCode",
  setup(__props) {
    let pkg = common_vendor.reactive({
      code: "",
      codeConfirm: "",
      showErr: false,
      ErrMsg: ""
    });
    const updateStudentCode = () => {
      if (pkg.code != pkg.codeConfirm) {
        pkg.showErr = true;
        pkg.ErrMsg = "两次输入学号不匹配！";
      } else if (pkg.code === "" && pkg.codeConfirm === "") {
        pkg.showErr = true;
        pkg.ErrMsg = "输入为空！";
      }
      let user = api_user.GetUser();
      let token = api_user.GetToken();
      api_user.updateUserStudentCode({
        "studentCode": pkg.code,
        "userId": user.UserId,
        "token": token
      }).then((res) => {
        common_vendor.index.showToast({
          title: "绑定成功",
          icon: "success",
          duration: 1e3,
          success: () => {
            setTimeout(() => {
              goback();
            }, 1e3);
          }
        });
      });
    };
    const goback = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          type: "arrow-left",
          size: "30"
        }),
        b: common_vendor.o(($event) => goback()),
        c: common_vendor.o(($event) => common_vendor.unref(pkg).code = $event),
        d: common_vendor.p({
          placeholder: "请输入你的学号...",
          modelValue: common_vendor.unref(pkg).code
        }),
        e: common_vendor.o(($event) => common_vendor.unref(pkg).codeConfirm = $event),
        f: common_vendor.p({
          placeholder: "请再输入你的学号...",
          modelValue: common_vendor.unref(pkg).codeConfirm
        }),
        g: common_vendor.unref(pkg).showErr
      }, common_vendor.unref(pkg).showErr ? {
        h: common_vendor.t(common_vendor.unref(pkg).ErrMsg)
      } : {}, {
        i: common_vendor.o(updateStudentCode)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4c08a70c"]]);
wx.createPage(MiniProgramPage);
