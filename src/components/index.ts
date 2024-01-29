//用于注册components文件夹内部全部全局组件的自定义插件

import SvgIcon from './SvgIcon/index.vue';
import type { App, Component } from 'vue';
const components: { [name: string]: Component } = { SvgIcon };
export default {
	install(app: App) {
		Object.keys(components).forEach((key: string) => {
			app.component(key, components[key]);
		});
	}
};
