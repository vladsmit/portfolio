<template>
    <v-card>
        <v-hover v-slot="{ hover }">
            <v-img max-height="150" max-width="150" :src="photo.thumbnailUrl">
                <v-expand-transition>
                    <v-btn
                        v-if="hover"
                        color="secondary"
                        elevation="2"
                        style="height: 100%"
                        class="darken-3 v-card--reveal white--text"
                        @click="
                            $router.push({
                                name: 'photoInfo',
                                params: {
                                    category: categoryIndex + 1,
                                    id: photo.id,
                                },
                            })
                        "
                        >Подробнее</v-btn
                    >
                </v-expand-transition>
            </v-img>
        </v-hover>
    </v-card>
</template>
<script>
export default {
    name: "PhotoCard",

    props: ["photo", "categoryIndex"],
}
</script>

<style lang="scss" scoped>
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.5;
    position: absolute;
    width: 100%;
}
</style>