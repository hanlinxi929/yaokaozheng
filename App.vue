<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 版本更新
			if (wx.canIUse('getUpdateManager')) {
				const updateManager = wx.getUpdateManager()
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					console.log('是否需要更新：', res.hasUpdate);
					if (res.hasUpdate) {
						updateManager.onUpdateReady(function() {
							wx.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启应用？',
								success: function(res) {
									if (res.confirm) {
										updateManager.applyUpdate()
									}
								}
							})
						})
						updateManager.onUpdateFailed(function() {
							wx.showModal({
								title: '已经有新版本了哟~',
								content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
							})
						})
					}
				})
			} else {
				wx.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				})
			}
			const obj = wx.getEnterOptionsSync();
			if (obj.scene == 1047 || obj.scene == 1048 || obj.scene == 1049) {
				if (obj.query.scene) {
					let productId = decodeURIComponent(obj.query.scene);
					if (process.env.NODE_ENV === "development") {
						console.log("开发环境：" + obj.query.scene);
						if (productId != undefined) {
							this.$api.redirectTo(`product/index?${productId}`)
						}
					} else {
						console.log("生产环境：" + obj.query.scene);
						if (productId != undefined) {
							this.$api.redirectTo(`product/index?id=${productId}`)
						}
					}
				}
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "colorui/main.css";
	@import "colorui/icon.css";
	// multi-ellipsis
	/*每个页面公共css */
	@import "/wxcomponents/vant-weapp/common/index.wxss";

	/* 基本样式初始化 */
	image {
		display: block;
		width: 100%;
		// height: 100%;
	}
	
	.width96{
		width: 95%;
		margin: 0 auto;
	}
	
	.width100{
		width: 100%;
		margin: 0 auto;
	}

	view {
		box-sizing: border-box;
		// outline: 1px solid #ff0000;
	}

	button.clear {
		padding: 0;
		margin: 0;
		background: transparent;
		border: none;
		border-radius: 0;
		outline: none;
	}

	button.clear::after {
		display: none;
	}
	
	.heightbt{
		position: absolute;
		top: 80rpx;
		left: 3%;
		z-index: 11;
		font-size: 32rpx;
		color: #333;
	}
	
	.headerbj {
		width: 100%;
		position: absolute;
		z-index: -1;
	}

	.swiper-container {
		height: 100%;
	}

	// 输入框placeholder样式
	.pl-holder {
		color: #C7C7C7;
	}

	/* 文字单行省略 */
	.text-ellipsis {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* 单像素边框 顶部边框和底部边框 */
	.border-bottom,
	.border-top {
		position: relative;
	}
	
	button::after {
		border: none !important;
	}

	.border-bottom::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1px;
		background: $border-color;
		transform-origin: 50% 100%;
		transform: scaleY(.5);
	}

	.border-top::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 1px;
		background: $border-color;
		transform-origin: 50% 100%;
		transform: scaleY(.5);
	}
	
	.quesheng{
		text-align: center;
		image{
			width: 300rpx;
			height: 300rpx;
			margin: 100rpx auto 50rpx;
		}
		text{
			color: #B3B9C3;
		}
	}

	.border-round {
		border-radius: 50%;
	}

	.border-bottom-none {
		border-bottom: none !important;
	}

	.am {
		-webkit-transition: all 0.3s linear 0s;
		-moz-transition: all 0.3s linear 0s;
		transition: all 0.3s linear 0s;
	}

	.am-ease {
		-webkit-transition: all 0.2s ease 0s;
		-moz-transition: all 0.2s ease 0s;
		transition: all 0.2s ease 0s;
	}

	/* 布局相关 */
	/* flex布局 */
	.flex {
		display: flex;
	}

	.inline-flex {
		display: inline-flex;
	}

	/* 自适应剩余空间 */
	.flex-width {
		flex: 1;
		min-width: 0;
	}

	.flex-height {
		flex: 1;
		min-height: 0;
	}

	/* 自动换行 */
	.flex-wrap {
		flex-wrap: wrap;
	}

	/* 让元素沿着容器主轴的中心点和交叉轴中心对齐 */
	.flex-center {
		align-items: center;
		justify-content: center;
	}

	/* 沿垂直方向放置 flex 子项 */
	.flex-col {
		flex-direction: column;
	}
	
	// 自适应剩余空间
	.flex-item {
		flex: 1;
		min-width: 0;
	}

	/* 两侧贴边布局 */
	.justify-between {
		justify-content: space-between;
	}

	/* 让元素沿着容器主轴的中心点对齐 */
	.justify-center {
		justify-content: center;
	}

	/* 让元素沿着容器主轴排列，并使每个元素两侧的距离相等。 */
	.justify-around {
		justify-content: space-around;
	}

	/* 让元素沿着容器主轴的结束点对齐 */
	.justify-end {
		justify-content: flex-end;
	}


	/* 将元素沿着容器交叉轴的起点对齐 */
	.items-start {
		align-items: flex-start;
	}

	/* 将元素沿着容器交叉轴的终点对齐 */
	.items-end {
		align-items: flex-end;
	}

	/* 沿着容器的交叉轴中心对齐元素 */
	.items-center {
		align-items: center;
	}

	/* flex 子项外边距 */
	.mt-a {
		margin-top: auto;
	}

	.ml-a {
		margin-left: auto;
	}

	/* grid布局 */
	.grid {
		display: grid;
	}

	.grid-cols-1 {
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}

	.grid-cols-2 {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.grid-cols-3 {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.grid-cols-4 {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}

	.grid-cols-5 {
		grid-template-columns: repeat(5, minmax(0, 1fr));
	}

	.grid-cols-6 {
		grid-template-columns: repeat(6, minmax(0, 1fr));
	}

	.grid-cols-7 {
		grid-template-columns: repeat(7, minmax(0, 1fr));
	}

	.col-span-1 {
		grid-column: span 1 / span 1;
	}

	.col-span-2 {
		grid-column: span 2 / span 2;
	}

	.col-span-3 {
		grid-column: span 3 / span 3;
	}

	.col-span-4 {
		grid-column: span 4 / span 4;
	}

	.col-span-5 {
		grid-column: span 5 / span 5;
	}

	.col-span-6 {
		grid-column: span 6 / span 6;
	}

	.col-span-7 {
		grid-column: span 7 / span 7;
	}

	/* 宽高 100% */
	.w-full {
		width: 100%;
	}

	.h-full {
		height: 100%;
	}

	/* position 定位 */
	.relative {
		position: relative;
	}

	.absolute {
		position: absolute;
	}

	/* top-bar */
	.top-bar {
		width: 100%;
		background: #fff;

		/* 状态栏占位 */
		.status-bar {
			width: 100%;
		}

		.search-bar {
			width: 100%;
			z-index: 99;
			height: 88rpx;
			padding-left: 32rpx;

			.search-group {
				width: 100%;
				height: 64rpx;
				box-sizing: border-box;
				padding: 0 32rpx;
				border-radius: 32rpx;
				background: rgba(0, 0, 0, 0.08);
				font-size: 24rpx;
				line-height: 32rpx;
				color: #C7C9CC;
				font-weight: 400;

				.icon {
					margin-right: 16rpx;
					width: 32rpx;
				}

				.input {
					flex: 1;
					color: #333;
				}

				.ph {
					color: #7C7E80;
				}
			}
		}
	}
	
	.topheight{
		height: 140rpx;
		line-height: 140rpx;
		padding: 30rpx;
		z-index: 111;
		font-size: 32rpx;
		position: fixed;
		top:0;
		left: 0;
		padding-top: 30rpx;
	}

	/* 内边距 */
	.p-32 {
		padding: 32rpx;
	}

	.modalBox {
		position: relative;
		border-radius: 20rpx 20rpx 0 0;
		padding-top: 34rpx;
		background: #fff;

		.icon-close {
			position: absolute;
			top: 44rpx;
			right: 24rpx;
			width: 26rpx;
			height: 26rpx;
		}

		.modal-head {
			height: 44rpx;

			.title {
				text-align: center;
				font-size: 32rpx;
				color: #000;
				line-height: 44rpx;
			}
		}

		.modal-content {
			padding: 10rpx 0 0;
		}

		.modal-foot {
			padding: 42rpx 0;
			.btn {
				margin: 0 auto;
				width: 568rpx;
				height: 88rpx;
				border-radius: 44rpx;
				background: $main-color;
				text-align: center;
				line-height: 88rpx;
				font-size: 30rpx;
				color: #fff;
			}
		}
	}

	.form-groups {
		.form-group {
			width: 100%;
			height: auto;
			border-bottom: 1rpx solid $border-color;
			background: #fff;
			&.form-group-noBorder {
				border-bottom: none;
			}
		
			.form-label {
				width: 140rpx;
				height: 100rpx;
				font-size: 28rpx;
				line-height: 100rpx;
				color: #000;
			}
		
			.form-input {
				flex: 1;
				height: auto;
				overflow: hidden;
		
				.text,
				.input {
					height: 100rpx;
					box-sizing: border-box;
					padding-left: 20rpx;
					line-height: 100rpx;
					font-size: 28rpx;
					color: #000;
				}
		
				.ph {
					color: #C7C7C7;
				}
			}
			.form-other {
				flex: 1;
				height: auto;
				overflow: hidden;
			}
			.form-btn {
				margin-left: 24rpx;
				width: auto;
			}
		}
	}
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 9;
		width: 100%;
		height: 112rpx;
		box-sizing: border-box;
		padding: 12rpx 24rpx;
		/* #ifndef APP-NVUE */
		height: calc(constant(safe-area-inset-bottom) + 112rpx);
		height: calc(env(safe-area-inset-bottom) + 112rpx);
		padding-bottom: calc(constant(safe-area-inset-bottom) + 12rpx);
		padding-bottom: calc(env(safe-area-inset-bottom) + 12rpx);
		/* #endif */
		background: #fff;
		.btn {
			width: 100%;
			height: 88rpx;
			border: none;
			border-radius: 44rpx;
			background: $main-color;
			text-align: center;
			line-height: 88rpx;
			font-size: 30rpx;
			color: #fff;
			&:after {
				display: none;
			}
		}
	}
	// 常用的
	.biaoti {
		font-size: 24rpx;
		color: #202020;
		font-size: 32rpx;
		line-height: 30rpx;
		display: flex;
		align-items: center;
		margin: 10rpx 0 10rpx;
	}
	.zuotubiao {
		width: 10rpx;
		height: 33rpx;
		background: linear-gradient(0deg, #2B96FB 0%, #44D9FF 100%);
		display: inline-block;
		border-radius: 5rpx;
		margin: 0 20rpx;
	}
	.car-card {
		width: 100%;
		height: 134rpx;
		box-sizing: border-box;
		padding: 26rpx;
		border-radius: 12rpx;
		background: #fff;
		box-shadow: 0 8rpx 10rpx 0 rgba(235, 235, 235, 0.5);
	
		.logo {
			width: 56rpx;
			height: 56rpx;
			box-sizing: border-box;
			border-radius: 8rpx;
			// border: 1rpx solid #EFEFEF;
			box-shadow: 0 8rpx 10rpx 0 rgba(235, 235, 235, 0.5);
		}
	
		.right {
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;
			padding-left: 14rpx;
		}
	
		.info {
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;
			padding-right: 14rpx;
	
			.name {
				font-size: 28rpx;
				color: #000;
				line-height: 40rpx;
			}
	
			.btm {
				margin-top: 14rpx;
			}
	
			.status {
				width: auto;
				height: 28rpx;
				box-sizing: border-box;
				border: 1rpx solid #FA6400;
				border-radius: 4rpx;
				padding: 0 8rpx;
				font-size: 20rpx;
				line-height: 26rpx;
				color: #fa6400;
				font-weight: 400;
			}
	
			.type {
				flex: 1;
				overflow: hidden;
				box-sizing: border-box;
				padding-left: 12rpx;
				font-size: 20rpx;
				color: #444;
				line-height: 28rpx;
			}
		}
	
		.btn {
			font-size: 28rpx;
			color: $main-color;
		}
		
		.icon {
			.icon-check {
				width: 36rpx;
				height: 36rpx;
			}
		}
	}
	.car-card--no {
		width: 100%;
		height: 134rpx;
		box-sizing: border-box;
		padding: 0 24rpx 0 32rpx;
		border-radius: 12rpx;
		background: #fff;
		box-shadow: 0 8rpx 10rpx 0 rgba(235, 235, 235, 0.5);
		.logo {
			width: 112rpx;
			height: 90rpx;
		}
		.info {
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;
			padding: 0 6rpx;
			.name {
				font-size: 26rpx;
				line-height: 36rpx;
				color: #000;
				font-weight: 400;
			}
			.tip {
				margin-top: 4rpx;
				font-size: 20rpx;
				line-height: 28rpx;
				color: #999;
				font-weight: 400;
			}
		}
		.btn {
			width: 152rpx;
			height: 54rpx;
			box-sizing: border-box;
			border: 1rpx solid $main-color;
			border-radius: 27rpx;
			font-size: 22rpx;
			color: $main-color;
			font-weight: 400;
		}
	}
	.carModal {
		.car-list {
			height: 500rpx;
			box-sizing: border-box;
			padding: 0 24rpx;
		}
		.car-card {
			height: auto;
			border-bottom: 1rpx solid $border-color;
			padding-left: 0;
			padding-right: 0;
			border-radius: 0;
			box-shadow: none;
		}
	}
	.border-bottom{
		border-bottom: 1rpx solid #C7C7C7;
	}
	.border-left{
		border-left: 1rpx solid #C7C7C7;
	}
	.border-right{
		border-right: 1rpx solid #C7C7C7;
	}
	.border-top{
		border-top: 1rpx solid #C7C7C7;
	}
	.p_left10{
		padding-left: 10rpx;
	}
	.p_left20{
		padding-left: 20rpx;
	}
	.mt_5{
		margin-top: 5rpx;
	}
	.mt_10{
		margin-top: 10rpx;
	}
	.mt_20{
		margin-top: 20rpx;
	}
	.mt_30{
		margin-top: 30rpx;
	}
	.pb_30{
		padding-bottom: 30rpx;
	}
	.fot-24{
		font-size: 24rpx;
	}
	.fot-28{
		font-size: 28rpx;
	}
	.fot-30{
		font-size: 30rpx;
	}
	.fot-32{
		font-size: 32rpx;
	}
	.fot-36{
		font-size: 36rpx;
	}
</style>
