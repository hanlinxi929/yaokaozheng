/**
 * 封装代办相关请求模块
 * */

// 导入request模块
import $request from "../common/ajax.js";
import {
  baseUrl
} from "@/common/config.default.js";

//轮播图
export const gethomeSetting = (data) => $request("hs/api/homeSetting/list", data);

// 获取代办点列表
export const getInfo = (data) => $request("hs/api/AppUser/info", data);

//网课学习列表
export const getwkxx = (data) => $request("hs/api/Learning/wkxx", data);

//收藏
export const getAddCollect = (data) => $request("hs/api/AppCollect/addCollect", data);

//取消收藏
export const getDelCollect= (data) => $request("hs/api/AppCollect/delCollect", data);

//收藏或浏览记录列表
export const getCollectByUserId= (data) => $request("hs/api/AppCollect/getCollectByUserId", data);

//首页二级列表
export const getQualificationList= (data) => $request("hs/api/homePage/QualificationList", data);

//资格考试二级列表
export const getzgQualificationList= (data) => $request("hs/api/QualificationCertificate/list", data);

//获取tab
export const getTwoType= (data) => $request("hs/api/homePage/getTwoType", data);

//资格考试获取tab
export const getzgTwoType= (data) => $request("hs/api/QualificationCertificate/tabList", data);

//省下拉数据
export const getCity= (data) => $request("hs/api/homePage/getCity", data);

//学校详情 
export const getDetailInfo= (data) => $request("hs/api/homePage/getInfo", data);

//资格考试学校详情
export const getzgDetailInfo= (data) => $request("hs/api/QualificationCertificate/getInfo", data);

//高考省份列表
export const getCityList= (data) => $request("hs/api/VoluntaryTest/getCitys", data);

//点击咨询页面详情
export const getAddOrder= (data) => $request("hs/api/order/add", data);

//资格考试点击咨询页面详情
export const getzgAddOrder= (data) => $request("hs/api/order/add", data);

//zhifu\
export const getMiniAppPay= (data) => $request("hs/api/wxPay/miniAppPay", data);

//下拉属性
export const getSxlist= (data) => $request("hs/api/Attribute/list", data);

//报名学制下拉
export const getXlType= (data) => $request("hs/api/Attribute/XlType", data);

//咨询-推荐码/优惠券-修改
export const getUpReferralCode= (data) => $request("hs/api/order/UpReferralCode", data);

//咨询-推荐码/优惠券-修改资格考试
export const getzgUpReferralCode= (data) => $request("hs/api/order/UpReferralCode", data);

//资格考试报名地区
export const getVoluntaryTest= (data) => $request("hs/api/VoluntaryTest/getCitys", data);

//报名-新增
export const getSignUpadd= (data) => $request("hs/api/SignUp/add", data);


//wangke详情
export const getWangkeInfo= (data) => $request("hs/api/Learning/info", data);

//查询之前有米有填写，去开课
export const getWanggetInfo= (data) => $request("hs/api/CourseInformation/getInfo", data);

//去开课四级联动
export const getWangldlist= (data) => $request("hs/api/Attribute/XlType", data);

//开课支付
export const getWangAdd= (data) => $request("hs/api/CourseInformation/add", data);

//上传简历
export const getSignUpAdd= (data) => $request("hs/api/SignUp/add", data);

//就业服务类详情
export const gethomePagegetInfo= (data) => $request("hs/api/homePage/getInfo", data);

//考试资料
export const getLearningkszl= (data) => $request("hs/api/Learning/kszl", data);

//考试资料详情
export const getLearningkszlInfo= (data) => $request("hs/api/Learning/kszlInfo", data);

//新增高考规划
export const getVoluntaryTestadd= (data) => $request("hs/api/VoluntaryTest/add", data);

//下载支付
export const getZlAppPay= (data) => $request("hs/api/wxPay/ZlAppPay", data);