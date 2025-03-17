<template>
	<view class="page">
		<view class="cu-card">
			<view class="bg-white padding width96 tx_top">
				<view class="flex justify-between align-center">
					<text class="text-gray">提现至</text>
					<view class="flex align-center">
						<text class="text-black">{{yhdetail.carBlank}}</text>
						<text class="cuIcon-right margin-left-sm text-gray"></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 金额卡片 -->
		<view class="cu-card width96 tx_bot">
			<view class="cu-item bg-white padding">
				<view class="txbt">
					<text>提现金额</text>
				</view>
				<view class="flex justify-start tx_mon">
					<text>￥</text>
					<input type="number" v-model="txmoney"/>
				</view>
				<view class="flex justify-between align-center">
					<text class="text-df text-gray">剩余提现金额：{{je}}元</text>
					<view class="flex align-center">
						<text class="text_blue margin-left-sm" @tap="handleAllWithdraw">全部提现</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 分割线 -->
		<view class="cu-divider margin-top"></view>

		<!-- 操作按钮 -->
		<view class="padding flex flex-direction margin-top-xxl">
			<button class="cu-btn txbtn" @click="gotixian()">确认提现</button>
		</view>

		<!-- 温馨提示 -->
		<view class="text-center">
			<text class="text-sm text-gray">温馨提示: 提现申请发起后，预计在3个工作日内日到账。</text>
		</view>
	</view>
</template>

<script>
	import {
		imgUrl,
		baseUrl
	} from "@/common/config.default.js";
	import {
		getMyBrokerageadd,
		getselIntroducerInfo
	} from "@/api/my.js";
	export default {
		data() {
			return {
				txmoney:'',
				yhdetail:'',
				je:'0.00',
				imgUrl:"",
				baseUrl:''
			};
		},
		onLoad(option) {
			this.je = option.je
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
		},
		onShow() {
			this.getdetail()
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
			handleAllWithdraw() {
				this.txmoney = this.je
				// 处理全部提现逻辑
			},
			async getdetail(){
				try {
					const obj = {
						
					};
					const {
						data
					} = await getselIntroducerInfo(obj);
					if (data.code == 200) {
						this.yhdetail = data.data
					} else {
						console.log(data)
						this.$api.msg(data.msg)
					}
				} catch (e) {
				
				}
			},
			async gotixian(){
				if(this.txmoney){
					if(Number(this.txmoney)<=Number(this.je)){
						try {
							const obj = {
								brokerage:this.txmoney
							};
							const {
								data
							} = await getMyBrokerageadd(obj);
							if (data.code == 200) {
								this.$api.msg(data.msg)
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							} else {
								console.log(data)
								this.$api.msg(data.msg)
							}
						} catch (e) {
						
						}
					}else{
						this.$api.msg('提现金额不能大于剩余提现金额')
					}
				}else{
					this.$api.msg('请输入提现金额')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background-color: #f7f7f7;
		padding-top: 20rpx;
		min-height: 100vh;
	}
	
	.text_blue{
		color: #2D9DFB;
	}

	.tx_mon{
		padding: 30rpx 0;
		text{
			font-size: 40rpx;
			padding-right: 20rpx;
			font-weight: 600;
		}
	}
	
	.tx_bot{
		border-radius: 30rpx!important;
		margin-top: 10rpx;
	}
	
	.tx_top{
		padding: 50rpx;
		border-radius: 30rpx;
	}

	.cu-card {
		border-radius: 16rpx;
		overflow: hidden;

		.cu-item {
			padding: 40rpx 32rpx;
		}
	}

	.text-xxl {
		font-size: 44rpx;
		line-height: 1.8;
	}

	.text-price::before {
		content: '￥';
		font-size: 0.9em;
	}

	.cu-divider {
		height: 2rpx;
		background-color: #f5f5f5;
		margin: 50rpx 30rpx;
	}
	
	.txbtn{
		width: 96%;
		height: 72rpx;
		background: #2D9DFB;
		border-radius: 36rpx;
		border: 1px solid #2D9DFB;
		line-height: 72rpx;
		font-size: 24rpx;
		color: #fff;
	}

	.bg-gradual-blue {
		background-color: #2D9DFB;
	}

	.margin-top-xxl {
		margin-top: 80rpx;
	}
</style>