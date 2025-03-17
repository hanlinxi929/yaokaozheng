<template>
	<view>
		<view class="navs width96">
			<scroll-view scroll-y @scrolltolower='Reachbottom' class="yhList">
				<view class="nav_items width100 mt_20" v-for="(item,index) in fpdetail" :key="index">
					<view class="item_top flex justify-between align-center">
						<view class="item_top_left flex align-center justify-start">
							<text class="cuIcon-formfill top_icon"></text>
							<text class="top_bt">{{item.title}}</text>
						</view>
					</view>
					<view class="item_center width100">
						<text>退费时间：{{item.createTime}}</text>
						<text>退费金额：{{item.price}}元</text>
						<text>退费原因：{{item.remark}}</text>
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
		getMyRefund
	} from "@/api/my.js";
	export default {
		data() {
			return {
				tbnav: [{
						id: 0,
						text: '已申请'
					},
					{
						id: 1,
						text: '已开票'
					}
				],
				fpdetail: []
			};
		},
		onShow() {
			if (uni.getStorageSync('token')) {
				this.token = uni.getStorageSync('token');
				this.getKqlists()
			}
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
		onLoad(option) {
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			async getKqlists() {
				try {
					const obj = {
					};
					const {
						data
					} = await getMyRefund(obj);
					if (data.code == 200) {
						console.log(data)
						this.fpdetail = data.data;
					} else {
						this.$api.msg(data.msg)
					}
				} catch (e) {
			
				}
			},
		}
	}
</script>

<style lang="less">
	page {
		background: #f7f7f7;
	}
	.yhList {
		height: 100vh;
		overflow: auto;
	}

	.nav_items {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 25rpx 20rpx;
	}

	.item_top_left {
		line-height: 50rpx;
	}

	.top_bt {
		font-size: 28rpx;
		color: #333333;
		padding-left: 10rpx;
	}

	.top_icon {
		font-size: 32rpx;
		color: #2D9DFB;
	}

	.item_top_right text {
		font-size: 28rpx;
		padding-right: 20rpx;
	}

	.textorange {
		color: #F98110;
	}

	.textblue {
		color: #2D9DFB;
	}

	.item_center {
		background-color: #F4F4F4;
		padding: 20rpx;
		border-radius: 20rpx;
		margin: 20rpx 0;

		text {
			font-size: 22rpx;
			color: #333333;
			line-height: 50rpx;
			display: block;
		}
	}

	.item_bottom button {
		padding: 0 20rpx;
		height: 56rpx;
		background: #FFFFFF;
		border-radius: 28rpx;
		border: 1px solid #2D9DFB;
		line-height: 54rpx;
		color: #2D9DFB;
		font-size: 28rpx;
		font-weight: 400;
		margin: 0;
	}

	.nav_text {
		width: 50%;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 28rpx;
		margin: 0 !important;
		padding: 0 !important;
	}

	.xz {
		background-color: #E6F4FF;
		color: #2D9DFB;
	}

	.btn {
		background: #2D9DFB;
		border-radius: 36rpx;
		color: #fff;
		font-size: 28rpx;
		line-height: 72rpx;
		position: fixed;
		bottom: 20rpx;
		left: 2%;
	}
</style>