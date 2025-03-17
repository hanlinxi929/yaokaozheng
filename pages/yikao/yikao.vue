<template>
	<view class="con">
		<image :src="imgUrl+'img00.png'" mode="widthFix" class="headerbj"></image>
		<text class="heightbt">易考专区</text>
		<view class="hdbt">
			<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="index==TabCur?'blues':''" v-for="(item,index) in xqitems" :key="index"
					@tap="tabSelect" :data-id="item.id" :data-index='index'>
					<view class="bjblue"></view>
					<text class="textblue">{{item.text}}</text>
				</view>
			</scroll-view>
		</view>
		<view class="" v-if="fpdetail.length">
			<scroll-view class="navheight">
				<view class='navimg bg-white' v-for="(item,index) in fpdetail" :key="index">
					<view class="itemimg">
						<image :src="baseUrl+item.posterUrl" mode="aspectFill"
							@click="getdetail(item.jumpId)"></image>
					</view>
					<text>{{item.hbName}}</text>
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
		getYkmySelf, //易考列表
		getykInfo
	} from "@/api/login.js";
	export default {
		data() {
			return {
				TabCur: 0,
				xzid: 1,
				index: 0,
				scrollLeft: 0,
				imgUrl: '',
				baseUrl: '',
				pageSize: 10,
				pageNum: 1,
				hasNext: false,
				page: 1,
				fpdetaillen: 0,
				fpdetail: '',
				oneId: '200',
				twoId: '',
				xqitems: [{
						id: 1,
						type: 'img',
						text: '学历提升',
						zid: '200'
					},
					{
						id: 2,
						type: 'img',
						text: '资格考试',
						zid: '208'
					},
					{
						id: 3,
						type: 'img',
						text: '升学规划',
						zid: '223'
					},
					{
						id: 4,
						type: 'img',
						text: '就业服务',
						zid: '225'
					},
					{
						id: 5,
						type: 'img',
						text: '学习下载',
						zid: ''
					}
				],
				navimgs: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: '/static/img25.png'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
			}
		},
		onLoad() {
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
		},
		onShow() {
			this.getList()
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
			Reachbottom() {
				if (this.hasNext) {
					this.pageNum++;
					this.getList()
				}
			},
			tochild(id, oneId, twoId) {
				if (twoId == '276' || twoId == '277' || twoId == '227' || twoId == '278' || twoId == '279' || twoId ==
					'280' || twoId == '281' || twoId == '275' || twoId == '211' || twoId == '224') {
					this.$api.toPage('index/ghdetail?sid=' + id + '&oneId=' + oneId + '&oid=' + twoId)
				} else if (twoId == '238') {
					this.$api.toPage('index/kscar?sid=' + id + '&oneId=' + oneId + '&oid=' + twoId)
				} else if (twoId == '237') {
					this.$api.toPage('index/wangke?id=' + id + '&oneId=' + oneId + '&oid=' + twoId)
				} else {
					this.$api.toPage('index/schooldetail?sid=' + id + '&oid=' + twoId + '&oneId=' + oneId)
				}

			},
			async getdetail(jumpId) {

				var that = this
				try {
					const obj = {
						type: this.xzid,
						id:jumpId
					};
					const {
						data
					} = await getykInfo(obj);
					if (data.code == 200) {
						// this.fpdetail = data.data
						this.tochild(data.data.id,data.data.parentId,data.data.jumpId)
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
						type: this.xzid,
						pageSize: that.pageSize, //个数
						pageNum: that.pageNum //页数 
					};
					const {
						data
					} = await getYkmySelf(obj);
					if (data.code == 200) {
						// this.fpdetail = data.data
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
				this.TabCur = e.currentTarget.dataset.index;
				this.xzid = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.oneId = e.currentTarget.dataset.oneId
				this.getList()
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f7f7f7;
	}

	.hdbt {
		padding-top: 12vh;
		width: 100%;
	}

	.blues {
		position: relative;
	}

	.blues .bjblue {
		background-image: radial-gradient(rgba(45, 157, 251, 0.2) 25%, rgba(45, 157, 251, 0.1) 35%, rgba(255, 255, 255, 0) 90%);
		width: 100%;
		height: 40rpx;
		position: absolute;
		bottom: 10rpx;
		left: 0;
	}

	.blues .textblue {
		color: #2D9DFB;
		font-size: 28rpx;
	}

	.navheight {
		height: 80vh;
	}

	.navimg {
		width: 96%;
		height: 445rpx;
		margin: 10rpx auto 20rpx;
		border-radius: 20rpx;

		text {
			line-height: 90rpx;
			padding-left: 20rpx;
			font-size: 28rpx;
		}
	}

	.navimg .itemimg {
		border-radius: 20rpx;
		width: 100%;
		height: 360rpx;
		overflow: hidden;

		image {
			width: 100%;
		}
	}
</style>