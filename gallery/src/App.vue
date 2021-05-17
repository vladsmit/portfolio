<template>
    <layout />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Layout from "./views/Layout";
export default {
    name: "App",

    components: {
        Layout,
    },

    computed: {
        ...mapGetters(["getCategories"]),
    },

    methods: {
        ...mapActions(["getPhotosFromApi"]),
    },

    created() {
        this.getPhotosFromApi();
    },
};
</script>
