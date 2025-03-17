<template>
	<view>

		<view class="tab_box width100" id="tabBox">
			<view class="con flex justify-start width96 align-center">
				<!-- <image :src="imgUrl+'bj1.png'" class="bg1" v-if='!yishoucang'></image> -->
				<image :src="schooldetail.schoolHead?baseUrl+schooldetail.schoolHead:imgUrl+'bj1.png'" class="bg1">
				</image>
				<!-- <view class="con_left">
					<image :src="baseUrl+schooldetail.schoolHead"></image>
				</view> -->
				<view class="con_right margin-left-sm">
					<view class="right_top flex justify-between">
						<view class="right_top_text">
							<text class="text_bt text-white">{{schooldetail.deptName}}{{schooldetail.deptName}}</text>
							<text class="text_span text-white">{{schooldetail.cityName?schooldetail.cityName:''}}</text>
						</view>
						<view :class="!yishoucang?'bj-yellow':'bjtouming'" @click='shoucang'>
							<text :class="!yishoucang?'cuIcon-favor text-white':'cuIcon-favorfill text-orange'"></text>
							<text v-if="!yishoucang" class="p_left10 fot-28 text-white">收藏</text>
							<text v-else class="p_left10 fot-28 text-orange">已收藏</text>
						</view>
					</view>
					<view class="right_bottom flex justify-between mt_20">
						<view class="">
							<!-- <text class="text_span"
								:class="yishoucang?'text-gray':'text-white'">全国排名：{{schooldetail.orderNum}}</text>
							<text class="text_span"
								:class="yishoucang?'text-gray':'text-white'">招生层次：{{schooldetail.typeName}}</text> -->
						</view>
						<view class="flex justify-end align-end">
							<button class="btn share_friends" open-type="share">
								<text class="cuIcon-forward" :class="yishoucang?'text-orange':'text-white'"></text>
							</button>
						</view>
					</view>
				</view>
			</view>
			<scroll-view class="nav width96" scroll-x="true" :scroll-into-view="'tabs'+tabIndex">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :id="'tabs'+index" v-for="(item,index) in detailetab" :key="index"
						:class="index==jxNavIndex?'nav-font':''" @click="toAnchor" :data-index="index"
						:data-htmlid="item.htmlId">
						<text>{{item.name}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view id="type-el" class="type-el" v-if="modelShow">
			<scroll-view scroll-y="true" :scroll-into-view="scrollIntoView" @scroll="scrolls"
				:style="{height:scrollViewHeight}" :scroll-top="scroll_top" :show-scrollbar="true">
				<view id="zc" class="p_left20">
					<view class="nav_bt">
						<text class="mimitext">Registration requirements</text>
						<text class="zhengwen">报名条件</text>
						<view class="yuan"></view>
					</view>
					<view class="zhengwentext">
						<mp-html :content="schooldetail.registrationRequirements"></mp-html>
					</view>
				</view>
				<view id="wx" class="p_left20">
					<view class="nav_bt">
						<text class="mimitext">Registration time</text>
						<text class="zhengwen">报名时间</text>
						<view class="yuan"></view>
					</view>
					<view class="zhengwentext">
						<mp-html :content="schooldetail.registrationTime"></mp-html>
						<!-- <text>{{schooldetail.registrationTime?schooldetail.registrationTime:''}}</text> -->
					</view>
				</view>
				<view id="xm" class="p_left20">
					<view class="nav_bt">
						<text class="mimitext">Exam time</text>
						<text class="zhengwen">考试时间</text>
						<view class="yuan"></view>
					</view>
					<view class="zhengwentext">
						<mp-html :content="schooldetail.examTime"></mp-html>
						<!-- <text>{{schooldetail.examTime?schooldetail.examTime:''}}</text> -->
					</view>
				</view>
				<view id="lc" class="p_left20">
					<view class="nav_bt">
						<text class="mimitext">other expenses</text>
						<text class="zhengwen">其他费用</text>
						<view class="yuan"></view>
					</view>
					<view class="zhengwentext">
						<mp-html :content="schooldetail.otherExpenses"></mp-html>
						<!-- <text>{{schooldetail.otherExpenses?schooldetail.otherExpenses:''}}</text> -->
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="height100"></view>
		<view class="btns width100 bg-white flex justify-between">
			<view class="right_bottom flex justify-between mt_20">
				<view class="width100rpx flex justify-center align-end">
					<view @click='shoucang'>
						<image :src="yishoucang?imgUrl+'lanxing.png':imgUrl+'heixing.png'" mode="widthFix"></image>
						<text v-if="yishoucang" class="p_left10 fot-28 text-blue">已收藏</text>
						<text v-else class="text-block">收藏</text>
					</view>
				</view>
				<view class="flex justify-center align-end width100rpx">
					<button class="btn share_friends" open-type="share">
						<image :src="fenxiang?imgUrl+'lanfenxiang.png':imgUrl+'fenxiang.png'" mode="widthFix"></image>
					</button>
					<text :class="!fenxiang?'text-block':'text-blue'">{{fenxiang?'已分享':'分享'}}</text>
				</view>
			</view>
			<button v-if="schooldetail.myInformation==false" class="round btn_left mt_20"
				@click.stop="getAddOrders()">立即咨询</button>
			<button v-if="schooldetail.myInformation==true" class="round btn_left mt_20" @tap="showModal"
				data-target="Modal">已付费</button>
			<button class="round btn_right mt_20"
				@click.stop="$api.toPage('zigeChooseSchool/bmxinxi?oid='+oid+'&oneId='+oneId+'&sid='+sid)">立即报名</button>
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
		nextTick
	} from 'vue';
	import {
		imgUrl,
		baseUrl
	} from "@/common/config.default.js";
	import {
		getzgDetailInfo,
		getAddCollect,
		getDelCollect,
		getzgAddOrder
	} from "@/api/index.js";
	export default {
		data() {
			return {
				modalName: null,
				imgUrl: '',
				baseUrl: '',
				yishoucang: false,
				TabCur: 0,
				index: 0,
				scrollLeft: 0,
				jxNavIndex: 0, // 是第几个导航
				detailetab: [{
						id: 1,
						name: '报名条件',
						htmlId: 'zc',
						height: 0
					},
					{
						id: 2,
						name: '报名时间',
						htmlId: 'wx',
						height: 0
					},
					{
						id: 3,
						name: '考试时间',
						htmlId: 'xm',
						height: 0
					},
					{
						id: 4,
						name: '其他费用',
						htmlId: 'lc',
						height: 0
					},
				],
				schooldetail: '',
				oid: 0,
				sid: 0,
				tabIndex: 0, //选择的tab索引致tab高亮频闪的标识
				erweima: "",
				oneId: "",
				modelShow: true,
				popupData: {
					//弹框数据
					overlay: true,
					mode: 'bottom',
					borderRadius: '',
					closeable: true,
					closeOnClickOverlay: true,
				},
				scroll_top: 0,
				fenxiang:false,
				scrollViewHeight: '900rpx',
				modelHeights: '900rpx',
				// 导航
				jxNavIndex: 0, // 是第几个导航
				jxHtmlId: '',
				jxNav: [{
						name: 'div1',
						htmlId: 'zc',
						height: 0
					},
					{
						name: 'div2',
						htmlId: 'wx',
						height: 0
					},
					{
						name: 'div3',
						htmlId: 'xm',
						height: 0
					},
					{
						name: 'div4',
						htmlId: 'lc',
						height: 0
					},
				],

				scrollIntoView: 'js', // htmlId跳转到的锚点
				isScroll: true, // 判断是点击tab,还是滚动tab
			}
		},
		onShareAppMessage(res) {
			// uni.setStorageSync('token','');
			var that = this
			that.fenxiang=true
			var urls = '/pages/zigeChooseSchool/schooldetail?sid=' + that.sid + '&oid=' + that.oid +
				'&oneId=' + that.oneId + '&userid=' + uni.getStorageSync('userid')
			// 此处的distSource为分享者的部分信息，需要传递给其他人
			// let distSource = uni.getStorageSync('distSource');
			return {
				title: this.schooldetail.deptName,
				path: urls,
				imageUrl: this.baseUrl + this.schooldetail.schoolHead
			}
		},
		// 转发至朋友圈
		onShareTimeline(res) {
			var that = this
			that.fenxiang=true
			var urls = '/pages/zigeChooseSchool/schooldetail?sid=' + that.sid + '&oid=' + that.oid +
				'&oneId=' + that.oneId + '&userid=' + uni.getStorageSync('userid')
			// 此处的distSource为分享者的部分信息，需要传递给其他人
			// let distSource = uni.getStorageSync('distSource');
			return {
				title: this.schooldetail.deptName,
				path: urls,
				imageUrl: this.baseUrl + this.schooldetail.schoolHead
			}
		},
		onShow() {
			uni.$on('isshow', function(data) {
				console.log('监听到事件来自返回的参数：' + data);
				if (data) {
					this.modalName = 'Modal'
				}
				// TODO 下面执行刷新的方法
			})
		},
		mounted() {
			// 先获取高度
			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this);
				query
					.select('#zc')
					.boundingClientRect((zc) => {
						this.detailetab[0].height = parseInt(zc.height);
					})
					.exec();
				query
					.select('#wx')
					.boundingClientRect((wx) => {
						this.detailetab[1].height = parseInt(wx.height);
					})
					.exec();
				query
					.select('#xm')
					.boundingClientRect((xm) => {
						this.detailetab[2].height = parseInt(xm.height);
					})
					.exec();
				query
					.select('#lc')
					.boundingClientRect((lc) => {
						this.detailetab[3].height = parseInt(lc.height);
					})
					.exec();
			});
		},
		onLoad(option) {
			console.log(option)
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
			this.sid = option.sid //详情id
			this.oid = option.oid //二级id
			this.oneId = option.oneId //一级id
			console.log(option.userid)
			if (option.userid) {
				uni.setStorageSync('sjuserid', option.userid);
			}
		},
		onShow() {
			this.getDetail()
		},
		onReady() {

		},
		computed: {},
		created() {
			const res = uni.getSystemInfo({
				success: (res) => {
					//this.clientHeight = res.windowHeight-uni.upx2px(80)-this.getBarHeight();
					console.log(res.windowHeight);
					this.scrollViewHeight = (res.windowHeight - 200) * 2 + 'rpx';
					this.modelHeights = (res.windowHeight - 50) * 2 + 'rpx';
					console.log('this.modelHeights', this.modelHeights);
				},
			});
		},
		watch: {
			modelShow(newVal, oldVal) {
				if (newVal) {
					// 先获取高度
					this.$nextTick(() => {
						const query = uni.createSelectorQuery().in(this);
						query
							.select('#zc')
							.boundingClientRect((zc) => {
								this.detailetab[0].height = parseInt(zc.height);
							})
							.exec();
						query
							.select('#wx')
							.boundingClientRect((wx) => {
								this.detailetab[1].height = parseInt(wx.height);
							})
							.exec();
						query
							.select('#xm')
							.boundingClientRect((xm) => {
								this.detailetab[2].height = parseInt(xm.height);
							})
							.exec();
						query
							.select('#lc')
							.boundingClientRect((lc) => {
								this.detailetab[3].height = parseInt(lc.height);
							})
							.exec();
					});
				}

			},
		},
		methods: {
			// 滚动时，切换tab
			scrolls(e) {
				// console.log(e.detail.scrollTop) // 滚动条距离顶部的距离
				// console.log(this.jxNav)        // 保存的高度
				if (e.detail.scrollTop < this.detailetab[0].height || e.detail.scrollTop == 0) {
					this.jxNavIndex = 0;
				} else if (e.detail.scrollTop < this.detailetab[1].height + this.detailetab[0].height) {
					this.jxNavIndex = 1;
				} else if (e.detail.scrollTop < this.detailetab[2].height + this.detailetab[1].height + this.detailetab[0]
					.height) {
					this.jxNavIndex = 2;
				} else if (e.detail.scrollTop < this.detailetab[3].height + this.detailetab[2].height + this.detailetab[1]
					.height + this.detailetab[0]
					.height) {
					this.jxNavIndex = 3;
				} else if (e.detail.scrollTop < this.detailetab[4].height + this.detailetab[3].height + this.detailetab[2]
					.height + this.detailetab[1].height + this.detailetab[0]
					.height) {
					this.jxNavIndex = 4;
				}
			},
			// 顶部导航选择
			toAnchor(e) {
				let htmlid = e.currentTarget.dataset.htmlid;
				// this.scrollIntoView = htmlid
				this.jxNavIndex = e.currentTarget.dataset.index;
				// this.jxHtmlId = htmlid

				if (this.jxNavIndex == 0) {
					this.scroll_top = 0;
				} else if (this.jxNavIndex == 1) {
					this.scroll_top = this.detailetab[0].height + 5;
				} else if (this.jxNavIndex == 2) {
					this.scroll_top = this.detailetab[0].height + this.detailetab[1].height;
				} else if (this.jxNavIndex == 3) {
					this.scroll_top = this.detailetab[0].height + this.detailetab[1].height + this.detailetab[2].height;
				} else if (this.jxNavIndex == 4) {
					this.scroll_top = this.detailetab[0].height + this.detailetab[1].height + this.detailetab[2].height +
						this.detailetab[3].height;
				}
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
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
				} else {
					laiyuan = '2'
				}

				try {
					const obj = {
						sourceId: this.sid,
						images: this.schooldetail.schoolHead,
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
						images: this.schooldetail.schoolHead,
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
			async getDetail() {
				var that = this
				try {
					const obj = {
						id: that.sid,
						type: '1'
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
			async getAddOrders() {
				var that = this
				try {
					const obj = {
						sourceId: that.sid,
						type: 0,
						sourceType: '1',
						sourceName: that.schooldetail.deptName,
						referralCode: that.tuijianma,
					};
					const {
						data
					} = await getzgAddOrder(obj);

					if (data.code == 200) {
						this.$api.toPage('zigeChooseSchool/qrdingdan?type=1&oid=' + that.oid + '&sid=' + that
							.schooldetail
							.id +
							'&ddid=' + data.data.id + '&oneId=' + that.oneId + '&datas=' + JSON.stringify(data
								.data))
						// this.$api.msg(data.msg)
					} else {
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			changeTab(e) {
				this.tabIndex = e
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f7f7f7;
	}

	.con {
		position: relative;
		height: 312rpx;
		margin-bottom: 20rpx;
		border-radius: 20rpx;
	}

	.btns {
		position: fixed;
		bottom: 0;
		padding-bottom: 20rpx;
	}

	.height100 {
		height: 150rpx;
	}

	.zhengwentext {
		margin: 20rpx 5rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		color: #333333;
	}


	.bg1 {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 312rpx;
		z-index: -1;
	}

	.goods_box {
		text-align: center;
	}

	.goods_box image {
		width: 100%;
		margin: 0 auto;
	}

	.miaosha {
		border-radius: 20rpx;
	}

	.con_left {
		width: 258rpx;
		height: 230rpx;
		overflow: hidden;
		border-radius: 20rpx;
		margin-left: 25rpx;

		image {
			height: 100%;
		}
	}

	.right_top_text {
		width: 75%;
	}
	
	.right_bottom{
			.width100rpx{
				width: 100rpx;
				position: relative;
			}
			.text-blue{
				color: #2D9BFB;
			}
			button{
				position: absolute;
				top: 0;
			}
			text{
				font-size: 24rpx;
			}
			image{
				margin: 0 auto 15rpx;
				height: 40rpx;
				width: 40rpx;
			}
		}

	.text_bt {
		display: block;
		font-size: 32rpx;
		width: 100%;
		line-clamp: 2;
		overflow: hidden; //溢出内容隐藏
		text-overflow: ellipsis; //文本溢出部分用省略号表示
		white-space: nowrap;
	}

	.text_span {
		display: block;
		font-size: 24rpx;
		line-height: 40rpx;
	}

	.text-orange {
		color: #F98110;
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
	}

	.bjtouming {
		background-color: #FFEED5;
		width: 150rpx;
		height: 51rpx;
		border-radius: 26rpx;
		text-align: center;
		line-height: 51rpx;
		float: right;
		margin-top: 20rpx;
	}

	.con_right {
		width: 94%;
	}

	.nav .cu-item {
		margin: 0;
		padding: 0;
	}

	.navheight {
		height: 62vh;
		background-color: #fff;
		border-radius: 20rpx;
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

	.abtns {
		padding-bottom: 20rpx;
	}

	button::after {
		border: none !important;
	}

	.share_friends {
		// display: contents;
		background-color: rgba(0, 0, 0, 0);
		border: none !important;
		outline: none !important;
	}

	.btn_left {
		border: 1px solid #2D9DFB;
		width: 33%;
		color: #2D9DFB;
		font-size: 28rpx;
		height: 80rpx;
		line-height: 80rpx;
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


	.btn_right {
		background: #2D9DFB;
		color: #FFFFFF;
		font-size: 28rpx;
		width: 33%;
		height: 80rpx;
		line-height: 80rpx;
	}

	.goods_box {
		margin-bottom: 30rpx;
		padding: 0 20rpx;

		.title_box {
			font-size: 40rpx;
			font-weight: 600;
			padding-top: 10rpx;
			margin-bottom: 20rpx;
		}

		.goods_list {
			display: grid;
			// grid-template-columns: repeat(2, 1fr);
			// gap: 20rpx;
			width: 100%;

			image {
				width: 100%;
				// height: 100%;
			}
		}
	}

	.more_btn {
		width: 252rpx;
		height: 82rpx;
		margin: 0 auto;
		background: var(--view-theme);

		.in_btn {
			width: 236rpx;
			height: 70rpx;
			line-height: 70rpx;
			border: 1px solid #FFFFFF;
			text-align: center;
			font-size: 28rpx;
			color: #fff;
		}
	}

	.scroll_box {
		position: relative;
		width: 250rpx;
		height: 3rpx;
		background: #CCCCCC;
		margin: 0 auto 37rpx;

		.scroll_icon {
			/* 初始位置 */
			transform: translateX(0px);
			width: 60rpx;
			height: 3rpx;
			background: #383838;
		}
	}


	.tab_box {
		position: sticky;
		z-index: 999;
		top: -1rpx; //动态设置
		background: #fff;
		// height: 80rpx;
		line-height: 80rpx;
		// margin-bottom: 20rpx;
		padding-bottom: 20rpx;
		white-space: nowrap;

		.tab_item {
			display: inline-block;
			position: relative;
			height: 100%;
			font-size: 34rpx;
			color: #303030;

			&:not(:last-child) {
				margin-right: 40rpx;
			}
		}

		.active {
			font-weight: 700;
			color: red;
		}

		.active::after {
			position: absolute;
			left: 0;
			bottom: 0;
			content: '';
			width: 100%;
			height: 2rpx;
			background: red;
		}
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