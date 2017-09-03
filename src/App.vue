<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import VueRouter from 'vue-router';

var router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '*',
      component: () => import(
        /* webpackChunkName: "page" */
        './Page.vue'
      )
    }
  ]
});
console.warn('TEST', router)
export default {
  name: 'app',
  router
}
</script>

<style lang="sass">
  @import 'scss/all';
</style>
