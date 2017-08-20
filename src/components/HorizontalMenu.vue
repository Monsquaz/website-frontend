<template>
  <nav class="navbar ">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">Monsquaz.org</router-link>
      <a class="navbar-item is-hidden-desktop" href="https://github.com/jgthms/bulma" target="_blank">
        <span class="icon" style="color: #333;">
          <i class="fa fa-github"></i>
        </span>
      </a>
      <a class="navbar-item is-hidden-desktop" href="https://twitter.com/jgthms" target="_blank">
        <span class="icon" style="color: #55acee;">
          <i class="fa fa-twitter"></i>
        </span>
      </a>
      <div class="navbar-burger burger" v-on:click="isActive = !isActive">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div id="navMenubd-example" class="navbar-menu" v-bind:class="{'is-active': isActive}">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link  is-active" href="/documentation/overview/start/">
            Docs
          </a>
          <div class="navbar-dropdown ">
            <a class="navbar-item " href="/documentation/overview/start/">
              Overview
            </a>
            <a class="navbar-item " href="http://bulma.io/documentation/modifiers/syntax/">
              Modifiers
            </a>
            <a class="navbar-item " href="http://bulma.io/documentation/columns/basics/">
              Columns
            </a>
            <a class="navbar-item " href="http://bulma.io/documentation/layout/container/">
              Layout
            </a>
            <a class="navbar-item " href="http://bulma.io/documentation/form/general/">
              Form
            </a>
            <a class="navbar-item " href="http://bulma.io/documentation/elements/box/">
              Elements
            </a>
            <a class="navbar-item is-active" href="http://bulma.io/documentation/components/breadcrumb/">
              Components
            </a>
            <hr class="navbar-divider">
            <div class="navbar-item">
              <div>
                <p class="is-size-6-desktop">
                  <strong class="has-text-info">0.5.1</strong>
                </p>
                  <small>
                    <a class="bd-view-all-versions" href="/versions">View all versions</a>
                  </small>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link " href="http://bulma.io/blog/">
            Blog
          </a>
          <div id="blogDropdown" class="navbar-dropdown " data-style="width: 18rem;">
              <a class="navbar-item" href="/2017/08/03/list-of-tags/">
                <div class="navbar-content">
                  <p>
                    <small class="has-text-info">03 Aug 2017</small>
                  </p>
                  <p>New feature: list of tags</p>
                </div>
              </a>
              <a class="navbar-item" href="/2017/08/01/bulma-bootstrap-comparison/">
                <div class="navbar-content">
                  <p>
                    <small class="has-text-info">01 Aug 2017</small>
                  </p>
                  <p>Bulma / Bootstrap comparison</p>
                </div>
              </a>
              <a class="navbar-item" href="/2017/07/24/access-previous-bulma-versions/">
                <div class="navbar-content">
                  <p>
                    <small class="has-text-info">24 Jul 2017</small>
                  </p>
                  <p>Access previous Bulma versions</p>
                </div>
              </a>
            <a class="navbar-item" href="http://bulma.io/blog/">
              More posts
            </a>
            <hr class="navbar-divider">
            <div class="navbar-item">
              <div class="navbar-content">
                <div class="level is-mobile">
                  <div class="level-left">
                    <div class="level-item">
                      <strong>Stay up to date!</strong>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <a class="button bd-is-rss is-small" href="http://bulma.io/atom.xml">
                        <span class="icon is-small">
                          <i class="fa fa-rss"></i>
                        </span>
                        <span>Subscribe</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <div class="navbar-link">
            More
          </div>
          <div id="moreDropdown" class="navbar-dropdown ">
            <a class="navbar-item " href="http://bulma.io/extensions/">
              <div class="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <p>
                      <strong>Extensions</strong>
                      <br>
                      <small>Side projects to enhance Bulma</small>
                    </p>
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <span class="icon has-text-info">
                      <i class="fa fa-plug"></i>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <router-link class="navbar-item" to="login">Login</router-link>
        <router-link class="navbar-item" to="register">Register</router-link>
      </div>
    </div>
  </nav>
</template>

<script>

import Util from '../Util';

const HorizontalMenu = {
  name: 'horizontal-menu',
  props: {},
  data () {
    return {
      isActive: false
    };
  },
  apollo: {

  }
}

export default HorizontalMenu;
</script>

<style lang="sass"></style>
