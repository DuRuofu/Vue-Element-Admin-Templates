// 对外暴露配置路由
export const constantRoute = [
	// dashboard页面
	{
		path: '/dashboard',
		name: 'dashboard',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: 'Dashboard',
			hidden: false,
			icon: 'Odometer'
		},
		redirect: '/dataview',
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

	// 管理页面
	{
		path: '/admin',
		name: 'admin',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: '系统管理',
			hidden: false,
			icon: 'Setting'
		},
		redirect: '/organization',
		children: [
			{
				path: '/organization',
				name: 'organization',
				component: () => import('@/views/admin/organization/index.vue'),
				meta: {
					title: '组织管理',
					hidden: false,
					icon: 'OfficeBuilding'
				}
			},
			{
				path: '/account',
				name: 'account',
				component: () => import('@/views/admin/account/index.vue'),
				meta: {
					title: '账户管理',
					hidden: false,
					icon: 'User'
				}
			},
			{
				path: '/role',
				name: 'role',
				component: () => import('@/views/admin/role/index.vue'),
				meta: {
					title: '角色管理',
					hidden: false,
					icon: 'UserFilled'
				}
			},
			{
				path: '/menu',
				name: 'menu',
				component: () => import('@/views/admin/menu/index.vue'),
				meta: {
					title: '菜单管理',
					hidden: false,
					icon: 'Grid'
				}
			},
			{
				path: '/route',
				name: 'route',
				component: () => import('@/views/admin/function/index.vue'),
				meta: {
					title: '功能管理',
					hidden: false,
					icon: 'TurnOff'
				}
			}
		]
	},
	// 功能页面
	{
		path: '/function',
		name: 'function',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: '功能',
			hidden: false,
			icon: 'Operation'
		},
		redirect: '/echarts',
		children: [
			// echarts
			{
				path: '/echarts',
				name: 'echarts',
				meta: {
					title: 'Echarts',
					hidden: false,
					icon: 'PieChart'
				},
				redirect: '/echarts/bar',
				children: [
					{
						path: '/echarts/bar',
						name: 'bar',
						component: () => import('@/views/function/echarts/bar.vue'),
						meta: {
							title: '柱状图',
							hidden: false,
							icon: 'Histogram'
						}
					},
					{
						path: '/echarts/line',
						name: 'line',
						component: () => import('@/views/function/echarts/line.vue'),
						meta: {
							title: '折线图',
							hidden: false,
							icon: 'DataLine'
						}
					},
					{
						path: '/echarts/pie',
						name: 'pie',
						component: () => import('@/views/function/echarts/pie.vue'),
						meta: {
							title: '饼图',
							hidden: false,
							icon: 'PieChart'
						}
					},
					{
						path: '/echarts/radar',
						name: 'radar',
						component: () => import('@/views/function/echarts/radar.vue'),
						meta: {
							title: '雷达图',
							hidden: false,
							icon: 'PieChart'
						}
					},
					{
						path: '/echarts/map',
						name: 'map',
						component: () => import('@/views/function/echarts/map.vue'),
						meta: {
							title: '地图',
							hidden: false,
							icon: 'PieChart'
						}
					}
				]
			},
			// MQTT客户端
			{
				path: '/mqttclient',
				name: 'mqttclient',
				component: () => import('@/views/function/mqtt/index.vue'),
				meta: {
					title: 'MQTT客户端',
					hidden: false,
					icon: 'Phone'
				}
			},
			// 打印功能
			{
				path: '/print',
				name: 'print',
				component: () => import('@/views/function/print/index.vue'),
				meta: {
					title: '打印功能',
					hidden: false,
					icon: 'Printer'
				}
			}
		]
	},

	//关于页面
	{
		path: '/about',
		name: 'about',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: 'about',
			hidden: false,
			icon: 'Link'
		},
		redirect: '/about',
		children: [
			// 关于系统
			{
				path: '/about',
				name: 'about',
				component: () => import('@/views/about/index.vue'),
				meta: {
					title: '关于系统',
					hidden: false,
					icon: 'Link'
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
			hidden: true,
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
			hidden: true,
			icon: 'QuestionFilled'
		}
	},
	// 重定向
	{
		path: '/',
		redirect: '/login',
		meta: {
			title: '重定向',
			hidden: true,
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
			hidden: true,
			icon: 'House'
		}
	}
];
