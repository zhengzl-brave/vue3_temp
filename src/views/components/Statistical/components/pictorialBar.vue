<script setup lang="ts">
import * as echarts from "echarts";
import { markRaw } from "vue";
import debounce from "lodash/debounce";
const data = reactive<any>({
    myChart: null,
    resizeHandler: null,
});
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
            axisPointer: {
                type: "none",
            },
            formatter: function (params: any) {
                return params[0].name + ": " + params[0].value;
            },
        },
        grid: {
            left: "8%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: {
            data: ["test1", "test2", "test3", "test4"],
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
                color: "rgba(255,255,255,0.70)",
            },
        },
        yAxis: {
            max: 250,
            min: 0,
            splitNumber: 5,
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                },
            },
            name: "(个)",
            nameTextStyle: {
                fontSize: 14,
                color: "rgba(255,255,255,0.70)",
                padding: [0, 24, 0, 0],
            },
        },
        color: ["rgba(30,144,255,0.7)"],
        series: [
            {
                name: "hill",
                type: "pictorialBar",
                barCategoryGap: "40%",
                symbol: "triangle",
                label: {
                    show: true,
                    position: "top",
                    color: "#fff",
                    fontSize: 16,
                },
                data: [180, 144, 152, 192],
                z: 10,
            },
            {
                name: "glyph",
                type: "pictorialBar",
                barGap: "-100%",
                symbolPosition: "end",
                symbolSize: 50,
                symbolOffset: [0, "-120%"],
            },
        ],
    };
    data.myChart.setOption(option);
};
const chartDom = ref();
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
