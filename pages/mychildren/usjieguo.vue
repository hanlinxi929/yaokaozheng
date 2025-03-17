<template>
	<view>
		<view class="width96 bg-white conbox">
			<form>
				<view class='flex justify-between width100'>
					<view class="biaoti mt_20">
						<view class="zuotubiao"></view>
						<text>申请记录</text>
					</view>
					<text v-if="state==1" class="text-qx bg-green">已通过</text>
					<text v-if="state==2" class="text-qx bg-red">已驳回</text>
				</view>
				<view class="cu-form-group mt_20 border-bottom-none">
					<view class="title"><text class="text-red">*</text>申请角色：</view>
					<view>
						<text>{{jsradio=='A'?'兼职合伙人':'团队合伙人'}}</text>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>姓名:</view>
					<view><text>{{username}}</text></view>
				</view>

				<radio-group class="block borderbottom" @change="RadioChange">
					<!-- #ifndef MP-ALIPAY -->
					<view class="cu-form-group">
						<view class="title"><text class="text-red">*</text>性别：</view>
						<view>{{radio=='C'?'男':'女'}}</view>
					</view>
					<!-- #endif -->
				</radio-group>
				<view class="cu-form-group border-bottom-none">
					<view class="title"><text class="text-red">*</text>身份证号：</view>
					<view><text>{{card}}</text></view>
				</view>
				<view class="cu-form-group border-bottom-none ">
					<view class="title"><text class="text-red">*</text>手机号码：</view>
					<view><text>{{phone}}</text></view>
				</view>
				<view class="cu-form-group border-bottom-none">
					<view class="title"><text class="text-red">*</text>住址：</view>
					<view><text>{{address}}</text></view>
				</view>
				<view class="cu-form-group" v-if="state==2">
					<view class="title">驳回原因：</view>
					<view><text class="text-red">{{textareaValue}}</text></view>
				</view>
			</form>
		</view>
		<view class="btn width96 margin-bottom" @click="submit" v-if="state==2">
			<button>重新提交</button>
		</view>
	</view>
</template>

<script>
	import {
		imgUrl,
		baseUrl
	} from "@/common/config.default.js";
	import {
		getAddMyself
	} from "@/api/my.js";
	export default {

		data() {
			return {
				odeptName: "",
				jsradio: 'A',
				radio: 'C',
				modalName: null,
				textareaValue: '',
				username: "",
				card: '',
				phone: '',
				address: '',
				state: '',
				rules: {
					username: [{
						rule: /^.{2,18}$/,
						message: '请输入姓名',
					}],
					card: [{
						rule: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
						message: '请输入正确的身份证',
					}],
					phone: [{
						rule: /^1[0-9]{10,10}$/,
						message: '请输入正确的手机号',
					}],
					address: [{
						rule: /.+/,
						message: '请输入住址',
					}]
				},
				noClick: true,
				focusclass: {
					username: false,
					card: false,
					phone: false,
					address: false,
				},
				optiondata: '',
				imgUrl:'',
				baseUrl:""
			};
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
		onLoad(option) {
			var that = this
			var optiondata = JSON.parse(option.data)
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
			this.optiondata = optiondata
			if (optiondata) {
				that.username = optiondata.name;
				that.card = optiondata.card;
				that.phone = optiondata.tel;
				that.address = optiondata.address;
				that.radio = optiondata.sex == '男' ? 'C' : 'D'
				that.textareaValue = optiondata.remark ? optiondata.remark : ''
				that.jsradio = optiondata.role == 1 ? 'A' : 'B'
				that.state = optiondata.state
			}
		},
		onShow() {

		},
		methods: {
			RadioChange(e) {
				this.radio = e.detail.value
			},
			//提交
			submit() {
				this.$api.toPage('my/goAddus?data=' + JSON.stringify(this.optiondata))
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

	.conbox {
		border-radius: 20rpx;
		margin: 20rpx auto;
		padding: 20rpx 0;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	
	.borderbottom{
		border-bottom: 1rpx solid #eee;
		
	}

	.cu-form-group {
		justify-content: space-between !important;
		border-bottom: 1rpx solid #eee;

		input {
			text-align: right;
		}
	}

	.cu-form-group:last-child {
		border-bottom: none;
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

	.sfzbox {
		width: 100%;
	}

	.sfz {
		width: 48%;
		height: 212rpx;
		overflow: hidden;
		position: relative;
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

	.close {
		position: absolute;
		top: 0;
		right: 0;
	}

	.text-qx {
		width: 200rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 30rpx;
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

	.btn {
		padding-bottom: 1;
	}

	.btn button {
		background: #2D9DFB;
		color: #FFFFFF;
		font-size: 28rpx;
		margin: 130rpx 0;
	}
</style>