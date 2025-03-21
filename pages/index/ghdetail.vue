<template>
	<view>
		<view class="navheight width96">
			<scroll-view class="navheight1" scroll-y>
				<view class="miaosha e-width relative bg-white width96">
					<image :src="baseUrl+schooldetail.shcoolInfo" mode="widthFix"></image>
				</view>
			</scroll-view>
		</view>
		<view class="btns width96 flex justify-between" v-if="typename=='第三方职业技能鉴定'">
			<view class="right_bottom flex justify-between">
				<view class="width100rpx flex justify-center align-end">
					<view class="pb5" @click='shoucang'>
						<image :src="yishoucang?imgUrl+'lanxing.png':imgUrl+'heixing.png'" mode="widthFix"></image>
						<text v-if="yishoucang" class="p_left10 fot-28 text-blue">已收藏</text>
						<text v-else class="text-block">收藏</text>
					</view>
				</view>
				<view class="flex justify-center align-end width100rpx pb5">
					<button class="btn share_friends" open-type="share">
						<image :src="fenxiang?imgUrl+'lanfenxiang.png':imgUrl+'fenxiang.png'" mode="widthFix"></image>
					</button>
					<text :class="!fenxiang?'text-block':'text-blue'">{{fenxiang?'已分享':'分享'}}</text>
				</view>
			</view>
			<button v-if="schooldetail.myInformation==false" class="round btn_left mt_20"
				@click.stop="getAddOrders1()">立即咨询</button>
			<button v-if="schooldetail.myInformation==true" class="round btn_left mt_20" @tap="showModal1"
				data-target="Modal">已付费</button>
			<button class="round btn_right mt_20" v-if="ymtype!=1&&ymtype!=2"
				@click.stop="$api.toPage('index/bmxinxi?oid='+oid+'&oneId=225&sid='+schooldetail.id)">立即报名</button>
		</view>
		<view class="btns width96 flex justify-between" v-else-if="typename=='高考志愿规划'">
			<view class="right_bottom flex justify-between">
				<view class="width100rpx flex justify-center align-end">
					<view class="pb5" @click='shoucang'>
						<image :src="yishoucang?imgUrl+'lanxing.png':imgUrl+'heixing.png'" mode="widthFix"></image>
						<text v-if="yishoucang" class="p_left10 fot-28 text-blue">已收藏</text>
						<text v-else class="text-block">收藏</text>
					</view>
				</view>
				<view class="pb5 flex justify-center align-end width100rpx">
					<button class="btn share_friends" open-type="share">
						<image :src="fenxiang?imgUrl+'lanfenxiang.png':imgUrl+'fenxiang.png'" mode="widthFix"></image>
					</button>
					<text :class="!fenxiang?'text-block':'text-blue'">{{fenxiang?'已分享':'分享'}}</text>
				</view>
			</view>
			<button v-if="schooldetail.myInformation==false" class="round btn_left mt_20"
				@click.stop="getAddOrders()">立即咨询</button>
			<button v-if="schooldetail.myInformation==true" class="round btn_left mt_20" @tap="showModal1"
				data-target="Modal">已付费</button>
			<button class="round btn_right mt_20"
				@click.stop="$api.toPage('index/gaokaoguihua?oid='+oid+'&oneId=223&sid='+schooldetail.id+'&jg='+schooldetail.consultingFee)">立即报名</button>
		</view>
		<view class="btns width96 flex justify-between" v-else>
			<view class="right_bottom flex justify-between">
				<view class="width100rpx flex justify-center align-end">
					<view class="pb5" @click='shoucang'>
						<image :src="yishoucang?imgUrl+'lanxing.png':imgUrl+'heixing.png'" mode="widthFix"></image>
						<text v-if="yishoucang" class="p_left10 fot-28 text-blue">已收藏</text>
						<text v-else class="text-block">收藏</text>
					</view>
				</view>
				<view class="pb5 flex justify-center align-end width100rpx">
					<button class="btn share_friends" open-type="share">
						<image :src="fenxiang?imgUrl+'lanfenxiang.png':imgUrl+'fenxiang.png'" mode="widthFix"></image>
					</button>
					<text :class="!fenxiang?'text-block':'text-blue'">{{fenxiang?'已分享':'分享'}}</text>
				</view>
			</view>
			<button v-if="ymtype!=2&&schooldetail.myInformation==false" class="round btn_left mt_20"
				@click.stop="getAddOrders()">立即咨询</button>
			<button v-if="ymtype!=2&&schooldetail.myInformation==true" class="round btn_left mt_20" @tap="showModal1"
				data-target="Modal">已付费</button>
			<button class="round btn_left mt_20" v-if="ymtype==2"
				@click.stop="$api.toPage('chooseSchool/sc_file')">上传简历</button>
			<button class="round btn_right mt_20" v-if="ymtype!=1&&ymtype!=2"
				@click.stop="$api.toPage('index/jybmxinxi?oid='+oid+'&oneId=225&sid='+schooldetail.id)">立即报名</button>
		</view>

		<view class="cu-modal" :class="modalName1=='Modal'?'show':''">
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
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">上传简历</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl hetongimg" v-if="schooldetail.contractSign">
					<image :src="baseUrl+schooldetail.contractSign" mode="widthFix"></image>
				</view>
				<view class="hetongtext">
					<text class="text-blue" @tap="openTxtFile()">《点击上传简历》</text>
				</view>
				<!-- v-if="!dddetail.contractSign" -->
				<view class="bg-white flex justify-center">
					<view class="action text-qr mout" v-if="!dddetail.contractSign" @click="gotijiao()">提交</view>
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
		gethomePagegetInfo,
		getzgAddOrder,
		getzgDetailInfo,
		getAddCollect,
		getDelCollect,
	} from "@/api/index.js";
	export default {
		data() {
			return {
				imgUrl: '',
				dianji: 0,
				TabCur: 0,
				index: 0,
				yishoucang: false,
				modalName: "",
				modalName1: "",
				scrollLeft: 0,
				detailetab: [{
						id: 1,
						name: '报名条件'
					},
					{
						id: 2,
						name: '报名时间'
					},
					{
						id: 3,
						name: '考试时间'
					},
					{
						id: 4,
						name: '其他费用'
					}
				],
				oid: '',
				fenxiang: false,
				schooldetail: '',
				typename: '',
				ymtype: '',
				baseUrl: '',
				onetype: ''
			}

		},
		onShareAppMessage(res) {
			// uni.setStorageSync('token','');
			var that = this
			that.fenxiang = true
			var urls = '/pages/index/ghdetail?type=' + this.ymtype + '&oneId=' + this.oneId + '&id=' + this.oid +
				'&name=' + this.typename + '&userid=' + uni.getStorageSync('userid')
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
			that.fenxiang = true
			var urls = '/pages/index/ghdetail?type=' + this.ymtype + '&oneId=' + this.oneId + '&id=' + this.oid +
				'&name=' + this.typename + '&userid=' + uni.getStorageSync('userid')
			// 此处的distSource为分享者的部分信息，需要传递给其他人
			// let distSource = uni.getStorageSync('distSource');
			return {
				title: this.schooldetail.deptName,
				path: urls,
				imageUrl: this.baseUrl + this.schooldetail.shcoolInfo
			}
		},
		onLoad(option) {
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
			this.oid = option.id
			this.ymtype = option.type ? option.type : '3'
			console.log(option.type)
			this.typename = option.name
			this.oneId = option.oneId
			this.onetype = option.onetype
			if (option.userid) {
				uni.setStorageSync('sjuserid', option.userid);
			}
		},
		onShow() {
			if (this.typename == '第三方职业技能鉴定') {
				this.getsanfang()
			} else {
				this.getDetail()
			}

		},
		methods: {
			shoucang() {
				this.yishoucang = !this.yishoucang
				if (this.yishoucang) {
					this.getAdd()
				} else {
					this.getDel()
				}
			},
			async getAdd() {
				var laiyuan;
				if (this.oneId == '200') {
					laiyuan = '0'
				} else if (this.oneId == '208') {
					laiyuan = '1'
				} else if (this.oneId == '223') {
					laiyuan = '2'
				} else if (this.oneId == '225') {
					laiyuan = '3'
				} else {
					laiyuan = '3'
				}

				try {
					const obj = {
						sourceId: this.sid,
						images: this.schooldetail.shcoolInfo,
						type: laiyuan
					};
					const {
						data
					} = await getAddCollect(obj);

					if (data.code == 200) {
						this.$api.msg(data.msg)
					} else {
						// this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async getDel() {
				var laiyuan;
				if (this.oneId == '200') {
					laiyuan = '0'
				} else if (this.oneId == '208') {
					laiyuan = '1'
				} else {
					laiyuan = '2'
				}
				try {
					const obj = {
						sourceId: this.sid,
						images: this.schooldetail.shcoolInfo,
						type: laiyuan
					};
					const {
						data
					} = await getDelCollect(obj);

					if (data.code == 200) {
						// this.$api.msg(data.msg)
					} else {
						// this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async getAddOrders1() {
				var that = this
				try {
					const obj = {
						sourceId: that.sid,
						type: 0,
						sourceType: 0,
						sourceName: that.schooldetail.deptName,
						referralCode: that.tuijianma,
					};
					const {
						data
					} = await getAddOrder(obj);

					if (data.code == 200) {
						// if (this.oneId == '223') {
						// 	this.$api.toPage('index/gaokaoguihua?sid=' + that.schooldetail.id + '&jg=' + that
						// 		.schooldetail.consultingFee)
						// } 
						// this.$api.msg(data.msg)
						this.$api.toPage('index/qrdingdan?oid=' + that.oid + '&sid=' + that.schooldetail.id +
							'&ddid=' + data.data.id + '&oneId=' + that.oneId + '&datas=' + JSON.stringify(data
								.data))
					} else {
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async getAddOrders() {
				var that = this
				try {
					const obj = {
						sourceId: that.oid,
						sourceName: that.typename,
						sourceType: this.oneId == '223' ? '2' : '3',
						type: 0,
					};
					const {
						data
					} = await getzgAddOrder(obj);

					if (data.code == 200) {
						if (this.onetype) {
							this.$api.toPage('zigeChooseSchool/qrdingdan?type=0&oid=' + that.oid + '&sid=' + that
								.schooldetail
								.id +
								'&ddid=' + data.data.id + '&oneId=225&datas=' + JSON.stringify(data
									.data))
						} else {
							this.$api.toPage('zigeChooseSchool/qrdingdan?type=3&oid=' + that.oid + '&sid=' + that
								.schooldetail
								.id +
								'&ddid=' + data.data.id + '&oneId=225&datas=' + JSON.stringify(data
									.data))
						}

						// this.$api.msg(data.msg)
					} else {
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async getsanfang() {
				var that = this
				try {
					const obj = {
						id: that.oid,
						type: 1
					};
					const {
						data
					} = await getzgDetailInfo(obj);

					if (data.code == 200) {
						if (data.data) {
							that.schooldetail = data.data
							that.yishoucang = data.data.myCollect
						}
					} else {
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async getDetail() {
				var stype;
				if (this.oneId == '200') {
					stype = 0
				} else if (this.oneId == '223') {
					stype = 2
				} else {
					stype = 3
				}
				var that = this
				try {
					const obj = {
						id: that.oid,
						type: stype
					};
					const {
						data
					} = await gethomePagegetInfo(obj);

					if (data.code == 200) {
						if (data.data) {
							that.schooldetail = data.data
							that.yishoucang = data.data.myCollect
						}
					} else {
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			showModal1(e) {
				this.modalName1 = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
				this.modalName1 = null
			},
			saveImg() {
				const that = this;
				var img = that.schooldetail.consultingCode
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
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			openTxtFile() {

				uni.chooseMessageFile({
					success: (chooseImageRes) => {
						// 获取的格式是数组，多选会同时返回，单选只返回一项
						const tempFiles = chooseImageRes.tempFiles;
						console.log(tempFiles[0].path)
						// 若多选，需循环调用uni.uploadFile ，因微信小程序只支持单文件上传
						uni.uploadFile({
							url: 'https://www.rzjswy.cn/hs/api/upload', //仅为示例，非真实的接口地址
							filePath: tempFiles[0].path,
							name: 'file',
							formData: {
								'appToken': uni.getStorageSync('token')
							},
							success: (uploadFileRes) => {
								// 根据接口具体返回格式   赋值具体对应url
								console.log(uploadFileRes.data.fileName);
							}
						});
					}
				});

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

	.text-blue {
		color: #2D9BFB !important;
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

	.shoucang {
		text-align: center;
		line-height: 110rpx;

		text {
			font-size: 38rpx;
		}
	}

	.abtns {
		padding-bottom: 20rpx;
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

	.hetongimg {
		height: 600rpx;
		overflow-y: auto;
	}

	.hetongtext {
		height: 70rpx;

		text {
			display: block;
			margin-top: 80rpx;
		}
	}

	.mout {
		margin: 40rpx auto;
	}

	.text-qr {
		background-color: #2D9DFB;
		color: #fff;
		width: 200rpx;
		height: 66rpx;
		line-height: 66rpx;
		text-align: center;
		margin: 20rpx 40rpx 40rpx;
		border-radius: 33rpx;
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

	.right_bottom {
		.pb5 {
			padding-bottom: 10rpx;
		}

		.width100rpx {
			width: 100rpx;
			position: relative;
		}

		.text-blue {
			color: #2D9BFB;
		}

		button {
			position: absolute;
			bottom: 39rpx;
		}

		text {
			font-size: 24rpx;
		}

		image {
			margin: 0 auto 15rpx;
			height: 40rpx;
			width: 40rpx;
		}
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
		height: 80rpx;
		line-height: 80rpx;
		margin: 20rpx;
	}

	.btn_right {
		height: 80rpx;
		line-height: 80rpx;
		background: #2D9DFB;
		color: #FFFFFF;
		font-size: 28rpx;
		width: 45%;
		margin: 20rpx;
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
</style>