// 对外暴露配置路由
export const constantRoute = [
	// 重定向
	{
		path: '/',
		redirect: '/login',
		meta: {
			title: '重定向',
			hidden: false,
			icon: 'Close'
		}
	},
	// 登陆页
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登陆',
			hidden: false,
			icon: 'House'
		}
	},
	// 框架页
	{
		path: '/home',
		name: 'home',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: 'layout',
			hidden: false,
			icon: 'Menu'
		},
		children: [
			// 数据概览
			{
				path: '/dataview',
				name: 'dataview',
				component: () => import('@/views/dashboard/dataview/index.vue'),
				meta: {
					title: '数据概览',
					hidden: false,
					icon: 'Histogram'
				}
			},
			//工作台
			{
				path: '/workbench',
				name: 'workbench',
				component: () => import('@/views/dashboard/workbench/index.vue'),
				meta: {
					title: '工作台',
					hidden: false,
					icon: 'PieChart'
				}
			}
		]
	},
	// 404 页面
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/error/404.vue'),
		meta: {
			title: '404',
			hidden: false,
			icon: 'CircleCloseFilled'
		}
	},
	//  未知路由重定向
	{
		path: '/:pathMatch(.*)*',
		redirect: '/404',
		name: 'any',
		meta: {
			title: '其他',
			hidden: false,
			icon: 'QuestionFilled'
		}
	}
];
