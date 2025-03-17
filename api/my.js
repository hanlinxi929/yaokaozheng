/**
 * 封装代办相关请求模块
 * */

// 导入request模块
import $request from "../common/ajax.js";
import {
  baseUrl
} from "@/common/config.default.js";

// 用户信息查询 
export const getMyInfo = (data) => $request("hs/api/AppUser/info", data);

//收益记录
export const getMyCommission = (data) => $request("hs/api/commission/list", data);

//提现记录
export const getMyBrokeragelist = (data) => $request("hs/api/Brokerage/list", data);

//提现
export const getMyBrokerageadd = (data) => $request("hs/api/Brokerage/add", data);

//查询是否讯在账户信息
export const getselIntroducer = (data) => $request("hs/api/Brokerage/selIntroducer", data);

//修改新增银行账户
export const getapintroducer = (data) => $request("hs/api/Brokerage/apintroducer", data); 

//查询用户收款信息
export const getselIntroducerInfo = (data) => $request("hs/api/Brokerage/selIntroducerInfo", data);

// 修改用户信息
export const getMyEdit = (data) => $request("hs/api/AppUser/edit", data);

//加入我们查询
export const getSelMyself = (data) => $request("hs/api/AppUser/selMyself", data);

//申请加入我们
export const getAddMyself = (data) => $request("hs/api/AppUser/addMyself", data);

//驳回重新提交
export const getupMyself = (data) => $request("hs/api/AppUser/upMyself", data);


//上传图片
export const getupload = (data) => $request("hs/api/upload", data);

//我的收藏和访问点击查看浏览详情-跳转页
export const getCollectInfoDetail = (data) => $request("hs/api/AppCollect/getCollectInfo", data);

//卡券
export const getKqlist = (data) => $request("hs/api/AppCoupon/list", data);

//我的退费
export const getMyRefund = (data) => $request("hs/api/AppUser/MyRefund", data);

//证书补贴
export const getMySubsidy = (data) => $request("hs/api/AppUser/MySubsidy", data);

//订单
export const getMyorderPageList = (data) => $request("hs/api/order/orderPageList", data);

//订单支付详情
export const getorderBmInfo = (data) => $request("hs/api/order/orderBmInfo", data);

//订单支付
export const getorderPay = (data) => $request("hs/api/wxPay/orderPay", data);

//选中优惠券
export const getAppCouponList = (data) => $request("hs/api/AppCoupon/selectCoupon", data);

//订单推荐码
export const getorderUpBmDk = (data) => $request("hs/api/order/UpBmDk", data);

//我的订单优惠券
export const getoderYhqlist = (data) => $request("hs/api/AppCoupon/oderYhqlist", data);

//合同签字
export const getupContractSign = (data) => $request("hs/api/SignUp/upContractSign", data);

//查看是否存在已申请发票
export const getZcInvoice = (data) => $request("hs/api/SignUp/getZcInvoice", data);

//申请开票
export const getaddZcInvoice = (data) => $request("hs/api/SignUp/addZcInvoice", data);

//取消开票
export const getdelZcInvoice = (data) => $request("hs/api/SignUp/delZcInvoice", data);

//咨询列表
export const getConsult = (data) => $request("hs/api/order/getConsult", data);

//我的
export const getmySelf = (data) => $request("hs/api/AppUser/mySelf", data);

//消息
export const getNoticelist = (data) => $request("hs/api/Notice/list", data);

//消息阅读修改
export const getread = (data) => $request("hs/api/Notice/read", data);