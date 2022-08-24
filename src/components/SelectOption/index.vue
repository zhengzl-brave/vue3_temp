<script setup lang="ts">
import type { SelectProps } from "ant-design-vue";
export interface propState {
    value: string | undefined;
    options: SelectProps["options"];
}
export interface emitState {
     (event: 'selectRes', value: string): void
}
const props = withDefaults(defineProps<propState>(), {
    value: "",
});
const emit = defineEmits<emitState>()
const filterOption = (input: string, option: any) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const handleChange = (value: any) => {
    console.log(`selected ${value}`);
    emit('selectRes', value)
};
const handleBlur = () => {
    console.log("blur");
};
const handleFocus = () => {
    console.log("focus");
};
</script>

<template>
    <div>
        <a-select
            v-model:value="value"
            show-search
            placeholder="请选择"
            style="width: 200px"
            :options="options"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
        ></a-select>
    </div>
</template>

<style lang="scss" scoped></style>
