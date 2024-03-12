import request from '@/utils/http';

// 导入类型
// import type { PagingData } from './type';
// 枚举账户相关请求地址
enum API {
	// 获取用户列表
	getAccountList_url = '/v1/account/accounts/'
}

// 获取用户列表(分页)
// page:当前页数
// limit:数据数量
export const getAllAccountList = (page: number, limit: number) =>
	request.get<any, any>(API.getAccountList_url + `${page}` + `/${limit}`);
