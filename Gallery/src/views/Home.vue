<template>
    <v-layout column="true" align-center="true" justify-space-between="true">
        <template v-if="getCategories && !getLoadingStatus">
            <category v-for="(category, index) in getCategories" :key="index" :category="category" :categoryIndex="index"/>
        </template>
        <spinner v-else />
    </v-layout>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Spinner from "../components/Spinner";
import Category from "../components/Category";

export default {
    name: "Home",
    
    components: {
        Spinner,
        Category
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
