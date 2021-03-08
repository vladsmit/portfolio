<template>
    <div id="app">
        <div class="mainWrapper">
            <h3 class="mainTitle">Задачи</h3>
            <div v-if="getTaskList.length > 10" class="pagination">
                <p
                    class="pagination__arrow left"
                    v-if="getPage > 1"
                    @click="backPage"
                ></p>
                Стр. {{ getPage }}
                <p
                    class="pagination__arrow"
                    v-if="getTaskList.length > getPage * 10"
                    @click="forwardPage"
                ></p>
            </div>
            <div class="taskList">
                <div
                    :class="className(task)"
                    v-for="task in paginationPageList"
                    :key="task.id"
                >
                    <template v-if="!task.edit">
                        <p class="taskList__title" @click="doneTask(task)">
                            {{ taskNumber(task) }} {{ task.title }}
                        </p>
                        <input
                            type="button"
                            class="taskList__editButton"
                            @click="editedTask(task)"
                        />
                        <input
                            type="button"
                            class="taskList__deleteButton"
                            @click="deleteTask(task)"
                        />
                    </template>
                    <template v-else>
                        <input
                            type="text"
                            v-model="editTask"
                            class="taskList__editTask"
                            @keydown.enter="acceptEdit(task)"
                        />
                        <input
                            type="button"
                            class="taskList__acceptButton"
                            @click="acceptEdit(task)"
                        />
                    </template>
                </div>
            </div>
            <textarea
                class="taskList__textarea"
                placeholder="Создайте новую задачу..."
                v-model="newTask"
                @keydown.enter="addTask"
            ></textarea>
            <input
                class="taskList__addButton"
                type="button"
                value="Добавить задачу"
                @click="addTask"
            />
            <input
                v-if="newTask"
                class="taskList__clearButton taskList__clearButton--margin"
                type="button"
                value="Стереть"
                @click="clearTask"
            />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {
            newTask: "",
            editTask: "",
        };
    },
    computed: {
        ...mapGetters([
            "getTaskList",
            "getPage",
            "paginationPageList"
        ]),

        createTaskId() {
            if (this.getTaskList[0]) {
                return this.getTaskList[0].id + 1;
            } else {
                return 0;
            }
        },
    },
    methods: {
        ...mapMutations([
            "increment_page",
            "decrement_page",
            "page_amount",
            "set_taskList"
        ]),

        ...mapActions([
            "get_Tasks",
            "save_NewTasks",
            "delete_Tasks",
            "edit_Tasks"
        ]),

        addTask() {
            this.save_NewTasks({
                id: this.createTaskId,
                title: this.newTask,
                completed: false,
                edit: false,
            });
            this.clearTask();
            if (this.$route.params.id != 1) {
                this.resetData();
            }
        },

        deleteTask(item) {
            this.delete_Tasks(item);
            this.checkPage();
        },

        clearTask() {
            this.newTask = "";
        },

        taskNumber(item) {
            return `${this.getTaskList.indexOf(item) + 1})`;
        },

        checkPage() {
            if (this.paginationPageList.length === 0 && this.getPage > 1) {
                this.decrement_page();
                this.$router.push({ name: "page", params: { id: this.getPage } });
            }
        },

        className(item) {
            let classes = ["taskList__task"];
            if (item.completed) {
                classes.push("taskList__doneTask");
            }
            return classes.join(" ");
        },

        doneTask(item) {
            item.completed = !item.completed;
        },

        editedTask(item) {
            item.edit = !item.edit;
            this.editTask = item.title;
        },

        acceptEdit(item) {
            item.title = this.editTask;
            this.editedTask(item);
            this.edit_Tasks();
        },

        forwardPage() {
            if (this.getTaskList.length > this.getPage * 10) {
                this.increment_page();
            }
            this.$router.push({ name: "page", params: { id: this.getPage } });
        },

        backPage() {
            if (this.getPage > 1) {
                this.decrement_page();
            }
            this.$router.push({ name: "page", params: { id: this.getPage } });
        },

        resetData() {
            this.page_amount({ amount: 1 });
            this.$router.push({ name: "page", params: { id: this.getPage } });
        },
    },

    mounted() {
        if (!localStorage.taskList) {
            this.get_Tasks();
        }
        this.page_amount({ amount: this.$route.params.id });
        this.set_taskList();
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

@mixin button($bgc, $bgc_hover) {
    display: inline-block;
    background-color: $bgc;
    font: 800 16px/16px Arial, sans-serif;
    color: #fff;
    border: 0;
    border-bottom: 2px solid gray;
    border-radius: 5px;
    margin: 12px 0 0 0;
    padding: 15px 10px;
    box-sizing: border-box;
    transition: 300ms background-color;
    cursor: pointer;
    &:hover {
        background-color: $bgc_hover;
    }
    &:active {
        background-color: $bgc;
    }
}

body {
    margin: 0;
}

#app {
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
}

.mainWrapper {
    width: 100%;
    position: relative;
    background-color: lightgray;
    border-radius: 5px;
    padding: 16px 10px;
    box-sizing: border-box;
}

.mainTitle {
    font: 600 18px Arial, sans-serif;
    margin: 0;
    padding-left: 10px;
    box-sizing: border-box;
}

.pagination {
    width: 25%;
    position: absolute;
    top: 19px;
    right: 15px;
    display: flex;
    justify-content: flex-end;
    &__arrow {
        width: 20px;
        height: 20px;
        background: url("./assets/arrow_right.png") center / cover no-repeat;
        margin: 0;
        cursor: pointer;
        transition: 300ms transform;
        &:hover {
            transform: scale(1.36);
        }
    }
}

.left {
    background: url("./assets/arrow_left.png") center / cover no-repeat;
}

.taskList {
    width: 100%;
    margin-top: 10px;
    &__title {
        margin: 0;
    }
    &__task {
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
        &:hover .taskList__editButton {
            display: block;
        }
        &:hover .taskList__deleteButton {
            display: block;
        }
    }
    &__doneTask {
        text-decoration: line-through;
        background-color: rgb(117, 198, 230);
    }
    &__editTask {
        width: 97%;
    }
    &__textarea {
        width: 100%;
        min-height: 100px;
        resize: none;
        font: 400 16px/16px Arial, sans-serif;
        border: 0;
        border-bottom: 2px solid gray;
        border-radius: 5px;
        padding: 10px;
        box-sizing: border-box;
        &:focus::-webkit-input-placeholder {
            color: transparent;
        }
    }
    &__addButton {
        @include button(rgb(119, 194, 119), rgb(111, 216, 111));
    }
    &__clearButton {
        @include button(rgb(190, 60, 60), rgb(212, 5, 5));
        &--margin {
            margin-left: 10px;
        }
    }
    &__editButton {
        @include icon(url("./assets/edit.png"), 40px, 7.5px, none);
    }
    &__deleteButton {
        @include icon(url("./assets/delete.png"), 10px, 7.5px, none);
    }
    &__acceptButton {
        @include icon(url("./assets/accept.png"), 25px, 11px, block);
    }
}
</style>
