<template>
	<view>
		<view class="navs width96">
			<scroll-view class="navheight" scroll-y>
				<view class="nav_items width100 mt_20" v-for="(item,index) in fpdetail" :key="index">
					<view class="item_top flex justify-between align-center">
						<view class="item_top_left flex align-center justify-start">
							<text class="cuIcon-formfill top_icon"></text>
							<text class="top_bt" v-if='item.sourceType==0'>学历提升</text>
							<text class="top_bt" v-if='item.sourceType==1'>资格考试</text>
							<text class="top_bt" v-if='item.sourceType==2'>升学规划</text>
							<text class="top_bt" v-if='item.sourceType==3'>就业服务类</text>
							<text class="top_bt" v-if='item.sourceType==4'>下载学习</text>
						</view>
					</view>
					<view class="item_center width100">
						<text>咨询学校：{{item.sourceName}}</text>
						<text>咨询时间：{{item.createTime}}</text>
						<text>咨询费用：￥{{item.actualPayment}}</text>
					</view>
					<view class="flex justify-end getbtns">
						<button @click.stop="gofapiao(item.id,1,item.actualPayment)">查看发票</button>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- <view class="btn flex justify-center align-center width96">
			<text class="cuIcon-calendar"></text>
			<text class="p_left10" @click.stop="handleToPageOtherOrder('invoice/kpdingdan')">申请开票</text>
		</view> -->
	</view>
</template>

<script>
import {
		imgUrl,
		baseUrl
	} from "@/common/config.default.js";
	import {
		getConsult,
		getZcInvoice
	} from "@/api/my.js";
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				tbnav: [{
						id: 0,
						text: '已申请'
					},
					{
						id: 1,
						text: '已开票'
					}
				],
				fpdetail: []
			};
		},
		onShow() {
			this.getList()
		},
		methods: {
			async getList() {
				var that = this
				try {
					const obj = {
						// pageSize: that.pageSize, //个数
						// pageNum: that.pageNum //页数
					};
					const {
						data
					} = await getConsult(obj);
					if (data.code == 200) {
						this.fpdetaillen = data.data.length
						this.fpdetail = data.data
					} else {
						console.log(data)
						// this.$api.msg(data.msg)
					}
				} catch (e) {
			
				}
			},
			async gofapiao(id,orderType,jg){
				var that = this
				try {
					const obj = {
						sourceId: id,
						orderType: 1, //申报类型  0-报名  1-咨询
					};
					const {
						data
					} = await getZcInvoice(obj);
					if (data.code == 200) {
						data.data.orderType = 1
						if(data.data!=''){
							this.$api.toPage('invoice/lookinvoice?fapiaodetail='+encodeURIComponent(JSON.stringify(data
								.data))+'&jg='+jg+'&id='+id+'&orderType='+data.data.orderType);
						}else{
							this.$api.toPage('invoice/sqinvoice?id='+id+'&orderType='+data.data.orderType+'&jg='+jg);
						}
					} else {
						console.log(data)
						// this.$api.msg(data.msg)
					}
				} catch (e) {
				
				}
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

	.getbtns button {
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

	.nav_text {
		width: 50%;
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