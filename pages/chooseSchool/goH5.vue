<template>
	<web-view :src="url"  @message="handleMessage"></web-view>
</template>
 
<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(options) { 
			this.url = options.url+'?goh5=true&token='+uni.getStorageSync('token')+'&id='+options.id;
			console.log(this.url)
		},
		 methods: {
		    handleMessage(evt) {
		      console.log('接收到的消息:', evt.detail.data);
		      // 在这里处理接收到的消息
		    }
		  }
	}
</script>
 
<style>
 
</style>