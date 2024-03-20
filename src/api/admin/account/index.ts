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
export const getAllAccountList = (organizationid: number, page: number, limit: number) =>
	request.get<any, any>(API.getAccountList_url + `${organizationid}` + `/${page}` + `/${limit}`);

// 添加账户
export const addAccount = (data: any) => request.post<any, any>(`/v1/account/register`, data);

// 修改账户
export const updateAccount = (id: string, data: any) =>
	request.put<any, any>(`/v1/account/accounts/${id}`, data);
