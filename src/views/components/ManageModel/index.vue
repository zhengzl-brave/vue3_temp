<script setup lang="ts">
import type { SelectProps } from "ant-design-vue";
import { manageList } from "@/api/manage";
import { Dayjs } from "dayjs";
import { manageItem } from "@/types/manage";
import { useManage } from "@/store";
import MangePopup from "./popup.vue";
export interface dataState {
    valueOne: string;
    valueTwo: string;
    valueThree: string;
    manageList: manageItem[];
    total?: number;
    pageSize?: number;
    current?: number;
}
export interface columnsState {
    title: string;
    key: string;
    dataIndex?: string | string[];
    align?: "left" | "right" | "center";
    width?: string | number;
}
const options: SelectProps["options"] = [
    { value: "jack", label: "Jack" },
    { value: "lucy", label: "Lucy" },
    { value: "tom", label: "Tom" },
];
const data = reactive<dataState>({
    valueOne: "Lucy",
    valueTwo: "",
    valueThree: "",
    manageList: [],
    total: 0,
    pageSize: 10,
    current: 1,
});
const startTime = ref<Dayjs>();
const endTime = ref<Dayjs>();
const manageStore = useManage();
const { popuVisible } = storeToRefs(manageStore);

onMounted(() => {
    document.body.style.background = "#032138";
    getList();
});
onBeforeUnmount(() => {
    document.body.style.background = "";
});
const handleSuccess = () => {
    console.log("成功触发了");
    getList();
};
const columns: columnsState[] = [
    {
        title: "序号",
        key: "index",
    },
    {
        title: "数据来源",
        key: "datSource",
        dataIndex: "datSource",
        align: "center",
    },
    {
        title: "问题类型",
        key: "questionType",
        dataIndex: "questionType",
        align: "center",
    },
    {
        title: "排水类型",
        key: "drainType",
        dataIndex: "drainType",
        align: "center",
    },
    {
        title: "排水分区",
        key: "drainArea",
        dataIndex: "drainArea",
        align: "center",
    },
    {
        title: "所属镇街",
        key: "aboutRoald",
        dataIndex: "aboutRoald",
        align: "center",
    },
    {
        title: "设施类型",
        key: "facilityType",
        dataIndex: "facilityType",
        align: "center",
    },
    {
        title: "处理状态",
        key: "disposeState",
        dataIndex: "disposeState",
        align: "center",
    },
    {
        title: "处理人员",
        key: "disposePerson",
        dataIndex: "disposePerson",
        align: "center",
    },
    {
        title: "处理时间",
        key: "disposeTime",
        dataIndex: "disposeTime",
        align: "center",
    },
    {
        title: "操作",
        key: "operate",
        width: 160,
        align: "center",
    },
];
const getList = async () => {
    const res = await manageList({
        pageSize: 10,
        pageNum: data.current as number,
    });
    data.manageList = res.res;
    data.total = res.total;
};
const pagination = computed(() => ({
    total: data.total,
    current: data.current,
    pageSize: data.pageSize,
}));
const handleTableChange = (e: any) => {
    data.current = e.current;
    getList();
};
const rowSelection = reactive({});

const handleIncreate = () => {
    manageStore.setPopupVisible(true);
};
</script>

<template>
    <div class="out-wrap">
        <div class="title">数据问题台账</div>
        <div class="search">
            <div class="select-item">
                <span>问题类型</span>
                <select-option :value="data.valueOne" :options="options" />
            </div>
            <div class="select-item">
                <span>排水分区</span>
                <select-option :value="data.valueTwo" :options="options" />
            </div>
            <div class="select-item">
                <span>处理状态</span>
                <select-option :value="data.valueThree" :options="options" />
            </div>
            <div class="select-item">
                <span>查询时间</span>
                <a-date-picker
                    v-model:value="startTime"
                    placeholder="选择起始时间"
                />
                <span style="padding: 0 5px">-</span>
                <a-date-picker
                    v-model:value="endTime"
                    placeholder="选择结束时间"
                />
            </div>
            <div class="search-btn">
                <div class="btn-sear">搜索</div>
                <div class="btn-reset">重置</div>
                <div class="out-info" @click="handleIncreate">新增</div>
            </div>
        </div>
        <div class="table-info">
            <a-table
                :columns="columns"
                :data-source="data.manageList"
                :row-selection="rowSelection"
                :row-key="(record) => record.id"
                :pagination="pagination"
                @change="handleTableChange"
            >
                <template #bodyCell="{ column, record, index }">
                    <template v-if="column.key === 'index'">
                        <span>{{ index + 1 }}</span>
                    </template>
                    <template v-if="column.key === 'operate'">
                        <div class="btns">
                            <div class="opt-btn">详情</div>
                            <div class="opt-btn">删除</div>
                        </div>
                    </template>
                </template>
            </a-table>
        </div>
    </div>
    <mange-popup :visible="popuVisible" @success="handleSuccess" />
</template>

<style lang="scss" scoped>
.out-wrap {
    width: calc(100% - 120px);
    opacity: 0.8;
    @include themeify {
        background: themed("main-color");
    }
    border-radius: 10px;
    position: absolute;
    top: 75px;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    .title {
        @include themeify {
            color: themed("font-color");
        }
        font-size: 14px;
        font-weight: 600;
        height: 48px;
        line-height: 48px;
        padding-left: 20px;
    }
    .search {
        display: flex;
        margin-left: 24px;
        .select-item {
            display: flex;
            margin-right: 20px;
            align-items: center;
            span {
                font-weight: 400;
                font-size: 14px;
                @include themeify {
                    color: rgba(themed("font-color"), 0.8);
                }
                text-align: right;
                line-height: 22px;
                padding-right: 5px;
            }
        }
        .search-btn {
            display: flex;
            .btn-sear {
                width: 80px;
                height: 32px;
                line-height: 32px;
                @include themeify {
                    background: themed("btn1-color");
                }
                border-radius: 3px;
                font-weight: 400;
                font-size: 14px;
                @include themeify {
                    color: themed("font-color");
                }
                text-align: center;
                margin-right: 12px;
                cursor: pointer;
            }
            .btn-reset {
                width: 80px;
                height: 32px;
                line-height: 32px;
                opacity: 0.3;
                @include themeify {
                    background: themed("btn1-color");
                }
                border-radius: 3px;
                font-weight: 400;
                font-size: 14px;
                @include themeify {
                    color: rgba(themed("font-color"), 0.9);
                }
                text-align: center;
                cursor: pointer;
            }
            .out-info {
                width: 80px;
                height: 32px;
                opacity: 0.9;
                @include themeify {
                    background: themed("btn2-color");
                }
                border-radius: 3px;
                font-weight: 400;
                font-size: 14px;
                @include themeify {
                    color: themed("font-color");
                }
                text-align: center;
                line-height: 32px;
                position: absolute;
                right: 20px;
                cursor: pointer;
            }
        }
    }
    .table-info {
        padding: 30px 20px;
        .btns {
            display: flex;
            justify-content: space-around;
            .opt-btn {
                width: 48px;
                height: 28px;
                @include themeify {
                    background: rgba(themed("btn3-color"), 0.3);
                    border: 1px solid rgba(themed("btn3-border-color"), 0.6);
                }
                border-radius: 2px;
                text-align: center;
                line-height: 28px;
            }
        }
    }
}

.ant-table-wrapper {
    :deep(.ant-table-thead > tr > th) {
        @include themeify {
            background: rgba(themed("font-color"), 0.04);
            color: rgba(themed("font-color"), 0.6);
        }
    }
    :deep(.ant-table) {
        background: none;
        @include themeify {
            color: themed("font-color");
        }
    }
    :deep(.ant-table-tbody > tr.ant-table-row:hover > td, .ant-table-tbody
            > tr
            > td.ant-table-cell-row-hover) {
        @include themeify {
            background: rgba(themed("font-color"), 0.04);
            color: rgba(themed("font-color"), 0.6);
        }
    }
    :deep(.ant-table-tbody > tr.ant-table-row-selected > td) {
        background: unset;
        border-color: unset;
    }
}
</style>
