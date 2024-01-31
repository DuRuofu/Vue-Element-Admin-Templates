// 定义小仓库数据state的类型
import type { RouteRecordRaw } from 'vue-router';
export interface AccountState {
	token: string | null;
	menuRoutes: RouteRecordRaw[];
	accountInfo: any;
}
