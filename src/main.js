import Vue from 'vue';
import App from './App.vue';

import {
  ApolloClient,
  createNetworkInterface
} from 'apollo-client';

import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';
import Config from '../config.js';

Vue.component('page', () => import(
  /* webpackChunkName: "page" */
  './Page.vue'
));

Vue.component('basic-layout', () => import(
  /* webpackChunkName: "basic-layout" */
  './layouts/BasicLayout.vue'
));

Vue.component('basic-type', () => import(
  /* webpackChunkName: "basic-type" */
  './types/BasicType.vue'
));

Vue.use(VueRouter);
Vue.use(VueApollo);

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: Config.api_uri,
    transportBatching: true,
  }),
  connectToDevTools: true,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  el: 'body',
  apolloProvider,
  render: (h) => h(App)
})
