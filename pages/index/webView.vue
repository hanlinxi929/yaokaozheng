<template>
	<view>
		<web-view :src="authUrl" :bindmessage="onMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				authUrl:'',
			}
		},
		onLoad(option) {
			// 构造授权链接
			const redirectUri = encodeURIComponent('https://www.rzjswy.cn/ht/api/auth/callback')
			const authUrl = "https://open.weixin.gg.com/connect/oauth2/authorize?appid=wx187b51075d31bed4&redirect_uri=" + redirectUri + "&response_type=code&scope=snsapi_userinfo&state=13#wechat_redirect";
			this.authUrl = authUrl;
			console.log(this.authUrl)
		}, 
		
		methods: {
			// 接收回调页面传递的 OpenID
			  onMessage(e) {
				  
			    const openid = e.detail.data[0].openid;
			    wx.setStorageSync('serviceAccountOpenid', openid);
			    wx.navigateBack();
			  },
		}
	}
</script>

<style>

</style>
