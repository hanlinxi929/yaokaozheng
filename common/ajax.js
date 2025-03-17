import ajax from "@/uni_modules/u-ajax/js_sdk";
import {
	baseUrl
} from "@/common/config.default.js";
const instance = ajax.create({
	baseURL: baseUrl,
	method: "POST",
	header: {
		"Accept": "application/json",
		"appToken": uni.getStorageSync('token')
	},
});

instance.interceptors.request.use(
	config => {
		// if(config.token) {
		//   config.header.token = config.token;
		// }
		config.header.appToken = uni.getStorageSync('token')
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);
instance.interceptors.response.use(
	response => {
		if (response.data.code === 401) {

			uni.showToast({
				title: "请登录后操作~",
				icon: "none",
				duration: 500,
				success() {
					setTimeout(() => {
						try {
							var userid = uni.getStorageSync('sjuserid')
							uni.clearStorageSync();
							uni.setStorageSync('sjuserid', userid);
							console.log(uni.getStorageSync('sjuserid'))
						} catch (e) {
							//TODO handle the exception
						}
						uni.navigateTo({
							url: "/pages/login/index"
						});
					}, 500);
				}
			});
			return;
		}
		return response;
	},
	error => {

		return Promise.reject(error);
	}
);

export default instance;