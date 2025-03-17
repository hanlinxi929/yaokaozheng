<template>
	<view class="conbox bg-white width96">
		<form>
			<!-- <view class="cu-form-group">
				<view class="title"><text class="text-red">*</text>发票抬头类型：</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="text-red">*</text>发票介质：</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="text-red">*</text>发票类型：</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'请选择'}}
					</view>
				</picker>
			</view> -->
			<view class="biaoti mt_20">
				<view class="zuotubiao"></view>
				<text>发票类型</text>
			</view>
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="index==TabCur?'bgblue':'bggrey'" v-for="(item,index) in leixing"
					:key="index" @tap="tabSelect" :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
			<view class="biaoti mt_30">
				<view class="zuotubiao"></view>
				<text>发票抬头类型</text>
			</view>
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft1">
				<view class="cu-item" :class="index==TabCur1?'bgblue':'bggrey'" v-for="(item,index) in ttleixing"
					:key="index" @tap="tabSelect1" :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
			<view v-if="TabCur1=='0'">
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>企业名称:</view>
					<input placeholder="请输入" placeholder-class="inppl" v-model="qyname" maxlength="15"
						@blur="blur('qyname')"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>纳税识别号：</view>
					<input placeholder="请输入" v-model="nsnumber" @blur="blur('nsnumber')"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>企业地址：</view>
					<input placeholder="请输入" v-model="qyadd" @blur="blur('qyadd')"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>企业电话：</view>
					<input placeholder="请输入" v-model="qyphone" @blur="blur('qyphone')"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>开户银行：</view>
					<input placeholder="请输入" v-model="khyh" @blur="blur('khyh')"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>银行账号：</view>
					<input placeholder="请输入" v-model="yhnumber" @blur="blur('yhnumber')"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>开票金额：<text
							class="fromspan p_left20"></text></view>
					<text class="fromspan">￥{{jg}}</text>
				</view>
			</view>
			<view v-if="TabCur1=='1'">
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>姓名:</view>
					<input placeholder="请输入姓名" placeholder-class="inppl" v-model="username" maxlength="15"
						@blur="blur('username')"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>身份证号：</view>
					<input placeholder="请输入" name="input" v-model="card" @blur="blur('card')"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>开票金额：<text
							class="fromspan p_left20"></text></view>
					<text class="fromspan">￥{{jg}}</text> 
				</view>
			</view>
		</form>
		<view class="btns width96" @click="submit">
			<button class="btn1 width96">申请开票</button>
			<!-- <button class="btn2 width96">取消</button> -->
		</view>
	</view>
</template>

<script>
	import {
		imgUrl
	} from "@/common/config.default.js";
	import {
		getZcInvoice, //查看是否存在已申请发票
		getaddZcInvoice //申请发票
	} from "@/api/my.js";
	export default {

		data() {
			return {
				index: -1,
				index1: -1,
				TabCur: 0,
				TabCur1: 0,
				scrollLeft: 0,
				fapiaodetail:'',
				scrollLeft1: 0,
				picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
				modalName: null,
				imgUrl: '',
				qyname: '',
				qyadd: "",
				qyphone: '',
				khyh: '',
				yhnumber: '',
				nsnumber: '',
				username: "",
				card: '',
				sid: '',
				orderType: '',
				jg:'',
				rules: {
					qyname: [{
						rule: /.+/,
						message: '请输入企业名称',
					}],
					nsnumber: [{
						rule: /.+/,
						message: '请输入纳税识别号',
					}],
					qyadd: [{
						rule: /.+/,
						message: '请输入企业地址',
					}],
					qyphone: [{
						rule: /.+/,
						message: '请输入企业电话',
					}],
					khyh: [{
						rule: /.+/,
						message: '请输入开户银行',
					}],
					yhnumber: [{
						rule: /.+/,
						message: '请输入银行账号',
					}],
					username: [{
						rule: /^.{2,18}$/,
						message: '请输入姓名',
					}],
					card: [{
						rule: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
						message: '请输入正确的身份证',
					}]
				},
				noClick: true,
				focusclass: {
					qyname: false,
					nsnumber: false,
					qyadd: false,
					qyphone: false,
					khyh: false,
					yhnumber: false,
					username: false,
					card: false
				},
				leixing: [{
						name: '普通发票'
					},
					{
						name: '增值税发票'
					}
				],
				ttleixing: [{
						name: '企业'
					},
					{
						name: '个人'
					}
				]
			};
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
			this.sid = option.id
			this.orderType = option.orderType
			this.jg = option.jg
			if(option.fapiaodetail){
				var fapiaodetail = JSON.parse(option.fapiaodetail)
				this.fapiaodetail = fapiaodetail
				if(fapiaodetail.headingType==0){
					this.username = fapiaodetail.invoiceHeader;
					this.card = fapiaodetail.taxIdentification;
					this.TabCur1 = fapiaodetail.headingType==0?'1':'0'
					this.TabCur = fapiaodetail.invoiceType==0?'0':'1'
				}else{
					this.qyname = fapiaodetail.invoiceHeader;
					this.nsnumber = fapiaodetail.taxIdentification;
					this.qyadd = fapiaodetail.companyAddress;
					this.qyphone = fapiaodetail.invoicePhone;
					this.khyh = fapiaodetail.bankDeposit;
					this.yhnumber = fapiaodetail.bankAccount;
					this.TabCur1 = fapiaodetail.headingType==0?'1':'0'
					this.TabCur = fapiaodetail.invoiceType==0?'0':'1'
				}
				
			}
			
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			tabSelect1(e) {
				this.TabCur1 = e.currentTarget.dataset.id;
				this.scrollLeft1 = (e.currentTarget.dataset.id - 1) * 60
				this.qyname = '';
				this.qyadd = "";
				this.qyphone = '';
				this.khyh = '';
				this.yhnumber = '';
				this.nsnumber = '';
				this.username = "";
				this.card = '';
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			//提交
			submit() {
				let that = this;
				if (that.noClick) {
					// 第一次点击
					that.noClick = false;
					if (that.TabCur1 == '0') {
						if (!that.validate('qyname')) return;
						if (!that.validate('nsnumber')) return;
						if (!that.validate('qyadd')) return;
						if (!that.validate('qyphone')) return;
						if (!that.validate('khyh')) return;
						if (!that.validate('yhnumber')) return;
					} else {
						if (!that.validate('username')) return;
						if (!that.validate('card')) return;
					}
					that.gosubmit()
					setTimeout(() => {
						that.noClick = true;
					}, 2000)
				} else {
					//  这里是重复点击的判断
					this.$api.msg("已提交请勿重复点击")
					
				}
			},
			async gosubmit() {
				var that = this
				try {
					const obj = {
						orderId:that.sid,
						id:this.fapiaodetail?this.fapiaodetail.id:'',
						orderType: parseInt(that.orderType), //申报类型  0-报名  1-咨询
						invoiceType: parseInt(that.TabCur),
						invoiceHeader: that.TabCur1 == '0' ? that.qyname : that.username,
						invoicingAmount: parseFloat(that.jg), //开票金额
						headingType: that.TabCur1 == '0' ? 1 : 0,
						invoicePhone: that.qyphone,
						taxIdentification: that.TabCur1 == '0' ? that.nsnumber : that.card,
						bankDeposit: that.khyh,
						companyAddress: that.qyadd,
						bankAccount: that.yhnumber
					};
					const {
						data
					} = await getaddZcInvoice(obj);
					console.log(data)
					if (data.code == 200) {
						this.$api.msg('提交成功');
						if(this.fapiaodetail){
							setTimeout(function() {
								uni.navigateBack({
									delta: 2
								});
							}, 2000);
						}else{
							setTimeout(() => {
								uni.navigateBack()
							}, 2000)
						}
						
					} else {
						this.$api.msg(data.msg);
					}
				} catch (e) {

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

	.biaoti {
		margin-bottom: 30rpx;
	}

	.bgblue {
		padding: 0 40rpx;
		background: #E1F1FF;
		border-radius: 28rpx;
		border: 1px solid #2D9DFB;
		color: #2D9DFB;
		font-size: 28rpx;
		line-height: 50rpx !important;
		height: 50rpx !important;
		min-width: 150rpx;
		text-align: center;
	}

	.bggrey {
		padding: 0 40rpx;
		line-height: 50rpx !important;
		height: 50rpx !important;
		background: #F3F1F2;
		border-radius: 28rpx;
		font-size: 28rpx;
		color: #999999;
		min-width: 150rpx;
		text-align: center;
	}

	.conbox {
		border-radius: 20rpx;
		padding: 20rpx 0;
		margin: 20rpx auto;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}


	radio {
		transform: scale(0.7);
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

	.cu-form-group input {
		text-align: right !important;
	}

	.btns {
		.btn1 {
			background: #2D9DFB;
			border-radius: 36rpx;
			color: #fff;
			font-size: 28rpx;
			line-height: 72rpx;
			position: fixed;
			bottom: 40rpx;
			left: 3%;
		}

		.btn2 {
			background: #fff;
			border-radius: 36rpx;
			color: #2D9DFB;
			border: 1rpx solid #2D9DFB;
			font-size: 28rpx;
			line-height: 72rpx;
			position: fixed;
			bottom: 20rpx;
			left: 3%;
		}
	}

	.fromspan {
		font-size: 24rpx;
		color: red;
	}
</style>