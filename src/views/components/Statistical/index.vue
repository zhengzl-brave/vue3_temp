<script setup lang="ts">
import pieChart from "./components/pieChart.vue";
import stackedChart from "./components/stackedChart.vue";
import pictorialBar from "./components/pictorialBar.vue";
import lineChart from "./components/lineChart.vue";
import barChart from "./components/barChart.vue";

const data = reactive({});
onMounted(() => {
    document.body.style.background = "#032138";
});
onBeforeUnmount(() => {
    document.body.style.background = "";
});
</script>

<template>
    <div class="main">
        <div class="header">
            <div class="top">
                <div class="title">数据问题台账</div>
                <div class="btns">
                    <div class="btn1 btn">台账管理</div>
                    <div class="btn2 btn">统计分析</div>
                </div>
            </div>
            <div class="bottom">
                <div class="one">
                    <div class="title">海珠区数据问题统计分析（2022年度）</div>
                    <div class="right-btn">
                        <div class="btn1 btn">本年</div>
                        <div class="btn2 btn">本月</div>
                    </div>
                </div>
                <div class="two">
                    <div class="com-info">
                        <span>数据问题总数</span>
                        <span>3,200个</span>
                    </div>
                    <div class="com-info">
                        <span>APP上报总数</span>
                        <span>2,200个</span>
                    </div>
                    <div class="com-info">
                        <span>工具质检总数</span>
                        <span>1,200个</span>
                    </div>
                    <div class="time">更新时间：2022-08-04 08:00:00</div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="cont-top">
                <div class="wrap-left top-box">
                    <div class="title">数据问题类型统计</div>
                    <div class="chart">
                        <span>（个）</span>
                        <pie-chart />
                    </div>
                </div>
                <div class="wrap-mid top-box">
                    <div class="head">
                        <div class="title">数据质检情况统计</div>
                        <div class="btns">
                            <div class="left">办理统计</div>
                            <div class="right">质检统计</div>
                        </div>
                    </div>
                    <div class="chart">
                        <stacked-chart />
                    </div>
                </div>
                <div class="wrap-right top-box">
                    <div class="title">办理情况统计</div>
                    <div class="chart">
                        <pictorial-bar />
                    </div>
                </div>
            </div>
            <div class="cont-bottom">
                <div class="wrap-left bot-box">
                    <div class="title">办理情况统计</div>
                    <div class="chart">
                        <line-chart />
                    </div>
                </div>
                <div class="wrap-right bot-box">
                    <div class="title">各类型问题办理情况</div>
                    <div class="chart">
                        <bar-chart />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: calc(100% - 120px);
    height: 100%;
    margin: 0 auto;
    .header {
        height: 196px;
        width: 100%;
        opacity: 0.8;
        @include themeify {
            background: themed("main-color");
        }
        border-radius: 10px;
        margin-top: 16px;
        .top {
            display: flex;
            height: 48px;
            @include themeify {
                border-bottom: 1px solid rgba(themed("font-color"), 0.1);
            }
            padding: 0 20px;
            .title {
                @include themeify {
                    color: themed("font-color");
                }
                font-weight: 600;
                font-size: 16px;
                line-height: 48px;
                margin-right: 22px;
            }
            .btns {
                display: flex;
                align-items: center;
                @include themeify {
                    color: themed("font-color");
                }
                .btn {
                    width: 100px;
                    height: 28px;
                    border-radius: 2px 0 0 2px;
                    text-align: center;
                    line-height: 28px;
                    font-weight: 400;
                    font-size: 14px;
                }
                .btn1 {
                    background: rgba(30, 144, 255, 0.2);
                    border: 1px solid rgba(30, 144, 255, 0.4);
                }
                .btn2 {
                    background: #1e90ff;
                }
            }
        }
        .bottom {
            display: flex;
            flex-direction: column;
            .one {
                display: flex;
                height: 71px;
                position: relative;
                .title {
                    @include themeify {
                        color: themed("font-color");
                    }
                    font-weight: 600;
                    font-size: 20px;
                    margin-top: 25px;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .right-btn {
                    display: flex;
                    position: absolute;
                    right: 20px;
                    margin-top: 26px;
                    .btn {
                        width: 76px;
                        height: 28px;
                        border-radius: 2px 0 0 2px;
                        text-align: center;
                        line-height: 28px;
                        @include themeify {
                            color: themed("font-color");
                            font-weight: 400;
                            font-size: 14px;
                        }
                    }
                    .btn1 {
                        background: rgba(30, 144, 255, 0.8);
                        border: 1px solid #0090ff;
                    }
                    .btn2 {
                        background: rgba(30, 144, 255, 0.3);
                        border: 1px solid rgba(0, 144, 255, 0.6);
                    }
                }
            }
            .two {
                display: flex;
                position: relative;
                .com-info {
                    width: 400px;
                    height: 60px;
                    background-image: linear-gradient(
                        90deg,
                        rgba(30, 144, 255, 0.24) 0%,
                        rgba(0, 61, 225, 0.08) 100%
                    );
                    border-radius: 4px;
                    display: flex;
                    justify-content: space-between;
                    padding: 0 24px;
                    line-height: 60px;
                    margin-right: 16px;
                    span:nth-child(1) {
                        font-weight: 500;
                        font-size: 16px;
                        @include themeify {
                            color: themed("font-color");
                        }
                    }
                    span:nth-child(2) {
                        font-weight: 600;
                        font-size: 24px;
                        color: #1e90ff;
                    }
                    &:nth-child(1) {
                        margin-left: 30px;
                    }
                }
                .time {
                    position: absolute;
                    right: 30px;
                    top: 50%;
                    transform: translateY(-50%);
                    @include themeify {
                        color: themed("font-color");
                    }
                    font-weight: 500;
                    font-size: 16px;
                }
            }
        }
    }
    .container {
        display: flex;
        flex-direction: column;
        .cont-top {
            display: flex;
            margin-top: 16px;
            .top-box {
                width: 33.33%;
                height: 360px;
                border-radius: 10px;
                @include themeify {
                    background: rgba(themed("main-color"), 0.8);
                }
            }
            .wrap-left {
                position: relative;
                .title {
                    @include themeify {
                        color: themed("font-color");
                    }
                    font-weight: 600;
                    font-size: 16px;
                    position: absolute;
                    left: 16px;
                    top: 16px;
                }
                .chart {
                    margin-top: 38px;
                    display: flex;
                    flex-direction: column;
                    span {
                        position: absolute;
                        right: 9%;
                        font-weight: 500;
                        font-size: 14px;
                        color: rgba(255, 255, 255, 0.7);
                    }
                }
            }
            .wrap-mid {
                margin: 0 16px;
                position: relative;
                display: flex;
                flex-direction: column;
                .head {
                    height: 38px;
                    display: flex;
                    justify-content: space-between;
                    padding: 16px 16px 0 16px;
                    .title {
                        @include themeify {
                            color: themed("font-color");
                        }
                        font-weight: 600;
                        font-size: 16px;
                    }
                    .btns {
                        display: flex;
                        @include themeify {
                            color: themed("font-color");
                        }
                        .left {
                            width: 76px;
                            height: 28px;
                            background: rgba(30, 144, 255, 0.8);
                            border: 1px solid #0090ff;
                            border-radius: 2px 0 0 2px;
                            font-weight: 400;
                            font-size: 14px;
                            text-align: center;
                            line-height: 28px;
                        }
                        .right {
                            width: 76px;
                            height: 28px;
                            background: rgba(30, 144, 255, 0.3);
                            border: 1px solid rgba(0, 144, 255, 0.6);
                            border-radius: 0 2px 2px 0;
                            font-weight: 400;
                            font-size: 14px;
                            text-align: center;
                            line-height: 28px;
                        }
                    }
                }
            }
            .wrap-right {
                position: relative;
                .title {
                    @include themeify {
                        color: themed("font-color");
                    }
                    font-weight: 600;
                    font-size: 16px;
                    position: absolute;
                    left: 16px;
                    top: 16px;
                }
                .chart {
                    margin-top: 38px;
                }
            }
        }
        .cont-bottom {
            display: flex;
            margin-top: 16px;
            .bot-box {
                height: 360px;
                border-radius: 10px;
                @include themeify {
                    background: rgba(themed("main-color"), 0.8);
                }
            }
            .wrap-left {
                flex: 1;
                margin-right: 16px;
                position: relative;
                .title {
                    @include themeify {
                        color: themed("font-color");
                    }
                    font-weight: 600;
                    font-size: 16px;
                    position: absolute;
                    left: 16px;
                    top: 16px;
                }
                .chart {
                    margin-top: 38px;
                    display: flex;
                    flex-direction: column;
                    span {
                        position: absolute;
                        right: 9%;
                        font-weight: 500;
                        font-size: 14px;
                        color: rgba(255, 255, 255, 0.7);
                    }
                }
            }
            .wrap-right {
                flex: 2;
                position: relative;
                .title {
                    @include themeify {
                        color: themed("font-color");
                    }
                    font-weight: 600;
                    font-size: 16px;
                    position: absolute;
                    left: 16px;
                    top: 16px;
                }
                .chart {
                    margin-top: 38px;
                    display: flex;
                    flex-direction: column;
                    span {
                        position: absolute;
                        right: 9%;
                        font-weight: 500;
                        font-size: 14px;
                        color: rgba(255, 255, 255, 0.7);
                    }
                }
            }
        }
    }
}
</style>
