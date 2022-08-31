<script setup lang="ts">
import * as echarts from "echarts";
import { markRaw } from 'vue'
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
            top: '10%',
            left: '70%',
            itemWidth: 15,
            itemHeight: 15,
            itemGap: 20,
            textStyle: {
                color: "#fff",
            },
        },
        grid: {
            left: "8%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: {
            type: "value",
            show: false,
        },
        yAxis: {
            type: "category",
            data: ["2月", "3月", "4月", "5月", "6月", "7月"],
            name: "(个)",
            nameTextStyle: {
                fontSize: 14,
                color: 'rgba(255,255,255,0.70)',
                padding: [0, 24, 0, 0]
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                fontSize: 14,
                color: 'rgba(255,255,255,0.70)'
            },
        },
        color: ["#1E90FF", "#FFDD77"],
        series: [
            {
                name: "测试1",
                type: "bar",
                stack: "total",
                label: {
                    show: true,
                },
                emphasis: {
                    focus: "series",
                },
                data: [202, 182, 212, 172, 232, 220],
                barWidth: 20,
            },
            {
                name: "测试2",
                type: "bar",
                stack: "total",
                label: {
                    show: true,
                },
                emphasis: {
                    focus: "series",
                },
                data: [120, 192, 112, 134, 113, 184],
                barWidth: 20,
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
    height: 320px;
}
</style>
