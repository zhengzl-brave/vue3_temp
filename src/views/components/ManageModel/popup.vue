<script setup lang="ts">
import { useManage } from "@/store";
import { manageAdd } from "@/api/manage";

export interface propState {
    visible: boolean;
}
export interface emitState {
    (event: "success"): void;
}
const props = withDefaults(defineProps<propState>(), {
    visible: false,
});
const emit = defineEmits<emitState>();
const manageStore = useManage();
const data = reactive({
    title: "新增数据问题",
});
const handleSubmit = async () => {
    const res = await manageAdd(formState.value);
    if (res.code === 200) {
        emit("success");
    }
};
const form = reactive({
    varArrs: [
        {
            key: "datSource",
            label: "数据来源",
            type: "select",
            placeholder: "请选择",
            selectArrs: [
                { value: 0, name: "APP上报" },
                { value: 1, name: "PC上报" },
            ],
        },
        {
            key: "questionType",
            label: "问题类型",
            type: "select",
            placeholder: "请选择",
            selectArrs: [
                { value: 0, name: "大管接小管" },
                { value: 1, name: "雨污混接" },
            ],
        },
        {
            key: "drainType",
            label: "排水类型",
            type: "select",
            placeholder: "请选择",
            selectArrs: [
                { value: 0, name: "雨水" },
                { value: 1, name: "污水" },
            ],
        },
        {
            key: "drainArea",
            label: "排水分区",
            type: "input",
            placeholder: "请输入排水分区",
        },
        {
            key: "aboutRoald",
            label: "所属镇街",
            type: "input",
            placeholder: "请输入镇街",
        },
        {
            key: "facilityType",
            label: "设施类型",
            type: "select",
            selectArrs: [
                { value: 0, name: "排水管道" },
                { value: 1, name: "雨量计" },
            ],
            placeholder: "请选择",
        },
        {
            key: "disposeState",
            label: "处理状态",
            type: "select",
            selectArrs: [
                { value: 0, name: "未完成" },
                { value: 1, name: "已完成" },
            ],
            placeholder: "请选择",
        },
        {
            key: "disposePerson",
            label: "处理人员",
            type: "input",
            placeholder: "请输入处理人员",
        },
        {
            key: "disposeTime",
            label: "处理时间",
            type: "date",
            placeholder: "请选择处理时间",
        },
    ],
    formState: {
        datSource: undefined,
        questionType: undefined,
        drainType: undefined,
        drainArea: "",
        aboutRoald: "",
        facilityType: undefined,
        disposeState: undefined,
        disposePerson: "",
        disposeTime: "",
    },
    rules: {
        drainArea: {
            required: true,
            message: '请输入排涝片区',
            trigger: 'blur'
        },
        aboutRoald: {
            required: true,
            message: '请输入镇街信息',
            trigger: 'blur'
        },
        disposePerson: {
            required: true,
            message: '请输入处理人员',
            trigger: 'blur'
        }
    }
});
const { varArrs, formState } = toRefs(form);
const { title } = toRefs(data);
const handleClose = () => {
    manageStore.setPopupVisible(false);
};
</script>

<template>
    <div>
        <popup-temp :visible="visible" :title="title" @close="handleClose">
            <div class="infos">
                <form-model :varArrs="varArrs" :form-state="formState" :rules="form.rules" />
                <div class="btns">
                    <div class="submit btn" @click="handleSubmit">提交</div>
                    <div class="reset btn">重置</div>
                </div>
            </div>
        </popup-temp>
    </div>
</template>

<style lang="scss" scoped>
.infos {
    .btns {
        display: flex;
        justify-content: center;
        .btn {
            width: 90px;
            height: 32px;
            border-radius: 3px;
            @include themeify {
                color: themed("font-color");
            }
            text-align: center;
            line-height: 32px;
            cursor: pointer;
        }
        .submit {
            @include themeify {
                background: themed("btn1-color");
            }
            margin-right: 20px;
        }
        .reset {
            opacity: 0.3;
            @include themeify {
                background: themed("btn1-color");
            }
        }
    }
}

:deep(.ant-picker) {
    width: 100%;
}
</style>
