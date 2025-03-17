/**
 * 封装代办相关请求模块
 * */

// 导入request模块
import $request from "../common/ajax.js";
import {
  baseUrl
} from "@/common/config.default.js";

// 登录
export const toLogin = (data) => $request("hs/api/login", data);

//注册
export const toRegister = (data) => $request("hs/api/register", data);


// 获取openid
export const getOpenId = data => $request("api/wanlshop.user/third", data);

// 获取手机号
export const getPhone = data => $request("api/wanlshop.user/phone", data);

// 易考列表
export const getYkmySelf = (data) => $request("hs/api/homeSetting/ykList", data);

//易考详情
export const getykInfo = (data) => $request("hs/api/homeSetting/ykInfo", data);
