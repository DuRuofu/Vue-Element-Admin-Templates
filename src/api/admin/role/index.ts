import request from '@/utils/http';

// 查询全部角色
export const getRoles = () => request.get<any, any>('v1/role/roles');

// 删除角色
export const deleteRoles = (id: number) => request.delete<any, any>('v1/role/roles/' + `${id}`);

// 新增角色
export const addRoles = (data: any) => request.post<any, any>('v1/role/roles', data);

// 修改角色
export const updateRoles = (id: number, data: any) =>
	request.put<any, any>('v1/role/roles/' + `${id}`, data);

// 为角色批量添加权限
export const addRolePermissions = (id: number, data: any) =>
	request.post<any, any>('v1/permission/permissions/' + `${id}`, data);

// 获取角色权限列表
export const getRolePermissions = (id: number) =>
	request.get<any, any>('v1/permission/permissions/roles/' + `${id}`);
