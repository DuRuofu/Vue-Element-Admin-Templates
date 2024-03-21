// 路由鉴权模块
import router from '@/router';
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css';
nprogress.configure({ showSpinner: false });
// 引入用户仓库
import useAcountStore from '@/stores/modules/account';
// 全局路由守卫(前置)
router.beforeEach(async (to: any, from: any, next: any) => {
	// 开启进度条
	nprogress.start();
	// 判断用户是否登陆
	// 获取用户仓库
	const accountStore = useAcountStore();
	const token = accountStore.token;
	const accountNmae = accountStore.accountInfo.Name;
	// 用户已登录
	if (token) {
		if (to.path == '/login') {
			next('/dashboard');
		} else {
			if (accountNmae) {
				next();
			} else {
				// 获取用户信息to
				try {
					await accountStore.gteAccountInfo();
					next({ ...to, replaace: true });
				} catch (error) {
					// 获取用户信息失败
					// 清空token
					accountStore.accountLogout();
					next('/login');
				}
			}
		}
		next();
	} else {
		// 用户未登录
		// 判断用户访问的是否是login页面
		if (to.path == '/login') {
			next();
		} else {
			next('/login');
		}
	}
	nprogress.done();
});

// 全局路由守卫(后置)
// router.afterEach((to: any, from: any, next: any) => {
// 	// 关闭进度条

// 	//next();
// 	//return;
// });

// 用户未登陆时,只能访问login页面
// 用户已登陆时,根据权限,可以访问特定页面
// 用户未登陆时,访问非login页面,重定向到login页面
