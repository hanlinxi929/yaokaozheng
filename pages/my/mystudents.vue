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
		<view class="navs width96">
			<scroll-view class="navheight" scroll-y>
				<view class="nav_items width100 mt_20" v-for="(item,index) in fpdetail" :key="index">
					<view class="item_center width100">
						<text>姓名（昵称）：隆熹</text>
						<text>项目名：澳门大学成人中专</text>
						<text>推荐人：里斯</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				tbnav: [{
						id: 0,
						text: '已报名'
					},
					{
						id: 1,
						text: '已完结'
					}
				],
				fpdetail: [{
						name: '澳门城市大学报名订单',
						type: 1,
						bmtime: '2024-11-30',
						jftime: '2024-11-30  17:59:56',
						mon: '500.00'
					},
					{
						name: '澳门城市大学报名订单',
						type: 2,
						bmtime: '2024-11-30',
						jftime: '2024-11-30  17:59:56',
						mon: '500.00'
					},
					{
						name: '澳门城市大学报名订单',
						type: 1,
						bmtime: '2024-11-30',
						jftime: '2024-11-30  17:59:56',
						mon: '500.00'
					},
					{
						name: '澳门城市大学报名订单',
						type: 2,
						bmtime: '2024-11-30',
						jftime: '2024-11-30  17:59:56',
						mon: '500.00'
					},
					{
						name: '澳门城市大学报名订单',
						type: 1,
						bmtime: '2024-11-30',
						jftime: '2024-11-30  17:59:56',
						mon: '500.00'
					},
					{
						name: '澳门城市大学报名订单',
						type: 2,
						bmtime: '2024-11-30',
						jftime: '2024-11-30  17:59:56',
						mon: '500.00'
					},
					{
						name: '澳门城市大学报名订单',
						type: 1,
						bmtime: '2024-11-30',
						jftime: '2024-11-30  17:59:56',
						mon: '500.00'
					},
					{
						name: '澳门城市大学报名订单',
						type: 2,
						bmtime: '2024-11-30',
						jftime: '2024-11-30  17:59:56',
						mon: '500.00'
					},
					{
						name: '澳门城市大学报名订单',
						type: 1,
						bmtime: '2024-11-30',
						jftime: '2024-11-30  17:59:56',
						mon: '500.00'
					},
					{
						name: '澳门城市大学报名订单',
						type: 2,
						bmtime: '2024-11-30',
						jftime: '2024-11-30  17:59:56',
						mon: '500.00'
					},
					{
						name: '澳门城市大学报名订单',
						type: 1,
						bmtime: '2024-11-30',
						jftime: '2024-11-30  17:59:56',
						mon: '500.00'
					},
					{
						name: '澳门城市大学报名订单',
						type: 2,
						bmtime: '2024-11-30',
						jftime: '2024-11-30  17:59:56',
						mon: '500.00'
					}
				]
			};
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
		}
	}
</script>

<style lang="less">
	page {
		background: #f7f7f7;
	}

	.navheight {
		height: 83vh;
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