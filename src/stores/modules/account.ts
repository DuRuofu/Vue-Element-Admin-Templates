// 用户相关仓库
import { defineStore } from 'pinia';
// 引入数据类型
import type { LoginData, LoginResponseData } from '@/api/account/type';
import type { AccountState } from './types/type';
// 引入请求方法
import { login } from '@/api/account/index';
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
			menuRoutes: constantRoute //用户的路由表(生成菜单所需)
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
		}
	},

	//计算属性----------------------------------------------------//
	getters: {}
});

//对外暴露
export default useAccountStore;
