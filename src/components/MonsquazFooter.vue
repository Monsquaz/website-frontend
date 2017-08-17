<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <div class="scrolling">
          You are anus! You need more Monsquaz!
        </div>
      </div>
    </div>
  </footer>
</template>

<script>

import Util from '../Util';

const MonsquazFooter = {
  name: 'monsquaz-footer',
  props: {},
  data () {
    return {};
  },
  apollo: {

  }
}

export default MonsquazFooter;
</script>

<style lang="sass" scoped>
  .footer {
    .scrolling {
       animation: marquee 5s ease-in-out infinite;
    }
  }
  @keyframes marquee {
    0%   { text-indent: 250px }
    50% { text-indent: -250px }
    100%   { text-indent: 250px }
  }
</style>
