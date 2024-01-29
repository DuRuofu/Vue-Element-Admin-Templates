import { fileURLToPath, URL } from 'node:url';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { viteMockServe } from 'vite-plugin-mock';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig((command) => {
	return {
		plugins: [
			vue(),
			// svg图标插件
			createSvgIconsPlugin({
				iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
				symbolId: 'icon-[dir]-[name]'
			}),
			viteMockServe({
				//${keyName}绕过编译器检测类型不一致
				enable: `${command}` === 'serve'
			})
		],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		},

		// sass全局变量配置
		css: {
			preprocessorOptions: {
				scss: {
					javascriptEnabled: true,
					additionalData: '@import "./src/styles/variable.scss";'
				}
			}
		},

		// 服务配置
		server: {
			// 端口号
			port: 8080,
			// 监听所有地址
			host: '0.0.0.0',
			// 服务启动时是否自动打开浏览器
			open: true,
			// 允许跨域
			cors: true,
			// 自定义代理规则
			proxy: {}
		}
	};
});
