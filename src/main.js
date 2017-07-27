import Vue from 'vue';
import App from './App.vue';

import {
  ApolloClient,
  createNetworkInterface
} from 'apollo-client';

import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';
import Config from '../config.js';

import Page from './Page.vue';
import BasicLayout from './layouts/BasicLayout.vue';
import BasicType from './types/BasicType.vue';

Vue.component('page', Page);

// TODO: Build lazy-loading for components
// https://vuejs.org/v2/guide/components.html#Async-Components
// https://egghead.io/lessons/load-components-when-needed-with-vue-async-components

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
