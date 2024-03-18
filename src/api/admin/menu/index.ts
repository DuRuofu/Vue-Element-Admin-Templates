import request from '@/utils/http';

// 获取权限列表(前端功能)
export const getMenuList = () => request.get<any, any>('v1/permission/permissions/2');

// 获取权限列表(前端功能)
export const putMenuList = () => request.put<any, any>('v1/permission/permissions/2');

// 删除权限
export const deleteMenu = (id: number) =>
	request.delete<any, any>(`v1/permission/permissions/${id}`);
