<template>
	<view>

		<scroll-view class="navheight1" scroll-y>
			<view class="miaosha e-width relative bg-white width96">
				<image :src="baseUrl+schooldetail.courseProcess" mode="widthFix"></image>
			</view>
		</scroll-view>
		<view class="btns width100 bg-white flex justify-between">
			<button class="round btn_right mt_20"
				@click.stop="$api.toPage('chooseSchool/gokaike?oid='+oid + '&jg=' + schooldetail
							.preferentialPrice + '&gwjg=' + schooldetail.officialWebsitePrice)">去开课</button>
		</view>
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">扫码咨询</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<image :src="baseUrl+schooldetail.consultingCode" mode="widthFix"></image>
				</view>
				<view class="abtns flex justify-between">
					<button @click="hideModal()" class="btn_left">返回</button>
					<button @click="saveImg()" class="btn_right">保存二维码</button>
				</view>
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
		getAddCollect,
		getDelCollect,
		getAddOrder,
		getWangkeInfo
	} from "@/api/index.js";
	import {
		nextTick
	} from 'vue';
	export default {
		data() {
			return {
				imgUrl: '',
				yiPay: false,
				dianji: 0,
				TabCur: 0,
				index: 0,
				scrollLeft: 0,
				oid: 0,
				sid: 0,
				oneId: "",
				schooldetail: '',
				erweima: "",
				modelShow: true,
				popupData: {
					//弹框数据
					overlay: true,
					mode: 'bottom',
					borderRadius: '',
					closeable: true,
					closeOnClickOverlay: true,
				},
				isScroll: true, // 判断是点击tab,还是滚动tab
				detailetab: [{
						id: 1,
						name: '优惠政策',
						htmlId: 'zc',
						height: 0
					},
					{
						id: 2,
						name: '合作网校',
						htmlId: 'wx',
						height: 0
					},
					{
						id: 3,
						name: '考证项目',
						htmlId: 'xm',
						height: 0
					},
					{
						id: 4,
						name: '开课流程',
						htmlId: 'lc',
						height: 0
					}
				]
			}
		},
		onLoad(option) {
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
		},
		onShow() {
			this.getDetail()
		},
		onShareAppMessage(res) {
			// uni.setStorageSync('token','');
			var that = this
			var urls = '/pages/index/wangke'
			// 此处的distSource为分享者的部分信息，需要传递给其他人
			// let distSource = uni.getStorageSync('distSource');
			return {
				title: this.schooldetail.deptName,
				path: urls,
				imageUrl: this.baseUrl + this.schooldetail.shcoolInfo
			}
		},
		// 转发至朋友圈
		onShareTimeline(res) {
			var that = this
			var urls = '/pages/index/wangke'
			// 此处的distSource为分享者的部分信息，需要传递给其他人
			// let distSource = uni.getStorageSync('distSource');
			return {
				title: this.schooldetail.deptName,
				path: urls,
				imageUrl: this.baseUrl + this.schooldetail.shcoolInfo
			}
		},
		methods: {
			async getDetail() {
				var that = this
				try {
					const obj = {

					};
					const {
						data
					} = await getWangkeInfo(obj);

					if (data.code == 200) {
						if (data.data) {
							that.schooldetail = data.data
							that.oid = data.data.id
							that.oneId = data.data.parentId
							console.log(that.schooldetail)
						}
					} else {
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f7f7f7;
	}

	.con {
		position: relative;
		height: 312rpx;
	}

	.zhengwentext {
		margin: 20rpx 5rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		color: #333333;
	}

	.btns {
		position: fixed;
		bottom: 0;
		left: 0;
		padding-bottom: 40rpx;
	}

	.miaosha {
		border-radius: 20rpx;

		image {
			width: 100%;
		}
	}

	.bg1 {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 312rpx;
		z-index: -1;
	}

	.con_left {
		width: 258rpx;
		height: 228rpx;
		overflow: hidden;
		border-radius: 20rpx;
		margin-left: 25rpx;
	}

	.right_top_text {
		width: 60%;
	}

	.text_bt {
		display: block;
		font-size: 32rpx;
		color: #FFFFFF;
		padding-bottom: 15rpx;
		padding-top: 20rpx;
		width: 100%;
	}

	.text_span {
		display: block;
		font-size: 24rpx;
		color: #FFFFFF;
		line-height: 40rpx;
	}

	.bj-yellow {
		width: 130rpx;
		height: 51rpx;
		background: #F98110;
		border-radius: 26rpx;
		text-align: center;
		line-height: 51rpx;
		float: right;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.con_right {
		width: 55%;
	}

	.nav .cu-item {
		margin: 0;
		padding: 0;
	}

	.navheight1 {
		height: 90vh;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 30rpx 0;
	}

	.cu-item {
		padding: 0;
		margin: 20rpx 0 0;
	}

	.text_blue {
		text {
			display: inline-block;
			background: #2D9BFB;
			color: #fff;
			font-size: 26rpx;
			height: 56rpx;
			width: 100%;
			border-radius: 28rpx;
			line-height: 56rpx;
		}
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

	.nav_bt {
		height: 63rpx;
		position: relative;
	}

	.mimitext {
		font-size: 18rpx;
		color: #999999;
		padding-left: 5rpx;
		display: block;
	}

	.zhengwen {
		font-size: 32rpx;
		color: #333333;
		position: absolute;
		left: 5rpx;
		bottom: 5rpx;
		z-index: 2;
	}

	.yuan {
		width: 28rpx;
		height: 28rpx;
		background: #9BD1FF;
		border-radius: 50%;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 1;
	}

	/* 导航 */
	.g-nav {
		position: fixed;
		z-index: 999;
		//position: sticky;
		//top: 129rpx;

		width: 750rpx;
		height: 200rpx; // 88rpx
		overflow: auto;
		background-color: #fff;
		border-bottom: 20rpx solid #f0f6f6;
		border-radius: 32rpx 32rpx 0 0;
	}

	.g-nav-box {
		display: flex;
		justify-content: space-around;

		white-space: nowrap;
		width: auto;
		// display:inline-block;
		// zoom:1
	}

	.g-nav-box span {
		/* width:140rpx; */
		padding: 0 35rpx;
		height: 88rpx;
		text-align: center;
		display: inline-block;
		font-size: 28rpx;
		color: #9a9a9a;
		height: 50rpx;
		line-height: 50rpx;
	}

	.nav .cu-item {
		height: 60rpx;
		line-height: 60rpx;
	}

	.nav-font {
		/* color: #014343 !important; */
		color: #fff !important;
		font-weight: 800;
		background-color: #2D9DFB;
		border-radius: 30rpx;
		height: 60rpx;
		line-height: 60rpx;
		margin: 20rpx 0;
	}

	.type-el {
		margin: 20rpx;
		width: 710rpx;
	}

	/** div2 */
	.xl-main {
		margin: 20rpx;
		font-size: 12px;
		color: #999;
	}

	/** div3 */
	.tg-title {
		margin: 10rpx 0;
		font-size: 30rpx;
		font-weight: 800;
	}

	.tg-main {

		// border: 1rpx solid #ccc;
		.tg-main-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 70rpx;
			border-bottom: 1rpx solid #ccc;

			&:last-child {
				border: 0;
			}
		}
	}
</style>