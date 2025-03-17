<template>
	<view class="box">
		<text class="bt">咨询服务费</text>
		<text class="par">{{zfprice}}</text>
		<button class="btn_top" @click="wxPay()">确认支付</button>
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">扫码咨询</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<image :src="baseUrl+img" mode="widthFix"></image>
				</view>
				<view class="abtns flex justify-between">
					<button @click="back()" class="btn_left">返回</button>
					<button @click="saveImg()" class="btn_right">保存二维码</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		imgurl,
		baseUrl
	} from "@/common/config.default.js";

	export default {
		data() {

			return {
				zfitem: '',
				zfprice: 0,
				rzid: 0,
				modalName: null,
				img: '',
				baseUrl:''
			}
		},
		//  onUnload() {
		// 	 var that = this
		// 	if(that.type=='seckill'){
		// 		wx.reLaunch({
		// 			url: '/packageA/my/msdingdan'
		// 		})
		// 	}else if(that.type=='groups'){
		// 		wx.reLaunch({
		// 			url: '/packageA/my/ptdingdan'
		// 		})
		// 	}else if(that.type=='bargain'){
		// 		wx.reLaunch({
		// 			url: '/packageA/my/kjdingdan'
		// 		})
		// 	}
		// },

		onLoad(option) {
			this.zfitem = JSON.parse(decodeURIComponent(option.pay_info))
			this.zfprice = option.price
			this.rzid = option.rzid
			this.img = option.img
			this.baseUrl = baseUrl
		},
		methods: {
			showModal(e) {
				console.log(e)
				this.modalName = e
			},
			hideModal(e) {
				this.modalName = null
			},
			wxPay() { //微信支付
				var that = this
				var zfitem = JSON.parse(decodeURIComponent(that.zfitem))
				uni.requestPayment({
					appId: zfitem.appId,
					provider: 'wxpay',
					timeStamp: zfitem.timeStamp,
					nonceStr: zfitem.nonceStr,
					package: zfitem.package,
					signType: zfitem.signType,
					paySign: zfitem.paySign,
					success: (res) => {
						// 支付成功
						setTimeout(function() {
							console.log('支付成功')
							that.showModal('Modal')
						}, 500);
					},
					fail: (err) => {
						console.log(err)
						// 支付失败
						uni.showToast({
							title: '支付失败',
							icon: 'none'
						});

					}
				});
			},
			back() {
				uni.navigateBack({
					delta: 2
				});
			},
			saveImg(){
			    const that = this;
			    uni.downloadFile({
			        url:baseUrl+this.img,
			        success: res => {
			            if (res.statusCode === 200) {
			                uni.saveImageToPhotosAlbum({
			                    filePath: res.tempFilePath,
			                    success: function() {
			                       that.$api.msg('保存下载成功');
			                       that.hideModal()
			                    },
			                    fail: function() {
			                       that.$api.msg('保存下载成功');
			                       that.hideModal()
			                    }
			                });
			            } else {
			                that.$api.msg('保存下载成功');
			                that.hideModal()
			            }
			        }
			    });
			}
		}
	}
</script>


<style>
	.box {
		text-align: center;
	}

	.bt {
		margin: 50rpx auto 30rpx;
		font-weight: bold;
		font-size: 28rpx;
		display: block;
		margin: 50rpx auto 20rpx;
	}

	.par {
		font-size: 40rpx;
		color: red;
		display: block;
		margin: 50rpx auto 20rpx;
	}
	
	.abtns{
		padding-bottom: 20rpx;
	}

	.btn_top {
		background: #2D9DFB;
		color: #FFFFFF;
		font-size: 28rpx;
		width: 90%;
		margin: 40rpx auto;
	}
	.btn_left {
		border: 1px solid #2D9DFB;
		width: 45%;
		color: #2D9DFB;
		font-size: 28rpx;
	}
	
	.btn_right {
		background: #2D9DFB;
		color: #FFFFFF;
		font-size: 28rpx;
		width: 45%;
	}
</style>