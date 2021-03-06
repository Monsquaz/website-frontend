<template>
  <div class="layout-view pink">
    <div class="contents">
      <div v-if="horizontalMenu" class="columns">
        <div class="column is-12">
          <horizontal-menu v-bind:data="horizontalMenu" class="top-menu"></horizontal-menu>
        </div>
      </div>
      <div class="columns flash-notification" v-if="flashNotification">
        <div class="column is-12">
          <notification v-bind:data="flashNotification" />
        </div>
      </div>
      <div class="columns">
        <div v-if="hasLeft" class="column is-2">
          <component
            class="left-component"
            v-for="(component, index) in leftComponents"
            :is="component.type"
            v-bind:data="component.data"
            v-bind:key="'left' + '_' + page.id + '_' + index"
             />
        </div>
        <div class="column" v-bind:class="{
          'is-8':  hasLeft && hasRight,
          'is-10': (!hasLeft && hasRight) || (hasLeft && !hasRight),
          'is-12': !(hasLeft || hasRight)}">
          <div class="columns">
            <div class="column is-12 type-content">
              <breadcrumbs v-bind:page="page" class="breadcrumbs"></breadcrumbs>
              <div class="page-title">
                <h1 class="h1">{{ title }}</h1>
                <div class="meta">
                  <img v-if="page.author" class="gravatar" v-bind:src="page.author.name + '?s=32'" />
                  <span v-if="page.author" class="author">{{ page.author.name }}</span>
                  <span class="date">{{ publishDate }}</span>
                </div>
              </div>
              <img class="img" v-if="page.images[0]" v-bind:src="page.images[0].url" />
              <component
              :is="page.typeView.type.component"
              v-bind:page="page" />
            </div>
          </div>
          <component
            class="center-component"
            v-for="(component, index) in centerComponents"
            v-bind:key="'center' + '_' + page.id + '_' + index"
            :is="component.type"
            v-bind:data="component.data" />
          <div class="columns" v-if="page.comments">
            <div class="column is-12 comments" >
              <div class="sub-heading">
                <h2 class="h2">Comments</h2>
                <div class="meta"></div>
              </div>
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
          <component
            class="right-component"
            v-for="(component, index) in rightComponents"
            v-bind:key="'right' + '_' + page.id + '_' + index"
            :is="component.type"
            v-bind:data="component.data" />
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

const AdminLayout = {
  name: 'admin-layout',
  props: {
    page: { type: Object }
  },
  data () {
    return {};
  },
  computed: {
    ...mapGetters(['flashNotification']),
    publishDate: function() {
      if(!this.page) return null;
      return (new Date(this.page.publishDate)).toISOString().split('T')[0];
    },
    horizontalMenu: function(){
      return this.layoutData.horizontalMenu;
    },
    layoutData: function() {
      return JSON.parse(this.page.layoutView.data);
    },
    leftComponents: function() {
      return this.layoutData.leftComponents;
    },
    hasLeft: function() {
      return this.leftComponents.length > 0;
    },
    centerComponents: function() {
      return this.layoutData.centerComponents;
    },
    rightComponents: function() {
      return this.layoutData.rightComponents;
    },
    hasRight: function() {
      return this.rightComponents.length > 0;
    },
    title: function() {
      return Util.getTranslation(this.page.title, 'en')
    }
  },
  apollo: {

  }
}

export default AdminLayout ;
</script>

<style lang="sass" scoped>
  %blob {
    background-color: rgba(255, 255, 255, 0.9);
    /* opacity: 0.9; */
    border-radius: 5px;
    border: 1px solid #c0c0c0;
    box-shadow: 2px 2px 3px 0 rgba(0,0,0,.75);
  }
  .top-menu {
    @extend %blob;
  }
  .left-component {
    @extend %blob;
    &:not(:first-child) {
      margin-top: 12px;
    }
  }
  .center-component {
    @extend %blob;
    &:not(:first-child) {
      margin-top: 12px;
    }
  }
  .right-component {
    @extend %blob;
    &:not(:first-child) {
      margin-top: 12px;
    }
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
    border-bottom: 1px solid #c0c0c0;
    margin-bottom: 15px;
  }

  .page-title {
    @extend %heading;
    .h1 {
      font-size: 1.9em;
      display: inline;
    }
    .meta {
      float: right;
      margin-top: 1px;
    }
  }

  .sub-heading {
    @extend %heading;
    .h2 {
      font-size: 1.9em;
      display: inline;
    }
    .meta {
      float: right;
      margin-top: 1px;
    }
  }
  .breadcrumbs {

  }
  .sharers  {
    cursor: pointer;
  }
  .comments {
    @extend %blob;
    @extend %center-content;
    margin-top: 25px;
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
