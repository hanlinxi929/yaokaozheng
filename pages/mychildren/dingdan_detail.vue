<template>
	<view :class="pagenone?'pageauto':'pagenone'">
		<view class="nav_items width96 mt_20">
			<view class="bt">报名信息</view>
			<view class="item_top flex justify-between align-center">
				<view class="item_top_left flex align-center justify-start">
					<text class="cuIcon-formfill top_icon"></text>
					<text class="top_bt">报名编号：{{dddetail.id}}</text>
				</view>
			</view>
			<view class="item_center width100">
				<view class="flex justify-between">
					<text>姓名：</text>
					<text>{{dddetail.userName}}</text>
				</view>
				<view class="flex justify-between">
					<text>身份证号：</text>
					<text>{{dddetail.cardCode}}</text>
				</view>
				<view class="flex justify-between">
					<text>手机号：</text>
					<text>{{dddetail.tel}}</text>
				</view>
			</view>
			<view class="item_top flex justify-between align-center">
				<view class="item_top_left flex align-center justify-start">
					<text class="cuIcon-formfill top_icon"></text>
					<text class="top_bt">报名项目：{{dddetail.sign}}</text>
				</view>
			</view>
			<view class="container">
				<!-- 表格容器 -->
				<view class="table">
					<!-- 表头 -->
					<view class="tr header">
						<view class="th">项目</view>
						<view class="th">金额</view>
						<view class="th">状态</view>
					</view>

					<!-- 表格数据行 -->
					<view class="tr" v-for="(item, index) in dddetail.shoppingVos" :key="index"
						:class="{ active: currentIndex === index }" @click="handleRowClick(index)">
						<view class="td">{{ item.sourceName }}</view>
						<view class="td">{{ item.actualPayment}}</view>
						<view class="td" v-if="item.state==0">待支付</view>
						<view class="td" v-if="item.state==1">已付款</view>
						<view class="td" v-if="item.state==2">未付款</view>
						<view class="td" v-if="item.state==3">已退款</view>
					</view>
				</view>
			</view>
		</view>
		<view class="nav_items width96 mt_20" :class="TabCur!=0||(dddetail.yh==false&&dddetail.yhqId==null&&dddetail.tj==false&&dddetail.tjhm==null)?'nones':''" >
			<view class="bt">付款信息</view>
			<view class="fknav">
				<view class="flex justify-between touhui" :class="dddetail.yh==false&&dddetail.yhqId==null?'nones':''">
					<text>优惠券</text>
					<view class="text-gray flex justify-end align-center"
						v-if="dddetail.yh==false&&dddetail.yhje==null">
						<text>暂无可用</text>
						<text class="cuIcon-right p_left10"></text>
					</view>
					<view class="text-gray flex justify-end align-center" v-if="dddetail.yhje!=null" @tap="showModal1"
						data-target="Modal">
						<text class="text-red">-￥{{dddetail.yhje}}</text>
						<!-- <text class="cuIcon-right p_left10"></text> -->
					</view>
					<view class="text-gray flex justify-end align-center" v-if="dddetail.yhje==null&&dddetail.yh==true"
						@tap="showModal1" data-target="Modal">
						<text>选择优惠券</text>
						<text class="cuIcon-right p_left10"></text>
					</view>
				</view>
				<view class="flex justify-between tuijian" :class="dddetail.tj==false&&dddetail.tjhm==null?'nones':''">
					<text>推荐费</text>
					<view class="text-gray flex justify-end align-center" v-if="!tuijianma" @tap="showModal"
						data-target="Modal">
						<text>填写推荐码</text>
						<text class="cuIcon-right p_left10"></text>
					</view>
					<view class="text-gray flex justify-end align-center" v-if="tuijianma"  @tap="showModal" data-target="Modal">
						<text class="text-red">-￥{{dddetail.tjje?dddetail.tjje:'0.00'}}</text>
						<!-- <text class="cuIcon-right p_left10"></text> -->
					</view>
				</view>
				<view class="dingdan width100 bg-white" v-if="TabCur==0">
					<!-- <view class="cu-bar margin-top bg-white width100">
						<view class="action tuijian">
							推荐码
						</view>
						<view class="action">
							<switch @change="SetShadow" :checked="shadow" :class="shadow?'checked':''" color="#2D9BFB"
								style="transform: scale(0.5);"></switch>
						</view>
					</view>
					<view class="width96" v-if="shadow">
						<text class="text_red">PS：受推荐报名咨询，输入推荐码后可获得20元抵扣券!</text>
					</view>
					<view class="width96 mt_30 " v-if="shadow">
						<text class="text-black">推荐码</text>
					</view>
					<view class="width96 dd_inp" v-if="shadow">
						<input type="text" @tap="showModal" data-target="Modal" placeholder="请填写推荐码"
							v-model="tuijianma" />
					</view> -->
					

					<!-- <view class="dd_detail flex justify-start align-center" v-if="shadow">
						<view class="cu-bar margin-top bg-white width96">
							<view class="action tuijian">
								<text>抵扣券</text>
								<text>抵扣金额</text>
							</view>
							<view class="action">
								<text class="text_red2 ">-￥{{dddetail.tjje?dddetail.tjje:'0.00'}}</text>
							</view>
						</view> 
					</view> -->
				</view>
			</view>
		</view>
		<view class="nav_items width96 mt_20" v-if="TabCur==0">
			<view class="bt">认证信息</view>
			<view class="fknav">
				<view class="flex justify-between hetong">
					<text>合同签名</text>
					<view class="text-gray flex justify-end align-center" @tap="showModal2" data-target="Modal">
						<!-- <view class="text-gray flex justify-end align-center" @tap="openTxtFile(dddetail.contract)" -->
						<!-- data-target="Modal"> -->
						<text>{{dddetail.contractSign?'已签名':'未签名'}}</text>
						<text class="cuIcon-right p_left10"></text>
					</view>
				</view>
				<view class="flex justify-between mt_20">
					<text>人脸认证</text>
					<view class="text-gray flex justify-end align-center" @click="toExecute">
						<text>{{dddetail.rl}}</text>
						<text class="cuIcon-right p_left10"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal " :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog tuijians">
				<view class="cu-bar bg-white justify-end">
					<view class="content">推荐码</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<input type="text" placeholder="请填写推荐码" v-model="tuijianma" />
				</view>
				<view class="bg-white flex justify-center">
					<view class="action text-qx" @tap="hideModal">关闭</view>
					<view class="action text-qr" v-if="tuijianmas==false" @tap="goGetUpReferralCode()">确定</view>
					<view class="action text-qr" v-else  @tap="quxiaotuijian()">取消</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal bottom-modal" :class="modalName1=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">选择优惠券</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="yhheught">
					<view class="relative kqs_items width96 flex mt_20 justify-between"
						v-for="(item,index) in fpdetail" :key="index" @tap="xuanzhong" :data-id="index">
						<image class="yhqbj" :src="imgUrl+'youhuiquanbj.png'" mode="widthFix"></image>
						<text class="xztext" v-if='index==xzTabCur'>选中</text>
						<view class="kqs_item_left text-center">
							<view class="mon">
								<text>￥</text>
								<text>{{item.couponMoney}}</text>
							</view>
							<text class="menkan">{{item.couponName}}</text>
						</view>
						<view class="kqs_item_right flex justify-between">
							<view class="right_left text-left">
								<text class="right_left_bt">{{item.couponName}}</text>
								<!-- <text class="right_left_time">{{item.time}}</text> -->
								<text class="right_left_day">有效期至{{item.periodValidity}}</text>
								<text class="right_day">有效期剩余120天</text>
							</view>
						</view>
						<view class="right_right" @click="xzyh()">
							<!-- <text>去使用</text> -->
						</view>
					</view>
				</view>
				<view class="bg-white flex justify-center">
					<view class="action text-qx" @tap="quxiaoyouhui()">取消优惠</view>
					<view class="action text-qr" @tap="getyouhui()">确定</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName2=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">签名</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl hetongimg" v-if="dddetail.contractSign">
					<image :src="baseUrl+dddetail.contractSign" mode="widthFix"></image>
				</view>
				<view class="hetongtext">
					<text class="text-blue" @tap="openTxtFile(dddetail.contract)">《点击浏览合同》</text>
				</view>
				<!-- v-if="!dddetail.contractSign" -->
				<view class="action text-qr mout" v-if="!dddetail.contractSign"   @click="goqianming()">去签名</view>
			</view>
		</view>
		<view class="height120"></view>
		<view class="fkbot flex align-center bg-white width100" :class="TabCur==0?'justify-between':'justify-end'"
			v-if="TabCur!=1">
			<view class="flex justify-start align-center" v-if="TabCur==0">
				<text>合计：</text>
				<text class="text-red p_left10">￥{{dddetail.jg}}</text>
			</view>
			<view @click="goPay()" v-if="TabCur==0">
				<text class="gopaytext">去支付</text>
			</view>
			<view v-if="TabCur==2">
				<text class="gopaytext" @click.stop="gofapiao(dddetail.id,0)">查看发票</text>
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
		getorderPay,
		getorderBmInfo,
		getorderUpBmDk,
		getoderYhqlist,
		getAppCouponList,
		getZcInvoice
	} from "@/api/my.js";
	export default {
		data() {
			return {
				pagenone: true,
				currentIndex: -1,
				liulan: false,
				sid: '',
				tuijianmas:false,
				tuijianma: '',
				shadow: false,
				modalName: "",
				modalName1: "",
				modalName2: '',
				xzTabCur: null,
				xzid: '',
				imgUrl: "",
				dddetail: "",
				fpdetail: "",
				baseUrl: '',
				TabCur: '',
				orderType: '',
				url: 'https://www.rzjswy.cn/faceindex.html',
				tableData: [{
						name: '智能手机',
						category: '1000',
						stock: '待支付'
					},
					{
						name: '运动鞋',
						category: '122',
						stock: '未支付'
					}
				]
			};
		},
		onLoad(option) {
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
			this.sid = option.sid
			this.TabCur = option.TabCur
			this.orderType = option.orderType
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
		onShow() {
			this.getdetail()
			this.getkaquan()
		},

		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				this.pagenone = false
			},
			showModal1(e) {
				this.modalName1 = e.currentTarget.dataset.target
				this.pagenone = false
			},
			showModal2(e) {
				this.modalName2 = e.currentTarget.dataset.target
				this.pagenone = false
			},
			// 假设url是后端返回的txt文件的网络地址
			openTxtFile(url) {
				var dddetail = this.dddetail
				var urls = 'https://www.rzjswy.cn' + url
				console.log(urls)
				uni.downloadFile({
					url: urls,
					success: function(res) {

						uni.hideLoading()
						let filePath = res.tempFilePath
						console.log(filePath)
						uni.openDocument({
							filePath: filePath,
							success: function(res) {
								console.log('打开文档成功')
								uni.setStorageSync('liulan', true);
								uni.setStorageSync('thisid', dddetail.id);
							},
							fail: function() {
								uni.showToast({
									title: '暂不支持此类型',
									duration: 2000,
									icon: "none",
								});
							}
						});
					},
					fail() {
						uni.hideLoading()
					}
				});
			},
			goqianming() {
				if (this.liulan) {
					this.$api.toPage('chooseSchool/qianming?sid=' + this.dddetail.id)
				} else {
					uni.showToast({
						title: '请先浏览合同',
						duration: 2000,
						icon: "none",
					});
				}
			},
			hideModal(e) {
				this.modalName = null
				this.modalName1 = null
				this.modalName2 = null
				this.pagenone = true
				console.log(this.pagenone)
			},
			hideModal1(e) {
				this.modalName = null
				this.xzTabCur = ''
				this.xzid = ''
			},
			SetShadow() {
				this.shadow = !this.shadow
				if (this.shadow == false) {
					this.tuijianma = ''
					this.goGetUpReferralCode()
				}
			},
			quxiaoyouhui() {
				this.xzid = ''
				this.xzTabCur = ''
				this.hideModal1()
				this.getyouhui()
			},
			async gofapiao(id, orderType) {
				
				const values =  this.dddetail.shoppingVos.map(item => Number(item.actualPayment));
				const sum = values.reduce((acc, val) => acc + val, 0);
				const result = sum.toFixed(2);
				
				var that = this
				try {
					const obj = {
						sourceId: id,
						orderType: orderType, //申报类型  0-报名  1-咨询
					};
					const {
						data
					} = await getZcInvoice(obj);
				
					
					if (data.code == 200) {
						if (data.data != '') {
							this.$api.toPage('invoice/lookinvoice?fapiaodetail=' + encodeURIComponent(JSON.stringify(
								data.data)) + '&jg=' + result+'&orderType'+orderType);
						} else {
							this.$api.toPage('invoice/sqinvoice?id=' + id + '&orderType=' + orderType + '&jg=' + result);
						}
					} else {
						console.log(data)
						// this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},

			async getyouhui() {
				var that = this
				try {
					const obj = {
						id: that.xzid,
						signUpId: that.dddetail.id
					};
					const {
						data
					} = await getAppCouponList(obj);

					if (data.code == 200) {
						if (data.data) {
							that.dddetail = data.data
							// that.shadow = data.data.tj
							that.tuijianma = data.data.tjhm
							if (data.data.yhqId) {
								for (var i = 0; i < that.fpdetail.length; i++) {
									if (that.fpdetail[i].id == data.data.yhqId) {
										that.xzTabCur = i
									}
								}
							} else {
								that.xzTabCur = null
							}
							that.tuijianma = data.data.tjhm
							// if (data.data.tj == false && data.data.tjhm) {
							// 	that.shadow = true
							// }
							// if (data.data.tj == true && data.data.tjhm == null) {
							// 	that.shadow = true
							// }
							// if (data.data.tj == false && !data.data.tjhm) {
							// 	that.shadow = false
							// }
							// if (data.data.tj == true && data.data.tjhm) {
							// 	that.shadow = true
							// }
							// false+推荐码有值  =显示     true+推荐码为null  显示  
							// false+没有值不显示  true+推荐码有值 显示

							that.hideModal()
						}
					} else {
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			quxiaotuijian() {
				this.tuijianma = ''
				this.tuijianmas = false
				this.goGetUpReferralCode()
			},
			async goGetUpReferralCode() {
				var that = this
				try {
					const obj = {
						sourceId: that.sid,
						referralCode: that.tuijianma?that.tuijianma:'0'
					};
					const {
						data
					} = await getorderUpBmDk(obj);

					if (data.code == 200) {
						if (data.data) {
							this.dddetail.tjje = data.data.tjje
							this.heji = data.data.jg
							if(this.tuijianma){
								this.tuijianmas = true
							}else{
								this.tuijianmas = false
							}
							this.hideModal()
						}
					} else {
						this.tuijianmas = false
						this.$api.msg(data.msg)
						// that.tuijianma = ''
					}
				} catch (e) {

				}
			},
			async getdetail() {
				var that = this;
				try {
					const obj = {
						id: that.sid
					};
					const {
						data
					} = await getorderBmInfo(obj);
					if (data.code == 200) {
						this.dddetail = data.data
						this.shadow = data.data.tj
						var thisid = uni.getStorageSync('thisid')
						if (thisid == data.data.id) {
							this.liulan = uni.getStorageSync('liulan')
						} else {
							uni.setStorageSync('liulan', false);
							uni.setStorageSync('thisid', '');
						}
						if (data.data.yhqId) {
							for (var i = 0; i < that.fpdetail.length; i++) {
								if (that.fpdetail[i].id == data.data.yhqId) {
									that.xzTabCur = i
								}
							}
						} else {
							that.xzTabCur = null
						}
						if(data.data.tjhm){
							that.tuijianmas = true
							that.tuijianma = data.data.tjhm
						}
						// if (data.data.tj == false && data.data.tjhm) {
						// 	that.shadow = true
						// }
						// if (data.data.tj == true && data.data.tjhm == null) {
						// 	that.shadow = true
						// }
						// if (data.data.tj == false && !data.data.tjhm) {
						// 	that.shadow = false
						// }
						// if (data.data.tj == true && data.data.tjhm) {
						// 	that.shadow = true
						// }
						// false+推荐码有值  =显示     true+推荐码为null  显示  
						// false+没有值不显示  true+推荐码有值 显示

					} else {
						console.log(data)
						// this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async getkaquan() {
				var that = this;
				try {
					const obj = {

					};
					const {
						data
					} = await getoderYhqlist(obj);
					if (data.code == 200) {
						that.fpdetail = data.data
						for (var i = 0; i < data.data.length; i++) {
							if (data.data[i].type == '1') {
								that.xzTabCur = i
							}
						}
					} else {
						// console.log(data)
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async goPay() {
				var that = this;

				if (that.dddetail.jg < 0) {
					uni.showToast({
						title: '优惠券跟推荐优惠不能小于0',
						icon: 'none'
					})
					return
				}
				if (!that.dddetail.contractSign) {
					uni.showToast({
						title: '请签名',
						icon: 'none'
					})
					return
				}
				if (that.dddetail.rl != '认证通过') {
					uni.showToast({
						title: '请人脸认证',
						icon: 'none'
					})
					return
				}
				try {
					const obj = {
						id: that.sid
					};
					const {
						data
					} = await getorderPay(obj);
					if (data.code == 200) {
						this.pay_info = data.data
						this.wxPay()
					} else {
						// console.log(data)
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			wxPay() { //微信支付
				var that = this
				var zfitem = JSON.parse(decodeURIComponent(that.pay_info))
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
							// console.log('支付成功')
							uni.showToast({
								title: '支付成功',
								icon: 'none'
							});
							// that.showModal('Modal')
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								});
							}, 500);
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
			handleRowClick(index) {
				this.currentIndex = index;
				console.log('当前选中行：', this.tableData[index]);
			},
			toExecute() {
				uni.navigateTo({
					url: '/pages/chooseSchool/goH5?url=' + this.url + '&id=' + this.dddetail.id
				})
			},
			xuanzhong(e) {
				this.xzTabCur = e.currentTarget.dataset.id;
				this.xzid = this.fpdetail[e.currentTarget.dataset.id].id
			},
			tokaquan() {
				uni.navigateTo({
					url: '/pages/my/kaquan?signUpId=' + this.dddetail.id
				})
			}
		}
	};
</script>

<style lang="less">
	page {
		background: #f7f7f7;
	}

	.pagenone {
		height: 100vh;
		overflow: hidden;
	}

	.text-qx {
		border: 1rpx solid #2D9DFB;
		color: #2D9DFB;
		width: 200rpx;
		height: 66rpx;
		line-height: 66rpx;
		text-align: center;
		margin: 20rpx 40rpx 40rpx;
		border-radius: 33rpx;
	}

	.text-qr {
		background-color: #2D9DFB;
		color: #fff;
		width: 200rpx;
		height: 66rpx;
		line-height: 66rpx;
		text-align: center;
		margin: 20rpx 40rpx 40rpx;
		border-radius: 33rpx;
	}

	.hetongimg {
		height: 600rpx;
		overflow-y: auto;
	}
	
	.mout{
		margin:  40rpx auto;
	}

	.hetongtext {
		height: 70rpx;

		text {
			display: block;
			margin-top: 80rpx;
		}
	}

	.yhList {
		height: 81vh;
		overflow: auto;
		background-color: #f7f7f7;
	}

	.dingwei {
		position: relative;

		.bluebottom {
			position: absolute;
			left: 62rpx;
			bottom: 30rpx;
			height: 5rpx;
			background: linear-gradient(90deg, #2D9DFB 0%, rgba(45, 157, 251, 0) 100%);
			border-radius: 3rpx;
		}
	}

	.yhheught {
		max-height: 600rpx;
		overflow-y: auto;
	}

	.yhqbj {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
	}

	.xztext {
		background-color: #2D9DFB;
		width: 60rpx;
		line-height: 40rpx;
		font-size: 22rpx;
		color: #fff;
		position: absolute;
		left: 3rpx;
		top: 4rpx;
		text-align: center;
		border-top-left-radius: 20rpx;
	}

	.kqs_item_left {
		position: relative;
		padding: 20rpx;
		z-index: 11;
		width: 30%;

		.mon {
			color: #2D9DFB;
			margin-top: 20rpx;

			text:first-child {
				font-size: 28rpx;
			}

			text:last-child {
				font-weight: bold;
				font-size: 50rpx;
			}
		}

		.menkan {
			font-size: 24rpx;
			color: #999999;
			padding-top: 15rpx;
		}

		.left_type {
			width: 53rpx;
			height: 17rpx;
			background: linear-gradient(90deg, #C1E3FF 0%, rgba(233, 245, 255, 0) 100%);
			border-radius: 24rpx;
			font-size: 18rpx;
			color: #2D9DFB;
			position: absolute;
			left: 0;
			top: 0;
		}
	}

    .nones{
		display: none;
	}

	.kqs_item_right {
		width: 52%;
		padding: 15rpx;
		z-index: 11;

		text {
			display: block;
		}

		.right_left_bt {
			font-size: 28rpx;
			color: #333333;
		}

		.right_left_time {
			font-size: 24rpx;
			color: #999999;
			margin-top: 10rpx;
		}

		.right_left_day {
			font-size: 24rpx;
			color: #999999;
			line-height: 30rpx;
			padding-top: 20rpx;
		}

		.right_day {
			font-size: 24rpx;
			color: #999999;
			line-height: 30rpx;
			padding-top: 10rpx;
		}
	}

	.right_right {
		margin: 40rpx 20rpx 0 0;
		z-index: 11;

		text {
			width: 128rpx;
			height: 44rpx;
			border-radius: 22rpx;
			border: 1px solid #2D9DFB;
			font-size: 24rpx;
			color: #2D9DFB;
			line-height: 44rpx;
			text-align: center;
			display: block;
		}
	}

	.dingdan {
		border-radius: 20rpx;
	}

	.tuijian {
		font-size: 26rpx !important;
		color: #333 !important;
	}

	.cu-bar .action:first-child {
		margin-left: 0;
	}

	.cu-bar .action:last-child {
		margin-right: 0;
	}

	.text_red {
		font-size: 18rpx;
		color: #FF1F28;
		padding: 0 0 20rpx;
	}

	.text_red2 {
		font-size: 24rpx;
		color: #FF1F28;
	}

	.dd_detail {
		margin-top: 30rpx;
	}

	.dd_detail_topbor {
		border-top: 1rpx solid #eee;
	}

	.dd_inp {
		margin-top: 20rpx;

		input {
			background-color: #F2F2F2;
			height: 88rpx;
			border-radius: 12rpx;
			padding: 0 20rpx;
		}
	}

	.dd_img {
		width: 260rpx;
		height: 170rpx;
		overflow: hidden;
		margin: 30rpx 30rpx 15rpx;
	}

	.height120 {
		height: 120rpx;
	}
	
	.hetong{
		border-bottom: 1rpx solid #eee;
		padding-bottom: 20rpx;
	}

	.nav_items {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 25rpx 20rpx;

		.bt {
			font-size: 32rpx;
			color: #333333;
			padding-bottom: 20rpx;
		}
	}

	.fkbot {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 100rpx;
		line-height: 100rpx;
		padding: 0 3%;
		z-index: 111;

		.gopaytext {
			color: #fff;
			width: 230rpx;
			line-height: 66rpx;
			height: 66rpx;
			background: #2D9DFB;
			border-radius: 33rpx;
			font-size: 28rpx;
			display: block;
			text-align: center;
		}
	}

	.tuijians {
		z-index: 11111;
	}

	.touhui {
		
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;
	}
	.touhuibot{
		border-bottom: 1rpx solid #eee;
	}
	.fknav {
		font-size: 26rpx;
		line-height: 60rpx;
	}

	.margin-bottom20 {
		margin-bottom: 20rpx;
	}

	.padding-bottom20 {
		padding-bottom: 20rpx;
	}

	.item_top_left {
		line-height: 50rpx;
		// white-space: nowrap;
		// /* 防止文本换行 */
		// overflow: hidden;
		// /* 隐藏溢出内容 */
		// text-overflow: ellipsis;
		/* 显示省略号 */
		width: 100%;
		align-items: baseline;
	}

	.top_bt {
		font-size: 28rpx;
		color: #333333;
		padding-left: 10rpx;
	}

	.top_icon {
		font-size: 32rpx;
		color: #2D9DFB;
	}

	.item_top_right text {
		font-size: 28rpx;
		padding-right: 20rpx;
	}

	.item_center {
		background-color: #F4F4F4;
		padding: 20rpx;
		border-radius: 20rpx;
		margin: 20rpx 0;

		text {
			font-size: 22rpx;
			color: #333333;
			line-height: 50rpx;
			display: block;
		}
	}

	.item_bottom button {
		padding: 0 20rpx;
		height: 56rpx;
		background: #FFFFFF;
		border-radius: 28rpx;
		border: 1px solid #2D9DFB;
		line-height: 54rpx;
		color: #2D9DFB;
		font-size: 28rpx;
		font-weight: 400;
		margin: 0;
	}

	.container {
		padding: 20rpx;
	}

	/* 表格基础样式 */
	.table {
		background-color: #fff;
		border-radius: 10rpx;
		overflow: hidden;
		border: 1rpx solid #eee;
	}

	/* 行样式 */
	.tr {
		display: flex;
		border-bottom: 1rpx solid #eee;
		transition: background-color 0.3s;

	}

	.tr:last-child {
		border: none;
		color: #333;
	}

	/* 表头样式 */
	.header {}

	/* 单元格公共样式 */
	.th,
	.td {
		flex: 1;
		padding: 20rpx;
		min-width: 0;
		word-break: break-all;
		text-align: center;
		border-right: 1rpx solid #eee;
	}

	.td:last-child {
		color: #2D9DFB;
		border-right: none;
	}

	.th:last-child {
		color: #333;
		border-right: none;
	}

	/* 表头特定样式 */
	.th {
		color: #333;
	}

	/* 数据行点击效果 */
	.active {
		background-color: #ecf5ff;
	}

	/* 最后一列颜色强调 */
	.td:nth-child(4) {
		color: #2D9DFB;
	}
</style>