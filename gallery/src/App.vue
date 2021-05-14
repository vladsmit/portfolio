<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "App",

    methods: {
        ...mapActions(["getPhotosFromApi"]),
    },

    created() {
        this.getPhotosFromApi();
    },

    
};
</script>
<style lang="scss" scoped>
body {
    margin: 0;
}

#app {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    border: 1px solid black;
}
</style>
