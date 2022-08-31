<script setup lang="ts">
import * as echarts from "echarts";
import { markRaw } from "vue";
import debounce from "lodash/debounce";
const data = reactive<any>({
    myChart: null,
    resizeHandler: null,
});
const chartDom = ref();
const createChart = () => {
    if (!data.myChart) {
        let charts = markRaw(echarts.init(chartDom.value));
        data.myChart = charts;
        data.resizeHandler = debounce(() => {
            data.myChart.resize();
        }, 100);
        window.addEventListener("resize", data.resizeHandler);
    }
    let option = {
        legend: {
            left: "right",
            itemWidth: 20,
            itemHeight: 20,
            itemGap: 20,
            textStyle: {
                color: "#fff",
            },
        },
        tooltip: {},
        grid: {
            left: "8%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        dataset: {
            source: [
                ["product", "测试1", "测试2", "测试3", "测试4"],
                ["test1", 15, 18, 8, 12],
                ["test2", 20, 15, 9, 13],
                ["test3", 24, 16, 18, 7],
                ["test4", 7, 21, 14, 12],
                ["test5", 15, 19, 12, 21],
                ["test6", 20, 14, 16, 8],
            ],
        },
        color: ["#00EA9C", "#1E90FF", "#9362FA", "#FFDD77"],
        xAxis: {
            type: "category",
            axisLabel: {
                color: "rgba(255,255,255,0.70)",
            },
        },
        yAxis: {
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                },
            },
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
            {
                type: "bar",
                label: {
                    show: true,
                    position: "top",
                    color: "#fff",
                    fontSize: 16,
                },
                barCategoryGap: "40%" /*多个并排柱子设置柱子之间的间距*/,
            },
            {
                type: "bar",
                label: {
                    show: true,
                    position: "top",
                    color: "#fff",
                    fontSize: 16,
                },
            },
            {
                type: "bar",
                label: {
                    show: true,
                    position: "top",
                    color: "#fff",
                    fontSize: 16,
                },
            },
            {
                type: "bar",
                label: {
                    show: true,
                    position: "top",
                    color: "#fff",
                    fontSize: 16,
                },
            },
        ],
    };
    data.myChart.setOption(option);
};
onMounted(() => {
    createChart();
});
onBeforeUnmount(() => {
    data.myChart?.dispose();
    window.addEventListener("resize", data.resizeHandler);
});
</script>

<template>
    <div>
        <div class="myChart" ref="chartDom"></div>
    </div>
</template>

<style lang="scss" scoped>
.myChart {
    width: 1100px;
    height: 300px;
}
</style>
