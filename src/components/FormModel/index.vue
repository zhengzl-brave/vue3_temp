<!-- 自定义表单组件 -->
<script setup lang='ts'>
// import { reactive, toRefs } from 'vue';

    export interface dataTypes {
        labelCol: object
        wrapperCol: object
    }
    export interface selectTypes {
        value: any,
        name: string
    }
    export interface formItemTypes {
        key: string,
        label: string,
        type: string,
        selectArrs?: selectTypes[],
        placeholder?: string
    }
    export interface propTypes {
        rules?: any
        varArrs: formItemTypes[]
        formState: object
    }
    const data = reactive<dataTypes>({
        labelCol: {
            span: 4
        },
        wrapperCol: {
            span: 16
        }
    })
    const { labelCol, wrapperCol} = toRefs(data)
    const props = withDefaults(defineProps<propTypes>(), {
        varArrs: () => []
    })
</script>

<template>
    <div>
        <a-form
            ref="formRef"
            :model="formState"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            :rules="rules"
        >
            <a-form-item
                v-for="(item, index) in varArrs" :key="index"
                :label="item.label"
                :name="item.key"
            >
                <template v-if="item.type === 'input'">
                    <a-input v-model:value="formState[item.key]" :placeholder="item.placeholder"></a-input>
                </template>
                <template v-else-if="item.type === 'select'">
                    <a-select ref="select" v-model:value="formState[item.key]" :placeholder="item.placeholder">
                        <a-select-option v-for="opt in item.selectArrs" :key="opt.value" :value="opt.value">{{ opt.name }}</a-select-option>
                    </a-select>
                </template>
                <template v-else-if="item.type === 'checkbox'">
                    <a-checkbox-group v-model:value="formState[item.key]">
                        <a-checkbox v-for="opt in item.selectArrs" :key="opt.value" :value="opt.value">{{ opt.name }}</a-checkbox>
                    </a-checkbox-group>
                </template>
                <template v-else-if="item.type === 'radio'">
                    <a-radio-group v-model:value="formState[item.key]">
                        <a-radio v-for="opt in item.selectArrs" :key="opt.value" :value="opt.value">{{ opt.name }}</a-radio>
                    </a-radio-group>
                </template>
                <template v-else-if="item.type === 'date'">
                    <a-date-picker v-model:value="formState[item.key]" value-format="YYYY-MM-DD" :placeholder="item.placeholder" />
                </template>
            </a-form-item>
        </a-form>
    </div>
</template>
