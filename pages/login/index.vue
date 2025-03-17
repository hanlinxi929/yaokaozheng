<template>
	<view class="login-box">
		<image :src="imgUrl+'img00.png'" mode="widthFix" class="headerbj"></image>
		<image :src="imgUrl+'loginlogo.png'" class="login-ico" mode="widthFix"></image>
		<view class="login-btn">
			<!-- 授权并获取手机号 -->
			<button v-if="agreementFlag" open-type="getPhoneNumber" @getphonenumber="getPhone">用户一键登录</button>
			<button @tap="loginClick()" v-else>用户一键登录</button>
		</view>
		<view class="">
			<view class="agreement-box flex align-center" @tap="agreementClick">
				<image :src="imgUrl+'selected.png'" v-if="agreementFlag"></image>
				<image :src="imgUrl+'select.png'" v-else></image>
				已阅读并同意<text class="red" @tap="serveClick">《服务协议》</text>和<text class="red"
					@tap="privacyClick">《隐私协议》</text>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="pop-box">
				<view class="pop-title">授权登录</view>
				<view class="remark">获取你的昵称、头像、地区及性别</view>
				<view class="info-box">
					<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
						<image :src="imgUrl+'icon-avatar-default.png'" class="head-img" v-if="!userInfo.avatar"></image>
						<image :src="userInfo.avatar" class="head-img" v-else></image>
					</button>
					<view class="info-text">
						<input v-model="userInfo.name" type="nickname" @change="onInputChange" placeholder="请输入昵称" />
						<text class="text">微信个人信息</text>
					</view>
				</view>
				<view class="pop-btn">
					<button @tap="refuseClick">拒绝</button>
					<button class="allow">允许</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		toLogin,
		toRegister
	} from "@/api/login.js";
	import {
		imgUrl,
		baseUrl
	} from "@/common/config.default.js";
	export default {
		data() {
			return {
				noClick: true,
				codeOne: '',
				agreementFlag: false,
				userInfo: {
					avatar: '',
					name: ''
				},
				loginPop: '',
				modalName: null,
				imgUrl: '',
				userid:uni.getStorageSync('sjuserid')
			}
		},
		onLoad(options) {
			this.imgUrl = imgUrl
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			agreementClick() {
				this.agreementFlag = !this.agreementFlag
			},
			loginClick() {
				uni.showToast({
					title: '请勾选协议',
					icon: 'none',
					duration: 2000
				});
				// loginPop.value.open()
				// wx.login({
				// 	success(res) {
				// 		console.log('res', res);
				// 		if (res.code) {
				// 			let datas = {
				// 				code: res.code
				// 			}
				// 			const ress = login(datas)
				// 			console.log('登录ress', ress)

				// 		} else {
				// 			console.log('登录失败！' + res.errMsg)
				// 		}
				// 	}
				// })
			},
			onChooseAvatar(e) {
				console.log('选择头像', e);
				this.userInfo.avatar = e.detail.avatarUrl
				uploadAvatar(userInfo.avatar)
					.then((data) => {
						console.log('头像上传成功', data);
					})
					.catch((error) => {
						console.error('上传失败', error);
					});
			},
			// 名称
			onInputChange() {
				console.log('名字', e);
				this.userInfo.name = e.detail.value
			},
			// 拒绝
			refuseClick() {
				loginPop.close()
			},
			// 隐私协议
			privacyClick() {
				uni.downloadFile({
					url: 'https://www.lncjhs.cn/annex/ysxy.pdf',
					success: function(res) {
						var filePath = res.tempFilePath;
						uni.openDocument({
							filePath: filePath,
							showMenu: true,
							success: function(res) {
								console.log('打开文档成功');
							}
						});
					}
				});
			},
			// 服务协议
			serveClick() {
				uni.downloadFile({
					url: 'https://www.lncjhs.cn/annex/yhxy.pdf',
					success: function(res) {
						var filePath = res.tempFilePath;
						uni.openDocument({
							filePath: filePath,
							showMenu: true,
							success: function(res) {
								console.log('打开文档成功');
							}
						});
					}
				});
			},
			toIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			//
			toLogin() {
				var that = this
				if (that.noClick) {
					// 第一次点击
					that.noClick = false;
					uni.login({
						provider: 'weixin',
						success: loginRes => {
							this.gettoLogin(loginRes.code);
							this.codeOne = loginRes.code
						}
					});

					// wx.getUserProfile({
					// 	desc: "用于完善用户资料",
					// 	success: (infoRes) => {
					// 		if (infoRes.errMsg == 'getUserProfile:ok') {
					// 			this.$refs.mobileModal.open();
					// 			this.infoRes = infoRes;
					// 		}
					// 	},
					// 	fail: error => {
					// 		this.$api.msg("为了您能够正常使用，请选择允许授权")
					// 	}
					// })
				} else {
					//  这里是重复点击的判断
					that.$api.msg("请勿重复点击")
				}

			},
			//
			async gettoLogin(code) {
				try {
					const obj = {
						code: code
					};
					const {
						data
					} = await toLogin(obj);
					if (data.code == 200) {
						uni.setStorageSync('userid', data.id);
						console.log('登录成功')
						setTimeout(function() {
							uni.navigateBack()
						}, 500);
					} else {
						console.log(data)
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			// 
			getPhoneNumber(e) {
				var that = this;
				if (e.detail.errMsg == "getPhoneNumber:fail user deny") { //用户决绝授权  
					uni.showToast({
						title: '您拒绝了绑定手机号',
						icon: 'none',
						duration: 2000
					});
				} else {
					this.getPhone(e)
				}
			},
			// decryptPhoneNumber(e) {
			// 	console.log(e)
			// 	if (e.detail.errMsg == "getPhoneNumber:ok") {
			// 		this.getPhone(e);
			// 	} else {
			// 		this.$api.msg('获取失败，请稍后再试')
			// 	}
			// },
			async getPhone(_data) {
				var that = this
				var that = this
				if (that.noClick) {
					// 第一次点击
					that.noClick = false;
					uni.login({
						provider: 'weixin',
						success: loginRes => {
							// console.log(loginRes.code)
							this.gophone(_data, loginRes.code)
							// this.codeOne = loginRes.code
						}
					});
				} else {
					//  这里是重复点击的判断
					that.$api.msg("请勿重复点击")
				}

			},
			async gophone(e, code) {
				try {
					const obj = {
						code: code
					};
					const {
						data
					} = await toLogin(obj);
					if (data.code == 200) {
						console.log('登录成功')
						uni.setStorageSync('token', data.token);
						uni.setStorageSync('phone', data.phone);
						if(data.id){
							uni.setStorageSync('userid', data.id);
						}
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 500);
					} else {
						this.getcode(e)
					}
				} catch (e) {

				}
			},
			getcode(e) {
				uni.login({
					provider: 'weixin',
					success: loginRes => {
						this.gettophone(e, loginRes.code)
					}
				});
			},

			async gettophone(e, code) {
				// this.codeOne = loginRes.code
				try {
					const obj = {
						// platform: 'mp_weixin',
						// iv: _data.detail.iv,
						// encryptedData: _data.detail.encryptedData,
						code: e.detail.code,
						lgcode: code,
						inviterId: uni.getStorageSync('sjuserid')
					};
					const {
						data
					} = await toRegister(obj);
					if (data.code == 200) {
						console.log(data)
						uni.setStorageSync('token', data.token);
						uni.setStorageSync('phone', data.phone);
						uni.setStorageSync('userid', data.id);
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 500);
					} else {
						console.log(data)
						this.$api.msg(data.msg);
					}
				} catch (e) {

				}
			}
		}
	}
</script>
<style lang="scss">
	page {
		background: #fff;
	}

	.login-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 200rpx;

		.headerbj {
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		}

		.login-ico {
			width: 300rpx;
			margin-bottom: 100rpx;
		}

		.login-btn {
			width: 100%;


			button {
				line-height: 98rpx;
				width: 600rpx;
				height: 98rpx;
				background: linear-gradient(135deg, #2D9BFB 0%, #44D9FF 100%);
				border-radius: 49rpx;
				color: rgba(255, 255, 255, 1);
				font-size: 28rpx;
				text-align: center;
				margin: 0 auto;
			}
		}

		.pop-box {
			padding: 40rpx 50rpx 60rpx;

			.pop-title {
				color: rgba(16, 16, 16, 1);
				font-size: 32rpx;
			}

			.remark {
				margin-top: 60rpx;
				color: rgba(0, 0, 0, 1);
				font-size: 32rpx;
			}

			.info-box {
				display: flex;
				align-items: center;
				margin-top: 38rpx;
				padding: 30rpx 0;
				border-top: 2rpx solid rgba(206, 206, 206, 1);
				border-bottom: 2rpx solid rgba(206, 206, 206, 1);

				button {
					background-color: none;
				}

				image {
					width: 80rpx;
					height: 80rpx;
					margin-right: 20rpx;
					border-radius: 6rpx;
				}

				.info-text {
					display: flex;
					flex-direction: column;


					input {
						color: rgba(0, 0, 0, 1);
						font-size: 28rpx;
					}

					.text {
						margin-top: 6rpx;
						color: rgba(154, 154, 154, 1);
						font-size: 24rpx;
					}
				}
			}

			.pop-btn {
				display: flex;
				justify-content: space-between;
				padding: 60rpx 30rpx 0;

				button {
					width: 240rpx;
					height: 80rpx;
					line-height: 40rpx;
					border-radius: 12rpx;
					background-color: rgba(242, 242, 242, 1);
					color: rgba(7, 193, 96, 1);
					font-size: 28rpx;
					text-align: center;
				}

				.allow {
					background-color: rgba(7, 193, 96, 1);
					color: rgba(255, 255, 255, 1);
				}
			}
		}

		.agreement-box {
			width: 100%;
			position: absolute;
			bottom: 100rpx;
			left: 0rpx;
			padding: 0 30rpx;
			font-size: 28rpx;
			display: inline-flex;
			justify-content: center;

			image {
				width: 30rpx;
				height: 30rpx;
				margin-right: 14rpx;
			}


			.red {
				color: #2D9BFB;
			}
		}
	}
</style>