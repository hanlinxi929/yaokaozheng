<template>
	<view>
		<view class="dingdan width96 bg-white mt_20">
			<view class="biaoti mt_20 cur width96">
				<view class="zuotubiao"></view>
				<text>咨询订单</text>
			</view>
			<view class="dd_detail dd_detail_topbor flex justify-start align-center">
				<view class="dd_img">
					<image :src="baseUrl+schooldetail.schoolHead" mode="widthFix"></image>
				</view>
				<view class="dd_texts">
					<text class="dd_bt block">{{schooldetail.deptName}}</text>
					<!-- <text class="dd_span block">{{schooldetail.typeName}}</text> -->
					<text class="dd_mon block">￥ {{schooldetail.consultingFee}}</text>
				</view>
			</view>
		</view>
		<view class="dingdan width96 bg-white mt_20">
			<view class="biaoti mt_20 cur width96">
				<view class="zuotubiao"></view>
				<text>推荐优惠：</text>
			</view>
			<view class="dd_detail flex justify-start align-center">
				<view class="cu-bar margin-top bg-white width96">
					<view class="action tuijian">
						推荐费
					</view>
					 <view class="text-gray flex justify-end align-center" v-if="!yhje" @tap="showModal"
					 	data-target="Modal">
					 	<text>填写推荐码</text>
					 	<text class="cuIcon-right p_left10"></text>
					 </view>
					 <view class="text-gray flex justify-end align-center" v-if="yhje"  @tap="showModal" data-target="Modal">
					 	<text class="text-red">-￥{{yhje?yhje:'0.00'}}</text>
					 	<!-- <text class="cuIcon-right p_left10"></text> -->
					 </view>
				</view>
			</view>
			<view class="width96">
				<text class="text_red">PS：受推荐报名咨询，输入推荐码后可获得抵扣券!</text>
			</view>
			<!-- <view class="width96 mt_30 " v-if="shadow">
				<text class="text-black">推荐码</text>
			</view>
			<view class="width96 dd_inp" v-if="shadow">
				<input type="text" @tap="showModal" data-target="Modal" placeholder="请输入推荐码" v-model="tuijianma"/>
			</view> -->
			<view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">推荐码</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						<input type="text" data-target="Modal" placeholder="请输入推荐码" v-model="tuijianma" />
					</view>
					<view class="bg-white flex justify-center">
						<view class="action text-qx" @tap="hideModal">关闭</view>
						<view class="action text-qr" v-if="tuijianmas==false" @tap="goGetUpReferralCode()">确定</view>
						<view class="action text-qr" v-else  @tap="qxGetUpReferralCode()">取消</view>
					</view>
				</view>
			</view>

			<view class="bot flex justify-between width96 align-center bg-white width100">
				<view class="bot_left flex justify-start align-center">
					<text class="bot_mon">合计：</text>
					<text class="bot_redt">￥{{heji}}</text>
					<text class="text-gray1">|</text>
					<text class="text-gray2">优惠：￥{{youhui.referralPrice?youhui.referralPrice:"0.00"}}</text>
				</view>
				<view class="bot_right">
					<button class="bot_btn" @click="submitPay">立即支付</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getzgDetailInfo,
		getMiniAppPay,
		getzgUpReferralCode,
		gethomePagegetInfo
	} from "@/api/index.js";
	import {
		imgUrl,
		baseUrl
	} from "@/common/config.default.js";
	export default {
		data() {
			return {
				oid: 0,
				sid: 0,
				yhje:'',
				ddid:0,
				schooldetail: '',
				tuijianmas:false,
				baseUrl: '',
				imgUrl: '',
				tuijianma: '',
				shadow: false,
				modalName: "",
				youhui:"",
				heji:"",
				go_pay:"",
				weizf:false,
				zfitem:"",
				oneId:"",
				odata:'',
				stype:''//一级类型
			}
		},
		onLoad(option) {
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
			this.oid = option.oid
			this.sid = option.sid
			this.ddid = option.ddid
			this.oneId = option.oneId
			this.stype = option.type
			this.odata = JSON.parse(option.datas)
			var odata = JSON.parse(option.datas)
			console.log(option.type)
			if(odata){
				
				this.yhje = odata.referralPrice
				this.heji = odata.actualPayment
				this.tuijianma = odata.referralCode
				if(odata.referralCode){
					this.tuijianmas  = true
				}
			}
			console.log(this.stype)
			
			if(this.stype=='1'){
				this.getDetail()
			}else{
				this.getDetailtwo()//就业服务
			}
		},
		onShow() {
			
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
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			SetShadow() {
				this.tuijianma = ''
				this.shadow = !this.shadow
				if(this.shadow==false){
					this.tuijianma = '0'
					this.goGetUpReferralCode()
				}
			},
			// 取消推荐
			 qxGetUpReferralCode(){
				this.tuijianma = ''
				this.yhje =' '
				this.tuijianmas = false
				this.goGetUpReferralCode()
			},
			async goGetUpReferralCode() {
				var that = this
				try {
					const obj = {
						id: that.ddid,
						referralCode: that.tuijianma?that.tuijianma:'0'
					};
					const {
						data
					} = await getzgUpReferralCode(obj);

					if (data.code == 200) {
						if (data.data) {
							this.yhje = data.data.referralPrice
							this.heji = data.data.actualPayment
							this.tuijianma = data.data.referralCode
							
							if(this.tuijianma){
								this.tuijianmas = true
							}else{
								this.tuijianmas = false
							}
							this.hideModal()
						}
					} else {
						this.tuijianmas = false
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async getDetail() {
				var that = this
				try {
					const obj = {
						id: that.sid,
						type: parseInt(that.stype)
					};
					const {
						data
					} = await getzgDetailInfo(obj);

					if (data.code == 200) {
						if (data.data) {
							that.schooldetail = data.data
						}
					} else {
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async getDetailtwo() {
				var that = this
				try {
					const obj = {
						id: that.sid,
						type: parseInt(that.stype)
					};
					const {
						data
					} = await gethomePagegetInfo(obj);
			
					if (data.code == 200) {
						if (data.data) {
							that.schooldetail = data.data
						}
					} else {
						this.$api.msg(data.msg)
					}
				} catch (e) {
			
				}
			},
			async submitPay() {
				var that = this
				try {
					const obj = {
						id: that.ddid
					};
					const {
						data
					} = await getMiniAppPay(obj);

					if (data.code == 200) {
						this.zfitem = data.data
						this.wxPay()
						// uni.navigateTo({
						// 	url: '/pages/index/jmzf?pay_info=' + encodeURIComponent(JSON.stringify(data
						// 		.data)) + '&price=' + this.heji+'&img='+this.schooldetail.consultingCode
						// })
					} else {
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			wxPay() { //微信支付
				var that = this
				var zfitem = JSON.parse(decodeURIComponent(that.zfitem))
				console.log(zfitem)
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
							uni.$emit('isshow',true)
							uni.navigateBack({
								delta: 1
							});
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
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f7f7f7;
	}
	
	.text-qx{
		border: 1rpx solid #2D9DFB;
		color: #2D9DFB;
		width: 200rpx;
		height: 66rpx;
		line-height: 66rpx;
		text-align: center;
		margin: 20rpx 40rpx 30rpx;
		border-radius: 33rpx;
	}
	.text-qr{
		background-color: #2D9DFB;
		color: #fff;
		width: 200rpx;
		height: 66rpx;
		line-height: 66rpx;
		text-align: center;
		margin: 20rpx 40rpx 30rpx;
		border-radius: 33rpx;
	}

	.dingdan {
		border-radius: 20rpx;
		padding: 10rpx 0 20rpx;
	}

	.tuijian {
		font-size: 26rpx;
	}

	.text_red {
		font-size: 18rpx;
		color: #FF1F28;
		padding: 0 0 20rpx;
	}

	.text_red2 {
		font-size: 24rpx;
		color: #FF1F28;
	}

	.dd_detail {
		margin-top: 30rpx;
	}

	.dd_detail_topbor {
		border-top: 1rpx solid #eee;
	}

	.dd_inp {
		margin-top: 20rpx;

		input {
			background-color: #F2F2F2;
			height: 88rpx;
			border-radius: 12rpx;
			padding: 0 20rpx;
		}
	}

	.dd_img {
		width: 260rpx;
		height: 170rpx;
		overflow: hidden;
		margin: 30rpx 30rpx 15rpx;
	}

	.cu-bar .action:first-child {
		padding: 0;
		margin: 0;
	}

	.dd_texts {
		.dd_bt {
			font-size: 28rpx;
			color: #202020;
			line-height: 38rpx;
		}

		.dd_span {
			font-size: 24rpx;
			color: #999999;
			line-height: 38rpx;
		}

		.dd_mon {
			font-weight: bold;
			font-size: 36rpx;
			color: #FF1F28;
			line-height: 30rpx;
			margin-top: 50rpx;
		}
	}

	.bot {
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 20rpx;
	}

	.bot_mon {
		font-size: 26rpx;
		color: #202020;
	}

	.bot_redt {
		font-size: 32rpx;
		color: #FF1F28;
	}

	.text-gray1 {
		font-size: 26rpx;
		color: #999999;
		padding-left: 20rpx;
	}

	.text-gray2 {
		font-size: 26rpx;
		color: #999999;
		padding-left: 20rpx;
	}

	.bot_btn {
		width: 220rpx;
		height: 66rpx;
		background: #2D9DFB;
		border-radius: 33rpx;
		font-size: 28rpx;
		color: #FFFFFF;
	}
</style>