<template>
    <div class="weather-box">
        <div class="weather-box__icon-box">
            <div class="weather-box__icon-box__info">
                <span class="temp">23&deg;C</span>
                <span class="desc">Partly Sunny</span>
                <span class="update">Updated 1:48pm</span>
            </div>
            <img src="@assets/images/test.svg" alt="" class="weather-box__icon-box__icon" />
        </div>
        <div class="weather-box__detail">
            <span class="weather-box__detail__item">Barometer 1009.0mb</span>
            <span class="weather-box__detail__item">Feels like 25&deg;C</span>
            <span class="weather-box__detail__item">Humidity 41%</span>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import "@assets/styles/main.scss";

.weather-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__icon-box {
        display: flex;
        align-items: center;
        justify-content: center;

        gap: 48px;

        &__info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .temp {
                font-weight: 500;
                font-size: 88px;
            }
            .desc {
                font-weight: 100;
                font-size: 28px;

                margin-top: -12px;
            }
            .update {
                font-weight: 100;
            }
        }
        &__icon {
            height: 180px;
        }
    }
    &__detail {
        display: flex;
        align-items: center;
        justify-content: center;

        gap: 24px;
        margin-top: 16px;

        font-weight: 300;
    }
}
</style>
