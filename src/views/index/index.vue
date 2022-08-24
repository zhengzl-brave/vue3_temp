<script setup lang="ts">
import { useManage } from '@/store'
import Header from '@/views/components/Header/index.vue'
const manageStore = useManage()
const { popuVisible } = storeToRefs(manageStore)
</script>

<template>
    <div>
        <Header />
        <!-- 通过keepAlive对todoList进行缓存 -->
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" v-if="$route.meta.keepAlive" />
            </keep-alive>
            <component :is="Component" v-if="!$route.meta.keepAlive" />
        </router-view>
    </div>
</template>

<style lang="scss" scoped></style>
