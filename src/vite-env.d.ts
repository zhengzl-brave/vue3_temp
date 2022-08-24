/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
// 当不具备@/types下载库时可在此添加
declare module 'vue-draggable-resizable'
