<template>
  <div class="site-search">
    <form @submit.prevent="search()">
      <div class="field has-addons">
        <div class="control">
          <input class="input" type="text" v-model="query" placeholder="Site search">
        </div>
        <div class="control">
          <a v-on:click="search()" class="button is-info">
            Search
          </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

import Util from '../Util';

const SiteSearch = {
  name: 'site-search',
  props: { data: { type: Object} },
  data: () => ({
    query: ''
  }),
  methods: {
    search: function() {
      console.warn(this.query);
    }
  },
  computed: {},
  apollo: {}
}

export default SiteSearch;
</script>

<style lang="sass" scoped>
  .site-search {
    padding: 20px;
  }
</style>
