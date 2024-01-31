//用于注册components文件夹内部全部全局组件的自定义插件
// 自定义SVG图标组件
import SvgIcon from './SvgIcon/index.vue';
// 引入element-plus图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import type { App, Component } from 'vue';
const components: { [name: string]: Component } = { SvgIcon };
export default {
	install(app: App) {
		Object.keys(components).forEach((key: string) => {
			app.component(key, components[key]);
		});

		//注册element-plus图标组件
		for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
			app.component(key, component);
		}
	}
};
