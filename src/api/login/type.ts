// 登陆接口参数类型
export interface LoginData {
	Account: string;
	Password: string;
}

// 登陆接口返回数据类型
export interface LoginResponseData {
	code: number;
	msg: string;
	data: any;
}
