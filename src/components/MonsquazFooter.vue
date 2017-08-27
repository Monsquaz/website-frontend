<template>
  <footer class="footer">
    <div class="container">
      <div class="columns">
        <div class="column is-3 left">
          <ul>
            <li>IRC: #monsquaz @ irc.esper.net</li>
            <li>Email: <a href="mailto:info@monsquaz.org">info@monsquaz.org</a></li>
          </ul>
        </div>
        <div class="column is-6 content has-text-centered center">
          <div class="scrolling">
            You are anus! You need more Monsquaz!
          </div>
          <div class="copyright">
            Copyright &copy; 2005 - 2017 Monsquaz Foundation, all rights reserved.
          </div>
          <div class="social">
            <a href="https://www.facebook.com/Monsquaz" title="Facebook" target="_blank">
              <icon name="facebook-square" scale="3"></icon>
            </a>
            <a href="https://github.com/Monsquaz" title="Github" target="_blank">
              <icon name="github-square" scale="3"></icon>
            </a>
            <a href="https://www.instagram.com/monsquaz/" title="Instagram" target="_blank">
              <icon name="instagram" scale="3"></icon>
            </a>
          </div>
        </div>
        <div class="column is-3 right">
          <ul>
            <li>
              <router-link to="privacy-policy">Privacy policy</router-link>
            </li>
            <li>
              <router-link to="disclaimer">Disclaimer</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>

import Vue from 'vue';
import 'vue-awesome/icons/facebook-square';
import 'vue-awesome/icons/github-square';
import 'vue-awesome/icons/instagram';
import Util from '../Util';

const MonsquazFooter = {
  name: 'monsquaz-footer',
  props: {},
  data () {
    return {

    };
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
     font-size: 18px;
  }
  .copyright {
    margin-top: 10px;
    font-size: 12px;
  }
  .social {
    margin-top: 15px;

    a {
      color: #ffffff;
      &:not(:first-child) {
        margin-left: 10px;
      }
    }
  }
  @keyframes marquee {
    0%   { text-indent: 250px }
    50% { text-indent: -250px }
    100%   { text-indent: 250px }
  }
    .right {
      text-align: right;
    }
</style>
