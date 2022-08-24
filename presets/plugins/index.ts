import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { AutoImportDeps } from './autoImport'
import { AutoRegistryComponents } from './components'
import { ConfigMockPlugin } from './mock'
export function createVitePlugins(isBuild: boolean) {
    const vitePlugins: (PluginOption | PluginOption[])[] = [
        vue()
    ]
    // 自动按需引入依赖
    vitePlugins.push(AutoImportDeps())
    // 自动按需引入组件
    vitePlugins.push(AutoRegistryComponents())
    // vite-plugin-mock
    vitePlugins.push(ConfigMockPlugin(isBuild))

    return vitePlugins
}