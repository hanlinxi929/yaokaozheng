<template>
	<view>
		<!-- 购物列表 html -->
		<view class="listCount width96">
			<checkbox-group @change="checkboxChange">
				<label class="listItem mt_20" v-for="item in carArr" :key="item.value">
					<view class="itemShow bg-white">
						<view class=" flex justify-start">
							<view class="checkBox">
								<checkbox  class='round blue' style="transform:scale(0.6)" :value="item.deptName" :checked="item.checked"/>
							</view>
							<view class="listImg">
								<image :src="item.src" mode="aspectFill" style="width: 100%; height: 100%;"></image>
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
				</label>
			</checkbox-group>
		</view>
		<!-- 全选按钮 -->
		<view class="width100 ymbottom bg-white flex justify-between align-center">
			<checkbox-group @change="changeBook">
				<label>
					<checkbox class='round blue' style="transform:scale(0.6)" :checked="allFlag.checked" :value="allFlag.cb" /> 全选
				</label>
			</checkbox-group>
			<button class="btn_right" @click="$api.toPage('index/zxddqr')">付费下载</button>
		</view>
	</view>
</template>

<script>
	import {
		imgUrl,
		baseUrl
	} from "@/common/config.default.js";
	import {
		getLearningkszlInfo
	} from "@/api/index.js";
	export default {
		data() {
			return {
				allFlag: {
					value: 'cb',
					checked: false
				},
				id:'',
				carArr: [
				],
				imgUrl:'',
				baseUrl:''
			}
		},
		onLoad(option) {
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
			this.id = option.id
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
						id:this.id
					};
					const {
						data
					} = await getLearningkszlInfo(obj);
			
					if (data.code == 200) {
			
						if (data.data) {
							this.carArr = data.data
						}
					} else {
						console.log(data)
						// this.$api.msg(data.msg)
					}
				} catch (e) {
			
				}
			},
			// 全选或者反选 checkbox
			changeBook(e) {
				if (e.detail.value.length == 0) {
					this.carArr.map(item => this.$set(item, 'checked', false))
					this.$set(this.allFlag, 'checked', false)
				} else {
					this.carArr.map(item => this.$set(item, 'checked', true))
					this.$set(this.allFlag, 'checked', true)
				}
			},
			// list checkbox
			checkboxChange(e) {
				var items = this.carArr,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.value)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
				//  商品是否全部勾选，判断全选与否状态
				var offCarArr = []
				this.carArr.forEach(item => item.whether == true ? offCarArr.push(item) : '')
				let allChecks = offCarArr.every(item => item.checked == true)
				allChecks ? this.$set(this.allFlag, 'checked', true) : this.$set(this.allFlag, 'checked', false)
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
		border-radius:20rpx;
		padding: 30rpx 20rpx;
		margin-bottom: 20rpx;
	}
	.zljg{
		padding-left: 50rpx;
	}
	.btn_right {
		background: #2D9DFB;
		color: #FFFFFF;
		font-size: 28rpx;
		width: 70%;
		margin: 0;
	}
	.ymbottom{
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 20rpx;
	}
	.zlbot{
		padding-top: 10rpx;
	}
</style>