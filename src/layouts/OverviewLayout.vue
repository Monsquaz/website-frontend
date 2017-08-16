<template>
  <div class="layout-view">
    <horizontal-menu></horizontal-menu>
    <vertical-menu></vertical-menu>
    <component :is="page.typeView.type.component" v-bind:page="page"></component>
    <vertical-menu></vertical-menu>
    <footer></footer>
  </div>
</template>

<script>

const OverviewLayout = {
  name: 'loading-layout',
  props: {
    page: { type: Object }
  },
  data () {
    return {}
  },
  apollo: {

  }
}

export default OverviewLayout ;
</script>

<style lang="sass" scoped>
  .layout-view {
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to bottom,  #a8fdd1 0%,#2efd94 50%,#003214 100%) no-repeat center center fixed;
    background-size: cover;
  }
</style>
