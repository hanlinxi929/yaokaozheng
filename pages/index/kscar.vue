<template>
	<view>
		<!-- 购物列表 html -->
		<view class="listCount width96">
			<checkbox-group @change="checkboxChange">
				<label class="listItem mt_20" v-for="item in carArr" :key="item.value">
					<view class="itemShow bg-white">
						<view class=" flex justify-start">
							<view class="checkBox">
								<checkbox class='round blue' style="transform:scale(0.6)" :value="item.deptName"
									:checked="item.checked" />
							</view>
							<view class="listImg">
								<image
									:src="imgUrl+(item.downloadLink.split('.')[1]=='pdf' ? 'zlxq_PDF.png' : 'zlxq_DOC.png')"
									mode="aspectFill" style="width: 100%; height: 100%;"></image>
							</view>
							<view class="itemCont">
								<view class="itemName">
									{{item.deptName}}
								</view>
								<view class="flex justify-between width100 zlbot">
									<text class="text-red">资料价格：</text>
									<text class="text-red">￥{{item.preferentialPrice}}</text>
								</view>
							</view>
							<view class="listImg" v-if="item.myBuy == 1">
								<image :src="imgUrl+'zlxq_xz.png'" mode="aspectFill" style="width: 100%; height: 100%;">
								</image>
							</view>
						</view>

					</view>
				</label>
			</checkbox-group>
		</view>
		<!-- 全选按钮 -->
		<view class="width100 ymbottom bg-white flex justify-between align-center">
			<checkbox-group @change="changeBook">
				<label>
					<checkbox class='round blue' style="transform:scale(0.6)" :checked="allFlag.checked"
						:value="allFlag.cb" /> 全选
				</label>
			</checkbox-group>
			<button class="btn_right" @tap="showModal" data-target="Modal">付费下载</button>
			<!-- <button class="btn_right" @click="$api.toPage('index/zxddqr?carArr='+JSON.stringify(xzArr))">付费下载</button> -->
		</view>

		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">付费</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<input type="text" data-target="Modal" placeholder="请输入推荐码" v-model="heji" />
				</view>
				<view class="bg-white flex justify-center">
					<view class="action text-qx" @tap="hideModal">关闭</view>
					<view class="action text-qr" @tap="submitPay()">立即支付</view>
				</view>
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
		getLearningkszlInfo,
		getZlAppPay
	} from "@/api/index.js";
	export default {
		data() {
			return {
				allFlag: {
					value: 'cb',
					checked: false
				},
				id: '',
				carArr: [],
				imgUrl: '',
				baseUrl: '',
				xzArr: [],
				modalName: "",
				heji: "",
				zfitem: "",
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
			var urls = '/pages/index/index?userid=' + userid
			// 此处的distSource为分享者的部分信息，需要传递给其他人
			// let distSource = uni.getStorageSync('distSource');
			return {
				title: '耀考证',
				path: urls,
				imageUrl: this.imgUrl + 'loginlogo.png'
			}
		},
		// 转发至朋友圈
		onShareTimeline(res) {
			var userid = uni.getStorageSync('userid')
			var that = this
			var urls = '/pages/index/index?userid=' + userid
			// 此处的distSource为分享者的部分信息，需要传递给其他人
			// let distSource = uni.getStorageSync('distSource');
			return {
				title: '耀考证',
				path: urls,
				imageUrl: this.imgUrl + 'loginlogo.png'
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target

				this.heji = 0;
				for (var i = 0; i < this.xzArr.length; i++) {
					console.log(this.heji)
					console.log(this.xzArr[i].preferentialPrice)

					this.heji = this.heji + this.xzArr[i].preferentialPrice
				}
				console.log(this.heji)
			},
			hideModal(e) {
				this.modalName = null
			},
			async getzlList() {
				try {
					const obj = {
						id: this.id
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
				console.log(e.detail.value.length)
				if (e.detail.value.length == 0) {
					this.carArr.map(item => this.$set(item, 'checked', false))
					this.$set(this.allFlag, 'checked', false)
					this.xzArr = [];
				} else {
					this.carArr.map(item => this.$set(item, 'checked', true))
					this.$set(this.allFlag, 'checked', true)
					this.xzArr = this.carArr;
				}
			},
			// list checkbox
			checkboxChange(e) {
				var items = this.carArr,
					values = e.detail.value;
					
				if(values.length == 0){
					this.xzArr = [];
				}
				for (var i = 0; i < items.length; i++) {
					const item = items[i]
					
					if (values.includes(item.deptName)) {
						this.$set(item, 'checked', true)
						if (!this.xzArr.includes(item)) {
							this.xzArr.push(item);
						}
					} else {
						this.$set(item, 'checked', false)
						if (this.xzArr.includes(item)) {
							this.xzArr = this.xzArr.filter(item1 => item1 == item);
						}
					}
				}
				//商品是否全部勾选，判断全选与否状态
				let allChecks = this.carArr.length == this.xzArr.length;
				// console.log(allChecks)
				allChecks ? this.$set(this.allFlag, 'checked', true) : this.$set(this.allFlag, 'checked', false)

			},
			async submitPay() {
				let dataArray = this.carArr
				let checkedIds = dataArray
					.filter(item => item.checked) // 筛选出选中的元素
					.map(item => item.id); // 提取id
				var that = this
				try {
					const obj = {
						ids: checkedIds
					};
					const {
						data
					} = await getZlAppPay(obj);

					if (data.code == 200) {
						this.zfitem = data.data
						this.wxPay()
						// uni.navigateTo({
						// 	url: '/pages/index/jmzf?pay_info=' + encodeURIComponent(JSON.stringify(data
						// 		.data)) + '&price=' + this.heji+'&img='+this.schooldetail.consultingCode
						// })
					} else {
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			wxPay() { //微信支付
				var that = this
				var zfitem = JSON.parse(decodeURIComponent(that.zfitem))
				console.log(zfitem)
				uni.requestPayment({
					appId: zfitem.appId,
					provider: 'wxpay',
					timeStamp: zfitem.timeStamp,
					nonceStr: zfitem.nonceStr,
					package: zfitem.package,
					signType: zfitem.signType,
					paySign: zfitem.paySign,
					success: (res) => {
						// 支付成功
						setTimeout(function() {
							uni.$emit('isshow', true)
							uni.navigateBack({
								delta: 1
							});
						}, 500);
					},
					fail: (err) => {
						console.log(err)
						// 支付失败
						uni.showToast({
							title: '支付失败',
							icon: 'none'
						});

					}
				});
			},
		}
	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}

	.text-qx {
		border: 1rpx solid #2D9DFB;
		color: #2D9DFB;
		width: 200rpx;
		height: 66rpx;
		line-height: 66rpx;
		text-align: center;
		margin: 20rpx 40rpx 30rpx;
		border-radius: 33rpx;
	}

	.text-qr {
		background-color: #2D9DFB;
		color: #fff;
		width: 200rpx;
		height: 66rpx;
		line-height: 66rpx;
		text-align: center;
		margin: 20rpx 40rpx 30rpx;
		border-radius: 33rpx;
	}

	.listImg {
		height: 100rpx;
		width: 90rpx;
		margin: 0 10rpx;
	}

	.itemShow {
		border-radius: 20rpx;
		padding: 30rpx 20rpx;
		margin-bottom: 20rpx;
	}

	.zljg {
		/* padding-left: 50rpx; */
	}

	.btn_right {
		background: #2D9DFB;
		color: #FFFFFF;
		font-size: 28rpx;
		width: 70%;
		margin: 0;
	}

	.ymbottom {
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 20rpx;
	}

	.zlbot {
		padding-top: 30rpx;
	}
</style>