import Vue from 'vue'
import Vuex from 'vuex';
import monsquazApolloClient from '../MonsquazApolloClient';
import gql from 'graphql-tag';
import jwtDecode from 'jwt-decode';

// TODO: Include apollo client in state.

Vue.use(Vuex);

let authToken = localStorage.getItem("authToken");
let decodedAuthToken = authToken ? jwtDecode(localStorage.getItem("authToken")) : null;

const store = new Vuex.Store({
  state: {
    authToken,
    decodedAuthToken,
    loginExpirationTimeout: authToken ? setTimeout(
      function() {
        store.dispatch('logout', 'Login session has expired');
      },
      Math.max(0, 1000 * decodedAuthToken.exp - Math.floor((new Date()).getTime()))
    ) : null,
    user: null,
    page: null,
    isSubmitting: false,
    notifications: [],
    flashNotification: null,
    flashNotificationTime: null,
    locationInfo: 'test',
    apollo: monsquazApolloClient
  },
  mutations: {
    RESET_LOGIN_EXPIRATION_TIMER(state, {cb, time}) {
      if(state.loginExpirationTimeout) {
        clearTimeout(state.loginExpirationTimeout);
      }
      state.loginExpirationTimeout = setTimeout(cb, time);
    },
    SET_AUTH_TOKEN(state, {authToken, decodedAuthToken}) {
      state.authToken = authToken;
      state.decodedAuthToken = decodedAuthToken;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_IS_SUBMITTING(state, isSubmitting) {
      state.isSubmitting = isSubmitting;
    },
    SET_FLASH_NOTIFICATION(state, flashNotification) {
      state.flashNotification = flashNotification;
      state.flashNotificationTime = (new Date()).getTime();
    },
    PUSH_NOTIFICATION(state, notification) {
      state.notifications.push(notification);
    },
    SHIFT_NOTIFICATION(state) {
      state.notifications.shift();
    },
    SET_PAGE(state, page) {
      state.page = page;
    },
    SET_LOCATION_INFO(state, locationInfo) {
      state.locationInfo = locationInfo;
    },
    LOGOUT(state) {
      state.authToken = null;
      state.decodedAuthToken = null;
      state.user = null;
      if(state.loginExpirationTimeout) {
        clearTimeout(state.loginExpirationTimeout);
      }
    }
  },
  actions: {
    logout({dispatch, commit, state}, message)  {
      message = message || `You've been logged out.`;
      localStorage.removeItem("authToken");
      commit('LOGOUT');
      dispatch('setFlashNotification', {
        type: 'info',
        content: message
      });
    },
    loadUser: async ({commit, state, rootState}, userId) => {
      await rootState.apollo.watchQuery({
        query: gql`
          query ($id: Int!) {
            users(id: $id) {
              name,
              email,
              gravatar,
              firstname,
              lastname
            }
          }
        `,
        variables: {
          id: userId
        }
      }).subscribe({
        next: (result) => {
          commit('SET_USER', result.data.users[0]);
        }
      });
    },
    login: async ({dispatch, commit, state, rootState}, {username, password}) => {
        commit('SET_IS_SUBMITTING', true);
        let result;
        try {
          let loginResponse = await rootState.apollo.mutate({
            mutation: gql`mutation ($username: String!, $password: String!) {
              login(username: $username, password: $password) {
                token
              }
            }`,
            variables: { username, password },
            update: (store, res) => {}
          });
          let authToken = loginResponse.data.login.token;
          let decodedAuthToken = jwtDecode(authToken);
          commit('RESET_LOGIN_EXPIRATION_TIMER', {
            cb: function() {
              store.dispatch('logout', 'Login session has expired'); 
            },
            time: 1000 * decodedAuthToken.exp - Math.floor((new Date()).getTime())
          });
          dispatch('loadUser', decodedAuthToken.userId);
          localStorage.setItem("authToken", authToken);
          commit('SET_AUTH_TOKEN', {authToken, decodedAuthToken});
          dispatch('setFlashNotification', {
            type: 'success',
            content: 'Successfully logged in.'
          });
          result = true;
        } catch(err) {
          dispatch('setFlashNotification', {
            type: 'error',
            content: err.message
          });
          result = false;
        }
        commit('SET_IS_SUBMITTING', false);
        return result;
    },
    setLocationInfo({commit}, locationInfo) {
      commit('SET_LOCATION_INFO', locationInfo);
    },
    setPage({commit}, page) {
      commit('SET_PAGE', page);
    },
    setFlashNotification({commit}, notification) {
      commit('SET_FLASH_NOTIFICATION', notification);
    },
    clearOldFlashNotification({commit, state}, notification) {
      if(((new Date()).getTime() - state.flashNotificationTime) > 100) {
        commit('SET_FLASH_NOTIFICATION', null);
      }
    },
    notify({commit}, notification) {
      commit('PUSH_NOTIFICATION', notification);
      setTimeout(function(){
        commit('SHIFT_NOTIFICATION');
      }, 5000);
    }
  },
  getters: {
    authToken:            state => state.authToken,
    decodedAuthToken:     state => state.decodedAuthToken,
    notifications:        state => state.notifications,
    user:                 state => state.user,
    flashNotification:    state => state.flashNotification,
    isSubmitting:         state => state.isSubmitting,
    locationInfo:         state => state.locationInfo
  }
});

export default store;
