<template>
    <v-app id="inspire">
        <div class="spinner--align">
            <v-progress-circular
                indeterminate
                color="primary"
            ></v-progress-circular>
        </div>
    </v-app>
</template>
<script>
export default {
    name: "Spinner",
};
</script>
<style lang="scss" scoped>
.spinner--align {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>