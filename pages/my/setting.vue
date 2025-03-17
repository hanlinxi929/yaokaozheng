<template>
	<view>
		<form>
			<view class="cu-form-group">
				<!-- <view class="flex justify-between align-center"  @click="ChooseImage" >
					<image class="tx" :src="userInfo.avatar"></image>
					<text class="cuIcon-right sm"></text>
				</view> -->
				<button class="flex justify-between align-center bg-white txbtn" open-type="chooseAvatar"
					@chooseavatar="onChooseAvatar">
					<image v-if="!tximg" class="tx" :src="imgUrl+'icon-avatar-default.png'" mode="widthFix"></image>
					<image v-else :src="baseUrl+tximg" mode="widthFix"></image>
				</button>
			</view>
			<view class="bg-white width96 conbox">
				<view class="biaoti mt_20">
					<view class="zuotubiao"></view>
					<text>个人基本信息</text>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>昵称：</view>
					<input placeholder="请输入"  type="nickname" name="input" v-model="username"
						@blur="blur('username')"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>手机号码：</view>
					<input disabled placeholder="请输入" name="input"  v-model="tel" @blur="blur('tel')" ></input>
				</view>
				<radio-group class="block" @change="RadioChange">
					<!-- #ifndef MP-ALIPAY -->
					<view class="cu-form-group">
						<view class="title">性别：</view>
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
				<view class="cu-form-group">
					<view class="title">身份证号：</view>
					<input placeholder="请输入" name="input" v-model="card"></input>
				</view>

				<view class="cu-form-group">
					<view class="title">生日：</view>
					<picker mode="date" :value="date" start="1980-09-01" @change="DateChange">
						<view class="picker">
							{{date?date:'请选择'}}
						</view>
					</picker>
				</view>

				<view class="cu-form-group">
					<view class="title">收货地址：</view>
					<input placeholder="请输入" name="input" v-model="shippingAddress"></input>
				</view>
			</view>
			<view class="heightbt00"></view>
		</form>

		<view class="tijiao width96" @click="submit">
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
		getupload,
		getMyEdit
	} from "@/api/my.js";
	import {
		getInfo
	} from "@/api/index.js";
	export default {

		data() {
			return {
				index: -1,
				picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
				region: ['广东省'],
				radio: 'C',
				modalName: null,
				textareaAValue: '',
				textareaBValue: '',
				imgUrl: '',
				username: "",
				tel: "",
				card: "",
				shippingAddress: '',
				rules: {
					username: [{
						rule: /^.{2,18}$/,
						message: '请输入姓名',
					}],
					card:[{
						rule:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|18|20|30|31)\d{3}[0-9xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
						message: '请输入正确的身份证',
					}]
				},
				noClick: true,
				focusclass: {
					username: false
				},
				tximg: '',
				date: '请选择',
				baseUrl: "",
				userInfo: null,
			};
		},
		onLoad() {
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
			this.getInfos()
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
			async getMyEdits(){
				try {
					const obj = {
						name:this.username,
						card:this.card,
						profilePicture:this.tximg?this.tximg:"",
						sex:this.radio=='C'?'男':'女',
						shippingAddress:this.shippingAddress,
						birthday:this.date
					};
					const {
						data
					} = await getMyEdit(obj);
					if (data.code == 200) {
						this.$api.msg("保存成功")
						this.getInfos()
					} else {
						console.log(data)
						this.$api.msg(data.msg)
					}
				} catch (e) {
				
				}
			},
			async getInfos(code) {
				try {
					const obj = {
						
					};
					const {
						data
					} = await getInfo(obj);
					if (data.code == 200) {
						this.userInfo = data.data
						this.username = data.data.name?data.data.name:""
						this.tel = data.data.tel?data.data.tel:""
						this.card = data.data.card?data.data.card:""
						this.radio = data.data.sex=='男'?'C':"D"
						this.shippingAddress = data.data.shippingAddress?data.data.shippingAddress:""
						this.tximg = data.data.profilePicture?data.data.profilePicture:''
						this.date = data.data.birthday
					} else {
						console.log(data)
						this.$api.msg(data.msg)
					}
				} catch (e) {
				
				}
				
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			onChooseAvatar(e) {
				let self = this;
				let {
					avatarUrl
				} = e.detail;
				uni.showLoading({
					title: '加载中'
				});
				uni.uploadFile({
					url: baseUrl + `/hs/api/upload`,
					filePath: avatarUrl,
					name: 'file',
					header: {
						token: uni.getStorageSync('token'),
					},
					success: uploadFileRes => {
						// 注意：这里返回的uploadFileRes.data 为JSON 需要自己去转换
						let data = JSON.parse(uploadFileRes.data);
						if (data.code === 200) {
							self.tximg = data.fileName
						}
					},
					fail: (error) => {
						uni.showToast({
							title: error,
							duration: 2000
						});
					},
					complete: () => {
						uni.hideLoading();
					}
				});
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
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			//提交
			submit() {
				let that = this;
				console.log(that.card)
				
				if (that.noClick) {
					// 第一次点击
					that.noClick = false;
					if(that.card){
						if (!that.validate('card')) return;
					}
					if (!that.validate('username')) return;
					
					console.log('已经提交')
					setTimeout(() => {
						that.noClick = true;
					}, 1000)
					this.getMyEdits()
					
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

	.txbtn {
		margin: 22rpx auto;
		padding: 0;
		font-size: 28rpx;
		border: none;
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	}

	.tx {
		width: 100%;
		border-radius: 50%;
	}

	.conbox {
		border-radius: 20rpx;
		margin: 20rpx auto;
		padding: 20rpx 0;
	}

	.cu-form-group .title {
		min-width: 150rpx;
	}

	.cu-form-group {
		justify-content: space-between!important;
		input{
			text-align: right!important; 
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
		position: absolute;
		left: -10rpx;
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
	
	.tijiao button{
		width: 100%;
		background: #2D9DFB;
		color: #FFFFFF;
		font-size: 28rpx;
		border-radius: 20rpx;
	}

	.btn_right {
		background: #2D9DFB;
		color: #FFFFFF;
		font-size: 28rpx;
		width: 30%;
		margin: 0;
	}

	.ymbottom {
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 20rpx;
	}
</style>