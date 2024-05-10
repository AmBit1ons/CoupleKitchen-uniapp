<template>
	<view class="container">
		<view class="intro">
			<image src="/static/logo.png"></image>
			<view class="tips">
				幸福在当下
				<br>
				眼中景 碗中餐 身边人
			</view>
		</view>
		<view class="bottom">
			<!-- #ifdef H5 -->
				<!-- todo 添加传统的H5登录表单 -->
				<button type="primary" size="default" class="login-btn" @tap="login">
					登录
				</button>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
				<button type="primary" size="default" class="login-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">
					<image src="/static/image/wechat.png"></image>
					微信一键登录
				</button>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			async getUserInfo(e) {
				const {errMsg, userInfo} = e.detail
				console.log(errMsg)
				console.log(userInfo)
				if(errMsg !== "getUserInfo:ok") {
					uni.showModal({
						title: '提示',
						content: '您取消了登录授权，请重新授权',
						showCancel: false
					})
					uni.navigateBack()
					return
				}

				const {avatarUrl: avatar, city, country, gender, nickName: nickname, province} = userInfo
				let user = {avatar, city, country, gender, nickname, province};
				uni.setStorageSync('user', user);

				//通过uni.login获取openid, 然后拿着openid去数据库查询对应的user, 并获取token
				uni.login({
				    provider: 'weixin',
				    success: (res) => {
				        console.log('uni login res: ', res);

				        if (res.errMsg == 'login:ok') {
				            //TODO 获取code 携带code参数调用后端接口
				            const code = res.code; //微信JS_Code
							      console.log("weixin code = " + code)
							      this.loginByCode({code});
				        }
				    }
				});
			},
			loginByCode(data) {
				//这里用模拟替代
			    this.mock({
			        url: '/api/user/loginByCode',
			        data: data,
					method: "POST"
			    });
			},

			//由后端服务器去请求微信官方, 根据code获取openId
			mock(data){
				//模拟后端接口去访问微信官方获取openId
				uni.request({
					url: "https://api.weixin.qq.com/sns/jscode2session?appid=wxed57b7827ad11d44&secret=98a11f88ffd0f9c36fd1686ebc908ee5&js_code="+ data.data.code +"&grant_type=authorization_code",
					method: "GET",
					success: ({errMsg, data}) => {
						if(errMsg === "request:ok"){
							let openid = data.openid;
							uni.setStorageSync('openid', openid);
							console.log("weixin openid = " + openid)

							uni.showModal({
								title: '提示',
								content: '获取openId成功, openid = ' + openid,
								showCancel: false
							});

							//根据openid获取数据库中的对应的用户id, 生成token
							let user = this.queryUserByOpenId(openid);

							if(user){
								//帮助用户登录, mock一个token
								let token = this.genToken(user.id);
								uni.setStorageSync('token', token);
							}else{
								//TODO 注册一个用户
							}

							setTimeout(()=>{
								uni.showModal({
										title: '提示',
										content: '登陆成功!',
										showCancel: false
								})
								uni.navigateBack()
								uni.redirectTo({
								            //关闭当前页面，跳转到应用内的某个页面。
								            url:'/pages/index/index'
								        })
							}, 3000)
							
						}else{
							uni.showToast({
								title: '获取openId失败, errMsg = ' + errMsg,
								icon: 'error',
								mask: true
							});
						}
						
					}
				})
			},

			queryUserByOpenId(openid){
				//mock 随便返回个假用户
				return {id: 1, name: "Lili", openid}
			},

			genToken(uid){
				return Math.random() + ":" + uid
			},

			login() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.intro {
		width: 100%;
		height: 60vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		font-size: $font-size-base;
		color: $text-color-assist;

		image {
			width: 165rpx;
			height: 165rpx;
		}

		.tips {
			line-height: 72rpx;
			text-align: center;
		}
	}

	.bottom {
		height: 40vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0 40rpx;

		.login-btn {
			width: 100%;
			border-radius: 50rem !important;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 10rpx 0;

			image {
				width: 36rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}
		}
	}
</style>
