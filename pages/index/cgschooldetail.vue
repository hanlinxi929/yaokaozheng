<template>
	<view>
		<view class="con flex justify-start width96 align-center">
			<image src="/static/bj1.png" class="bg1"></image>
			<view class="con_left">
				<image src="/static/img25.png"></image>
			</view>
			<view class="con_right margin-left-sm">
				<view class="right_top flex justify-between align-start">
					<view class="right_top_text">
						<text class="text_bt">澳门城市大学澳门城市大学澳门城市大学</text>
					</view>
					<view class="flex justify-end align-end mt_30"><text class="cuIcon-forward text-white"></text></view>
				</view>
				<view class="right_bottom flex justify-between mt_30">
					<view class="">
						
					</view>
					<view class="bj-yellow">
						<text :class="dianji==1?'cuIcon-favor text-white':'cuIcon-favorfill text-white'"></text>
						<text class="text-white p_left10 fot-28">收藏</text>
					</view>
				</view>
			</view>
		</view>
		<scroll-view class="nav width96 mt_10">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text_blue':''" v-for="(item,index) in detailetab"
					:key="index" @tap="tabSelect" :data-id="index">
					<text>{{item.name}}</text>
				</view>
			</view>
		</scroll-view>
		<view class="navheight width96">
			<scroll-view class="navheight1" scroll-y>
				<view class="miaosha e-width relative bg-white width96">
					<view class="nav_bt">
						<text class="mimitext">Registration requirements</text>
						<text class="zhengwen">报名条件</text>
						<view class="yuan"></view>
					</view>
					<view class="zhengwentext">
						<text>报名条件内容报名条件内容报名条件内容报名条件 内容报名条件内容报名条件内容报名条件内容报名 条件内容报名条件内容报名条件内容报</text>
					</view>
					<view class="nav_bt">
						<text class="mimitext">Registration time</text>
						<text class="zhengwen">报名时间</text>
						<view class="yuan"></view>
					</view>
					<view class="zhengwentext">
						<text>***年*月**日 — ****年*月**日</text>
					</view>
					<view class="nav_bt">
						<text class="mimitext">Exam time</text>
						<text class="zhengwen">考试时间</text>
						<view class="yuan"></view>
					</view>
					<view class="zhengwentext">
						<text>***年*月**日 — ****年*月**日</text>
					</view>
					<view class="nav_bt">
						<text class="mimitext">other expenses</text>
						<text class="zhengwen">其他费用</text>
						<view class="yuan"></view>
					</view>
					<view class="zhengwentext">
						<text>其他费用其他费用其他费用其他费用其他费用其他 费用其他费用其他费用其他费用其他费用其他费用 其他费用其他费用其他费用  费用其</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="btns width96 flex justify-between">
			<button class="round btn_left mt_20">立即报名</button>
			<button class="round btn_right mt_20" @click.stop="$api.toPage('index/bmxinxi')">立即报名</button>
		</view>
	</view>
</template>

<script>
	import {
		imgUrl
	} from "@/common/config.default.js";
	export default {
		data() {
			return {
				imgUrl: '',
				dianji: 0,
				TabCur:0,
				index:0,
				scrollLeft:0,
				detailetab:[
					{
						id:1,
						name: '报名条件'
					},
					{
						id:2,
						name: '报名时间'
					},
					{
						id:3,
						name: '考试时间'
					},
					{
						id:4,
						name: '其他费用'
					}
				]
			}
		},
		onLoad() {
			this.imgUrl = imgUrl
		},
		methods: {

			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: #f7f7f7;
	}
	.con {
		position: relative;
		height: 312rpx;
	}
	
	.zhengwentext{
		margin: 20rpx 5rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		color: #333333;
	}
	
	.miaosha{
		border-radius: 20rpx;
	}

	.bg1 {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 312rpx;
		z-index: -1;
	}

	.con_left {
		width: 258rpx;
		height: 228rpx;
		overflow: hidden;
		border-radius: 20rpx;
		margin-left: 25rpx;
	}
	.right_top_text{
		width: 60%;
	}

	.text_bt {
		display: block;
		font-size: 32rpx;
		color: #FFFFFF;
		padding-bottom: 15rpx;
		padding-top: 20rpx;
		width: 100%;
	}

	.text_span {
		display: block;
		font-size: 24rpx;
		color: #FFFFFF;
		line-height: 40rpx;
	}

	.bj-yellow {
		width: 130rpx;
		height: 51rpx;
		background: #F98110;
		border-radius: 26rpx;
		text-align: center;
		line-height: 51rpx;
		float: right;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.con_right {
		width: 55%;
	}
	.nav .cu-item{
		margin: 0;
		padding: 0;
	}
	.navheight1{
		height: 56vh;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 30rpx 0;
	}
	.cu-item{
		padding: 0;
		margin: 20rpx 0 0;
	}
	.text_blue{
		text{
			display: inline-block;
			background: #2D9BFB;
			color: #fff;
			font-size: 26rpx;
			height: 56rpx;
			width: 100%;
			border-radius: 28rpx;
			line-height: 56rpx;
		}
	}
	.btn_left{
		border: 1px solid #2D9DFB;
		width: 45%;
		color: #2D9DFB;
		font-size: 28rpx;
	}
	.btn_right{
		background: #2D9DFB;
		color: #FFFFFF;
		font-size: 28rpx;
		width: 45%;
	}
	.nav_bt{
		height: 63rpx;
		position: relative;
	}
	.mimitext{
		font-size: 18rpx;
		color: #999999;
		padding-left: 5rpx;
		display: block;
	}
	.zhengwen{
		font-size: 32rpx;
		color: #333333;
		position: absolute;
		left: 5rpx;
		bottom: 5rpx;
		z-index: 2;
	}
	.yuan{
		width: 28rpx;
		height: 28rpx;
		background: #9BD1FF;
		border-radius: 50%;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 1;
	}
</style>