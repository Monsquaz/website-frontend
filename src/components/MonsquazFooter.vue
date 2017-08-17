<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <div class="scrolling">
          You are anus! You need more Monsquaz!
        </div>
        <div class="social">
          <a href="https://www.facebook.com/Monsquaz" target="_blank">
            <icon name="facebook-square" scale="3"></icon>
          </a>
          <a href="https://github.com/Monsquaz" target="_blank">
            <icon name="github-square" scale="3"></icon>
          </a>
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
  .scrolling {
     animation: marquee 5s ease-in-out infinite;
     height: 20px;
     overflow: hidden;
     white-space: nowrap;
  }
  .social {
    margin-top: 15px;

    a {
      color: #ffffff;
    }
  }
  @keyframes marquee {
    0%   { text-indent: 250px }
    50% { text-indent: -250px }
    100%   { text-indent: 250px }
  }
</style>
