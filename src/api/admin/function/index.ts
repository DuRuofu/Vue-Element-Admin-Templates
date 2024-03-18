import request from '@/utils/http';

// 获取权限列表(后端功能)
export const getFunctionList = () => request.get<any, any>('v1/permission/permissions/1');

// 获取权限列表(后功能)
export const putFunctionList = () => request.put<any, any>('v1/permission/permissions/1');

// 删除权限
export const deleteFunction = (id: number) =>
	request.delete<any, any>(`v1/permission/permissions/${id}`);
