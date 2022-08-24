import { createApp } from 'vue'
import '@/styles/global.scss'
import '@/styles/vant.scss'
import App from './App.vue'
// 数据存储pinia
import { createPinia } from 'pinia'
// 路由
import router from '@/router'
// ant-design message
import 'ant-design-vue/lib/message/style/index.less';
// 全局组件自动注册
import AutoComponents from '@/components/autoRegister'

const app = createApp(App)
app.use(AutoComponents)
app.use(createPinia())
app.use(router)
app.mount('#app')
