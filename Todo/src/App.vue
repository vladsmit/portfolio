<template>
    <div id="app">
        <TaskField />
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import TaskField from "@/components/TaskField.vue";

export default {
    name: "App",
    components: {
        TaskField,
    },
    computed: {
        ...mapGetters(["getPage", "getTaskList"]),
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

        if (!this.getTaskList.length) {
            this.pageAmount({ amount: this.$route.params.id });
        } else if (
            this.$route.params.id > Math.ceil(this.getTaskList.length / 10) ||
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
    margin: 0 auto;
}
</style>
