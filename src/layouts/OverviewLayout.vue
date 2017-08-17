<template>
  <div class="layout-view green">
    <div class="container content">
      <div class="columns">
        <div v-if="hasTopMenu" class="column is-12">
          <horizontal-menu class="top-menu"></horizontal-menu>
        </div>
      </div>
      <div class="columns">
        <div v-if="hasLeftMenu" class="column is-2">
          <vertical-menu class="left-menu"></vertical-menu>
        </div>

        <div class="column" v-bind:class="{
          'is-8': hasLeftMenu && hasRightMenu,
          'is-10': (!hasLeftMenu && hasRightMenu) || (hasLeftMenu && !hasRightMenu),
          'is-12': !(hasLeftMenu || hasRightMenu),
        }">
          <div class="columns">
            <div class="column is-12 breadcrumbs">
              <breadcrumbs v-bind:page="page"></breadcrumbs>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12 type-content">
              <h1>{{ title }}</h1>
              <component :is="page.typeView.type.component" v-bind:page="page"></component>
            </div>
          </div>
        </div>

        <div v-if="hasRightMenu" class="column is-2">
          <vertical-menu class="right-menu"></vertical-menu>
        </div>
      </div>
    </div>
    <monsquaz-footer class="footer"></monsquaz-footer>
  </div>
</template>

<script>

import Util from '../Util';

const OverviewLayout = {
  name: 'loading-layout',
  props: {
    page: { type: Object }
  },
  data () {
    /*
      TODO: Base the has*Menu flags on the contents of page.layoutView.data
    */
    return {
      title: Util.getTranslation(this.page.title, 'en'), // TODO
      hasLeftMenu: true,
      hasRightMenu: true,
      hasTopMenu: true
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
    margin-top: 15px;
  }
  .breadcrumbs {
    @extend %blob;
  }
  .layout-view {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  .content {
    flex: 1;
    margin-top: 15px;
  }
  .footer {
    border-top: 1px solid black;
  }
</style>
