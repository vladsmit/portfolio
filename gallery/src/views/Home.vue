<template>
    <div class="mainPage--wrapper">
        <template v-if="getCategories && !getLoadingStatus">
            <div
                class="mainPage__category--wrapper"
                v-for="(category, index) in getCategories"
                :key="index"
            >
                <h2 class="mainPage__category__title">
                    Категория {{ index + 1 }}
                </h2>
                <div
                    class="mainPage__photocard"
                    v-for="photo in category"
                    :key="photo.id"
                >
                    <img
                        :src="photo.thumbnailUrl"
                        alt="photo"
                        class="mainPage__photocard__image"
                    />
                    <button
                        class="mainPage__photocard__button"
                        @click="$router.push({ name: 'photoInfo', params: {category: index + 1, id: photo.id} })"
                    >
                        Подробнее
                    </button>
                </div>
            </div>
        </template>
        <spinner v-else />
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Spinner from "../components/Spinner";

export default {
    name: "Home",

    components: {
        Spinner,
    },

    computed: {
        ...mapGetters(["getLoadingStatus", "getCategories"]),
    },

    methods: {
        ...mapMutations(["isLoading"]),
    },

    mounted() {
        this.isLoading(true);
        setTimeout(() => {
            this.isLoading(false);
        }, 500);
    },
};
</script>

<style lang="scss" scoped>
.mainPage--wrapper {
    min-height: 1100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.mainPage__category--wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.mainPage__category__title {
    width: 100%;
}

.mainPage__photocard {
    position: relative;
    &:hover > .mainPage__photocard__image {
        opacity: 0.5;
    }
    &:hover > .mainPage__photocard__button {
        display: block;
    }
}

.mainPage__photocard__image {
    display: block;
    transition: 300ms ease-out opacity;
}

.mainPage__photocard__button {
    display: none;
    position: absolute;
    top: 54px;
    left: 24px;
    border: 2px solid black;
    border-radius: 10px;
    padding: 10px;
}
</style>
