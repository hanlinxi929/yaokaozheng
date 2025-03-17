<template>
	<view>
		<!-- <view class="cu-bar search sysousuo width96 mt_10" v-if="sc==1||sc==3">
			<view class="cu-bar search width100">
				<view class="search-form round width100"><text class="cuIcon-search"></text><input
						:adjust-position="false" type="text" placeholder="请输入搜索关键词" confirm-type="search"
						:data-event-opts="[['focus',[['InputFocus',['$event']]]],['blur',[['InputBlur',['$event']]]]]"
						bindfocus="__e" bindblur="__e" /></view>
			</view>
		</view> -->
		<!-- <view class="sysousuo bg-white" v-if="sc==2||sc==4">
			<view class="cu-bar search width96 mt_10">
				<view class="action wid flex justify-start align-center">
					<image :src="imgUrl+'didian.png'" mode="widthFix" class="didian"></image>
					<picker class="width100" @change="PickerChange" :value="index" :range="cityList"
						:range-key="'nodeName'">
						<view class="picker width100">
							{{index>-1?cityList[index].nodeName:cityList[0].nodeName}}
						</view>
					</picker>

					<text class="cuIcon-triangledownfill p_left10"></text>
				</view>
				<view class="cu-bar search width100">
					<view class="search-form round"><text class="cuIcon-search"></text><input :adjust-position="false"
							type="text" placeholder="请输入搜索关键词" confirm-type="search"
							:data-event-opts="[['focus',[['InputFocus',['$event']]]],['blur',[['InputBlur',['$event']]]]]"
							bindfocus="__e" bindblur="__e" /></view>
				</view>
			</view>
		</view> -->
		<view v-if="(sc==2||sc==3||sc==5)&&tabList.length" class="sysousuo">
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="index==TabCur?'textblue cur':''" v-for="(item,index) in tabList"
					:key="index" @tap="tabSelect" :data-id="index" :data-type="item.typeName">
					{{item.typeName}}
				</view>
			</scroll-view>
		</view>

		<view class="quesheng e-width" v-if="!sjListlen">
			<image :src="imgUrl+'dd.png'" mode="widthFix"></image>
			<text class="text-gray">暂无内容</text>
		</view>

		<view class="lists width96">
			<scroll-view scroll-y @scrolltolower='Reachbottom' class="yhList" v-if="oid!='237'">
				<view class="listitem" v-for="(item,index) in sjList" :key="index" @click.stop="tochild(item.id)">
					<view class="itemimg">
						<image :src="baseUrl+item.schoolHead" mode="widthFix"></image>
					</view>
					<view class="lisettext flex justify-between align-center bg-white">
						<text>{{item.deptName}}</text>
						<view class="texticon">
							<image :src="imgUrl+'img31.png'" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="listitem" v-for="(item,index) in sjList" :key="index" @click.stop="tochild(item.id)" v-else>
				<view class="itemimg">
					<image :src="baseUrl+item.schoolHead" mode="widthFix"></image>
				</view>
				<view class="lisettext flex justify-between align-center bg-white">
					<text>{{item.deptName}}</text>
					<view class="texticon">
						<image :src="imgUrl+'img31.png'" mode="widthFix"></image>
					</view>
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
		getTwoType,
		getQualificationList,
		getDetailInfo,
		getCity,
		getwkxx
	} from "@/api/index.js";
	export default {
		data() {
			return {
				imgUrl: '',
				sc: 0,
				sjList: [],
				tabList: [],
				index: 0,
				TabCur: 0,
				scrollLeft: 0,
				type: 0,
				pageSize: 10,
				pageNum: 1,
				hasNext: false,
				oid: 1,
				page: 1,
				odeptName: "",
				typeName: '',
				cityList: '',
				baseUrl: "",
				sjListlen: 0,
				oneId: ''
			}
		},

		onLoad(option) {
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
			this.sc = option.type
			var oid = option.id
			this.oid = option.id
			this.oneId = option.oneId

			if (option.oneId == '200') {
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
			}
			if (option.oneId == '208') {
				if (oid == '209') {
					this.odeptName = '建筑类'
				} else if (oid == '210') {
					this.odeptName = '特种作业类'
				} else if (oid == '211') {
					this.odeptName = '第三方职业 技能鉴定'
				} else if (oid == '212') {
					this.odeptName = '工程职称评审'
				} else if (oid == '213') {
					this.odeptName = '职业能力提升'
				} else if (oid == '214') {
					this.odeptName = '继续教育'
				}
			}
			if (option.oneId == '223') {
				if (oid == '224') {
					this.odeptName = '出国留学'
				}
			}
			if (option.oneId == '225') {
				if (oid == '281') {
					this.odeptName = '企业招聘'
				}
			}
			if (option.oneId == '0') {
				if (oid == '237') {
					this.odeptName = '网课学习'
				}
			}

		},
		onShow() {
			if (uni.getStorageSync('token')) {
				this.token = uni.getStorageSync('token');

			}
			// try {
			// 
			// } catch (e) {
			// 	//TODO handle the exception
			// }
			// if (this.sc == 2 || this.sc == 4) {
			// 	this.getCityList()
			// 	console.log('this.getTwoTypeLists')
			// } else {

			// }
			if (this.oid != '237') { //不是网课学习时
				// this.getTwoTypeLists()
				this.getList()
			} else {

				this.getwkxxlist()
			}
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
			tochild(itemid) {
				if (this.oid == '237') {
					this.$api.toPage('index/wangke?oneId=0&id=237&xxid=' + itemid)
				} else {
					this.$api.toPage('index/schooldetail?sid=' + itemid + '&oid=' + this.oid + '&oneId=' + this.oneId)
				}
			},
			PickerChange(e) {
				this.index = e.detail.value
				this.getList()
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.getList(e.currentTarget.dataset.type)
			},
			Reachbottom() {
				if (this.hasNext) {
					this.pageNum++;
					this.getList()
				}
			},
			async getCityList() {
				try {
					const obj = {

					};
					const {
						data
					} = await getCity(obj);

					if (data.code == 200) {
						if (data.data) {
							this.cityList = data.data
						}
						this.getTwoTypeLists()
					} else {
						console.log(data)
						// this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async getwkxxlist() {
				var that = this
				try {
					const obj = {

					};
					const {
						data
					} = await getwkxx(obj);
					if (data.code == 200) {
						this.sjListlen = data.data.length
						this.sjList = data.data
					} else {
						console.log(data)
						// this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async getTwoTypeLists() {
				var that = this
				try {
					const obj = {
						deptName: that.odeptName, //二级类目  成人中专 在职研究生等等
					};
					const {
						data
					} = await getTwoType(obj);

					if (data.code == 200) {
						if (data.data[0] != null) {
							that.tabList = data.data
							that.typeName = data.data[0].typeName
						}
						that.getList()
					} else {
						console.log(data)
						// this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			},
			async getList() {
				var that = this
				var citytype = '';
				if (that.cityList) {
					citytype = that.cityList[oindex].nodeName
				}
				var oindex = this.index
				try {
					const obj = {
						cityName: citytype, //所在省市
						typeName: that.typeName, //所属类型 （成人教育下  专升本  在职研究生等）
						deptName: that.odeptName, //二级类目  成人中专 在职研究生等等
						pageSize: that.pageSize, //个数
						pageNum: that.pageNum //页数
					};
					const {
						data
					} = await getQualificationList(obj);
					if (data.code == 200) {
						this.sjListlen = data.rows.length
						this.sjList = this.page == 1 ? data.rows : [...this.sjList, ...data.rows];
						this.hasNext = (data.total > data.current_page);
					} else {
						console.log(data)
						// this.$api.msg(data.msg)
					}
				} catch (e) {

				}
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f7f7f7;
	}

	.sysousuo {
		margin-bottom: 20rpx;
	}

	.listitem {
		width: 49%;
		float: left;
	}

	.cu-bar .action:first-child {
		margin: 0;
	}

	.yhList {
		height: 81vh;
		overflow: auto;
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
		height: 230rpx;
		border-top-right-radius: 20rpx;
		border-top-left-radius: 20rpx;
		margin: 20rpx auto 0;
		overflow: hidden;
	}

	.quesheng {
		text-align: center;
		line-height: 60rpx;

		image {
			width: 150rpx;
			margin: 100rpx auto 50rpx;
		}
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