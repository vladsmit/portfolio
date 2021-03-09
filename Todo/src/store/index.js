import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    taskList: [],
    page: null,
  },

  getters: {
    getTaskList(state) {
      return state.taskList;
    },

    getTaskListLength(state, getters) {
      return getters.getTaskList.length;
    },

    getPage(state) {
      return state.page;
    },

    paginationPageList(state) {
      let start = (state.page - 1) * 10;
      let end = state.page * 10;
      return state.taskList.slice(start, end);
    }
  },

  mutations: {
    saveInLocalStorage(state, payload) {
      localStorage.setItem('taskList', payload);
    },

    setTaskList(state) {
      if (localStorage.taskList) {
        let taskList = JSON.parse(localStorage.taskList);
        state.taskList = taskList;
      } else {
        state.taskList = [];
      }
    },

    reverseTaskList(state, payload) {
      payload.reverse();
    },

    addTaskInTaskList(state, payload) {
      state.taskList.unshift({
        id: payload.id,
        title: payload.title,
        completed: payload.completed,
        edit: payload.edit
      });
    },

    deleteTaskFromTaskList(state, payload) {
      state.taskList = state.taskList.filter((task) => payload !== task);
    },

    incrementPage(state) {
      state.page++;
    },

    decrementPage(state) {
      state.page--;
    },

    pageAmount(state, payload) {
      state.page = payload.amount;
    }
  },

  actions: {
    async getTasksFromJson(context) {
      let { data } = await Axios.get("../tasks.json");
      context.commit('reverseTaskList', data);
      context.commit('saveInLocalStorage', JSON.stringify(data));
    },

    addTaskInLocalStorage(context, payload) {
      context.commit('addTaskInTaskList', payload);
      let data = context.state.taskList;
      context.commit('saveInLocalStorage', JSON.stringify(data));
    },

    deleteTaskFromLocalStorage(context, payload) {
      context.commit('deleteTaskFromTaskList', payload);
      let data = context.state.taskList;
      context.commit('saveInLocalStorage', JSON.stringify(data));
    },

    editTaskInLocalStorage(context) {
      let data = context.state.taskList;
      context.commit('saveInLocalStorage', JSON.stringify(data));
    }
  }
});