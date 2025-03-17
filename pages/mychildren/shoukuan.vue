<template>
	<view class="conbox bg-white width96">
		<form>
			<view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>开户名:</view>
					<input placeholder="请输入" placeholder-class="inppl" v-model="name" maxlength="15"
						@blur="blur('qyname')"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>联系方式：</view>
					<input placeholder="请输入" v-model="tel" @blur="blur('nsnumber')"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>银行卡号：</view>
					<input placeholder="请输入" v-model="yhkahao" @blur="blur('qyadd')"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>开户银行：</view>
					<input placeholder="请输入" v-model="khyh" @blur="blur('khyh')"></input>
				</view>
			</view>
		</form>
		<view class="btns width96" @click="submit">
			<button class="btn1 width96">提交</button>
			<!-- <button class="btn2 width96">取消</button> -->
		</view>
	</view>
</template>

<script>
	import {
		imgUrl
	} from "@/common/config.default.js";
	import {
		getapintroducer, //新增
		getselIntroducer ,//查询
		getselIntroducerInfo//账户信息
	} from "@/api/my.js";
	export default {

		data() {
			return {
				sid:'',
				getzhdetail: '',
				name: '',
				tel: '',
				yhkahao: '',
				khyh: '',
				rules: {
					name: [{
						rule: /.+/,
						message: '请输入开户名',
					}],
					tel: [{
						rule: /.+/,
						message: '联系方式',
					}],
					yhkahao: [{
						rule: /.+/,
						message: '请输入银行卡号',
					}],
					khyh: [{
						rule: /.+/,
						message: '请输入开户银行',
					}]
				},
				noClick: true,
				focusclass: {
					name: false,
					tel: false,
					yhkahao: false,
					khyh: false
				}
			};
		},
		onLoad(option) {
			this.imgUrl = imgUrl
			this.goselIntroducer()
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
			async goselIntroducer() {
				try {
					const obj = {};
					const {
						data
					} = await getselIntroducer(obj);
					if (data.code == 200) {
						// this.getzhdetail = data.data
						if (data.data) {
							this.getdetail()
						}

					} else {
						console.log(data)
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			//提交
			submit() {
				let that = this;
				if (that.noClick) {
					// 第一次点击
					that.noClick = false;
					if (!that.validate('name')) return;
					if (!that.validate('tel')) return;
					if (!that.validate('yhkahao')) return;
					if (!that.validate('khyh')) return;
					that.gosubmit()
					setTimeout(() => {
						that.noClick = true;
					}, 2000)
				} else {
					//  这里是重复点击的判断
					this.$api.msg("已提交请勿重复点击")
				}
			},
			async gosubmit() {
				var that = this
				var chuanzhi;
				if (this.sid) {
					chuanzhi = {
						id: this.sid,
						introducerName: that.name,
						introducerTel: that.tel,
						bankCardNumber: that.yhkahao,
						carBlank: that.khyh
					}
				} else {
					chuanzhi = {
						introducerName: that.name,
						introducerTel: that.tel,
						bankCardNumber: that.yhkahao,
						carBlank: that.khyh
					}

				}

				try {
					const obj = chuanzhi;
					const {
						data
					} = await getapintroducer(obj);
					console.log(data)
					if (data.code == 200) {
						this.$api.msg('提交成功');
						if (this.fapiaodetail) {
							setTimeout(function() {
								uni.navigateBack({
									delta: 2
								});
							}, 2000);
						} else {
							setTimeout(() => {
								uni.navigateBack()
							}, 2000)
						}

					} else {
						this.$api.msg(data.msg);
					}
				} catch (e) {

				}
			},
			async getdetail() {
				try {
					const obj = {

					};
					const {
						data
					} = await getselIntroducerInfo(obj);
					if (data.code == 200) {
						this.name = data.data.introducerName,
							this.tel = data.data.introducerTel,
							this.yhkahao = data.data.bankCardNumber,
							this.khyh = data.data.carBlank
							this.sid = data.data.id
					} else {
						console.log(data)
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			//验证
			validate(key) {
				let s = true
				this.rules[key].forEach(v => {
					if (!v.rule.test(this[key])) {
						uni.showToast({
							title: v.message,
							icon: 'none'
						})
						s = false
						return false
					}
				})
				return s
			},
			blur(key) {
				this.focusclass[key] = false
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f7f7f7;
	}

	.biaoti {
		margin-bottom: 30rpx;
	}

	.bgblue {
		padding: 0 40rpx;
		background: #E1F1FF;
		border-radius: 28rpx;
		border: 1px solid #2D9DFB;
		color: #2D9DFB;
		font-size: 28rpx;
		line-height: 50rpx !important;
		height: 50rpx !important;
		min-width: 150rpx;
		text-align: center;
	}

	.bggrey {
		padding: 0 40rpx;
		line-height: 50rpx !important;
		height: 50rpx !important;
		background: #F3F1F2;
		border-radius: 28rpx;
		font-size: 28rpx;
		color: #999999;
		min-width: 150rpx;
		text-align: center;
	}

	.conbox {
		border-radius: 20rpx;
		padding: 20rpx 0;
		margin: 20rpx auto;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}


	radio {
		transform: scale(0.7);
	}

	.radtext {
		padding: 0 20rpx;
	}

	.text-red {
		padding-right: 10rpx;
	}

	.cu-form-group+.cu-form-group {
		border: none !important;
	}

	.sfzbox {
		width: 100%;
	}

	.sfz {
		width: 48%;
		height: 212rpx;
		overflow: hidden;
	}

	.dengji {
		width: 171rpx;
		height: 243rpx;
	}

	.dengjizp {
		width: 100%;
		height: 243rpx;
		overflow: hidden;
		position: relative;
	}

	.iconup {
		color: #fff;
		background-color: #2D9DFB;
		width: 42rpx;
		border-radius: 50%;
		display: block;
		font-size: 37rpx;
		margin: 10rpx auto;
		transform: rotate(180deg);
		margin-bottom: 20rpx;
		padding: 5rpx;
	}

	.dungwei {
		position: absolute;
		top: 70rpx;
		left: 0rpx;
		width: 100%;
		height: 243rpx;
		text-align: center;
	}

	.cu-form-group input {
		text-align: right !important;
	}

	.btns {
		.btn1 {
			background: #2D9DFB;
			border-radius: 36rpx;
			color: #fff;
			font-size: 28rpx;
			line-height: 72rpx;
			position: fixed;
			bottom: 40rpx;
			left: 3%;
		}

		.btn2 {
			background: #fff;
			border-radius: 36rpx;
			color: #2D9DFB;
			border: 1rpx solid #2D9DFB;
			font-size: 28rpx;
			line-height: 72rpx;
			position: fixed;
			bottom: 20rpx;
			left: 3%;
		}
	}

	.fromspan {
		font-size: 24rpx;
		color: red;
	}
</style>