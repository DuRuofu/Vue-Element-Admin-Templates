// 用户相关仓库
import { defineStore } from 'pinia';
// 引入数据类型
import type { LoginData, LoginResponseData } from '@/api/account/type';
import type { AccountState } from './types/type';
// 引入请求方法
import { login, getAccountInfo } from '@/api/account/index';
// 引入工具方法
import { SET_TOKEN, GET_TOKEN } from '@/utils/token';

// 引入路由表
import { constantRoute } from '@/router/routes';

// 创建用户仓库
const useAccountStore = defineStore('Account', {
	//数据----------------------------------------------------//
	state: (): AccountState => {
		return {
			token: GET_TOKEN(), //用户的token
			menuRoutes: constantRoute, //用户的路由表(生成菜单所需)
			accountInfo: {} //用户信息
		};
	},

	//方法----------------------------------------------------//
	actions: {
		//用户登陆
		async accountLogin(data: LoginData) {
			try {
				const res: LoginResponseData = await login(data);
				if (res.code == 200) {
					//保存token
					this.token = res.data.token;
					SET_TOKEN(res.data.token);
					return 'ok';
				} else {
					return Promise.reject(new Error());
				}
			} catch (error) {
				return Promise.reject(new Error());
			}
		},

		//获取用户信息
		async gteAccountInfo() {
			try {
				const res = (await getAccountInfo()) as any;
				if (res.code == 200) {
					this.accountInfo = res.data;
					return 'ok';
				} else {
					return Promise.reject(new Error());
				}
			} catch (error) {
				return Promise.reject(new Error());
			}
		},

		//退出登陆
		async accountLogout() {
			//清空token
			this.token = null;
			SET_TOKEN('');
			//清空用户信息
			this.accountInfo = {};
		},

		// 给用户展示的菜单处理
		generateMenuRoutes() {
			// 获取用户的路由表
			const menuRoutes = constantRoute;
			// 递归过滤路由表
			// 过滤路由表
			this.menuRoutes = menuRoutes;
		}
	},

	//计算属性----------------------------------------------------//
	getters: {}
});

//对外暴露
export default useAccountStore;
