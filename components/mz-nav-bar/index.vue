<template>
	<view class="nav-bar-fixed" :style="{'background': transparent ? transColor : color}">
		<view class="status-bar" :style="{'height': statusBar + 'px'}"></view>
		<view class="nav-bar">
			<view v-if="back">
				<image class="nav-back" :src="transparent && !transColor ? wBack : bBack" @click.stop="toBack" v-if="!firstPage"></image>
				<image class="nav-back" :src="transparent && !transColor ? wHome : bHome" @click.stop="toHome" v-else></image>
			</view>
			<view class="nav-custom">
				<slot></slot>
			</view>
			<view class="safe-btn" :class="{'has_back': back}" :style="{'width': saveBtnWid + 'px'}"></view>
		</view>
	</view>
</template>

<script>
	// statusBar  状态栏高度
	// saveBtnWid  标题栏右侧按钮宽度
	// transparent背景色透明 配合scrollTop一起使用变换标题栏颜色
	// back是否显示返回按钮
	// color标题栏颜色
	export default {
		props: {
			transparent: {
				type: Boolean,
				default: false
			},
			color: {
				type: String,
				default: '#fff'
			},
			back: {
				type: Boolean,
				default: false
			},
			scrollTop: {
				type: Number,
				default: function() {
					return 0;
				}
			}
		},
		data() {
			return {
				statusBar: 20,
				saveBtnWid: 0,
				transColor: '',
				firstPage: false,
				bBack: require('@/static/imgs/icon_back_black.png'),
				wBack: require('@/static/imgs/icon_back_white.png'),
				bHome: require('@/static/imgs/icon_home_black.png'),
				wHome: require('@/static/imgs/icon_home_white.png')
			}
		},
		watch: {
			scrollTop(val) {
				this.pageScroll({
					scrollTop: val
				})
			}
		},
		created() {
			this.statusBar = uni.getSystemInfoSync().statusBarHeight;
			// this.saveBtnWid = uni.getSystemInfoSync().screenWidth - uni.getMenuButtonBoundingClientRect().left;
			this.getPages()
		},
		methods: {
			toBack () {
				uni.navigateBack({
					delta: 1
				})
			},
			toHome () {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			getPages () {
				//获取所有页面
				let currentPages = getCurrentPages();
				let pageLen = currentPages.length;
				//判断是否是第一个页面，如果是有设置back为true的页面，将不显示返回箭头，而显示返回首页按钮
				if (pageLen == 1 && this.back) {
					this.firstPage = true;
				}
			},
			pageScroll(e) {
				if (this.transparent) {
					if (e.scrollTop && e.scrollTop > 0) {
						if (e.scrollTop > 100) {
							this.transColor = this.color
						} else {
							this.transColor = ''
						}
					}
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.nav-bar-fixed {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 990;
	transition: all ease 0.3s;
	.status-bar {
		width: 100%;
	}
	.nav-bar {
		width: 100%;
		height: 44px;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 20rpx;
		.nav-back {
			width: 32rpx;
			height: 32rpx;
			margin-right: 30rpx;
		}
		.nav-custom {
			flex: 1;
			height: 100%;
			display: flex;
			align-items: center;
		}
		.safe-btn {
			height: 32px;
			&.has_back {
				min-width: 32rpx;
				margin-right: 30rpx;
			}
		}
	}
}
</style>
