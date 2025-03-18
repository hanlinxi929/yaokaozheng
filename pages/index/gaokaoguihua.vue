<template>
	<view>
		<form>
			<view class="bg-white width96 conbox">
				<view class="biaoti mt_20">
					<view class="zuotubiao"></view>
					<text>高考基本信息</text>
				</view>
				<!-- #ifndef H5 || APP-PLUS || MP-ALIPAY -->
				<view class="cu-form-group border-bottom-none">
					<view class="title"><text class="text-red">*</text>高考省份:</view>
					<picker class="width100" @change="gkPickerChange" :value="gkindex" :range="cityList"
						:range-key="'nodeName'">
						<view class="picker width100">
							{{gkindex>-1?cityList[gkindex].nodeName:'请选择'}}
						</view>
					</picker>
				</view>
				<!-- #endif -->
				<view class="cu-form-group border-bottom-none">
					<view class="title"><text class="text-red">*</text>选考科目：</view>

				</view>
				<view class="xk">
					<view v-for="(item,index) in checkbox" class="padding-xs xkitems" :key="index">
						<text class="kemus" :class="item.checked?'bg-blues':'line-blues'" @tap="ChooseCheckbox"
							:data-value="item.value"> {{item.name}}
						</text>
					</view>
				</view>
				<view class="cu-form-group border-bottom-none">
					<view class="title"><text class="text-red">*</text>高考总分：</view>
					<input placeholder="请输入" name="input" v-model="gkzf"></input>
				</view>
				<view class="cu-form-group border-bottom-none">
					<view class="title"><text class="text-red">*</text>位次：</view>
					<input placeholder="请输入" name="input" v-model="wc"></input>
				</view>
			</view>
			<view class="bg-white width96 conbox">
				<view class="biaoti mt_20">
					<view class="zuotubiao"></view>
					<text>个人基本信息</text>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>姓名：</view>
					<input placeholder="请输入" name="input" v-model="name"></input>
				</view>
				<radio-group class="block" @change="RadioChange">
					<!-- #ifndef MP-ALIPAY -->
					<view class="cu-form-group">
						<view class="title"><text class="text-red">*</text>性别：</view>
						<view>
							<label>
								<radio class='blue radio' :class="radio=='C'?'checked':''"
									:checked="radio=='C'?true:false" value="C"></radio>
								<text class="radtext">男</text>

							</label>
							<label>
								<radio class='blue radio' :class="radio=='D'?'checked':''"
									:checked="radio=='D'?true:false" value="D"></radio>
								<text class="radtext">女</text>
							</label>
						</view>
					</view>
					<!-- #endif -->
				</radio-group>
				<view class="cu-form-group border-bottom-none">
					<view class="title"><text class="text-red">*</text>身高：</view>
					<input placeholder="请输入" name="input" v-model="shengao"></input>
				</view>
				<!-- <view class="cu-form-group border-bottom-none">
					<view class="title"><text class="text-red">*</text>职业方向：</view>
					<picker @change="PickerChange" :value="index" :range="picker">
						<view class="picker">
							{{index>-1?picker[index]:'请选择'}}
						</view>
					</picker>
				</view> -->
				<view class="cu-form-group border-bottom-none" v-for="(item,index) in onexl" :key="index">
					<view class="title"><text class="text-red">*</text>{{fwindex==0?'服务班类型':'类型'+index}}：</view>
					<picker @change="PickerChangefw($event,item,index)" v-model="item.value" :range="item.list"
						:range-key="'deptName'">
						<view class="picker">
							{{item.list[item.value].deptName||'请选择'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>单科成绩：</view>
					<input placeholder="请输入" name="input" v-model="dkcj"></input>
				</view>
				<view class="cu-bar bg-white margin-top">
					<view class="action">
						<text class="text-red">*</text>成绩单截图
					</view>
				</view>
				<view class="cu-form-group border-bottom-none">
					<view class="flex justify-between dengji">
						<view class="bg-img dengjizp" @tap="ChooseImage">
							<image class="zhengmian" v-if="!imgList" :src="imgUrl+'img44.png'" mode="aspectFill">
							</image>
							<view class="dungwei" v-if="!imgList">
								<text class="cuIcon-refresharrow iconup"></text>
								<text class="fot-28">点击上传</text>
							</view>
							<image v-else :src="baseUrl+imgList" mode="aspectFill"></image>
							<view v-if="imgList" class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="heightbt00"></view>
		</form>
		<view class="width100 ymbottom bg-white flex justify-between align-center">
			<view>
				<text>合计：</text>
				<text class="text-red">￥{{jg}}</text>
			</view>
			<!-- <button class="btn_right" @click="$api.toPage('index/zxddqr')">咨询</button> -->
			<button class="btn_right" @click="gopay()">立即支付</button>
		</view>
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">确认支付</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<text>是否支付订单？</text>
				</view>
				<view class="abtns flex justify-between">
					<button @click="hideModal()" class="text-qx">取消</button>
					<button @click="gosubmit()" class="text-qr">立即支付</button>
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
		getCityList,
		getXlType,
		getVoluntaryTestadd,
		getzgUpReferralCode
	} from "@/api/index.js";
	export default {

		data() {
			return {
				fwindex: 0,
				tuijianmas: false,
				tuijianma: '',
				resultString: '',
				cityName: '',
				cityid: '',
				index: -1,
				gkindex: -1,
				picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
				region: ['广东省'],
				radio: 'C',
				imgList: '',
				modalName: null,
				imgUrl: '',
				baseUrl: '',
				name: "",
				gkzf: '',
				wc: '',
				dkcj: '',
				shengao: "",
				lastid: '',
				lasttext: '',
				rules: {
					gkzf: [{
						rule: /^.{2,18}$/,
						message: '请输入高考总分',
					}],
					wc: [{
						rule: /^.{1,18}$/,
						message: '请输入位次',
					}],
					name: [{
						rule: /^.{2,18}$/,
						message: '请输入姓名',
					}],
					shengao: [{
						rule: /^.{2,18}$/,
						message: '请输入身高',
					}],
					dkcj: [{
						rule: /^.{2,18}$/,
						message: '请输入单科成绩',
					}]
				},
				noClick: true,
				indexid: "",
				indexs: '',
				zfitem:'',
				focusclass: {
					username: false
				},
				cityList: [],
				CustomBar: this.CustomBar,
				onexl: [],
				sid: '',
				jg: 0,
				checkbox: [{
					value: 0,
					name: '物理',
					checked: false,
					hot: false,
				}, {
					value: 1,
					name: '化学',
					checked: false,
					hot: false,
				}, {
					value: 2,
					name: '生物',
					checked: false,
					hot: true,
				}, {
					value: 3,
					name: '历史',
					checked: false,
					hot: true,
				}, {
					value: 4,
					name: '政治',
					checked: false,
					hot: false,
				}, {
					value: 5,
					name: '地理',
					checked: false,
					hot: false,
				}]
			};
		},
		onLoad(option) {
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
			// this.jg = option.jg
			this.sid = option.sid
			console.log(option.jg)
			this.getCityLists()
			this.getSxlistXuezhi(option.sid)
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
			// 取消推荐
			qxGetUpReferralCode() {
				this.tuijianma = ''
				this.tuijianmas = false
				this.goGetUpReferralCode()
			},
			async goGetUpReferralCode() {
				var that = this
				try {
					const obj = {
						id: that.sid,
						referralCode: that.tuijianma ? that.tuijianma : '0'
					};
					const {
						data
					} = await getzgUpReferralCode(obj);

					if (data.code == 200) {
						if (data.data) {
							this.yhje = data.data.referralPrice
							this.heji = data.data.actualPayment
							this.tuijianma = data.data.referralCode

							if (this.tuijianma) {
								this.tuijianmas = true
							} else {
								this.tuijianmas = false
							}
							this.hideModal()
						}
					} else {
						this.tuijianmas = false
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async getSxlistXuezhi(id) {
				try {
					const obj = {
						id: id,
						type: 0
					};
					const {
						data
					} = await getXlType(obj);

					if (data.code == 200) {
						if (data.data.length) {
							this.onexl.push({
								value: '',
								list: data.data,
							})
							this.lastid = ''
							this.lasttext = ''
						} else {
							this.jg = data.data
						}
						// this.onexl.xz = data.dataA

					} else {
						// this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			showModal(e) {
				this.modalName = 'Modal'
			},
			hideModal(e) {
				this.modalName = null
			},
			ChooseCheckbox(e) {
				let items = this.checkbox;
				let values = e.currentTarget.dataset.value;
				let checkedItems = this.checkbox.filter(v => v.checked);
				if (checkedItems.length < 3) {
					for (let i = 0, lenI = items.length; i < lenI; ++i) {
						if (items[i].value == values) {
							items[i].checked = !items[i].checked;
							break
						}
					}
				} else {
					this.$api.msg('最多只可选择3个科目')
				}
			},
			gkPickerChange(e) {
				this.gkindex = e.detail.value
				this.cityName = this.cityList[e.detail.value].nodeName
				this.cityid = this.cityList[e.detail.value].nodeCode
				console.log(this.cityName)
			},
			wcPickerChange(e) {
				this.wcindex = e.detail.value
			},
			gopay() {
				//获取选择的科目，以，隔开
				let checkedItems = this.checkbox.filter(v => v.checked);
				let checkedNames = checkedItems.map(v => v.name);
				let resultString = checkedNames.join(',');
				if (checkedItems.length < 3) {
					this.$api.msg('请至少选择3个科目')
					return
				}
				this.resultString = resultString
				console.log(resultString)
				this.submit()
			},
			async gosubmit() {
				try {
					const obj = {
						cityId: this.cityid,
						cityName: this.cityName,
						subject: this.resultString,
						fraction: this.gkzf,
						place: this.wc,
						name: this.name,
						sex: this.radio == 'C' ? '男' : '女',
						height: this.shengao,
						careerPath: '',
						singleSubjectScore: this.dkcj,
						transcript: this.imgList,
						referralCode: this.tuijianma ? this.tuijianma : ''
					};
					const {
						data
					} = await getVoluntaryTestadd(obj);

					if (data.code == 200) {
						// this.$api.msg('提交成功');
						// setTimeout(() => {
						// 	uni.navigateBack()
						// }, 2000)
						this.zfitem = data.data
						this.wxPay()
					} else {
						console.log(data)
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
							uni.$emit('isshow',true)
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
			async getCityLists() {
				try {
					const obj = {

					};
					const {
						data
					} = await getCityList(obj);

					if (data.code == 200) {

						if (data.data) {
							this.cityList = data.data
						}
					} else {
						console.log(data)
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						let avatarfile = res.tempFilePaths[0];
						uni.uploadFile({
							url: baseUrl + `/hs/api/upload`,
							filePath: avatarfile,
							name: 'file',
							formData: {
								'token': uni.getStorageSync('token')
							},
							success: (res) => {
								let data = JSON.parse(res.data);
								if (data.code == 200) {
									this.imgList = data.fileName
								} else {
									uni.showToast({
										title: data.msg,
										icon: 'none'
									});
								}
							},
							fail: (err) => {
								console.log(err)
							}
						});
					}
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList = ''
						}
					}
				})
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			PickerChangefw(e, item, index) {
				if (index + 1 !== this.onexl.length) {
					this.onexl.splice(index + 1)
				}
				this.onexl[index].value = e.detail.value
				this.indexs = item.list[item.value].deptName
				this.indexid = item.list[item.value].id
				this.lastid = item.list[item.value].id
				this.lasttext = item.list[item.value].deptName
				this.getSxlistXuezhi(this.indexid)
			},
			//提交
			submit() {
				let that = this;
				if (that.noClick) {
					// 第一次点击
					that.noClick = false;
					setTimeout(() => {
						that.noClick = true;
					}, 2000)
					if (!that.validate('gkzf')) return;
					if (!that.validate('wc')) return;
					if (!that.validate('name')) return;
					if (!that.validate('shengao')) return;
					if (!that.validate('dkcj')) return;
					if (!that.cityName) {
						uni.showToast({
							title: '请选择高考省份',
							icon: 'none'
						})
						return
					}
					if (!that.lasttext) {
						uni.showToast({
							title: '请选择服务办类型',
							icon: 'none'
						})
						return
					}
					if (!that.imgList) {
						uni.showToast({
							title: '请上传成绩单',
							icon: 'none'
						})
						return
					}
					// this.gosubmit()
					this.showModal()
					console.log('已经提交')
				} else {
					//  这里是重复点击的判断
					this.$api.msg("已提交请勿重复点击")

				}
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

	.bg-blues {
		background-color: #2D9BFB;
		color: #fff;
		border: 1rpx solid #2D9BFB;
	}

	.line-blues {
		border: 1rpx solid #2D9BFB;
		color: #2D9BFB;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.cu-form-group {
		justify-content: space-between !important;
		border-bottom: 1rpx solid #eee;

		input {
			text-align: right;
		}
	}

	radio {
		transform: scale(0.7);
	}

	.radtext {
		padding: 0 20rpx;
	}

	.text-red {
		padding-right: 10rpx;
		font-size: 34rpx;
	}

	.xk {
		height: 200rpx;
		border-bottom: 1rpx solid #eee;
		width: 98%;
		padding-left: 4%;
	}

	.xkitems {
		display: block;
		float: left;
	}

	.kemus {
		min-width: 140rpx;
		padding: 15rpx 30rpx;
		border-radius: 35rpx;
		display: inline-block;
		text-align: center;
	}

	.sfzbox {
		width: 100%;
	}

	.sfz {
		width: 48%;
		height: 212rpx;
		overflow: hidden;
	}

	.dengji {
		width: 171rpx;
		height: 243rpx;
	}

	.text_red {
		font-size: 18rpx;
		color: #FF1F28;
		padding: 0 0 20rpx 20rpx;
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
		font-size: 28rpx;
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
		font-size: 28rpx;
	}

	.dengjizp {
		width: 100%;
		height: 243rpx;
		overflow: hidden;
		position: relative;
	}

	.heightbt00 {
		height: 100rpx;
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

	.btn_right {
		background: #2D9DFB;
		color: #FFFFFF;
		font-size: 28rpx;
		width: 30%;
		margin: 0;
	}

	.ymbottom {
		z-index: 111;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 20rpx;
	}
</style>