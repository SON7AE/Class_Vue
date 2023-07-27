<template>
    <div class="daily-weather">
        <div class="daily-weather__data">
            <span class="daily-weather__data__date">Thu</span>
            <div class="daily-weather__data__temp">
                <span class="high">24&deg;</span>
                /
                <span class="low">14&deg;</span>
            </div>
            <div class="daily-weather__data__icon">
                <img src="@assets/images/test.svg" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import "@assets/styles/main.scss";

.daily-weather {
    display: flex;
    align-items: center;
    justify-content: center;

    &__data {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &__date {
            font-size: 32px;
            font-weight: 100;
        }
        &__temp {
            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 32px;
            font-weight: 100;

            color: $color-white-200;

            .high {
                color: $color-black-900;
            }
        }

        &__icon {
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: 90px;
                height: 90px;
            }
        }
    }
}
</style>
