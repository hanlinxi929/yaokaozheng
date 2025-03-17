<template>
	<view class="floor-group">
		<view class="title-bar flex justify-between items-center">
			<view class="title">{{floor.name}}</view>
			<view class="nav" @click.stop="handleClickMore(floor)">优惠套餐>></view>
		</view>
		<view class="goods flex">
			<view class="item" v-for="(good, index) in floor.maintain" :key="good.id" v-if="index <= 2" @click.stop="handleClick(good)">
				<image :src="good.img" mode="aspectFill" class="thumb"></image>
				<view class="name text-ellipsis">{{good.name}}</view>
				<view class="price" v-if="good.money">
					<text class="sigal">&yen;</text>
					<text class="price-integer">{{updatePrice(good.money)[0]}}</text>
					<text class="price-decimal">.{{updatePrice(good.money)[1]}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['floor'],
		filter: {
			priceFilterFront (price) {
				return price.toString().split('.')[0];
			}
		},
		methods: {
			updatePrice (price) {
			  return price.toString().split('.');
			},
			handleClickMore (floor) {
				//console.log('more')
				this.$api.toPage('care/all?catId=' + floor.id);
			},
			handleClick (good) {
				//console.log(good)
			}
		}
	}
</script>

<style lang="scss">
	.floor-group {
		margin-top: 20rpx;
		width: 100%;
		height: auto;
		box-sizing: border-box;
		padding: 10rpx 24rpx;
		border-radius: 16rpx;
		background: #fff;
		box-shadow: 0 8rpx 10rpx 0 rgba(235, 235, 235, 0.5);
		.title-bar {
			width: 100%;
			height: 64rpx;
			.title {
				font-size: 28rpx;
				color: #000;
				line-height: 64rpx;
			}
			.nav {
				width: 152rpx;
				height: 44rpx;
				border-radius: 22rpx;
				background: linear-gradient(217deg, #65BFEE 0%, #358BD8 100%);
				text-align: center;
				line-height: 44rpx;
				font-size: 22rpx;
				color: #fff;
				font-weight: 400;
			}
		}
		.goods {
			.item {
				margin-right: 24rpx;
				width: 204rpx;
				padding: 10rpx 0 26rpx;
				&:last-child {
					margin-right: 0;
				}
				.thumb {
					width: 204rpx;
					height: 204rpx;
					border-radius: 16rpx;
				}
				.name {
					margin-top: 20rpx;
					font-size: 26rpx;
					line-height: 36rpx;
					color: #000;
				}
				.price {
					margin-top: 2rpx;
					line-height: 50rpx;
					color: #DA3E32;
					.sigal {
						margin-right: 4rpx;
						font-size: 26rpx;
					}
					.price-integer {
						font-size: 36rpx;
					}
					.price-decimal {
						font-size: 26rpx;
					}
				}
			}
		}
	}
</style>
