<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li v-for="link in parentLinks">
        <router-link v-if="link.path" v-bind:to="link.path">{{ link.title }}</router-link>
        <a class="no-click" v-else>{{ link.title }}</a>
      </li>
      <li class="is-active">
        <a class="no-click">{{ thisTitle }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>

import Util from '../Util';

const Breadcrumbs = {
  name: 'breadcrumbs',
  props: {
    page: { type: Object}
  },
  computed: {
    thisTitle: function() {
      return Util.getTranslation(this.page.title, 'en');
    },
    parentLinks: function() {
     return this.page.categoriesBreadcrumbs
       .sort((a,b) => Math.sign(a.depth - b.depth))
       .map((e) => {
         if(e.page) {
           return {
             title: Util.getTranslation(e.ancestor.page.title, 'en'),
             path:  Util.getTranslation(e.ancestor.page.paths, 'en', 'path')
           }
         } else {
           return {
             title: Util.getTranslation(e.ancestor.title, 'en'),
             path:  null
           }
         }
       });
    }
  },
  apollo: {

  }
}

export default Breadcrumbs;
</script>

<style lang="sass" scoped>
  .no-click {
    text-decoration: none;
    cursor: default;
    color: #000000;
    &:hover {
      color: #000000;
    }
  }
</style>
