<template>
	<view>
		<view class="bg-white width96 conbox">
			<form>
				<view class="biaoti mt_20 flex justify-between width100">
					<view>
						<view class="zuotubiao"></view>
						<text>个人基本信息</text> 
					</view>
					<text v-if="optiondata" class="text-qx bg-green">审核中</text>
				</view>
				<radio-group class="block borderbotton mt_20" @change="RadioChange">
					<!-- #ifndef MP-ALIPAY -->
					<!-- <view class="cu-form-group">
						<view class="title"><text class="text-red">*</text>申请角色：</view>
						<view>
							<label>
								<radio class='blue radio' :class="jsradio=='A'?'checked':''" :checked="jsradio=='A'?true:false"
									value="A"></radio>
								<text class="radtext">兼职合伙人</text>
				
							</label>
							<label>
								<radio class='blue radio' :class="jsradio=='B'?'checked':''" :checked="jsradio=='B'?true:false"
									value="B"></radio>
								<text class="radtext">团队合伙人</text>
							</label>
						</view>
					</view> -->
					<!-- #endif -->
				</radio-group>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>姓名:</view>
						<input placeholder="请输入姓名" placeholder-class="inppl" v-model="username" maxlength="15" @blur="blur('username')"></input>
				</view>
				<radio-group class="block borderbotton" @change="RadioChange">
					<!-- #ifndef MP-ALIPAY -->
					<view class="cu-form-group">
						<view class="title"><text class="text-red">*</text>性别：</view>
						<view>
							<label>
								<radio class='blue radio' :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false"
									value="C"></radio>
								<text class="radtext">男</text>
		
							</label>
							<label>
								<radio class='blue radio' :class="radio=='D'?'checked':''" :checked="radio=='D'?true:false"
									value="D"></radio>
								<text class="radtext">女</text>
							</label>
						</view>
					</view>
					<!-- #endif -->
				</radio-group>
				<view class="cu-form-group border-bottom-none">
					<view class="title"><text class="text-red">*</text>身份证号：</view>
					<input placeholder="请输入" name="input" v-model="card"></input>
				</view>
				<view class="cu-form-group border-bottom-none">
					<view class="title"><text class="text-red">*</text>手机号码：</view>
					<input placeholder="请输入" name="input" v-model="phone"></input>
					<!-- <view class="cu-capsule radius">
						<view class='cu-tag bg-blue '>
							+86
						</view>
						<view class="cu-tag line-blue">
							中国大陆
						</view>
					</view> -->
				</view>
				<view class="cu-form-group border-bottom-none">
					<view class="title"><text class="text-red">*</text>住址：</view>
					<input placeholder="请输入" name="input" v-model="address"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red"></text>备注：</view>
					<input placeholder="请输入" name="input" v-model="textareaValue"></input>
				</view>
			</form>
			
		</view>
		<view class="btn width96 margin-bottom" @click="submit">
			<button>保 存</button>
		</view>
	</view>
</template>

<script>
	import {
		imgUrl,
		baseUrl
	} from "@/common/config.default.js";
	import {
		getAddMyself
	} from "@/api/my.js";
	export default {
		
		data() {
			return {
				imgUrl:'',
				baseUrl:'',
				odeptName:"",
				jsradio:'A',
				radio: 'C',
				modalName: null,
				optiondata:'',
				textareaValue: '',
				username:"",
				card:'',
				phone:'',
				address:'',
				rules: {
					username: [{
						rule: /^.{2,18}$/,
						message: '请输入姓名',
					}],
					card:[{
						rule:/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
						message: '请输入正确的身份证',
					}],
					phone:[{
						rule:/^1[0-9]{10,10}$/,
						message: '请输入正确的手机号',
					}],
					address:[{
						rule:/.+/,
						message: '请输入住址',
					}]
				},
				noClick: true,
				focusclass: {
					username: false,
					card:false,
					phone: false,
					address:false,
				}
			};
		},
		onLoad(option) {
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
			var that = this
			var optiondata = JSON.parse(option.data)
			this.optiondata = optiondata
			if(optiondata){
				that.username = optiondata.name;
				that.card = optiondata.card;
				that.phone = optiondata.tel;
				that.address = optiondata.address;
				that.radio = optiondata.sex=='男'?'C':'D'
				that.textareaValue = optiondata.remark?optiondata.remark:''
				// that.jsradio = optiondata.role==1?'A':'B'
			}
		},
		onShow() {
			
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
			RadioChange(e) {
				this.radio = e.detail.value
			},
			//提交
			submit() {
				let that = this;
				if (!that.validate('username')) return;
				if (!that.validate('card')) return;
				if (!that.validate('phone')) return;
				if (!that.validate('address')) return;
				if (that.noClick) {
					// 第一次点击
					that.noClick = false;
					that.gosubmit()
					
				} else {
					//  这里是重复点击的判断
					this.$api.msg("已提交请勿重复点击")
					setTimeout(() => {
						that.noClick = true;
					}, 2000)
				}
			},
			async gosubmit(){
				var that = this
				try {
					const obj = {
						id:that.optiondata.id?that.optiondata.id:'',
						name: that.username,
						sex: that.radio=='C'?'男':'女',
						// role:that.jsradio=='A'?'1':'2',
						card:that.card,
						tel:that.phone,
						address:that.address,
						birthday:""
					};
					const {
						data
					} = await getAddMyself(obj);
			     	console.log(data)
					if (data.code == 200) {
						 this.$api.msg('提交成功');
						 if(this.optiondata){
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
	page{
		background-color: #f7f7f7;
	}
	.conbox{
		border-radius: 20rpx;
		margin: 20rpx auto;
		padding: 20rpx 0;
	}
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	
	.text-qx {
		width: 200rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 30rpx;
	}
	

	.cu-form-group {
		justify-content:  space-between!important;
		border-bottom: 1rpx solid #eee;
		input{
			text-align: right;
		}
	}
	.borderbotton{
		border-bottom: 1rpx solid #eee;
	}
	.cu-form-group:last-child{
		border-bottom: none;
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
	
	.sfzbox{
		width: 100%;
	}
	.sfz{
		width: 48%;
		height: 212rpx;
		overflow: hidden;
		position: relative;
	}
	.dengji{
		width: 171rpx;
		height: 243rpx;
	}
	.dengjizp{
		width: 100%;
		height: 243rpx;
		overflow: hidden;
		position: relative;
	}
	.close{
		position: absolute;
		top: 0;
		right: 0;
	}
	.iconup{
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
	.dungwei{
		position: absolute;
		top: 70rpx;
		left: 0rpx;
		width: 100%;
		height: 243rpx;
		text-align: center;
	}
	.btn{
		padding-bottom: 1;
	}
	.btn button{
		background: #2D9DFB;
		color: #FFFFFF;
		font-size: 28rpx;
		margin: 130rpx 0;
	}
</style>