<script setup lang="ts">
// 已自动引入vue pinia vue-router
// import { ref, reactive, watch } from "vue";
// import { storeToRefs } from "pinia";
import { nanoid } from "nanoid";
import { useTodos } from "@/store";
import { ID, todoItem } from "@/types/todo";

// 获取pinia数据
const todoStore = useTodos();
const { todosWidthKey } = storeToRefs(todoStore);

// 定义数据
const todoVal = ref<string>("");

const state = reactive({
    hasFinish: 0,
    total: 0,
    selectedRowKeys: [] as ID[],
});

const rowSelection = reactive({
    onChange: (selectedRowKeys: ID[]) => {
        state.selectedRowKeys = selectedRowKeys;
    },
});

// 表格项
const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "计划",
        dataIndex: "plan",
        key: "plan",
    },
    {
        title: "状态",
        key: "status",
        dataIndex: "hasCheck",
    },
    {
        title: "操作",
        key: "action",
    },
];

// 新增方法
const handleCreate = () => {
    const obj: todoItem = {
        id: nanoid(10),
        plan: todoVal.value,
        hasCheck: false,
    };
    todoStore.increateItem(obj);
};

// 已完成事件
const handleFinish = (item: todoItem) => {
    todoStore.updateStatu(item.id, true);
};

// 未完成事件
const handleUnFinish = (item: todoItem) => {
    todoStore.updateStatu(item.id, false);
};

// 删除事件
const handleCancel = (item: todoItem) => {
    todoStore.deleteItem(item.id);
};

// 删除所选事件
const handleDelChange = () => {
    todoStore.deleteChoose(state.selectedRowKeys);
};

// 监听数据
watch(
    () => todosWidthKey.value,
    (val) => {
        if (val) {
            state.hasFinish = val.filter(
                (item: todoItem) => item.hasCheck
            ).length;
            state.total = val.length;
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="container">
        <!-- 新增表单 -->
        <div class="header">
            <a-input v-model:value="todoVal" style="width: 500px" />
            <a-button type="primary" @click="handleCreate">新增</a-button>
        </div>
        <!-- 列表信息 -->
        <div class="list">
            <a-table
                :columns="columns"
                :data-source="todosWidthKey"
                :row-selection="rowSelection"
                :row-key="(record) => record.id"
                :pagination="false"
            >
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'status'">
                        <span>
                            <a-tag :color="record.hasCheck ? 'green' : 'red'">
                                {{ record.hasCheck ? "已完成" : "未完成" }}
                            </a-tag>
                        </span>
                    </template>
                    <template v-if="column.key === 'action'">
                        <span>
                            <a @click="handleFinish(record)">完成计划</a>
                            <a-divider type="vertical" />
                            <a @click="handleUnFinish(record)">暂未完成</a>
                            <a-divider type="vertical" />
                            <a-popconfirm
                                trigger="click"
                                title="确定删除计划吗?"
                                ok-text="确定"
                                cancel-text="取消"
                                @confirm="handleCancel(record)"
                            >
                                <a>删除计划</a>
                            </a-popconfirm>
                        </span>
                    </template>
                </template>
            </a-table>
        </div>
        <!-- 底部信息 -->
        <div class="footer">
            <a-popconfirm
                trigger="click"
                :title="`确定删除选中${state.selectedRowKeys.length}项吗?`"
                ok-text="确定"
                cancel-text="取消"
                @confirm="handleDelChange"
                :disabled="state.selectedRowKeys.length === 0"
            >
                <a-button type="primary" danger :disabled="state.selectedRowKeys.length === 0">删除选中</a-button>
            </a-popconfirm>

            <span
                >共{{ state.total }}项计划，已完成计划有{{
                    state.hasFinish
                }}项</span
            >
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 800px;
    margin: 20px auto;
    .header {
        display: flex;
        justify-content: center;
        padding-bottom: 8px;
    }
    .footer {
        display: flex;
        justify-content: space-between;
        padding: 10px 5px;
    }
}
</style>
