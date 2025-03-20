<template>
	<view class="con">
		<image src="/static/img00.png" mode="widthFix" class="headerbj"></image>
		<text v-if="scrollTop<100" class="heightbt mt_20">首页</text>
		<view class="bg-white topheight width100" v-if="scrollTop>=100">
			<text>首页</text>
		</view>
		<view class="cu-bar search sysousuo">
			<view class="cu-bar search">
				<view class="search-form round"><text class="cuIcon-search"></text><input :adjust-position="false"
						type="text" placeholder="请输入关键词" confirm-type="search"
						:data-event-opts="[['focus',[['InputFocus',['$event']]]],['blur',[['InputBlur',['$event']]]]]"
						bindfocus="__e" bindblur="__e" /></view>
				<view class="action"><button class="cu-btn bg-white sousuotext shadow-blur round">搜索</button></view>
			</view>
		</view>
		<view class="lunbo">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true"
				:circular="true" :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="baseUrl+item.posterUrl" mode="aspectFill"></image>
					<!-- <video :src="item.posterUrl" autoplay loop muted :show-play-btn="false" :controls="false"
						objectFit="cover" v-if="item.type=='video'"></video> -->
				</swiper-item>
			</swiper>
		</view>
		<view class="cu-card article mt_30" :class="isCard?'no-card':''">
			<view class="biaoti mt_20">
				<view class="zuotubiao"></view>
				<text>学历提升</text>
			</view>
			<view class="cu-items shadow xlts">
				<view class="items-box boxs" v-for="(item,index) in xqitems" :key="index"
					@click.stop="handleToPageOtherOrder(item.topage)">
					<view class="imgbox">
						<image :src="item.url"></image>
					</view>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<view class="cu-card article" :class="isCard?'no-card':''">
			<view class="biaoti ">
				<view class="zuotubiao"></view>
				<text>资格考试</text>
			</view>
			<view class="cu-items shadow xlts">
				<view class="items-box boxs" v-for="(item,index) in xqitems1" :key="index"
					@click.stop="handleToPageOtherOrder(item.topage)">
					<view class="imgbox">
						<image :src="item.url"></image>
					</view>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<view class="cu-card article" :class="isCard?'no-card':''">
			<view class="biaoti ">
				<view class="zuotubiao"></view>
				<text>升学规划</text>
			</view>
			<view class="cu-items shadow xlts">
				<view class="items-box boxs" v-for="(item,index) in xqitems2" :key="index"
					@click.stop="handleToPageOtherOrder(item.topage)">
					<view class="imgbox">
						<image :src="item.url"></image>
					</view>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<view class="cu-card article" :class="isCard?'no-card':''">
			<view class="biaoti ">
				<view class="zuotubiao"></view>
				<text>就业服务类</text>
			</view>
			<view class="cu-items shadow xlts">
				<view class="items-box boxs" v-for="(item,index) in xqitems3" :key="index"
					@click.stop="handleToPageOtherOrder(item.topage)">
					<view class="imgbox">
						<image :src="item.url"></image>
					</view>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<view class="cu-card article" :class="isCard?'no-card':''">
			<view class="biaoti ">
				<view class="zuotubiao"></view>
				<text>学习下载</text>
			</view>
			<view class="cu-items shadow xlts">
				<view class="items-box boxs" v-for="(item,index) in xqitems4" :key="index"
					@click.stop="handleToPageOtherOrder(item.topage)">
					<view class="imgbox">
						<image :src="item.url"></image>
					</view>
					<text>{{item.text}}</text>
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
		gethomeSetting
	} from "@/api/index.js";
	export default {
		data() {
			return {
				title: 'Hello',
				imgUrl: '',
				baseUrl:'',
				xqitems: [{
					    oneId:'200',
						id: '201',
						otype: 1,
						url: imgUrl + 'img20.png',
						text: '成人中专',
						topage: 'chooseSchool/chooseSchool?type=1&oneId=200&id=201'
					},
					{
						oneId:'200',
						id: '254',
						otype: 2,
						url: imgUrl + 'img24.png',
						text: '自学考试',
						topage: 'chooseSchool/chooseSchool?type=2&oneId=200&id=254'
					},
					{
						oneId:'200',
						id: '272',
						otype: 2,
						url: imgUrl + 'img18.png',
						text: '成人教育',
						topage: 'chooseSchool/chooseSchool?type=2&oneId=200&id=272'
					},
					{
						oneId:'200',
						id: '273',
						otype: 3,
						url: imgUrl + 'img05.png',
						text: '开放教育',
						topage: 'chooseSchool/chooseSchool?type=3&oneId=200&id=273'
					},
					{
						oneId:'200',
						id: '274',
						otype: 3,
						url: imgUrl + 'img15.png',
						text: '统招升本',
						topage: 'chooseSchool/chooseSchool?type=3&oneId=200&id=274'
					},
					{
						oneId:'200',
						id: '275',
						otype: 2,
						url: imgUrl + 'img02.png',
						text: '研究生报考',
						topage: 'index/ghdetail?type=1&oneId=200&id=275&onetype=0'
					},
				],
				xqitems1: [{
						oneId:'208',
						id: '209',
						type: 3,
						url: imgUrl + 'img01.png',
						text: '建筑类',
						topage: 'zigeChooseSchool/chooseSchool?type=3&oneId=208&id=209'
					},
					{
						oneId:'208',
						id: '210',
						type: 3,
						url: imgUrl + 'img11.png',
						text: '特种兵作业',
						topage: 'zigeChooseSchool/chooseSchool?type=3&oneId=208&id=210'
					},
					{
						oneId:'208',
						id: '211',
						type: 'img',
						url: imgUrl + 'img14.png',
						text: '第三方职业 技能鉴定',
						topage: 'index/ghdetail?type=3&oneId=208&id=211&name=第三方职业技能鉴定'
					},
					{
						oneId:'208',
						id: '212',
						type: 3,
						url: imgUrl + 'img13.png',
						text: '工程职称评审',
						topage: 'zigeChooseSchool/chooseSchool?type=3&oneId=208&id=212'
					},
					{
						oneId:'208',
						id: '213',
						type: 3,
						url: imgUrl + 'img23.png',
						text: '职业能力提升',
						topage: 'zigeChooseSchool/chooseSchool?type=3&oneId=208&id=213'
					},
					{
						oneId:'208',
						id: '214',
						type: 3,
						url: imgUrl + 'img22.png',
						text: '继续教育',
						topage: 'zigeChooseSchool/chooseSchool?type=3&oneId=208&id=214'
					},
				],
				xqitems2: [{
						oneId:'223',
						id: '',
						type: 'img',
						url: imgUrl + 'img16.png',
						text: 'AI志愿填报',
						topage: 'chooseSchool/qianming'
					},
					{
						oneId:'223',
						id: '227',
						type: 'img',
						url: imgUrl + 'img06.png',
						text: '高考志愿规划',
						topage: 'index/ghdetail?oneId=223&id=227&name=高考志愿规划'
					},
					{
						oneId:'223',
						id: '224',
						type: 3,
						url: imgUrl + 'img03.png',
						text: '出国留学',
						topage: 'index/ghdetail?type=1&oneId=223&id=224&name=出国留学'
					}
				],
				xqitems3: [{
						oneId:'225',
						id: '276',
						type: 'img',
						url: imgUrl + 'img09.png',
						text: '央国企培训',
						topage: 'index/ghdetail?oneId=225&id=276&name=央国企培训'
					},
					{
						oneId:'225',
						id: '277',
						type: 'img',
						url: imgUrl + 'img07.png',
						text: '教室招聘培训 ',
						topage: 'index/ghdetail?oneId=225&id=277&name=教室招聘培训'
					},
					{
						oneId:'225',
						id: '278',
						type: 'img',
						url: imgUrl + 'img21.png',
						text: '国省考 公务员培训',
						topage: 'index/ghdetail?oneId=225&id=278&name=国省考公务员培训'
					},
					{
						oneId:'225',
						id: '279',
						type: 'img',
						url: imgUrl + 'img08.png',
						text: '事业单位培训',
						topage: 'index/ghdetail?oneId=225&id=279&name=事业单位培训'
					},
					{
						oneId:'225',
						id: '280',
						type: 'img',
						url: imgUrl + 'img04.png',
						text: '军队文职培训',
						topage: 'index/ghdetail?oneId=225&id=280&name=军队文职培训'
					},
					{
						oneId:'225',
						id: '281',
						type: 'img',
						url: imgUrl + 'img10.png',
						text: '企业招聘',
						topage: 'index/ghdetail?type=2&oneId=225&id=281&name=企业招聘'
					},
				],
				xqitems4: [{
						oneId:'',
						id: '238',
						type: 'img',
						url: imgUrl + 'img19.png',
						text: '考试资料',
						topage: 'index/kaoshizl'
					},
					{
						oneId:'',
						id: '237',
						type: 'img',
						url: imgUrl + 'img12.png',
						text: '网课学习',
						topage: 'index/wangke?type=1&oneId=0&id=237'
					}
				],
				swiperList: [],
				scrollTop:0,
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
		onLoad(option) {
			this.getGzhOpenId();
			this.imgUrl = imgUrl
			this.baseUrl = baseUrl
			this.getlunbo()
			if(option.userid){
				uni.setStorageSync('sjuserid', option.userid);
			}
			
			
		}, 
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		},
		methods: {
			InputBlur(e) {
				this.InputBottom = 0
			},
			async getGzhOpenId(){
				this.$api.toPage('index/webView');
			  },
			async getlunbo(){
				// gethomeSetting
				try {
					const obj = {
				
					};
					const {
						data
					} = await gethomeSetting(obj);
				
					if (data.code == 200) {
				       
						this.swiperList = data.data
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

<style>
	image {
		width: 100%;
		height: 100%;
	}
	.rotate-90 {
		transform: rotate(90deg);
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.bg_gray {
		background-color: #e0e0e0 !important;
		border-radius: 40rpx;
		margin: 0 20rpx;
	}

	.lunbo {
		width: 96%;
		margin: 20rpx auto;
		border-radius: 20rpx;
	}

	.lunbo image {
		border-radius: 20rpx;
	}

	.contwo image {
		border-radius: 20rpx !important;
	}

	.sysousuo {
		width: 100%;
		padding-top: 14vh;
	}

	.sousuotext {
		color: #2D9DFB;
	}

	.sysousuo .cu-bar {
		width: 98%;
		margin-left: 2%;
	}

	.sysousuo input {
		width: 100%;
		margin-right: 100rpx;
	}

	.sysousuo button {
		position: absolute;
		right: 30rpx;
		top: 10rpx;
	}

	.cu-bar .search-form {
		background-color: #fff;
		height: 74rpx;
	}

	.xlts {
		width: 98%;
		margin: 0 auto;
	}

	.boxs {
		width: 33.3%;
		float: left;
		text-align: center;
		font-size: 28rpx;
		color: #333;
		padding: 0 5%;
		height: 230rpx;

	}

	.boxs text {
		line-height: 38rpx;
	}

	.imgbox {
		width: 110rpx;
		height: 110rpx;
		margin: 30rpx auto 20rpx;
	}
	
</style>