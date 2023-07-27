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
                <div id="map"></div>
            </div>
            <div class="page__body__daily">
                <DAILYWEATHER v-for="item in dailyData" :key="item" :data="item" />
            </div>
        </body>
    </div>
</template>

<script>
import WEATHERBOX from "@components/mocules/weatherBox.vue"
import GRAPH from "@components/mocules/graph.vue"
import DAILYWEATHER from "@components/mocules/dailyWeather.vue"
import store from "@store/index"
import dayjs from "dayjs"

export default {
    components: { WEATHERBOX, GRAPH, DAILYWEATHER },
    created() {
        store.dispatch("openWeatherApi/fetchApi")
    },
    computed: {
        cityName() {
            // 해당 도시 이름
            return store.state.openWeatherApi.cityName
        },
        date() {
            // 현재 날짜 및 시간
            const current = dayjs(new Date())
            return current.format("dd, DD MMM YYYY")
        },
        currentData() {
            // 현재 시간에 따른 날씨 데이터
            return store.state.openWeatherApi.current
        },
        graphData() {
            // 그래프 데이터
            const res = [
                {
                    label: "Precipitation",
                    value: "30%",
                },
                {
                    label: "Humidity",
                    value: this.currentData.humidity + "%",
                },
                {
                    label: "UV Index",
                    value: this.currentData.uvi + "μω/㎠",
                },
            ]
            return res
        },
        dailyData() {
            // 일일 데이터
            const res = store.state.openWeatherApi.hourly
            res.forEach((item) => {
                item.dt = this.Unix_timeStamp(item.dt)
            })

            return res
        },
    },
    methods: {
        Unix_timeStamp(dt) {
            let date = new Date(dt * 1000)
            let hour = date.getHours().toString().padStart(2, "0")

            return hour.substring(-2) + "시"
        },
    },
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

            width: 52.5%;

            margin-top: 48px;
            gap: 48px;

            overflow-x: scroll;
        }
    }
}
</style>
