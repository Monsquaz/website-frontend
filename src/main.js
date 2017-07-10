import Vue from 'vue';
import App from './app.vue';
import {
  ApolloClient,
  createNetworkInterface
} from 'apollo-client';
import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';
import Config from '../config.js';


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
