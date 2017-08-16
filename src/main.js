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

/* Components for testing */
Vue.component('loading-layout', () => import(
  /* webpackChunkName: "loading-layout" */
  './layouts/LoadingLayout.vue'
));

Vue.component('loading-type', () => import(
  /* webpackChunkName: "basic-type" */
  './types/LoadingType.vue'
));

/* Real layouts and types */
Vue.component('overview-layout', () => import(
  /* webpackChunkName: "overview" */
  './layouts/OverviewLayout.vue'
));

Vue.component('article-type', () => import(
  /* webpackChunkName: "article" */
  './types/ArticleType.vue'
));

Vue.use(VueRouter);
Vue.use(VueApollo);

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: Config.api_uri,
    transportBatching: true,
  }),
  ssrForceFetchDelay: 100,
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
