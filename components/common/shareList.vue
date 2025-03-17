<template>
	<view class="share-list">
		<view class="share-item flex" v-for="(item, index) in list" :key="index" @click.stop="handleClick(item)">
			<view class="left">
				<image :src="item.avatar" mode="aspectFill" class="avatar"></image>
			</view>
			<view class="right">
				<view class="userAndCar flex justify-between items-center">
					<view class="user-name text-ellipsis">{{item.nickname}}</view>
					<view class="car flex">
						<image :src="item.brand_img" mode="aspectFill" class="logo"></image>
						<view class="car-name text-ellipsis">{{item.series_name}}</view>
					</view>
				</view>
				<view class="share-text">{{item.content}}</view>
				<view class="share-images flex">
					<image class="share-image" mode="aspectFill" :src="image" v-for="(image, index) in item.image" v-if="index <= 2" :key="index"></image>
				</view>
				<view class="date">{{item.create_time_text | dateFormat}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['list'],
		filters: {
			dateFormat (time) {
				
				let timestr =new Date(time.replace(/-/g, "/"));
				var y = timestr.getFullYear(); //getFullYear方法以四位数字返回年份
				var M = timestr.getMonth() + 1 > 9 ? timestr.getMonth() + 1 : ('0' + (timestr.getMonth() + 1));
				var d = timestr.getDate() > 9 ? timestr.getDate() : ('0' + timestr.getDate());
				var h = timestr.getHours() > 9 ? timestr.getHours() : ('0' + timestr.getHours());
				var m = timestr.getMinutes() > 9 ? timestr.getMinutes() : ('0' + timestr.getMinutes());
				var s = timestr.getSeconds() > 9 ? timestr.getSeconds() : ('0' + timestr.getSeconds());
				return M + '.' + d + ' ' + h + ':' + m;
			} 
		},
		methods: {
			handleClick (item) {
				this.$api.toPage('share/detail?id=' + item.id);
			}
		}
	}
</script>

<style lang="scss">
	.share-item {
		box-sizing: border-box;
		padding: 28rpx 24rpx 0 28rpx;
		.left {
			width: 64rpx;
			.avatar {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
			}
		}
		.right {
			margin-left: 12rpx;
			flex: 1;
			overflow: hidden;
			padding-bottom: 18rpx;
			border-bottom: 1rpx solid #F1F1F1;
			.userAndCar {
				height: 42rpx;
				.user-name {
					flex: 1;
					overflow: hidden;
					box-sizing: border-box;
					padding-right: 12rpx;
					font-size: 30rpx;
					line-height: 42rpx;
					color: #000;
				}
				.car {
					width: auto;
					.logo {
						width: 38rpx;
						height: 38rpx;
					}
					.car-name {
						margin-left: 12rpx;
						max-width: 200rpx;
						font-size: 24rpx;
						color: #000;
						line-height: 42rpx;
						font-weight: 400;
					}
				}
			}
			.share-text {
				margin-top: 10rpx;
				@include multi-ellipsis(3);
				font-size: 28rpx;
				line-height: 42rpx;
				color: #000;
				font-weight: 400;
			}
			.share-images {
				margin-top: 24rpx;
				flex-wrap: wrap;
				.share-image {
					margin-right: 24rpx;
					margin-bottom: 24rpx;
					width: 176rpx;
					height: 176rpx;
					border-radius: 12rpx;
					&:nth-child(3n) {
						margin-right: 0;
					}
				}
			}
			.date {
				margin-top: 10rpx;
				font-size: 26rpx;
				line-height: 36rpx;
				color: #999;
				font-weight: 400;
			}
		}
	}
</style>
