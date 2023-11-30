import { defineStore } from "pinia"
import axios from "axios"

export const useStore = defineStore("openWeatherApi", {
    state: () => {
        return {
            cityName: "",
            current: {
                temp: "", // 현재온도
                desc: "", // 날씨묘사
                icon: "", // 날씨아이콘
                barometer: "", // 기압
                feelsLike: "", // 체감온도
                humidity: "", // 습도
                uvi: "", // 자외선 수치
            },
            hourly: [], // 시간대별 날씨 데이터
        }
    },
    actions: {
        async fetchApi(payload) {
            const API_KEY = "284bfdeb630520653864189833ba7c68"
            // 위도 경도 좌표 변수
            let axisLat = payload.lat
            let axisLon = payload.lon

            try {
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${axisLat}&lon=${axisLon}&appid=${API_KEY}&units=metric`)
                const current = res.data.current
                const hourly = res.data.hourly
                console.log(payload)
                // 데이터 설정
                // state.cityName = data.timezone.split("/")[1] // 테스트 코드
                this.cityName = payload.cityName
                this.current.temp = Math.floor(current.temp)
                this.current.desc = current.weather[0].description
                this.current.barometer = current.pressure
                this.current.feelsLike = current.feels_like
                this.current.humidity = current.humidity
                this.current.uvi = current.uvi
                this.current.icon = current.weather[0].icon
                this.hourly = hourly.splice(23, hourly.length - 1)
            } catch (error) {
                console.log(error)
            }
        },
    },
})
