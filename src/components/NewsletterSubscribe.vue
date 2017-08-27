<template>
  <div class="newsletter-subscribe">
    Newsletter subscribe
  </div>
</template>

<script>

import Util from '../Util';

const NewsletterSubscribe = {
  name: 'newsletter-subscribe',
  props: { data: { type: Object} },
  data: () => ({
  }),
  methods: {},
  computed: {},
  apollo: {}
}

export default NewsletterSubscribe;
</script>

<style lang="sass" scoped>
  .newsletter-subscribe {
    padding: 12px;
  }
</style>
