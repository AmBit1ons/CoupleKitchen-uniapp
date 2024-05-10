export default {
	// 监听用户点击右上角菜单的「转发」按钮时触发的事件
	onShareAppMessage() {
		// 设置转发的参数
		return {
			title: "情侣厨房",
			// path: '',
			imageUrl: "/static/logo.png",
			success: function(res) {
				// console.log(res, '用户转发');
				if (res.errMsg == 'shareAppMessage:ok') {
					console.log("用户转发成功", res)
				}
			},
			fail: function(res) {
				console.log("用户转发失败", res)
			}
		}
	},
	// 分享到朋友圈
	onShareTimeline: function(res) {
		console.log("用户分享到朋友圈", res)
		return {
			title: '情侣厨房',
			imageUrl: '/static/logo.png',
			query: ''
		}
	},
	// 收藏
	onAddToFavorites: function(res) {
		console.log("用户收藏", res)
		return {
			title: '情侣厨房',
			imageUrl: '/static/logo.png',
			query: '',
		}
	}
}