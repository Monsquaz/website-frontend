import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    authToken: localStorage.getItem("authToken")
  },
  mutations: {
    SET_AUTH_TOKEN(state, authToken) {
      state.authToken = authToken;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    LOGOUT(state) {
      state.authToken = null;
    }
  },
  actions: {
    setAuthToken({commit}, authToken) {
      localStorage.setItem("authToken", authToken);
      commit('SET_AUTH_TOKEN', authToken);
    },
    logout({commit}) {
      localStorage.removeItem("authToken");
      commit('LOGOUT');
    }
  },
  getters: {
    authToken: state => state.authToken
  }
});

export default store;
