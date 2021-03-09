<template>
    <div>
        <template v-if="!task.edit">
            <p class="task__title" @click="doneTask(task)">
                {{ taskNumber(task) }} {{ task.title }}
            </p>
            <input
                type="button"
                class="task__editIcon"
                @click="editedTask(task)"
            />
            <input
                type="button"
                class="task__deleteIcon"
                @click="deleteTask(task)"
            />
        </template>
        <template v-else>
            <input
                v-model="task.editTask"
                type="text"
                class="task__editTask"
                @keydown.enter="acceptEdit(task)"
            />
            <input
                type="button"
                class="task__acceptIcon"
                @click="acceptEdit(task)"
            />
        </template>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "Task",
    props: ["task"],
    computed: {
        ...mapGetters(["getTaskList", "getPage", "paginationPageList"]),
    },
    methods: {
        ...mapMutations(["decrementPage"]),

        ...mapActions(["deleteTaskFromLocalStorage", "editTaskInLocalStorage"]),

        deleteTask(item) {
            this.deleteTaskFromLocalStorage(item);
            this.checkPage();
        },

        taskNumber(item) {
            return `${this.getTaskList.indexOf(item) + 1})`;
        },

        checkPage() {
            if (this.paginationPageList.length === 0 && this.getPage > 1) {
                this.decrementPage();
                this.$router.push({ name: "page", params: { id: this.getPage } });
            }
        },

        doneTask(item) {
            item.completed = !item.completed;
            this.editTaskInLocalStorage();
        },

        editedTask(item) {
            item.edit = !item.edit;
            item.editTask = item.title;
        },

        acceptEdit(item) {
            item.title = item.editTask;
            item.edit = !item.edit;
            item.editTask = "";
            this.editTaskInLocalStorage();
        },
    },
};
</script>

<style lang="scss">
@mixin icon($image, $position-right, $position-top, $display) {
    width: 20px;
    height: 20px;
    display: $display;
    position: absolute;
    top: $position-top;
    right: $position-right;
    border: 0;
    background: $image center / cover no-repeat;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
    &:active {
        opacity: 0.5;
    }
}

.task {
    width: 100%;
    position: relative;
    word-wrap: break-word;
    font: 400 16px/16px Arial, sans-serif;
    background-color: #fff;
    border-bottom: 2px solid gray;
    border-radius: 5px;
    margin-bottom: 15px;
    padding: 10px 70px 10px 10px;
    box-sizing: border-box;
    &:hover .task__editIcon {
        display: block;
    }
    &:hover .task__deleteIcon {
        display: block;
    }
}

.task__title {
    margin: 0;
}

.task__doneTask {
    text-decoration: line-through;
    background-color: rgb(117, 198, 230);
}

.task__editTask {
    width: 97%;
}

.task__editIcon {
    @include icon(url("../assets/edit.png"), 40px, 7.5px, none);
}

.task__deleteIcon {
    @include icon(url("../assets/delete.png"), 10px, 7.5px, none);
}

.task__acceptIcon {
    @include icon(url("../assets/accept.png"), 25px, 11px, block);
}
</style>