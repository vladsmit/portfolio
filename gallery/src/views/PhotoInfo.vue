<template>
    <div class="infoPage--wrapper">
        <template v-if="getCategories && !getLoadingStatus">
            <img :src="getActualPhoto.url" alt="photo" />
            <p>
                Заголовок картинки:
                {{ getActualPhoto.title }}
            </p>
            <p>
                Номер картинки:
                {{ getActualPhoto.id }}
            </p>
            <p>
                Ссылка на картинку:
                {{ getActualPhoto.url }}
            </p>
            <button
                class="infoPage__button"
                @click="$router.push({ name: 'home' })"
            >
                Вернуться в галлерею
            </button>
        </template>
        <spinner v-else />
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Spinner from "../components/Spinner";

export default {
    name: "PhotoInfo",

    components: {
        Spinner,
    },

    computed: {
        ...mapGetters(["getCategories", "getLoadingStatus"]),

        getActualPhoto() {
            return this.getCategories[this.$route.params.category - 1].find(
                (el) => el.id === parseInt(this.$route.params.id)
            );
        },
    },

    methods: {
        ...mapMutations(["isLoading"]),
    },

    mounted() {
        this.isLoading(true);
        setTimeout(() => {
            this.isLoading(false);
        }, 500);

        if (
            this.$route.params.category > this.getCategories.length ||
            /\D/.test(this.$route.params.category)
        ) {
            this.$router.push({ name: 'home' });
        }
    },
};
</script>

<style lang="scss" scoped>
.infoPage__button {
    border: 2px solid black;
    border-radius: 10px;
    padding: 10px;
}
</style>