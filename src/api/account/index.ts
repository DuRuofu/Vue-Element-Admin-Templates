import request from '@/utils/http';
import type { LoginData, LoginResponseData } from './type';

// 导入类型

// 枚举请求地址
enum API {
	LOGIN_URL = '/v1/account/login',
	REGISTER_URL = '/admin/acl/index/logout'
}

// 注册
export const register = (data: any) => {
	const { Account, Email_Phone } = data;
	return request({
		url: '/v1/account/register',
		method: 'post',
		data: {
			Account,
			Email_Phone
		}
	});
};

// // 登陆 第一种写法
// export const login = (data: LoginData) => {
// 	const { Account, Password } = data;
// 	return request({
// 		url: '/v1/account/login',
// 		method: 'post',
// 		data: {
// 			Account,
// 			Password
// 		}
// 	});
// };

// 登陆 第二种写法
export const login = (data: LoginData) => request.post<any, LoginResponseData>(API.LOGIN_URL, data);
