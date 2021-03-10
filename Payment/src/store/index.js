import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    validationPassed: false,
    accounts: []
  },
  
  getters: {
    getValidationStatus(state) {
      return state.validationPassed;
    },

    getAccounts(state) {
      return state.accounts;
    },

    getAccountsLength(state, getters) {
      return getters.getAccounts.length;
    }
  },
  
  mutations: {
    changeValidationPassed(state) {
      state.validationPassed = !state.validationPassed;
    },

    addPayment(state, payload) {
      state.accounts = [...state.accounts, {
        id: state.accounts.length + 1,
        accountNumber: payload.accountNumber,
        sum: payload.sum,
        cardNumber: payload.cardNumber,
        owner: payload.owner,
        date: payload.date
      }];
    }
  },
  
  plugins: [createPersistedState()]
});
