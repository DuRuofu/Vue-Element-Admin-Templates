import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import App from './App.vue';
import router from './router';
// 导入svg图标插件
import 'virtual:svg-icons-register';
// 导入全局自定义插件
import gloablComponent from './components/index';
// 导入全局样式
import '@/styles/index.scss';

const app = createApp(App);

// 导入Pinia
app.use(createPinia());

// 导入路由
app.use(router);

// 导入ElementPlus
app.use(ElementPlus, {
	locale: zhCn
});

// 挂载自定义全局组件
app.use(gloablComponent);

app.mount('#app');
