import Vue from 'vue';
import App from './App.vue';

import {
  ApolloClient,
  createNetworkInterface
} from 'apollo-client';

import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';
import Config from '../config.js';

const Page        = () => import(/* webpackChunkName: "page" */ './Page.vue');
const BasicLayout = () => import(/* webpackChunkName: "basic-layout" */ './layouts/BasicLayout.vue');
const BasicType   = () => import(/* webpackChunkName: "basic-type" */ './types/BasicType.vue');

Vue.component('page', Page);
Vue.component('basic-layout', BasicLayout);
Vue.component('basic-type', BasicType);

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
