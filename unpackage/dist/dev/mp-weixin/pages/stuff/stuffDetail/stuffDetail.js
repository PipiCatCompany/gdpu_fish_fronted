"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const api_stuff = require("../../../api/stuff.js");
const api_user = require("../../../api/user.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_easycom_uni_icons2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_easyinput2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_easyinput)();
}
const _sfc_main = {
  __name: "stuffDetail",
  setup(__props) {
    let stuffInfo = common_vendor.ref();
    let comments = common_vendor.ref();
    let commentLen = common_vendor.ref(0);
    let myComment = common_vendor.ref("");
    let GlobalObj = common_vendor.reactive({
      post_id: "",
      token: "",
      user: {}
    });
    const popup = common_vendor.ref(null);
    common_vendor.onLoad((options) => {
      let data = JSON.parse(decodeURIComponent(options.stuff));
      stuffInfo.value = data;
      console.log(stuffInfo.value);
      let postId = data.post_id;
      let token = api_user.GetToken();
      GlobalObj.post_id = data.post_id;
      GlobalObj.token = token;
      GlobalObj.user = api_user.GetUser();
      api_stuff.GetCommentList(postId, token).then((res) => {
        comments.value = res.data;
        commentLen.value = res.data.length;
      });
    });
    const goback = () => {
      common_vendor.index.navigateBack();
    };
    const open = () => {
      popup.value.open("bottom");
    };
    const sendComment = () => {
      if (myComment.value === "")
        return;
      console.log(GlobalObj.user);
      api_stuff.CreateComment({
        "content": myComment.value,
        "post_id": GlobalObj.post_id,
        "user_id": GlobalObj.user.UserId
      }, GlobalObj.token).then((_) => {
        popup.value.close("bottom");
        api_stuff.GetCommentList(GlobalObj.post_id, GlobalObj.token).then((res) => {
          comments.value = res.data;
          commentLen.value = res.data.length;
        });
        common_vendor.index.showToast({
          title: "评论成功",
          icon: "success",
          duration: 1e3,
          success: () => {
            setTimeout(() => {
            }, 1e3);
          }
        });
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "arrow-left",
          size: "30"
        }),
        b: common_vendor.o(($event) => goback()),
        c: common_vendor.unref(stuffInfo).user_avatar,
        d: common_vendor.t(common_vendor.unref(stuffInfo).username),
        e: common_vendor.unref(stuffInfo).img,
        f: common_assets._imports_0$1,
        g: common_assets._imports_1,
        h: common_vendor.t(common_vendor.unref(stuffInfo).title),
        i: common_vendor.t(common_vendor.unref(stuffInfo).price),
        j: common_vendor.t(common_vendor.unref(stuffInfo).info),
        k: common_vendor.t(common_vendor.unref(commentLen)),
        l: common_vendor.f(common_vendor.unref(comments), (comment, k0, i0) => {
          return {
            a: comment.avatar,
            b: common_vendor.t(comment.username),
            c: common_vendor.t(comment.create_time),
            d: common_vendor.t(comment.content)
          };
        }),
        m: common_vendor.sr("inputClose", "7b66c6e5-2,7b66c6e5-1"),
        n: common_vendor.o(_ctx.dialogInputConfirm),
        o: common_vendor.p({
          mode: "input",
          title: "输入内容",
          value: "对话框预置提示内容!",
          placeholder: "请输入内容"
        }),
        p: common_vendor.sr("inputDialog", "7b66c6e5-1"),
        q: common_vendor.p({
          type: "dialog"
        }),
        r: common_vendor.o(open),
        s: common_vendor.p({
          type: "chat",
          size: "30"
        }),
        t: common_vendor.p({
          type: "star",
          size: "30"
        }),
        v: common_vendor.o(($event) => common_vendor.isRef(myComment) ? myComment.value = $event : myComment = $event),
        w: common_vendor.p({
          autoHeight: true,
          type: "textarea",
          placeholder: "看对眼就留言...",
          modelValue: common_vendor.unref(myComment)
        }),
        x: common_vendor.o(sendComment),
        y: common_vendor.sr(popup, "7b66c6e5-5", {
          "k": "popup"
        }),
        z: common_vendor.p({
          type: "bottom",
          ["border-radius"]: "10px 10px 0 0"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7b66c6e5"]]);
wx.createPage(MiniProgramPage);
