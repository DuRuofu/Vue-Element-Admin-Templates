import request from '@/utils/http';

// 导入类型
// import type { PagingData } from './type';

// 枚举相关请求地址
// enum API {
// 	// 获取组织列表(树)
// 	getOrganizationTrees_url,
// 	// 新增组织
// 	addOrganization_url = 'v1/organization/organizations'
// }

// 获取组织列表(树)
// page:当前页数
// limit:数据数量
export const getOrganizationTrees = () => request.get<any, any>('v1/organization/organizations');

// 新增组织
export const addOrganization = (data: any) =>
	request.post<any, any>('v1/organization/organizations', data);

// 修改组织
export const updateOrganization = (id: number, data: any) =>
	request.put<any, any>(`v1/organization/organizations/${id}`, data);

// 删除组织
export const deleteOrganization = (id: number) =>
	request.delete<any, any>(`v1/organization/organizations/${id}`);
