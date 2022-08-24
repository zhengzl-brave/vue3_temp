import { UserConfig, ConfigEnv } from 'vite'
// yarn add @types/node
import path from 'path'
import { createVitePlugins } from './presets/plugins'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'
  return {
    plugins: createVitePlugins(isBuild),
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.js', '.json', '.ts', '.vue']
    },
    css: {
      preprocessorOptions: {
        // 配置全局scss样式文件
        scss: {
          additionalData: '@import "@/styles/variable.scss";@import "@/styles/font.scss";@import "@/styles/theme/index.scss";'
        },
        less: {
          javascriptEnabled: true,
        },
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        // 生产环境移除console,debugger
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    server: {
      https: false,
      open: true,
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false, // 若是https接口，需配置
          rewrite: path => path.replace(new RegExp(`^/api`), "")
        }
      }
    },
    // 引入第三方配置
    optimizeDeps: {
      include: []
    }
  }
}
