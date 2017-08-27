import Vue from 'vue';
import App from './App.vue';
import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Config from '../config.js';
import Fb from './plugins/Fb';

Vue.use(Fb, {
  appId: 28576517180625,
  autoLogAppEvents: true,
  xfbml: true,
  version: 'v2.10'
});

Vue.component('page', () => import(
  /* webpackChunkName: "page" */
  './Page.vue'
));

/* Layouts and types for testing */
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

Vue.component('admin-layout', () => import(
  /* webpackChunkName: "admin-layout" */
  './layouts/AdminLayout.vue'
));

Vue.component('article-type', () => import(
  /* webpackChunkName: "article" */
  './types/ArticleType.vue'
));

Vue.component('error-page', () => import(
  /* webpackChunkName: "error-page" */
  './ErrorPage.vue'
));

Vue.component('user-login', () => import(
  /* webpackChunkName: "user-login" */
  './types/UserLogin.vue'
));

Vue.component('user-profile', () => import(
  /* webpackChunkName: "user-profile" */
  './types/UserProfile.vue'
));

Vue.component('user-registration', () => import(
  /* webpackChunkName: "user-registration" */
  './types/UserRegistration.vue'
));

Vue.component('faq', () => import(
  /* webpackChunkName: "faq" */
  './types/FAQ.vue'
));

/* Other components       */
/* ---------------------- */
//import 'vue-awesome/icons'; // TODO: We don't have to import all.
import Icon from 'vue-awesome/components/Icon.vue'
Vue.component('icon', Icon); // Font awesome

import VueDisqus from 'vue-disqus/VueDisqus.vue';
Vue.component('disqus', VueDisqus); // Disqus

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

Vue.component('pink-arrows', () => import(
  /* webpackChunkName: "pinkarrows" */
  './components/PinkArrows.vue'
));

Vue.component('breadcrumbs', () => import(
  /* webpackChunkName: "breadcrumbs" */
  './components/Breadcrumbs.vue'
));

Vue.component('notification', () => import(
  /* webpackChunkName: "notification" */
  './components/Notification.vue'
));

Vue.component('admin-browser', () => import(
  /* webpackChunkName: "admin-browser" */
  './components/AdminBrowser.vue'
));

Vue.component('admin-actions', () => import(
  /* webpackChunkName: "admin-actions" */
  './components/AdminActions.vue'
));

Vue.component('blurbs', () => import(
  /* webpackChunkName: "blurbs" */
  './components/Blurbs.vue'
));

Vue.component('site-search', () => import(
  /* webpackChunkName: "site-search" */
  './components/SiteSearch.vue'
));

Vue.component('newsletter-subscribe', () => import(
  /* webpackChunkName: "newsletter-subscribe" */
  './components/NewsletterSubscribe.vue'
));

Vue.component('irc-stream', () => import(
  /* webpackChunkName: "irc-stream" */
  './components/IrcStream.vue'
));

Vue.component('forum-activity', () => import(
  /* webpackChunkName: "forum-activity" */
  './components/ForumActivity.vue'
));

Vue.component('page-teasers', () => import(
  /* webpackChunkName: "page-teasers" */
  './components/PageTeasers.vue'
));

Vue.use(VueRouter);
Vue.use(VueApollo);
Vue.use(Vuex);

import monsquazApolloClient from './MonsquazApolloClient';

const apolloProvider = new VueApollo({
  defaultClient: monsquazApolloClient
});

import store from './store';
import { mapGetters } from 'vuex';

new Vue({
  el: '#app',
  apolloProvider,
  store,
  render: (h) => h(App),
  computed: {
    ...mapGetters(['decodedAuthToken'])
  },
  created() {
    if(this.decodedAuthToken) {
      this.$store.dispatch('loadUser', this.decodedAuthToken.userId);
    }
  }
})
