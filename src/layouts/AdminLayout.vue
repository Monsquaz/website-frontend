<template>
  <div class="layout-view pink">
    <div class="contents">
      <div class="columns">
        <div v-if="topMenuId" class="column is-12">
          <horizontal-menu class="top-menu"></horizontal-menu>
        </div>
      </div>
      <div class="columns flash-notification" v-if="flashNotification">
        <div class="column is-12">
          <notification v-bind:data="flashNotification" />
        </div>
      </div>
      <div class="columns">
        <div v-if="hasLeft" class="column is-2">
          <vertical-menu class="left-menu"></vertical-menu>
        </div>
        <div class="column" v-bind:class="{
          'is-8':  hasLeft && hasRight,
          'is-10': (!hasLeft && hasRight) || (hasLeft && !hasRight),
          'is-12': !(hasLeft || hasRight)}">
          <div class="columns">
            <div class="column is-12 type-content">
              <breadcrumbs v-bind:page="page" class="breadcrumbs"></breadcrumbs>
              <h1 class="page-title">{{ title }}</h1>
              <component :is="page.typeView.type.component" v-bind:page="page"></component>
            </div>
          </div>
          <div class="columns" v-if="page.comments">
            <div class="column is-12 comments" >
              <h2 class="sub-heading">Comments</h2>
              <disqus
                class="disqus"
                shortname="monsquaz"
                v-bind:identifier="String(page.id)"
                v-bind:title="title">
              </disqus>
            </div>
          </div>
        </div>
        <div v-if="hasRight" class="column is-2">
          <vertical-menu class="right-menu"></vertical-menu>
        </div>
      </div>
    </div>
    <pink-arrows></pink-arrows>
    <monsquaz-footer class="footer"></monsquaz-footer>
  </div>
</template>

<script>

import Util from '../Util';
import Vue from 'vue';

import { mapGetters } from 'vuex';

const OverviewLayout = {
  name: 'overview-layout',
  props: {
    page: { type: Object }
  },
  data () {
    return {
      topMenuId: 1
    }
  },
  computed: {
    ...mapGetters(['flashNotification']),
    layoutData: function() {
      return JSON.parse(this.page.layoutView.data);
    },
    leftComponents: function() {
      return this.layoutData.leftComponents;
    },
    hasLeft: function() {
      return true; // TODO: TEMP
      return this.leftComponents.length > 0;
    },
    centerComponents: function() {
      return this.layoutData.centerComponents;
    },
    rightComponents: function() {
      return this.layoutData.rightComponents;
    },
    hasRight: function() {
      return true; // TODO: TEMP
      return this.rightComponents.length > 0;
    },
    title: function() {
      return Util.getTranslation(this.page.title, 'en')
    }
  },
  apollo: {

  }
}

export default OverviewLayout ;
</script>

<style lang="sass" scoped>
  %blob {
    background-color: #ffffff;
    opacity: 0.9;
    border-radius: 5px;
    border: 1px solid #c0c0c0;
    box-shadow: 2px 2px 3px 0 rgba(0,0,0,.75);
  }
  .top-menu {
    @extend %blob;
  }
  .left-menu {
    @extend %blob;
  }
  .right-menu {
    @extend %blob;
  }
  .type-content {
    @extend %blob;
  }
  /* Weirdness-hacks-etc */
    %center-content {
      margin-top: 12px; /* Why not 15px I dont know */
      &.is-12 {
        width: calc(100% - 24px);
        margin-left: 12px;
      }
    }
    .type-content {
      @extend %center-content;
    }
  /* End weirdness */
  .layout-view {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    padding-top: 15px;
  }
  .contents {
    flex: 1;
    margin-top: 15px;
    z-index: 1;
    max-width: 1366px;
    width: calc(100% - 30px);
    margin: 0 auto;
  }
  .footer {
    margin-top: 30px;
    border-top: 1px solid black;
    background: linear-gradient(to bottom,  #ffeef6 0%,#ff007f 25%,#440022 100%) no-repeat center center fixed;
    background-size: cover;
    color: #ffffff;
    opacity: 0.9;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  %heading {
    font-size: 30px;
    border-bottom: 1px solid #c0c0c0;
    margin-bottom: 15px;
  }
  .page-title {
    @extend %heading;
  }
  .sub-heading {
    @extend %heading;
  }
  .breadcrumbs {

  }
  .sharers  {
    cursor: pointer;
  }
  .comments {
    @extend %blob;
    @extend %center-content;
    margin-top: 15px;
  }
  .disqus {
    padding-left: 10px;
    padding-right: 10px;
  }
  .flash-notification {
    margin-top: -20px;
    margin-bottom: -10px;

    .notification {
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
</style>
