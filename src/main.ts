import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import App from './App.vue';
// 引入路由
import router from './router';
// 引入Pinia
import pinia from './stores';
// 导入svg图标插件
import 'virtual:svg-icons-register';
// 导入全局自定义插件
import gloablComponent from './components/index';
// 导入全局样式
import '@/styles/index.scss';
// 导入暗黑模式样式
import 'element-plus/theme-chalk/dark/css-vars.css';
// 在某些条件下隐藏元素
import 'element-plus/theme-chalk/display.css';
// 导入路由鉴权模块
import './router/permission';
const app = createApp(App);

// 导入Pinia
app.use(pinia);

// 导入路由
app.use(router);

// 挂载自定义全局组件
app.use(gloablComponent);

// 导入ElementPlus
app.use(ElementPlus, {
	locale: zhCn
});

app.mount('#app');
