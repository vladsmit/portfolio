<template>
    <div id="app">
        <Spinner v-if="getLoadingStatus" />
        <TaskField v-else />
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import TaskField from "@/components/TaskField.vue";
import Spinner from "@/components/Spinner.vue";

export default {
    name: "App",

    components: {
        TaskField,
        Spinner,
    },

    computed: {
        ...mapGetters(["getLoadingStatus", "getPage", "getTaskList"]),
    },

    methods: {
        ...mapMutations(["pageAmount", "setTaskList"]),

        ...mapActions(["getTasksFromJson"]),
    },

    mounted() {
        if (!localStorage.taskList) {
            this.getTasksFromJson();
        } else {
            this.setTaskList();
        }

        if (
            (this.$route.params.id > Math.ceil(this.getTaskList.length / 10) &&
                this.getTaskList.length) ||
            /\D/.test(this.$route.params.id)
        ) {
            this.pageAmount({ amount: 1 });
            this.$router.push({ name: "page", params: { id: this.getPage } });
        } else {
            this.pageAmount({ amount: this.$route.params.id });
        }
    },
};
</script>

<style lang="scss">
body {
    margin: 0;
}

#app {
    width: 400px;
    max-width: 100%;
    height: 100vh;
    margin: 0 auto;
}
</style>
