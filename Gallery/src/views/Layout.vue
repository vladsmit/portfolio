<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
            <v-list dense>
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img src="../assets/avatar_circle.png"/>
                    </v-list-item-avatar>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-content>
                        <v-list-item-title class="title">
                            Влад Ковалев
                        </v-list-item-title>
                        <v-list-item-subtitle
                            >vladsmit88@gmail.com</v-list-item-subtitle
                        >
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link @click="$router.push({ name: 'home' })">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Галерея</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link @click="$router.push({ name: 'about' })">
                    <v-list-item-action>
                        <v-icon aria-hidden="false"> mdi-account </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Обо мне</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="blue" dark>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-toolbar-title>Галерея</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>
        <v-footer color="blue" app>
            <span class="white--text"
                >&copy; {{ new Date().getFullYear() }}</span
            >
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: "Layout",
    
    data: () => ({
        drawer: false,
        group: null,
        alignments: ["start", "center", "end"],
    }),

    watch: {
        group() {
            this.drawer = false;
        },
    },
}
</script>