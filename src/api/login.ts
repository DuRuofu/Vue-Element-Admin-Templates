import instance from '../utils/http';

// 注册
export const register = (data: any) => {
	const { Account, Email_Phone } = data;
	return instance({
		url: '/v1/account/register',
		method: 'post',
		data: {
			Account,
			Email_Phone
		}
	});
};

// 登陆
export const login = (data: any) => {
	const { Account, Password } = data;
	return instance({
		url: '/v1/account/login',
		method: 'post',
		data: {
			Account,
			Password
		}
	});
};
