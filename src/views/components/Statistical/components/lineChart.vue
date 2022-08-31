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
        tooltip: {
            trigger: "axis",
        },
        legend: {
            data: ["普通", "严重"],
            textStyle: {
                color: "#fff",
            },
            left: "right",
        },
        grid: {
            left: "8%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        toolbox: {
            show: false,
        },
        xAxis: {
            type: "category",

            data: ["test1", "test2", "test3", "test4", "test5"],
            axisLabel: {
                color: "rgba(255,255,255,0.70)",
            },
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                name: "测试1",
                type: "line",
                stack: "Total",
                data: [120, 132, 101, 134, 90],
                symbolSize: 8,
                label: {
                    show: true,
                    borderColor: "red", // 拐点边框颜色
                    lineStyle: {
                        width: 5, // 设置线宽
                        type: "dotted", //'dotted'虚线 'solid'实线
                    },
                },
            },
            {
                name: "测试2",
                type: "line",
                stack: "Total",
                data: [220, 182, 191, 234, 290],
                markPoint: {
                    data: [
                        { type: "max", name: "Max" },
                        { type: "min", name: "Min" },
                    ],
                },
                markLine: {
                    data: [{ type: "average", name: "Avg" }],
                    label: {
                        position: "start",
                    },
                    symbol: "none",
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
    width: 550px;
    height: 300px;
}
</style>
