<script setup lang="ts">
import * as echarts from "echarts";
import { markRaw } from "vue";
import debounce from "lodash/debounce";
const data = reactive<any>({
    myChart: null,
    resizeHandler: null,
    timer: null,
    index: 0,
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
    let myData = [
        { value: 1000, name: "test1" },
        { value: 400, name: "test2" },
        { value: 900, name: "test3" },
        { value: 500, name: "test4" },
        { value: 200, name: "test5" },
        { value: 200, name: "test6" },
    ];
    let option = {
        tooltip: {
            trigger: "item",
        },
        legend: {
            top: "10%",
            left: "58%",
            itemWidth: 20,
            itemHeight: 20,
            itemGap: 20,
            data: myData,
            textStyle: {
                color: "#fff",
                rich: {
                    a: {
                        width: 140,
                    },
                    b: {
                        width: 100,
                        fontSize: 16,
                    },
                },
            },
            orient: "vertical",
            formatter: function (name: any) {
                let serData = myData.filter((item) => {
                    return item.name === name;
                });
                return `{a|${name}}  {b|${serData[0].value}}`;
            },
        },
        color: [
            "#1E90FF",
            "#00EA9C",
            "#FFDD77",
            "#FF913F",
            "#FC5A5A",
            "#9362FA",
        ],
        series: [
            {
                type: "pie",
                radius: ["50%", "80%"],
                center: ["29%", "50%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 4,
                    borderColor: "#000",
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: "center",
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: "26",
                        fontWeight: "bold",
                    },
                },
                labelLine: {
                    show: false,
                },
                data: myData,
            },
        ],
    };
    data.myChart.setOption(option);
    tooltipCarouse(option.series[0].data.length);
    // ???????????????
    data.myChart.on("mouseover", (e: any) => {
        clearInterval(data.timer);
        data.myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: data.index % option.series[0].data.length,
        }); //????????????
        data.index++;
        data.myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: e.dataIndex,
        }); //????????????
        data.myChart.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: e.dataIndex,
        }); //??????tooltip
    });
    // ???????????????????????????
    data.myChart.on("mouseout", (e: any) => {
        data.myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: e.dataIndex,
        }); //??????????????????????????????????????????
        data.index = e.dataIndex--;
        tooltipCarouse(option.series[0].data.length);
    });
};
// ??????????????????echarts
const tooltipCarouse = (length: number) => {
    data.timer = setInterval(() => {
        data.myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: data.index % length,
        }); //????????????
        data.index++;
        data.myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: data.index % length,
        }); //????????????
        data.myChart.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: data.index % length,
        }); //??????tooltip
    }, 1500);
};
onMounted(() => {
    createChart();
});
onBeforeUnmount(() => {
    data.myChart?.dispose();
    window.addEventListener("resize", data.resizeHandler);
    clearInterval(data.timer)
    data.timer = null
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
