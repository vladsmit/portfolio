import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: null,
    loading: false
  },

  getters: {
    getLoadingStatus(state) {
      return state.loading;
    },

    getCategories(state) {
      return state.categories;
    }
  },

  mutations: {
    isLoading(state, payload) {
      state.loading = payload;
    },

    savePhotosInState(state, payload) {
      let photos = [];
      let num = 0;
      for (let i = 0; i < 4; i++) {
        photos.push([]);
        for (let j = num; j < 24; j++) {
          if (photos[i].length < 6) {
            photos[i].push(payload[j]);
          } else {
            break;
          }
        }
        num += 6;
      }
      state.categories = photos;
    },
  },

  actions: {
    async getPhotosFromApi({ commit }) {
      commit('isLoading', true);
      const { data } = await Axios.get("https://jsonplaceholder.typicode.com/photos");
      setTimeout(() => {
        commit('savePhotosInState', data);
        commit('isLoading', false);
      }, 500);
    }
  },
})
