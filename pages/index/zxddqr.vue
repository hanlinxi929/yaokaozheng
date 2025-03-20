<template>
	<!-- 购物列表 html -->
	<view class="listCount width96 bg-white">
		<view class="itemShow bg-white" v-for="item in carArr" :key="item.value" @click="downloadwj()">
			<view class="flex justify-start"> 
				<view class="listImg">
					<image :src="imgUrl+(item.downloadLink.split('.')[1]=='pdf' ? 'zlxq_PDF.png' : 'zlxq_DOC.png')" mode="aspectFill" style="width: 100%; height: 100%;"></image>
				</view>
				<view class="itemCont">
					<view class="itemName">
						{{item.deptName}}
					</view>
				</view>
			</view>
			<view class="flex justify-between width96 zlbot">
				<text class="zljg">资料价格：</text>
				<text class="text-red">￥{{item.preferentialPrice}}</text>
			</view>
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
				imgUrl:"",
				carArr: []
			}
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
		onLoad(option) {
			this.imgUrl = imgUrl
			this.carArr = JSON.parse(option.carArr)
			console.log("11111111")
			console.log(this.carArr)
		},
		methods: {
			downloadwj(){
					uni.downloadFile({
				   		url: '文件地址', //文件链接
				   		success: function(res) {
				   			console.log(res)
				   			//statusCode状态为200表示请求成功，tempFIlePath临时路径
				   			if (res.statusCode == 200) {
				   			console.log("ccc", res.tempFilePath);
				   				//保存到本地
				   				uni.saveFile({
				   					tempFilePath: res.tempFilePath,
				   					success: function(res) {
				   					//res.savedFilePath文件的保存路径
				   					//保存成功并打开文件
				   					uni.openDocument({
				   						filePath: res.savedFilePath,
				   						success: (res) => console.log('成功打开文档')})
				   					},
				   					fail() {
				   						console.log('打开失败')
				   					}
				   				})
				   			}
				   		},
				   		fail() {
				   			console.log('下载失败')
				   		}
					})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
	.listImg{
		height: 100rpx;
		width: 100rpx;
		margin: 0 10rpx;
	}
	.itemShow{
		margin-bottom: 20rpx;
	}
	.listCount{
		border-radius:20rpx;
		padding: 30rpx 20rpx 5rpx;
	}
	.zlbot{
		padding: 10rpx 0;
	}
</style>