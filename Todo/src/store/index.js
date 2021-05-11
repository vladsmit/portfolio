import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    taskList: [],
    page: null,
    loading: false
  },

  getters: {
    getLoadingStatus(state) {
      return state.loading;
    },

    getTaskList(state) {
      return state.taskList;
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
    isLoading(state, payload) {
      state.loading = payload;
    },

    saveInLocalStorage(state, payload) {
      localStorage.setItem('taskList', JSON.stringify(payload));
    },

    setTaskList(state) {
      if (localStorage.taskList) {
        let taskList = JSON.parse(localStorage.taskList);
        state.taskList = taskList;
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
    async getTasksFromJson({ commit }) {
      commit('isLoading', true);
      let { data } = await Axios.get("../tasks.json");
      setTimeout(() => {
        commit('reverseTaskList', data);
        commit('saveInLocalStorage', data);
        commit('setTaskList');
        commit('isLoading', false);
      }, 1000);
    },

    addTaskInLocalStorage({ commit, state }, payload) {
      commit('addTaskInTaskList', payload);
      commit('saveInLocalStorage', state.taskList);
    },

    deleteTaskFromLocalStorage({ commit, state }, payload) {
      commit('deleteTaskFromTaskList', payload);
      commit('saveInLocalStorage', state.taskList);
    },

    loadingPage({ commit }) {
      commit('isLoading', true);
      setTimeout(() => {
        commit('isLoading', false);
      }, 500);
    }
  }
});