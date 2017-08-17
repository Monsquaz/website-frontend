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

/* Latouts and types for testing */
/* ---------------------- */
Vue.component('loading-layout', () => import(
  /* webpackChunkName: "loading-layout" */
  './layouts/LoadingLayout.vue'
));

Vue.component('loading-type', () => import(
  /* webpackChunkName: "basic-type" */
  './types/LoadingType.vue'
));

/* Real layouts and types */
/* ---------------------- */
Vue.component('overview-layout', () => import(
  /* webpackChunkName: "overview" */
  './layouts/OverviewLayout.vue'
));

Vue.component('article-type', () => import(
  /* webpackChunkName: "article" */
  './types/ArticleType.vue'
));

Vue.component('error-page', () => import(
  /* webpackChunkName: "error-page" */
  './ErrorPage.vue'
));

/* Other components       */
/* ---------------------- */
Vue.component('horizontal-menu', () => import(
  /* webpackChunkName: "horizontal-menu" */
  './components/HorizontalMenu.vue'
));

Vue.component('vertical-menu', () => import(
  /* webpackChunkName: "vertical-menu" */
  './components/VerticalMenu.vue'
));

Vue.component('monsquaz-footer', () => import(
  /* webpackChunkName: "monsquaz-footer" */
  './components/MonsquazFooter.vue'
));

Vue.component('green-arrows', () => import(
  /* webpackChunkName: "green-arrows" */
  './components/GreenArrows.vue'
));

Vue.component('breadcrumbs', () => import(
  /* webpackChunkName: "breadcrumbs" */
  './components/Breadcrumbs.vue'
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
