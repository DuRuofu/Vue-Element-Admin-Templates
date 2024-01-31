// 封装本地存储和读取方法

// 存储token
export const SET_TOKEN = (token: string) => {
	localStorage.setItem('token', token);
};

// 获取token
export const GET_TOKEN = () => {
	return localStorage.getItem('token');
};
