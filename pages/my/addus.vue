<template>
	<view class="width96">
		<view>
			<scroll-view class="navheight" scroll-y>
				<image :src="imgUrl+'bj1.png'" mode="widthFix" class='width100'></image>
			</scroll-view>
		</view>
		<view class="btn">
			<button  @click.stop="getSelMyselfs()">立即申请</button>
		</view>
	</view>
</template>
<script>
	import {
		imgUrl
	} from "@/common/config.default.js";
	import {
		getSelMyself
	} from "@/api/my.js";
	export default {
		data() {
			return {
				imgUrl: '',

			}
		},
		onShow() {

		},
		onLoad(option) {
			this.imgUrl = imgUrl
		},
		onShareAppMessage(res) {
			var userid = uni.getStorageSync('userid')
			var that = this
			var urls =  '/pages/index/index?userid='+ userid
			// 此处的distSource为分享者的部分信息，需要传递给其他人
			// let distSource = uni.getStorageSync('distSource');
			return {
				title: '耀考证',
				path: urls,
				imageUrl: this.imgUrl+'loginlogo.png'
			}
		},
		// 转发至朋友圈
		onShareTimeline(res) {
			var userid = uni.getStorageSync('userid')
			var that = this
			var urls =  '/pages/index/index?userid='+ userid
			// 此处的distSource为分享者的部分信息，需要传递给其他人
			// let distSource = uni.getStorageSync('distSource');
			return {
				title: '耀考证',
				path: urls,
				imageUrl: this.imgUrl+'loginlogo.png'
			}
		},
		methods: {
			async getSelMyselfs() {
				try {
					const obj = {
						
					};
					const {
						data
					} = await getSelMyself(obj);
					console.log(data)
					if (data.code == 200) {
						console.log(data.data)
						if(data.data==false){
							this.$api.toPage('my/goAddus')
						}else{
							if(data.data.state==0){
								this.$api.toPage('my/goAddus?data='+JSON.stringify(data.data))
							}else{
								
								this.$api.toPage('mychildren/usjieguo?data='+JSON.stringify(data.data))
							}
							
						}
						
					} else {
						console.log(data)
						this.$api.msg(data.msg)
					}
				} catch (e) {
			
				}
			},
		}
	}
</script>


<style lang="less">
	.btn {
		button {
			width: 96%;
			margin: 20rpx auto;
			height: 72rpx;
			background: #2D9DFB;
			border-radius: 20rpx;
			font-size: 28rpx;
			line-height: 72rpx;
			color: #fff;
		}
	}

	.navheight {
		height: 90vh;
	}
</style>