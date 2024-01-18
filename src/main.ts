
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 导入Pinia
app.use(createPinia())

// 导入路由
app.use(router)

// 导入ElementPlus
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
