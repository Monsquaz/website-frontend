<template>
<div class="app">
  <router-view></router-view>
</div>
</template>

<script>
import VueRouter from 'vue-router';
import Page from './Page.vue';

var router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '*',
      component: Page
    }
  ]
});
export default {
  name: 'app',
  router
}
</script>

<style lang="scss" src="bulma"></style>
<style>
.message {
  color: blue;
}
</style>
