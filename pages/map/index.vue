<template>
    <view>
	<button class="niceButton3" @click="toMap()">获取当前位置</button>
    </view>
</template>
 
<script>
    const chooseLocation = requirePlugin('chooseLocation');
 
    export default {
        data() {
            return {
                location: {}
            }
        },
        onLoad() {

        },
        onShow() {

        },
        onHide() {
        },
        onUnload() {
        },
        methods: {
			toMap() {
				// 1. 插件页面调用
				let latLng = wx.getStorageSync('location');
				const key = "EBZBZ-5OFKL-7XSPL-MHJYQ-Y7IB5-2FFQV"; // 使用在腾讯位置服务申请的key
				const referer = '情侣厨房'; // 调用插件的app的名称
				const location = JSON.stringify({
				  latitude: 26.065249,
				  longitude: 119.168645
				});
				const category = '中餐厅,西餐,冷饮店';
				 
				uni.navigateTo({
				    url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}&category=${category}`
				})
			},
		}
    }
</script>
 
<style>
 .niceButton3 {
		
         background-color: #23EBB9;
         border-radius: 12px;
         border: none;
         color: white;
         padding: 16px 32px;
         text-align: center;
         text-decoration: none;
         display: inline-block;
         font-size: 16px;
         margin: 4px 2px;
		 margin-top: 60%;
		 margin-left: 33%;
         -webkit-transition-duration: 0.4s;
         transition-duration: 0.4s;
         cursor: pointer;
       }
       .niceButton3:hover {
         background-color: #fff;
         color: #23EBB9;
         border: 1px solid #ccc;
       }
</style>
