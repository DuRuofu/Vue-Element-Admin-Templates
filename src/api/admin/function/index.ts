import request from '@/utils/http';

// 获取权限列表(后端功能)

export const getFunctionList = () => request.get<any, any>('v1/permission/permissions/1');
