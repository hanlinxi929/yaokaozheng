<template>
	<view>
		<view class="navs width96" v-if="fpdetail.length">
			<scroll-view class="navheight" scroll-y>
				<view class="nav_items width100 mt_20" v-for="(item,index) in fpdetail" :key="index">
					<view class="item_top flex justify-between align-center">
						<view class="item_top_left flex align-center justify-start">
							<text class="cuIcon-formfill top_icon"></text>
							<text class="top_bt">{{item.name}}</text>
						</view>
					</view>
					<view class="item_center width100">
						<text>报名时间：2024-11-30</text>
						<text>缴费时间：2024-11-30 17:59:56</text>

					</view>
					<view class="item_bottom flex justify-between width100">
						<text>咨询二维码</text>
						<view class="erweima" @click="clickImg()">
							<image src="/static/logo.png" mode="widthFix"></image>
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
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				fpdetail: [],
				imgUrl:''
			};
		},
		onLoad() {
		    this.imgUrl = imgUrl	
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			//验证跳转
			handleToPageOtherOrder(url) {
				// if (!this.token) {
				// 	this.$needLogin();
				// 	return false;
				// }
				this.$api.toPage(url);
			},
			clickImg() {
				wx.previewImage({
					urls: ["/static/logo.png"], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
					current: '', // 当前显示图片的http链接，默认是第一个
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #f7f7f7;
	}

	.navheight {
		height: 100vh;
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

	.item_bottom .erweima {
		height: 40rpx;
		width: 40rpx;
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