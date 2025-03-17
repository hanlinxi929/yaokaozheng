<template>
	<view class="careMessage-list">
		<view class="cm-item flex" v-for="(item, index) in list" :key="index" @click.stop="handleClick(item)">
			<view class="info">
				<view class="title">{{item.title}}</view>
				<view class="date">{{item.createtime}}</view>
			</view>
			<view class="img">
				<image :src="item.img" mode="aspectFill" class="thumb"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['list'],
		filters: {
			dateFormat (time) {
				// new Date(end.replace(/-/g, "/")).getTime()
				let timestr = new Date(time);
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
				this.$api.toPage('careMessage/detail?id=' + item.id);
			}
		}
	}
</script>

<style lang="scss">
	.careMessage-list {
		box-sizing: border-box;
		padding: 0 24rpx;
		.cm-item {
			box-sizing: border-box;
			padding: 20rpx 0;
			border-bottom: 1rpx solid #F1F1F1;
		}
		.img {
			width: 226rpx;
			.thumb {
				width: 226rpx;
				height: 176rpx;
				border-radius: 12rpx;
			}
		}
		.info {
			flex: 1;
			overflow: hidden;
			padding-right: 20rpx;
			.title {
				@include multi-ellipsis(2);
				height: 92rpx;
				font-size: 30rpx;
				color: #000;
				line-height: 46rpx;
				font-weight: 400;
			}
			.date {
				margin-top: 48rpx;
				font-size: 26rpx;
				line-height: 36rpx;
				color: #999;
				font-weight: 400;
			}
		}
	}
</style>
