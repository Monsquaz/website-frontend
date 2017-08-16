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

<style lang="sass">
</style>
