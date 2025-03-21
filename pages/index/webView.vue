<template>
  <div>
    <!-- 显示授权加载状态 -->
    <div v-if="loading" class="loading-container">
      <text>正在加载授权页面...</text>
    </div>

    <!-- 加载授权页面 -->
    <web-view v-if="!loading" :src="authUrl" @message="handleMessage"></web-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true, // 控制加载状态
      authUrl: '',   // 授权跳转URL
    };
  },
  created() {
    // 初始化授权跳转URL
    this.initAuthUrl();
  },
  methods: {
    // 初始化授权跳转URL
    initAuthUrl() {
      const redirectUri = encodeURIComponent('https://www.rzjswy.cn/hs/api/auth/callback'); // 获取当前域名并编码

      const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx187b51075d31bed4&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;

      this.authUrl = authUrl; // 设置授权URL
      this.loading = false; // 结束加载状态
    },

    // 处理授权回调消息
    handleMessage(event) {
		console.log("111111")
		// 返回上一页或跳转到主页面
		this.$router.go(-1); // 返回上一页
      // const openid = event.data.openid; // 获取回调中的openid
      // if (openid) {
      //   // 将openid存储到本地
      //   localStorage.setItem('serviceAccountOpenid', openid);
      //   返回上一页或跳转到主页面
      //   this.$router.push('/index'); // 使用Vue Router跳转
      // }
    },
  },
};
</script>


<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f9fc;
}

text {
  font-size: 18px;
  color: #333;
}
</style>

