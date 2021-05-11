<template>
    <div class="mainWrapper">
        <h3 class="mainTitle">Задачи</h3>
        <div v-if="getTaskList.length > 10" class="pagination">
            <p
                v-if="getPage > 1"
                class="pagination__arrow left"
                @click="backPage"
            ></p>
            Стр. {{ getPage }}
            <p
                v-if="getTaskList.length > getPage * 10"
                class="pagination__arrow"
                @click="forwardPage"
            ></p>
        </div>
        <div class="taskList">
            <Task
                v-for="task in paginationPageList"
                :key="task.id"
                :class="addClassName(task)"
                :task="task"
            />
        </div>
        <textarea
            v-model="newTask"
            placeholder="Создайте новую задачу..."
            class="textarea"
            @keydown.enter="addTask($event)"
        ></textarea>
        <button
            type="button"
            class="btn btn-success"
            @click="addTask"
        >
            Добавить задачу
        </button>
        <button
            v-if="newTask"
            type="button"
            class="btn btn-danger btn--margin"
            @click="clearTextarea"
        >
            Стереть
        </button>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Task from "@/components/Task.vue";

export default {
    name: "TaskField",
    
    components: {
        Task,
    },
    
    data() {
        return {
            newTask: "",
        };
    },
    
    computed: {
        ...mapGetters(["getTaskList", "getPage", "paginationPageList"]),

        createTaskId() {
            if (this.getTaskList[0]) {
                return this.getTaskList[0].id + 1;
            } else {
                return 0;
            }
        },
    },
    
    methods: {
        ...mapMutations(["incrementPage", "decrementPage", "pageAmount"]),

        ...mapActions(["loadingPage", "addTaskInLocalStorage"]),

        addTask(event) {
            this.addTaskInLocalStorage({
                id: this.createTaskId,
                title: this.newTask,
                completed: false,
                edit: false,
            });
            this.clearTextarea(event);
            if (parseInt(this.$route.params.id) !== 1) {
                this.resetPage();
            }
        },

        clearTextarea(event) {
            event.preventDefault();
            this.newTask = "";
        },

        resetPage() {
            this.pageAmount({ amount: 1 });
            this.$router.push({ name: "page", params: { id: this.getPage } });
        },

        addClassName(item) {
            let classes = ["task"];
            if (item.completed) {
                classes.push("task__doneTask");
            }
            return classes.join(" ");
        },

        forwardPage() {
            if (this.getTaskList.length > this.getPage * 10) {
                this.loadingPage();
                this.incrementPage();
            }
            this.$router.push({ name: "page", params: { id: this.getPage } });
        },

        backPage() {
            if (this.getPage > 1) {
                this.loadingPage();
                this.decrementPage();
            }
            this.$router.push({ name: "page", params: { id: this.getPage } });
        },
    },
};
</script>

<style lang="scss">
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
    top: 15px;
    right: 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    &__arrow {
        width: 20px;
        height: 20px;
        background: url("../assets/arrow_right.png") center / cover no-repeat;
        margin: 0;
        cursor: pointer;
        transition: 300ms transform;
        &:hover {
            transform: scale(1.36);
        }
    }
}

.left {
    background: url("../assets/arrow_left.png") center / cover no-repeat;
}

.taskList {
    width: 100%;
    margin-top: 10px;
}

.textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    font: 400 16px/16px Arial, sans-serif;
    border: 0;
    border-bottom: 2px solid gray;
    border-radius: 5px;
    margin-bottom: 12px;
    padding: 10px;
    box-sizing: border-box;
    &:focus::-webkit-input-placeholder {
        color: transparent;
    }
}

.btn--margin {
    margin-left: 10px;
}
</style>