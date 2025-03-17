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
				<view class="relative kqs_items width96 flex mt_20 justify-between" v-for="(item,index) in fpdetail"
					:key="index" @tap="xuanzhong" :data-id="index">
					<image class="yhqbj" :src="imgUrl+'youhuiquanbj.png'" mode="widthFix"></image>
					<!-- <text class="xztext" v-if='index==xzTabCur'>选中</text> -->
					<view class="kqs_item_left text-center">
						<view class="mon">
							<text>￥</text>
							<text>{{item.couponMoney}}</text>
						</view>
						<text class="menkan">{{item.couponName}}</text>
					</view>
					<view class="kqs_item_right flex justify-between">
						<view class="right_left">
							<text class="right_left_bt">{{item.couponName}}</text>
							<!-- <text class="right_left_time">{{item.time}}</text> -->
							<text class="right_left_day">有效期至{{item.periodValidity}}</text>
							<text class="right_day">有效期剩余{{item.sy}}天</text>
						</view>
					</view>
					<view class="right_right" v-if="item.state==0" @click="xzyh()">
						<text>待使用</text>
					</view>
					<view class="right_right" v-if="item.state==1" @click="xzyh()">
						<text>已使用</text>
					</view>
					<view class="right_right" v-if="item.state==2" @click="xzyh()">
						<text>已过期</text>
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
		getKqlist,
		getAppCouponList
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
						name: '未使用'
					},
					{
						id: 2,
						name: '已使用'
					},
					{
						id: 3,
						name: '已失效'
					}
				],
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
						state: this.TabCur,
						pageNum: this.pageNum, //页数
						pageSize: this.pageSize, //个数
					};
					const {
						data
					} = await getKqlist(obj);
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
	.yhList {
		height: 81vh;
		overflow: auto;
		background-color: #f7f7f7;
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

	.yhqbj {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
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

	.kqs_item_left {
		position: relative;
		padding: 30rpx;
		z-index: 11;
		width: 30%;

		.mon {
			color: #2D9DFB;
			margin-top: 20rpx;

			text:first-child {
				font-size: 28rpx;
			}

			text:last-child {
				font-weight: bold;
				font-size: 50rpx;
			}
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
		width: 52%;
		padding: 20rpx;
		z-index: 11;

		text {
			display: block;
		}

		.right_left_bt {
			font-size: 28rpx;
			color: #333333;
			margin-top: 15rpx;
		}

		.right_left_time {
			font-size: 24rpx;
			color: #999999;
			margin-top: 10rpx;
		}

		.right_left_day {
			font-size: 24rpx;
			color: #999999;
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