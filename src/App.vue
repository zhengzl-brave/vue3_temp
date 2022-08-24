<script setup lang="ts">
import { useSetting } from './store'
// 水印
import { getmark } from '@/utils/watermark'
const { watermark } = getmark()
onMounted(() => {
  watermark('郑增亮')
})
// 主题色
const settingStore = useSetting()
const { updateSystemSetting } = storeToRefs(settingStore)
watch(updateSystemSetting, (val) => {
  document.body.setAttribute('data-theme', val)
}, { immediate: true})
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style scoped>

</style>
