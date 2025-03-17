<template>
	<view class="swiper-banner">
		<swiper class="swiper-container" :autoplay="config.autoplay" :circular="config.circular"
			:interval="config.interval" :duration="config.duration" @change="swiperBannerChange">
			<swiper-item v-for="(item, index) in banners" :key="index">
				<view class="slide" @click="handleBannerClick(item)">
					<view class="thumbnail">
						<image lazy-load class="thumb" mode="aspectFill" :src="item.img" />
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="swiper-dots flex">
			<view class="dots am-ease" :class="bannerIndex == index ? 'cur' : ''" v-for="(item, index) in banners"
				:key="index"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerIndex: 0,
				config: {
					autoplay: true,
					circular: true,
					interval: 5000,
					duration: 500
				}
			}
		},
		props: ['banners'],
		methods: {
			swiperBannerChange(e) { // banner轮播切换
				this.bannerIndex = e.detail.current
			},
			handleBannerClick(item) { // 处理banner点击
				//console.log(item)
			},
		}
	}
</script>

<style lang="scss">
	.swiper-banner {
		position: relative;
		z-index: 2;
		width: 100%;
		height: 300rpx;
		overflow: hidden;

		.slide {
			height: 300rpx;

			.thumbnail {
				width: 100%;
				height: 300rpx;
				border-radius: 16rpx;
				overflow: hidden;
			}
		}

		.swiper-dots {
			position: absolute;
			left: 50%;
			bottom: 22rpx;
			transform: translateX(-50%);
			z-index: 1;

			.dots {
				width: 12rpx;
				height: 6rpx;
				background: #fff;
				margin: 0 4rpx;

				&.cur {
					width: 20rpx;
					background: $main-color;
				}
			}
		}
	}
</style>
