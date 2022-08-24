<script setup lang="ts">
export interface propState {
    visible: boolean;
    title: string,
    width?: number
}
export interface emitState {
    (event: 'close'): void
}
const props = withDefaults(defineProps<propState>(), {
    visible: false,
    title: '',
    width: 600
});
const emit = defineEmits<emitState>()
const handleClose = () => {
    emit('close')
}
</script>

<template>
    <div>
        <a-modal v-model:visible="visible" :title="title" :footer="null" :width="width" :afterClose="handleClose">
            <slot />
        </a-modal>
    </div>
</template>

<style lang="scss" scoped>
</style>
