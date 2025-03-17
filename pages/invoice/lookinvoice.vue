<template>
	<view>
		<view class="bg-white width100">
			<text class="cuIcon-back fanhui" @click="goback()"></text>
			<view class="box_top text-center">
				<image class="top_bg" :src="imgUrl+'fapiaobg.png'" mode="widthFix"></image>
				<view class="zhuangtai flex align-center justify-center">
					<!-- //0-申请中，1审核中 2已完成 3已驳回 -->
					<image v-if="fapiaodetail.invoiceState==0" :src="imgUrl+'zhongbiao.png'" mode="widthFix"></image>
					<image v-else :src="imgUrl+'kpmon.png'" mode="widthFix"></image>
					<text v-if="fapiaodetail.invoiceState==1">开票中</text>
					<text v-if="fapiaodetail.invoiceState==2">已完成</text>
					<text v-if="fapiaodetail.invoiceState==3">已驳回</text>
				</view>
				<text class="jine">已开发票金额：￥{{jg}}</text>
			</view>
			<view class="kp_nav width100 bg-white" v-if="fapiaodetail.headingType==1">
				<view class="bt">{{fapiaodetail.invoiceType==0?'普通发票':'专业发票'}}</view>
				<view class="kp_item">
					<text class="text_gray">发票类型</text>
					<text class="text-black p_left20">{{fapiaodetail.invoiceType==0?'普通发票':'专业发票'}}</text>
				</view>
				<view class="kp_item">
					<text class="text_gray">抬头类型</text>
					<text class="text-black p_left20">{{fapiaodetail.headingType==0?'个人':'企业'}}</text>
				</view>
				<view class="kp_item">
					<text class="text_gray">企业名称</text>
					<text class="text-black">{{fapiaodetail.headingType==1?fapiaodetail.qyname:fapiaodetail.invoiceHeader}}</text>
				</view>
				<view class="kp_item">
					<text class="text_gray">纳税识别号</text>
					<text class="text-black p_left20">{{fapiaodetail.taxIdentification}}</text>
				</view>
				<view class="kp_item">
					<text class="text_gray">企业地址</text>
					<text class="text-black p_left20">{{fapiaodetail.companyAddress}}</text>
				</view>
				<view class="kp_item">
					<text class="text_gray">企业电话</text>
					<text class="text-black p_left20">{{fapiaodetail.invoicePhone}}</text>
				</view>
				<view class="kp_item">
					<text class="text_gray">开户银行</text>
					<text class="text-black p_left20">{{fapiaodetail.bankDeposit}}</text>
				</view>
				<view class="kp_item">
					<text class="text_gray">银行账号</text>
					<text class="text-black p_left20">{{fapiaodetail.bankAccount}}</text>
				</view>
				<view class="kp_item">
					<text class="text_gray">开票金额</text>
					<text class="text-black p_left20">{{fapiaodetail.invoicingAmount}}</text>
				</view>
				<view class="kp_item">
					<text class="text_gray">申请时间</text>
					<text class="text-black p_left20">{{fapiaodetail.applyTime}}</text>
				</view>
				<view class="kp_item pb_30" v-if="fapiaodetail.invoiceState==3" >
					<text class="text_gray">驳回原因</text>
					<text class="text-red p_left20">{{fapiaodetail.reasonRejection}}</text>
				</view>
			</view>
			<view class="kp_nav width100 bg-white" v-if="fapiaodetail.headingType==0">
				<view class="bt">{{fapiaodetail.invoiceType==0?'普通发票':'专业发票'}}</view>
				<view class="kp_item">
					<text class="text_gray">发票类型</text>
					<text class="text-black p_left20">{{fapiaodetail.invoiceType==0?'普通发票':'专业发票'}}</text>
				</view>
				<view class="kp_item">
					<text class="text_gray">抬头类型</text>
					<text class="text-black p_left20">{{fapiaodetail.headingType==0?'个人':'企业'}}</text>
				</view>
				<view class="kp_item">
					<text class="text_gray">姓名</text>
					<text class="text-black">{{fapiaodetail.headingType==1?fapiaodetail.qyname:fapiaodetail.invoiceHeader}}</text>
				</view>
				<view class="kp_item">
					<text class="text_gray">身份证号</text>
					<text class="text-black p_left20">{{fapiaodetail.taxIdentification}}</text>
				</view>
				<view class="kp_item">
					<text class="text_gray">开票金额</text>
					<text class="text-black p_left20">{{fapiaodetail.invoicingAmount}}</text>
				</view>
				<view class="kp_item">
					<text class="text_gray">申请时间</text>
					<text class="text-black p_left20">{{fapiaodetail.applyTime}}</text>
				</view>
				<view class="kp_item pb_30" v-if="fapiaodetail.invoiceState==3" >
					<text class="text_gray">驳回原因</text>
					<text class="text-red p_left20">{{fapiaodetail.reasonRejection}}</text>
				</view>
			</view>
		</view>
		<view>
			<view  v-if="fapiaodetail.invoiceState==0" class="kp_btn flex justify-end width100 bg-white">
				<text  @click="gosubmit()">取消申请</text>
			</view>
			<view  v-if="fapiaodetail.invoiceState==2" class="kp_btn flex justify-end width100 bg-white">
				<text @click="saveImg()">下载发票</text>
			</view>
			<view  v-if="fapiaodetail.invoiceState==3" class="kp_btn flex justify-end width100 bg-white">
				<text @click="gosq()">修改申请</text>
			</view>
		</view>
	</view>
</template>


<script>
	import {
		imgUrl,
		baseUrl
	} from "@/common/config.default.js";
	import {
		getdelZcInvoice
	} from "@/api/my.js";
	export default {
		data() {
			return {
				fpdetail: [],
				imgUrl: '',
				fapiaodetail: '',
				jg: '0.00',
				baseUrl:'',
				sid:'',
				orderType:''
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
			this.imgUrl = imgUrl
			this.fapiaodetail = JSON.parse(decodeURIComponent(option.fapiaodetail))[0]
			this.jg = option.jg
			this.baseUrl = baseUrl
			this.sid = option.id
			this.orderType = option.orderType
		},
		methods: {
			gosq(){
				this.$api.toPage('invoice/sqinvoice?fapiaodetail=' + JSON.stringify(this.fapiaodetail) + '&jg=' + this.jg+'&id='+this.fapiaodetail.orderId+'&orderType='+this.fapiaodetail.orderType);
			},
			saveImg() {
				const that = this;
				var img = that.fapiaodetail.consultingCode
				uni.downloadFile({
					url: baseUrl + img,
					success: res => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									that.$api.msg('保存下载成功');
									that.hideModal()
								},
								fail: function() {
									that.$api.msg('保存失败，请稍后重试');
									that.hideModal()
								}
							});
						} else {
							that.$api.msg('下载失败');
							that.hideModal()
						}
					}
				});
			},
			async gosubmit() {
				var that = this
				try {
					const obj = {
						id:that.fapiaodetail.id
					};
					const {
						data
					} = await getdelZcInvoice(obj);
					console.log(data)
					if (data.code == 200) {
						this.$api.msg('提交成功');
						setTimeout(() => {
							uni.navigateBack()
						}, 2000)
					} else {
						this.$api.msg(data.msg);
					}
				} catch (e) {
			
				}
			},
			//验证跳转
			handleToPageOtherOrder(url) {
				// if (!this.token) {
				// 	this.$needLogin();
				// 	return false;
				// }
				this.$api.toPage(url);
			},
			saveImg() {
				const that = this;
				var img = that.fapiaodetail.invoiceFile
				uni.downloadFile({
					url: baseUrl + img,
					success: res => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									that.$api.msg('保存下载成功');
									that.hideModal()
								},
								fail: function() {
									that.$api.msg('保存失败，请稍后重试');
									that.hideModal()
								}
							});
						} else {
							that.$api.msg('下载失败');
							that.hideModal()
						}
					}
				});
			},
			goback() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f7f7f7;
	}
	.kp_item {
		font-size: 28rpx;
		line-height: 70rpx;
		padding: 0 3%;
		display: flex;
		justify-content: space-between;
	}

	.text_gray {
		color: #999;
	}

	.kp_btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #FFFFFF;
		padding-bottom: 30rpx;

		text {
			width: 230rpx;
			height: 66rpx;
			background: #FFFFFF;
			border-radius: 36rpx;
			border: 1px solid #2D9DFB;
			color: #2D9DFB;
			text-align: center;
			line-height: 66rpx;
			font-size: 28rpx;
			margin: 20rpx 3%;
		}
	}

	.fanhui {
		font-size: 32rpx;
		position: absolute;
		top: 80rpx;
		left: 3%;
		color: #fff;
	}

	.box_top {
		position: relative;
		color: #fff;

		.jine {
			display: block;
			position: absolute;
			top: 240rpx;
			width: 100%;
			text-align: center;
			font-size: 28rpx;
		}

		.top_bg {
			position: absolute;
			left: 0;
			top: 40rpx;
			z-index: -1;
		}

		.zhuangtai {
			margin: 30rpx auto 0;
			position: absolute;
			top: 150rpx;
			z-index: 1;
			font-weight: 500;
			font-size: 32rpx;
			color: #fff !important;
			width: 100%;

			image {
				width: 30rpx;
			}

			text {
				padding-left: 10rpx;
			}
		}
	}

	.kp_nav {
		position: absolute;
		top: 310rpx;
		border-top-right-radius: 20rpx;
		border-top-left-radius: 20rpx;
		padding: 30rpx 30rpx 0;
	}
	
	.bt{
		font-size: 32rpx;
		line-height: 80rpx;
		padding-bottom: 20rpx;
		text-align: center;
	}
</style>