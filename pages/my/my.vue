<template>
	<view class="container pad-lr">
		<!-- v-if="token" -->
		<image :src="imgUrl+'img00.png'" mode="widthFix" class="headerbj"></image>
		<text v-if="scrollTop<100" class="heightbt">我的</text>
		<view class="bg-white topheight width100" v-if="scrollTop>=100">
			<text>我的</text>
		</view>
		<block>
			<view class="info-box flex justify-between align-end" v-if="token">

				<view class="flex txs">
					<image class="avatar"
						:src="userInfo.profilePicture?baseUrl+userInfo.profilePicture:imgUrl+'morentouxiang.png'"
						mode="aspectFill"></image>
					<view class="">
						<view class="name flex align-center">
							<view class="uname">{{userInfo.name || '用户昵称'}}</view>
							<view class="spantext" v-if="userInfo.role==1">兼职合伙人</view>
							<view class="spantext" v-if="userInfo.role==2">团队合伙人</view>
						</view>
						<view class="mobile">{{userInfo.tel?userInfo.tel:""}}</view>
					</view>
				</view>

				<view class="heightimgs flex justify-between align-center">
					<text class="xxsl" v-if="userInfo.noReadNum>'0'">{{userInfo.noReadNum}}</text>
					<image :src="imgUrl+'img34.png'" mode="widthFix" @click.stop="handleToPageOtherOrder('my/news')">
					</image>
					<image :src="imgUrl+'img35.png'" mode="widthFix" @click.stop="handleToPageOtherOrder('my/setting')">
					</image>
				</view>
			</view>
			<view class="info-box flex justify-between align-end" v-else>
				<view class="flex txs align-center" @click="login()">
					<image class="avatar" src="/static/icon-avatar-default.png" mode="aspectFill"></image>
					<view class="">
						<text>请登录</text>
					</view>
				</view>

			</view>
			<view class="mymon" v-if="token&&userInfo.role!=0">
				<view class="mon-h">
					<text>我的收益</text>
				</view>
				<view class="monnav flex justify-between align-center"  @click="handleToPageOtherOrder('mychildren/myshouyi')">
					<view>
						<text class="bluet">{{userInfo.zsy?userInfo.zsy:'0.00'}}</text><text
							class="cuIcon-attention p_left20"></text>
					</view>
					<text class="cuIcon-right"></text>
				</view>
				<view class="monbt">
					<text>总收益金额（元）</text>
				</view>
				<view class="flex justify-between width100 txnav">
					<view class='yitixian' @click="handleToPageOtherOrder('my/moneydetails')">
						<view class="txbt">
							<text>已提现</text>
						</view>
						<view class="txmon">
							<text>￥{{userInfo.txje?userInfo.txje:'0.00'}}</text>
							<text class="cuIcon-right text-gray"></text>
						</view>
					</view>
					<view class="daitixian">
						<view class="txbt">
							<text>待提现</text>
						</view>
						<view class="txmon">
							<text>￥{{userInfo.commissionPrice?userInfo.commissionPrice:'0.00'}}</text>
						</view>
					</view>
					<view class="txbtn"  @click="handleToPageOtherOrder('mychildren/tixian?je='+userInfo.commissionPrice)">
						<button>提现</button>
					</view>
				</view>
			</view>
			<view class="options-wrapper flex">
				<view class="options-item flex flex-center" v-for="(item,index) in navbanner"
					@click.stop="handleToPageOtherOrder(item.topage)">
					<image class="icon" :src="item.url"></image>
					<view class="hint ">{{item.text}}</view>
				</view>
			</view>
			<view class="options-wrapper">
				<view class="info-item flex justify-between" @click="handleToPageOtherOrder('my/jiaofei')">
					<view class="cont flex flex-center">
						<image class="icon" :src="imgUrl + 'img32.png'" mode="widthFix"></image>
						<text class="p_left10">咨询缴费</text>
					</view>
					<text class="lg text-gray cuIcon-right mt_5"></text>
				</view>
				<view class="info-item flex justify-between" @click="handleToPageOtherOrder('mychildren/shoukuan')">
					<view class="cont flex flex-center">
						<image class="icon" :src="imgUrl + 'shoukuan.png'" mode="widthFix"></image>
						<text class="p_left10">收款信息</text>
					</view>
					<text class="lg text-gray cuIcon-right mt_5"></text>
				</view>
				<view class="info-item flex justify-between" v-if="userInfo.gkfa"
					@click="handleToPageOtherOrder('my/gkfangan')">
					<view class="cont flex flex-center">
						<image class="icon" :src="imgUrl + 'img38.png'" mode="widthFix"></image>
						<text class="p_left10">高考方案</text>
					</view>
					<text class="lg text-gray cuIcon-right mt_5"></text>
				</view>
				<view class="info-item flex justify-between" v-if="userInfo.zsbt"
					@click="handleToPageOtherOrder('my/zsbutie')">
					<view class="cont flex flex-center">
						<image class="icon" :src="imgUrl + 'img45.png'" mode="widthFix"></image>
						<text class="p_left10">证书补贴</text>
					</view>
					<text class="lg text-gray cuIcon-right mt_5"></text>
				</view>
				<view class="info-item flex justify-between" @click="handleToPageOtherOrder('my/mytuifei')">
					<view class="cont flex flex-center">
						<image class="icon" :src="imgUrl + 'img40.png'" mode="widthFix"></image>
						<text class="p_left10">我的退费</text>
					</view>
					<text class="lg text-gray cuIcon-right mt_5"></text>
				</view>
				<view class="info-item flex justify-between" @click="handleToPageOtherOrder('my/addus')">
					<view class="cont flex flex-center">
						<image class="icon" :src="imgUrl + 'img42.png'" mode="widthFix"></image>
						<text class="p_left10">加入我们</text>
					</view>
					<text class="lg text-gray cuIcon-right mt_5"></text>
				</view>
				<view class="info-item flex justify-between" @click="handleToPageOtherOrder('my/mystudents')"
					v-if="userInfo.role==2">
					<view class="cont flex flex-center">
						<image class="icon" :src="imgUrl + 'img33.png'" mode="widthFix"></image>
						<text class="p_left10">我的学员</text>
					</view>
					<text class="lg text-gray cuIcon-right mt_5"></text>
				</view>
				<view class="info-item flex justify-between" @click="tel">
					<view class="cont flex flex-center">
						<image class="icon" :src="imgUrl+'img32.png'" mode="widthFix"></image>
						<text class="p_left10">客服热线</text>
					</view>
					<text class="lg text-gray cuIcon-right mt_5"></text>
				</view>
			</view>
		</block>
		<!-- <view class="login-container" v-else>
			<view class="wechatapp">
				<view class="header">
					<open-data class="" type="userAvatarUrl"></open-data>
				</view>
			</view>
			<view class="auth-title">本系统需登录才能使用相关功能，申请获取以下权限</view>
			<view class="auth-subtitle">获得你的公开信息（昵称、头像等）</view>
			<view class="btn-group">
				<button class="btn btn-login" @click="toLogin">授权登录</button>
				<button class="btn btn-quit" @click="toIndex">暂不登录</button>
			</view>
		</view> -->
		<!-- 绑定手机号 -->
		<uni-popup ref="mobile" type="center">
			<view class="sign-pop flex-center">
				<!-- <img class="close" src="@/static/imgs/icon_close.png" @click.stop="closePopup('mobile')" /> -->
				<view class="title mar-b">提示</view>
				<button class="pop-btn flex-center" open-type="getPhoneNumber"
					@getphonenumber="getPhoneNumber">绑定手机号</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		imgUrl,
		baseUrl
	} from "@/common/config.default.js";
	import {
		getmySelf
	} from "@/api/my.js";
	export default {
		data() {
			return {
				userInfo: null,
				bind_mobile: '',
				imgUrl: '',
				token: '',
				openId: '',
				code: '',
				mobile: '',
				share_code: '',
				navbanner: [{
						id: 1,
						type: 'img',
						url: imgUrl + 'img27.png',
						text: '订单',
						topage: 'my/dingdan'
					},
					{
						id: 2,
						type: 'img',
						url: imgUrl + 'img43.png',
						text: '卡券',
						topage: 'my/kaquan'
					},
					{
						id: 3,
						type: 'img',
						url: imgUrl + 'img29.png',
						text: '报名',
						topage: 'my/baoming'
					},
					{
						id: 4,
						type: 'img',
						url: imgUrl + 'img42.png',
						text: '访问',
						topage: 'chooseSchool/fangwen'
					}
				],
				navbts: [],
				scrollTop: 0,
				baseUrl: ""
			}
		},
		onLoad(option) {
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
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
		onShow() {
			if (uni.getStorageSync('token')) {
				this.token = uni.getStorageSync('token');

			}
			this.getInfos()
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		},
		methods: {
			login() {
				uni.navigateTo({
					url: '/pages/login/index'
				})
			},
			tel() {
				uni.makePhoneCall({
					phoneNumber: "19305391799"
				})
			},
			async getInfos(code) {
				try {
					const obj = {};
					const {
						data
					} = await getmySelf(obj);
					if (data.code == 200) {
						this.userInfo = data.data
					} else {
						console.log(data)
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			//验证跳转
			handleToPageOtherOrder(url) {
				if (!this.token) {
					this.$needLogin();
					return false;
				}
				console.log(url)
				this.$api.toPage(url);
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #e0e0e0 !important;
	}

	.container {
		width: 100%;

		&.bg {
			// background-image: url(../../static/imgs/bg_img.png);
			background-position: center top;
			background-size: 100% auto;
			background-repeat: no-repeat;
		}
	}

	.info-box {
		padding: 20rpx 20rpx 40rpx;

		.avatar {
			width: 109rpx;
			height: 109rpx;
			border-radius: 50%;
			margin-right: 24rpx;
		}

		.name {
			margin-right: 30rpx;
			font-size: 32rpx;
			color: #333;
			margin-top: 15rpx;
		}

		.uname {
			white-space: nowrap;
			/* 防止文本换行 */
			overflow: hidden;
			/* 隐藏溢出内容 */
			text-overflow: ellipsis;
			/* 显示省略号 */
			max-width: 270rpx;
			display: block;
		}

		.mobile {
			font-size: 24rpx;
			color: #333;
			display: inline;
			line-height: 50rpx;
		}

		.spantext {
			background-color: #2D9DFB;
			border-radius: 15rpx;
			line-height: 30rpx;
			font-size: 20rpx;
			color: #fff;
			height: 30rpx;
			padding: 0 10rpx;
			display: inline-block;
			margin-left: 10rpx;
		}

		.copy {
			width: 30rpx;
			height: 30rpx;
			margin: 4rpx 0 0 10rpx;
		}

		.item-mt {
			margin-top: 8rpx;
		}
	}

	.options-wrapper {
		width: 96%;
		background: #fff;
		border-radius: 16rpx;
		margin: 0 auto 20rpx;
		// box-shadow: 0px 4px 10px 0px rgba(210, 210, 210, 0.5);

		.options-item {
			flex-direction: column;
			padding: 30rpx 0;
			width: 33.3%;

			.icon {
				width: 52rpx;
				height: 56rpx;
				margin-bottom: 12rpx;
			}

			.hint {
				font-size: 28rpx;
				color: #333;
			}
		}

		.info-item {
			align-items: center;
			padding: 0 30rpx;
			width: 100%;
			height: 100rpx;

			.icon {
				width: 32rpx;
				margin-right: 12rpx;

				&.b {
					width: 50rpx;
					height: 50rpx;
				}
			}

			.cont {
				font-size: 28rpx;
				color: #333;
			}

			.arrow {
				width: 30rpx;
				height: 30rpx;
				margin-left: 20rpx;
			}
		}
	}

	.pop-code {
		width: 500rpx;
		flex-direction: column;
		position: relative;

		.close {
			width: 34rpx;
			height: 34rpx;
			position: absolute;
			top: 16rpx;
			right: 16rpx;
			z-index: inherit;
		}

		.qrcode-box {
			width: 100%;
			flex-direction: column;
			background: #FFFFFF;
			margin-bottom: 50rpx;
			padding-bottom: 5px;
		}

		.bg {
			width: 500rpx;
			height: 500rpx;
		}

		.qrcode {
			margin-top: 5px;
			width: 80px;
			height: 80px;
		}

		.btn {
			width: 60%;
			margin-left: 0;
		}
	}

	.login-container {
		padding: 0 36rpx;

		.wechatapp {
			padding: 80rpx 0 48rpx;
			border-bottom: 1rpx solid #e3e3e3;
			margin-bottom: 72rpx;
			text-align: center;
		}

		.wechatapp .header {
			width: 190rpx;
			height: 190rpx;
			border: 2px solid #fff;
			margin: 0rpx auto 0;
			border-radius: 50%;
			overflow: hidden;
			box-shadow: 1px 0px 5px rgba(50, 50, 50, 0.3);
		}

		.auth-title {
			color: #585858;
			font-size: 34rpx;
			margin-bottom: 40rpx;
		}

		.auth-subtitle {
			color: #888;
			margin-bottom: 88rpx;
			font-size: 28rpx;
		}

		.btn-group {
			padding: 0 20rpx;

			.btn {
				height: 88rpx;
				line-height: 88rpx;
				font-size: 28rpx;
				border: none;
				border-radius: 44rpx;
				box-shadow: 4rpx 4rpx 4rpx 0rpx rgba(0, 0, 0, 0.15);
				text-align: center;

				&::after {
					display: none;
				}
			}

			.btn-login {
				margin-bottom: 20rpx;
				background: $main-color;
				color: #FFFFFF;
			}

			.btn-quit {
				color: $main-color;
				border: 1px solid $main-color;
			}
		}

	}
	
	.txnav{
		padding: 25rpx;
		background-color: rgba(255, 255, 255, 0.5);
		border-radius:30rpx;
		padding: 10rpx;
		margin: 20rpx;
		width: 95%;
		.txbt{
			font-size: 22rpx;
			color: #333333;
			line-height: 39rpx;
		}
		.txmon{
			font-weight: bold;
			font-size: 32rpx;
			color: #333333;
			padding-top: 15rpx;
		}
		.txbtn button{
			width: 120rpx;
			margin-top: 30rpx;
			height: 56rpx;
			font-size: 24rpx;
			background: #2D9DFB;
			box-shadow: 0rpx 3rpx 7rpx 0rpx rgba(45,157,251,0.2);
			border-radius: 28rpx;
			color: #fff;
			line-height: 56rpx;
		}
	}

	.mymon {
		height: 350rpx;
		background: linear-gradient(45deg, #F4FAFF 0%, #D6EBF8 100%);
		border-radius: 24rpx;
		border: 2px solid #FFFFFF;
		width: 96%;
		margin: 0 auto 20rpx;
		

		.mon-h {
			padding: 20rpx 30rpx 0;
			font-size: 28rpx;
			color: #333;
			margin: 10rpx 0 20rpx;
		}

		.monbt {
			padding: 0 30rpx;
			font-weight: 400;
			font-size: 24rpx;
			color: #333;
			line-height: 39rpx;
		}
		
		.monnav{
			padding: 0 30rpx;
		}

		.monnav .bluet {
			font-weight: bold;
			font-size: 46rpx;
			color: #2D9DFB;
			line-height: 72rpx;
		}
	}

	.sign-pop {
		width: 400rpx;
		padding: 30rpx;
		background: #ffffff;
		border-radius: 18rpx;
		flex-direction: column;
		position: relative;

		.close {
			width: 24rpx;
			height: 24rpx;
			position: absolute;
			top: 40rpx;
			right: 30rpx;
			z-index: inherit;
		}

		.title {
			font-size: 32rpx;
			font-weight: 500;
			color: #000000;
			line-height: 44rpx;
		}

		.pop-btn {
			width: 100%;
			height: 60rpx;
			background: $main-color;
			border-radius: 49rpx;
			font-size: 26rpx;
			color: #fff;
		}
	}

	.txs {
		padding-top: 170rpx
	}

	.hint {
		font-size: 28rpx;
		color: #333;
	}

	.xxsl {
		font-size: 18rpx;
		position: absolute;
		left: 50rpx;
		top: 0;
		display: block;
		background-color: red;
		color: #fff;
		padding: 3rpx;
		border-radius: 5rpx 6rpx;
	}

	.heightimgs {
		height: 50rpx;
		margin-bottom: 25rpx;
		position: relative;

		image {
			height: 34rpx;
			width: 40rpx;
			margin: 0 20rpx;
		}
	}
</style>