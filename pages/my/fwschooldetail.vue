<template>
	<view>

		<view class="tab_box width100" id="tabBox">
			<view class="con flex justify-start width96 align-center" :class="yishoucang?'bg-white':''">
				<image :src="imgUrl+'bj1.png'" class="bg1" v-if='!yishoucang'></image>
				<view class="con_left">
					<image :src="baseUrl+schooldetail.schoolHead"></image>
				</view>
				<view class="con_right margin-left-sm">
					<view class="right_top flex justify-between">
						<view class="right_top_text">
							<text class="text_bt"
								:class="yishoucang?'text-black':'text-white'">{{schooldetail.deptName}}</text>
							<text class="text_span"
								:class="yishoucang?'text-black':'text-white'">{{schooldetail.cityName}}</text>
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
						<view class="flex justify-end align-end"><text class="cuIcon-forward"
								:class="yishoucang?'text-orange':'text-white'"></text></view>
					</view>
				</view>
			</view>
			<scroll-view class="nav width96" scroll-x="true" :scroll-into-view="'tabs'+tabIndex">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :id="'tabs'+index" :class="{'text_blue':tabIndex==index}"
						v-for="(item,index) in detailetab" @click="changeTab(index)" :key="index">
						<text>{{item.name}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="goods_box" v-if="tabIndex==0">
			<view class="goods_list">
				<image :src="baseUrl+schooldetail.collegeIntroduction" mode="heightFix"></image>
			</view>
		</view>
		<view class="goods_box" v-if="tabIndex==1">
			<view class="goods_list">
				<image :src="baseUrl+schooldetail.registration" mode="heightFix"></image>
			</view>
		</view>
		<view class="goods_box" v-if="tabIndex==2">
			<view class="goods_list">
				<image :src="baseUrl+schooldetail.registrationEligibility" mode="heightFix"></image>
			</view>
		</view>
		<view class="goods_box" v-if="tabIndex==3">
			<view class="goods_list">
				<image :src="baseUrl+schooldetail.entranceInterview" mode="heightFix"></image>
			</view>
		</view>
		<view class="goods_box" v-if="tabIndex==4">
			<view class="goods_list">
				<image :src="baseUrl+schooldetail.otherExpenses" mode="heightFix"></image>
			</view>
		</view>
		<view class="height100"></view>
		<view class="btns width100 bg-white flex justify-between">
			<button v-if="schooldetail.myInformation==false" class="round btn_left mt_20" @click.stop="getAddOrders()">立即咨询</button>
			<button v-if="schooldetail.myInformation==true" class="round btn_left mt_20"  @tap="showModal" data-target="Modal">已付费，查看二维码</button>
			<button class="round btn_right mt_20" @click.stop="$api.toPage('index/bmxinxi?oid='+oid)">立即报名</button>
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
		getDelCollect,
		getAddOrder
	} from "@/api/index.js";
	import {
		getCollectInfoDetail
	} from "@/api/my.js";
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
				detailetab: [{
						id: 1,
						name: '院校介绍'
					},
					{
						id: 2,
						name: '报名程序'
					},
					{
						id: 3,
						name: '报名资格'
					},
					{
						id: 4,
						name: '入学面试'
					},
					{
						id: 5,
						name: '其他费用'
					},
				],
				schooldetail: '',
				oid: 0,
				sid:0,
				tabIndex: 0, //选择的tab索引致tab高亮频闪的标识
				erweima:"",
				sourceId:'',
				TabCur:"",
				type:''
			}
		},
		onLoad(option) {
			console.log(option)
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
			this.sid = option.sid
			this.oid = option.oid
			this.sourceId = option.sourceId
			this.TabCur = option.TabCur
			this.type = option.type
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
			this.getDetail()
		},
		onReady() {

		},
		methods: {
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
				try {
					const obj = {
						sourceId: this.sid,
						images: this.schooldetail.schoolHead,
						type: '2'
					};
					const {
						data
					} = await getAddOrder(obj);

					if (data.code == 200) {
						this.$api.msg(data.msg)
					} else {
						// this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async getDel() {
				try {
					const obj = {
						sourceId: this.sid,
						images: this.schooldetail.schoolHead,
						type: '2'
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
						sourceId: that.sourceId,
					    type:that.type,
						state:that.TabCur
					};
					const {
						data
					} = await getCollectInfoDetail(obj);
                     console.log(data)
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
						type:0,
						sourceType:'0',
						sourceName:that.schooldetail.deptName,
						referralCode:that.tuijianma,
					};
					const {
						data
					} = await getAddOrder(obj);

					if (data.code == 200) {
						this.$api.toPage('index/qrdingdan?oid='+that.oid+'&sid='+that.schooldetail.id+'&ddid='+data.data.id)
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
			saveImg(){
			    const that = this;
				var img = that.schooldetail.consultingCode
			    uni.downloadFile({
			        url:baseUrl+img,
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

<style lang="less">
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
		width: 60%;
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
		width: 55%;
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
	
	.abtns{
		padding-bottom: 20rpx;
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
			width: 96%;

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
</style>