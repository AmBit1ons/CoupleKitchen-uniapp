<template>
	<view class="wrapper">
		<view>
			<view class="top">
				<view class="center">
					<view class="center_top">
						<view class="center_img" >
							<!-- #ifndef MP-WEIXIN -->
							<image :src="image"></image>
							<!-- #endif -->
							<open-data type="userAvatarUrl" class="user_head"></open-data>
						</view>
						<view class="center_info" >
							<view class="center_name">
								<!-- #ifndef MP-WEIXIN -->
								<view>{{userInfo.name}}</view>
								<!-- #endif -->
								<open-data class="nickname" type="userNickName"></open-data>
							</view>
							<view class="center_vip">
								<image class="rank_icon" src="@/static/image/mine/VIP.png"/>
								<view class="vip_text">
									<text style="font-size: 16px;">普通会员</text>
								</view>
							</view>
						</view>
						<view style="margin-left: 140rpx;margin-top: 15rpx;"  @tap="toOtherPage()">
							<image style="width: 30px;height: 30px;" src="@/static/image/mine/setting.png"></image>
						</view>
					</view>
				</view>
				<image src='@/static/image/mine/flow.gif' mode='scaleToFill' class='gif-wave'></image>
			</view>
		</view>


		<!-- 个人中心 -->
		<view class="orders">
			<view class="title">个人中心</view>
			<view class="sorts">

					<view style="margin-top: -10rpx;margin-left: 60rpx;" @tap="toOtherPage()">
						<image src='@/static/image/mine/shoucang.png' style="width: 30px;height: 30px;"></image>
					</view>
					<view style="margin-top: 60rpx;margin-left: -60rpx;margin-bottom: -20rpx;" @tap="toOtherPage()">
						<text class="icon-bill">收藏栏</text>
					</view>
	
					<view style="margin-top: -15rpx;margin-left: 95rpx;" @tap="toOtherPage()">
						<image src='@/static/image/mine/dingdan.png' style="width: 40px;height: 40px;"></image>
					</view>
					<view style="margin-top: 60rpx;margin-left: -70rpx;margin-bottom: -20rpx;" @tap="toOtherPage">
						<text class="icon-car">已下单</text>
					</view>

					<view style="margin-top: -15rpx;margin-left: 95rpx;" @tap="hrefrouterApp()">
						<image src='@/static/image/mine/shipu.png' style="width: 40px;height: 40px;"></image>
					</view>
					<view style="margin-top: 60rpx;margin-left: -70rpx;margin-bottom: -20rpx;" @tap="hrefrouterApp()">
						<text class="icon-money">食谱单</text>
					</view>

					<view style="margin-top: -15rpx;margin-left: 95rpx;" @tap="hrefrouterCount()">
						<image src='@/static/image/mine/jisuan.png' style="width: 40px;height: 40px;"></image>
					</view>
					<view style="margin-top: 60rpx;margin-left: -85rpx;margin-bottom: -20rpx;" @tap="hrefrouterCount()">
						<text class="icon-list">热量计算</text>
					</view>
				
			</view>
		</view>
		<view class="address icon-arrow" @tap="hrefrouterMedia()">
			看点好剧
		</view>
		<!-- 其它 -->
		<view class="extra">
			<view @tap="hrefrouterService()" class="item icon-arrow">联系客服</view>
			<button open-type="feedback" class="item icon-arrow">意见反馈</button>
		</view>
		<view>
			<!-- 弹窗 -->
			<uni-popup ref="popup" background-color="#fff">
				<view class="settlement" style="width: 500px height: 500px;">
					<text class="text" >功能未开发</text>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				image:'../static/image/touxiang.JPG',
			}
		},
		methods: {
			toOtherPage() {
				this.$refs.popup.open("center")
			},
			 // 触发跳转
			    hrefrouterApp() {
			      let url = 'https://m.xiangha.com/'  // URL是要跳转的外部地址 作为参数
			      uni.navigateTo({
			        url: '/pages/webview/webview1?url=' + url
			        // page.json定义的路径 传url 到webview界面去接收 实现跳转
			      })
			 
			    },
				hrefrouterCount() {
				  let url = 'https://www.kalulijisuan.com/'  // URL是要跳转的外部地址 作为参数
				  uni.navigateTo({
				    url: '/pages/webview/webviewcount?url=' + url
				    // page.json定义的路径 传url 到webview界面去接收 实现跳转
				  })
							 
				},
				hrefrouterMedia() {
				  let url = 'https://v.qq.com/'  // URL是要跳转的外部地址 作为参数
				  uni.navigateTo({
				    url: '/pages/webview/webviewcount?url=' + url
				    // page.json定义的路径 传url 到webview界面去接收 实现跳转
				  })
							 
				},
				hrefrouterService() {
				  let url = 'https://kf.weixin.qq.com/'  // URL是要跳转的外部地址 作为参数
				  uni.navigateTo({
				    url: '/pages/webview/webviewcount?url=' + url
				    // page.json定义的路径 传url 到webview界面去接收 实现跳转
				  })
							 
				},

		}
	};
</script>

<style scoped lang="scss">
	Page {
		font-size: 14px;
	}
	.settlement{
	 width: 400rpx;
	 height: 400rpx;
	 line-height: 400rpx;
	 text-align: center;
 }
	.top {
		width: 100%;
		height: 130px;
		background: #23EBB9;
		padding-top: 15px;
		position: relative;
	}

	.center {
		width: 95%;
		height: 100px;
		background: white;
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		border-radius: 5px;
	}

	.center_top {
		display: flex;
		flex-direction: row;
		width: 80%;
		height: 80px;
		margin: 0 auto;
		margin-top: 20rpx;
		border-bottom: 1px solid #EEEEEE;
	}

	.center_img {
		width: 66px;
		height: 66px;
		border-radius: 50%;
		overflow: hidden;
	}

	.center_img image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.center_img .user_head {
		width: 100%;
		height: 100%;
	}

	.center_info {
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		margin-left: 30px;
	}

	.center_name {
		font-size: 20px;
	}

	.center_phone {
		color: #BEBEBE;
	}

	.center_rank {
		width: 50%;
		height: 35px;
		display: flex;
		flex-direction: row;
	}

	.rank_text {
		height: 35px;
		line-height: 35px;
		margin-left: 10rpx;
		color: #AAAAAA;
	}

	.center_vip image {
		width: 25px;
		height: 25px;
		margin-top: 15rpx;
	}

	.vip_icon {
		width: 25px;
		height: 25px;
		margin-top: -10rpx;
	}

	.vip_text {
		margin-top: -55rpx;
		margin-left: 50rpx;
		color: #AAAAAA;
	}

	.center_rank image {
		width: 35px;
		height: 35px;
	}

	.center_score {
		width: 50%;
		height: 35px;
		display: flex;
		flex-direction: row;
	}

	.center_score image {
		width: 35px;
		height: 35px;
	}

	.gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	.wrapper {
		position: absolute;
		top: 0;
		bottom: 0;

		width: 100%;
		background-color: #F4F4F4;
	}

	.profile {
		height: 375rpx;
		background-color: #ea4451;
		display: flex;
		justify-content: center;
		align-items: center;

		.meta {
			.avatar {
				display: block;
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				border: 2rpx solid #fff;
				overflow: hidden;
			}

			.nickname {
				display: block;
				text-align: center;
				margin-top: 20rpx;
				font-size: 30rpx;
				color: #fff;
			}
		}
	}

	.count {
		display: flex;
		margin: 0 20rpx;
		height: 120rpx;
		text-align: center;
		border-radius: 4rpx;
		background-color: #fff;

		position: relative;
		top: 10rpx;

		.cell {
			margin-top: 10rpx;
			flex: 1;
			padding-top: 20rpx;
			font-size: 27rpx;
			color: #333;
		}

		text {
			display: block;
			font-size: 24rpx;
		}
	}

	.orders {
		margin: 20rpx 20rpx 0 20rpx;
		padding: 40rpx 0;
		background-color: #fff;
		border-radius: 4rpx;

		.title {
			padding-left: 20rpx;
			font-size: 30rpx;
			color: #333;
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid #eee;
			margin-top: -30rpx;
		}

		.sorts {
			padding-top: 30rpx;
			text-align: center;
			display: flex;
		}

		[class*="icon-"] {
			flex: 1;
			font-size: 24rpx;

			&::before {
				display: block;
				font-size: 48rpx;
				margin-bottom: 8rpx;
				color: #ea4451;
			}
		}
	}

	.address {
		line-height: 1;
		background-color: #fff;
		font-size: 30rpx;
		padding: 25rpx 0 25rpx 20rpx;
		margin: 10rpx 20rpx;
		color: #333;
		border-radius: 4rpx;
	}

	.extra {
		margin: 0 20rpx;
		background-color: #fff;
		border-radius: 4rpx;

		.item {
			line-height: 1;
			padding: 25rpx 0 25rpx 20rpx;
			border-bottom: 1rpx solid #eee;
			font-size: 30rpx;
			color: #333;
		}

		button {
			text-align: left;
			background-color: #fff;

			&::after {
				border: none;
				border-radius: 0;
			}
		}
	}

	.icon-arrow {
		position: relative;

		&::before {
			position: absolute;
			top: 50%;
			right: 20rpx;
			transform: translateY(-50%);
		}
	}
</style>

