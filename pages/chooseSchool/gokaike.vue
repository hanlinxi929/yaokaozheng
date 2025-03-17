<template>
	<view class="bg-white width96 conbox">
		<form>
			<view class="biaoti mt_20">
				<view class="zuotubiao"></view>
				<text>开课基本信息</text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title"><text class="text-red">*</text>姓名:</view>
				<input placeholder="请输入姓名" placeholder-class="inppl" v-model="username" maxlength="15"
					@blur="blur('username')"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="text-red">*</text>手机号码：</view>
				<input placeholder="请输入" name="input" v-model="phone"></input>
			</view>
			<view>
				<view class="cu-form-group" v-for="(item,index) in onexl" :key="index">
					<view class="title"><text class="text-red">*</text>{{index==0?'网课名称':'网课分类'+index}}：</view>
					<picker @change="PickerChange($event,item,index)" v-model="item.value" :range="item.list"
						:range-key="'deptName'">
						<view class="picker">
							{{item.list[item.value].deptName||'请选择'}}
						</view>
					</picker>
				</view>
			</view>
		</form>
		<view class="btn width96 margin-bottom">
			<!-- <button  @tap="showModal" data-target="Modal">立即支付</button> -->
			<button @tap="submit()">立即支付</button>
		</view>
		<view class="jgs flex justify-start align-center">
			<text>优惠价：{{jg?jg:'0.00'}}</text>
			<text class="p_left20">官网价格：{{gwjg?gwjg:'0.00'}}</text>
		</view>
		<!-- <view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">确认支付</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<text>请确认是否支付？</text>
				</view>
				<view class="bg-white flex justify-center">
					<view class="action text-qx" @tap="hideModal">取消</view>
					<view class="action text-qr" @tap="submit()">确定</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import {
		imgUrl,
		baseUrl
	} from "@/common/config.default.js";
	import {
		getWanggetInfo,
		getWangldlist,
		getWangAdd,
		getMiniAppPay
	} from "@/api/index.js";
	export default {

		data() {
			return {
				modalName: "",
				onexl: [],
				oid: "",
				odeptName: "",
				indexwk: -1, //网课名称
				indexwkid: '', //网课名称
				wkname: [],
				indexbj: -1, //班级类型
				indexbjid: '', //班级类型
				bjleixing: [],
				indexzg: -1, //资格证书
				indexzgid: '', //资格证书
				zgbox: [],
				indexkm: -1, //具体科目
				indexkmid: '', //具体科目
				jtkemu: [],
				indexid: '',
				indexs: '',
				lastid: '',
				lasttext: '',
				baseUrl: '',
				username: "",
				phone: '',
				rules: {
					username: [{
						rule: /^.{2,18}$/,
						message: '请输入姓名',
					}],
					phone: [{
						rule: /^1[0-9]{10,10}$/,
						message: '请输入正确的手机号',
					}]
				},
				noClick: true,
				oneId: "",
				focusclass: {
					username: false,
					phone: false
				},
				pay_info: '',
				wkid: '',
				jg: '',
				gwjg: ''
			};
		},
		onLoad(option) {
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
			this.oid = option.oid
			this.jg = option.preferentialPrice
			this.gwjg = option.officialWebsitePrice
		},
		onShow() {
			this.gokaikes()
			this.getWangldlists(this.oid)
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
			},
			PickerChange(e, item, index) {
				if (index + 1 !== this.onexl.length) {
					this.onexl.splice(index + 1)
				}
				this.onexl[index].value = e.detail.value
				this.indexs = item.list[item.value].deptName
				this.indexid = item.list[item.value].id
				this.lastid = item.list[item.value].id
				this.lasttext = item.list[item.value].deptName
				this.getWangldlists(this.indexid)
			},
			async gokaikes() {
				var that = this
				try {
					const obj = {

					};
					const {
						data
					} = await getWanggetInfo(obj);

					if (data.code == 200) {
						// this.$api.msg(data.msg)
						if (data.data) {
							this.username = data.data.name
							this.phone = data.data.tel
							this.wkid = data.data.id
						}

					} else {
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async getWangldlists(fo) {
				var that = this
				try {
					const obj = {
						id: fo,
						type: 2
					};
					const {
						data
					} = await getWangldlist(obj);
					if (data.code == 200) {
						if (data.data) {
							this.onexl.push({
								value: '',
								list: data.data,
							})
							this.lastid = ''
							this.lasttext = ''
						}

						// this.$api.msg(data.msg)
					} else {
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			//提交
			submit() {
				let that = this;
				if (!that.validate('username')) return;
				if (!that.validate('phone')) return;
				if (!that.lastid) {
					uni.showToast({
						title: '请选择网课分类',
						icon: 'none'
					})
					return
				}
				if (that.noClick) {
					// 第一次点击
					that.noClick = false;
					setTimeout(() => {
						that.noClick = true;
					}, 2000)
					that.gosubmit()

				} else {
					//  这里是重复点击的判断
					this.$api.msg("已提交请勿重复点击")

				}
			},
			async gosubmit() {
				var that = this
				try {
					const obj = {
						id: that.wkid,
						name: that.username,
						tel: that.phone,
						subjectId: that.lastid, //具体科目
						subject: that.lasttext,
						actualPayment: this.jg
					};
					const {
						data
					} = await getWangAdd(obj);
					console.log(data)
					if (data.code == 200) {
						this.$api.msg('提交成功');
						this.submitPay(data.data)
					} else {
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async submitPay(ddid) {
				var that = this
				try {
					const obj = {
						id: ddid
					};
					const {
						data
					} = await getMiniAppPay(obj);

					if (data.code == 200) {
						this.zfitem = data.data

						this.pay_info = data.data
						this.wxPay()
					} else {
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			wxPay() { //微信支付
				var that = this
				var zfitem = JSON.parse(decodeURIComponent(that.pay_info))
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
			//验证
			validate(key) {
				let s = true
				this.rules[key].forEach(v => {
					if (!v.rule.test(this[key])) {
						uni.showToast({
							title: v.message,
							icon: 'none'
						})
						s = false
						return false
					}
				})
				return s
			},
			blur(key) {
				this.focusclass[key] = false
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f7f7f7;
	}

	.conbox {
		border-radius: 20rpx;
		margin: 20rpx auto;
		padding: 20rpx 0;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.cu-form-group {
		justify-content: start !important;

		input {
			text-align: right;
		}
	}

	.jgs {
		position: absolute;
		bottom: 30rpx;
		left: 6%;
	}

	radio {
		transform: scale(0.7);
	}

	.text-qx {
		border: 1rpx solid #2D9DFB;
		color: #2D9DFB;
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		margin: 20rpx 40rpx 30rpx;
	}

	.text-qr {
		background-color: #2D9DFB;
		color: #fff;
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		margin: 20rpx 40rpx 30rpx;
	}


	.radtext {
		padding: 0 20rpx;
	}

	.text-red {
		padding-right: 10rpx;
	}

	.cu-form-group+.cu-form-group {
		border: none !important;
	}

	.sfzbox {
		width: 100%;
	}

	.sfz {
		width: 48%;
		height: 212rpx;
		overflow: hidden;
		position: relative;
	}

	.dengji {
		width: 171rpx;
		height: 243rpx;
	}

	.dengjizp {
		width: 100%;
		height: 243rpx;
		overflow: hidden;
		position: relative;
	}

	.close {
		position: absolute;
		top: 0;
		right: 0;
	}

	.iconup {
		color: #fff;
		background-color: #2D9DFB;
		width: 42rpx;
		border-radius: 50%;
		display: block;
		font-size: 37rpx;
		margin: 10rpx auto;
		transform: rotate(180deg);
		margin-bottom: 20rpx;
		padding: 5rpx;
	}

	.dungwei {
		position: absolute;
		top: 70rpx;
		left: 0rpx;
		width: 100%;
		height: 243rpx;
		text-align: center;
	}

	.btn {
		padding-bottom: 1;
	}

	.btn button {
		background: #2D9DFB;
		color: #FFFFFF;
		font-size: 28rpx;
		margin: 60rpx 0 30rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
	}
</style>