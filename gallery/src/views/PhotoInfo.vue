<template>
    <v-container>
        <template v-if="getCategories && !getLoadingStatus">
            <v-card class="pt-6 mb-6 mx-auto" max-width="500">
                <v-img
                    max-width="350"
                    max-height="350"
                    :src="getActualPhoto.url"
                    class="ma-auto"
                />
                <v-list>
                    <v-list-item-group>
                        <v-list-item>
                            <v-list-item-icon class="mr-3"
                                ><v-icon color="blue"
                                    >mdi-tag</v-icon
                                ></v-list-item-icon
                            >
                            <v-list-item-content>
                                <v-list-item-title
                                    >Заголовок картинки:
                                    {{
                                        getActualPhoto.title
                                    }}</v-list-item-title
                                >
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-icon class="mr-3"
                                ><v-icon color="blue"
                                    >mdi-tag</v-icon
                                ></v-list-item-icon
                            >
                            <v-list-item-content>
                                <v-list-item-title
                                    >Номер картинки:
                                    {{ getActualPhoto.id }}</v-list-item-title
                                >
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-icon class="mr-3"
                                ><v-icon color="blue"
                                    >mdi-tag</v-icon
                                ></v-list-item-icon
                            >
                            <v-list-item-content>
                                <v-list-item-title
                                    >Ссылка на картинку:
                                    {{ getActualPhoto.url }}</v-list-item-title
                                >
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
            <come-back-button />
        </template>
        <spinner v-else />
    </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Spinner from "../components/Spinner";
import ComeBackButton from "../components/ComeBackButton";

export default {
    name: "PhotoInfo",

    components: {
        Spinner,
        ComeBackButton,
    },

    computed: {
        ...mapGetters(["getCategories", "getLoadingStatus"]),

        getActualPhoto() {
            return this.getCategories[this.$route.params.category - 1].find(
                (el) => el.id === parseInt(this.$route.params.id)
            );
        },
    },

    methods: {
        ...mapMutations(["isLoading"]),
    },

    mounted() {
        if (
            this.$route.params.category > 4 ||
            this.$route.params.id > this.$route.params.category * 6 ||
            this.$route.params.id <= (this.$route.params.category - 1) * 6 ||
            /\D/.test(this.$route.params.category) ||
            /\D/.test(this.$route.params.id)
        ) {
            this.$router.push({ name: "notFound" });
        }
        this.isLoading(true);
        setTimeout(() => {
            this.isLoading(false);
        }, 500);
    },
};
</script>