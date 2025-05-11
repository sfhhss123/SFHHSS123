import { createApp } from 'vue'
// 尝试导入标准的 ElementPlus 模块，解决找不到模块的问题
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
