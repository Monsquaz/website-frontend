<template>
  <div class="notification"  v-bind:class="{
    'is-info':    data.type == 'info',
    'is-success': data.type == 'success',
    'is-danger':  data.type == 'error'
  }">
    {{ data.content }}
  </div>
</div>
</template>

<script>

import Util from '../Util';

const Notification = {
  name: 'notification',
  props: { data: { type: Object} },
  data: () => ({

  }),
  computed: {},
  apollo: {}
}

export default Notification;
</script>

<style lang="sass" scoped>
  .notification {
    opacity: 0.9;
  }
</style>
