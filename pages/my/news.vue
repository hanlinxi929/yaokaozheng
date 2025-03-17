<template>
	<view>
		<view class="">
			<scroll-view scroll-x class="bg-white nav text-center">
				<view class="cu-item nav_text" :class="index==TabCur?'text-blue xz':''" v-for="(item,index) in tbnav"
					:key="index" @tap="tabSelect" :data-id="index">
					{{item.text}}
				</view>
			</scroll-view>
		</view>
		<view class="navs width96" v-if="fpdetaillen">
			<scroll-view class="navheight" scroll-y @scrolltolower='Reachbottom'>
				<view class="nav_items width100 mt_20" v-for="(item,index) in fpdetail" :key="index">
					<view class="item_top flex justify-between align-center">
						<view class="item_top_left flex align-center justify-start">
							<text class="cuIcon-formfill top_icon"></text>
							<text class="top_bt">{{item.title}}</text>
						</view>
						<view class="item_top_right">
							<text class="textblue">{{item.createTime}}</text>
						</view>
					</view>
					<view class="item_center width100">
						<text>{{item.content}}</text>
					</view>
					<view class="item_bottom flex justify-end width100"
						@click="yidu(item.id)">
						<button>已读</button>
						<!-- getread -->
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
		imgUrl
	} from "@/common/config.default.js";
	import {
		getNoticelist,
		getread
	} from "@/api/my.js";
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				imgUrl: '',
				tbnav: [{
						id: 0,
						text: '未读消息'
					},
					{
						id: 1,
						text: '已读消息'
					}
				],
				pageSize: 10,
				pageNum: 1,
				hasNext: false,
				page: 1,
				fpdetail: [],
				fpdetaillen: 0
			};
		},
		onLoad() {
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
			this.getList()
		},
		methods: {
			Reachbottom() {
				if (this.hasNext) {
					this.pageNum++;
					this.getList()
				}
			},
			async getList() {
				var that = this
				try {
					const obj = {
						state: that.TabCur,
						pageSize: that.pageSize, //个数
						pageNum: that.pageNum //页数
					};
					const {
						data
					} = await getNoticelist(obj);
					if (data.code == 200) {
						this.fpdetaillen = data.rows.length
						this.fpdetail = this.page == 1 ? data.rows : [...this.fpdetail, ...data.rows];
						this.hasNext = (data.total > data.current_page);

					} else {
						this.$api.msg(data.msg);
					}
				} catch (e) {

				}
			},
			async yidu(id) {
				var that = this
				try {
					const obj = {
						id:id
					};
					const {
						data
					} = await getread(obj);
					if (data.code == 200) {
						this.pageNum = 1
						this.getList()
					} else {
						this.$api.msg(data.msg);
					}
				} catch (e) {
			
				}
			},
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
		}
	}
</script>

<style lang="less">
	page {
		background: #f7f7f7;
	}

	.navheight {
		height: 93vh;
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
		min-width: 150rpx;
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