<template>
    <v-app id="inspire">
        <v-layout justify-center="true">
            <v-progress-circular
                indeterminate
                color="primary"
            ></v-progress-circular>
        </v-layout>
    </v-app>
</template>
<script>
export default {
    name: "Spinner",
};
</script>
<style lang="scss" scoped>
.v-progress-circular {
    margin: 10rem;
}
</style>