<template>
	<view class="container">
		<view class="page">
			<image class="logo" src="@/static/logo.png" mode="widthFix" />
			<text class="title" v-if="restaurant">{{ restaurant.name }}</text>
			<text class="table">为你的幸福定制菜单</text>
		</view>


		<view class="number-of-people-bg">
			<view class="number-of-people">
				<text>请选择就餐人数: </text>
				<view class="table-num table-scroll">
					<scroll-view scroll-x="true" class="scroll-view_H" :enable-flex="true">
						<view class="table-block">
							<block v-for="(diners, index) in people" :key="index">
								<view @click="choice(index, diners)" :class="{activetext:index === dinersIndex}">
									{{diners}}</view>
							</block>
						</view>
					</scroll-view>

					<!-- 按钮 -->
					<view class="start-diancan" :class="[dinersIndex > -1 ? 'start-activ' : '']" @click="goToMenu()">
						开始吃饭</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dinersIndex: -1,
				tableNumber: undefined,
				restaurant: undefined,
				people: [1, 2, 3, 4, 5, 6],
			}
		},
		async onLoad({
			number,
			rid
		}) {

			//校验是否已经登录
			let token = uni.getStorageSync('token')
			if(!token){
				uni.navigateTo({
					url: '/pages/login/index'
				})
			}


			this.tableNumber = number || 1 
			this.restaurantId = rid || 1 

			let restaurant = await this.$api('restaurants', parseInt(this.restaurantId))
			this.restaurant = restaurant;
			uni.setStorageSync('restaurant', restaurant)
			uni.setStorageSync('tableNumber', this.tableNumber)
		},
		methods: {
			//选择人数
			choice(index, diners) {
				this.dinersIndex = index
				console.log(diners)
				uni.setStorageSync('numberOfDiners', diners)
			},

			//开始点餐
			goToMenu() {
				if (this.num <= -1) { //是否选择了人数
					return false
				} else {
					uni.switchTab({
						url: '/pages/home/index'
					})
				}
			}

		}
	}
</script>

<style>
	.container {}

	.page {
		/* 	  height: 800rpx; */
		/* 	  background-color: pink; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.bg-img {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.logo {
		width: 160rpx;
		height: 160rpx;
		border-radius: 100rpx;
		margin-top: 80rpx;
	}

	.title {
		margin-top: 30rpx;
		font-size: 40rpx;
		font-weight: 500;
	}

	.table {
		margin-top: 20rpx;
		font-size: 28rpx;
	}

	.number-of-people {
		padding: 28rpx 0rpx 0rpx 18rpx;
	}

	.number-of-people-bg {
		margin: 198rpx 0rpx 0rpx 84rpx;
		width: 580rpx;
		height: 380rpx;
		border-radius: 26rpx;
		background-color: #fbf5f6b8;
	}

	.table-num {
		font-size: 30rpx;
		padding-left: 0rpx;
		margin-top: 72rpx
	}

	.table-block {
		display: flex;
		align-items: center;
	}

	.table-block view {
		height: 56rpx;
		line-height: 56rpx;
		text-align: center;
		background-color: #c9d9e8;
		margin-right: 25rpx;
		padding: 0 50rpx;
		border-radius: 60rpx;
	}

	/* 点击后加上颜色*/
	.activetext {
		background-color: #f9dd89 !important;
	}

	/* 按钮 */
	.start-diancan {
		display: inline-block;
		width: 206rpx;
		height: 81rpx;
		line-height: 80rpx;
		background-color: #b5d4e2;
		color: #fff;
		text-align: center;
		margin: 64rpx 20rpx 0 168rpx;
		border-radius: 32rpx;
	}

	.start-activ {
		/* background-color: #f6c947 !important; */
		color: #000000 !important;
		background: linear-gradient(to right, #f8da81, #f8d771, #f7d362, #f6cb4a) !important;
	}
</style>
