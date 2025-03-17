<template>
	<view class="bg-white width96 conbox">
		<form>
			<view class="biaoti mt_20">
				<view class="zuotubiao"></view>
				<text>上传个人基本信息</text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title"><text class="text-red">*</text>姓名:</view>
				<input placeholder="请输入姓名" placeholder-class="inppl" v-model="username" maxlength="15"
					@blur="blur('username')"></input>
			</view>
			<radio-group class="block" @change="RadioChange">
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
			<view class="cu-form-group">
				<view class="title"><text class="text-red">*</text>身份证号：</view>
				<input placeholder="请输入" name="input" v-model="card"></input>
			</view>
			<view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>手机号码：</view>
					<input placeholder="请输入" name="input" v-model="phone"></input>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="text-red">*</text>住址：</view>
				<input placeholder="请输入" name="input" v-model="address"></input>
			</view>
			<view>
				<view class="cu-form-group" v-for="(item,index) in onexl" :key="index">
					<view class="title"><text class="text-red">*</text>{{index==0?'报名项目':'项目分类'+index}}：</view>
					<picker @change="PickerChange($event,item,index)" v-model="item.value" :range="item.list"
						:range-key="'deptName'">
						<view class="picker">
							{{item.list[item.value].deptName||'请选择'}}
						</view>
					</picker>
				</view>
			</view>
			<!-- <view class="cu-form-group">
				<view class="title"><text class="text-red">*</text>报名项目：</view>
				<picker @change="PickerChangemm" :value="indexmm" :range="zzmianmao"  :range-key="'deptName'">
					<view class="picker">
						{{indexmm>-1?zzmianmao[indexmm].deptName:'请选择'}}
					</view>
				</picker>
			</view> -->
			<!-- #ifndef H5 || APP-PLUS || MP-ALIPAY -->
			<!-- <view class="cu-form-group" v-if="oneId=='208'">
				<view class="title"><text class="text-red">*</text>报名地区:</view>
				<picker @change="PickerChangedq" :value="indexdq" :range="bmadd"  :range-key="'deptName'">
					<view class="picker">
						{{indexdq>-1?bmadd[indexdq].deptName:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group" v-if="oneId=='200'">
				<view class="title"><text class="text-red">*</text>报名学制:</view>
				<picker @change="PickerChangexz" :value="indexxz" :range="bmxz"  :range-key="'deptName'">
					<view class="picker">
						{{indexxz>-1?bmxz[indexxz].deptName:'请选择'}}
					</view>
				</picker>
			</view> -->
			<!-- #endif -->
			<!-- <view class="cu-form-group">
				<view class="title"><text class="text-red">*</text>报名专业:</view>
				<picker @change="PickerChangezy" :value="indexzy" :range="bmzhuanye"  :range-key="'deptName'">
					<view class="picker">
						{{indexzy>-1?bmzhuanye[indexzy].deptName:'请选择'}}
					</view>
				</picker>
			</view> -->
			<!-- <view class="cu-form-group">
				<view class="title"><text class="text-red"></text>备注：</view>
				<input placeholder="请输入" name="input" v-model="textareaValue"></input>
			</view> -->
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="text-red">*</text>登记照(2寸)
				</view>
			</view>
			<view class="cu-form-group">
				<view class="flex justify-between dengji">
					<view class="bg-img dengjizp" @tap="ViewImage">
						<image class="zhengmian" v-if="!imgList" :src="imgUrl+'img44.png'" @tap="ChooseImage"
							mode="widthFix"></image>
						<view class="dungwei" v-if="!imgList" @tap="ChooseImage">
							<text class="cuIcon-refresharrow iconup"></text>
							<text class="fot-28">点击上传</text>
						</view>
						<image v-else :src="baseUrl+imgList" mode="widthFix"></image>
						<view v-if="imgList" class="cu-tag bg-gray close" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="text-red">*</text>身份证正反面
				</view>
			</view>
			<view class="cu-form-group">
				<view class="flex justify-between sfzbox">
					<view class="bg-img sfz" @tap="ViewImage1">
						<image class="zhengmian" v-if="!imgList1" :src="imgUrl+'img36.png'" @tap="ChooseImageone"
							mode="widthFix"></image>
						<image v-else :src="baseUrl+imgList1" mode="widthFix"></image>
						<view v-if="imgList1" class="cu-tag bg-gray close" @tap.stop="DelImg1" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="bg-img sfz" @tap="ViewImage2">
						<image class="fanmian" v-if="!imgList2" :src="imgUrl+'img37.png'" @tap="ChooseImagetwo"
							mode="widthFix"></image>
						<image v-else :src="baseUrl+imgList2" mode="widthFix"></image>
						<view v-if="imgList2" class="cu-tag bg-gray close" @tap.stop="DelImg2" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="text-red">*</text>毕业证
				</view>
			</view>
			<view class="cu-form-group">
				<view class="flex justify-between dengji">
					<view class="bg-img dengjizp" @tap="ViewImage3">
						<image v-if="!imgList3" :src="imgUrl+'img26.png'" @tap="ChooseImagethree" mode="widthFix">
						</image>
						<view class="dungwei" v-if="!imgList3" @tap="ChooseImagethree">
							<text class="cuIcon-refresharrow iconup"></text>
							<text class="fot-28">点击上传</text>
						</view>
						<image v-else :src="baseUrl+imgList3" mode="widthFix"></image>
						<view v-if="imgList3" class="cu-tag bg-gray close" @tap.stop="DelImg3" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
				</view>
			</view>
		</form>
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
		getSxlist,
		getSignUpadd,
		getXlType
	} from "@/api/index.js";
	import {
		getupload
	} from "@/api/my.js";
	export default {

		data() {
			return {
				oid: "",
				indexs: -1,
				indexid: '',
				page: 1,
				odeptName: "",
				indexmm: -1,
				indexzy: -1,
				indexdq: -1,
				indexxz: -1,
				indexmmid: '',
				indexzyid: '',
				indexdqid: '',
				indexxzid: '',
				picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
				zzmianmao: [],
				bmadd: [],
				bmxz: [],
				bmzhuanye: [],
				radio: 'C',
				imgList: '',
				imgList1: '',
				imgList2: '',
				imgList3: '',
				modalName: null,
				textareaValue: '',
				imgUrl: '',
				baseUrl: '',
				username: "",
				card: '',
				lastid:'',
				lasttext:'',
				phone: '',
				address: '',
				onexl: [],
				rules: {
					username: [{
						rule: /^.{2,18}$/,
						message: '请输入姓名',
					}],
					card: [{
						rule: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
						message: '请输入正确的身份证',
					}],
					phone: [{
						rule: /^1[0-9]{10,10}$/,
						message: '请输入正确的手机号',
					}],
					address: [{
						rule: /.+/,
						message: '请输入住址',
					}]
				},
				noClick: true,
				oneId: "",
				focusclass: {
					username: false,
					card: false,
					phone: false,
					address: false
				}
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
			this.baseUrl = baseUrl
			this.oid = option.oid
			this.oneId = option.oneId
			var oid = option.oid
			
			if (oid == '201') {
				this.odeptName = '成人中专'
			} else if (oid == '254') {
				this.odeptName = '自学考试'
			} else if (oid == '272') {
				this.odeptName = '成人教育'
			} else if (oid == '273') {
				this.odeptName = '开放教育'
			} else if (oid == '274') {
				this.odeptName = '统招升本'
			} else if (oid == '275') {
				this.odeptName = '研究生报考'
			}
			this.lastid =option.sid
			this.lasttext = this.odeptName
			this.getSxlistXuezhi(option.sid)
		},
		onShow() {

			// this.getSxlistZzmianmao()
			// this.getSxlistbmzhuanye()
			// if(this.oneId=='208'){
			// 	this.getSxlistBmadd()
			// }else{
			// 	this.getSxlistXuezhi()
			// }
		},
		methods: {
			RadioChange(e) {
				this.radio = e.detail.value
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
				this.getSxlistXuezhi(this.indexid)
			},
			async getSxlistXuezhi(id) {
				try {
					const obj = {
						id: id,
						type: this.oneId == '208' ? 1 : 0
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
						}
						// this.onexl.xz = data.dataA

					} else {
						// this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async getSxlistZzmianmao() {
				try {
					const obj = {
						deptName: "政治面貌"
					};
					const {
						data
					} = await getSxlist(obj);

					if (data.code == 200) {
						this.zzmianmao = data.data
					} else {
						// this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async getSxlistbmzhuanye() {
				try {
					const obj = {
						deptName: "报名专业"
					};
					const {
						data
					} = await getSxlist(obj);

					if (data.code == 200) {
						this.bmzhuanye = data.data
					} else {
						// this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async getSxlistBmadd() {
				try {
					const obj = {
						deptName: "报名地区"
					};
					const {
						data
					} = await getSxlist(obj);

					if (data.code == 200) {
						this.bmadd = data.data
					} else {
						// this.$api.msg(data.msg)
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
			ViewImage1(e) {
				uni.previewImage({
					urls: this.imgList1,
					current: e.currentTarget.dataset.url
				});
			},
			ViewImage2(e) {
				uni.previewImage({
					urls: this.imgList2,
					current: e.currentTarget.dataset.url
				});
			},
			ViewImage3(e) {
				uni.previewImage({
					urls: this.imgList3,
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
			ChooseImageone() {
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
									this.imgList1 = data.fileName
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
			ChooseImagetwo() {
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
									this.imgList2 = data.fileName
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
			ChooseImagethree() {
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
									this.imgList3 = data.fileName
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
					title: '登记照',
					content: '确定要删除登记照吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList = ''
						}
					}
				})
			},
			DelImg1(e) {
				uni.showModal({
					title: '身份证正面',
					content: '确定要删除身份证正面吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList1 = ''
						}
					}
				})
			},
			DelImg2(e) {
				uni.showModal({
					title: '身份证反面',
					content: '确定要删除身份证反面吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList2 = ''
						}
					}
				})
			},
			DelImg3(e) {
				uni.showModal({
					title: '毕业证',
					content: '确定要删除毕业证吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList3 = ''
						}
					}
				})
			},

			PickerChangemm(e) {
				console.log(e.detail.value)
				this.indexmm = e.detail.value
				this.indexmmid = this.zzmianmao[e.detail.value].id
			},
			PickerChangezy(e) {
				this.indexzy = e.detail.value
				this.indexzyid = this.bmzhuanye[e.detail.value].id
			},
			PickerChangedq(e) {
				this.indexdq = e.detail.value
				this.indexdqid = this.bmadd[e.detail.value].id
			},
			PickerChangexz(e) {
				this.indexxz = e.detail.value
				this.indexxzid = this.bmxz[e.detail.value].id
				console.log(this.bmxz[e.detail.value].id)
			},
			//提交
			submit() {
				let that = this;
				if (!that.validate('username')) return;
				if (!that.validate('card')) return;
				if (!that.validate('phone')) return;
				if (!that.validate('address')) return;
				// if (!that.indexmmid) {
				// 	uni.showToast({
				// 		title: '请选择政治面貌',
				// 		icon: 'none'
				// 	})
				// 	return
				// }
				// if (!that.indexzyid) {
				// 	uni.showToast({
				// 		title: '请选择报名专业',
				// 		icon: 'none'
				// 	})
				// 	return
				// }

				// if (that.oneId == '208') {
				// 	if (!that.indexdqid) {
				// 		uni.showToast({
				// 			title: '请选择报名地区',
				// 			icon: 'none'
				// 		})
				// 		return
				// 	}
				// }
				// if (that.oneId == '200') {
				// 	if (!that.indexxzid) {
				// 		uni.showToast({
				// 			title: '请选择报名学制',
				// 			icon: 'none'
				// 		})
				// 		return
				// 	}
				// }

                if (!that.radio) {
                	uni.showToast({
                		title: '请选择性别',
                		icon: 'none'
                	})
                	return
                }
				if(that.oid != '274'){
					if (!that.lasttext) {
						uni.showToast({
							title: '请选择报名项目',
							icon: 'none'
						})
						return
					}
				}
				

				if (!that.imgList) {
					uni.showToast({
						title: '请上传登记照',
						icon: 'none'
					})
					return
				}
				if (!that.imgList1) {
					uni.showToast({
						title: '请上传身份证正面',
						icon: 'none'
					})
					return
				}
				if (!that.imgList2) {
					uni.showToast({
						title: '请上传身份证反面',
						icon: 'none'
					})
					return
				}
				if (!that.imgList3) {
					uni.showToast({
						title: '请上传毕业证',
						icon: 'none'
					})
					return
				}
				if (that.noClick) {
					// 第一次点击
					that.noClick = false;
					that.gosubmit()
					setTimeout(() => {
						that.noClick = true;
					}, 1000)
				} else {
					//  这里是重复点击的判断
					this.$api.msg("已提交请勿重复点击")
				}
			},
			async gosubmit() {
				var that = this
				// var bmxzname = ''
				// if (that.bmxz) {
				// 	console.log(that.bmxz)
				// 	bmxzname = that.bmxz[that.indexzy].deptName
				// }
				// var bmaddname = ''
				// if (that.bmadd[0] != null) {
				// 	console.log(that.bmadd)
				// 	bmaddname = that.bmadd[that.indexdq].deptName
				// }
				try {
					const obj = {
						userName: that.username,
						sex: that.radio == 'C' ? '男' : '女',
						cardCode: that.card,
						tel: that.phone,
						address: that.address,
						registrationMajorId: that.lastid,//最后一个id
						registrationMajor:that.lasttext,
						// politicalStatusId: that.indexmmid,
						// politicalStatus: that.zzmianmao[that.indexmm].deptName,
						// registrationAreaId: that.indexdqid ? that.indexdqid : "",
						// registrationArea: bmaddname,
						// registrationLevelId: that.indexxzid ? that.indexxzid : '',
						// registrationLevel: bmxzname,
						// registrationMajorId: that.indexzyid ? that.indexzyid : '',
						// registrationMajor: that.bmzhuanye[that.indexzy].deptName ? that.bmzhuanye[that.indexzy]
						// 	.deptName : '',
						registrationPhoto: that.imgList,
						cardImages1: that.imgList1,
						cardImages2: that.imgList2,
						diploma: that.imgList3,
						levelOneId: that.oneId, //一级ID
						levelOne: that.oid=='208'?"资格考试":'学历提升', //一级类目
						levelTwoId: that.oid, //二级ID
						levelTwo: that.odeptName //二级类目
					};
					const {
						data
					} = await getSignUpadd(obj);
					console.log(data)
					if (data.code == 200) {
						this.$api.msg('提交成功');
						setTimeout(() => {
							uni.navigateBack()
						}, 2000)
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
		overflow-x: hidden;
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
		justify-content: space-between!important;
		border-bottom:1rpx solid #eee;
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
		margin: 30rpx 0;
	}
</style>