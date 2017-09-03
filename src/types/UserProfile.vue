<template>
  <div class="type-view">
    <p>{{ content }}</p>
  </div>
</template>

<script>

import Util from '../Util';

const UserProfileType = {
  name: 'user-profile',
  props: {
    page: { type: Object }
  },
  data () {
    return {

    }
  },
  computed: {
    content: function() {
      return Util.getTranslation(this.page.content, 'en'); // TODO: use lang from vuex state
    }
  },
  apollo: {

  }
}

export default UserProfileType;
</script>

<style lang="sass">
</style>
