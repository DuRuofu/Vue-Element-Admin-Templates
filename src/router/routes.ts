// 对外暴露配置路由
export const constantRoute = [
	// 重定向
	{
		path: '/',
		redirect: '/login'
	},
	// 登陆页
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue')
	},
	// 框架页
	{
		path: '/home',
		name: 'home',
		component: () => import('@/layout/index.vue'),
		children: [
			// 首页
			// {
			// 	path: '/home1',
			// 	name: 'home1',
			// 	component: () => import('@/views/home/index.vue')
			// }
		]
	},
	// 404 页面
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/error/404.vue')
	},
	//  未知路由重定向
	{
		path: '/:pathMatch(.*)*',
		redirect: '/404',
		name: 'any'
	}
];
