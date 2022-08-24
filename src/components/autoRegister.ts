import { defineAsyncComponent } from 'vue';

const components = import.meta.glob('./*/index.vue'); 
export default function install(app: any) {
    for (const [key, value] of Object.entries(components)) {
        // 注册组件名字 约定文件夹名称即为组件的名称
        const name = key.slice(2, key.lastIndexOf('/'))
        app.component(name, defineAsyncComponent(value as any));
    }
}