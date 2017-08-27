<template>
  <div class="forum-activity">
    Forum activity
  </div>
</template>

<script>

import Util from '../Util';

const ForumActivity = {
  name: 'forum-activity',
  props: { data: { type: Object} },
  data: () => ({
  }),
  methods: {},
  computed: {},
  apollo: {}
}

export default ForumActivity;
</script>

<style lang="sass" scoped>
  .forum-activity {
    padding: 12px;
  }
</style>
