import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import axios from 'axios';

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
    save_localStorage(state, payload) {
      localStorage.setItem('taskList', payload);
    },

    set_taskList(state) {
      let taskList = JSON.parse(localStorage.taskList);
      state.taskList = taskList;
    },

    reverse_taskList(state, payload) {
      payload.reverse();
    },

    add_task(state, payload) {
      state.taskList.unshift({
        id: payload.id,
        title: payload.title,
        completed: payload.completed,
        edit: payload.edit
      });
    },

    delete_task(state, payload) {
      state.taskList = state.taskList.filter((task) => payload !== task);
    },

    increment_page(state) {
      state.page++;
    },

    decrement_page(state) {
      state.page--;
    },

    page_amount(state, payload) {
      state.page = payload.amount;
    }
  },
  actions: {
    async get_Tasks(context, payload) {
      let { data } = await axios.get("../tasks.json");
      context.commit('reverse_taskList', data);
      context.commit('save_localStorage', JSON.stringify(data));
    },

    save_NewTasks(context, payload) {
      context.commit('add_task', payload);
      let data = context.state.taskList;
      context.commit('save_localStorage', JSON.stringify(data));
    },

    delete_Tasks(context, payload) {
      context.commit('delete_task', payload);
      let data = context.state.taskList;
      context.commit('save_localStorage', JSON.stringify(data));
    },

    edit_Tasks(context) {
      let data = context.state.taskList;
      context.commit('save_localStorage', JSON.stringify(data));
    }
  }
});