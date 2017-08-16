<template>
  <div class="layout-view green">
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

</style>
