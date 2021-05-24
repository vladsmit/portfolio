<template>
    <v-container>
        <p class="font-weight-medium text-center my-16">
            Ошибка 404: page not found
        </p>
        <come-back-button />
    </v-container>
</template>

<script>
import ComeBackButton from "../components/ComeBackButton";
export default {
    name: "ErrorPage",

    components: {
        ComeBackButton,
    },
};
</script>

<style lang="scss" scoped>
p {
    font-size: 34px;
}
</style>