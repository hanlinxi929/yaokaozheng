<template>
	<view>
		<!-- <view class="cu-bar search sysousuo width96 mt_10">
			<view class="cu-bar search width100">
				<view class="search-form round width100"><text class="cuIcon-search"></text><input
						:adjust-position="false" type="text" placeholder="请输入搜索关键词" confirm-type="search"
						:data-event-opts="[['focus',[['InputFocus',['$event']]]],['blur',[['InputBlur',['$event']]]]]"
						bindfocus="__e" bindblur="__e" /></view>
			</view>
		</view> -->
		<view class="mews bg-white">
			<view class="mews_items flex justify-between width96" v-for="(item,index) in zlList" :key="index"
				@click="$api.toPage('index/kscar?id='+item.id)">
				<text>{{item.deptName}}</text>
				<text class="cuIcon-right"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		imgUrl,
		baseUrl
	} from "@/common/config.default.js";
	import {
		getLearningkszl
	} from "@/api/index.js";
	export default {
		data() {
			return {
				imgUrl: '',
				baseUrl:'',
				zlList: []
			}
		},
		onLoad(option) {
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
			this.getzlList()
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
		methods: {
			async getzlList() {
				try {
					const obj = {
			
					};
					const {
						data
					} = await getLearningkszl(obj);
			
					if (data.code == 200) {
			
						if (data.data) {
							this.zlList = data.data
						}
					} else {
						console.log(data)
						// this.$api.msg(data.msg)
					}
				} catch (e) {
			
				}
			},
		}
	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}

	.sysousuo {
		margin-bottom: 20rpx;
	}

	.mews_items {
		font-size: 28rpx;
		line-height: 90rpx;
		border-bottom: 1prx solid #f7f7f7;
	}
</style>