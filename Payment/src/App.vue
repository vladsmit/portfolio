<template>
    <div id="app">
        <ProfileMenu />
        <div class="main--wrapper">
            <router-view />
            <Footer />
        </div>
    </div>
</template>

<script>
import ProfileMenu from "@/components/ProfileMenu.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: "App",
    components: {
        ProfileMenu,
        Footer,
    },
};
</script>

<style lang="scss">
body {
    width: 100vw;
    height: 100vh;
    background-color: black;
    margin: 0 auto;
}

#app {
    width: 700px;
    display: flex;
    margin: 0 auto;
    padding-top: 40px;
}

.main--wrapper {
    width: 67%;
}

@media only screen and (max-width: 480px) {
    #app {
        width: 480px;
        flex-direction: column;
        padding: 0;
    }

    .main--wrapper {
        width: 100%;
    }
}
</style>