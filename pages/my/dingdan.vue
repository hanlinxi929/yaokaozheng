<template>
	<view>
		<view class="">
			<scroll-view scroll-x class="bg-white nav text-center">
				<view class="cu-item nav_text" :class="index==TabCur?'text-blue xz':''" v-for="(item,index) in tbnav"
					:key="index" @tap="tabSelect" :data-id="index">
					{{item.text}}
				</view>
			</scroll-view>
		</view>
		<view class="navs width96" v-if="fpdetail.length">
			<scroll-view class="navheight yhList" scroll-y @scrolltolower='Reachbottom'>
				<view class="nav_items width100 mt_20" v-for="(item,index) in fpdetail" :key="index">
					<view class="border-bottom text-gray bianhao">订单编号：{{item.id}}</view>
					<view class="item_top flex justify-between toubu">
						<view class="item_top_left flex align-center justify-start">
							<text class="cuIcon-formfill top_icon"></text>
							<text class="top_bt">{{item.sign}}</text>
						</view>
						<view class="item_top_right">
							<text class="textblue" v-if="TabCur==0">待付款</text>
							<text class="textblue" v-if="TabCur==1">未付款</text>
							<text class='textorange'  v-if="TabCur==2">已付款</text>
						</view>
					</view>
					<view class="item_center width100">
						<text>报名学员：{{item.userName}}</text>
						<text>报名时间：{{item.createTime?item.createTime:''}}</text>
						<text>订单时间：{{item.updateTime?item.updateTime:''}}</text>
					</view>
					<view class="item_bottom flex justify-between width100">
						<view v-if="TabCur==0">
							<text>待支付：</text>
							<text class="text-red">￥{{item.jg}}</text>
						</view>
						<view v-if="TabCur==1||TabCur==2">
							<text>共计：</text>
							<text class="text-red">￥{{item.jg}}</text>
						</view>
						<view v-else>
							<text></text>
							<text class="text-red"></text>
						</view>
						<view class="flex justify-end getbtns">
							<button v-if="TabCur==2" @click.stop="gofapiao(item.id,0,item.jg)">查看发票</button>
							<button class="qr" v-if="TabCur==1||TabCur==2" @click.stop="$api.toPage('mychildren/dingdan_detail?sid='+item.id+'&TabCur='+TabCur+'&orderType='+item.orderType)">查看详情</button>
							<button v-if="TabCur==0" @click.stop="$api.toPage('mychildren/dingdan_detail?sid='+item.id+'&TabCur='+TabCur)">去支付</button>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-else class="e-width quesheng">
			<image :src="imgUrl+'zanwu.png'" mode="widthFix"></image>
			<text>暂无内容</text>
		</view>
	</view>
</template>

<script>
	import {
		imgUrl,
		baseUrl
	} from "@/common/config.default.js";
	import {
		getMyorderPageList,
		getorderBmInfo,
		getZcInvoice
	} from "@/api/my.js";
	export default {
		data() {
			return {
				TabCur: 0,
				pay_info: '',
				scrollLeft: 0,
				pageSize: 10,
				pageNum: 1,
				hasNext: false,
				page: 1,
				fpdetaillen: 0,
				baseUrl:'',
				imgUrl:'',
				tbnav: [{
						id: 0,
						text: '待付款'
					},
					{
						id: 2,
						text: '未付款'
					},
					{
						id: 1,
						text: '已付款'
					}
				],
				fpdetail: []
			};
		},
		onShow() {
			this.getList()
			this.baseUrl = baseUrl
			this.imgUrl = imgUrl
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
			Reachbottom() {
				if (this.hasNext) {
					this.pageNum++;
					this.getList()
				}
			},
			async gofapiao(id,orderType,jg){
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
						if(data.data!=''){
							this.$api.toPage('invoice/lookinvoice?fapiaodetail='+encodeURIComponent(JSON.stringify(data
								.data))+'&jg='+jg+'&orderType'+orderType);
						}else{
							this.$api.toPage('invoice/sqinvoice?id='+id+'&orderType='+orderType+'&jg='+jg);
						}
					} else {
						console.log(data)
						// this.$api.msg(data.msg)
					}
				} catch (e) {
				
				}
			},
			
			async getList() {
				var that = this
				try {
					const obj = {
						bs: that.tbnav[that.TabCur].id,
						pageSize: that.pageSize, //个数
						pageNum: that.pageNum //页数
					};
					const {
						data
					} = await getMyorderPageList(obj);
					if (data.code == 200) {
						this.fpdetaillen = data.rows.length
						this.fpdetail = this.page == 1 ? data.rows : [...this.fpdetail, ...data.rows];
						this.hasNext = (data.total > data.current_page);
					} else {
						console.log(data)
						// this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.getList()
			},
			//验证跳转
			handleToPageOtherOrder(url) {
				// if (!this.token) {
				// 	this.$needLogin();
				// 	return false;
				// }
				this.$api.toPage(url);
			},
		}
	}
</script>

<style lang="less">
	page {
		background: #f7f7f7;
	}

	.navheight {
		height: 83vh;
	}

	.nav_items {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 25rpx 20rpx;
	}

	.item_top_left {
		line-height: 50rpx;
		// white-space: nowrap;
		// /* 防止文本换行 */
		// overflow: hidden;
		// /* 隐藏溢出内容 */
		// text-overflow: ellipsis;
		/* 显示省略号 */
		width: 80%;
		align-items: baseline;
	}

	.yhList {
		height: 93vh;
		overflow: auto;
	}

	.bianhao {
		line-height: 60rpx;
		margin-bottom: 20rpx;
		font-size: 28rpx;
		padding-bottom: 10rpx;
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
	
	.toubu{
		align-items: baseline;
	}

	.item_top_right text {
		font-size: 28rpx;
		padding-right: 20rpx;
	}

	.textorange {
		color: #F98110;
	}

	.textblue {
		color: #2D9DFB;
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
		margin: 0 0 0 10rpx;
	}
	.item_bottom .qr {
		padding: 0 20rpx;
		height: 56rpx;
		background: #FFFFFF;
		border-radius: 28rpx;
		background: #2D9DFB; 
		line-height: 54rpx;
		color: #fff;
		font-size: 28rpx;
		font-weight: 400;
		margin: 0 0 0 10rpx;
	}

	.nav_text {
		width: 33.3%;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 28rpx;
		margin: 0 !important;
		padding: 0 !important;
	}

	.xz {
		background-color: #E6F4FF;
		color: #2D9DFB;
	}

	.btn {
		background: #2D9DFB;
		border-radius: 36rpx;
		color: #fff;
		font-size: 28rpx;
		line-height: 72rpx;
		position: fixed;
		bottom: 20rpx;
		left: 2%;
	}
</style>