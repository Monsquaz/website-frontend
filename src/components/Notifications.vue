<template>
  <div class="notifications">
    <div v-for="notification in notifications" class="notification" v-bind:class="{
      'is-success': notification.type == 'success',
      'is-danger': notification.type == 'error'
    }">
      <button class="delete"></button>
      {{ notification.content }}
    </div>
  </div>
</template>

<script>

import Util from '../Util';
import { mapGetters } from 'vuex';

const Notifications = {
  name: 'notifications',
  props: {
    page: { type: Object}
  },
  computed: {
    ...mapGetters(['notifications'])
  },
  apollo: {

  }
}

export default Notifications;
</script>

<style lang="sass" scoped>
</style>
