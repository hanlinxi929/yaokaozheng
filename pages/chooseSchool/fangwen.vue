<template>
	<view>
		<view class="sysousuo">
			<scroll-view scroll-x class="bg-white nav text-center">
				<view class="cu-item nav_text" :class="index==TabCur?'text-blue text-blue xz':''"
					v-for="(item,index) in titleList" :key="index" @tap="tabSelect" :data-id="item.id">
					{{item.name}}
				</view>
			</scroll-view>
		</view>
		<view class="lists width96" v-if="schoolList.length">
			<scroll-view scroll-y @scrolltolower='Reachbottom' class="yhList">
				<view class="listitem" v-for="(item,index) in schoolList" :key="index" @click="getdetail(item.sourceId)">
					<view class="itemimg bg-white">
						<image :src="baseUrl+item.images" mode="widthFix"></image>
					</view>
					<view class="lisettext flex justify-between align-center bg-white">
						<text>{{item.sourceName}}</text>
						<view class="texticon">
							<image :src="imgUrl+'img31.png'" mode="widthFix"></image>
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
		getCollectInfoDetail
	} from "@/api/my.js";
	import {
		getCollectByUserId
	} from "@/api/index.js";
	export default {
		data() {
			return {
				imgUrl: '',
				sc: 0,
				titleList: [{
						name: '我的收藏',
						id: 0

					},
					{
						name: '浏览记录',
						id: 1
					}
				],
				schoolList: [],
				index: 0,
				TabCur: 0,
				scrollLeft: 0,
				type: 0,
				token: '',
				pageSize: 10,
				pageNum: 1,
				hasNext: false,
				baseUrl: ""
			}
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
			if (uni.getStorageSync('token')) {
				this.schoolList = ''
				this.token = uni.getStorageSync('token');
				this.getCollectByUserId()
			}
		},
		onLoad(option) {
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
		},
		methods: {
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
			async getdetail(sourceId) {
			
				var that = this
				try {
					const obj = {
						sourceId:sourceId,
						state: this.xzid,
						type:0
					};
					const {
						data
					} = await getCollectInfoDetail(obj);
					if (data.code == 200) {
						// this.fpdetail = data.data
						this.tochild(data.data.id,data.data.parentId,jumpId)
					} else {
						console.log(data)
						// this.$api.msg(data.msg)
					}
				} catch (e) {
			
				}
			},
			Reachbottom() {
				if (this.hasNext) {
					this.pageNum++;
					this.getCollectByUserId()
				}
			},
			tabSelect(e) {
				console.log(e)
				this.TabCur = e.currentTarget.dataset.id;
				this.getCollectByUserId()
			},
			async getCollectByUserId() {
				try {
					const obj = {
						state: this.TabCur, //0-收藏  1-浏览记录
						pageNum: this.pageNum, //页数
						pageSize: this.pageSize, //个数
					};
					const {
						data
					} = await getCollectByUserId(obj);
					if (data.code == 200) {
						console.log(data)
						this.schoolList = this.pageNum == 1 ? data.rows : [...this.schoolList, ...data.rows];
						this.hasNext = (data.total > data.pageNum);
					} else {
						console.log(data)
						this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f7f7f7;
	}
	
	.xz {
		background-color: #E6F4FF;
		color: #2D9DFB;
	}

	.nav_text {
		width: 50%;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 28rpx;
		margin: 0 !important;
		padding: 0 !important;
	}

	.sysousuo {
		margin-bottom: 20rpx;
	}

	.yhList {
		height: 81vh;
		overflow: auto;
	}

	.listitem {
		width: 49%;
		float: left;
	}

	.cu-bar .action:first-child {
		margin: 0;
	}

	.wid {
		width: 30%;
	}

	.textblue {
		color: #2D9DFB;
	}

	.didian {
		width: 31rpx;
		margin-right: 10rpx;
	}

	.itemimg {
		width: 320rpx;
		height: 240rpx;
		border-top-right-radius: 20rpx;
		border-top-left-radius: 20rpx;
		margin: 20rpx auto 0;
		overflow: hidden;
	}

	.lisettext {
		width: 320rpx;
		margin: 0 auto 10rpx;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 20rpx;
		border-bottom-right-radius: 20rpx;
		border-bottom-left-radius: 20rpx;
		font-size: 28rpx;
	}

	.texticon {
		width: 32rpx;
		height: 32rpx;
	}
</style>