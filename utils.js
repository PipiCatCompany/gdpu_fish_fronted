// 操作反馈，无回调处理
export const ToastWrapper = (title,icon) => {
	uni.showToast({
		title: title,
		icon: icon,
		duration: 1000,
		success: () => {}
	})  
}