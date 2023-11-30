<template>
    <div class="page">
        <header class="page__header">
            <span class="page__header__region">{{ cityName }}, Korea</span>
            <span class="page__header__date">{{ date }}</span>
        </header>
        <body class="page__body">
            <div class="page__body__main">
                <div class="data-box">
                    <WEATHERBOX :data="currentData" />
                    <div class="data-box__graph-box">
                        <GRAPH v-for="item in graphData" :key="item" :data="item" />
                    </div>
                </div>
                <MAP />
            </div>
            <div class="page__body__daily">
                <DAILYWEATHER v-for="item in hourlyData" :key="item" :data="item" />
            </div>
        </body>
    </div>
</template>

<script setup>
import WEATHERBOX from "@components/mocules/WeatherBox.vue"
import GRAPH from "@components/mocules/Graph.vue"
import DAILYWEATHER from "@components/mocules/DailyWeather.vue"
import MAP from "@components/mocules/Map.vue"
import { useStore } from "@store/pinia"
import dayjs from "dayjs"
import { reactive, computed } from "vue"

// Default Seoul Axis
const axis = reactive({
    lat: 37.5683,
    lon: 126.9778,
    cityName: "Seoul",
})
const store = useStore()
store.fetchApi(axis)

const cityName = computed(() => {
    // 해당 도시 이름
    return store.cityName
})
const date = computed(() => {
    // 현재 날짜 및 시간
    const current = dayjs(new Date())
    return current.format("dd, DD MMM YYYY")
})
const currentData = computed(() => {
    // 현재 시간에 따른 날씨 데이터
    return store.current
})
const graphData = computed(() => {
    // 그래프 데이터
    const res = [
        {
            label: "Precipitation",
            value: "38%",
        },
        {
            label: "Humidity",
            value: currentData.value.humidity + "%",
        },
        {
            label: "UV Index",
            value: currentData.value.uvi + "μω/㎠",
        },
    ]
    return res
})
const hourlyData = computed(() => {
    // 일일 데이터
    const res = store.hourly
    res.forEach((item) => {
        item.dt = Unix_timeStamp(item.dt)
    })

    return res
})
// 시간데이터 양식
function Unix_timeStamp(dt) {
    let date = new Date(dt * 1000)
    let hour = date.getHours().toString().padStart(2, "0")

    return hour.substring(-2) + "시"
}
</script>

<style lang="scss" scoped>
@import "@assets/styles/main.scss";

.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    &__header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &__region {
            font-size: 48px;
        }
        &__date {
            font-weight: 300;
        }
    }
    &__body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;

        &__main {
            display: flex;
            align-items: center;
            justify-content: center;

            gap: 100px;

            .data-box {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                &__graph-box {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    gap: 80px;
                    margin-top: 32px;
                }
            }
        }
        &__daily {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            width: 82.5%;

            margin-top: 48px;
            gap: 48px;

            overflow-x: scroll;

            // /* Hide scrollbar for IE, Edge and Firefox */
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */

            // /* Hide scrollbar for Chrome, Safari and Opera */
            &::-webkit-scrollbar {
                display: none;
            }
        }
    }
}
</style>
