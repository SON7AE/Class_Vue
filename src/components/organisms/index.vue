<template>
    <div class="page">
        <header class="page__header">
            <span class="page__header__region">Belgrade, Serbia</span>
            <span class="page__header__date"> Wed, 5 Sep 2020 </span>
        </header>
        <body class="page__body">
            <div class="page__body__main">
                <div class="data-box">
                    <WEATHERBOX />
                    <div class="data-box__graph-box">
                        <GRAPH />
                        <GRAPH />
                        <GRAPH />
                    </div>
                </div>
                <div id="map"></div>
            </div>
            <div class="page__body__daily"></div>
        </body>
    </div>
</template>

<script>
import WEATHERBOX from "@components/mocules/weatherBox.vue"
import GRAPH from "@components/mocules/graph.vue"

export default {
    components: { WEATHERBOX, GRAPH },
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
                    margin-top: 48px;
                }
            }
        }
    }
}
</style>
