<template>
  <div class="layout-view">
    <p>Overview layout</p>
    <component
      :is="typeComponent"
      v-bind:type-data="typeData"
      v-bind:content="content">
    </component>
  </div>
</template>

<script>

const OverviewLayout = {
  name: 'loading-layout',
  props: {
    layoutData:     { type: Object },
    typeComponent:  { type: String },
    typeData:       { type: Object },
    content:        { type: Array  }
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
