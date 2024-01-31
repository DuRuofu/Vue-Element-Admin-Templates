import axios from 'axios';
import { ElMessage } from 'element-plus';
import { GET_TOKEN } from '@/utils/token';
const request = axios.create({
	// 后端接口url
	baseURL: `${import.meta.env.VITE_APP_BASE_URL}:${import.meta.env.VITE_APP_PORT}`,
	// 超时时间
	timeout: 6000,
	// 请求头
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	// 表示跨域请求时是否需要使用凭证
	withCredentials: false
});

// 添加请求拦截器
request.interceptors.request.use(
	function (config) {
		// 在发送请求之前做些什么
		// 添加token
		config.headers['authorization'] = GET_TOKEN();
		return config;
	},
	function (error) {
		// 对请求错误做些什么
		console.log('请求错误');
		return Promise.reject(error);
	}
);

// 添加响应拦截器
request.interceptors.response.use(
	function (response) {
		// 2xx 范围内的状态码都会触发该函数。
		// 对响应数据做点什么
		return response.data;
	},
	function (error) {
		// 超出 2xx 范围的状态码都会触发该函数。
		// 对响应错误做点什么
		//处理网络错误
		let msg = '';
		const status = error.response.status;
		switch (status) {
			case 400:
				msg = '请求参数无效';
				break;
			case 401:
				msg = 'token过期';
				break;
			case 403:
				msg = '无权访问';
				break;
			case 404:
				msg = '请求地址错误';
				break;
			case 422:
				msg = '请求地址错误';
				break;
			case 500:
				msg = '服务器出现问题';
				break;
			default:
				msg = '无网络';
		}
		ElMessage.error(msg);
		return Promise.reject(error);
	}
);

export default request;
