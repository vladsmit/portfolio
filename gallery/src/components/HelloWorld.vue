<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
            <v-list dense>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-email</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Contact</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="blue" dark>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <v-row dense>
                    <v-col>
                        <v-card class="mx-auto" max-width="400">
                            <v-img
                                class="white--text align-end"
                                height="200px"
                                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                            >
                                <v-card-title>Категория 1</v-card-title>
                            </v-img>
                        </v-card>
                        <v-card class="mx-auto" max-width="400">
                            <v-img
                                class="white--text align-end"
                                height="200px"
                                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                            >
                                <v-card-title
                                    >Top 10 Australian beaches</v-card-title
                                >
                            </v-img>
                        </v-card>
                        <v-card class="mx-auto" max-width="400">
                            <v-img
                                class="white--text align-end"
                                height="200px"
                                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                            >
                                <v-card-title
                                    >Top 10 Australian beaches</v-card-title
                                >
                            </v-img>

                            <v-card-subtitle class="pb-0">
                                Number 10
                            </v-card-subtitle>

                            <v-card-text class="text--primary">
                                <div>Whitehaven Beach</div>

                                <div>Whitsunday Island, Whitsunday Islands</div>
                            </v-card-text>

                            <v-card-actions>
                                <v-btn color="orange" text> Share </v-btn>

                                <v-btn color="orange" text> Explore </v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-card class="mx-auto" max-width="400">
                            <v-img
                                class="white--text align-end"
                                height="200px"
                                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                            >
                                <v-card-title
                                    >Top 10 Australian beaches</v-card-title
                                >
                            </v-img>

                            <v-card-subtitle class="pb-0">
                                Number 10
                            </v-card-subtitle>

                            <v-card-text class="text--primary">
                                <div>Whitehaven Beach</div>

                                <div>Whitsunday Island, Whitsunday Islands</div>
                            </v-card-text>

                            <v-card-actions>
                                <v-btn color="orange" text> Share </v-btn>

                                <v-btn color="orange" text> Explore </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
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
    name: "HelloWorld",

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
};
</script>
