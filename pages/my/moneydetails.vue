<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub dingwei" :class="index==TabCur?'text-black':'text-gray'"
					v-for="(item,index) in kqbts" :key="index" @tap="tabSelect" :data-id="index">
					{{item.name}}
					<text v-if="index==TabCur">({{total}})</text>
					<text v-if="index==TabCur" class="bg-gradual-blue bluebottom" style="width:82rpx"></text>
				</view>
			</view>
		</scroll-view>
		<view class="kqs" v-if="fpdetail.length">
			<scroll-view scroll-y @scrolltolower='Reachbottom' class="yhList navheight width100">
				<view class="relative kqs_items width96 flex justify-start" v-for="(item,index) in fpdetail"
					:key="index" @tap="xuanzhong" :data-id="index">
					<view  class="yhqbjbox">
						<image v-if="TabCur==0" class="yhqbj" :src="imgUrl+'tixian.png'" mode="widthFix"></image>
						<image v-if="TabCur==1" class="yhqbj" :src="imgUrl+'tixianzhong.png'" mode="widthFix"></image>
						<image v-if="TabCur==2" class="yhqbj" :src="imgUrl+'tixianshibai.png'" mode="widthFix"></image>
					</view>
					<!-- <text class="xztext" v-if='index==xzTabCur'>选中</text> -->
					<view class="kqs_item_left text-center">
						<view class="mon">
							<text>收益提现-到{{item.carBlank}}</text>
						</view>
						<text class="menkan">{{item.createTime}}</text>
					</view>
					<view class="kqs_item_right flex justify-between">
						<view class="right_left">
							<text class="right_left_bt">￥{{item.brokerage}}</text>
							<!-- <text class="right_left_time">{{item.time}}</text> -->
							<text v-if="TabCur==0" class="right_left_day kpsblue">提现成功</text>
							<text v-if="TabCur==1" class="right_left_day kpsorange">提现成功</text>
							<text v-if="TabCur==2" class="right_left_day kpsred">提现成功</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-else class="e-width quesheng">
			<image :src="imgUrl+'zanwu.png'" mode="widthFix"></image>
			<text>暂无内容</text>
		</view>
	</view>
</template>

<script>
	import {
		imgUrl,
		baseUrl
	} from "@/common/config.default.js";
	import {
		getMyBrokeragelist
	} from "@/api/my.js";
	export default {
		data() {
			return {
				TabCur: 0,
				xzTabCur:null,
				xzid:'',
				scrollLeft: 0,
				pageSize: 10,
				pageNum: 1,
				total:0,
				imgUrl: "",
				signUpId: "",
				kqbts: [{
						id: 1,
						name: '已提现'
					},
					{
						id: 2,
						name: '提现中'
					},
					{
						id: 3,
						name: '提现失败'
					}
				],
				fpdetail: []
			};
		},
		onLoad(option) {
			this.signUpId = option.signUpId
			this.imgUrl = imgUrl
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
			this.getKqlists()
		},
		methods: {
			Reachbottom() {
				if (this.hasNext) {
					this.pageNum++;
					this.getKqlists()
				}
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.getKqlists()
			},
			xuanzhong(e){
				this.xzTabCur = e.currentTarget.dataset.id;
				this.xzid = this.fpdetail[e.currentTarget.dataset.id].couponId
			},
			xzyh() {
				if (this.signUpId) {
					this.getxuanzhong()
				}
			},
			async getxuanzhong(){
				try {
					const obj = {
						signUpId: this.signUpId,//报名信息id
						type: '1', //1-选中   0-取消选中
						id: this.fpdetail[this.xzid].id, //优惠券id
					};
					const {
						data
					} = await getAppCouponList(obj);
					
					if (data.code == 200) {
						console.log('zheli')
						uni.navigateTo({
							url: '/pages/mychildren/dingdan_detail?sid='+this.signUpId
						})
					}
				} catch (e) {
				
				}
			},
			async getKqlists() {
				try {
					const obj = {
						status: this.TabCur,
						pageNum: this.pageNum, //页数
						pageSize: this.pageSize, //个数
					};
					const {
						data
					} = await getMyBrokeragelist(obj);
					if (data.code == 200) {
						console.log(data)
						this.total = data.total
						this.fpdetail = this.pageNum == 1 ? data.rows : [...this.fpdetail, ...data.rows];
						this.hasNext = (data.total > data.pageNum);
					} else {
						console.log(data)
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
		}
	}
</script>

<style lang="less">
	page{
		background-color: #f7f7f7;
	}
	.yhList {
		height: 81vh;
		margin-top: 20rpx;
		overflow: auto;
		background-color: #fff;
	}

	.dingwei {
		position: relative;

		.bluebottom {
			position: absolute;
			left: 62rpx;
			bottom: 30rpx;
			height: 5rpx;
			background: linear-gradient(90deg, #2D9DFB 0%, rgba(45, 157, 251, 0) 100%);
			border-radius: 3rpx;
		}
	}
	
	.yhqbjbox{
		width: 130rpx;
		image{
			height: 40rpx;
		}
	}

	.yhqbj {
		width: 40rpx;
		margin: 40rpx auto;
	}
	
	.xztext{
		background-color: #2D9DFB;
		width: 60rpx;
		line-height: 40rpx;
		font-size: 22rpx;
		color: #fff;
		position: absolute;
		left: 3rpx;
		top:4rpx;
		text-align: center;
		border-top-left-radius: 20rpx;
	}
	.kpsred{
		color: #FF1F28;
	}
	.kpsorange{
		color: #F98110;
	}
	.kpsblue{
	    color: #2D9DFB;
	}
	
	.kqs_items{
		padding: 10rpx 0;
		border-bottom: 1rpx solid #eee;
		align-items: center;
	}

	.kqs_item_left {
		width: 63%;
		text-align: left;

		.mon {
			font-weight: 400;
			padding-bottom: 20rpx;
			font-size: 28rpx;
			color: #333333;
		}

		.menkan {
			font-size: 24rpx;
			color: #999999;
			padding-top: 15rpx;
		}

		.left_type {
			width: 53rpx;
			height: 17rpx;
			background: linear-gradient(90deg, #C1E3FF 0%, rgba(233, 245, 255, 0) 100%);
			border-radius: 24rpx;
			font-size: 18rpx;
			color: #2D9DFB;
			position: absolute;
			left: 0;
			top: 0;
		}
	}

	.kqs_item_right {
		width: 20%;
		padding: 20rpx;
		z-index: 11;

		text {
			display: block;
		}

		.right_left_bt {
			font-size: 28rpx;
			color: #333333;
		}

		.right_left_time {
			font-size: 24rpx;
			color: #999999;
			margin-top: 10rpx;
		}

		.right_left_day {
			font-size: 24rpx;
			margin-top: 20rpx;
		}

		.right_day {
			font-size: 24rpx;
			color: #999999;
			margin-top: 10rpx;
		}
	}
	
	.right_right {
		margin: 65rpx 30rpx 0 0;
		z-index: 11;

		text {
			width: 128rpx;
			height: 44rpx;
			border-radius: 22rpx;
			border: 1px solid #2D9DFB;
			font-size: 24rpx;
			color: #2D9DFB;
			line-height: 44rpx;
			text-align: center;
			display: block;
		}
	}
</style>