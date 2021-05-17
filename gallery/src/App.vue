<template>
    <layout />
</template>

<script>
import { mapActions } from "vuex";
import Layout from "./views/Layout";
export default {
    name: "App",

    components: {
        Layout,
    },

    methods: {
        ...mapActions(["getPhotosFromApi"]),
    },

    created() {
        this.getPhotosFromApi();
    },
};
</script>
