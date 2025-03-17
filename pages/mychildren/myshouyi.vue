<template>
	<view>
		<view class="kqs">
			<scroll-view scroll-y @scrolltolower='Reachbottom' class="yhList navheight width100">
				<view class="relative kqs_items width96 flex justify-start" v-for="(item,index) in fpdetail"
					:key="index" @tap="xuanzhong" :data-id="index">
					<view  class="yhqbjbox">
						<image class="yhqbj" src="/static/tab1.png" mode="widthFix"></image>
					</view>
					<!-- <text class="xztext" v-if='index==xzTabCur'>选中</text> -->
					<view class="kqs_item_left text-center">
						<view class="mon">
							<text>{{item.sourceName}}</text>
						</view>
						<text class="menkan">{{item.updateTime}}</text>
					</view>
					<view class="kqs_item_right flex justify-between align-center">
						<text class="right_left_bt">￥{{item.commission}}</text>
						<text class="cuIcon-right fot-24 text-gray"></text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		imgUrl,
		baseUrl
	} from "@/common/config.default.js";
	import {
		getMyCommission
	} from "@/api/my.js";
	export default {
		data() {
			return {
				xzTabCur:null,
				xzid:'',
				scrollLeft: 0,
				pageSize: 10,
				pageNum: 1,
				total:0,
				imgUrl: "",
				signUpId: "",
				fpdetail: [{
						name: '报名立减券',
						type: 1,
						time: '2024.12.02-2024.12.09',
						mon: '150',
						day: '120',
						span: '无门槛'
					},
					{
						name: '报名立减券',
						type: 2,
						time: '2024.12.02-2024.12.09',
						mon: '150',
						day: '2',
						span: '满1000使用'
					}
				]
			};
		},
		onLoad(option) {
			this.signUpId = option.signUpId
			this.imgUrl = imgUrl
		},
		onShow() {
			this.getKqlists()
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
			Reachbottom() {
				if (this.hasNext) {
					this.pageNum++;
					this.getKqlists()
				}
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
			async godingdan() {

				try {
					const obj = {
						getAppCouponList: this.getAppCouponList,
						pageNum: this.pageNum, //页数
						pageSize: this.pageSize, //个数
					};
					const {
						data
					} = await getKqlist(obj);
					if (data.code == 200) {
						console.log(data)
						this.fpdetail = this.pageNum == 1 ? data.rows : [...this.fpdetail, ...data.rows];
						this.hasNext = (data.total > data.pageNum);
					} else {
						console.log(data)
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async getKqlists() {
				try {
					const obj = {
						pageNum: this.pageNum, //页数
						pageSize: this.pageSize, //个数
					};
					const {
						data
					} = await getMyCommission(obj);
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
		height: 100vh;
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
		margin-right: 20rpx;

		text {
			display: block;
		}

		.right_left_bt {
			padding-right: 10rpx;
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