<template>
  <div class="irc-stream">
    IRC Stream
  </div>
</template>

<script>

import Util from '../Util';

const IrcStream = {
  name: 'irc-stream',
  props: { data: { type: Object} },
  data: () => ({
  }),
  methods: {},
  computed: {},
  apollo: {}
}

export default IrcStream;
</script>

<style lang="sass" scoped>
  .irc-stream {
    padding: 12px;
  }
</style>
