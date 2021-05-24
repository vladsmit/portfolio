<template>
    <v-card class="mb-1 pb-5 d-flex justify-space-around flex-wrap">
        <v-card-title style="width: 100%">
            Категория {{ categoryIndex + 1 }}
        </v-card-title>
        <photo-card
            v-for="photo in category"
            :key="photo.id"
            :photo="photo"
            :categoryIndex="categoryIndex"
        />
    </v-card>
</template>
<script>
import PhotoCard from "./PhotoCard";
export default {
    name: "Category",

    props: ["category", "categoryIndex"],
    
    components: {
        PhotoCard,
    },
};
</script>